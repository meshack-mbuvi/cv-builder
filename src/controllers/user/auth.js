import { User } from "../../sequelize/models";

import passwordHash from "password-hash";

export class UserController {
  /**
   * @summary - checks wether user with given email exists in the database
   * @param {string} email
   * @returns {boolean} - a value indicating whether user exists
   */
  static async exists(email) {
    const user = await User.findOne({ where: { email } });
    if (user) return true;
    return false;
  }

  /**
   * @summary - This method creates a new user account
   * @param {object}request - a request object with data for a new user
   * @param {object}response -  a response object used to send back to the user the
   *  results from the operation of creating new account
   *
   * @returns request
   */
  static async signUp(request, response) {
    const {
      body: { firstName, lastName, email, password, confirmPassword }
    } = request;

    //   Check whether user exists before creating new one
    const exists = await UserController.exists(email);
    if (exists) {
      return response.status(409).send({ message: "User already exists" });
    }

    if (password !== confirmPassword) {
      return response.status(400).send({
        message: "Passwords do not match"
      });
    }

    const hashedPassword = passwordHash.generate(password);

    try {
      const result = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        accountType: "normal"
      });

      // no need to return password hash
      delete result.dataValues.password;

      return response.status(201).send({
        result,
        data: { message: "User account created successfully" }
      });
    } catch (error) {
      return response.status(500).send({
        error: "Account was not created, please try again"
      });
    }
  }
}
