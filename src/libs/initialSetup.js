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
      new Course({ name: "Variante omicron III", speaker: "Ana Maria Roura", category: "Health", path: "media/courses/omicron.mp4", poster: "media/posters/poster-omicron,png" }).save(),
      new Course({ name: "Variante omicron IV", speaker: "Ana Maria Roura", category: "Health", path: "media/courses/omicron.mp4", poster: "media/posters/poster-omicron,png" }).save(),
      new Course({ name: "Variante omicron V", speaker: "Ana Maria Roura", category: "Health", path: "media/courses/omicron.mp4", poster: "media/posters/poster-omicron,png" }).save(),
      new Course({ name: "Variante omicron VI", speaker: "Ana Maria Roura", category: "Health", path: "media/courses/omicron.mp4", poster: "media/posters/poster-omicron,png" }).save(),
      new Course({ name: "Variante omicron VII", speaker: "Ana Maria Roura", category: "Health", path: "media/courses/omicron.mp4", poster: "media/posters/poster-omicron,png" }).save(),
      new Course({ name: "Variante omicron VIII", speaker: "Ana Maria Roura", category: "Health", path: "media/courses/omicron.mp4", poster: "media/posters/poster-omicron,png" }).save(),
      new Course({ name: "Variante omicron IX", speaker: "Ana Maria Roura", category: "Health", path: "media/courses/omicron.mp4", poster: "media/posters/poster-omicron,png" }).save(),
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
