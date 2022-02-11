import React, { Component } from "react";
import { TheFooter, TheHeaderInner } from "../../containers/index";
import "react-toastify/dist/ReactToastify.css";

class AddRound extends Component {
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
                                                <h3>Round Detail</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{ paddingTop: "30px" }}
                                class="contest-info"
                            >
                                <div class="row">
                                    <div class="col-lg-4 col-md-6 col-sm-12">
                                        <div class="profile-img">
                                            <form
                                                id="file-upload-form"
                                                class="uploader"
                                            >
                                                <input
                                                    id="file-upload"
                                                    type="file"
                                                    name="fileUpload"
                                                    accept="image/*"
                                                />

                                                <label
                                                    for="file-upload"
                                                    id="file-drag"
                                                >
                                                    <img
                                                        id="file-image"
                                                        src="#"
                                                        alt="Preview"
                                                        class="hidden"
                                                    />
                                                    <div id="start">
                                                        <img
                                                            src="./murabbo/img/upload.svg"
                                                            alt="Upload"
                                                        />
                                                        <div
                                                            id="notimage"
                                                            class="hidden"
                                                        >
                                                            Please select an
                                                            image
                                                        </div>
                                                        <div>Add Image</div>
                                                    </div>
                                                    <div
                                                        id="response"
                                                        class="hidden"
                                                    >
                                                        <div id="messages"></div>
                                                    </div>
                                                </label>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-6 col-sm-12">
                                        <div class="cus_input input_wrap">
                                            <img
                                                src="./murabbo/img/title.svg"
                                                alt="Upload"
                                            />{" "}
                                            <input
                                                type="text"
                                                required=""
                                                name=""
                                            />
                                            <label>Title</label>
                                        </div>
                                        <div class="cus_input input_wrap">
                                            <img
                                                src="./murabbo/img/des.svg"
                                                alt="Upload"
                                            />{" "}
                                            <input
                                                type="text"
                                                required=""
                                                name=""
                                            />
                                            <label>Description</label>
                                        </div>
                                        <div class="cus_input input_wrap">
                                            <img
                                                src="./murabbo/img/book.svg"
                                                alt="Upload"
                                            />{" "}
                                            <input
                                                type="text"
                                                required=""
                                                name=""
                                            />
                                            <label>Execution Mode</label>
                                        </div>
                                        <div
                                            style={{ margin: "0px 0 5px 0" }}
                                            class="cus_input "
                                        >
                                            <img
                                                src="./murabbo/img/clock.svg"
                                                alt="Upload"
                                            />{" "}
                                            <label class="cus_label">
                                                Question Time
                                            </label>
                                        </div>
                                        <div class="number">
                                            <span class="minus">
                                                <img
                                                    src="./murabbo/img/minus.svg"
                                                    alt="Upload"
                                                />
                                            </span>
                                            <input type="text" value="1" />
                                            <span class="plus">
                                                <img
                                                    src="./murabbo/img/plus.svg"
                                                    alt="Upload"
                                                />
                                            </span>
                                        </div>
                                        <div
                                            style={{ margin: "0px 0 5px 0" }}
                                            class="cus_input "
                                        >
                                            <label
                                                style={{ paddingLeft: "5px" }}
                                                class="cus_label"
                                            >
                                                Base Points
                                            </label>
                                        </div>
                                        <div class="range-wrap">
                                            <input
                                                min="0"
                                                max="30"
                                                value="0"
                                                step="1"
                                                type="range"
                                                class="range"
                                                id="range"
                                            />
                                            <output class="bubble"></output>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-6 col-sm-12">
                                        <div class="cus_input input_wrap">
                                            <img
                                                src="./murabbo/img/enable.svg"
                                                alt="Upload"
                                            />{" "}
                                            <input
                                                type="text"
                                                required=""
                                                name=""
                                            />
                                            <label>Visibility</label>
                                        </div>
                                        <div class="cus_input input_wrap">
                                            <img
                                                src="./murabbo/img/score.svg"
                                                alt="Upload"
                                            />{" "}
                                            <input
                                                type="text"
                                                required=""
                                                name=""
                                            />
                                            <label>Scoring</label>
                                        </div>
                                        <div class="cus_input input_wrap">
                                            <img
                                                src="./murabbo/img/3d.svg"
                                                alt="Upload"
                                            />{" "}
                                            <input
                                                type="text"
                                                required=""
                                                name=""
                                            />
                                            <label>Rendering Mode</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="contest-info">
                                <div class="contest-title">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="footer-btn">
                                                <a
                                                    data-toggle="modal"
                                                    data-target="#addword"
                                                    href="javascript:void(0);"
                                                >
                                                    <button
                                                        class="blue_btn"
                                                        type="button"
                                                    >
                                                        Add Words
                                                    </button>
                                                </a>
                                                <a href="generate-questions.html">
                                                    <button
                                                        class="yellow_btn"
                                                        type="button"
                                                    >
                                                        Generate Words
                                                    </button>
                                                </a>
                                                <a href="#/round">
                                                    <button
                                                        class="pink_btn"
                                                        type="button"
                                                    >
                                                        Save & Exit
                                                    </button>
                                                </a>
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

export default AddRound;
