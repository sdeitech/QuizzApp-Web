import React, {Component} from 'react'
import {
    TheFooter,
    TheHeaderInner
} from '../../containers/index'
import configuration from '../../config';
import {reactLocalStorage} from 'reactjs-localstorage';
import {
    CModal,
    CModalBody,
  } from '@coreui/react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
let round_id;
class RoundQuestion extends Component {
	constructor(props) {
        super(props);
        this.state = {
			fields:{timeLimit:1,basePoints:0,negativeBasePoints:0,execution_mode:0, negativeScoring:false,hint:1},
			errors:{},
			openModel:false,
			confirmationModel:false,
			delete_id:'',
			listArr:[]
		};
	}

	componentDidMount(){

        $('.display-profile-pic').hide();
		var url = window.location.href;
        round_id =url.substring(url.lastIndexOf('/') + 1);

        if (round_id) {
			fetch(configuration.baseURL+"round/round?roundId="+round_id, {
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
					var data = data.data[0];
					let fields = this.state.fields;
					fields['execution_mode']=data.execution_mode;
					fields['negativeScoring']=data.negativeScoring;
			   		this.setState({fields});
		    	}
			});	
		}

		this.getList(round_id);
	}

	getList(round_id)
	{
		if (round_id) {
			fetch(configuration.baseURL+"roundQuestion/roundQuestion?roundId="+round_id, {
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


	handleChange(field, e){   

        let fields = this.state.fields;
		if (field === 'negativeScoring') {
        	fields[field] = e.target.checked; 
		}
		else
		{
        	fields[field] = e.target.value; 
		}       

        if (field === 'execution_mode' && e.target.value !== 1) {
        	fields['negativeScoring'] = false; 
		}

        this.setState({fields});

        let errors = {};
        if(field === 'title' && !fields["title"]){
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

    updateRoundHandler(e,type='')
    {
    	let fields = this.state.fields;
        let formIsValid = true;

    	let errors = {};
        if(!fields["title"]){
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
        	data.append('roundId',round_id);
        	data.append('question',this.state.fields.question);
        	data.append('hint',this.state.fields.hint);
        	data.append('hintText',this.state.fields.hintText);
        	data.append('answerType',this.state.fields.answerType);
        	data.append('onDemandNegativePoints',this.state.fields.onDemandNegativePoints);
        	data.append('answerTypeBoolean',this.state.fields.answerTypeBoolean);
        	if (this.state.fields.execution_mode === 2 || this.state.fields.execution_mode === '2') {
        		data.append('basePoints',this.state.fields.basePoints);
	        	data.append('timeLimit',this.state.fields.timeLimit);
	        	data.append('negativeScoring',this.state.fields.negativeScoring);
	        	data.append('negativeBasePoints',this.state.fields.negativeBasePoints);
        	}
        	
            if(this.state.fields.image === 'image'){
                data.append('file', this.uploadInput.files[0]);
            } 
            console.log(data);
            fetch(configuration.baseURL+"roundQuestion/roundQuestion", {
                method: "POST",
                headers: {
					'contentType': "application/json",
                    'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
                },
                body:data
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if(data.code === 200){
                	this.setState({openModel:!this.state.openModel});
                	this.getList(round_id);
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

    deleteHandler(id = '',e)
	{
		if (this.state.delete_id) {
			fetch(configuration.baseURL+"roundQuestion/roundQuestion/"+this.state.delete_id, {
				method:"DELETE",
	            headers: {
					'contentType': "application/json",
	                'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
	            }
	        }).then((response) => {
	            return response.json();
	        }).then((data) => {
	            if(data.code === 200){
	            	this.getList(round_id);
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

	btnClickHandler(type,e){
		if(type === "minus")
		{
			var fields = this.state.fields;
			fields['timeLimit'] = (fields['timeLimit'] === 0) ? 0 : (fields['timeLimit'] - 1);
			this.setState({fields});
		}
		else
		{

			var fields = this.state.fields;
			fields['timeLimit'] = fields['timeLimit'] + 1;
			this.setState({fields});
		}
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
            // $('.acc-head').click(function(){
            //     $(this).next().slideToggle(500);
            //     $(this).toggleClass('active');
            // })
        });
		return (
			<>
				<TheHeaderInner />				
					<main id="main">
			            <section id="contest" class="d-flex align-items-center">
			                <div class="container">
			                    <div class="create-contest">
			                        <div class="contest-title">
			                            <div class="row">
			                                <div class="col-md-12">
			                                    <div class="main_title">
			                                        <h3>Round Questions</h3>  
			                                    </div> 
			                                </div>
			                            </div>
			                        </div>
			                    </div>
			                    <div style={{ paddingTop:'20px',paddingBottom:'20px'}} class="contest-info">
			                        <div class="row">

			                        {
			                        	(this.state.listArr.length > 0) ? 
			                         this.state.listArr.map((val, ckey) => {
			                            return <div class="col-lg-12 col-md-12 col-sm-12">
			                                <div class="accordion-wrapper">
			                                    <div class="p-3 rounded-0">
			                                    {/*<div class="acc-head  p-3 rounded-0">*/}
			                                        <div class="row">
			                                            <div class="col-md-2">
			                                                <div class="acc_img">
			                                                    <img src={(val.file !== '') ? val.file : 'avatars/question.png'}/>
			                                                </div>
			                                            </div>
			                                            <div class="col-md-10">
			                                                <div class="acc_title">
			                                                    <h4>{val.question}</h4>
			                                                    <p>{val.hintText}</p>
			                                                </div>
			                                            </div>
			                                        </div>
			                                    </div>
			                                    <div class="rounded-0">
			                                    {/*<div class="acc-body rounded-0">*/}
			                                        <div class="row">
			                                            <div class="col-md-2">
			                                               
			                                            </div>
			                                            <div class="col-md-10">
			                                                <div class="acc_detail">
			                                                    <button type="button" class="remove_btn"  onClick={this.deleteHandler.bind(this,val._id)} ><img src="./murabbo/img/close2.svg" /> Remove</button>
			                                                    <button type="button" class="remove_btn"><img src="./murabbo/img/edit.svg" /> Edit</button>
			                                                </div>
			                                                {/*<div class="answer">
			                                                    <label>Select Answer</label>

			                                                    <div class="answer-box">
			                                                        <p class="fancy">
			                                                            <label >
			                                                              <input id="Cookies" name="yaybox" type="radio" value="Cookies" checked />
			                                                              <span for="Cookies">"Ut eget nisi neque. Sed ut nulla quam. Sed faucibus, turpis non elementum consectetur, turpis erat faucibus erat, at rhoncus tellus tellus vel eros. Donec lobortis arcu in dolor rutrum, nec bibendum ligula condimentum. Nullam eu ultrices velit, a pretium lorem. Aliquam max...</span>
			                                                            </label>
			                                                        </p>
			                                                    </div>
			                                                    <div class="answer-box">
			                                                        <p class="fancy">
			                                                            <label >
			                                                              <input id="Cookies" name="yaybox" type="radio" value="Cookies"/>
			                                                              <span for="Cookies">"Ut eget nisi neque. Sed ut nulla quam. Sed faucibus, turpis non elementum consectetur, turpis erat faucibus erat, at rhoncus tellus tellus vel eros. Donec lobortis arcu in dolor rutrum, nec bibendum ligula condimentum. Nullam eu ultrices velit, a pretium lorem. Aliquam max...</span>
			                                                            </label>
			                                                        </p>
			                                                    </div>
			                                                </div>*/}
			                                            </div>
			                                        </div>
			                                    </div>
			                                </div>
			                            </div>
			                            }) : 
								        (
								        	<div style={{color:'white',width: '100%',textAlign:'center',marginTop:"150px",marginBottom:"150px"}} className="flex"><p className="item-author text-color">No data found</p></div>
								        )
                    				}
			                            
			                        </div>
			                    </div>

			                    <div class="contest-info">
			                        <div class="contest-title">
			                            <div class="row">
			                                <div class="col-md-12">
			                                    <div class="footer-btn">
			                                        <button class="blue_btn" type="button" onClick={() => this.setState({openModel:true}) }>Add More Questions</button>
			                                        {/*<button class="yellow_btn" type="button">Save</button>*/}
			                                    </div> 
			                                </div>
			                            </div>
			                        </div>
			                    </div>
			                </div>
			            </section>
			        </main>
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

                    <CModal size="lg" show={this.state.openModel} onClose={() => this.setState({openModel:!this.state.openModel})} color="danger"  centered>
                    	<CModalBody className="model-bg">

	                    <div>
	                        <div className="modal-body">
	                            <button type="button" className="close"  onClick={()=> this.setState({openModel:false})}>
	                            <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
	                        </button>
	                            <div className="model_data">
	                                <div className="model-title">
		                                <h3>Add Question</h3>
	                                </div>
	                                <div className="contest">

	                                	<div className="row">
				                            <div className="col-lg-4 col-md-6 col-sm-12">
				                                <div className="profile-img">
				                                    <form id="file-upload-form" className="uploader">
				                                      <input id="file-upload" type="file" name="fileUpload" className="file-upload" onChange={this.handleUploadProfile.bind(this,'image')} ref={(ref) => { this.uploadInput = ref; }}  />

				                                      <label for="file-upload" id="file-drag">
				                                        <img id="file-image"   src="#" alt="Preview" className="hidden"/>
				                                        <img className="display-profile-pic" src="" alt=""  />
				                                        <div id="start">
					                                        <div><img className="profile-pic" src='./murabbo/img/upload.svg' alt=""  />
					                                          <div id="notimage">Please select an image</div>
					                                          <div id="add_image">Add Image</div></div>
				                                        </div>
				                                        <div id="response" className="hidden">
				                                          <div id="messages"></div>
				                                          
				                                        </div>
				                                      </label>
				                                    </form>
				                                </div>
				                                <span style={{top:'0'}} className="error-msg">{this.state.errors["image"]}</span>
				                            </div>
				                            
				                            <div className="col-lg-4 col-md-6 col-sm-12">
				                            {
				                                	(this.state.fields['execution_mode'] === 2 || this.state.fields['execution_mode'] === "2") ? (
				                                		<div>
				                                			<div style={{margin: '0px 0 5px 0'}} className="cus_input ">
							                                    <img src="./murabbo/img/clock.svg" alt="Upload"/> <label className="cus_label">Time Limit</label>
							                                </div>

							                                <div className="number">
							                                    <span className="minus" style={{cursor:'pointer'}}><img src="./murabbo/img/minus.svg" onClick={this.btnClickHandler.bind(this,"minus")}/></span>
							                                    <input type="text" value={this.state.fields['timeLimit']} />
							                                    <span className="plus" style={{cursor:'pointer'}}><img src="./murabbo/img/plus.svg" onClick={this.btnClickHandler.bind(this,"plus")}/></span>
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
								                (this.state.fields['negativeScoring'] === true || this.state.fields['negativeScoring'] === 'true') ? (
					                                		<div>
					                                			<div style={{ margin: "0px 0 5px 0"}} className="cus_input ">
								                                    <label style={{paddingLeft: '5px'}} className="cus_label">Negative Base Points</label>
								                                </div>
								                                <div className="range-wrap">
								                                  <input min="0" max="100" step="1" type="range" className="range" id="range" value={this.state.fields['negativeBasePoints']} onChange={this.handleChange.bind(this,'negativeBasePoints')}  />
								                                  <output className="bubble">{this.state.fields['negativeBasePoints']}</output>
								                                </div>
					                                		</div> ) : null
								            }
								            </div>

								            <div className="col-lg-4 col-md-6 col-sm-12">
				                                <div className="cus_input input_wrap">
				                                    <img src="./murabbo/img/title.svg" alt="Upload"/> <input type="text" required name="" onChange={this.handleChange.bind(this,'question')} value={this.state.fields['question']} />
				                                    <label>Question</label>
				                                </div>
				                                <span style={{top:'0'}} className="error-msg">{this.state.errors["question"]}</span>
				                                <div className="cus_input input_wrap">
				                                    <img src="./murabbo/img/book.svg" alt="Upload"/> 
				                                    <select className="floating-select" onChange={this.handleChange.bind(this,'answerType')} value={this.state.fields['answerType']} required>
								                      	<option value="1">Single</option>
								                      	<option value="2">Multiple</option>
								                      	<option value="3">Free Text</option>
								                      	<option value="4">Flash card</option>
								                      	<option value="5">True or False</option>
				                                    </select>
				                                    <label>Question Type</label>
				                                </div>
				                                <span style={{top:'0'}} className="error-msg">{this.state.errors["answerType"]}</span>
					                               


				                                <div className="cus_input input_wrap">
				                                    <img src="./murabbo/img/title.svg" alt="Upload"/> <input type="text" required name="" onChange={this.handleChange.bind(this,'hintText')} value={this.state.fields['hintText']} />
				                                    <label>Hint</label>
				                                </div>
				                                <span style={{top:'0'}} className="error-msg">{this.state.errors["hintText"]}</span>
				                                <div className="cus_input input_wrap">
				                                    <img src="./murabbo/img/score.svg" alt="Upload"/> 
				                                    <select className="floating-select" onChange={this.handleChange.bind(this,'hint')} value={this.state.fields['hint']} required>
								                      	<option value="2">Always</option>
								                      	<option value="3">On Demand</option>
				                                    </select>
				                                    <label>Hint</label>
				                                </div>
				                                <span style={{top:'0'}} className="error-msg">{this.state.errors["hint"]}</span>

				                                {(this.state.fields['hint'] === 3 || this.state.fields['hint'] === "3") ?
				                                <div>
		                                			<div style={{ margin: "0px 0 5px 0"}} className="cus_input ">
					                                    <label style={{paddingLeft: '5px'}} className="cus_label">On Demand Negative Points</label>
					                                </div>
					                                <div className="range-wrap">
					                                  <input min="0" max="100" step="1" type="range" className="range" id="range" value={this.state.fields['negativeBasePoints']} onChange={this.handleChange.bind(this,'negativeBasePoints')}  />
					                                  <output className="bubble">{this.state.fields['negativeBasePoints']}</output>
					                                </div>
		                                		</div> : null }
		                                		{(this.state.fields['answerType'] === 5 || this.state.fields['answerType'] === "5") ? <div style={{ margin: "0px 0 5px 0"}} className="cus_input ">
				                                    <label style={{paddingLeft: '5px'}} className="cus_label">Select Answer </label>
				                                    <div className="button-switch">
				                                      <input type="checkbox" id="switch-orange" className="switch" value={this.state.fields['answerTypeBoolean']} onChange={this.handleChange.bind(this,'answerTypeBoolean')} />
				                                      <label for="switch-orange" className="lbl-off"></label>
				                                      <label for="switch-orange" className="lbl-on"></label>
				                                    </div><img style={{ left: 'auto',top: '0px' }} src="./murabbo/img/info.svg" />
				                                </div> : null}
		                                		
				                               
				                            </div>
				                        </div>


				                        {/*<div style={{ textAlign: 'center' , float:'left' }} className="col-lg-4 col-md-6 col-sm-12">
						                    <button  style={{minWidth: '150px'}}  className="blue_btn" type="button"  onClick={this.saveNextHandler.bind(this,this.state.fields['_id'])} >Save & Next</button>
						                </div>
				                        <div style={{ textAlign: 'center' , float:'left'}} className="col-lg-4 col-md-6 col-sm-12">
						                    <button  style={{minWidth: '150px'}}  className="pink_btn" type="button" >Generate Question</button>
						                </div>
					                    <div style={{ textAlign: 'center', float:'left' }} className="col-lg-4 col-md-6 col-sm-12">
						                    <button className="blue_btn" type="button"  onClick={this.updateRoundHandler.bind(this) } >Save & Exit</button>
						                </div>*/}
						                </div>
							        </div>
	                            </div>
	                        </div>
	                    </CModalBody>
	                </CModal>
		        <TheFooter />
		    </>
		)
	}
}

export default RoundQuestion
