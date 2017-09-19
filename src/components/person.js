import React from 'react'

export default class Person extends React.Component {
  editPerson () {
    if (this.nameField.value === '+') {
      this.nameField.value = ''
    }
    // item.contentEditable = true
  }

  // TODO: should get previous value from DB
  // TODO: always save when user clicks away
  handleClickAway (name, date) {
    // clicked away without saving, get the most recent value
    this.nameField.value = name
    if (date) {
      this.dateField.value = date
    }
  }

  render () {
    let className = this.props.className
    let name = this.props.name
    let date = this.props.date
    // input for persons name
    let nameField = (
      <input
        type='text'
        defaultValue={name}
        ref={(input) => { this.nameField = input }}
      />
    )

    let dateField
    // check if this is the last element and it has a date
    if (date) {
      dateField = (
        <input
          type='date'
          defaultValue={date}
          ref={(input) => { this.dateField = input }}
        />
      )
    }
    return (
      <li
        className={className}
        onClick={() => this.editPerson()}
        onKeyPress={(e) => this.props.onKeyPress(e, this.nameField, this.dateField, name, date, className)}
        onBlur={() => this.handleClickAway(name, date)}
        >
        {nameField}
        {dateField}
      </li>
    )
  }
}
