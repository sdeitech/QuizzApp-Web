import React, { Component } from "react";
import { TheFooter, TheHeaderInner } from "../../containers/index";
import configuration from "../../config";
import { reactLocalStorage } from "reactjs-localstorage";
import { CModal, CModalBody } from "@coreui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import $ from "jquery";
import RLDD from "react-list-drag-and-drop/lib/RLDD";
let round_id, gameType;

class RoundQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmationModel: false,
            delete_id: "",
            listArr: [],
        };
    }

    componentDidMount() {
        var url = window.location.href;
        round_id = url.substring(url.lastIndexOf("/") + 1);
        fetch(configuration.baseURL + "round/round?roundId=" + round_id, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + reactLocalStorage.get("clientToken"),
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.data.length > 0) {
                    gameType = data.data[0].gameType;
                    this.getList(round_id);
                } else {
                    this.props.history.push("/dashboard");
                }
            });
    }
    handleRLDDChange(newItems) {
        this.setState({ listArr: newItems });

        var sortingList = [];
        for (var i = 0; i < newItems.length; i++) {
            sortingList.push({
                questionId: newItems[i]["_id"],
                displayOrder: i,
            });
        }

        var postData = JSON.stringify({ sortingList: sortingList });
        fetch(configuration.baseURL + "roundQuestion/sorting", {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + reactLocalStorage.get("clientToken"),
            },
            body: postData,
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.getList(round_id);
            });
    }

    getList(round_id) {
        if (round_id) {
            fetch(
                configuration.baseURL +
                    "roundQuestion/roundQuestion?roundId=" +
                    round_id +
                    "&gameType=" +
                    gameType,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer " + reactLocalStorage.get("clientToken"),
                    },
                }
            )
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    var data = data.data;
                    for (var i = 0; i < data.length; i++) {
                        data[i]["id"] = i;
                    }
                    this.setState({ listArr: data });
                });
        }
    }

    deleteHandler(id = "", e) {
        if (this.state.delete_id) {
            fetch(
                configuration.baseURL +
                    "roundQuestion/roundQuestion/" +
                    this.state.delete_id +
                    "?roundId=" +
                    round_id +
                    "&gameType=" +
                    gameType,
                {
                    method: "DELETE",
                    headers: {
                        contentType: "application/json",
                        Authorization:
                            "Bearer " + reactLocalStorage.get("clientToken"),
                    },
                }
            )
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    if (data.code === 200) {
                        this.setState({
                            delete_id: "",
                            confirmationModel: false,
                        });
                        this.getList(round_id);
                    } else {
                        return toast.error(data.message);
                    }
                });
        } else {
            this.setState({ delete_id: id, confirmationModel: true });
        }
    }

    addQuestion() {
        this.props.history.push("/add_round_question/" + round_id);
    }

    editHandler(id) {
        this.props.history.push("/edit_round_question/" + round_id + "?" + id);
    }

    backToRound() {
        var url = window.location.href.split("/");
        var contest_id = url[5];
        this.props.history.push("/tray/" + contest_id);
    }

    saveNextHandler() {
        this.props.history.push("/contest");
    }

    truncate(str, n) {
        return str.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    toggleHandler(key) {
        let listArr = this.state.listArr;
        var that = this;
        listArr = listArr.filter(function (value, index, arr) {
            console.log(key === index);
            console.log(key, index);
            if (key === index) {
                var obj = value;
                obj.active = !obj.active;
                return obj;
            } else {
                var obj = value;
                obj.active = false;
                return obj;
            }
        });
        this.setState({ listArr: listArr });
    }

    render() {
        return (
            <>
                <TheHeaderInner />
                <main id="main">
                    <section id="contest" className="d-flex align-items-center">
                        <div className="container">
                            <div className="create-contest">
                                <div className="contest-title">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="main_title">
                                                <h3>
                                                    {gameType} Round {this.state.listArr.length == 0 ? ('Questions'): (this.state.listArr.length == 1 ? ('Question'):('Questions'))}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {this.state.listArr.length > 0 ? (
                                <RLDD
                                    items={this.state.listArr}
                                    itemRenderer={(val, ckey) => {
                                        var className = val.active
                                            ? "acc-head p-3 rounded-0 active"
                                            : "acc-head p-3 rounded-0";
                                        var style = val.active
                                            ? { display: "block" }
                                            : { display: "none" };
                                        return (
                                            <div
                                                style={{
                                                    paddingTop: "20px",
                                                    paddingBottom: "20px",
                                                }}
                                                className="contest-info"
                                            >
                                                {" "}
                                                <div className="row">
                                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                                        <div className="accordion-wrapper">
                                                            <div
                                                                class={
                                                                    className
                                                                }
                                                                onClick={this.toggleHandler.bind(
                                                                    this,
                                                                    ckey
                                                                )}
                                                            >
                                                                <div className="row">
                                                                    <div className="col-md-2">
                                                                        <div className="acc_img cus-acc_img">
                                                                            {val.fileType ===
                                                                            "audio" ? (
                                                                                <img src="avatars/5.png" />
                                                                            ) : null}
                                                                            {val.fileType ===
                                                                            "video" ? (
                                                                                <img src="avatars/play.svg" />
                                                                            ) : null}
                                                                            {val.fileType ===
                                                                                "gallery" ||
                                                                            val.fileType ===
                                                                                "image" ? (
                                                                                <img
                                                                                    src={
                                                                                        val.file !==
                                                                                        ""
                                                                                            ? val.file
                                                                                            : "avatars/question.png"
                                                                                    }
                                                                                />
                                                                            ) : val.fileType ===
                                                                              "" ? (
                                                                                <img
                                                                                    src={
                                                                                        val.file !==
                                                                                        ""
                                                                                            ? val.file
                                                                                            : "avatars/question.png"
                                                                                    }
                                                                                />
                                                                            ) : null}
                                                                        </div>
                                                                    </div>  
                                                                    <div className="col-md-10">
                                                                        <div
                                                                            className="acc_title"
                                                                            style={{
                                                                                cursor:
                                                                                    "pointer",
                                                                            }}
                                                                        >
                                                                            <h4>
                                                                                {
                                                                                    val.question
                                                                                }
                                                                            </h4>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="acc-body rounded-0"
                                                                style={style}
                                                            >
                                                                <div className="row">
                                                                    <div className="col-md-2"></div>
                                                                    <div className="col-md-10 ">
                                                                        <div
                                                                            className="acc_detail"
                                                                            style={{
                                                                                marginBottom:
                                                                                    "20px",
                                                                            }}
                                                                        >
                                                                            <button
                                                                                type="button"
                                                                                className="remove_btn"
                                                                                onClick={this.deleteHandler.bind(
                                                                                    this,
                                                                                    val._id
                                                                                )}
                                                                                style={{
                                                                                    cursor:
                                                                                        "pointer",
                                                                                }}
                                                                            >
                                                                                <img src="./murabbo/img/close2.svg" />{" "}
                                                                                Remove
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                className="remove_btn"
                                                                                onClick={this.editHandler.bind(
                                                                                    this,
                                                                                    val._id
                                                                                )}
                                                                                style={{
                                                                                    cursor:
                                                                                        "pointer",
                                                                                }}
                                                                            >
                                                                                <img src="./murabbo/img/edit.svg" />{" "}
                                                                                Edit
                                                                            </button>
                                                                        </div>
                                                                        <div className="answer">
                                                                            {val.answers.map(
                                                                                (
                                                                                    val1,
                                                                                    ckey1
                                                                                ) => {
                                                                                    return (
                                                                                        <div className="answer-box list-answer-box">
                                                                                            <p className="fancy">
                                                                                                <label>
                                                                                                    {val1.correctAnswer ===
                                                                                                    true ? (
                                                                                                        <i
                                                                                                            className="fa fa-check-circle"
                                                                                                            style={{
                                                                                                                cursor:
                                                                                                                    "auto",
                                                                                                            }}
                                                                                                        />
                                                                                                    ) : (
                                                                                                        <span
                                                                                                            className="fancy-circle no-border"
                                                                                                            style={{
                                                                                                                cursor:
                                                                                                                    "auto",
                                                                                                            }}
                                                                                                        ></span>
                                                                                                    )}
                                                                                                    <span
                                                                                                        for={
                                                                                                            ckey1
                                                                                                        }
                                                                                                    >
                                                                                                        {this.truncate(
                                                                                                            val1.answer,
                                                                                                            450
                                                                                                        )}
                                                                                                    </span>
                                                                                                </label>
                                                                                            </p>
                                                                                        </div>
                                                                                    );
                                                                                }
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }}
                                    onChange={this.handleRLDDChange.bind(this)}
                                />
                            ) : (
                                <div
                                    style={{
                                        paddingTop: "20px",
                                        paddingBottom: "20px",
                                    }}
                                    className="contest-info"
                                >
                                    {" "}
                                    <div className="row">
                                        <div
                                            style={{
                                                color: "white",
                                                width: "100%",
                                                textAlign: "center",
                                                marginTop: "150px",
                                                marginBottom: "150px",
                                            }}
                                            className="flex"
                                        >
                                            <p className="item-author text-color">
                                                No data found
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="contest-info">
                                <div className="contest-title">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="footer-btn">
                                                <button
                                                    className="yellow_btn"
                                                    type="button"
                                                    onClick={this.backToRound.bind(
                                                        this
                                                    )}
                                                >
                                                    Back To Round
                                                </button>
                                                <button
                                                    className="blue_btn light_blue_btn"
                                                    type="button"
                                                    onClick={this.addQuestion.bind(
                                                        this
                                                    )}
                                                >
                                                    Add{" "}
                                                    {this.state.listArr.length >
                                                    0
                                                        ? "More "
                                                        : ""}
                                                    Question
                                                </button>
                                                <button
                                                    className="pink_btn"
                                                    type="button"
                                                    onClick={this.saveNextHandler.bind(
                                                        this
                                                    )}
                                                >
                                                    Save & Exit
                                                </button>
                                                {/*<button className="yellow_btn" type="button">Save</button>*/}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <CModal
                    show={this.state.confirmationModel}
                    closeOnBackdrop={false}
                    onClose={() =>
                        this.setState({
                            confirmationModel: false,
                            delete_id: "",
                        })
                    }
                    color="danger"
                    centered
                >
                    <CModalBody className="model-bg">
                        <div>
                            <div className="modal-body">
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() =>
                                        this.setState({
                                            confirmationModel: false,
                                            delete_id: "",
                                        })
                                    }
                                >
                                    <span aria-hidden="true">
                                        <img src="./murabbo/img/close.svg" />
                                    </span>
                                </button>
                                <div className="model_data">
                                    <div className="model-title">
                                        <img
                                            src="./murabbo/img/close_pink.png"
                                            alt=""
                                        />
                                        <h3>
                                            Are you sure you want to delete?
                                        </h3>
                                    </div>
                                    <img
                                        className="shape2"
                                        src="./murabbo/img/shape2.svg"
                                    />
                                    <img
                                        className="shape3"
                                        src="./murabbo/img/shape3.svg"
                                    />
                                    <div className="row">
                                        <div className="col-md-10 offset-md-1">
                                            <div
                                                style={{
                                                    textAlign: "center",
                                                    float: "left",
                                                    marginRight: "10px",
                                                }}
                                                className=""
                                            >
                                                <button
                                                    style={{
                                                        minWidth: "150px",
                                                        color: "#f8c84e",
                                                        fontWeight: "500",
                                                    }}
                                                    className="btn"
                                                    type="button"
                                                    onClick={() =>
                                                        this.setState({
                                                            confirmationModel: false,
                                                            delete_id: "",
                                                        })
                                                    }
                                                >
                                                    No
                                                </button>
                                            </div>
                                            <div
                                                style={{
                                                    textAlign: "center",
                                                    float: "left",
                                                }}
                                                className=""
                                            >
                                                <button
                                                    style={{
                                                        minWidth: "150px",
                                                    }}
                                                    className="yellow_btn"
                                                    type="button"
                                                    onClick={this.deleteHandler.bind(
                                                        this
                                                    )}
                                                >
                                                    Yes
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CModalBody>
                </CModal>

                <TheFooter />
            </>
        );
    }
}

export default RoundQuestion;
