import React from 'react';
import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';



import axios from 'axios';
import {
  HashRouter,
  Switch,
  Route,
  NavLink,
  // eslint-disable-next-line
  Link, useRouteMatch, useParams
} from "react-router-dom";
import { Container /*, Col, Row */ } from 'react-bootstrap';

import './App.css';
// eslint-disable-next-line
import {DiscoverScreen} from './Discover.js';
import {SiteScreen, SiteCreation} from './Site.js';
import {RegisterScreen} from './Register.js';
import {Profile} from './Profile.js';

//components imported
import {BoxPanel, NavBar,  /*, ResultSites */ } from './Components/components.js';

//flask url
const APIURL = 'http://localhost:5000/';

class App extends Component {
    constructor() {
        super();
        this.state = {loginToken: '', user_id:''};
        this.login = this.login.bind(this);
        
        
    }
    componentDidMount(){
        const cookies = new Cookies();
        //console.log(cookies.get('jwt'));
        //console.log(cookies.get('user_id'));
        if (cookies.get('jwt') && cookies.get('user_id') && cookies.get('name')){
            this.setState({ loginToken: cookies.get('jwt'), user_id: cookies.get('user_id'), name: cookies.get('name') });
        }
        
        
    }
    login(username, password)  {
	axios.put(
            APIURL + 'user',
            { 'name':username, 'password':password})
            .then( response => {
                if (response['data']['jwt'].length > 0){
                    this.setState({'loginToken' : response['data']['jwt'],
                                   'user_id':response['data']['id'] });
                    const cookies = new Cookies();
                    cookies.set('user_id', response['data']['id'], { path: '/', expires: new Date(Date.now()+3600000) });
                    cookies.set('jwt', response['data']['jwt'], { path: '/', expires: new Date(Date.now()+3600000) });
                    cookies.set('name', username, { path: '/', expires: new Date(Date.now()+3600000) });
                
                }
        //store user's id and token into cookies
        
		//console.log(response);
	    });  // todo: add error-checking
        
    }
    
    render(){
        
    //<DiscoverScreen /> route guide
	return (
	    <HashRouter>
              <div className="App">
                <Banner login={ this.login } user_id={ this.state.user_id } />
                
		<Switch>
		  <Route exact path="/">
		    <p>this is the app</p>
		  </Route>
                  
		  <Route path="/user/:user_id">
		    <Profile />                   
		  </Route>
          
                  <Route exact path="/sites/:user_id">
                    <SiteCreation jwt={this.state.loginToken} />
                  </Route>
                  
		  <Route exact path="/site/:site_id">
		    <SiteScreen user_id={ this.state.user_id } jwt={this.state.loginToken}  />
		  </Route>
                  
		  <Route path="/register">
                    <RegisterScreen/>
		  </Route>
                  
                  <Route path="/discover">
                    <DiscoverScreen />
                  </Route>
                  
                  <Route path="/user">
                    <p>Authorization Failed: You must be logged in to view your profile</p>
                  </Route>
		</Switch>
	      </div>
	    </HashRouter>
	);
    }
}

class Banner extends Component {
    constructor(props) {
        super(props);
        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.callLogin = this.callLogin.bind(this);
        this.gotoRegister = this.gotoRegister.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
        this.state = { name:'', password:'', user_id:'', redirect: false };
    }
    
    componentDidUpdate(){
        //makes user_id the same as app (so if logged in on app, logged in on banner)
        if (this.state.user_id !== this.props.user_id)
            this.setState({user_id:this.props.user_id});
        
    }

    gotoRegister(event) {
        this.setState({redirect: true});
    }

    renderRedirect() {
        return (
            this.state.redirect ? <Redirect to='/register/'/> : ''
        );
    }
    
    updateUsername(event) {
        this.setState({name: event.target.value});
    }
    
    updatePassword(event) {
        this.setState({password: event.target.value});
    }

    callLogin(event) {
        if (this.state.name !== 0 && this.state.password !== 0){
            this.props.login(this.state.name, this.state.password);
            //check if logged in
            
        }
    }

    render() {
        // todo: make a conditional render to just show "logged in" when logged in
        // todo: add a register button
        const cookies = new Cookies();
        return (          
            <div className="App-banner">
              <div className='App-title'>
                <Container fluid>                  
                  <BoxPanel>
                    Nathan's World
                  </BoxPanel>
                                    
                  <BoxPanel>
                    { this.state.user_id==='' ? 
                      <div>
                        {this.renderRedirect()}
                        <form>
                          username<input type="text" value={this.state.name}
                                         onChange={this.updateUsername}/>
                          <br/>
                          password<input type="password" name="password" value={this.state.password}
                                         onChange={this.updatePassword}/>
                          <br/>
                          <button type='button' onClick={this.callLogin} 
                                  name='loginButton'>LOGIN</button>
                          <button type='button' onClick={this.gotoRegister}
                                  name='registerButton'>Register</button>
                        </form>
                      </div> 
                      
                      : 
                      
                      <p>Logged in as: {this.state.name}</p>
                    }
                  </BoxPanel>
                  
                  <NavBar user_id = {this.props.user_id} />
                  
                </Container>
              </div>
            </div>
            
        );
    }
}

export default App;
//export Banner, RegistrationScreen; Why does banner not work even when its exported?
