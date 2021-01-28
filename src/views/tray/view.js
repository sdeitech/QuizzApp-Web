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
let contest_id;
class RoundTray extends Component {
	constructor(props) {
        super(props);
        this.state = {
			fields:{},
			errors:{},
			openModelRoundAdd:false,
			confirmationModel:false,
			openModel:false,
			qtyAdd:false,
			qty:1,
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
		this.setState({qtyAdd:true});
	}

	btnClickHandler(type,e){
		if(type === "minus")
		{
			var qty = this.state.qty;
			qty = (qty === 0) ? 0 : (qty - 1);
			this.setState({qty:qty});
		}
		else
		{

			var qty = this.state.qty;
			qty = qty + 1;
			this.setState({qty:qty});
		}

	}

	submitHandler()
	{
		let qty = this.state.qty;
        let errors = {};
        let formIsValid = true;

        if(qty === 0){
            formIsValid = false;
            errors["qty"] = "Please add qty";
        }

        this.setState({errors: errors});
        if(formIsValid){
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


	render() {

		return (
			<>
				<TheHeaderInner />				
					<main id="main">
						<ToastContainer position="top-right" autoClose={5000} style={{top:'80px'}}/>
			            <section id="contest" class="d-flex align-items-center">
			                <div class="container">
			                    <div class="create-contest">
			                        <div class="contest-title">
			                            <div class="row">
			                                <div class="col-md-4">
			                                    <div class="main_title">
			                                        <h3>Create Contest</h3>  
			                                    </div> 
			                                </div>
			                                <div class="col-md-8">
			                                    <ul class="title-link">
			                                        <a href="redirect"><li><img src="./murabbo/img/close2.svg" alt="" /> Remove</li></a>
			                                        <a href="redirect"><li><img style={{width: '17px'}} src="./murabbo/img/send.svg" alt="" /> Publish</li></a>
			                                        <a href="redirect"><li><img src="./murabbo/img/edit.svg" alt="" /> Edit</li></a>
			                                    </ul>  
			                                </div>
			                            </div>
			                        </div>
			                    </div>
			                    <div class="contest-info">
			                        <div class="row">
			                            <div class="col-md-8 offset-md-2">
			                                <div class="progressbar">
			                                    <div class="inner-progress">
			                                        <p>Contest Info</p>
			                                    </div>
			                                    <div class="inner-progress2">
			                                        <p>Round Tray</p>
			                                    </div>
			                                </div>
			                            </div>
		                            </div>
		                            <div class="row round-box">
			                                { this.state.listArr.map((val, ckey) => {
					                            return <div className="col-lg-2 col-md-3 col-sm-6 ">
								                    <div class="contest-box yellow-bg">
								                        <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
								                        <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" onClick={this.deleteHandler.bind(this,val._id)} />
								                        <img class="ico" src="./murabbo/img/quizz.svg" alt="" />
								                        <h3>{val.gameType}</h3>
								                        <p></p>
								                    </div>
								                </div>
					                            })
	                        				}
	                        		</div>
		                            <div class="row" style={{marginBottom:'20px'}}>
			                        
		                                <div class="col-md-8 offset-md-2">
		                                    <div class="footer-btn">
		                                        <a href="#contest"><button class="pink_btn" type="button">Go To Dashboard</button></a>
		                                        <button class="blue_btn" type="button" onClick={() => this.setState({openModelRoundAdd:true}) }>Add Rounds</button>
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
			                                <h3>Round Detail</h3>
		                                </div>
		                                <div className="contest">

		                                	<div class="row">
					                            <div class="col-lg-4 col-md-6 col-sm-12">
					                                <div class="profile-img">
					                                    <form id="file-upload-form" class="uploader">
					                                      <input id="file-upload" type="file" name="fileUpload" accept="image/*" />

					                                      <label for="file-upload" id="file-drag">
					                                        <img id="file-image" src="#" alt="Preview" class="hidden" />
					                                        <div id="start">
					                                          <img src="./murabbo/img/upload.svg" alt="Upload"/>
					                                          <div id="notimage" class="hidden">Please select an image</div>
					                                          <div>Add Image</div>
					                                        </div>
					                                        <div id="response" class="hidden">
					                                          <div id="messages"></div>
					                                          
					                                        </div>
					                                      </label>
					                                    </form>
					                                </div>
					                            </div>
					                            <div class="col-lg-4 col-md-6 col-sm-12">
					                                <div class="cus_input input_wrap">
					                                    <img src="./murabbo/img/title.svg" alt="Upload"/> <input type="text" required="" name="" />
					                                    <label>Title</label>
					                                </div>
					                                <div class="cus_input input_wrap">
					                                    <img src="./murabbo/img/des.svg" alt="Upload"/> <input type="text" required="" name="" />
					                                    <label>Description</label>
					                                </div>
					                                <div class="cus_input input_wrap">
					                                    <img src="./murabbo/img/book.svg" alt="Upload"/> <input type="text" required="" name="" />
					                                    <label>Execution Mode</label>
					                                </div>
					                                <div style={{margin: '0px 0 5px 0'}} class="cus_input ">
					                                    <img src="./murabbo/img/clock.svg" alt="Upload"/> <label class="cus_label">Question Time</label>
					                                </div>
					                                <div class="number">
					                                    <span class="minus"><img src="./murabbo/img/minus.svg" alt="Upload"/></span>
					                                    <input type="text" value="1"/>
					                                    <span class="plus"><img src="./murabbo/img/plus.svg" alt="Upload"/></span>
					                                </div>
					                                <div style={{margin: '0px 0 5px 0'}} class="cus_input ">
					                                    <label style={{paddingLeft: '5px'}} class="cus_label">Base Points</label>
					                                </div>
					                                    <div class="range-wrap">
					                                      <input min="0" max="30" value="0" step="1" type="range" class="range" id="range" />
					                                      <output class="bubble"></output>
					                                    </div>
					                            </div>
					                            <div class="col-lg-4 col-md-6 col-sm-12">
					                                <div class="cus_input input_wrap">
					                                    <img src="./murabbo/img/enable.svg" alt="Upload"/> <input type="text" required="" name="" />
					                                    <label>Visibility</label>
					                                </div>
					                                <div class="cus_input input_wrap">
					                                    <img src="./murabbo/img/score.svg" alt="Upload"/> <input type="text" required="" name="" />
					                                    <label>Scoring</label>
					                                </div>
					                                <div class="cus_input input_wrap">
					                                    <img src="./murabbo/img/3d.svg" alt="Upload"/> <input type="text" required="" name="" />
					                                    <label>Rendering Mode</label>
					                                </div>
					                                
					                               
					                            </div>
					                        </div>
						                    <div style={{ textAlign: 'center' }} class="">
							                    <button class="blue_btn" type="button"  onClick={() => this.setState({openModel:false}) } >Done</button>
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
		                            <div class="modal-body">
								        <div class="model_data">
								            <div class="model-title">
								                <h3>Add Round</h3>
								            </div>
								            <div class="row">
								                <div class="col-lg-4 col-md-6 col-sm-12">
							                        <div class="contest-box">
							                            <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
							                            <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
							                            <img class="con-ico" src="./murabbo/img/hangman.svg" alt="" />
							                            <h3>HangMan</h3>
							                            <p></p>
							                        </div>
								                </div>
								                <div class="col-lg-4 col-md-6 col-sm-12">
								                    <div >
								                        <div class="contest-box purple-bg">
								                            <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
								                            <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
								                            <img class="con-ico" src="./murabbo/img/cups.svg" alt="" />
								                            <h3>Match It</h3>
								                            <p></p>
								                        </div>
								                    </div>
								                </div>
								                
								                <div class="col-lg-4 col-md-6 col-sm-12">
								                    <div >
								                        <div class="contest-box dark-pink">
								                            <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
								                            <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
								                            <img class="con-ico" src="./murabbo/img/abc.svg" alt="" />
								                            <h3>Unscramble</h3>
								                            <p></p>
								                        </div>
								                    </div>
								                </div>
								                <div class="col-lg-4 col-md-6 col-sm-12">
								                    <div >
								                        <div class="contest-box coffee-bg">
								                            <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
								                            <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
								                            <img class="con-ico" src="./murabbo/img/brain.svg" alt="" />
								                            <h3>Guess & Go</h3>
								                            <p></p>
								                        </div>
								                    </div>
								                </div>
								                <div class="col-lg-4 col-md-6 col-sm-12">
								                    <div >
								                        <div class="contest-box light-pink">
								                            <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
								                            <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
								                            <img class="con-ico" src="./murabbo/img/giberish.svg" alt="" />
								                            <h3>Giberish</h3>
								                            <p></p>
								                        </div>
								                    </div>
								                </div>
								                <div class="col-lg-4 col-md-6 col-sm-12">
								                    <div >
								                        <div class="contest-box green-bg">
								                            <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
								                            <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
								                            <img class="con-ico" src="./murabbo/img/bingo.svg" alt="" />
								                            <h3>Bingo</h3>
								                            <p></p>
								                        </div>
								                    </div>
								                </div>
								                <div class="col-lg-4 col-md-6 col-sm-12">
								                    <div onClick={this.clickHandler.bind(this,true)}>
								                        <div class="contest-box yellow-bg">
								                            <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
								                            <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
								                            <img class="con-ico" src="./murabbo/img/quizz.svg" alt="" />
								                            <h3>Quizz</h3>
								                            <p></p>
								                        </div>
								                        {
								                        	(this.state.qtyAdd ) ? (

								                        		<div class="number">
								                                    <span class="minus"><img src="./murabbo/img/minus.svg" onClick={this.btnClickHandler.bind(this,"minus")}/></span>
								                                    <input type="text" value="1" value={this.state.qty} />
								                                    <span class="plus"><img src="./murabbo/img/plus.svg" onClick={this.btnClickHandler.bind(this,"plus")}/></span>
								                                </div>
								                        	) : null
								                        }

								                        <span className="error-msg">{this.state.errors["qty"]}</span>
								                    </div>
								                </div>
								                <div class="col-lg-4 col-md-6 col-sm-12">
								                    <div >
								                        <div class="contest-box lightgreen">
								                            <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
								                            <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
								                            <img class="con-ico" src="./murabbo/img/padlock.svg" alt="" />
								                            <h3>Taboo</h3>
								                            <p></p>
								                        </div>
								                        {/*<div class="number">
						                                    <span class="minus"><img src="./murabbo/img/minus.svg" onClick={this.btnClickHandler.bind(this,"minus")}/></span>
						                                    <input type="text" value="1" value={this.state.qty} />
						                                    <span class="plus"><img src="./murabbo/img/plus.svg" onClick={this.btnClickHandler.bind(this,"plus")}/></span>
						                                </div>*/}
								                    </div>
								                </div>
								                <div class="col-lg-4 col-md-6 col-sm-12">
								                    <div >
								                        <div class="contest-box grey-bg">
								                            <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
								                            <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
								                            <img class="con-ico" src="./murabbo/img/more.svg" alt="" />
								                            <h3></h3>
								                            <p></p>
								                        </div>
								                    </div>
								                </div>

								                <div class="col-lg-12 col-md-12 col-sm-12">
									                <div style={{ textAlign: 'center' }} class="">
									                    <button  style={{minWidth: '150px'}}  class="blue_btn" type="button"  onClick={this.submitHandler.bind(this) } >Done</button>
									                </div>
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

							                <div style={{ textAlign: 'center' , float:'left',marginRight:'10px' }} class="">
							                    <button  style={{minWidth: '150px'}}  class="blue_btn" type="button"  onClick={()=> this.setState({confirmationModel:false,delete_id:''})} >No</button>
							                </div>
                                			<div style={{ textAlign: 'center' , float:'left' }} class="">
							                    <button  style={{minWidth: '150px'}}  class="pink_btn" type="button"  onClick={this.deleteHandler.bind(this)} >Yes</button>
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
