import React from 'react';
import { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import { withRouter /*,useHistory*/ } from "react-router";
import { Redirect } from 'react-router-dom';
import renderHTML from 'react-render-html';
import { ResultButton } from './Components/components.js';
import { APIURL } from './apiurl.js';
import { Editor } from '@tinymce/tinymce-react';

//const APIURL='';

const SitePanel = styled.div`
    background-color: ${props => 
        props.siteInfo.background_color.length ? props.siteInfo.background_color : ""};
`;

//component displays all of a user's sites WITH CSS
class SiteBox extends Component {
    constructor(props){
        super(props); //results (multiple sites) and page='discover' or page='mysites'
        //and this.props.editSite(site_id);
        this.visitSite = this.visitSite.bind(this);
        this.changeSite = this.changeSite.bind(this);
        this.deleteSite = this.deleteSite.bind(this);
        //this.callEdit = this.callEdit.bind(this);
        this.state = {redirect: false, site_id:'', user_id:''};
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
    deleteSite(event){
        const site_id = event.target.value;
        const user_id = event.target.name;
        
        const url = APIURL.concat('site/', site_id);
        var r=window.confirm("are you sure you want to delete your site?");        
        if (r) {
            
            axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${this.props.jwt}` 
                }
            }).then( response => {
                alert("Site was deleted!");
                window.location.reload();
            }).catch(error => {
                alert("Error, authorization failed");
                console.log(error.response.data.error)
            });
        } 
    } 
    
    changeSite(event){
        const sid = event.target.value;
        const uid = event.target.name;
        this.setState({redirect:true, site_id:sid, user_id:uid})
    }

    render(){
        var results = this.props.results;
        
        const sites = [];
        if (Object.keys(results).length > 0){
            for (var key of Object.keys(results['data'])){
                //sites's id
                const siteId = key;
                //all a site info
                const siteInfo = results['data'][siteId];
                //site owner id
                const userId = siteInfo.owner_id;
                
             //html code detection on line 74: maybe there is a better way
                
                
                sites.push(
                    <div key={siteId}>
                      <SitePanel siteInfo = {siteInfo}>
                            {siteInfo['body'].includes("<") ? renderHTML(siteInfo['body']) : <p>{siteInfo['body']}</p> }
                          
                          
                                       
                        {this.props.page === 'mysites' ? 
                            <div>
                            <ResultButton value={siteId} name={userId} 
                                        onClick={this.changeSite}>Visit</ResultButton>
                            <ResultButton value={siteId} onClick = {
                                () => this.props.editHandler(true,siteId)
                                
                                }>Edit</ResultButton>
                            <ResultButton value={siteId} name={userId} onClick={this.deleteSite}>Delete</ResultButton>
                            
                            </div>
                        : <ResultButton site_id={siteId} name={userId} value={siteId}
                                        onClick={this.changeSite}>Visit</ResultButton>}
                        
                        
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
//and update sites
class SiteCreation0 extends Component{
    constructor(props){
        super(props);
        this.state = {
            sites:{}, 
            background_color:'White',
            name:'',
            body:'', 
            genre_music:false,
            genre_art:false,
            genre_film:false,
            genre_writing:false,
            isEditing:false,
            site_id:'',
            callEdit:false
        };
        this.createSite = this.createSite.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.changeCheckbox = this.changeCheckbox.bind(this);
        this.editSite = this.editSite.bind(this);
        this.handleEditorInit = this.handleEditorInit.bind(this);
    }
    handleEditorInit(e, editor){
        this.setState({editor:editor});
        this.state.editor.getBody().style.backgroundColor = this.state.background_color;
    }
    handleEditorChange = (content, editor) => {
        //console.log('Content was updated:', content);
        //console.log('real editor:', editor);
        this.setState({body: content});
        //editor.getBody().style.backgroundColor = this.state.background_color;
    }
    editHandler = (isEditing,site_id) => {
        axios.get(APIURL + 'site/'.concat(site_id)).then( response => {
            //this.setState({'sites' : response});
                
            const editedSite = response['data'][Object.keys(response.data)[0]];
            //console.log('editthis:'+editedSite['body']);
            this.setState({
                body:editedSite['body'], 
                name:editedSite['name'],
                background_color:editedSite['background_color'],
                genre_art:editedSite['genre_art'],
                genre_film:editedSite['genre_film'],
                genre_music:editedSite['genre_music'],
                genre_writing:editedSite['genre_writing']
            });
            //this.handleEditorChange(editedSite['body']);
             
        });
        this.setState({
            isEditing: isEditing,
            site_id: site_id
        })
    }
    componentDidMount(){
        const user_id = this.props.match.params.user_id;
        axios.get(APIURL + 'sites/'.concat(user_id)).then( response => {
            this.setState({'sites' : response});
            //console.log(response);
        });
        
        axios.get(APIURL + 'user/'.concat(user_id)).then( response => {
            this.setState({'name' : response['data'].name});
        });
        
    }
    componentDidUpdate(){
        if(this.state.editor) this.state.editor.getBody().style.backgroundColor = this.state.background_color;
    }
    editSite(){
        const site_id = this.state.site_id;

        axios.put(APIURL+"site/"+site_id, {
            background_color:this.state.background_color,
            name:this.state.name,
            body:this.state.body,
            genre_music:this.state.genre_music,
            genre_art:this.state.genre_art,
            genre_film:this.state.genre_film,
            genre_writing:this.state.genre_writing,
            user_id:this.props.match.params.user_id
        }, {
            headers: {
                'Authorization': `Bearer ${this.props.jwt}` 
            }
        }).then(response => {
            
            //console.log('edit site response',response);
            const newSite = response['data'];
            //console.log("SITE TO BE ADDED",newSite);
            
            const sites = this.state.sites;
            //console.log("CURRENT SITES",sites);
            
            sites['data'][newSite.site_id] = newSite;
            //console.log("NEW SITES",sites);
            
            this.setState({
                sites:sites,
                
                background_color:'White',
                name:'',
                body:'', 
                genre_music:false,
                genre_art:false,
                genre_film:false,
                genre_writing:false,
                isEditing:false,
                site_id:'',
                callEdit:false
            });
            
        });
            
        
        this.setState({callEdit:false});
        
        
    }
    
    createSite(){
        const user_id = this.props.match.params.user_id;
        axios.post(APIURL+"sites/"+user_id, {
            background_color:this.state.background_color,
            name:this.state.name,
            body:this.state.body,
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
            //console.log(response);
        });
    }
    
    changeColor(event){
        this.setState({ [event.target.name] : event.target.value });        
    }
    
    changeCheckbox(event){
        this.setState({ [event.target.name] : event.target.checked });
    }
    
    render(){
        //console.log('editor in the state',this.state.editor);
        return(
            

            <div>
                <form>

                <p>Create a new site below:</p>
              
                <br />
                Background Color
                <select name='background_color' value={this.state.background_color}
                        onChange={this.changeColor}>            
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
                  <option value="White">White</option>
                </select>
                <br />
                <div>
                
                    Genre: 
                    Music<input 
                    type="checkbox" 
                    name="genre_music"
                    onChange={this.changeCheckbox} checked={this.state.genre_music}>
                    </input>

                    Art<input 
                    type="checkbox" 
                    name="genre_art"
                    onChange={this.changeCheckbox} checked={this.state.genre_art}>
                    </input>
		       
                    Film<input 
                    type="checkbox" 
                    name="genre_film"
                    onChange={this.changeCheckbox} checked={this.state.genre_film}>
                    </input>
		       
                    Writing<input 
                    type="checkbox" 
                    name="genre_writing"
                    onChange={this.changeCheckbox} checked={this.state.genre_writing}>
                    </input>
		        </div>
		        <br/>
                </form>
                {this.state.isEditing ? 
                    <ResultButton onClick={this.editSite}> Submit Edited Site </ResultButton>
                :
                    <ResultButton onClick={this.createSite}> Create Site </ResultButton>
                }
                <Editor
                    id='myeditor'
                    apiKey='lvwpf2nbss83ux7xe0d0fardg0q3ddmna7wx5b62clsisnjn' 
                    value={this.state.body}
                    init={{
                        height: 500,
                        menubar: true,
                        plugins: [
                         'advlist autolink lists link image charmap print preview anchor',
                         'searchreplace visualblocks code fullscreen',
                         'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                         'undo redo | formatselect | bold italic backcolor | \
                         alignleft aligncenter alignright alignjustify | \
                         bullist numlist outdent indent | removeformat | help'
                    }}
                    onInit={this.handleEditorInit}
                    onEditorChange={this.handleEditorChange}
                />;
            
              <p>These are your created sites:</p>
              <SiteBox results={this.state.sites} page={'mysites'} jwt={this.props.jwt} editHandler={this.editHandler} />
              
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
                genre_music: '',
                genre_art: '',
                genre_film: '',
                genre_writing: '',
                owner_id: ''
        }, site_id:'', redirect:false };
        
        
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
        });
        
        
    }
    
    render(){
        var site = this.state.site;
        //IS THERE A BETTER WAY TO DETECT HTML CODE
        return (
        <div>
        
        <div> 	     
	      <SitePanel siteInfo = {this.state.site}>
		
		
          {this.state.site['body'].includes("<") ? renderHTML(this.state.site['body']) : <p>{this.state.site['body']}</p> }

          <div>
          <br />
          Genres:
          {this.state.site['genre_music'].toString() === 'true' ? <li>Music</li>  : ''}
          {this.state.site['genre_art'].toString() === 'true' ? <li> Art </li> : ''}
          {this.state.site['genre_film'].toString() === 'true' ? <li> Film </li> : ''}
          {this.state.site['genre_writing'].toString() === 'true' ? <li> Writing </li> : ''}
          <br />
          </div>
          <p> site created by: {this.state.site.name} </p>
          
          {this.state.showEdit ? <ResultButton onClick={this.editSite}> Edit</ResultButton> : '' }
          {this.state.showDelete ? <ResultButton onClick={this.deleteSite}> Delete</ResultButton> : '' }
          {this.state.redirect ? <Redirect to={"/sites/"+this.state.site.owner_id} /> : ''}
	      </SitePanel> 
          </div>
                
	    </div>
        );
    }   
}

const SiteCreation = withRouter(SiteCreation0);
const SiteScreen = withRouter(SiteScreen0);
export {SiteBox, SiteScreen, SitePanel, SiteCreation};
