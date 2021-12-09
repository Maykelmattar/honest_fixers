import React from 'react';
import '../styling/home.css'



class Part3 extends React.Component {
  state = { 
    techVen: "",

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
              <label htmlFor="techVen">Tech/Ven Name-No</label>
              <input type="text" disabled={this.props.item.viewMode} id="techVen" value={this.state.techVen} onChange={this.handleText} className="form-control form-control-lg" />

       </div>
     
       </div>
       
     
      </div>

     
    );
  }
}
export default Part3;