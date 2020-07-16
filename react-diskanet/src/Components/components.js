import React from 'react';
import { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { withRouter } from "react-router";

import { Container, /* Col,*/ Row } from 'react-bootstrap';


import axios from 'axios';

const APIURL = 'http://localhost:5000/';

const BoxPanel = styled.div`
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

const RedirectButton = styled(ResultButton)`
    background-color: #555555;
    border: none;
    color: white;
    padding: 1em 5em;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 24px;
    margin: 8px 4px;
    cursor: pointer;
    box-shadow: 0 2.5px 5px 0;
    border-radius: 0px;
`;

const SliderPage = () => {
    return (
        <div className="my-5">
          <label htmlFor="customRange1">Example range</label>
          <input type="range" className="custom-range" id="customRange1" />
        </div>
    );
}



class NavBar extends Component{
    constructor(){
        super()  
        this.gotoHome = this.gotoHome.bind(this);
        this.gotoSite = this.gotoSite.bind(this);
        this.gotoAProfile = this.gotoAProfile.bind(this);        
        this.gotoDiscover = this.gotoDiscover.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);

        this.state = { redirect: null };
        
    }
    
    renderRedirect = () => {
        if (this.state.redirect){
            //console.log(this.state);
            return <Redirect to={this.state.redirect} />;
        };
        
    }
    
    gotoHome(event){
        //console.log("gotoHome");
        this.setState({ redirect: "/" });
    }
    
    gotoSite(event){    
        this.setState({ redirect: "/sites/"+this.props.user_id });
    }
    
    gotoAProfile(event){
        var redirectTo = "/user/"+this.props.user_id;
        this.setState({ redirect: redirectTo });
    }
    
    gotoDiscover(event){
        this.setState({ redirect: "/discover/" });
    }
    
    render(){
        return(
            <div>
              {this.renderRedirect()}
              <Container>
                <Row>
                  <RedirectButton onClick={this.gotoHome}>Home</RedirectButton>
                  <RedirectButton onClick={this.gotoSite}>Site</RedirectButton>
                  <RedirectButton onClick={this.gotoDiscover}>Discover</RedirectButton>
                  <RedirectButton onClick={this.gotoAProfile}>Profile</RedirectButton>
                </Row>
              </Container>
            </div>
        );
    }   
}



export {BoxPanel, SliderPage, ResultPanel, ResultButton, NavBar};
