import React, {ReactElement} from 'react';
import {Link} from 'react-router-dom';

import BookSearch from './BookSearch'

export default function Home(): ReactElement {
  return (
    <>
      <h4>Willkommen beim BookMonkey</h4>
      <Link className="ui red button" to="/books">
        Buchliste ansehen
      </Link>
      <BookSearch headline="Book Search" />
    </>
  )
}
