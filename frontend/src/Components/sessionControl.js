import { React, useReducer, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    height: 585px;
    border: solid;
`;

const Title = styled.h1`
    text-align: center;
    padding-top: 75px;
    font-family: Garamond, Georgia, serif;
    font-size: 40px;
    text-decoration: underline double
`;

const ESTitle = styled.h1`
    text-align: center;
    padding-top: 115px;
    font-family: Garamond, Georgia, serif;
    font-size: 40px;
    text-decoration: underline double
`;

const Label = styled.label`
    font-size: small;
    padding-right: 100px;
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

const NSConstainer = styled.form` 
    text-align: center;
    border: solid;
`;

const ESBackground = styled.div` 
    background-color: lightgrey;
    text-align: center;
    border: solid;
`;

const LogoutButton = styled.button`
    color: white;
    background-color: orange;
    text-align: center;
    margin: 5px 2.5px;
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: small;
    border: solid;
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

function SessionControl(props) {
    const navigation = useNavigate();
    const [state, dispatch] = useReducer(reducer, nameFormat);
    const [sessionList, setSessionList] = useState([]);
    const [session, setSession] = useState('');
    const formRef = useRef();

    fetch('../src/backen/session_all/{props.user_id}', {
        method: "GET"
    })
    .then(response => response.json())
    .then(data => setSessionList(data))
    .catch(error => {
        console.error('Error: ', error)
    });

    const handleChange = (e) => {
        setSession(e.target.key);
    };

    return(
        <GridContainer>
            <NSConstainer>
                <LogoutButton onClick={() => navigation("/")}>LOGOUT</LogoutButton>
                <Title>New Session</Title>
                <form ref={formRef}>
                    <Label for="session name">New Session</Label><br></br>
                    <input id="session name" type='text' placeholder="Session Name" value={state.name} onChange={(event) => dispatch({ type: 'set_name', payload: event.target.value })}></input>
                    <br></br><br></br><br></br>
                    <Button type="submit" onClick={() => navigation("/session/:sessionId")}>Create New Session</Button>
                </form>
            </NSConstainer>
            <ESBackground>
                <ESTitle>Existing Session</ESTitle>
                <form action="/action_page.php">
                    <br></br>
                    <select name="EntityType" id="EntityTypeSelect" onChange={handleChange}>
                        <option disabled selected value> -- select an option -- </option>
                        {sessionList.map(session =>
                            <option key={session.session_id} value={session.session_name}></option>
                        )}
                    </select>
                    <Button type="submit" onClick={() => navigation("/session/:{session}", {session_id: session})}>Enter Session</Button>
                </form>
            </ESBackground>
        </GridContainer>
    )
}

export default SessionControl;