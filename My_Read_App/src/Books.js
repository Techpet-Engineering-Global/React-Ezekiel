import React, { Component } from 'react';
import PropTypes from 'prop-types'

class BookComponent extends Component {
    static propTypes = {
        book:PropTypes.object.isRequired,
        updateBook: PropTypes.func.isRequired,
        shelf: PropTypes.string.isRequired
    }
    render() {
        const {book, updateBook, shelf} = this.props;
        const placeholder = "http://via.placeholder.com/128x193?text=" + book.title;
        
        return (
            <li key={book.id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : placeholder})` }}></div>
                        <div className="book-shelf-changer">
                            <select value={shelf} onChange={(e)=>{updateBook(book, e.target.value);}} >
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                </div>
            </li>
        )
    }
}

export default BookComponent