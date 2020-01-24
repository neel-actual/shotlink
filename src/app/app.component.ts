import { Component } from '@angular/core';
import {MatDialog} from '@angular/material';
import {LinkDialogComponent} from './link-dialog/link-dialog.component';
import { ShortenerService } from './services/shortener.service';
import { LocalStorageService } from './services/local-storage.service';
import {ShortLinkInterface} from './interfaces/short-link.interface';
import {
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate('500ms ease-in',
      style({ opacity: 1 }))
    ]
  ),
  transition(':leave',
    [style({
      opacity: 1
    }), animate('300ms ease-out',
      style({ opacity: 0 }))
    ]
  )
]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [fadeAnimation]
})
export class AppComponent {
  loading: string[] = [];
  list: ShortLinkInterface[] = [];

  constructor(public dialog: MatDialog, public shortenerService: ShortenerService, public localStorageService: LocalStorageService) {
    this.list = localStorageService.list();
  }

  openLinkAdd(evt): void {
    const dialogRef = this.dialog.open(LinkDialogComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.url) { this.addLink(result.url); }
    });
  }

  addLink(url) {
    this.loading.push(url);
    this.shortenerService.shorten(url).subscribe((data: ShortLinkInterface) => {
      this.loading.pop();
      data.created = new Date(data.created_at).toLocaleDateString();
      this.list.unshift(data);
      this.localStorageService.store(this.list);
    });
  }

  copyUrl(url) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = url;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  deleteUrl(index) {
    this.list.splice(index, 1);
    this.localStorageService.store(this.list);
  }

  preventAccordion(evt) {
    evt.stopPropagation();
  }
}
