import React, {useState, SyntheticEvent} from 'react';
import {useHistory} from 'react-router-dom'
import css from './BookForm.module.css'

import {bookApi} from '../shared/BookApi'
import {BookRaw} from '../types/Book'

interface Props extends BookRaw {
  isEdit: boolean
}

export default function BookForm(props: Props): JSX.Element {
  const buildThumbnail = (title: string, url: string) => ({title, url})

  const [title, setTitle] = useState(props.title)
  const [subtitle, setSubtitle] = useState(props.subtitle)
  const [isbn, setIsbn] = useState(props.isbn)
  const [description, setDescription] = useState(props.description)
  const [authors, setAuthors] = useState(props.authors)
  const [thumbnails, setThumbnails] = useState(props.thumbnails || [])
  const [published, setPublished] = useState(props.published)

  const history = useHistory()

  const book = () => ({title, subtitle, isbn, description, authors, thumbnails, published})

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault() // stops default reloading behaviour
    bookApi(
      props.isEdit ? 'put' : 'post',
      props.isEdit ? `books/${props.isbn}` : 'books',
      () => history.push(props.isEdit ? `/books/${props.isbn}` : '/books'),
      book()
    )
  }

  const onChangeAuthor = (value: string, index: number) => {
    setAuthors(_authors => {
      const copyAuthors = [..._authors]
      copyAuthors[index] = value
      return copyAuthors
    })
  }

  const onChangeThumbnail = (index: number, inputObj: {url: string} | {title: string}) => {
    setThumbnails(_thumbnails => {
      const copyThumbnails = [..._thumbnails]
      copyThumbnails[index] = {...copyThumbnails[index], ...inputObj}
      return copyThumbnails
    })
  }

  const onAddThumbnail = () => {
    setThumbnails(_thumbnails => {
      return [..._thumbnails, buildThumbnail('', '')]
    })
  }

  const onRemoveThumbnail = () => {
    setThumbnails(_thumbnails => {
      const newThumbnails = [..._thumbnails]
      newThumbnails.pop()
      return newThumbnails
    })
  }

  const onAddAuthor = () => {
    setAuthors(_authors => [..._authors, ''])
  }

  const onRemoveAuthor = () => {
    setAuthors(_authors => {
      if (_authors.length > 1) {
        const newAuthors = [..._authors]
        newAuthors.pop()
        return newAuthors
      } else {
        return _authors
      }
    })
  }

  return (
    <form className={`ui form ${css.bookFom}`} onSubmit={handleSubmit}>
      <label>Buchtitel</label>
      <input placeholder="Titel" required value={title} onChange={(e) => {setTitle(e.target.value)}} />

      <label>Untertitel</label>
      <input placeholder="Subtitle" value={subtitle} onChange={(e) => {setSubtitle(e.target.value)}} />

      <label>Isbn</label>
      <input
        placeholder="Isbn"
        readOnly={props.isEdit}
        required
        pattern="\d{9}|\d{11}"
        title="Isbn Nummer muss zwischen 9 und 11 Zeichen lang sein"
        value={isbn}
        onChange={(e) => {setIsbn(e.target.value)}} />

      <label>Erscheinungsdatum</label>
      <input type="date" required value={published} onChange={(e) => {setPublished(e.target.value)}} />

      <label>Authoren</label>
      <button className="ui mini button" type="button" onClick={onAddAuthor}>+</button>
      <button className="ui mini button" type="button" onClick={onRemoveAuthor}>-</button>
      {authors.map((author, index) =>
        <div key={index} className="sixteen wide field">
          <input
            placeholder="Autor"
            required
            value={author}
            onChange={(e) => {onChangeAuthor(e.target.value, index)}} />
        </div>
      )}

      <label>Beschreibung</label>
      <input placeholder="Description" value={description} onChange={(e) => {setDescription(e.target.value)}} />

      <label>Bilder</label>
      <button className="ui mini button" type="button" onClick={onAddThumbnail}>+</button>
      <button className="ui mini button" type="button" onClick={onRemoveThumbnail}>-</button>
      {thumbnails.map((thumbnail, index) =>
        <div key={index} className="field">
          <input placeholder="Url" required className="nine wide field" value={thumbnail.url}
            onChange={(e) => {onChangeThumbnail(index, {url: e.target.value})}} />
          <input placeholder="Titel" className="seven wide field" value={thumbnail.title}
            onChange={(e) => {onChangeThumbnail(index, {title: e.target.value})}} />
        </div>
      )}
      <button className="ui button">Submit</button>
    </form >
  )
}
