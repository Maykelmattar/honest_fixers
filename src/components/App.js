import React from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import Companylogo from "../images/org.png"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styling/App.css';
import '../styling/home.css'
import axios from 'axios';
import { sha256, sha224 } from 'js-sha256';
 import Users from './Users';
 import Clients from './Clients';
 import Status from './Status';
 import Priority from './Priority';
 import Types from './Types';
 import Wo from './Wo';
 import Wo_form from './Wo_form';

 import Login from './Login';
import { DB_Link } from "../global";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
class App extends React.Component {

  constructor(props) {
    super(props)
  }
  state = {
    logedIn: null, //Store if there is a user logged in 
    selectedpage:localStorage.getItem('Role')==='1'?'users':'workorders'

  }
  
  componentDidMount() {

    this.setState({ logedIn: localStorage.getItem('logedIn') }); //Get if there is a user logged in and put it in the state 
    if(localStorage.getItem('selectedpage')){
this.setState({selectedpage: localStorage.getItem('selectedpage')})
    }
    if (localStorage.getItem('name')) {
      this.setState({ username: localStorage.getItem('username') })
    }
    // window.onpopstate = this.onBackButtonEvent;

  }
  //Login the user if the credentials are right and show error if not 
  login = (e) => {
    let _data = {
      username: e.username,
      password:  sha256(e.password)
    };

    axios({
      method: "post",
      url: `${DB_Link}login.php`,
      data: JSON.stringify(_data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
         const res = response.data;
        // console.log("res", response.data);
     
     if (res === null){

    this.setState({ errormsg: 'Connection Error' });
    toast.error('Connection Error', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    }
     else { //If the credentials are right 
      if(res.status !==200){
        toast.error(res.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
                  this.setState({ errormsg: res.message });

      }else{
  //  console.log(response);
          localStorage.setItem('firstName', res.firstName); //Store the name 
          localStorage.setItem('lastName', res.lastName); //Store the name 
          localStorage.setItem('name', res.firstName); //Store the name 
          localStorage.setItem('Role', res.type); //Store the role 
        // localStorage.setItem('username', CryptoJS.AES.encrypt(res.Username, '123').toString()) //Store the username encrypted
        localStorage.setItem('username', e.username) //Store the username encrypted
        if(res.type ==="1"){
          this.setState({selectedpage:'users'})
          localStorage.setItem('selectedpage', 'users');
        }else{
          this.setState({selectedpage:'workorders'})
          localStorage.setItem('selectedpage', 'workorders');
        }
        if(this.state.logedIn!==1) 
         this.setState({ logedIn: 1 }); //Set the loggedin state to 1 
          localStorage.setItem('logedIn', 1);   //Store that the user is logged in 
        }
      }
      }).catch((error) => {
        toast.error('Connection Error', {
   position: "top-right",
   autoClose: 5000,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
 });
});
 
      
  }


  //Logout the user and clear the local storage 
  logout(e) {

              localStorage.clear();
              this.setState({ logedIn: null });
     
  }

  respnav = () => { //Show the menu on mobile view 
    confirmAlert({
        customUI: ({ onClose }) => {
            if (localStorage.getItem('Role') !== '1') {
                return (
                    <div className='custom-ui' style={{ display: 'block', fontSize: '40px', color: '#00BFFF' }}>

                        <div onClick={(e) => {this.logout();  onClose();} }  style={{ color: '#ed5249' }} color='danger'><i className="fa fa-power-off" aria-hidden="true"> Logout </i></div>

                    </div>
                );
            }
            return ( //Menu element for mobile view 
                <div className='custom-ui' style={{ display: 'block', fontSize: '40px', color: '#00BFFF' }}>
                    <div onClick={() => { this.setState({ selectedpage: 'users' })
                            localStorage.setItem('selectedpage', 'users'); onClose() }}><i className="fa fa-users" aria-hidden="true"> Users </i></div>
                    <div onClick={() => {   this.setState({ selectedpage: 'workorders' })
                            localStorage.setItem('selectedpage', 'workorders'); onClose(); }}><i className="fa fa-tasks" aria-hidden="true"> Workorders </i></div>
                    <div onClick={() => {  this.setState({ selectedpage: 'clients' })
                            localStorage.setItem('selectedpage', 'clients'); onClose(); }}><i className="fa fa-handshake-o" aria-hidden="true"> Clients </i></div>
                    <div onClick={() => {  this.setState({ selectedpage: 'status' })
                            localStorage.setItem('selectedpage', 'status'); onClose(); }}><i className="fa fa-check-circle" aria-hidden="true"> Status </i></div>
                    <div onClick={() => {   this.setState({ selectedpage: 'priority' })
                            localStorage.setItem('selectedpage', 'priority'); onClose(); }}><i className="fa fa-sort" aria-hidden="true"> Priority </i></div>
                    <div onClick={() => { this.setState({ selectedpage: 'types' })
                            localStorage.setItem('selectedpage', 'types'); onClose(); }}><i className="fa fa-sitemap" aria-hidden="true"> Types </i></div>
                    <div onClick={() => {this.logout(); onClose();}}  style={{ color: '#ed5249' }}><i className="fa fa-power-off" aria-hidden="true"> Logout </i></div>

                </div>
            );
        }
    });

}
openForm = (e) =>{
  this.setState({selectedpage:"wo_form", wo_item:e})
}
closeForm = (e) =>{
  this.setState({selectedpage:"workorders", wo_item:{}})
}
  render() {
    let child=''
    switch(this.state.selectedpage) {
      case "users":
        child=<Users/>
        break;
      case "clients":
        child=<Clients/>
        break;
        case "status":
          child=<Status/>
          break;
          case "priority":
            child=<Priority/>
            break;
            case "types":
              child=<Types/>
              break;
              case "workorders":
                child=<Wo openForm={this.openForm}/>
                break;
                case "wo_form":
                child=<Wo_form wo_item= {this.state.wo_item} closeForm={this.closeForm}/>
                break;
      default:
       if(localStorage.getItem('Role')==='1'){
        child=<Users/>
       }else{
        child=<Wo openForm={this.openForm}/>
       }

    } 

    // console.log(this.state.logedIn);
    //If the user is logged out show the login 
    if (this.state.logedIn != 1) {



      return (
        <div className="login" >

          <Login  border={this.state.wrong} error={this.state.errormsg} submit={this.login} />
          <ToastContainer />
        </div>
      );


    }
    else {
      //If the user is a super admin show everything 
      if (localStorage.getItem('Role') === '1') {
        return (
          <div >

                    <SideNav defaultExpanded={true}  className="resp" style={{ overflow: 'auto !important' }}
                        onSelect={(selected) => {
                          // console.log(selected)
                          if(selected==='logout'){
                            this.logout()
                          }else{
                            const to = '/' + selected;
                            this.setState({ selectedpage: selected })
                            localStorage.setItem('selectedpage', selected);
                          }
                        }}
                    >

                        <SideNav.Toggle />
                        <SideNav.Nav selected={this.state.selectedpage}>
                          <div>

                        <img  src={Companylogo} className="companylogo" style={{ width: '120px'}} alt="IMG"></img>
</div>

                            <NavItem eventKey="users" className="navList" >
                                <NavIcon>
                                    <i className="fa fa-users" style={{ fontSize: '1.95em' }} />
                                </NavIcon>
                                <NavText>
                                    Users
                    </NavText>
                            </NavItem>
                            <NavItem eventKey="workorders">
                                <NavIcon>
                                    <i className="fa fa-tasks" style={{ fontSize: '1.95em' }} />
                                </NavIcon>
                                <NavText>
                                    Workorders
                    </NavText>
                            </NavItem>
                            <NavItem eventKey="clients">
                                <NavIcon>
                                    <i className="fa fa-handshake-o" style={{ fontSize: '1.95em' }} />
                                </NavIcon>
                                <NavText>
                                    Clients
                    </NavText>
                            </NavItem>
                            <NavItem eventKey="status">
                                <NavIcon>
                                    <i className="fa fa-check-circle" style={{ fontSize: '1.95em' }} />
                                </NavIcon>
                                <NavText>
                                    Status
                    </NavText>
                            </NavItem>
                            <NavItem eventKey="priority">
                                <NavIcon>
                                    <i className="fa fa-sort" style={{ fontSize: '1.95em' }} />
                                </NavIcon>
                                <NavText>
                                    Priority
                    </NavText>
                            </NavItem>
                            <NavItem eventKey="types">
                                <NavIcon>
                                    <i className="fa fa-sitemap" style={{ fontSize: '1.95em' }} />
                                </NavIcon>
                                <NavText>
                                    Types
                    </NavText>
                            </NavItem>
                            
                        
                            <NavItem className="logoutNav" eventKey="logout">
                                <NavIcon>
                                    <i className="fa fa-sign-out" style={{ fontSize: '1.95em' }} />
                                </NavIcon>
                                <NavText>
                                    Logout - {localStorage.getItem('firstName')} 
                    </NavText>
                            </NavItem>



                        </SideNav.Nav>
                    </SideNav>
                    <div className='resp2 backgroundColorfull'  style={{  position: 'absolute ', overflow: 'hidden !important', width: '100%', height: '50px', zIndex: '5', top: '0', fontSize: '40px', right: '0' }} >
                        <ul style={{ verticalAlign: 'middle', marginTop: '10px' }} >


                            <li onClick={this.respnav} style={{ float: 'right', marginRight: '10px' }}>  <i className="fa fa-bars" /></li>
                            <li style={{ textAlign: 'center', float: 'center' }}>Welcome  {localStorage.getItem('name')}</li>

                        </ul>
                    </div>
                    <div className="child">
                        {child}
                    </div>
          </div>
        );
      }
      else {
        
        return (
          <div >

                    <SideNav expanded={true}  className="resp" style={{ overflow: 'auto !important' }}
                        onSelect={(selected) => {
                          // console.log(selected)
                          if(selected==='logout'){
                            this.logout()
                          }else{
                            const to = '/' + selected;
                            this.setState({ selectedpage: selected })
                          }
                        }}
                    >

                        <SideNav.Toggle />
                        <SideNav.Nav selected={this.state.selectedpage}>
                          <div>

                        <img  src={Companylogo} className="companylogo" style={{ width: '120px'}} alt="IMG"></img>
</div>
<NavItem eventKey="workorders" className="navList"  >
                                <NavIcon>
                                    <i className="fa fa-tasks" style={{ fontSize: '1.95em' }} />
                                </NavIcon>
                                <NavText>
                                    Workorders
                    </NavText>
                            </NavItem>
                            <NavItem className="logoutNav" eventKey="logout">
                                <NavIcon>
                                    <i className="fa fa-sign-out" style={{ fontSize: '1.95em' }} />
                                </NavIcon>
                                <NavText>
                                    Logout - {localStorage.getItem('firstName')} 
                    </NavText>
                            </NavItem>



                        </SideNav.Nav>
                    </SideNav>
                    <div className='resp2 backgroundColorfull'  style={{  position: 'absolute ', overflow: 'hidden !important', width: '100%', height: '50px', zIndex: '5', top: '0', fontSize: '40px', right: '0' }} >
                        <ul style={{ verticalAlign: 'middle', marginTop: '10px' }} >


                            <li onClick={this.respnav} style={{ float: 'right', marginRight: '10px' }}>  <i className="fa fa-bars" /></li>
                            <li style={{ textAlign: 'center', float: 'center' }}>Welcome  {localStorage.getItem('name')}</li>

                        </ul>
                    </div>
                    <div className="child">
                        {child}
                    </div>
          </div>
        );
      }
    }
  }
}
export default App;