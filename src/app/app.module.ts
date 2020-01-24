import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule, MatExpansionModule, MatListModule, MatProgressBarModule
} from '@angular/material';
import { LinkDialogComponent } from './link-dialog/link-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { environment } from '../environments/environment';
import {ShortenerService} from './services/shortener.service';

@NgModule({
  declarations: [
    AppComponent,
    LinkDialogComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatListModule,
    MatProgressBarModule
  ],
  providers: [ShortenerService],
  bootstrap: [AppComponent],
  entryComponents: [LinkDialogComponent]
})
export class AppModule { }
