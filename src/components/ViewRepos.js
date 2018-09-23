import React from 'react';
import { Jumbotron, Container } from 'reactstrap';
import User from './User';
import Repos from './Repos';
import UserStore from '../stores/UserStore';

export default class ViewRepos extends React.Component {

    render(){
        const user = this.props.match.params.user || UserStore.getUser();
        return (
            <div>
                <Jumbotron fluid className="jumbo-shrink">
                    <Container fluid style={{'textAlign': 'center'}}>
                        <User value={user} history={this.props.history}/>
                    </Container>
                    
                </Jumbotron>
                <Repos user={user} history={this.props.history}/>
            </div>
        );
    }
}
