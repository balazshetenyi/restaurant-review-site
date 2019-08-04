import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <header className="Header">

                <div className="logo">
                    <h1 className="title">Restaurant review site</h1>
                </div>

                <nav>
                    <ul>
                        <li className="first">
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/Restaurants">Restaurants</a>
                        </li>
                        <li className="last">
                            <a href="/">Contacts</a>
                        </li>
                    </ul>
                </nav>

            </header>
        );
    }
}


export default Header;