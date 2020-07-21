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
	
        this.state = {userInfo:{}, selectedFile: null, imageURL:''};
    
        this.handleUploadImage = this.handleUploadImage.bind(this);
    }	
    
    componentDidMount(){
	//const id = this.props.match.params.id;
	const user_id = this.props.match.params.user_id;
        
	axios.get(APIURL + 'user/'.concat(user_id)).then( response => {
	    this.setState({'userInfo' : response['data']});
	    console.log(response);
	});
    }
    handleUploadImage(ev) {
        ev.preventDefault();

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        //data.append('filename', this.fileName.value);
        
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
              <img src={this.state.imageURL} alt="img" />
              
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
