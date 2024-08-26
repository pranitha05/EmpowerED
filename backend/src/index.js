import express from "express";
import "dotenv/config";
import cors from "cors";
import { envValidator } from "./utilities/validation.js";
import {community, game, auth } from "./routes/index.js";
import { validateJWTMiddleware } from "./middlewares/auth/guards/jwt.guard.js";
import { InternalException, NotFoundException } from "./utilities/exception.js";
import session from "express-session";
import passport from "passport";
import "./middlewares/auth/strategy/LocalStrategy.js";
import "./middlewares/auth/strategy/JwtStrategy.js";
import { serializeSession } from "./middlewares/auth/serialize.js";
import { cacheCredentials } from "./microservice/redis/index.js";

envValidator.parse(process.env);
const app = express();
app.use(express.json({ strict: true }));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    cookie: { secure: true },
    saveUninitialized: false,
  })
);
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

serializeSession(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use("/v1/auth", auth);
app.use(
  "/v1/community",
  validateJWTMiddleware,
  passport.authenticate("jwt"),
  community
);
cacheCredentials()

app.use("/v1/game", validateJWTMiddleware, passport.authenticate("jwt"), game);

app.use((error, req, res, next) => {
  console.error(error);
  res.json(typeof error === "object" ? error : InternalException());
});

app.use((req, res, next) => res.json(NotFoundException(req.path)));

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));