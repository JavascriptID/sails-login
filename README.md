# Sails Login
Sails login boilerplate

## Summary
This boilerplate provides basic login functionality such as sign up, sign in,
and sign out. The password field hashed by Bcrypt. If you are trying to learn
Sails, this repository absolutely for you.

## Technical Details
### Dependencies
- sails
- bcrypt

### Route
* `/` directly view `homepage`.
* `/sign_out` use `UserController.sign_out`.
* `get /sign_up` directly view `sign_up`.
* `get /sign_in` directly view `sign_in`.
* `post /sign_up` use `UserController.sign_up`.
* `post /sign_in` use `UserController.sign_in`.

## TODO
- Listing more technical details.
- Add some unit tests.
- Writes tutorial.

## Contributing
Open for any contribution. Please feel free to submit an issue or send a pull
request.

## License
License for the application is MIT License. If you are using this repository
as your article reference, please gives an attribution in your article.
