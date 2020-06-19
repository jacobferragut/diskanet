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
//filter panel for genres
const FilterPanel = styled(BoxPanel)`
	font-size: 1em;
	font-family: serif
`;

class DiscoverScreen extends Component {
	render(){
		return (
			<div>
				<FilterPanel>
				<h1>Select Genre(s)</h1>
				Music<input 
					type="checkbox" 
					value="music">
				</input><br/>
				Art<input 
					type="checkbox" 
					value="art">
				</input><br/>
				Film<input 
					type="checkbox" 
					value="film">
				</input><br/>
				Writing<input 
					type="checkbox" 
					value="writing">
				</input><br/>
				<h2>Exclude Non-selected Genres from discover results?</h2>
				Yes<input type="radio" name="exclude" value="Yes"></input><br/>
				No<input type="radio" name="exclude" value="No"></input>
				
				<FilterButton> Discover! </FilterButton>
				</FilterPanel>
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
        this.state = {email : ''}

        //this.logIt = this.logIt.bind(this)
        this.updateUsername = this.updateUsername.bind(this);
    }
    updateUsername(event) {
        this.setState({username: event.target.value});
    }
    render(){
        return(
        <div>
            <form>
            <p>register</p>
            email<input type="text" name="email"/>
        	username<input type="text" value={this.state.username}
	            onChange={this.updateUsername}/>
	        <br/>
        	password<input type="password" value={this.state.password} name="password"/>
	        <br/>
        	show password<input type="checkbox" value="" name="passwordConfirmation"/>
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