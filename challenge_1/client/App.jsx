import { hot } from 'react-hot-loader/root';
import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchTerm = ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({searchTerm: event.target.searchTerm})
  }

  handleSubmit(event) {
    alert('Searching for ' + this.state.value);
    event.preventDefault();
  }
}
export default hot(App);

