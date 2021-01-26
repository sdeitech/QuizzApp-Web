import React, {Component} from 'react'
import {
    TheFooter,
    TheHeaderInner
} from '../../containers/index'
import 'react-toastify/dist/ReactToastify.css';
import languages from '../../languages';
import configuration from '../../config';
import {reactLocalStorage} from 'reactjs-localstorage';
class Contest extends Component {
	constructor(props) {
        super(props);
        this.state = {
			fields:{},
			errors:{},
			openModel:false,
			listData:[],
			categoryList: [],
			gameTypeArr : ['HangMan','Match It', 'Unscramble',  'Guess & Go', 'Giberish','Bingo', 'Quizz',  'Taboo'],
			brandList: [],
		};
	}

	handleChange(field, e){   
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});

        var str = [];
		for (var p in this.state.fields)
		if (this.state.fields.hasOwnProperty(p)) {
		  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(this.state.fields[p]));
		}
		var queryStr = (str.join("&") === '') ? '' : '&'+str.join("&");
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
	   		this.setState({ categoryList:category});
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
			                                <div class="col-md-3">
			                                    <div class="main_title">
			                                        <h3>All Contest</h3>  
			                                    </div> 
			                                </div>
			                                <div class="col-md-9">
			                                    <div class="filterinline">
			                                        <div class="lanfilter">
			                                            Language: 
			                                            <select onChange={this.handleChange.bind(this, "language")} >
			                                            <option value="">Select</option>
				                                            {
				                                            	languages.languages.map((e, key) => {
				                                                    return <option value={e.name}>{e.name} </option>;
				                                                })
				                                            }
			                                            </select>
			                                        </div>
			                                        <div class="lanfilter">
			                                            Player Type: 
			                                            <select onChange={this.handleChange.bind(this, "playerType")} >
			                                                <option value="">All</option>
			                                                <option value="1">Single Player</option>
			                                                <option value="2">Multi Player</option>
			                                            </select>
			                                        </div>
			                                        <div class="lanfilter">
			                                            Category:
			                                            <select onChange={this.handleChange.bind(this, "categoryIds")} >
			                                            	<option value="">All</option>
			                                                {
				                                            	this.state.categoryList.map((e, key) => {
				                                                    return <option value={e._id}>{e.name} </option>;
				                                                })
				                                            }
			                                            </select>
			                                        </div>
			                                        {/*<div class="lanfilter" >
			                                            Game Type:
			                                            <select onChange={this.handleChange.bind(this, "gameType")} >
			                                                <option value="">All</option>
			                                                {
				                                            	this.state.gameTypeArr.map((e, key) => {
				                                                    return <option value={e}>{e} </option>;
				                                                })
				                                            }
			                                            </select>
			                                        </div>*/}
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
                                            return <div class="col-lg-3 col-md-4 col-sm-6">
				                                <a href="#/add_contest">
				                                    <div class="cate-box2">
				                                        <img src={(e.image !== '') ? e.image : 'avatars/placeholder.png' } alt="Game"/>
				                                        <div class="cat_title2">
				                                            <h3>{e.totalRound} {(e.totalRound > 1) ? 'Rounds' : 'Round'} <span>{e.userName}</span></h3>
				                                            <p>{e.title}</p>
				                                        </div>
				                                    </div>
				                                </a>
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
