import Book from "../models/book.js";

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
    try {
      const book = await Book.create(req.body);
      res.status(201).json(book.id);
    } catch (error) {
      res.status(400).send(error.message);
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
