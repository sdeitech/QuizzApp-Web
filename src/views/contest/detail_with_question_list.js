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
let contestId,roundId;
class DetailContestWithQuestionList extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	contestData:{},
        	roundData:{},
        	listArr:[],
        	selectedAnswer:[],
        	indexQuestion:0,
			gameId:''
		};
	}

	componentDidMount(){

		var url = window.location.href;

		var urlParts =url.substring(url.lastIndexOf('/') + 1);
        urlParts = urlParts.split('?');

        if (urlParts[1]) {
        	roundId = urlParts[1];
        }
        if (urlParts[0]) {
        	contestId = urlParts[0];

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
        }
        if (contestId && roundId) {

        	fetch(configuration.baseURL+"round/round?roundId="+roundId, {
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
		   			this.setState({roundData:data[0]});
	   			}
	   			else
	   			{
		   			this.setState({roundData:{}});
	   			}
			});	


			var postData = {};
	    	postData.contestId=contestId;
	    	postData.roundId=roundId;
	    	postData.createdBy=JSON.parse(reactLocalStorage.get('userData')).userId;
	    	// console.log(postData);
	        fetch(configuration.APIbaseURL+"game/game", {
	            method: "post",
	            headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
	                'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
	            },
	            body:JSON.stringify(postData)
	        }).then((response) => {
	            return response.json();
	        }).then((data) => {
	            if(data.code === 200){
	            	  this.setState({gameId:data.data._id})
	            	  
	            }
	            else
	            {
	                return toast.error(data.message);
	            }
	        });  

			this.getList(roundId);
		}
	}

	saveExitAnswer(){

	}

	saveIndexAnswer(){
		var temp = false;
		let fields = this.state.listArr;
		fields[this.state.indexQuestion]['readonly'] = true;
		for (var i = 0; i < this.state.listArr[this.state.indexQuestion]['answers'].length; i++) {
			//console.log(this.state.listArr[this.state.indexQuestion]['selectAnswer'].includes(this.state.listArr[this.state.indexQuestion]['answers'][i].answer) && this.state.listArr[this.state.indexQuestion]['answers'][i].correctAnswer === true);
			if(this.state.listArr[this.state.indexQuestion]['selectAnswer'].includes(this.state.listArr[this.state.indexQuestion]['answers'][i].answer) && this.state.listArr[this.state.indexQuestion]['answers'][i].correctAnswer === true){
				temp = true;
				break;
			}
		}

		if (temp) {
			fields[this.state.indexQuestion]['isAnswerTrue'] = true; 
		}
		this.setState({listArr:fields});

		var that = this;
		setTimeout(function () {
			if (that.state.indexQuestion < that.state.listArr.length && that.state.listArr[that.state.indexQuestion]['answerType'] === 2) {
	    		that.setState({indexQuestion:that.state.indexQuestion+1})
	    	}
	    	else
	    	{
	    		that.saveExitAnswer();	
	    	}
		}, 2000);
	}	

	handleSingleSelectChange(index,e){
		let fields = this.state.listArr;
		fields[index]['selectAnswer'] = e.answer; 
    	fields[index]['isAnswerTrue'] = e.correctAnswer; 
    	fields[index]['readonly'] = true; 
    	this.setState({listArr:fields});

    	var that = this;
    	setTimeout(function () {
            if (index < that.state.listArr.length) {
	    		that.setState({indexQuestion:index+1})
	    	}
	    	else
	    	{
	    		that.saveExitAnswer();	
	    	}
	    }, 2000);
       
	}



	handleMultiSelectChange(index,e){
		let fields = this.state.listArr;

		if(Array.isArray(fields[index]['selectAnswer'])) {
			if (fields[index]['selectAnswer'].includes(e.answer)) {
				var arrindex = fields[index]['selectAnswer'].indexOf(e.answer);
			    if (arrindex > -1) {
			        fields[index]['selectAnswer'].splice(arrindex, 1);
			    }
			}
			else
			{
				fields[index]['selectAnswer'].push(e.answer);
			}
		}
		else
		{
			fields[index]['selectAnswer'] = [];
			fields[index]['selectAnswer'].push(e.answer);
		}

    	this.setState({listArr:fields});
       
	}

	handleTrueFalseSelectChange(index,isTrue)
	{

		let fields = this.state.listArr;
		fields[index]['selectAnswer'] = isTrue; 
    	fields[index]['isAnswerTrue'] = (this.state.listArr[index]['answerTypeBoolean'] === isTrue) ? true : false; 
    	fields[index]['readonly'] = true; 
    	this.setState({listArr:fields});
    	var that = this;
    	setTimeout(function () {
            if (index < that.state.listArr.length) {
	    		that.setState({indexQuestion:index+1})
	    	}
	    	else
	    	{
	    		that.saveExitAnswer();	
	    	}
	    }, 2000);

    	

	}

	getList(roundId1)
	{
		fetch(configuration.baseURL+"roundQuestion/roundQuestion?roundId="+roundId1, {
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
	   		this.startTimer();
		});	
	}

	startTimer(){
    	let fields = this.state.listArr;
    	if (this.state.listArr.length > 0) {
    		var that = this;
	    	setTimeout(function () {

	    		fields = fields[that.state.indexQuestion];
	    		// console.log(fields);

		      	var currentTime = parseInt(fields['timeLimit']),
		          newTime = currentTime - 1, //calculate the new time
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

						
			fields['displaytimeLimit'] = minute + ":" + seconds;
			fields['timeLimit'] = newTime;
			that.setState({fields:fields});
			if (newTime === 0) {
				if (that.state.indexQuestion < that.state.listArr.length) {
		    		that.setState({indexQuestion:that.state.indexQuestion+1})
		    	}
		    	else
		    	{
		    		that.saveExitAnswer();	
		    	}
			}
			else
			{

				that.startTimer();	
			}
			}, 1000);
	    }
    }
	render() {
		return (
			<>
				<TheHeaderInner />		
				<ToastContainer position="top-right" autoClose={10000} style={{top:'80px'}}/>		
					<main id="main">
		            <section id="hero" class="d-flex align-items-center width75">
		                <div class="quizz-game">
		                    <h3>{this.state.contestData.title}</h3>
		                    <p>{this.state.roundData.gameType}</p>
		                    <div class="quizz-quas">
		                    { (this.state.listArr[this.state.indexQuestion]) ?
		                        <h4>Question {this.state.indexQuestion+1}/{this.state.listArr.length}</h4>
		                        :
		                        <h4>Question {this.state.listArr.length}/{this.state.listArr.length}</h4>
		                    }


		                        {
		                        	this.state.listArr.map((e, key) => {
		                        		let classname = (key === this.state.indexQuestion) ? "step_progress yellow_" : 
		                        		(typeof e.selectAnswer !== 'undefined') ? ((e.isAnswerTrue) ? "step_progress blue_" : "step_progress pink_") : "step_progress";
                                        return <div className={classname}></div>
                                    })
		                        }		                        
		                        <div id="app">
				                    <div class="base-timer">
		                              <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
		                                <g class="base-timer__circle">
		                                  <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
		                                  <path id="base-timer-path-remaining" stroke-dasharray="-2 283" class="base-timer__path-remaining red" d="
		                                      M 50, 50
		                                      m -45, 0
		                                      a 45,45 0 1,0 90,0
		                                      a 45,45 0 1,0 -90,0
		                                    "></path>
		                                </g>
		                              </svg>
		                              	{ (this.state.listArr[this.state.indexQuestion]) ?
					                        <span id="base-timer-label" class="base-timer__label">{(this.state.listArr[this.state.indexQuestion]['displaytimeLimit']) ? this.state.listArr[this.state.indexQuestion]['displaytimeLimit'] : '00:00'}</span>
					                        :
					                        <span id="base-timer-label" class="base-timer__label">00:00</span>
					                    }
		                              
		                            </div>
		                        </div>
		                    </div>   
		                    { (this.state.listArr[this.state.indexQuestion]) ? 
			                    <div class="qus">
			                        <h3>{this.state.listArr[this.state.indexQuestion]['question']}</h3>

			                        <div class="answer-option">

			                        	{
			                        		(this.state.listArr[this.state.indexQuestion]['answerType'] === 1) ? 

			                        			this.state.listArr[this.state.indexQuestion]['answers'].map((e, key) => {
			                        				var forclass=e._id+key;
		                                            return <p class={
		                                            		(this.state.listArr[this.state.indexQuestion]['selectAnswer']) ? 
		                                            		(this.state.listArr[this.state.indexQuestion]['selectAnswer'] === e.answer && e.correctAnswer === true) ? 
		                                            			'fancy2 highlight' : 
	                                            				(this.state.listArr[this.state.indexQuestion]['selectAnswer'] === e.answer && e.correctAnswer === false) ? 'fancy2 pinkhighlight' : 'fancy2' 
	                                            				: 'fancy2'
	                                            			}>
							                                <label >
							                                    
					                                    		{(key === 0) ? <b class="option_ _a">A</b> : null}
					                                    		{(key === 1) ? <b class="option_ _b">B</b> : null}
					                                    		{(key === 2) ? <b class="option_ _c">C</b> : null}
					                                    		{(key === 3) ? <b class="option_ _d">D</b> : null}
					                                    		{(key === 4) ? <b class="option_ _e">E</b> : null}
					                                    		{(key === 5) ? <b class="option_ _f">F</b> : null}
							                                    
							                                    {(this.state.listArr[this.state.indexQuestion]['selectAnswer'] === e.answer && e.correctAnswer === true) ? 
							                                    	<input id={forclass} name={this.state.listArr[this.state.indexQuestion]['_id']} type="radio" onChange={this.handleSingleSelectChange.bind(this,this.state.indexQuestion,e)} value={e.answer} checked="checked" disabled={(e.readonly) ? 'disabled':''} /> : 
							                                    	<input id={forclass} name={this.state.listArr[this.state.indexQuestion]['_id']} type="radio" onChange={this.handleSingleSelectChange.bind(this,this.state.indexQuestion,e)} value={e.answer}  disabled={(e.readonly) ? 'disabled':''} />
							                                    }							                                    
							                                    <span for={forclass}>{e.answer}</span>
							                                </label>
							                            </p>
	                                        	})

			                        		: null
			                        	}

			                        	{
			                        		(this.state.listArr[this.state.indexQuestion]['answerType'] === 2) ? 
			                        		<div>
				                        		{
					                        		this.state.listArr[this.state.indexQuestion]['answers'].map((e, key) => {
					                        				var forclass=e._id+key;
					                        				// var pcalss = (this.state.listArr[this.state.indexQuestion]['selectAnswer']) ? 
							                             //                		(this.state.listArr[this.state.indexQuestion]['selectAnswer'].includes(e.answer) && e.correctAnswer === true) ? 
							                             //                			'fancy2 highlight' : 
						                              //               				(this.state.listArr[this.state.indexQuestion]['selectAnswer'] && this.state.listArr[this.state.indexQuestion]['selectAnswer'].includes(e.answer) && e.correctAnswer === false) ? 'fancy2 pinkhighlight' : 'fancy2' 
						                              //               				: 'fancy2';
						                              	var innnerpclass ="fancy2 fancy2_"+key;
							                            var pcalss = (this.state.listArr[this.state.indexQuestion]['selectAnswer'] && this.state.listArr[this.state.indexQuestion]['selectAnswer'].includes(e.answer)) ? innnerpclass : "fancy2";
						                           		var inputclass = "input_"+key;
				                                            return <p class={pcalss}>
									                                <label>
									                                    
							                                    		{(key === 0) ? <b class="option_ _a">A</b> : null}
							                                    		{(key === 1) ? <b class="option_ _b">B</b> : null}
							                                    		{(key === 2) ? <b class="option_ _c">C</b> : null}
							                                    		{(key === 3) ? <b class="option_ _d">D</b> : null}
							                                    		{(key === 4) ? <b class="option_ _e">E</b> : null}
							                                    		{(key === 5) ? <b class="option_ _f">F</b> : null}
								                                    
									                                    {(this.state.listArr[this.state.indexQuestion]['selectAnswer'] && this.state.listArr[this.state.indexQuestion]['selectAnswer'].includes(e.answer) && e.correctAnswer === true) ? 
									                                    	<input id={forclass} className={inputclass} name={this.state.listArr[this.state.indexQuestion]['_id']} type="checkbox" onChange={this.handleMultiSelectChange.bind(this,this.state.indexQuestion,e)} value={e.answer} checked="checked"   disabled={(e.readonly) ? 'disabled':''} /> : 
									                                    	<input id={forclass} className={inputclass} name={this.state.listArr[this.state.indexQuestion]['_id']} type="checkbox" onChange={this.handleMultiSelectChange.bind(this,this.state.indexQuestion,e)} value={e.answer} disabled={(e.readonly) ? 'disabled':''}  />
									                                    }							                                    
									                                    <span for={forclass}>{e.answer}</span>
									                                </label>
									                            </p>
			                                        	})
					                        	}
				                        		<div class="align-self-center">
				                                	<button style={{minWidth: '150px'}} class="pink_btn" type="button" onClick={this.saveIndexAnswer.bind(this)}>Save</button>
				                                </div>
			                                </div>

			                        		: null
			                        	}

			                        	{
			                        		(this.state.listArr[this.state.indexQuestion]['answerType'] === 5) ? 
			                        			
			                        			<div>
		                        					<p class={ (this.state.listArr[this.state.indexQuestion]['selectAnswer']) ? 
		                                            		(this.state.listArr[this.state.indexQuestion]['isAnswerTrue'] === true) ? 
		                                            			'fancy2 highlight' : 
	                                            				(this.state.listArr[this.state.indexQuestion]['isAnswerTrue'] === false) ? 'fancy2 pinkhighlight' : 'fancy2' 
	                                            				: 'fancy2' }>
						                                <label >
						                                    <b class="option_ _a">A</b>
						                                    <input id="trueFalse" name={this.state.listArr[this.state.indexQuestion]['_id']} type="radio" onChange={this.handleTrueFalseSelectChange.bind(this,this.state.indexQuestion,true)} value='true' disabled={(this.state.listArr[this.state.indexQuestion]['readonly']) ? 'disabled':''}   />
						                                    <span for="trueFalse">True</span>
						                                </label>
						                            </p>
						                            <p class={ (this.state.listArr[this.state.indexQuestion]['selectAnswer']) ? 
		                                            		(this.state.listArr[this.state.indexQuestion]['isAnswerTrue'] === false) ? 
		                                            			'fancy2 highlight' : 
	                                            				(this.state.listArr[this.state.indexQuestion]['isAnswerTrue'] === true) ? 'fancy2 pinkhighlight' : 'fancy2' 
	                                            				: 'fancy2' }>
						                                <label >
						                                    <b class="option_ _b">B</b>
						                                    <input id="trueFalse" name={this.state.listArr[this.state.indexQuestion]['_id']} type="radio" onChange={this.handleTrueFalseSelectChange.bind(this,this.state.indexQuestion,false)} value='false' disabled={(this.state.listArr[this.state.indexQuestion]['readonly']) ? 'disabled':''}  />
						                                    <span for="trueFalse">False</span>
						                                </label>
						                            </p>
			                        			</div>
			                        			
			                        		: null
			                        	}			                            

			                        </div>

			                        <div class="align-self-center">
	                                	<button style={{minWidth: '150px'}} class="pink_btn" type="button" onClick={this.saveExitAnswer.bind(this)}>Exit</button>
	                                </div>
			                    </div> :
			                    null 
		                	}
		                </div>
		            </section>
		            
		  

		        </main>
		    </>
		)
	}
}

export default DetailContestWithQuestionList
