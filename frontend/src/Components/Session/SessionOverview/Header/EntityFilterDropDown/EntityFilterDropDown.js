import styled from 'styled-components';

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

function EntityFilterDropDown(props) {

    return (
        <div>
            <label for="EntityTypeSelect">Search</label>
            <Select name="EntityType" id="EntityTypeSelect" onChange={props.reportValue}>
                <option disabled selected value> -- select an option -- </option>
                <option value={null}>All</option>
                <option value="Character">Character</option>
                <option value="Monster">Monster</option>
                <option value="Player">Player</option>
                <option value="Town">Town</option>
                <option value="Attack">Attack</option>
            </Select>
        </div>
    )
}

export default EntityFilterDropDown;