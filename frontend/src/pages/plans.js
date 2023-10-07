import { firstName, lastName, emailAdd } from '../components/login.js'
import { userID } from "../components/checklogin";
import { Navigate } from "react-router-dom";
import LogoutButton from "../components/logout";
import { getUser } from '../axiosApi';
import { useNavigate } from 'react-router';
import CounterInput from "react-counter-input";
import React, { useState } from 'react';
import '../App.css'

function PlansPage()
{
    const [planDays, setplanDays] = useState();
    const URLtoSend_1 = '/' + emailAdd;
    getUser(URLtoSend_1).then((res) => {setplanDays((res.data)[0].Days_Left); console.log(planDays)});
    let navigate = useNavigate();

    if (userID === "EMPTY") {
        return <Navigate to="/login" />
    }
    else
    {
        let extend_days = 0;
        
        function handleExtend() {
            const URLtoSend1 = '/' + emailAdd;
            const URLtoSend = '/extend/' + extend_days + '/' + emailAdd;
            getUser(URLtoSend1).then((res) => {setplanDays((res.data)[0].Days_Left); });
            getUser(URLtoSend).then((res) => {console.log(res)});
        }

        function handleCount(days)
        {
            extend_days = days;
        }

        function handleCancel() 
        {
            navigate(-1);
        }

        return(
            <div className='subPage'>
                <link rel="stylesheet" href="./App.css"></link>
                <h1 className='HeaderTextMain'>EnergyLive 2022</h1>
                <main>
                    <div className='LogoutPossition'>  
                        <LogoutButton />
                    </div>
                    <h1 className='EmailText'>{ emailAdd }</h1>
                </main>
                <div className='PlansContent'>
                    <div className='Place'>
                        <h1 className='HeaderTextPlans'>Future plans</h1>
                        <h2 className='Header2TextPlans'>Hello {firstName} {lastName}. Would you like to extend your plan? Choose a number of days:</h2>
                        <h2 className='Header2TextPlans'>Current plan: {planDays} Left</h2>
                        <div className='CounterDiv'>
                            <CounterInput
                                min={0}
                                max={9999999}
                                onCountChange={handleCount}
                                btnStyle={{
                                    fontSize: "25px"
                                }}
                                inputStyle={{
                                    fontSize: "25px",
                                    width: "80px"
                                }}
                            />
                        </div>
                        <button className='Extend' onClick={handleExtend}>Extend</button>
                        <button className='Cancel' onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlansPage;