import React, {Component} from 'react'
import {
    TheFooter,
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
let round_id;
class Detail extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	data:{},
        	userListInvite:[],
        	userListInviteSearch:'',
        	inviteFriendsModel:true,
        	inviteModel:false,
        	inviteUsersModel:false
		};
	}

	componentDidMount(){

		var url = window.location.href;
        

        round_id =url.substring(url.lastIndexOf('/') + 1);

		fetch(configuration.baseURL+"individual/getTrending?round_id="+round_id, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
                }
            }).then((response) =>{
	    	return response.json();
	    }).then((data)=> {
	   		if (data.data.length > 0) {
		   		this.setState({data:data.data[0]});
		   	}
		   	else
		   	{
		   		this.props.history.push('/dashboard');
		   	}
		});

	}

	render() {
		return (
			<>
				<TheHeaderInner />		
				<ToastContainer position="top-right" autoClose={25000} style={{top:'80px'}}/>		
					<main id="main">
		            <section id="hero" className="d-flex align-items-center">
		                <div className="hero-img" style={{width:'100%'}}>
		                    <img src={(this.state.data.image !== '') ? this.state.data.image : "./avatars/placeholder.png"} className="img-fluid animated" alt="" />
		                </div>
		            </section>
		            
		            <section className="main">
		                <div className="">
		                    <div className="startgame pr-300">
		                        <div className="row">
		                            <div className="col-lg-12 col-md-12">
		                                <div className="inline">
		                                    <h5 style={{paddingTop: '30px'}}>{this.state.data.title}</h5>
		                                    <p style={{paddingTop: '30px'}}>{this.state.data.description}</p>
		                                </div>
		                            </div>
		                        </div>
		                    </div>
		                </div>
		            </section>
		        </main>
		    </>
		)
	}
}

export default Detail
