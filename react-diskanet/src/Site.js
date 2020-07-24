import React from 'react';
import { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import { withRouter /*,useHistory*/ } from "react-router";
import { Redirect } from 'react-router-dom';
import renderHTML from 'react-render-html';
import { ResultButton } from './Components/components.js';

const APIURL = 'http://localhost:5000/';

const SiteTitle = styled.div`
    font-family: ${props => props.siteInfo.title_font !== "" ? props.siteInfo.title_font : ""};
    font-size: ${props => 
        props.siteInfo.title_font_size !== "" ? props.siteInfo.title_font_size + 'px' : ""};
`;

const SiteBody = styled.div`
    font-family: ${props => props.siteInfo.body_font.length ? props.siteInfo.body_font : "Comic Sans"};
    font-size: ${props => 
        props.siteInfo.body_font_size !== "" ? props.siteInfo.body_font_size + 'px' : ""};
`;

const SitePanel = styled.div`
    background-color: ${props => 
        props.siteInfo.background_color.length ? props.siteInfo.background_color : ""};
`;

//component displays all of a user's sites WITH CSS
class SiteBox extends Component {
    constructor(props){
        super(props); //results (multiple sites)
        this.visitSite = this.visitSite.bind(this);
        this.changeSite = this.changeSite.bind(this);
        this.state = {redirect: false, site_id:''};
        this.render = this.render.bind(this);
    }
    visitSite(){
        return (
            this.state.redirect
                ? <Redirect to={'/site/'.concat(this.state.site_id)} />
                : ''
        );        
        //console.log(id);
    }
    
    changeSite(event){
        this.setState({redirect:true, site_id:event.target.id, user_id:event.target.key})
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
                      <SitePanel siteInfo = {siteInfo}>
                        <SiteTitle siteInfo = {siteInfo}>
                          <h2> {siteInfo['title']} </h2>
                        </SiteTitle>
                        
                        <SiteBody siteInfo = {siteInfo}>
                        
                            {siteInfo['body'].includes("<p>") ? renderHTML(siteInfo['body']) : <p>{siteInfo['body']}</p> }
                            
                            
                          <ResultButton id={siteId} key={siteInfo['owner_id']}
                                        onClick={this.changeSite}>Visit</ResultButton>
                        </SiteBody>
                      </SitePanel>                  
                    </div>
                );
            }
        }
        
        return(
            <div>
              {this.visitSite()}
              {sites}
            </div>
        );
    }
}

//displays sitebox (user's sites) AND site creation form
class SiteCreation0 extends Component{
    constructor(props){
        super(props);
        this.state = {
            sites:{}, 
            background_color:'Gray',
            name:'',
            title:'', 
            title_font:'Times New Roman', 
            title_font_size:'', 
            body:'', 
            body_font:'Times New Roman', 
            body_font_size:'',
            genre_music:false,
            genre_art:false,
            genre_film:false,
            genre_writing:false
        };
        this.createSite = this.createSite.bind(this);
        this.change = this.change.bind(this);
        this.changeCheckbox = this.changeCheckbox.bind(this);
    }
    
    componentDidMount(){
        const user_id = this.props.match.params.user_id;
        axios.get(APIURL + 'sites/'.concat(user_id)).then( response => {
            this.setState({'sites' : response});
            console.log(response);
        });
        
        axios.get(APIURL + 'user/'.concat(user_id)).then( response => {
            this.setState({'name' : response['data'].name});
        });
    }
    
    createSite(){
        const user_id = this.props.match.params.user_id;
        axios.post(APIURL+"sites/"+user_id, {
            background_color:this.state.background_color,
            name:this.state.name,
            title:this.state.title,
            title_font:this.state.title_font,
            title_font_size:this.state.title_font_size,
            body:this.state.body,
            body_font:this.state.body_font,
            body_font_size:this.state.body_font_size,
            genre_music:this.state.genre_music,
            genre_art:this.state.genre_art,
            genre_film:this.state.genre_film,
            genre_writing:this.state.genre_writing
        }, {
            headers: {
                'Authorization': `Bearer ${this.props.jwt}` 
            }
        }).then(response => {
            this.setState({'sites' : response});
            console.log(response);
        });
    }
    
    change(event){
        this.setState({ [event.target.name] : event.target.value });
    }
    
    changeCheckbox(event){
        //event.target.value = event.target.checked;
        //this.change(event);
        this.setState({ [event.target.name] : event.target.checked });

    }
    
