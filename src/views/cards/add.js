import React, { Component } from "react";
import { TheFooter, TheHeaderInner } from "../../containers/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import configuration from "../../config";
import { reactLocalStorage } from "reactjs-localstorage";

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            fields: {
                card_name: "",
                card_number: "",
                exp_month_year: "",
                cvc: "",
            },
            errors: {},
        };
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    handleSubmit() {
        let fields = this.state.fields;
        let formIsValid = true;

        let errors = {};
        if (
            fields["card_name"] !== undefined &&
            fields["card_name"].trim() === ""
        ) {
            errors["card_name"] = "Please enter title";
            formIsValid = false;
        }
        if (
            fields["card_number"] !== undefined &&
            fields["card_number"].trim() === ""
        ) {
            errors["card_number"] = "Please enter card number";
            formIsValid = false;
        }
        if (
            fields["exp_month_year"] !== undefined &&
            fields["exp_month_year"].trim() === ""
        ) {
            errors["exp_month_year"] = "Please enter expiration date";
            formIsValid = false;
        } else {
            if (fields["exp_month_year"] !== undefined) {
                var d = fields["exp_month_year"];
                var pattern1 = /^(0[1-9]|1[012])\-\d{4}$/;
                var pattern2 = /^(0[1-9]|1[012])\/\d{4}$/;
                if (!pattern1.test(d) && !pattern2.test(d)) {
                    errors["exp_month_year"] =
                        "Please enter proper expiration date (e.g 02/2025)";
                    formIsValid = false;
                }
            }
        }
        if (fields["cvc"] !== undefined && fields["cvc"].trim() === "") {
            errors["cvc"] = "Please enter security code";
            formIsValid = false;
        }

        this.setState({ errors: errors });

        if (formIsValid) {
            var date = fields["exp_month_year"].split("/");
            var userId = JSON.parse(reactLocalStorage.get("userData")).userId;

            var postdata = {
                user_id: userId,
                type: "add",
                card_name: fields["card_name"],
                card_number: fields["card_number"],
                exp_month: date[0],
                exp_year: date[1],
                cvc: fields["cvc"],
            };

            this.setState({ isLoading: true });
            fetch(configuration.baseURL + "card/managecards", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer " + reactLocalStorage.get("clientToken"),
                },
                body: JSON.stringify(postdata),
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    if (data.code === 200) {
                        this.setState({ isLoading: false });
                        this.props.history.push("/cards");
                    } else {
                        this.setState({ isLoading: false });
                        return toast.error(data.message);
                    }
                });
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
                                        <div class="col-md-12">
                                            <div class="main_title">
                                                <h3>Add New Card</h3>
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
                                    <div class="col-lg-6 col-md-6 col-sm-6">
                                        <div class="cus_input input_wrap mt-3">
                                            <img src="./murabbo/img/title.svg" />{" "}
                                            <input
                                                type="text"
                                                required
                                                name=""
                                                onChange={this.handleChange.bind(
                                                    this,
                                                    "card_name"
                                                )}
                                                value={
                                                    this.state.fields[
                                                        "card_name"
                                                    ]
                                                }
                                            />
                                            <label>Name on Card</label>
                                        </div>
                                        <span className="error-msg">
                                            {this.state.errors["card_name"]}
                                        </span>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6">
                                        <div class="cus_input input_wrap mt-3">
                                            <img src="./murabbo/img/credit-card.svg" />{" "}
                                            <input
                                                type="text"
                                                required
                                                name=""
                                                onChange={this.handleChange.bind(
                                                    this,
                                                    "card_number"
                                                )}
                                                value={
                                                    this.state.fields[
                                                        "card_number"
                                                    ]
                                                }
                                            />
                                            <label>Card Number</label>
                                        </div>
                                        <span className="error-msg">
                                            {this.state.errors["card_number"]}
                                        </span>
                                    </div>
                                    <div class="col-lg-3 col-md-6 col-sm-6">
                                        <div class="cus_input input_wrap mt-3">
                                            <img src="./murabbo/img/calendar.svg" />{" "}
                                            <input
                                                type="text"
                                                required
                                                name=""
                                                onChange={this.handleChange.bind(
                                                    this,
                                                    "exp_month_year"
                                                )}
                                                value={
                                                    this.state.fields[
                                                        "exp_month_year"
                                                    ]
                                                }
                                            />
                                            <label>Expiration Date</label>
                                        </div>
                                        <span className="error-msg">
                                            {
                                                this.state.errors[
                                                    "exp_month_year"
                                                ]
                                            }
                                        </span>
                                    </div>
                                    <div class="col-lg-3 col-md-6 col-sm-6">
                                        <div class="cus_input input_wrap mt-3">
                                            <img src="./murabbo/img/security.svg" />{" "}
                                            <input
                                                type="text"
                                                required
                                                name=""
                                                onChange={this.handleChange.bind(
                                                    this,
                                                    "cvc"
                                                )}
                                                value={this.state.fields["cvc"]}
                                            />
                                            <label>Security Code</label>
                                        </div>
                                        <span className="error-msg">
                                            {this.state.errors["cvc"]}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="contest-info">
                                <div class="contest-title">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="footer-btn">
                                                <button
                                                    class="blue_btn"
                                                    type="button"
                                                    disabled={
                                                        this.state.isLoading
                                                    }
                                                    onClick={this.handleSubmit.bind(
                                                        this
                                                    )}
                                                >
                                                    {this.state.isLoading ? (
                                                        <>
                                                            <span
                                                                className="spinner-border spinner-border-sm mr-2"
                                                                role="status"
                                                                aria-hidden="true"
                                                            ></span>
                                                            Loading...
                                                        </>
                                                    ) : (
                                                        "Submit"
                                                    )}
                                                </button>
                                                <button
                                                    class="yellow_btn"
                                                    type="button"
                                                    style={{
                                                        marginLeft: "10px",
                                                    }}
                                                    onClick={() => {
                                                        this.props.history.push(
                                                            "/cards"
                                                        );
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                        <div
                                            style={{ textAlign: "center" }}
                                            class="col-md-12 mt-3"
                                        >
                                            <p style={{ color: "grey" }}>
                                                Your credit card information are
                                                stored securely and encrypted
                                                with Murabbo.
                                            </p>
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

export default Add;
