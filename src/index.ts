import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import router from "./router";
import { connectDB } from "./lib/connectDB";
import 'dotenv/config';


const app = express();

const options = {
  origin: process.env.CLIENT_URL,
};

app.use(cors(options));

//app.use(cors(process.env.CLIENT_URL))

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(4040, () => {
  connectDB();
  console.log("Server running on http://localhost:4040/");
});

app.use("/", router());
