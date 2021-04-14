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
let isTrending='';
class Contest extends Component {
	constructor(props) {
        super(props);
        this.state = {
			fields:{},
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

    handleChangePlay(field, e){  
       let fields = this.state.fieldsPlay;
    	fields[field] = e.target.value;
    	this.setState({fieldsPlay:fields});

    	let errors = {};
        if(field === 'display_name' && fields["display_name"].trim() === ''){
            errors["display_name"] = "Please enter Display Name";
        }

        if(field === 'password' && fields["password"].trim() !== '' && fields["password"].length < 6){
            errors["password"] = "Please Game Password minimum size must be 6";
        }
        this.setState({errorsPlay: errors});

    }


    handleNext(){
    	let fields = this.state.fieldsPlay;
		let errors = {};
        let formIsValid = true;
        if(fields["display_name"].trim() === ''){
            formIsValid = false;
            errors["display_name"] = "Please enter Display Name";
        }

        if(fields["password"].trim() !== '' && fields["password"].length < 6){
            errors["password"] = "Please Game Password minimum size must be 6";
        }

        this.setState({errorsPlay: errors});
		if(formIsValid){ 
			
			const data = new FormData();
        	data.append('displayName',fields["display_name"]);
        	data.append('password',fields["password"]);
        	data.append('createdBy',JSON.parse(reactLocalStorage.get('userData')).userId);
        	data.append('contestId',fields["contestId"]);
            
            fetch(configuration.baseURL+"room/room", {
                method: "post",
                headers: {
					'contentType': "application/json",
                    'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
                },
                body:data
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if(data.code === 200){
					this.props.history.push('/detail-contest/'+fields["contestId"]+'?'+data.data._id);
                }
                else
                {
                    return toast.error(data.message);
                }
                
            });

		}
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
    	let fields = this.state.fields;
    	let langArr = [];
    	let languageSelected = this.state.languageSelected;
    	for (var i = 0; i < languageSelected.length; i++) {
    		langArr.push(languageSelected[i].value);
    	}
    	fields['language'] = langArr.join();

    	let cateArr = [];
    	let categorySelected = this.state.categorySelected;
    	for (var i = 0; i < categorySelected.length; i++) {
    		cateArr.push(categorySelected[i].value);
    	}
    	fields['categoryIds'] = cateArr.join();

    	// let playerTypeArr = [];
    	// let playerTypeSelected = this.state.playerTypeSelected;
    	// for (var i = 0; i < playerTypeSelected.length; i++) {
    	// 	playerTypeArr.push(playerTypeSelected[i].value);
    	// }
    	// fields['playerType'] = playerTypeArr.join();
    	// this.setState({fields});

        var str = [];
		for (var p in this.state.fields)
		if (this.state.fields.hasOwnProperty(p)) {
		  str.push((p) + "=" + (this.state.fields[p]));
		}
		var queryStr = (str.join("&") === '') ? '' : '&'+str.join("&");
		// console.log(queryStr);
        var userId = JSON.parse(reactLocalStorage.get('userData')).userId;

         var str = '';
        if (isTrending === 'yes') {
        	str = "isTrending=yes";
        }
        else
        {
        	str = "userId="+userId;
        }


		fetch(configuration.baseURL+"contest/contest?"+str+queryStr+"&saveToId="+this.state.saveToId, {
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
		var playerTypeList = [
		    { label: "Single Player", value: "1" },
		    { label: "Multi Player ", value: "2" }
		 ];
	  	this.setState({ playerTypeList:playerTypeList});


		const queryString = window.location.search;
		// console.log(queryString);
		const urlParams = new URLSearchParams(queryString);

		var saveToId = urlParams.get("saveToId");

		var url = window.location.href;
        saveToId =url.substring(url.lastIndexOf('/') + 1);
        saveToId = saveToId.split('?');

        // isTrending
        var searchSaveToId = '';
        if (saveToId[1]) {
        	searchSaveToId = saveToId[1];
        	if (searchSaveToId !== '') {
	        	this.setState({saveToId:searchSaveToId});
	        }
        }

		var userId = JSON.parse(reactLocalStorage.get('userData')).userId;
        var str = '';
        if (saveToId[0] === 'trending') {
        	isTrending = 'yes';
        	str = "isTrending=yes";
        }
        else
        {
        	str = "userId="+userId;
        }



		var paramIsTrending = (isTrending !== '') ? 'yes' : 'no';
		fetch(configuration.baseURL+"contest/contest?"+str+"&saveToId="+searchSaveToId, {
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

	    var lanOption = []
		languages.languages.map((e, key) => {
            lanOption.push({label:e.name,value: e.name});
        })
	   	this.setState({ languageList:lanOption});


		fetch(configuration.baseURL+"category/category", {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
                }
            }).then((response) =>{
	    	return response.json();
	    }).then((data)=> {
			var category = data.data;
			const options = [];

		  	for (var i = 0; i < category.length; i++) {
		  		options.push({label:category[i].name,value: category[i]._id});
		  	}
	   		this.setState({ categoryList:options});
		});	



		fetch(configuration.baseURL+"brand/brand", {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
                }
            }).then((response) =>{
	    	return response.json();
	    }).then((data)=> {
			var brandList = data.data;
	   		this.setState({ brandList:brandList});
		});	

	}

	editHandler(data,e){
		if (data.isPublish === false) {
			this.props.history.push('/edit_contest/'+data._id);
		}
		else
		{
	        return toast.error('Contest is publish,you can not edit it!');
		}
	}

	removeContestHandler(type = '',data)
	{	
		if (this.state.delete_id !== '' && type === 'delete') {
			fetch(configuration.baseURL+"contest/contest/"+this.state.delete_id, {
			        method: "DELETE",
			        headers: {
			            'Accept': 'application/json',
			            'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
			        }
			    }).then((response) =>{
				return response.json();
			}).then((data)=> {
				if (data.code === 200) {
					this.setState({delete_id:'',confirmationModel:false});
	            	this.componentDidMount();
					
	            }else{
	                return toast.error(data.message);
	            }
			});
	    }
	    else
	    {
	    	this.setState({delete_id:data._id,confirmationModel:true});

	    }
	}

	roundsListHandler(data,e)
	{
		if (data.isPublish) {
			this.props.history.push('/contests/start_round/'+data._id);
		}
		else
		{
	        return toast.error('Contest is not publish,you can not play yet!');
		}
		
	}

	playContest(data){
		this.setState({playContestModel:true,errorsPlay:{display_name:'',password:''},fieldsPlay:{display_name:'',password:'',contestId:data._id}})
	}

	joinRoomContest(data)
	{
		this.props.history.push('/videoChat/'+data._id);
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
					<main id="main">
					<ToastContainer position="top-right" autoClose={20000} style={{top:'80px'}}/>
			            <section id="contest" class="d-flex align-items-center">
			                <div class="container">
			                    <div class="create-contest">
			                        <div class="contest-title">
			                            <div class="row">
			                                <div class="col-md-8">
			                                    <div class="main_title">
			                                        <h3>{ (isTrending === '') ? "My Games" : "All Contest"}</h3>  
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
			                                            
			                                            <p>Language:</p>
			                                            <MultiSelect
												        options={this.state.languageList}
												        onChange={this.handleChange.bind(this, "language")}
												        value={this.state.languageSelected}
												      /> 
			                                            {/*<select onChange={this.handleChange.bind(this, "language")} >
			                                            <option value="">Select</option>
				                                            {
				                                            	languages.languages.map((e, key) => {
				                                                    return <option value={e.name}>{e.name} </option>;
				                                                })
				                                            }
			                                            </select>*/}
			                                        </div>
			                                        <div class="lanfilter">
			                                            
			                                            <p>Player Type:</p>
			                                            <select className="single-select" value={this.state.fields['playerType']} onChange={this.handleChange.bind(this, "playerType")} >
			                                                <option value="">All</option>
			                                                <option value="1">Single Player</option>
			                                                <option value="2">Multi Player</option>
			                                            </select>

			                                            {/*<MultiSelect
												        options={this.state.playerTypeList}
												        onChange={this.handleChange.bind(this, "playerType")}
												        value={this.state.playerTypeSelected}
												        
												      /> */}

			                                        </div>
			                                        <div class="lanfilter">
			                                            <p>Category:</p>

			                                            <MultiSelect
												        options={this.state.categoryList}
												        onChange={this.handleChange.bind(this, "categoryIds")}
												        value={this.state.categorySelected}
												        
												      />

			                                            {/*<select onChange={this.handleChange.bind(this, "categoryIds")} >
			                                            	<option value="">All</option>
			                                                {
				                                            	this.state.categoryList.map((e, key) => {
				                                                    return <option value={e._id}>{e.name} </option>;
				                                                })
				                                            }
			                                            </select>*/}
			                                        </div>
			                                        {/*<div class="lanfilter" >
			                                            <p>Game Type:</p>

			                                            <MultiSelect
												        options={[]}
												        onChange={this.handleChange.bind(this, "categoryIds")}
												        value={""}
												        labelledBy={"Select"} />
			                                        </div>*/}
			                                        <div class="lanfilter fil_btn" >
			                                            <button className="blue_btn light_blue_btn" type="button" onClick={this.handleClearAllFilter.bind(this)}>Clear All</button>
			                                            <button className="yellow_btn" type="button" onClick={this.handleApplyFilter.bind(this)}>Apply</button>
			                                        </div>
			                                    </div>
			                                </div>
			                            </div>
			                        </div>
			                    </div>
			                    <div style={{paddingBottom: '30px'}} class="contest-info dashboard-contest">
			                        <div class="row">
			                        {

			                        	(this.state.listData.length > 0) ? 
			                        	this.state.listData.map((e, key) => {
                                            return <div class="col-lg-3 col-md-4 col-sm-6" >
			                                	<div class="cate-box2">
			                                        <img src={(e.image !== '') ? e.image : 'avatars/placeholder.png' } alt="Game" className="main" style={{ cursor:'pointer'}} onClick={this.editHandler.bind(this,e)}/>
			                                        <img className="con-close" src="./murabbo/img/close-white2.svg" alt="" style={{ cursor:'pointer'}} onClick={this.removeContestHandler.bind(this,'no',e)} />
			                                        <div class="cat_title2" style={{ cursor:'pointer'}} >
			                                            <h3 style={{ cursor:'pointer'}} onClick={this.editHandler.bind(this,e)}>{this.titleSmall(e.title)}</h3>
			                                            <p style={{cursor: 'pointer'}}  onClick={this.roundsListHandler.bind(this,e)} >{e.totalRound} {(e.totalRound > 1) ? 'Rounds' : 'Round'} 
			                                       	<p style={{ cursor:'context-menu'}} className={(e.isPublish) ? 'published ':'draft '}>{(e.isPublish) ? 'Published':'Draft'}</p></p>
			                                         <p className="play_btn_contest username" onClick={this.joinRoomContest.bind(this,e)} style={{ cursor:'pointer',display: (e.isPublish) ? 'block' : 'none'}}>Join</p>

			                                            {/* <p className="play_btn_contest" onClick={this.playContest.bind(this,e)} style={{ cursor:'pointer',display: (e.isPublish) ? 'block' : 'none'}}>Play</p>*/}
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
			            <CModal show={this.state.confirmationModel}  closeOnBackdrop={false}  onClose={()=> this.setState({confirmationModel:false})}
                    color="danger" 
                    centered>
                        <CModalBody className="model-bg">

                        <div>
                            <div className="modal-body">
                                <button type="button" className="close"   onClick={()=> this.setState({confirmationModel:false})}>
                                <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
                            </button>
                                <div className="model_data">
                                    <div className="model-title">
                                    	<img src='./murabbo/img/close_pink.png' alt=""  />
                                    	<h3>Are you sure you want to delete?</h3>
                                    </div>
                                    <img className="shape2" src="./murabbo/img/shape2.svg"/>
                                    <img className="shape3" src="./murabbo/img/shape3.svg"/>
                                    <div className="row">
                                        <div className="col-md-10 offset-md-1">

                                        	<div style={{ textAlign: 'center' , float:'left',marginRight:'10px' }} className="">
							                    <button  style={{minWidth: '150px'}}  className="blue_btn" type="button"  onClick={()=> this.setState({confirmationModel:false,delete_id:''})} >No</button>
							                </div>
                                			<div style={{ textAlign: 'center' , float:'left' }} className="">
							                    <button  style={{minWidth: '150px'}}  className="pink_btn" type="button"  onClick={this.removeContestHandler.bind(this,'delete')} >Yes</button>
							                </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </CModalBody>
                    </CModal>

                    <CModal show={this.state.playContestModel}  closeOnBackdrop={false}  onClose={()=> this.setState({playContestModel:false})}
                    color="danger" 
                    centered>
                        <CModalBody className="model-bg">

                        <div>
                            <div className="modal-body">
                                <button type="button" className="close"   onClick={()=> this.setState({playContestModel:false})}>
                                <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
                            </button>
                                <div className="model_data">
                                    <div className="model-title">                                	

                                    </div>
                                    <img className="shape2" src="./murabbo/img/shape2.svg"/>
                                    <img className="shape3" src="./murabbo/img/shape3.svg"/>
                                    <div className="row">
                                        <div className="col-md-10 offset-md-1">
                                			<div style={{ textAlign: 'center'}} className="">
							                    <button  style={{minWidth: '250px',marginBottom: '10px'}}  className="blue_btn light_blue_btn" type="button" >Pick a Room</button>
							                </div>
							                <div style={{ textAlign: 'center'}} className="">
							                   	<button  style={{minWidth: '250px',marginBottom: '10px'}}  className="yellow_btn" type="button"  onClick={()=> this.setState({playContestModel:false,playNewContestModel:true})}>Play New</button>
							                </div>
                                        	<div style={{ textAlign: 'center'}} className="">
							                    <button  style={{minWidth: '250px',marginBottom: '10px'}}  className="pink_btn" type="button"  onClick={()=> this.setState({playContestModel:false})} >Cancel</button>
							                </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </CModalBody>
                    </CModal>

                    <CModal show={this.state.playNewContestModel}  closeOnBackdrop={false}  onClose={()=> this.setState({playNewContestModel:false})}
                    color="danger" 
                    centered>
                        <CModalBody className="model-bg">

                        <div>
                            <div className="modal-body">
                                <button type="button" className="close"   onClick={()=> this.setState({playNewContestModel:false})}>
                                <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
                            </button>
                                <div className="model_data">
                                    <div className="model-title">
                                    	<h3>Set Password</h3>
                                    	<h4>Password needs to be set for a private contest. Keeping it blank will make your contest Public to all.</h4>
                                    </div>
                                    <img className="shape2" src="./murabbo/img/shape2.svg"/>
                                    <img className="shape3" src="./murabbo/img/shape3.svg"/>
                                    <div className="row">
                                        <div className="col-md-10 offset-md-1">
                                        	
                                        	<div className="cus_input input_wrap">
                                                <img src="./murabbo/img/title.svg" /> 
												<input required type="text"  onChange={this.handleChangePlay.bind(this, "display_name")} value={this.state.fieldsPlay["display_name"]}/>
												<label>Display Name</label>
                                            </div> 
                                            <span className="error-msg">{this.state.errorsPlay["display_name"]}</span>

                                            <div className="cus_input input_wrap">
                                                <img src="./murabbo/img/password.svg" />
												<input required type="text"  onChange={this.handleChangePlay.bind(this, "password")} value={this.state.fieldsPlay["password"]}/>
												<label>Game Password</label>
                                            </div> 
                                            <span className="error-msg">{this.state.errorsPlay["password"]}</span>
                                        </div>
                                        <div className="col-md-10 offset-md-1">

							                <div style={{ textAlign: 'center' , float:'left',marginRight:'10px' }} className="">
							                   	<button  style={{minWidth: '150px'}}  className="blue_btn light_blue_btn" type="button"  onClick={this.handleNext.bind(this)}>Next</button>
							                </div>
                                        	<div style={{ textAlign: 'center'}} className="">
							                    <button  style={{minWidth: '150px', float:'left'}}  className="pink_btn" type="button"  onClick={()=> this.setState({playNewContestModel:false})} >Cancel</button>
							                </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </CModalBody>
                    </CModal>

			        </main>
		        <TheFooter />
		    </>
		)
	}
}

export default Contest
