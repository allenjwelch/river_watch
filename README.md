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
- ...

#### Upcoming
- Update rating logic
- Additional links for more information
- ratings key to better explain the rating system
- update weather logic to use temperature and percipitation from hourly data beyond current time
- update user message on addtional info needed
- add messages when conditions are not within ideal range
- add toggle for different river acitivities to adjust ideal flow rate range
- update favicon
- create desktop view