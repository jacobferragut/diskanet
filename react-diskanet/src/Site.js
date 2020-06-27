import React from 'react';
import { Component } from 'react';
import styled, { css } from 'styled-components'
import axios from 'axios';

import { ResultButton } from './Components/components.js';

const SiteTitle = styled.div`
	${props => props.siteInfo.title_font ? "font-family: {props.siteInfo.title_font};" : '' }
	${props => props.siteInfo.title_font_size ? "font-size: {props.siteInfo.title_font_size};" : '' }
	

`;
const SiteBody = styled.div`
	${props => props.siteInfo.body_font ? "font-family: {props.siteInfo.body_font};" : '' }
	${props => props.siteInfo.body_font_size ? "font-size: {props.siteInfo.body_font_size};" : '' }

`;

const SitePanel = styled.div`
	${props => props.siteInfo.background_color ? "background-color: {props.siteInfo.background_color};" : '' }

`;


const APIURL = 'http://localhost:5000/';

class SiteScreen extends Component {
	constructor(props){
		super(props);
		this.state = { site: {} };
		
		this.getSite = this.getSite.bind(this);
		this.putSite = this.putSite.bind(this);
		
	}
	getSite(){
		//var siteUrl = 'site/'
		
		axios.get(APIURL + 'site/1/1').then( response => {
			/*example of response---------
			{ 1 : {title:'alsdfa', body:'dakjdfa',...} }
			*/
			var id = Object.keys(response['data'])[0];
			var ret = response['data'][id];
			console.log(ret);
			this.setState({ ['site'] : ret });
		});
	}
	putSite(){
		
	}
	
	render(){
		
		//console.log(this.state.site);
		return(
			<p>a</p>
		);
	}
	
}

class Site extends Component {
	constructor(props){
		super(props);
		
		this.state = {background_color: 'gray', body_font_size: '15', title_font_size: '15', body_font:'Times New Roman', title_font:'Comic Sans'};
	}
	render(){
		
		//title_font 
		//body_font 
		//body_font_size 
		//title_font_size 
		//background_color 
		
		var site = this.state;
		
		
		
		//document.getElementById('Site').
		
		return(
			<SitePanel siteInfo = {site}>
					<SiteTitle siteInfo = {site}>
						<h2> {site['title']} </h2>
					</SiteTitle>
					<SiteBody siteInfo = {site}>
						<p> {site['body']} </p>

						<ResultButton id='1' onClick={this.visitSite}>Visit</ResultButton>
					</SiteBody>
			</SitePanel>			

		);
	}
}
export {Site};