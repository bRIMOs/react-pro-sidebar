import React, { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import SideBarConfig from './MenuConfig';

import DropdownMenu from './DropdownMenu';
import SimpleMenu from './SimpleMenu';
import Dropdown from 'react-bootstrap/Dropdown';

import userImage from '../../images/user.jpg';

let renderCustomHorizontalThumb = ({ style, ...props }) => {
                        
    const thumbStyle = {
        backgroundColor: `rgba(255,255,255,0.3)`,
        width:'4px',
        right:'-2px'
    };
    return (
        <div
            style={{ ...style, ...thumbStyle }}
            {...props}/>
    );
}




function SideBarMenu() {

    let initialMenuItems = [];
    SideBarConfig.menus.forEach( (menu, index) => {
        let active = menu.active ? menu.active : false;
        initialMenuItems.push({
            active:active
        });
    });

    
    const [menuItems , setMenuItems] = useState(initialMenuItems);
    
    const handleMenuDropDownClick = (e,index) => {
        let newArray = menuItems.map( ( item, idx ) => {
            // check if index equal to current clicked so put inverse value otherwise set to false (collapse other menu)
            (index === idx) ? item.active = !item.active : item.active = false;
            return item;
        });
        setMenuItems([
            ...newArray
        ]);
    }
    
    const renderSideBarMenuItem = () => {
        return !SideBarConfig["menus"].length ? "" : (
            
            SideBarConfig.menus.map( (menu , index ) => {
                
                let liElementList = "";
                if (menu.type === 'header') {
                    liElementList = <li className="header-menu"><span>{menu.title}</span></li>;
                }else if(menu.type === 'dropdown' ) {
                    liElementList = <DropdownMenu menu={menu}  active={menuItems[index].active} key={"sidebar"+index} handleClick={(e) => handleMenuDropDownClick(e,index) } />;
                } else if(menu.type === 'simple' ) {
                    liElementList =  <SimpleMenu menu={menu} />;
                }
                return liElementList;
            })
        )
    }

    const CustomDropDownToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
          href="#/nothing"
          ref={ref}
          onClick={e => {
            e.preventDefault();
            onClick(e);
          }}
        >
          {children}
        </a>
    ));

    return (
        <nav id="sidebar" className="sidebar-wrapper">
            <div className="sidebar-content">
                <Scrollbars
                    renderThumbVertical={ renderCustomHorizontalThumb }>
                    <div className="sidebar-item sidebar-brand">
                        <a href="#/header">pro sidebar</a>
                    </div>
                    <div className="sidebar-item sidebar-header d-flex flex-nowrap">
                        <div className="user-pic">
                            <img className="img-responsive img-rounded" src={userImage} alt="User " />
                        </div>
                        <div className="user-info">
                            <span className="user-name">Jhon 
                                <strong> Smith</strong>
                            </span>
                            <span className="user-role"> Administrator</span>
                            <span className="user-status">
                                <i className="fa fa-circle"></i>
                                <span> Online</span>
                            </span>
                        </div>
                    </div>
                    <div className="sidebar-item sidebar-search">
                        <div>
                            <div className="input-group">
                                <input type="text" className="form-control search-menu" placeholder="Search..." />
                                <div className="input-group-append">
                                    <span className="input-group-text">
                                        <i className="fa fa-search" aria-hidden="true"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" sidebar-item sidebar-menu">
                         <ul>
                           {renderSideBarMenuItem()}
                        
                        </ul>
                    </div>
                </Scrollbars>
            </div>
            <div className="sidebar-footer">
                <Dropdown>
                    <Dropdown.Toggle as={CustomDropDownToggle} id="dropdown-basic">
                        <i className="fa fa-bell"></i>
                        <span className="badge badge-pill badge-warning notification">3</span>
                    </Dropdown.Toggle>
                    
                    <Dropdown.Menu className="notifications" >
                        <Dropdown.Header className="notifications-header" >
                            <i className="fa fa-bell"></i>
                            &nbsp;Notifications
                        </Dropdown.Header>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#/toremove">
                        <div className="notification-content">
                                <div className="icon">
                                    <i className="fas fa-check text-success border border-success"></i>
                                </div>
                                <div className="content">
                                    <div className="notification-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                                        elit. In totam explicabo</div>
                                    <div className="notification-time">
                                        6 minutes ago
                                    </div>
                                </div>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/toremove">
                        <div className="notification-content">
                                <div className="icon">
                                    <i className="fas fa-exclamation text-info border border-info"></i>
                                </div>
                                <div className="content">
                                    <div className="notification-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                                        elit. In totam explicabo</div>
                                    <div className="notification-time">
                                        Today
                                    </div>
                                </div>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/toremove">
                            <div className="notification-content">
                                <div className="icon">
                                    <i className="fas fa-exclamation-triangle text-warning border border-warning"></i>
                                </div>
                                <div className="content">
                                    <div className="notification-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                                        elit. In totam explicabo</div>
                                    <div className="notification-time">
                                        Yesterday
                                    </div>
                                </div>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item className="text-center" href="#/toremove">
                            View all notifications
                        </Dropdown.Item>
                    </Dropdown.Menu>    
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle as={CustomDropDownToggle} id="dropdown-basic">
                        <i className="fa fa-envelope"></i>
                        <span className="badge badge-pill badge-success notification">7</span>
                    </Dropdown.Toggle>
                    
                    <Dropdown.Menu className="messages" >
                        <Dropdown.Header>
                            <i className="fa fa-envelope"> </i> 
                            &nbsp;Messages
                        </Dropdown.Header>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#/toremove">
                            <div className="message-content">
                                <div className="pic">
                                    <img src={userImage} alt="" />
                                </div>
                                <div className="content">
                                    <div className="message-title">
                                        <strong> Jhon doe</strong>
                                    </div>
                                    <div className="message-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                                        elit. In totam explicabo</div>
                                </div>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/toremove">
                            <div className="message-content">
                                <div className="pic">
                                    <img src={userImage} alt="" />
                                </div>
                                <div className="content">
                                    <div className="message-title">
                                        <strong> Jhon doe</strong>
                                    </div>
                                    <div className="message-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                                        elit. In totam explicabo</div>
                                </div>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/toremove">
                            <div className="message-content">
                                <div className="pic">
                                    <img src={userImage} alt="" />
                                </div>
                                <div className="content">
                                    <div className="message-title">
                                        <strong> Jhon doe</strong>
                                    </div>
                                    <div className="message-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                                        elit. In totam explicabo</div>
                                </div>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item className="text-center" href="#/toremove">
                            View all messages
                        </Dropdown.Item>
                    </Dropdown.Menu>    
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle as={CustomDropDownToggle} id="dropdown-basic">
                        <i className="fa fa-cog"></i>
                        <span className="badge-sonar"></span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu  >
                        <Dropdown.Item href="#/toremove">My profile</Dropdown.Item>
                        <Dropdown.Item href="#/toremove">Help</Dropdown.Item>
                        <Dropdown.Item href="#/toremove">Setting</Dropdown.Item>
                    </Dropdown.Menu>    
                </Dropdown>
                {/* <div className="dropdown">
                    <a href="#toremove" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-cog"></i>
                        <span className="badge-sonar"></span>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuMessage">
                        <a className="dropdown-item" href="#toremove">My profile</a>
                        <a className="dropdown-item" href="#toremove">Help</a>
                        <a className="dropdown-item" href="#toremove">Setting</a>
                    </div>
                </div> */}
                <div>
                    <a href="#toremove">
                        <i className="fa fa-power-off"></i>
                    </a>
                </div>
                <div className="pinned-footer">
                    <a href="#toremove">
                        <i className="fas fa-ellipsis-h"></i>
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default SideBarMenu;
