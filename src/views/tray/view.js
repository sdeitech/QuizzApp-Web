import React, { Component } from "react";
import { TheFooter, TheHeaderInner } from "../../containers/index";
import configuration from "../../config";
import "react-toastify/dist/ReactToastify.css";
import { reactLocalStorage } from "reactjs-localstorage";
import { CModal, CModalBody } from "@coreui/react";
import { ToastContainer, toast } from "react-toastify";
import humanizeDuration from "humanize-duration";
import "react-toastify/dist/ReactToastify.css";
import $ from "jquery";
import RLDD from "react-list-drag-and-drop/lib/RLDD";
let contest_id;
let round_id;
class RoundTray extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isexitImage: "",
            is_display_cross: false,
            fields: {
                timeLimitSeconds: 30,
                timeLimit: "00:30",
                execution_mode: 1,
                onDemandNegativePoints: 10,
                hint: "",
                entriesPerRound: 4,
                type: "2",
                noOfQuestions: 3,
                basePoints: 100,
            },
            errors: {},
            openModelRoundAdd: false,
            confirmationModel: false,
            saveEndConfirmationModel: false,
            openModel: false,
            qtyAdd: false,
            wordModel: false,
            tempSelectedGrid: 4,
            qty: 1,
            timeLimit: "00:00",
            delete_id: "",
            contest_id: "",
            listArr: [],
            selectedType: [],
            gameTypeArr: [
                {
                    type: "Hangman",
                    name: "HangMan",
                    src: "./murabbo/img/hangman.svg",
                    qtyAdd: false,
                    qty: 1,
                    class: "contest-box",
                },
                {
                    type: "MatchIt",
                    name: "Match It",
                    src: "./murabbo/img/cups.svg",
                    qtyAdd: false,
                    qty: 1,
                    class: "contest-box purple-bg",
                },
                {
                    type: "Unscramble",
                    name: "Unscramble",
                    src: "./murabbo/img/unscramble.svg",
                    qtyAdd: false,
                    qty: 1,
                    class: "contest-box dark-pink",
                },
                {
                    type: "GuessAndGo",
                    name: "Guess & Go",
                    src: "./murabbo/img/brain.svg",
                    qtyAdd: false,
                    qty: 1,
                    class: "contest-box coffee-bg",
                },
                {
                    type: "Gibberish",
                    name: "Gibberish",
                    src: "./murabbo/img/giberish.svg",
                    qtyAdd: false,
                    qty: 1,
                    class: "contest-box light-pink",
                },
                {
                    type: "Bingo",
                    name: "Bingo",
                    // this.state.gameTypeArr.splice(4,1);
                    // this.state.gameTypeArr.splice(6,1);
                    // this.state.gameTypeArr.splice(7,1);
                    qty: 1,
                    class: "contest-box green-bg",
                },
                {
                    type: "Quiz",
                    name: "Quiz",
                    src: "./murabbo/img/quizz.svg",
                    qtyAdd: false,
                    qty: 1,
                    class: "contest-box yellow-bg",
                },
                {
                    type: "Taboo",
                    name: "Taboo",
                    src: "./murabbo/img/padlock.svg",
                    qtyAdd: false,
                    qty: 1,
                    class: "contest-box lightgreen",
                },
                {
                    type: "Blank",
                    name: "Blank",
                    src: "./murabbo/img/more.svg",
                    qtyAdd: false,
                    qty: 1,
                    class: "contest-box grey-bg",
                },
            ],
        };
    }

    componentDidMount() {
        var url = window.location.href;
        contest_id = url.substring(url.lastIndexOf("/") + 1);
        this.setState({ contest_id: contest_id });
        this.getList(contest_id);
        this.getContest(contest_id);
    }

    handleRLDDChange(newItems) {
        this.setState({ listArr: newItems });
        var sortingList = [];
        for (var i = 0; i < newItems.length; i++) {
            sortingList.push({ roundId: newItems[i]["_id"], displayOrder: i });
        }

        var postData = JSON.stringify({ sortingList: sortingList });
        fetch(configuration.baseURL + "round/sorting", {
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
                this.getList(contest_id);
            });
    }

    getList(contest_id1) {
        if (contest_id) {
            fetch(
                configuration.baseURL + "round/round?contestId=" + contest_id1,
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
                        var data = data.data;
                        for (var i = 0; i < data.length; i++) {
                            data[i]["id"] = i;
                        }

                        if (data.playerType == 1) {
                            console.log("Dddd");
                        }
                        this.setState({ listArr: data });
                    } else {
                        this.setState({ listArr: [] });
                    }
                });
        }
    }
    getContest(contest_id1) {
        if (contest_id) {
            fetch(
                configuration.baseURL +
                    "contest/contest?contestId=" +
                    contest_id1,
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
                        let data1 = data.data;

                        if (data1[0].playerType == 1) {
                            this.state.gameTypeArr =
                                this.state.gameTypeArr.filter((e, i) => {
                                    return (
                                        e.type == "Hangman" ||
                                        e.type == "MatchIt" ||
                                        e.type == "Unscramble" ||
                                        e.type == "GuessAndGo" ||
                                        e.type == "Quiz"
                                    );
                                });
                        }
                    } else {
                    }
                });
        }
    }

    clickHandler(field, e) {
        for (var i = 0; i < this.state.gameTypeArr.length; i++) {
            if (this.state.gameTypeArr[i].type === field) {
                this.state.selectedType.push(field);
                this.setState({ selectedType: this.state.selectedType });
                this.state.gameTypeArr[i].qtyAdd =
                    !this.state.gameTypeArr[i].qtyAdd;
                if (this.state.gameTypeArr[i].qtyAdd === false) {
                    var selectedType = this.state.selectedType;
                    selectedType = selectedType.filter(function (
                        value,
                        index,
                        arr
                    ) {
                        if (value !== field) {
                            return value;
                        }
                    });
                    this.setState({ selectedType: selectedType });
                }
            } else {
                // this.state.gameTypeArr[i].qtyAdd = false;
            }
        }
        this.setState({ gameTypeArr: this.state.gameTypeArr });
    }

    btnClickHandler(type, e) {
        if (type === "minus") {
            this.changeTime(-5);
        } else {
            this.changeTime(5);
        }
    }

    btnPlusMinusClickHandler(type, field, e) {
        for (var i = 0; i < this.state.gameTypeArr.length; i++) {
            if (this.state.gameTypeArr[i].type === field) {
                if (type === "minus") {
                    var qty = this.state.gameTypeArr[i].qty;
                    this.state.gameTypeArr[i].qty = qty === 1 ? 1 : qty - 1;
                    this.setState({ gameTypeArr: this.state.gameTypeArr });
                } else {
                    var qty = this.state.gameTypeArr[i].qty;
                    this.state.gameTypeArr[i].qty = qty === 9 ? 9 : qty + 1;
                    this.setState({ gameTypeArr: this.state.gameTypeArr });
                }
            }
        }
    }

    submitHandler() {
        let postRoundArr = [];

        for (var i = 0; i < this.state.gameTypeArr.length; i++) {
            if (
                this.state.selectedType.includes(this.state.gameTypeArr[i].type)
            ) {
                let qty = this.state.gameTypeArr[i].qty;
                this.state.gameTypeArr[i].qtyAdd = false;
                this.state.gameTypeArr[i].qty = 1;
                var obj = {};
                obj.noOfRounds = qty;
                obj.gameType = this.state.gameTypeArr[i].type;
                postRoundArr.push(obj);
            }
        }

        var postData = {};
        postData.contestId = this.state.contest_id;
        postData.multipleRounds = postRoundArr;
        // console.log(postData);
        fetch(configuration.baseURL + "round/round", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + reactLocalStorage.get("clientToken"),
            },
            body: JSON.stringify(postData),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.code === 200) {
                    this.setState({ openModelRoundAdd: false });
                    this.getList(contest_id);
                    this.setState({
                        selectedType: [],
                        gameTypeArr: this.state.gameTypeArr,
                    });
                } else {
                    return toast.error(data.message);
                }
            });
    }

    deleteHandler(id = "", e) {
        if (this.state.delete_id) {
            fetch(
                configuration.baseURL + "round/round/" + this.state.delete_id,
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
                        this.getList(contest_id);
                        this.setState({
                            delete_id: "",
                            confirmationModel: false,
                        });
                    } else {
                        return toast.error(data.message);
                    }
                });
        } else {
            this.setState({ delete_id: id, confirmationModel: true });
        }
    }

    editHandler(data, e) {
        round_id = data.id;
        if (data.image) {
            this.setState({ is_display_cross: true });
        }

        if (!data.timeLimit) {
            data.timeLimit = "00:30";
            data.timeLimitSeconds = 30;
        } else {
            var currentTime = parseInt(data.timeLimit);
            var seconds = (currentTime % 60).toString(); //get the seconds using the modulus operator and convert to a string (so we can use length below)
            var minute = Math.floor(currentTime / 60).toString(); // get the hours and convert to a string

            //make sure we've got the right length for the seconds string
            if (seconds.length === 0) {
                seconds = "00";
            } else if (seconds.length === 1) {
                seconds = "0" + seconds;
            }

            if (minute.length === 0) {
                minute = "00";
            } else if (minute.length === 1) {
                minute = "0" + minute;
            }

            if (data.gameType === "Blank") {
                if (parseInt(minute) === 15 || parseInt(minute) > 15) {
                    minute = "15";
                    seconds = "00";
                } else if (parseInt(minute) === 0 && parseInt(seconds) === 0) {
                    minute = "00";
                    seconds = "30";
                } else {
                    minute = minute;
                    seconds = seconds;
                }
            } else {
                if (parseInt(minute) === 5 || parseInt(minute) > 5) {
                    minute = "05";
                    seconds = "00";
                } else if (parseInt(minute) === 0 && parseInt(seconds) === 0) {
                    minute = "00";
                    seconds = "30";
                } else {
                    minute = minute;
                    seconds = seconds;
                }
            }

            data.timeLimit = minute + ":" + seconds;
            data.timeLimitSeconds = currentTime;
        }

        if (!data.basePoints) {
            data.basePoints = 100;
        }

        if (!data.negativeBasePoints) {
            data.negativeBasePoints = 50;
        }
        if (!data.onDemandNegativePoints) {
            data.onDemandNegativePoints = 25;
        }
        if (data.hint == 1) {
            data.negativeScoring = true;
        }
        if (data.hint == 1) {
            data.hint = 3;
            data.scoring = 2;
        }

        if (data.gameType === "MatchIt" || data.gameType === "Bingo") {
            console.log(111);
            if (!data.entriesPerRound) {
                data.entriesPerRound = 4;
            }
            if (!data.type || data.type === "text") {
                data.type = "1";
            }
            if (!data.noOfQuestions) {
                data.noOfQuestions = 3;
            }
            setTimeout(function () {
                $(".GridRadio").each(function () {
                    var trueOrFalse =
                        Number($(this).attr("id")) ===
                        Number(data.entriesPerRound)
                            ? true
                            : false;
                    console.log(trueOrFalse);
                    $(this).prop("checked", trueOrFalse);
                });
            }, 1000);
        }

        this.setState({ openModel: !this.state.openModel, fields: data });
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        if (field === "negativeScoring") {
            fields[field] = e.target.checked;
        } else {
            if (field === "execution_mode") {
                fields[field] = parseInt(e.target.value);
            } else {
                fields[field] = e.target.value;
            }
        }
        if (field === "basePoints") {
            fields["negativeBasePoints"] = 0;
            fields["onDemandNegativePoints"] = 0;
        }

        if (field === "execution_mode" && e.target.value !== 1) {
            fields["negativeScoring"] = false;
        }
        this.setState({ fields });

        let errors = {};
        if (field === "title" && fields["title"].trim() === "") {
            errors["title"] = "Please enter title";
        }

        if (field === "execution_mode" && !fields["execution_mode"]) {
            errors["execution_mode"] = "Please select execution mode";
        }

        if (field === "renderingMode" && !fields["renderingMode"]) {
            errors["renderingMode"] = "Please select rendering mode";
        }

        if (field === "scoring" && !fields["scoring"]) {
            errors["scoring"] = "Please select scoring";
        }

        this.setState({ errors: errors });
    }

    updateRoundHandler(type = "", e) {
        let fields = this.state.fields;
        let formIsValid = true;

        let errors = {};

        if (this.state.fields["gameType"] === "Blank") {
            // if( this.state.fields.timeLimitSeconds >901 ){
            //     errors["time"] = "Please enter time less 15 minutes";
            //     formIsValid = false;
            // }
        }
        if (fields["title"].trim() === "") {
            errors["title"] = "Please enter title";
            formIsValid = false;
        }

        if (!fields["execution_mode"]) {
            errors["execution_mode"] = "Please select execution mode";
            formIsValid = false;
        }

        if (!fields["renderingMode"]) {
            errors["renderingMode"] = "Please select rendering mode";
            formIsValid = false;
        }

        if (!fields["scoring"]) {
            errors["scoring"] = "Please select scoring";
            formIsValid = false;
        }
        this.setState({ errors: errors });

        if (formIsValid) {
            // console.log(JSON.parse(reactLocalStorage.get('userData')).userId);
            const data = new FormData();
            data.append("id", this.state.fields._id);
            data.append("title", this.state.fields.title);
            data.append("description", this.state.fields.description);
            data.append("execution_mode", this.state.fields.execution_mode);
            data.append("renderingMode", this.state.fields.renderingMode);
            data.append("scoring", this.state.fields.scoring);
            data.append("negativeScoring", this.state.fields.negativeScoring);
            data.append("timeLimit", this.state.fields.timeLimitSeconds);
            data.append("basePoints", this.state.fields.basePoints);
            data.append(
                "negativeBasePoints",
                this.state.fields.negativeBasePoints
            );
            if (
                this.state.fields.execution_mode === 1 ||
                this.state.fields.execution_mode === "1"
            ) {
                data.append("hint", this.state.fields.hint);
                data.append(
                    "onDemandNegativePoints",
                    this.state.fields.onDemandNegativePoints
                );
            }
            if (this.state.fields.image === "image") {
                data.append("image", this.uploadInput.files[0]);
            } else {
                data.append("image", "");
                // if(this.state.isexitImage !== ""){
                //         data.append('image',this.state.isexitImage);
                // }else{
                //     data.append('image','');
                // }
            }

            if (type === "Bingo" || type === "MatchIt") {
                data.append(
                    "entriesPerRound",
                    this.state.fields.entriesPerRound
                );
                data.append("type", this.state.fields.type);
                data.append("noOfQuestions", this.state.fields.noOfQuestions);
            }

            // console.log(data);
            fetch(
                configuration.baseURL + "round/round/" + this.state.fields._id,
                {
                    method: "PUT",
                    headers: {
                        contentType: "application/json",
                        Authorization:
                            "Bearer " + reactLocalStorage.get("clientToken"),
                    },
                    body: data,
                }
            )
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    if (data.code === 200) {
                        this.getList(contest_id);

                        if (type === "roundquestion") {
                            this.props.history.push(
                                "/roundquestion/" + contest_id + "/" + e
                            );
                        } else if (
                            type === "Hangman" ||
                            type === "Unscramble" ||
                            type === "Gibberish"
                        ) {
                            this.props.history.push(
                                "/round_words/" + contest_id + "/" + e
                            );
                        } else if (type === "Bingo" || type === "MatchIt") {
                            if (
                                (type === "Bingo" &&
                                    this.state.fields.type === 3) ||
                                this.state.fields.type === "3"
                            ) {
                                return false;
                            } else {
                                this.props.history.push(
                                    "/question_type/" + contest_id + "/" + e
                                );
                            }
                        }
                        this.setState({ openModel: !this.state.openModel });
                    } else {
                        return toast.error(data.message);
                    }
                });
        }
    }

    handleUploadProfile(type, ev) {
        let fields = this.state.fields;
        fields["image"] = "image";
        this.setState({ fields });
        // console.log(this.uploadInput.files)
    }

    saveNextHandler(id, data, e) {
        if (
            data.gameType === "Hangman" ||
            data.gameType === "Unscramble" ||
            data.gameType === "Gibberish" ||
            data.gameType === "Bingo" ||
            data.gameType === "MatchIt"
        ) {
            this.updateRoundHandler(data.gameType, id);
        } else if (
            data.gameType === "Quiz" ||
            data.gameType === "GuessAndGo" ||
            data.gameType === "Taboo"
        ) {
            this.updateRoundHandler("roundquestion", id);
        }
    }

    saveExitHandler(check, e) {
        this.props.history.push("/contest");

        /*if (check) {
            this.props.history.push('/contest');
        }
        else
        {
            this.setState({saveEndConfirmationModel:true});
        }*/
    }

    className(type, returnVal) {
        for (var i = 0; i < this.state.gameTypeArr.length; i++) {
            if (this.state.gameTypeArr[i].type === type) {
                if (returnVal === "class") {
                    return this.state.gameTypeArr[i].class;
                } else {
                    return this.state.gameTypeArr[i].src;
                }
            }
        }
    }

    changeTime(sec) {
        if (this.state.fields["gameType"] === "Blank") {
            var fields = this.state.fields;
            var currentTime = parseInt(fields.timeLimitSeconds),
                newTime = currentTime + sec, //calculate the new time
                seconds = (newTime % 60).toString(), //get the seconds using the modulus operator and convert to a string (so we can use length below)
                minute = Math.floor(newTime / 60).toString(); // get the hours and convert to a string

            //make sure we've got the right length for the seconds string
            if (seconds.length === 0) {
                seconds = "00";
            } else if (seconds.length === 1) {
                seconds = "0" + seconds;
            }

            if (minute.length === 0) {
                minute = "00";
            } else if (minute.length === 1) {
                minute = "0" + minute;
            }

            if (parseInt(minute) === 15 || parseInt(minute) > 15) {
                minute = "15";
                seconds = "00";
                newTime = 900;
            } else if (
                parseInt(minute) < 1 &&
                (parseInt(seconds) === 0 || parseInt(seconds) < 30)
            ) {
                minute = "00";
                seconds = "30";
                newTime = 30;
            }

            fields["timeLimit"] = minute + ":" + seconds;
            fields["timeLimitSeconds"] = newTime;
            this.setState({ fields });

            // if (parseInt(minute) === 15 || parseInt(minute) > 15) {

            //     return;
            // }
        } else {
            var fields = this.state.fields;
            var currentTime = parseInt(fields.timeLimitSeconds),
                newTime = currentTime + sec, //calculate the new time
                seconds = (newTime % 60).toString(), //get the seconds using the modulus operator and convert to a string (so we can use length below)
                minute = Math.floor(newTime / 60).toString(); // get the hours and convert to a string

            //make sure we've got the right length for the seconds string
            if (seconds.length === 0) {
                seconds = "00";
            } else if (seconds.length === 1) {
                seconds = "0" + seconds;
            }

            if (minute.length === 0) {
                minute = "00";
            } else if (minute.length === 1) {
                minute = "0" + minute;
            }

            if (parseInt(minute) === 5 || parseInt(minute) > 5) {
                minute = "05";
                seconds = "00";
                newTime = 300;
            } else if (
                parseInt(minute) < 1 &&
                (parseInt(seconds) === 0 || parseInt(seconds) < 30)
            ) {
                minute = "00";
                seconds = "30";
                newTime = 30;
            }

            fields["timeLimit"] = minute + ":" + seconds;
            fields["timeLimitSeconds"] = newTime;
            this.setState({ fields });
        }
    }

    handleChangeGrid(data, e) {
        console.log(e.target.checked);
        console.log(data);
        let fields = this.state.fields;

        if (e.target.checked) {
            fields["entriesPerRound"] = data;
            this.setState({ fields });
            $(".GridRadio").each(function () {
                var trueOrFalse =
                    Number($(this).attr("id")) === Number(data) ? true : false;
                $(this).prop("checked", trueOrFalse);
            });
        } else {
            fields["entriesPerRound"] = 4;
            this.setState({ fields });
            $(".GridRadio").each(function () {
                var trueOrFalse =
                    Number($(this).attr("id")) === 4 ? true : false;
                $(this).prop("checked", trueOrFalse);
            });
        }
    }

    removeImage(event) {
        event.stopPropagation();
        $(".display-profile-pic").hide();
        $(".file-upload").val("");
        $("#start").show();
        var fields = this.state.fields;

        if (fields["image"] !== "") {
            this.setState({ isexitImage: fields["image"] });
            // console.log(this.state.exitImage);
        }
        fields["image"] = "";
        this.setState({ fields });
    }

    render() {
        $(document).ready(function () {
            var readURL = function (input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        // console.log(e.target.result);
                        $(".display-profile-pic").attr("src", e.target.result);
                        $(".display-profile-pic").show();
                        $("#start").hide();
                    };
                    reader.readAsDataURL(input.files[0]);
                }
            };
            $(".file-upload").on("change", function () {
                readURL(this);
            });
            $(".upload-button").on("click", function () {
                $(".file-upload").click();
            });

            $(".display-profile-pic").show();
        });

        const MAX_LENGTH = 30;
        return (
            <>
                <TheHeaderInner />
                <main id="main">
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        style={{ top: "80px" }}
                    />
                    <section id="contest" className="d-flex align-items-center">
                        <div className="container">
                            <div className="create-contest">
                                <div className="contest-title">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="main_title">
                                                <h3>Rounds</h3>
                                            </div>
                                        </div>
                                        <div className="col-md-8"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="contest-info">
                                {/*<div className="row">
			                            <div className="col-md-8 offset-md-2">
			                                <div className="progressbar">
			                                    <div className="inner-progress">
			                                        <p>Contest Info</p>
			                                    </div>
			                                    <div className="inner-progress2">
			                                        <p>Round Tray</p>
			                                    </div>
			                                </div>
			                            </div>
		                            </div>*/}
                                <div className="row round-box">
                                    {this.state.listArr.length > 0 ? (
                                        <RLDD
                                            items={this.state.listArr}
                                            itemRenderer={(val, index) => {
                                                return (
                                                    <div className="custom-round-list">
                                                        <div
                                                            className={this.className(
                                                                val.gameType,
                                                                "class"
                                                            )}
                                                            style={{
                                                                height: "170px",
                                                            }}
                                                        >
                                                            <img
                                                                className="placeholder"
                                                                src="./murabbo/img/placeholder.svg"
                                                                alt=""
                                                                onClick={this.editHandler.bind(
                                                                    this,
                                                                    val
                                                                )}
                                                                style={{
                                                                    cursor: "pointer",
                                                                }}
                                                            />
                                                            <img
                                                                className="con-close"
                                                                src="./murabbo/img/close-white2.svg"
                                                                alt=""
                                                                onClick={this.deleteHandler.bind(
                                                                    this,
                                                                    val._id
                                                                )}
                                                            />
                                                            <img
                                                                className="ico"
                                                                src={this.className(
                                                                    val.gameType,
                                                                    "src"
                                                                )}
                                                                alt=""
                                                                onClick={this.editHandler.bind(
                                                                    this,
                                                                    val
                                                                )}
                                                                style={{
                                                                    cursor: "pointer",
                                                                }}
                                                            />
                                                            <h3
                                                                onClick={this.editHandler.bind(
                                                                    this,
                                                                    val
                                                                )}
                                                                style={{
                                                                    cursor: "pointer",
                                                                }}
                                                            >
                                                                {val.gameType}
                                                            </h3>
                                                            <p
                                                                onClick={this.editHandler.bind(
                                                                    this,
                                                                    val
                                                                )}
                                                                style={{
                                                                    cursor: "pointer",
                                                                    color: "#000",
                                                                    font: "normal normal 14px Montserrat",
                                                                }}
                                                            >
                                                                {`${val.title.substring(
                                                                    0,
                                                                    MAX_LENGTH
                                                                )}`}
                                                                {val.title
                                                                    .length >
                                                                MAX_LENGTH
                                                                    ? "..."
                                                                    : ""}
                                                                <br />

                                                                {val.totalQuestions ==
                                                                0
                                                                    ? null
                                                                    : val.totalQuestions ==
                                                                      1
                                                                    ? val.totalQuestions +
                                                                      "  Question"
                                                                    : val.totalQuestions +
                                                                      "  Questions"}
                                                                {val.gameType ==
                                                                "Blank"
                                                                    ? humanizeDuration(
                                                                          val.timeLimit *
                                                                              1000
                                                                      )
                                                                    : null}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            }}
                                            onChange={this.handleRLDDChange.bind(
                                                this
                                            )}
                                        />
                                    ) : (
                                        <div
                                            style={{
                                                color: "white",
                                                width: "100%",
                                                textAlign: "center",
                                                marginTop: "85px",
                                                marginBottom: "85px",
                                            }}
                                            className="flex"
                                        >
                                            <p className="item-author text-color">
                                                No have any round
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div
                                    className="row"
                                    style={{ marginBottom: "20px" }}
                                >
                                    <div className="col-md-8 offset-md-2">
                                        <div className="footer-btn">
                                            <button
                                                className="blue_btn light_blue_btn"
                                                style={{ letterSpacing: "2px" }}
                                                type="button"
                                                onClick={() =>
                                                    this.setState({
                                                        openModelRoundAdd: true,
                                                    })
                                                }
                                            >
                                                Add Rounds
                                            </button>
                                            <button
                                                className="pink_btn"
                                                type="button"
                                                style={{ letterSpacing: "2px" }}
                                                onClick={this.saveExitHandler.bind(
                                                    this,
                                                    false
                                                )}
                                            >
                                                Save & Exit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <CModal
                        size="lg"
                        show={this.state.openModel}
                        onClose={() => {
                            this.setState({ openModel: !this.state.openModel });
                            this.componentDidMount();
                        }}
                        color="danger"
                        centered
                    >
                        <CModalBody className="model-bg">
                            <div>
                                <div className="modal-body">
                                    <button
                                        type="button"
                                        className="close"
                                        onClick={() => {
                                            this.setState({ openModel: false });
                                            this.componentDidMount();
                                        }}
                                    >
                                        <span aria-hidden="true">
                                            <img
                                                alt=""
                                                src="./murabbo/img/close.svg"
                                            />
                                        </span>
                                    </button>
                                    <div className="model_data">
                                        <div className="model-title">
                                            <h3>Round Details</h3>
                                            <h4>
                                                {this.state.fields["gameType"]}
                                            </h4>
                                        </div>
                                        <div className="contest">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="profile-img">
                                                        <form
                                                            id="file-upload-form"
                                                            className="uploader"
                                                        >
                                                            <input
                                                                id="file-upload"
                                                                type="file"
                                                                name="fileUpload"
                                                                className="file-upload"
                                                                accept="image/*"
                                                                onChange={this.handleUploadProfile.bind(
                                                                    this,
                                                                    "image"
                                                                )}
                                                                ref={(ref) => {
                                                                    this.uploadInput =
                                                                        ref;
                                                                }}
                                                            />
                                                            {this.state.fields[
                                                                "image"
                                                            ] == "image" ||
                                                            this.state.fields[
                                                                "image"
                                                            ] ? (
                                                                <span aria-hidden="true">
                                                                    <img
                                                                        alt=""
                                                                        className="close_svg"
                                                                        src="./murabbo/img/close_dark.svg"
                                                                        onClick={this.removeImage.bind(
                                                                            this
                                                                        )}
                                                                    />
                                                                </span>
                                                            ) : null}
                                                            <label
                                                                for="file-upload"
                                                                id="file-drag"
                                                            >
                                                                <img
                                                                    id="file-image"
                                                                    src="#"
                                                                    alt="Preview"
                                                                    className="hidden"
                                                                />
                                                                <img
                                                                    className="display-profile-pic"
                                                                    src={
                                                                        this
                                                                            .state
                                                                            .fields[
                                                                            "image"
                                                                        ]
                                                                    }
                                                                    alt=""
                                                                />
                                                                <div id="start">
                                                                    {this.state
                                                                        .fields[
                                                                        "image"
                                                                    ] === "" ? (
                                                                        <div>
                                                                            <img
                                                                                className="profile-pic"
                                                                                src="./murabbo/img/upload.svg"
                                                                                alt=""
                                                                            />

                                                                            <div id="add_image">
                                                                                Add
                                                                                Image
                                                                            </div>
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                                <div
                                                                    id="response"
                                                                    className="hidden"
                                                                >
                                                                    <div id="messages"></div>
                                                                </div>
                                                            </label>
                                                        </form>
                                                    </div>
                                                    <span className="error-msg">
                                                        {
                                                            this.state.errors[
                                                                "image"
                                                            ]
                                                        }
                                                    </span>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="cus_input input_wrap">
                                                        <img
                                                            src="./murabbo/img/title.svg"
                                                            alt="Upload"
                                                        />{" "}
                                                        <input
                                                            type="text"
                                                            required
                                                            name=""
                                                            onChange={this.handleChange.bind(
                                                                this,
                                                                "title"
                                                            )}
                                                            value={
                                                                this.state
                                                                    .fields[
                                                                    "title"
                                                                ]
                                                            }
                                                        />
                                                        <label>Title</label>
                                                    </div>
                                                    <span className="error-msg">
                                                        {
                                                            this.state.errors[
                                                                "title"
                                                            ]
                                                        }
                                                    </span>
                                                    <div className="cus_input input_wrap">
                                                        <img
                                                            src="./murabbo/img/des.svg"
                                                            alt="Upload"
                                                        />{" "}
                                                        <input
                                                            type="text"
                                                            required
                                                            onChange={this.handleChange.bind(
                                                                this,
                                                                "description"
                                                            )}
                                                            name=""
                                                            value={
                                                                this.state
                                                                    .fields[
                                                                    "description"
                                                                ]
                                                            }
                                                        />
                                                        <label>
                                                            Description
                                                        </label>
                                                    </div>
                                                    {this.state.fields[
                                                        "gameType"
                                                    ] === "Blank" ? null : (
                                                        <div className="cus_input input_wrap">
                                                            <img
                                                                src="./murabbo/img/book.svg"
                                                                alt="Upload"
                                                            />
                                                            <select
                                                                className="floating-select"
                                                                onChange={this.handleChange.bind(
                                                                    this,
                                                                    "execution_mode"
                                                                )}
                                                                value={
                                                                    this.state
                                                                        .fields[
                                                                        "execution_mode"
                                                                    ]
                                                                }
                                                                required
                                                            >
                                                                <option value="1">
                                                                    Assigned
                                                                </option>
                                                                <option value="2">
                                                                    Competitive
                                                                </option>
                                                            </select>
                                                            <label>
                                                                Execution Mode
                                                            </label>
                                                        </div>
                                                    )}

                                                    <span className="error-msg">
                                                        {
                                                            this.state.errors[
                                                                "execution_mode"
                                                            ]
                                                        }
                                                    </span>

                                                    {this.state.fields[
                                                        "gameType"
                                                    ] === "Bingo" ||
                                                    this.state.fields[
                                                        "gameType"
                                                    ] === "MatchIt" ? (
                                                        <div>
                                                            <div className="cus_input grid_cus_input">
                                                                <label>
                                                                    Grid Size
                                                                </label>
                                                                <div className="contest saveToIdDiv row grid">
                                                                    <div className="checkbox-buttons-container">
                                                                        <input
                                                                            type="checkbox"
                                                                            name="GridRadio"
                                                                            class="GridRadio"
                                                                            id="4"
                                                                            value="4"
                                                                            onChange={this.handleChangeGrid.bind(
                                                                                this,
                                                                                "4"
                                                                            )}
                                                                        />
                                                                        <label for="4">
                                                                            <div className="cat_title checked_title">
                                                                                <h3>
                                                                                    4
                                                                                </h3>
                                                                            </div>
                                                                        </label>
                                                                    </div>

                                                                    <div className="checkbox-buttons-container">
                                                                        <input
                                                                            type="checkbox"
                                                                            name="GridRadio"
                                                                            class="GridRadio"
                                                                            id="5"
                                                                            value="5"
                                                                            onChange={this.handleChangeGrid.bind(
                                                                                this,
                                                                                "5"
                                                                            )}
                                                                        />
                                                                        <label for="5">
                                                                            <div className="cat_title checked_title">
                                                                                <h3>
                                                                                    5
                                                                                </h3>
                                                                            </div>
                                                                        </label>
                                                                    </div>

                                                                    <div className="checkbox-buttons-container">
                                                                        <input
                                                                            type="checkbox"
                                                                            name="GridRadio"
                                                                            class="GridRadio"
                                                                            id="8"
                                                                            value="8"
                                                                            onChange={this.handleChangeGrid.bind(
                                                                                this,
                                                                                "8"
                                                                            )}
                                                                        />
                                                                        <label for="8">
                                                                            <div className="cat_title checked_title">
                                                                                <h3>
                                                                                    8
                                                                                </h3>
                                                                            </div>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="cus_input input_wrap">
                                                                <img
                                                                    src="./murabbo/img/score.svg"
                                                                    alt="Upload"
                                                                />
                                                                <select
                                                                    className="floating-select"
                                                                    onChange={this.handleChange.bind(
                                                                        this,
                                                                        "type"
                                                                    )}
                                                                    value={
                                                                        this
                                                                            .state
                                                                            .fields[
                                                                            "type"
                                                                        ]
                                                                    }
                                                                    required
                                                                >
                                                                    <option value="1">
                                                                        Text
                                                                    </option>
                                                                    <option value="2">
                                                                        Image
                                                                    </option>
                                                                    {this.state
                                                                        .fields[
                                                                        "gameType"
                                                                    ] ===
                                                                    "Bingo" ? (
                                                                        <option value="3">
                                                                            Number
                                                                        </option>
                                                                    ) : null}
                                                                </select>
                                                                <label>
                                                                    {
                                                                        this
                                                                            .state
                                                                            .fields[
                                                                            "gameType"
                                                                        ]
                                                                    }{" "}
                                                                    type
                                                                </label>
                                                            </div>
                                                            {this.state.fields[
                                                                "gameType"
                                                            ] === "MatchIt" ? (
                                                                <div>
                                                                    <div
                                                                        style={{
                                                                            margin: "0px 0 5px 0",
                                                                        }}
                                                                        className="cus_input "
                                                                    >
                                                                        <label
                                                                            style={{
                                                                                paddingLeft:
                                                                                    "5px",
                                                                            }}
                                                                            className="cus_label"
                                                                        >
                                                                            Number
                                                                            of
                                                                            Questions{" "}
                                                                        </label>
                                                                    </div>
                                                                    <div className="range-wrap">
                                                                        <input
                                                                            min="3"
                                                                            max="100"
                                                                            step="1"
                                                                            type="range"
                                                                            className="range"
                                                                            id="range"
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .fields[
                                                                                    "noOfQuestions"
                                                                                ]
                                                                            }
                                                                            onChange={this.handleChange.bind(
                                                                                this,
                                                                                "noOfQuestions"
                                                                            )}
                                                                        />
                                                                        <output className="bubble">
                                                                            {
                                                                                this
                                                                                    .state
                                                                                    .fields[
                                                                                    "noOfQuestions"
                                                                                ]
                                                                            }
                                                                        </output>
                                                                    </div>
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    ) : null}
                                                </div>

                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    {this.state.fields[
                                                        "execution_mode"
                                                    ] === 1 ? (
                                                        <div>
                                                            <div
                                                                style={{
                                                                    margin: "0px 0 5px 0",
                                                                }}
                                                                className="cus_input "
                                                            >
                                                                <img
                                                                    src="./murabbo/img/clock.svg"
                                                                    alt="Upload"
                                                                />{" "}
                                                                <label className="cus_label">
                                                                    Time Limit
                                                                </label>
                                                            </div>
                                                            <div className="number">
                                                                <span
                                                                    className="minus"
                                                                    style={{
                                                                        cursor: "pointer",
                                                                    }}
                                                                >
                                                                    <img
                                                                        alt=""
                                                                        src="./murabbo/img/minus.svg"
                                                                        onClick={this.btnClickHandler.bind(
                                                                            this,
                                                                            "minus"
                                                                        )}
                                                                    />
                                                                </span>
                                                                <input
                                                                    type="text"
                                                                    style={{
                                                                        letterSpacing:
                                                                            "4px",
                                                                    }}
                                                                    value={
                                                                        this
                                                                            .state
                                                                            .fields[
                                                                            "timeLimit"
                                                                        ]
                                                                    }
                                                                />
                                                                <span
                                                                    className="plus"
                                                                    style={{
                                                                        cursor: "pointer",
                                                                    }}
                                                                >
                                                                    <img
                                                                        alt=""
                                                                        src="./murabbo/img/plus.svg"
                                                                        onClick={this.btnClickHandler.bind(
                                                                            this,
                                                                            "plus"
                                                                        )}
                                                                    />
                                                                </span>
                                                            </div>

                                                            <span className="error-msg">
                                                                {
                                                                    this.state
                                                                        .errors[
                                                                        "time"
                                                                    ]
                                                                }
                                                            </span>

                                                            {this.state.fields[
                                                                "gameType"
                                                            ] ===
                                                            "Blank" ? null : (
                                                                <div>
                                                                    <div
                                                                        style={{
                                                                            margin: "0px 0 5px 0",
                                                                        }}
                                                                        className="cus_input "
                                                                    >
                                                                        <label
                                                                            style={{
                                                                                paddingLeft:
                                                                                    "5px",
                                                                            }}
                                                                            className="cus_label"
                                                                        >
                                                                            Base
                                                                            Points
                                                                            (0 -
                                                                            100)
                                                                        </label>
                                                                    </div>
                                                                    <div className="range-wrap">
                                                                        <input
                                                                            min="0"
                                                                            max="100"
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .fields[
                                                                                    "basePoints"
                                                                                ]
                                                                            }
                                                                            onChange={this.handleChange.bind(
                                                                                this,
                                                                                "basePoints"
                                                                            )}
                                                                            step={
                                                                                configuration.sliderScore
                                                                            }
                                                                            type="range"
                                                                            className="range"
                                                                            id="range"
                                                                        />
                                                                        <output className="bubble">
                                                                            {
                                                                                this
                                                                                    .state
                                                                                    .fields[
                                                                                    "basePoints"
                                                                                ]
                                                                            }
                                                                        </output>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {this.state.fields[
                                                                "gameType"
                                                            ] ===
                                                            "Blank" ? null : (
                                                                <div
                                                                    style={{
                                                                        margin: "0px 0 5px 0",
                                                                    }}
                                                                    className="cus_input "
                                                                >
                                                                    <label
                                                                        style={{
                                                                            paddingLeft:
                                                                                "5px",
                                                                        }}
                                                                        className="cus_label"
                                                                    >
                                                                        Negative
                                                                        Scoring{" "}
                                                                    </label>
                                                                    <div className="button-switch">
                                                                        <input
                                                                            type="checkbox"
                                                                            id="switch-orange"
                                                                            className="switch"
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .fields[
                                                                                    "negativeScoring"
                                                                                ]
                                                                            }
                                                                            checked={
                                                                                this
                                                                                    .state
                                                                                    .fields[
                                                                                    "negativeScoring"
                                                                                ]
                                                                            }
                                                                            onChange={this.handleChange.bind(
                                                                                this,
                                                                                "negativeScoring"
                                                                            )}
                                                                        />
                                                                        <label
                                                                            for="switch-orange"
                                                                            className="lbl-off"
                                                                        ></label>
                                                                        <label
                                                                            for="switch-orange"
                                                                            className="lbl-on"
                                                                        ></label>
                                                                    </div>
                                                                    <img
                                                                        alt=""
                                                                        style={{
                                                                            left: "auto",
                                                                            top: "0px",
                                                                        }}
                                                                        src="./murabbo/img/info.svg"
                                                                    />
                                                                </div>
                                                            )}

                                                            {this.state.fields[
                                                                "gameType"
                                                            ] ===
                                                            "Blank" ? null : this
                                                                  .state.fields[
                                                                  "negativeScoring"
                                                              ] === true ? (
                                                                <div>
                                                                    <div
                                                                        style={{
                                                                            margin: "0px 0 5px 0",
                                                                        }}
                                                                        className="cus_input "
                                                                    >
                                                                        <label
                                                                            style={{
                                                                                paddingLeft:
                                                                                    "5px",
                                                                            }}
                                                                            className="cus_label"
                                                                        >
                                                                            Negative
                                                                            Base
                                                                            Points
                                                                            (0
                                                                            -&nbsp;
                                                                            {
                                                                                this
                                                                                    .state
                                                                                    .fields[
                                                                                    "basePoints"
                                                                                ]
                                                                            }
                                                                            )
                                                                        </label>
                                                                    </div>
                                                                    <div className="range-wrap">
                                                                        <input
                                                                            min="0"
                                                                            max={
                                                                                this
                                                                                    .state
                                                                                    .fields[
                                                                                    "basePoints"
                                                                                ]
                                                                            }
                                                                            step={
                                                                                configuration.sliderScore
                                                                            }
                                                                            type="range"
                                                                            className="range"
                                                                            id="range"
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .fields[
                                                                                    "negativeBasePoints"
                                                                                ]
                                                                            }
                                                                            onChange={this.handleChange.bind(
                                                                                this,
                                                                                "negativeBasePoints"
                                                                            )}
                                                                        />
                                                                        <output className="bubble">
                                                                            {
                                                                                this
                                                                                    .state
                                                                                    .fields[
                                                                                    "negativeBasePoints"
                                                                                ]
                                                                            }
                                                                        </output>
                                                                    </div>
                                                                </div>
                                                            ) : null}

                                                            {this.state.fields[
                                                                "gameType"
                                                            ] ===
                                                            "Blank" ? null : (
                                                                <div className="cus_input input_wrap">
                                                                    <img
                                                                        src="./murabbo/img/info2.svg"
                                                                        alt="Upload"
                                                                    />
                                                                    <select
                                                                        className="floating-select"
                                                                        onChange={this.handleChange.bind(
                                                                            this,
                                                                            "hint"
                                                                        )}
                                                                        value={
                                                                            this
                                                                                .state
                                                                                .fields[
                                                                                "hint"
                                                                            ]
                                                                        }
                                                                        required
                                                                    >
                                                                        <option value="2">
                                                                            Always
                                                                        </option>
                                                                        <option value="3">
                                                                            On
                                                                            demand
                                                                        </option>
                                                                    </select>
                                                                    <label>
                                                                        Show
                                                                        Hint
                                                                    </label>
                                                                </div>
                                                            )}

                                                            <span className="error-msg">
                                                                {
                                                                    this.state
                                                                        .errors[
                                                                        "hint"
                                                                    ]
                                                                }
                                                            </span>

                                                            {this.state.fields[
                                                                "gameType"
                                                            ] ==
                                                            "Blank" ? null : this
                                                                  .state.fields[
                                                                  "hint"
                                                              ] === 3 ||
                                                              this.state.fields[
                                                                  "hint"
                                                              ] === "3" ? (
                                                                <div>
                                                                    <div
                                                                        style={{
                                                                            margin: "0px 0 5px 0",
                                                                        }}
                                                                        className="cus_input "
                                                                    >
                                                                        <label
                                                                            style={{
                                                                                paddingLeft:
                                                                                    "5px",
                                                                            }}
                                                                            className="cus_label"
                                                                        >
                                                                            On
                                                                            Demand
                                                                            Negative
                                                                            Points
                                                                            (0
                                                                            -&nbsp;
                                                                            {
                                                                                this
                                                                                    .state
                                                                                    .fields[
                                                                                    "basePoints"
                                                                                ]
                                                                            }
                                                                            )
                                                                        </label>
                                                                    </div>
                                                                    <div className="range-wrap">
                                                                        <input
                                                                            min="0"
                                                                            max={
                                                                                this
                                                                                    .state
                                                                                    .fields[
                                                                                    "basePoints"
                                                                                ]
                                                                            }
                                                                            step={
                                                                                configuration.sliderScore
                                                                            }
                                                                            type="range"
                                                                            className="range"
                                                                            id="range"
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .fields[
                                                                                    "onDemandNegativePoints"
                                                                                ]
                                                                            }
                                                                            onChange={this.handleChange.bind(
                                                                                this,
                                                                                "onDemandNegativePoints"
                                                                            )}
                                                                        />
                                                                        <output className="bubble">
                                                                            {
                                                                                this
                                                                                    .state
                                                                                    .fields[
                                                                                    "onDemandNegativePoints"
                                                                                ]
                                                                            }
                                                                        </output>
                                                                    </div>
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    ) : null}

                                                    {this.state.fields[
                                                        "gameType"
                                                    ] !== "Hangman" &&
                                                    this.state.fields[
                                                        "gameType"
                                                    ] !== "Unscramble" &&
                                                    this.state.fields[
                                                        "gameType"
                                                    ] !== "Gibberish" &&
                                                    this.state.fields[
                                                        "gameType"
                                                    ] !== "Blank" ? (
                                                        <div>
                                                            <div className="cus_input input_wrap">
                                                                <img
                                                                    src="./murabbo/img/score.svg"
                                                                    alt="Upload"
                                                                />
                                                                <select
                                                                    className="floating-select"
                                                                    onChange={this.handleChange.bind(
                                                                        this,
                                                                        "scoring"
                                                                    )}
                                                                    value={
                                                                        this
                                                                            .state
                                                                            .fields[
                                                                            "scoring"
                                                                        ]
                                                                    }
                                                                    required
                                                                >
                                                                    <option value="1">
                                                                        Moderator
                                                                        Driven
                                                                    </option>

                                                                    {this.state
                                                                        .fields[
                                                                        "gameType"
                                                                    ] !==
                                                                    "Taboo" ? (
                                                                        <option value="2">
                                                                            Automatic
                                                                        </option>
                                                                    ) : null}
                                                                </select>
                                                                <label>
                                                                    Scoring
                                                                </label>
                                                            </div>
                                                            <span className="error-msg">
                                                                {
                                                                    this.state
                                                                        .errors[
                                                                        "scoring"
                                                                    ]
                                                                }
                                                            </span>
                                                        </div>
                                                    ) : null}

                                                    {this.state.fields[
                                                        "gameType"
                                                    ] === "Blank" ? null : (
                                                        <div className="cus_input input_wrap">
                                                            <img
                                                                src="./murabbo/img/3d.svg"
                                                                alt="Upload"
                                                            />
                                                            <select
                                                                className="floating-select"
                                                                onChange={this.handleChange.bind(
                                                                    this,
                                                                    "renderingMode"
                                                                )}
                                                                value={
                                                                    this.state
                                                                        .fields[
                                                                        "renderingMode"
                                                                    ]
                                                                }
                                                                required
                                                            >
                                                                <option value="1">
                                                                    Automatic
                                                                </option>
                                                                <option value="2">
                                                                    onClick
                                                                </option>
                                                            </select>
                                                            <label>
                                                                Rendering Mode
                                                            </label>
                                                        </div>
                                                    )}

                                                    <span className="error-msg">
                                                        {
                                                            this.state.errors[
                                                                "renderingMode"
                                                            ]
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                            {this.state.fields["gameType"] ===
                                            "Blank" ? (
                                                <div
                                                    style={{
                                                        marginTop: "50px",
                                                        textAlign: "center",
                                                        float: "left",
                                                    }}
                                                    className="col-lg-12 col-md-6 col-sm-12"
                                                >
                                                    <button
                                                        className="pink_btn"
                                                        type="button"
                                                        onClick={this.updateRoundHandler.bind(
                                                            this
                                                        )}
                                                    >
                                                        Save & Exit
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <div
                                                        style={{
                                                            marginTop: "50px",
                                                            textAlign: "center",
                                                            float: "left",
                                                        }}
                                                        className="col-lg-4 col-md-6 col-sm-12"
                                                    >
                                                        <button
                                                            style={{
                                                                minWidth:
                                                                    "150px",
                                                            }}
                                                            className="blue_btn light_blue_btn"
                                                            type="button"
                                                            onClick={this.saveNextHandler.bind(
                                                                this,
                                                                this.state
                                                                    .fields[
                                                                    "_id"
                                                                ],
                                                                this.state
                                                                    .fields
                                                            )}
                                                        >
                                                            Save & Next
                                                        </button>
                                                    </div>
                                                    <div
                                                        style={{
                                                            marginTop: "50px",
                                                            textAlign: "center",
                                                            float: "left",
                                                        }}
                                                        className="col-lg-4 col-md-6 col-sm-12"
                                                    >
                                                        <button
                                                            style={{
                                                                minWidth:
                                                                    "150px",
                                                            }}
                                                            className="yellow_btn"
                                                            type="button"
                                                        >
                                                            Generate Question
                                                        </button>
                                                    </div>
                                                    <div
                                                        style={{
                                                            marginTop: "50px",
                                                            textAlign: "center",
                                                            float: "left",
                                                        }}
                                                        className="col-lg-4 col-md-6 col-sm-12"
                                                    >
                                                        <button
                                                            className="pink_btn"
                                                            type="button"
                                                            onClick={this.updateRoundHandler.bind(
                                                                this
                                                            )}
                                                        >
                                                            Save & Exit
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CModalBody>
                    </CModal>

                    <CModal
                        size="lg"
                        show={this.state.openModelRoundAdd}
                        onClose={() =>
                            this.setState({
                                openModelRoundAdd:
                                    !this.state.openModelRoundAdd,
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
                                                openModelRoundAdd: false,
                                            })
                                        }
                                    >
                                        <span aria-hidden="true">
                                            <img
                                                alt=""
                                                src="./murabbo/img/close.svg"
                                            />
                                        </span>
                                    </button>
                                    <div className="model_data">
                                        <div className="model-title">
                                            <h3 style={{ color: "#f8c748" }}>
                                                Add Rounds
                                            </h3>
                                        </div>
                                        <div className="row round-box">
                                            {this.state.gameTypeArr.map(
                                                (e, key) => {
                                                    return (
                                                        <div className="col-lg-3 col-md-4 col-sm-6">
                                                            <div>
                                                                <div
                                                                    className={
                                                                        e.class
                                                                    }
                                                                    style={{
                                                                        cursor: "pointer",
                                                                    }}
                                                                    onClick={this.clickHandler.bind(
                                                                        this,
                                                                        e.type
                                                                    )}
                                                                >
                                                                    <img
                                                                        className="placeholder"
                                                                        src="./murabbo/img/placeholder.svg"
                                                                        alt=""
                                                                    />
                                                                    <img
                                                                        className="ico"
                                                                        src={
                                                                            e.src
                                                                        }
                                                                        alt=""
                                                                    />
                                                                    <h3>
                                                                        {e.name}
                                                                    </h3>
                                                                    <p></p>
                                                                </div>
                                                                {e.qtyAdd ? (
                                                                    <div className="number">
                                                                        <span
                                                                            className="minus"
                                                                            style={{
                                                                                cursor: "pointer",
                                                                            }}
                                                                        >
                                                                            <img
                                                                                alt=""
                                                                                src="./murabbo/img/minus.svg"
                                                                                onClick={this.btnPlusMinusClickHandler.bind(
                                                                                    this,
                                                                                    "minus",
                                                                                    e.type
                                                                                )}
                                                                            />
                                                                        </span>
                                                                        <input
                                                                            type="text"
                                                                            value="1"
                                                                            value={
                                                                                e.qty
                                                                            }
                                                                        />
                                                                        <span
                                                                            className="plus"
                                                                            style={{
                                                                                cursor: "pointer",
                                                                            }}
                                                                        >
                                                                            <img
                                                                                alt=""
                                                                                src="./murabbo/img/plus.svg"
                                                                                onClick={this.btnPlusMinusClickHandler.bind(
                                                                                    this,
                                                                                    "plus",
                                                                                    e.type
                                                                                )}
                                                                            />
                                                                        </span>
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            )}

                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                <div
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                    className=""
                                                >
                                                    <button
                                                        style={{
                                                            minWidth: "150px",
                                                        }}
                                                        className="yellow_btn"
                                                        type="button"
                                                        onClick={this.submitHandler.bind(
                                                            this
                                                        )}
                                                    >
                                                        Done
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CModalBody>
                    </CModal>
                    <CModal
                        show={this.state.confirmationModel}
                        closeOnBackdrop={false}
                        onClose={() =>
                            this.setState({ confirmationModel: false })
                        }
                        color="danger"
                        centered
                    >
                        <CModalBody className="model-bg">
                            <div>
                                <div className="modal-body">
                                    <div className="model_data">
                                        <div className="model-title">
                                            <img
                                                src="./murabbo/img/close_pink.png"
                                                alt=""
                                            />
                                            <h3>
                                                Are you sure you want to delete?
                                            </h3>
                                            {/* <h4>
                                                Are you sure,you want to delete
                                                this round?
                                            </h4> */}
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
                                                        }}
                                                        className="blue_btn"
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
                                                        className="pink_btn"
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

                    <CModal
                        show={this.state.saveEndConfirmationModel}
                        closeOnBackdrop={false}
                        onClose={() =>
                            this.setState({ saveEndConfirmationModel: false })
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
                                                saveEndConfirmationModel: false,
                                            })
                                        }
                                    >
                                        <span aria-hidden="true">
                                            <img
                                                alt=""
                                                src="./murabbo/img/close.svg"
                                            />
                                        </span>
                                    </button>
                                    <div className="model_data">
                                        <div className="model-title">
                                            <h3>Do you want to save?</h3>
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
                                                        }}
                                                        className="yellow_btn"
                                                        type="button"
                                                        onClick={this.saveExitHandler.bind(
                                                            this,
                                                            true
                                                        )}
                                                    >
                                                        Yes
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
                                                        className="pink_btn"
                                                        type="button"
                                                        onClick={() =>
                                                            this.setState({
                                                                saveEndConfirmationModel: false,
                                                            })
                                                        }
                                                    >
                                                        No
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CModalBody>
                    </CModal>

                    <CModal
                        show={this.state.wordModel}
                        closeOnBackdrop={false}
                        onClose={() => this.setState({ wordModel: false })}
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
                                            this.setState({ wordModel: false })
                                        }
                                    >
                                        <span aria-hidden="true">
                                            <img
                                                alt=""
                                                src="./murabbo/img/close.svg"
                                            />
                                        </span>
                                    </button>
                                    <div className="model_data">
                                        <div className="model-title">
                                            <h3
                                                style={{
                                                    textAlign: "left",
                                                    color: "#FFC542",
                                                }}
                                            >
                                                Round Words
                                            </h3>
                                        </div>

                                        <ul className="round-word">
                                            <li>Animal</li>
                                            <li>Entertainment</li>
                                            <li>Business</li>
                                            <li>Sports</li>
                                            <li>Food</li>
                                            <li>Art& Design</li>
                                            <li>Latest in Murabbo</li>
                                            <li>International</li>
                                            <li>History</li>
                                        </ul>

                                        <div className="full_btn">
                                            <button
                                                style={{ marginBottom: "15px" }}
                                                className="blue_btn"
                                                type="button"
                                            >
                                                Add More Words
                                            </button>
                                            <button
                                                style={{ marginBottom: "15px" }}
                                                className="yellow_btn"
                                                type="button"
                                                onClick={() =>
                                                    this.setState({
                                                        wordModel: false,
                                                    })
                                                }
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CModalBody>
                    </CModal>
                </main>
                <TheFooter />
            </>
        );
    }
}

export default RoundTray;
