import React from "react";
import styled from 'styled-components';
import EntityFilterDropDown from "./EntityFilterDropDown/EntityFilterDropDown";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const UpperHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const LowerHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 6vh;
`;

const StyledButton = styled.button`
    all: unset;
    background-color: blue;
    color: white;
    border-radius: 0.5vw;
    padding: 1%;

    &:hover {
        cursor:pointer;
    }
`;

function SessionHeader(props) {

    const navigation = useNavigate();

    const deleteSession = () => {
        if (window.confirm("Are you sure you want to delete this session?") == false) {
            return;
        }
    }

    return (
        <HeaderContainer>
            <UpperHeaderContainer>
                <StyledButton style={{"background-color": 'blue'}} onClick={() => navigation("/sessionControl")}>Home</StyledButton>
                <StyledButton style={{"background-color": 'red'}} onClick={deleteSession}>Delete Session</StyledButton>
            </UpperHeaderContainer>
            <LowerHeaderContainer>
                <EntityFilterDropDown reportValue={props.reportValue}></EntityFilterDropDown>
                <StyledButton style={{"background-color": 'green'}}>Add Entity</StyledButton>
            </LowerHeaderContainer>
        </HeaderContainer>

    )
}

export default SessionHeader;