import { Schema, model } from "mongoose";

const notificationSchema = new Schema({
  senderId: {
    type: String,
    required: true,
  },
  receiverId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  delivered: {
    type: Boolean,
    default: false,  // true after recipient receives via websocket message
  },
});

const Notification = model("Notification", notificationSchema);

export default Notification;
