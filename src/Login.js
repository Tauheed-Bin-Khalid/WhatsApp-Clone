import React from 'react';
import styled from 'styled-components';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from './firebase';
function Login() {

    const signIn =()=>{  
       
        const provider = new GoogleAuthProvider();
        // const auth = getAuth();
        signInWithPopup(auth,provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
          }).catch((error) => { 
            // Handle Errors here.
            const errorCode = error.code;
            console.log(error)
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });

    }

  return ( 
    <Container>
        
        <LoginContainer >
            <Logo src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"/>
            <Text>
                Whatsapp
            </Text>
            <Button onClick={signIn} ><Text1>
                Sign in with Google</Text1></Button>
        </LoginContainer>
    </Container>
  )
}

export default Login

const Container = styled.div`
display: grid;
place-items: center;
background-color: grey;
height: 100vh;
width: 100%;
`;
const LoginContainer = styled.div`
display: flex;
flex-direction: column;
padding: 100px;
align-items: center;
background-color: white;
box-shadow: 0px 4px 14px -3px rgba(0, 0, 0.7,0.8);

`;
const Logo = styled.img`
height: 200px;
width: 200px;
margin-bottom: 50px;

`;
const Button = styled.button`
 margin-top: 10px;
 padding: 2px;
color: white;
background-color: green;
border: none;
border-radius: 8px;
cursor: pointer;

`;
const Text = styled.p`
 padding: 10px;
 font-size: 50px;
font-weight: 500;
font-style: oblique;

`;
const Text1 = styled.p`
 padding: 10px;
 font-size: 30px;
font-weight: 200;

`;