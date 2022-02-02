import Course from "../models/Course";

export const getCourseById = async (req, res) => {
  const { courseId } = req.params;

  const course = await Course.findById(courseId);
  res.status(200).json(course);
};

export const getCourses = async (req, res) => {
  const courses = await Course.find();
  return res.json(courses);
};

