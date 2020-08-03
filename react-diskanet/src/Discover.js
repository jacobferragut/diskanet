import React from 'react';
import { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios';

import './App.css';
// import {SliderPage, ResultPanel, ResultSites} from './Components/components.js';
import {SliderPage, ResultPanel} from './Components/components.js';
import {SiteBox} from './Site.js';
import { APIURL } from 'apiurl';

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

//genre_music, genre_art, genre_film, genre_writing
export default class DiscoverScreen extends Component {
    constructor(props){
        super(props)
	//at first there is no state to submit
	//this.state = {}
        this.state = { genre_music: "0", genre_art: "0", genre_film: "0",
                       genre_writing: "0", results: {} };
	
        this.updateFilter = this.updateFilter.bind(this);
	    this.submitSearch = this.submitSearch.bind(this);
        this.updateMayContain = this.updateMayContain.bind(this);
    }
    
    updateFilter(event) {
	if (event.target.checked) {
	    //make may genre unchecked
	    var mayName = event.target.name.substring(6);
	    document.getElementsByName(mayName)[0].checked = false;
	    
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
        var genre = "genre_".concat(event.target.name);
        if (event.target.checked){
            //make must contain genre unchecked
            
            document.getElementsByName(genre)[0].checked = false;
            this.setState({ [genre] : "",});
        } else {
            this.setState({ [genre] : "0",});
        }
    }
    
    submitSearch() {
        //erase old results before creating new ones (if there is any)  console.log(response);
        this.setState({'results' : {}});
        axios.post(APIURL + 'discover', this.state).then( response => {
            /*example of response---------
              { 
              1 : {title:'example title', body: 'example body', ... },
              2 : {title:'title example', body: 'body example', ... },
              }
            */
            this.setState({'results' : response});
            console.log(this.state);
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
		      name="film"
		      onChange={this.updateMayContain.bind(this)}>
		    </input><br/>
		Writing<input 
			 type="checkbox" 
			 name="genre_writing"
			 onChange={this.updateFilter.bind(this)}>
		       </input>
		Writing<input 
			 type="checkbox" 
			 name="writing"
			 onChange={this.updateMayContain.bind(this)}>
		       </input><br/>	
		<SliderPage />
	        
		<FilterButton type="button" onClick={this.submitSearch}>
                  Discover!
                </FilterButton>
	      </FilterPanel>
	      <br />
	      <ResultPanel>
		<SiteBox results={this.state.results} />
	      </ResultPanel>
	    </div>
	);
    }
}

export {DiscoverScreen, FilterButton, FilterPanel};
