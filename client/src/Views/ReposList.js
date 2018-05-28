import React, {Component} from 'react';

import ReposItem from "./ReposItem";


class ReposList extends Component {

    constructor(props) {
        super(props);


        this.state = {
            isEdited: false
        };

    }


    removeItem = (repoId) => {

        this.props.repos.data = this.props.repos.data.filter(function (repo) {
            return repo.id !== repoId;
        });
        this.setState({isEdited: true});
    };


    render() {
        var repos = this.props.repos;
        var reposList = '';
        var userId = this.props.userId;

        var _this = this;

        if (repos) {
            if (repos.source === 'search') {
                if (this.props.userId)
                    reposList = repos.data.map(function (repo, index) {
                        var myRepo = {
                            id: repo.id,
                            name: repo.name,
                            fullName: repo.full_name,
                            url: repo.html_url,
                            language: repo.language,
                            description: repo.description,
                            stars: repo.stargazers_count,
                            ownerName: repo.owner.login,
                            ownerAvatarUrl: repo.owner.avatar_url,
                            ownerUrl: repo.owner.html_url
                        };

                        return <ReposItem repo={myRepo} key={index} source='search' userId={userId}/>;
                    });
                else
                    reposList = repos.data.map(function (repo, index) {
                        var myRepo = {
                            id: repo.id,
                            name: repo.name,
                            fullName: repo.full_name,
                            url: repo.html_url,
                            language: repo.language,
                            description: repo.description,
                            stars: repo.stargazers_count,
                            ownerName: repo.owner.login,
                            ownerAvatarUrl: repo.owner.avatar_url,
                            ownerUrl: repo.owner.html_url
                        };

                        return <ReposItem repo={myRepo} source='search' key={index}/>;
                    });
            }
            else {
                reposList = repos.data.map(function (repo, index) {

                    var myRepo = {
                        id: repo.github_repo_id,
                        name: repo.name,
                        fullName: repo.full_name,
                        url: repo.github_url,
                        language: repo.language,
                        description: repo.description,
                        stars: repo.stars,
                        ownerName: repo.owner_name,
                        ownerAvatarUrl: repo.owner_avatar_url,
                        ownerUrl: repo.owner_url,
                        bookmarkId: repo.id
                    };

                    return <ReposItem repo={myRepo} key={index} source='user' userId={userId}
                                      removeItem={_this.removeItem}/>;
                });
            }
        }
        return (
            <div className="container-fluid">
                <div className="row row-list">
                    {reposList}
                </div>
            </div>
        );
    }
}

export default ReposList;
