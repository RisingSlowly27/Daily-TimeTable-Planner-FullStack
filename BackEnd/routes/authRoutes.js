import express from "express";
import passport from "../config/passport.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me",authMiddleware,(req,res)=>{
  res.json(req.user);
});

router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback",passport.authenticate("google"),
  (req, res) => {
    res.redirect(process.env.FRONTEND);
  }
);

export default router;