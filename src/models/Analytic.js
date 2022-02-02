import { Schema, model } from "mongoose";

const analyticSchema = new Schema(
  {
    name: {
      type: String,
    },
    current: {
      type: Number,
    },
    course_id: [
        {
          type: Schema.Types.ObjectId,
          ref: "Course",
        },
    ],
    user_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Analytic", analyticSchema);
