import React, {Component} from 'react';

import {NotificationManager} from 'react-notifications';

import LoginView from "./LoginView";
import UserMenuView from "./UserMenuView";


class NavBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAuthorized: this.props.isAuthorized || false,
            userId: this.props.userId || '',
            username: this.props.username || 'Login'
        };

        this.handleAbout = this.handleAbout.bind(this);
        this.handleHome = this.handleHome.bind(this);

    }

    handleAbout() {

        setTimeout(function () {
            NotificationManager.info('GitHub Repos Search App');
        }, 0);
        setTimeout(function () {
            NotificationManager.info('Enter text to start the search')
        }, 1000);
        setTimeout(function () {
            NotificationManager.info('Login or SignUp to bookmark Repos');
        }, 2000);
        setTimeout(function () {
            NotificationManager.info('Results are ordered by Star count');
        }, 3000);
        setTimeout(function () {
            NotificationManager.info('Have a good day :)');
        }, 4000);
    }

    handleHome() {

        this.props.changeSource('search');
    }

    performLogin = (authUserId, authUserName) => {
        this.setState({isAuthorized: true, username: authUserName, userId: authUserId});

        this.props.performLogin(authUserId, authUserName);
    };

    performLogout = () => {
        this.setState({isAuthorized: false, userId: '', username: ''});
        this.props.performLogout();
    };


    render() {


        var dropDown, greetMessage;
        if (this.state.isAuthorized === false) {
            dropDown = <LoginView performLogin={this.performLogin}/>;
            greetMessage = 'Login';
        }
        else {
            dropDown = <UserMenuView userId={this.state.userId} performLogout={this.performLogout}
                                     updateDataFromUser={this.props.updateDataFromUser}/>;
            greetMessage = 'Welcome, ' + this.state.username;
        }


        return (<div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <i className="fa fa-search"/>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <button className="btn btn-link nav-link nav-link" onClick={this.handleHome}>Home
                                <span className="sr-only">(current)</span></button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link nav-link" href="#" onClick={this.handleAbout}>About</button>
                        </li>
                    </ul>
                    <div className="col-lg-3 nav-item dropdown">
                        <button className="btn btn-link nav-link nav-link dropdown-toggle" id="navbarDropdown"
                                data-toggle="dropdown" aria-expanded="false">
                            {greetMessage}
                        </button>
                        <div className="col-md-12 dropdown-menu" aria-labelledby="navbarDropdown">
                            {dropDown}
                        </div>
                    </div>
                </div>
            </nav>
        </div>);
    }


}

export default NavBar;
