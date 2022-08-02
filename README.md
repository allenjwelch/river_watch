# River Watch  
Check relevant conditions for a day on the river. Pulls API data from USGS Water Sites and Open Weather API to determine an approximate rating for overall conditions.   

### Installation 
`npm i`  
`npm start`


### Dependencies  
- React
- Antd
- Sass
- Weather-Icons-React


### Deployment
1 - [Install Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#install-the-heroku-cli)  
2- `heroku git:remote -a river-watch` - Add heroku git remote  
3- `git push heroku master` - Deploy from command line
  
[http://river-watch.herokuapp.com/](http://river-watch.herokuapp.com/)  


### Service Calls  
[USGS Water Services](https://waterservices.usgs.gov/) - General information and directory of the USGS Water Sites and Stations  

[USGS REST Services and URL Generation Tool](https://waterservices.usgs.gov/rest/Site-Service.html) - Online tool for generating API URL with site information and parameter list    

[Open Weather API](https://openweathermap.org/api) - Current, daily, and hourly  weather data  


### Resources  
[Chattahoochee Flow Rate](https://www.nps.gov/chat/planyourvisit/river-flow-rate.htm)  

[BacteriAlert](https://www2.usgs.gov/water/southatlantic/ga/bacteria/index.php)  


### Changelog  
#### v0.1.0  
- Initial build
- Test design concept

#### v0.2.0
- Updates rating logic with ideal, sub, and warning ranges  
- Updates weather specific logic to use percipitation from hourly data beyond current time
- Updates the user message & logic when missing site information
- Adds refresh ability for site data
- Updates favicon
  
#### Upcoming
- Additional links for more information
- ratings key to better explain the rating system (antd visual scale)
- add messages when conditions are not within ideal range
- add toggle for different river acitivities to adjust ideal flow rate range
- create desktop view
- create cd pipeline for deployments
- add warning text for areas known to not allow certain activities
- clean code