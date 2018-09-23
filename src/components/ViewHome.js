import React from 'react';
import { Jumbotron, Container } from 'reactstrap';
import User from './User';

export default class ViewHome extends React.Component {

    render(){
        return (
            <Jumbotron fluid>
                <Container fluid style={{'textAlign': 'center'}}>
                    <User value="joyblanks" history={this.props.history} />
                </Container>
            </Jumbotron>
        );
    }
}
