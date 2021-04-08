import React, { Component } from "react";
import { TheFooter, TheHeaderInner } from "../../containers/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import languages from "../../languages";
import configuration from "../../config";
import { reactLocalStorage } from "reactjs-localstorage";
import MultiSelect from "react-multi-select-component";
import { CModal, CModalBody } from "@coreui/react";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            roundListData: [],
            gameTypeArr: [
                {
                    type: "Hangman",
                    name: "HangMan",
                    src: "./murabbo/img/hangman.svg",
                    qtyAdd: false,
                    qty: 1,
                    class: "contest-box"
                },
                {
                    type: "MatchIt",
                    name: "Match It",
                    src: "./murabbo/img/cups.svg",
                    qtyAdd: false,
                    qty: 1,
                    class: "contest-box purple-bg"
                },
                {
                    type: "Unscramble",
                    name: "Unscramble",
                    src: "./murabbo/img/unscramble.svg",
                    qtyAdd: false,
                    qty: 1,
                    class: "contest-box dark-pink"
                },
                {
                    type: "GuessAndGo",
                    name: "Guess & Go",
                    src: "./murabbo/img/brain.svg",
                    qtyAdd: false,
                    qty: 1,
                    class: "contest-box coffee-bg"
                },
                {
                    type: "Gibberish",
                    name: "Gibberish",
                    src: "./murabbo/img/giberish.svg",
                    qtyAdd: false,
                    qty: 1,
                    class: "contest-box light-pink"
                },
                {
                    type: "Bingo",
                    name: "Bingo",
                    src: "./murabbo/img/bingo.svg",
                    qtyAdd: false,
                    qty: 1,
                    class: "contest-box green-bg"
                },
                {
                    type: "Quiz",
                    name: "Quiz",
                    src: "./murabbo/img/quizz.svg",
                    qtyAdd: false,
                    qty: 1,
                    class: "contest-box yellow-bg"
                },
                {
                    type: "Taboo",
                    name: "Taboo",
                    src: "./murabbo/img/padlock.svg",
                    qtyAdd: false,
                    qty: 1,
                    class: "contest-box lightgreen"
                }
            ],
            errorsPlay: {},
            fieldsPlay: { display_name: "", password: "" },
            playNewContestModel: false,
            playContestModel: false
        };
    }

    componentDidMount() {
        var userId = JSON.parse(reactLocalStorage.get("userData")).userId;
        fetch(configuration.baseURL + "contest/contest?isTrending=yes", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + reactLocalStorage.get("clientToken")
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({ listData: data.data });
            });

        fetch(configuration.baseURL + "individual/getTrending", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + reactLocalStorage.get("clientToken")
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({ roundListData: data.data });
            });
    }

    playContest(data) {
        this.setState({
            playContestModel: true,
            errorsPlay: { display_name: "", password: "" },
            fieldsPlay: { display_name: "", password: "", contestId: data._id }
        });
    }

    handleChangePlay(field, e) {
        let fields = this.state.fieldsPlay;
        fields[field] = e.target.value;
        this.setState({ fieldsPlay: fields });

        let errors = {};
        if (field === "display_name" && fields["display_name"].trim() === "") {
            errors["display_name"] = "Please enter Display Name";
        }

        if (
            field === "password" &&
            fields["password"].trim() !== "" &&
            fields["password"].length < 6
        ) {
            errors["password"] = "Please Game Password minimum size must be 6";
        }
        this.setState({ errorsPlay: errors });
    }
    joinRoomContest(data) {
        this.props.history.push("/videoChat/" + data._id);
    }

    handleNext() {
        let fields = this.state.fieldsPlay;
        let errors = {};
        let formIsValid = true;
        if (fields["display_name"].trim() === "") {
            formIsValid = false;
            errors["display_name"] = "Please enter Display Name";
        }

        if (fields["password"].trim() !== "" && fields["password"].length < 6) {
            errors["password"] = "Please Game Password minimum size must be 6";
        }

        this.setState({ errorsPlay: errors });
        if (formIsValid) {
            const data = new FormData();
            data.append("displayName", fields["display_name"]);
            data.append("password", fields["password"]);
            data.append(
                "createdBy",
                JSON.parse(reactLocalStorage.get("userData")).userId
            );
            data.append("contestId", fields["contestId"]);

            fetch(configuration.baseURL + "room/room", {
                method: "post",
                headers: {
                    contentType: "application/json",
                    Authorization:
                        "Bearer " + reactLocalStorage.get("clientToken")
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

	titleSmall(name){
		if (name.length > 12) {
		    var shortname = name.substring(0, 12) + "...";
		    return shortname;
		}
		else
		{
			return name;
		}
	}

	roundsListHandler(data,e)
	{
		if (data.isPublish) {
			this.props.history.push('/contests/start_round/'+data._id);
		}
		else
		{
	        return toast.error('Contest is not publish,you can not play yet!');
		}
		
	}

	render() {
		return (
			<>
				<TheHeaderInner />				
					<main id="main">
					<ToastContainer position="top-right" autoClose={5000} style={{top:'80px'}}/>
			            <section id="contest" class="d-flex align-items-center">
			                <div class="container">

			                	{/*<div style={{paddingBottom: '30px'}} class="contest-info banner-div">
			                        <div class="row">
                                        <div class="col-lg-12 col-md-12 col-sm-12" >
		                                	<div class="cate-box2">
		                                        <img src="./murabbo/img/banner.png" alt="Game" className="banner"/>
		                                    </div>
			                            </div>
                                       
			                        </div>
			                    </div>*/}

			                    <div class="create-contest">
			                        <div class="contest-title">
			                            <div class="row">
			                                <div class="col-md-8">
			                                    <div class="main_title">
			                                        <h3 style={{color:'#F2BE47',marginBottom:'5px'}}>Trending </h3>  
			                                        <h6>Contest</h6>  
			                                    </div> 
			                                </div>
			                            </div>
			                        </div>
			                    </div>
			                    <div style={{paddingBottom: '30px'}} class="contest-info">
			                        <div class="row">
			                        {

			                        	(this.state.listData.length > 0) ? 
			                        	this.state.listData.map((e, key) => {
                                            return <div class="col-lg-3 col-md-4 col-sm-6" >
			                                	<div class="cate-box2">
			                                        <img src={(e.image !== '') ? e.image : 'avatars/placeholder.png' } alt="Game" className="main"/>
			                                        <div class="cat_title2">
			                                            <h3>{e.totalRound} {(e.totalRound > 1) ? 'Rounds' : 'Round'} <span>{e.userName}</span></h3>
			                                            <p style={{cursor: 'context-menu',width:'160px'}} onClick={this.roundsListHandler.bind(this,e)}>{this.titleSmall(e.title)} </p>
			                                            {/*<p className="play_btn_contest" onClick={this.playContest.bind(this,e)} style={{bottom:'0',top:'auto',cursor:'pointer',display: (e.isPublish) ? 'block' : 'none'}}>Play</p>*/}
			                                        	<p className="play_btn_contest" onClick={this.joinRoomContest.bind(this,e)} style={{bottom:'0',top:'auto',cursor:'pointer',display: (e.isPublish) ? 'block' : 'none'}}>Join</p>
			                                        </div>
			                                    </div>
				                            </div>
                                        }) : 
								        (
								        	<div style={{color:'white',width: '100%',textAlign:'center',marginTop:"50px",marginBottom:"50px"}} className="flex"><p className="item-author text-color">No data found</p></div>
								        )
			                        }
			                        </div>
			                    </div>


			                    <div class="create-contest">
			                        <div class="contest-title">
			                            <div class="row">
			                                <div class="col-md-8">
			                                    <div class="main_title">
			                                        <h6>Rounds</h6>  
			                                    </div> 
			                                </div>
			                            </div>
			                        </div>
			                    </div>
			                    <div style={{paddingBottom: '30px'}} class="contest-info">
			                        <div class="row">
			                        {

			                        	(this.state.roundListData.length > 0) ? 
			                        	this.state.roundListData.map((e, key) => {
                                            return <div class="col-lg-3 col-md-4 col-sm-6">
			                                	<div class="cate-box2"  onClick={() => {this.props.history.push('/detail-round/'+e._id)}}  style={{ cursor:'pointer'}} >
			                                        <img src={(e.image !== '') ? e.image : 'avatars/placeholder.png' } alt="Game" className="main"/>
			                                        <div class="cat_title2">
			                                            <h3>{e.numberOfQuestions} {(e.numberOfQuestions > 1) ? 'Questions' : 'Question'} <span>{e.createdBy}</span></h3>
			                                            <p>{e.title}</p>
			                                        </div>
			                                    </div>
				                            </div>
                                        }) : 
								        (
								        	<div style={{color:'white',width: '100%',textAlign:'center',marginTop:"50px",marginBottom:"50px"}} className="flex"><p className="item-author text-color">No data found</p></div>
								        )
			                        }
			                        </div>
			                    </div>
 
			                    <div class="contest-info trending" style={{marginTop: '50px'}}>
			                        <div className="row round-box" style={{paddingTop: '30px'}}>
											{
					                        	this.state.gameTypeArr.map((e, key) => {
		                                            return 	<div className="col-lg-2 col-md-4 col-sm-6">
											                    <div>
											                        <div className={e.class}>
											                            <img className="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
											                            <img className="ico" src={e.src} alt="" />
											                            <h3>{e.name}</h3>
											                            <p></p>
											                        </div>
											                    </div>
											                </div>
	                                        	})
					                        }
								        </div>
			                    </div>

			                </div>
			            </section>
			           

                            

                    <CModal
                        show={this.state.playContestModel}
                        closeOnBackdrop={false}
                        onClose={() =>
                            this.setState({ playContestModel: false })
                        }
                        color="danger"
                        centered
                    >
                        <CModalBody className="model-bg">
                            <div>
                                <div className="modal-body">
                                    <button
                                        type="button"
                                        className="close"
                                        onClick={() =>
                                            this.setState({
                                                playContestModel: false
                                            })
                                        }
                                    >
                                        <span aria-hidden="true">
                                            <img src="./murabbo/img/close.svg" />
                                        </span>
                                    </button>
                                    <div className="model_data">
                                        <div className="model-title"></div>
                                        <img
                                            className="shape2"
                                            src="./murabbo/img/shape2.svg"
                                        />
                                        <img
                                            className="shape3"
                                            src="./murabbo/img/shape3.svg"
                                        />
                                        <div className="row">
                                            <div className="col-md-10 offset-md-1">
                                                <div
                                                    style={{
                                                        textAlign: "center"
                                                    }}
                                                    className=""
                                                >
                                                    <button
                                                        style={{
                                                            minWidth: "250px",
                                                            marginBottom: "10px"
                                                        }}
                                                        className="blue_btn light_blue_btn"
                                                        type="button"
                                                    >
                                                        Pick a Room
                                                    </button>
                                                </div>
                                                <div
                                                    style={{
                                                        textAlign: "center"
                                                    }}
                                                    className=""
                                                >
                                                    <button
                                                        style={{
                                                            minWidth: "250px",
                                                            marginBottom: "10px"
                                                        }}
                                                        className="yellow_btn"
                                                        type="button"
                                                        onClick={() =>
                                                            this.setState({
                                                                playContestModel: false,
                                                                playNewContestModel: true
                                                            })
                                                        }
                                                    >
                                                        Play New
                                                    </button>
                                                </div>
                                                <div
                                                    style={{
                                                        textAlign: "center"
                                                    }}
                                                    className=""
                                                >
                                                    <button
                                                        style={{
                                                            minWidth: "250px",
                                                            marginBottom: "10px"
                                                        }}
                                                        className="pink_btn"
                                                        type="button"
                                                        onClick={() =>
                                                            this.setState({
                                                                playContestModel: false
                                                            })
                                                        }
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CModalBody>
                    </CModal>

                    <CModal
                        show={this.state.playNewContestModel}
                        closeOnBackdrop={false}
                        onClose={() =>
                            this.setState({ playNewContestModel: false })
                        }
                        color="danger"
                        centered
                    >
                        <CModalBody className="model-bg">
                            <div>
                                <div className="modal-body">
                                    <button
                                        type="button"
                                        className="close"
                                        onClick={() =>
                                            this.setState({
                                                playNewContestModel: false
                                            })
                                        }
                                    >
                                        <span aria-hidden="true">
                                            <img src="./murabbo/img/close.svg" />
                                        </span>
                                    </button>
                                    <div className="model_data">
                                        <div className="model-title">
                                            <h3>Set Password</h3>
                                            <h4>
                                                Password needs to be set for a
                                                private contest. Keeping it
                                                blank will make your contest
                                                Public to all.
                                            </h4>
                                        </div>
                                        <img
                                            className="shape2"
                                            src="./murabbo/img/shape2.svg"
                                        />
                                        <img
                                            className="shape3"
                                            src="./murabbo/img/shape3.svg"
                                        />
                                        <div className="row">
                                            <div className="col-md-10 offset-md-1">
                                                <div className="cus_input input_wrap">
                                                    <img src="./murabbo/img/title.svg" />
                                                    <input
                                                        required
                                                        type="text"
                                                        onChange={this.handleChangePlay.bind(
                                                            this,
                                                            "display_name"
                                                        )}
                                                        value={
                                                            this.state
                                                                .fieldsPlay[
                                                                "display_name"
                                                            ]
                                                        }
                                                    />
                                                    <label>Display Name</label>
                                                </div>
                                                <span className="error-msg">
                                                    {
                                                        this.state.errorsPlay[
                                                            "display_name"
                                                        ]
                                                    }
                                                </span>

                                                <div className="cus_input input_wrap">
                                                    <img src="./murabbo/img/password.svg" />
                                                    <input
                                                        required
                                                        type="text"
                                                        onChange={this.handleChangePlay.bind(
                                                            this,
                                                            "password"
                                                        )}
                                                        value={
                                                            this.state
                                                                .fieldsPlay[
                                                                "password"
                                                            ]
                                                        }
                                                    />
                                                    <label>Game Password</label>
                                                </div>
                                                <span className="error-msg">
                                                    {
                                                        this.state.errorsPlay[
                                                            "password"
                                                        ]
                                                    }
                                                </span>
                                            </div>
                                            <div className="col-md-10 offset-md-1">
                                                <div
                                                    style={{
                                                        textAlign: "center",
                                                        float: "left",
                                                        marginRight: "10px"
                                                    }}
                                                    className=""
                                                >
                                                    <button
                                                        style={{
                                                            minWidth: "150px"
                                                        }}
                                                        className="blue_btn light_blue_btn"
                                                        type="button"
                                                        onClick={this.handleNext.bind(
                                                            this
                                                        )}
                                                    >
                                                        Next
                                                    </button>
                                                </div>
                                                <div
                                                    style={{
                                                        textAlign: "center"
                                                    }}
                                                    className=""
                                                >
                                                    <button
                                                        style={{
                                                            minWidth: "150px",
                                                            float: "left"
                                                        }}
                                                        className="pink_btn"
                                                        type="button"
                                                        onClick={() =>
                                                            this.setState({
                                                                playNewContestModel: false
                                                            })
                                                        }
                                                    >
                                                        Cancel
                                                    </button>
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
        );
    }
}

export default Dashboard;
