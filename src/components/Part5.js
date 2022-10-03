import React from 'react';

import '../styling/home.css'



class Part5 extends React.Component {
  state = { 
    proposal 		: "",	
    link 			: "",

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
              <div className="col-12">
              <label style={{width:"100%"}}htmlFor="proposal">Proposal 
                                     
           </label>
     
              <textarea type="textarea"disabled={this.props.item.viewMode} id="proposal" value={this.state.proposal} placeholder="This is where you type the proposal as it is sent to the client" rows="5" onChange={this.handleText} className="form-control form-control-lg" />
              
       </div>
       </div>
       <br/>
       <div className="row">
         <div className="col-2">
           </div>
        <div className="col-2">
          WO Wink:
         </div>
         <div className="col-6">
         <input type="text"disabled={this.props.item.viewMode} id="link" value={this.state.link} onChange={this.handleText} className="form-control form-control-lg" />
         </div>
         </div>
          </div>

          
    );
  }
}
export default Part5;