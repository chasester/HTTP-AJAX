import React from 'react';
import './App.css';
import styled from 'styled-components'
import axios from 'axios';
import FriendsList from './Components/FriendsList';

const HorizontalBar = styled.div `
  border: 1px solid black;
  width: 100%;
  content: "hello";
`

class App extends React.Component{

  constructor(props)
  {
    super(props);
    this.state = {
      friends: []
    };
  }

  componentDidMount()
  {
    axios
    .get("http://localhost:5000/friends")
    .then(response=>{
      this.setState({friends: response.data})
    })
    .catch( err=>{
      console.log(err);
    })
  }

  delete(id)
  {
    axios
    .delete(`http://localhost:5000/friends/${id}/`)
    .then(response=> 
      {
        this.setState({friends: response.data})
      })
    .catch(err =>
      {
        console.log(err);
      })
  }

  change(obj)
  {
    axios
    .put(`http://localhost:5000/friends/${obj.id}/`, obj)
    .then(response =>
      {
        this.setState({friends: response.data});
      })
      .catch(err =>
        {
          console.log(err);
        })

  }

  render(){
    return (
      <div className="App">
        <h1>FRIENDS LIST</h1>
        <HorizontalBar/>
        <FriendsList friends={this.state.friends} deleteCb={id=> this.delete(id)} changeCb={obj => this.change(obj)}/>
        <HorizontalBar/>

      </div>
    );
  }
}

export default App;
