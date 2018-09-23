import React from 'react';
import CommitStore from '../stores/CommitStore';
import Commit from './Commit';
import GetCommitsAction from '../actions/GetCommitsAction';


export default class Commits extends React.Component {

    constructor(props){
        super(props);
        let { user, repo } = props;
        this.user = user;
        this.repo = repo;
        this.state = {commits: CommitStore.getCommits()};
    }

    updateComponent = () => {
        this.setState({
            commits: CommitStore.getFilter() ? CommitStore.getFilteredResult() : CommitStore.getCommits()
        });
    }

    handleScroll = (ev) => {
        let scroller = ev.target;
        if (scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight && CommitStore.available()) {
            GetCommitsAction.getCommits(this.user, this.repo, CommitStore.next());
        }
    }

    componentWillMount(){
        CommitStore.on('change', this.updateComponent);
    }

    componentWillUnmount(){
        CommitStore.removeListener('change', this.updateComponent);
        this.node.removeEventListener('scroll', this.handleScroll);
    }

    componentDidMount(){
        GetCommitsAction.getCommits(this.user, this.repo, 1);
        this.node.addEventListener('scroll', this.handleScroll);
    }

    render(){
        const commits = this.state.commits;
        const viewCommits = commits.map(commit => <Commit key={commit.sha} value={commit}/>);
        return (
           
                <div ref={elem => this.node = elem} className="scroller">
                    { viewCommits.length ? <div>{viewCommits}</div> : <div>No Commits found</div> }
                </div>
                
        );
    }
}
