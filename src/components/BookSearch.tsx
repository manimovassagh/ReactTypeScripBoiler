import React, {useState, ChangeEvent, ReactElement} from 'react';
import {useHistory} from 'react-router-dom'
import {Book} from '../types/Book';
import {bookApi} from '../shared/BookApi'

interface IProps {
  className?: string
  headline?: string
}

export default function BookSearch(props: IProps): ReactElement {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Book[]>([])
  const history = useHistory()

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setSearchTerm(inputValue)
    if (inputValue.length > 2) {
      bookApi('get', `books/search/${inputValue}`, setSearchResults)
    } else {
      setSearchResults([])
    }
  }

  const onClick = (book: Book) => {
    setSearchResults([])
    setSearchTerm('')
    history.push(`/books/${book.isbn}`)
  }

  return (
    <>
      {props.headline && <h2>{props.headline}</h2>}
      <div className={`ui search ${props.className}`}>
        <div className="ui icon input">
          <input value={searchTerm} onChange={onSearch} type="text" className="prompt" />
          <i className="search icon" />
        </div>
        {searchResults.length > 0 &&
          <div className="results transition visible">
            {searchResults.map(book =>
              <span onClick={() => onClick(book)} key={book.isbn} className="result">
                {book.title}
                <p className="description">
                  {book.subtitle}
                </p>
              </span>
            )}
          </div>
        }
      </div>
    </>
  )
}
