import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function Results(props) {
  var details = props.results.map(function(category2, description, date) {
    return <tr>
      <td>{category2}</td>
      <td>{description}</td>
      <td>{date}</td>
    </tr>
  })
  return (
    props.results.length > 0 &&
      <table>
        <caption>Search Results</caption>
          <tr>
            <th>Location</th>
            <th>Event</th>
            <th>Date</th>
          </tr>
          <tbody>
            {details}
          </tbody>
      </table>
  )
}

export default hot(Results);