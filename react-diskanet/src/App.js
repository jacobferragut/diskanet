import React from 'react';
import { Component } from 'react';
import styled, { css } from 'styled-components'
import axios from 'axios';

import './App.css';
import {DiscoverScreen} from './Discover.js';

const APIURL = 'http://localhost:5000/';
	submitSearch(genre_music, genre_art, genre_film, genre_writing) {
		submission = Object()
		if (genre_music 
		axios.post(APIURL + 'api/discover', 
			{ genre_music, genre_art, genre_film, genre_writing })
			.then( response => {
				console.log(response);
			});
	};

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
/*
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
*/

class App extends Component {
	render(){
		return (
			<div className="App">
				<Banner />
				<p> hello world </p>
				<DiscoverScreen />
				<SliderPage />

			</div>
		);
	}
}
export default App;
export {App, Banner, BoxPanel, SliderPage};
//export Banner, RegistrationScreen;