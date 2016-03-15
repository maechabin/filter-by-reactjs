import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: null,
      data: props.data
    };
  }
  handleValKeyUp(val) {
    let line = this.props.data.filter((item, index) => {
      if ((item.id.toString()).indexOf(val) >= 0 || (item.name).indexOf(val) >= 0) {
        return true;
      }
    });
    this.setState({
      data: line
    });
  }
  render() {
    let list = this.state.data.map((data) => {
      return (
        <li key={data.id}>
          {data.id}: {data.name}
        </li>
      );
    });
    return (
      <div>
        <Form onValKeyUp={this.handleValKeyUp.bind(this)} />
        <ul>
          {list}
        </ul>
      </div>
    );
  }
}

class Form extends Component {
  search() {
    let val = this.refs.myinput.value;
    this.props.onValKeyUp(val);
  }
  render() {
    return (
      <input type='text' value={this.props.text} ref='myinput' onKeyUp={this.search.bind(this)} />
    );
  }
}

var data = [
  {id: 1, name: 'foo'},
  {id: 2, name: 'bar'},
  {id: 3, name: 'baz'}
];

render(
  <App data={data} />, document.querySelector('.content')
);
