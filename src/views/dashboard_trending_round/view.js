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
			fields:{playerType:""},
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
		str = "isTrending=yes";		

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

		fetch(configuration.baseURL + "individual/getTrending", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + reactLocalStorage.get("clientToken")
            }
        })
		.then(response => {
			return response.json();
		})
		.then(data => {
			this.setState({ listData: data.data });
		});
		

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
