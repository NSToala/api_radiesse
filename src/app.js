import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import pkg from "../package.json";

import productRoutes from "./routes/products.routes";
import coursesRoutes from "./routes/courses.routes";
import usersRoutes from "./routes/user.routes";
import analyticsRoutes from "./routes/analytics.routes";
import authRoutes from "./routes/auth.routes";

import { createRoles, createCourse, createAdmin} from "./libs/initialSetup";

const app = express();
createRoles();
createCourse();
createAdmin();

// Settings
app.set("pkg", pkg);
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 4);

// Middlewares
const corsOptions = {
  // origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Welcome Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to my Products API",
    name: app.get("pkg").name,
    version: app.get("pkg").version,
    description: app.get("pkg").description,
    author: app.get("pkg").author,
  });
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);

export default app;
