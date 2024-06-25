import { Banner } from '@/models/banner.mode';
import { requestHandler } from './http';

export const fetchBanners = async () => {
  return await requestHandler<Banner[]>('get', '/banners');
}