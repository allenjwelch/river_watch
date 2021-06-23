import React, { useState, useEffect } from 'react';
import { Button, Col, Drawer, Menu as AntMenu, Row, Select } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { LOCATION_DATA } from '../../constants';

import './Menu.scss';

const { Item, ItemGroup, SubMenu } = AntMenu;
const { Option } = Select;

const CN = 'menu';

const Menu = ({ riverLocation, setRiverLocation, setMenuOpen }) => {

    const [riverList, setRiverList] = useState([]);
    const [sectionList, setSectionList] = useState([]);
    const [river, setRiver] = useState(null);
    const [section, setSection] = useState(null);

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


    console.log('riverList - ', riverList);
    console.log('sectionList - ', sectionList);
    
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
                        <h4>Put-Ins Locations for {sectionData.NAME} Section</h4>
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
                        defaultValue={riverLocation.river} 
                        style={{ width: '100%' }} 
                        onChange={(value) => setRiver(value)}
                    >
                        { riverList && riverList.map(riv => (
                            <Option key={riv.key} value={riv.key}>{riv.value}</Option>
                        ))}
                    </Select>

                    <Select 
                        defaultValue={riverLocation.section} 
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

    // return (
    //     <AntMenu
    //         // onClick={this.handleClick}
    //         // style={{ width: 256 }}
    //         defaultSelectedKeys={['1']}
    //         defaultOpenKeys={['sub1']}
    //         mode="inline"
    //     >
    //         <SubMenu key="sub2" icon={<AppstoreOutlined />} title="River Selection">
    //             <SubMenu key="sub3" title="Chattahoochee">
    //                 <Item key="7">
    //                     Roswell
                    
    //                     Riverside Park
    //                     Chattahoochee RIver Park
    //                     Chattahoochee Nature Center
    //                     Overlook Park
    //                 </Item>
    //                 <Item key="8">Atlanta</Item>
    //             </SubMenu>
    //             <SubMenu key="antoher" title="Another River">
    //                 <Item key="this">This</Item>
    //                 <Item key="that">That</Item>
    //             </SubMenu>
    //         </SubMenu>
    //         <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
    //             <Item key="9">Option 9</Item>
    //             <Item key="10">Option 10</Item>
    //             <Item key="11">Option 11</Item>
    //             <Item key="12">Option 12</Item>
    //         </SubMenu>
    //     </AntMenu>
    // )

};

export default Menu;