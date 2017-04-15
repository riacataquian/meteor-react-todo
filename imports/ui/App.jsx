import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { createContainer } from 'meteor/react-meteor-data'

import { Tasks } from '../api/tasks.js'

import Task from './Task.jsx'

// App component - represents the whole app
class App extends Component {
  handleSubmit (event) {
    event.preventDefault()

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim()

    Tasks.insert({
      text,
      createdAt: new Date()
    })

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = ''
  }

  getTasks () {
    return [
      { _id: 1, text: 'Task 1' },
      { _id: 2, text: 'Task 2' },
      { _id: 3, text: 'Task 3' }
    ]
  }

  renderTasks () {
    return this.props.tasks.map(task => {
      return <Task key={task._id} task={task} />
    })
  }

  render () {
    return (
      <div className='container'>
        <header>
          <h1>Todo List</h1>
          {/* This binding is necessary to make `this` work in the callback */}
          <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" ref="textInput" placeholder="Type to add new tasks" />
          </form>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    )
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired
}

/* The wrapped App component fetches tasks from the Tasks collection */
/* and supplies them to the underlying App component it wraps as the tasks prop. */
/* It does this in a reactive way, so that when the contents of the database change, */
/* the App re-renders. */
export default createContainer(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch()
  }
}, App)
