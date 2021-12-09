import React from 'react';
import axios from 'axios';
import { DB_Link } from "../global";
import { MDBDataTable } from 'mdbreact';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import Select from 'react-select';
import cloneDeep from 'lodash/cloneDeep';
import '../styling/home.css'
import { CSVLink } from "react-csv";
import DateTimePicker from 'react-datetime-picker';
import { Chart } from "react-google-charts";

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

class Wo extends React.Component {
  state = {
    data: {}, updatesdata: {},originaldata:{},
    modal: false, id: '', updatesDescription: "", updatesDispatcher: "", editing: 0,
    showFilter:false,
    fromDate:"",
    toDate:"",
    dispatchersList: [],
    typesList: [],
    statusList: [],
    priorityList: [],
    clientsList: [],
    showTable:true,
    dispatchersFilter: "",
    typesFilter: "",
    statusFilter: "",
    priorityFilter: "",
    clientsFilter: "",
    toExport:[],
    openWoFilter:1,
    pieChartData:[],
    pieChartStatusData:[],
    pieChartStatesData:[],
    showTechnician:false,
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
    if (this.state.modal) {
      this.setState({
        id: "",
        updatesDispatcher: "",
        updatesDescription: "",
        editing: 0
      })
    }
  }
  onDateChange = (e,state) =>{
     this.setState({[state]:e},()=>{
       this.filterData()
     })
   }
  invoiceStatus = (e) => {
    let _data = {
      id: e.Id,
      status: e.status!=='13'?13:12
    };

    axios({
      method: "post",
      url: `${DB_Link}wo_updateStatus.php`,
      data: JSON.stringify(_data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        const res = response.data;
        if (res === null) {

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
          if (res.status !== 200) {
            toast.error(res.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

          } else {
            let msg = "Wo Invoiced";
            toast.success(msg, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            this.loadWo()
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
  loadWo() {
    let columns = [
      {
        label: 'Wo #',
        field: 'Id',
        sort: 'asc',
        width: 50
      },
      {
        label: 'Type',
        field: 'typename',
        sort: 'asc',
        width: 800
      },
      {
        label: 'Store',
        field: 'store',
        sort: 'asc',
        width: 800
      },
      {
        label: 'Location',
        field: 'locationName',
        sort: 'asc',
        width: 600
      },
      {
        label: 'ETA',
        field: 'ETAname',
        sort: 'asc',
        width: 1000
      },
      {
        label: 'Priority',
        field: 'priorityname',
        sort: 'asc',
        width: 800
      },
      {
        label: 'Status',
        field: 'statusname',
        sort: 'asc',
        width: 800
      },
      {
        label: 'Latest Update',
        field: 'UDatename',
        sort: 'asc',
        width: 800
      },
      {
        label: 'Dispatcher',
        field: 'dispatchername',
        sort: 'asc',
        width: 500
      },
      {
        label: '',
        field: 'updates',
        width: 10

      },
      {
        label: '',
        field: 'edit',
        width: 10

      },

    ];
    if (localStorage.getItem('Role') === '4') {
      columns.pop()
      columns.push({
        label: '',
        field: 'invoice',
        width: 10
      })
    }
    columns.push({
      label: '',
      field: 'view',
      width: 10
    })
    let _data = {
      username: localStorage.getItem('username'),
    };

    axios({
      method: "post",
      url: `${DB_Link}wo_read.php`,
      data: JSON.stringify(_data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        const res = response.data.body;
        if ((res === null) || (res === undefined)) {

        } else {
          for (let item of res) {
            item.updates = <div style={{ textAlign: 'center' }}><i className='fa fa-bell-o' style={{ color: 'red', flaot: 'left', fontSize: '20px', cursor: 'pointer' }} onClick={() => this.show_update(item)} aria-hidden='true'></i> {item.updatesCount > 0 ? item.updatesCount : ''}</div> //Delete Button
            if(!(item.statusname.includes('Canceled')||item.statusname.includes('Invoiced')||item.statusname.includes('Job Done'))){
            if (localStorage.getItem('Role') === '3') {
              item.edit = <div style={{ textAlign: 'center' }}><i className='fa fa-pencil' style={{ color: 'green', flaot: 'left', fontSize: '20px', cursor: 'pointer' }} onClick={() => this.editWo(item)} aria-hidden='true'></i></div> //Delete Button
            } else {
              if (item.dispatcher === localStorage.getItem('username')) {
                item.edit = <div style={{ textAlign: 'center' }}><i className='fa fa-pencil' style={{ color: 'green', flaot: 'left', fontSize: '20px', cursor: 'pointer' }} onClick={() => this.editWo(item)} aria-hidden='true'></i></div> //Delete Button
              } else {
                item.edit = ""
              }
            }
          }
            if (localStorage.getItem('Role') === '4') {
              if(item.status !== '13'){
              item.invoice = <div style={{ textAlign: 'center' }}><i className='fa fa-calculator' style={{ color: 'green', flaot: 'left', fontSize: '20px', cursor: 'pointer' }} onClick={() => this.invoiceStatus(item)} aria-hidden='true'></i></div> //Delete Button
              }else{
                item.invoice = <div style={{ textAlign: 'center' }}><i className='fa fa-calculator' style={{ color: 'red', flaot: 'left', fontSize: '20px', cursor: 'pointer' }} onClick={() => this.invoiceStatus(item)} aria-hidden='true'></i></div> //Delete Button

                }
            }
            item.view = <div style={{ textAlign: 'center' }}><i className='fa fa-eye' style={{ color: '#4267B2', flaot: 'left', fontSize: '20px', cursor: 'pointer' }} onClick={() => this.viewWo(item)} aria-hidden='true'></i></div> //Delete Button

            item.locationName = "";
            if (options.find(x => x.value === item.state)) {
              item.locationName += options.find(x => x.value === item.state).label
              item.locationName += ', '
            }
            item.locationName += item.state;
            item.ETAname = moment(item.ETA).isValid() ? moment(item.ETA).format("DD-MM-YYYY hh:mm") : "--"
            item.UDatename = moment(item.UDate).isValid() ? moment(item.UDate).format("DD-MM-YYYY hh:mm") : "--"

          }
          this.setState({
            data: {
              columns: columns,
              rows: res
            },
            originaldata: {
              columns: columns,
              rows: res
            }

          },()=>{
            this.filterData()
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
  editWo = (item) => {
    this.props.openForm(item)
  }
  viewWo = (item) => {
    this.props.openForm({...item, viewMode:true})
  }
  loadUpdates() {
    let columns = [
      {
        label: 'Id',
        field: 'id',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Workorder',
        field: 'wo',
        sort: 'asc',
        width: 800
      },
      {
        label: 'Description',
        field: 'description',
        sort: 'asc',
        width: 800
      },
      {
        label: 'Sender',
        field: 'creator',
        sort: 'asc',
        width: 800
      },

    ];
    let _data = {
      username: localStorage.getItem('username'),
      wo: this.state.id,
    };

    axios({
      method: "post",
      url: `${DB_Link}updates_read.php`,
      data: JSON.stringify(_data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        const res = response.data.body;
        if ((res === null) || (res === undefined)) {
          this.setState({
            updatesdata: {
              columns: columns,
              rows: []
            },
          });
        } else {
          this.setState({
            updatesdata: {
              columns: columns,
              rows: res
            },
            loader: 'none',
            tbl: ''
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

  loadDropdown() {
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
          dispatchersList: res.dispatchersList,
          typesList: res.typesList,
          statusList: res.statusList,
          priorityList: res.priorityList,
          clientsList: res.clientsList
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
  changeStatus(e) {
    let _data = {
      id: e.id,
    };

    axios({
      method: "post",
      url: `${DB_Link}wo_status.php`,
      data: JSON.stringify(_data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        const res = response.data;
        if (res === null) {

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
          if (res.status !== 200) {
            toast.error(res.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

          } else {
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
            this.loadWo()
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
    this.loadWo()
    this.loadDropdown()

  }
  show_update(item) {
    this.setState({
      id: item.Id,
      updatesDispatcher: item.dispatcher
    }, () => {
      this.loadUpdates()
      this.toggle()

    })
  }

  addWo = (e) => {
    let _data = {
      id: this.state.id,
      name: this.state.name,
      creator: localStorage.getItem('username')
    };

    axios({
      method: "post",
      url: this.state.editing === 0 ? `${DB_Link}wo_create.php` : `${DB_Link}wo_update.php`,
      data: JSON.stringify(_data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        const res = response.data;
        if (res === null) {

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
          if (res.status !== 200) {
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

          } else {
            let msg = this.state.editing === 0 ? "Type Added" : "Type Updated";
            toast.success(msg, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            this.loadWo()
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
  }

  addUpdates = (e) => {
    e.preventDefault()
    let _data = {
      wo: this.state.id,
      description: this.state.updatesDescription,
      dispatcher: this.state.updatesDispatcher,
      creator: localStorage.getItem('username')
    };

    axios({
      method: "post",
      url: `${DB_Link}updates_create.php`,
      data: JSON.stringify(_data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        const res = response.data;
        if (res === null) {

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
          if (res.status !== 200) {
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

          } else {
            let msg = this.state.editing === 0 ? "Updates Added" : "Updates Updated";
            toast.success(msg, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            this.setState({ updatesDescription: "" }, () => {
              this.loadUpdates()
            })
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


  handleText = (e) => {
    const value = e.target.value;
    this.setState({
      [e.target.id]: value
    });
  }
  seeTechnicians = () =>{
    this.setState({
      showTechnician:!this.state.showTechnician
    },()=>{
      if(this.state.showTechnician){
        let columns = [
          
          {
            label: 'Technician',
            field: 'techVen',
            sort: 'asc',
            width: 800
          },{
            label: 'Type',
            field: 'typename',
            sort: 'asc',
            width: 800
          },
    
          {
            label: 'Location',
            field: 'locationName',
            sort: 'asc',
            width: 600
          },

          {
            label: 'Status',
            field: 'statusname',
            sort: 'asc',
            width: 800
          },
          {
            label: 'Dispatcher',
            field: 'dispatchername',
            sort: 'asc',
            width: 500
          },
    
        ];
        let newData = cloneDeep(this.state.originaldata)
        newData.rows = newData.rows.filter(item => item.techVen !== '');
        let ToExport=[ ['Technician','Type','Location','Status','Dispatcher']];
        newData.rows.forEach(element => {
          let arr =[
              element.techVen ,
              element.typename,
              element.locationName,
             element.statusname,
             element.dispatchername]
             ToExport.push(arr)
          })
          this.setState({toExport:ToExport})
        this.setState({  data: {
          columns: columns,
          rows:  newData.rows
        },})
      }
      else{
        this.loadWo()
      }
    })
  }
  filterData = () =>{
    let newData = cloneDeep(this.state.originaldata)
    if(this.state.openWoFilter===1 ){
      if(localStorage.getItem('Role')!=='4'){
      newData.rows = newData.rows.filter(item => !['Job Done','Invoiced','Canceled'].includes(item.statusname) );
      }else{
        newData.rows = newData.rows.filter(item => ['Job Done'].includes(item.statusname) );
      }
    }
    let ToExport=[ ['Wo #','Type','Store','Location','ETA','Priority','Status', 'Latest Update', 'Dispatcher']];
    if(this.state.typesFilter){
      newData.rows = newData.rows.filter(item => item.type ===this.state.typesFilter.value);
    }
    if(this.state.statusFilter){
      newData.rows = newData.rows.filter(item => item.status ===this.state.statusFilter.value);
    }
    if(this.state.clientsFilter){
      newData.rows = newData.rows.filter(item => item.client ===this.state.clientsFilter.value);
    }
    if(this.state.priorityFilter){
      newData.rows = newData.rows.filter(item => item.priority ===this.state.priorityFilter.value);
    }
    if(this.state.dispatchersFilter){
      newData.rows = newData.rows.filter(item => item.dispatcher ===this.state.dispatchersFilter.value);
    }
    if(this.state.fromDate){
      newData.rows = newData.rows.filter(item => moment(item.UDate).diff(this.state.fromDate, 'minutes')>1);
    }
    if(this.state.toDate){
      newData.rows = newData.rows.filter(item => moment(item.UDate).diff(this.state.toDate, 'minutes')<1);
    }
    let pieChartData=[['Dispatcher', 'Wo ']]
    let pieChartStatusData=[['Status', 'Wo ']]
    let pieChartStatesData=[['States', 'Wo ']]

    newData.rows.forEach(element => {
        let arr =[
            element.Id ,
            element.typename,
            element.store,
            element.locationName,
            element.ETAname,
            element.priorityname,
           element.statusname,
            element.UDatename,
           element.dispatchername]
           ToExport.push(arr)
           if(localStorage.getItem('Role')==='3'){
          if(pieChartData.find(chart => chart[0]===element.dispatchername)){
             pieChartData[pieChartData.findIndex(chart => chart[0]===element.dispatchername)]  = [element.dispatchername , pieChartData.find(chart => chart[0]===element.dispatchername)[1]+1]
          }else{
            pieChartData.push([element.dispatchername,1])
          }
          if(pieChartStatusData.find(chart => chart[0]===element.statusname)){
            pieChartStatusData[pieChartStatusData.findIndex(chart => chart[0]===element.statusname)]  = [element.statusname , pieChartStatusData.find(chart => chart[0]===element.statusname)[1]+1]
         }else{
           pieChartStatusData.push([element.statusname,1])
         }
         if(pieChartStatesData.find(chart => chart[0]===element.state)){
          pieChartStatesData[pieChartStatesData.findIndex(chart => chart[0]===element.state)]  = [element.state , pieChartStatesData.find(chart => chart[0]===element.state)[1]+1]
       }else{
         pieChartStatesData.push([element.state,1])
       }
      }
    });
    this.setState({pieChartData:pieChartData,pieChartStatusData:pieChartStatusData,pieChartStatesData:pieChartStatesData})
    this.setState({toExport:ToExport})
    this.setState({data:newData})
  }
  handleChange = (e, state) => {
    this.setState({
      [state]: e
    },()=>{
      this.filterData();
    })
  };
  render() {
    return (
      <div style={{ maxWidth: '100%' }}>
        <ToastContainer />
 
        <span className="Title">
          Workorders
          <span className="addNew" style={localStorage.getItem('Role')==='4' || this.state.showTechnician?{display:'none'}:{}} onClick={() => { this.props.openForm({}) }}>
            <i className="fa fa-plus-circle" aria-hidden="true"></i>
          </span>
          <span className="addNew" onClick={() => { this.seeTechnicians({}) }}>
            <i className={!this.state.showTechnician?"fa fa-wrench":"fa fa-tasks"}  aria-hidden="true"></i>
          </span>
          <span className="addNew" style={localStorage.getItem('Role')!=='3' || this.state.showTechnician ?{display:'none'}:{}} onClick={() => { this.setState({showTable:!this.state.showTable}) }}>
          <i className={this.state.showTable?"fa fa-bar-chart":"fa fa-tasks"} aria-hidden="true"></i>          </span>
          <div onClick={()=>{this.setState({showFilter:!this.state.showFilter})}} style={(this.state.typesFilter || this.state.statusFilter || this.state.clientsFilter || this.state.priorityFilter || this.state.dispatchersFilter|| this.state.toDate|| this.state.fromDate)?{color:"red"}:{}}className="filter-button">
        <i className="fa fa-filter" aria-hidden="true"></i>
        </div>
        </span>
        <CSVLink 
          filename={"honestfixers.csv"}
          className="addNew download-button"
        onClick={()=>{
                  toast.success('Sheet Downloaded', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
        }} data={this.state.toExport}>
<i className="fa fa-download" aria-hidden="true"></i>
  
          
          </CSVLink>
         <span className="addNew Title text-warning "  style={ this.state.showTechnician ?{display:'none'}:{}} onClick={() => { this.setState({openWoFilter: this.state.openWoFilter ===0? 1 : 0},()=>{this.loadWo()}) }}>
            <i className={this.state.openWoFilter===1?"fa fa-toggle-on":"fa fa-toggle-off"} aria-hidden="true"></i>
            <span className="toggleText text-warning " > Showing {this.state.openWoFilter===1?"  Open Wo":"  All Wo"}</span>
          </span>
 
        <div className="container" style={!this.state.showFilter?{display:'none'}:{}}>
<br />
<br />
          <div className="row">
          <div className="col-7">
</div>
            <div className="col-2">
            Dispatcher:
</div>
            <div className="col-3">
            <Select
          id="dispatchersFilter"
          isClearable={true}
          value={this.state.dispatchersFilter}
          onChange={(e) => { this.handleChange(e, 'dispatchersFilter') }}
          options={this.state.dispatchersList}

        />
            </div>
          </div>
          <div className="row">
            <div className="col-7">
    
            </div>
            <div className="col-2">
            Status:
</div>
            <div className="col-3">
            <Select
          id="statusFilter"
          isClearable={true}
          value={this.state.statusFilter}
          onChange={(e) => { this.handleChange(e, 'statusFilter') }}
          options={this.state.statusList}

        />
            </div>
          </div>
          <div className="row">
            <div className="col-7">

            </div>
            <div className="col-2">
            Priority:
</div>
            <div className="col-3">
            <Select
          id="priorityFilter"
          isClearable={true}
          value={this.state.priorityFilter}
          onChange={(e) => { this.handleChange(e, 'priorityFilter') }}
          options={this.state.priorityList}

        />
            </div>
          </div>
          <div className="row">
          <div className="col-1">
From:
            </div>
            <div className="col-2">
            <DateTimePicker
        onChange={(e)=>{this.onDateChange(e,'fromDate')}}
        format="dd-MM-yyyy hh:mm"
        value={this.state.fromDate}
      />
            </div>
            <div className="col-1">
To:
</div>
<div className="col-2">
<DateTimePicker
onChange={(e)=>{this.onDateChange(e,'toDate')}}
format="dd-MM-yyyy hh:mm"
value={this.state.toDate}
/>
</div>
<div className="col-1">
  
</div>
            <div className="col-2">
            Types:
</div>
            <div className="col-3">
            <Select
          id="typesFilter"
          isClearable={true}
          value={this.state.typesFilter}
          onChange={(e) => { this.handleChange(e, 'typesFilter') }}
          options={this.state.typesList}

        />
            </div>
          </div>
        
        </div>
  
        <div className="tableGrid" style={!this.state.showTable?{display:'none'}:{}}>
          <MDBDataTable
            striped
            bordered
            responsive={true}
            hover
            data={this.state.data}
          />
        </div>
        <div className="tableGrid" style={this.state.showTable?{display:'none'}:{}}>
          <div className="container">
          <div className="row">
            <div className="col-md-6 col-12">
        <Chart
  width={'100%'}
  className="chart-Pie"
  height={'350px'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={this.state.pieChartData?this.state.pieChartData:[]}
  options={{
    title: 'Wo Dispatchers',
    backgroundColor :"#ededed",
    is3D: true,
  }}
  rootProps={{ 'data-testid': '2' }}
/>
</div>
<div className="col-md-6 col-12">
        <Chart
        className="chart-Pie"
  width={'100%'}
  height={'350px'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={this.state.pieChartStatusData?this.state.pieChartStatusData:[]}
  options={{
    title: 'Wo Status',
    // Just add this option
    backgroundColor :"#ededed",
    is3D: true,
  }}
  rootProps={{ 'data-testid': '2' }}
/>
</div>

</div>
<div className="row">
  <div className="col-md-3 col-12">

  </div>
  <div className="col-md-6 col-12">
    <Chart
        className="chart-Pie"
  width={'100%'}
  height={'350px'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={this.state.pieChartStatesData?this.state.pieChartStatesData:[]}
  options={{
    title: 'Wo States',
    // Just add this option
    backgroundColor :"#ededed",
    is3D: true,
  }}
  rootProps={{ 'data-testid': '2' }}
/>
</div>
</div>
</div>
        </div>
        <MDBContainer>

          <MDBModal isOpen={this.state.modal} size='lg' toggle={this.toggle} >
            <MDBModalHeader toggle={this.toggle}> Update</MDBModalHeader>
            <MDBModalBody>

              <div className="container"  >
                <form onSubmit={(e) => { this.addUpdates(e) }}>
                  <div className="row">
                    <div className="col-8">
                      <input type="text" id="updatesDescription" value={this.state.updatesDescription} placeholder="Add new Updates" onChange={this.handleText} className="form-control form-control-lg" />
                    </div>

                    <div className="col-4" align="center">
                      <button type="submit" onClick={(e) => { this.addUpdates(e) }} className="login100-form-btn submitButn">
                        Submit
                      </button>

                    </div>
                  </div>
                </form>
              </div>

              <div className="tableGrid">

                <MDBDataTable
                  striped
                  bordered
                  responsive={true}
                  hover
                  data={this.state.updatesdata}
                />

              </div>

            </MDBModalBody>
            <MDBModalFooter>

            </MDBModalFooter>
          </MDBModal>
        </MDBContainer>
      </div>

    );
  }
}
export default Wo;