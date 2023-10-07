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
1. Run the shell script cluster-start.sh (starting cluster brokers brokers)
2. Run npm start inside the frontend folder in order to load the Frontend part of our Software on your browser
3. Run inside the API folder the following instructions in order to start the servers of the microservices
  * npm run start:atl_consumer
  * npm run start:agpt_consumer
  * npm run start:users
  * npm run start:atl_producer
  * npm run start:agpt_producer

## NOTICE
Producers read a csv file every 5 seconds so as to simulate the data being updated (every one hour in reality).
