import React, { Component } from 'react'
import {
	TheFooter,
	TheHeaderInner
} from '../../containers/index'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import languages from '../../languages';
import configuration from '../../config';
import { reactLocalStorage } from 'reactjs-localstorage';
import {
	CModal,
	CModalBody,
} from '@coreui/react';
import $ from 'jquery';
let contestId, roundId, gameType, parentContestId;
class DetailContestWithQuestionList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contestData: {},
			roundData: {},
			listArr: [],
			openModel: false,
			errors: {

			},
			fields: {
				title: "",
				description: "",
			},

			blankRoundObj: {},
			contestCreater: false,
			createdBy: '',
			selectedAnswer: [],
			indexQuestion: 0,
			indexRound: 0,
			showQuestion: false,
			gameId: '',
			freeTextAnswer: '',
			saveExitAnswer: false,
			numberArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
			alphabetArray: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
		};
	}

	componentDidMount() {

		var url = window.location.href;

		var urlParts = url.substring(url.lastIndexOf('/') + 1);
		urlParts = urlParts.split('?');

		if (urlParts[1]) {
			roundId = urlParts[1];
		}
		if (urlParts[0]) {
			contestId = urlParts[0];

			fetch(configuration.baseURL + "contest/contest?contestId=" + contestId, {
				method: "GET",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
				}
			}).then((response) => {
				return response.json();
			}).then((data) => {
				if (data.data.length > 0) {

					parentContestId = data.data[0]._id;
					this.setState({ contestData: data.data[0] });

					let createdBy = data.data[0].createdBy;
					this.setState({ createdBy: createdBy });
				}
			});
		}

		// console.log(contestId,roundId);
		if (contestId && roundId) {

			fetch(configuration.baseURL + "round/round?contestId=" + contestId, {
				method: "GET",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
				}
			}).then((response) => {
				return response.json();
			}).then((data) => {
				if (data.data.length > 0) {
					var data = data.data;
					this.setState({ roundData: data });
				}
				else {
					this.setState({ roundData: {} });
				}
			});

		}
	}

	handleChange(field, e) {
		let fields = this.state.fields;
		fields[field] = e.target.value;
		this.setState({ fields });

		let errors = {};
		if (field === "title" && fields["title"].trim() === "") {
			errors["title"] = "Please enter title";
			return
		}
		if (field === "description" && fields["description"].trim() === "") {
			errors["description"] = "Please enter description";
			return
		}
		this.setState({ errors: errors });
	}

	handleSubmit() {
		let fields = this.state.fields;
		let errors = {};
		let formIsValid = true;
		this.setState({ fields });
		// if (fields["title"].trim() === "") {
		//     formIsValid = false;
		//     errors["title"] = "Please enter title";
		// }

		if (!fields["description"]) {
			formIsValid = false;
			errors["description"] = "Please select description";
		}
		this.setState({ errors: errors });
		if (formIsValid) {
			this.setState({ openModel: false })
			const data = new FormData();
			// data.append("title", this.state.fields.title);
			data.append("description", this.state.fields.description);
			data.append("contestId", parentContestId);
			// data.append("roomId", roomId);
			data.append("userId", JSON.parse(reactLocalStorage.get('userData')).userId)

			fetch(configuration.baseURL + "report", {
				method: "post",
				headers: {
					contentType: "application/json",
					Authorization:
						"Bearer " + reactLocalStorage.get("clientToken"),
				},
				body: data,
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					if (data.code === 200) {
						let fields = this.state.fields;
						// fields['title'] = '';
						fields['description'] = '';
						this.setState({ fields });
						toast.success(data.message);
						// setTimeout(() => {
						// 	this.props.history.push('/dashboard');
						// }, 2000)
					} else {
						return toast.error(data.message);
					}
				});
		}

	}

	saveExitAnswer() {
		console.log("indexRound saveExitAnswer ---  ", this.state.indexRound + 1);
		if (this.state.roundData[this.state.indexRound + 1] !== undefined) {
			this.setState({ saveExitAnswer: false, showQuestion: false, indexRound: this.state.indexRound + 1 });
		}
		else {
			this.setState({ saveExitAnswer: true });
		}
	}

	saveIndexAnswer() {
		var temp = false;
		let fields = this.state.listArr;

		fields[this.state.indexQuestion]['readonly'] = true;

		if (this.state.listArr[this.state.indexQuestion]['selectAnswer'] === undefined) {
			fields[this.state.indexQuestion]['selectAnswer'] = "";
			fields[this.state.indexQuestion]['isAnswerTrue'] = false;
		}
		else {
			for (var i = 0; i < this.state.listArr[this.state.indexQuestion]['answers'].length; i++) {
				if (this.state.listArr[this.state.indexQuestion]['selectAnswer'] !== undefined && this.state.listArr[this.state.indexQuestion]['selectAnswer'].includes(this.state.listArr[this.state.indexQuestion]['answers'][i]._id) && this.state.listArr[this.state.indexQuestion]['answers'][i].correctAnswer === true) {
					temp = true;
					break;
				}
			}
		}


		if (temp) {
			fields[this.state.indexQuestion]['isAnswerTrue'] = true;
		}
		this.setState({ listArr: fields });

		this.countScore(this.state.indexQuestion);
		var that = this;
		setTimeout(function () {
			if (that.state.indexQuestion < that.state.listArr.length && that.state.listArr[that.state.indexQuestion]['answerType'] === 2) {
				that.setState({ indexQuestion: that.state.indexQuestion + 1 })
			}
			else {
				that.saveExitAnswer();
			}
		}, 2000);
	}

	handleSingleSelectChange(index, e) {
		let fields = this.state.listArr;
		fields[index]['selectAnswer'] = e._id;
		fields[index]['isAnswerTrue'] = e.correctAnswer;
		fields[index]['readonly'] = true;
		this.setState({ listArr: fields });
		this.countScore(this.state.indexQuestion);
		var that = this;
		setTimeout(function () {
			if (index < that.state.listArr.length) {
				that.setState({ indexQuestion: index + 1 })
			}
			else {
				that.saveExitAnswer();
			}
		}, 2000);

	}

	handleMultiSelectChange(index, e) {
		let fields = this.state.listArr;

		if (Array.isArray(fields[index]['selectAnswer'])) {
			if (fields[index]['selectAnswer'].includes(e._id)) {
				var arrindex = fields[index]['selectAnswer'].indexOf(e._id);
				if (arrindex > -1) {
					fields[index]['selectAnswer'].splice(arrindex, 1);
				}
			}
			else {
				fields[index]['selectAnswer'].push(e._id);
			}
		}
		else {
			fields[index]['selectAnswer'] = [];
			fields[index]['selectAnswer'].push(e._id);
		}

		this.setState({ listArr: fields });

	}

	handleTrueFalseSelectChange(index, isTrue) {

		let fields = this.state.listArr;
		fields[index]['selectAnswer'] = isTrue;
		fields[index]['isAnswerTrue'] = (this.state.listArr[index]['answerTypeBoolean'] === isTrue) ? true : false;
		fields[index]['readonly'] = true;
		this.setState({ listArr: fields });
		this.countScore(this.state.indexQuestion);
		var that = this;
		setTimeout(function () {
			if (index < that.state.listArr.length) {
				that.setState({ indexQuestion: index + 1 })
			}
			else {
				that.saveExitAnswer();
			}
		}, 2000);
	}

	getList(roundId1) {
		fetch(configuration.baseURL + "roundQuestion/roundQuestion?roundId=" + roundId1 + "&gameType=" + gameType, {
			method: "GET",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
			}
		}).then((response) => {
			return response.json();
		}).then((data) => {
			var data = data.data;
			for (let index = 0; index < data.length; index++) {
				data[index]['right_words'] = [];
				data[index]['wrong_words'] = [];
			}
			this.setState({ listArr: data, showQuestion: true, indexQuestion: 0 });
			this.startTimer();
		});



		
	}

	startTimer() {

		
		// if(this.state.roundData[this.state.indexRound].gameType === 'Blank'){
		// let fields = this.state.roundData;
		// var that = this;
		// if (this.state.roundData.length > 0 && fields[that.state.indexRound] !== undefined) {
		// 	setTimeout(function () {


		// 		var newTime = 0;
		// 		if (fields[that.state.indexRound] !== undefined && fields[that.state.indexRound]['timeLimit'] !== undefined) {
		// 			var currentTime = parseInt(fields[that.state.indexRound]['timeLimit']);

		// 			if (fields[that.state.indexRound]['timeAlloted'] === undefined) {
		// 				fields[that.state.indexRound]['timeAlloted'] = currentTime;
		// 			}
		// 			// console.log('timeLimit--->',fields[that.state.indexRound]['timeLimit']);

		// 			newTime = currentTime - 1;
		// 			var seconds = (newTime % 60).toString();
		// 			var minute = (Math.floor(newTime / 60)).toString();


		// 			if (seconds.length === 0) {
		// 				seconds = "00";
		// 			}
		// 			else if (seconds.length === 1) {
		// 				seconds = "0" + seconds;
		// 			}

		// 			if (minute.length === 0) {
		// 				minute = "00";
		// 			}
		// 			else if (minute.length === 1) {
		// 				minute = "0" + minute;
		// 			}

		// 			fields[that.state.indexRound]['displaytimeLimit'] = minute + ":" + seconds;
		// 			fields[that.state.indexRound]['timeLimit'] = newTime;
		// 			that.setState({ roundData: fields });

		// 		}



		// 		if (newTime === 0) {

		// 			that.setState({ roundData: fields });
		// 				that.saveExitAnswer();
					
		// 		}
		// 		else {

		// 			that.startTimer();
		// 		}
		// 	}, 1000);
		// }
		// else {
		// 	that.saveExitAnswer();
		// }
		// }else{

		// }	

		

		let fields = this.state.listArr;
		var that = this;
		if (this.state.listArr.length > 0 && fields[that.state.indexQuestion] !== undefined) {
			setTimeout(function () {


				var newTime = 0;
				if (fields[that.state.indexQuestion] !== undefined && fields[that.state.indexQuestion]['timeLimit'] !== undefined) {
					var currentTime = parseInt(fields[that.state.indexQuestion]['timeLimit']);

					if (fields[that.state.indexQuestion]['timeAlloted'] === undefined) {
						fields[that.state.indexQuestion]['timeAlloted'] = currentTime;
					}
					// console.log('timeLimit--->',fields[that.state.indexQuestion]['timeLimit']);

					newTime = currentTime - 1;
					var seconds = (newTime % 60).toString();
					var minute = (Math.floor(newTime / 60)).toString();


					if (seconds.length === 0) {
						seconds = "00";
					}
					else if (seconds.length === 1) {
						seconds = "0" + seconds;
					}

					if (minute.length === 0) {
						minute = "00";
					}
					else if (minute.length === 1) {
						minute = "0" + minute;
					}

					fields[that.state.indexQuestion]['displaytimeLimit'] = minute + ":" + seconds;
					fields[that.state.indexQuestion]['timeLimit'] = newTime;
					that.setState({ listArr: fields });

				}



				if (newTime === 0) {

					if (that.state.indexQuestion < that.state.listArr.length) {
						fields[that.state.indexQuestion]['selectAnswer'] = "";
						fields[that.state.indexQuestion]['isAnswerTrue'] = false;
						that.setState({ listArr: fields });
						that.countScore(that.state.indexQuestion);
						that.setState({ indexQuestion: that.state.indexQuestion + 1 })
						that.startTimer();
					}
					else {
						that.saveExitAnswer();
					}
				}
				else {

					that.startTimer();
				}
			}, 1000);
		}
		else {
			that.saveExitAnswer();
		}

			
	}

	countScore(index) {
		if (this.state.listArr.length > 0 && this.state.listArr[index] !== undefined) {
			var score = 0;
			if (this.state.listArr[index]['isAnswerTrue']) {
				score += this.state.listArr[index]['basePoints'];
			}
			else {
				if (this.state.listArr[index]['negativeScoring']) {
					score = score - this.state.listArr[index]['negativeBasePoints'];
				}
			}
			if (this.state.listArr[index]['hint'] === 3 && this.state.listArr[index]['hintTextStyle'] !== undefined) {
				score = score - this.state.listArr[index]['onDemandNegativePoints'];
			}

			var postData = {};
			postData.gameId = this.state.gameId;
			postData.roundQuestionId = this.state.listArr[index]['_id'];
			postData.selectedAnswer = (this.state.listArr[index]['selectAnswer'] !== undefined && this.state.listArr[index]['selectAnswer'].toString() !== '') ? this.state.listArr[index]['selectAnswer'].toString() : 'false';
			postData.isCorrect = (this.state.listArr[index]['isAnswerTrue'] !== undefined) ? this.state.listArr[index]['isAnswerTrue'] : false;
			postData.score = score;
			postData.timeAlloted = (this.state.listArr[index]['timeAlloted'] !== undefined) ? this.state.listArr[index]['timeAlloted'] : '';
			postData.timeUsed = this.state.listArr[index]['timeLimit'];
			// console.log(postData);
			fetch(configuration.APIbaseURL + "game/submitQuestion", {
				method: "post",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
				},
				body: JSON.stringify(postData)
			}).then((response) => {
				return response.json();
			}).then((data) => {

			});
		}
	}

	handleFreeTextChange(e) {
		this.setState({ freeTextAnswer: e.target.value });
	}

	submitFreeText() {
		var listArr = this.state.listArr;
		listArr[this.state.indexQuestion]['selectAnswer'] = this.state.freeTextAnswer;
		this.setState({ listArr: listArr, freeTextAnswer: '' });

		let fields = this.state.listArr;

		var istrue = false;

		for (var i = 0; i < this.state.listArr[this.state.indexQuestion]['answers'].length; i++) {
			if (this.state.listArr[this.state.indexQuestion]['answers'][i]['answer'] === this.state.listArr[this.state.indexQuestion]['selectAnswer']) {
				istrue = true;
			}
		}

		fields[this.state.indexQuestion]['isAnswerTrue'] = istrue;
		fields[this.state.indexQuestion]['readonly'] = true;
		this.setState({ listArr: fields });
		this.countScore(this.state.indexQuestion);
		var that = this;
		setTimeout(function () {
			if (that.state.indexQuestion < that.state.listArr.length) {
				that.setState({ indexQuestion: that.state.indexQuestion + 1 })
			}
			else {
				that.saveExitAnswer();
			}
		}, 2000);

	}

	changeOnDemand() {
		let fields = this.state.listArr;
		fields[this.state.indexQuestion]['hintTextStyle'] = true;
		this.setState({ listArr: fields });
	}

	checkExistInWord(data) {
		let fields = this.state.listArr;
		if (fields[this.state.indexQuestion]['right_words'] === undefined) {
			fields[this.state.indexQuestion]['right_words'] = [];
		}

		if (fields[this.state.indexQuestion]['wrong_words'] === undefined) {
			fields[this.state.indexQuestion]['wrong_words'] = [];
		}

		if (fields[this.state.indexQuestion]['right_words'].includes(data) === false && fields[this.state.indexQuestion]['wrong_words'].includes(data) === false) {
			if (fields[this.state.indexQuestion]['question'].includes(data)) {
				fields[this.state.indexQuestion]['right_words'].push(data);
			}
			else {
				fields[this.state.indexQuestion]['wrong_words'].push(data);
			}
		}

		this.setState({ listArr: fields });
		if (fields[this.state.indexQuestion]['wrong_words'].length === 6) {
			let fields = this.state.listArr;
			fields[this.state.indexQuestion]['isAnswerTrue'] = false;
			this.setState({ listArr: fields });
			this.countScore(this.state.indexQuestion);
			var that = this;
			setTimeout(function () {
				if (that.state.indexQuestion < that.state.listArr.length) {
					that.setState({ indexQuestion: that.state.indexQuestion + 1 })
				}
				else {
					that.saveExitAnswer();
				}
			}, 2000);
		}

		if (fields[this.state.indexQuestion]['right_words'].length > 0) {
			var wordStrArr = this.state.listArr[this.state.indexQuestion]['question'].split("");
			var trueOrFalse = true;
			for (let index = 0; index < wordStrArr.length; index++) {
				if (fields[this.state.indexQuestion]['right_words'].includes(wordStrArr[index]) === false) {
					trueOrFalse = false;
				}
			}

			if (trueOrFalse) {
				let fields = this.state.listArr;
				fields[this.state.indexQuestion]['isAnswerTrue'] = true;
				this.setState({ listArr: fields });
				this.countScore(this.state.indexQuestion);
				var that = this;
				setTimeout(function () {
					if (that.state.indexQuestion < that.state.listArr.length) {
						that.setState({ indexQuestion: that.state.indexQuestion + 1 })
					}
					else {
						that.saveExitAnswer();
					}
				}, 2000);
			}
		}

	}

	playContest() {
		console.log('indexRound----', this.state.indexRound);
		if (this.state.roundData[this.state.indexRound] !== undefined) {
			roundId = this.state.roundData[this.state.indexRound]._id;

			var postData = {};
			postData.contestId = contestId;
			postData.roundId = roundId;
			postData.createdBy = JSON.parse(reactLocalStorage.get('userData')).userId;
			// console.log(postData);
			fetch(configuration.APIbaseURL + "game/game", {
				method: "post",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
				},
				body: JSON.stringify(postData)
			}).then((response) => {
				return response.json();
			}).then((data) => {
				if (data.code === 200) {
					this.setState({ gameId: data.data._id })
					gameType = this.state.roundData[this.state.indexRound].gameType;
					this.getList(roundId);

					if (JSON.parse(reactLocalStorage.get('userData')).userId == this.state.createdBy) {
						this.setState({ contestCreater: true });
					}
				}
				else {
					return toast.error(data.message);
				}
			});
		}
		else {
			this.saveExitAnswer();
		}
	}

	render() {
		return (
			<>
				<TheHeaderInner />
				<ToastContainer position="top-right" autoClose={10000} style={{ top: '80px' }} />
				<main id="main">

					{(this.state.showQuestion === false) ?
						(this.state.roundData[this.state.indexRound]) ?
							<div className="container">
								<div className="contest-detail-with-round">
									<div class="row">
										<div class="col-lg-12 col-md-1 col-12">
											<div class="cate-box2" >
												<img src='avatars/placeholder.png' alt="Game" className="main" />
												<div class="cat_title2">
													<div className="detailContestWithRoundList">
														<div className="row">
															<div class="cat_title2 col-lg-12 col-md-12">

																<h3 style={{ paddingLeft: '0px' }}>{this.state.roundData[this.state.indexRound].title}</h3>
																<p>{this.state.roundData[this.state.indexRound].description}</p>
																<p>{this.state.roundData[this.state.indexRound].gameType}</p>
																<p>{this.state.roundData[this.state.indexRound].totalQuestions}  {(this.state.roundData[this.state.indexRound].totalQuestions > 1) ? 'Questions' : 'Question'}</p>
															</div>
															<div class="col-lg-12 col-md-12 align-self-center mb-3">
																<button style={{ minWidth: '150px' }} class="yellow_btn" type="button" onClick={this.playContest.bind(this)}>Start Round</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div> : null :

						(this.state.saveExitAnswer === false) ?
							<div>
								{
									(this.state.roundData[this.state.indexRound].gameType === 'Hangman') ?
										<section id="hero" class="d-flex align-items-center">
											<div class="quizz-game" style={{ marginTop: '35px' }}>

												<div className="dropdown show" style={{ float: "right" }}>
													<a className="btn btn-secondary dropdown-toggle toggle-arrow" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
														<i class="fas fa-ellipsis-v"></i>
													</a>

													<div className="dropdown-menu drop-btn-menu" aria-labelledby="dropdownMenuLink">


														{this.state.contestCreater ? (null) : (
															<button style={{ minWidth: '150px' }} class="pink_btn" type="button" onClick={() => {
																this.setState({ openModel: true })
															}}>Report</button>

														)}

														{/* 
											{this.state.isBalnkRound ? (

												this.state.contestCreater ? (<button style={{ minWidth: '150px' }} class="pink_btn" type="button" onClick={this.getParticipants.bind(this)}>Give Score</button>) : (null)


											) : (null)} */}
													</div>
												</div>
												<h3>{this.state.contestData.title}</h3>
												<p>{this.state.roundData[this.state.indexRound].gameType}</p>
												<div class="quizz-quas">
													{(this.state.listArr[this.state.indexQuestion]) ?
														<h4>Round {this.state.indexQuestion + 1}/{this.state.listArr.length}</h4>
														:
														<h4>Round {this.state.listArr.length}/{this.state.listArr.length}</h4>
													}


													{
														this.state.listArr.map((e, key) => {
															let classname = (key === this.state.indexQuestion) ? "step_progress yellow_" :
																(typeof e.isAnswerTrue !== 'undefined') ? ((e.isAnswerTrue) ? "step_progress blue_" : "step_progress pink_") : "step_progress";
															return <div className={classname}></div>
														})
													}
													<div id="app">
														<div class="base-timer">
															<svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
																<g class="base-timer__circle">
																	<circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
																	<span id="base-timer-label" class="base-timer__label"></span>
																	{ /*(this.state.listArr[this.state.indexQuestion]) ?
												var dasharray = this.state.listArr[this.state.indexQuestion]['timeLimit'] + ' 283';					                        
												<path id="base-timer-path-remaining" stroke-dasharray={dasharray} class="base-timer__path-remaining red" d="
												M 50, 50
												m -45, 0
												a 45,45 0 1,0 90,0
												a 45,45 0 1,0 -90,0
												"></path>
												:
												<path id="base-timer-path-remaining" stroke-dasharray=" 283" class="base-timer__path-remaining red" d="
												M 50, 50
												m -45, 0
												a 45,45 0 1,0 90,0
												a 45,45 0 1,0 -90,0
												"></path>*/
																	}
																	<path id="base-timer-path-remaining" stroke-dasharray=" 283" class="base-timer__path-remaining red" d="
												M 50, 50
												m -45, 0
												a 45,45 0 1,0 90,0
												a 45,45 0 1,0 -90,0
												"></path>

																</g>
															</svg>
															{(this.state.listArr[this.state.indexQuestion]) ?
																<span id="base-timer-label" class="base-timer__label">{(this.state.listArr[this.state.indexQuestion]['displaytimeLimit']) ? this.state.listArr[this.state.indexQuestion]['displaytimeLimit'] : '00:00'}</span>
																:
																<span id="base-timer-label" class="base-timer__label">00:00</span>
															}

														</div>
													</div>
												</div>
												{(this.state.listArr[this.state.indexQuestion]) ?
													<div>
														<div class="qus" style={{ marginBottom: "30px" }}>
															{/* <h3>{this.state.listArr[this.state.indexQuestion]['question']}</h3> */}

															{
																(this.state.listArr[this.state.indexQuestion]['hint'] === 2) ?
																	<p className="hintText"><span>Hint - </span>{this.state.listArr[this.state.indexQuestion]['hintText']}</p> :
																	(this.state.listArr[this.state.indexQuestion]['hint'] === 3) ?
																		<p className="hintText">{(this.state.listArr[this.state.indexQuestion]['hintTextStyle'] !== undefined && this.state.listArr[this.state.indexQuestion]['hintTextStyle'] === true) ? this.state.listArr[this.state.indexQuestion]['hintText'] : <button class="blue_btn" onClick={this.changeOnDemand.bind(this)}>Show Hint</button>}</p> : null

															}

															<div class="row">
																<div class="col-md-3 offset-md-1">
																	<img src={"./murabbo/img/hang-" + (this.state.listArr[this.state.indexQuestion]['wrong_words'].length) + ".png"} />
																</div>
																<div style={{ textAlign: "left" }} class="col-md-8">
																	{

																		this.state.listArr[this.state.indexQuestion]['question'].split("").map((e, key) => {
																			return <div class="otpoutput hangman">
																				<input type="text" name="output" id="output" className={"output_" + key} value={(this.state.listArr[this.state.indexQuestion]['right_words'] !== undefined && this.state.listArr[this.state.indexQuestion]['right_words'].includes(e)) ? e : ''} disabled />
																			</div>
																		})
																	}

																</div>
															</div>

															<div class="answer-option3">
																<div class="virtual-keyboard">
																	<div style={{ marginTop: '30px' }} class="numberkey">
																		{
																			this.state.numberArray.map((e, key) => {
																				return <input type="button" value={e} onClick={this.checkExistInWord.bind(this, e)} className={(this.state.listArr[this.state.indexQuestion]['right_words'].includes(e) === true || this.state.listArr[this.state.indexQuestion]['wrong_words'].includes(e) === true) ? (this.state.listArr[this.state.indexQuestion]['right_words'].includes(e)) ? "blue_color_btn gibberish-answer " : "pink_color_btn gibberish-answer " : "gibberish-answer"} />
																			})
																		}
																	</div>
																	<div class="textkey">
																		{
																			this.state.alphabetArray.map((e, key) => {
																				return <input type="button" style={{ textTransform: "capitalize" }} value={e} onClick={this.checkExistInWord.bind(this, e)} className={(this.state.listArr[this.state.indexQuestion]['right_words'].includes(e) === true || this.state.listArr[this.state.indexQuestion]['wrong_words'].includes(e) === true) ? (this.state.listArr[this.state.indexQuestion]['right_words'].includes(e)) ? "blue_color_btn gibberish-answer " : "pink_color_btn gibberish-answer " : "gibberish-answer"} />
																			})
																		}
																	</div>
																</div>
															</div>


														</div>
														<div class="align-self-center" style={{ textAlign: 'center' }}>
															<button style={{ minWidth: '150px' }} class="pink_btn" type="button" onClick={this.saveExitAnswer.bind(this)}>Exit</button>
														</div>
													</div>
													:
													null
												}
											</div>
										</section>
										:
										null

								}

								{
								  (this.state.roundData[this.state.indexRound].gameType === 'Quiz') ?
									<section id="hero" class="d-flex align-items-center">
										<div class="quizz-game" style={{ marginTop: '35px' }}>

											<div className="dropdown show" style={{ float: "right" }}>
												<a className="btn btn-secondary dropdown-toggle toggle-arrow" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
													<i class="fas fa-ellipsis-v"></i>
												</a>

												<div className="dropdown-menu drop-btn-menu" aria-labelledby="dropdownMenuLink">


													{this.state.contestCreater ? (null) : (
														<button style={{ minWidth: '150px' }} class="pink_btn" type="button" onClick={() => {
															this.setState({ openModel: true })
														}}>Report</button>

													)}

													{/* 
											{this.state.isBalnkRound ? (

												this.state.contestCreater ? (<button style={{ minWidth: '150px' }} class="pink_btn" type="button" onClick={this.getParticipants.bind(this)}>Give Score</button>) : (null)


											) : (null)} */}
												</div>
											</div>
											<h3>{this.state.contestData.title}</h3>
											<p>{this.state.roundData[this.state.indexRound].gameType}</p>
											<div class="quizz-quas">
												{(this.state.listArr[this.state.indexQuestion]) ?
													<h4>Question {this.state.indexQuestion + 1}/{this.state.listArr.length}</h4>
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
																<span id="base-timer-label" class="base-timer__label"></span>
																{ /*(this.state.listArr[this.state.indexQuestion]) ?
			                                  	var dasharray = this.state.listArr[this.state.indexQuestion]['timeLimit'] + ' 283';					                        
						                        <path id="base-timer-path-remaining" stroke-dasharray={dasharray} class="base-timer__path-remaining red" d="
			                                      M 50, 50
			                                      m -45, 0
			                                      a 45,45 0 1,0 90,0
			                                      a 45,45 0 1,0 -90,0
			                                    "></path>
						                        :
						                        <path id="base-timer-path-remaining" stroke-dasharray=" 283" class="base-timer__path-remaining red" d="
			                                      M 50, 50
			                                      m -45, 0
			                                      a 45,45 0 1,0 90,0
			                                      a 45,45 0 1,0 -90,0
			                                    "></path>*/
																}
																<path id="base-timer-path-remaining" stroke-dasharray=" 283" class="base-timer__path-remaining red" d="
			                                      M 50, 50
			                                      m -45, 0
			                                      a 45,45 0 1,0 90,0
			                                      a 45,45 0 1,0 -90,0
			                                    "></path>

															</g>
														</svg>
														{(this.state.listArr[this.state.indexQuestion]) ?
															<span id="base-timer-label" class="base-timer__label">{(this.state.listArr[this.state.indexQuestion]['displaytimeLimit']) ? this.state.listArr[this.state.indexQuestion]['displaytimeLimit'] : '00:00'}</span>
															:
															<span id="base-timer-label" class="base-timer__label">00:00</span>
														}

													</div>
												</div>
											</div>
											{(this.state.listArr[this.state.indexQuestion]) ?
												<div>
													<div class="qus" style={{ marginBottom: "30px" }}>


													{this.state.listArr[this.state.indexQuestion]['fileType'] == "image" ? (
															<div style={{
																width: "300px",
																height: "150px",
																marginLeft: "334px"
															}}>
																<img src={this.state.listArr[this.state.indexQuestion]['file']} />
															</div>
														) : (null)}

														{this.state.listArr[this.state.indexQuestion]['fileType'] == "video" ? (
															<div style={{
																width: "300px",
																height: "150px",
																marginLeft: "232px"
															}}>
																<video width="50" height="50" controls autoPlay>
																	<source src={this.state.listArr[this.state.indexQuestion]['file']} type="video/mp4" />
																	This browser doesn't support video tag.
																</video>
															</div>
														) : (null)}

														{this.state.listArr[this.state.indexQuestion]['fileType'] == "audio" ? (
															<div style={{
																width: "300px",
																height: "150px",
																marginLeft: "232px"
															}}>
																<audio controls autoplay>
																	<source src={this.state.listArr[this.state.indexQuestion]['file']} />
																	Your browser does not support the audio element.
																</audio>
															</div>
														) : (null)}

														{this.state.listArr[this.state.indexQuestion]['fileType'] == "link" ? (
															<div style={{
																width: "300px",
																height: "150px",
																marginLeft: "232px"
															}}>

																<iframe width="300" height="150" src={this.state.listArr[this.state.indexQuestion]['file']} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

															</div>
														) : (null)}
														<h3>{this.state.listArr[this.state.indexQuestion]['question']}</h3>

														{
															(this.state.listArr[this.state.indexQuestion]['hint'] === 2) ?
																<p className="hintText"><span>Hint - </span>{this.state.listArr[this.state.indexQuestion]['hintText']}</p> :
																(this.state.listArr[this.state.indexQuestion]['hint'] === 3) ?
																	<p className="hintText">{(this.state.listArr[this.state.indexQuestion]['hintTextStyle'] !== undefined && this.state.listArr[this.state.indexQuestion]['hintTextStyle'] === true) ? this.state.listArr[this.state.indexQuestion]['hintText'] : <button class="blue_btn" onClick={this.changeOnDemand.bind(this)}>Show Hint</button>}</p> : null

														}

														<div class="answer-option">



															{
																(this.state.listArr[this.state.indexQuestion]['answerType'] === 1) ?

																	this.state.listArr[this.state.indexQuestion]['answers'].map((e, key) => {
																		var forclass = e._id + key;
																		return <p class={
																			(this.state.listArr[this.state.indexQuestion]['selectAnswer']) ?
																				(this.state.listArr[this.state.indexQuestion]['selectAnswer'] === e._id && e.correctAnswer === true) ?
																					'fancy2 highlight' :
																					(this.state.listArr[this.state.indexQuestion]['selectAnswer'] === e._id && e.correctAnswer === false) ? 'fancy2 pinkhighlight' : 'fancy2'
																				: 'fancy2'
																		}>
																			<label>

																				{(key === 0) ? <b class="option_ _a">A</b> : null}
																				{(key === 1) ? <b class="option_ _b">B</b> : null}
																				{(key === 2) ? <b class="option_ _c">C</b> : null}
																				{(key === 3) ? <b class="option_ _d">D</b> : null}
																				{(key === 4) ? <b class="option_ _e">E</b> : null}
																				{(key === 5) ? <b class="option_ _f">F</b> : null}

																				{(this.state.listArr[this.state.indexQuestion]['selectAnswer'] === e._id && e.correctAnswer === true) ?
																					<input id={forclass} name={this.state.listArr[this.state.indexQuestion]['_id']} type="radio" onChange={this.handleSingleSelectChange.bind(this, this.state.indexQuestion, e)} value={e.answer} checked="checked" disabled={(e.readonly) ? 'disabled' : ''} /> :
																					<input id={forclass} name={this.state.listArr[this.state.indexQuestion]['_id']} type="radio" onChange={this.handleSingleSelectChange.bind(this, this.state.indexQuestion, e)} value={e.answer} disabled={(e.readonly) ? 'disabled' : ''} />
																				}
																				<span for={forclass}>{e.answer}</span>
																			</label>
																		</p>
																	})

																	: null
															}

															{
																(this.state.listArr[this.state.indexQuestion]['answerType'] === 2) ?
																	<div className="row">
																		<div className="col-12" style={{ marginBottom: "30px" }}>
																			{
																				this.state.listArr[this.state.indexQuestion]['answers'].map((e, key) => {
																					var forclass = e._id + key;
																					// var pcalss = (this.state.listArr[this.state.indexQuestion]['selectAnswer']) ? 
																					//                		(this.state.listArr[this.state.indexQuestion]['selectAnswer'].includes(e.answer) && e.correctAnswer === true) ? 
																					//                			'fancy2 highlight' : 
																					//               				(this.state.listArr[this.state.indexQuestion]['selectAnswer'] && this.state.listArr[this.state.indexQuestion]['selectAnswer'].includes(e.answer) && e.correctAnswer === false) ? 'fancy2 pinkhighlight' : 'fancy2' 
																					//               				: 'fancy2';
																					var innnerpclass = "fancy2 fancy2_" + key;
																					var pcalss = (this.state.listArr[this.state.indexQuestion]['selectAnswer'] && this.state.listArr[this.state.indexQuestion]['selectAnswer'].includes(e._id)) ? innnerpclass : "fancy2";
																					var inputclass = "input_" + key;
																					return <p class={pcalss}>
																						<label>

																							{(key === 0) ? <b class="option_ _a">A</b> : null}
																							{(key === 1) ? <b class="option_ _b">B</b> : null}
																							{(key === 2) ? <b class="option_ _c">C</b> : null}
																							{(key === 3) ? <b class="option_ _d">D</b> : null}
																							{(key === 4) ? <b class="option_ _e">E</b> : null}
																							{(key === 5) ? <b class="option_ _f">F</b> : null}

																							{(this.state.listArr[this.state.indexQuestion]['selectAnswer'] && this.state.listArr[this.state.indexQuestion]['selectAnswer'].includes(e._id) && e.correctAnswer === true) ?
																								<input id={forclass} className={inputclass} name={this.state.listArr[this.state.indexQuestion]['_id']} type="checkbox" onChange={this.handleMultiSelectChange.bind(this, this.state.indexQuestion, e)} value={e.answer} checked="checked" disabled={(e.readonly) ? 'disabled' : ''} /> :
																								<input id={forclass} className={inputclass} name={this.state.listArr[this.state.indexQuestion]['_id']} type="checkbox" onChange={this.handleMultiSelectChange.bind(this, this.state.indexQuestion, e)} value={e.answer} disabled={(e.readonly) ? 'disabled' : ''} />
																							}
																							<span for={forclass}>{e.answer}</span>
																						</label>
																					</p>
																				})
																			}
																		</div>
																		<div class="col-12 align-self-center" style={{ textAlign: 'center' }}>
																			<button style={{ minWidth: '150px' }} class="pink_btn" type="button" onClick={this.saveIndexAnswer.bind(this)}>Save</button>
																		</div>
																	</div>

																	: null
															}

															{
																(this.state.listArr[this.state.indexQuestion]['answerType'] === 3) ?
																	<div className="row">
																		<div className="col-12" style={{ marginBottom: "30px", textAlign: 'center' }}>
																			<div className="cus_input input_wrap">
																				<input type="text" required value={this.state.freeTextAnswer} onChange={this.handleFreeTextChange.bind(this)} style={{ textAlign: 'center' }} />
																			</div>
																		</div>
																		<div className="col-12" style={{ marginBottom: "30px", display: (this.state.listArr[this.state.indexQuestion]['selectAnswer']) ? "block" : "none" }}>
																			{
																				this.state.listArr[this.state.indexQuestion]['answers'].map((e, key) => {
																					var forclass = e._id + key;
																					// var pcalss = (this.state.listArr[this.state.indexQuestion]['selectAnswer']) ? 
																					//                		(this.state.listArr[this.state.indexQuestion]['selectAnswer'].includes(e.answer) && e.correctAnswer === true) ? 
																					//                			'fancy2 highlight' : 
																					//               				(this.state.listArr[this.state.indexQuestion]['selectAnswer'] && this.state.listArr[this.state.indexQuestion]['selectAnswer'].includes(e.answer) && e.correctAnswer === false) ? 'fancy2 pinkhighlight' : 'fancy2' 
																					//               				: 'fancy2';
																					var innnerpclass = "fancy2 fancy2_" + key;
																					var pcalss = (this.state.listArr[this.state.indexQuestion]['selectAnswer'] && this.state.listArr[this.state.indexQuestion]['selectAnswer'].includes(e._id)) ? innnerpclass : "fancy2";
																					var inputclass = "input_" + key;
																					return <p class={pcalss}>
																						<label>

																							{(key === 0) ? <b class="option_ _a">A</b> : null}
																							{(key === 1) ? <b class="option_ _b">B</b> : null}
																							{(key === 2) ? <b class="option_ _c">C</b> : null}
																							{(key === 3) ? <b class="option_ _d">D</b> : null}
																							{(key === 4) ? <b class="option_ _e">E</b> : null}
																							{(key === 5) ? <b class="option_ _f">F</b> : null}

																							{(e.correctAnswer === true) ?
																								<input id={forclass} className={inputclass} name={this.state.listArr[this.state.indexQuestion]['_id']} type="checkbox" value={e.answer} checked="checked" disabled='disabled' /> :
																								<input id={forclass} className={inputclass} name={this.state.listArr[this.state.indexQuestion]['_id']} type="checkbox" value={e.answer} disabled='disabled' />
																							}
																							<span for={forclass}>{e.answer}</span>
																						</label>
																					</p>
																				})
																			}

																		</div>
																		<div class="col-12 align-self-center" style={{ textAlign: 'center' }}>
																			<button style={{ minWidth: '150px' }} class="pink_btn" type="button" onClick={this.submitFreeText.bind(this)}>Save</button>
																		</div>
																	</div>

																	: null
															}

															{
																(this.state.listArr[this.state.indexQuestion]['answerType'] === 5) ?

																	<div>
																		<p class={(this.state.listArr[this.state.indexQuestion]['selectAnswer']) ?
																			(this.state.listArr[this.state.indexQuestion]['isAnswerTrue'] === true) ?
																				'fancy2 highlight' :
																				(this.state.listArr[this.state.indexQuestion]['isAnswerTrue'] === false) ? 'fancy2 pinkhighlight' : 'fancy2'
																			: 'fancy2'}>
																			<label >
																				<b class="option_ _a">A</b>
																				<input id="trueFalse" name={this.state.listArr[this.state.indexQuestion]['_id']} type="radio" onChange={this.handleTrueFalseSelectChange.bind(this, this.state.indexQuestion, true)} value='true' disabled={(this.state.listArr[this.state.indexQuestion]['readonly']) ? 'disabled' : ''} />
																				<span for="trueFalse">True</span>
																			</label>
																		</p>
																		<p class={(this.state.listArr[this.state.indexQuestion]['selectAnswer']) ?
																			(this.state.listArr[this.state.indexQuestion]['isAnswerTrue'] === false) ?
																				'fancy2 highlight' :
																				(this.state.listArr[this.state.indexQuestion]['isAnswerTrue'] === true) ? 'fancy2 pinkhighlight' : 'fancy2'
																			: 'fancy2'}>
																			<label >
																				<b class="option_ _b">B</b>
																				<input id="trueFalse" name={this.state.listArr[this.state.indexQuestion]['_id']} type="radio" onChange={this.handleTrueFalseSelectChange.bind(this, this.state.indexQuestion, false)} value='false' disabled={(this.state.listArr[this.state.indexQuestion]['readonly']) ? 'disabled' : ''} />
																				<span for="trueFalse">False</span>
																			</label>
																		</p>
																	</div>

																	: null
															}

														</div>


													</div>
													<div class="align-self-center" style={{ textAlign: 'center' }}>
														<button style={{ minWidth: '150px' }} class="pink_btn" type="button" onClick={this.saveExitAnswer.bind(this)}>Exit</button>
													</div>
												</div>
												:
												null
											}
										</div>
									</section> : null
										
								 }

                                 {/* {
								  (this.state.roundData[this.state.indexRound].gameType === 'Blank') ?
									<section id="hero" class="d-flex align-items-center">
										<div class="quizz-game" style={{ marginTop: '35px' }}>

											<div className="dropdown show" style={{ float: "right" }}>
												<a className="btn btn-secondary dropdown-toggle toggle-arrow" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
													<i class="fas fa-ellipsis-v"></i>
												</a>

												<div className="dropdown-menu drop-btn-menu" aria-labelledby="dropdownMenuLink">


													{this.state.contestCreater ? (null) : (
														<button style={{ minWidth: '150px' }} class="pink_btn" type="button" onClick={() => {
															this.setState({ openModel: true })
														}}>Report</button>

													)}


												</div>
											</div>
											<h3>{this.state.contestData.title}</h3>
											<p>{this.state.roundData[this.state.indexRound].gameType}</p>
											<div class="quizz-quas">
											<h4>Blank Round</h4>
											<div style={{
													padding: "10px",
													display: "inline"
												}}></div>

                                         <div id="app">
											<div class="base-timer">
												<svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
													<g class="base-timer__circle">
														<circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
														<span id="base-timer-label" class="base-timer__label"></span>
														
														<path id="base-timer-path-remaining" stroke-dasharray=" 283" class="base-timer__path-remaining red" d="
				                                      M 50, 50
				                                      m -45, 0
				                                      a 45,45 0 1,0 90,0
				                                      a 45,45 0 1,0 -90,0
				                                    "></path>

													</g>
												</svg>
												
												{(this.state.roundData[this.state.indexRound]) ?
															<span id="base-timer-label" class="base-timer__label">{(this.state.roundData[this.state.indexRound]['displaytimeLimit']) ? this.state.roundData[this.state.indexRound]['displaytimeLimit'] : '00:00'}</span>
															:
															<span id="base-timer-label" class="base-timer__label">00:00</span>
														}

											</div>
										</div>
								     	</div>
                                         <div class="align-self-center" style={{ textAlign: 'center' }}>
													<button style={{ minWidth: '150px', marginRight: '18px' }} class="pink_btn" type="button"  onClick={()=>{
														this.saveExitAnswer();
													}}>Start Next Round</button>
										</div>
								</div>
							</section>	
									: null
										
								 } */}
							</div>
							:
							<section id="hero" class="d-flex align-items-center">
								<div class="quizz-game width40">
									<div class="quizz-quas">
										<img src="./murabbo/img/star.svg" />
									</div>
									<div class="leaderimg">
										<img class="second" src="./murabbo/img/6.png" />
										<p>2</p>
									</div>
									<div class="leaderimg">
										<img src="./murabbo/img/7.png" />
										<p style={{ background: '#FFC542 0% 0% no-repeat padding-box' }}>1</p>
									</div>
									<div class="leaderimg">
										<img class="third" src="./murabbo/img/8.png" />
										<p>3</p>
									</div>

									<div class="firstthree">
										<div class="_1st">
											<div class="_1stimg">
												<div class="leaderimg2">
													<img src="./murabbo/img/7.png" />
													<p style={{ background: '#FFC542 0% 0% no-repeat padding-box' }}>1</p>
												</div>
												<div class="user-detail">
													<h3>James Pati</h3>
													<p>JamesP</p>
												</div>
												<div class="point">
													<h5>10,586 pt</h5>
												</div>
											</div>
										</div>
										<div class="_1st two_no">
											<div class="_1stimg">
												<div class="leaderimg2">
													<img src="./murabbo/img/6.png" />
													<p>2</p>
												</div>
												<div class="user-detail">
													<h3 style={{ color: '#56D8F1' }}>James Pati</h3>
													<p style={{ color: '#56D8F1' }}>JamesP</p>
												</div>
												<div class="point">
													<h5>10,586 pt</h5>
												</div>
											</div>
										</div>
										<div class="_1st three_no">
											<div class="_1stimg">
												<div class="leaderimg2">
													<img src="./murabbo/img/8.png" />
													<p>3</p>
												</div>
												<div class="user-detail">
													<h3 style={{ color: '#88D8B8' }}>James Pati</h3>
													<p style={{ color: '#88D8B8' }}>JamesP</p>
												</div>
												<div class="point">
													<h5>10,586 pt </h5>
												</div>
											</div>
										</div>
										<div class="full_btn">
											<a href="#/contest"><button class="blue_btn" type="button" >Go To Leader Board</button></a>
										</div>
									</div>
								</div>

							</section>
					}


				</main>











				<CModal show={this.state.openModel} closeOnBackdrop={false} onClose={() => this.setState({ openModel: false })}
					color="danger"
					centered>
					<CModalBody className="model-bg">

						<div>
							<div className="modal-body">

								<button type="button" className="close" onClick={() => this.setState({ openModel: false })}>
									<span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
								</button>
								<div className="model_data">
									<div className="model-title">
										<h3>Report Contest</h3>
									</div>

									{/* <div className="cus_input input_wrap">
                                            <img src="./murabbo/img/title.svg" />
                                            <input
                                                required
                                                type="text"
                                                onChange={this.handleChange.bind(
                                                    this,
                                                    "title"
                                                )}
                                                value={
                                                    this.state.fields["title"]
                                                }
                                            />
                                            <label>Title</label>
                                        </div>
                                        <span className="error-msg">
                                            {this.state.errors["title"]}
                                        </span> */}

									<div className="cus_input input_wrap">
										<img
											src="./murabbo/img/des.svg"
											alt="Murabbo"
										/>{" "}
										<input
											required
											type="text"
											onChange={this.handleChange.bind(
												this,
												"description"
											)}
											value={
												this.state.fields[
												"description"
												]
											}
										/>
										<label>Description</label>
									</div>
									<span className="error-msg">
										{this.state.errors["description"]}
									</span>

									<div className="full_btn">
										<button style={{ marginBottom: '15px' }} className="yellow_btn" type="button"

											onClick={this.handleSubmit.bind(
												this
											)}
										>Send</button>
									</div>

								</div>
							</div>
						</div>
					</CModalBody>
				</CModal>







			</>
		)
	}
}

export default DetailContestWithQuestionList
