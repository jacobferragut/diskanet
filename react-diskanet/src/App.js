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
	
}

class App extends Component {
	render(){
		return (
			<div className="App">
				<Banner />
				<p> hello world </p>
			</div>
		);
	}
}
export default App;
