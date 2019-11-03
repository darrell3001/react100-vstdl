import React, { Component } from "react";
import ReactDOM from "react-dom";

import Container from "react-bootstrap/Container";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "./app.css";

var todoItems = [];
todoItems.push({ index: 1, value: "learn react", priority: 1, done: false });
todoItems.push({ index: 2, value: "Go shopping", priority: 2, done: true });
todoItems.push({ index: 3, value: "buy flowers", priority: 3, done: true });

class TodoList extends Component {
  render() {
    var items = this.props.items.map((item, index) => {
      return (
        <TodoListItem
          key={index}
          item={item}
          index={index}
          removeItem={this.props.removeItem}
          markTodoDone={this.props.markTodoDone}
        />
      );
    });
    return <ListGroup> {items} </ListGroup>;
  }
}

class TodoListItem extends Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
  }

  onClickClose() {
    console.log("onClickClose");
    var index = parseInt(this.props.index);
    this.props.removeItem(index);
  }

  onClickDone() {
    console.log("onClickDone");
    var index = parseInt(this.props.index);
    this.props.markTodoDone(index);
  }

  render() {
    var todoClass = this.props.item.done ? "done" : "undone";
    return (
      <ListGroup.Item className="list-group-item">
        <Row className={todoClass}>
          <Col
            onClick={this.onClickDone}
            className="glyphicon glyphicon-ok icon"
            aria-hidden="true"
          >
            {this.props.item.value}
          </Col>
          <Col>
            <button type="button" className="close" onClick={this.onClickClose}>
              &times;
            </button>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }
}

class TodoForm extends Component {
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

    if (newItemValue) {
      this.props.addItem({ newItemValue });
      this.refs.form.reset();
    }
  }

  render() {
    return (
      <Form ref="form" onSubmit={e => this.onSubmit(e)} className="form-inline">
        <InputGroup>
          <FormControl
            type="text"
            ref="itemName"
            className="form-control"
            placeholder="add a new todo..."
          />
        </InputGroup>

        <Button type="submit" className="btn btn-primary">
          Add
        </Button>
      </Form>
    );
  }
}

class TodoHeader extends Component {
  render() {
    return <h1>Todo list</h1>;
  }
}

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.state = { todoItems: todoItems };
  }

  addItem(todoItem) {
    todoItems.unshift({
      index: todoItems.length + 1,
      value: todoItem.newItemValue,
      done: false
    });
    this.setState({ todoItems: todoItems });
  }

  removeItem(itemIndex) {
    todoItems.splice(itemIndex, 1);
    this.setState({ todoItems: todoItems });
  }

  markTodoDone(itemIndex) {
    var todo = todoItems[itemIndex];
    todoItems.splice(itemIndex, 1);
    todo.done = !todo.done;
    todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
    this.setState({ todoItems: todoItems });
  }

  render() {
    return (
      <>
        <Container className="container-fluid">
          <TodoHeader />
          <TodoList
            items={this.props.initItems}
            removeItem={this.removeItem}
            markTodoDone={this.markTodoDone}
          />
          <TodoForm addItem={this.addItem} />
        </Container>
      </>
    );
  }
}

ReactDOM.render(
  <TodoApp initItems={todoItems} />,
  document.getElementById("app")
);

// export default TodoApp;
