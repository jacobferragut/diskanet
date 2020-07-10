import React from 'react';
import { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { withRouter } from "react-router";

import { Container, /* Col,*/ Row } from 'react-bootstrap';
//import axios from 'axios';
//const APIURL = 'http://localhost:5000/';

import axios from 'axios';
const APIURL = 'http://localhost:5000/';


const BoxPanel = styled.div`
    font-size: 30px;
    background-color: #444;
    color: #fff;
    border-radius: 0px;
    padding: 20px;
    margin: 10px;
`;

const ResultPanel = styled(BoxPanel)`
    color: #000;
    background-color: tomato;
`;

const ResultButton = styled.button`
    padding: 5px;
    margin: 3px;
    background-color: #ccc;
    font-size: 110%;
    font-family: inherit;
    border-radius: 10px;
    overflow-wrap: normal;
`;

const RedirectButton = styled(ResultButton)`
    background-color: #555555;
    border: none;
    color: white;
    padding: 1em 5em;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 24px;
    margin: 8px 4px;
    cursor: pointer;
    box-shadow: 0 2.5px 5px 0;
    border-radius: 0px;
`;

const SliderPage = () => {
    return (
        <div className="my-5">
          <label htmlFor="customRange1">Example range</label>
          <input type="range" className="custom-range" id="customRange1" />
        </div>
    );
}

class ResultSites extends Component {
    constructor(props){
        super(props);
        this.visitSite = this.visitSite.bind(this);
        this.state = {redirect: false, site_id:''};
    }
    /*example of ressults---------
      { data: {
      5 : {title:'example title', body: 'example body', ... },
      7 : {title:'title example', body: 'body example', ... },
      }
      }
    */
    visitSite(){
        return (
            this.state.redirect ? <Redirect to={'/site/'.concat(this.props.user_id,'/',this.state.site_id)} /> : ''
        );
        
        //console.log(id);
    }
    
    render(){
	var results = this.props.results;
	
	const sites = [];
	if (Object.keys(results).length > 0){
	    for (var key of Object.keys(results['data'])){
            //sites's id
            var siteId = key;
            //all a site info
            var siteInfo = results['data'][siteId];
            sites.push(
                <div key={siteId}>
                          <h2> {siteInfo['title']} </h2>
                  <p> {siteInfo['body']} </p>
                  
                  <ResultButton onClick={()=> this.setState({redirect:true, site_id:siteId}) }>Visit</ResultButton>
                </div>
            );
	    }
	}
	return(
	    <div>
          {this.visitSite()}
	      {sites}
	    </div>
	);
    }
}

class NavBar extends Component{
    constructor(){
        super()  
        this.gotoHome = this.gotoHome.bind(this);
        this.gotoSite = this.gotoSite.bind(this);
        this.gotoAProfile = this.gotoAProfile.bind(this);        
        this.gotoDiscover = this.gotoDiscover.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);

        this.state = { redirect: null };
        
    }
    
    renderRedirect = () => {
        if (this.state.redirect){
            //console.log(this.state);
            return <Redirect to={this.state.redirect} />;
        };
        
    }
    
    gotoHome(event){
        //console.log("gotoHome");
        this.setState({ redirect: "/" });
    }
    
    gotoSite(event){    
        this.setState({ redirect: "/site/"+this.props.user_id });
    }
    
    gotoAProfile(event){
        var redirectTo = "/user/"+this.props.user_id;
        this.setState({ redirect: redirectTo });
    }
    
    gotoDiscover(event){
        this.setState({ redirect: "/discover/" });
    }
    
    render(){
        return(
            <div>
              {this.renderRedirect()}
              <Container>
                <Row>
                  <RedirectButton onClick={this.gotoHome}>Home</RedirectButton>
                  <RedirectButton onClick={this.gotoSite}>Site</RedirectButton>
                  <RedirectButton onClick={this.gotoDiscover}>Discover</RedirectButton>
                  <RedirectButton onClick={this.gotoAProfile}>Profile</RedirectButton>
                </Row>
              </Container>
            </div>
        );
    }   
}


class SiteCreation0 extends Component{
    constructor(props){
        super(props);
        this.state = {
            sites:{}, 
            background_color:'',
            name:'',
            title:'', 
            title_font:'', 
            title_font_size:'', 
            body:'', 
            body_font:'', 
            body_font_size:''
        };
        this.createSite = this.createSite.bind(this);
        this.change = this.change.bind(this);
    }
    
    componentDidMount(){
        const user_id = this.props.match.params.user_id;
        axios.get(APIURL + 'site/'.concat(user_id)).then( response => {
            this.setState({'sites' : response});
            console.log(response);
        });
    }
    
    createSite(){
        const user_id = this.props.match.params.user_id;
        axios.post(APIURL+"site/"+user_id, {
            background_color:this.state.background_color,
            name:this.state.name,
            title:this.state.title,
            title_font:this.state.title_font,
            title_font_size:this.state.title_font_size,
            body:this.state.body,
            body_font:this.state.body_font,
            body_font_size:this.state.body_font_size
        }, {
            headers: {
                'Authorization': `Bearer ${this.props.jwt}` 
            }
        });
    }
    change(event){
        this.setState({event.target.name:event.target.value});
    }
    render(){
        return(
            <div>
              <p>These are your created sites:</p>
              <ResultSites user_id={this.props.match.params.user_id} results={this.state.sites} />
              
              <select name='title_font' value={this.state.title_font} onChange={this.change()}>            
                <option value="American Typewriter">American Typewriter</option>
                <option value="Impact">Impact</option>
                <option value="Fantasy">Fantasy</option>
                <option selected value="Times New Roman">Times New Roman</option>
                <option value="Comic Sans MS">Times New Roman</option>
              </select>
              
              <ResultButton onClick={this.createSite}> Create Site </ResultButton>
            </div>
        );
    }
}

const SiteCreation = withRouter(SiteCreation0);
export {BoxPanel, SliderPage, ResultPanel, ResultButton, ResultSites, NavBar, SiteCreation};
