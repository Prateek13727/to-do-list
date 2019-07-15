import React from 'react';

export default class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newToDo: "",
      todos: []
    }
    this.addNewToDo = this.addNewToDo.bind(this)
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
    });
  }

  renderButton(cb, text, className="") {
    return <div className="my-2" >
      <button className={"btn btn-blue " + className} onClick={cb}>{text}</button>
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
            todos={this.state.todos}
          />
        </div>
        <div className="flex-col">
          {this.renderButton(this.addNewToDo, "ADD")}
        </div>
      </div>
    )
  }
}

const ItemRow = ({index, todo}) => {
  return (
    <li className={'px-3 border-b border-gray-500 mb-4'}>
      <label className="to-do-text">{todo.text}</label>
    </li>
  )
}

const ListView = ({todos}) => {
  return (
    <div className="list-container">
      <ul>
        {
          todos.map((todo, index) => {
            return <ItemRow key={todo.id} index={index} todo={todo} />
          })
        }
      </ul>
    </div> 
  )
}
