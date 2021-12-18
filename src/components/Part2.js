import React from 'react';
import '../styling/home.css'
import DateTimePicker from 'react-datetime-picker';
import Select from 'react-select';
import '../styling/home.css'

const options = [
  {
    label: "Alabama",
    value: "AL"
},
{
    label: "Alaska",
    value: "AK"
},
{
    label: "American Samoa",
    value: "AS"
},
{
    label: "Arizona",
    value: "AZ"
},
{
    label: "Arkansas",
    value: "AR"
},
{
    label: "California",
    value: "CA"
},
{
    label: "Colorado",
    value: "CO"
},
{
    label: "Connecticut",
    value: "CT"
},
{
    label: "Delaware",
    value: "DE"
},
{
    label: "District Of Columbia",
    value: "DC"
},
{
    label: "Federated States Of Micronesia",
    value: "FM"
},
{
    label: "Florida",
    value: "FL"
},
{
    label: "Georgia",
    value: "GA"
},
{
    label: "Guam",
    value: "GU"
},
{
    label: "Hawaii",
    value: "HI"
},
{
    label: "Idaho",
    value: "ID"
},
{
    label: "Illinois",
    value: "IL"
},
{
    label: "Indiana",
    value: "IN"
},
{
    label: "Iowa",
    value: "IA"
},
{
    label: "Kansas",
    value: "KS"
},
{
    label: "Kentucky",
    value: "KY"
},
{
    label: "Louisiana",
    value: "LA"
},
{
    label: "Maine",
    value: "ME"
},
{
    label: "Marshall Islands",
    value: "MH"
},
{
    label: "Maryland",
    value: "MD"
},
{
    label: "Massachusetts",
    value: "MA"
},
{
    label: "Michigan",
    value: "MI"
},
{
    label: "Minnesota",
    value: "MN"
},
{
    label: "Mississippi",
    value: "MS"
},
{
    label: "Missouri",
    value: "MO"
},
{
    label: "Montana",
    value: "MT"
},
{
    label: "Nebraska",
    value: "NE"
},
{
    label: "Nevada",
    value: "NV"
},
{
    label: "New Hampshire",
    value: "NH"
},
{
    label: "New Jersey",
    value: "NJ"
},
{
    label: "New Mexico",
    value: "NM"
},
{
    label: "New York",
    value: "NY"
},
{
    label: "North Carolina",
    value: "NC"
},
{
    label: "North Dakota",
    value: "ND"
},
{
    label: "Northern Mariana Islands",
    value: "MP"
},
{
    label: "Ohio",
    value: "OH"
},
{
    label: "Oklahoma",
    value: "OK"
},
{
    label: "Oregon",
    value: "OR"
},
{
    label: "Palau",
    value: "PW"
},
{
    label: "Pennsylvania",
    value: "PA"
},
{
    label: "Puerto Rico",
    value: "PR"
},
{
    label: "Rhode Island",
    value: "RI"
},
{
    label: "South Carolina",
    value: "SC"
},
{
    label: "South Dakota",
    value: "SD"
},
{
    label: "Tennessee",
    value: "TN"
},
{
    label: "Texas",
    value: "TX"
},
{
    label: "Utah",
    value: "UT"
},
{
    label: "Vermont",
    value: "VT"
},
{
    label: "Virgin Islands",
    value: "VI"
},
{
    label: "Virginia",
    value: "VA"
},
{
    label: "Washington",
    value: "WA"
},
{
    label: "West Virginia",
    value: "WV"
},
{
    label: "Wisconsin",
    value: "WI"
},
{
    label: "Wyoming",
    value: "WY"
}
];

class Part2 extends React.Component {
  state = { 
    store: "",
    storeManager: "",		
    storeManagerNo: "",		
    receivedIn: "",
    client: "",
    clientContact: "",		
    clientContactNo: "", 		
    facility: "",
    facilityContact: "",	
    facilityContactNo: "",	
    state: "",
    city: "",
    zip: "",
    location: "",
    ETA: "",			
    description: "",
    clientNTE: ""
  }

constructor(props){
  super(props);
}


  componentDidMount() {
    if(Object.keys(this.props.item).length !==0){
      this.setState({		
        ...this.props.item,
  
      },()=>{
        this.setState({
          state:  options.find(x=>x.value === this.state.state)?{value:this.state.state,label:options.find(x=>x.value ===this.state.state).label}:{},	

        })
      })
    }
  }

