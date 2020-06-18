import React from 'react';
import { Component } from 'react';
import styled, { css } from 'styled-components'

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
        this.state = {username : ''}
        this.state = {password : ''}
        this.state = {passwordConfirmation : ''}

        //this.logIt = this.logIt.bind(this)
        this.updateUsername = this.updateUsername.bind(this);
    }
    updateUsername(event) {
        this.setState({username: event.target.value});
    }
    render(){
        return(
        <div>
            <p>register</p>
        	<input type="text" value={this.state.username}
	            onChange={this.updateUsername}/>
	        <br/>
        	<input type="password" value={this.state.password} name="password"/>
	        <br/>
        	<input type="checkbox" value="" name="passwordConfirmation"/>
	        <br/>
	        <button onClick={ this.goRegister} 
	            name='registerButton'>register</button>
        </div>
        )
    }

}

class App extends Component {
	render(){
		return (
			<div className="App">
				<Banner />
				<p> hello world </p>
				<RegisterScreen/>
				<DiscoverScreen />
			</div>
		);
	}
}
export default App;
export {App, Banner, RegisterScreen, BoxPanel};
//export Banner, RegistrationScreen;