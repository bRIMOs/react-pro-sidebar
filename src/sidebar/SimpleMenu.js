import React from 'react';

function SimpleMenu(props) {
    
    let menu = props.menu;

    return (
        <li>
            <a href="#s">
                <i className={menu.icon}></i>
                <span className="menu-text">{menu.title}</span>
                { menu.badge ? <span className={"badge badge-pill "+menu.badge.class}> {menu.badge.text} </span> : "" }
            </a> 
        </li>
    );
}

export default SimpleMenu;