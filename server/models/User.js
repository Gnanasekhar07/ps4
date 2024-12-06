const mongoose = require('mongoose');

/**
 * User schema definition.
 */
const userSchema = new mongoose.Schema({
  /**
   * Username of the user.
   * @type {String}
   * @required
   * @unique
   * @trim
   * @minlength 3
   */
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },

  /**
   * Email of the user.
   * @type {String}
   * @required
   * @unique
   * @trim
   * @lowercase
   */
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },

  /**
   * Password of the user.
   * @type {String}
   * @required
   * @minlength 6
   */
  password: {
    type: String,
    required: true,
    minlength: 6
  },

  /**
   * Account type of the user.
   * @type {String}
   * @default 'personal'
   */
  accountType: {
    type: String,
    default: 'personal'
  },

  /**
   * Account number of the user.
   * @type {String}
   */
  accountNumber: {
    type: String
  },

  /**
   * Timestamp of when the user was created.
   * @type {Date}
   * @default Date.now
   */
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * User model.
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
