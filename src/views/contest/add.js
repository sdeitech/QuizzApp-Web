import React, {Component} from 'react'
import {
    TheFooter,
    TheHeaderInner
} from '../../containers/index'
import 'react-toastify/dist/ReactToastify.css';

class AddContest extends Component {
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
			                                        <a href="redirect"><li><img src="./murabbo/img/close2.svg" alt="Murabbo" /> Remove</li></a>
			                                        <a href="redirect"><li><img style={{width: '17px'}} src="./murabbo/img/send.svg" alt="Murabbo" /> Publish</li></a>
			                                        <a href="redirect"><li><img src="./murabbo/img/edit.svg" alt="Murabbo" /> Edit</li></a>
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
			                                </div>
			                            </div>
			                            <div class="col-lg-4 col-md-6 col-sm-12">
			                                <div class="profile-img">
			                                    <form id="file-upload-form" class="uploader">
			                                      <input id="file-upload" type="file" name="fileUpload" accept="image/*" />

			                                      <label for="file-upload" id="file-drag">
			                                        <img id="file-image" src="#" alt="Preview" class="hidden"/>
			                                        <div id="start">
			                                          <img src="./murabbo/img/upload.svg" alt="Murabbo"/>
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
			                                    <img src="./murabbo/img/title.svg" alt="Murabbo"/> <input type="text" required="" name="" />
			                                    <label>Title</label>
			                                </div>
			                                <div class="cus_input input_wrap">
			                                    <img src="./murabbo/img/des.svg" alt="Murabbo"/> <input type="text" required="" name=""/>
			                                    <label>Description</label>
			                                </div>
			                                <div class="cus_input input_wrap">
			                                    <img src="./murabbo/img/hashtag.svg" alt="Murabbo"/> <input type="text" required="" name=""/>
			                                    <label>Hashtag</label>
			                                </div>
			                                <div class="cus_input input_wrap floating-label" >
			                                    <img src="./murabbo/img/global.svg" alt="Murabbo"/> 
			                                    <select class="floating-select" onclick="this.setAttribute('value', this.value);" value="">
			                                        <option></option>
			                                        <option>English</option>
			                                        <option>Hindi</option>
			                                        <option>Gujarati</option>
			                                        <option>Marathi</option>
			                                        <option>Tamil</option>
			                                        <option>Punjabi</option>
			                                        <option>Spanish</option>
			                                        <option>Bhojpuri</option>
			                                        <option>Telugu</option>
			                                        <option>Other</option>
			                                    </select>
			                                    <span class="highlight"></span>
			                                    <label>Language</label>
			                                </div>
			                            </div>
			                            <div class="col-lg-4 col-md-6 col-sm-12">
			                                <div class="cus_input input_wrap">
			                                    <img src="./murabbo/img/saveto.svg" alt="Murabbo"/> <input type="text" required="" name=""/>
			                                    <label>Save To</label>
			                                </div>
			                                <div style={{margin: '0px 0 5px 0'}} class="cus_input ">
			                                    <img src="./murabbo/img/enable.svg" alt="Murabbo"/> <label class="cus_label">Visibility</label>
			                                </div>
			                                <label class="control control--radio">All
			                                  <input type="radio" name="radio" checked="checked"/>
			                                  <div class="control__indicator"></div>
			                                </label>
			                                <label class="control control--radio">Only Me
			                                  <input type="radio" name="radio"/>
			                                  <div class="control__indicator"></div>
			                                </label>
			                                <div class="add-category">
			                                    <label>Choose Category <a href="#/choose_category"><img src="./murabbo/img/add.svg" alt="Murabbo"/></a></label><br />

			                                    <div class="category">
			                                        <p>Category 1 <img src="./murabbo/img/closewhite.svg" alt="Murabbo"/></p>
			                                    </div>
			                                    <div class="category">
			                                        <p>Category 2 <img src="./murabbo/img/closewhite.svg" alt="Murabbo"/></p>
			                                    </div>
			                                </div>
			                                <div class="add-category">
			                                    <label>Choose Brand <a href="#/choose_brand"><img src="./murabbo/img/add.svg" alt="Murabbo"/></a></label><br />

			                                    <div class="category">
			                                        <p>Brand 1<img src="./murabbo/img/closewhite.svg" alt="Murabbo"/></p>
			                                    </div>
			                                    <div class="category">
			                                        <p>Brand 2 <img src="./murabbo/img/closewhite.svg" alt="Murabbo"/></p>
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
			                                        <a href="#/tray"><button class="blue_btn" type="button">Save & Next</button></a>
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

export default AddContest
