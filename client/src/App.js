import React, {Component} from 'react';
import logo from './GItHubLogo.png';
import './css/App.css';
import './css/notification/react-notifications.css';
import {Cookies} from 'react-cookie';
import {NotificationContainer, NotificationManager} from 'react-notifications';


import FinderForm from './Views/FinderForm';
import ReposList from './Views/ReposList';
import NavBar from './Views/NavBar';


class App extends Component {

    constructor(props) {
        super(props);

        const cookies = new Cookies();

        this.state = {
            repos: null,
            username: cookies.get('username') || '',
            userId: cookies.get('userId') || '',
            isAuthorized: cookies.get('isAuthorized') || false,
            source: 'search'
        }

    }

    updateData = (value) => {
        this.setState({repos: value, source: 'search'});

        NotificationManager.info('Found ' + value.data.length + ' repositories');
    };

    updateDataFromUser = (value) => {
        this.setState({repos: value, source: 'user'});

        NotificationManager.info('Bookmarks loaded');
    };


    changeSource = (target) => {
        if (this.state.source !== target)
            this.setState({source: target, repos: null});
    };

    performLogin = (authUserId, authUserName) => {

        const cookies = new Cookies();

        this.setState({userId: authUserId, username: authUserName});
        cookies.set('username', authUserName, {path: '/'});
        cookies.set('userId', authUserId, {path: '/'});
        cookies.set('isAuthorized', true, {path: '/'});
    };

    performLogout = () => {
        const cookies = new Cookies();

        this.setState({isAuthorized: false, userId: '', username: '', repos: null, source: 'search'});
        cookies.remove('username', {path: '/'});
        cookies.remove('userId', {path: '/'});
        cookies.remove('isAuthorized', {path: '/'});
        NotificationManager.success('Logged out');
    };


    render() {

        var headerElem;
        if (this.state.source === 'search') {
            headerElem = <FinderForm updateData={this.updateData}/>;
        }
        else {
            headerElem = <h1 className="mt-3"><i className="fa fa-bookmark"/> Your Bookmarks:</h1>;
        }

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">GitHub Repo Searcher</h1>
                </header>
                <NavBar performLogin={this.performLogin} performLogout={this.performLogout}
                        isAuthorized={this.state.isAuthorized} username={this.state.username}
                        changeSource={this.changeSource}
                        userId={this.state.userId} updateDataFromUser={this.updateDataFromUser}/>
                {headerElem}
                <ReposList repos={this.state.repos} userId={this.state.userId}/>
                <NotificationContainer/>
            </div>
        );
    }
}

export default App;
