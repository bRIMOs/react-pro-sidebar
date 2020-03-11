import React/*, { useState } */from 'react';
import { animated } from 'react-spring'
import {Spring} from 'react-spring/renderprops';

function DropdownMenu(props) {

    let closedStyle = {
        height: 0
    }

    let openStyle = {
        height: "auto"
    }
    
    // state used when trying to let all menu open 
    //let [open, setOpen] =useState(props.active);

    const handleMenuDropDownClick = (e) => {
        props.handleClick();
        //setOpen(!open);
    }

    let menu = props.menu;
    let subMenus,subMenuContent,menuContent;

    if(menu.submenus.length) {
        subMenus = menu.submenus.map( (submenu,index) => {
            return (
                <li key={index}>
                    <a href="#e"> {submenu.title}
                        { submenu.badge ? <span className={"badge badge-pill "+submenu.badge.class}> {submenu.badge.text} </span> : "" } 
                    </a>
                </li>
            );
        });
        subMenuContent= <Spring  from={openStyle} to={ props.active ? openStyle : closedStyle }>
                            { props => 
                                <animated.div className="sidebar-submenu" style={props} >
                                    <ul> {subMenus} </ul>
                                </animated.div>
                            }
                        </Spring>
    }
    const linkMenu =<a href="#s" onClick={(e) => { handleMenuDropDownClick(e)}}>
                        <i className={menu.icon}></i>
                        <span className="menu-text">{menu.title}</span>
                        { menu.badge ? <span className={"badge badge-pill "+menu.badge.class}> {menu.badge.text} </span> : "" }
                    </a> 
    menuContent = <> {linkMenu} {subMenuContent} </>


    
    return (
        <li className={props.active ? "sidebar-dropdown active" : "sidebar-dropdown" } >
            {menuContent}
        </li>
    );

}

export default DropdownMenu;