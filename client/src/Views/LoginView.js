import React, {Component} from 'react';

import {NotificationManager} from 'react-notifications';
import axios from 'axios';

class LoginView extends Component {


    constructor(props) {
        super(props);

        this.state = {
            loginUsername: '',
            loginPassword: '',
            signupUsername: '',
            signupPassword: '',
            signupPasswordConf: '',
            loginBoxDisplay: 'block',
            signupBoxDisplay: 'none'
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleLoginUsernameChange = this.handleLoginUsernameChange.bind(this);
        this.handleLoginPasswordChange = this.handleLoginPasswordChange.bind(this);
        this.handleSignupUsernameChange = this.handleSignupUsernameChange.bind(this);
        this.handleSignupPasswordChange = this.handleSignupPasswordChange.bind(this);
        this.handleSignupPasswordConfirmChange = this.handleSignupPasswordConfirmChange.bind(this);


    }


    handleLoginUsernameChange(event) {
        this.setState({loginUsername: event.target.value});
    }

    handleLoginPasswordChange(event) {
        this.setState({loginPassword: event.target.value});
    }


    handleSignupUsernameChange(event) {
        this.setState({signupUsername: event.target.value});
    }

    handleSignupPasswordChange(event) {
        this.setState({signupPassword: event.target.value});
    }

    handleSignupPasswordConfirmChange(event) {
        this.setState({signupPasswordConf: event.target.value});
    }


    handleLogin(event) {
        event.preventDefault();

        var _this = this;

        axios.post('/auth/login', {username: this.state.loginUsername, password: this.state.loginPassword})
            .then(function (response) {

                if (response.data.message === 'Error') {
                    NotificationManager.error('Enter correct username & password');
                }
                else {
                    _this.props.performLogin(response.data.userId, _this.state.loginUsername);
                    NotificationManager.success('Logged in');
                }
            })
    }

    handleSignup(event) {
        event.preventDefault();

        if (this.state.signupPassword !== this.state.signupPasswordConf) {
            NotificationManager.error('Passwords don`t match');
        }
        else {

            var _this = this;

            axios.post('/auth/signup', {username: this.state.signupUsername, password: this.state.signupPassword})
                .then(function (response) {
                    if (response.data.message === 'Error') {
                        NotificationManager.error('Failed to create account');
                    }
                    else {
                        _this.props.performLogin(response.data.userId, _this.state.signupUsername);
                        NotificationManager.success('Signed up');
                    }
                });
        }
    }


    hideLoginBox = () => {
        this.setState({
            loginBoxDisplay: 'none',
            signupBoxDisplay: 'block'
        });
    };

    showLoginBox = () => {
        this.setState({
            loginBoxDisplay: 'block',
            signupBoxDisplay: 'none'
        });
    };

    render() {
        return (
            <div className="container dropdown-form">
                <div id="loginbox" style={{marginTop: 20 + 'px', display: this.state.loginBoxDisplay}}
                     className=" ">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="panel-title">Sign In</div>
                        </div>
                        <div style={{paddingTop: 30 + 'px'}} className="panel-body">
                            <div style={{display: 'none'}} id="login-alert" className="alert alert-danger col-sm-12"/>
                            <form id="loginform" className="form-horizontal" onSubmit={this.handleLogin}>
                                <div style={{marginBottom: 25 + 'px'}} className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-user"/></span>
                                    <input id="login-username" type="text" className="form-control" name="username"
                                           value={this.state.loginUsername} placeholder="username"
                                           onChange={this.handleLoginUsernameChange}/>
                                </div>

                                <div style={{marginBottom: 25 + 'px'}} className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock"/></span>
                                    <input id="login-password" type="password" className="form-control"
                                           value={this.state.loginPassword} name="password" placeholder="password"
                                           onChange={this.handleLoginPasswordChange}/>
                                </div>
                                <div style={{marginTop: 10 + 'px'}} className="form-group">
                                    <div className="col-sm-12 controls">
                                        <button id="btn-login" className="btn btn-success" type="submit">Login
                                        </button>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-md-12 control">
                                        <div style={{
                                            borderTop: 1 + 'px solid#888', paddingTop: 15 + 'px',
                                            fontSize: 85 + '%'
                                        }}>
                                            Don't have an account!
                                            <button className="btn btn-link" type="button" onClick={this.hideLoginBox}>
                                                Sign Up Here
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div id="signupbox" style={{display: this.state.signupBoxDisplay, marginTop: 20 + 'px'}}
                     className="mainbox  col-md-offset-3 col-sm-offset-2">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="panel-title">Sign Up</div>
                            <div style={{float: 'right', fontSize: 85 + '%', position: 'relative', top: -10 + 'px'}}>
                                <button id="signinlink" className="btn btn-link" onClick={this.showLoginBox}>
                                    Sign In</button></div>
                        </div>
                        <div className="panel-body">
                            <form id="signupform" className="form-horizontal" onSubmit={this.handleSignup}>
                                <div className="form-group">
                                    <label className="col-md-12 control-label"
                                           style={{marginTop: 20 + 'px'}}>Username</label>
                                    <div className="col-md-12">
                                        <input type="text" className="form-control" value={this.props.signupUsername}
                                               onChange={this.handleSignupUsernameChange}
                                               name="username" placeholder="username"/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-md-12  control-label">Password</label>
                                    <div className="col-md-12">
                                        <input type="password" className="form-control"
                                               value={this.props.signupPassword}
                                               onChange={this.handleSignupPasswordChange}
                                               name="password" placeholder="Password"/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-md-12 control-label">
                                        Confirm password</label>
                                    <div className="col-md-12">
                                        <input type="password" className="form-control"
                                               value={this.props.signupPasswordConfPassword}
                                               onChange={this.handleSignupPasswordConfirmChange}
                                               name="passwordConfirm" placeholder="Confirm Password"/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-md-offset-3 col-md-9">
                                        <button id="btn-signup" className="btn btn-info" type="submit">
                                            Sign Up
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}


export default LoginView;