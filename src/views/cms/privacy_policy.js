import React, {Component} from 'react'
import {
    TheFooter,
    TheHeader,
    TheHeaderInner
} from '../../containers/index'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import languages from '../../languages';
import configuration from '../../config';
import {reactLocalStorage} from 'reactjs-localstorage';
import {
    CModal,
    CModalBody,
  } from '@coreui/react';
let contestId,roomId;
class PrivacyPolicy extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	data:{}
		};
	}
	componentDidMount(){
	
		fetch(configuration.baseURL+"cms/cms?cmsCode=PRIVACY_POLICY", {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
                }
            }).then((response) =>{
	    	return response.json();
	    }).then((data)=> {
	    	if (data.data) {
		   		this.setState({data:data.data});
		   	}
		}).catch((error)=>{
			console.log("error")
			console.log(error)
		});	

		
	}


	createMarkup(text) { return {__html: this.state.data.description}; };

	render() {
		return (
			<>
				{ reactLocalStorage.get('is_login') === 'true' ? (<TheHeaderInner/>):(<TheHeader/>) }	
				<ToastContainer position="top-right" autoClose={25000} style={{top:'80px'}}/>		
				<main id="main">
			            <section>
			            <div class="container">
			                    <div class="create-contest">
			                        <div class="contest-title">
			                            <div class="row">
			                                <div class="col-md-12">
			                                    <div class="main_title">
			                                        <h3>Privacy Policy</h3>  
			                                    </div> 
			                                </div>
			                            </div>
			                        </div>
			                    </div>
			                    <div class="contest-info">
			                        <div class="row cms_box">
			                            <div class="col-12">
			                               <div class="text" dangerouslySetInnerHTML={this.createMarkup()} />
			                            </div>
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

export default PrivacyPolicy
