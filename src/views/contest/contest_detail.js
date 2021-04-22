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
class DetailContest extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	data:{},
        	contestData:{image:''},
        	show:true,
        	listArr:[],
        	RoomListArr:[],
        	selectedRoundId:'',
        	errorsPlay:{},
			fieldsPlay:{display_name:'',password:''},
			playNewContestModel:false,
			playContestModel:false,
			playOldContestModel:false,
			searchTerm:'',
			page:0,
			size:1
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
	    		console.log(data.data[0]);
		   		this.setState({contestData:data.data[0]});
		   	}
		});
		
		
		this.roomList();
		this.getList(contestId);
	}
	
	roomList()
	{		
		fetch(configuration.baseURL+"room/room?contestId="+contestId+"&page="+this.state.page+"&size="+this.state.size, {
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
				this.setState({RoomListArr:data.data});
			}
		});
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

	joinRoomHandler(data){
		this.props.history.push('/detail-contest/'+contestId+'?'+data._id);	
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
        	data.append('contestId',fields["contestId"]) ;
            
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


	search(term){
		if (term !== '') {
    		term = term.target.value;
    		this.setState({searchTerm: term});
    	}

		// fetch(configuration.baseURL+"category/categoryList", {
		// 		method: "GET",
		// 		headers: {
		// 			'Accept': 'application/json',
		// 			'Content-Type': 'application/json',
		// 			'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
		// 		}
		// 	}).then((response) =>{
		// 	return response.json();
		// }).then((data)=> {
		// 	var category = data.data;
		// 	this.setState({filterCategoryList:category});
		// });
		
	}

	render() {
		return (
			<>
				<TheHeaderInner />		
				<ToastContainer position="top-right" autoClose={10000} style={{top:'80px'}}/>		
					<main id="main">
						<div className="container">
						<div className="contest-detail-with-round">

						<div class="row">
						
							<div class="col-lg-12 col-md-1 col-12">
								<div class="cate-box2" >
									<img src='img/undo.svg' className="undo_btn" onClick={() => {this.props.history.push('/dashboard')}}/>
									<img src={(this.state.contestData.image !== '') ? this.state.contestData.image : 'avatars/placeholder.png' } alt="Game" className="main"/>
									<div class="cat_title2">
										<div className="detailContestWithRoundList">
										<div className="row">
											<div class="cat_title2 col-lg-12 col-md-12">

												<h3 style={{paddingLeft: '0px'}}>{this.state.contestData.title}</h3>
												<p>{this.state.contestData.description}</p> 													
											</div>
											<div class="col-lg-12 col-md-12 align-self-center mb-3">
												<button style={{minWidth: '150px'}} class="blue_btn" type="button" onClick={this.playContest.bind(this)}>Play</button>
											</div>                         
										</div>
									</div>
									</div>
								</div>
							</div>
						</div>
		            </div>
					</div>
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
							                    <button  style={{minWidth: '250px',marginBottom: '10px'}}  className="blue_btn light_blue_btn" type="button" onClick={()=> this.setState({playContestModel:false,playOldContestModel:true})}>Pick a Room</button>
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
					
					<CModal show={this.state.playOldContestModel}  closeOnBackdrop={false}  onClose={()=> this.setState({playOldContestModel:false})}
                    color="danger" 
                    centered>
                        <CModalBody className="model-bg">

                        <div>
                            <div className="modal-body">
                                <button type="button" className="close"   onClick={()=> this.setState({playOldContestModel:false})}>
                                <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
                            </button>
                                <div className="model_data">
                                    <div className="model-title">
                                    	<h3>Rooms</h3>
                                    </div>
                                    <img className="shape2" src="./murabbo/img/shape2.svg"/>
                                    <img className="shape3" src="./murabbo/img/shape3.svg"/>
                                    <div class="row search" style={{marginBottom:'20px'}}>
										<input type="text" placeholder="Search"  value={this.state.searchTerm} onChange={this.search.bind(this)}  />
										<i className='bx bx-search' ></i>
									</div>                              	
										{ 
											(this.state.RoomListArr.length > 0) ?
												
												this.state.RoomListArr.map((e, key) => {
													return <div className="row" style={{marginTop:'10px',paddingBottom: '10px',borderBottom: '1px solid #fff'}}><div className="col-md-8"><p style={{color:"#FFC542"}}>{e.displayName}
														<span style={{width: "100%",float: "right", font: 'normal normal 300 14px Montserrat',letterSpacing: '0px',color: '#FFFFFF'}}>{e.createdByName}</span></p>
														</div> <div className="col-md-4">
															<button type="button" className="yellow_btn" style={{float: 'right'}} onClick={this.joinRoomHandler.bind(this,e)}>Join</button>
														</div></div>
												})
												: 
												(
													<div style={{color:'white',width: '100%',textAlign:'center',marginTop:"85px",marginBottom:"85px"}} className="flex"><p className="item-author text-color">No have any room</p></div>
												)
										}
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

export default DetailContest
