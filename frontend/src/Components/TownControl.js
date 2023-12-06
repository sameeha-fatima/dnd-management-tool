import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

const GridContainer = styled.div`
    height: 300px;
    border: solid;
    background-color: grey;
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
    const [character, setCharacter] = useState('');
    const formRef = useRef();

    const handleChange = (e) => {
        setCharacter(e.target.value);
    };

    //Api call to get town object given id
    //if town exists use it to fill in values. if it doesn't exist (creating new town)
    //use placeholders

    let charList;
    if (town != '') {
        charList = town.characters.map(character =>
            <option value={character.character_name}>{character.character_name}</option>
        );
    }

    return(
        <GridContainer>
            <Title>Town</Title><div></div>
            <form ref={formRef}>
                <Label for="town name">Name</Label><br></br>
                <input id="town name" type='text' placeholder="Name" value={state.name} onChange={(event) => dispatch({ type: 'set_name', payload: event.target.value })}>{state.town.town_name}</input>
            </form>
            <label for="CharacterTypeSelect">Search</label>
                    <Select name="CharacterType" id="CharacterTypeSelect" onChange={handleChange}>
                        <option disabled selected value> -- select an option -- </option>
                        {charList}
                    </Select>
        </GridContainer>
    )
}

export default TownControl;