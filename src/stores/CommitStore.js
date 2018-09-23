import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/AppDispatcher';

class CommitStoreClass extends EventEmitter {
    constructor() {
        super();
        this.commits = [];
        this.page = 1;
        this.hasMore = true;
        this.fetching = false;
        this.filterTerm = '';
    }

    /**
     * Getter for the attribute named commits
     * @returns {Object[]} array of commits
     */
    getCommits(){
        return this.commits;
    }

    /**
     * Getter for the search term in the filter search keyword
     * @returns {string} the filter keyword
     */
    getFilter(){
        return this.filterTerm;
    }

    /**
     * Returns next page number, 
     * Although can be verified by Link header attribute
     * @returns {number} nextPageNumber
     */
    next(){
        return this.page + 1 ;
    }

    /**
     * Returns true if more records are available
     * Although can be verified by Link header attribute
     * @returns {boolean} availibility of data
     */
    available(){
        return this.hasMore;
    }

    /**
     * Getter to get the filtered commits if exists
     * @returns {string} array of commits
     */
    getFilteredResult(){
        return this.filteredCommits || [];
    }

    /**
     * RepoStore :: handles all incoming action
     * @param {*} action 
     */
    handleAction(action){
        let filterTm = (action.filter || this.filterTerm).toLowerCase();
        let filterFn = commit => commit.commit.committer.name.toLowerCase().includes(filterTm) 
            || commit.commit.message.toLowerCase().includes(filterTm);
        switch(action.type){
            case 'COMMITS_RECEIVE':
                this.commits = this.commits.concat(action.commits);
                this.filteredCommits = this.commits.filter(filterFn);
                this.page = action.page;
                this.hasMore = !!action.commits.length;
                this.emit('change');
                break;
            case 'REPOS_CLEAR':
                this.commits = this.filteredCommits = [];
                this.page = 1;
                this.hasMore = true;
                break;
            case 'COMMITS_FILTER':
                this.filterTerm = action.filter;
                this.filteredCommits = this.commits.filter(filterFn);
                this.emit('change');
                break;
            default:
                break;
        }
    }

}

const CommitStore = new CommitStoreClass();
dispatcher.register(CommitStore.handleAction.bind(CommitStore));

export default CommitStore;
