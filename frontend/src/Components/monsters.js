import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 65% auto;
    grid-template-rows: 1fr; /* Add this line */
    height: 585px;
    border: solid;
`;

    
function Monster(props) {
    const [name, setName] = useState('');
    const [sessionId, setSessionId] = useState('');
    const [statId, setStatId] = useState('');
    const [strength, setStrength] = useState('');
    const [dexterity, setDexterity] = useState('');
    const [constitution, setConstitution] = useState('');
    const [intelligence, setIntelligence] = useState('');
    const [wisdom, setWisdom] = useState('');
    const [charisma, setCharisma] = useState('');
    const [monsterAttackId, setMonsterAttackId] = useState('');
    const [attackId, setAttackId] = useState('');
    const [selectedAttackValue, setSelectedAttackValue] = useState('');
    const [attacks, setAttacks] = useState([]);
    const [selectedAttackIDsList, setselectedAttackIDsList] = useState([]);

/**  This is meant to either pre-fill the form or leave each item blank
    useEffect(() => {
        fetch(`../src/backend/get_monster_route?MonsterID=${props.MonsterID}`)
        .then(response => response.json())
        .then(data => {
            setName(data.MonsterName || '');
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

                //get this monster's attacks
                
        })
        .catch(error => {
            // if there is no Monster data, leave it blank
            setName('');
            setSessionId('');
            setStatId('');
        });
    }, [props.MonsterID]);
*/
    //Get all attacks
    useEffect(() => {
        // Fetch data from your API
        fetch(`../src/backend/get_all_attacks_route`)
          .then(response => response.json())
          .then(attacks => setAttacks(attacks))
          .catch(error => console.error('Error fetching attack data:', error));
      }, []); // Empty dependency array to ensure the effect runs only once when the component mounts
    

    const submitForm = () => {
        const requestData = {
            MonsterID: props.MonsterID,
            MonsterName: name,
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

        const monsterAttackData = {
            MonsterAttackID: monsterAttackId,
            attackIDs : selectedAttackIDsList,
            MonsterID: props.MonsterID,
        };

        //update stats
        fetch('../src/backend/update_stat', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(statData),
        })
        .then(response => {
            if (response.ok) {
                //Update Monster
                fetch('../src/backend/update_monster', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                })
                .then(response => {
                    if (response.ok) {
                        console.log('Monster updated')
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

        //update attacks
        fetch('../src/backend/update_monster_attacks', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(monsterAttackData),
        })
        .catch(error => {
            console.error('Error: ', error)
        })
    }

const changeName = (event) => {
    setName(event.target.value);
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

const changeAttack = (event) => {
    setSelectedAttackValue(event.target.value);
};

    return (
        <GridContainer>
            <div>
                <Title>Monster</Title>
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" value={name} onChange={changeName}/>
                    <label htmlFor="attack">Attacks: </label>

                    <label>Select an attack:</label>
                    <select value={selectedAttackValue} onChange={changeAttack}>
                        <option value="">Select...</option>
                        {attacks.map(item => (
                        <option key={item.id} value={item.value}>
                            {item.label}
                        </option>
                        ))}
                    </select>

                    <p>Selected Attack: {selectedAttackValue}</p>

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
            </div>
        </GridContainer>
    );
}

export default Monster;


