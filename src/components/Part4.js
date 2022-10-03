import React from 'react';
import '../styling/home.css'
import DateTimePicker from 'react-datetime-picker';


class Part4 extends React.Component {
  state = { 
    popOverVisible:false,
    assessment: "",
    checkIn: "",
    checkOut: "",
    repairIn: "",	
    repairOut: "",	
    assessmentTime: "",
    assessmentTimeCost: 0,	
    assessmentTimeCharge: 0,
    parts: "",
    partsCost 	: 0,
    partsCharge 	: 0,
    material 	: "",	
    materialCost : 0,	
    materialCharge : 0,	
    equiment 		: "",
    equimentCost 	: 0,
    equimentCharge 	: 0,
    laborTime 		: "",
    laborTimeCost 	: 0,	
    laborTimeCharge : 0,
    trip 	 		: "",
    tripCost 		: 0,	
    tripCharge 	: 0,
    Permit 	: "",
    PermitCost: 0, 		
    PermitCharge: 0, 	
    labTest : "",
    labTestCost : 0,	
    labTestCharge 	: 0,	
    totalCost:0,
    totalCharge:0
  }

constructor(props){
  super(props);
}



  componentDidMount() {
    if(Object.keys(this.props.item).length !==0){
      this.setState({
        ...this.props.item,
  
            })
    }
  }

  onDateChange = (e,state) =>{
    this.setState({[state]:e})
  }

  handleText = (e)=>{
    let label =e.target.id?e.target.id:""
    const value = e.target.value;
    this.setState({
      [e.target.id]: value?value:0
    },()=>{
      if(label.includes("Cost")){
        let total = parseFloat(this.state.assessmentTimeCost)+ parseFloat(this.state.partsCost) + parseFloat(this.state.materialCost)+ parseFloat(this.state.equimentCost)+ parseFloat(this.state.laborTimeCost)+ parseFloat(this.state.tripCost)+ parseFloat(this.state.PermitCost)+ parseFloat(this.state.labTestCost) 
        this.setState({totalCost:total})
        this.props.updateTotal({totalCost:total,totalCharge:this.state.totalCharge})
      }else{
        if(label.includes("Charge")){
          let total = parseFloat(this.state.assessmentTimeCharge)+ parseFloat(this.state.partsCharge) + parseFloat(this.state.materialCharge)+ parseFloat(this.state.equimentCharge)+parseFloat(this.state.laborTimeCharge)+ parseFloat(this.state.tripCharge)+ parseFloat(this.state.PermitCharge)+ parseFloat(this.state.labTestCharge) 
          this.setState({totalCharge:total})
          this.props.updateTotal({totalCost:this.state.totalCost,totalCharge:total})
        }
      }
    });
    }

