import ReposAPI from "../utils/ReposAPI";

import dispatcher from '../dispatcher/AppDispatcher';

class GetReposAction {
    /**
     * Dispatches action to clear out store and state
     * @returns void
     */
    clearRepos(){
        dispatcher.dispatch({type: 'REPOS_CLEAR'});
    }

    /**
     * get the list of repositories via the api
     * @param {string} user 
     * @param {number} page 
     * @returns void
     */
    getRepos(user, page) {
        dispatcher.dispatch({
            type: 'REPOS_FETCH'
        });
        ReposAPI.getRepos(user, page).then(response => {
            response.json().then(repos =>{
                dispatcher.dispatch({
                    type: 'REPOS_RECEIVE', 
                    repos: repos, 
                    page: page
                });
            });
        }, err=>{
            dispatcher.dispatch({
                type: 'REPOS_RECEIVE_ERROR', 
                error: err
            });
        });
    }

}

export default new GetReposAction(); 
