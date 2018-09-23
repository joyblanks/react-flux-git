import React from 'react';
import RepoStore from '../stores/RepoStore';
import Repo from './Repo';
import GetReposAction from '../actions/GetReposAction';
import GetUserAction from '../actions/GetUserAction';
import UserStore from '../stores/UserStore';


export default class Repos extends React.Component {

    constructor(props){
        super(props);
        let { user } = props;
        this.user = user;
        GetUserAction.updateUser(user);
        this.state = {repos: RepoStore.getRepos()};
    }

    updateComponent = () => {
        this.setState({
            repos: RepoStore.getRepos()
        });
    }

    handleScroll = (ev) => {
        let scroller = ev.target;
        if (scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight && RepoStore.available()) {
            GetReposAction.getRepos(UserStore.getUser(), RepoStore.next());
        }
    }

    componentWillMount(){
        RepoStore.on('change', this.updateComponent);
    }

    componentWillUnmount(){
        RepoStore.removeListener('change', this.updateComponent);
        this.node.removeEventListener('scroll', this.handleScroll);
    }

    componentDidMount(){
        //GetReposAction.getRepos(this.user, 1);
        this.node.addEventListener('scroll', this.handleScroll);
    }

    render(){
        const repos = this.state.repos.map(repo => <Repo key={repo.id} value={repo} history={this.props.history}/>);
        return (
            <div ref={elem => this.node = elem} className="scroller">
                { repos.length ? <div>{repos}</div> : <div>No Repositories found</div> }
            </div>
        );
    }
}
