/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	sign_up: function(req, res) {
		if (req.session.me)
		{
			msg = 'You have been logged in!';

			req.session.message = msg;
			if (req.wantsJSON) return res.forbidden(msg);

			return res.redirect('/');
		}

		User.sign_up({
			email: 	  req.param('email'),
			password: req.param('password')
		}, function(err, user) {
			if (err)
			{
				if (err.code === 'E_VALIDATION')
				{
					sails.log(err);
					
					msg = 'Email has been registered!';

					req.session.message = msg;
					if (req.wantsJSON) return res.badRequest(msg);

					return res.redirect('/sign_up');
				}

				return res.negotiate(err);
			}

			if (!user)
			{
				msg = 'Oops! There is a problem when registering user!';

				req.session.message = msg;
				if (req.wantsJSON) return res.badRequest(msg);

				return res.redirect('/sign_up');
			}

			req.session.user = user.toJSON();

			sails.log('User registered successfully!');
			sails.log(`User session:`);
			for (var key in req.session.user)
				sails.log(`${key}: ${req.session.user[key]}`);

			if (req.wantsJSON) return res.ok('Sign up success!');

			return res.redirect('/');
		});
	},

	sign_in: function(req, res) {
		if (req.session.me)
		{
			msg = 'You have been logged in!';

			req.session.message = msg;
			if (req.wantsJSON) return res.forbidden(msg);

			return res.redirect('/');
		}

		User.findOne({
			email: req.param('email')
		}, function(err, user) {
			sails.log('Trying to sign in...');

			if (err) return res.negotiate(err);

			if (!user)
      {
        sails.log(`User with email ${req.param('email')} not exist!`);

				msg = 'Email not registered!';

				req.session.message = msg;
				if (req.wantsJSON) return res.badRequest(msg);

        return res.redirect('/sign_in');
      }

			const bcrypt = require('bcrypt');

			if (!bcrypt.compareSync(req.param('password'), user.password))
			{
				sails.log(`Password for email ${req.param('email')} not match!`);

				msg = 'Invalid password!';

				req.session.message = msg;
				if (req.wantsJSON) return res.badRequest(msg);

				return res.redirect('/sign_in');
			}

			req.session.user = user.toJSON();

			sails.log(`User sign in with email ${req.param('email')} success!`);
			sails.log(`User session:`);
			for (var key in req.session.user)
				sails.log(`${key}: ${req.session.user[key]}`);

			if (req.wantsJSON) return res.ok('Sign in success!');

			return res.redirect('/');
		});
	},

	sign_out: function(req, res) {
		if (req.session.me)
		{
			if (req.wantsJSON) return res.forbidden('You not even signed in!');

			return res.redirect('/');
		}

		sails.log('User signed out!');

		req.session.user = undefined;

		if (req.wantsJSON) return res.ok('Sign out success!');

		return res.redirect('/');
	}
};
