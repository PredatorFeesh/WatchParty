import React from 'react';
import axios from "axios";
import './LandingPage.css'

class LandingPage extends React.Component{
  constructor() {
    super();
    this.state = {
	  fetchedinformation:"",
	  userid:"",
	  movieid:"",
      email: "",
      password: "",
      firstname: "",
	  lastname:"",
	  requesterid:"",
	  requesteeid:"",
	  name:"",
	  movie:"",
	  watchstate:"",
	  tmdbid:"",
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    {
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    handleOnChange = event => {
        
        this.setState({
            [event.target.name]: event.target.value
	})};

  handleSubmit = trigger => event => {
    event.preventDefault();
    // get our form data out of state
    const { userid,movieid,requesterid,requesteeid,email,password,firstname,lastname,age,name,movie,watchstate,tmdbid } = this.state;
	if(trigger=='a'){
    axios.post("/api/createUser", { email,password,firstname,lastname }).then(result => {
	return console.log(result)
    });}
	if(trigger=='b'){
    axios.post("/api/login", { email,password}).then(result => {
	return console.log(result)
    });}
	if(trigger=='c'){
    axios.post("/api/logout", {}).then(result => {
	return console.log(result)
    });}
	if(trigger=='d'){
    axios.post("/api/addMovie", { userid,tmdbid,watchstate}).then(result => {
	return console.log(result)
    });}
	if(trigger=='e'){
    axios.post("/api/deleteMovie", { userid,tmdbid}).then(result => {
	return console.log(result)
    });}
	if(trigger=='f'){
    axios.post("/api/changeMovieWatchState", { userid,tmdbid,watchstate}).then(result => {
	return console.log(result)
    });}
	if(trigger=='g'){
    axios.post("/api/addMovieToSublist", { email,name,movieid}).then(result => {
	return console.log(result)
    });}
	if(trigger=='h'){
    axios.post("/api/deleteSublist", {email,name}).then(result => {
	return console.log(result)
    });}
	if(trigger=='i'){
    axios.post("/api/postID", {userid}).then(result => {
	this.setState({fetchedinformation:JSON.stringify(result["data"])})
	event.preventDefault();
    });}
	if(trigger=='j'){
    axios.post("/api/postemail", {email}).then(result => {
	this.setState({fetchedinformation:JSON.stringify(result["data"])})
	event.preventDefault();
    });}
	return console.log("Nothing was triggered")
  };
    render () {
        return (
            <div className="Landing">
              <h1> LANDING PAGE</h1>
		<label>Result of query</label>
		<div>{this.state.fetchedinformation}</div>
					  <label>User data via id</label>
			          <form onSubmit={this.handleSubmit('i')} method="POST" action="/api/postID">
        <label>
          userid:
          <input
            name="userid"
            type="text"
            checked={this.state.userid}
            onChange={this.handleOnChange} />
        </label>
        <label>
          Submit
          <input type="submit" value="Submit"/>
		</label>
        </form>
		
			  <label>signup</label>
			          <form onSubmit={this.handleSubmit('a')} method="POST" action="/api/createUser">
        <label>
          email:
          <input
            name="email"
            type="test"
            checked={this.state.email}
            onChange={this.handleOnChange} />
        </label>
        <br />
        <label>
          password:
          <input
            name="password"
            type="text"
            value={this.state.password}
            onChange={this.handleOnChange} />
		</label>
		<br />
        <label>
          firstname:
          <input
            name="firstname"
            type="text"
            value={this.state.firstName}
            onChange={this.handleOnChange} />
		</label>
		<br />
        <label>
          lastname:
          <input
            name="lastname"
            type="text"
            value={this.state.lastName}
            onChange={this.handleOnChange} />
		</label>
        <br />
        <label>
          Submit
          <input type="submit" value="Submit"/>
		</label>
        </form>
		
		
		<label>Login</label>
		<form onSubmit={this.handleSubmit('b')} method="POST" action="/api/login">
				<br/>
        <label>
          email:
          <input
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleOnChange} />
		</label>
        <br />
        <label>
          password:
          <input
            name="password"
            type="text"
            value={this.state.password}
            onChange={this.handleOnChange} />
		</label>
        <label>
          Submit
          <input type="submit" value="Submit"/>
		</label>
        </form>
		
		<label>Logout</label>
		<form onSubmit={this.handleSubmit('c')} method="POST" action="/api/logout">
				<br/>
        <label>
          Submit
          <input type="submit" value="Submit"/>
		</label>
        </form>

		<label>Add movie to user</label>
		<form onSubmit={this.handleSubmit('d')} method="POST" action="/api/addMovie">
				<br/>
        <label>
          user:
          <input
            name="userid"
            type="text"
            value={this.state.userid}
            onChange={this.handleOnChange} />
		</label>
        <br />
        <label>
          movieid:
          <input
            name="tmdbid"
            type="text"
            value={this.state.tmdbid}
            onChange={this.handleOnChange} />
		</label>
        <br />
        <label>
          watchstate:
          <input
            name="watchstate"
            type="text"
            value={this.state.watchstate}
            onChange={this.handleOnChange} />
		</label>
        <label>
          Submit
          <input type="submit" value="Submit"/>
		</label>
        </form>
<label>Delete movie from user</label>
		<form onSubmit={this.handleSubmit('e')} method="POST" action="/api/deleteMovie">
				<br/>
        <label>
          user:
          <input
            name="userid"
            type="text"
            value={this.state.userid}
            onChange={this.handleOnChange} />
		</label>
        <br />
        <label>
          tmdbid:
          <input
            name="tmdbid"
            type="text"
            value={this.state.tmdbid}
            onChange={this.handleOnChange} />
		</label>
        <label>
          Submit
          <input type="submit" value="Submit"/>
		</label>
        </form>
<label>Change movie state</label>
		<form onSubmit={this.handleSubmit('f')} method="POST" action="/api/changeMovieWatchState">
				<br/>
        <label>
          user:
          <input
            name="userid"
            type="text"
            value={this.state.userid}
            onChange={this.handleOnChange} />
		</label>
        <br />
        <label>
          tmdbid:
          <input
            name="tmdbid"
            type="text"
            value={this.state.tmdbid}
            onChange={this.handleOnChange} />
		</label>
        <br />
        <label>
          watchstate:
          <input
            name="watchstate"
            type="text"
            value={this.state.watchstate}
            onChange={this.handleOnChange} />
		</label>
        <label>
          Submit
          <input type="submit" value="Submit"/>
		</label>
        </form>
		
		<label>add Movie to sublist</label>
		<form onSubmit={this.handleSubmit('g')} method="POST" action="/api/addMovieToSublist">
				<br/>
        <label>
          user:
          <input
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleOnChange} />
		</label>
        <br />
        <label>
          name:
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleOnChange} />
		</label>
        <br />
        <label>
          movieid:
          <input
            name="movieid"
            type="text"
            value={this.state.movieid}
            onChange={this.handleOnChange} />
		</label>
        <label>
          Submit
          <input type="submit" value="Submit"/>
		</label>
        </form>
		<label>delete Sublist</label>
		<form onSubmit={this.handleSubmit('h')} method="POST" action="/api/deleteSublist">
				<br/>
        <label>
          user:
          <input
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleOnChange} />
		</label>
        <br />
        <label>
          name:
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleOnChange} />
		</label>
        <label>
          Submit
          <input type="submit" value="Submit"/>
		</label>
        </form>
            </div>
			
        );
    }

}

export default LandingPage;