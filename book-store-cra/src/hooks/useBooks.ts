import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import { Book } from '../models/book.model';
import { Pagination } from '../models/pagination.model';
import { fetchBooks } from '../api/books.api';
import { QUERYSTRING } from '../constants/querystring';
import { LIMIT } from '../constants/pagination';

export const useBooks = () => {
  const location = useLocation();

  const [books, setBooks] = useState<Book[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    totalCount: 0,
    currentPage: 1
  })

  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    console.log('params', params.get('category_id'))

    fetchBooks({
      category_id: params.get(QUERYSTRING.CATEGORY_ID) ? Number(params.get(QUERYSTRING.CATEGORY_ID)) : undefined,
      news: params.get(QUERYSTRING.NEWS) ? true : undefined,
      currentPage: params.get('page') ? Number(params.get(QUERYSTRING.PAGE)) : 1,
      limit: LIMIT,
    }).then((res) => {
      setBooks(res.books);
      setPagination(res.pagination);
      setIsEmpty(res.books.length === 0);
    })
  }, [location.search]);

  return { books, pagination, isEmpty };
}