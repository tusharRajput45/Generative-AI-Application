import express from "express";
import { imageGenerative, textGenerative } from "../controller/generativeController.js";

const router = express.Router();

router.post("/text",textGenerative);
router.post("/image",imageGenerative);


export default router;
