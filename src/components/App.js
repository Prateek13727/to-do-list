import React from 'react'

const App = ({name}) => {
  return (
    <header className="header">
        <UpperCaseUsername>Welcome to React</UpperCaseUsername>
    </header>
  )
}

const hoc = (WrappedComponent) => (props) => {
  return (
    <div>
      <WrappedComponent {...props}>
        {props.children.toUpperCase()}
      </WrappedComponent>
    </div>
  )
}

const Username = (props) => (
  <div>{props.children}</div>
)

const UpperCaseUsername = hoc(Username)

export default App;