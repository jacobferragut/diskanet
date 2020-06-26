import React from 'react';
import { Component } from 'react';
import styled, { css } from 'styled-components'
import axios from 'axios';


const APIURL = 'http://localhost:5000/';

class SiteScreen extends Component {
	constructor(){
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
			this.setState({['site'] : response['data']});
		});
	}
	putSite(){
		
	}
	
	render(){
		return(
		<Site siteInfo={getSite()} />
		);
	}
	
}

class Site extends Component {
	constructor(props){
		super(props);
		
	}
	changeTitle() {
		var el = document.getElementById('Title');
		el.style.color = "red";
		el.style.fontSize = "15px";
		el.style.backgroundColor = "#FFFFFF";
	}
	
	render(){
		
		//title_font 
		//body_font 
    //body_font_size 
    //title_font_size 
    //background_color 

		var siteInfo = this.props.siteInfo;
		var newCss = "div {".concat('','}');
		
		var titleCss = "
		//edit css for 
		var sheet = document.createElement('style')
		sheet.innerHTML = "div {border: 2px solid black; background-color: blue;}";
		document.body.appendChild(sheet);
		
		//document.getElementById('Site').
		
		return(
			<div id='Site'>
					<div id='Title'>
						<h2> {siteInfo['title']} </h2>
					</div>
					<div id='Body'>
						<p> {siteInfo['body']} </p>

						<ResultButton id={siteId} onClick={this.visitSite}>Visit</ResultButton>
					</div>
			</div>
					

		);
	}
}
