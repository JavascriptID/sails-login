/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    email:
    {
      type:     'email',
      required: true,
      unique:   true
    },
    password:
    {
      type:     'string',
      required: true
    },

    toJSON: function() {
      var obj = this.toObject();

      delete obj.password;

      return obj;
    }
  },

  sign_up: function(inputs, cb) {
    sails.log('Registering user...');

    sails.log('Hashing password...');
    const bcrypt    = require('bcrypt'),
          bcrypt_SR = 10;
    let   salt      = bcrypt.genSaltSync(bcrypt_SR),
          password  = bcrypt.hashSync(inputs.password, salt);

    sails.log(`Password hashed! Hash: ${password}`);
    sails.log('Executing callback...');

    User.create({
      email:    inputs.email,
      password: password
    })
    .exec(cb);
  }
};
