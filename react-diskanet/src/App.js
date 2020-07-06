import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // eslint-disable-next-line
  Link, useRouteMatch, useParams
} from "react-router-dom";

import './App.css';
// eslint-disable-next-line
import {DiscoverScreen} from './Discover.js';
import {SiteScreen} from './Site.js';
import {UserInformation} from './Profile.js';


//components imported
import {BoxPanel} from './Components/components.js';

//flask url
const APIURL = 'http://localhost:5000/';

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
        if (document.getElementsByName("password")[0].type==="password"){    
            document.getElementsByName("password")[0].type="text"
        }
        else if(document.getElementsByName("password")[0].type==="text"){    
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
	constructor(){
		super();
		this.state = {loginToken: '', name:'', password:''};
		this.login = this.login.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
	}
	login(event){
		if (this.state.name.length !== 0 && this.state.password.length !== 0){
			axios.put(APIURL + 'user', {'name':this.state.name, 'password':this.state.password}).then( response => {
				this.setState({'loginToken' : response['data']['jwt']});
				console.log(response);
			});
			
		}
	}
	updateUsername(event) {
        this.setState({name: event.target.value});
    }
    updatePassword(event) {
        this.setState({password: event.target.value});
    }
	render(){
		//<DiscoverScreen /> route guide
		return (
			<Router>
                <div className="App">
                    <div className="App-banner">
                        <div className='App-title'>
                            <BoxPanel>
                                Nathan's World
                            </BoxPanel>
                            <BoxPanel>
                                <div>
                                    <form>
                                        username<input type="text" value={this.state.name}
                                            onChange={this.updateUsername}/>
                                        <br/>
                                        password<input type="password" name="password" value={this.state.password}
                                            onChange={this.updatePassword}/>
                                        <br/>
                                        <button type='button' onClick={this.login} 
                                            name='loginButton'>LOGIN</button>
                                        <Link to="/users">Users</Link>
                                    </form>
                                </div> 
                            </BoxPanel>
                        </div>
                    </div>
					<Switch>
					  <Route exact path="/">
						<p>this is the app</p>
					  </Route>
					  <Route path="/user/:id"> //this route doesn't work when I tested it?
						 <UserInformation call={true} name={this.state.name}/>
					  </Route>
					  <Route path="/site/:user_id/:site_id">
						<SiteScreen call={true} />
					  </Route>
					  <Route path="/register">
                        <RegisterScreen/>
					  </Route>
					</Switch>
			    </div>
			</Router>
		);
	}
}
export default App;
export {App, BoxPanel, RegisterScreen};
//export Banner, RegistrationScreen; Why does banner not work even when its exported?