import express from "express";
import { body} from "express-validator"; "express-validator"
import Book from "../models/books.mjs"
import { registBook, updatedBook } from "../controllers/books.mjs";

const router = express.Router();

router.get('/', async (req, res) => {
  const books = await Book.find().sort({updatedAt : -1});
  res.json(books);
  res.send('/api/books');
});

router.get('/:id', async (req, res) => {
  const _id = req.params.id;
  const book = await Book.findById(_id);
  res.json(book);
});

router.post(
  '/',
  body('title').notEmpty(),
  body('description').notEmpty(),
  body('comment').notEmpty(),
  body('rating').notEmpty().isInt({min: 1,max:5}),
registBook
);

router.patch(
  '/:id',
  body('title').optional().notEmpty(),
  body('description').optional().notEmpty(),
  body('comment').optional().notEmpty(),
  body('rating').optional().notEmpty().isInt({min: 1,max:5}),
  updatedBook
  );

router.delete('/:id', async (req, res) => {
  const _id = req.params.id;
  await Book.deleteOne({_id});
  res.json({"msg":"Delete succeeded."});
});

export default router;