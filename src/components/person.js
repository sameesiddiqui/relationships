import React from 'react'

export default class Person extends React.Component {
  editPerson (className) {
    let item = document.querySelector('.' + className)
    if (item.innerHTML === '+') {
      item.innerHTML = ''
    }
    item.contentEditable = true
  }

  // TODO: should get previous value from DB
  handleEmptyLine (className, value) {
    let item = document.querySelector('.' + className)
    // clicked away with null value, get the most recent value
    if (item.innerHTML === '') {
      item.innerHTML = value
    }
  }

  render () {
    let className = this.props.className
    let listItem = this.props.listItem
    return (
      <li
        className={className}
        onClick={() => this.editPerson(className)}
        onKeyPress={(e) => this.props.onKeyPress(e, className, listItem)}
        onBlur={() => this.handleEmptyLine(className, listItem)}
        >
        {listItem}
      </li>
    )
  }
}
