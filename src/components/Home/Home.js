import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Collapse, Drawer, Row, Spin } from 'antd';
import { InfoOutlined, LoadingOutlined } from '@ant-design/icons';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import Rating from '../Rating/Rating';
import Station from '../Station/Station';
import Weather from '../Weather/Weather';
import { getConditions, getWeather } from '../../utils/axios';
import { conditionsParser } from '../../utils/conditionsParser';
import { calculateOverallRating } from '../../utils/calculateRating';
import { RIVERS, ERROR_MESSAGES, LOCATION_DATA } from '../../constants';

import './Home.scss';

const { Panel } = Collapse;

const CN = 'home-page';

const Home = () => {

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const defaultLocation = {
        river: RIVERS.CHATT,
        section: LOCATION_DATA[RIVERS.CHATT].SECTIONS.N_ATL
    }

    const [riverLocation, setRiverLocation] = useState(defaultLocation);
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [rating, setRating] = useState(null);
    const [riverData, setRiverData] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [isInfoDrawerOpen, setInfoDrawerOpen] = useState(false);

    const getCurrentRiverData = async () => {
        try {
            const response = await getConditions(riverLocation);
            if (response && response.status === 200) {
                setRiverData(conditionsParser(response.data, riverLocation))
            }
        } catch (err) {
            console.warn(err);
        }
        setLoading(false);
    }

    const getCurrentWeather = async () => {
        setLoading(true);

        try {
            const response = await getWeather(riverLocation);
            if (response && response.status === 200) {
                setWeatherData(response.data)
            }
            getCurrentRiverData();
        } catch (err) {
            console.warn(err);
        }
    }

    useEffect(() => {
        getCurrentWeather();
    }, [riverLocation]);

    useEffect(() => {
        if (!loading) {
            const getRating = calculateOverallRating(riverData, weatherData);
            setRating(getRating);
        }

    }, [loading, riverData, weatherData]);

    const renderStationInfo = () => {
        if (riverData) {
            console.log(riverData);
            return (
                <div className='water-stations'>

                    <Card 
                        // size="small" 
                        title='Water Stations'
                        className='stations'
                        // extra={<a href="#">More</a>} 
                        bordered={false}
                        style={{ padding: '0 5%' }}
                        headStyle={{ textAlign: 'center', fontWeight: '700' }}
                    >
                        <Collapse 
                            defaultActiveKey={['']} 
                            ghost
                        >
                            {
                                riverData.sites.map(site => (
                                    <Panel header={site.name} key={site.name}>
                                        <Station name={site.name} key={site.name} siteData={site} />
                                    </Panel>
                                ))
                            }
                        
                        </Collapse>
                    </Card>
                </div>
            );
        }
        return <p className='error'>{ERROR_MESSAGES.NO_WATER}</p>;
    };

    const renderInfoSection = () => (
        <>
            <Row className="rating-weather-row" justify="center" align="middle">
                <Col md={24} lg={10}>
                    <Rating rating={rating} setRating={setRating} />
                </Col>
                <Col md={24} lg={10}>
                    <Weather weatherData={weatherData} />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    { renderStationInfo() }
                </Col>
            </Row>
        </>
    );


    return (
        <main className={CN}>
            <Header
                riverLocation={riverLocation}
                isMenuOpen={isMenuOpen}
                setMenuOpen={setMenuOpen}
                getCurrentWeather={getCurrentWeather}
            />
            <section className='info'>
                {
                    loading
                        ? <Spin indicator={antIcon} tip="Loading..." className="loader" />
                        : renderInfoSection() 
                }
            </section>
            <Drawer
                title="Set Location"
                width={'80%'}
                height="100%"
                closable={true}
                onClose={() => setMenuOpen(false)}
                visible={isMenuOpen}
                placement="bottom"
            >
                <Menu 
                    riverLocation={riverLocation} 
                    setRiverLocation={setRiverLocation}
                    setMenuOpen={setMenuOpen}
                />
            </Drawer>
            <footer>
                <h4>v0.3.0</h4>
                <h4>Allen Welch 2021</h4>
            </footer>

            { riverLocation.river == 'CHATT'
             ? (<Button
                    className="info-btn"
                    shape="circle"
                    icon={<InfoOutlined />}
                    onClick={() => setInfoDrawerOpen(true)}
                />) 
            : <></>}

            <Drawer
                // title="Resources"
                width={'80%'}
                height="160px"
                closable={false}
                onClose={() => setInfoDrawerOpen(false)}
                visible={isInfoDrawerOpen}
                placement="bottom"
            >
                <div className="info-drawer">
                    <p style={{ paddingBottom: 10 }}><i>For more information on conditions of the Chattahoochee River:</i></p>
                    <p><a href='https://www.nps.gov/chat/planyourvisit/river-flow-rate.htm' target='_blank'>Chattahoochee Flow Rate</a></p>
                    <p><a href='https://ga.water.usgs.gov/bacteria/' target='_blank'>BacteriAlert</a></p>
                </div>
            </Drawer>

            
            
        </main>
    )
};

export default Home;