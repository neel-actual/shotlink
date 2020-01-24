import { Injectable } from '@angular/core';
import { ShortLinkInterface } from './../interfaces/short-link.interface';
const ITEM_NAME = 'shotlink_urls';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  store(data: ShortLinkInterface[]): void {
    const store = (data || []).map((item) => {
      return {
        id: item.id,
        link: item.link,
        created: item.created,
        long_url: item.long_url
      };
    });

    localStorage.setItem(ITEM_NAME, JSON.stringify(store));
  }

  list(): ShortLinkInterface[] {
    const data = localStorage.getItem(ITEM_NAME);

    return JSON.parse(data || '[]');
  }
}
