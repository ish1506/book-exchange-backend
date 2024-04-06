import mongoose from "mongoose";
import Book from "../models/book.js";
import User from "../models/user.js";

export default class BookController {
  static async getBookById(req, res) {
    try {
      const { id } = req.params;
      const book = await Book.findById(id);
      res.json(book);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getAllBooks(req, res) {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async createBook(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const owner = await User.findById(req.body.ownerId).session(session);
      if (owner === null) {
        throw new Error("User not found");
      }
      const book = await Book.create([req.body], { session });
      owner.books.push(book[0]._id);
      await owner.save({ session });

      await session.commitTransaction();
      res.status(201).json(book.id);
    } catch (error) {
      await session.abortTransaction();
      res.status(400).send(error.message);
    } finally {
      session.endSession();
    }
  }

  static async updateBookById(req, res) {
    try {
      const { id } = req.params;
      const book = await Book.findByIdAndUpdate(id, req.body);
      res.json(book);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async deleteBookById(req, res) {
    try {
      const { id } = req.params;
      await Book.findByIdAndDelete(id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
