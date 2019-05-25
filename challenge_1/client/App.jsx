import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Results from './results'
import ReactPaginate from 'react-paginate';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      searchResults: [],
      pageCount: '',
      offset: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    alert('Searching for ' + this.state.value);
    var query = '/events?q=' + this.state.value;
    fetch(`http://localhost:3000${query}`)
    .then(response =>
      response.json()
    )
    .then(data => {
      var fifth = data.length / 5;
      var split = Number.parseInt(fifth);
      this.setState({
        searchResults: data,
        pageCount: split
      });
    })
    event.preventDefault();
  }

  handlePageClick(data) {
    let selected = data.selected;
    let offset = Math.ceil(selected * 10);
    this.setState({ offset: offset });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Input a historical event:
            <input type='text' value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type='submit' value='Submit' />
        </form>
        {this.state.searchResults.length > 0 &&
        <div>
          <Results results={this.state.searchResults} subset={this.state.offset} />
          <ReactPaginate
            pageCount={this.state.pageCount}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            onPageChange={this.handlePageClick}
          />
        </div>
        }
      </div>
    )
  }
}
export default hot(App);

