import express from "express";

const router = express.Router();
router.get("/posts/:id", (req, res) => {
    return res.json({ id: req.params.id })
})

export default router;