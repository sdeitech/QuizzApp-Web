import React, {Component} from 'react'
import {
    TheFooter,
    TheHeaderInner
} from '../../containers/index'
import configuration from '../../config';
import {reactLocalStorage} from 'reactjs-localstorage';
import {
    CModal,
    CModalBody,
  } from '@coreui/react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import RLDD from 'react-list-drag-and-drop/lib/RLDD';
let round_id,gameType,type;

class RoundQuestion extends Component {
	constructor(props) {
        super(props);
        this.state = {
			confirmationModel:false,
			delete_id:'',
			listArr:[],
            imageList:[],
			optionsModel:false,
            typeOption:'',
            edit_id:'',
			fields:{question:''},
			errors:{question:''},
			subscriptionModel:false
		};
	}

	componentDidMount(){
		var url = window.location.href;
        round_id =url.substring(url.lastIndexOf('/') + 1);
		fetch(configuration.baseURL+"round/round?roundId="+round_id, {
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
				gameType = data.data[0].gameType;
				type = data.data[0].type;
				console.log(type);
				this.getList(round_id);
			}
			else
			{
				this.props.history.push('/dashboard');
			}
		});

		fetch(configuration.baseURL+"media?type=image", {
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
				var data = data.data;		   		
				this.setState({imageList:data});
			}
		});	

	}
	handleRLDDChange(newItems) {
	    this.setState({ listArr: newItems });

	    var sortingList = [];
	    for (var i = 0; i < newItems.length; i++) {
	    	sortingList.push({questionId:newItems[i]['_id'],displayOrder:i});	    	
	    }

	    var postData = JSON.stringify({sortingList:sortingList});
	    fetch(configuration.baseURL+"roundQuestion/sorting", {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
                },
                body:postData
            }).then((response) =>{
	    	return response.json();
	    }).then((data)=> {				
			this.getList(round_id);
		});
	}

	getList(round_id)
	{
		if (round_id) {
			fetch(configuration.baseURL+"roundQuestion/roundQuestion?roundId="+round_id+"&gameType="+gameType, {
	                method: "GET",
	                headers: {
	                    'Accept': 'application/json',
	                    'Content-Type': 'application/json',
	                    'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
	                }
	            }).then((response) =>{
		    	return response.json();
		    }).then((data)=> {
				var data = data.data;
   				for (var i = 0; i < data.length; i++) {
   					data[i]['id'] = i;
   				}
		   		this.setState({listArr:data});
			});	
		}
	}
    

    deleteHandler(id = '',e)
	{
		if (this.state.delete_id) {
			fetch(configuration.baseURL+"roundQuestion/roundQuestion/"+this.state.delete_id+"?roundId="+round_id +"&gameType="+gameType, {
				method:"DELETE",
	            headers: {
					'contentType': "application/json",
	                'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
	            }
	        }).then((response) => {
	            return response.json();
	        }).then((data) => {
	            if(data.code === 200){
	            	this.setState({delete_id:'',confirmationModel:false});
	            	this.getList(round_id);
	            }
	            else
	            {
	                return toast.error(data.message);
	            }
	            
	        });
	    }
	    else
	    {
	    	this.setState({delete_id:id,confirmationModel:true});

	    }
	}

	addQuestion()
	{
		this.props.history.push('/add_question_type/'+round_id);
	}

	editHandler(data)
	{
		this.setState({fields:{question:data.title},errors:{question:''},openModel:true,edit_id:data.item_id});
	}

	openModel()
	{
        this.setState({fields:{question:''},errors:{question:''},openModel:true,edit_id:''});
	}

	handleChangequestion(field, e){   

        let fields = this.state.fields;
		fields[field] = e.target.value; 
        this.setState({fields});

        let errors = {};
        if(field === 'question' && fields["question"].trim() === ''){
            errors["question"] = "Please enter word";
        }

        this.setState({errors: errors});

    }	

	savequestionModel()
	{

		let fields = this.state.fields;
        let formIsValid = true;

    	let errors = {};
        if(fields["question"].trim() === ''){
            errors["question"] = 'Please enter word';
        }
        this.setState({errors: errors});

    	if(formIsValid){
			const data = new FormData();
        	data.append('roundId',round_id);
        	data.append('title',this.state.fields.question);
			data.append('gameType',gameType);
			
			let url = configuration.baseURL+"roundQuestion/roundQuestion";
			var method = "POST";
			if(this.state.edit_id !== '')
			{	
				method = "PUT";
				url = configuration.baseURL+"roundQuestion/roundQuestion/"+this.state.edit_id;
			}
			else{
				data.append('type',type);
				data.append('displayOrder',this.state.listArr.length+1);
			}

            fetch(url, {
                method: method,
                headers: {
					'contentType': "application/json",
                    'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
                },
                body:data
            }).then((response) => {
                return response.json();
            }).then((data) => {
                this.componentDidMount();                
				this.setState({fields:{question:''},errors:{question:''},openModel:false,edit_id:''});
            });
			
    	}
	}

	selectImage(data){
		this.setState({subscriptionModel:false});
		if(!configuration.checkUserHasAccess(data.subscriptionType))
		{
			this.setState({optionsValuesModel:false,subscriptionModel:true});
			return false;	
		}
		var fields = this.state.fields;
		fields['question'] = data.image;
		this.setState({fields});
		this.setState({optionsValuesModel:false,edit_id:''});
		this.savequestionModel();
	}

	handleUploadProfile(type1) {
        this.setState({optionsModel:false,optionsValuesModel:false});
			var that = this;
			const data = new FormData();
        	data.append('media',this.uploadInput.files[0]);
	        data.append('type','round');
            fetch(configuration.baseURL+"get-url-from-file", {
                method: "POST",
                headers: {
					'contentType': "application/json",
                    'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
                },
                body:data
            }).then((response) => {
                return response.json();
            }).then((data) => {
                 if(data.code === 200){
					if(data.data.url !== '')
					{
						that.setState({fields:{question:data.data.url},errors:{question:''},edit_id:''});
						that.savequestionModel();
					}
                }
                
            });

    }

	backToRound(){
		var url = window.location.href.split('/');
        var contest_id=url[5];
		this.props.history.push('/tray/'+contest_id);
	}

	saveNextHandler()
	{
		this.props.history.push('/contest');
	}

	truncate(str, n){
	  return (str.length > n) ? str.substr(0, n-1) + '...' : str;
	}




	toggleHandler(key)
	{
		let listArr = this.state.listArr;
		var that =this;
		listArr = listArr.filter(function(value, index, arr){ 

			console.log(key === index);console.log(key,index);
			if (key === index ) {
				var obj = value;
				obj.active = !obj.active;
				return obj;	
			}	
			else
			{
				var obj = value;
				obj.active = false;
				return obj;	
			}
		})
		this.setState({listArr: listArr});
	}

	render() {
		
		return (
			<>
				<TheHeaderInner />				
					<main id="main">
			            <section id="contest" className="d-flex align-items-center">
			                <div className="container">
			                    <div className="create-contest">
			                        <div className="contest-title">
			                            <div className="row">
			                                <div className="col-md-12">
			                                    <div className="main_title">
			                                        <h3>{gameType} Round Questions</h3>  
			                                    </div> 
			                                </div>
			                            </div>
			                        </div>
			                    </div>
                    			{ 
                                	(this.state.listArr.length > 0) ?
									(type === '2' || type === 2) ?
									<div className="contest-info" >
										<div className="model_data row questionimage" >
                           			 	{
		                                	(this.state.listArr.length > 0) ? 
				                        	this.state.listArr.map((e, key) => {
	                                            return <div class="col-lg-2 col-md-3 col-sm-6" style={{marginBottom:"20px"}}>
				                                	<div class="cate-box2">
														<img className="con-close" src="./murabbo/img/close-white2.svg" alt="" style={{ cursor:'pointer'}} onClick={this.deleteHandler.bind(this,e.item_id)}/>
				                                        <img src={(e.title !== '') ? e.title : 'avatars/placeholder.png' } alt="Game" className="main" style={{borderRadius:'20px'}}/>
				                                    </div>
					                            </div>
	                                        }) : 
									        (
									        	<div style={{color:'white',width: '100%',textAlign:'center',marginTop:"50px",marginBottom:"50px"}} className="flex"><p className="item-author text-color">No data found</p></div>
									        )
									    }
									    </div>
									</div>
											
									:
	                                	<RLDD
										  items={this.state.listArr}
										  itemRenderer={(val,ckey) => {
										  	var className = (val.active) ? 'acc-head p-3 rounded-0 active' : 'acc-head p-3 rounded-0';
                         					var style = (val.active) ? {display: "block"} :{display: "none"};
										    return (
										    <div style={{ paddingTop:'20px',paddingBottom:'20px'}} className="contest-info"> <div className="row"><div className="col-lg-12 col-md-12 col-sm-12">
				                                <div className="accordion-wrapper">
				                                    <div class={className} onClick={this.toggleHandler.bind(this,ckey)}>
				                                        <div className="row">
															<div className="col-md-12">
																<div className="acc_title" style={{cursor:'pointer'}}  >
																	<h4>{val.title}</h4>
																</div>
															</div>
				                                        </div>
				                                    </div>
													
				                                    <div class="acc-body rounded-0" style={style}>
				                                        <div className="row">
				                                            <div className="col-md-12">
				                                                <div className="acc_detail" style={{marginBottom:'20px'}}>
				                                                    <button type="button" className="remove_btn"  onClick={this.deleteHandler.bind(this,val.item_id)} style={{cursor:'pointer'}}><img src="./murabbo/img/close2.svg" /> Remove</button>
				                                                    <button type="button" className="remove_btn" onClick={this.editHandler.bind(this,val)} style={{cursor:'pointer'}}><img src="./murabbo/img/edit.svg"   /> Edit</button>
				                                                </div>
				                                            </div>
				                                        </div>
				                                    </div>
				                                </div>
					                            </div>
					                            </div>
				                    		</div>
										    );
										  }}
										  onChange={this.handleRLDDChange.bind(this)}
										/>
									
		                            : 
							        (
							        	<div style={{ paddingTop:'20px',paddingBottom:'20px'}} className="contest-info"> <div className="row"><div style={{color:'white',width: '100%',textAlign:'center',marginTop:"150px",marginBottom:"150px"}} className="flex"><p className="item-author text-color">No data found</p></div>
			                            </div>
			                    		</div>
							        )
                				}
			                    <div className="contest-info">
			                        <div className="contest-title">
			                            <div className="row">
			                                <div className="col-md-12">
			                                    <div className="footer-btn">
			                                    	<button className="yellow_btn" type="button" onClick={ this.backToRound.bind(this) }>Back To Round</button>
													{(type === '1' || type ===1) ?
														<button className="blue_btn light_blue_btn" type="button" onClick={ this.openModel.bind(this) }>Add {(this.state.listArr.length > 0) ? 'More ' : '' }Word</button>
														:
														<button className="blue_btn light_blue_btn" type="button" onClick={() => {this.setState({optionsModel:true})}}>Add {(this.state.listArr.length > 0) ? 'More ' : '' }Image</button>
													}
			                                    </div> 
			                                </div>
			                            </div>
			                        </div>
			                    </div>
			                </div>
			            </section>
			        </main>
					<CModal show={this.state.openModel}  closeOnBackdrop={false}  onClose={()=> this.setState({openModel:false})}
                    color="danger" 
                    centered>
                        <CModalBody className="model-bg">

                        <div>
                            <div className="modal-body">
                                
                        		<button type="button" className="close" onClick={()=> this.setState({openModel:false})}>
	                                <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
	                            </button>
                                <div className="model_data">
                                    <div className="model-title">
                                    	<h3>Add Word</h3>	
                                    </div>

                                    <div className="cus_input input_wrap">
	                                    <input type="text" required name="" onChange={this.handleChangequestion.bind(this,'question')} value={this.state.fields['question']} />
	                                    <label>Type Word</label>
	                                </div>
	                                <span className="error-msg">{this.state.errors["question"]}</span>
					               
					                <div className="full_btn">
					                    <button style={{marginBottom: '15px'}}  className="yellow_btn" type="button"  onClick={this.savequestionModel.bind(this)} >{(this.state.edit_id !== '') ? 'Update' : 'Done'}</button>
					                </div>
                                </div>
                            </div>
                            </div>
                        </CModalBody>
                    </CModal>
			        <CModal show={this.state.confirmationModel}  closeOnBackdrop={false}  onClose={()=> this.setState({confirmationModel:false,delete_id:''})}
                    color="danger" 
                    centered>
                        <CModalBody className="model-bg">

                        <div>
                            <div className="modal-body">
                                <button type="button" className="close"   onClick={()=> this.setState({confirmationModel:false,delete_id:''})}>
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
							                    <button  style={{minWidth: '150px',color: '#f8c84e',fontWeight: '500'}}  className="blue_btn" type="button"  onClick={()=> this.setState({confirmationModel:false,delete_id:''})} >No</button>
							                </div>
                                			<div style={{ textAlign: 'center' , float:'left' }} className="">
							                    <button  style={{minWidth: '150px'}}  className="pink_btn" type="button"  onClick={this.deleteHandler.bind(this)} >Yes</button>
							                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </CModalBody>
                    </CModal>

					<CModal show={this.state.optionsModel}  closeOnBackdrop={false}  onClose={()=> this.setState({optionsModel:false})}
                    color="danger" 
                    centered>
                    <CModalBody className="model-bg">

                    <div>
                        <div className="modal-body">
                            
                    		<button type="button" className="close" onClick={()=> this.setState({optionsModel:false})}>
                                <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
                            </button>
                            <div className="model_data questionOptionModel">

                            	<div className="profile-img" style={{ marginTop: '15px' }}>
                                    <form id="file-upload-form" className="uploader">
                                      <input id="file-upload" type="file" name="fileUpload" className="file-upload" onChange={this.handleUploadProfile.bind(this,'image')} ref={(ref) => { this.uploadInput = ref; }}  />

                                      	<label for="file-upload" id="file-drag">
                                      		Gallery
                                        	<img id="file-image"   src="#" alt="Preview" className="hidden"/>                                        
											<div id="response" className="hidden">
                                          	<div id="messages"></div>
                                          
                                        </div>
                                      </label>
                                    </form>
                                </div>

				                <div className="full_btn">
				                    <button style={{marginBottom: '15px'}}  className="yellow_btn" type="button"  onClick={() => {this.setState({optionsModel:false,optionsValuesModel:true,typeOption:'image'})}} >Murabbo Image</button>
				                </div>
				                
                            </div>
                        </div>
                        </div>
                    </CModalBody>
                </CModal>
				<CModal show={this.state.subscriptionModel}  closeOnBackdrop={false}  onClose={()=> this.setState({subscriptionModel:false})}
							color="danger" 
							centered>
					<CModalBody className="model-bg">

					<div>
						<div className="modal-body">
							<button type="button" className="close"   onClick={()=> this.setState({subscriptionModel:false})}>
							<span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
						</button>
							<div className="model_data">
								<div className="model-title">
									<img src='./murabbo/img/close_pink.png' alt=""  />
									<h3>You need to purchase subscription.</h3>
								</div>
								<img className="shape2" src="./murabbo/img/shape2.svg"/>
								<img className="shape3" src="./murabbo/img/shape3.svg"/>
								<div className="row">
									<div className="col-md-10 offset-md-1">

										<div style={{ textAlign: 'center' , float:'left',marginRight:'10px' }} className="">
											<button  style={{minWidth: '150px'}}  className="blue_btn" type="button"  onClick={()=> this.setState({subscriptionModel:false})} >No</button>
										</div>
										<div style={{ textAlign: 'center' , float:'left' }} className="">
											<button  style={{minWidth: '150px'}}  className="pink_btn" type="button"  onClick={() => {this.props.history.push('/plans')}} >Yes</button>
										</div>

									</div>
								</div>
							</div>
						</div>
						</div>
					</CModalBody>
				</CModal>
					<CModal show={this.state.optionsValuesModel}  closeOnBackdrop={false}  onClose={()=> this.setState({optionsValuesModel:false})}
						color="danger" 
						centered>
						<CModalBody className="model-bg">

						<div>
							<div className="modal-body optionsValuesModel">
								
								<button type="button" className="close" onClick={()=> this.setState({optionsValuesModel:false})}>
									<span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
								</button>
								
									<div className="">
									{
										(this.state.typeOption === 'image') ? 
											<div className="model_data row questionimage">
											{
												(this.state.imageList.length > 0) ? 
												this.state.imageList.map((e, key) => {
													return <div class="col-lg-6 col-md-6 col-sm-6">
														<div class="cate-box2"  onClick={this.selectImage.bind(this,e)}  style={{ cursor:'pointer'}} >
															<img src={(e.image !== '') ? e.image : 'avatars/placeholder.png' } alt="Game" className="main"/>
															<div class="cat_title2">
																<p>{e.title}</p>
															</div>
														</div>
													</div>
												}) : 
												(
													<div style={{color:'white',width: '100%',textAlign:'center',marginTop:"50px",marginBottom:"50px"}} className="flex"><p className="item-author text-color">No data found</p></div>
												)
											}
											</div>
										
										: null
									}
																	
									
								</div>
							</div>
							</div>
						</CModalBody>
					</CModal>													
		        <TheFooter />
		    </>
		)
	}
}


export default RoundQuestion
