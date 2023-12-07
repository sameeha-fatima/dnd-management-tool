import { React, useReducer, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 65% auto;
    height: 585px;
    border: solid;
`;

const Title = styled.h1`
    text-align: center;
    padding-top: 50px;
    font-family: Garamond, Georgia, serif;
    font-size: 40px;
    text-decoration: underline double
`;

const LoginButton = styled.button`
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

const LoginLabel = styled.label`
    font-size: small;
    padding-right: 150px;
`;

const LoginInput = styled.input` font-size: medium; `;

const LoginForm = styled.form` text-align: center; `;

const NUBackground = styled.div` 
    background-color: lightgrey;
    text-align: center;
`;

const NUTitle = styled.h1`
    text-align: center;
    padding-top: 100px;
    font-family: Garamond, Georgia, serif;
    font-size: 40px;
    text-decoration: underline double
`;

const NUButton = styled.button`
    color: white;
    background-color: #2fb9e6;
    text-align: center;
    margin: 10px 5px;
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: medium;
`;

const credentialsFormat = {
    username: "",
    password: "",
}

function reducer(state, action) {
    switch (action.type) {
        case 'set_username': {
            return {
                ...state,
                username: action.payload
            };
        }
        case 'set_password': {
            return {
                ...state,
                password: action.payload
            };
        }
    }
}

function Login(props) {
    const [state, dispatch] = useReducer(reducer, credentialsFormat);
    const [user, setUser] = useState('');
    const formRef = useRef();
    const navigation = useNavigate();

    const loginUser = () => {
        if (!formRef.current.reportValidity()) {
            return;
        }
        //do api call. If login creds are correct redirect to session control page, if not show error that login creds are invalid
        const requestData = {
            username: state.username,
            password: state.password,
        };

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(error => {
            console.error('Error: ', error)
        })
        console.log(state.user);
        () => navigation("/sessionControl", {userId: user.userId});
    }

    return(
        <GridContainer>
            <div>
                <Title>Login</Title>
                <LoginForm ref={formRef}>
                    <LoginLabel for="username">Username</LoginLabel><br></br>
                    <LoginInput id="username" type='text' placeholder="username" value={state.username} onChange={(event) => dispatch({ type: 'set_username', payload: event.target.value })}></LoginInput><br></br><br></br>
                    <LoginLabel for="password">Password</LoginLabel><br></br>
                    <LoginInput id="password" type='text' placeholder="password" value={state.password} onChange={(event) => dispatch({ type: 'set_password', payload: event.target.value })}></LoginInput><br></br><br></br>
                    <LoginButton type="submit" onClick={loginUser}>Login</LoginButton>
                </LoginForm>
            </div>
            <NUBackground>
                <NUTitle>New User?</NUTitle>
                <NUButton onClick={() => navigation("/createAccount")}>Create Account</NUButton>
            </NUBackground>
        </GridContainer>
    );
}

export default Login;
