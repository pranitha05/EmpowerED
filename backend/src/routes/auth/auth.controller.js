import { Router } from "express";
import passport from "passport";
import { BadRequest, SuccessException } from "../../utilities/exception.js";
import { AuthService } from "./auth.service.js";
import { registerValidator } from "../../utilities/validation.js"
const router = Router();
const validateAuth = (req, res, next) => {
  if (!req.body.email || !req.body.password) return res.status(400).send(BadRequest());
  next()
}
router.post("/login", validateAuth, passport.authenticate("local"), async (req, res) => {
  const token = await AuthService.signToken(req.user.id)
  if(!token) return res.json(BadRequest())
  req.logIn(req.user, (err) => err && console.log(err))
  return res.json(SuccessException({ token }));
});

router.post("/register", async (req, res) => {
  const valid = registerValidator.safeParse(req.body);
  if (valid.error) return res.send(BadRequest(valid.error.flatten().fieldErrors));
  
  const { email, password, firstName, lastName } = req.body;

  const isRegistered = await AuthService.registerUser({ email, password, firstName, lastName })

  // res.send(isRegistered ? BadRequest({ email: ["Email already exists"] }) : SuccessException());
  res.send("3")
});

router.post("/logout", (req, res) => {
  req.logOut({ keepSessionInfo: false }, (err) => console.log(err && console.log(err)))
  return res.send(SuccessException())
})

export default router;
