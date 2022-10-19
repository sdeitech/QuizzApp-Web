import React, { Component } from "react";
import { TheFooter, TheHeaderInner } from "../../containers/index";
import "react-toastify/dist/ReactToastify.css";

class Invite extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <TheHeaderInner />
                <main id="main">
                    <section id="hero" className="d-flex align-items-center">
                        <div className="hero-img">
                            <img
                                src="./murabbo/img/candy.png"
                                className="img-fluid animated"
                                alt=""
                            />
                        </div>
                    </section>

                    <section className="main">
                        <div className="">
                            <div className="startgame pr-300">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <div className="inline">
                                            <img
                                                alt=""
                                                src="./murabbo/img/quizz.svg"
                                            />
                                        </div>
                                        <div className="inline">
                                            <h5>Abc Contest</h5>
                                            <h6>Quizz</h6>
                                        </div>
                                        <div className="right-side">
                                            <div className="abc-detail">
                                                <p>Current Round</p>
                                                <h3>1</h3>
                                            </div>
                                            <div
                                                className="abc-detail"
                                                onClick={() => {
                                                    this.props.history.push(
                                                        "/play-game"
                                                    );
                                                }}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <p>Round Start In</p>
                                                <h3>
                                                    2:35 <span>min</span>
                                                </h3>
                                            </div>
                                        </div>
                                        <p>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit. Quisque
                                            eros eros, vestibulum in odio nec,
                                            fermentum venenatis eros. Phasellus
                                            placerat sodales sollicitudin.
                                            Curabitur in ligula vitae odio
                                            blandit ullamcorper. Ut ac felis id
                                            sapien ornare feugiat. Fusce
                                            sollicitudin mi sit amet magna
                                            vulputate, ac mattis libero sodales.
                                            Quisque elementum dapibus
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="sidenav width100">
                        <div className="participate">
                            <h3>Participants (06)</h3>
                            <div className="search2">
                                <input
                                    placeholder="Search By keywords"
                                    type="text"
                                />
                                <i className="bx bx-search"></i>
                            </div>
                            <div className="participate-list">
                                <div className="inline">
                                    <img
                                        alt=""
                                        src="./murabbo/img/team-1.jpg"
                                    />
                                </div>
                                <div className="inline">
                                    <h5>Jessica Singh</h5>
                                    <h6>jess123.sin</h6>
                                </div>
                                <div className="inline part_ico">
                                    <img alt="" src="./murabbo/img/mic1.png" />
                                    <img
                                        alt=""
                                        src="./murabbo/img/video1.png"
                                    />
                                </div>
                            </div>
                            <div className="participate-list">
                                <div className="inline">
                                    <img
                                        alt=""
                                        src="./murabbo/img/team-2.jpg"
                                    />
                                </div>
                                <div className="inline">
                                    <h5>Alina Joy</h5>
                                    <h6>joy.alina</h6>
                                </div>
                                <div className="inline part_ico">
                                    <img alt="" src="./murabbo/img/mic2.png" />
                                    <img
                                        alt=""
                                        src="./murabbo/img/video2.png"
                                    />
                                </div>
                            </div>
                            <div className="participate-list">
                                <div className="inline">
                                    <img
                                        alt=""
                                        src="./murabbo/img/team-3.jpg"
                                    />
                                </div>
                                <div className="inline">
                                    <h5>Zen Lee Ho</h5>
                                    <h6>zenlee.ho</h6>
                                </div>
                                <div className="inline part_ico">
                                    <img alt="" src="./murabbo/img/mic1.png" />
                                    <img
                                        alt=""
                                        src="./murabbo/img/video1.png"
                                    />
                                </div>
                            </div>
                            <div className="participate-list">
                                <div className="inline">
                                    <img
                                        alt=""
                                        src="./murabbo/img/team-1.jpg"
                                    />
                                </div>
                                <div className="inline">
                                    <h5>Angelo Grasso</h5>
                                    <h6>grasso.124</h6>
                                </div>
                                <div className="inline part_ico">
                                    <img alt="" src="./murabbo/img/mic1.png" />
                                    <img
                                        alt=""
                                        src="./murabbo/img/video1.png"
                                    />
                                </div>
                            </div>
                            <div className="participate-list">
                                <div className="inline">
                                    <img
                                        alt=""
                                        src="./murabbo/img/team-2.jpg"
                                    />
                                </div>
                                <div className="inline">
                                    <h5>Mark Andrew</h5>
                                    <h6>andrew123</h6>
                                </div>
                                <div className="inline part_ico">
                                    <img alt="" src="./murabbo/img/mic1.png" />
                                    <img
                                        alt=""
                                        src="./murabbo/img/video1.png"
                                    />
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
                                    <img alt="" src="./murabbo/img/mic1.png" />
                                    <img
                                        alt=""
                                        src="./murabbo/img/video1.png"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        );
    }
}

export default Invite;
