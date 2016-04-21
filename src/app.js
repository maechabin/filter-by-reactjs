import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }
  handleFilterVal(val) {
    const line = this.props.data.filter((item) => (
      item.id.toString().indexOf(val) >= 0 || item.name.toLowerCase().indexOf(val) >= 0
    ));
    this.setState({
      data: line,
    });
  }
  handleSortByAscend(key) {
    const line = this.state.data.sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
    this.setState({
      data: line,
    });
  }
  handleSortByDescend(key) {
    const line = this.state.data.sort((a, b) => {
      if (a[key] < b[key]) return 1;
      if (a[key] > b[key]) return -1;
      return 0;
    });
    this.setState({
      data: line,
    });
  }
  render() {
    let list = this.state.data.map((data) => (
      <li key={data.id}>
        {data.id}: {data.name}
      </li>
    ));
    return (
      <div>
        <Form text={this.state.text} onFilterVal={this.handleFilterVal.bind(this)} />
        <SortButton
          onSortByAscend={this.handleSortByAscend.bind(this)}
          onSortByDescend={this.handleSortByDescend.bind(this)}
        />
        <ul>
          {list}
        </ul>
      </div>
    );
  }
}
App.propTypes = {
  data: React.PropTypes.array.isRequired,
};

class Form extends Component {
  _filterVal() {
    const val = this.refs.myinput.value;
    this.props.onFilterVal(val);
  }
  render() {
    return (
      <div>
        <span style={{ marginRight: '8px', fontSize: '12px' }}>キーワードで絞り込む:</span>
        <input defaultValue="" ref="myinput" onKeyUp={this._filterVal.bind(this)} />
      </div>
    );
  }
}
Form.propTypes = {
  onFilterVal: React.PropTypes.func.isRequired,
};

class SortButton extends Component {
  _sortByAscend(e) {
    e.preventDefault();
    this.props.onSortByAscend(e.target.value);
  }
  _sortByDescend(e) {
    e.preventDefault();
    this.props.onSortByDescend(e.target.value);
  }
  render() {
    return (
      <div>
        <div>
          <span style={{ marginRight: '8px', fontSize: '12px' }}>keyでソート:</span>
          <button onClick={this._sortByAscend.bind(this)} value="id">昇順</button>
          <button onClick={this._sortByDescend.bind(this)} value="id">降順</button>
        </div>
        <div>
          <span style={{ marginRight: '8px', fontSize: '12px' }}>valueでソート:</span>
          <button onClick={this._sortByAscend.bind(this)} value="name">昇順</button>
          <button onClick={this._sortByDescend.bind(this)} value="name">降順</button>
        </div>
      </div>
    );
  }
}
SortButton.propTypes = {
  onSortByAscend: React.PropTypes.func.isRequired,
  onSortByDescend: React.PropTypes.func.isRequired,
};

let data = [
  { id: 1, name: 'foo' },
  { id: 2, name: 'bar' },
  { id: 3, name: 'baz' },
  { id: 4, name: 'qux' },
  { id: 5, name: 'quux' },
  { id: 6, name: 'foobar' },
];

render(
  <App data={data} />, document.querySelector('.content')
);