  onDateChange = (e,state) =>{
   // console.log(e)
    this.setState({[state]:e})
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

  render() {
    return (
 

<div className="container">
            <div className="row">
              <div className="col-md-4 col-12">
              <label className="required" htmlFor="store">Store</label>
        <input type="text" disabled={this.props.item.viewMode} id="store" value={this.state.store} onChange={this.handleText} className={this.props.mandatoryCheck&&!this.state.store?"mandatory form-control form-control-lg" : "form-control form-control-lg"} />
       
       </div>
       <div className="col-md-4 col-12">
       <label htmlFor="storeManager">Store Manager</label>
        <input type="text" disabled={this.props.item.viewMode} id="storeManager" value={this.state.storeManager} onChange={this.handleText} className="form-control form-control-lg" />
       
       </div>
       <div className="col-md-4 col-12">
       <label htmlFor="storeManagerNo">Store Manager No </label>
        <input type="text" disabled={this.props.item.viewMode} id="storeManagerNo" value={this.state.storeManagerNo} onChange={this.handleText} className="form-control form-control-lg" />
       
       </div>
       </div>
       <div className="row">
              {/* <div className="col-md-4 col-12">
              <label htmlFor="client">Client</label>
        <input type="text" disabled={this.props.item.viewMode} id="client" value={this.state.client?this.state.client.label:""} disabled={true} className="form-control form-control-lg" />
       
       </div> */}
       <div className="col-md-6 col-12">
       <label htmlFor="clientContact">Client Contact </label>
        <input type="text" disabled={this.props.item.viewMode} id="clientContact" value={this.state.clientContact} onChange={this.handleText} className="form-control form-control-lg" />
       
       </div>
       <div className="col-md-6 col-12">
       <label htmlFor="clientContactNo">Client Contact No </label>
        <input type="text" disabled={this.props.item.viewMode} id="clientContactNo" value={this.state.clientContactNo} onChange={this.handleText} className="form-control form-control-lg" />
       
       </div>
       </div>
       <div className="row">
              <div className="col-md-4 col-12">
              <label className="required" htmlFor="facility">Facility</label>
              <input type="text" disabled={this.props.item.viewMode} id="facility" value={this.state.facility} onChange={this.handleText} className={this.props.mandatoryCheck&&!this.state.facility?"mandatory form-control form-control-lg" : "form-control form-control-lg"} />
       
       </div>
       <div className="col-md-4 col-12">
       <label htmlFor="facilityContact">Facility Contact </label>
        <input type="text" disabled={this.props.item.viewMode} id="facilityContact" value={this.state.facilityContact} onChange={this.handleText} className="form-control form-control-lg" />
       
       </div>
       <div className="col-md-4 col-12">
       <label htmlFor="facilityContactNo">Facility Contact No </label>
        <input type="text" disabled={this.props.item.viewMode} id="facilityContactNo" value={this.state.facilityContactNo} onChange={this.handleText} className="form-control form-control-lg" />
       
       </div>
       </div>
       <div className="row">
       <div className="col-md-3 col-12">
              <label className="required" htmlFor="state">State</label>
        <Select
        isDisabled={this.props.item.viewMode} id="state"
        value={this.state.state}
        onChange={(e)=>{this.handleChange(e,'state')}}
        options={options}
        className={this.props.mandatoryCheck&&!this.state.state?"mandatory " : ""}
      />
       </div>
              <div className="col-md-3 col-12">
              <label className="required" htmlFor="city">City</label>
              <input type="text" disabled={this.props.item.viewMode} id="city" value={this.state.city} onChange={this.handleText} className={this.props.mandatoryCheck&&!this.state.city?"mandatory form-control form-control-lg" : "form-control form-control-lg"} />
       
       </div>
       <div className="col-md-3 col-12">
       <label className="required" htmlFor="zip">Zip </label>
        <input type="text" disabled={this.props.item.viewMode} id="zip" value={this.state.zip} onChange={this.handleText} className={this.props.mandatoryCheck&&!this.state.zip?"mandatory form-control form-control-lg" : "form-control form-control-lg"}/>
       
       </div>
       <div className="col-md-3 col-12">
       <label className="required" htmlFor="location">Location </label>
        <input type="text" disabled={this.props.item.viewMode} id="location" value={this.state.location} onChange={this.handleText} className={this.props.mandatoryCheck&&!this.state.location?"mandatory form-control form-control-lg" : "form-control form-control-lg"} />
       
       </div>
       </div>

       <div className="row">
       <div className="col-md-4 col-12">
              <label htmlFor="receivedIn">Received In</label>
              <div>
              <DateTimePicker
              disabled={this.props.item.viewMode} 
        onChange={(e)=>{this.onDateChange(e,'receivedIn')}}
        format="dd-MM-yyyy hh:mm"
        value={this.state.receivedIn}
      />
      </div>
       </div>
              <div className="col-md-4 col-12">
              <label htmlFor="ETA">ETA</label>
              <div>
              <DateTimePicker
              disabled={this.props.item.viewMode} 
        onChange={(e)=>{this.onDateChange(e,'ETA')}}
        format="dd-MM-yyyy hh:mm"
        value={this.state.ETA}
      />       
      </div>
       </div>

              <div className="col-md-4 col-12">
              <label htmlFor="clientNTE">Client NTE</label>
              <input type="number" disabled={this.props.item.viewMode} id="clientNTE" value={this.state.clientNTE} onChange={this.handleText} className={ "form-control form-control-lg"} />

       </div>
  
       </div>
       <div className="row">
           <div className="col-12">
           <label className="required"htmlFor="description">Description 
                                     
                                     </label>
                               
                                        <textarea type="textarea" disabled={this.props.item.viewMode} id="description" value={this.state.description} onChange={this.handleText} className={this.props.mandatoryCheck&&!this.state.description?"mandatory form-control form-control-lg" : "form-control form-control-lg"}  />
                                        
           </div>
       </div>
     

</div>
     
    );
  }
}
export default Part2;