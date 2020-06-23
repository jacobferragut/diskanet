import React from 'react';
import { Component } from 'react';
import styled, { css } from 'styled-components'
import axios from 'axios';

import './App.css';
import {BoxPanel} from './App.js';
import {SliderPage} from './App.js';

//submit discover filter button
const FilterButton = styled.button`
	padding: 5px;
	margin: 3px;
	background-color: #ccc;
	font-size: 110%;
	font-family: inherit;
`;
//filter panel for genres
const FilterPanel = styled.div`
	display: inline-block;
	font-size: 1em;
	background-color: #444;
	color: #fff;
	border-radius: 0px;
	padding: 20px;
	margin: 10px;
	font-family: serif
`;
const ResultButton = styled(FilterButton)`
	border-radius: 10px;
	overflow-wrap: normal;
`;

//genre_music, genre_art, genre_film, genre_writing
const APIURL = 'http://localhost:5000/';

export default class DiscoverScreen extends Component {
	constructor(props){
        super(props)
		//at first there is no state to submit
		//this.state = {}
        this.state = { genre_music: "0", genre_art: "0", genre_film: "0", genre_writing: "0" }
        
		
        this.updateFilter = this.updateFilter.bind(this);
		this.submitSearch = this.submitSearch.bind(this);
    }
    updateFilter(event) {
		if (event.target.checked) {
			this.setState({
				[event.target.name] : "1",
			});
		} else {
			this.setState({
				[event.target.name] : "0",
			});
		}
    }
	updateMayContain(event) {
		if (event.target.checked){
			this.setState({["genre_".concat(event.target.name)] : "",});
		}
		else{
			this.setState({["genre_".concat(event.target.name)] : "0",});
		}
	}
	
	submitSearch() {
		axios.post(APIURL + 'discover', this.state).then( response => {
			console.log(response);

		});
	};
	render(){
		return (
			<div>
				<FilterPanel>
				<h1>Select Genre(s)</h1>
				<h2>must contain | may contain</h2>
				Music<input 
					type="checkbox" 
					name="genre_music"
					onChange={this.updateFilter.bind(this)}>
				</input>
				Music<input 
					type="checkbox" 
					name="music"
					onChange={this.updateMayContain.bind(this)}>
				</input><br/>
				Art<input 
					type="checkbox" 
					name="genre_art"
					onChange={this.updateFilter.bind(this)}>
				</input>
				Art<input 
					type="checkbox" 
					name="art"
					onChange={this.updateMayContain.bind(this)}>
				</input><br/>
				Film<input 
					type="checkbox" 
					name="genre_film"
					onChange={this.updateFilter.bind(this)}>
				</input>
				Film<input 
					type="checkbox" 
					name="film">
				</input><br/>
				Writing<input 
					type="checkbox" 
					name="genre_writing"
					onChange={this.updateFilter.bind(this)}>
				</input>
				Writing<input 
					type="checkbox" 
					name="writing">
				</input><br/>
				
				<SliderPage />
				
				<FilterButton type="button" onClick={this.submitSearch}> Discover! </FilterButton>
				</FilterPanel>
				
				<ResultButton>
					<p>Test Site:</p>
					<p>Welcome to my site.</p>
					<p>This is an example of a site result.</p>
				</ResultButton>
			</div>
		);
	}
}
export {DiscoverScreen, FilterButton, FilterPanel};