import { Router } from "express";

import { submitAnswer } from "./answer.controller";

export const answerRoutes = Router();

answerRoutes.post("/", submitAnswer);