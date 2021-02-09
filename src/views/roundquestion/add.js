import React, {Component} from 'react'
import {
    TheFooter,
    TheHeaderInner
} from '../../containers/index'
import configuration from '../../config';
import 'react-toastify/dist/ReactToastify.css';
import {reactLocalStorage} from 'reactjs-localstorage';
import $ from 'jquery';
import {
    CModal,
    CModalBody,
  } from '@coreui/react';
  import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import languages from '../../languages';
let round_id;

class AddRoundQuestion extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	answers:[],
        	fields:{question:'',timeLimit:1,basePoints:0,negativeBasePoints:0,execution_mode:0, negativeScoring:false,hint:1,answerType:1,onDemandNegativePoints:0,answerTypeBoolean:false,hintText:''},
			errors:{},
			fieldsAnswer:{},
			errorsAnswer:{},
			openModel:false,
			confirmationModel:false,
			delete_id:''
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
			fields['timeLimit'] = (fields['timeLimit'] === 300) ? 300 : (fields['timeLimit'] + 1);
			this.setState({fields});
		}
	}




	handleChange(field, e){   

        let fields = this.state.fields;

        if (field === 'answerType') {
        	this.setState({answers:[],answerTypeBoolean:false});	
        }

		if (field === 'negativeScoring') {
        	fields[field] = e.target.checked; 
		}
		else
		{
        	fields[field] = e.target.value; 
		}  

        this.setState({fields});

        let errors = {};
        if(field === 'question' && fields["question"].trim() === ''){
            errors["question"] = "Please enter question";
        }

        this.setState({errors: errors});

    }	



	addHandler(e,type='')
    {
    	let fields = this.state.fields;
        let formIsValid = true;

    	let errors = {};
        if(fields["question"].trim() === ''){
            errors["question"] = "Please enter question";formIsValid=false;
        }

        this.setState({errors: errors});

    	if(formIsValid){
    		if(this.state.answers.length === 0 && parseInt(this.state.fields['answerType']) !== 5){
				return toast.error('Add atleast one answer!');
	        }

	        if (parseInt(this.state.fields['answerType']) !== 5) {
	        	let answers = this.state.answers;
				var that =this;
				var temp = false;
				answers = answers.filter(function(value, index, arr){ 
					if (value.correctAnswer === true) {
						temp = true;
					}
				});
				if (temp === false) {
					return toast.error('Select atleast one answer correct!');
				}

			}
	        

        	// console.log(JSON.parse(reactLocalStorage.get('userData')).userId);
        	const data = new FormData();
        	data.append('roundId',round_id);
        	data.append('question',this.state.fields.question);
        	data.append('hint',this.state.fields.hint);
        	data.append('hintText',this.state.fields.hintText);
        	data.append('answerType',this.state.fields.answerType);
        	data.append('onDemandNegativePoints',this.state.fields.onDemandNegativePoints);
        	data.append('answerTypeBoolean',this.state.fields.answerTypeBoolean);
        	data.append('answers',JSON.stringify(this.state.answers));
        	if (this.state.fields.execution_mode === 2 || this.state.fields.execution_mode === '2') {
        		data.append('basePoints',this.state.fields.basePoints);
	        	data.append('timeLimit',this.state.fields.timeLimit);
	        	data.append('negativeScoring',this.state.fields.negativeScoring);
	        	data.append('negativeBasePoints',this.state.fields.negativeBasePoints);
        	}
        	
            if(this.state.fields.image === 'image'){
                data.append('file', this.uploadInput.files[0]);
            } 
            

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
					this.props.history.push('/roundquestion/'+round_id);
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
    			

    deleteHandler(key = '',e)
	{	
		if (this.state.delete_id !== '') {
			let answers = this.state.answers;
			var key = this.state.delete_id;
			answers = answers.filter(function(value, index, arr){ 
				if (key !== index) {
					return value;
				}			
			})
			this.setState({answers: answers,confirmationModel:false,delete_id:''});
	    }
	    else
	    {
	    	this.setState({delete_id:key,confirmationModel:true});

	    }
	}

	openModel()
	{
        this.setState({fieldsAnswer:{answer:'',correctAnswer:false},errorsAnswer:{answer:''},openModel:true});
	}


    handleChangeAnswer(field, e){   
        let fields = this.state.fieldsAnswer;
        if (field === 'correctAnswer'){
			fields[field] = e.target.checked;
        }
		else
		{
			fields[field] = e.target.value;
		}
        this.setState({fieldsAnswer:fields});
    }	



	saveAnswerModel()
	{

		let fields = this.state.fieldsAnswer;
        let formIsValid = true;

    	let errors = {};
        if(fields["answer"].trim() === ''){
            errors["answer"] = "Please enter answer";formIsValid = false;
        }
        this.setState({errorsAnswer: errors});

    	if(formIsValid){
    		let answers = this.state.answers;
    		
    		if(parseInt(this.state.fields['answerType']) !== 1)
    		{
				fields.correctAnswer = true;
    		}
    		else
    		{
    			fields.correctAnswer = false;
    		}

    		answers.push(fields);
    		this.setState({answers: answers});
    		this.setState({fieldsAnswer:{answer:''},errorsAnswer:{answer:''},openModel:false});
    	}
	}

	changeAnswer(key,type,e)
	{
		let answers = this.state.answers;
		var that =this;
		answers = answers.filter(function(value, index, arr){ 

			if (key === index ) {
				var obj = value;
				obj.correctAnswer = (type === 'check') ? true : false;
				return obj;	
			}	
			else
			{
				
				if (parseInt(that.state.fields['answerType']) === 1 && type === 'check') {
					var obj = value;
					obj.correctAnswer = false;
					return obj;
				}
				else
				{
					return value;
				}
			}
		})
		this.setState({answers: answers});
	}

	truncate(str, n){
	  return (str.length > n) ? str.substr(0, n-1) + '...' : str;
	};

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
				<ToastContainer position="top-right" autoClose={5000} style={{top:'80px'}}/>	
				<main id="main">
	            <section id="contest" className="d-flex align-items-center">
	                <div className="container">
	                    <div className="create-contest">
	                        <div className="contest-title">
	                            <div className="row">
	                                <div className="col-md-12">
	                                    <div className="main_title">
	                                        <h3>Create Quiz Question</h3>  
	                                    </div> 
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div style={{paddingTop: '30px'}} className="contest-info">
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
		                                          <div id="add_image">Add Image</div></div>
	                                        </div>
	                                        <div id="response" className="hidden">
	                                          <div id="messages"></div>
	                                          
	                                        </div>
	                                      </label>
	                                    </form>
	                                </div>
	                                <span  className="error-msg">{this.state.errors["image"]}</span>
	                            </div>
	                            
	                            
	                            {

	                                	(this.state.fields['execution_mode'] === 2 || this.state.fields['execution_mode'] === "2") ? (
	                                		<div className="col-lg-4 col-md-6 col-sm-12">
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
				                            </div>

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

				                            </div>) : null
				                }
				                
					            

					            <div className="col-lg-4 col-md-6 col-sm-12">
	                                <div className="cus_input input_wrap">
	                                    <img src="./murabbo/img/help.svg" alt="Upload"/> <input type="text" required name="" onChange={this.handleChange.bind(this,'question')} value={this.state.fields['question']} />
	                                    <label>Add Question</label>
	                                </div>
	                                <span  className="error-msg">{this.state.errors["question"]}</span>
	                                <div className="cus_input input_wrap">
	                                    <img src="./murabbo/img/help.svg" alt="Upload"/> 
	                                    <select className="floating-select" onChange={this.handleChange.bind(this,'answerType')} value={this.state.fields['answerType']} required>
					                      	<option value="1">Single Select</option>
					                      	<option value="2">Multi Select</option>
					                      	<option value="3">Free Text</option>
					                      	<option value="4">Flashcard</option>
					                      	<option value="5">True or False</option>
	                                    </select>
	                                    <label>Select Question Type</label>
	                                </div>
	                                <span  className="error-msg">{this.state.errors["answerType"]}</span>
		                               


	                                <div className="cus_input input_wrap">
	                                    <img src="./murabbo/img/info.svg" alt="Upload"/> <input type="text" required name="" onChange={this.handleChange.bind(this,'hintText')} value={this.state.fields['hintText']} />
	                                    <label>Hint</label>
	                                </div>
	                                <span  className="error-msg">{this.state.errors["hintText"]}</span>
	                                <div className="cus_input input_wrap">
	                                    <img src="./murabbo/img/info2.svg" alt="Upload"/> 
	                                    <select className="floating-select" onChange={this.handleChange.bind(this,'hint')} value={this.state.fields['hint']} required>
					                      	<option value="2">Always</option>
					                      	<option value="3">On demand</option>
	                                    </select>
	                                    <label>Show Hint</label>
	                                </div>
	                                <span  className="error-msg">{this.state.errors["hint"]}</span>

	                                {(this.state.fields['hint'] === 3 || this.state.fields['hint'] === "3") ?
	                                <div>
                            			<div style={{ margin: "0px 0 5px 0"}} className="cus_input ">
		                                    <label style={{paddingLeft: '5px'}} className="cus_label">On Demand Negative Points ( 0 - 100 )</label>
		                                </div>
		                                <div className="range-wrap">
		                                  <input min="0" max="100" step="1" type="range" className="range" id="range" value={this.state.fields['onDemandNegativePoints']} onChange={this.handleChange.bind(this,'onDemandNegativePoints')}  />
		                                  <output className="bubble">{this.state.fields['onDemandNegativePoints']}</output>
		                                </div>
                            		</div> : null }
                            		{(this.state.fields['answerType'] === 5 || this.state.fields['answerType'] === "5") ? <div style={{ margin: "0px 0 5px 0"}} className="cus_input ">

		                            	<img src="./murabbo/img/negativeSign.png" alt="Upload"/> 
	                                    <label className="cus_label">Select Answer </label>
	                                    <div className="button-switch">
	                                      <input type="checkbox" id="switch-orange" className="switch" value={this.state.fields['answerTypeBoolean']} onChange={this.handleChange.bind(this,'answerTypeBoolean')} />
	                                      <label for="switch-orange" className="lbl-off"></label>
	                                      <label for="switch-orange" className="lbl-on"></label>
	                                    </div><img style={{ left: 'auto',top: '0px' }} src="./murabbo/img/info.svg" />
	                                </div> : null}
                            		
	                               
	                            </div>

	                            {
	                            	(this.state.answers.length > 0) ? <div className="col-lg-12 col-md-12 col-sm-12">
		                            	<div className="answer">
		                                    <label>Select Answer</label>
		                                </div>
		                            </div> : null
	                            }
	                            
	                            {
	                            	this.state.answers.map((val, key) => {
	                            		return  <div className="col-lg-4 col-md-4 col-sm-12">
			                            	<div className="answer">

			                                    <div className="answer-box">
			                                        <p className="fancy">
			                                            <label >
			                                            {  (val.correctAnswer) ?  
			                                            	 (parseInt(this.state.fields['answerType']) === 1 || parseInt(this.state.fields['answerType']) === 2) ?
			                                            		 <img  src="./murabbo/img/check-y.png"  className="fa fa-check-circle" onClick={this.changeAnswer.bind(this,key,'uncheck')} /> : 
			                                            		 <img  src="./murabbo/img/check-y.png"   className="fa fa-check-circle" /> 
			                                            :  (parseInt(this.state.fields['answerType']) === 1 || parseInt(this.state.fields['answerType']) === 2) ?
					                                            <span className="fa-circle" onClick={this.changeAnswer.bind(this,key,'check')} /> : 
					                                            <span className="fa-circle" /> 
														}
			                                                
			                                                <span for={key}>{this.truncate(val.answer,250)}</span>
			                                            </label>
			                                        </p>
			                                        <button style={{backgroundColor: '#17252B',marginLeft: '45px'}} type="button" className="remove_btn" onClick={this.deleteHandler.bind(this,key)}><img src="./murabbo/img/close2.svg" /> Remove</button>
			                                    </div>
			                                </div>
			                            </div>
	                            	})
	                            }
	                        </div>
	                    </div>
	                    <div className="contest-info">
	                        <div className="contest-title">
	                            <div className="row">
	                                <div className="col-md-12">
	                                    <div className="footer-btn">
	                                    {(this.state.fields['answerType'] === 5 || this.state.fields['answerType'] === "5") ? null :
		                                    <button className="blue_btn light_blue_btn" type="button"  onClick={this.openModel.bind(this) } >Add {(this.state.answers.length > 0) ? 'More ' : '' }Answer</button> }
		                                    <button className="pink_btn" type="button"  onClick={this.addHandler.bind(this) } >Save & Exit</button>
	                                    </div> 
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	            </section>
	            <CModal show={this.state.openModel}  closeOnBackdrop={false}  onClose={()=> this.setState({openModel:false})}
                    color="danger" 
                    centered>
                        <CModalBody className="model-bg">

                        <div>
                            <div className="modal-body">
                                
                        		<button type="button" className="close" onClick={()=> this.setState({openModel:false})}>
	                                <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
	                            </button>
                                <div className="model_data">
                                    <div className="model-title">
                                    	<h3>Add Answer</h3>	
                                    </div>

                                    <div className="cus_input input_wrap">
	                                    <input type="text" required name="" onChange={this.handleChangeAnswer.bind(this,'answer')} value={this.state.fieldsAnswer['answer']} />
	                                    <label>Type answer</label>
	                                </div>
	                                <span className="error-msg">{this.state.errorsAnswer["answer"]}</span>

					                {/*<div style={{ margin:'29px 0 15px 0' }} className="cus_input ">
					                     <div style={{ margin:'29px 0 15px 0' }} className="cus_input ">
					                        <img src="./murabbo/img/answer.svg" /> <label className="cus_label">Show Correct Answer</label>
					                    </div>
					                    <div className="button-switch white_switch">
					                    {(this.state.fieldsAnswer['correctAnswer'] === true) ? 
					                    <input type="checkbox" id="switch-orange" className="switch" onChange={this.handleChangeAnswer.bind(this,'correctAnswer')} value={this.state.fieldsAnswer['correctAnswer']} checked /> : 
					                    <input type="checkbox" id="switch-orange" className="switch" onChange={this.handleChangeAnswer.bind(this,'correctAnswer')} value={this.state.fieldsAnswer['correctAnswer']} />}
					                      
					                      <label for="switch-orange" className="lbl-off"></label>
					                      <label for="switch-orange" className="lbl-on"></label>
					                    </div>
					                </div>*/}
					               
					                <div className="full_btn">
					                    <button style={{marginBottom: '15px'}}  className="yellow_btn" type="button"  onClick={this.saveAnswerModel.bind(this)} >Done</button>
					                </div>
                                </div>
                            </div>
                            </div>
                        </CModalBody>
                    </CModal>
	            <CModal show={this.state.confirmationModel}  closeOnBackdrop={false}  onClose={()=> this.setState({confirmationModel:false,delete_id:''})}
                    color="danger" 
                    centered>
                        <CModalBody className="model-bg">

                        <div>
                            <div className="modal-body">
                                
                                <div className="model_data">
                                    <div className="model-title">
                                    	<h3>Are you sure you want to delete?</h3>
                                    </div>
                                    <img className="shape2" src="./murabbo/img/shape2.svg"/>
                                    <img className="shape3" src="./murabbo/img/shape3.svg"/>
                                    <div className="row">
                                        <div className="col-md-10 offset-md-1">

							                <div style={{ textAlign: 'center' , float:'left',marginRight:'10px' }} className="">
							                <button  style={{minWidth: '150px'}}  className="yellow_btn" type="button"  onClick={this.deleteHandler.bind(this,'')} >Yes</button>
							                </div>
                                			<div style={{ textAlign: 'center' , float:'left' }} className="">

							                    <button  style={{minWidth: '150px'}}  className="pink_btn" type="button"  onClick={()=> this.setState({confirmationModel:false,delete_id:''})} >No</button>
							                    
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

export default AddRoundQuestion
