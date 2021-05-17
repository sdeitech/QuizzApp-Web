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

class Contest extends Component {
	constructor(props) {
        super(props);
        this.state = {
			fields:{playerType:"",gameType:""},
			errors:{},
			errorsPlay:{},
			fieldsPlay:{display_name:'',password:''},
			openModel:false,
			playNewContestModel:false,
			playContestModel:false,
			confirmationModel:false,
			listData:[],
			categorySelected:[],
			languageList:[],
			languageSelected:[],
			playerTypeSelected:[],
			categoryList: [],
			playerTypeList: [],
			gameTypeArr : ['HangMan','Match It', 'Unscramble',  'Guess & Go', 'Giberish','Bingo', 'Quizz',  'Taboo'],
			brandList: [],
            delete_id:'',
            saveToId:''
		};
	}

	handleChange(field, e){  
        if (field === "categoryIds") {
        	this.setState({categorySelected:e});
        } 
        else if (field === "language") {
        	this.setState({languageSelected:e});
        }   
        else if (field === "playerType") {
        	let fields = this.state.fields;
        	fields['playerType'] = e.target.value;
        	this.setState({fields});
        }     
        else if (field === "searchKey") {
        	let fields = this.state.fields;
        	fields['searchKey'] = e.target.value;
        	this.setState({fields});
        } 

    }

	handlePlayerTypeChange(data, e){  
		let fields = this.state.fields;
		fields['playerType'] = data;
		this.setState({fields});
    }

    handleClearAllFilter()
    {
    	this.setState({
			categorySelected:[],
			languageSelected:[]});
		let fields = this.state.fields;
    	fields['searchKey'] = '';
    	fields['playerType'] = '';
    	this.setState({fields});
    	this.componentDidMount();
    }

    handleApplyFilter(){
        var str = [];
		for (var p in this.state.fields)
		if (this.state.fields.hasOwnProperty(p)) {
		  str.push((p) + "=" + (this.state.fields[p]));
		}
		var queryStr = (str.join("&") === '') ? '' : '&'+str.join("&");
		console.log(queryStr);
        var userId = JSON.parse(reactLocalStorage.get('userData')).userId;

		fetch(configuration.baseURL+"individual/getTrending?"+queryStr, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
                }
            }).then((response) =>{
	    	return response.json();
	    }).then((data)=> {
	   		this.setState({ listData:data.data});
		});	
    }

	componentDidMount(){

		const queryString = window.location.search;
		// console.log(queryString);
		const urlParams = new URLSearchParams(queryString);

		var gameType = urlParams.get("gameType");

		var url = window.location.href;
        gameType =url.substring(url.lastIndexOf('/') + 1);
        gameType = gameType.split('?');

        // isTrending
        var gameTypeId = '';
        if (gameType[1]) {
        	gameTypeId = gameType[1];
        	if (gameTypeId !== '') {
	        	let fields = this.state.fields;
				fields['gameType'] = gameTypeId;
				this.setState({fields});
	        }
        }

		var playerTypeList = [
		    { label: "Single Player", value: "1" },
		    { label: "Multi Player ", value: "2" }
		 ];
	  	this.setState({ playerTypeList:playerTypeList});

		this.handleApplyFilter();
	}

	roundsListHandler(data,e)
	{
		if (data.isPublish) {
			this.props.history.push('/contests/detail/'+data._id);
		}
		else
		{
	        return toast.error('Contest is not publish,you can not play yet!');
		}
		
	}

	titleSmall(name){
		if (name.length > 12) {
		    var shortname = name.substring(0, 12) + "...";
		    return shortname;
		}
		else
		{
			return name;
		}
	}

	

	render() {
		return (
			<>
				<TheHeaderInner />				
					<main id="main" className="filter-with-contest">
					<ToastContainer position="top-right" autoClose={20000} style={{top:'80px'}}/>
			            <section id="contest" class="d-flex align-items-center">
			                <div class="container">
			                    <div class="create-contest">
			                        <div class="contest-title">
			                            <div class="row">
			                                <div class="col-md-8">
			                                    <div class="main_title">
			                                        <h3>All Rounds</h3>  
			                                    </div>
			                                </div>
			                                <div class="col-md-4">
				                                <div className="search">
			                                        <input placeholder="Search by keywords" type="text" onChange={this.handleChange.bind(this, "searchKey")} value={this.state.fields["searchKey"]} /><i className='bx bx-search' ></i>
			                                    </div>
			                                </div>
			                                <div class="col-md-12" style={{marginTop:'20px'}}>
			                                    <div class="filterinline">
			                                        
			                                        <div class="lanfilter">
			                                            
			                                           
			                                            {/* <select className="single-select" value={this.state.fields['playerType']} onChange={this.handleChange.bind(this, "playerType")} >
			                                                <option value="">All</option>
			                                                <option value="1">Single Player</option>
			                                                <option value="2">Multi Player</option>
			                                            </select> */}
														<p>Player Type:</p>
														<ul class="player_menu">
															<div class="dropdown">
																<div class="dropdown-toggle cus_img single-select" type="button" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
																
																{(this.state.fields['playerType'] === "") ?  "Select" : (this.state.fields['playerType'] === "1") ?  "Single Player" : "Multi Player"} 
																</div>
																<div class="dropdown-menu drop_menu player_drop_down " aria-labelledby="dropdownMenu3">
																	<li onClick={this.handlePlayerTypeChange.bind(this, "")}>All</li>
																	<li onClick={this.handlePlayerTypeChange.bind(this, "1")}>Single Player</li>
																	<li onClick={this.handlePlayerTypeChange.bind(this, "2")}>Multi Player</li>
																</div>
															</div>
														</ul>
														

			                                            {/*<MultiSelect
												        options={this.state.playerTypeList}
												        onChange={this.handleChange.bind(this, "playerType")}
												        value={this.state.playerTypeSelected}
												        
												      /> */}

			                                        </div>
			                                        
			                                        <div class="lanfilter fil_btn" >
			                                            <button className="blue_btn light_blue_btn" type="button" onClick={this.handleClearAllFilter.bind(this)}>Clear All</button>
			                                            <button className="yellow_btn" type="button" onClick={this.handleApplyFilter.bind(this)}>Apply</button>
			                                        </div>
			                                    </div>
			                                </div>
			                            </div>
			                        </div>
			                    </div>
			                    <div style={{paddingBottom: '30px'}} class="contest-info dashboard-contest fix-box">
			                        <div class="row">
									{

										(this.state.listData.length > 0) ? 
										this.state.listData.map((e, key) => {
											return <div class="col-lg-2 col-md-4 col-6">
												<div class="cate-box2"  onClick={() => {this.props.history.push('/detail-round/'+e._id)}}  style={{ cursor:'pointer'}} >
													<img src={(e.image !== '') ? e.image : 'avatars/placeholder.png' } alt="Game" className="main"/>
													<div class="cat_title2">
														<h3>{e.numberOfQuestions} {(e.numberOfQuestions > 1) ? 'Questions' : 'Question'}</h3>
														<p>{e.title}</p>
														<p className="username">{e.createdBy}</p>
													</div>
												</div>
											</div>
										}) : 
										(
											<div style={{color:'white',width: '100%',textAlign:'center',marginTop:"50px",marginBottom:"50px"}} className="flex"><p className="item-author text-color">No data found</p></div>
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
