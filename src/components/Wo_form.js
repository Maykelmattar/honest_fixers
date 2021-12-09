import React from 'react';
import axios from 'axios';
import { DB_Link } from "../global";
import { ToastContainer, toast } from 'react-toastify';

import '../styling/home.css'
import Part1 from './Part1';
import Part2 from './Part2';
import Part3 from './Part3';
import Part4 from './Part4';
import Part5 from './Part5';
import Part6 from './Part6';

import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';


class Wo_form extends React.Component {
  state = { 
    popOverVisible:false,
    dispatchersList:[],
    typesList:[],
    numberAvailability:true,
    statusList:[],
    priorityList:[],
    clientsList:[],
    mandatoryCheck:false,
    item:{},
    actualCost 	: 0,
    totalNTE 	: 0,		
    editing:0
  }

constructor(props){
  super(props);
  this.part1Ref = React.createRef();
  this.part2Ref = React.createRef();
  this.part3Ref = React.createRef();
  this.part4Ref = React.createRef();
  this.part5Ref = React.createRef();
  this.part6Ref = React.createRef();

}



  componentDidMount() {
    if(Object.keys(this.props.wo_item).length !==0){
      //console.log('wo',this.props.wo_item)
      this.setState({item:this.props.wo_item,editing:1})
    }
    this.loadDropdown()
  }

