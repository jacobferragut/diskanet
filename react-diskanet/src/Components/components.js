import React from 'react';
import { Component } from 'react';
import styled, { css } from 'styled-components';


const BoxPanel = styled.div`
	display: inline-block;
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
	}
	/*example of ressults---------
			{ data: {
			  5 : {title:'example title', body: 'example body', ... },
			  7 : {title:'title example', body: 'body example', ... },
			}
			}
			*/
	visitSite(event){
		var id = event.target.id;
		console.log(id);
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
						
						<ResultButton id={siteId} onClick={this.visitSite}>Visit</ResultButton>
					</div>
				);
			}
		}
		return(
			<div>
			{sites}
			</div>
		);
	}
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

export {Banner, BoxPanel, SliderPage, ResultPanel, ResultButton, ResultSites};
