import React, {ReactElement} from 'react'

import BookForm from './BookForm'

export default function BookCreate(): ReactElement {
  return (
    <>
      <h2>Buch anlegen</h2>
      <BookForm
        title="Mein neues Buch"
        subtitle="sub sub"
        isbn={Math.floor(Math.random() * 99999999999 + 111111111).toString()}
        description="desc"
        authors={['Max Mux']}
        thumbnails={[{title: 'title', url: 'https://ng-buch.de/public/monkey-thinking.svg'}]}
        published="2020-05-21"
        isEdit={false}
      />
    </>
  )
}
