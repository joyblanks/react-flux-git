import React from 'react';

import CommitStore from '../stores/CommitStore';
import GetCommitsAction from '../actions/GetCommitsAction';

import { Input } from 'reactstrap';

export default class SearchCommit extends React.Component {

    constructor(){
        super();
        this.state = {value: ''};
        this.debounce = 0;
    }

    onValue = (ev) => {
        let searchText = ev.target.value;
        if(searchText === CommitStore.getFilter()){
            return;
        }
        
        if(this.debounce){
            clearTimeout(this.debounce);
        }
        this.debounce = setTimeout(() => {
            GetCommitsAction.searchCommits(searchText);
            clearTimeout(this.debounce);
        }, 500);
    }

    render(){
        return (
            <div>
                <Input onKeyUp={this.onValue} type="text" placeholder="Search Commits ..."/> 
            </div>
        );
    }
}
