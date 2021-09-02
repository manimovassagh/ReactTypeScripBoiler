import React from 'react'
import {render, act, getNodeText, RenderResult, books, matchSnapshot} from './test-utils';
import Cart from '../Cart'
// import {screen} from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

describe('BookDetails rendering and button clicks', () => {
  let documentBody: RenderResult
  beforeEach(async () => {
    await act(async () => {documentBody = render(<Cart />, {store: {cart: [books[0]]}})})
    // screen.debug()
  })

  test('renders', () => {
    expect(documentBody.getByText(/Shopping Cart/i)).toBeInTheDocument();
  })

  test('matches snapshot', () => matchSnapshot(documentBody));

  test('counter goes up', () => {
    const counter = documentBody.getByTestId(/count-target/i)
    expect(getNodeText(counter)).toBe("1")
    userEvent.click(
      documentBody.getByText(/Add One/i)
    )
    expect(getNodeText(counter)).toBe("2")
  })

  test('counter goes down', () => {
    userEvent.click(
      documentBody.getByText(/Remove One/i)
    )
    expect(documentBody.queryAllByTestId(/count-target/i).length).toBe(0)
  })
})
