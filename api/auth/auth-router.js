const express = require('express')
const bcrypt = require('bcryptjs')

const router = express.Router()

router.post('/register', async (req, res, next) => {
 const {username, password} = req.body

})
router.post("/login", async (req, res, next) => {
    res.json({ message: "login working" });
});


router.get("/logout", async (req, res, next) => {
    res.json({ message: "logout working" });
});







module.exports = router;