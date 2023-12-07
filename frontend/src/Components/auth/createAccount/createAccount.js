import styled from 'styled-components';
import { React, useReducer, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const CreateAccountContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50vw;
    height: 50vh;
`;

const FromGrid = styled.form`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 5vw;
    grid-row-gap: 7vh;
`;

const LabelContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const TextInput = styled.input`
    all: unset;
    color: black;
    border-radius: 0.5vw;
    box-shadow: none;
    padding: 7%;
    background-color: rgb(227, 227, 227);
`;

const CreateAccountButton = styled.button`
    all: unset;
    background-color: blue;
    color: white;
    border-radius: 0.5vw;
    padding: 3%;
    margin-top: 5vh;

    &:hover {
        cursor:pointer;
    }
`;


const credentialsFormat = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
}

function reducer(state, action) {
    switch (action.type) {
        case 'set_first_name': {
            return {
                ...state,
                firstName: action.payload
            };
        }
        case 'set_last_name': {
            return {
                ...state,
                lastName: action.payload
            };
        }
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

function CreateAccount(props) {
    const [state, dispatch] = useReducer(reducer, credentialsFormat);
    const formRef = useRef();
    const navigation = useNavigate()

    //Checks the validity of user inputs and creates a new user account
    const createAccount = () => {
        if (!formRef.current.reportValidity()) {
            return;
        }

        fetch("/user", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                first_name: state.firstName,
                last_name: state.lastName,
                username: state.username,
                password: state.password
            })
        })
            .then((res) => res.text())
            .then((res) => {
                console.log(res)
                navigation('/')
            });

    }

    return (
        <PageContainer>
            <CreateAccountContainer>
                <h1>Create Account</h1>
                <FromGrid ref={formRef}>
                    <LabelContainer>
                        <label for="firstName">First Name</label>
                        <TextInput required maxlength="32" id="firstName" type='text' placeholder='First Name' value={state.firstName} onChange={(event) => dispatch({ type: 'set_first_name', payload: event.target.value })}></TextInput>
                    </LabelContainer>
                    <LabelContainer>
                        <label for="lastName">Last Name</label>
                        <TextInput required maxlength="32" id="lastName" type='text' placeholder='Last Name' value={state.lastName} onChange={(event) => dispatch({ type: 'set_last_name', payload: event.target.value })}></TextInput>
                    </LabelContainer>
                    <LabelContainer>
                        <label for="userName">Username</label>
                        <TextInput required minlength="8" maxlength="32" id="userName" type='text' placeholder='Username' value={state.username} onChange={(event) => dispatch({ type: 'set_username', payload: event.target.value })}></TextInput>
                    </LabelContainer>
                    <LabelContainer>
                        <label for="password">Password</label>
                        <TextInput required minlength="8" maxlength="32" id="password" type='password' placeholder='Password' value={state.password} onChange={(event) => dispatch({ type: 'set_password', payload: event.target.value })}></TextInput>
                    </LabelContainer>
                </FromGrid>
                <CreateAccountButton onClick={createAccount}> Create Account</CreateAccountButton>
            </CreateAccountContainer>
        </PageContainer>
    )
}

export default CreateAccount;