const router = require("express").Router();
const Joi = require('joi');
const {User} = require('../models/userModel')


router.post('/',async (req, res) => {
    console.log('route ethi');
    console.log(req.body);
   
    try{
        let {error} = validateData(req.body);
        if(error)
            return res.status(400).send({ message: error.details[0].message });

        let user = await User.findOne({ email: req.body.email });
		if (user)
			return res.status(409).send({ message: "User with given email already Exist!" });

        user = await User.findOne({ phone: req.body.phone });
        if (user)
			return res.status(409).send({ message: "User with given phone already Exist!" });


        
        await new User(req.body).save();
        res.status(201).send("User Created Successfully") // success responese...

    }
    catch(error) {
        if (error.name === "ValidationError") {
            let errors = {};
      
            Object.keys(error.errors).forEach((key) => {
              errors[key] = error.errors[key].message;
            });
      
            return res.status(400).send(errors);
          }
          console.log(error);
          res.status(500).send("Something went wrong");

    }

   
})



const validateData = (signupData) => {
    const schema = Joi.object({
        firstName: Joi.string().regex(/^[A-Za-z]+$/).min(2).required().label("First Name").messages({
            "string.pattern.base": "Please enter a valid first name.."
        }),
        lastName: Joi.string().regex(/^[A-Za-z]+$/).min(2).required().label("Last Name").messages({
            "string.pattern.base": "Please enter a valid last name.."
        }),
        middleName: Joi.string().regex(/^[A-Za-z]+$/).min(2).label("Middle Name").messages({
            "string.pattern.base": "Please enter a valid middle name.."
        }),
        phone:Joi.string().regex(/^[0-9]{10}$/).messages(
            {
                'string.pattern.base': `Phone number should contain 10 digits.`
            }).required(),
        email: Joi.string().email().required().label("Email"),
        password: Joi.required().label("Password"),
        occupation: Joi.string().label("Occupation"),
        company: Joi.string().label("company name"),

    })

    return schema.validate(signupData)

}



module.exports = router;