    render(){
        return(
            <div>
              <p>These are your created sites:</p>
              <SiteBox results={this.state.sites} />
              <form>
              Title:
              <select name='title_font' value={this.state.title_font} onChange={this.change}>
                <option value="American Typewriter">American Typewriter</option>
                <option value="Impact">Impact</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Comic Sans MS">Comic Sans MS</option>
              </select>
              <input type="text" name="title" value={this.state.title}
                            onChange={this.change}/>
              <br />
                Title Font Size:<input type="text" name="title_font_size"
                                       value={this.state.title_font_size} onChange={this.change}/>
              <br />Body:
              <select name='body_font' value={this.state.body_font} onChange={this.change}>            
                <option value="American Typewriter">American Typewriter</option>
                <option value="Impact">Impact</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Comic Sans MS">Comic Sans MS</option>
              </select>
              <textarea name="body" value={this.state.body}
                            onChange={this.change}/>
              <br />
                Body Font Size:<input type="text" name="body_font_size"
                                      value={this.state.body_font_size}
                                      onChange={this.change}/>
              <br />
              Background Color
                <select name='background_color' value={this.state.background_color}
                        onChange={this.change}>            
                  <option value="Maroon">Maroon</option>
                  <option value="Red">Red</option>
                  <option value="Orange">Orange</option>
                  <option value="Yellow">Yellow</option>
                  <option value="Olive">Olive</option>
                  <option value="Green">Green</option>
                  <option value="Purple">Purple</option>
                  <option value="Fuchsia">Fuchsia</option>
                  <option value="Lime">Lime</option>
                  <option value="Teal">Teal</option>
                  <option value="Gray">Gray</option>
                </select>
              <br />
            <div>
              Genre: Music<input 
		       type="checkbox" 
		       name="genre_music"
		       onChange={this.changeCheckbox}>
		       </input>
		       
               Art<input 
		       type="checkbox" 
		       name="genre_art"
		       onChange={this.changeCheckbox}>
		       </input>
		       
               Film<input 
		       type="checkbox" 
		       name="genre_film"
		       onChange={this.changeCheckbox}>
		       </input>
		       
               Writing<input 
		       type="checkbox" 
		       name="genre_writing"
		       onChange={this.changeCheckbox}>
		       </input>
		    </div>
		     <br/>
              
              
              </form>
              <ResultButton onClick={this.createSite}> Create Site </ResultButton>
            </div>
        );
    }
}

//displays a single site
class SiteScreen0 extends Component {
    constructor(props){
        super(props);
        
        this.state = { site: {
            title: '',
                body: '',
                background_color: 'white',
                body_font_size: '48',
                title_font_size: '30',
                body_font: 'Comic Sans MS',
                title_font: 'Arial',
                genre_music: '',
                genre_art: '',
                genre_film: '',
                genre_writing: '',
                owner_id: ''
        }, site_id:'', showDelete:false, redirect:false };
        
        this.putSite = this.putSite.bind(this);
        this.activateDelete = this.activateDelete.bind(this);
        this.deleteSite = this.deleteSite.bind(this);
    }
    
    componentDidMount(){
        const site_id = this.props.match.params.site_id;
        const url = APIURL.concat('site/', site_id);
        
        //get site
        axios.get(url).then( response => {		
            const id = Object.keys(response['data'])[0];
            const ret = response['data'][id];
            //console.log(ret);
            this.setState({ 'site': ret, 'site_id': site_id });
            
            //render delete button
            if (ret.owner_id.toString() === this.props.user_id.toString()){
                this.setState({ 'showDelete': true });
            }
            
        });
        
        
    }
    
    putSite(){
	
    }
    activateDelete(){
        const site_id = this.props.match.params.site_id;
        const url = APIURL.concat('site/', site_id);
        
        if(this.props.user_id.toString() === this.state.site.owner_id.toString()){
            console.log(this.props.jwt);
            axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${this.props.jwt}` 
                }
            }).then( response => {
                console.log("Site was deleted!");
                this.setState({redirect:true});
            });
        }
    }
    
    deleteSite(){
        //const site_id = this.props.match.params.site_id;
        //const url = APIURL.concat('site/', site_id);
        var r=window.confirm("are you sure you want to delete your site?");        
        if (r) {
            this.activateDelete();        
        } else {
            alert("You are not the owner of this site");
        }
    }
    
    render(){
        var site = this.state.site;
        
        return (
            
            <div>	     
	      <SitePanel siteInfo = {site}>
		<SiteTitle siteInfo = {site}>
		  <h2> {site['title']} </h2>
		</SiteTitle>
		
		<SiteBody siteInfo = {site}>   
          {site['body'].includes("<p>") ? renderHTML(site['body']) : <p>{site['body']}</p> }

          <div>
          <br />
          Genres:
          {site['genre_music'].toString() === 'true' ? <li>Music</li>  : ''}
          {site['genre_art'].toString() === 'true' ? <li> Art </li> : ''}
          {site['genre_film'].toString() === 'true' ? <li> Film </li> : ''}
          {site['genre_writing'].toString() === 'true' ? <li> Writing </li> : ''}
          <br />
          </div>
          <p> site created by: {site.name} </p>
          
          {this.state.showDelete ? <ResultButton onClick={this.deleteSite}> Delete</ResultButton> : '' }
          {this.state.redirect ? <Redirect to={"/sites/"+this.state.site.owner_id} /> : ''}
		</SiteBody>
	      </SitePanel>                    
	    </div>
        );
    }   
}

const SiteCreation = withRouter(SiteCreation0);
const SiteScreen = withRouter(SiteScreen0);
export {SiteBox, SiteScreen, SiteBody, SitePanel, SiteTitle, SiteCreation};
