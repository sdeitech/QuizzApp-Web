import React, {Component} from 'react'
import {
    TheFooter,
    TheHeaderInner
} from '../../containers/index'
import configuration from '../../config';
import 'react-toastify/dist/ReactToastify.css';
import {reactLocalStorage} from 'reactjs-localstorage';
import $ from 'jquery';
import {
    CModal,
    CModalBody,
  } from '@coreui/react';
  import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import languages from '../../languages';

class AddContest extends Component {
	constructor(props) {
        super(props);
        this.state = {
			categoryList: [],
			categoryListObj:[],
			categoryListObjSelected:[],
			brandList: [],
			brandListObj:[],
			brandListObjSelected:[],
			fields:{},
			errors:{},
			openModel:false,
			items: [],
			focused: false,
			input: '',
			openModelCategory:false,
			openModelBrand:false,
            image:'avatars/placeholder-user.png',
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
		this.handleRemoveItem = this.handleRemoveItem.bind(this);
	}


	componentDidMount(){

        $('.display-profile-pic').hide();
		let fields = this.state.fields;
		fields.language = 'English';
		this.setState({fields})


		fetch(configuration.baseURL+"category/categoryList", {
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

	handleChangeCategory(catdata,maindata, e){   
		let categoryListObj = this.state.categoryListObj;
		let categoryListObjSelected = this.state.categoryListObjSelected;
		if (e.target.checked) {
	        categoryListObj.push({'categoryId':catdata._id,'mainLabelId':maindata.id});
	        categoryListObjSelected.push({'categoryId':catdata._id,'name':catdata.name});
		}
		else
		{
			categoryListObj = categoryListObj.filter(function(value, index, arr){ 
				if(value.categoryId !== catdata._id)
				{
					return value;
				}
			});

			categoryListObjSelected = categoryListObjSelected.filter(function(value, index, arr){ 
				if(value.categoryId !== catdata._id)
				{
					return value;
				}
			});
		}
		this.setState({categoryListObj:categoryListObj,categoryListObjSelected:categoryListObjSelected});
		
		console.log({categoryListObj:categoryListObj,categoryListObjSelected:categoryListObjSelected});
		let fields = this.state.fields;
		fields.categoryIds=JSON.stringify(categoryListObj);
		this.setState({fields})
	
    }

    handleChangeBrand(maindata, e){   
		let brandListObj = this.state.brandListObj;
		let brandListObjSelected = this.state.brandListObjSelected;
		if (e.target.checked) {
	        brandListObj.push(maindata._id);
	        brandListObjSelected.push({id:maindata._id,name:maindata.name});
		}
		else
		{
			brandListObj = brandListObj.filter(function(value, index, arr){ 
				if(value !== maindata._id)
				{
					return value;
				}
			});

			brandListObjSelected = brandListObjSelected.filter(function(value, index, arr){ 
				if(value.id !== maindata._id)
				{
					return value;
				}
			});
		}
		this.setState({brandListObj:brandListObj,brandListObjSelected:brandListObjSelected});
		let fields = this.state.fields;
		fields.brandIds=brandListObj.join()
		this.setState({fields})
    }

    handleRemoveCategory(data,e){
    	let categoryListObj = this.state.categoryListObj;
		let categoryListObjSelected = this.state.categoryListObjSelected;

    	categoryListObj = categoryListObj.filter(function(value, index, arr){ 
			if(value.categoryId !== data.categoryId)
			{
				return value;
			}
			else
			{
				$('#'+data.categoryId).prop('checked', false);
			}
		});

		categoryListObjSelected = categoryListObjSelected.filter(function(value, index, arr){ 
			if(value.categoryId !== data.categoryId)
			{
				return value;
			}
		});

    	this.setState({categoryListObj:categoryListObj,categoryListObjSelected:categoryListObjSelected});
		

		let fields = this.state.fields;
		fields.categoryIds=JSON.stringify(categoryListObj);
		this.setState({fields})
    }


    handleRemoveBrand(data,e){
    	let brandListObj = this.state.brandListObj;
		let brandListObjSelected = this.state.brandListObjSelected;
		brandListObj = brandListObj.filter(function(value, index, arr){ 
			if(value !== data.id)
			{
				return value;
			}
			else
			{
				$('#'+data.id).prop('checked', false);
			}
		});

		brandListObjSelected = brandListObjSelected.filter(function(value, index, arr){ 
			if(value.id !== data.id)
			{
				return value;
			}
		});
		this.setState({brandListObj:brandListObj,brandListObjSelected:brandListObjSelected});
		let fields = this.state.fields;
		fields.brandIds=brandListObj.join()
		this.setState({fields})
    }


	handleChange(field, e){   
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }

	
	handleSubmit(){
		let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        
		fields.hashtag= this.state.items.join();
		this.setState({fields})

		var categoryArr = (fields['categoryIds']) ? JSON.parse(fields['categoryIds']) : [];


        if(!fields["title"]){
            formIsValid = false;
            errors["title"] = "Please enter title";
        }

        if(!fields["description"]){
            formIsValid = false;
            errors["description"] = "Please enter description";
        }


        if(!fields["hashtag"]){
            formIsValid = false;
            errors["hashtag"] = "Please enter hashtag";
        }


        if(!fields["visibility"]){
            formIsValid = false;
            errors["visibility"] = "Please select visibility";
        }

        if(!fields["playerType"]){
            formIsValid = false;
            errors["playerType"] = "Please select player type";
        }

        if(!fields["saveToId"]){
            formIsValid = false;
            errors["saveToId"] = "Please enter save to";
        }


        if(typeof categoryArr === 'undefined' || categoryArr.length === 0){
            formIsValid = false;
            errors["categoryIds"] = "Please select atleast one category";
        }

		if(!fields["brandIds"]){
            formIsValid = false;
            errors["brandIds"] = "Please select atleast one brand";
        }
      	
      	if(!fields["image"]){
            formIsValid = false;
            errors["image"] = "Please select image";
        }


        this.setState({errors: errors});
        if(formIsValid){
        	// console.log(JSON.parse(reactLocalStorage.get('userData')).userId);
        	const data = new FormData();
        	data.append('title',this.state.fields.title);
        	data.append('description',this.state.fields.description);
        	data.append('hashtag',this.state.fields.hashtag);
        	data.append('language',this.state.fields.language);
        	data.append('visibility',this.state.fields.visibility);
        	data.append('createdBy',JSON.parse(reactLocalStorage.get('userData')).userId);
        	data.append('playerType',this.state.fields.playerType);
        	data.append('saveToId',this.state.fields.saveToId);
        	data.append('categoryIds',this.state.fields.categoryIds);
        	data.append('brandIds',this.state.fields.brandIds);
            if(this.state.fields.image === 'image'){
            	console.log(this.uploadInput.files)
                data.append('image', this.uploadInput.files[0]);
            } 
            // console.log(data);
            fetch(configuration.baseURL+"contest/contest", {
                method: "post",
                headers: {
					'contentType': "application/json",
                    'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
                },
                body:data
            }).then((response) => {
                return response.json();
            }).then((data) => {
            	// console.log(data);
                if(data.code === 200){
                	window.location.href = '/#/tray'
                }
                else
                {
                    return toast.error(data.message);
                }
                
            });
        }
	};


	handleInputChange(evt) {
		this.setState({ input: evt.target.value });
	}

	handleInputKeyDown(evt) {
		if ( evt.keyCode === 13 ) {
		  const {value} = evt.target;
		  
		  this.setState(state => ({
			items: [...state.items, value],
			input: ''
		  }));
	}

	if ( this.state.items.length && evt.keyCode === 8 && !this.state.input.length ) {
	  this.setState(state => ({
			items: state.items.slice(0, state.items.length - 1)
		  }));
		}

	}

	handleRemoveItem(index) {
		return () => {
		  this.setState(state => ({
			items: state.items.filter((item, i) => i !== index)
		  }));
		  	
		}
	}

	handleUploadProfile(type, ev) {
        let fields = this.state.fields;
        fields['image'] = 'image';
        this.setState({fields});
        // console.log(this.uploadInput.files)
    }

	render() {
		$(document).ready(function() {
            var readURL = function(input) {
				if (input.files && input.files[0]) {
					var reader = new FileReader();
					reader.onload = function (e) {
						// console.log(e.target.result);
						$('.display-profile-pic').attr('src', e.target.result);
						$('.display-profile-pic').show();
						$('#start').hide();
					}
					reader.readAsDataURL(input.files[0]);
				}
            }
            $(".file-upload").on('change', function(){
            	readURL(this);
            });
            $(".upload-button").on('click', function() {
            	$(".file-upload").click();
            });
        });
		return (
			<>
				<TheHeaderInner />				
					<main id="main">
					<ToastContainer position="top-right" autoClose={5000} style={{top:'80px'}}/>
					<CModal size="lg" show={this.state.openModelCategory} onClose={() => this.setState({openModelCategory:!this.state.openModelCategory})} color="danger"  centered>
                    	<CModalBody className="model-bg">

	                    <div>
	                        <div className="modal-body">
	                            <button type="button" className="close"  onClick={()=> this.setState({openModelCategory:false})}>
	                            <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
	                        </button>
	                            <div className="model_data">
	                                <div className="model-title">
		                                <h3>Choose Category</h3>
	                                </div>
	                                <div className="contest">

					                    {

					                    	this.state.categoryList.map((e, key) => {
														
													return  <div className="row">
							                            <div className="col-8">
							                                <div className="cate-title">
							                                    <p>{e.title}</p>
							                                </div>
							                            </div>
							                            <div className="col-4">
							                                {/*<div className="seeall">
							                                    <p>See All</p>
							                                </div>*/}
							                            </div>

							                            { e.categories.map((cat, ckey) => {
							                            return <div className="col-lg-4 col-md-4 col-sm-6 checkbox-buttons-container">
									                        <input type="checkbox" id={cat._id} onChange={this.handleChangeCategory.bind(this,cat,e)} />
									                        <label for={cat._id}>
									                            <div style={{ marginBottom: '0' }} className="cate-box">
									                                <img src={cat.image} />
									                                <div className="cat_title">
									                                    <h3>{cat.name}</h3>
									                                </div>
									                            </div>
									                        </label>
									                    </div>
							                            })
							                        }
							                        </div>
					                        	})
					                    }
					                    <div style={{ textAlign: 'center' }} class="">
						                    <button class="blue_btn" type="button"  onClick={() => this.setState({openModelCategory:false}) } >Done</button>
						                </div>
							        </div>
	                            </div>
	                        </div>
	                        </div>
	                    </CModalBody>
	                </CModal>

	                <CModal size="lg" show={this.state.openModelBrand} onClose={() => this.setState({openModelBrand:!this.state.openModelBrand})} color="danger"  centered>
                    	<CModalBody className="model-bg">

	                    <div>
	                        <div className="modal-body">
	                            <button type="button" className="close"  onClick={()=> this.setState({openModelBrand:false})}>
	                            <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
	                        </button>
	                            <div className="model_data">
	                                <div className="model-title">
		                                <h3>Choose Brand</h3>
	                                </div>
	                                <div className="contest">
	                                	<div className="row">
					                    {

					                    	this.state.brandList.map((brand, key) => {
							                            return <div className="col-4 checkbox-buttons-container">
									                        <input type="checkbox" id={brand._id} onChange={this.handleChangeBrand.bind(this,brand)} />
									                        <label for={brand._id}>
									                            <div style={{ marginBottom: '0' }} className="cate-box">
									                                <img src={brand.image} />
									                                <div className="cat_title">
									                                    <h3>{brand.name}</h3>
									                                </div>
									                            </div>
									                        </label>
									                    </div>
									                })
					                    }
							        	</div>

					                    <div style={{ textAlign: 'center' }} class="">
						                    <button class="blue_btn" type="button"   onClick={() => this.setState({openModelBrand:false}) } >Done</button>
						                </div>
							        </div>
	                            </div>
	                        </div>
	                        </div>
	                    </CModalBody>
	                </CModal>
					
			            <section id="contest" className="d-flex align-items-center">
			                <div className="container">
			                    <div className="create-contest">
			                        <div className="contest-title">
			                            <div className="row">
			                                <div className="col-md-4">
			                                    <div className="main_title">
			                                        <h3>Create Contest</h3>  
			                                    </div> 
			                                </div>
			                                {/*<div className="col-md-8">
			                                    <ul className="title-link">
			                                        <a href="redirect"><li><img src="./murabbo/img/close2.svg" alt="Murabbo" /> Remove</li></a>
			                                        <a href="redirect"><li><img style={{width: '17px'}} src="./murabbo/img/send.svg" alt="Murabbo" /> Publish</li></a>
			                                        <a href="redirect"><li><img src="./murabbo/img/edit.svg" alt="Murabbo" /> Edit</li></a>
			                                    </ul>  
			                                </div>*/}
			                            </div>
			                        </div>
			                    </div>
			                    <div className="contest-info">
			                        <div className="row">
			                            <div className="col-md-8 offset-md-2">
			                                <div className="progressbar">
			                                    <div className="inner-progress">
			                                        <p>Contest Info</p>
			                                    </div>
			                                </div>
			                            </div>
			                            <div className="col-lg-4 col-md-6 col-sm-12">
			                                <div className="profile-img">
			                                    <form id="file-upload-form" className="uploader">
			                                      <input id="file-upload" type="file" name="fileUpload" className="file-upload" accept="image/*" onChange={this.handleUploadProfile.bind(this,'image')} ref={(ref) => { this.uploadInput = ref; }}  />

			                                      <label for="file-upload" id="file-drag">
			                                        <img id="file-image"   src="#" alt="Preview" className="hidden"/>
			                                        <img className="display-profile-pic" src='' alt=""  />
			                                        <div id="start">
													  <img className="profile-pic" src='./murabbo/img/upload.svg' alt=""  />
			                                          <div id="notimage">Please select an image</div>
			                                          <div id="add_image">Add Image</div>
			                                        </div>
			                                        <div id="response" className="hidden">
			                                          <div id="messages"></div>
			                                          
			                                        </div>
			                                      </label>
			                                    </form>
			                                </div>
			                                <span style={{top:'0'}} className="error-msg">{this.state.errors["image"]}</span>
			                            </div>
			                            <div className="col-lg-4 col-md-6 col-sm-12">
										
											<div className="cus_input input_wrap">
												<img src="./murabbo/img/title.svg" /> 
												<input required type="text"  onChange={this.handleChange.bind(this, "title")} value={this.state.fields["title"]}/>
												<label>Title</label>
											</div> 
											<span className="error-msg">{this.state.errors["title"]}</span>

			                                <div className="cus_input input_wrap">
			                                    <img src="./murabbo/img/des.svg" alt="Murabbo"/> <input required type="text"  onChange={this.handleChange.bind(this, "description")} value={this.state.fields["description"]}/>
			                                    <label>Description</label>
			                                </div>
											<span className="error-msg">{this.state.errors["description"]}</span>

			                                <div className="cus_input input_wrap">
												<img src="./murabbo/img/hashtag.svg" alt="Murabbo"/>
												<input type="text" required value={this.state.input} onChange={this.handleInputChange} onKeyDown={this.handleInputKeyDown}  />
												<label>Hashtag</label>
			                                </div>
											<div className="add-category">
												{this.state.items.map((item, i) => 

													<div className="category" style={{ 
														marginRight: '5px'
													}}>
														<p>{item} <img src="./murabbo/img/closewhite.svg" onClick={this.handleRemoveItem(i)} alt="Murabbo"/></p>
													</div>
												)}
											</div>
											<span className="error-msg">{this.state.errors["hashtag"]}</span>
			                                <div className="cus_input input_wrap floating-label" >
			                                    <img src="./murabbo/img/global.svg" alt="Murabbo"/> 
			                                    
												<select className="floating-select" onChange={this.handleChange.bind(this,'language')} value={this.state.fields.language} required>
							                      	{
		                                                languages.languages.map((e, key) => {
		                                                    return <option value={e.name}>{e.name} </option>;
		                                                })
		                                            }
			                                    </select>
			                                    <span className="highlight"></span>
			                                    <label>Language</label>
			                                </div>
			                                <span className="error-msg">{this.state.errors["language"]}</span>
			                            </div>
			                            <div className="col-lg-4 col-md-6 col-sm-12">
			                                <div className="cus_input input_wrap">
			                                    <img src="./murabbo/img/saveto.svg" alt="Murabbo"/> <input type="text" required onChange={this.handleChange.bind(this, "saveToId")} value={this.state.fields["saveToId"]}/>
			                                    <label>Save To</label>
			                                </div>
											<span className="error-msg">{this.state.errors["saveToId"]}</span>

											<div style={{margin: '0px 0 5px 0'}} className="cus_input ">
			                                    <img src="./murabbo/img/enable.svg" alt="Murabbo"/> <label className="cus_label">Player Type</label>
			                                </div>
			                                <label className="control control--radio">Single
												<input type="radio" name="radio1" value="1"  onChange={this.handleChange.bind(this, "playerType")} checked={(this.state.fields.playerType === '1' ? 'checked' : '')}/>
			                                  <div className="control__indicator"></div>
			                                </label>
			                                <label className="control control--radio">Multiplayer
			                                  <input type="radio" name="radio1" value="2"  onChange={this.handleChange.bind(this, "playerType")} checked={(this.state.fields.playerType === '2' ? 'checked' : '')}/>
			                                  <div className="control__indicator"></div>
			                                </label>
			                                <label>
											<span className="error-msg">{this.state.errors["playerType"]}</span>
											</label>

			                                <div style={{margin: '0px 0 5px 0'}} className="cus_input ">
			                                    <img src="./murabbo/img/enable.svg" alt="Murabbo"/> <label className="cus_label">Visibility</label>
			                                </div>
			                                <label className="control control--radio">All
												<input type="radio" name="radio" value="2"  onChange={this.handleChange.bind(this, "visibility")} checked={(this.state.fields.visibility === '2' ? 'checked' : '')}/>
			                                  <div className="control__indicator"></div>
			                                </label>
			                                <label className="control control--radio">Only Me
			                                  <input type="radio" name="radio" value="1"  onChange={this.handleChange.bind(this, "visibility")} checked={(this.state.fields.visibility === '1' ? 'checked' : '')}/>
			                                  <div className="control__indicator"></div>
			                                </label>
			                                <label>
											<span className="error-msg">{this.state.errors["visibility"]}</span>
											</label>
			                                <div className="add-category">
			                                    <label>Choose Category <img src="./murabbo/img/add.svg" alt="Murabbo" onClick={()=> this.setState({openModelCategory:true})} /></label><br />

			                                    { this.state.categoryListObjSelected.map((e, key) => {
				                                		return <div className="category" style={{ 
														marginRight: '5px'
													}}>
					                                        <p>{e.name}<img src="./murabbo/img/closewhite.svg" alt="Murabbo" onClick={this.handleRemoveCategory.bind(this,e)}/></p>
					                                    </div>
				                                    })
				                                }
			                                    	
			                                </div>
			                                <span style={{top:'0'}} className="error-msg">{this.state.errors["categoryIds"]}</span>
			                                <div className="add-category">
			                                    <label>Choose Brand <img src="./murabbo/img/add.svg" alt="Murabbo" onClick={()=> this.setState({openModelBrand:true})} /></label><br />

			                                    { this.state.brandListObjSelected.map((e, key) => {
				                                		return <div className="category" style={{ 
														marginRight: '5px'
													}}>
					                                        <p>{e.name}<img src="./murabbo/img/closewhite.svg" alt="Murabbo" onClick={this.handleRemoveBrand.bind(this,e)}/></p>
					                                    </div>
				                                    })
				                                }
			                                </div>
			                                <span style={{top:'0'}} className="error-msg">{this.state.errors["brandIds"]}</span>
			                            </div>
			                        </div>
			                    </div>
			                    <div className="contest-info">
			                        <div className="contest-title">
			                            <div className="row">
			                                <div className="col-md-12">
			                                    <div className="footer-btn">
			                                        <button className="blue_btn" type="button" onClick={this.handleSubmit.bind(this)}>Save & Next</button>
			                                    </div> 
			                                </div>
			                            </div>
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

export default AddContest
