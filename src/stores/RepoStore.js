import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/AppDispatcher';

class RepoStoreClass extends EventEmitter {
    constructor() {
        super();
        this.repos = [];
        this.page = 1;
        this.hasMore = true;
        this.fetching = false;
    }

    /**
     * getter for the repositories member
     * @returns {Object[]} repos
     */
    getRepos(){
        return this.repos;
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
     * RepoStore :: handles all incoming action
     * @param {*} action 
     */
    handleAction(action){
        switch(action.type){
            case 'REPOS_RECEIVE':
                this.repos = this.repos.concat(action.repos);
                this.page = action.page;
                this.hasMore = !!action.repos.length;
                this.emit('change');
                break;
            case 'REPOS_CLEAR':
                this.repos = [];
                this.page = 1;
                this.hasMore = true;
                this.emit('change');
                break;
            default:
                break;
        }
    }

}

const RepoStore = new RepoStoreClass();
dispatcher.register(RepoStore.handleAction.bind(RepoStore));

export default RepoStore;
