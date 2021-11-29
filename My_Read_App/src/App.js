import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import CurrentlyReading from './Reading';
import Read from './Read';
import WantToRead from './WantTo';
import SearchBooks from './Search'
import './App.css'

import {getAll, update, search} from './Api/BooksAPI';

class BooksApp extends Component {
  state = {
    books: [],
    book: {},
    current: [],
    read: [],
    wantToRead: [],
    searchResults: [],
    shelf: '',
    query: ''
  };

// fetching data from an api using componentDidMount

componentDidMount() {
    this.fetchAllBooks();
}

// function to fetch All Books
async fetchAllBooks() {
  console.log("Ambience BooksApp fetchAllBooks called " )
  await getAll().then((books) => {
      this.setState({ 
        // Setting the initial state of book shelves by filtering the book.shelf attribute
        books: books,
        current: books.filter(book => book.shelf === 'currentlyReading'),
        wantToRead: books.filter(book => book.shelf === 'wantToRead'),
        read: books.filter(book => book.shelf === 'read'),
        
      })
  })
}

  // function to update shelf
  updateBook = (book,shelf) => {
    update(book, shelf).then(() => {
		console.log("Ambience updateBook : "  + book.title + "  " + shelf + book.shelf)
    this.setState({
      shelf: book.shelf
    })
      if(shelf === 'currentlyReading') {
        return this.setState( {
          wantToRead: this.state.wantToRead.filter((b) => b.id !== book.id),
          read: this.state.read.filter((b) => b.id !== book.id),
          current: this.state.current.concat([book]),
        });
      }
      else if(shelf === 'read') {
        return this.setState( {
          read: this.state.read.concat([book]),
          wantToRead: this.state.wantToRead.filter((b) => b.id !== book.id),
          current: this.state.current.filter((b) => b.id !== book.id),
        });
      }
      else if(shelf === 'wantToRead') {
        return this.setState( {
          wantToRead: this.state.wantToRead.concat([book]),
          current: this.state.current.filter((b) => b.id !== book.id),
          read: this.state.read.filter((b) => b.id !== book.id),
        });
      }
      return this.setState({
        book: this.state.books,
      })
    })
	};

// function to return searched books 
searchedBooks = (query) => {
  console.log("Ambience updateBook : "  + query)
  search(query).then((results)=>{
    if(results.length === undefined) {
        return this.setState({
          searchResults : []
    })
      }
    else {
      return this.setState({
        searchResults: results
      })
    }
  }).catch(err => {
    this.clearQuery();
    return this.setState({
      searchResults : []
    })
  })
  if (query !== '') {
    this.updatedQuery(query);
  }
  else {
    this.clearQuery()
  }
  }

  // updating the value of query using setState()
  updatedQuery = (query) => {
      this.setState({query: query.trim()})
  }

  clearQuery = () => {
    this.setState({query: ''})
}


  render() {

    return (
      <div className="app">
        {/* Using routes to navigate different url using component */}
        <Route exact path="/" render={() =>{
          return(
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <CurrentlyReading
                current={this.state.current}
                updateBook={this.updateBook}
                shelf={'currentlyReading'}
                book={this.state.book}></CurrentlyReading>
                <WantToRead
                wantToRead={this.state.wantToRead}
                updateBook={this.updateBook}
                shelf={'wantToRead'}
                book={this.state.book}></WantToRead>
                <Read
                read={this.state.read}
                updateBook={this.updateBook}
                shelf={'read'}
                book={this.state.book}></Read>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>
                <button>
                Add A Book
                </button>
              </Link>
          </div>
          </div>
          )}}></Route>

        <Route exact path="/search" render={({history}) =>{
            return(
              <SearchBooks
              searchResults={this.state.searchResults}
              updateBook={this.updateBook}
              shelf={this.state.shelf}
              book={this.state.book}
              query={this.state.query}
              searchedBooks={this.searchedBooks}
              ></SearchBooks>
          )}}></Route> 

        
      </div>
    )
  }
}

export default BooksApp
