import { fetchBanners } from '@/api/banner.api';
import { fetchBestBooks, fetchBooks } from '@/api/books.api';
import { fetchReviewAll } from '@/api/review.api';
import { Banner } from '@/models/banner.mode';
import { Book, BookReviewItem } from '@/models/book.model';
import { useEffect, useState } from 'react'

export const useMain = () => {
  const [reviews, setReviews] = useState<BookReviewItem[]>([]);
  const [newBooks, setNewBooks] = useState<Book[]>([]);
  const [bestBooks, setBestBooks] = useState<Book[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    fetchReviewAll().then((reviews) => {
      setReviews(reviews);
    })

    // 신간 조회 서버쪽 코드에 문제있는듯 (포스트맨 조회도 안됨)
    // 같은 요청을 두 번 보내서 헤더 오류가 생기는 것 같음 추후 확인
    // fetchBooks({
    //   category_id: undefined,
    //   news: true,
    //   currentPage: 1,
    //   limit: 4
    // }).then(({books}) => {
    //   setNewBooks(books);
    // })

    fetchBestBooks().then((books) => {
      setBestBooks(books);
    })

    fetchBanners().then((banners) => {
      setBanners(banners);
    })
  }, []);

  return {reviews, newBooks, bestBooks, banners};
}