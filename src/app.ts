import express from "express";
import bodyParser from "body-parser";
import chooseCommand from "./choose-command";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", (req, res, next) => chooseCommand(req, res).catch(next));

app.listen(process.env.PORT, () => console.log("App started"));
