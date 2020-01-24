import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {ShortLinkInterface} from '../interfaces/short-link.interface';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShortenerService {

  constructor(private http: HttpClient) { }

  shorten(url: string): Observable<ShortLinkInterface> {
    // @ts-ignore
    return this.http.get(environment.server_url + '?url=' + url);
  }
}
