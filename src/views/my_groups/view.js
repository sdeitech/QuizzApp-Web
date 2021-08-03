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

class MyGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData:[],
            addModel:false,
            fields:{saveToTitle:''},
            errors:{}
        };
    }

    handleChange(field, e){  
        let fields = this.state.fields;
        fields['saveToTitle'] = e.target.value;
        this.setState({fields});


        let errors = {};
        if(field === 'saveToTitle' && fields["saveToTitle"].trim() === ''){
            errors["saveToTitle"] = "Please enter title";
        }

        this.setState({errors: errors});

    }

    componentDidMount(){
        var userId = JSON.parse(reactLocalStorage.get('userData')).userId;
        fetch(configuration.baseURL+"user/saveTo?userId="+userId, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
                }
            }).then((response) =>{
            return response.json();
        }).then((data)=> {
            if (data.data.saveTo) {
                this.setState({ listData:data.data.saveTo});    
            }
            
        }); 
    }

    saveGroupModel(){
        let fields = this.state.fields;
        let formIsValid = true;

        let errors = {};
        if(fields["saveToTitle"].trim() === ''){
            errors["saveToTitle"] = "Please enter title";
            formIsValid = false;
        }
        this.setState({errors: errors});

        if(formIsValid){

            var userId = JSON.parse(reactLocalStorage.get('userData')).userId;
            const data = new FormData();
            data.append('userId',userId);
            data.append('saveToTitle',fields['saveToTitle']);
            
            fetch(configuration.baseURL+"user/saveTo", {
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
                    this.componentDidMount();
                    fields['saveToTitle']='';
                    this.setState({fields:fields,addModel:false});
                }
                else
                {
                    return toast.error(data.message);
                }
                
            });

            
        }
    }

    addModel()
    {
        this.setState({'addModel':true,fields:{saveToTitle:''},errors:{saveToTitle:''}})
    }

    clickHandle(saveToId)
    {
        this.props.history.push('/contest?'+saveToId)
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
                                                    <h3>My Groups</h3>  
                                                </div> 
                                            </div>
                                            <div class="col-md-4">
                                                <div className="search">
                                                    <button className="blue_btn light_blue_btn" type="button" onClick={this.addModel.bind(this)} style={{float: 'right'}}>Add Group</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="contest-info" style={{marginBottom: '50px'}}>
                                    <div className="row groups-box" style={{paddingTop: '30px'}}>
                                        {

                                            (this.state.listData.length > 0) ? 
                                            this.state.listData.map((e, key) => {
                                                return <div className="col-lg-3 col-md-4 col-sm-6 groups-box-inner" onClick={this.clickHandle.bind(this,e.saveToId)}>                        
                                                        <div className="addfriend box_yellow">
                                                            <div className="inline">
                                                                <h5>{e.saveToTitle}</h5>
                                                            </div>
                                                            <div style={{float: 'right'}} className="inline arrow">
                                                                <img src="./murabbo/img/arrow-right_yellow.svg"/>
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
                        <CModal show={this.state.addModel}  closeOnBackdrop={false}  onClose={()=> this.setState({addModel:false})}
                    color="danger" 
                    centered>
                        <CModalBody className="model-bg">

                        <div>
                            <div className="modal-body">
                                
                                <button type="button" className="close" onClick={()=> this.setState({addModel:false})}>
                                    <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
                                </button>
                                <div className="model_data">
                                    <div className="model-title">
                                        <h3>Add Group</h3> 
                                    </div>

                                    <div className="cus_input input_wrap">
                                        <img src="./murabbo/img/title.svg" alt="Upload"/>
                                        <input type="text" required name="" onChange={this.handleChange.bind(this,'saveToTitle')} value={this.state.fields['saveToTitle']} />
                                        <label>Title</label>
                                    </div>
                                    <span className="error-msg">{this.state.errors["saveToTitle"]}</span>
                                    <div style={{textAlign:'center'}} className="col-md-12">
                                        <button style={{minWidth: '150px',marginRight:'10px'}}  className="blue_btn light_blue_btn" type="button"  onClick={this.saveGroupModel.bind(this)} >Add</button>
                                        <button style={{minWidth: '150px',marginRight:'10px'}} className="pink_btn" type="button"  onClick={() => this.setState({'addModel':false,fields:{saveToTitle:''},errors:{saveToTitle:''}})} >Cancel</button>
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

export default MyGroups
