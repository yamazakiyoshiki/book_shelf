import { validationResult } from "express-validator";
import Book from "../models/books.mjs";

async function registBook (req, res) {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
      const errs = errors.array();
      return res.status(400).json(errs);
  }
  const book = new Book(req.body);
  const newBook = await book.save();
  res.status(201).json(newBook);
}

async function updatedBook (req, res) {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
      const errs = errors.array();
      return res.status(400).json(errs);
  }

  const {title} = req.body;
  const {description} = req.body;
  const {comment} = req.body;
  const {rating} = req.body;
  const _id = req.params.id;
  const book = await Book.findById(_id);
  if(title !== undefined) book.title = title;
  if(description !== undefined) book.description = description;
  if(comment !== undefined) book.comment = comment;
  if(rating !== undefined) book.rating = rating;
  await book.save();
  res.json(book);
}

export {registBook, updatedBook};