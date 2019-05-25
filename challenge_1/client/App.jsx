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
    console.log('Searching for ' + this.state.value);
    var query = '/events?q=' + this.state.value + '&_start=1&_limit=10';
    fetch(`http://localhost:3000${query}`)
    .then(function(response){
      var total = response.headers.get('X-Total-Count');
      var fifth = Number.parseInt(total) / 5;
      var split = Number.parseInt(fifth);
      this.setState({
        pageCount: split
      });
      return response.json()
    }.bind(this))
    .then(function(data){
      this.setState({
        searchResults: data,
      });
    }.bind(this))
    event.preventDefault();
  }

  handlePageClick(data) {
    let selected = data.selected;
    let offset = Math.ceil(selected * 10);
    var query = '/events?q=' + this.state.value + `&_start=${offset}&_limit=10`;
    fetch(`http://localhost:3000${query}`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      this.setState({
        searchResults: data,
      });
    })
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Input a search term:
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

