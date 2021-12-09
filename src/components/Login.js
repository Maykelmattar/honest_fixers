import React from 'react';
import '../styling/login.css'
import '../vendor/bootstrap/css/bootstrap.min.css'
import '../fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import '../vendor/animate/animate.css'
import '../vendor/css-hamburgers/hamburgers.min.css'
import '../vendor/select2/select2.min.css'
import '../styling/util.css'
import Loginlogo from "../images/fixes.png"
import { ToastContainer, toast } from 'react-toastify';


class Login extends React.Component {

    state = {
        username: "",//Hold the value of the username 
        password: "", //Hold the value of the password 
        tried: 0
    };

    componentDidMount () {
    }
    onForsubmit = event => {
        event.preventDefault();
        if(this.state.username==="" || this.state.password === ""){
            this.setState({
                tried : 1
            })
            toast.error('Please fill all the fields', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else {
        this.props.submit(this.state);
        }
    }
    onUsername = (e) => {

        this.setState({ username: e.target.value })


    }
    onPassword = (e) => {
        this.setState({ password: e.target.value })
    }

    render() {
        return (
            <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <div className="login100-pic js-tilt" data-tilt>
                        <img src={Loginlogo} alt="IMG"></img>
                    </div>
    
                    <div className="login100-form validate-form">
                        <span className="login100-form-title">
                           Member Login
                        </span>
                        <form onSubmit={this.onForsubmit}>
                        <div className={`wrap-input100 validate-input ${this.state.tried!==0 && this.state.username===""? 'alert-validate':'' }`}  data-validate = "Valid email is required: ex@abc.xyz">
                            <input className="input100 " type="text" name="email" value={this.state.username} onChange={this.onUsername} placeholder="Username"/>
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fa fa-user" aria-hidden="true"></i>
                            </span>
                        </div>
    
                        <div className={`wrap-input100 validate-input ${this.state.tried!==0 && this.state.password===""? 'alert-validate':'' }`}  data-validate = "Password is required">
                            <input className="input100 " type="password" value={this.state.password} onChange={this.onPassword} name="pass" placeholder="Password"/> 
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fa fa-lock" aria-hidden="true"></i>
                            </span>
                        </div>
                        
                        <div className="container-login100-form-btn submitButn">
                            <button type="submit" onClick={this.onForsubmit} className="login100-form-btn">
                                Login
                            </button>
                        </div>
    
    </form>
                        <div className="text-center p-t-136">
                         <br></br>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />

        </div>
        
    
   
        )
    };
}
export default Login;