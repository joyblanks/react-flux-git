import React from 'react';

import { Media, Button } from 'reactstrap';
import GetCommitsAction from '../actions/GetCommitsAction';
import UserStore from '../stores/UserStore';
import GetReposAction from '../actions/GetReposAction';

export default class Repo extends React.Component {
    
    constructor(props){
        super(props);
        this.props = props;
    }

    showCommits = () => {
        let user = UserStore.getUser();
        let repo = this.props.value.name;
        GetCommitsAction.clearCommits();
        GetReposAction.clearRepos();
        this.props.history.push(`/repos/${user}/${repo}/commits`);
    }

    render(){
        const repo = this.props.value;
        return (
            <Media className="media-card">
                <Media left>
                    <Media object src={repo.owner.avatar_url} className="media-avatar"/>
                </Media>
                <Media body>
                    <Media heading>{repo.name}</Media>
                    <small>{repo.description}</small>
                    <br/>
                    <Button variant="primary" onClick={this.showCommits}>Show Commits</Button>
                    <hr/>
                </Media>
            </Media>
        );
    }
}
