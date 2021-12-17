import React, { Component } from "react";
import ReactDOM from 'react-dom'
import './tasks.css';

var todoItems = [];
//todoItems.push({index: 1, value: "learn react", done: false});
//todoItems.push({index: 2, value: "Go shopping", done: true});
//todoItems.push({index: 3, value: "buy flowers", done: true});

class TodoList extends React.Component {
  render () {
    var items = this.props.items.map((item, index) => {
      return (
        <TodoListItem key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
      );
    });
    return (
      <ul className="list-group"> {items}
      </ul>
    );
  }
}
  
class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
  }
  onClickClose() {
    var index = parseInt(this.props.index);
    this.props.removeItem(index);
  }
  onClickDone() {
    var index = parseInt(this.props.index);
    this.props.markTodoDone(index);
  }
  render () {
    var todoClass = this.props.item.done ? 
        "done" : "undone";
    return(
      <li className="list-group-item ">
        <div className={todoClass}>
          <span className="glyphicon glyphicon-ok icon" aria-hidden="true" onClick={this.onClickDone}></span>
          {this.props.item.value}
          <button type="button" className="close" onClick={this.onClickClose}>&times;</button>
        </div>
      </li>     
    );
  }
}

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.refs.itemName.focus();
  }
  onSubmit(event) {
    event.preventDefault();
    var newItemValue = this.refs.itemName.value;
    
    if(newItemValue) {
      this.props.addItem({newItemValue});
      this.refs.form.reset();
    }
  }
  render () {
    return (
      <form ref="form" onSubmit={this.onSubmit} className="form-inline">
        <input type="text" ref="itemName" className="form-control" placeholder="add a new task"/>
        <button type="submit" className="btn btn-primary">Add</button> 
      </form>
    );   
  }
}
  
class TodoHeader extends React.Component {
  render () {
    return <h1>Todo list</h1>;
  }
}
  
class TodoApp extends React.Component {
  constructor (props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.state = {todoItems: todoItems};
  }
  addItem(todoItem) {
    todoItems.unshift({
      index: todoItems.length+1, 
      value: todoItem.newItemValue, 
      done: false
    });
    this.setState({todoItems: todoItems});
  }
  removeItem (itemIndex) {
    todoItems.splice(itemIndex, 1);
    this.setState({todoItems: todoItems});
  }
  markTodoDone(itemIndex) {
    var todo = todoItems[itemIndex];
    todoItems.splice(itemIndex, 1);
    todo.done = !todo.done;
    todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
    this.setState({todoItems: todoItems});  
  }
  render() {
    return (
      <div id="main">
        <TodoHeader />
        <TodoList items={this.props.initItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone}/>
        <TodoForm addItem={this.addItem} />
      </div>
    );
  }
}

//ReactDOM.render(<TodoApp initItems={todoItems}/>, document.getElementById('app'));

export default function tasks() {
  return(
    <TodoApp initItems={todoItems}/>
  )
}







// export default function tasks() {


























//  // return (
// //     <div className="todoapp stack-large">
// //       <h1>TodoMatic</h1>
// //       <form>
// //         <h2 className="label-wrapper">
// //           <label htmlFor="new-todo-input" className="label__lg">
// //             What needs to be done?
// //           </label>
// //         </h2>
// //         <input
// //           type="text"
// //           id="new-todo-input"
// //           className="input input__lg"
// //           name="text"
// //           autoComplete="off"
// //         />
// //         <button type="submit" className="btn btn__primary btn__lg">
// //           Add
// //         </button>
// //       </form>
// //       <div className="filters btn-group stack-exception">
// //         <button type="button" className="btn toggle-btn" aria-pressed="true">
// //           <span className="visually-hidden">Show </span>
// //           <span>all</span>
// //           <span className="visually-hidden"> tasks</span>
// //         </button>
// //         <button type="button" className="btn toggle-btn" aria-pressed="false">
// //           <span className="visually-hidden">Show </span>
// //           <span>Active</span>
// //           <span className="visually-hidden"> tasks</span>
// //         </button>
// //         <button type="button" className="btn toggle-btn" aria-pressed="false">
// //           <span className="visually-hidden">Show </span>
// //           <span>Completed</span>
// //           <span className="visually-hidden"> tasks</span>
// //         </button>
// //       </div>
// //       <h2 id="list-heading">
// //         3 tasks remaining
// //       </h2>
// //       <ul
// //         role="list"
// //         className="todo-list stack-large stack-exception"
// //         aria-labelledby="list-heading"
// //       >
// //         <li className="todo stack-small">
// //           <div className="c-cb">
// //             <input id="todo-0" type="checkbox" defaultChecked={true} />
// //             <label className="todo-label" htmlFor="todo-0">
// //               Eat
// //             </label>
// //           </div>
// //           <div className="btn-group">
// //             <button type="button" className="btn">
// //               Edit <span className="visually-hidden">Eat</span>
// //             </button>
// //             <button type="button" className="btn btn__danger">
// //               Delete <span className="visually-hidden">Eat</span>
// //             </button>
// //           </div>
// //         </li>
// //         <li className="todo stack-small">
// //           <div className="c-cb">
// //             <input id="todo-1" type="checkbox" />
// //             <label className="todo-label" htmlFor="todo-1">
// //               Sleep
// //             </label>
// //           </div>
// //           <div className="btn-group">
// //             <button type="button" className="btn">
// //               Edit <span className="visually-hidden">Sleep</span>
// //             </button>
// //             <button type="button" className="btn btn__danger">
// //               Delete <span className="visually-hidden">Sleep</span>
// //             </button>
// //           </div>
// //         </li>
// //         <li className="todo stack-small">
// //           <div className="c-cb">
// //             <input id="todo-2" type="checkbox" />
// //             <label className="todo-label" htmlFor="todo-2">
// //               Repeat
// //             </label>
// //           </div>
// //           <div className="btn-group">
// //             <button type="button" className="btn">
// //               Edit <span className="visually-hidden">Repeat</span>
// //             </button>
// //             <button type="button" className="btn btn__danger">
// //               Delete <span className="visually-hidden">Repeat</span>
// //             </button>
// //           </div>
// //         </li>
// //       </ul>
// //     </div>
// //   );
// }