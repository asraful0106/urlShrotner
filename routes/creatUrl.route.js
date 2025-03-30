import { Router } from "express";
import { createUrl } from "../controllers/createUrl.controller.js";

const creatUrlRouter = Router();

creatUrlRouter.post('/', async (req, res) => {
    createUrl(req, res);
});

export default creatUrlRouter;