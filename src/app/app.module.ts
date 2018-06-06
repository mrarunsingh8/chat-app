import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatInputModule, MatAutocompleteModule} from '@angular/material';

import { route } from './app.routes';
import { HomeComponent } from './home/home.component';
import { SideListComponent } from './layout/side-list/side-list.component';
import { ChatBoxComponent } from './layout/chat-box/chat-box.component';
import { LoginComponent } from './login/login.component';
import { IsTypingDirective } from './directive/istyping.directive';
import { LastSeenPipe } from './conf/lastSeenPipe/last-seen.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    HomeComponent,
    SideListComponent,
    ChatBoxComponent,
    LoginComponent,
    IsTypingDirective,
    LastSeenPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(route),
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
