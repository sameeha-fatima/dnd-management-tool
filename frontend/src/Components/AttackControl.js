import styled from 'styled-components';
import { React, useReducer, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const AttackContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50vw;
    height: 50vh;
`;

const FromGrid = styled.form`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
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

const SaveButton = styled.button`
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


const attackFormat = {
    name: "",
    damage: 0
}

function reducer(state, action) {
    switch (action.type) {
        case 'set_name': {
            return {
                ...state,
                name: action.payload
            };
        }
        case 'set_damage': {
            return {
                ...state,
                damage: action.payload
            };
        }
    }
}

function AttackControl(props) {
    const [state, dispatch] = useReducer(reducer, attackFormat);
    const formRef = useRef();
    const routeParams = useParams();
    const navigation = useNavigate();

    //Checks the validity of user inputs and creates a new user account
    const saveFunction = () => {
        if (!formRef.current.reportValidity()) {
            return;
        }

        fetch("/attack", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                attack_name: state.name,
                damage: Number(state.damage),
                session_id: Number(routeParams.sessionId),
            })
        })
        .then((res) => res.text())
        .then((res) => console.log(res))
    }

    return (
        <PageContainer>
            <AttackContainer>
                <h1>Attack</h1>
                <FromGrid ref={formRef}>
                    <LabelContainer>
                        <label for="name">Name</label>
                        <TextInput required maxlength="32" id="name" type='text' placeholder='Name' value={state.firstName} onChange={(event) => dispatch({ type: 'set_name', payload: event.target.value })}></TextInput>
                    </LabelContainer>
                    <LabelContainer>
                        <label for="damage">Damage</label>
                        <TextInput required maxlength="32" id="damage" type='text' placeholder='Damage' value={state.lastName} onChange={(event) => dispatch({ type: 'set_damage', payload: event.target.value })}></TextInput>
                    </LabelContainer>
                </FromGrid>
                <SaveButton onClick={saveFunction}>Save</SaveButton>
            </AttackContainer>
        </PageContainer>
    )
}

export default AttackControl;