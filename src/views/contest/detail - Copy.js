import React, { Component } from "react";
import { TheFooter, TheHeaderInner } from "../../containers/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import languages from "../../languages";
import configuration from "../../config";
import { reactLocalStorage } from "reactjs-localstorage";
import { CModal, CModalBody } from "@coreui/react";
let contestId, roomId;
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: { invitedUserDetails: [], acceptedUserDetails: [] },
            contestData: {},
            userListInvite: [],
            userListInviteSearch: "",
            inviteFriendsModel: true,
            inviteModel: false,
            inviteUsersModel: false,
        };
    }

    componentDidMount() {
        var userId = JSON.parse(reactLocalStorage.get("userData")).userId;

        var url = window.location.href;

        var urlParts = url.substring(url.lastIndexOf("/") + 1);
        urlParts = urlParts.split("?");

        if (urlParts[1]) {
            roomId = urlParts[1];
        }
        if (urlParts[0]) {
            contestId = urlParts[0];
        }

        fetch(configuration.baseURL + "room/room?roomId=" + roomId, {
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
                    this.setState({ data: data.data[0] });
                }
            });

        fetch(
            configuration.baseURL + "contest/contest?contestId=" + contestId,
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
                if (data.data.length > 0) {
                    this.setState({ contestData: data.data[0] });
                }
            });
        this.getUsersList();
    }

    invite(data) {
        var userId = JSON.parse(reactLocalStorage.get("userData")).userId;
        if (data.is_invited === false) {
            this.setState({isLoading:true});
            fetch(configuration.baseURL + "room/inviteRoom", {
                method: "POSt",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer " + reactLocalStorage.get("clientToken"),
                },
                body: JSON.stringify({
                    roomId: roomId,
                    inviteUserId: data._id,
                }),
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    if (data.code === 200) {
                       
                        this.componentDidMount();
                        this.setState({isLoading:true});
                        return toast.success("Invite successfully");
                    } else {
                        this.setState({isLoading:false});

                        return toast.error(data.message);
                    }
                });
        }
    }

    goToVideoChat(data) {
        // var userId = JSON.parse(reactLocalStorage.get("userData")).userId;
        // this.componentDidMount();
        var url = window.location.href;

        var urlParts = url.substring(url.lastIndexOf("/") + 1);
        urlParts = urlParts.split("?");
        this.props.history.push(`/videoChat/${urlParts[1]}`);
    }

    handleChange(e) {
        this.setState({ userListInviteSearch: e.target.value });
        this.getUsersList();
    }

    getUsersList() {
        var strSearch = this.state.userListInviteSearch
            ? "&searchKey=" + this.state.userListInviteSearch
            : "";
        fetch(
            configuration.baseURL +
                "room/userListInvite?roomId=" +
                roomId +
                strSearch,
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
                if (data.data.length > 0) {
                    this.setState({ userListInvite: data.data });
                }
            });
    }
    render() {
        return (
            <>
                <TheHeaderInner />
                <ToastContainer
                    position="top-right"
                    autoClose={25000}
                    style={{ top: "80px" }}
                />
                <main id="main">
                    <section id="hero" className="d-flex align-items-center">
                        <div className="hero-img" style={{ width: "100%" }}>
                            <img
                                src={
                                    this.state.contestData.image !== ""
                                        ? this.state.contestData.image
                                        : "./avatars/placeholder.png"
                                }
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
                                            <h5 style={{ paddingTop: "30px" }}>
                                                You need to be with a friend to
                                                play.
                                            </h5>
                                        </div>
                                        <div
                                            style={{ float: "right" }}
                                            className="inline "
                                        >
                                            <div className="abc-detail">
                                                <p>Game PIN</p>
                                                <h3>
                                                    {this.state.data.gamePin}
                                                </h3>
                                            </div>
                                            <div className="abc-detail">
                                                <p>Game Password</p>
                                                <h3>
                                                    {this.state.data.password
                                                        ? this.state.data
                                                              .password
                                                        : "-"}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="sidenav">
                        <div className="participate">
                            <h3 style={{ color: "#FCD274", textAlign: "left" }}>
                                In This Room
                            </h3>

                            {this.state.data.acceptedUserDetails.length > 0 ? (
                                this.state.data.acceptedUserDetails.map(
                                    (e, key) => {
                                        return (
                                            <div className="participate-list">
                                                <div className="inline">
                                                    <img
                                                        src={
                                                            e.image
                                                                ? e.image
                                                                : "./avatars/placeholder-user.png"
                                                        }
                                                    />
                                                </div>
                                                <div className="inline">
                                                    <h5>{e.name}</h5>
                                                </div>
                                            </div>
                                        );
                                    }
                                )
                            ) : (
                                <div
                                    style={{
                                        color: "white",
                                        width: "100%",
                                        textAlign: "center",
                                        marginTop: "25px",
                                        marginBottom: "25px",
                                    }}
                                    className="flex"
                                >
                                    <p className="item-author text-color">
                                        No users available
                                    </p>
                                </div>
                            )}
                            <h3 style={{ color: "#FCD274", textAlign: "left" }}>
                                Invite Sent To
                            </h3>
                            {this.state.data.invitedUserDetails.length > 0 ? (
                                this.state.data.invitedUserDetails.map(
                                    (e, key) => {
                                        return (
                                            <div className="participate-list">
                                                <div className="inline">
                                                    <img
                                                        src={
                                                            e.image
                                                                ? e.image
                                                                : "./avatars/placeholder-user.png"
                                                        }
                                                    />
                                                </div>
                                                <div className="inline">
                                                    <h5>{e.name}</h5>
                                                </div>
                                            </div>
                                        );
                                    }
                                )
                            ) : (
                                <div
                                    style={{
                                        color: "white",
                                        width: "100%",
                                        textAlign: "center",
                                        marginTop: "25px",
                                        marginBottom: "25px",
                                    }}
                                    className="flex"
                                >
                                    <p className="item-author text-color">
                                        No users available
                                    </p>
                                </div>
                            )}

                            <div className="full_btn mt50">
                                <button
                                    onClick={() =>
                                        this.setState({ inviteModel: true })
                                    }
                                    className="blue_btn"
                                    type="button"
                                >
                                    Invite Friends Here
                                </button>
                            </div>
                            <div className="full_btn">
                                <button
                                    className="blue_btn"
                                    type="button"
                                    onClick={this.goToVideoChat.bind(
                                        this
                                    )}
                                >
                                    Let's Play
                                </button>
                            </div>
                        </div>
                    </div>

                    <CModal
                        show={this.state.inviteModel}
                        closeOnBackdrop={false}
                        onClose={() => this.setState({ inviteModel: false })}
                        color="danger"
                        centered
                    >
                        <CModalBody className="model-bg">
                            <div>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() =>
                                        this.setState({ inviteModel: false })
                                    }
                                >
                                    <span aria-hidden="true">
                                        <img src="./murabbo/img/close.svg" />
                                    </span>
                                </button>
                                <div className="model_data">
                                    <div className="model-title">
                                        <h3>Add Friends</h3>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-10 offset-md-1">
                                            <div
                                                onClick={() =>
                                                    this.setState({
                                                        inviteUsersModel: true,
                                                        inviteModel: false,
                                                    })
                                                }
                                                className="addfriend"
                                            >
                                                <div className="inline">
                                                    <img src="./murabbo/img/magnifying-glass.svg" />
                                                </div>
                                                <div className="inline">
                                                    <h5>Add by Name</h5>
                                                </div>
                                                <div
                                                    style={{ float: "right" }}
                                                    className="inline arrow"
                                                >
                                                    <img src="./murabbo/img/arrow-right.svg" />
                                                </div>
                                            </div>
                                            <div className="addfriend">
                                                <div className="inline">
                                                    <img src="./murabbo/img/contacts.svg" />
                                                </div>
                                                <div className="inline">
                                                    <h5>Add from Contacts</h5>
                                                </div>
                                                <div
                                                    style={{ float: "right" }}
                                                    className="inline arrow"
                                                >
                                                    <img src="./murabbo/img/arrow-right.svg" />
                                                </div>
                                            </div>
                                            <div className="addfriend">
                                                <div className="inline">
                                                    <img src="./murabbo/img/facebook2.svg" />
                                                </div>
                                                <div className="inline">
                                                    <h5>
                                                        All Facebook Friends
                                                    </h5>
                                                </div>
                                                <div
                                                    style={{ float: "right" }}
                                                    className="inline arrow"
                                                >
                                                    <img src="./murabbo/img/arrow-right.svg" />
                                                </div>
                                            </div>

                                            <div className="full_btn mt50">
                                                <button
                                                    className="blue_btn"
                                                    type="button"
                                                >
                                                    Copy Profile Link
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CModalBody>
                    </CModal>

                    <CModal
                        show={this.state.inviteUsersModel}
                        closeOnBackdrop={false}
                        onClose={() =>
                            this.setState({ inviteUsersModel: false })
                        }
                        color="danger"
                        centered
                    >
                        <CModalBody className="model-bg">
                            <button
                                type="button"
                                className="close"
                                onClick={() =>
                                    this.setState({ inviteUsersModel: false })
                                }
                            >
                                <span aria-hidden="true">
                                    <img src="./murabbo/img/close.svg" />
                                </span>
                            </button>
                            <div className="model_data">
                                <div className="model-title">
                                    <h3>Add By Name</h3>
                                </div>
                                <div className="row">
                                    <div className="col-md-10 offset-md-1">
                                        <div className="search2">
                                            <input
                                                placeholder="Search By keywords"
                                                onChange={this.handleChange.bind(
                                                    this
                                                )}
                                                type="text"
                                            />
                                            <i className="bx bx-search"></i>
                                        </div>
                                        <h3
                                            style={{
                                                color: "#FCD274",
                                                textAlign: "left",
                                                fontSize: "14px",
                                                paddingTop: "20px",
                                            }}
                                        >
                                            In This Room
                                        </h3>
                                        <div className="cus_scroll">
                                            {this.state.userListInvite.length >
                                            0 ? (
                                                this.state.userListInvite.map(
                                                    (e, key) => {
                                                        return (
                                                            <div className="participate-list">
                                                                <div className="inline">
                                                                    <img
                                                                        src={
                                                                            e.image
                                                                                ? e.image
                                                                                : "./avatars/placeholder-user.png"
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="inline">
                                                                    <h5>
                                                                        {e.name}
                                                                    </h5>
                                                                </div>
                                                                <div
                                                                    style={{
                                                                        float:
                                                                            "right",
                                                                    }}
                                                                    className="inline arrow"
                                                                >
                                                                    <button
                                                                        style={{
                                                                            margin:
                                                                                "0",
                                                                        }}
                                                                        type="button"
                                                                        className="yellow_btn"
                                                                        onClick={this.invite.bind(
                                                                            this,
                                                                            e
                                                                        )}
                                                                    >
                                                                        {e.is_invited
                                                                            ? "Added"
                                                                            : "Add"}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                )
                                            ) : (
                                                <div
                                                    style={{
                                                        color: "white",
                                                        width: "100%",
                                                        textAlign: "center",
                                                        marginTop: "25px",
                                                        marginBottom: "25px",
                                                    }}
                                                    className="flex"
                                                >
                                                    <p className="item-author text-color">
                                                        No users available
                                                    </p>
                                                </div>
                                            )}
                                            <div className="full_btn mt50">
                                                <button
                                                    className="blue_btn"
                                                    type="button"
                                                    onClick={() =>
                                                        this.setState({
                                                            inviteUsersModel: false,
                                                        })
                                                    }
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CModalBody>
                    </CModal>

                    <CModal
                        show={this.state.inviteFriendsModel}
                        closeOnBackdrop={false}
                        onClose={() =>
                            this.setState({ inviteFriendsModel: false })
                        }
                        color="danger"
                        centered
                    >
                        <CModalBody className="model-bg">
                            <div>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() =>
                                        this.setState({
                                            inviteFriendsModel: false,
                                        })
                                    }
                                >
                                    <span aria-hidden="true">
                                        <img src="./murabbo/img/close.svg" />
                                    </span>
                                </button>
                                <div className="model_data">
                                    <div className="model-title">
                                        <h3>Invite Friends</h3>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-10 offset-md-1">
                                            <div className="search2">
                                                <input
                                                    placeholder="Search By keywords"
                                                    onChange={this.handleChange.bind(
                                                        this
                                                    )}
                                                    type="text"
                                                />
                                                <i className="bx bx-search"></i>
                                            </div>
                                            <h3
                                                style={{
                                                    color: "#FCD274",
                                                    textAlign: "left",
                                                    fontSize: "14px",
                                                    paddingTop: "20px",
                                                }}
                                            >
                                                In This Room
                                            </h3>
                                            <div className="cus_scroll">
                                                {this.state.data
                                                    .invitedUserDetails.length >
                                                0 ? (
                                                    this.state.data.invitedUserDetails.map(
                                                        (e, key) => {
                                                            return (
                                                                <div className="participate-list">
                                                                    <div className="inline">
                                                                        <img
                                                                            src={
                                                                                e.image
                                                                                    ? e.image
                                                                                    : "./avatars/placeholder-user.png"
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="inline">
                                                                        <h5>
                                                                            {
                                                                                e.name
                                                                            }
                                                                        </h5>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <div
                                                        style={{
                                                            color: "white",
                                                            width: "100%",
                                                            textAlign: "center",
                                                            marginTop: "25px",
                                                            marginBottom:
                                                                "25px",
                                                        }}
                                                        className="flex"
                                                    >
                                                        <p className="item-author text-color">
                                                            No users available
                                                        </p>
                                                    </div>
                                                )}

                                                <h3
                                                    style={{
                                                        color: "#FCD274",
                                                        textAlign: "left",
                                                        fontSize: "14px",
                                                        paddingTop: "20px",
                                                    }}
                                                >
                                                    Invite Here
                                                </h3>

                                                {this.state.userListInvite
                                                    .length > 0 ? (
                                                    this.state.userListInvite.map(
                                                        (e, key) => {
                                                            return (
                                                                <div className="participate-list">
                                                                    <div className="inline">
                                                                        <img
                                                                            src={
                                                                                e.image
                                                                                    ? e.image
                                                                                    : "./avatars/placeholder-user.png"
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="inline">
                                                                        <h5>
                                                                            {
                                                                                e.name
                                                                            }
                                                                        </h5>
                                                                    </div>
                                                                    <div
                                                                        style={{
                                                                            float:
                                                                                "right",
                                                                        }}
                                                                        className="inline arrow"
                                                                    >
                                                                        <button
                                                                            style={{
                                                                                margin:
                                                                                    "0",
                                                                            }}
                                                                            type="button"
                                                                            disabled={this.state.isLoading}
                                                                            className="yellow_btn"
                                                                            onClick={this.invite.bind(
                                                                                this,
                                                                                e
                                                                            )}
                                                                        >

{this.state.isLoading ? 
 (<><span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Loading...</>) : (


    e.is_invited
        ? "Invited"
        : "Invite"
 )}
                                                                            
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <div
                                                        style={{
                                                            color: "white",
                                                            width: "100%",
                                                            textAlign: "center",
                                                            marginTop: "25px",
                                                            marginBottom:
                                                                "25px",
                                                        }}
                                                        className="flex"
                                                    >
                                                        <p className="item-author text-color">
                                                            No users available
                                                        </p>
                                                    </div>
                                                )}

                                                <h3
                                                    style={{
                                                        color: "#FCD274",
                                                        textAlign: "left",
                                                        fontSize: "14px",
                                                        paddingTop: "20px",
                                                    }}
                                                >
                                                    Invite Contacts
                                                </h3>
                                                <div className="participate-list">
                                                    <div className="inline">
                                                        <img src="murabbo/img/team-3.jpg" />
                                                    </div>
                                                    <div className="inline">
                                                        <h5>Zen Lee Ho</h5>
                                                    </div>
                                                    <div
                                                        style={{
                                                            float: "right",
                                                        }}
                                                        className="inline arrow"
                                                    >
                                                        <button
                                                            style={{
                                                                margin: "0",
                                                            }}
                                                            type="button"
                                                            className="yellow_btn"
                                                        >
                                                            Invite
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="full_btn mt50">
                                                <button
                                                    className="blue_btn"
                                                    type="button"
                                                    onClick={this.goToVideoChat.bind(
                                                        this
                                                    )}
                                                >
                                                    Let's Play
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CModalBody>
                    </CModal>
                </main>
            </>
        );
    }
}

export default Detail;
