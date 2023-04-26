import { NAV_URL } from '@env';

type ScreenName = 'ShopInfo';

export interface NavItem {
  id: string;
  title: string;
  image: string;
  view: ScreenName;
}

export const navData: NavItem[] = [
  {
    id: '1',
    title: '주변 랜덤 음식점',
    image: NAV_URL,
    view: 'ShopInfo',
  },
];
