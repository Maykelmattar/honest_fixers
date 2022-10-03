import React from 'react';
import '../styling/home.css'
import Select from 'react-select';
import '../styling/home.css'
import axios from 'axios';
import { DB_Link } from "../global";
const options = [
  { value: '1', label: 'Admin' },
  { value: '2', label: 'Dispatcher' },
  { value: '3', label: 'Team Manager' },
  { value: '4', label: 'Accoutant' }
];

class Part1 extends React.Component {
  state = { 
    popOverVisible:false,
    dispatcher: {},	
    number: "",
    type: {},
    client :{},
    status: {},
    priority: {},
    dispatchersList:[],
    typesList:[],
    statusList:[],
    priorityList:[],
    clientsList:[],
    numberAvailable:true
  }



componentDidUpdate(prevProps){
  if(this.props.dispatchersList!==prevProps.dispatchersList){
    this.setState({
      dispatchersList:this.props.dispatchersList,
      typesList:this.props.typesList,
      statusList:this.props.statusList,
      priorityList:this.props.priorityList,
      clientsList:this.props.clientsList,
      ...this.props.item,
    },()=>{
      if(this.state.statusList){
      let newStatusList =  this.state.statusList.filter(item => item.label !=='Invoiced')
      if(localStorage.getItem('Role')==='2'){
         newStatusList =  newStatusList.filter(item => item.label !=='Canceled' && !item.label.includes("Approved") )
      }
      this.setState({statusList:newStatusList})
    }
      if(Object.keys(this.props.item).length !==0){
        this.setState({
          dispatcher:  this.state.dispatchersList.find(x=>x.value === this.state.dispatcher)?{value:this.state.dispatcher,label:this.state.dispatchersList.find(x=>x.value ===this.state.dispatcher).label}:{},	
          type:  this.state.typesList.find(x=>x.value === this.state.type)?{value:this.state.type,label:this.state.typesList.find(x=>x.value ===this.state.type).label}:{},	
          status:  this.state.statusList.find(x=>x.value === this.state.status)?{value:this.state.status,label:this.state.statusList.find(x=>x.value ===this.state.status).label}:{},	
          priority:  this.state.priorityList.find(x=>x.value === this.state.priority)?{value:this.state.priority,label:this.state.priorityList.find(x=>x.value ===this.state.priority).label}:{},	
          client:  this.state.clientsList.find(x=>x.value === this.state.client)?{value:this.state.client,label:this.state.clientsList.find(x=>x.value ===this.state.client).label}:{},	

        },()=>{
     //     console.log(this.state)
        })
      }
    })
 
  }
}

  componentDidMount() {
  
 
  }

  handleChange = (e,state) => {
    this.setState({
      [state]:e
    })
  };
  handleText = (e)=>{
    const value = e.target.value;
    this.setState({
      [e.target.id]: value
    });
    }
    checkAvailability =()=>{
      if(!(this.props.viewMode || this.props.item.number == this.state.number)){
      if(this.state.number!==""){
      let _data = {
        number: this.state.number,
      };
  
      axios({
        method: "post",
        url: `${DB_Link}checkWoNumber.php`,
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
              numberAvailable:false
            },()=>{
              this.props.updateNumberAvailability(false)
            });
          }else{
              this.setState({
                numberAvailable:true
              },()=>{
                this.props.updateNumberAvailability(true)
              });
          } 
  
  
        });
      }
    }
    }
  render() {
    return (
 
    
<div className="container">
            <div className="row">
              <div className="col-md-4 col-12">
              <label className="required" htmlFor="dispatcher">Dispatcher</label>
        <Select
        id="dispatcher"
        isDisabled={this.props.item.viewMode}
        value={this.state.dispatcher}
        onChange={(e)=>{this.handleChange(e,'dispatcher')}}
        options={this.state.dispatchersList}
        className={this.props.mandatoryCheck&&Object.keys(this.state.dispatcher).length===0?"mandatory " : ""}
      />
       </div>
       <div className="col-md-4 col-12">
              <label className="required" htmlFor="client">Client</label>
        <Select
        id="client"
        isDisabled={this.props.item.viewMode}
        value={this.state.client}
        onChange={(e)=>{this.handleChange(e,'client')}}
        options={this.state.clientsList}
        className={this.props.mandatoryCheck&&Object.keys(this.state.client).length===0?"mandatory " : ""}

      />
       </div>
       <div className="col-md-4 col-12">
       <label className="required" htmlFor="number">WO Number</label>
        <input type="number" id="number" value={this.state.number} 
                disabled={this.props.item.viewMode}

        onBlur={this.checkAvailability} placeholder="Leave Blank for Auto Numbering" onChange={this.handleText}  className={!this.state.numberAvailable&&this.state.number!==""?"mandatory form-control form-control-lg " : "form-control form-control-lg"}  />
       
       </div>
       </div>
       <div className="row">
              <div className="col-md-4 col-12">
              <label className="required" htmlFor="type">Type</label>
        <Select
        id="type"
        value={this.state.type}
        isDisabled={this.props.item.viewMode}
        onChange={(e)=>{this.handleChange(e,'type')}}
        options={this.state.typesList}
        className={this.props.mandatoryCheck&&Object.keys(this.state.type).length===0?"mandatory " : ""}

      />
       </div>
       <div className="col-md-4 col-12">
              <label className="required" htmlFor="status">Status</label>
        <Select
        id="status"
        value={this.state.status}
        isDisabled={this.props.item.viewMode}
        onChange={(e)=>{this.handleChange(e,'status')}}
        options={this.state.statusList}
        className={this.props.mandatoryCheck&&Object.keys(this.state.status).length===0?"mandatory " : ""}

      />
       </div>
       <div className="col-md-4 col-12">
              <label className="required" htmlFor="priority">Priority</label>
        <Select
        id="priority"
        value={this.state.priority}
        isDisabled={this.props.item.viewMode}
        onChange={(e)=>{this.handleChange(e,'priority')}}
        options={this.state.priorityList}
        className={this.props.mandatoryCheck&&Object.keys(this.state.priority).length===0?"mandatory " : ""}

      />
       </div>
       </div>
     
      </div>

    );
  }
}
export default Part1;