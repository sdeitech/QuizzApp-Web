import React, { Component } from 'react';

class TheFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render (){
        return <footer id="footer">
            <div class="footer-top">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-sm-12 col-md-12">
                            <div class="first_col">
                                <div style={{color:'#fff'}} class="link">
                                    <a href="javascript:void(0);">Home</a>  
                                    <a href="javascript:void(0);">About Us</a> 
                                    <a href="javascript:void(0);">Privacy Policy</a> 
                                    <a href="javascript:void(0);">Terms & Conditions</a> 
                                </div>
                                <div class="copyright">
                                    Copyright ® 2020 Murabbo. All Rights Reserved.
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    }
}


export default TheFooter