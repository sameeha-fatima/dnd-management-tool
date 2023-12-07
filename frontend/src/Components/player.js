import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 65% auto;
    grid-template-rows: 1fr; /* Add this line */
    height: 585px;
    border: solid;
`;

function Player(props) {
    const [_class, setClass] = useState('');
    const [alignment, setAlignment] = useState('');
    const [characterId, setCharacterId] = useState('');

    const [playerName, setPlayerName] = useState('');
    const [job, setJob] = useState('');
    const [race, setRace] = useState('');
    const [sessionId, setSessionId] = useState('');
    const [statId, setStatId] = useState('');

    const [strength, setStrength] = useState('');
    const [dexterity, setDexterity] = useState('');
    const [constitution, setConstitution] = useState('');
    const [intelligence, setIntelligence] = useState('');
    const [wisdom, setWisdom] = useState('');
    const [charisma, setCharisma] = useState('');

    const [selectedAttackValue, setSelectedAttackValue] = useState('');
    const [allAttacks, setAttacks] = useState([]);
    const [selectedAttackIDsList, setselectedAttackIDsList] = useState([]);

    const handleAttackSelection = (event) => {
        const selectedValue = event.target.id; //use id instead of value to look at attackID
    
        //update which attack is currently selected
        setSelectedAttackValue(selectedValue);
    
        //if the newly selected item is not on the list, add it
        if (selectedValue && !selectedAttackIDsList.includes(selectedValue)) {
            setselectedAttackIDsList([...selectedAttackIDsList, selectedValue]);
        }
    };

/**  This is meant to either pre-fill the form or leave each item blank
    useEffect(() => {
        fetch(`../src/backend/get_player_route?PlayerID=${props.PlayerID}`)
        .then(response => response.json())
        .then(data => {
            setClass(data.Class || '');
            setAlignment(data.Alignment || '');
            setCharacterId(data.CharacterID || '');
            fetch(`../src/backend/get_character_route?CharacterID=${characterId}`)
                .then(response => response.json())
                .then(characterData => {
                    setCharacterName(characterData.CharacterName || '');
                    setJob(characterData.Job || '');
                    setRace(characterData.Race || '');
                    setSessionId(characterData.SessionID || '');
                    setStatId(characterData.StatID || '');
                    fetch(`../src/backend/get_stat_route?StatID=${statId}`)
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
                    setCharacterName('');
                    setJob('');
                    setRace('');
                    setSessionId('');
                    setStatId('');
                });
        })
        .catch(error => {
            // if there is no player data, leave it blank
            setClass('');
            setAlignment('');
            setCharacterId('');
        });

    }, [props.PlayerID])
*/

    //Get all attacks
    useEffect(() => {
        // Fetch data from your API
        fetch("/attacks")
          .then(response => response.json())
          .then(allAttacks => setAttacks(allAttacks))
          .catch(error => console.error('Error fetching attack data:', error));
      }, []); 
    

    const submitForm = () => {
        const playerData = {
            PlayerID: props.PlayerID,
            Class: _class,
            Alignment: alignment,
            CharacterID: characterId, 
        };
        
        const characterData = {
            CharacterID: characterId,
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

        const dataToSend = {
            strength: strength,
            dexterity: dexterity,
            constitution: constitution,
            intelligence: intelligence,
            wisdom: wisdom,
            charisma: charisma,
            character_name: playerName,
            job: job,
            race: race,
            session_id: sessionId,
            _class: _class,
            alignment: alignment,
            attacks : selectedAttackIDsList,
        };

        //create the monster object
        fetch("/player", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        })
        .catch(error => {
            console.error('Error: ', error)
        })

/**  
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
                    body: JSON.stringify(characterData),
                })
                .then(response => {
                    if (response.ok) {
                        fetch('../src/backend/update_player', {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(playerData),
                        })
                        .then(response => {
                            if (response.ok) {
                                console.log('Player updated')
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
            } else {
                console.error('Error: ', response.statusText)
            }
        })
*/        
    }
    
    const changeRace = (event) => {
        setRace(event.target.value);
    };
    
    const changeJob = (event) => {
        setJob(event.target.value);
    };

    const changeClass = (event) => {
        setClass(event.target.value);
    };

    const changeAlignment = (event) => {
        setAlignment(event.target.value)
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
                <h1>Player</h1>
                <label htmlFor="playerName">Player: {props.PlayerID}</label>
                <label htmlFor="race">Race: </label>
                <input type="text" id="race" value={race} onChange={changeRace}/>
                <label htmlFor="job">Job: </label>
                <input type="text" id="job" value={job} onChange={changeJob}/>
                <label htmlFor="class">Class: </label>
                <input type="text" id="class" value={_class} onChange={changeClass}/>
                <label htmlFor="alignment">Alignment: </label>
                <input type="text" id="alignment" value={alignment} onChange={changeAlignment}/>

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

                <label>Select an attack:</label>
                    <select value={selectedAttackValue} onChange={handleAttackSelection}>
                        <option value="">Select...</option>
                        {allAttacks.map(item => (
                        <option key={item.id} value={item.value}>
                            {item.label} 
                        </option>
                        ))}
                    </select>

                    <p>Selected Attack: {selectedAttackValue}</p>

                    <div>
                        <h2>Selected Attacks:</h2>
                        <ul>
                            {selectedAttackIDsList.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                <button onClick={submitForm}>Submit</button>
            </div>
        </GridContainer>
    );
}

export default Player