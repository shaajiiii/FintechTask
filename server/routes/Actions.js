const router = require("express").Router();
const {User} = require('../models/userModel');
const jwt = require('jsonwebtoken');


router.get('/get-username',authenticateToken, async (req, res) => {
	try {
        let user = await User.findOne({_id:req.tokenData._id})
        res.status(200).send(user.firstName)
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get('/delete-user',authenticateToken, async (req, res) => {
	try {
        let user = await User.findOneAndDelete({_id:req.tokenData._id})
        res.status(200).send("Deleted " + user.firstName + " from the database")
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});



function authenticateToken (req, res, next) {

    const token = req.headers['authorization']
    if (!token) return res.sendStatus(401)
    jwt.verify(token, process.env.JWTPRIVATEKEY, (err, data) => {
      if (err) return res.sendStatus(403)
      req.tokenData = data
      next()
    })
}

module.exports = router;
