import React, { Component } from 'react';

let CLIENT_ID = 'dc192dafed7149819ae38d006e45102a';
let REDIREC_URI = 'http://192.168.0.17:3000/callback/';
let scopes= ['user-read-private','user-read-email','playlist-modify-private','playlist-modify-public', 'playlist-read-private'];

function getURL() {
  return (
    'https://accounts.spotify.com/authorize?client_id=' +
    CLIENT_ID + '&response_type=token&redirect_uri=' +  encodeURIComponent(REDIREC_URI) +
    '&scope=' +  encodeURIComponent(scopes.join(' '))
  );
}

class Login extends Component {

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login() {
    let url = getURL();
    window.location = url;
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.login}>LOGIN</button>
      </div>
    );
  }
}

export default Login
