import User from "../models/user.js";

export default class UserController {
  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      res.json(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  static async createUser(req, res) {
    try {
      const userSchema = {
        username: req.body?.username,
        // TODO: Implement password hashing
        passwordHash: req.body?.password,
      };
      const user = await User.create(userSchema);
      res.status(201).json(user.id);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}
