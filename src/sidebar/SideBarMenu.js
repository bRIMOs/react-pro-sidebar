import React, { useState } from 'react';
import userImage from '../images/user.jpg'
import { Scrollbars } from 'react-custom-scrollbars';
import SideBarConfig from './MenuConfig';




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
    
    const handleMenuDropDownClick = (index) => {
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
                let menuContent = ""; let klass = ""; let subMenuContent ; let subMenus = [];
                menu.type === 'dropdown' ? klass = "sidebar-dropdown" : ( menu.type === 'header' ? klass = "header-menu" : klass = "" );
                
    
                if (menu.type === 'header') {
                    menuContent = <span>{menu.title}</span>;
                } else {
                    if( menu.type === 'dropdown' ) {
                        if(menu.submenus.length) {
                            subMenus = menu.submenus.forEach( (submenu,index) => {
                                return (
                                    <li key={index}>
                                        <a href="#e"> {submenu.title}
                                            { submenu.badge ? <span className={"badge badge-pill "+submenu.badge.class}> {submenu.badge.text} </span> : "" } 
                                        </a>
                                    </li>
                                );
                            });
                            subMenuContent = <div className="sidebar-submenu" ><ul> {subMenus} </ul></div>;
                        }
                        
                    }
                    menuContent = <a href="#s">
                                    <i className={menu.icon}></i>
                                    <span className="menu-text">{menu.title}</span>
                                    { menu.badge ? <span className={"badge badge-pill "+menu.badge.class}> {menu.badge.text} </span> : "" }
                                  </a> 
                }
                let liElementList = "";
                if(menu.type === 'dropdown' ) {
                    liElementList = <li key={index} onClick={ (e) =>{ handleMenuDropDownClick(index)} } className={menuItems[index] ? ( menuItems[index].active ? klass +" active" : klass) : klass } >{menuContent}{subMenuContent}</li>;
                } else {
                    liElementList =  <li key={index} className={klass} >{menuContent}{subMenuContent}</li>
                }
                return liElementList;
            })
        )
    }
    //console.log(SideBarConfig);

    return (
        <nav id="sidebar" className="sidebar-wrapper">
            <div className="sidebar-content">
                <Scrollbars
                    renderThumbVertical={ renderCustomHorizontalThumb }>
                    <div className="sidebar-item sidebar-brand">
                        <a href="#s">pro sidebar</a>
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

                           {/* <li className="header-menu">
                                <span>General</span>
                            </li>
                            <li onClick={(e)=> {
                                e.stopPropagation()
                                let classList = e.currentTarget.classList;
                                console.log(classList.contains("active") ? classList.remove("active") : classList.add("active") );
                                console.log(this);
                                console.log(this);
                            }}
                            className="sidebar-dropdown">
                                <a href="#toremove">
                                    <i className="fa fa-tachometer-alt"></i>
                                    <span className="menu-text">Dashboard</span>
                                    <span className="badge badge-pill badge-warning">New</span>
                                </a>
                                <div className="sidebar-submenu">
                                    <ul>
                                        <li>
                                            <a href="#toremove">Dashboard 1
                                                <span className="badge badge-pill badge-success">Pro</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#toremove">Dashboard 2</a>
                                        </li>
                                        <li>
                                            <a href="#toremove">Dashboard 3</a>
                                        </li>
                                    </ul>
                                </div>                    
                            </li>
                            <li className="sidebar-dropdown">
                                <a href="#toremove">
                                    <i className="fa fa-shopping-cart"></i>
                                    <span className="menu-text">E-commerce</span>
                                    <span className="badge badge-pill badge-danger">3</span>
                                </a>
                                <div className="sidebar-submenu">
                                    <ul>
                                        <li>
                                            <a href="#toremove">Products

                                            </a>
                                        </li>
                                        <li>
                                            <a href="#toremove">Orders</a>
                                        </li>
                                        <li>
                                            <a href="#toremove">Credit cart</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="sidebar-dropdown">
                                <a href="#toremove">
                                    <i className="far fa-gem"></i>
                                    <span className="menu-text">Components</span>
                                </a>
                                <div className="sidebar-submenu">
                                    <ul>
                                        <li>
                                            <a href="#toremove">General</a>
                                        </li>
                                        <li>
                                            <a href="#toremove">Panels</a>
                                        </li>
                                        <li>
                                            <a href="#toremove">Tables</a>
                                        </li>
                                        <li>
                                            <a href="#toremove">Icons</a>
                                        </li>
                                        <li>
                                            <a href="#toremove">Forms</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="sidebar-dropdown">
                                <a href="#toremove">
                                    <i className="fa fa-chart-line"></i>
                                    <span className="menu-text">Charts</span>
                                </a>
                                <div className="sidebar-submenu">
                                    <ul>
                                        <li>
                                            <a href="#toremove">Pie chart</a>
                                        </li>
                                        <li>
                                            <a href="#toremove">Line chart</a>
                                        </li>
                                        <li>
                                            <a href="#toremove">Bar chart</a>
                                        </li>
                                        <li>
                                            <a href="#toremove">Histogram</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="sidebar-dropdown">
                                <a href="#toremove">
                                    <i className="fa fa-globe"></i>
                                    <span className="menu-text">Maps</span>
                                </a>
                                <div className="sidebar-submenu">
                                    <ul>
                                        <li>
                                            <a href="#toremove">Google maps</a>
                                        </li>
                                        <li>
                                            <a href="#toremove">Open street map</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="header-menu">
                                <span>Extra</span>
                            </li>
                            <li>
                                <a href="#toremove">
                                    <i className="fa fa-book"></i>
                                    <span className="menu-text">Documentation</span>
                                    <span className="badge badge-pill badge-primary">Beta</span>
                                </a>
                            </li>
                            <li>
                                <a href="#toremove">
                                    <i className="fa fa-calendar"></i>
                                    <span className="menu-text">Calendar</span>
                                </a>
                            </li>
                            <li>
                                <a href="#toremove">
                                    <i className="fa fa-folder"></i>
                                    <span className="menu-text">Examples</span>
                                </a>
                            </li> */}
                        </ul>
                    </div>
                </Scrollbars>
            </div>
            <div className="sidebar-footer">
                <div className="dropdown">

                    <a href="#toremove" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-bell"></i>
                        <span className="badge badge-pill badge-warning notification">3</span>
                    </a>
                    <div className="dropdown-menu notifications" aria-labelledby="dropdownMenuMessage">
                        <div className="notifications-header">
                            <i className="fa fa-bell"></i>
                            Notifications
                        </div>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#toremove">
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
                        </a>
                        <a className="dropdown-item" href="#toremove">
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
                        </a>
                        <a className="dropdown-item" href="#toremove">
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
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item text-center" href="#toremove">View all notifications</a>
                    </div>
                </div>
                <div className="dropdown">
                    <a href="#toremove" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-envelope"></i>
                        <span className="badge badge-pill badge-success notification">7</span>
                    </a>
                    <div className="dropdown-menu messages" aria-labelledby="dropdownMenuMessage">
                        <div className="messages-header">
                            <i className="fa fa-envelope"></i>
                            Messages
                        </div>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#toremove">
                            <div className="message-content">
                                <div className="pic">
                                    <img src="img/user.jpg" alt="" />
                                </div>
                                <div className="content">
                                    <div className="message-title">
                                        <strong> Jhon doe</strong>
                                    </div>
                                    <div className="message-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                                        elit. In totam explicabo</div>
                                </div>
                            </div>

                        </a>
                        <a className="dropdown-item" href="#toremove">
                            <div className="message-content">
                                <div className="pic">
                                    <img src="img/user.jpg" alt="" />
                                </div>
                                <div className="content">
                                    <div className="message-title">
                                        <strong> Jhon doe</strong>
                                    </div>
                                    <div className="message-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                                        elit. In totam explicabo</div>
                                </div>
                            </div>

                        </a>
                        <a className="dropdown-item" href="#toremove">
                            <div className="message-content">
                                <div className="pic">
                                    <img src="img/user.jpg" alt="" />
                                </div>
                                <div className="content">
                                    <div className="message-title">
                                        <strong> Jhon doe</strong>
                                    </div>
                                    <div className="message-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                                        elit. In totam explicabo</div>
                                </div>
                            </div>
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item text-center" href="#toremove">View all messages</a>

                    </div>
                </div>
                <div className="dropdown">
                    <a href="#toremove" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-cog"></i>
                        <span className="badge-sonar"></span>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuMessage">
                        <a className="dropdown-item" href="#toremove">My profile</a>
                        <a className="dropdown-item" href="#toremove">Help</a>
                        <a className="dropdown-item" href="#toremove">Setting</a>
                    </div>
                </div>
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
