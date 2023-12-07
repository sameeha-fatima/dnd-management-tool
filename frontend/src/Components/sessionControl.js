import { React, useReducer, useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
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
    const routeParams = useParams()
    console.log(routeParams.userID)

    useEffect(() => {
        fetch(`/session_all/${routeParams.userID}`, {
            method: "GET"
        })
            .then(response => response.json())
            .then((res) => {
                console.log(res);
                if (res == null || res.length == 0 || !res[0].hasOwnProperty("session_id")) {
                    console.log("error");
                    return;
                }

                console.log("success")
                setSessionList(res);
            })
            .catch(error => {
                console.error('Error: ', error)
            });
    }, [])

    const handleChange = (e) => {
        console.log(e.target.value)
        setSession(e.target.value);
    };

    const redirectSession = () => {
        console.log(session)
        if (session != undefined && session != null && session != "") {
            navigation(`/session/${session}`)
        }
    }

    const createNewSession = () => {
        // navigation(`/session/${}`)
        fetch("/session", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                session_name: state.name,
                user_id: state.lastName,
            })
        })
            .then((res) => res.text())
            .then((res) => {
                console.log(res)
                navigation('/')
            });
    }

    return (
        <GridContainer>
            <NSConstainer>
                <LogoutButton onClick={() => navigation("/")}>LOGOUT</LogoutButton>
                <Title>New Session</Title>
                <form ref={formRef}>
                    <Label for="session name">New Session</Label><br></br>
                    <input id="session name" type='text' placeholder="Session Name" value={state.name} onChange={(event) => dispatch({ type: 'set_name', payload: event.target.value })}></input>
                    <br></br><br></br><br></br>
                    <Button type="submit" onClick={createNewSession}>Create New Session</Button>
                </form>
            </NSConstainer>
            <ESBackground>
                <ESTitle>Existing Session</ESTitle>
                <br></br>
                <select name="EntityType" id="EntityTypeSelect" onChange={handleChange}>
                    <option disabled selected value> -- select an option -- </option>
                    {sessionList.map(session =>
                        <option key={session.session_id} value={session.session_id}>{session.session_name}</option>
                    )}
                </select>
                <Button onClick={redirectSession}>Enter Session</Button>
            </ESBackground>
        </GridContainer>
    )
}

export default SessionControl;