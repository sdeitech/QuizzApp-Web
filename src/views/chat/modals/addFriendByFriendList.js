import React, { Component } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import configuration from "../../../config";
import { CModal, CModalBody } from "@coreui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InfiniteScroll from "react-infinite-scroll-component";
import $ from "jquery";
var jwt = require("jsonwebtoken");


class addFriendByFriendList extends Component {
    // const addFriendByFriendList = ({ open = false, setOpen = () => { } }) => {
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
        console.log("\n\n\n\n\n\n\n\npros", this.props)
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
            <CModal
                show={this.props.open}
                closeOnBackdrop={true}
                onClose={() => this.props.setOpen(false)}
                color="danger"
                centered
            >
                <CModalBody className="model-bg">
                    <div>
                        <div className="modal-body">
                            <button
                                type="button"
                                className="close"
                                onClick={() => this.props.setOpen(false)}
                            >
                                <span aria-hidden="true">
                                    <img alt="" src="./murabbo/img/close.svg" />
                                </span>
                            </button>
                            <div className="model_data">
                                <div className="model-title">
                                    <h3>Your Friends</h3>
                                </div>
                                <img
                                    alt=""
                                    className="shape2"
                                    src="./murabbo/img/shape2.svg"
                                />
                                <img
                                    alt=""
                                    className="shape3"
                                    src="./murabbo/img/shape3.svg"
                                />
                                <div
                                    class="row search"
                                    style={{ marginBottom: "20px" }}
                                >
                                    <input
                                        type="text"
                                        placeholder="Search"
                                    // value={this.state.searchTerm}
                                    // onChange={this.search.bind(
                                    //     this
                                    // )}
                                    />
                                    <i className="bx bx-search"></i>
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
                                                                <p>
                                                                    {index +
                                                                        1}
                                                                </p>
                                                                {/* <img
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
                                                                    /> */}
                                                            </div>
                                                            <div class="user-detail_">
                                                                <h3>
                                                                    {i.name}
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
                </CModalBody>
            </CModal>)
    }
}

export default addFriendByFriendList