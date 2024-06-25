import { BookReviewItem } from '@/models/book.model';
import {http, HttpResponse} from 'msw';
import {fakerKO as faker} from '@faker-js/faker';
import { Banner } from '@/models/banner.mode';

const bannersData: Banner[] = [
  {
    id: 1,
    title: '배너1 제목',
    description: 'Banner1 description',
    image: 'https://picsum.photos/id/111/1200/400',
    url: "http://some.url",
    target: '_blank'
  },
  {
    id: 2,
    title: '배너2 제목',
    description: 'Banner2 description',
    image: 'https://picsum.photos/id/222/1200/400',
    url: "http://some.url",
    target: '_blank'
  },
  {
    id: 3,
    title: '배너3 제목',
    description: 'Banner3 description',
    image: 'https://picsum.photos/id/33/1200/400',
    url: "http://some.url",
    target: '_blank'
  },
  {
    id: 4,
    title: '배너4 제목',
    description: 'Banner4 description',
    image: 'https://picsum.photos/id/4/1200/400',
    url: "http://some.url",
    target: '_blank'
  }
]

export const banners = http.get('http://localhost:9999/banners', () => {
  return HttpResponse.json(bannersData, {
    status: 200
  })
})