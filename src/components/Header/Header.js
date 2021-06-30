import React from 'react';
import { Col, Row } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
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
                <MenuOutlined />
            </div>
        </Col>
    </Row>
);

export default Header;