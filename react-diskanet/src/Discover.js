import React from 'react';
import { Component } from 'react';
import styled, { css } from 'styled-components'

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


export default class DiscoverScreen extends Component {
	constructor(props){
        super(props)
        this.state = {genre_music : ''}
        this.state = {genre_art : ''}
        this.state = {genre_film : ''}
		this.state = {genre_writing : ''}
		this.state = {isIncluding : ''}

        //this.logIt = this.logIt.bind(this)
        this.updateFilter = this.updateFilter.bind(this);
    }
    updateFilter(event) {
        this.setState({username: event.target.value});
    }
	
	render(){
		return (
			<div>
				<FilterPanel>
				<h1>Select Genre(s)</h1>
				<h2>must contain | may contain</h2>
				Music<input 
					type="checkbox" 
					value="music">
				</input>
				Music<input 
					type="checkbox" 
					value="music">
				</input><br/>
				Art<input 
					type="checkbox" 
					value="art">
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
				<h2>Include Non-selected Genres in discover results?</h2>
				Yes<input type="radio" name="exclude" value="Yes"></input><br/>
				No<input type="radio" name="exclude" value="No"></input>
				
				<FilterButton> Discover! </FilterButton>
				</FilterPanel>
			</div>
		);
	}
}
export {DiscoverScreen, FilterButton, FilterPanel};