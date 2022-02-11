import React, { Component } from "react";
import {
    TheFooter,
    TheSidebarInner,
    TheHeaderInner,
} from "../../containers/index";
import { reactLocalStorage } from "reactjs-localstorage";
import configuration from "../../config";
import { CModal, CModalBody } from "@coreui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import $ from "jquery";
import InfiniteScroll from "react-infinite-scroll-component";

var jwt = require("jsonwebtoken");

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile_picture: "avatars/placeholder-user.png",
            name: "",
            tosterMsg: "",
            fields: {},
            currentRank: 0,
            items: [],
            currentPage: 1,
            hasmore: true,
        };
    }

    componentDidMount() {
        let that = this;
        var token = reactLocalStorage.get("token");
        jwt.verify(token, configuration.appName, function (err, decoded) {
            if (err) {
                decoded = null;
                reactLocalStorage.set("token", "");
                reactLocalStorage.set("userData", "");
                reactLocalStorage.set("is_login", "false");
                reactLocalStorage.set("reload", "true");
                window.location.href = "/#/";
            }
            if (decoded) {
                that.setState({
                    profile_picture:
                        JSON.parse(reactLocalStorage.get("userData"))
                            .profilePic === ""
                            ? "avatars/placeholder-user.png"
                            : JSON.parse(reactLocalStorage.get("userData"))
                                  .profilePic,
                    name: JSON.parse(reactLocalStorage.get("userData")).name,
                });
            }
        });

        var userId = JSON.parse(reactLocalStorage.get("userData")).userId;
        fetch(configuration.baseURL + "user/userProfile?userId=" + userId, {
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
                var data = data.data;
                this.setState({ fields: data });
                if (data.image === "") {
                    this.setState({ image: "avatars/placeholder-user.png" });
                } else {
                    this.setState({ profile_picture: data.image });
                }
            });

        fetch(
            configuration.baseURL +
                "user/leaderboard?size=10&page=1&userId=" +
                userId,
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
                this.setState({
                    currentRank: data.data.userInfo.rank,
                    items: data.data.leaderBoard,
                    currentPage: this.state.currentPage + 1,
                    hasmore: data.data.leaderBoard.length > 0 ? true : false,
                });
            });
    }

    fetchMoreData() {
        var userId = JSON.parse(reactLocalStorage.get("userData")).userId;
        console.log(this.state.items);
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        setTimeout(() => {
            fetch(
                configuration.baseURL +
                    "user/leaderboard?size=10&page=" +
                    this.state.currentPage +
                    "&userId=" +
                    userId,
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
                    var data = data.data.leaderBoard;
                    this.setState({
                        items: this.state.items.concat(data),
                        currentPage: this.state.currentPage + 1,
                        hasmore: data.length > 0 ? true : false,
                    });
                });
        }, 1500);
    }

    render() {
        return (
            <>
                <TheHeaderInner />
                <main id="main">
                    <ToastContainer
                        position="top-right"
                        autoClose={25000}
                        style={{ top: "80px" }}
                    />
                    <section id="contest" class="d-flex align-items-center">
                        <div class="container">
                            <div
                                style={{ marginTop: "30px" }}
                                class="contest-info"
                            >
                                <div class="row">
                                    <div
                                        style={{ padding: "0" }}
                                        class="col-lg-3 col-md-4"
                                    >
                                        <div class="sidebar-dashboard">
                                            <TheSidebarInner />
                                        </div>
                                    </div>
                                    <div class="col-lg-9 col-md-8">
                                        <div class="main_title_">
                                            <h3>Leaderboard</h3>
                                        </div>

                                        <div class="profile_info">
                                            <div class="row">
                                                <div
                                                    style={{
                                                        marginTop: "20px",
                                                    }}
                                                    class="col-lg-8 col-md-6"
                                                >
                                                    <div class="inline">
                                                        <img
                                                            class="profile"
                                                            src={
                                                                this.state
                                                                    .profile_picture
                                                            }
                                                        />
                                                        <img
                                                            class="onlinetick"
                                                            src={
                                                                this.state
                                                                    .availabilityStatusImg
                                                            }
                                                        />
                                                    </div>
                                                    <div class="inline social-info">
                                                        <h3>
                                                            {
                                                                this.state
                                                                    .fields[
                                                                    "name"
                                                                ]
                                                            }
                                                        </h3>
                                                        <span>
                                                            {
                                                                this.state
                                                                    .fields[
                                                                    "userStatus"
                                                                ]
                                                            }
                                                        </span>
                                                        <br />
                                                        <img
                                                            src="./murabbo/img/diamond.svg"
                                                            style={{
                                                                height: "auto",
                                                            }}
                                                        />{" "}
                                                        <span>
                                                            Best performer
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-6">
                                                    <div class="scrore">
                                                        <img src="./murabbo/img/tropy.svg" />
                                                        <p>
                                                            Current Rank :{" "}
                                                            {
                                                                this.state
                                                                    .currentRank
                                                            }
                                                        </p>
                                                        <h2>
                                                            <span>
                                                                Score :{" "}
                                                            </span>{" "}
                                                            {
                                                                this.state
                                                                    .fields[
                                                                    "currentScore"
                                                                ]
                                                            }{" "}
                                                            <span>pt</span>
                                                        </h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            style={{ marginBottom: "25px" }}
                                            class="row"
                                        >
                                            <div class="col-lg-12 col-md-12 col-sm-12">
                                                <h3 class="setting-title">
                                                    Top Ranks
                                                </h3>
                                            </div>
                                            <InfiniteScroll
                                                className="row"
                                                dataLength={
                                                    this.state.items.length
                                                }
                                                next={
                                                    this.state.currentPage > 3
                                                        ? null
                                                        : this.fetchMoreData.bind(
                                                              this
                                                          )
                                                }
                                                hasMore={this.state.hasmore}
                                                loader={
                                                    this.state.currentPage >
                                                    3 ? null : (
                                                        <h4 className="col-lg-12 col-md-12 col-sm-12 leaderloading">
                                                            Loading...
                                                        </h4>
                                                    )
                                                }
                                            >
                                                {this.state.items.map(
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
                                                                        <p>
                                                                            {index +
                                                                                1}
                                                                        </p>
                                                                    </div>
                                                                    <div class="user-detail_">
                                                                        <h3>
                                                                            {
                                                                                i.name
                                                                            }
                                                                        </h3>
                                                                    </div>
                                                                    <div class="point_">
                                                                        <h5>
                                                                            {
                                                                                i.currentScore
                                                                            }{" "}
                                                                            pt
                                                                        </h5>
                                                                        <img
                                                                            class="up-arrow"
                                                                            src="./murabbo/img/up-arrow.svg"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </InfiniteScroll>
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

export default Leaderboard;
