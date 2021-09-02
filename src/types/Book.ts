import {array, Describe, number, object, optional, string, date, assign, is, validate, Failure, any} from "superstruct"

export type Book = BookBase & {
  published: Date
}

export type BookBase = {
  isbn: string;
  title: string;
  authors: string[];
  subtitle?: string;
  rating?: number;
  thumbnails?: Thumbnail[];
  description?: string;
}

export interface Thumbnail {
  url: string;
  title?: string;
}

export type BookRaw = BookBase & {
  published: string
}

const bookBaseProps = {
  isbn: string(),
  title: string(),
  authors: array(string()),
  subtitle: optional(string()),
  rating: optional(number()),
  thumbnails: optional(array(object({url: string(), title: optional(string())}))),
  description: optional(string()),
}

export const BookBase: Describe<BookBase> = object(bookBaseProps)
export const Book: Describe<Book> = assign(object(bookBaseProps), object({
  published: date()
}))

export function isBookBase(book: BookBase): book is BookBase {
  const {published, ...bookWithoutPublished} = book as BookRaw
  if (is(bookWithoutPublished, BookBase)) {
    return true
  } else {
    console.log(
      'Failures in validation:',
      validateBook(book)[0]?.map(failure => `${failure.message} for ${failure.key}`)
    )
    return false
  }
}

export function isBookBaseArray(books: BookBase[]): books is BookBase[] {
  return is(books, array(any())) && books.every(book => isBookBase(book))
}

export function factoryRawToBook(book: BookRaw): Book {
  return {...book, published: new Date(book.published)}
}

export function validateBook(book: BookBase): ([Failure[], undefined] | [undefined, Book | undefined]) {
  const [errors, validModel] = validate(book, Book);
  if (errors) {
    const failures = errors.failures().map((failure) => failure);
    return [failures, undefined];
  } else {
    return [undefined, validModel];
  }
}

