import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { Book, Author, AuthorsQuery } from '../types';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { getAuthorsQuery, addBookMutation, getBooksQuery, updateBookMutation, deleteBookMutation } from '../queries';

@Component({
  selector: 'app-book-create-edit',
  templateUrl: './book-create-edit.component.html',
  styleUrls: ['./book-create-edit.component.scss']
})
export class BookCreateEditComponent implements OnInit, OnChanges {

  @Input()
  set book(value: Book) {
    if (!value) return;
    
    this.model.id = value.id;
    this.model.name = value.name;
    this.model.genre = value.genre;
    this.model.authorId = value.author.id;

    this.isNew = false;
  };

  @ViewChild('f') bookForm;

  private isNew = true;
  private querySubscription: Subscription;
  authors: Author[];

  title: string;

  model = {
    id: '',
    name: '',
    genre: '',
    authorId: ''
  }

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.querySubscription = this.apollo.watchQuery<AuthorsQuery>({
      query: getAuthorsQuery
    })
    .valueChanges
   .subscribe(({ data }) => {
      this.authors = data.authors;
    });

    this.reset();
  }

  ngOnChanges(simple: SimpleChanges): void {
    if (simple.book.currentValue) {
      this.title = "Edit existing book";
    } else {
      this.reset();
    }
  }

  reset(): void {
    this.title = "Add a new book";
    this.isNew = true;
    this.model = {
      id: '',
      name: '',
      genre: '',
      authorId: ''
    };

    this.bookForm.resetForm();
  }

  enableDelete(): boolean {
    return this.model && this.model.id && this.model.id !== '';
  }

  delete(): void {
    if (confirm('Are you sure you want to delete this book?')) {
      // delete
      this.apollo.mutate({
        mutation: deleteBookMutation,
        variables: { id: this.model.id },
        refetchQueries: [{
          query: getBooksQuery
        }]
      })
      .subscribe( (data: any) => {
        // console.log(`${msg}:\n -Id (${id}) \n -Name (${name})`);
      });

      this.reset();
    }
  }

  onSave(): void {

    let variables = {};
    let mutation = {};
    let msg = "";

    if (this.model.id) {
      // update
      variables = {
        id: this.model.id,
        name: this.model.name,
        genre: this.model.genre,
        authorId: this.model.authorId
      };
      mutation = updateBookMutation;
      msg = "Book updated";
    } else {
      // create
      variables = {
        name: this.model.name,
        genre: this.model.genre,
        authorId: this.model.authorId
      };
      mutation = addBookMutation;
      msg = "Book Added";
    }

    this.apollo.mutate({
      mutation: mutation,
      variables:variables,
      refetchQueries: [{
        query: getBooksQuery
      }]
    })
    .pipe(
      map ( results => mutation === updateBookMutation ? results.data['updateBook'] : results.data['addBook'] )
    )
    .subscribe( ({ id, name }) => {
      console.log(`${msg}:\n -Id (${id}) \n -Name (${name})`);
    });

    this.reset();
  }
  
}
