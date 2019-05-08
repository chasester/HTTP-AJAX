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
    .then(resault=>{
      this.setState({friends: resault.data})
    })
    .catch( err=>{
      console.log(err);
    })
  }

  render(){
    return (
      <div className="App">
        <h1>FRIENDS LIST</h1>
        <HorizontalBar/>
        <FriendsList />
      </div>
    );
  }
}

export default App;
