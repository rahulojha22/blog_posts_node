import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDb } from "./config/database.mjs";
import { auth_router } from "./routes/auth.mjs";
import { blog_router } from "./routes/blog_post.mjs";

const app = express();

app.use(cors());
app.use(bodyParser.json());
connectDb();

app.use('/api/auth', auth_router);

app.use('/api/blog', blog_router);

app.listen(8000, ()=> console.log('App running'));