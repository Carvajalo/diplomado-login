const User = require('../models/user.js');

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    const savedUser = await newUser.save();
    res.status(201).json({
      message: 'User created successfully',
      savedUser
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    });
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) return res.status(404).json({ message: 'User not found' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Password incorrect' });
    const { role, name } = user;
    const payload = {
      id: user._id,
      role,
      name,
    }
    return res.status(200).json({
      message: 'Login successful',
      user: payload,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      stack: error.stack.split('\n'),
    });

  }
}

module.exports = {
  signup,
  login,
}