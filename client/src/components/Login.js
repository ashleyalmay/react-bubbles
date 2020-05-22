import React from "react";
import  {axiosWithAuth}  from "../Utils/axiosWithAuth";

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: ""
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = e => {
    e.preventDefault();

    axiosWithAuth()
      .post("/api/login", this.state.credentials)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        this.props.history.push("/protected");
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <h1>Welcome to the Bubble App!</h1>
        <form onSubmit={this.login}>
        <label id="name">Username:</label>
          <input
            type="text"
            name="username"
            label="username"
            placeholder='Username'
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <label id="name">Password:</label>
          <input
            type="password"
            name="password"
            label="password"
            placeholder='Password'
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
    );
  }
}

export default Login;
