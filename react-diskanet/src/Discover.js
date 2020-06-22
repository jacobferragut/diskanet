import React from 'react';
import { Component } from 'react';
import styled, { css } from 'styled-components'
import axios from 'axios';

import './App.css';
import {BoxPanel} from './App.js';

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
        this.state = { genre_music: "1", genre_art: "1", genre_film: "", genre_writing: "" }
        

        this.updateFilter = this.updateFilter.bind(this);
		this.submitSearch = this.submitSearch.bind(this);
    }
    updateFilter(event) {
        this.setState({genre_music:"1"});
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
					value="0"
					>
				</input>
				Music<input 
					type="checkbox" 
					name="mayContainMusic">
				</input><br/>
				Art<input 
					type="checkbox" 
					name="genre_art">
				</input>
				Art<input 
					type="checkbox" 
					value="art">
				</input><br/>
				Film<input 
					type="checkbox" 
					value="film">
				</input>
				Film<input 
					type="checkbox" 
					value="film">
				</input><br/>
				Writing<input 
					type="checkbox" 
					value="writing">
				</input>
				Writing<input 
					type="checkbox" 
					value="writing">
				</input><br/>
				
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