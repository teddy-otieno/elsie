import React from "react";
import { LoginPageContainer } from "../components/styles/sign";
import Layout, { TextField, TopNavigation } from "../components/layout";
import { PrimaryButton } from "../components/styles/component";
import axios from 'axios';
import Cookie from 'js-cookie';
import {withRouter} from 'next/router';

import { SERVER_URL } from "../utils";

type LoginPageState = {
  username: string;
  password: string;
  error_message: string | null;
}


type LoginPageProps = {
  router: any
}
class LoginPage extends React.PureComponent<LoginPageProps,LoginPageState> {

  constructor(props: LoginPageProps) {
    super(props);

    this.state = {
      username: "",
      password: "",
      error_message: ""
    }
  }


  login_user = async (event: any) => {
    event.preventDefault();

    if(this.state.username.length === 0 && this.state.password.length === 0) return;

    let data = {
      email: this.state.username,
      password: this.state.password
    };

    try {
      let response = await axios.post<any>(`${SERVER_URL}/api/auth/token/`, data);
      Cookie.set('token', response.data.token);
			if(response.data['is_who'] === "psychiatrist") {
				this.props.router.push('counsellor/')
			} else {
				this.props.router.push('patient/')
			}
    } catch(e) {
      console.log(e);

      this.setState({...this.state, error_message: "Username or password is incorrect"});
    }
  }

  render() {
    const {username, password, error_message} = this.state;

    return (
      <Layout>
        <LoginPageContainer>
          <form>
            <h4>Welcome Back</h4>
            <TextField 
              label="Email Address" 
              on_focus={() => this.setState({...this.state, error_message: null})} 
              value={username} 
              set_value={(val) => {this.setState({...this.state, username: val})}} />
            <TextField 
              label="Password" 
              input_type={"password"}  
              on_focus={() => this.setState({...this.state, error_message: null})} 
              value={password} set_value={(val) => {this.setState({...this.state, password: val})}} />
            {error_message !== null && <p className="error_message">{error_message}</p>}
            <PrimaryButton onClick={this.login_user}>Login</PrimaryButton>
          </form>
          
          <h2 className="title">Elsie Interactive Hospital</h2>
        </LoginPageContainer>

      </Layout>
    );
  }
}

export default withRouter(LoginPage);
