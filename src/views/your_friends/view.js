import React, { Component } from "react";
import { TheFooter, TheFooterInner, TheHeaderInner } from "../../containers/index";
import { reactLocalStorage } from "reactjs-localstorage";
import configuration from "../../config";
import { CModal, CModalBody } from "@coreui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InfiniteScroll from "react-infinite-scroll-component";
import $ from "jquery";
var jwt = require("jsonwebtoken");

class YourFriends extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	listData:[],
            hasmore:true
        };
    }

    componentDidMount() {
        var userId = JSON.parse(reactLocalStorage.get('userData')).userId;
		fetch(configuration.baseURL+"user/friends?userId="+userId, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
            }
        }).then((response) =>{
        return response.json();
        }).then((data)=> {

            
            this.setState({listData:data.data});
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
			                                <div class="col-md-12">
			                                    <div class="main_title">
			                                        <h3>Your Friends</h3>  
			                                    </div> 
			                                </div>	
			                            </div>
                                        <div style={{marginTop: '25px'}} class="row">    
                                                    {this.state.listData.map((i, index) => (
                                                    <div class="col-lg-4 col-md-12 col-sm-12">
                                                        <div class="_1st2 two_no">
                                                            <div class="_1stimg">
                                                                <div class="leaderimg2_">
                                                                    <img src={ (i.image !== '') ? i.image : 'avatars/placeholder-user.png' }/>
                                                                    <p>{index+1}</p>
                                                                </div>
                                                                <div class="user-detail_">
                                                                    <h3>{i.name}</h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))} 
                                         </div>

			                        </div>
			                    </div>
			                </div>
			            </section>
			        </main>
                <TheFooter/>
            </>
        );
    }
}

export default YourFriends;
