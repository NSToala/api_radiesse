import { Schema, model } from "mongoose";

const courseSchema = new Schema(
  {
    name: {
      type: String,
    },
    speaker: {
      type: String,
    },
    category: {
      type: String,
    },
    path: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Course", courseSchema);
