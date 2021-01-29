import React, {Component} from 'react'
import {
    TheFooter,
    TheHeaderInner
} from '../../containers/index'
import 'react-toastify/dist/ReactToastify.css';
import languages from '../../languages';
import configuration from '../../config';
import {reactLocalStorage} from 'reactjs-localstorage';
import MultiSelect from "react-multi-select-component";


class Contest extends Component {
	constructor(props) {
        super(props);
        this.state = {
			fields:{},
			errors:{},
			openModel:false,
			listData:[],
			categorySelected:[],
			languageList:[],
			languageSelected:[],
			playerTypeSelected:[],
			categoryList: [],
			playerTypeList: [],
			gameTypeArr : ['HangMan','Match It', 'Unscramble',  'Guess & Go', 'Giberish','Bingo', 'Quizz',  'Taboo'],
			brandList: [],
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
		console.log(queryStr);
        var userId = JSON.parse(reactLocalStorage.get('userData')).userId;
		fetch(configuration.baseURL+"contest/contest?userId="+userId+queryStr, {
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
		var userId = JSON.parse(reactLocalStorage.get('userData')).userId;
		fetch(configuration.baseURL+"contest/contest?userId="+userId, {
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

	editHandler(id,e){
		this.props.history.push('/edit_contest/'+id);
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
			                                <div class="col-md-8">
			                                    <div class="main_title">
			                                        <h3>All Contest</h3>  
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
			                                        <div class="lanfilter" >
			                                            {/*Game Type:
			                                            <select onChange={this.handleChange.bind(this, "gameType")} >
			                                                <option value="">All</option>
			                                                {
				                                            	this.state.gameTypeArr.map((e, key) => {
				                                                    return <option value={e}>{e} </option>;
				                                                })
				                                            }
			                                            </select>*/}

			                                            <p>Game Type:</p>

			                                            <MultiSelect
												        options={[]}
												        onChange={this.handleChange.bind(this, "categoryIds")}
												        value={""}
												        labelledBy={"Select"} />
			                                        </div>
			                                        <div class="lanfilter fil_btn" >
			                                            <button className="pink_btn" type="button" onClick={this.handleClearAllFilter.bind(this)}>Clear All</button>
			                                            <button className="blue_btn" type="button" onClick={this.handleApplyFilter.bind(this)}>Apply</button>
			                                        </div>
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
                                            return <div class="col-lg-3 col-md-4 col-sm-6" onClick={this.editHandler.bind(this,e._id)}>
			                                	<div class="cate-box2">
			                                        <img src={(e.image !== '') ? e.image : 'avatars/placeholder.png' } alt="Game"/>
			                                        <div class="cat_title2">
			                                            <h3>{e.totalRound} {(e.totalRound > 1) ? 'Rounds' : 'Round'} <span>{e.userName}</span></h3>
			                                            <p>{e.title}</p>
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
