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
let round_id;
class Detail extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	data:{image:''},
		};
	}

	componentDidMount(){

		var url = window.location.href;
        

        round_id =url.substring(url.lastIndexOf('/') + 1);

		fetch(configuration.baseURL+"individual/getTrending?round_id="+round_id, {
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
		   		this.setState({data:data.data[0]});
		   	}
		   	else
		   	{
		   		this.props.history.push('/dashboard');
		   	}
		});

	}

	render() {
		return (
			<>
				<TheHeaderInner />		
				<ToastContainer position="top-right" autoClose={25000} style={{top:'80px'}}/>		
					<main id="main">
		            <div className="container">
						<div className="contest-detail-with-round">

						<div class="row">
						
							<div class="col-lg-12 col-md-1 col-12">
								<div class="cate-box2" >
									<img src={(this.state.data.image !== '') ? this.state.data.image : 'avatars/placeholder.png' } alt="Game" className="main"/>
									<div class="cat_title2">
										<div className="detailContestWithRoundList">
										<div className="row">
											<div class="cat_title2 col-lg-12 col-md-12">

												<h3 style={{paddingLeft: '0px'}}>{this.state.data.title}</h3>
												<p>{this.state.data.description}</p> 													
											</div>                    
										</div>
									</div>
									</div>
								</div>
							</div>
						</div>
		            </div>
					</div>
		        </main>
		    </>
		)
	}
}

export default Detail
