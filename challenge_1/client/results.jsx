import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function Results(props) {
  var selected = props.results.slice(props.subset, (props.subset + 10));
  var details = selected.map((item, index) => {
    return <tr key={index}>
      <td>{item.category2}</td>
      <td>{item.description}</td>
      <td>{item.date}</td>
    </tr>
  })
  return (
    props.results.length > 0 &&
      <table>
        <caption>Search Results</caption>
          <thead>
            <tr>
              <th>Location</th>
              <th>Event</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {details}
          </tbody>
      </table>
  )
}

export default hot(Results);