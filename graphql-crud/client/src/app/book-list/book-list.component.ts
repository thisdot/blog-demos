import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import gql from 'graphql-tag';

import { Book, BooksQuery } from './../types';
import { getBooksQuery } from './../queries';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  private querySubscription: Subscription;
  books: Book[];

  @Output()
  bookSelected = new EventEmitter<Book>();

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.querySubscription = this.apollo.watchQuery<BooksQuery>({
      query: getBooksQuery
    })
    .valueChanges
   .subscribe(({ data }) => {
      this.books = data.books;
    });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

  selectBook(book: Book): void {
    this.bookSelected.emit(book);
  }

}