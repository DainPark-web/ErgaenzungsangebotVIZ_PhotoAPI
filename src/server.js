import 'dotenv/config'
import express from "express";
import homeRouter from "./routers/homeRouter";

const app = express();
const PORT = 4000;

//pug
app.set('view engine', 'pug');
app.set("views", process.cwd() + '/src/views');


app.use("/", homeRouter);



app.listen(PORT, () => {
    console.log("SERVER is working now✅")
})