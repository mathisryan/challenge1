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
      pageCount: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      this.setState({
        searchResults: data,
        pageCount: data.length / 5
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
            <input type='text' value={this.state.value} onChange={this.handleChange} />
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

