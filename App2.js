import express from 'express';
import cors from "cors";
import CourseRoutes from "./src/Kanbas/Courses/routes.js";
import ModuleRoutes from "./src/Kanbas/Courses/Modules/routes.js";

import Hello from "./hello.js";
import Lab5 from "./lab5.js";
const app = express();
app.use(cors());
app.use(express.json());
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);

// for pre-lab of assignment 5