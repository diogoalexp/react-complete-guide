import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'
import Radium, {StyleRoot} from 'radium';

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
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1x solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',        
        color: 'black'
      }

    };

    let persons = null;

    if (this.state.showPersons){      
      persons = (    
        <div>
          {this.state.persons.map((person, index) => {
            return  <Person 
                      name={person.name} 
                      age={person.age} 
                      click={() =>this.deletePersonHandler(index)}
                      key={person.id}
                      changed={(event) =>this.nameChangedHandler(event, person.id)}
                    />
          })} 
        </div>
      );
      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'lightred',        
        color: 'black'
      }
    }

    const classes = [];

    if (this.state.persons.length <=2){  
      classes.push('red');
      if (this.state.persons.length <=1){  
        classes.push('bold');
      }
    }

    return (
      <StyleRoot>
      <div className="App">
          <h1 className="App-title">Hi, I'm a React App</h1>
        <p className={classes.join(' ')}>
          this is really working!
        </p>
        <button 
          style={style} 
          onClick={this.togglePersonHandler} 
        >Toggle Person</button>
        {persons}        
      </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
