import Role from "../models/Role";
import Course from "../models/Course";
import User from "../models/User";

import bcrypt from "bcryptjs";

export const createCourse = async () => {
  try {
    // Count Documents
    const count = await Course.estimatedDocumentCount();

    // check for existing courses
    if (count > 0) return;

    // Create default Courses
    const values = await Promise.all([
      new Course({ name: "Evento Online Radiesse", speaker: "Radiesse", category: "Health", path: "/media/courses/eventoonline.mp4", poster: "media/posters/poster-omicron.png" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

export const createRoles = async () => {
  try {
    // Count Documents
    const count = await Role.estimatedDocumentCount();

    // check for existing roles
    if (count > 0) return;

    // Create default Roles
    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "admin" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

export const createAdmin = async () => {
  // check for an existing admin user
  const user = await User.findOne({ email: "admin@localhost" });
  // get roles _id
  const roles = await Role.find({ name: { $in: ["admin", "moderator"] } });

  if (!user) {
    // create a new admin user
    await User.create({
      username: "admin",
      email: "admin@localhost",
      password: await bcrypt.hash("admin", 10),
      roles: roles.map((role) => role._id),
    });
    console.log('Admin User Created!')
  }
};
