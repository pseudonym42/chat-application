const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { UserInputError, AuthenticationError } = require('apollo-server');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env.json");

module.exports = {
    Query: {
        getUsers: async () => {
            try {
                const users = await User.findAll();
                return users;
            } catch (error) {
                console.error(error);
            }
        },
        login: async (parent, args, context, info) => {
            const { username, password } = args;
            let errors = {};
            try {
                if (username.trim() === "") errors.username = "Username must not be empty";
                if (password === "") errors.password = "Password must not be empty";

                if (Object.keys(errors).length > 0) {
                    throw new UserInputError("Bad input", {errors: errors});
                }
                const user = await User.findOne({
                    where: {username: username}
                })
                if (!user) {
                    errors.username = "User not found";
                    throw new UserInputError("User not found", {errors: errors});
                }
                const passwordCorrect = await bcrypt.compare(password, user.password)
                if (!passwordCorrect) {
                    errors.password = "Password is incorrect";
                    throw new AuthenticationError("User not found", {errors: errors});
                }
                const token = jwt.sign({
                    username: username
                  }, JWT_SECRET, { expiresIn: 60 * 60 });
                  user.token = token;
                return user;
            } catch (error) {
                console.error(error);
            }
        }
    },
    Mutation: {
        register: async(parent, args, context, info) => {
            const { username, email, password, confirmPassword} = args;
            let registrationErrors = {};
            try {
                if (email.trim() === "") {
                    registrationErrors.email = "Field <email> must not be empty";
                }
                if (password.trim() === "") {
                    registrationErrors.password = "Field <password> must not be empty";
                }
                if (username.trim() === "") {
                    registrationErrors.username = "Field <username> must not be empty";
                }
                if (confirmPassword.trim() === "") {
                    registrationErrors.confirmPassword = "Field <confirmPassword> must not be empty";
                }

                if (confirmPassword !== password) {
                    registrationErrors.password = "Passwords must match";
                }

                // const userExists = await User.findOne({
                //     where: {username: username}
                // })
                // const emilExists = await User.findOne({
                //     where: {email: email}
                // })
                // if (userExists) {
                //     registrationErrors.username = "<username> already exists";
                // }
                // if (emilExists) {
                //     registrationErrors.email = "<email> already exists";
                // }

                if (Object.keys(registrationErrors).length > 0) {
                    throw registrationErrors;
                }

                const hashedPassword = await bcrypt.hash(password, 6);
                const user = await User.create({
                    username,
                    email,
                    password: hashedPassword
                });
                return user;
            } catch (error) {
                if (error.name === "SequelizeUniqueConstraintError") {
                    /*
                        Here error.errors is a collection of ValidationErrorItem.
                        An example of ValidationErrorItem:

                            ValidationErrorItem {
                                message: 'username must be unique',
                                type: 'unique violation',
                                path: 'username',
                                value: 'bob',
                                origin: 'DB',
                                instance: [User],
                                validatorKey: 'not_unique',
                                validatorName: null,
                                validatorArgs: []
                            }
                    */
                    error.errors.forEach(
                        (e) => (registrationErrors[e.path] = e.message)
                    )
                } else if (error.name === "SequelizeValidationError") {
                    /*
                        Here error.errors is a collection of ValidationErrorItem.
                        An example of ValidationErrorItem:

                            ValidationErrorItem {
                                message: 'must be a valid email address',
                                type: 'Validation error',
                                path: 'email',
                                value: 'bail.com',
                                origin: 'FUNCTION',
                                instance: [User],
                                validatorKey: 'isEmail',
                                validatorName: 'isEmail',
                                validatorArgs: [Array],
                                original: [Error]
                            }
                    */
                    error.errors.forEach(
                        (e) => (registrationErrors[e.path] = e.message)
                    )
                }
                console.error(error);
                throw new UserInputError("Bad input", {errors: registrationErrors});
            }
        }
    }
};