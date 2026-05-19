# River Watch  
Check relevant conditions for a day on the river. Pulls API data from USGS Water Sites and Open Weather API to determine an approximate rating for overall conditions.   

**GitHub:** https://github.com/allenjwelch/river_watch  
**Deployed:** http://river-watch.herokuapp.com/

[![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](#)
[![Sass](https://img.shields.io/badge/Sass-C69?logo=sass&logoColor=fff)](#)
![Ant-Design](https://img.shields.io/badge/-AntDesign-%230170FE.svg?&logo=ant-design&logoColor=white)
[![Weather-Icons-React](https://img.shields.io/badge/Weather%20Icons%20React-orange)](#)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=github-actions&logoColor=white)](#)
[![Heroku](https://img.shields.io/badge/Heroku-%23430098?&logo=heroku&logoColor=white)](#)


## Installation
```bash
npm i  
npm start
```

## Secrets
All applications secrets are stored in `.env` and not pushed to repository.
* REACT_APP_WEATHER_KEY: OpenWeather API Key


## Deployment
1. [Install Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#install-the-heroku-cli)  
2. Manually update version in `package.json`
3. `heroku git:remote -a river-watch` - Add heroku git remote  
4. `git push heroku master` - Deploy from command line  
  

## Service Calls  
* [USGS Water Services](https://waterservices.usgs.gov/) - General information and directory of the USGS Water Sites and Stations  
* [USGS REST Services and URL Generation Tool](https://waterservices.usgs.gov/rest/Site-Service.html) - Online tool for generating API URL with site information and parameter list    
* [Open Weather API](https://openweathermap.org/api) - Current, daily, and hourly  weather data  


## Resources  
* [Chattahoochee Flow Rate](https://www.nps.gov/chat/planyourvisit/river-flow-rate.htm)  
* [BacteriAlert](https://www2.usgs.gov/water/southatlantic/ga/bacteria/index.php)  
* [Markdown Badges](https://github.com/Ileriayo/markdown-badges)  
* [MD Badges](https://github.com/inttter/md-badges)  


## Changelog  
### v0.1.0  
- Initial build
- Test design concept

### v0.2.0
- Updates rating logic with ideal, sub, and warning ranges  
- Updates weather specific logic to use percipitation from hourly data beyond current time
- Updates the user message & logic when missing site information
- Adds refresh ability for site data
- Updates favicon

### v0.2.7
- Adds responsive layout for desktop
- Adds "empty" icon when missing weather data
- Corrects missing Water Station name
  
### Upcoming
- Update Heroku Stack
- Set default if station name is not matching
- Additional links for more information
- ratings key to better explain the rating system (antd visual scale)
- add messages when conditions are not within ideal range
- add toggle for different river acitivities to adjust ideal flow rate range
- create desktop view
- create cd pipeline for deployments
- add warning text for areas known to not allow certain activities
- clean code