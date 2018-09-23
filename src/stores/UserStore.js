import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/AppDispatcher';

class UserStoreClass extends EventEmitter {
    constructor() {
        super();
        this.user = null;
        this.fetching = false;
        this.text = '';
    }

    /**
     * Getter for the user attribute
     * @returns {string|object} user
     */
    getUser(){
        return this.user;
    }

    /**
     * Getter for the search keyword
     */
    getSearch(){
        return this.text;
    }

    /**
     * Getter for the fetching attribute
     * @returns {boolean} true, during progress
     */
    isFetching(){
        return this.fetching;
    }

    /**
     * UserStore :: handles all incoming action
     * @param {*} action 
     */
    handleAction(action){
        switch(action.type){
            case 'USER_RECEIVE':
                this.user = action.user;
                this.text = action.user;
                this.fetching = false;
                this.emit('change');
                break;
            case 'USER_FETCH':
                this.user = action.text;
                this.fetching = true;
                this.text = action.text;
                this.emit('change');
                break;
            case 'USER_RECEIVE_ERROR':
                this.user = null;
                this.fetching = false;
                this.emit('change');
                break;
            case 'USER_UPDATE':
                this.user = this.text = action.user;
                break;
            default:
                this.fetching = false;
                break;
        }
    }

}

const UserStore = new UserStoreClass();
dispatcher.register(UserStore.handleAction.bind(UserStore));

export default UserStore;
