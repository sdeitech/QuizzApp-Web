import React, {Component} from 'react'
import {
    TheFooter,
    TheHeaderInner
} from '../../containers/index'
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
			                                <a href="#/add_round">
			                                    <div class="contest-box">
			                                        <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
			                                        <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
			                                        <img class="con-ico" src="./murabbo/img/hangman.svg" alt="" />
			                                        <h3>HangMan</h3>
			                                        <p>25 Questions</p>
			                                    </div>
			                                </a>
			                            </div>
			                            <div class="col-lg-3 col-md-4 col-sm-6">
			                                <a href="round-detail2.html">
			                                    <div class="contest-box yellow-bg">
			                                        <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
			                                        <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
			                                        <img class="con-ico" src="./murabbo/img/quizz.svg" alt="" />
			                                        <h3>Quizz</h3>
			                                        <p>25 Questions</p>
			                                    </div>
			                                </a>
			                            </div>
			                            <div class="col-lg-3 col-md-4 col-sm-6">
			                                <a href="round-detail2.html">
			                                    <div class="contest-box dark-pink">
			                                        <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
			                                        <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
			                                        <img class="con-ico" src="./murabbo/img/abc.svg" alt="" />
			                                        <h3>Unscramble</h3>
			                                        <p>25 Questions</p>
			                                    </div>
			                                </a>
			                            </div>
			                            <div class="col-lg-3 col-md-4 col-sm-6">
			                                <a href="round-detail2.html">
			                                    <div class="contest-box light-pink">
			                                        <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
			                                        <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
			                                        <img class="con-ico" src="./murabbo/img/giberish.svg" alt="" />
			                                        <h3>Giberish</h3>
			                                        <p>25 Questions</p>
			                                    </div>
			                                </a>
			                            </div>
			                            <div class="col-lg-3 col-md-4 col-sm-6">
			                                <a href="round-detail2.html">
			                                    <div class="contest-box green-bg">
			                                        <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
			                                        <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
			                                        <img class="con-ico" src="./murabbo/img/bingo.svg" alt="" />
			                                        <h3>Bingo</h3>
			                                        <p>25 Questions</p>
			                                    </div>
			                                </a>
			                            </div>
			                            <div class="col-lg-3 col-md-4 col-sm-6">
			                                <a href="round-detail3.html">
			                                    <div class="contest-box purple-bg">
			                                        <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
			                                        <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
			                                        <img class="con-ico" src="./murabbo/img/cups.svg" alt="" />
			                                        <h3>Match It</h3>
			                                        <p>25 Questions</p>
			                                    </div>
			                                </a>
			                            </div>
			                            <div class="col-lg-3 col-md-4 col-sm-6">
			                                <a href="round-detail2.html">
			                                    <div class="contest-box coffee-bg">
			                                        <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
			                                        <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
			                                        <img class="con-ico" src="./murabbo/img/brain.svg" alt="" />
			                                        <h3>Guess & Go</h3>
			                                        <p>25 Questions</p>
			                                    </div>
			                                </a>
			                            </div>
			                            <div class="col-lg-3 col-md-4 col-sm-6">
			                                <a href="round-detail2.html">
			                                    <div class="contest-box lightgreen">
			                                        <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
			                                        <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
			                                        <img class="con-ico" src="./murabbo/img/padlock.svg" alt="" />
			                                        <h3>Taboo</h3>
			                                        <p>25 Questions</p>
			                                    </div>
			                                </a>
			                            </div>
			                            <div class="col-lg-3 col-md-4 col-sm-6">
			                                <a href="round-detail2.html">
			                                    <div class="contest-box grey-bg">
			                                        <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
			                                        <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
			                                        <img class="con-ico" src="./murabbo/img/more.svg" alt="" />
			                                        <h3>Lorem Ips</h3>
			                                        <p>25 Questions</p>
			                                    </div>
			                                </a>
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
						                            <p>25 Questions</p>
						                        </div>
						                    </a>
						                </div>
						                <div class="col-lg-4 col-md-6 col-sm-12">
						                    <a href="round-detail2.html">
						                        <div class="contest-box yellow-bg">
						                            <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
						                            <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
						                            <img class="con-ico" src="./murabbo/img/quizz.svg" alt="" />
						                            <h3>Quizz</h3>
						                            <p>25 Questions</p>
						                        </div>
						                    </a>
						                </div>
						                <div class="col-lg-4 col-md-6 col-sm-12">
						                    <a href="round-detail2.html">
						                        <div class="contest-box dark-pink">
						                            <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
						                            <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
						                            <img class="con-ico" src="./murabbo/img/abc.svg" alt="" />
						                            <h3>Unscramble</h3>
						                            <p>25 Questions</p>
						                        </div>
						                    </a>
						                </div>
						                <div class="col-lg-4 col-md-6 col-sm-12">
						                    <a href="round-detail2.html">
						                        <div class="contest-box light-pink">
						                            <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
						                            <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
						                            <img class="con-ico" src="./murabbo/img/giberish.svg" alt="" />
						                            <h3>Giberish</h3>
						                            <p>25 Questions</p>
						                        </div>
						                    </a>
						                </div>
						                <div class="col-lg-4 col-md-6 col-sm-12">
						                    <a href="round-detail2.html">
						                        <div class="contest-box green-bg">
						                            <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
						                            <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
						                            <img class="con-ico" src="./murabbo/img/bingo.svg" alt="" />
						                            <h3>Bingo</h3>
						                            <p>25 Questions</p>
						                        </div>
						                    </a>
						                </div>
						                <div class="col-lg-4 col-md-6 col-sm-12">
						                    <a href="round-detail2.html">
						                        <div class="contest-box purple-bg">
						                            <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
						                            <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
						                            <img class="con-ico" src="./murabbo/img/cups.svg" alt="" />
						                            <h3>Match It</h3>
						                            <p>25 Questions</p>
						                        </div>
						                    </a>
						                </div>
						                <div class="col-lg-4 col-md-6 col-sm-12">
						                    <a href="round-detail2.html">
						                        <div class="contest-box coffee-bg">
						                            <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
						                            <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
						                            <img class="con-ico" src="./murabbo/img/brain.svg" alt="" />
						                            <h3>Guess & Go</h3>
						                            <p>25 Questions</p>
						                        </div>
						                    </a>
						                </div>
						                <div class="col-lg-4 col-md-6 col-sm-12">
						                    <a href="round-detail2.html">
						                        <div class="contest-box lightgreen">
						                            <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
						                            <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
						                            <img class="con-ico" src="./murabbo/img/padlock.svg" alt="" />
						                            <h3>Taboo</h3>
						                            <p>25 Questions</p>
						                        </div>
						                    </a>
						                </div>
						                <div class="col-lg-4 col-md-6 col-sm-12">
						                    <a href="round-detail2.html">
						                        <div class="contest-box grey-bg">
						                            <img class="placeholder" src="./murabbo/img/placeholder.svg" alt="" />
						                            <img class="con-close" src="./murabbo/img/close-white2.svg" alt="" />
						                            <img class="con-ico" src="./murabbo/img/more.svg" alt="" />
						                            <h3>Lorem Ips</h3>
						                            <p>25 Questions</p>
						                        </div>
						                    </a>
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
