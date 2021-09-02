import React from 'react';
import {render, RenderResult, matchSnapshot, act, mockAxios} from './test-utils';
import '@testing-library/jest-dom';

import App from '../App';

describe('<App /> without Routing', () => {
  let documentBody: RenderResult
  beforeEach(() => {
    documentBody = render(<App />);
  });

  test('matches snapshot', () => matchSnapshot(documentBody));

  test('renders: Willkommen beim BookMonkey from Home Component', () => {
    const textElement = documentBody.getByText(/Willkommen beim BookMonkey/i);
    expect(textElement).toBeInTheDocument();
  })
})

describe('<App /> with Routing', () => {
  const helper = async (route: string, text: string, needsAxios = false): Promise<void> => {
    if (needsAxios) mockAxios();
    let documentBody: RenderResult
    console.log('before act')
    act(async () => {documentBody = render(<App />, {route})}).then(() => {
      console.log('in act')
      if (documentBody) {
        const linkElement = documentBody.getByText(new RegExp(text, 'i'));
        expect(linkElement).toBeInTheDocument();
      }
    })
  }

  test('navigate to BookCreate', () => {
    const documentBody = render(<App />, {route: '/books/create'})
    const linkElement = documentBody.getByText(/Buch anlegen/i);
    expect(linkElement).toBeInTheDocument();
  })

  // @todo, fix UnhandledPromiseRejection
  // test('navigate to BookEdit', () => {
  //   helper('/books/edit/9783864906466', 'Buch editieren', true)
  // })

  // test('navigate to BookDetails', () => {
  //   helper('/books/9783864906466', 'Book Details', true)
  // })

  // test('navigate to BookList', () => {
  //   helper('/books', 'Book List', true)
  // })

  // test('navigate to Cart', () => {
  //   helper('/cart', 'Shopping Cart', true)
  // })

  // test('navigate to Home', () => {
  //   helper('/home', 'Willkommen beim BookMonkey')
  // })
})
