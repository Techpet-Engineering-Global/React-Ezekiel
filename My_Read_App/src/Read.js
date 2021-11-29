import React, {Component} from 'react';
import PropTypes from 'prop-types';

import BookComponent from './Books';

class Read extends Component {

    // defining proptypes as a static property
    static propTypes = {
            read: PropTypes.array.isRequired,
            updateBook: PropTypes.func.isRequired,
            shelf: PropTypes.string.isRequired,
    }

    render() {
        const {read, updateBook, shelf} = this.props;

        return (
            <div className="bookshelf">

            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
            <ol className="books-grid">
            {read.filter((n, index) => read.indexOf(n) === index).map((book) => {
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

export default Read