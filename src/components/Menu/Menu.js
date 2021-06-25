import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Select } from 'antd';
import { LOCATION_DATA } from '../../constants';

import './Menu.scss';

const { Option } = Select;

const CN = 'menu';

const Menu = ({ riverLocation, setRiverLocation, setMenuOpen }) => {

    const [riverList, setRiverList] = useState([]);
    const [sectionList, setSectionList] = useState([]);
    const [river, setRiver] = useState(riverLocation.river);
    const [section, setSection] = useState(riverLocation.section);

    useEffect(() => {
        const defaultRivers = Object.entries(LOCATION_DATA).map(([key, value]) => {
            return { key, value: value.NAME };
        });

        setRiverList(defaultRivers);
        setRiver(riverLocation.river);
        setSection(riverLocation.section);
    }, []);

    useEffect(() => {
        if (river) {
            const riverSections = Object.entries(LOCATION_DATA[river].SECTION_DATA).map(([key, value]) => {
                return { key, value: value.NAME };
            })
    
            setSectionList(riverSections);
        }
    }, [river]);

    const setNewRiver = (value) => {
        if (value){
            setRiver(value);
            setSection(null);
        }
    };

    const setNewLocation = () => {
        if (river && section) {
            setRiverLocation({ river, section });
            setMenuOpen(false);
        }
    }

    const renderPutinInfo = () => {
        const sectionData = LOCATION_DATA[river].SECTION_DATA[section];
        
        return (
            <>
                <Row className="putins-row">
                    <Col span={24}>
                        <h4>Put-in locations for the {sectionData.NAME} run</h4>
                        <div>
                        {
                            sectionData.PUT_INS.map(putin => (
                                <p key={putin.NAME}>{putin.NAME}</p>
                            ))
                        }
                        </div>
                    </Col>
                </Row>

                <Row className="btn-row">
                    <Col span={24}>
                        <Button type="primary" onClick={() => setNewLocation()}>Set Area</Button>
                    </Col>
                </Row>
            </>
        );
    };

    return (
        <div className={CN}>
            <Row className="selection-row">
                <Col span={24}>
                    <Select 
                        value={river} 
                        style={{ width: '100%' }} 
                        onChange={setNewRiver}
                    >
                        { riverList && riverList.map(riv => (
                            <Option key={riv.key} value={riv.key}>{riv.value}</Option>
                        ))}
                    </Select>

                    <Select 
                        value={section || null}
                        placeholder="Select river section"
                        style={{ width: '100%' }} 
                        onChange={(value) => setSection(value)}
                    >
                        { sectionList && sectionList.map(sec => (
                            <Option key={sec.key} value={sec.key}>{sec.value}</Option>
                        ))}
                    </Select>
                </Col>
            </Row>
            
            { section && renderPutinInfo() }
            
            

        </div>
        
    )

};

export default Menu;