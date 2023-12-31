const mongoose = require("mongoose");

const uri =
  "mongodb+srv://islom:islom123@mosh-node-app.6twhk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDb..."))
  .catch((err: any) => console.log(err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    // match: /pattern/i,
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
    lowercase: true,
    // uppsercase: true,
    trim: true,
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function (v: string | string[]) {
        return v && v.length > 0;
      },
      message: "A course should have at least one tag.",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: true,
    min: 10,
    max: 200,
    get: (v: number) => Math.round(v),
    set: (v: number) => Math.round(v),
  },
});

// creating class model and its instance
const Course = mongoose.model("Course", courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: "blockchain",
    author: "Islom",
    tags: ["web3", "nft"],
    isPublished: true,
    price: 50.7,
    category: " Web ",
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex: any) {
    for (const field in ex.errors) {
      console.log(ex.errors[field].message);
    }
  }
};

const getCourses = async () => {
  const courses = await Course.find({ author: /.*Islom.*/i }).sort({
    name: -1,
  });
  console.log(courses);
};

createCourse();
