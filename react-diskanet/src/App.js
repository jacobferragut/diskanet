import React from 'react';
import { Component } from 'react';
import styled, { css } from 'styled-components'
import axios from 'axios';

import './App.css';
import {DiscoverScreen} from './Discover.js';



const BoxPanel = styled.div`
	display: inline-block;
	font-size: 30px;
	background-color: #444;
	color: #fff;
	border-radius: 0px;
	padding: 20px;
	margin: 10px;
`;

const SliderPage = () => {
  return (
    <div className="my-5">
      <label htmlFor="customRange1">Example range</label>
      <input type="range" className="custom-range" id="customRange1" />
    </div>
  );
}


class Banner extends Component {
	render(){
		return (
			<div className="App-banner">
				<div className='App-title'>
					<BoxPanel>
						Nathan's World
					</BoxPanel>
				</div>
				
				
				<BoxPanel>
					UserBox Here 
				</BoxPanel>
			</div>
		);
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
	        <button onClick={ this.goRegister} 
	            name='registerButton'>register</button>
	        </form>
        </div>
        )
    }

}


class App extends Component {
	render(){
		return (
			<div className="App">
				<Banner />
				<DiscoverScreen />
				<RegisterScreen/>

			</div>
		);
	}
}
export default App;
export {App, Banner, BoxPanel, SliderPage, RegisterScreen};
//export Banner, RegistrationScreen;