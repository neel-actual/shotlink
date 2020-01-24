import { Component, Inject, HostListener } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-link-dialog',
  templateUrl: './link-dialog.component.html',
  styleUrls: ['./link-dialog.component.less']
})
export class LinkDialogComponent {
  // tslint:disable-next-line:max-line-length
  urlRegex: RegExp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
  urlInputControl = new FormControl('', [ Validators.pattern(this.urlRegex) ]);

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.urlInputControl.valid && this.urlInputControl.value) {
      this.addUrl();
    }
  }

  constructor(
    public dialogRef: MatDialogRef<LinkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  addUrl(): void {
    this.dialogRef.close({
      url: this.urlInputControl.value
    });
  }
}
