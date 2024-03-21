import express from 'express';
import cors from "cors";

import Hello from "./hello.js";
import Lab5 from "./lab5.js";
const app = express();
app.use(cors());
app.use(express.json());
Lab5(app);
Hello(app);
app.listen(4000)


// for pre-lab of assignment 5
// *** note: must cd into src before running nodemon App2.js