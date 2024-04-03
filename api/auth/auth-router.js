const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../users/users-model')


const router = express.Router()

router.post('/register', async (req, res, next) => {


 try{
     const { username, password } = req.body;
     const hash = bcrypt.hashSync(password, 8); // this actually means 2 to the 8th power of rounds hashing
     const newUser = { username, password: hash };
     const result = await User.add(newUser)
     res.status(201).json({
        message: `nice to have you ${result.username}`,
     })

 } catch(err) {
 next(err)
 }


})
router.post("/login", async (req, res, next) => {
    res.json({ message: "login working" });
});


router.get("/logout", async (req, res, next) => {
    res.json({ message: "logout working" });
});







module.exports = router;