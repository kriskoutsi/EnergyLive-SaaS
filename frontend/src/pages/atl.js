import React, { useState } from 'react';
import { userID } from "../components/checklogin";
import { Navigate } from "react-router-dom";
import LogoutButton from "../components/logout";
import '../App.css'
import DatePicker from "react-multi-date-picker"
import transition from "react-element-popper/animations/transition"
import opacity from "react-element-popper/animations/opacity"
import "react-multi-date-picker/styles/colors/purple.css"
import Select from 'react-select'
import Highcharts from 'highcharts'
import HC_exporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { getAtl } from '../axiosApi';
import { useNavigate } from 'react-router';

function AtlPage () {
  HC_exporting(Highcharts)
  let navigate = useNavigate();
  
  //CONSTANT VARIABLES

  const [highchartOptions, sethighchartOptions] = useState({
    chart: {
      style: {
        fontFamily: 'Sans-serif',
      },
      type: 'spline',
      height: '62%',
      "border-top-left-radius": 80,
      "border-top-right-radius": 80,
      backgroundColor: "#d251f9",
      plotBackgroundColor: "#930be2",
    },
    xAxis: {
      labels: {
        style: {
          color: '#FFFFFF',
        },
      },
      title: {
        style: {
          "color": '#FFFFFF',
          "fontSize": "13px",
        },
        text: 'Hour'
      }
    },
    yAxis: {
      labels: {
        style: {
          color: '#FFFFFF',
        },
      },
      title: {
        style: {
          "color": '#FFFFFF',
          "fontSize": "13px",
        },
        text: 'Total Load Value'
      }
    },
    title: {
        text: 'Actual Total Load',
        style: {
          "color": '#FFFFFF',
          "fontSize": "20px",
        },
    },
    series: [{
      data: []
    }],
    exporting: {
      enabled: true
  }
  })

  const [email, setEmail] = useState('');
  const [date1, setDate1] = useState(new Date())
  const [date2, setDate2] = useState(new Date())
  const [dateURL1, setDateURL1] = useState('2022-01-01 00:00:00');
  const [dateURL2, setDateURL2] = useState('2022-01-02 23:59:59');

  const options1 = [
    { value: 'ATL', label: 'Actual total load' },
    { value: 'AGPT', label: 'Generation per type' },
  ]
  
  const options2 = [
    { value: 'AL CTY', label: 'Albania' },
    { value: 'AT CTY', label: 'Austria' },
    { value: 'BY CTY', label: 'Belarus' },
    { value: 'BE CTY', label: 'Belgium' },
    { value: 'BA CTY', label: 'Bosnia Herzegovina' },
    { value: 'BG CTY', label: 'Bulgaria' },
    { value: 'HR CTY', label: 'Croatia' },
    { value: 'CY CTY', label: 'Cyprus' },
    { value: 'CZ CTY', label: 'Czech Republic' },
    { value: 'DK CTY', label: 'Denmark' },
    { value: 'EE CTY', label: 'Estonia' },
    { value: 'FI CTY', label: 'Finland' },
    { value: 'FR CTY', label: 'France' },
    { value: 'GE CTY', label: 'Georgia' },
    { value: 'DE CTY', label: 'Germany' },
    { value: 'GR CTY', label: 'Greece' },
    { value: 'HU CTY', label: 'Hungary' },
    { value: 'IE CTY', label: 'Ireland' },
    { value: 'IT CTY', label: 'Italy' },
    { value: 'LV CTY', label: 'Latvia' },
    { value: 'LT CTY', label: 'Lithuania' },
    { value: 'LU CTY', label: 'Luxembourg' },
    { value: 'MT CTY', label: 'Malta' },
    { value: 'ME CTY', label: 'Montenegro' },
    { value: 'NL CTY', label: 'Netherlands' },
    { value: 'MK CTY', label: 'North Macedonia' },
    { value: 'NO CTY', label: 'Norway' },
    { value: 'PL CTY', label: 'Poland' },
    { value: 'PT CTY', label: 'Portugal' },
    { value: 'MD CTY', label: 'Republic of Moldova' },
    { value: 'RO CTY', label: 'Romania' },
    { value: 'RS CTY', label: 'Serbia' },
    { value: 'SK CTY', label: 'Slovakia' },
    { value: 'SI CTY', label: 'Slovenia' },
    { value: 'ES CTY', label: 'Spain' },
    { value: 'SE CTY', label: 'Sweden' },
    { value: 'CH CTY', label: 'Switzerland' },
    { value: 'TR CTY', label: 'Turkey' },
    { value: 'UA CTY', label: 'Ukraine' },
    { value: 'UK CTY', label: 'United Kingdom' },
    { value: 'Russia Federation', label: 'Russia Federation' },
    { value: 'Armenia', label: 'Armenia Main' },
    { value: 'Azerbaijan', label: 'Azerbaijan Main' },
    { value: 'AZ CTY', label: 'Azerbaijan' },
    { value: 'RU CTY', label: 'Russia' },
    { value: 'XK CTY', label: 'Kosovo' },
    { value: 'AM CTY', label: 'Armenia' }
  ]

  const [selected1, setSelected1] = useState(options1[0].value);
  const [selected2, setSelected2] = useState(options2[0].value);

  
  //HANDLERS

  function handleDateFrom(data) {
    let month = '';
    let day = '';
    if (parseInt(data.monthIndex) + 1 < 10)
    {
      month = '0' + (parseInt(data.monthIndex) + 1).toString();
    }
    else
    {
      month = (parseInt(data.monthIndex) + 1).toString();
    }
    if (parseInt(data.day) < 10)
    {
      day = '0' + data.day;
    }
    else
    {
      day = data.day;
    }

    const date = data.year + '-' + month + '-' + day + ' 00:00:00';
    const dateDisFormat = day + '/' + month + '/' + data.year;
    setDateURL1(date);
    setDate1(dateDisFormat);
  }
  
  function handleDateTo(data) {
    let month = '';
    let day = '';
    if (parseInt(data.monthIndex) + 1 < 10)
    {
      month = '0' + (parseInt(data.monthIndex) + 1).toString();
    }
    else
    {
      month = (parseInt(data.monthIndex) + 1).toString();
    }
    if (parseInt(data.day) < 10)
    {
      day = '0' + data.day;
    }
    else
    {
      day = data.day;
    }

    const date = data.year + '-' + month + '-' + day + ' 23:59:59';
    const dateDisFormat = day + '/' + month + '/' + data.year;
    setDateURL2(date);
    setDate2(dateDisFormat);
  }
  
  function handleSelect1(event) {
    setSelected1(event.value);
    if (event.value == 'AGPT') navigate("/agpt");
  };
  
  function handleSelect2(event) {
    setSelected2(event.value);
  };
  
  function sendBackendRequest() {
    const URLtoSend = '/' + dateURL1 + '/' + dateURL2 + '/' + selected2;
    let highchartData = []
    getAtl(URLtoSend).then((res) => {
      for (let i in res.data) {
        let xChart = res.data[i].DateTime;
        let yChart = res.data[i].TotalLoadValue;
        highchartData.push([xChart, yChart]);
      }
      sethighchartOptions((prev) => {
        return {
          ...prev,
          series: [{
            data: highchartData}]
        }
      })
    })
  }

  function handlePlans() {
    navigate('/plans');
  }

  const Http = new XMLHttpRequest();
  const url = 'https://oauth2.googleapis.com/tokeninfo?id_token=' + userID;
  Http.open("GET", url);
  Http.send();
  Http.onreadystatechange = (e) => {
    if(Http.readyState === XMLHttpRequest.DONE) {
      const parsedResponse = JSON.parse(Http.responseText);
      setEmail(parsedResponse['email']);
    }
  }    
    
  if (userID === "EMPTY") {
    return <Navigate to="/login" />
  }
  else
  {
    return(
    <div>
      <div className='subPage'>
        <link rel="stylesheet" href="./App.css"></link>
        <h1 className='HeaderTextMain'>EnergyLive 2022</h1>
        <main>
          <div className='LogoutPossition'>  
            <LogoutButton />
          </div>
          <h1 className='EmailText'>{ email }</h1>
        </main>
        <div className='MainContent'>
          <div className='Column_1'>
            <h1 className='TitleText'> Choose a range of Dates to plot: </h1>
            <div>
              <h1 className='From'> From: </h1>
              <div className='CaldivFrom' >
                <DatePicker 
                  format="DD/MM/YYYY"
                  calendarPosition={`${"bottom"}-${"center"}`} 
                  weekStartDayIndex={1} 
                  className="purple" 
                  inputClass="custom-input" 
                  value={date1} 
                  maxDate={new Date()}
                  onChange={handleDateFrom} 
                  animations={[opacity(), transition({ from: 35, transition: "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)", })]} 
                  mapDays={({ date }) => {
                    let props = {}
                    let isWeekend = [0, 6].includes(date.weekDay.index)
                    
                    if (isWeekend) props.className = "highlight highlight-red"
                    
                    return props
                  }}
                  />
              </div>
            </div>
            <div className='Todiv'>
              <h1 className='To'> To: </h1>
              <div className='CaldivTo' >
                <DatePicker 
                  format="DD/MM/YYYY"
                  calendarPosition={`${"bottom"}-${"center"}`} 
                  weekStartDayIndex={1} 
                  className="purple" 
                  inputClass="custom-input" 
                  value={date2} 
                  onChange={handleDateTo} 
                  animations={[opacity(), transition({ from: 35, transition: "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)", })]}
                  mapDays={({ date }) => {
                    let props = {}
                    let isWeekend = [0, 6].includes(date.weekDay.index)
                    
                    if (isWeekend) props.className = "highlight highlight-red"
                    
                    return props
                  }}
                  maxDate={new Date()}
                  />
              </div>
            </div>
            <div className='Quantity'>
              <h1 className='TitleText'> Quantity: </h1>
              <Select 
                label="Quantity"
                options={options1} 
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 15,
                  colors: {
                    ...theme.colors,
                    primary25: 'hotpink',
                    primary: 'purple',
                  }
                })}
                styles={{
                  container: style => ({
                    ...style,
                    width: '60%',
                    marginLeft: '20%'
                  }),
                  option: (base) => ({
                    ...base,
                    height: '100%',
                    borderRadius: 10,
                  }),
                }}
                onChange={handleSelect1}
              />
            </div>
            <div className='Country'>
              <h1 className='TitleText'> Country: </h1>
              <Select 
                maxMenuHeight={150}
                label="Country"
                options={options2}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 15,
                  colors: {
                    ...theme.colors,
                    primary25: 'hotpink',
                    primary: 'purple',
                  }
                })}
                styles={{
                  menu: dpi => ({
                    ...dpi,
                    height: '150px',
                    overflowY: 'clip'

                  }),
                  container: style => ({
                    ...style,
                    width: '60%',
                    marginLeft: '20%'
                  }),
                  option: (base) => ({
                    ...base,
                    height: '100%',
                    borderRadius: 10,
                  }),
                }}
                onChange={handleSelect2}
              />
            </div>
            <button className='AppButtons' onClick={sendBackendRequest}><b>Refresh</b></button>
          </div>
          
          <div className='Column_2'>
          {            <HighchartsReact
            highcharts={Highcharts}
            options={highchartOptions}
          />}
          </div>
        </div>
      </div>
      <div className='Options'>
        <button className='About'> About </button>
        <button className='Plans' onClick={handlePlans}> Plans </button>
        <button className='Legal'> Legal </button>
      </div>

    </div>
    )
  }
}



export default AtlPage;