import React, { Component } from "react";
import { TheFooter, TheHeaderInner } from "../../containers/index";
import "react-toastify/dist/ReactToastify.css";

class FAQ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: {},
            openModel: false,
        };
    }

    render() {
        return (
            <>
                <TheHeaderInner />
                <main id="main">
                    <section id="contest" class="d-flex align-items-center">
                        <div class="container">
                            <div class="create-contest">
                                <div class="contest-title">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="main_title">
                                                <h3>All Round</h3>
                                            </div>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="filterinline">
                                                <div class="lanfilter">
                                                    Language:
                                                    <select>
                                                        <option>English</option>
                                                        <option>Arabic</option>
                                                    </select>
                                                </div>
                                                <div class="lanfilter">
                                                    Game Type:
                                                    <select>
                                                        <option>All</option>
                                                        <option>All 2</option>
                                                    </select>
                                                </div>
                                                <div class="lanfilter">
                                                    Category:
                                                    <select>
                                                        <option>All</option>
                                                        <option>All 2</option>
                                                    </select>
                                                </div>
                                                <div class="lanfilter">
                                                    Trending:
                                                    <select>
                                                        <option>All</option>
                                                        <option>All 2</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{ paddingBottom: "30px" }}
                                class="contest-info"
                            >
                                <div class="row">
                                    <div class="col-lg-4 col-md-4 col-sm-6">
                                        <a href="#/add_round">
                                            <div class="cate-box3">
                                                <img
                                                    src="./murabbo/img/user-white.svg"
                                                    alt="Game"
                                                />
                                                <div class="cat_title3">
                                                    <h3>
                                                        25 Questions{" "}
                                                        <span>Michael</span>
                                                    </h3>
                                                    <p>Candy Crush Saga</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-6">
                                        <div class="cate-box3 pink-fill">
                                            <img
                                                src="./murabbo/img/user-white.svg"
                                                alt="Game"
                                            />
                                            <div class="cat_title3">
                                                <h3>
                                                    25 Questions{" "}
                                                    <span>Michael</span>
                                                </h3>
                                                <p>Candy Crush Saga</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-6">
                                        <div class="cate-box3">
                                            <img
                                                src="./murabbo/img/user-white.svg"
                                                alt="Game"
                                            />
                                            <div class="cat_title3">
                                                <h3>
                                                    25 Questions{" "}
                                                    <span>Michael</span>
                                                </h3>
                                                <p>Candy Crush Saga</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-6">
                                        <div class="cate-box3 pink-fill">
                                            <img
                                                src="./murabbo/img/user-white.svg"
                                                alt="Game"
                                            />
                                            <div class="cat_title3">
                                                <h3>
                                                    25 Questions{" "}
                                                    <span>Michael</span>
                                                </h3>
                                                <p>Candy Crush Saga</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-6">
                                        <div class="cate-box3">
                                            <img
                                                src="./murabbo/img/user-white.svg"
                                                alt="Game"
                                            />
                                            <div class="cat_title3">
                                                <h3>
                                                    25 Questions{" "}
                                                    <span>Michael</span>
                                                </h3>
                                                <p>Candy Crush Saga</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-6">
                                        <div class="cate-box3 pink-fill">
                                            <img
                                                src="./murabbo/img/user-white.svg"
                                                alt="Game"
                                            />
                                            <div class="cat_title3">
                                                <h3>
                                                    25 Questions{" "}
                                                    <span>Michael</span>
                                                </h3>
                                                <p>Candy Crush Saga</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-6">
                                        <div class="cate-box3">
                                            <img
                                                src="./murabbo/img/user-white.svg"
                                                alt="Game"
                                            />
                                            <div class="cat_title3">
                                                <h3>
                                                    25 Questions{" "}
                                                    <span>Michael</span>
                                                </h3>
                                                <p>Candy Crush Saga</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-6">
                                        <div class="cate-box3 pink-fill">
                                            <img
                                                src="./murabbo/img/user-white.svg"
                                                alt="Game"
                                            />
                                            <div class="cat_title3">
                                                <h3>
                                                    25 Questions{" "}
                                                    <span>Michael</span>
                                                </h3>
                                                <p>Candy Crush Saga</p>
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
        );
    }
}

export default FAQ;
