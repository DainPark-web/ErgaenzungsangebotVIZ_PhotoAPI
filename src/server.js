import 'dotenv/config'
import express from "express";
import morgan from 'morgan';
import homeRouter from "./routers/homeRouter";

const app = express();
const PORT = 4000;

//pug
app.use(morgan("dev"))
app.set('view engine', 'pug');
app.set("views", process.cwd() + '/src/views');

//frontend
app.use("client", express.static(__dirname + "/client"))

app.use("/", homeRouter);



app.listen(PORT, () => {
    console.log("SERVER is working now✅")
})