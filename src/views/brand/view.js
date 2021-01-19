import React, {Component} from 'react'
import {
    TheFooter,
    TheHeaderInner
} from '../../containers/index'
import 'react-toastify/dist/ReactToastify.css';

class Brand extends Component {
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
			                                <div class="col-md-12">
			                                    <div class="main_title">
			                                        <h3>Choose Brand</h3>  
			                                    </div> 
			                                </div>
			                            </div>
			                        </div>
			                    </div>
			                    <div class="contest-info">
			                        <div class="row">
			                            <div class="col-lg-4 col-md-4 col-sm-6">
			                            	<a href="#/add_contest">
				                                <div class="cate-box">
				                                    <img src="./murabbo/img/1.png" alt="Brand"/>
				                                    <div class="cat_title">
				                                        <h3>Brand One</h3>
				                                    </div>
				                                </div>
				                            </a>
			                            </div>
			                            <div class="col-lg-4 col-md-4 col-sm-6">
			                                <div class="cate-box pink">
			                                    <img src="./murabbo/img/1.png" alt="Brand"/>
			                                    <div class="cat_title">
			                                        <h3>Brand Two</h3>
			                                    </div>
			                                </div>
			                            </div>
			                            <div class="col-lg-4 col-md-4 col-sm-6">
			                                <div class="cate-box yellow">
			                                    <img src="./murabbo/img/1.png" alt="Brand"/>
			                                    <div class="cat_title">
			                                        <h3>Brand Three</h3>
			                                    </div>
			                                </div>
			                            </div>
			                        </div>
			                        <div class="row">
			                            <div class="col-lg-4 col-md-4 col-sm-6">
			                                <div class="cate-box">
			                                    <img src="./murabbo/img/1.png" alt="Brand"/>
			                                    <div class="cat_title">
			                                        <h3>Brand Four</h3>
			                                    </div>
			                                </div>
			                            </div>
			                            <div class="col-lg-4 col-md-4 col-sm-6">
			                                <div class="cate-box pink">
			                                    <img src="./murabbo/img/1.png" alt="Brand"/>
			                                    <div class="cat_title">
			                                        <h3>Brand Five</h3>
			                                    </div>
			                                </div>
			                            </div>
			                            <div class="col-lg-4 col-md-4 col-sm-6">
			                                <div class="cate-box yellow">
			                                    <img src="./murabbo/img/1.png" alt="Brand"/>
			                                    <div class="cat_title">
			                                        <h3>Brand Six</h3>
			                                    </div>
			                                </div>
			                            </div>
			                        </div>
			                        <div class="row">
			                            <div class="col-lg-4 col-md-4 col-sm-6">
			                                <div class="cate-box">
			                                    <img src="./murabbo/img/1.png" alt="Brand"/>
			                                    <div class="cat_title">
			                                        <h3>Brand Seven</h3>
			                                    </div>
			                                </div>
			                            </div>
			                            <div class="col-lg-4 col-md-4 col-sm-6">
			                                <div class="cate-box pink">
			                                    <img src="./murabbo/img/1.png" alt="Brand"/>
			                                    <div class="cat_title">
			                                        <h3>Brand Eight</h3>
			                                    </div>
			                                </div>
			                            </div>
			                            <div class="col-lg-4 col-md-4 col-sm-6">
			                                <div class="cate-box yellow">
			                                    <img src="./murabbo/img/1.png" alt="Brand"/>
			                                    <div class="cat_title">
			                                        <h3>Brand Nine</h3>
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

export default Brand
