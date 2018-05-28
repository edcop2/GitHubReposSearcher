import React, {Component} from 'react';

import {NotificationManager} from 'react-notifications';
import axios from 'axios';


class UserMenuView extends Component {


    constructor(props) {
        super(props);

        this.state = {
            userId: ''
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.handleBookmarks = this.handleBookmarks.bind(this);

    }


    handleBookmarks() {

        var _this = this;

        axios.post('/users/getuserbookmarks', {userId: _this.props.userId}).then(function (response) {
            if (response.data.message === 'OK') {
                _this.props.updateDataFromUser({data: response.data.data, source: 'user'});
            }
            else if (response.data.message === 'None') {
                NotificationManager.warning('There is no bookmarks');
            }
        })

    }


    handleLogout() {
        this.setState({userId: ''});
        this.props.performLogout();
    }


    render() {


        return (
            <div className="container">
                <button className="dropdown-item" type="button" onClick={this.handleBookmarks}>
                   <i className="fa fa-bookmark"/> View bookmarks
                </button>
                <button className="dropdown-item" type="button" onClick={this.handleLogout}>
                    <i className="fa fa-sign-out-alt"/>Logout</button>
            </div>
        );
    }
}


export default UserMenuView;