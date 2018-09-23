import SearchUserAPI from "../utils/SearchUserAPI";

import dispatcher from '../dispatcher/AppDispatcher';
import GetReposAction from "./GetReposAction";
import UserStore from "../stores/UserStore";

class GetUserAction {
    /**
     * Initiates a search does nothing usual
     * this is used to notify UI and store that api is under progress
     * @param {string} user
     * @returns void
     */
    initiateSearch(user){
        dispatcher.dispatch({
            type: 'USER_FETCH',
            text: user
        });
    }

    /**
     * Updates an user to store
     * this is used to notify UI and store that api is under progress
     * @param {string} user
     * @returns void
     */
    updateUser(user){
        dispatcher.dispatch({
            type: 'USER_UPDATE',
            user: user
        });
    }

    /**
     * Goto repo module page
     * @param {history} history object
     * @param {string} location
     * @returns void
     */
    gotoRepos(history, location){
        GetReposAction.clearRepos();
        history.push(location);
        GetReposAction.getRepos(UserStore.getSearch(), 1);
    }

    /**
     * Calls the API search in a promise and dispatches appropriately 
     * @param {string} user 
     * @returns void
     */
    searchUser(user) {
        this.initiateSearch(user);
        SearchUserAPI.searchUser(user).then(response => {
            if(response.ok){
                response.json().then(repos =>{
                    dispatcher.dispatch({
                        type: 'USER_RECEIVE', 
                        user: user
                    });
                });
            } else {
                dispatcher.dispatch({
                    type: 'USER_RECEIVE_ERROR', 
                    error: 'User not found'
                });
            }
        }, err=>{
            dispatcher.dispatch({
                type: 'USER_RECEIVE_ERROR', 
                error: err
            });
        });
    }

}

export default new GetUserAction(); 
