import React from 'react';
import ToDoList from './ToDoList';
import '../styles/styles.css';

const App = ({name}) => {
  return (
    <div className="base">
      <ToDoList />
    </div>
  )
}

export default App;