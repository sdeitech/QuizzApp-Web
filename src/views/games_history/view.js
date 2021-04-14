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
import MultiSelect from "react-multi-select-component";
import {
    CModal,
    CModalBody,
  } from '@coreui/react';

class Contest extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	listData:[]
		};
	}

	componentDidMount(){
		var userId = JSON.parse(reactLocalStorage.get('userData')).userId;
		fetch(configuration.APIbaseURL+"game/history?userId="+userId, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
                }
            }).then((response) =>{
	    	return response.json();
	    }).then((data)=> {
	    	var filtered = data.data.filter(function (el) {
			  return el.gameInfo != null;
			});
	   		this.setState({ listData:filtered});
		});	
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
			                                <div class="col-md-8">
			                                    <div class="main_title">
			                                        <h3>Game History</h3>  
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
			                                        <img src={(e.gameInfo.contestImage !== '') ? e.gameInfo.contestImage : 'avatars/placeholder.png' } alt="Game" className="main"/>
			                                        <div class="cat_title2">
			                                            <h3>{e.gameInfo.contestName}</h3>
			                                            <p>Point: {e.gameInfo.totalScore}</p>
			                                        </div>
			                                    </div>
				                            </div>
                                        }) : 
								        (
								        	<div style={{color:'white',width: '100%',textAlign:'center',marginTop:"150px",marginBottom:"150px"}} className="flex"><p className="item-author text-color">No data found</p></div>
								        )
			                        }
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

export default Contest
