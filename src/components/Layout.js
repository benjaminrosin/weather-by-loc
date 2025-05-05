import React from 'react';
import { Link, Outlet } from 'react-router-dom';

/**
 * Layout Component
 *
 * Main application layout with navigation bar and content container.
 * Provides responsive navigation and routing structure using React Router.
 *
 * @returns {JSX.Element} - Rendered layout with navigation and content area
 */
const Layout = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">City Weather App</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/all-cities">All Cities</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container mt-4">
                <Outlet/>
            </div>
        </div>
    );
};

export default Layout;