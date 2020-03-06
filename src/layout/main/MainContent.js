import React , { useContext  }from 'react';
import { GlobalAppContext } from './../../context';

import reactLogo from '../../images/logo.svg'

function MainContent() {

    const { toggled , setToggled , hasBackground, setHasBackground } = useContext(
        GlobalAppContext
    );

    return (
        <main class="page-content">
            <div class="container-fluid">
                <div class="row">
                    <div class="form-group col-md-12">
                        <h2> <img src={reactLogo} alt="React logo" width="90px" /> React Sidebar Template</h2>
                        <hr />
                        <p>This is a responsive sidebar template with dropdown menu built with React > 16.8 and bootstrap 4.</p>
                        <hr />
                        <a href="#/" class="btn btn-outline-secondary mr-1" onClick={() =>setToggled(!toggled)}>Toggle Sidebar</a>
                        <a href="#/" class="btn btn-secondary" onClick={() =>setHasBackground(!hasBackground)} >Toggle Background Image</a>
                    </div>
                </div>
                <div class="attribution text-center badge badge-warning">
                    Created by <strong>Azouaoui Mohamed & BRIMOS</strong> 
                    </div>
            </div>
            <div class="overlay"></div>
        </main>
    )
}

export default MainContent;