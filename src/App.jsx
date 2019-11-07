//#region imports
import React, { Component } from "react";
import ReactDOM from "react-dom";

import Container from "react-bootstrap/Container";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// import FormControl from "react-bootstrap/FormControl";
// import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Card from "react-bootstrap/Card";

// import Dropdown from "react-bootstrap/Dropdown";

import Icon from "@material-ui/core/Icon";

import "./app.css";
//#endregion

//#region Globals
var todoItems = [];
todoItems.push({
  index: 1,
  value: "learn react",
  priority: "ligh",
  done: false
});
todoItems.push({
  index: 2,
  value: "go shopping",
  priority: "medium",
  done: false
});
todoItems.push({ index: 3, value: "buy flowers", priority: "low", done: true });

var priorityOptions = [];
priorityOptions.push({ index: 1, value: "high", name: "High" });
priorityOptions.push({ index: 2, value: "medium", name: "Medium" });
priorityOptions.push({ index: 3, value: "low", name: "Low" });
//#endregion

//#region TodoList
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
//#endregion

//#region TodoListItem
class TodoListItem extends Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
  }

  onClickEdit() {
    console.log("onClickEdit");
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
    // var todoClass = this.props.item.done ? "done" : "undone";
    var todoClass = this.props.priority;
    console.log(todoClass);
    return (
      <ListGroup.Item className="list-group-item">
        <Row className={todoClass}>
          <Col onClick={this.onClickDone}>{this.props.item.value}</Col>
          <Col className="col-auto">
            <Button
              type="button"
              variant="outline-primary"
              onClick={this.onClickEdit}
            >
              <Icon className="material-icons">edit</Icon>
            </Button>
          </Col>
          <Col className="col-auto">
            <Button
              type="button"
              variant="outline-danger"
              // className="close"
              onClick={this.onClickClose}
            >
              <Icon className="material-icons">delete</Icon>
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }
}
//#endregion

//#region AddNewTodoForm
class AddNewTodoForm extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClickAddButton.bind(this);
  }

  componentDidMount() {
    this.refs.itemValue.focus();
  }

  onClickAddButton(event) {
    console.log("onClickAddButton");
    event.preventDefault();
    var newItemValue = this.refs.itemValue.value;
    var newItemPriority = this.refs.itemPriority.value;

    if (newItemValue) {
      this.props.addItem({ newItemValue, newItemPriority });
      this.refs.formAddNew.reset();
    }
  }

  render() {
    return (
      <Card>
        <Card.Header className="text-center form-h1">Add New Todo</Card.Header>

        <Card.Body className="text-left">
          <Form ref="formAddNew">
            <Form.Group>
              <Form.Label>I want to ...</Form.Label>
              <Form.Control as="textarea" ref="itemValue" rows="3" />
            </Form.Group>
            <Form.Group>
              <Form.Label>How much of a priority is this?</Form.Label>
              <Form.Control as="select" ref="itemPriority">
                {priorityOptions.map((e, key) => {
                  return (
                    <option key={key} value={e.value}>
                      {e.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          </Form>
        </Card.Body>

        <Card.Footer>
          <Button
            type="button"
            variant="success"
            className="btn btn-primary"
            size="lg"
            block
            onClick={e => this.onClickAddButton(e)}
          >
            Add
          </Button>
        </Card.Footer>
      </Card>
    );
  }
}
//#endregion

//#region ListTodoForm
class ListTodoForm extends Component {
  render() {
    if (todoItems.length === 0) {
      return (
        <Card>
          <Card.Header className="text-center form-h1">View Todos</Card.Header>

          <Card.Body className="text-left bg-light-blue">
            <Card.Text>
              <b>Welcome to the Very Simple Todo App!</b>
              <br /> Get started now by adding a new todo on the left.
            </Card.Text>
          </Card.Body>
        </Card>
      );
    } else {
      return (
        <Card>
          <Card.Header className="text-center form-h1">View Todos</Card.Header>

          <Card.Body className="text-left">
            <TodoList
              items={this.props.items}
              removeItem={this.props.removeItem}
              markTodoDone={this.props.markTodoDone}
            />
          </Card.Body>

          <Card.Footer></Card.Footer>
        </Card>
      );
    }
  }
}
//#endregion

//#region EditTodoForm
class EditTodoForm extends Component {
  render() {
    return (
      <Card>
        <Card.Header className="text-center form-h1">View Todos</Card.Header>

        <Card.Body className="text-left">
          <Form ref="formEdit">
            <Form.Group>
              <Form.Label>I want to ...</Form.Label>
              <Form.Control as="textarea" ref="itemValue" rows="3" />
            </Form.Group>
            <Form.Group>
              <Form.Label>How much of a priority is this?</Form.Label>
              <Form.Control as="select" ref="itemPriority">
                {priorityOptions.map((e, key) => {
                  return (
                    <option key={key} value={e.value}>
                      {e.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          </Form>

          <TodoList
            items={this.props.items}
            removeItem={this.props.removeItem}
            markTodoDone={this.props.markTodoDone}
          />
        </Card.Body>

        <Card.Footer></Card.Footer>
      </Card>
    );
  }
}
//#endregion

//#region TodoHeading
class TodoHeading extends Component {
  render() {
    return (
      <div border-bottom>
        <h1 className="text-white">Very Simple Todo App</h1>
        <h4 className="text-white mb-4">Track all of the things</h4>
        <h4 className="border-bottom mb-4"></h4>
      </div>
    );
  }
}

//#endregion

//#region TodoApp
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
      priority: todoItem.newItemPriority,
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
          <TodoHeading />
          <Row>
            <Col className="col-sm-4">
              <AddNewTodoForm addItem={this.addItem} />
            </Col>

            <Col className="col-sm-8">
              <ListTodoForm
                items={this.props.initItems}
                removeItem={this.removeItem}
                markTodoDone={this.markTodoDone}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
//#endregion

//#region main render
ReactDOM.render(
  <TodoApp initItems={todoItems} />,
  document.getElementById("app")
);
//#endregion

// export default TodoApp;
