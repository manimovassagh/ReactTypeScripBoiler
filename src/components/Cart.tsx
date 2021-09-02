import React, {ReactElement, SyntheticEvent} from 'react';
import BookListItem from './BookListItem';

import {Actions, useStore} from '../Store'
import {Book} from '../types/Book';

export default function Cart(): ReactElement {
  const {store, dispatch} = useStore()

  const books = store.cart.reduce((acc: Book[], book) => {
    acc.find(book_ => book_.isbn === book.isbn) || acc.push(book)
    return acc
  }, [])
    .sort((bookA, bookB) => Number(bookA.isbn) - Number(bookB.isbn))

  const countBook = (book: Book): number => {
    return store.cart.filter(_book => _book.isbn === book.isbn).length
  }

  const onChangeCount = (event: SyntheticEvent, action: Actions): void => {
    event.preventDefault()
    dispatch(action)
  }

  return (
    <>
      <h2>Shopping Cart</h2>
      <div className="ui middle aligned selection divided list">
        {books.map(book =>
          <BookListItem key={book.isbn} book={book}>
            <div className="right floated content">
              <div className="ui buttons">
                <label data-testid="count-target" className="ui button"><i className="shopping cart icon" />{countBook(book)}</label>
                <button className="ui button green" onClick={(e) => onChangeCount(e, {type: 'addToCart', book})}>Add One</button>
                <button className="ui button red" onClick={(e) => onChangeCount(e, {type: 'removeFromCart', book})}>Remove One</button>
              </div>
            </div>
          </BookListItem>
        )}
      </div>
    </>
  )
}
