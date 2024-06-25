import { Book } from '@/models/book.model';
import styled from 'styled-components';
import BookItem from '../books/BookItem';

interface Props {
  books: Book[];
}

function MainNewBooks({books}: Props) {
  return (
    <MainNewBooksStyle>
      {
        books.map((book) => (
          <BookItem key={book.id} book={book} view='grid'/>
        ))
      }
    </MainNewBooksStyle>
  );
}

const MainNewBooksStyle = styled.div``;

export default MainNewBooks;