import Notification from "../models/notification.js";

export default class NotificationController {
  static async createNotification(req, res) {
    try {
      const notification = await Notification.create(req.body);
      if (req.app.io.sockets !== undefined) {
        req.app.io
          .to(notification.receiverId)
          .emit("notification", notification);
        notification.delivered = true;
        notification.save();
      }
      res.status(201).json(notification);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}
