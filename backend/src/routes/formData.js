import express from "express";
import formSchema from "../models/formData.js";
import {sendMail} from "../services/emailer.js";

const router = express.Router();

router.post("/formData", (req, res) => {
  const form = formSchema(req.body);
  form
    .save()
    .then((data) => {
      res.json(data);
      sendMail(req.body).then((res)=>{console.log(res)}).catch((error) => {console.log(error);});
    })
    .catch((err) => res.json({ message: err }));
});

export default router;
