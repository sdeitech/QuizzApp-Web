import React, {Component} from 'react'
import {
    TheContent,
    //TheFooter,
    //TheHeader
} from './index'

class TheLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div className="c-wrapper">
                    {/*<TheHeader />*/}
                    <div className="c-body">
                        <TheContent />
                    </div>
                    {/*<TheFooter />*/}
                </div>
            </div>
        )
    }
}

export default TheLayout
