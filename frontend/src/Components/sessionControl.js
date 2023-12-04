import React from 'react';

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

function SessionControl(props) {
    return(
        <GridContainer>
            <NSConstainer>
                <Title>New Session</Title>
                <form action="/action_page.php">
                    <Label for="session name">New Session</Label><br></br>
                    <input font-size="session name" id="session name" name="session name" placeholder="Session Name"></input>
                    <br></br><br></br><br></br>
                    <Button type="submit">Create New Session</Button>
                </form>
            </NSConstainer>
            <ESBackground>
                <Title>Existing Session</Title>
                <form action="/action_page.php">
                    <br></br>
                    <select name="session" id="session">
                        <option value="Select Session">Select Session</option>
                        <option value="Session1">Session1</option>
                    </select><br></br><br></br><br></br>
                    <Button type="submit">Enter Session</Button>
                </form>
            </ESBackground>
        </GridContainer>
    )
}

export default SessionControl;