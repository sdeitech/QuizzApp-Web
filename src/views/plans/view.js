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
            plans:[]
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
                                                        <h3>{this.state.data.subscriptionCode}</h3>
                                                        <h6>Your plan expires on: {this.state.data.expired}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div  class="plan-detail2">
                                                        <p>45 Games.</p>
                                                        <p>The Plan that suits you.</p>
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
                                                    <h5>{val1.subscriptionCode}</h5>
                                                    <p>-</p>
                                                    {(val1.isActive === false) ? <button type="button">Purchase</button> : null}
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                            
                        </div>
                    </section>    
                    </main>
                <TheFooter />
		    </>
		)
	}
}

export default Plans
