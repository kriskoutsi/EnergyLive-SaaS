import React, {useEffect} from 'react';
import LoginButton from "../components/login";
import { gapi } from 'gapi-script';
import '../App.css'

const clientId = "904816085137-rtpqsfpv201ik04nb6c81vmhterotdqj.apps.googleusercontent.com";

function Home() {

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            })
        };
        gapi.load('client:auth2', start);
    });
    
    return (
        <div>
          <div className='App'>
            <link rel="stylesheet" href="./App.css"></link>
            <h1 className='HeaderText'>EnergyLive 2022</h1>
            <h3 className='Warning'>You have to sign in with a google account first!</h3>
            <LoginButton />
          </div>
          <div className='Options'>
            <button className='About'> About </button>
            <button className='Plans'> Plans </button>
            <button className='Legal'> Legal </button>
          </div>
        </div>
      )
}

export default Home;