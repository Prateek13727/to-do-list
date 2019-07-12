import React from 'react';

export default class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newToDo: "",
      todos: [],
      filteredTodos: [],
      filter: 'All'
    }
    this.addNewToDo = this.addNewToDo.bind(this)
    this.toggleToDo = this.toggleToDo.bind(this)
    this.filterToDos = this.filterToDos.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    this.setState({
      newToDo: event.target.value
    })
  }
  
  addNewToDo() {
    let newToDo = {
      text: this.state.newToDo,
      status: "Active",
      id: this.state.todos.length+1
    }
    this.setState({
      newToDo: "",
      todos: [...this.state.todos, newToDo]
    },(
      this.filterToDos.bind(this, "All")
    ));
  }

  toggleToDo(event, id) {
    let newTodos = this.state.todos.map((todo) => {
      if(todo.id === id) {
        if(todo.status == "Active") {
          todo.status = "Completed"
        } else {
          todo.status = "Active"
        }
        return todo
      } else {
        return todo
      }
    })
    this.setState({
      todos: newTodos
    })
  }

  filterToDos(filter) {
    let filteredTodos = this.state.todos.filter((todo) => {
      return todo.status === filter || filter === "All"
    })
    this.setState({
      filteredTodos,
      filter
    })
  }

  renderButton(cb, text, className="") {
    return <div className="my-2" >
      <button className={"btn btn-blue " + className} onClick={cb}>{text}</button>
    </div>
  }

  renderFilter(cb, text, filter) {
    let isFilterSelected = false
    if ((text.charAt(0).toUpperCase() + text.toLowerCase().slice(1)) === filter) {
      isFilterSelected = true
    }
    return <div className="my-2">
      <button 
        className={isFilterSelected ? "btn filter selectedFilter" : "btn filter"}
        onClick={cb}>
        {text}
      </button>
    </div>
  }

  render(){
    return (
      <div className="main flex justify-center">
        <div className="mr-8">
          <input
            className="text-input" 
            placeholder="Enter task name" 
            type="text" 
            value={this.state.newToDo} 
            onChange={this.onChange}
          />
          <ListView 
            toggleToDo={this.toggleToDo} 
            todos={this.state.filteredTodos}
          />
        </div>
        <div className="flex-col">
          {this.renderButton(this.addNewToDo, "ADD")}
          <label>FILTERS</label>
          {this.renderFilter(this.filterToDos.bind(this, "All"), "All", this.state.filter)}
          {this.renderFilter(this.filterToDos.bind(this, "Completed"), "Completed", this.state.filter)}
          {this.renderFilter(this.filterToDos.bind(this, "Active"), "Active", this.state.filter)}
        </div>
      </div>
    )
  }
}

const ItemRow = ({todo, toggleToDo}) => {
  let isCompletedClassname = "";
  if(todo.status == "Completed") {
    isCompletedClassname="line-through"
  }
  return (
    <li className={'px-3 border-b border-gray-500 ' + isCompletedClassname} onClick={(event) => toggleToDo(event, todo.id)} >
        <label className="to-do-text">{todo.text}</label>
    </li>
  )
}

const ListView = ({todos, toggleToDo}) => {
  return (
    <div className="list-container">
      <ul>
        {
          todos.map(todo => <ItemRow key={todo.id} todo={todo} toggleToDo={toggleToDo} />)
        }
      </ul>
    </div> 
  )
}
