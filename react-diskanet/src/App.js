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
//submit discover filter button
const FilterButton = styled.button`
	padding: 5px;
	margin: 3px;
	background-color: #ccc;
	font-size: 110%;
	font-family: inherit;
`;
//select genres for form
const FilterSelect = styled.select`
	padding: 3px;
	margin: 6px;
	text-align: center;
	font-family: inherit;
`;
class DiscoverScreen extends Component {
	render(){
		return (
			<div>
				<FilterButton> Discover! </FilterButton>
				<FilterSelect value={""}>
					<option value="Music">Music</option>
					<option value="Art">Art</option>
					<option value="Film">Film</option>
					<option value="Writing">Writing</option>
				</FilterSelect>
				<input type="checkbox"></input>
			</div>
		);
	}
}

class Banner extends Component {
	render(){
		return (
			<div className="App-banner">
				<BoxPanel>
					<div className='App-title'>
						Nathan's World
					</div>
				</BoxPanel>
				
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
//export {App, Banner, RegisterScreen, BoxPanel};
//export Banner, RegistrationScreen;