  render() {
    return (


<div className="container">
            <div className="row">
              <div className={this.state.popOverVisible?"col-md-9 col-12":"col-12"}>
              <label style={{width:"100%"}}htmlFor="assessment">Assessment 

  <button  onClick={()=>{this.setState({popOverVisible:!this.state.popOverVisible})}} style={{fontSize:"30px",float:'right'}}>
  <i className="fa fa-question-circle" aria-hidden="true"></i>   
                           
                           </button>
                                     
           </label>
     
              <textarea type="textarea" disabled={this.props.item.viewMode} id="assessment" value={this.state.assessment} rows="5" onChange={this.handleText} className="form-control form-control-lg" />
              
       </div>
       <div className="col-md-3 col-12" style={{display:this.state.popOverVisible?"":"none"}}>
       
       1) Type of appliance? 
       <br/>
2) Is the unit functional? 
<br/>
3) Make, Model, Serial of the unit? 
<br/>
4) Located in what? 
<br/>
5) Made/installed in what year? age? 
<br/>
6) Faulty component? 
<br/>
7) Why is it damaged/faulty? 
<br/>
8) Steps to complete the repair? 
<br/>
9) Time taken to repair? 
<br/> 
10) Materials and parts needed?
     </div>
       </div>
       <div className="row">
       <div className="col-md-3 col-12">
              <label htmlFor="checkIn">Assessment Check In</label>
              <div>
              <DateTimePicker
              disabled={this.props.item.viewMode}
        onChange={(e)=>{this.onDateChange(e,'checkIn')}}
        format="dd-MM-yyyy hh:mm"
        value={this.state.checkIn}
      />
      </div>
       </div>
              <div className="col-md-3 col-12">
              <label htmlFor="checkOut">Assessment Check Out</label>
              <div>
              <DateTimePicker
              disabled={this.props.item.viewMode} 
        onChange={(e)=>{this.onDateChange(e,'checkOut')}}
        format="dd-MM-yyyy hh:mm"
        value={this.state.checkOut}
      />       
      </div>
       </div>

       <div className="col-md-3 col-12">
              <label htmlFor="repairIn">Repair Check-In</label>
              <div>
              <DateTimePicker
              disabled={this.props.item.viewMode} 
        onChange={(e)=>{this.onDateChange(e,'repairIn')}}
        format="dd-MM-yyyy hh:mm"
        value={this.state.repairIn}
      />       
      </div>
       </div>
       <div className="col-md-3 col-12">
              <label htmlFor="repairOut">Repair Check-Out</label>
              <div>
              <DateTimePicker
              disabled={this.props.item.viewMode} 
        onChange={(e)=>{this.onDateChange(e,'repairOut')}}
        format="dd-MM-yyyy hh:mm"
        value={this.state.repairOut}
      />       
      </div>
       </div>
  
       </div>
       <br/>
     <div className="row">
       <div className="col-md-2 col-4">
         <p className="tbl-title">
           Element
         </p>
         </div>
         <div className="col-md-6 col-8">
         <p className="tbl-title">
           Details
         </p>
         </div>
         <div className="col-md-2 col-6">
         <p className="tbl-title">
           Cost
         </p>
         </div>
         <div className="col-md-2 col-6">
         <p className="tbl-title">
           Charge
         </p>
         </div>
         </div>
         <div className="row">
       <div className="col-md-2 col-4">
         <p className="tbl-subtitle">
           Assessment Time:
         </p>
         </div>
         <div className="col-md-6 col-8">
         <input type="number" disabled={this.props.item.viewMode} id="assessmentTime" value={this.state.assessmentTime} onChange={this.handleText} className="form-control form-control-lg" />
         </div>
         <div className="col-md-2 col-6">
         <input type="number" disabled={this.props.item.viewMode} id="assessmentTimeCost" value={this.state.assessmentTimeCost} onChange={this.handleText} className="form-control form-control-lg" />

         </div>
         <div className="col-md-2 col-6">
         <input type="number" disabled={this.props.item.viewMode} id="assessmentTimeCharge" value={this.state.assessmentTimeCharge} onChange={this.handleText} className="form-control form-control-lg" />

         </div>
         </div>
         <div className="row">
       <div className="col-md-2 col-4">
         <p className="tbl-subtitle">
           Parts:
         </p>
         </div>
         <div className="col-md-6 col-8">
         <input type="text" disabled={this.props.item.viewMode} id="parts" value={this.state.parts} onChange={this.handleText} className="form-control form-control-lg" />

         </div>
         <div className="col-md-2 col-6">
         <input type="number" disabled={this.props.item.viewMode} id="partsCost" value={this.state.partsCost} onChange={this.handleText} className="form-control form-control-lg" />

         </div>
         <div className="col-md-2 col-6">
         <input type="number" disabled={this.props.item.viewMode} id="partsCharge" value={this.state.partsCharge} onChange={this.handleText} className="form-control form-control-lg" />

         </div>
         </div>
         <div className="row">
       <div className="col-md-2 col-4">
         <p className="tbl-subtitle">
           Material:
         </p>
         </div>
         <div className="col-md-6 col-8">
         <input type="text" disabled={this.props.item.viewMode} id="material" value={this.state.material} onChange={this.handleText} className="form-control form-control-lg" />

         </div>
         <div className="col-md-2 col-6">
         <input type="number" disabled={this.props.item.viewMode} id="materialCost" value={this.state.materialCost} onChange={this.handleText} className="form-control form-control-lg" />

         </div>
         <div className="col-md-2 col-6">
         <input type="number" disabled={this.props.item.viewMode} id="materialCharge" value={this.state.materialCharge} onChange={this.handleText} className="form-control form-control-lg" />

         </div>
         </div>
         <div className="row">
       <div className="col-md-2 col-4">
         <p className="tbl-subtitle">
           Equipment:
         </p>
         </div>
         <div className="col-md-6 col-8">
         <input type="text" disabled={this.props.item.viewMode} id="equiment" value={this.state.equiment} onChange={this.handleText} className="form-control form-control-lg" />

         </div>
         <div className="col-md-2 col-6">
         <input type="number" disabled={this.props.item.viewMode} id="equimentCost" value={this.state.equimentCost} onChange={this.handleText} className="form-control form-control-lg" />

         </div>
         <div className="col-md-2 col-6">
         <input type="number" disabled={this.props.item.viewMode} id="equimentCharge" value={this.state.equimentCharge} onChange={this.handleText} className="form-control form-control-lg" />

         </div>
         </div>
         <div className="row">
       <div className="col-md-2 col-4">
         <p className="tbl-subtitle">
           Labor Time:
         </p>
         </div>
         <div className="col-md-6 col-8">
         <input type="number" disabled={this.props.item.viewMode} id="laborTime" value={this.state.laborTime} onChange={this.handleText} className="form-control form-control-lg" />

         </div>
         <div className="col-md-2 col-6">
         <input type="number" disabled={this.props.item.viewMode} id="laborTimeCost" value={this.state.laborTimeCost} onChange={this.handleText} className="form-control form-control-lg" />

         </div>
         <div className="col-md-2 col-6">
         <input type="number" disabled={this.props.item.viewMode} id="laborTimeCharge" value={this.state.laborTimeCharge} onChange={this.handleText} className="form-control form-control-lg" />

         </div>
         </div>
         <div className="row">
       <div className="col-md-2 col-4">
         <p className="tbl-subtitle">
           Trip
         </p>
         </div>
         <div className="col-md-6 col-8">
         <input type="text" disabled={this.props.item.viewMode} id="trip" value={this.state.trip} onChange={this.handleText} className="form-control form-control-lg" />

         </div>
         <div className="col-md-2 col-6">
         <input type="number" disabled={this.props.item.viewMode} id="tripCost" value={this.state.tripCost} onChange={this.handleText} className="form-control form-control-lg" />

         </div>
         <div className="col-md-2 col-6">
         <input type="number" disabled={this.props.item.viewMode} id="tripCharge" value={this.state.tripCharge} onChange={this.handleText} className="form-control form-control-lg" />

         </div>
         </div>
         <div className="row">
       <div className="col-md-2 col-4">
         <p className="tbl-subtitle">
           Permit:
         </p>
         </div>
         <div className="col-md-6 col-8">
         <input type="text" disabled={this.props.item.viewMode} id="Permit" value={this.state.Permit} onChange={this.handleText} className="form-control form-control-lg" />

         </div>
         <div className="col-md-2 col-6">
         <input type="number" disabled={this.props.item.viewMode} id="PermitCost" value={this.state.PermitCost} onChange={this.handleText} className="form-control form-control-lg" />

         </div>
         <div className="col-md-2 col-6">
         <input type="number" disabled={this.props.item.viewMode} id="PermitCharge" value={this.state.PermitCharge} onChange={this.handleText} className="form-control form-control-lg" />

         </div>
         </div>
         <div className="row">
       <div className="col-md-2 col-4">
         <p className="tbl-subtitle">
           Lab Test:
         </p>
         </div>
         <div className="col-md-6 col-8">
         <input type="text" disabled={this.props.item.viewMode} id="labTest" value={this.state.labTest} onChange={this.handleText} className="form-control form-control-lg" />

         </div>
         <div className="col-md-2 col-6">
         <input type="number" disabled={this.props.item.viewMode} id="labTestCost" value={this.state.labTestCost} onChange={this.handleText} className="form-control form-control-lg" />

         </div>
         <div className="col-md-2 col-6">
         <input type="number" disabled={this.props.item.viewMode} id="labTestCharge" value={this.state.labTestCharge} onChange={this.handleText} className="form-control form-control-lg" />

         </div>
         </div>
      </div>

     
    );
  }
}
export default Part4;