import React, {Component} from 'react'
import {
    TheFooter,
    TheHeaderInner
} from '../../containers/index'
import 'react-toastify/dist/ReactToastify.css';

class Detail extends Component {
	constructor(props) {
        super(props);
        this.state = {
		};
	}

	render() {
		return (
			<>
				<TheHeaderInner />				
					<main id="main">
		            <section id="hero" className="d-flex align-items-center">
		                <div className="hero-img">
		                    <img src="./murabbo/img/candy.png" className="img-fluid animated" alt="" />
		                </div>
		            </section>
		            <section>
		                <div className="">
		                    <div className="startgame relative24">
		                        <div className="row">
		                            <div className="col-lg-10 col-md-8">
		                                <div className="inline">
		                                    <img src="./murabbo/img/quizz.svg" />
		                                </div>
		                                <div className="inline">
		                                    <h5>Abc Contest</h5>
		                                    <h6>Quizz</h6>
		                                </div>
		                                
		                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eros eros, vestibulum in odio nec, fermentum venenatis eros. Phasellus placerat sodales sollicitudin. Curabitur in ligula vitae odio blandit ullamcorper. Ut ac felis id sapien ornare feugiat. Fusce sollicitudin mi sit amet magna vulputate, ac mattis libero sodales. Quisque elementum dapibus</p> 
		                            </div>
		                            <div className="col-lg-2 col-md-4 align-self-center">
		                                <a href="/#/start-game"><button className="yellow_btn" type="button">Start Game</button></a>
		                            </div>
		                        </div>
		                    </div>
		                </div>
		            </section>
		        </main>
		    </>
		)
	}
}

export default Detail
