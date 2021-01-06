(this["webpackJsonpreact-diskanet"]=this["webpackJsonpreact-diskanet"]||[]).push([[0],{120:function(e,t){},122:function(e,t){},139:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(73),s=a.n(r),o=(a(86),a(6)),c=a(7),l=a(2),u=a(9),d=a(8),h=a(4),m=a(29),g=a(5),p=a.n(g),b=a(16),v=a(140),f=(a(60),a(74)),E=a(17),k=a(19),y=a(20),_=a(141),w=a(142);a(103);function j(){var e=Object(k.a)(["\n    padding: 5px;\n    margin: 3px;\n    background-color: #ccc;\n    font-size: 110%;\n    font-family: inherit;\n    border-radius: 10px;\n    overflow-wrap: normal;\n"]);return j=function(){return e},e}function O(){var e=Object(k.a)(["\n    color: #000;\n    background-color: tomato;\n"]);return O=function(){return e},e}function S(){var e=Object(k.a)(["\n    font-size: 30px;\n    background-color: #444;\n    color: #fff;\n    border-radius: 0px;\n    padding: 20px;\n    margin: 10px;\n"]);return S=function(){return e},e}var C=y.a.div(S()),x=Object(y.a)(C)(O()),I=y.a.button(j()),D=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(){var e;return Object(o.a)(this,a),(e=t.call(this)).renderRedirect=function(){if(e.state.redirect)return i.a.createElement(h.a,{to:e.state.redirect})},e.gotoHome=e.gotoHome.bind(Object(l.a)(e)),e.gotoSite=e.gotoSite.bind(Object(l.a)(e)),e.gotoAProfile=e.gotoAProfile.bind(Object(l.a)(e)),e.gotoDiscover=e.gotoDiscover.bind(Object(l.a)(e)),e.renderRedirect=e.renderRedirect.bind(Object(l.a)(e)),e.state={redirect:null},e}return Object(c.a)(a,[{key:"gotoHome",value:function(e){this.setState({redirect:"/"})}},{key:"gotoSite",value:function(e){this.setState({redirect:"/sites/"+this.props.user_id})}},{key:"gotoAProfile",value:function(e){var t="/user/"+this.props.user_id;this.setState({redirect:t})}},{key:"gotoDiscover",value:function(e){this.setState({redirect:"/discover/"})}},{key:"render",value:function(){return i.a.createElement("div",null,this.renderRedirect(),i.a.createElement(v.a,null,i.a.createElement(_.a,null,i.a.createElement(w.a,null,i.a.createElement(b.b,{to:"/"},"Home")),i.a.createElement(w.a,null,i.a.createElement(b.b,{to:"/sites/"+this.props.user_id},"My Sites")),i.a.createElement(w.a,null,i.a.createElement(b.b,{to:"/discover"},"Discover")),i.a.createElement(w.a,null,i.a.createElement(b.b,{to:"/user/"+this.props.user_id},"My Profile")))))}}]),a}(n.Component),R=a(50),M=a.n(R),P="api/",L=a(79);function U(){var e=Object(k.a)(["\n    background-color: ",";\n"]);return U=function(){return e},e}var F=y.a.div(U(),(function(e){return e.siteInfo.background_color.length?e.siteInfo.background_color:""})),T=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).visitSite=n.visitSite.bind(Object(l.a)(n)),n.changeSite=n.changeSite.bind(Object(l.a)(n)),n.deleteSite=n.deleteSite.bind(Object(l.a)(n)),n.state={redirect:!1,site_id:"",user_id:""},n.render=n.render.bind(Object(l.a)(n)),n}return Object(c.a)(a,[{key:"visitSite",value:function(){return this.state.redirect?i.a.createElement(h.a,{to:"/site/".concat(this.state.site_id)}):""}},{key:"deleteSite",value:function(e){var t=e.target.value,a=(e.target.name,P.concat("site/",t));window.confirm("are you sure you want to delete your site?")&&p.a.delete(a,{headers:{Authorization:"Bearer ".concat(this.props.jwt)}}).then((function(e){alert("Site was deleted!"),window.location.reload()})).catch((function(e){alert("Error, authorization failed"),console.log(e.response.data.error)}))}},{key:"changeSite",value:function(e){var t=e.target.value,a=e.target.name;this.setState({redirect:!0,site_id:t,user_id:a})}},{key:"render",value:function(){var e=this,t=this.props.results,a=[];if(Object.keys(t).length>0)for(var n=function(){var n=s[r],o=t.data[n],c=o.owner_id;a.push(i.a.createElement("div",{key:n},i.a.createElement(F,{siteInfo:o},o.body.includes("<")?M()(o.body):i.a.createElement("p",null,o.body),"mysites"===e.props.page?i.a.createElement("div",null,i.a.createElement(I,{value:n,name:c,onClick:e.changeSite},"Visit"),i.a.createElement(I,{value:n,onClick:function(){return e.props.editHandler(!0,n)}},"Edit"),i.a.createElement(I,{value:n,name:c,onClick:e.deleteSite},"Delete")):i.a.createElement(I,{site_id:n,name:c,value:n,onClick:e.changeSite},"Visit"))))},r=0,s=Object.keys(t.data);r<s.length;r++){n()}return i.a.createElement("div",null,this.visitSite(),a)}}]),a}(n.Component),A=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).handleEditorChange=function(e,t){n.setState({body:e})},n.editHandler=function(e,t){p.a.get(P+"site/".concat(t)).then((function(e){var t=e.data[Object.keys(e.data)[0]];console.log("editthis:"+t.body),n.setState({body:t.body,name:t.name,background_color:t.background_color,genre_art:t.genre_art,genre_film:t.genre_film,genre_music:t.genre_music,genre_writing:t.genre_writing})})),n.setState({isEditing:e,site_id:t})},n.state={sites:{},background_color:"White",name:"",body:"",genre_music:!1,genre_art:!1,genre_film:!1,genre_writing:!1,isEditing:!1,site_id:"",callEdit:!1},n.createSite=n.createSite.bind(Object(l.a)(n)),n.changeColor=n.changeColor.bind(Object(l.a)(n)),n.changeCheckbox=n.changeCheckbox.bind(Object(l.a)(n)),n.editSite=n.editSite.bind(Object(l.a)(n)),n.handleEditorInit=n.handleEditorInit.bind(Object(l.a)(n)),n}return Object(c.a)(a,[{key:"handleEditorInit",value:function(e,t){this.setState({editor:t}),this.state.editor.getBody().style.backgroundColor=this.state.background_color}},{key:"componentDidMount",value:function(){var e=this,t=this.props.match.params.user_id;p.a.get(P+"sites/".concat(t)).then((function(t){e.setState({sites:t})})),p.a.get(P+"user/".concat(t)).then((function(t){e.setState({name:t.data.name})}))}},{key:"componentDidUpdate",value:function(){this.state.editor&&(this.state.editor.getBody().style.backgroundColor=this.state.background_color)}},{key:"editSite",value:function(){var e=this,t=this.state.site_id;p.a.put(P+"site/"+t,{background_color:this.state.background_color,name:this.state.name,body:this.state.body,genre_music:this.state.genre_music,genre_art:this.state.genre_art,genre_film:this.state.genre_film,genre_writing:this.state.genre_writing,user_id:this.props.match.params.user_id},{headers:{Authorization:"Bearer ".concat(this.props.jwt)}}).then((function(t){console.log("edit site response",t);var a=t.data;console.log("SITE TO BE ADDED",a);var n=e.state.sites;console.log("CURRENT SITES",n),n.data[a.site_id]=a,console.log("NEW SITES",n),e.setState({sites:n,background_color:"White",name:"",body:"",genre_music:!1,genre_art:!1,genre_film:!1,genre_writing:!1,isEditing:!1,site_id:"",callEdit:!1})})),this.setState({callEdit:!1})}},{key:"createSite",value:function(){var e=this,t=this.props.match.params.user_id;p.a.post(P+"sites/"+t,{background_color:this.state.background_color,name:this.state.name,body:this.state.body,genre_music:this.state.genre_music,genre_art:this.state.genre_art,genre_film:this.state.genre_film,genre_writing:this.state.genre_writing},{headers:{Authorization:"Bearer ".concat(this.props.jwt)}}).then((function(t){e.setState({sites:t}),console.log(t)}))}},{key:"changeColor",value:function(e){this.setState(Object(E.a)({},e.target.name,e.target.value))}},{key:"changeCheckbox",value:function(e){this.setState(Object(E.a)({},e.target.name,e.target.checked))}},{key:"render",value:function(){return console.log("editor in the state",this.state.editor),i.a.createElement("div",null,i.a.createElement("form",null,i.a.createElement("p",null,"Create a new site below:"),i.a.createElement("br",null),"Background Color",i.a.createElement("select",{name:"background_color",value:this.state.background_color,onChange:this.changeColor},i.a.createElement("option",{value:"Maroon"},"Maroon"),i.a.createElement("option",{value:"Red"},"Red"),i.a.createElement("option",{value:"Orange"},"Orange"),i.a.createElement("option",{value:"Yellow"},"Yellow"),i.a.createElement("option",{value:"Olive"},"Olive"),i.a.createElement("option",{value:"Green"},"Green"),i.a.createElement("option",{value:"Purple"},"Purple"),i.a.createElement("option",{value:"Fuchsia"},"Fuchsia"),i.a.createElement("option",{value:"Lime"},"Lime"),i.a.createElement("option",{value:"Teal"},"Teal"),i.a.createElement("option",{value:"Gray"},"Gray"),i.a.createElement("option",{value:"White"},"White")),i.a.createElement("br",null),i.a.createElement("div",null,"Genre: Music",i.a.createElement("input",{type:"checkbox",name:"genre_music",onChange:this.changeCheckbox,checked:this.state.genre_music}),"Art",i.a.createElement("input",{type:"checkbox",name:"genre_art",onChange:this.changeCheckbox,checked:this.state.genre_art}),"Film",i.a.createElement("input",{type:"checkbox",name:"genre_film",onChange:this.changeCheckbox,checked:this.state.genre_film}),"Writing",i.a.createElement("input",{type:"checkbox",name:"genre_writing",onChange:this.changeCheckbox,checked:this.state.genre_writing})),i.a.createElement("br",null)),this.state.isEditing?i.a.createElement(I,{onClick:this.editSite}," Submit Edited Site "):i.a.createElement(I,{onClick:this.createSite}," Create Site "),i.a.createElement(L.a,{id:"myeditor",apiKey:"lvwpf2nbss83ux7xe0d0fardg0q3ddmna7wx5b62clsisnjn",value:this.state.body,init:{height:500,menubar:!0,plugins:["advlist autolink lists link image charmap print preview anchor","searchreplace visualblocks code fullscreen","insertdatetime media table paste code help wordcount"],toolbar:"undo redo | formatselect | bold italic backcolor |                          alignleft aligncenter alignright alignjustify |                          bullist numlist outdent indent | removeformat | help"},onInit:this.handleEditorInit,onEditorChange:this.handleEditorChange}),";",i.a.createElement("p",null,"These are your created sites:"),i.a.createElement(T,{results:this.state.sites,page:"mysites",jwt:this.props.jwt,editHandler:this.editHandler}))}}]),a}(n.Component),B=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={site:{title:"",body:"",background_color:"white",genre_music:"",genre_art:"",genre_film:"",genre_writing:"",owner_id:""},site_id:"",redirect:!1},n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=this.props.match.params.site_id,a=P.concat("site/",t);p.a.get(a).then((function(a){var n=Object.keys(a.data)[0],i=a.data[n];e.setState({site:i,site_id:t})}))}},{key:"render",value:function(){this.state.site;return i.a.createElement("div",null,i.a.createElement("div",null,i.a.createElement(F,{siteInfo:this.state.site},this.state.site.body.includes("<")?M()(this.state.site.body):i.a.createElement("p",null,this.state.site.body),i.a.createElement("div",null,i.a.createElement("br",null),"Genres:","true"===this.state.site.genre_music.toString()?i.a.createElement("li",null,"Music"):"","true"===this.state.site.genre_art.toString()?i.a.createElement("li",null," Art "):"","true"===this.state.site.genre_film.toString()?i.a.createElement("li",null," Film "):"","true"===this.state.site.genre_writing.toString()?i.a.createElement("li",null," Writing "):"",i.a.createElement("br",null)),i.a.createElement("p",null," site created by: ",this.state.site.name," "),this.state.showEdit?i.a.createElement(I,{onClick:this.editSite}," Edit"):"",this.state.showDelete?i.a.createElement(I,{onClick:this.deleteSite}," Delete"):"",this.state.redirect?i.a.createElement(h.a,{to:"/sites/"+this.state.site.owner_id}):"")))}}]),a}(n.Component),W=Object(h.g)(A),N=Object(h.g)(B);function z(){var e=Object(k.a)(["\n\tdisplay: inline-block;\n\tfont-size: 1em;\n\tbackground-color: #444;\n\tcolor: #fff;\n\tborder-radius: 0px;\n\tpadding: 20px;\n\tmargin: 10px;\n\tfont-family: serif\n"]);return z=function(){return e},e}function G(){var e=Object(k.a)(["\n\tpadding: 5px;\n\tmargin: 3px;\n\tbackground-color: #ccc;\n\tfont-size: 110%;\n\tfont-family: inherit;\n"]);return G=function(){return e},e}var H=y.a.button(G()),Y=y.a.div(z()),J=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={genre_music:"",genre_art:"0",genre_film:"0",genre_writing:"0",results:{}},n.updateFilter=n.updateFilter.bind(Object(l.a)(n)),n.submitSearch=n.submitSearch.bind(Object(l.a)(n)),n.updateMayContain=n.updateMayContain.bind(Object(l.a)(n)),n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){document.getElementsByName("music")[0].checked=!0}},{key:"updateFilter",value:function(e){if(e.target.checked){var t=e.target.name.substring(6);document.getElementsByName(t)[0].checked=!1,this.setState(Object(E.a)({},e.target.name,"1"))}else this.setState(Object(E.a)({},e.target.name,"0"))}},{key:"updateMayContain",value:function(e){var t="genre_".concat(e.target.name);e.target.checked?(document.getElementsByName(t)[0].checked=!1,this.setState(Object(E.a)({},t,""))):this.setState(Object(E.a)({},t,"0"))}},{key:"submitSearch",value:function(){var e=this,t=Object(f.a)({},this.state);delete t.results,p.a.post(P+"discover",t).then((function(t){e.setState({results:t}),console.log(e.state)}))}},{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement(Y,null,i.a.createElement("h1",null,"Select Genre(s)"),i.a.createElement("h2",null,"must contain | may contain"),"Music",i.a.createElement("input",{type:"checkbox",name:"genre_music",onChange:this.updateFilter.bind(this)}),"Music",i.a.createElement("input",{type:"checkbox",name:"music",onChange:this.updateMayContain.bind(this)}),i.a.createElement("br",null),"Art",i.a.createElement("input",{type:"checkbox",name:"genre_art",onChange:this.updateFilter.bind(this)}),"Art",i.a.createElement("input",{type:"checkbox",name:"art",onChange:this.updateMayContain.bind(this)}),i.a.createElement("br",null),"Film",i.a.createElement("input",{type:"checkbox",name:"genre_film",onChange:this.updateFilter.bind(this)}),"Film",i.a.createElement("input",{type:"checkbox",name:"film",onChange:this.updateMayContain.bind(this)}),i.a.createElement("br",null),"Writing",i.a.createElement("input",{type:"checkbox",name:"genre_writing",onChange:this.updateFilter.bind(this)}),"Writing",i.a.createElement("input",{type:"checkbox",name:"writing",onChange:this.updateMayContain.bind(this)}),i.a.createElement("br",null),i.a.createElement(H,{type:"button",onClick:this.submitSearch},"Discover!")),i.a.createElement("br",null),i.a.createElement(x,null,i.a.createElement(T,{results:this.state.results,page:"discover"})))}}]),a}(n.Component),V=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={username:"",password:"",pass_or_text:"password",email:""},n.textType="password",n.updateUsername=n.updateUsername.bind(Object(l.a)(n)),n.updatePassword=n.updatePassword.bind(Object(l.a)(n)),n.updateShowPassword=n.updateShowPassword.bind(Object(l.a)(n)),n.updateEmail=n.updateEmail.bind(Object(l.a)(n)),n.goRegister=n.goRegister.bind(Object(l.a)(n)),n}return Object(c.a)(a,[{key:"updateUsername",value:function(e){this.setState({username:e.target.value})}},{key:"updatePassword",value:function(e){this.setState({password:e.target.value})}},{key:"updateEmail",value:function(e){this.setState({email:e.target.value})}},{key:"updateShowPassword",value:function(e){this.setState({pass_or_text:"password"===this.state.pass_or_text?"text":"password"})}},{key:"goRegister",value:function(e){this.state.username&&this.state.password&&this.state.email?p.a.post(P+"user",{name:this.state.username,password:this.state.password,email:this.state.email}).then((function(e){alert("account successfully created"),console.log(e)})):alert("account register failed, please try again")}},{key:"render",value:function(){var e=this.state.pass_or_text;return i.a.createElement("div",null,i.a.createElement("form",null,i.a.createElement("p",null,"register"),"email",i.a.createElement("input",{type:"text",name:"email",value:this.state.email,onChange:this.updateEmail}),"username",i.a.createElement("input",{type:"text",value:this.state.username,onChange:this.updateUsername}),i.a.createElement("br",null),"password",i.a.createElement("input",{type:e,value:this.state.password,name:"password",onChange:this.updatePassword}),i.a.createElement("br",null),"show password",i.a.createElement("input",{type:"checkbox",value:"",name:"ShowPassword",onChange:this.updateShowPassword}),i.a.createElement("br",null),i.a.createElement("button",{type:"button",onClick:this.goRegister,name:"registerButton"},"register")))}}]),a}(n.Component),q=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={userInfo:{},selectedFile:null,imageURL:""},n.handleUploadImage=n.handleUploadImage.bind(Object(l.a)(n)),n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=this.props.match.params.user_id;p.a.get(P+"user/".concat(t)).then((function(t){e.setState({userInfo:t.data}),console.log(t)}))}},{key:"handleUploadImage",value:function(e){e.preventDefault();var t=new FormData;t.append("file",this.uploadInput.files[0]),t.append("user_id",this.state.userInfo.user_id),p.a.post(P+"photo",t).then((function(e){return console.log(e)})).catch((function(e){return console.warn(e)}))}},{key:"render",value:function(){for(var e=this,t=[],a=0,n=Object.keys(this.state.userInfo);a<n.length;a++){var r=n[a];t.push(i.a.createElement("div",{key:r},i.a.createElement("p",null,r,":",this.state.userInfo[r])))}return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",null,i.a.createElement("p",null,"This is ",this.state.userInfo.name,"'s profile"),t),i.a.createElement("div",null,i.a.createElement("img",{src:P+"/photo/"+this.state.userInfo.user_id,alt:"img"}),i.a.createElement("form",{onSubmit:this.handleUploadImage},i.a.createElement("div",null,i.a.createElement("input",{ref:function(t){e.uploadInput=t},type:"file"})),i.a.createElement("div",null,i.a.createElement("button",null,"Upload")))))}}]),a}(n.Component),K=Object(h.g)(q),$=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(){var e;return Object(o.a)(this,a),(e=t.call(this)).state={loginToken:"",user_id:""},e.login=e.login.bind(Object(l.a)(e)),e}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=new m.a;e.get("jwt")&&e.get("user_id")&&e.get("name")&&this.setState({loginToken:e.get("jwt"),user_id:e.get("user_id"),name:e.get("name")})}},{key:"login",value:function(e,t){var a=this;console.log("logging in: "+P),p.a.put(P+"user",{name:e,password:t}).then((function(t){if(t.data)if(t.data.jwt.length>0){a.setState({loginToken:t.data.jwt,user_id:t.data.id});var n=new m.a;n.set("user_id",t.data.id,{path:"/",expires:new Date(Date.now()+36e5)}),n.set("jwt",t.data.jwt,{path:"/",expires:new Date(Date.now()+36e5)}),n.set("name",e,{path:"/",expires:new Date(Date.now()+36e5)})}else alert("username is incorrect, please try again");else alert("incorrect password, please try again")})).catch((function(e){return console.log("Show error notification!"),Promise.reject(e)}))}},{key:"render",value:function(){return i.a.createElement(b.a,null,i.a.createElement("div",{className:"App"},i.a.createElement(Q,{login:this.login,user_id:this.state.user_id}),i.a.createElement(h.d,null,i.a.createElement(h.b,{exact:!0,path:"/"},i.a.createElement("p",null,"this is the app")),i.a.createElement(h.b,{path:"/user/:user_id"},i.a.createElement(K,null)),i.a.createElement(h.b,{exact:!0,path:"/sites/:user_id"},i.a.createElement(W,{jwt:this.state.loginToken})),i.a.createElement(h.b,{exact:!0,path:"/site/:site_id"},i.a.createElement(N,{user_id:this.state.user_id,jwt:this.state.loginToken})),i.a.createElement(h.b,{path:"/register"},i.a.createElement(V,null)),i.a.createElement(h.b,{path:"/discover"},i.a.createElement(J,null)),i.a.createElement(h.b,{path:"/user"},i.a.createElement("p",null,"Authorization Failed: You must be logged in to view your profile")))))}}]),a}(n.Component),Q=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).updateUsername=n.updateUsername.bind(Object(l.a)(n)),n.updatePassword=n.updatePassword.bind(Object(l.a)(n)),n.callLogin=n.callLogin.bind(Object(l.a)(n)),n.gotoRegister=n.gotoRegister.bind(Object(l.a)(n)),n.renderRedirect=n.renderRedirect.bind(Object(l.a)(n)),n.state={name:"",password:"",user_id:"",redirect:!1,isLoggedIn:!1},n.checkLogin=n.checkLogin.bind(Object(l.a)(n)),n.logout=n.logout.bind(Object(l.a)(n)),n}return Object(c.a)(a,[{key:"componentDidUpdate",value:function(){}},{key:"gotoRegister",value:function(e){this.setState({redirect:!0})}},{key:"renderRedirect",value:function(){return this.state.redirect?i.a.createElement(h.a,{to:"/register/"}):""}},{key:"updateUsername",value:function(e){this.setState({name:e.target.value})}},{key:"updatePassword",value:function(e){this.setState({password:e.target.value})}},{key:"callLogin",value:function(e){0!==this.state.name&&0!==this.state.password&&this.props.login(this.state.name,this.state.password)}},{key:"checkLogin",value:function(){var e=new m.a;console.log("user_id:"+this.props.user_id),e.get("name")&&e.get("jwt")&&e.get("user_id")&&!1===this.state.isLoggedIn&&(this.setState({user_id:this.props.user_id,isLoggedIn:!0}),console.log("logged in successful"))}},{key:"logout",value:function(e){var t=new m.a;t.remove("name"),t.remove("jwt"),t.remove("user_id"),this.setState({isLoggedIn:!1})}},{key:"render",value:function(){var e=new m.a;return""===this.state.user_id&&(console.log("logging in right now"),setInterval(this.checkLogin,1e3)),i.a.createElement("div",{className:"App-banner"},i.a.createElement("div",{className:"App-title"},i.a.createElement(v.a,{fluid:!0},i.a.createElement(C,null,"Nathan's World"),i.a.createElement(C,null,this.state.isLoggedIn?i.a.createElement("div",null,i.a.createElement("p",null,"Logged in as: ",e.get("name")),i.a.createElement("button",{type:"button",onClick:this.logout},"LOGOUT")):i.a.createElement("div",null,this.renderRedirect(),i.a.createElement("form",null,"username",i.a.createElement("input",{type:"text",value:this.state.name,onChange:this.updateUsername}),i.a.createElement("br",null),"password",i.a.createElement("input",{type:"password",name:"password",value:this.state.password,onChange:this.updatePassword}),i.a.createElement("br",null),i.a.createElement("button",{type:"button",onClick:this.callLogin,name:"loginButton"},"LOGIN"),i.a.createElement("button",{type:"button",onClick:this.gotoRegister,name:"registerButton"},"Register")))),i.a.createElement(D,{user_id:this.props.user_id}))))}}]),a}(n.Component),X=$;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(X,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},60:function(e,t,a){},81:function(e,t,a){e.exports=a(139)},86:function(e,t,a){}},[[81,1,2]]]);
//# sourceMappingURL=main.43b1ab30.chunk.js.map