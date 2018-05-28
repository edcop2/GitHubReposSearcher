import React, {Component} from 'react';

import {NotificationManager} from 'react-notifications';

import axios from 'axios';

class ReposItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAlreadyBookmarked: false
        };


        this.handleBookmark = this.handleBookmark.bind(this);
        this.deleteBookmark = this.deleteBookmark.bind(this);

    }

    deleteBookmark() {

        var _this = this;

        axios.post('/users/deletebookmark', {bookmarkId: _this.props.repo.bookmarkId}).then(function (response) {

            if (response.data.message === 'OK') {
                NotificationManager.success("Bookmark removed");
                _this.props.removeItem(_this.props.repo.bookmarkId);
            }
            else
                NotificationManager.success("Failed to delete bookmark");
        });


    }


    handleBookmark() {

        if (this.props.userId) {

            if (!this.state.isAlreadyBookmarked) {

                var _this = this;

                axios.post('/users/addbookmark',
                    {
                        userId: _this.props.userId,
                        ownerName: _this.props.repo.ownerName,
                        ownerUrl: _this.props.repo.ownerUrl,
                        ownerAvatarUrl: _this.props.repo.ownerAvatarUrl,
                        repoName: _this.props.repo.name,
                        repoFullName: _this.props.repo.fullName,
                        repoGithubUrl: _this.props.repo.url,
                        repoLanguage: _this.props.repo.language,
                        repoDescription: _this.props.repo.description,
                        repoStars: _this.props.repo.stars,
                        repoId: _this.props.repo.id
                    }).then(function (response) {
                    if (response.data.message === 'Error') {
                        NotificationManager.error("Error");
                    }
                    else if (response.data.message === 'Exists') {
                        NotificationManager.warning('Already bookmarked');
                        _this.setState({isAlreadyBookmarked: true});
                    }
                    else {
                        _this.setState({isAlreadyBookmarked: true});
                        NotificationManager.success('Bookmarked');
                    }
                });
            }
            else {
                NotificationManager.warning('Already bookmarked');
            }
        }
        else {
            NotificationManager.warning('Login first');
        }
    }


    render() {
        var collapseId1 = 'descCollapse' + this.props.repo.id;
        var collapseId2 = '#descCollapse' + this.props.repo.id;

        var icon, iconEvent;
        if (this.props.source === 'search') {
            icon = 'fa fa-bookmark';
            iconEvent = this.handleBookmark;
        }
        else {
            icon = 'fa fa-trash-alt';
            iconEvent = this.deleteBookmark;
        }

        return (

            <div id="elemContainer" className="container col-md-5 my-3">
                <div className="row">
                    <div className="col-md-8 Name repoName d-inline-block text-truncate"> {this.props.repo.name}</div>
                    <div className="col-md-3">

                    </div>
                    <div className="col-md-1">
                        <button className="ctrlBtn" onClick={iconEvent}>
                            <i className={icon}/>
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-7">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-6">
                                        <i>Language:</i>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12" align="right">
                                        {this.props.repo.language}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-6">
                                        <i>Stars:</i>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12" align="right">
                                        {this.props.repo.stars} <i className="fa fa-star"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-3">
                                        <i>URL:</i>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 d-inline-block text-truncate" align="right">
                                        <a href={this.props.repo.url} target="_blank">
                                            {this.props.repo.fullName}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-5">
                        <div className="row">
                            <div className="col-md-12">
                                <img src={this.props.repo.ownerAvatarUrl} height={100} alt=""/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 Name ownerName d-inline-block text-truncate">
                                <a href={this.props.repo.ownerUrl} target="_blank">
                                    {this.props.repo.ownerName}</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="container">
                        <button className="btn btn-primary descbtn" type="button" data-toggle="collapse"
                                data-target={collapseId2} aria-expanded="false"
                                aria-controls={collapseId1}>
                            Show description
                        </button>
                    </div>

                    <div className="container collapse multi-collapse block-with-text mt-3" id={collapseId1}>
                        {this.props.repo.description}
                    </div>
                </div>
            </div>
        );
    }
}

export default ReposItem;
