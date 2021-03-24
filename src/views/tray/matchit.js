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
let contest_id;
class matchit extends Component {
	constructor(props) {
        super(props);
        this.state = {
		};
	}

	componentDidMount(){
		var url = window.location.href;
        contest_id =url.substring(url.lastIndexOf('/') + 1);
	}

	saveExitHandler(e)
    {
    	this.props.history.push('/tray/'+contest_id);
    }

	render() {
		return (
			<>
				<TheHeaderInner />		
				<ToastContainer position="top-right" autoClose={25000} style={{top:'80px'}}/>		
					<section id="contest" className="d-flex align-items-center">
		                <div className="container">
		                    <div className="create-contest">
		                        <div className="contest-title">
		                            <div className="row">
		                                <div className="col-md-12">
		                                    <div className="main_title">
		                                        <h3>Match It</h3>  
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
		                                      <input id="file-upload" type="file" name="fileUpload" accept="image/*" />

		                                      <label for="file-upload" id="file-drag">
		                                        <img id="file-image" src="#" alt="Preview" className="hidden"/>
		                                        <div style={{paddingBottom: '75px'}} id="start">
		                                          <img style={{paddingBottom: '75px'}} src="./murabbo/img/upload.svg"/>
		                                          <div id="notimage" className="hidden">Please select an image</div>
		                                        </div>
		                                        <div id="response" className="hidden">
		                                          <div id="messages"></div>
		                                        </div>
		                                      </label>
		                                    </form>
		                                </div>
		                                <div className="profile-thumb">
		                                    <form id="file-upload-form" className="uploader">
		                                      <input id="file-upload" type="file" name="fileUpload" accept="image/*" />

		                                      <label for="file-upload" id="file-drag">
		                                        <img id="file-image" src="#" alt="Preview" className="hidden"/>
		                                        <div  id="start">
		                                          <img src="./murabbo/img/upload.svg"/>
		                                          <div id="notimage" className="hidden">Please select an image</div>
		                                        </div>
		                                        <div id="response" className="hidden">
		                                          <div id="messages"></div>
		                                        </div>
		                                      </label>
		                                    </form>
		                                </div>
		                                <div className="profile-thumb">
		                                    <form id="file-upload-form" className="uploader">
		                                      <input id="file-upload" type="file" name="fileUpload" accept="image/*" />

		                                      <label for="file-upload" id="file-drag">
		                                        <img id="file-image" src="#" alt="Preview" className="hidden"/>
		                                        <div id="start">
		                                          <img src="./murabbo/img/upload.svg"/>
		                                          <div id="notimage" className="hidden">Please select an image</div>
		                                        </div>
		                                        <div id="response" className="hidden">
		                                          <div id="messages"></div>
		                                        </div>
		                                      </label>
		                                    </form>
		                                </div>
		                                <div className="profile-thumb">
		                                    <form id="file-upload-form" className="uploader">
		                                      <input id="file-upload" type="file" name="fileUpload" accept="image/*" />

		                                      <label for="file-upload" id="file-drag">
		                                        <img id="file-image" src="#" alt="Preview" className="hidden"/>
		                                        <div id="start">
		                                          <img src="./murabbo/img/upload.svg"/>
		                                          <div id="notimage" className="hidden">Please select an image</div>
		                                        </div>
		                                        <div id="response" className="hidden">
		                                          <div id="messages"></div>
		                                        </div>
		                                      </label>
		                                    </form>
		                                </div>
		                            </div>
		                            <div className="col-lg-4 col-md-6 col-sm-12">
		                                <div style={{margin: '0px 0 5px 0'}} className="cus_input ">
		                                    <img src="./murabbo/img/clock.svg"/> <label className="cus_label">Time Limit</label>
		                                </div>
		                                <div className="number">
		                                    <span className="minus"><img src="./murabbo/img/minus.svg"/></span>
		                                    <input type="text" value="1"/>
		                                    <span className="plus"><img src="./murabbo/img/plus.svg"/></span>
		                                </div>
		                                
		    
		                                <div style={{margin: '0px 0 5px 0'}} className="cus_input ">
		                                    <label style={{paddingLeft: '5px'}} className="cus_label">Base Points</label>
		                                </div>
		                                <div className="range-wrap">
		                                  <input min="0" max="30" value="0" step="1" type="range" className="range" id="range"/>
		                                  <output className="bubble"></output>
		                                </div>

		                                 <div className="cus_input input_wrap">
		                                    <img src="./murabbo/img/game.svg"/> <input type="text" required="" name=""/>
		                                    <label>Player Type</label>
		                                </div>
		                            </div>
		                        </div>
		                    </div>
		                    <div className="contest-info">
		                        <div className="contest-title">
		                            <div className="row">
		                                <div className="col-md-12">
		                                    <div className="footer-btn">
		                                        <button className="blue_btn" type="button" onClick={this.saveExitHandler.bind(this)}>Submit</button>
		                                    </div> 
		                                </div>
		                            </div>
		                        </div>
		                    </div>
		                </div>
		            </section>
		    </>
		)
	}
}

export default matchit
