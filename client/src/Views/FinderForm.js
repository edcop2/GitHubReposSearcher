import React, {Component} from 'react';

import {NotificationManager} from 'react-notifications';
import axios from 'axios';


class FinderForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchQuery: '',
            repos: null
        };

        this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();

        var _this = this;

        axios.post('/search', {repoId: this.state.searchQuery}).then(function (response) {

            if (response.data.length > 0) {
                _this.props.updateData({data: response.data, source: 'search'});

            }
            else {
                NotificationManager.info('Nothing found');
            }
        });

    }

    handleSearchQueryChange(event) {
        this.setState({searchQuery: event.target.value});
    }

    render() {
        return (
            <div className="container mt-5">
                <form className="form-horizontal input-group" onSubmit={this.handleSubmit}>
                    <input className="form-control ml-5"
                           type="text"
                           placeholder="Enter query"
                           value={this.state.searchQuery}
                           onChange={this.handleSearchQueryChange}
                    />
                    <div className="input-group-append mr-5">
                        <button className="btn btn-outline-secondary" type="submit">Search</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default FinderForm;
