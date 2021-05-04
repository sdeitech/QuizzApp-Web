import React, {Component} from 'react'
import {
    TheFooter,
    TheSidebarInner,
    TheHeaderInner
} from '../../containers/index'
import {reactLocalStorage} from 'reactjs-localstorage';
import configuration from '../../config';
import {
    CModal,
    CModalBody,
  } from '@coreui/react';
  import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
var jwt = require('jsonwebtoken');

class Plans extends Component {
	constructor(props) {
        super(props);
        this.state = { 
            data:{},
            plans:[],
            purchaseModel:false,
            listData:[],
            fields:{subscriptionId:'',card_id:''},
            errors:{card_id:''},
		};
	}

	componentDidMount(){
        var userId = JSON.parse(reactLocalStorage.get('userData')).userId;
        fetch(configuration.baseURL+"subscription/getusersubscription?userId="+userId, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
                }
            }).then((response) =>{
            return response.json();
        }).then((data)=> {
            if(data)
            {
                var res = data.data;
                this.setState({data:res.currentPlan,plans:res.plans});
            }
        });
        
        const postdata = {user_id:userId,type:'list'};
        fetch(configuration.baseURL+"card/managecards", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
                },
                body:JSON.stringify(postdata)
            }).then((response) =>{
            return response.json();
        }).then((data)=> {
            if (data.data) {
                this.setState({ listData:data.data});    
            }
        }); 

    }

    handlePurcaseClick(subscriptionId){
        if(this.state.listData.length === 0)
        {
            this.props.history.push('/add_card')  
        }
        let fields = this.state.fields;
        fields['subscriptionId'] = subscriptionId;
        
        for (var i = 0; i < this.state.listData.length; i++) {
            if(this.state.listData[i].is_default === true)
            {
                fields['card_id'] = this.state.listData[i].id;
            }
        } 
        
        this.setState({fields});
        this.setState({purchaseModel:true});        
    }

    clickHandle(card_id)
    {
        let fields = this.state.fields;
        for (var i = 0; i < this.state.listData.length; i++) {
            if(card_id === this.state.listData[i].id)
            {
                fields['card_id'] = this.state.listData[i].id;
            }
        }    
        this.setState({fields});
    }

    handlePurcaseSubmitClick(){
        var userId = JSON.parse(reactLocalStorage.get('userData')).userId;
        
        let fields = this.state.fields;
        let formIsValid = true;

        let errors = {};
        if(fields["card_id"] !== undefined && fields["card_id"].trim() === ''){
            errors["card_id"] = "Please select card";
            formIsValid = false;
        }

        this.setState({errors: errors});

        if(!formIsValid){
            return false;
        }

        fields['user_id'] = userId;
        const postdata = fields;
        fetch(configuration.baseURL+"subscription/addusersubscription", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
                },
                body:JSON.stringify(postdata)
            }).then((response) =>{
            return response.json();
        }).then((data)=> {
            
            this.setState({purchaseModel:false,fields:{subscriptionId:''},errors:{card_id:''}}); 
            this.componentDidMount();
        }); 

    }
    
	render() {
		return (
			<>
				<TheHeaderInner />				
					<main id="main">
                    <ToastContainer position="top-right" autoClose={25000} style={{top:'80px'}}/>
                    <section id="contest" class="d-flex align-items-center">
                        <div class="container">
                            <div class="create-contest">
                                <div class="contest-title">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="main_title">
                                                <h3>My Plan</h3>  
                                            </div> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{paddingBottom: '30px'}} class="contest-info">
                                {
                                    (this.state.data) ? 
                                        <div>
                                            <div class="row">
                                                <div style={{backgroundColor: '#324B55'}} class="col-md-12">
                                                    <div  class="plan-detail">
                                                        
                                                        <p>Your Current Plan is</p> 
                                                        {
                                                            (Object.keys(this.state.data).length !== 0) ? 
                                                            <h3>{this.state.data.subscriptionCode}</h3>
                                                            : 
                                                            <h3>BASIC</h3>
                                                        }
                                                        { (Object.keys(this.state.data).length !== 0 && this.state.data.subscriptionCode !== 'BASIC') ? <h6>Your plan expires on: {this.state.data.expired}</h6> : null }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    : null
                                }
                                
                                <div class="row">
                                    {
                                        this.state.plans.map((val1, ckey1) => {
                                            return <div class="col-lg-4 col-md-6 col-sm-6">
                                                <div class={"main_plan "+ val1.subscriptionCode.toLowerCase()}>
                                                    <h3>{val1.title}</h3>
                                                    <h5>${val1.price}</h5>
                                                    <p>{val1.description}</p>
                                                    {(val1.isActive === false && val1.subscriptionCode !== 'BASIC') ? <button type="button" onClick={this.handlePurcaseClick.bind(this,val1._id)}>Purchase</button> : null}
                                                    {(val1.subscriptionCode === 'BASIC') ? <button type="button">Free</button> : null}
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                            
                        </div>
                    </section>   
                    <CModal show={this.state.purchaseModel}  closeOnBackdrop={false}  onClose={()=> this.setState({purchaseModel:false})}
                    color="danger" 
                    centered>
                        <CModalBody className="model-bg">

                        <div>
                            <div className="modal-body">
                                
                                <button type="button" className="close" onClick={()=> this.setState({purchaseModel:false})}>
                                    <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
                                </button>
                                <div className="model_data">
                                    <div className="model-title">
                                        <h3>Purchase Plan</h3> 
                                    </div>

                                    <div class="col-md-12" style={{paddingTop: '20px'}}>
                                                    
                                        <ul class="clearfix ">
                                            {

                                            (this.state.listData.length > 0) ? 
                                            this.state.listData.map((e, key) => {
                                                return <li class="payment_select edit-delivery-address">
                                                        <label class="container_radio">**** **** **** { e.last4 }
                                                            <input type="radio" value="" name="payment_method" onClick={this.clickHandle.bind(this,e.id)} checked={this.state.fields['card_id']===e.id? 'checked' : ''} />
                                                            <span class="checkmark"></span>
                                                        </label>
                                                        <img src={'./murabbo/img/'+(e.brand.toLowerCase()).replace(/\s/g, '-')+'.png'} class="icon_visa" />
                                                    </li>
                                            }) : 
                                            <li class="payment_select edit-delivery-address">
                                                <label>No data found</label>
                                            </li>
                                            }  
                                            
                                        </ul>
                                    </div>
                                    <div class="col-md-12" style={{paddingTop: '20px'}} style={{textAlign:'center'}}>
                                        <span className="error-msg" style={{bottom:'10px'}}>{this.state.errors["card_id"]}</span>
                                    </div>
                                    <div style={{textAlign:'center'}} className="col-md-12">
                                        <button style={{minWidth: '150px',marginRight:'10px'}}  className="blue_btn light_blue_btn" type="button"  onClick={this.handlePurcaseSubmitClick.bind(this)} >Submit</button>
                                        <button style={{minWidth: '150px',marginRight:'10px'}} className="pink_btn" type="button"  onClick={() => this.setState({purchaseModel:false,fields:{subscriptionId:''},errors:{subscriptionId:''}})} >Cancel</button>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </CModalBody>
                    </CModal> 
                    </main>
                <TheFooter />
		    </>
		)
	}
}

export default Plans
