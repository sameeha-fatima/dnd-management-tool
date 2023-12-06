import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AttackControl from "./AttackControl";
import Character from "./character";
import styled from 'styled-components';

const GridContainer = styled.div`
    height: 100px;
    border: solid;
`;

const HomeButton = styled.button`
    all: unset;
    background-color: blue;
    color: white;
    border-radius: 0.5vw;
    padding: 1%;

    &:hover {
        cursor:pointer;
    }
`;

const Title = styled.h1`
    font-family: Garamond, Georgia, serif;
    font-size: 30px;
`;

const RemoveButton = styled.button`
    all: unset;
    background-color: red;
    color: white;
    border-radius: 0.5vw;
    padding: 1%;

    &:hover {
        cursor:pointer;
    }
`;

function EditEntity(props) {
    const [type, setType] = useState('');
    const navigation = useNavigate();

    let editScreen;
    if(type == "Character") {
        editScreen = <Character />;
    } else if(type == "Attack") {
        editScreen = <AttackControl />;
    }
    // else if(type == "Monster") {
    //     editScreen = <MonsterControl />;
    // }
    else if(type == "Town") {
        editScreen = <TownControl />;
    }
    else if(type == "Player") {
        editScreen = <PlayerControl />;
    }

    const removeEntity = () => {
        //api call to remove entity
        () => navigation("/session/:sessionId");
    }

    return(
        <GridContainer>
            <HomeButton onClick={() => navigation("/sessionControl")}>Home</HomeButton><div></div>
            <Title>Monster</Title>
            {editScreen}
            <RemoveButton onClick={removeEntity}>Remove</RemoveButton>
        </GridContainer>
    );
}

export default EditEntity;