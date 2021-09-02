import React, {ReactElement} from 'react'
import {useParams} from 'react-router-dom';

import BookForm from './BookForm'
import {Book} from '../types/Book';
import {useBookApi} from '../shared/BookApi';
import LoadingSpinner from './shared/LoadingSpinner'

export default function BookEdit(): ReactElement {
  const isbn = useParams<{isbn: string}>().isbn
  const book = useBookApi<Book>('get', `book/${isbn}`)[0]

  if (!book) {return <LoadingSpinner />}

  const dateToInputString = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDay()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return <BookForm
    title={book.title}
    subtitle={book.subtitle}
    isbn={book.isbn}
    description={book.description}
    authors={book.authors}
    thumbnails={book.thumbnails || [{title: '', url: ''}]}
    published={dateToInputString(book.published)}
    isEdit={true}
  />
}
