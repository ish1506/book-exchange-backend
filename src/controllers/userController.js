import User from "../models/user.js";

export default class UserController {
  static async loginUser(req, res) {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (user === null) {
        return res.status(404).send("User not found");
      }
      if (user.passwordHash != req.body?.password) {
        return res.status(401).send("Wrong password");
      }
      return res.sendStatus(204);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send(error.message);
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      return res.json(user);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send(error.message);
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send(error.message);
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
      return res.status(201).json(user.id);
    } catch (error) {
      console.log(error.message);
      return res.status(400).send(error.message);
    }
  }
}
