import { Router } from "express";
import { SuccessException } from "../../utilities/exception.js";

const router = Router();

router.get("/users/:uid", (req, res) => {
    res.send(req.user)
})


router.get("/posts/:pid", (req, res) => {

})


export default router;


