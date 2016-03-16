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
        <IdButton onClickAscend={this.handleAscend.bind(this)} onClickDescend={this.handleDescend.bind(this)} />
        <NameButton onClickAscend={this.handleAscend.bind(this)} onClickDescend={this.handleDescend.bind(this)} />
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

class IdButton extends Component {
  ascend() {
    this.props.onClickAscend('id');
  }
  descend() {
    this.props.onClickDescend('id');
  }
  render() {
    return (
      <div>
        <span style={{marginRight: '8px', fontSize: '12px'}}>Keyでソート:</span>
        <button onClick={this.ascend.bind(this)}>昇順</button>
        <button onClick={this.descend.bind(this)}>降順</button>
      </div>
    );
  }
}
IdButton.propTypes = {
  onClickAscend: React.PropTypes.func.isRequired,
  onClickDescend: React.PropTypes.func.isRequired
}

class NameButton extends Component {
  ascend() {
    this.props.onClickAscend('name');
  }
  descend() {
    this.props.onClickDescend('name');
  }
  render() {
    return (
      <div>
        <span style={{marginRight: '8px', fontSize: '12px'}}>Valueでソート:</span>
        <button onClick={this.ascend.bind(this)}>昇順</button>
        <button onClick={this.descend.bind(this)}>降順</button>
      </div>
    );
  }
}
NameButton.propTypes = {
  onClickAscend: React.PropTypes.func.isRequired,
  onClickDescend: React.PropTypes.func.isRequired
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
