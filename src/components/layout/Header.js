import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = props => { // Here you pass the props parameter to get the props "branding".

    const { branding } = props; // Here you prefix all the props with "props." "destructuring";
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
            <div className="container">
        <a href="/" className="navbar-brand">{branding}</a>
                <div>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                <i className="fas fa-home mr-2"/>
                                 Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact/add" className="nav-link">
                                <i className="fas fa-plus mr-2"/>
                                Add
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="nav-link">
                                <i className="fas fa-question mr-2"/>
                                About
                            </Link>
                        </li>
                    </ul>
                </div>
        </div>
        </nav>
    );
};

Header.defaultProps = { /* Defines Default output if nothing gets passed to the prop */
    branding: 'Contact Manager'
};

Header.propTypes = {
    branding: PropTypes.string.isRequired // Typechecking validation, "define what kind of prop type you have "string/bool/object/integer"".
};


//  Export to main App.js
export default Header;

