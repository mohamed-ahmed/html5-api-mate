HTML5 API Mate
==============

An application accessible through the browser to generate events for the BigBlueButton HTML5 Client.


## Installation
Clone the respository to your machine
In the root directory of the repository, use npm to install the dependencies (express.js, jade, socket.io, redis).
    
    npm install
  
## Usage

 Starting the application
 
    node app.js
    
The application is then accessible through the browswer at localhost:4000    
    
 Using the API
 

 * Insert event message  text into the JSON input area
 * Use JSONLint link below text area to verify JSON is valid
 * Add predefined message buttons like the whiteBoardMake shape and whiteBoardUpdate shape buttons which are there   
 (requires correct meetingID and sessionID to be entered in input boxes)
