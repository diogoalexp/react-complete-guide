import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit'

class App extends Component {
  state = {
    persons: [
      {id:"1",name: 'Diogo', age: 30},
      {id:"2",name: 'Celine', age: 22},
      {id:"3",name: 'Laudelino', age: 91}
    ],
    otherState: 'other value',
    showPersons: false
  }

  switchNameHandler = (neName) => {
    console.log('was clicked!');
    this.setState({persons: [
      {name: neName, age: 29},
      {name: 'Celine', age: 30},
      {id:"3",name: 'Laudelino', age: 91}
    ]});
  }

  nameChangedHandler = (event, id) =>{
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons]
    persons[personIndex] = person;

    this.setState({persons: persons});
  }

  deletePersonHandler = (personIndex) =>{
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  togglePersonHandler = () =>{
    this.setState({showPersons: !this.state.showPersons});
  }

  render() {
    let persons = null;
    let btnClass = ''

    if (this.state.showPersons){      
      persons = <Persons 
                  persons={this.state.persons}
                  clicked={this.deletePersonHandler}
                  changed={this.nameChangedHandler}
                />            
    }

    return (
      <div className={classes.App}>    
        <Cockpit
          title={this.props.appTitle}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonHandler}
        />             
        {persons}        
      </div>
    );
  }
}

export default App;
