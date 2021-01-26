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

class RoundTray extends Component {
	constructor(props) {
        super(props);
        this.state = {
			fields:{},
			errors:{},
			openModel:false
		};
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
			                            <div class="col-lg-3 col-md-4 col-sm-6">
			                                <div onClick={() => this.setState({openModel:!this.state.openModel})}>
			                                    <div class="contest-box">
			                                        <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
			                                        <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
			                                        <img class="con-ico" src="./murabbo/img/hangman.svg" alt="" />
			                                        <h3>HangMan</h3>
			                                        <p></p>
			                                    </div>
			                                </div>
			                            </div>
			                            <div class="col-lg-3 col-md-4 col-sm-6">
			                                <div onClick={() => this.setState({openModel:!this.state.openModel})}>
			                                    <div class="contest-box purple-bg">
			                                        <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
			                                        <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
			                                        <img class="con-ico" src="./murabbo/img/cups.svg" alt="" />
			                                        <h3>Match It</h3>
			                                        <p></p>
			                                    </div>
			                                </div>
			                            </div>
			                            <div class="col-lg-3 col-md-4 col-sm-6">
			                                <div onClick={() => this.setState({openModel:!this.state.openModel})}>
			                                    <div class="contest-box dark-pink">
			                                        <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
			                                        <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
			                                        <img class="con-ico" src="./murabbo/img/abc.svg" alt="" />
			                                        <h3>Unscramble</h3>
			                                        <p></p>
			                                    </div>
			                                </div>
			                            </div>
			                            <div class="col-lg-3 col-md-4 col-sm-6">
			                                <div onClick={() => this.setState({openModel:!this.state.openModel})}>
			                                    <div class="contest-box coffee-bg">
			                                        <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
			                                        <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
			                                        <img class="con-ico" src="./murabbo/img/brain.svg" alt="" />
			                                        <h3>Guess & Go</h3>
			                                        <p></p>
			                                    </div>
			                                </div>
			                            </div>
			                            <div class="col-lg-3 col-md-4 col-sm-6">
			                                <div onClick={() => this.setState({openModel:!this.state.openModel})}>
			                                    <div class="contest-box light-pink">
			                                        <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
			                                        <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
			                                        <img class="con-ico" src="./murabbo/img/giberish.svg" alt="" />
			                                        <h3>Giberish</h3>
			                                        <p></p>
			                                    </div>
			                                </div>
			                            </div>
			                            <div class="col-lg-3 col-md-4 col-sm-6">
			                                <div onClick={() => this.setState({openModel:!this.state.openModel})}>
			                                    <div class="contest-box green-bg">
			                                        <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
			                                        <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
			                                        <img class="con-ico" src="./murabbo/img/bingo.svg" alt="" />
			                                        <h3>Bingo</h3>
			                                        <p></p>
			                                    </div>
			                                </div>
			                            </div>			                            
			                            <div class="col-lg-3 col-md-4 col-sm-6">
			                                <div onClick={() => this.setState({openModel:!this.state.openModel})}>
			                                    <div class="contest-box yellow-bg">
			                                        <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
			                                        <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
			                                        <img class="con-ico" src="./murabbo/img/quizz.svg" alt="" />
			                                        <h3>Quizz</h3>
			                                        <p></p>
			                                    </div>
			                                </div>
			                            </div>
			                            <div class="col-lg-3 col-md-4 col-sm-6">
			                                <div onClick={() => this.setState({openModel:!this.state.openModel})}>
			                                    <div class="contest-box lightgreen">
			                                        <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
			                                        <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
			                                        <img class="con-ico" src="./murabbo/img/padlock.svg" alt="" />
			                                        <h3>Taboo</h3>
			                                        <p></p>
			                                    </div>
			                                </div>
			                            </div>
			                            <div class="col-lg-3 col-md-4 col-sm-6">
			                                <div onClick={() => this.setState({openModel:!this.state.openModel})}>
			                                    <div class="contest-box grey-bg">
			                                        <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
			                                        <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
			                                        <img class="con-ico" src="./murabbo/img/more.svg" alt="" />
			                                        <h3></h3>
			                                        <p></p>
			                                    </div>
			                                </div>
			                            </div>
			                        </div>
			                    </div>
			                    <div class="contest-info">
			                        <div class="contest-title">
			                            <div class="row">
			                                <div class="col-md-12">
			                                    <div class="footer-btn">
			                                        <a href="#contest"><button class="pink_btn" type="button">Go To Dashboard</button></a>
			                                        <button data-toggle="modal" data-target="#addround" class="blue_btn" type="button">Add Rounds</button>
			                                    </div> 
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

						<div class="modal fade" id="addround" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
						  <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
						    <div class="modal-content  model-bg">
						        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
						          <span aria-hidden="true"><img src="./murabbo/img/close.svg" alt="" /></span>
						        </button>
						      <div class="modal-body">
						        <div class="model_data">
						            <div class="model-title">
						                <h3>Add Round</h3>
						            </div>
						            <div class="row">
						                <div class="col-lg-4 col-md-6 col-sm-12">
						                    <a href="round">
						                        <div class="contest-box">
						                            <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
						                            <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
						                            <img class="con-ico" src="./murabbo/img/hangman.svg" alt="" />
						                            <h3>HangMan</h3>
						                            <p></p>
						                        </div>
						                    </a>
						                </div>
						                <div class="col-lg-4 col-md-6 col-sm-12">
						                    <div onClick={() => this.setState({openModel:!this.state.openModel})}>
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
						                    <div onClick={() => this.setState({openModel:!this.state.openModel})}>
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
						                    <div onClick={() => this.setState({openModel:!this.state.openModel})}>
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
						                    <div onClick={() => this.setState({openModel:!this.state.openModel})}>
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
						                    <div onClick={() => this.setState({openModel:!this.state.openModel})}>
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
						                    <div onClick={() => this.setState({openModel:!this.state.openModel})}>
						                        <div class="contest-box yellow-bg">
						                            <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
						                            <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
						                            <img class="con-ico" src="./murabbo/img/quizz.svg" alt="" />
						                            <h3>Quizz</h3>
						                            <p></p>
						                        </div>
						                    </div>
						                </div>
						                <div class="col-lg-4 col-md-6 col-sm-12">
						                    <div onClick={() => this.setState({openModel:!this.state.openModel})}>
						                        <div class="contest-box lightgreen">
						                            <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
						                            <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
						                            <img class="con-ico" src="./murabbo/img/padlock.svg" alt="" />
						                            <h3>Taboo</h3>
						                            <p></p>
						                        </div>
						                    </div>
						                </div>
						                <div class="col-lg-4 col-md-6 col-sm-12">
						                    <div onClick={() => this.setState({openModel:!this.state.openModel})}>
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
						                    <div class="" style={{textAlign:'center'}}>
						                        <button style={{minWidth: '150px'}} class="yellow_btn" type="button" data-dismiss="modal">Done</button>
						                    </div>
						                </div>
						            </div>
						        </div>
						      </div>
						    </div>
						  </div>
						</div>
			        </main>
		        <TheFooter />
		    </>
		)
	}
}

export default RoundTray
