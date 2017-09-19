import React, { Component } from 'react'
import Person from './person'
import uuid from 'uuid/v4'

export default class Group extends Component {
  constructor () {
    super()
    this.state = {
      // each person will be an object with name, last contacted,
      // color, unique id identifier
      people: [],
      // mapping from id to the associated person
      ids: {}
    }
    this.personList = this.personList.bind(this)
    this.handleSaveChanges = this.handleSaveChanges.bind(this)
  }

  handleSaveChanges (e, nameField, dateField, name, date, className) {
    // when enter is pressed
    if (e.which === 13) {
      e.preventDefault()
      // nothing to update in the state
      if (nameField.value === name && dateField.value === date) {
        return
      }

      // trying to save a null value, dont save anything
      if (nameField.value === '' || dateField.value === '') {
        nameField.value = name
        dateField.value = date
      } else {
        // update persons state in people array
        let people = this.state.people
        let index = parseInt(className.replace('person', ''), 10)
        people[index] = {
          name: nameField.value,
          lastContacted: dateField.value
        }

        // add a new row to add a person if this was the last spot
        if (name === '+' && nameField.value !== '+') {
          people.push({name: '+'})
        }

        // simulates saving to DB
        this.setState({people})
        console.log(people[index], ' saved!')
      }
    }
  }

  personList (people) {
    let list = people.map((person, num) => {
      // new class for every item, for accessing later
      let className = 'person' + num
      let name = person.name
      let date = person.lastContacted

      // add person to list with ability to edit
      return (
        <Person
          key={uuid()}
          className={className}
          onKeyPress={this.handleSaveChanges}
          name={name}
          date={date}
        />
      )
    })
    return list
  }

  componentWillMount () {
    this.setState({
      people: [
        {
          name: 'kanye west',
          lastContacted: '2017-09-01'
        },
        {
          name: 'john cena',
          lastContacted: '2017-09-01'
        },
        {
          name: '+'
        }
      ]
    })
  }

  render () {
    return (
      <div>
        <h1>
          {this.props.groupName}
        </h1>
        <ul className='personList'>
          {this.personList(this.state.people)}
        </ul>
      </div>
    )
  }
}
