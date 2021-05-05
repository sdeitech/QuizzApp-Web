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

class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData:[]
        };
    }

    componentDidMount(){
        this.listData();
    }

    listData(){
        var userId = JSON.parse(reactLocalStorage.get('userData')).userId;
        const postdata = {user_id:userId,type:'list'};
        fetch(configuration.baseURL+"card/managecards", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
                },
                body:JSON.stringify(postdata)
            }).then((response) =>{
            return response.json();
        }).then((data)=> {
            if (data.data) {
                this.setState({ listData:data.data});    
            }
        }); 
    }

    add()
    {
        this.props.history.push('/add_card')  
    }

    clickHandle(card_id)
    {
        var userId = JSON.parse(reactLocalStorage.get('userData')).userId;
        const postdata = {user_id:userId,type:'set_default',card_id:card_id};
        fetch(configuration.baseURL+"card/managecards", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
                },
                body:JSON.stringify(postdata)
            }).then((response) =>{
            return response.json();
        }).then((data)=> {
            let displayArr = [];

            for (var i = 0; i < this.state.listData.length; i++) {
                var obj = {};
                obj.id = this.state.listData[i].id;
                obj.brand = this.state.listData[i].brand;
                obj.exp_month = this.state.listData[i].exp_month;
                obj.exp_year = this.state.listData[i].exp_year;
                obj.last4 = this.state.listData[i].last4;
                obj.name = this.state.listData[i].name;
                obj.is_default = (card_id === this.state.listData[i].id) ? true : false;
                displayArr.push(obj);
            }    
            this.setState({listData:displayArr});         
        });
    }

    deleteClickHandle(card_id)
    {
        var userId = JSON.parse(reactLocalStorage.get('userData')).userId;
        const postdata = {user_id:userId,type:'remove',card_id:card_id};
        fetch(configuration.baseURL+"card/managecards", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
                },
                body:JSON.stringify(postdata)
            }).then((response) =>{
            return response.json();
        }).then((data)=> {
            
            let displayArr = [];

            for (var i = 0; i < this.state.listData.length; i++) {
                if(card_id !== this.state.listData[i].id)
                {   
                    var obj = {};
                    obj.id = this.state.listData[i].id;
                    obj.brand = this.state.listData[i].brand;
                    obj.exp_month = this.state.listData[i].exp_month;
                    obj.exp_year = this.state.listData[i].exp_year;
                    obj.last4 = this.state.listData[i].last4;
                    obj.name = this.state.listData[i].name;
                    obj.is_default = this.state.listData[i].is_default;
                    displayArr.push(obj);
                }
            }   
            if(displayArr.length > 0)
            {
                displayArr[displayArr.length - 1].is_default = true;
            } 
            console.log(displayArr);
            this.setState({listData:displayArr});         
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
                                            <div class="col-md-8">
                                                <div class="main_title">
                                                    <h3>Manage cards</h3>  
                                                </div> 
                                            </div>
                                            <div class="col-md-4">
                                                <div className="search">
                                                    <button className="yellow_btn" type="button" onClick={this.add.bind(this)} style={{float: 'right'}}>Add Card</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="contest-info" style={{marginBottom: '50px'}}>
                                    <div class="col-lg-12 col-sm-12">
                                        <div class="upcoming">
                                            <div style={{marginBottom: '0'}} class="row main">
                                                
                                                <div class="col-md-12" style={{paddingTop: '20px'}}>
                                                    
                                                    <ul class="clearfix ">
                                                        {

                                                        (this.state.listData.length > 0) ? 
                                                        this.state.listData.map((e, key) => {
                                                            return <li class="payment_select edit-delivery-address">
                                                                    <label class="container_radio">**** **** **** { e.last4 }
                                                                        <input type="radio" value="" name="payment_method" onClick={this.clickHandle.bind(this,e.id)} checked={e.is_default===true? 'checked' : ''} />
                                                                        <span class="checkmark"></span>
                                                                    </label>
                                                                    <span aria-hidden="true"><img src="./murabbo/img/close_black.svg" className="delete_img" onClick={this.deleteClickHandle.bind(this,e.id)} /></span>    
                                                                    <img src={'./murabbo/img/'+(e.brand.toLowerCase()).replace(/\s/g, '-')+'.png'} class="icon_visa" />
                                                                </li>
                                                        }) : 
                                                        <li class="payment_select edit-delivery-address">
                                                            <label>No data found</label>
                                                        </li>
                                                        }  
                                                        
                                                    </ul>
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

export default View
