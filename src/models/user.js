const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    maxlength: 50,
    required: true,
    unique: true
  },
  password: {
    type: String,
    maxlength: 50,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin']
  },
}, {
  timestamps: true,
  versionKey: false
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
}

userSchema.methods.newPassword = async function (password, rounds) {
  bcrypt.hash(password, rounds, (err, hash) => {
    if (err) throw err;
    return hash;
  });
}

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

userSchema.pre('findOneAndUpdate', async function (next) {
  if (this._update.password) {
    this._update.password = await this?.schema.methods?.newPassword(this._update.password, 10);
  }
  next();
});

module.exports = model('Product', userSchema);