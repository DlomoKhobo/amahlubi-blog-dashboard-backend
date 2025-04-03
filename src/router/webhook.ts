import express from "express";
import { clerkWebHook } from "../controllers/webhook";
import bodyParser from "body-parser";

export default (router: express.Router) => {
  router.post(
    "/clerk",
    bodyParser.raw({ type: "application/json" }),
    clerkWebHook
  );
};
