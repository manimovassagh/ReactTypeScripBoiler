import {books} from './test-utils';
import {reducer} from '../../Store'

describe('test reducer function', () => {
  test('add book on empty cart', () => {
    const newStore = reducer({cart: []}, {type: 'addToCart', book: books[0]})
    expect(newStore.cart.length).toBe(1)
  })

  test('add same book on non-empty cart', () => {
    const newStore = reducer({cart: [books[0]]}, {type: 'addToCart', book: books[0]})
    expect(newStore.cart.length).toBe(2)
  })

  test('remove same book on non-empty store', () => {
    const newStore = reducer({cart: [books[0]]}, {type: 'removeFromCart', book: books[0]})
    expect(newStore.cart.length).toBe(0)
  })

  test('remove same book on non-empty store', () => {
    const newStore = reducer({cart: [books[0], books[0]]}, {type: 'removeFromCart', book: books[0]})
    expect(newStore.cart.length).toBe(1)
  })

  test('remove non-existing book on empty store', () => {
    const newStore = reducer({cart: []}, {type: 'removeFromCart', book: books[0]})
    expect(newStore.cart.length).toBe(0)
  })
})
