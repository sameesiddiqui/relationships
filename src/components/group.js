import React, { Component } from 'react'
import Person from './person'

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

  handleSaveChanges (e, className, value) {
    let item = document.querySelector('.' + className)
    // when enter is pressed
    if (e.which === 13) {
      e.preventDefault()
      // nothing to update in the state
      if (item.innerHTML === value) {
        return
      }

      // trying to save a null value, dont save anything
      if (item.innerHTML === '') {
        item.innerHTML = value
      } else {
        // update persons state in people array
        let people = this.state.people
        let index = parseInt(className.replace('person', ''), 10)
        people[index] = {name: item.innerHTML}

        // add a new row to add a person if this was the last spot
        if (value === '+' && item.innerHTML !== '+') {
          people.push({name: '+'})
        }

        // simulates saving to DB
        this.setState({people})
        console.log(item.innerHTML, ' saved!')
      }
    }
  }

  personList (people) {
    let list = people.map((person, num) => {
      // new class for every item, for accessing later
      let className = 'person' + num
      let listItem = person.name
      if (person.lastContacted) {
        listItem += ' - ' + person.lastContacted
      }

      // add person to list with ability to edit
      return (
        <Person
          className={className}
          onKeyPress={(e) => this.handleSaveChanges(e, className, listItem)}
          listItem={listItem}
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
          lastContacted: '9/1'
        },
        {
          name: 'john cena',
          lastContacted: 'summer slam'
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
