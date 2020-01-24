import { Injectable } from '@angular/core';
import { ShortLinkInterface } from './../interfaces/short-link.interface';
const ITEM_NAME = 'shotlink_urls';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  store(data: ShortLinkInterface[]): void {
    localStorage.setItem(ITEM_NAME, JSON.stringify(data));
  }

  list(): ShortLinkInterface[] {
    const data = localStorage.getItem(ITEM_NAME);

    return JSON.parse(data || '[]');
  }
}
