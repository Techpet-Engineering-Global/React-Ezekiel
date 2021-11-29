import React, {Component} from 'react';
import PropTypes from 'prop-types';

import BookComponent from './Books';

class CurrentlyReading extends Component {

    // defining proptypes as a static property
    static propTypes = {
            current: PropTypes.array.isRequired,
            updateBook: PropTypes.func.isRequired,
            shelf: PropTypes.string.isRequired,
        }

    render() {
        const {current, updateBook, shelf} = this.props;

        return (
            <div className="bookshelf">

            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
            <ol className="books-grid">
            {current.filter((n, index) => current.indexOf(n) === index).map((book) => {
            return (
                <BookComponent
                key={book.id}
                book={book}
                updateBook={updateBook}
                shelf={shelf}>

                </BookComponent>
            )}
        )}
            </ol>
            </div>
            </div>
        )
    }
}

export default CurrentlyReading; 