import React from 'react';

import styled from 'styled-components';

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 65% auto;
    height: 585px;
    border: solid;
`;

const Title = styled.h1`
    text-align: center;
    padding-top: 50px;
    font-family: Garamond, Georgia, serif;
    font-size: 40px;
`;

const LoginButton = styled.button`
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

const LoginLabel = styled.label`
    font-size: small;
    padding-right: 150px;
`;

const LoginInput = styled.input` font-size: medium; `;

const LoginForm = styled.form` text-align: center; `;

const NUBackground = styled.div` 
    background-color: lightgrey;
    text-align: center;
`;

const NUTitle = styled.h1`
    text-align: center;
    padding-top: 100px;
    font-family: Garamond, Georgia, serif;
    font-size: 40px;
`;

const NUButton = styled.button`
    color: white;
    background-color: #2fb9e6;
    text-align: center;
    margin: 10px 5px;
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: medium;
`;

function Login(props) {
    return(
        <GridContainer>
            <div>
                <Title>Login</Title>
                <LoginForm action="/action_page.php">
                    <LoginLabel for="username">Username</LoginLabel><br></br>
                    <LoginInput id="username" name="username" placeholder="username"></LoginInput><br></br><br></br>
                    <LoginLabel for="password">Password</LoginLabel><br></br>
                    <LoginInput id="password" name="password" placeholder="password"></LoginInput><br></br><br></br>
                    <LoginButton type="submit">Login</LoginButton>
                </LoginForm>
            </div>
            <NUBackground>
                <NUTitle>New User?</NUTitle>
                <NUButton>Create Account</NUButton>
            </NUBackground>
        </GridContainer>
    );
}

export default Login;