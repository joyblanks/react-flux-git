import React from 'react';
import { Jumbotron, Container } from 'reactstrap';
import UserStore from '../stores/UserStore';
import Commits from './Commits';
import SearchCommit from './SearchCommit';

export default class ViewCommits extends React.Component {

    render(){
        const user = this.props.match.params.user || UserStore.getUser();
        const repo = this.props.match.params.repo;
        return (
            <div >
                <Jumbotron fluid className="jumbo-shrink">
                    <Container fluid style={{'textAlign': 'center'}}>
                        <SearchCommit/>
                    </Container>
                </Jumbotron>
                <Commits user={user} repo={repo} history={this.props.history}/>
            </div>
        );
    }
}
