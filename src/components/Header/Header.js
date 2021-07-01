import React from 'react';
import { Col, Row } from 'antd';
import { MenuOutlined, AimOutlined, SearchOutlined } from '@ant-design/icons';
import { LOCATION_DATA } from '../../constants';

import './Header.scss';

const CN = 'header';

const Header = ({ riverLocation, isMenuOpen, setMenuOpen }) => (
    <Row className={CN} justify="space-between">
        <Col offset={5} span={14} className="title-col">
            <h3>{LOCATION_DATA[riverLocation.river].NAME}</h3>
            <h4>{LOCATION_DATA[riverLocation.river].SECTION_DATA[riverLocation.section].NAME}</h4>
        </Col>
        <Col span={5} className="menu-col">
            <div id="veggieburger" onClick={() => setMenuOpen(!isMenuOpen)}>
                {/* <AimOutlined /> */}
                <MenuOutlined />
                {/* <SearchOutlined /> */}
                {/* <img className="location-icon" src="./location2.png" alt="location" /> */}
                {/* <img className="river-icon" src="./river2.png" alt="menu" /> */}
            </div>
        </Col>
    </Row>
);

export default Header;