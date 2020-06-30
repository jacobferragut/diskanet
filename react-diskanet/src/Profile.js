import React from 'react';
import { Component } from 'react';
//import styled, { css } from 'styled-components'
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";


const APIURL = 'http://localhost:5000/';

class UserInformation extends Component {
    constructor(props){
        super(props);
		//this.props.name.bind(this);
		this.state = {name:this.props.name, userInfo:{}};
		this.getUser = this.getUser.bind(this);
    }
	
    
    //this.state = { username:"oo", numSites:"0"};
    getUser(){
		let { id } = useParams();
		axios.get(APIURL + 'user/'.concat(id.toString())).then( response => {
				this.setState({['userInfo'] : response['data']});
				console.log(response);
			});
	}
    render(){
		if (this.props.call){
			this.props.call = false;
			this.getUser();
		}
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

export {UserInformation};