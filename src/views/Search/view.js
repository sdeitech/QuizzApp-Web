// import React, { Component } from "react";
// import { TheFooter, TheFooterInner, TheHeaderInner } from "../../containers/index";
// import { reactLocalStorage } from "reactjs-localstorage";
// import configuration from "../../config";
// import { CModal, CModalBody } from "@coreui/react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import InfiniteScroll from "react-infinite-scroll-component";
// import $ from "jquery";
// var jwt = require("jsonwebtoken");

// class SearchContest extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//         	fields:{playerType:""},
// 			errors:{},
// 			errorsPlay:{},
// 			fieldsPlay:{display_name:'',password:''},
// 			openModel:false,
// 			playNewContestModel:false,
// 			playContestModel:false,
// 			confirmationModel:false,
// 			listData:[],
// 			categorySelected:[],
// 			languageList:[],
// 			languageSelected:[],
// 			playerTypeSelected:[],
// 			categoryList: [],
// 			playerTypeList: [],
// 			gameTypeArr : ['HangMan','Match It', 'Unscramble',  'Guess & Go', 'Giberish','Bingo', 'Quizz',  'Taboo'],
// 			brandList: [],
//             delete_id:'',
//             saveToId:''
//         };
//     }

//     componentDidMount() {
        
//     }

//     handleChange(field, e){  
//         if (field === "categoryIds") {
//         	this.setState({categorySelected:e});
//         } 
//         else if (field === "language") {
//         	this.setState({languageSelected:e});
//         }   
//         else if (field === "playerType") {		
// 			// var lastItem = e[e.length - 1];
// 			this.setState({playerTypeSelected:e});
//         }     
//         else if (field === "searchKey") {
//         	let fields = this.state.fields;
//         	fields['searchKey'] = e.target.value;
//         	this.setState({fields});
//         } 

//     }



    
   

//     render() {
//         return (
//             <>
//                 <TheHeaderInner />
//                 <main id="main">
// 					<ToastContainer position="top-right" autoClose={5000} style={{top:'80px'}}/>
//                     <div class="container">
// 			                    <div class="create-contest">
// 			                        <div class="contest-title">
// 			                            <div class="row">
// 			                                <div class="col-md-8">
// 			                                    <div class="main_title">
// 			                                        {/* <h3>{ (isTrending === '') ? "My Games" : "All Contest"}</h3>   */}
// 			                                    </div>
// 			                                </div>
// 			                                <div class="col-md-4">
// 				                                <div className="search">
// 			                                        <input placeholder="Search by keywords" type="text" onChange={this.handleChange.bind(this, "searchKey")} value={this.state.fields["searchKey"]} /><i className='bx bx-search' ></i>
// 			                                    </div>
// 			                                </div>
// 			                                <div class="col-md-12" style={{marginTop:'20px'}}>
// 			                                    <div class="filterinline">
// 			                                        <div class="lanfilter">
			                                            
// 			                                            <p>Language:</p>
// 			                                            <MultiSelect
// 												        options={this.state.languageList}
// 												        onChange={this.handleChange.bind(this, "language")}
// 												        value={this.state.languageSelected}
// 												      /> 

// 													  	{/* comment start
// 			                                            <select onChange={this.handleChange.bind(this, "language")} >
// 			                                            <option value="">Select</option>
// 				                                            {
// 				                                            	languages.languages.map((e, key) => {
// 				                                                    return <option value={e.name}>{e.name} </option>;
// 				                                                })
// 				                                            }
// 			                                            </select>
// 														comment end */}
														
// 			                                        </div>
// 			                                        <div class="lanfilter">
			                                            
// 			                                        <p>Player Type:</p>
// 													<ul class="player_menu">
// 														<div class="dropdown">
// 															<div class="dropdown-toggle cus_img single-select" type="button" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
															
// 															{(this.state.fields['playerType'] === "") ?  "Select" : (this.state.fields['playerType'] === "1") ?  "Single Player" : "Multi Player"} 
// 															</div>
// 															<div class="dropdown-menu drop_menu player_drop_down " aria-labelledby="dropdownMenu3">
// 																<li  class="dropdown-item" style={{cursor:"pointer"}} onClick={this.handlePlayerTypeChange.bind(this, "")}>All</li>
// 																<li class="dropdown-item"  style={{cursor:"pointer"}} onClick={this.handlePlayerTypeChange.bind(this, "1")}>Single Player</li>
// 																<li  class="dropdown-item"  style={{cursor:"pointer"}} onClick={this.handlePlayerTypeChange.bind(this, "2")}>Multi Player</li>
// 															</div>
// 														</div>
// 													</ul>
														
// 													{/* comment start
// 			                                        <MultiSelect
// 												        options={this.state.playerTypeList}
// 												        onChange={this.handleChange.bind(this, "playerType")}
// 												        value={this.state.playerTypeSelected}
// 												        disableSearch={true}
// 														hasSelectAll={false}
// 												      /> 
// 													  comment end */}

// 			                                        </div>
// 			                                        <div class="lanfilter">
// 			                                            <p>Category:</p>

// 			                                            <MultiSelect
// 												        options={this.state.categoryList}
// 												        onChange={this.handleChange.bind(this, "categoryIds")}
// 												        value={this.state.categorySelected}
												        
// 												      />
// 														{/* comment start
// 			                                            <select onChange={this.handleChange.bind(this, "categoryIds")} >
// 			                                            	<option value="">All</option>
// 			                                                {
// 				                                            	this.state.categoryList.map((e, key) => {
// 				                                                    return <option value={e._id}>{e.name} </option>;
// 				                                                })
// 				                                            }
// 			                                            </select>

// 														comment end */}
// 			                                        </div>
// 													{/* comment start
// 			                                        <div class="lanfilter" >
// 			                                            <p>Game Type:</p>

// 			                                            <MultiSelect
// 												        options={[]}
// 												        onChange={this.handleChange.bind(this, "categoryIds")}
// 												        value={""}
// 												        labelledBy={"Select"} />
// 			                                        </div>
// 													comment end */}
// 			                                        <div class="lanfilter fil_btn" >
// 			                                            <button className="blue_btn light_blue_btn" type="button" onClick={this.handleClearAllFilter.bind(this)}>Clear All</button>
// 			                                            <button className="yellow_btn" type="button" onClick={this.handleApplyFilter.bind(this)}>Apply</button>
// 			                                        </div>
// 			                                    </div>
// 			                                </div>
// 			                            </div>
// 			                        </div>
// 			                    </div>
			                    
// 			                </div>
// 			        </main>
//                 <TheFooter/>
//             </>
//         );
//     }
// }

// export default YourFriends;
