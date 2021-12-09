import React from 'react';
import axios from 'axios';
import { DB_Link } from "../global";
import { MDBDataTable } from 'mdbreact';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter  } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';

import '../styling/home.css'



class Clients extends React.Component {
  state = { 
    data: {} ,mandatoryCheck:false,  modal: false,role:'',id:'',name:"",editing:0,
  }
  
  toggle = () => {
    if(this.state.modal){
      this.setState({
        id:"",
        name:"",
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
  loadClients(){
    let columns = [
      {
        label: '',
        field: 'id',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Client Name',
        field: 'name',
        sort: 'asc',
        width: 800
      },
      {
        label: '',
        field: 'edit',
        width: 10
    
      },
      {
        label: '',
        field: 'status',
        width: 10
    
      },
    ];
    let _data = {
      username: localStorage.getItem('username'),
    };

    axios({
      method: "post",
      url: `${DB_Link}client_read.php`,
      data: JSON.stringify(_data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
       // console.log(localStorage.getItem('username'))
        const res = response.data.body;
       // console.log(res)
        if((res === null)||(res === undefined)) {
        } else {
          for (let item of res) {
            if(item.status==='1'){
              item.status = <div style={{ textAlign: 'center' }}><i className='fa fa-lock' style={{ color: 'red', flaot: 'left', fontSize: '20px',cursor:'pointer' }} onClick={() => this.changeStatus(item)} aria-hidden='true'></i></div> 
            }else{
            item.status = <div style={{ textAlign: 'center' }}><i className='fa fa-unlock' style={{ color: 'green', flaot: 'left', fontSize: '20px',cursor:'pointer' }} onClick={() => this.changeStatus(item)} aria-hidden='true'></i></div> 
            }
            item.edit = <div style={{ textAlign: 'center' }}><i className='fa fa-pencil' style={{ color: 'green', flaot: 'left', fontSize: '20px',cursor:'pointer' }} onClick={() => this.update(item)} aria-hidden='true'></i></div> //Delete Button

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
  changeStatus(e){
    let _data = {
      id: e.id,
    };

    axios({
      method: "post",
      url: `${DB_Link}client_status.php`,
      data: JSON.stringify(_data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        const res = response.data;
      //  console.log(res)
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
                this.loadClients()
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
    this.loadClients()

  }
  update(item){
    this.setState({
      id:item.id,
      name:item.name,
      editing:1,
    })
    this.toggle()
  }

  addClients=(e)=> {
    e.preventDefault()
    if(this.state.name){
    let _data = {
      id: this.state.id,
      name: this.state.name,
      creator: localStorage.getItem('username')
    };

    axios({
      method: "post",
      url: this.state.editing===0?`${DB_Link}client_create.php`:`${DB_Link}client_update.php`,
      data: JSON.stringify(_data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        const res = response.data;
    //    console.log(res)
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
              let msg = this.state.editing===0?"Client Added":"Client Updated";
              toast.success(msg, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        //        console.log(this.state)
                this.loadClients()
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
    } else {   this.setState({mandatoryCheck:true},()=>{
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
  addClient(){
    toast.success('Client Added', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
     // console.log(this.state)
      this.toggle()
      }
  render() {
    return (
      <div style={{ maxWidth: '100%' }}>
                  <ToastContainer />

        <span className="Title">
      Clients
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
          <form onSubmit={(e)=>{this.addClients(e)}}>
      <MDBModal isOpen={this.state.modal}  size='lg' toggle={this.toggle} >
        <MDBModalHeader toggle={this.toggle}>Add New Client</MDBModalHeader>
        <MDBModalBody>
        <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input type="text" id="name" value={this.state.name} onChange={this.handleText} className={this.state.mandatoryCheck&&!this.state.name?"mandatory form-control form-control-lg" : "form-control form-control-lg"} />
       
        <div>
        <div>
   
      </div>
      </div>
      </div>
   
        </MDBModalBody>
        <MDBModalFooter>
        <button type="submit"  onClick={(e)=>{this.addClients(e)}} className="login100-form-btn submitButn">
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
export default Clients;