   saveForm(){
     let pt1 = this.part1Ref.current.state
    let pt2 = this.part2Ref.current.state
    let pt3 = this.part3Ref.current.state
    let pt4 =  this.part4Ref.current.state
    let pt5 = this.part5Ref.current.state
    let pt6 =  this.part6Ref.current.state
    let _data = {
      dispatcher: pt1.dispatcher?pt1.dispatcher.value:"",	
      number: pt1.number?pt1.number:"",
      type: pt1.type?pt1.type.value:"",
      status: pt1.status?pt1.status.value:"",
      priority: pt1.priority?pt1.priority.value:'',
      //Pt1
      store: pt2.store?pt2.store:"",
      storeManager: pt2.storeManager?pt2.storeManager:"",		
      storeManagerNo: pt2.storeManagerNo?pt2.storeManagerNo:"",		
      receivedIn: pt2.receivedIn?pt2.receivedIn:"",
      client: pt1.client?pt1.client.value:"",
      clientContact: pt2.clientContact?pt2.clientContact:"",		
      clientContactNo: pt2.clientContactNo?pt2.clientContactNo:"", 		
      facility: pt2.facility?pt2.facility:"",
      facilityContact: pt2.facilityContact?pt2.facilityContact:"",	
      facilityContactNo: pt2.facilityContactNo?pt2.facilityContactNo:"",	
      state: pt2.state?pt2.state.value:"",
      city: pt2.city?pt2.city:"",
      zip: pt2.zip?pt2.zip:"",
      location: pt2.location?pt2.location:"",
      ETA: pt2.ETA?pt2.ETA:"",			
      description: pt2.description?pt2.description:"",
      clientNTE: pt2.clientNTE?pt2.clientNTE:0,
      //Pt2
      techVen: pt3.techVen?pt3.techVen:"",
//Pt3

assessment: pt4.assessment?pt4.assessment:"",
checkIn: pt4.checkIn?pt4.checkIn:"",
checkOut: pt4.checkOut?pt4.checkOut:"",
repairIn: pt4.repairIn?pt4.repairIn:"",	
repairOut: pt4.repairOut?pt4.repairOut:"",	
assessmentTime: pt4.assessmentTime?pt4.assessmentTime:0,
assessmentTimeCost: pt4.assessmentTimeCost?pt4.assessmentTimeCost:0,	
assessmentTimeCharge: pt4.assessmentTimeCharge?pt4.assessmentTimeCharge:0,
parts: pt4.parts?pt4.parts:"",
partsCost 	: pt4.partsCost?pt4.partsCost:0,
partsCharge 	: pt4.partsCharge?pt4.partsCharge:0,
material 	: pt4.material?pt4.material:"",	
materialCost : pt4.materialCost?pt4.materialCost:0,	
materialCharge : pt4.materialCharge?pt4.materialCharge:0,	
equiment 		: pt4.equiment?pt4.equiment:"",
equimentCost 	: pt4.equimentCost?pt4.equimentCost:0,
equimentCharge 	: pt4.equimentCharge?pt4.equimentCharge:0,
laborTime 		: pt4.laborTime?pt4.laborTime:0,
laborTimeCost 	: pt4.laborTimeCost?pt4.laborTimeCost:0,	
laborTimeCharge : pt4.laborTimeCharge?pt4.laborTimeCharge:0,
trip 	 		: pt4.trip?pt4.trip:"",
tripCost 		: pt4.tripCost?pt4.tripCost:0,	
tripCharge 	: pt4.tripCharge?pt4.tripCharge:0,
Permit 	: pt4.Permit?pt4.Permit:"",
PermitCost: pt4.PermitCost?pt4.PermitCost:0, 		
PermitCharge: pt4.PermitCharge?pt4.PermitCharge:0, 	
labTest : pt4.labTest?pt4.labTest:'',
labTestCost : pt4.labTestCost?pt4.labTestCost:0,	
labTestCharge 	: pt4.labTestCharge?pt4.labTestCharge:0,	

//Pt4
proposal 		: pt5.proposal?pt5.proposal:"",	
link 			: pt5.link?pt5.link:"",
//Pt5
notes 		: pt6.notes?pt6.notes:"",
actualCost 	: pt6.actualCost?pt6.actualCost:0,
totalNTE 	: pt6.totalNTE?pt6.totalNTE:0,		
paymentMethod : pt6.paymentMethod?pt6.paymentMethod.value?pt6.paymentMethod.value:"":"",	
Ustmp:localStorage.getItem('username'),
DoneStmp:pt1.status?(pt1.status.label==="Job Done" && this.state.item.status.label !=="Job Done")?localStorage.getItem('username'):this.state.item.DoneStmp?this.state.item.DoneStmp:"":'',
id: this.state.item.Id?this.state.item.Id:"",
Cstmp:localStorage.getItem('username'),
    };
//console.log(_data)
if(_data.dispatcher && _data.client && _data.type && _data.status && _data.priority && _data.store && _data.facility && _data.state && _data.city && _data.zip && _data.location && _data.description &&(!_data.number || this.state.numberAvailability)){
    axios({
      method: "post",
      url: this.state.item.Id?`${DB_Link}wo_update.php`:`${DB_Link}wo_create.php`,
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
              let msg = this.state.editing===0?"Priority Added":"Priority Updated";
              toast.success(msg, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                setTimeout(() =>   this.props.closeForm(), 2000)
              
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
  loadDropdown(){
    let _data = {
      username: localStorage.getItem('username'),
    };

    axios({
      method: "post",
      url: `${DB_Link}dropdown_read.php`,
      data: JSON.stringify(_data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        const res = response.data;
        this.setState({
        dispatchersList:res.dispatchersList,
        typesList:res.typesList,
        statusList:res.statusList,
        priorityList:res.priorityList,
        clientsList:res.clientsList
        })

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
  updateTotal = (e)=>{
    //console.log(e)
    this.setState({
      actualCost 	: e.totalCost,
      totalNTE 	: e.totalCharge,		
    })
  }
  updateNumberAvailability = (state) =>{
    this.setState({numberAvailability:state},()=>{
      if(!state){
      toast.error('Wo number Not Available', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      }
    })
  }
  render() {
    return (
      <div style={{ maxWidth: '100%' }}>
                  <ToastContainer />

<div className="Title_center">
{this.state.editing ===0 ?"Add Workorder":"Edit Workorder #" + this.state.item.Id}
</div>
          <div className="tableGrid">
 
          <Accordion defaultExpanded = {true} className="accordion-input">

<AccordionSummary className="accordion-header"  expandIcon={<ExpandMore />}>
Part 1
</AccordionSummary>

<AccordionDetails>
  <Part1 
  item = {this.props.wo_item}
  mandatoryCheck = {this.state.mandatoryCheck}
  dispatchersList = {this.state.dispatchersList} 
  typesList = {this.state.typesList} 
  statusList = {this.state.statusList} 
  priorityList = {this.state.priorityList} 
  clientsList = {this.state.clientsList} 
  updateNumberAvailability = {this.updateNumberAvailability}
  ref={this.part1Ref} />

</AccordionDetails>

</Accordion>
<Accordion defaultExpanded = {true} className="accordion-input">

<AccordionSummary className="accordion-header"  expandIcon={<ExpandMore />}>
Part 2
</AccordionSummary>

<AccordionDetails>
<Part2 
item={this.props.wo_item}
mandatoryCheck = {this.state.mandatoryCheck}
ref={this.part2Ref} />

</AccordionDetails>

</Accordion>
<Accordion defaultExpanded={this.props.wo_item.viewMode}  className="accordion-input">

<AccordionSummary className="accordion-header"  expandIcon={<ExpandMore />}>
Part 3
</AccordionSummary>

<AccordionDetails>
<Part3
item = {this.props.wo_item}
ref={this.part3Ref} />

</AccordionDetails>

</Accordion>
<Accordion defaultExpanded={this.props.wo_item.viewMode} className="accordion-input">

<AccordionSummary className="accordion-header"  expandIcon={<ExpandMore />}>
Part 4
</AccordionSummary>

<AccordionDetails>
<Part4 
item = {this.props.wo_item}
ref={this.part4Ref}
updateTotal={this.updateTotal}
/>

</AccordionDetails>

</Accordion>
<Accordion defaultExpanded={this.props.wo_item.viewMode}  className="accordion-input">

<AccordionSummary className="accordion-header"  expandIcon={<ExpandMore />}>
Part 5
</AccordionSummary>

<AccordionDetails>
<Part5
item = {this.props.wo_item}
ref={this.part5Ref} />


          </AccordionDetails>

</Accordion>
<Accordion  defaultExpanded={this.props.wo_item.viewMode} className="accordion-input">

<AccordionSummary className="accordion-header"  expandIcon={<ExpandMore />}>
Part 6
</AccordionSummary>

<AccordionDetails>
<Part6 
item = {this.props.wo_item}
ref={this.part6Ref} 
actualCost={this.state.actualCost}
totalNTE={this.state.totalNTE}
/>


          </AccordionDetails>

</Accordion>
<br />
<br />
<div className="action-bar">
  <div onClick={()=>{this.saveForm()}} style={this.props.wo_item.viewMode?{display:'none'}:{}} className="action-bar-items">
<i className="fa fa-save" style={{color:"green"}}></i>
</div>
<div onClick={()=>{this.props.closeForm()}} className="action-bar-items">

<i className="fa fa-times" style={{color:"red"}} aria-hidden="true"></i>
</div>
</div>
</div>
</div>
     
    );
  }
}
export default Wo_form;