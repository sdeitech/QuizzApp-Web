import React, { Component } from "react";
import { TheFooter, TheHeader, TheHeaderInner } from "../../containers/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import languages from "../../languages";
import configuration from "../../config";
import { reactLocalStorage } from "reactjs-localstorage";
import { CModal, CModalBody } from "@coreui/react";
let contestId, roomId;
class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        };

        // console.log(props);
    }
    componentDidMount() {
        console.log("componentDidMount");
        fetch(configuration.baseURL + "cms/cms?cmsCode=ABOUT_US", {
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
                if (data.data) {
                    this.setState({ data: data.data });
                }
            })
            .catch((error) => {
                console.log("error");
                console.log(error);
            });
    }

    createMarkup(text) {
        return { __html: this.state.data.description };
    }

    render() {
        return (
            <>
                {reactLocalStorage.get("is_login") === "true" ? (
                    <TheHeaderInner />
                ) : (
                    <TheHeader />
                )}
                <ToastContainer
                    position="top-right"
                    autoClose={25000}
                    style={{ top: "80px" }}
                />
                <main id="main">
                    <section>
                        <div className="container">
                            <div className="create-contest">
                                <div className="contest-title">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="main_title">
                                                <h3>About us</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="contest-info">
                                <div className="row cms_box">
                                    <div className="col-12">
                                        <div
                                            className="text"
                                            dangerouslySetInnerHTML={this.createMarkup()}
                                        />
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

export default AboutUs;
