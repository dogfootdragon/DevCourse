import { useEffect, useState } from 'react'
import { BookDetail, BookReviewItem, BookReviewItemWrite } from '../models/book.model';
import { fetchBook, likeBook, unLikeBook } from '../api/books.api';
import { useAuthStore } from '../store/authStore';
import { useAlert } from './useAlert';
import { addCart } from '../api/carts.api';
import { addBookReview, fetchBookReview } from '@/api/review.api';

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<BookDetail | null>(null);
  const {isloggedIn} = useAuthStore();
  const {showAlert} = useAlert();
  const [cartAdded, setCartAdded] = useState(false);
  const [reviews, setReview] = useState<BookReviewItem[]>([]);

  const likeToggle = () => {
    // 권한 확인 (로그인 여부 확인)
    if(!isloggedIn) {
      showAlert('로그인이 필요합니다.');
      return; // 아래 프로세스를 진행하지 않기 위해 바로 리턴
    }

    if(!book) return;

    if(book.liked) {
      // 라이크 상태 -> 언라이크 실행
      unLikeBook(book.id).then(() => {
        setBook({
          ...book,
          liked: false,
          likes: book.likes - 1
        })
      })
    } else {
      // 언라이크 상태 -> 라이크 실행
      likeBook(book.id).then(() => {
        // 성공 처리
        setBook({
          ...book,
          liked: true,
          likes: book.likes + 1
        })
      })
    }
  }

  const addToCart = (quantity: number) => {
    if(!book) return;
    addCart({
      book_id: book.id,
      quantity: quantity
    }).then(() => {
      setCartAdded(true);
      setTimeout(() => {
        setCartAdded(false);
      }, 3000);
    })
  }

  useEffect(() => {
    if (!bookId) return; // undefind가 들어올수도 있어 아래 bookId에러. 해당사항 예외처리해준다

    fetchBook(bookId).then((book) => {
      setBook(book);
    })

    fetchBookReview(bookId).then((reviews) => {
      setReview(reviews);
    })
  }, [bookId])

  const addReview = (data: BookReviewItemWrite) => {
    if(!book) return;

    addBookReview(book.id.toString(), data).then((res) => {
      // fetchBookReview(book.id.toString()).then((reviews) => {
      //   setReview(reviews);
      // })
      showAlert(res.message);
    })
  }

  return {book, likeToggle, addToCart, cartAdded, reviews, addReview};
}