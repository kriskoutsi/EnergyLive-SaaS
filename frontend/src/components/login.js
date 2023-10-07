import { GoogleLogin } from 'react-google-login';
import React from 'react';
import { setUserID } from './checklogin';
import { useNavigate } from 'react-router';
import { getUser } from '../axiosApi';


const clientId = "904816085137-rtpqsfpv201ik04nb6c81vmhterotdqj.apps.googleusercontent.com"
export let firstName = '';
export let lastName = '';
export let emailAdd = '';
export let daysLeft = '';

function Login() {
    
    const onSuccess = (res) => {
        setUserID(res['tokenId']);
        fetchUserDetails(res['tokenId']);
        navigate("/atl");
    }

    let navigate = useNavigate();
    
    const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res);
    }
    
    function fetchUserDetails(cred)
    {
        const Http = new XMLHttpRequest();
        const url = 'https://oauth2.googleapis.com/tokeninfo?id_token=' + cred;
        Http.open("GET", url);
        Http.send();
        
        Http.onreadystatechange = (e) => {
            if(Http.readyState === XMLHttpRequest.DONE) {
                const parsedResponse = JSON.parse(Http.responseText);
                firstName = parsedResponse['given_name'];
                lastName = parsedResponse['family_name'];
                emailAdd = parsedResponse['email'];
                daysLeft = '7';
                const URLtoSend = '/' + firstName + '/' + lastName + '/' + emailAdd + '/' + daysLeft;
                console.log(URLtoSend);
                getUser(URLtoSend).then((res) => {console.log('USER CREATED')});
            }
        }
    }

    return (
        <div id="SignInButton">
            <GoogleLogin
                clientId={clientId}
                buttonText="Sign in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                background='black'
            />     
        </div>
    )
}

export default Login;