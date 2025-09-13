import express from "express";
import {submitfeedback,getallfeedback} from '../controllers/Feedbackcontroller';
const router = express.Router();

router.post("/",submitfeedback);
router.get("/",getallfeedback);

export default router;
