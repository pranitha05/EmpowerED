import { Router } from "express";
import passport from "passport";
import { BadRequest, SuccessException, UnauthorizedException } from "../../utilities/exception.js";
import { AuthService } from "./auth.service.js";
import { registerValidator } from "../../utilities/validation.js"
const router = Router();

router.post("/login", passport.authenticate("local"), async (req, res) => {
  const token = await AuthService.signToken(req.user.id)
  if(!token) return res.json(BadRequest())
  return res.json(SuccessException({ token }));
});

router.post("/register", async (req, res) => {
  const valid = registerValidator.safeParse(req.body);
  if (valid.error) return res.send(BadRequest(valid.error.flatten().fieldErrors));
  
  const { email, password, firstName, lastName } = req.body;

  const isRegistered = await AuthService.registerUser({ email, password, firstName, lastName })

  res.send(isRegistered ? BadRequest({ email: ["Email already exists"] }) : SuccessException());
});

export default router;
