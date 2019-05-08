import React from 'react';
import styled from 'styled-components'

const FriendContainer = styled.div`
    display: flex;
    justify-content: space-around;
`
const Name = styled.span`
    width: 180px;
`
const Age = styled.span`
    width: 180px;
`
const Contact = styled.span`
    width: 180px;
`
const Forum = styled.input`
    width: 180px;
`

class FriendCard extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            textbox: -1,
            value: ""
        }
    }

    onSubmit()
    {
        let obj =
        {
            id: this.props.friend.id,
            name: this.state.textbox === 0 ? this.state.value : this.props.friend.name,
            age: this.state.textbox === 1 ? parseInt(this.state.value) : this.props.friend.age,
            email: this.state.textbox === 2 ? this.state.value : this.props.friend.email, 
        }
        if(obj.name === this.props.friend.name && obj.age === this.props.friend.age && obj.email === this.props.friend.email);
        else this.props.changeCb(obj);
        this.setState({textbox: -1, value: ""});
    }
    render()
    {

        return(
            <FriendContainer>
                    {this.state.textbox !== 0 ? <Name onClick={()=>this.setState({textbox: 0, value: this.props.friend.name})}>{this.props.friend.name}</Name> : <Forum onBlur={() => this.onSubmit()} onChange={event => this.setState({textbox: 0, value: event.target.value})} value={this.state.value} />}
                    <Age>{this.state.textbox !== 1 ? <Age onClick={()=>this.setState({textbox: 1, value: this.props.friend.age})}>{this.props.friend.age}</Age> : <Forum onBlur={() => this.onSubmit() } onChange={event => this.setState({textbox: 1, value: event.target.value})} value={this.state.value} />}</Age>
                    <Contact>{this.state.textbox !== 2 ? <Contact onClick={()=>this.setState({textbox: 2, value: this.props.friend.email})}>{this.props.friend.email}</Contact> : <Forum onBlur={() => this.onSubmit() } onChange={event => this.setState({textbox: 2, value: event.target.value})} value={this.state.value} />}</Contact>
                    <button onClick={()=> this.props.deleteCb(this.props.friend.id)}>X</button>
            </FriendContainer> 
        );
    }
    componentDidUpdate()
    {
        
        try {
           let a =  document.querySelector("input");
           a.focus();
           a.addEventListener("keyup", event => {if(event.key==="Enter") a.blur();});
        } catch (error){}

    }
    
}

export default FriendCard;