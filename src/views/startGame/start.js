import React, {Component} from 'react'
import {
    TheFooter,
    TheHeaderInner
} from '../../containers/index'
import 'react-toastify/dist/ReactToastify.css';

class StartGame extends Component {
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
			            <section id="hero" className="d-flex align-items-center width75">
			                <div className="quizz-game">
			                    <h3>Abc Contest</h3>
			                    <p>Quizz</p>
			                    <div className="quizz-quas">
			                        <h4>Question 1/10</h4>

			                        <div className="step_progress blue_"></div>
			                        <div className="step_progress yellow_"></div>
			                        <div className="step_progress"></div>
			                        <div className="step_progress"></div>
			                        <div className="step_progress"></div>
			                        <div className="step_progress"></div>
			                        <div className="step_progress"></div>
			                        <div className="step_progress"></div>
			                        <div className="step_progress"></div>
			                        <div className="step_progress"></div>
			                        
			                        <div id="app"></div>
			                    </div>   

			                    <div className="qus">
			                        <h3>What is the Fastest animal in the world?</h3>

			                        <div className="answer-option">
			                            <p className="fancy2">
			                                <label >
			                                    <b className="option_">A</b>
			                                    <input id="Cookies" name="yaybox" type="radio" value="Cookies" />
			                                    <span for="Cookies">Turtle</span>
			                                </label>
			                            </p>
			                            <p className="fancy2">
			                                <label >
			                                    <b className="option_">B</b>
			                                    <input id="Cookies" name="yaybox" type="radio" value="Cookies" />
			                                    <span for="Cookies">Cheetah</span>
			                                </label>
			                            </p>
			                            <p className="fancy2">
			                                <label >
			                                    <b className="option_">C</b>
			                                    <input id="Cookies" name="yaybox" type="radio" value="Cookies" />
			                                    <span for="Cookies">Rabit</span>
			                                </label>
			                            </p>
			                            <p className="fancy2">
			                                <label >
			                                    <b className="option_">D</b>
			                                    <input id="Cookies" name="yaybox" type="radio" value="Cookies" />
			                                    <span for="Cookies">Leapard</span>
			                                </label>
			                            </p>
			                            <p className="fancy2">
			                                <label >
			                                    <b className="option_">E</b>
			                                    <input id="Cookies" name="yaybox" type="radio" value="Cookies" />
			                                    <span for="Cookies">Tiger</span>
			                                </label>
			                            </p>
			                            <p className="fancy2">
			                                <label >
			                                    <b className="option_">F</b>
			                                    <input id="Cookies" name="yaybox" type="radio" value="Cookies" />
			                                    <span for="Cookies">"Rattle Snake</span>
			                                </label>
			                            </p>

			                        </div>
			                    </div>
			                </div>
			            </section>
			            
			            
			            <div className="sidenav width100">
			              <div className="participate">
			                    <h3>Participants (06)</h3>
			                    <div className="search2">
			                        <input placeholder="Search By keywords" type="text"/><i className="bx bx-search"></i>
			                    </div>
			                    <div className="participate-list">
			                        <div className="inline">
			                            <img src="./murabbo/img/team-1.jpg" />
			                        </div>
			                        <div className="inline">
			                            <h5>Jessica Singh</h5>
			                            <h6>jess123.sin</h6>
			                        </div>
			                        <div className="inline part_ico">
			                            <img src="./murabbo/img/mic1.png" />
			                            <img src="./murabbo/img/video1.png"/>
			                        </div>
			                    </div>
			                    <div className="participate-list">
			                        <div className="inline">
			                            <img src="./murabbo/img/team-2.jpg"/>
			                        </div>
			                        <div className="inline">
			                            <h5>Alina Joy</h5>
			                            <h6>joy.alina</h6>
			                        </div>
			                        <div className="inline part_ico">
			                            <img src="./murabbo/img/mic2.png"/>
			                            <img src="./murabbo/img/video2.png"/>
			                        </div>
			                    </div>
			                    <div className="participate-list">
			                        <div className="inline">
			                            <img src="./murabbo/img/team-3.jpg"/>
			                        </div>
			                        <div className="inline">
			                            <h5>Zen Lee Ho</h5>
			                            <h6>zenlee.ho</h6>
			                        </div>
			                        <div className="inline part_ico">
			                            <img src="./murabbo/img/mic1.png"/>
			                            <img src="./murabbo/img/video1.png"/>
			                        </div>
			                    </div>
			                    <div className="participate-list">
			                        <div className="inline">
			                            <img src="./murabbo/img/team-1.jpg"/>
			                        </div>
			                        <div className="inline">
			                            <h5>Angelo Grasso</h5>
			                            <h6>grasso.124</h6>
			                        </div>
			                        <div className="inline part_ico">
			                            <img src="./murabbo/img/mic1.png"/>
			                            <img src="./murabbo/img/video1.png"/>
			                        </div>
			                    </div>
			                    <div className="participate-list">
			                        <div className="inline">
			                            <img src="./murabbo/img/team-2.jpg"/>
			                        </div>
			                        <div className="inline">
			                            <h5>Mark Andrew</h5>
			                            <h6>andrew123</h6>
			                        </div>
			                        <div className="inline part_ico">
			                            <img src="./murabbo/img/mic1.png"/>
			                            <img src="./murabbo/img/video1.png"/>
			                        </div>
			                    </div>
			                    <div className="participate-list">
			                        <div className="inline">
			                            <div className="noprofile">D</div>
			                        </div>
			                        <div className="inline">
			                            <h5>Debsani Barari</h5>
			                            <h6>barari.debsani</h6>
			                        </div>
			                        <div className="inline part_ico">
			                            <img src="./murabbo/img/mic1.png"/>
			                            <img src="./murabbo/img/video1.png"/>
			                        </div>
			                    </div>

			              </div>
			            </div>
			        </main>
		    </>
		)
	}
}

export default StartGame
