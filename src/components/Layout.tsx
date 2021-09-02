import React, {ReactElement} from 'react';
import {BrowserRouter as Router, NavLink} from "react-router-dom";
import BookSearch from './BookSearch';

interface Props {children: ReactElement}

export default function Layout(props: Props): ReactElement {
  return (
    <Router>
      <div className="ui menu">
        <NavLink to="/home" className="item">Home</NavLink>
        <NavLink exact to="/books" className="item">Books</NavLink>
        <NavLink to="/books/create" className="item">new Book</NavLink>
        <NavLink to="/cart" className="item" activeClassName="active">Shopping Cart</NavLink>
        <BookSearch className="item right" />
      </div>

      <div className="ui container">
        {props.children}
      </div>
    </Router>
  )
}
