import React from 'react';

const useStyles = ({
    loginContainer: {
        height: '100%',
        width: '65%'
    },
    title: {
        textAlign: 'center',
        paddingTop: '50px'
    }
});

function Login(props) {
    const style = useStyles();
    return(
        <div className={style.loginContainer}>
            <h1 className={style.title}>Label</h1>

        </div>
    );
}

export default Login;