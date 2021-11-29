import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

import BookComponent from './Books'

class SearchBooks extends Component {

    static propTypes = {
        updateBook: PropTypes.func.isRequired,
        shelf: PropTypes.string.isRequired,
        searchResults: PropTypes.array.isRequired,
        query: PropTypes.string.isRequired,
        searchedBooks: PropTypes.func.isRequired,
        book: PropTypes.object.isRequired
    }

    static defaultProps = {
        searchResults: [],
    }

    render () {
        const {updateBook,
            shelf, 
            searchResults, 
            query,
            searchedBooks}= this.props;

        let Books;
        if (query !== '') {
            // escapes the special syntax and is not case sensitive
            const match = new RegExp(escapeRegExp(query), 'i');

            // assigning showingContacts to a filtered array matching 
            // the name of the contacts that contains the searched query 
            Books = searchResults.filter((book) => match.test(book.title));
        }
        else {
            Books = searchResults;
        }

        Books.sort(sortBy('title'));
        
        return (
            <div className="search-books">
        <div className="search-books-bar">
            <Link to="/" className="close-search">
                Close
            </Link>
            <div className="search-books-input-wrapper">
                <input type="text" 
                placeholder="Search by title or author" 
                value={query}
                onChange={(event) => searchedBooks(event.target.value)}/>

            </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid"></ol>
            </div>
        

        <ol className="books-grid">
        {searchResults.length === 0 ? (
                <div >
                    <h1>Your query has returned 0 result</h1>
                </div>
            ) :
            (searchResults.map((book, index) => {
                return (
                    <BookComponent
                    key={index}
                    updateBook={updateBook}
                    book={book}
                    shelf={shelf}>
        
                    </BookComponent>
                )
            }))}
            
        </ol>
    </div>
    
        )
    }
}

export default SearchBooks;