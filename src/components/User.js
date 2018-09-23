import React from 'react';
import UserStore from '../stores/UserStore';

import GetUserAction from '../actions/GetUserAction';

import { Button, Input, InputGroup, InputGroupAddon  } from 'reactstrap';
import GetReposAction from '../actions/GetReposAction';

export default class User extends React.Component {

    constructor(){
        super();
        this.state = {user: UserStore.getUser()};
        this.debounce = 0;
    }

    updateComponent = () => {
        this.setState({
            user: UserStore.isFetching() ? null : UserStore.getUser()
        });
    }

    getRepos = () => {
        
        GetUserAction.gotoRepos(this.props.history,'/'+UserStore.getSearch()+'/repos');
    }

    onValue = (ev) => {
        let searchText = ev.target.value;
        if(!searchText || searchText === UserStore.getSearch()){
            return;
        }
        GetReposAction.clearRepos();
        GetUserAction.initiateSearch(searchText);
        if(this.debounce){
            clearTimeout(this.debounce);
        }
        this.debounce = setTimeout(() => {
            GetUserAction.searchUser(searchText);
            clearTimeout(this.debounce);
        }, 500);
    }

    componentWillMount(){
        UserStore.on('change', this.updateComponent);
    }

    componentWillUnmount(){
        UserStore.removeListener('change', this.updateComponent);
    }

    componentDidMount(){
        GetUserAction.searchUser(this.props.value);
    }

    render(){
        const user = this.state.user;
        const isFetching = UserStore.isFetching();
        return (
            <div>
                <InputGroup>
                    <Input defaultValue={user} onKeyUp={this.onValue} type="text"/> 
                    <InputGroupAddon addonType="append">
                        {isFetching 
                            ? <Button color="secondary" disabled>{`Looking for a repository`}</Button>
                            : <Button color="primary" onClick={this.getRepos} disabled={user===null}>
                                {user!==null ? `Get Repositories for ${user}` : `No repositories found`}
                            </Button>
                        }
                    </InputGroupAddon>
                </InputGroup>
            </div>
        );
    }
}
