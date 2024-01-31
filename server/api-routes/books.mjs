import express from "express";
import { body} from "express-validator"; "express-validator"
import { deleteBook, getAllBooks, getBookById, registBook, updatedBook } from "../controllers/books.mjs";
import requestErrorHandler from "../helpers/helper.mjs";

const router = express.Router();

router.get('/', requestErrorHandler(getAllBooks));

router.get('/:id',requestErrorHandler(getBookById));

router.post(
  '/',
  body('title').notEmpty(),
  body('description').notEmpty(),
  body('comment').notEmpty(),
  body('rating').notEmpty().isInt({min: 1,max:5}),
  requestErrorHandler(registBook)
);

router.patch(
  '/:id',
  body('title').optional().notEmpty(),
  body('description').optional().notEmpty(),
  body('comment').optional().notEmpty(),
  body('rating').optional().notEmpty().isInt({min: 1,max:5}),
  requestErrorHandler(updatedBook)
  );

router.delete('/:id', requestErrorHandler(deleteBook));

export default router;