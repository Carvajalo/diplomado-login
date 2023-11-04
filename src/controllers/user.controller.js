const User = require('../models/user');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: 'All users',
      users
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    });
  }
}

const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany();
    res.status(200).json({
      message: 'All users deleted'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    });
  }
}

module.exports = {
  getAllUsers,
  deleteAllUsers,
}