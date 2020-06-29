import React from 'react';
import { Component } from 'react';
//import styled, { css } from 'styled-components'
import axios from 'axios';


const APIURL = 'http://localhost:5000/';

export default class UserInformation extends Component {
    constructor(props){
        super(props);
    }
    
    //this.state = { username:"oo", numSites:"0"};
    
    render(){
        return(
            <div>
                <h1>Profile Page</h1>
                <p>Username is da username</p>
            </div>   
        )
        
    }
}

export {UserInformation};