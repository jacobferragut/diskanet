import React from 'react';
import { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import { withRouter } from "react-router";
import { Redirect } from 'react-router-dom';

import { ResultButton } from './Components/components.js';

const APIURL = 'http://localhost:5000/';

const SiteTitle = styled.div`
    font-family: ${props => props.siteInfo.title_font !== "" ? props.siteInfo.title_font : ""};
    font-size: ${props => 
        props.siteInfo.title_font_size !== "" ? props.siteInfo.title_font_size + 'px' : ""};
`;

const SiteBody = styled.div`
    font-family: ${props => props.siteInfo.body_font.length ? props.siteInfo.body_font : "Comic Sans"};
    font-size: ${props => 
        props.siteInfo.body_font_size !== "" ? props.siteInfo.body_font_size + 'px' : ""};
`;

const SitePanel = styled.div`
    background-color: ${props => 
        props.siteInfo.background_color.length ? props.siteInfo.background_color : ""};
`;

//component displays all of a user's sites WITH CSS
class SiteBox extends Component {
    constructor(props){
        super(props); //user_id and results (multiple sites)
        this.visitSite = this.visitSite.bind(this);
        this.changeSite = this.changeSite.bind(this);
        this.state = {redirect: false, site_id:'', user_id:''};
    }
    visitSite(){
        return (
            this.state.redirect ? <Redirect to={'/site/'.concat(this.state.user_id,'/',this.state.site_id)} /> : ''
        );
        
        //console.log(id);
    }
    changeSite(event){
        this.setState({redirect:true, site_id:event.target.id, user_id:event.target.key})
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
                        <SitePanel siteInfo = {siteInfo}>
                            <SiteTitle siteInfo = {siteInfo}>
                                <h2> {siteInfo['title']} </h2>
                            </SiteTitle>
            
                            <SiteBody siteInfo = {siteInfo}>
                                <p> {siteInfo['body']} </p>                         
                            
                                <ResultButton id={siteId} key={siteInfo['owner_id']} onClick={this.changeSite}>Visit</ResultButton>
                            </SiteBody>
                        </SitePanel>                  
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
class SiteScreen0 extends Component {
    constructor(props){
        super(props);
        
        this.state = { site: {
            title: 'example title',
                body: 'cool site: The quick brown fox jumped over the lazy dog',
                background_color: 'tan',
                body_font_size: '48',
                title_font_size: '30',
                body_font: 'Comic Sans MS',
                title_font: 'Arial'
        } };
        
        this.putSite = this.putSite.bind(this);
    }
    
    componentDidMount(){
        const user_id = this.props.match.params.user_id;
        const site_id = this.props.match.params.site_id;
        const url = APIURL.concat('site/', user_id, '/', site_id);
            
        axios.get(url).then( response => {		
            const id = Object.keys(response['data'])[0];
            const ret = response['data'][id];
            console.log(ret);
            this.setState({ 'site' : ret });
        });
    }
    
    putSite(){
	
    }
    
    render(){
	var site = this.state.site;
        
	return (		
            <div>	     
	      <SitePanel siteInfo = {site}>
		<SiteTitle siteInfo = {site}>
		  <h2> {site['title']} </h2>
		</SiteTitle>
		
		<SiteBody siteInfo = {site}>
		  <p> {site['body']} </p>                          
                  <p> site created by: {site.name} </p>
		</SiteBody>
	      </SitePanel>                    
	    </div>
        );
    }   
}


const SiteScreen = withRouter(SiteScreen0);
export {SiteBox, SiteScreen, SiteBody, SitePanel, SiteTitle};
