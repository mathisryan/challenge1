import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Results from './results'
import ReactPaginate from 'react-paginate';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
      pageCount: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({searchTerm: event.target.searchTerm})
  }

  handleSubmit(event) {
    alert('Searching for ' + this.state.value);
    var query = '/posts?q=' + this.state.value;
    fetch(`localhost:3000?Get${query}`)
    .then(results => {
      console.log('RESULTS', results);
      this.setState({
        searchResults: results,
        pageCount: results.length / 5
      });
    })
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Input a historical event:
            <input type='text' value={this.state.searchTerm} onChange={this.handleChange} />
          </label>
          <input type='submit' value='Submit' />
        </form>
        <Results results={this.state.searchResults} />
        {this.state.searchResults.length > 0 &&
          <ReactPaginate
            pageCount={this.props.pageCount}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
          />
        }
      </div>
    )
  }
}
export default hot(App);

