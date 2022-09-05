const User=require( "../models/user");
const { hashPassword, comparePassword } =require( "../helpers/auth");
const jwt=require('jsonwebtoken')
const stripe=require('stripe')('sk_test_tw9XBbCVZpONQnU1Ntn82s7G00HnBYOvV5')

 const register = async (req, res) => {
  try {
    // validation
    const { name, email, password } = req.body;
    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be 6 characters long",
      });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is taken",
      });
    }
    // hash password
    const hashedPassword = await hashPassword(password);
    const customer=await stripe.customers.create({
      email
    })
    console.log('Cust',customer)

    try {
      const user = await new User({
        name,
        email,
        password: hashedPassword,
        stripe_customer_id:customer.id
      }).save();

       console.log(user);
       const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      const { password, ...rest } = user._doc
      return res.json({
        user: rest,
        token
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

 const login = async (req, res) => {
  try {
    // check email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }
    // check password
    const match = await comparePassword(req.body.password, user.password);
    if (!match) {
      return res.json({
        error: "Wrong password",
      });
    }
    // create signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const { password, ...rest } = user._doc;

    res.json({
      token,
      user: rest,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports={register,login}