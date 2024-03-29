import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 65% auto;
    grid-template-rows: 1fr; /* Add this line */
    height: 585px;
    border: solid;
`;

const FormContainer = styled.div`
    text-align: center;
`;

function Character(props) {
    const [name, setName] = useState('');
    const [race, setRace] = useState('');
    const [job, setJob] = useState('');
    const [sessionId, setSessionId] = useState('');
    const [statId, setStatId] = useState('');
    const [strength, setStrength] = useState('');
    const [dexterity, setDexterity] = useState('');
    const [constitution, setConstitution] = useState('');
    const [intelligence, setIntelligence] = useState('');
    const [wisdom, setWisdom] = useState('');
    const [charisma, setCharisma] = useState('');

    useEffect(() => {
        fetch(`../src/backend/get_character_route?CharacterID=${props.CharacterID}`)
        .then(response => response.json())
        .then(data => {
            setName(data.CharacterName || '');
            setRace(data.Race || '');
            setJob(data.Job || '');
            setSessionId(data.sessionId || '');
            setStatId(data.StatID || '');

            fetch(`../src/backend/get_stat_route?StatID=${data.StatID}`)
                .then(response => response.json())
                .then(statData => {
                    setStrength(statData.Strength || '');
                    setDexterity(statData.Dexterity || '');
                    setConstitution(statData.Constitution || '');
                    setIntelligence(statData.Intelligence || '');
                    setWisdom(statData.Wisdom || '');
                    setCharisma(statData.Charisma || '');
                })
                .catch(error => {
                    // if there is no stat data, leave it blank
                    setStrength('');
                    setDexterity('');
                    setConstitution('');
                    setIntelligence('');
                    setWisdom('');
                    setCharisma('');
                });
        })
        .catch(error => {
            // if there is no character data, leave it blank
            setName('');
            setRace('');
            setJob('');
            setSessionId('');
            setStatId('');
        });
    }, [props.CharacterID]);

    const submitForm = () => {
        const requestData = {
            CharacterID: props.CharacterID,
            CharacterName: name,
            Race: race,
            Job: job,
            SessionID: sessionId,
            StatID: statId,
        };

        const statData = {
            StatID: statId,
            Strength: strength,
            Dexterity: dexterity,
            Constitution: constitution,
            Intelligence: intelligence,
            Wisdom: wisdom,
            Charisma: charisma,
        };

        fetch('../src/backend/update_stat', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(statData),
        })
        .then(response => {
            if (response.ok) {
                //Update character
                fetch('../src/backend/update_character', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                })
                .then(response => {
                    if (response.ok) {
                        console.log('Character updated')
                    } else {
                        console.error('Error: ', response.statusText)
                    }
                })
                .catch(error => {
                    console.error('Error: ', error)
                })
            } else {
                console.error('Error: ', response.statusText)
            }
        })
        .catch(error => {
            console.error('Error: ', error)
        })
    }

const changeName = (event) => {
    setName(event.target.value);
};

const changeRace = (event) => {
    setRace(event.target.value);
};

const changeJob = (event) => {
    setJob(event.target.value);
};

const changeStrength = (event) => {
    setStrength(event.target.value);
};

const changeDexterity = (event) => {
    setDexterity(event.target.value);
};

const changeConstitution = (event) => {
    setConstitution(event.target.value);
};

const changeIntelligence = (event) => {
    setIntelligence(event.target.value);
};

const changeWisdom = (event) => {
    setWisdom(event.target.value);
};

const changeCharisma = (event) => {
    setCharisma(event.target.value);
};

    return (
        <GridContainer>
            <div>
                <h1>Character</h1>
                <FormContainer>
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" value={name} onChange={changeName}/>
                    <label htmlFor="race">Race: </label>
                    <input type="text" id="race" value={race} onChange={changeRace}/>
                    <label htmlFor='job'>Job: </label>
                    <input type="text" id="job" value={job} onChange={changeJob}/>

                    <label htmlFor="strength">Strength: </label>
                    <input type="text" id="strength" value={strength} onChange={changeStrength}/>
                    <label htmlFor="dexterity">Dexterity: </label>
                    <input type="text" id="dexterity" value={dexterity} onChange={changeDexterity}/>
                    <label htmlFor="constitution">Constitution: </label>
                    <input type="text" id="constitution" value={constitution} onChange={changeConstitution}/>
                    <label htmlFor="intelligence">Intelligence: </label>
                    <input type="text" id="intelligence" value={intelligence} onChange={changeIntelligence}/>
                    <label htmlFor="wisdom">Wisdom: </label>
                    <input type="text" id="wisdom" value={wisdom} onChange={changeWisdom}/>
                    <label htmlFor="charisma">Charisma: </label>
                    <input type="text" id="charisma" value={charisma} onChange={changeCharisma}/>

                    <button onClick={submitForm}>Submit</button>
                </FormContainer>
            </div>
        </GridContainer>
    );
}

export default Character;
