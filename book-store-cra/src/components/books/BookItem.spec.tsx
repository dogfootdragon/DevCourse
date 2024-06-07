import React from 'react';
import { render } from '@testing-library/react';
import BookItem from './BookItem';
import { Book } from '../../models/book.model';
import { BookStoreThemeProvider } from '../../context/themeContext';

const dummyBook: Book = {
  id: 1,
  title: "Dummy book",
  img: 5,
  category_id: 1,
  summary: "Dummy Summary",
  author: "Dummy Author",
  price: 10000,
  likes: 1,
  form: "paperback",
  isbn: "Dummy ISBN",
  detail: "Dummy Detail",
  pages: 100,
  contents: "Dummy Contents",
  pubDate: "2021-01-01"
}

describe("BookItem", () => {
  it('렌더 여부 확인', () => {
    const {getByText} = render (
      <BookStoreThemeProvider>
        <BookItem book={dummyBook}/>
      </BookStoreThemeProvider>
    )

    expect(getByText(dummyBook.title)).toBeInIheDoument();
    expect(getByText(dummyBook.summary)).toBeInIheDoument();
    expect(getByText(dummyBook.author)).toBeInIheDoument();
    expect(getByText('10,000원')).toBeInIheDoument();
    // expect(getByAltText(dummyBook.title)).toHaveAttribute("src", `https://picsum.photos/id/${dummyBook.img}/600/600`)
  })
})