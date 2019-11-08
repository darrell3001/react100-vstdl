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

// import Icon from "@material-ui/core/Icon";

import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

import "./app.css";
// import "./TodoListForm.jsx";
// import "./TodoApp.jsx";
// import "./TodoAddNewForm";

import TodoHeading from "./TodoHeading";

//#endregion

//#region Globals
var G_todoItems = [];
G_todoItems.push({
  index: 1,
  value: "learn react",
  priority: "high",
  done: false
});
G_todoItems.push({
  index: 2,
  value: "go shopping",
  priority: "medium",
  done: false
});
G_todoItems.push({
  index: 3,
  value: "buy flowers",
  priority: "low",
  done: true
});

var G_priorityOptions = [];
G_priorityOptions.push({ index: 1, value: "high", name: "High" });
G_priorityOptions.push({ index: 2, value: "medium", name: "Medium" });
G_priorityOptions.push({ index: 3, value: "low", name: "Low" });
//#endregion

//#region TodoAddNewForm
class TodoAddNewForm extends Component {
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
                {this.props.priorityOptions.map((e, key) => {
                  return (
                    <option key={e.index} value={e.value}>
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

//#region TodoListForm
class TodoListForm extends Component {
  render() {
    if (this.props.updateInProgress) {
      return (
        <>
          <TodoEditForm
            todoItems={this.props.todoItems}
            index={this.props.itemBeingUpdatedIndex}
            removeItem={this.props.removeItem}
            markTodoDone={this.props.markTodoDone}
            startUpdate={this.props.startUpdate}
            updateItem={this.props.updateItem}
            priorityOptions={this.props.priorityOptions}
          />
        </>
      );
    } else {
      if (this.props.todoItems.length === 0) {
        return (
          <Card>
            <Card.Header className="text-center form-h1">
              View Todos
            </Card.Header>

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
            <Card.Header className="text-center form-h1">
              View Todos
            </Card.Header>

            <Card.Body className="text-left">
              <TodoList
                todoItems={this.props.todoItems}
                removeItem={this.props.removeItem}
                markTodoDone={this.props.markTodoDone}
                startUpdate={this.props.startUpdate}
              />
            </Card.Body>

            <Card.Footer></Card.Footer>
          </Card>
        );
      }
    }
  }
}
//#endregion

//#region TodoApp
class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.startUpdate = this.startUpdate.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.state = {
      todoItems: this.props.todoItems,
      updateInProgress: false,
      itemBeingUpdatedIndex: null
    };
  }

  startUpdate(itemIndex) {
    console.log("startUpdate");
    console.log(itemIndex);
    this.setState({ updateInProgress: true, itemBeingUpdatedIndex: itemIndex });
  }

  updateItem(itemIndex, updatedTodoItem) {
    console.log("updateItem");
    var todo = this.props.todoItems[itemIndex];
    this.props.todoItems.splice(itemIndex, 1);

    todo.value = updatedTodoItem.newItemValue;
    todo.priority = updatedTodoItem.newItemPriority;
    // TODO add check box for done
    // todo.done = updatedTodoItem.done;
    todo.done = false;

    todo.done
      ? this.props.todoItems.push(todo)
      : this.props.todoItems.unshift(todo);
    this.setState({
      todoItems: this.props.todoItems,
      updateInProgress: false,
      itemBeingUpdatedIndex: null
    });
  }

  addItem(newTodoItem) {
    this.props.todoItems.unshift({
      index: this.props.todoItems.length + 1,
      value: newTodoItem.newItemValue,
      priority: newTodoItem.newItemPriority,
      done: false
    });
    this.setState({ todoItems: this.setState.todoItems });
  }

  removeItem(itemIndex) {
    this.props.todoItems.splice(itemIndex, 1);
    this.setState({ todoItems: this.setState.todoItems });
  }

  markTodoDone(itemIndex) {
    var todo = this.props.todoItems[itemIndex];
    this.props.todoItems.splice(itemIndex, 1);
    todo.done = !todo.done;
    todo.done
      ? this.props.todoItems.push(todo)
      : this.props.todoItems.unshift(todo);
    this.setState({ todoItems: this.props.todoItems });
  }

  render() {
    return (
      <>
        <Container className="container-fluid">
          <TodoHeading />
          <Row>
            <Col className="col-sm-4">
              <TodoAddNewForm
                addItem={this.addItem}
                priorityOptions={this.props.priorityOptions}
              />
            </Col>

            <Col className="col-sm-8">
              <TodoListForm
                todoItems={this.props.todoItems}
                updateItem={this.updateItem}
                removeItem={this.removeItem}
                markTodoDone={this.markTodoDone}
                startUpdate={this.startUpdate}
                updateInProgress={this.state.updateInProgress}
                itemBeingUpdatedIndex={this.state.itemBeingUpdatedIndex}
                priorityOptions={this.props.priorityOptions}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
//#endregion

//#region TodoList
class TodoList extends Component {
  render() {
    var items = this.props.todoItems.map((item, index) => {
      return (
        <TodoListItem
          key={index}
          item={item}
          index={index}
          removeItem={this.props.removeItem}
          markTodoDone={this.props.markTodoDone}
          startUpdate={this.props.startUpdate}
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
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
  }

  onClickEdit() {
    console.log("onClickEdit");
    var index = parseInt(this.props.index);
    this.props.startUpdate(index);
  }

  onClickDelete() {
    console.log("onClickDelete");
    var index = parseInt(this.props.index);
    this.props.removeItem(index);
  }

  onClickDone() {
    console.log("onClickDone");
    var index = parseInt(this.props.index);
    this.props.markTodoDone(index);
  }

  render() {
    var todoClass = `mt-1 ${this.props.item.priority} ${
      this.props.item.done ? "done" : "undone"
    }`;
    return (
      <Row className={todoClass}>
        <Col onClick={this.onClickDone}>{this.props.item.value}</Col>
        <Col className="col-auto">
          <FaEdit onClick={this.onClickEdit} />
        </Col>
        <Col className="col-auto">
          <FaTrash onClick={this.onClickDelete} />
        </Col>
      </Row>
    );
  }
}
//#endregion

//#region TodoEditForm
class TodoEditForm extends Component {
  constructor(props) {
    super(props);
    this.onClickSaveButton = this.onClickSaveButton.bind(this);
  }

  componentDidMount() {
    this.refs.itemValue.focus();
  }

  onClickSaveButton(event) {
    console.log("onClickSaveButton");
    event.preventDefault();
    var newItemValue = this.refs.itemValue.value;
    var newItemPriority = this.refs.itemPriority.value;

    if (newItemValue || newItemPriority) {
      this.props.updateItem(this.props.index, {
        newItemValue,
        newItemPriority
      });
      this.refs.formEdit.reset();
    }
  }

  render() {
    return (
      <Card>
        <Card.Header className="text-center form-h1">View Todos</Card.Header>

        <Card.Body className="text-left">
          <Form ref="formEdit">
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                ref="itemValue"
                rows="3"
                defaultValue={this.props.todoItems[this.props.index].value}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as="select"
                ref="itemPriority"
                defaultValue={this.props.todoItems[this.props.index].priority}
              >
                {this.props.priorityOptions.map((e, key) => {
                  return (
                    <option key={e.index} value={e.value}>
                      {e.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <Button
              type="button"
              variant="success"
              className="btn btn-primary float-right"
              onClick={e => this.onClickSaveButton(e)}
            >
              Save
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer>
          <TodoList
            todoItems={this.props.todoItems}
            removeItem={this.props.removeItem}
            markTodoDone={this.props.markTodoDone}
          />
        </Card.Footer>
      </Card>
    );
  }
}
//#endregion

//#region main render
ReactDOM.render(
  <TodoApp todoItems={G_todoItems} priorityOptions={G_priorityOptions} />,
  document.getElementById("app")
);
//#endregion

// export default TodoApp;
