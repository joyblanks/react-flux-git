import React from 'react';
import Moment from 'react-moment';
import { Media } from 'reactstrap';

export default class Commit extends React.Component {
    render(){
        const commit = this.props.value;
        const img = commit.committer ? commit.committer.avatar_url : '/nouser.png';
        return (
            <Media className="media-card">
                <Media left>
                    { <Media object src={img} className="media-avatar"/>}
                </Media>
                <Media body>
                    <Media heading>
                        {commit.commit.committer.name}
                    </Media>
                    <small>
                        <Moment fromNow>
                            {commit.commit.committer.date}
                        </Moment>
                    </small>
                    <br/>
                    <small>{commit.commit.message}</small>
                    <br/>
                    
                    <hr/>
                </Media>
            </Media>
        );
    }
}
