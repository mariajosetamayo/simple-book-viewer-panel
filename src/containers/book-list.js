import React, {Component} from 'react';
import { connect } from 'react-redux';
import {selectBook} from '../actions/index';
import {bindActionCreators} from 'redux';


class BookList extends Component {
  renderList(){
    return this.props.books.map((book) => {
      return(
        <li
          key={book.title}
          onClick={() => this.props.selectBook(book)}
          className="list-group-item">
          {book.title}
        </li>
      );
    });
  }

  render(){
    return (
      <ul className = "list-group col-sm-4">
        {this.renderList()}
      </ul>
    )
  }
}

//// IMPORTANT!!! THIS FUNCTION IS THE GLUE BETWEEN REACT AND REDUX
function mapStateToProps(state){ //this is used to make the link of containers between react and redux
  // whatever is returned will show up ad props inside of BookList container
  return{
    books: state.books
  };
};

//anything returned from this function will end up as props on the BookList container
function mapDispatchToProps(dispatch){
  //whenever selectBook is called, the results hould be pass to all of pur reducers.
  return bindActionCreators({selectBook: selectBook}, dispatch); //dispatch is like a funnel that makes sure that actions get to all reducers
}

// Promote BookList from a component to a container-- it need to know about this new dispatch method, selectBook. Make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(BookList);
