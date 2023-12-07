import React, { useState, useReducer, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const GridContainer = styled.div`
    height: 300px;
    border: solid;
`;

const Title = styled.h1`
    padding-top: 10px;
    padding-left: 10px
`;

const Select = styled.select`
    all: unset;
    background-color: aliceblue;
    padding: 1vw;
    border-style: solid;
    border-radius: 0.5vw;
    text-align-last:center;

    &:hover {
        cursor:pointer;
    }
`;

const Button = styled.button`
    color: white;
    background-color: blue;
    text-align: center;
    margin: 10px 5px;
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: medium;
`;

const nameFormat = {
    name: "",
}

function reducer(state, action) {
    switch (action.type) {
        case 'set_name': {
            return {
                ...state,
                name: action.payload
            };
        }
    }
}

function TownControl(props) {
    const navigation = useNavigate();
    const [state, dispatch] = useReducer(reducer, nameFormat);
    const [town, setTown] = useState('');
    const formRef = useRef();

    //Api call to get town object given id
    //if town exists use it to fill in values. if it doesn't exist (creating new town)
    //use placeholders

    const requestData = {
        name: state.name,
        sessionId: props.sessionId,
    };

    const addTown = () => {

        fetch('../src/backen/session_all/{props.user_id}', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
        .then(response => response.json())
        .then(data => setTown(data))
        .catch(error => {
            console.error('Error: ', error)
        });
        () => navigation("/session/:sessionId");
    }

    return(
        <GridContainer>
            <Title>Town</Title><div></div>
            <form ref={formRef}>
                <label for="town name">Name</label><br></br>
                <input id="town name" type='text' placeholder="Name" value={state.name} onChange={(event) => dispatch({ type: 'set_name', payload: event.target.value })}></input>
                <Button type="submit" onClick={addTown}>Add</Button>
            </form>
        </GridContainer>
    )
}

export default TownControl;