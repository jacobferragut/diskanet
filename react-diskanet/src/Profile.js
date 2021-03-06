import React from 'react';
import { Component } from 'react';
//import styled, { css } from 'styled-components'
import axios from 'axios';
import { withRouter } from "react-router";
import { APIURL } from './apiurl.js';
import Cookies from 'universal-cookie';
import {
// eslint-disable-next-line
  BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams
} from "react-router-dom";


//PROFILE COMPONENT
class UserInformation extends Component {
    constructor(props){
        super(props);
	
        this.state = {userInfo:{}, selectedFile: null, imageURL:'', isUser: null};
    
        this.handleUploadImage = this.handleUploadImage.bind(this);
    }	
    
    componentDidMount(){
	//const id = this.props.match.params.id;
	const user_id = this.props.match.params.user_id;
	const cookies = new Cookies();

	axios.get(APIURL + 'user/'.concat(user_id)).then( response => {
	    if (cookies.get('user_id') === user_id){
	        this.setState({'userInfo' : response['data'], isUser:true});
		console.log("user is on their own profile");
	    }else{ //is looking at another user's profile
		this.setState({'userInfo' : response['data']});
	    }
		console.log(response);//disp response
		
	});    	                                             

    }

    handleUploadImage(ev) {
        ev.preventDefault();

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('user_id', this.state.userInfo.user_id);
        
        axios
        .post(APIURL+'photo', data)
        .then(res => console.log(res))
        .catch(err => console.warn(err));
    }
    
    render(){		
        //getting every key of user's info
        var userStuff = [];
        for (var key of Object.keys(this.state['userInfo'])){
            userStuff.push(
                <div key={key}>
                    <p>{key}:{this.state.userInfo[key]}</p>
                </div>
            );
        }
    
        return(
            <>
              <div>
                <p>This is {this.state.userInfo['name']}'s profile</p>
                {userStuff}
              </div>
              <div>
              <img src={APIURL+'/photo/'+this.state.userInfo.user_id} alt="img" />
              
              <form onSubmit={this.handleUploadImage}>
                <div>
                  <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                </div>
                
                <div>
                  <button>Upload</button>
                </div>
                
              </form>
                      
              </div>
              
            </>
        );
    }
}

const Profile = withRouter(UserInformation);
export {Profile};
