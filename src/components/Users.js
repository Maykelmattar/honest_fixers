import React from 'react';
import axios from 'axios';
import { DB_Link } from "../global";
import { MDBDataTable } from 'mdbreact';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter  } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
import { sha256 } from 'js-sha256';

import Select from 'react-select';
import '../styling/home.css'
const options = [
  { value: '1', label: 'Admin' },
  { value: '2', label: 'Dispatcher' },
  { value: '3', label: 'Team Manager' },
  { value: '4', label: 'Accoutant' }
];




class Users extends React.Component {
  state = { 
    data: {}, usernameAvailable : false,mandatoryCheck:false, modal: false,role:'',username:'',firstName:"",lastName:"",password:"",editing:0,
  }
  
  toggle = () => {
    if(this.state.modal){
      this.setState({
        username:"",
        password:"",
        firstName:"",
        lastName:"",
        role:"",
        editing:0,
        mandatoryCheck:false
      },()=>{
        this.setState({
          modal: !this.state.modal
        });
      })
    }else{
      this.setState({
        modal: !this.state.modal
      });
    }
  }
  loadUsers(){
    let columns = [
      {
        label: 'Username',
        field: 'username',
        sort: 'asc',
        width: 150
      },
      {
        label: 'First Name',
        field: 'firstName',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Last Name',
        field: 'lastName',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Role',
        field: 'role',
        sort: 'asc',
        width: 100
      },
      {
        label: '',
        field: 'edit',
    
      },
      {
        label: '',
        field: 'status',
    
      },
    ];
    let _data = {
      username: localStorage.getItem('username'),
    };

    axios({
      method: "post",
      url: `${DB_Link}user_read.php`,
      data: JSON.stringify(_data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        //console.log(localStorage.getItem('username'))
        const res = response.data.body;
        //console.log(res)
        if (res === null || res === undefined)  {
    
        } else {
          for (let item of res) {
            if(item.status==='1'){
              item.status = <div style={{ textAlign: 'center' }}><i className='fa fa-lock' style={{ color: 'red', flaot: 'left', fontSize: '20px',cursor:'pointer' }} onClick={() => this.changeStatus(item)} aria-hidden='true'></i></div> 
            }else{
            item.status = <div style={{ textAlign: 'center' }}><i className='fa fa-unlock' style={{ color: 'green', flaot: 'left', fontSize: '20px',cursor:'pointer' }} onClick={() => this.changeStatus(item)} aria-hidden='true'></i></div> 
            }
            item.edit = <div style={{ textAlign: 'center' }}><i className='fa fa-pencil' style={{ color: 'green', flaot: 'left', fontSize: '20px',cursor:'pointer' }} onClick={() => this.update(item)} aria-hidden='true'></i></div> //Delete Button
            item.role = options.find(x=>x.value === item.role).label

          }
          this.setState({
            data: {
              columns: columns,
              rows: res
            },
     
          });

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
});;

  }
  checkAvailability =()=>{
    if(this.state.username!==""){
    let _data = {
      username: this.state.username,
    };

    axios({
      method: "post",
      url: `${DB_Link}user_single_read.php`,
      data: JSON.stringify(_data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        const res = response.data;
        if (res === null || res.success ===0) {
          this.setState({
            usernameAvailable:true
          });
        }else{
            this.setState({
              usernameAvailable:false
            },()=>{
              toast.warning('Username Already Exist', {
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
});;
    }
  }
  changeStatus(e){
    let _data = {
      username: e.username,
    };

    axios({
      method: "post",
      url: `${DB_Link}user_status.php`,
      data: JSON.stringify(_data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        const res = response.data;
        //console.log(res)
        if ((res === null)||(res === undefined)){

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
      
            }else{
              let msg = "Status Updated";
              toast.success(msg, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                this.loadUsers()
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
});;
  }
  componentDidMount() {
    this.loadUsers()

  }
  update(item){
    this.setState({
      username:item.username,
      firstName:item.firstName,
      lastName:item.lastName,
      role:options.find(x=>x.label === item.role),
      editing:1,
    })
    this.toggle()
  }

  addUsers=(e)=> {
    e.preventDefault()
    if(this.state.username &&  this.state.firstName && this.state.lastName && this.state.role && ((this.state.editing===0 && this.state.password) || (this.state.editing!==0))){
    let _data = {
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password!==""?sha256(this.state.password):"",
      role: this.state.role.value,
      creator: localStorage.getItem('username')
    };

    axios({
      method: "post",
      url: this.state.editing===0?`${DB_Link}user_create.php`:`${DB_Link}user_update.php`,
      data: JSON.stringify(_data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        const res = response.data;
        //console.log(res)
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
              let msg = this.state.editing===0?"User Added":"User Updated";
              toast.success(msg, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                //console.log(this.state)
                this.loadUsers()
                this.toggle()
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
});;
    
    }else{
      this.setState({mandatoryCheck:true},()=>{
        toast.error('Fill all required Fields', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      })
    }
  }

  
  handleChange = (selectedOption) => {
    this.setState({ role : selectedOption });
  };
  handleText = (e)=>{
    const value = e.target.value;
    this.setState({
      [e.target.id]: value
    });
    }

  render() {
    return (
      <div style={{ maxWidth: '100%' }}>
                  <ToastContainer />

        <span className="Title">
      Users
      <span className="addNew" onClick={this.toggle}>
      <i className="fa fa-plus-circle"  aria-hidden="true"></i>
      </span>
          </span>
          <div className="tableGrid">
     <MDBDataTable
            striped
            bordered 
            responsive={true}
            hover
            data={this.state.data}
          />
          </div>
          <MDBContainer>
          <form onSubmit={(e)=>{this.addUsers(e)}}>

      <MDBModal isOpen={this.state.modal}  size='lg' toggle={this.toggle} >
        <MDBModalHeader toggle={this.toggle}>Add New User</MDBModalHeader>
        <MDBModalBody>
        <div className="form-group">
        <label className="required"  htmlFor="username">Username</label>
        <input type="text" id="username"disabled={this.state.editing===1?true:false} value={this.state.username} onChange={this.handleText} onBlur={this.checkAvailability} className={this.state.mandatoryCheck&&!this.state.username?"mandatory form-control form-control-lg" : "form-control form-control-lg"} />
        <label className="required"  htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" value={this.state.firstName} onChange={this.handleText} className={this.state.mandatoryCheck&&!this.state.firstName?"mandatory form-control form-control-lg" : "form-control form-control-lg"} />
        <label className="required"  htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" value={this.state.lastName} onChange={this.handleText} className={this.state.mandatoryCheck&&!this.state.lastName?"mandatory form-control form-control-lg" : "form-control form-control-lg"} />
        <label className="required"  htmlFor="password">Password</label>
        <input type="password" id="password" onChange={this.handleText} placeholder={(this.state.username !=="" && this.state.editing===1)?"ADD NEW PASSWORD OR LEAVE IT EMPTY":""} className={this.state.mandatoryCheck&&!this.state.password?"mandatory form-control form-control-lg" : "form-control form-control-lg"} />
        <div>
        <div>
        <label className="required"  htmlFor="role">Role</label>
        <Select
        id="role"
        value={this.state.role}
        onChange={this.handleChange}
        options={options}
        className={this.state.mandatoryCheck&&!this.state.role?"mandatory" : ""}
      />
      </div>
      </div>
      </div>
   
        </MDBModalBody>
        <MDBModalFooter>
        <button type="submit"  onClick={(e)=>{this.addUsers(e)}} className="login100-form-btn submitButn">
                                Submit
                            </button>
                                    </MDBModalFooter>
      </MDBModal>
      </form>
    </MDBContainer>
    </div>
     
    );
  }
}
export default Users;