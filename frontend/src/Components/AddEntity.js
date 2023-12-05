import React, { useState } from "react";
import AttackControl from "./AttackControl";
import Character from "./character";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 35% 65%;
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

function AddEntity(props) {
    const [type, setType] = useState('');

    let editScreen;
    if(type == "Character") {
        editScreen = <Character />;
    } else if(type == "Attack") {
        editScreen = <AttackControl />;
    }
    // else if(type == "Monster") {
    //     editScreen = <MonsterControl />;
    // }
    // else if(type == "Town") {
    //     editScreen = <TownControl />;
    // }
    // else if(type == "Player") {
    //     editScreen = <PlayerControl />;
    // }

    return(
        <div>
            <GridContainer>
                <div>
                    <HomeButton onClick={() => navigation("/sessionControl")}>Home</HomeButton><div></div>
                    <Title>Add Entity</Title>
                </div>
                <div>
                    <div></div>
                    <label for="EntityTypeSelect">Search</label>
                    <Select name="EntityType" id="EntityTypeSelect" onChange={setType(value)}>
                        <option disabled selected value> -- select an option -- </option>
                        <option value="Character">Character</option>
                        <option value="Monster">Monster</option>
                        <option value="Player">Player</option>
                        <option value="Town">Town</option>
                        <option value="Attack">Attack</option>
                    </Select>
                </div>
            </GridContainer>
            {editScreen}
        </div>
    );
}

export default AddEntity;