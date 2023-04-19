import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { ApolloModule, Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookCreateEditComponent } from './book-create-edit/book-create-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookCreateEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ApolloModule,
    HttpLinkModule,
    AppRoutingModule
  ],
  // providers: [{
  //   provide: APOLLO_OPTIONS,
  //   useFactory(httpLink: HttpLink) {
  //     return {
  //       cache: new InMemoryCache(),
  //       link: httpLink.create({
  //         uri: "http://localhost:4000/graphql"
  //       })
  //     }
  //   },
  //   deps: [HttpLink]
  // }],
  bootstrap: [AppComponent]
})
export class AppModule {

  // 1. Establish a connection with a graphql server
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({ uri: 'http://localhost:4000/graphql' }),
      cache: new InMemoryCache()
    });
  }
}
