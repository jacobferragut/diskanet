import React from 'react';
import { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import { useParams } from "react-router-dom";
import { withRouter } from "react-router";

import { ResultButton } from './Components/components.js';

const APIURL = 'http://localhost:5000/';

const SiteTitle = styled.div`
	font-family: ${props => props.siteInfo.title_font !== "" ? props.siteInfo.title_font : ""};
	font-size: ${props => props.siteInfo.title_font_size !== "" ? props.siteInfo.title_font_size + 'px' : ""};
`;

const SiteBody = styled.div`
	font-family: ${props => props.siteInfo.body_font.length ? props.siteInfo.body_font : "Comic Sans"};
	font-size: ${props => props.siteInfo.body_font_size !== "" ? props.siteInfo.body_font_size + 'px' : ""};
`;

const SitePanel = styled.div`
	background-color: ${props => props.siteInfo.background_color.length ? props.siteInfo.background_color : ""};
`;

//component for site results ??
class SiteBox extends Component {
    constructor(props){
		super(props);
	}
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
            
		this.putSite = this.putSite.bind(this);
	}
	componentDidMount(){
		const user_id = this.props.match.params.user_id;
        const site_id = this.props.match.params.site_id;
		var url = APIURL.concat('site/', user_id, '/', site_id) 
		axios.get(url).then( response => {
			
			var id = Object.keys(response['data'])[0];
			var ret = response['data'][id];
			console.log(ret);
			this.setState({ 'site' : ret });
		});
	}
	
	putSite(){
		
	}
	
	render(){
        const user_id = this.props.match.params.user_id;
        const site_id = this.props.match.params.site_id;
		
		var site = this.state.site;

		//console.log(this.state.site);
		return <div>
		
			<SitePanel siteInfo = {site}>
					
					<SiteTitle siteInfo = {site}>
						<h2> {site['title']} </h2>
					</SiteTitle>
					<SiteBody siteInfo = {site}>
						<p> {site['body']} </p>

						<p> site created by: {site.name} </p>
					</SiteBody>
			</SitePanel>
			
		</div>;
	}
	
}   

const SiteScreen = withRouter(SiteScreen0);
export {SiteBox, SiteScreen};
