import React from 'react';
import '../styling/home.css'
import Select from 'react-select';
const options = [
  { value: 'Cash', label: 'Cash' },
  { value: 'Checks', label: 'Checks' },
  { value: 'Debit cards', label: 'Debit cards' },
  { value: 'Mobile payments', label: 'Mobile payments' },
  { value: 'Electronic bank transfers', label: 'Electronic bank transfers' }
];

class Part6 extends React.Component {
  state = { 
    notes 		: "",
    actualCost 	: 0,
    totalNTE 	: 0,		
    paymentMethod : {},			

  }

constructor(props){
  super(props);


}

componentDidUpdate(prevProps){
  if(prevProps.actualCost!==this.props.actualCost || prevProps.totalNTE!==this.props.totalNTE){
    this.setState({
      actualCost:this.props.actualCost,
      totalNTE:this.props.totalNTE
    })
  }
}

  componentDidMount() {
    if(Object.keys(this.props.item).length !==0){
      this.setState({
        ...this.props.item,	

            },()=>{
             this.setState({paymentMethod:  options.find(x=>x.value === this.state.paymentMethod)?{value:this.state.paymentMethod,label:options.find(x=>x.value ===this.state.paymentMethod).label}:{},	
            })
            })
    }
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
     <div className="col-6">
       <p className="tbl-title">
         Notes
       </p>
       </div>
       <div className="col-6">
       <p className="tbl-title">
         Approval
       </p>
       </div>
       </div>
       <div className="row">
         <div className="col-md-6 col-12">
         <textarea type="textarea"disabled={this.props.item.viewMode} id="notes" value={this.state.notes} rows="5" onChange={this.handleText} placeholder="Extra Notes" className="form-control form-control-lg" />

           </div>
        <div className="col-md-6 col-12">
          <br/>
          <div className="row">
            <div className="col-4">
            Actual Cost:

              </div>
              <div className="col-8">
              <input type="text"disabled={this.props.item.viewMode} id="actualCost" disabled={true} value={this.state.actualCost} onChange={this.handleText} className="form-control form-control-lg" />

              </div>
            </div>
            <br/>
            <div className="row">
            <div className="col-4">
            Total NTE:

              </div>
              <div className="col-8">
              <input type="text"disabled={this.props.item.viewMode} id="totalNTE" disabled={true} value={this.state.totalNTE} onChange={this.handleText} className="form-control form-control-lg" />

              </div>
            </div>
            <br/>
            <div className="row">
            <div className="col-4">
            Payment Method:

              </div>
              <div className="col-8">
              <Select
       isDisabled={this.props.item.viewMode} id="paymentMethod"
        value={this.state.paymentMethod}
        onChange={(e)=>{this.handleChange(e,'paymentMethod')}}
        options={options}
      />
              </div>
</div>
</div>
</div>
</div>        
    );
  }
}
export default Part6;