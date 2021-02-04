import React, {Component} from 'react'
import {
    TheFooter,
    TheHeaderInner
} from '../../containers/index'
import configuration from '../../config';
import 'react-toastify/dist/ReactToastify.css';
import {reactLocalStorage} from 'reactjs-localstorage';
import {
    CModal,
    CModalBody,
  } from '@coreui/react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
let contest_id;
class RoundTray extends Component {
	constructor(props) {
        super(props);
        this.state = {
			fields:{timeLimit:1,execution_mode:1},
			errors:{},
			openModelRoundAdd:false,
			confirmationModel:false,
			openModel:false,
			qtyAdd:false,
			qty:1,
			timeLimit:1,
			delete_id:'',
			contest_id: "",
			listArr:[]
		};
	}

	componentDidMount(){
		var url = window.location.href;
        contest_id=url.substring(url.lastIndexOf('/') + 1);
		this.setState({contest_id:contest_id});
		this.getList(contest_id);
	}

	getList(contest_id1)
	{
		if (contest_id) {
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
				var data = data.data;
		   		this.setState({listArr:data});
			});	
		}
	}

	clickHandler(){
		this.setState({qtyAdd:!this.state.qtyAdd});
	}

	btnClickHandler(type,field = "",e){
		if (field === "timeLimit") {
			if(type === "minus")
			{
				var fields = this.state.fields;
				fields['timeLimit'] = (fields['timeLimit'] === 0) ? 0 : (fields['timeLimit'] - 1);
				this.setState({fields});
			}
			else
			{

				var fields = this.state.fields;
				fields['timeLimit'] = (fields['timeLimit'] === 300) ? 300 : (fields['timeLimit'] + 1);
				this.setState({fields});
			}
		}
		else
		{
			if(type === "minus")
			{
				var qty = this.state.qty;
				qty = (qty === 1) ? 1 : (qty - 1);
				this.setState({qty:qty});
			}
			else
			{

				var qty = this.state.qty;
				qty = (qty === 9) ? 9 : (qty + 1);
				this.setState({qty:qty});
			}
		}
		

	}

	submitHandler()
	{
		let qty = this.state.qty;
    	// console.log(JSON.parse(reactLocalStorage.get('userData')).userId);
    	const data = new FormData();
    	data.append('noOfRound',this.state.qty);
    	data.append('contestId',this.state.contest_id);
    	data.append('gameType','Quiz');
        
        // console.log(data);
        fetch(configuration.baseURL+"round/round", {
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
            	this.setState({qty:1,openModelRoundAdd:false});
            	this.getList(contest_id);
            }
            else
            {
                return toast.error(data.message);
            }
            
        });
        

	}

	deleteHandler(id = '',e)
	{
		if (this.state.delete_id) {
			fetch(configuration.baseURL+"round/round/"+this.state.delete_id, {
				method:"DELETE",
	            headers: {
					'contentType': "application/json",
	                'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
	            }
	        }).then((response) => {
	            return response.json();
	        }).then((data) => {
	            if(data.code === 200){
	            	this.getList(contest_id);
	            	this.setState({delete_id:'',confirmationModel:false});
	            }
	            else
	            {
	                return toast.error(data.message);
	            }
	            
	        });
	    }
	    else
	    {
	    	this.setState({delete_id:id,confirmationModel:true});

	    }
	}

	editHandler(data,e)
	{
		if (!data.timeLimit) {
			data.timeLimit = 0;
		}

		if (!data.basePoints) {
			data.basePoints = 0;
		}

		if (!data.negativeBasePoints) {
			data.negativeBasePoints = 0;
		}
		this.setState({openModel:!this.state.openModel,fields:data})

	}

	handleChange(field, e){   

        let fields = this.state.fields;
		if (field === 'negativeScoring') {
        	fields[field] = e.target.checked; 
		}
		else
		{	
			if (field === 'execution_mode') {
        		fields[field] = parseInt(e.target.value); 
			}
			else
			{
        		fields[field] = e.target.value; 
			}
		}       

        if (field === 'execution_mode' && e.target.value !== 1) {
        	fields['negativeScoring'] = false; 
		}
        this.setState({fields});

        let errors = {};
        if(field === 'title' && fields["title"].trim() === ''){
            errors["title"] = "Please enter title";
        }

        if(field === 'execution_mode' && !fields["execution_mode"]){
            errors["execution_mode"] = "Please select execution mode";
        }

        if(field === 'renderingMode' && !fields["renderingMode"]){
            errors["renderingMode"] = "Please select rendering mode";
        }

        if(field === 'scoring' && !fields["scoring"]){
            errors["scoring"] = "Please select scoring";
        }

        this.setState({errors: errors});

    }


    updateRoundHandler(type='',e)
    {
    	let fields = this.state.fields;
        let formIsValid = true;

    	let errors = {};
        if(fields["title"].trim() === ''){
            errors["title"] = "Please enter title";formIsValid = false;
        }

        if(!fields["execution_mode"]){
            errors["execution_mode"] = "Please select execution mode";formIsValid = false;
        }

        if(!fields["renderingMode"]){
            errors["renderingMode"] = "Please select rendering mode";formIsValid = false;
        }

        if(!fields["scoring"]){
            errors["scoring"] = "Please select scoring";formIsValid = false;
        }
        this.setState({errors: errors});

    	if(formIsValid){
        	// console.log(JSON.parse(reactLocalStorage.get('userData')).userId);
        	const data = new FormData();
        	data.append('id',this.state.fields._id);
        	data.append('title',this.state.fields.title);
        	data.append('description',this.state.fields.description);
        	data.append('execution_mode',this.state.fields.execution_mode);
        	data.append('renderingMode',this.state.fields.renderingMode);
        	data.append('scoring',this.state.fields.scoring);
        	data.append('negativeScoring',this.state.fields.negativeScoring);
        	data.append('timeLimit',this.state.fields.timeLimit);
        	data.append('basePoints',this.state.fields.basePoints);
        	data.append('negativeBasePoints',this.state.fields.negativeBasePoints);
            if(this.state.fields.image === 'image'){
                data.append('image', this.uploadInput.files[0]);
            } 
            // console.log(data);
            fetch(configuration.baseURL+"round/round/"+this.state.fields._id, {
                method: "PUT",
                headers: {
					'contentType': "application/json",
                    'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
                },
                body:data
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if(data.code === 200){
                	this.getList(contest_id);
                	console.log(type);
                	if (type === 'roundquestion') {
                		this.props.history.push('/roundquestion/'+e);	
                	}
                	this.setState({openModel:!this.state.openModel});
                }
                else
                {
                    return toast.error(data.message);
                }
                
            });
        }
    }	

    handleUploadProfile(type, ev) {
        let fields = this.state.fields;
        fields['image'] = 'image';
        this.setState({fields});
        // console.log(this.uploadInput.files)
    }

    saveNextHandler(id,e)
    {
    	this.updateRoundHandler('roundquestion',id);
    }


	render() {
		$(document).ready(function() {
            var readURL = function(input) {
				if (input.files && input.files[0]) {
					var reader = new FileReader();
					reader.onload = function (e) {
						// console.log(e.target.result);
						$('.display-profile-pic').attr('src', e.target.result);
						$('.display-profile-pic').show();
						$('#start').hide();
					}
					reader.readAsDataURL(input.files[0]);
				}
            }
            $(".file-upload").on('change', function(){
            	readURL(this);
            });
            $(".upload-button").on('click', function() {
            	$(".file-upload").click();
            });
        });

		return (
			<>
				<TheHeaderInner />				
					<main id="main">
						<ToastContainer position="top-right" autoClose={5000} style={{top:'80px'}}/>
			            <section id="contest" className="d-flex align-items-center">
			                <div className="container">
			                    <div className="create-contest">
			                        <div className="contest-title">
			                            <div className="row">
			                                <div className="col-md-4">
			                                    <div className="main_title">
			                                        <h3>Rounds</h3>  
			                                    </div> 
			                                </div>
			                                <div className="col-md-8">
			                                    {/*<ul className="title-link">
			                                        <a href="javascript:void(0);"><li><img src="./murabbo/img/close2.svg" alt="" /> Remove</li></a>
			                                        <a href="javascript:void(0);"><li><img style={{width: '17px'}} src="./murabbo/img/send.svg" alt="" /> Publish</li></a>
			                                        <a href="javascript:void(0);"><li><img src="./murabbo/img/edit.svg" alt="" /> Edit</li></a>
			                                    </ul> */} 
			                                </div>
			                            </div>
			                        </div>
			                    </div>
			                    <div className="contest-info">
			                        <div className="row">
			                            <div className="col-md-8 offset-md-2">
			                                <div className="progressbar">
			                                    <div className="inner-progress">
			                                        <p>Contest Info</p>
			                                    </div>
			                                    <div className="inner-progress2">
			                                        <p>Round Tray</p>
			                                    </div>
			                                </div>
			                            </div>
		                            </div>
		                            <div className="row round-box">
			                                { this.state.listArr.map((val, ckey) => {
					                            return <div className="col-lg-2 col-md-3 col-sm-6 ">
								                    <div className="contest-box yellow-bg">
								                        <img className="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
								                        <img className="con-close" src="./murabbo/img/close-white2.svg" alt="" onClick={this.deleteHandler.bind(this,val._id)} />
								                        <img className="ico" src="./murabbo/img/quizz.svg" alt="" />
								                        <h3 onClick={this.editHandler.bind(this,val)} style={{cursor:"pointer"}}>{val.gameType}</h3>
								                        <p></p>
								                    </div>
								                </div>
					                            })
	                        				}
	                        		</div>
		                            <div className="row" style={{marginBottom:'20px'}}>
			                        
		                                <div className="col-md-8 offset-md-2">
		                                    <div className="footer-btn">
		                                        <a href="#contest"><button className="pink_btn" type="button">Save & Exit</button></a>
		                                        <button className="blue_btn" type="button" onClick={() => this.setState({openModelRoundAdd:true}) }>Add Rounds</button>
		                                    </div> 
		                                </div>
				                    </div>
			                	</div>
			                </div>
			            </section>

						<CModal size="lg" show={this.state.openModel} onClose={() => this.setState({openModel:!this.state.openModel})} color="danger"  centered>
	                    	<CModalBody className="model-bg">

		                    <div>
		                        <div className="modal-body">
		                            <button type="button" className="close"  onClick={()=> this.setState({openModel:false})}>
		                            <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
		                        </button>
		                            <div className="model_data">
		                                <div className="model-title">
			                                <h3>Round Details</h3>
		                                </div>
		                                <div className="contest">

		                                	<div className="row">
					                            <div className="col-lg-4 col-md-6 col-sm-12">
					                                <div className="profile-img">
					                                    <form id="file-upload-form" className="uploader">
					                                      <input id="file-upload" type="file" name="fileUpload" className="file-upload" accept="image/*" onChange={this.handleUploadProfile.bind(this,'image')} ref={(ref) => { this.uploadInput = ref; }}  />

					                                      <label for="file-upload" id="file-drag">
					                                        <img id="file-image"   src="#" alt="Preview" className="hidden"/>
					                                        <img className="display-profile-pic" src={this.state.fields['image']} alt=""  />
					                                        <div id="start">
					                                        	{(this.state.fields['image'] === '') ? <div><img className="profile-pic" src='./murabbo/img/upload.svg' alt=""  />
					                                          <div id="notimage">Please select an image</div>
					                                          <div id="add_image">Add Image</div></div> : null}
															  
					                                        </div>
					                                        <div id="response" className="hidden">
					                                          <div id="messages"></div>
					                                          
					                                        </div>
					                                      </label>
					                                    </form>
					                                </div>
					                                <span  className="error-msg">{this.state.errors["image"]}</span>
					                            </div>
					                            <div className="col-lg-4 col-md-6 col-sm-12">
					                                <div className="cus_input input_wrap">
					                                    <img src="./murabbo/img/title.svg" alt="Upload"/> <input type="text" required name="" onChange={this.handleChange.bind(this,'title')} value={this.state.fields['title']} />
					                                    <label>Title</label>
					                                </div>
					                                <span  className="error-msg">{this.state.errors["title"]}</span>
					                                <div className="cus_input input_wrap">
					                                    <img src="./murabbo/img/des.svg" alt="Upload"/> <input type="text" required onChange={this.handleChange.bind(this,'description')} name="" value={this.state.fields['description']} />
					                                    <label>Description</label>
					                                </div>
					                                <div className="cus_input input_wrap">
					                                    <img src="./murabbo/img/book.svg" alt="Upload"/> 
					                                    <select className="floating-select" onChange={this.handleChange.bind(this,'execution_mode')} value={this.state.fields['execution_mode']} required>
									                      	<option value="1">Assigned</option>
									                      	<option value="2">Competitive</option>
					                                    </select>
					                                    <label>Execution Mode</label>
					                                </div>
					                                <span  className="error-msg">{this.state.errors["execution_mode"]}</span>
					                               
					                            </div>
					                            <div className="col-lg-4 col-md-6 col-sm-12">
					                            {
					                                	(this.state.fields['execution_mode'] === 1) ? (
					                                		<div>
					                                			<div style={{margin: '0px 0 5px 0'}} className="cus_input ">
								                                    <img src="./murabbo/img/clock.svg" alt="Upload"/> <label className="cus_label">Time Limit</label>
								                                </div>

								                                <div className="number">
								                                    <span className="minus" style={{cursor:'pointer'}}><img src="./murabbo/img/minus.svg" onClick={this.btnClickHandler.bind(this,"minus","timeLimit")}/></span>
								                                    <input type="text" value={this.state.fields['timeLimit']} />
								                                    <span className="plus" style={{cursor:'pointer'}}><img src="./murabbo/img/plus.svg" onClick={this.btnClickHandler.bind(this,"plus","timeLimit")}/></span>
								                                </div>
								                                <div style={{margin: '0px 0 5px 0'}} className="cus_input ">
								                                    <label style={{paddingLeft: '5px'}} className="cus_label">Base Points</label>
								                                </div>
							                                    <div className="range-wrap">
							                                      <input min="0" max="100" value={this.state.fields['basePoints']} onChange={this.handleChange.bind(this,'basePoints')}  step="1" type="range" className="range" id="range" />
							                                      <output className="bubble">{this.state.fields['basePoints']}</output>
							                                    </div>
					                                		
									                            <div style={{ margin: "0px 0 5px 0"}} className="cus_input ">
								                                    <label style={{paddingLeft: '5px'}} className="cus_label">Negative Scoring </label>
								                                    <div className="button-switch">
								                                      <input type="checkbox" id="switch-orange" className="switch" value={this.state.fields['negativeScoring']} onChange={this.handleChange.bind(this,'negativeScoring')} />
								                                      <label for="switch-orange" className="lbl-off"></label>
								                                      <label for="switch-orange" className="lbl-on"></label>
								                                    </div><img style={{ left: 'auto',top: '0px' }} src="./murabbo/img/info.svg" />
								                                </div>
								                            </div> ) : null
								                }
								                {
									                (this.state.fields['negativeScoring'] === true) ? (
						                                		<div>
						                                			<div style={{ margin: "0px 0 5px 0"}} className="cus_input ">
									                                    <label style={{paddingLeft: '5px'}} className="cus_label">Negative Base Points(0 - 100)</label>
									                                </div>
									                                <div className="range-wrap">
									                                  <input min="0" max="100" step="1" type="range" className="range" id="range" value={this.state.fields['negativeBasePoints']} onChange={this.handleChange.bind(this,'negativeBasePoints')}  />
									                                  <output className="bubble">{this.state.fields['negativeBasePoints']}</output>
									                                </div>
						                                		</div> ) : null
									            }


					                                
					                                <div className="cus_input input_wrap">
					                                    <img src="./murabbo/img/score.svg" alt="Upload"/> 
					                                    <select className="floating-select" onChange={this.handleChange.bind(this,'scoring')} value={this.state.fields['scoring']} required>
									                      	<option value=""></option>
									                      	<option value="1">Moderator Driven</option>
									                      	<option value="2">Automatic</option>
					                                    </select>
					                                    <label>Scoring</label>
					                                </div>
					                                <span  className="error-msg">{this.state.errors["scoring"]}</span>
					                                <div className="cus_input input_wrap">
					                                    <img src="./murabbo/img/3d.svg" alt="Upload"/> 
					                                    <select className="floating-select" onChange={this.handleChange.bind(this,'renderingMode')} value={this.state.fields['renderingMode']} required>
									                      	<option value=""></option>
									                      	<option value="1">Automatic</option>
									                      	<option value="2">onClick</option>
					                                    </select>
					                                    <label>Rendering Mode</label>
					                                </div>
					                                <span  className="error-msg">{this.state.errors["renderingMode"]}</span>
					                               
					                            </div>
					                        </div>


					                        <div style={{ textAlign: 'center' , float:'left' }} className="col-lg-4 col-md-6 col-sm-12">
							                    <button  style={{minWidth: '150px'}}  className="blue_btn" type="button"  onClick={this.saveNextHandler.bind(this,this.state.fields['_id'])} >Save & Next</button>
							                </div>
					                        <div style={{ textAlign: 'center' , float:'left'}} className="col-lg-4 col-md-6 col-sm-12">
							                    <button  style={{minWidth: '150px'}}  className="pink_btn" type="button" >Generate Question</button>
							                </div>
						                    <div style={{ textAlign: 'center', float:'left' }} className="col-lg-4 col-md-6 col-sm-12">
							                    <button className="blue_btn" type="button"  onClick={this.updateRoundHandler.bind(this) } >Save & Exit</button>
							                </div>
								        </div>
		                            </div>
		                        </div>
		                        </div>
		                    </CModalBody>
		                </CModal>

		                <CModal size="lg" show={this.state.openModelRoundAdd} onClose={() => this.setState({openModelRoundAdd:!this.state.openModelRoundAdd})} color="danger"  centered>
	                    	<CModalBody className="model-bg">

		                    <div>
		                        <div className="modal-body">
		                            <button type="button" className="close"  onClick={()=> this.setState({openModelRoundAdd:false})}>
		                            	<span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
		                       		 </button>
								        <div className="model_data">
								            <div className="model-title">
								                <h3>Add Rounds</h3>
								            </div>
								            <div className="row round-box">
								                <div className="col-lg-3 col-md-4 col-sm-6">
							                        <div className="contest-box">
							                            <img className="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
							                            <img className="ico" src="./murabbo/img/hangman.svg" alt="" />
							                            <h3>HangMan</h3>
							                            <p></p>
							                        </div>
								                </div>
								                <div className="col-lg-3 col-md-4 col-sm-6">
								                    <div >
								                        <div className="contest-box purple-bg">
								                            <img className="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
								                            <img className="ico" src="./murabbo/img/cups.svg" alt="" />
								                            <h3>Match It</h3>
								                            <p></p>
								                        </div>
								                    </div>
								                </div>
								                
								                <div className="col-lg-3 col-md-4 col-sm-6">
								                    <div >
								                        <div className="contest-box dark-pink">
								                            <img className="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
								                            <img className="ico" src="./murabbo/img/abc.svg" alt="" />
								                            <h3>Unscramble</h3>
								                            <p></p>
								                        </div>
								                    </div>
								                </div>
								                <div className="col-lg-3 col-md-4 col-sm-6">
								                    <div >
								                        <div className="contest-box coffee-bg">
								                            <img className="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
								                            <img className="ico" src="./murabbo/img/brain.svg" alt="" />
								                            <h3>Guess & Go</h3>
								                            <p></p>
								                        </div>
								                    </div>
								                </div>
								                <div className="col-lg-3 col-md-4 col-sm-6">
								                    <div >
								                        <div className="contest-box light-pink">
								                            <img className="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
								                            <img className="ico" src="./murabbo/img/giberish.svg" alt="" />
								                            <h3>Gibberish</h3>
								                            <p></p>
								                        </div>
								                    </div>
								                </div>
								                <div className="col-lg-3 col-md-4 col-sm-6">
								                    <div >
								                        <div className="contest-box green-bg">
								                            <img className="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
								                            <img className="ico" src="./murabbo/img/bingo.svg" alt="" />
								                            <h3>Bingo</h3>
								                            <p></p>
								                        </div>
								                    </div>
								                </div>
								                <div className="col-lg-3 col-md-4 col-sm-6">
								                    <div>
								                        <div className="contest-box yellow-bg" style={{cursor:'pointer'}} onClick={this.clickHandler.bind(this,true)}>
								                            <img className="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
								                            <img className="ico" src="./murabbo/img/quizz.svg" alt="" />
								                            <h3>Quiz</h3>
								                            <p></p>
								                        </div>
								                        {
								                        	(this.state.qtyAdd ) ? (

								                        		<div className="number">
								                                    <span className="minus" style={{cursor:'pointer'}}><img src="./murabbo/img/minus.svg" onClick={this.btnClickHandler.bind(this,"minus",'qty')}/></span>
								                                    <input type="text" value="1" value={this.state.qty} />
								                                    <span className="plus" style={{cursor:'pointer'}}><img src="./murabbo/img/plus.svg" onClick={this.btnClickHandler.bind(this,"plus",'qty')}/></span>
								                                </div>
								                        	) : null
								                        }

								                    </div>
								                </div>
								                <div className="col-lg-3 col-md-4 col-sm-6">
								                    <div >
								                        <div className="contest-box lightgreen">
								                            <img className="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
								                            <img className="ico" src="./murabbo/img/padlock.svg" alt="" />
								                            <h3>Taboo</h3>
								                            <p></p>
								                        </div>
								                        {/*<div className="number">
						                                    <span className="minus"><img src="./murabbo/img/minus.svg" onClick={this.btnClickHandler.bind(this,"minus")}/></span>
						                                    <input type="text" value="1" value={this.state.qty} />
						                                    <span className="plus"><img src="./murabbo/img/plus.svg" onClick={this.btnClickHandler.bind(this,"plus")}/></span>
						                                </div>*/}
								                    </div>
								                </div>
								                <div className="col-lg-3 col-md-4 col-sm-6">
								                    <div >
								                        <div className="contest-box grey-bg">
								                            <img className="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
								                            <img className="ico" src="./murabbo/img/more.svg" alt="" />
								                            <h3></h3>
								                            <p></p>
								                        </div>
								                    </div>
								                </div>

								                <div className="col-lg-12 col-md-12 col-sm-12">
									                <div style={{ textAlign: 'center' }} className="">
									                    <button  style={{minWidth: '150px'}}  className="blue_btn" type="button"  onClick={this.submitHandler.bind(this) } >Done</button>
									                </div>
								                </div>
								            </div>
								        </div>
								      </div>
		                        </div>
		                    </CModalBody>
		                </CModal>
		                <CModal show={this.state.confirmationModel}  closeOnBackdrop={false}  onClose={()=> this.setState({confirmationModel:false})}
                    color="danger" 
                    centered>
                        <CModalBody className="model-bg">

                        <div>
                            <div className="modal-body">
                                <button type="button" className="close"   onClick={()=> this.setState({confirmationModel:false})}>
                                <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
                            </button>
                                <div className="model_data">
                                    <div className="model-title">
                                    	<h3>Are you sure you want to delete?</h3>
                                    </div>
                                    <img className="shape2" src="./murabbo/img/shape2.svg"/>
                                    <img className="shape3" src="./murabbo/img/shape3.svg"/>
                                    <div className="row">
                                        <div className="col-md-10 offset-md-1">

							                <div style={{ textAlign: 'center' , float:'left',marginRight:'10px' }} className="">
							                    <button  style={{minWidth: '150px'}}  className="blue_btn" type="button"  onClick={()=> this.setState({confirmationModel:false,delete_id:''})} >No</button>
							                </div>
                                			<div style={{ textAlign: 'center' , float:'left' }} className="">
							                    <button  style={{minWidth: '150px'}}  className="pink_btn" type="button"  onClick={this.deleteHandler.bind(this)} >Yes</button>
							                </div>
                                        </div>
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

export default RoundTray
