import React, { Component } from "react";
import { TheFooter, TheHeaderInner } from "../../containers/index";
import "react-toastify/dist/ReactToastify.css";

class Category extends Component {
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
                                        <div class="col-md-12">
                                            <div class="main_title">
                                                <h3>Choose Category</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="contest-info">
                                <div class="row">
                                    <div class="col-8">
                                        <div class="cate-title">
                                            <p>General</p>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="seeall">
                                            <p>See All</p>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-6">
                                        <a href="#/add_contest">
                                            <div class="cate-box">
                                                <img
                                                    src="./murabbo/img/1.png"
                                                    alt="Category"
                                                />
                                                <div class="cat_title">
                                                    <h3>Category One</h3>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-6">
                                        <div class="cate-box pink">
                                            <img
                                                src="./murabbo/img/1.png"
                                                alt="Category"
                                            />
                                            <div class="cat_title">
                                                <h3>Category Two</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-6">
                                        <div class="cate-box yellow">
                                            <img
                                                src="./murabbo/img/1.png"
                                                alt="Category"
                                            />
                                            <div class="cat_title">
                                                <h3>Category Three</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-8">
                                        <div class="cate-title">
                                            <p>Entertainment</p>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="seeall">
                                            <p>See All</p>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-6">
                                        <div class="cate-box">
                                            <img
                                                src="./murabbo/img/1.png"
                                                alt="Category"
                                            />
                                            <div class="cat_title">
                                                <h3>Category One</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-6">
                                        <div class="cate-box pink">
                                            <img
                                                src="./murabbo/img/1.png"
                                                alt="Category"
                                            />
                                            <div class="cat_title">
                                                <h3>Category Two</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-6">
                                        <div class="cate-box yellow">
                                            <img
                                                src="./murabbo/img/1.png"
                                                alt="Category"
                                            />
                                            <div class="cat_title">
                                                <h3>Category Three</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-8">
                                        <div class="cate-title">
                                            <p>Entertainment</p>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="seeall">
                                            <p>See All</p>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-6">
                                        <div class="cate-box">
                                            <img
                                                src="./murabbo/img/1.png"
                                                alt="Category"
                                            />
                                            <div class="cat_title">
                                                <h3>Category One</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-6">
                                        <div class="cate-box pink">
                                            <img
                                                src="./murabbo/img/1.png"
                                                alt="Category"
                                            />
                                            <div class="cat_title">
                                                <h3>Category Two</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-6">
                                        <div class="cate-box yellow">
                                            <img
                                                src="./murabbo/img/1.png"
                                                alt="Category"
                                            />
                                            <div class="cat_title">
                                                <h3>Category Three</h3>
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

export default Category;
