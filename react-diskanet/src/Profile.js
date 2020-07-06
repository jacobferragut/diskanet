import React from 'react';
import { Component } from 'react';
//import styled, { css } from 'styled-components'
import axios from 'axios';
import { withRouter } from "react-router";

import {
// eslint-disable-next-line
  BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams
} from "react-router-dom";


const APIURL = 'http://localhost:5000/';

//PROFILE COMPONENT
class UserInformation extends Component {
    constructor(props){
        super(props);
		//this.props.name.bind(this);
		this.state = {userInfo:{}};
    }
	
    
    //this.state = { username:"oo", numSites:"0"};
    componentDidMount(){
		//const id = this.props.match.params.id;
		const user_id = this.props.match.params.user_id;

		axios.get(APIURL + 'user/'.concat(user_id)).then( response => {
				this.setState({'userInfo' : response['data']});
				console.log(response);
			});
	}
    render(){
		
		//getting every key of user's info
        var userStuff = [];
		for (var key of Object.keys(this.state['userInfo'])){
			userStuff.push(
				<div id={key}>
					<p>{key}:{this.state.userInfo[key]}</p>
				</div>
			);
		}
		
		return(
			<div>
				<p>This is {this.state.userInfo['name']}'s profile</p>
				{userStuff}
			</div>
        );
        
    }
}
const Profile = withRouter(UserInformation);
export {Profile};