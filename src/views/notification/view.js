import React, { Component } from "react";
import { TheFooter, TheHeaderInner } from "../../containers/index";
import { reactLocalStorage } from "reactjs-localstorage";
import configuration from "../../config";
import { CModal, CModalBody } from "@coreui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import $ from "jquery";
var jwt = require("jsonwebtoken");

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
        };
    }

    componentDidMount() {
        var userId = JSON.parse(reactLocalStorage.get("userData")).userId;
        fetch(configuration.baseURL + "notification?id=" + userId, {
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
                this.setState({ listData: data });
            });
    }

    acceptReject(postdata, type) {
        // console.log(type,postdata);
        var userId = JSON.parse(reactLocalStorage.get("userData")).userId;
        const data = new FormData();
        data.append("userId", userId);
        data.append("roomId", postdata.inviteRoomId);
        var url = "";
        if (type === "accept") {
            url = configuration.baseURL + "room/acceptInviteRoom";
        } else {
            url = configuration.baseURL + "room/declineInviteRoom";
        }
        fetch(url, {
            method: "POST",
            headers: {
                contentType: "application/json",
                Authorization: "Bearer " + reactLocalStorage.get("clientToken"),
            },
            body: data,
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.code === 200) {
                    this.componentDidMount();
                    this.props.history.push(`/videoChat/room123/${userId}`);
                    // return toast.success(data.message);
                } else {
                    return toast.error(data.message);
                }
            });
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
                            <div class="create-contest">
                                <div class="contest-title">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="main_title">
                                                <h3>Notifications</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{ float: "left", width: "100%" }}
                                class="contest-info"
                            >
                                {this.state.listData.length > 0 ? (
                                    this.state.listData.map((e, key) => {
                                        return (
                                            <div class="participate-list2">
                                                <div class="inline">
                                                    <img
                                                        src={
                                                            e.invitedByImage
                                                                ? e.invitedByImage
                                                                : "avatars/placeholder-user.png"
                                                        }
                                                    />
                                                </div>
                                                <div class="inline width70">
                                                    <h5>{e.title}</h5>
                                                    <h6>{e.description}</h6>
                                                    <p>{e.timeStamp}</p>
                                                </div>
                                                {e.type === 1 ? (
                                                    <div class="inline part_ico">
                                                        <button
                                                            class="pink_btn"
                                                            type="button"
                                                            onClick={this.acceptReject.bind(
                                                                this,
                                                                e,
                                                                "decline"
                                                            )}
                                                        >
                                                            Decline
                                                        </button>
                                                        <button
                                                            class="blue_btn"
                                                            type="button"
                                                            onClick={this.acceptReject.bind(
                                                                this,
                                                                e,
                                                                "accept"
                                                            )}
                                                        >
                                                            Accept
                                                        </button>
                                                    </div>
                                                ) : null}
                                            </div>
                                        );
                                    })
                                ) : (
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
                                )}
                            </div>
                        </div>
                    </section>
                </main>
            </>
        );
    }
}

export default Notification;
