import styled from 'styled-components';
import Title from '../components/common/Title';
import BooksFilter from '../components/books/BooksFilter';
import BooksList from '../components/books/BooksList';
import BooksEmpty from '../components/books/BooksEmpty';
import Pagination from '../components/books/Pagination';
import BooksViewSwitcher from '../components/books/BooksViewSwitcher';
import { useBooks } from '../hooks/useBooks';
import Loading from '@/components/common/Loading';

function Books() {
  const {books, pagination, isEmpty, isBooksLoading} = useBooks();

  // console.log(isBooksLoading) // 처음에 true였다가 로딩이 완료되면 false로 바뀜

  if(isEmpty) {
    return <BooksEmpty />;
  }

  if(!books || !pagination || isBooksLoading) {
    return <Loading />
  }

  return (
    <>
      <Title size='large'>도서 검색 결과</Title>
      <BooksStyle>
        <div className="filter">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>
        <BooksList books={books} />
        <Pagination pagination={pagination}/>
      </BooksStyle>
    </>
  )
}

const BooksStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  .filter {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    align-items: center;
  }
`;

export default Books;