import React from 'react';
import { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import { useParams } from "react-router-dom";
import { withRouter } from "react-router";

import { ResultButton } from './Components/components.js';

const APIURL = 'http://localhost:5000/';

const SiteTitle = styled.div`
	font-family: ${props => props.siteInfo.title_font !== "" ? 
                props.siteInfo.title_font : ""};
	font-size: ${props => props.siteInfo.title_font_size !== "" ? props.siteInfo.title_font_size.concat('px') : ""};
`;

const SiteBody = styled.div`
	font-family: ${props => props.siteInfo.body_font.length ? props.siteInfo.body_font : "Comic Sans"};
	font-size: ${props => props.siteInfo.body_font_size !== "" ? props.siteInfo.body_font_size.concat('px') : ""};
`;

const SitePanel = styled.div`
	background-color: ${props => props.siteInfo.background_color.length ? props.siteInfo.background_color : ""};
`;


class SiteBox extends Component {
    render() {
        const site = this.props.Site;
        
        return (
            <div>	     
	      <p>User id: { this.props.UserId } and Site id: { this.props.SiteId }</p>
	      <SitePanel siteInfo = {site}>
		<SiteTitle siteInfo = {site}>
		  <h2> {site['title']} </h2>
		</SiteTitle>
		<SiteBody siteInfo = {site}>
		  <p> {site['body']} </p>                         
		  <ResultButton id='1' onClick={this.visitSite}>Visit</ResultButton>
		</SiteBody>
	      </SitePanel>                    
	    </div>
        );
    }
};

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
            
		this.getSite = this.getSite.bind(this);
		this.putSite = this.putSite.bind(this);
	}

	getSite(){
		//var siteUrl = 'site/'
		if (this.props.call){
			axios.get(APIURL + 'site/1/1').then( response => {
				/*example of response---------
				{ 1 : {title:'alsdfa', body:'dakjdfa',...} }
				*/
				var id = Object.keys(response['data'])[0];
				var ret = response['data'][id];
				console.log(ret);
				this.setState({ 'site' : ret });
			});
		}
		this.props.call = false;
	}
    
	putSite(){		
	}
	
	render(){
            const user_id = this.props.match.params.user_id;
            const site_id = this.props.match.params.site_id;
	    const site = this.state;
            // site properties:
            //title_font
	    //body_font 
	    //body_font_size 
	    //title_font_size 
	    //background_color 

	    //console.log(this.state.site);
            // TODO: pass the visit-site function
	    return <SiteBox
                     UserId={ user_id }
                     SiteId={ site_id }
                     Site= { site }
                   />;
	}	
}   

const SiteScreen = withRouter(SiteScreen0);
export {SiteBox, SiteScreen};
