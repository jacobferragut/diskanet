import React from 'react';
import { Component } from 'react';
import './App.css';

import styled, { css } from 'styled-components'

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
				<BoxPanel>
					<div className='App-title'>
						Nathan's World
					</div>
				</BoxPanel>
				
				<BoxPanel> UserBox Here </BoxPanel>
			</div>
		);
	}
}

class RegisterScreen extends Component {
    constructor(props){
        super(props)
        this.state = {username : ''}
        //this.logIt = this.logIt.bind(this)
        this.updateUsername = this.updateUsername.bind(this);
    }
    updateUsername(event) {
        this.setState({username: event.target.value});
    }
    render(){
        return(
        <div>
        	<input type="text" value={this.state.username}
	            onChange={this.updateUsername}/>
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
			</div>
		);
	}
}
export default App;
