import express from "express"

const router = express.Router()

router.post("/", (req, res) => {
  console.log(req.body, "FULL BODY 🔥");
  const { idToken } = req.body;
  console.log(idToken, "TOKEN 🔥");
  res.json({ mess: "this is working" });
});

export default router