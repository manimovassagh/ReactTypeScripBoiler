import React from 'react'
import {render, fireEvent, act, mockAxios, RenderResult, matchSnapshot} from './test-utils';
import App from '../App'

describe('BookDetails rendering and button clicks', () => {
  let documentBody: RenderResult
  beforeEach(async () => {
    mockAxios()
    await act(async () => {documentBody = render(<App />, {route: '/books/8783864906466'})})
  })

  test('matches snapshot', () => matchSnapshot(documentBody));

  test('renders', () => {
    expect(documentBody.getByText(/Book Details/i)).toBeInTheDocument();
  })

  test('click on "Delete" and redirect to Book List', async () => {
    await act(async () => {fireEvent.click(documentBody.getByText(/Delete/i))})
    expect(documentBody.getByText(/Book List/i)).toBeInTheDocument();
  })

  test('click on "Back" and redirect to Book List', async () => {
    await act(async () => {fireEvent.click(documentBody.getByText(/Back/i))})
    expect(documentBody.getByText(/Book List/i)).toBeInTheDocument();
  })

  test('click on "Add To Cart" and stay on Book Details', async () => {
    await act(async () => {fireEvent.click(documentBody.getByText(/Add To Cart/i))})
    expect(documentBody.getByText(/Book Details/i)).toBeInTheDocument();
  })
})
