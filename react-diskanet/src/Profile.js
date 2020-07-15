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
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.fileUploadHandler = this.fileUploadHandler.bind(this);
	this.state = {userInfo:{}, selectedFile: null};
    }	
    
    componentDidMount(){
	//const id = this.props.match.params.id;
	const user_id = this.props.match.params.user_id;
        
	axios.get(APIURL + 'user/'.concat(user_id)).then( response => {
	    this.setState({'userInfo' : response['data']});
	    console.log(response);
	});
    }
    
    fileSelectedHandler(event) {
        this.setState({selectedFile: event.target.files[0]});
        console.log(this.state.selectedFile);
    }
    
    fileUploadHandler() {
        const formData = new FormData();
	formData.append( 
	    "photo",
	    this.state.selectedFile,
	    this.state.selectedFile.name
	);
        console.log(this.state.selectedFile);
        
        axios.post(APIURL + 'photo', formData, {
            headers: { 'Content-Type': 'multipart/form-data' } })
            .then(()=>console.log('Uploaded ' + this.state.selectedFile.name));
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
                <input type="file" onChange={this.fileSelectedHandler}/>
                <button onClick={this.fileUploadHandler}>Upload</button>
              </div>
            </>
        );
    }
}

/********************
import axios from 'axios'; 

import React,{Component} from 'react'; 

class App extends Component { 

	state = { 

	// Initially, no file is selected 
	selectedFile: null
	}; 
	
	// On file select (from the pop up) 
	onFileChange = event => { 
	
	// Update the state 
	this.setState({ selectedFile: event.target.files[0] }); 
	
	}; 
	
	// On file upload (click the upload button) 
	onFileUpload = () => { 
	
	// Create an object of formData 
	const formData = new FormData(); 
	
	// Update the formData object 
	formData.append( 
		"myFile", 
		this.state.selectedFile, 
		this.state.selectedFile.name 
	); 
	
	// Details of the uploaded file 
	console.log(this.state.selectedFile); 
	
	// Request made to the backend api 
	// Send formData object 
	axios.post("api/uploadfile", formData); 
	}; 
	
	// File content to be displayed after 
	// file upload is complete 
	fileData = () => { 
	
	if (this.state.selectedFile) { 
		
		return ( 
		<div> 
			<h2>File Details:</h2> 
			<p>File Name: {this.state.selectedFile.name}</p> 
			<p>File Type: {this.state.selectedFile.type}</p> 
			<p> 
			Last Modified:{" "} 
			{this.state.selectedFile.lastModifiedDate.toDateString()} 
			</p> 
		</div> 
		); 
	} else { 
		return ( 
		<div> 
			<br /> 
			<h4>Choose before Pressing the Upload button</h4> 
		</div> 
		); 
	} 
	}; 
	
	render() { 
	
	return ( 
		<div> 
			<h1> 
			GeeksforGeeks 
			</h1> 
			<h3> 
			File Upload using React! 
			</h3> 
			<div> 
				<input type="file" onChange={this.onFileChange} /> 
				<button onClick={this.onFileUpload}> 
				Upload! 
				</button> 
			</div> 
		{this.fileData()} 
		</div> 
	); 
	} 
} 
********************/

const Profile = withRouter(UserInformation);
export {Profile};
