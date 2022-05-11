import express from "express";
import { ex01, home } from "../controllers/homeController";

const homeRouter = express.Router();

homeRouter.get("/", home);
homeRouter.get("/ex01", ex01);



export default homeRouter;