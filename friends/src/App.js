import React from 'react';
import './App.css';
import styled from 'styled-components'
import axios from 'axios';
import FriendsList from './Components/FriendsList';
import FriendForum from './Components/FriendForum';

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
    let valid = this.validateData(obj);
    if(valid < 0 ) return valid;
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
  add(obj)
  {
    let valid = this.validateData(obj);
    if(valid < 0 ){ console.log(valid); return valid;}
    axios
    .post('http://localhost:5000/friends/', obj)
    .then(response =>
      {
        this.setState({friends: response.data});
      })
      .catch(err=>
        {
          console.log(err);
        })
    return 0;
  }
  
  validateData(obj)
  {
    if(/[^a-zA-Z ]/g.test(obj.name)) return -1;
    if(parseInt(obj.age) < 1 || isNaN(parseInt(obj.age))) return -2;
    if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\w{2,3})+$/.test(obj.email)) return -3;
    return 0;
  }

  render(){
    return (
      <div className="App">
        <h1>FRIENDS LIST</h1>
        <HorizontalBar/>
        <FriendsList friends={this.state.friends} deleteCb={id=> this.delete(id)} changeCb={obj => this.change(obj)}/>
        <HorizontalBar/>
        <FriendForum addCb={obj => this.add(obj)}/>
      </div>
    );
  }
}

export default App;
