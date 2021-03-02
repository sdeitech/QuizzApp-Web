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
import $ from 'jquery';
let contestId;
class DetailContestWithRoundList extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	data:{},
        	contestData:{},
        	show:true,
        	listArr:[],
        	selectedRoundId:'',
        	errorsPlay:{},
			fieldsPlay:{display_name:'',password:''},
			playNewContestModel:false,
			playContestModel:false,
		};
	}

	componentDidMount(){

		var url = window.location.href;
        contestId = url.substring(url.lastIndexOf('/') + 1);
		fetch(configuration.baseURL+"contest/contest?contestId="+contestId, {
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
		   		this.setState({contestData:data.data[0]});
		   	}
		});	
		this.getList(contestId);
	}

	getList(contest_id1)
	{
		if (contest_id1) {
			fetch(configuration.baseURL+"round/round?contestId="+contest_id1, {
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
	   				var data = data.data;
		   			this.setState({listArr:data});
	   			}
	   			else
	   			{
		   			this.setState({listArr:[]});
	   			}
			});	
		}
	}
	selectedRoundId(data)
	{
		if (this.state.contestData.isPublish) {
			if (data.totalQuestions === 0) {
				return toast.error('There are no have any question in this round!');
			}

			if (this.state.selectedRoundId === data._id) {
				this.setState({selectedRoundId:''});
			}
			else
			{
				this.setState({selectedRoundId:data._id});
			}
		}
		else
		{
	        return toast.error('Contest is not publish,you can not play yet!');
		}
		
	}

	playContest(){
		if (this.state.contestData.playerType === 1) {
			this.props.history.push('/contests/game/start/'+contestId+"?"+this.state.selectedRoundId);
		}
		else
		{
			this.setState({playContestModel:true,errorsPlay:{display_name:'',password:''},fieldsPlay:{display_name:'',password:'',contestId:contestId}})	
		}
		
	}


	handleChangePlay(field, e){  
       let fields = this.state.fieldsPlay;
    	fields[field] = e.target.value;
    	this.setState({fieldsPlay:fields});

    	let errors = {};
        if(field === 'display_name' && fields["display_name"].trim() === ''){
            errors["display_name"] = "Please enter Display Name";
        }

        if(field === 'password' && fields["password"].trim() !== '' && fields["password"].length < 6){
            errors["password"] = "Please Game Password minimum size must be 6";
        }
        this.setState({errorsPlay: errors});

    }


    handleNext(){
    	let fields = this.state.fieldsPlay;
		let errors = {};
        let formIsValid = true;
        if(fields["display_name"].trim() === ''){
            formIsValid = false;
            errors["display_name"] = "Please enter Display Name";
        }

        if(fields["password"].trim() !== '' && fields["password"].length < 6){
            errors["password"] = "Please Game Password minimum size must be 6";
        }

        this.setState({errorsPlay: errors});
		if(formIsValid){ 
			
			const data = new FormData();
        	data.append('displayName',fields["display_name"]);
        	data.append('password',fields["password"]);
        	data.append('createdBy',JSON.parse(reactLocalStorage.get('userData')).userId);
        	data.append('contestId',fields["contestId"]);
            
            fetch(configuration.baseURL+"room/room", {
                method: "post",
                headers: {
					'contentType': "application/json",
                    'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
                },
                body:data
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if(data.code === 200){
					this.props.history.push('/detail-contest/'+fields["contestId"]+'?'+data.data._id);
                }
                else
                {
                    return toast.error(data.message);
                }
                
            });

		}
	}

	render() {
		return (
			<>
				<TheHeaderInner />		
				<ToastContainer position="top-right" autoClose={10000} style={{top:'80px'}}/>		
					<main id="main">
		            <section id="hero" className="d-flex align-items-center">
		                <div className="hero-img" style={{width:'100%'}}>
		                    <img src={(this.state.contestData.image !== '') ? this.state.contestData.image : "./avatars/placeholder.png"} className="img-fluid animated" alt="" />
		                </div>
		            </section>
		            
		            <section className="main">
		                <div className="">
		                    <div className="startgame detailContestWithRoundList">
		                        <div className="row">
		                            <div class="col-lg-10 col-md-8">
		                                <div className="inline">
		                                    <h5 style={{paddingLeft: '0px'}}>{this.state.contestData.title}</h5>
		                                </div>
		                                <p>{this.state.contestData.description}</p> 
		                                <div className="accordion-wrapper" >
		                                    <div className={(this.state.show) ? 'acc-head p-3 rounded-0 acc-title active' : 'acc-head p-3 rounded-0 acc-title'} onClick={()=> this.setState({show:!this.state.show})}>
		                                      View Round Detail
		                                    </div>
		                                    {
		                                    	(this.state.show) ? 
		                                    	<div style={{padding:'10px 0'}} className="rounded-0">
			                                        <div className="mathsqua">
			                                        { 
					                                	(this.state.listArr.length > 0) ?
						                                	
								                        	this.state.listArr.map((e, key) => {
					                                            return 	<button type="button" className={(this.state.selectedRoundId === e._id) ? 'active' : ''} onClick={this.selectedRoundId.bind(this,e)}>{(e.title !== '') ? e.title : e.gameType} <span>({e.totalQuestions} {(e.totalQuestions > 1) ? 'Questions' : 'Question'})</span></button>
				                                        	})
								                            : 
													        (
													        	<div style={{color:'white',width: '100%',textAlign:'center',marginTop:"85px",marginBottom:"85px"}} className="flex"><p className="item-author text-color">No have any round</p></div>
													        )
			                        				}
			                                        </div>
		                                    	</div> : null
		                                    }
		                                    
		                                </div>
		                            </div>
		                            {(this.state.selectedRoundId) ? <div class="col-lg-2 col-md-4 align-self-center">
	                                	<button style={{minWidth: '150px'}} class="blue_btn" type="button" onClick={this.playContest.bind(this)}>Play</button>
	                            	</div> : null }		                            
		                        </div>
		                    </div>
		                </div>
		            </section>

		            <CModal show={this.state.playContestModel}  closeOnBackdrop={false}  onClose={()=> this.setState({playContestModel:false})}
                    color="danger" 
                    centered>
                        <CModalBody className="model-bg">

                        <div>
                            <div className="modal-body">
                                <button type="button" className="close"   onClick={()=> this.setState({playContestModel:false})}>
                                <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
                            </button>
                                <div className="model_data">
                                    <div className="model-title">                                	

                                    </div>
                                    <img className="shape2" src="./murabbo/img/shape2.svg"/>
                                    <img className="shape3" src="./murabbo/img/shape3.svg"/>
                                    <div className="row">
                                        <div className="col-md-10 offset-md-1">
                                			<div style={{ textAlign: 'center'}} className="">
							                    <button  style={{minWidth: '250px',marginBottom: '10px'}}  className="blue_btn light_blue_btn" type="button" >Pick a Room</button>
							                </div>
							                <div style={{ textAlign: 'center'}} className="">
							                   	<button  style={{minWidth: '250px',marginBottom: '10px'}}  className="yellow_btn" type="button"  onClick={()=> this.setState({playContestModel:false,playNewContestModel:true})}>Play New</button>
							                </div>
                                        	<div style={{ textAlign: 'center'}} className="">
							                    <button  style={{minWidth: '250px',marginBottom: '10px'}}  className="pink_btn" type="button"  onClick={()=> this.setState({playContestModel:false})} >Cancel</button>
							                </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </CModalBody>
                    </CModal>

                    <CModal show={this.state.playNewContestModel}  closeOnBackdrop={false}  onClose={()=> this.setState({playNewContestModel:false})}
                    color="danger" 
                    centered>
                        <CModalBody className="model-bg">

                        <div>
                            <div className="modal-body">
                                <button type="button" className="close"   onClick={()=> this.setState({playNewContestModel:false})}>
                                <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
                            </button>
                                <div className="model_data">
                                    <div className="model-title">
                                    	<h3>Set Password</h3>
                                    	<h4>Password needs to be set for a private contest. Keeping it blank will make your contest Public to all.</h4>
                                    </div>
                                    <img className="shape2" src="./murabbo/img/shape2.svg"/>
                                    <img className="shape3" src="./murabbo/img/shape3.svg"/>
                                    <div className="row">
                                        <div className="col-md-10 offset-md-1">
                                        	
                                        	<div className="cus_input input_wrap">
                                                <img src="./murabbo/img/title.svg" /> 
												<input required type="text"  onChange={this.handleChangePlay.bind(this, "display_name")} value={this.state.fieldsPlay["display_name"]}/>
												<label>Display Name</label>
                                            </div> 
                                            <span className="error-msg">{this.state.errorsPlay["display_name"]}</span>

                                            <div className="cus_input input_wrap">
                                                <img src="./murabbo/img/password.svg" />
												<input required type="text"  onChange={this.handleChangePlay.bind(this, "password")} value={this.state.fieldsPlay["password"]}/>
												<label>Game Password</label>
                                            </div> 
                                            <span className="error-msg">{this.state.errorsPlay["password"]}</span>
                                        </div>
                                        <div className="col-md-10 offset-md-1">

							                <div style={{ textAlign: 'center' , float:'left',marginRight:'10px' }} className="">
							                   	<button  style={{minWidth: '150px'}}  className="blue_btn light_blue_btn" type="button"  onClick={this.handleNext.bind(this)}>Next</button>
							                </div>
                                        	<div style={{ textAlign: 'center'}} className="">
							                    <button  style={{minWidth: '150px', float:'left'}}  className="pink_btn" type="button"  onClick={()=> this.setState({playNewContestModel:false})} >Cancel</button>
							                </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </CModalBody>
                    </CModal>

		        </main>
		    </>
		)
	}
}

export default DetailContestWithRoundList
