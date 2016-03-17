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
      return item.id.toString().indexOf(val) >= 0 || item.name.toLowerCase().indexOf(val) >= 0;
    });
    this.setState({
      data: line
    });
  }
  handleAscend(key) {
    let line = this.state.data.sort((a, b) => {
      if(a[key] < b[key]) return -1;
      if(a[key] > b[key]) return 1;
      return 0;
    });
    this.setState({
      data: line
    });
  }
  handleDescend(key) {
    let line = this.state.data.sort((a, b) => {
      if(a[key] < b[key]) return 1;
      if(a[key] > b[key]) return -1;
      return 0;
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
        <SortButton onClickAscend={this.handleAscend.bind(this)} onClickDescend={this.handleDescend.bind(this)} />
        <ul>
          {list}
        </ul>
      </div>
    );
  }
}
App.propTypes = {
  data: React.PropTypes.array.isRequired
}

class Form extends Component {
  search() {
    let val = this.refs.myinput.value;
    this.props.onValKeyUp(val);
  }
  render() {
    return (
      <div>
        <span style={{marginRight: '8px', fontSize: '12px'}}>キーワードで絞り込む:</span>
        <input type='text' value={this.props.text} ref='myinput' onKeyUp={this.search.bind(this)} />
      </div>
    );
  }
}
Form.propTypes = {
  onValKeyUp: React.PropTypes.func.isRequired
}

class SortButton extends Component {
  sortByAscend(e) {
    e.preventDefault();
    this.props.onClickAscend(e.target.value);
  }
  sortByDescend(e) {
    e.preventDefault();
    this.props.onClickDescend(e.target.value);
  }
  render() {
    return (
      <div>
        <div>
          <span style={{marginRight: '8px', fontSize: '12px'}}>idでソート:</span>
          <button onClick={this.sortByAscend.bind(this)} value='id'>昇順</button>
          <button onClick={this.sortByDescend.bind(this)} value='id'>降順</button>
        </div>
        <div>
          <span style={{marginRight: '8px', fontSize: '12px'}}>nameでソート:</span>
          <button onClick={this.sortByAscend.bind(this)} value='name'>昇順</button>
          <button onClick={this.sortByDescend.bind(this)} value='name'>降順</button>
        </div>
      </div>
    );
  }
}
SortButton.propTypes = {
  onClickAscend: React.PropTypes.func.isRequired,
  onClickDescend: React.PropTypes.func.isRequired
}

var data = [
  {id: 1, name: 'foo'},
  {id: 2, name: 'bar'},
  {id: 3, name: 'baz'},
  {id: 4, name: 'qux'},
  {id: 5, name: 'quux'},
  {id: 6, name: 'foobar'}
];

render(
  <App data={data} />, document.querySelector('.content')
);
