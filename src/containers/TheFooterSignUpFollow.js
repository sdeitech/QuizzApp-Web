import React from 'react'

const TheFooterSignUpFollow = () => {
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="footer_link">
                    <div className="link">
                        <span  onClick={()=> window.location.href = '/#/privacy-policy'} style={ { cursor:'pointer'}} >Privacy</span> | <span  onClick={()=> window.location.href = '/#/terms-condition'} style={ { cursor:'pointer'}}>Terms</span>
                    </div>
                    <p>Copyright 2020. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}

export default React.memo(TheFooterSignUpFollow)
