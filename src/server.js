import 'dotenv/config'
import express from "express";
import homeRouter from "./routers/homeRouter";

const app = express();
const PORT = 4000;


app.use("/", homeRouter);



app.listen(PORT, () => {
    console.log("SERVER is working now✅")
})