import express from "express";
import mongoose from "mongoose";
import {} from "dotenv/config"
import formRoutes from "./src/routes/formData.js"
import cors from "cors";


const app = express();
const port = process.env.PORT;

//middleware
app.use(cors());
app.use(express.json())
app.use("/api", formRoutes);
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

//routes
app.get("/", (req, res) => {
    res.send("Works!!")
});

mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=> console.log("Conectado"))
    .catch((error)=> console.log(error))

app.listen(port, ()=> console.log('server listen on port' , port));