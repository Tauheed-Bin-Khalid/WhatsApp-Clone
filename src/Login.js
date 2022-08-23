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
background-image: url("data:image/jpeg;base64,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");
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