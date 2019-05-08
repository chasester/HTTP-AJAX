import React from 'react';
import FriendCard from './FriendCard';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const Container = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
`

class FriendsList extends React.Component
{
    render()
    {
        
        return(
        <Container>
            {this.props.friends.map(x=>  <FriendCard deleteCb={this.props.deleteCb} changeCb={this.props.changeCb} friend={x} key={x.id}/>)}    
        </Container>
        );
    }
}

export default FriendsList;

FriendCard.propTypes = 
{
    friend: PropTypes.shape(
    {
        id: PropTypes.int,
        name: PropTypes.string,
        age: PropTypes.int,
        email: PropTypes.string
    }).isRequired
}
