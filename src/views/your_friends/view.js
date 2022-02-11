import React, { Component } from "react";
import {
    TheFooter,
    TheFooterInner,
    TheHeaderInner,
} from "../../containers/index";
import { reactLocalStorage } from "reactjs-localstorage";
import configuration from "../../config";
import { CModal, CModalBody } from "@coreui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InfiniteScroll from "react-infinite-scroll-component";
import $ from "jquery";
var jwt = require("jsonwebtoken");

class YourFriends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            filterData: [],
            isLoading: true,
            searchKey: "",
            error: "",
        };
    }

    componentDidMount() {
        var userId = JSON.parse(reactLocalStorage.get("userData")).userId;
        fetch(configuration.baseURL + "user/friends?userId=" + userId, {
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
                if (data.code == 400) {
                    this.setState({ isLoading: false });
                } else {
                    let pasrseArr = JSON.parse(JSON.stringify(data.data));
                    var filtered = pasrseArr.filter(function (el) {
                        return el != null;
                    });
                    if (filtered.length == 0) {
                        this.setState({ isLoading: false });
                    }

                    this.setState({ listData: filtered, isLoading: false });
                }
            });
    }

    handleChange(e) {
        if (e.target.value === "") {
            this.componentDidMount();
        }
        this.setState({ searchKey: e.target.value });
    }
    handleSearch() {
        if (this.state.searchKey != "") {
            this.setState({ error: "" });
            const filteredData = this.state.listData.filter((element) => {
                return element.name
                    .toLowerCase()
                    .includes(this.state.searchKey.toLowerCase());
            });

            console.log(filteredData);
            this.setState({ listData: filteredData });
        } else {
            this.setState({ error: "Please Enter Value" });
        }
    }

    render() {
        return (
            <>
                <TheHeaderInner />
                <main id="main">
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        style={{ top: "80px" }}
                    />
                    <section id="contest" class="d-flex align-items-center">
                        <div class="container">
                            <div class="create-contest">
                                <div class="contest-title">
                                    <div class="row">
                                        <div class="col-md-5">
                                            <div class="main_title">
                                                <h3>Your Friends</h3>
                                            </div>
                                        </div>
                                        <div class="col-md-5">
                                            <div className="search">
                                                <input
                                                    placeholder="Search by keywords"
                                                    type="text"
                                                    onChange={this.handleChange.bind(
                                                        this
                                                    )}
                                                    value={this.state.searchKey}
                                                />
                                                <i className="bx bx-search"></i>
                                            </div>
                                            <span
                                                className="error-msg"
                                                style={{
                                                    position: "absolute",
                                                    top: "43px",
                                                }}
                                            >
                                                {this.state.error}
                                            </span>
                                        </div>
                                        <div class="col-md-2">
                                            <button
                                                className="yellow_btn"
                                                type="button"
                                                onClick={this.handleSearch.bind(
                                                    this
                                                )}
                                            >
                                                Search
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        style={{ marginTop: "25px" }}
                                        class="row"
                                    >
                                        {this.state.isLoading ? (
                                            <h4 className="col-lg-12 col-md-12 col-sm-12 leaderloading">
                                                Loading...
                                            </h4>
                                        ) : null}
                                        {this.state.listData.length > 0 ? (
                                            this.state.listData.map(
                                                (i, index) => (
                                                    <div class="col-lg-4 col-md-12 col-sm-12">
                                                        <div class="_1st2 two_no">
                                                            <div class="_1stimg">
                                                                <div class="leaderimg2_">
                                                                    <img
                                                                        src={
                                                                            i.image !==
                                                                            ""
                                                                                ? i.image
                                                                                : "avatars/placeholder-user.png"
                                                                        }
                                                                    />
                                                                    <img
                                                                        class="onlinetick"
                                                                        style={{
                                                                            position:
                                                                                "absolute",
                                                                            width: "25px",
                                                                            height: "25px",
                                                                        }}
                                                                        src={
                                                                            i.availabilityStatus ==
                                                                            1
                                                                                ? "img/online.png"
                                                                                : i.availabilityStatus ==
                                                                                  2
                                                                                ? "img/away.png"
                                                                                : i.availabilityStatus ==
                                                                                  3
                                                                                ? "img/donot-disturb.png"
                                                                                : i.availabilityStatus ==
                                                                                  4
                                                                                ? "img/invisible.png"
                                                                                : "img/online.png"
                                                                        }
                                                                    />
                                                                </div>
                                                                <div class="user-detail_">
                                                                    <h3>
                                                                        {i.name}
                                                                    </h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )
                                        ) : this.state.isLoading == false ? (
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
                                        ) : null}
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

export default YourFriends;
