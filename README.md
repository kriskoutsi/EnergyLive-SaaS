# EnergyLive-SaaS
## Dependencies
* MySQL/MariaDB for the databases

## Node.js with the following packages
* avsc
* axios
* body-parser
* cors
* express
* kafkajs
* mysql
* node-rdkafka
* socket.io

## React.js with the following packages
* axios
* gapi-script
* highcharts
* highcharts-react-official
* moment
* react
* react-counter-input
* react-dom
* react-element-popper
* react-google-login
* react-multi-date-picker
* react-router
* react-router-dom
* react-scripts
* react-select
* socket.io-client

## How to run locally
```console
foo@bar:~$ ./cluster-start.sh
foo@bar:~$ cd frontend
foo@bar:/frontend$ npm start
foo@bar:~$ cd API
foo@bar:API$ npm run start:atl_consumer
foo@bar:API$ npm run start:agpt_consumer
foo@bar:API$ npm run start:users
foo@bar:API$ npm run start:atl_producer
foo@bar:API$ npm run start:agpt_producer
```

## NOTICE
Producers read a csv file every 5 seconds so as to simulate the data being updated (every one hour in reality).
