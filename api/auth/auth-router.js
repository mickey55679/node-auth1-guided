const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../users/users-model')


const router = express.Router()
// we really should have middleware to check username and password usually. 

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
   try{
    const { username, password } = req.body;
    const [user] = await User.findBy({username})
    if(user &&  bcrypt.compareSync(password, user.password)) {
       req.session.user = user //this is a very important line this signals the express session lib that a session needs to be saved for this user.  
       res.json({message: `welcoem back, ${user.username}`})
    } else {
        next({status: 401, message: 'bad credentials '})
    }


   } catch (err) {
    next(err)
   }
});


router.get("/logout", async (req, res, next) => {
   if(req.session.user) {
const { username } = req.session.user 
req.session.destroy(err => {
    if(err) {
     res.json({ message: `you can never leave ${username} `})
    } else {
   res.json({ message: `Goodbye ${username}`})
    }
})
   } else {
    res.set('Set-Cookie', 'monkey=; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00')
    res.json({ message: 'sorry, have we met?'})
   }
});







module.exports = router;