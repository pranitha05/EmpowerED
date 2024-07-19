import express from "express";
import "dotenv/config"
import community from "./community/index"
const app = express();
app.use(express.json())

app.use("/api/community", community)

app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`))