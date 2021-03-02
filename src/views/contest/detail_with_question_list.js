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
		});	
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
		                    <p>{this.state.roundData.ga}</p>
		                    <div class="quizz-quas">
		                        <h4>Question 1/10</h4>

		                        <div class="step_progress blue_"></div>
		                        <div class="step_progress yellow_"></div>
		                        <div class="step_progress"></div>
		                        <div class="step_progress"></div>
		                        <div class="step_progress"></div>
		                        <div class="step_progress"></div>
		                        <div class="step_progress"></div>
		                        <div class="step_progress"></div>
		                        <div class="step_progress"></div>
		                        <div class="step_progress"></div>
		                        
		                        <div id="app"></div>
		                    </div>   

		                    <div class="qus">
		                        <h3>What is the Fastest animal in the world?</h3>

		                        <div class="answer-option">
		                            <p class="fancy2">
		                                <label >
		                                    <b class="option_">A</b>
		                                    <input id="Cookies" name="yaybox" type="radio" value="Cookies" />
		                                    <span for="Cookies">Turtle</span>
		                                </label>
		                            </p>
		                            <p class="fancy2">
		                                <label >
		                                    <b class="option_">B</b>
		                                    <input id="Cookies" name="yaybox" type="radio" value="Cookies" />
		                                    <span for="Cookies">Cheetah</span>
		                                </label>
		                            </p>
		                            <p class="fancy2">
		                                <label >
		                                    <b class="option_">C</b>
		                                    <input id="Cookies" name="yaybox" type="radio" value="Cookies" />
		                                    <span for="Cookies">Rabit</span>
		                                </label>
		                            </p>
		                            <p class="fancy2">
		                                <label >
		                                    <b class="option_">D</b>
		                                    <input id="Cookies" name="yaybox" type="radio" value="Cookies" />
		                                    <span for="Cookies">Leapard</span>
		                                </label>
		                            </p>
		                            <p class="fancy2">
		                                <label >
		                                    <b class="option_">E</b>
		                                    <input id="Cookies" name="yaybox" type="radio" value="Cookies" />
		                                    <span for="Cookies">Tiger</span>
		                                </label>
		                            </p>
		                            <p class="fancy2">
		                                <label >
		                                    <b class="option_">F</b>
		                                    <input id="Cookies" name="yaybox" type="radio" value="Cookies" />
		                                    <span for="Cookies">"Rattle Snake</span>
		                                </label>
		                            </p>

		                        </div>
		                    </div>
		                </div>
		            </section>
		            
		  

		        </main>
		    </>
		)
	}
}

export default DetailContestWithQuestionList
