import React from 'react';
import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

import axios from 'axios';
import {
  HashRouter,
  Switch,
  Route,
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

import { APIURL } from './apiurl.js';

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
        console.log("logging in: "+APIURL);
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
        this.state = { name:'', password:'', user_id:'', redirect: false, isLoggedIn: false };
        
        this.checkLogin = this.checkLogin.bind(this);
        this.logout = this.logout.bind(this);
    }
    
    componentDidUpdate(){
        //makes user_id the same as app (so if logged in on app, logged in on banner)
        
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
        }
    }
    checkLogin(){
        const cookies = new Cookies();
        
        console.log("user_id:"+this.props.user_id);
        
        if(cookies.get('name') && cookies.get('jwt') && cookies.get('user_id') && this.state.isLoggedIn === false) {
            this.setState({user_id: this.props.user_id, isLoggedIn:true});
            console.log('logged in successful');
        }
        
        
    }
    logout(event){
        const cookies = new Cookies();
        cookies.remove('name')
        cookies.remove('jwt')
        cookies.remove('user_id')
        this.setState({isLoggedIn: false});
        
    }
    render() {
        // todo: make a conditional render to just show "logged in" when logged in
        // todo: add a register button
        const cookies = new Cookies();
        //console.log("cookies"+cookies.get('name')+cookies.get('jwt')+cookies.get('user_id'));
        if (this.state.user_id == ''){
            console.log("logging in right now");
            setInterval(this.checkLogin, 1000 );
            //this.checkLogin();
            //this.render()
        }
        
        return (          
            <div className="App-banner">
              <div className='App-title'>
                <Container fluid>                  
                  <BoxPanel>
                    Nathan's World
                  </BoxPanel>
                                    
                  <BoxPanel>
                    { !this.state.isLoggedIn ? 
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
                      
                      <div>
                      <p>Logged in as: {cookies.get('name')}</p>
                      <button type='button' onClick={this.logout}>LOGOUT</button>
                      </div>
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
