import express from "express";
import { environmentValidator } from "./utilities/validation.js";
import "dotenv/config"
import community from "./community/index.js"
environmentValidator.parse(process.env);

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/community", community)

app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`))