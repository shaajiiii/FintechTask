const router = require("express").Router();
const Joi = require('joi');
const {User} = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/', async (req, res) => {
	try {
		// validation of data
		let { error } = validateLoginData(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });
		
		//searching for user
		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		//verifying password
		const validPassword = await  bcrypt.compare(req.body.password,user.password);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		//Logging in the user
		const token = generateAuthToken(user._id);
		res.status(200).send({ data: token, message: "logged in successfully" });

	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});


//This validation function returns the error messages in 'error' key
const validateLoginData = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.required().label("Password"),
	});
	return schema.validate(data);
};

//the user id is passed and encoded to token
const generateAuthToken = (userId)=>{
    const token = jwt.sign({ _id: userId }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;

}


module.exports = router;

