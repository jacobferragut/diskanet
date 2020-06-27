import React from 'react';
import { Component } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';

import './App.css';
import {DiscoverScreen} from './Discover.js';
import {SiteScreen, Site} from './Site.js';



//components imported
import {BoxPanel, SliderPage, Banner, ResultPanel, ResultButton} from './Components/components.js';

//flask url
const APIURL = 'http://localhost:5000/';
class LoginScreen extends Component {
    constructor(props){
        super(props)
        this.state = {username: '', password:'', loginToken:''}
        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.login = this.login.bind(this);
    }
    login(event){
        console.log("token activated");
/*
        axios.put(APIURL + 'user').then( response => {
            this.setState({['loginToken'] : response['data']['jwt']});
        });
*/
    axios.put(APIURL + 'user', {'name':this.state.username, 'password':this.state.password}).then( response => {
                //this.setState({['loginToken'] : response['data']['jwt']});
                console.log(response);

            });

        //console.log(response.data);
    }

    updateUsername(event) {
        this.setState({username: event.target.value});
    }
    updatePassword(event) {
        this.setState({password: event.target.value});
    }
    render(){
        return(
            <div>
                <form>
                    username<input type="text" value={this.state.username}
                        onChange={this.updateUsername}/>
                    <br/>
                    password<input type="password" value={this.state.password} name="password"
                        onChange={this.updatePassword}/>
                    <br/>
                    <button type='button' onClick={this.login} 
                        name='loginButton'>LOGIN</button>
                </form>
            </div>
        )
    }
}
class RegisterScreen extends Component {
    constructor(props){
        super(props)
        this.state = {username : '', password:'', showPassword:'', email:''};
        this.textType = "password"

        //this.logIt = this.logIt.bind(this)
        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
		this.goRegister = this.goRegister.bind(this);
    }
    updateUsername(event) {
        this.setState({username: event.target.value});
    }
    updatePassword(event) {
        this.setState({password: event.target.value});

            
    }
    updateEmail(event){
        this.setState({email: event.target.value});
    }
    updateShowPassword(event){
        if (document.getElementsByName("password")[0].type=="password"){    
            document.getElementsByName("password")[0].type="text"
        }
        else if(document.getElementsByName("password")[0].type=="text"){    
            document.getElementsByName("password")[0].type="password"
        }        
    }
	goRegister(event){
		//console.log({msg:'successful button click'});
		axios.post(APIURL + 'user', {
			name: this.state.username, 
			password: this.state.password, 
			email: this.state.email}).then( response => {
			/*example of response---------
			{ 
			  1 : {title:'example title', body: 'example body', ... },
			  2 : {title:'title example', body: 'body example', ... },
			}
			*/
			console.log(response);
			//this.setState({['results'] : response});
		});
	}
    render(){
        return(
        <div>
            <form>
            <p>register</p>
            email<input type="text" name="email" value={this.state.email}
                onChange={this.updateEmail}/>
        	username<input type="text" value={this.state.username}
	            onChange={this.updateUsername}/>
	        <br/>
        	password<input type="password" value={this.state.password} name="password"
        	    onChange={this.updatePassword}/>
	        <br/>
        	show password<input type="checkbox" value="" name="ShowPassword"
        	    onChange={this.updateShowPassword}/>
	        <br/>
	        <button type='button' onClick={ this.goRegister} 
	            name='registerButton'>register</button>
	        </form>
        </div>
        )
    }

}


class App extends Component {
	render(){
		//<DiscoverScreen />
		return (
			<div className="App">
				<Banner />
				
				<RegisterScreen/>
				<LoginScreen />
				<Site />
			</div>
		);
	}
}
export default App;
export {App, Banner, BoxPanel, SliderPage, RegisterScreen, LoginScreen};
//export Banner, RegistrationScreen;