import { Book, BookDetail } from '../models/book.model';
import { Pagination } from '../models/pagination.model';
import { httpClient } from './http';

interface FetchBooksParams {
  category_id?: number;
  news?: boolean;
  currentPage?: number;
  limit: number;
}

interface FetchBooksResponse {
  books: Book[];
  pagination: Pagination;
}

export const fetchBooks = async (params: FetchBooksParams) => {
  try {
    const reponse = await httpClient.get<FetchBooksResponse>("/books", {
    params: params
    })

    return reponse.data;
  } catch (error) {
    return {
      books: [],
      pagination: {
        totalCount: 0,
        currentPage: 1
      }
    }
  }
}

export const fetchBook = async (bookId: string) => { // route에서 아이디를 받아와 스트링으로 처리
  const response = await httpClient.get<BookDetail>(`/books/${bookId}`);
  return response.data;
}

export const likeBook = async (bookId: number) => {
  const reponse = await httpClient.post(`/likes/${bookId}`);
  return reponse.data;
}

export const unLikeBook = async (bookId: number) => {
  const reponse = await httpClient.delete(`/likes/${bookId}`);
  return reponse.data;
}