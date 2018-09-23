import dispatcher from '../dispatcher/AppDispatcher';
import CommitsAPI from "../utils/CommitsAPI";

class GetCommitsAction {
    
    /**
     * Dispatches a function to Clear the store with commits
     * @returns void
     */
    clearCommits(){
        dispatcher.dispatch({type: 'COMMITS_CLEAR'});
    }

    /**
     * Dispatches a function to Filters an array of commits
     * @param {string} filter 
     */
    searchCommits(filter){
        dispatcher.dispatch({
            type: 'COMMITS_FILTER',
            filter: filter
        });
    }

    /**
     * Dispatches a function to get the commits via api
     * @param {string} user
     * @param {string} repo
     * @param {number} page
     * @returns void
     */
    getCommits(user, repo, page) {
        dispatcher.dispatch({
            type: 'COMMITS_FETCH'
        });
        CommitsAPI.getCommits(user, repo, page).then(response => {
            response.json().then(commits =>{
                dispatcher.dispatch({
                    type: 'COMMITS_RECEIVE', 
                    commits: commits, 
                    page: page
                });
            });
        }, err=>{
            dispatcher.dispatch({
                type: 'COMMITS_RECEIVE_ERROR', 
                error: err
            });
        });
    }

}

export default new GetCommitsAction(); 
