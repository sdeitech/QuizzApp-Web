import React, {Component} from 'react'
import {
    TheFooter,
    TheHeaderInner
} from '../../containers/index'
import configuration from '../../config';
import 'react-toastify/dist/ReactToastify.css';
import {reactLocalStorage} from 'reactjs-localstorage';
  import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let round_id,contest_id;
let question_id,gameType='';
class EditRoundWord extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	fields:{image:'',question:'',timeLimitSeconds:30,timeLimit:'00:30',basePoints:0,negativeBasePoints:0,execution_mode:0,scoring:1, negativeScoring:false,hint:1,answerType:1,onDemandNegativePoints:0,answerTypeBoolean:false,hintText:'',fileUrl:'',fileType:''},
			errors:{},
			tosterMsg:''
		};
	}


	componentDidMount(){
		
		var url = window.location.href;
        round_id =url.substring(url.lastIndexOf('/') + 1);
        round_id = round_id.split('?');

        if (round_id[1]) {
        	question_id = round_id[1];
        }
        if (round_id[0]) {
        	round_id = round_id[0];
        }

        if (round_id && question_id) {

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
						gameType = data.gameType;
						contest_id = data.contestId;
						
							var that = this;
							if(gameType){
								fetch(configuration.baseURL+"roundQuestion/roundQuestion?roundId="+round_id +"&questionId="+question_id+"&gameType="+gameType, {
									method: "GET",
									headers: {
										'Accept': 'application/json',
										'Content-Type': 'application/json',
										'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
									}
									}).then((response) =>{
									return response.json();
								}).then((newdata)=> {
									if (newdata.data.length > 0) {	
										let fields = that.state.fields;
										fields = newdata.data[0];
										fields['timeLimitSeconds'] = fields['timeLimit'];
										fields['execution_mode']=data.execution_mode;
										fields['negativeScoring']=data.negativeScoring;
										fields['scoring']=data.scoring;
										that.setState({fields});										
										setTimeout(function () {
											that.changeTime(0);
										}, 1000);
									}
								});	
						}
					}
				});	
			
		}

	}

	btnClickHandler(type,e){
		if(type === "minus")
		{	
			this.changeTime(-5);
		}
		else
		{
			this.changeTime(5);
		}
	}
	changeTime(sec){
    	var fields = this.state.fields;
		console.log(fields);
      	var currentTime = parseInt(fields.timeLimitSeconds),
          newTime = currentTime + sec, //calculate the new time
          seconds = (newTime % 60).toString(), //get the seconds using the modulus operator and convert to a string (so we can use length below)
          minute = (Math.floor(newTime / 60)).toString();// get the hours and convert to a string
		  	
	      //make sure we've got the right length for the seconds string
	      if (seconds.length === 0){
	        seconds = "00";
	      }
	      else if(seconds.length === 1){
	        seconds = "0" + seconds;
	      }

	      if (minute.length === 0){
	        minute = "00";
	      }
	      else if (minute.length === 1){
	        minute = "0" + minute;
	      }

	      if (parseInt(minute) === 5 || parseInt(minute) > 5) {
	      	minute = '05';
	      	seconds = '00';
	      }
	      else if (parseInt(minute) < 1 && (parseInt(seconds) === 0 || parseInt(seconds) < 10)) {
	      	minute = '00';
	      	seconds = '10';
	      }

		  console.log('minute--->',minute);			
		fields['timeLimit'] = minute + ":" + seconds;
		fields['timeLimitSeconds'] = newTime;
		console.log(fields);
		this.setState({fields});
    }


	handleChange(field, e){   

        let fields = this.state.fields;
        fields[field] = e.target.value; 
        this.setState({fields});

        let errors = {};
        if(field === 'question' && fields["question"].trim() === ''){
            errors["question"] = "Please enter word";
        }

        this.setState({errors: errors});

    }


	updateHandler(e)
    {
    	let fields = this.state.fields;
        let formIsValid = true;

    	let errors = {};
        if(fields["question"].trim() === ''){
            errors["question"] = "Please enter word";formIsValid=false;
        }

        if (this.state.fields.negativeScoring === true || this.state.fields.negativeScoring === 'true')
        {
        	if(fields["hintText"].trim() === ''){
	            errors["hintText"] = "Please enter hint";formIsValid=false;
	        }

        }

        this.setState({errors: errors,tosterMsg:''});

    	if(formIsValid){
			
        	const data = new FormData();
        	data.append('roundId',round_id);
        	data.append('question',this.state.fields.question);
        	data.append('hintText',this.state.fields.hintText);			
			data.append('gameType',gameType);
	        data.append('questionType',2);
			if (this.state.fields.execution_mode === 2 || this.state.fields.execution_mode === '2') {
        		data.append('basePoints',this.state.fields.basePoints);
	        	data.append('timeLimit',this.state.fields.timeLimitSeconds);
	        	data.append('hint',this.state.fields.hint);
	        	data.append('onDemandNegativePoints',this.state.fields.onDemandNegativePoints);
        	}
        	else
        	{
        		data.append('hint',1);
	        	data.append('onDemandNegativePoints',0);
        	}
            fetch(configuration.baseURL+"roundQuestion/roundQuestion/"+question_id, {
                method: "PUT",
                headers: {
					'contentType': "application/json",
                    'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
                },
                body:data
            }).then((response) => {
                return response.json();
            }).then((data) => {
                this.props.history.push('/round_words/'+contest_id+'/'+round_id);
                
            });
        }
    }

    
	render() {
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
	                                        <h3>Edit {gameType} Word</h3>  
	                                    </div> 
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div style={{paddingTop: '30px'}} className="contest-info">
	                        <div className="row">
		                        {(this.state.tosterMsg != '') ? (
	                                <div className="tosterMsg tosterMsgQue">
	                                    <button type="button" className="close"  onClick={() => { this.setState({tosterMsg:''})}}>
	                                        <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
	                                    </button>
	                                    <span>{this.state.tosterMsg}</span>
	                                </div>) : null
	                            }
	                        </div>
	                        <div className="row">
				               

							{

								(this.state.fields['execution_mode'] === 2 || this.state.fields['execution_mode'] === "2") ? (
									<div className="col-lg-4 col-md-6 col-sm-12">
									<div>
										<div style={{margin: '0px 0 5px 0'}} className="cus_input ">
											<img src="./murabbo/img/clock.svg" alt="Upload"/> <label className="cus_label">Time Limit</label>
										</div>

										<div className="number">
											<span className="minus" style={{cursor:'pointer'}}><img src="./murabbo/img/minus.svg" onClick={this.btnClickHandler.bind(this,"minus")}/></span>
											<input type="text" value={this.state.fields['timeLimit']}  />
											<span className="plus" style={{cursor:'pointer'}}><img src="./murabbo/img/plus.svg" onClick={this.btnClickHandler.bind(this,"plus")}/></span>
										</div>
										<div style={{margin: '0px 0 5px 0'}} className="cus_input ">
											<label style={{paddingLeft: '5px'}} className="cus_label">Base Points</label>
										</div>
										<div className="range-wrap">
										<input min="0" max="100" value={this.state.fields['basePoints']} onChange={this.handleChange.bind(this,'basePoints')}  step="1" type="range" className="range" id="range" />
										<output className="bubble">{this.state.fields['basePoints']}</output>
										</div>
									
									</div>
									
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
										</div> 
									: null }

									</div>) : <div className="col-lg-4 col-md-6 col-sm-12"> </div>
								}

								<div className="col-lg-4 col-md-6 col-sm-12">
									<div className="cus_input input_wrap">
										<img src="./murabbo/img/help.svg" alt="Upload"/> <input type="text" required name="" onChange={this.handleChange.bind(this,'question')} value={this.state.fields['question']} />
										<label>Add Word</label>
									</div>
									<span  className="error-msg">{this.state.errors["question"]}</span>
									
								<div className="cus_input input_wrap">
										<img src="./murabbo/img/info.svg" alt="Upload"/> <input type="text" required name="" onChange={this.handleChange.bind(this,'hintText')} value={this.state.fields['hintText']} />
										<label>Hint</label>
									</div>
									<span  className="error-msg">{this.state.errors["hintText"]}</span>
								</div>
							</div>	
	                    </div>
						
	                    <div className="contest-info">
	                        <div className="contest-title">
	                            <div className="row">
	                                <div className="col-md-12">
	                                    <div className="footer-btn">
											<button className="blue_btn light_blue_btn" type="button"  onClick={this.updateHandler.bind(this) } >Submit</button>
											<button class="yellow_btn" type="button" style={{marginLeft:'10px'}} onClick={() => {this.props.history.push('/round_words/'+contest_id+'/'+round_id) }}>Cancel</button>
	                                    </div> 
	                                </div>
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

export default EditRoundWord