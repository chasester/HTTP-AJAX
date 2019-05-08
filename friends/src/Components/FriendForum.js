import React from 'react';
import styled from 'styled-components'

const UserForm = styled.div`
`

class FriendForum extends React.Component
{
    inputs = []
    componentDidMount()
    {
        this.setState(); //force didupdate to run
    }
    componentDidUpdate()
    {
        this.inputs = [];
        this.inputs.push(document.querySelector("input.name"));
        this.inputs.push(document.querySelector("input.age"));
        this.inputs.push(document.querySelector("input.email"));
        this.inputs.forEach((x, i)=> x.addEventListener("keyup", event => 
        {
            if(event.key==="Enter"){ 
                x.blur(); 
                this.inputs[i+1 >= this.inputs.length ? 0 : i+1].focus();
            }
        }));
    }

    onBlur()
    {
        if(!this.checkValues()) return;

        let err = this.props.addCb(
            {
                id: -1,
                name: this.inputs[0].value,
                age: this.inputs[1].value,
                email: this.inputs[2].value
            })
        if(err === 0)
            return this.inputs.forEach(x=> {x.value=""; x.style.outline = "0"; x.blur()});
        try {
        this.inputs[Math.abs(err)-1].focus();
            this.inputs[Math.abs(err)-1].style.outline = "1px solid #FF0000";
            console.log(Math.abs(err)-1);
        } catch (error){}
    }
    checkValues()
    {
        return this.inputs.map(x=>x).filter(x=> x.value !== "").length === this.inputs.length;
    }
    render()
    {
        return(
            <UserForm>
                <input placeholder="Name" onBlur={()=> this.onBlur()} className="name"/>
                <input placeholder="age" onBlur={()=> this.onBlur()} className="age"/>
                <input placeholder="email" onBlur={()=> this.onBlur()} className="email"/>
            </UserForm>
        );
    }
}

export default FriendForum;