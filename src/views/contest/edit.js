import React, { Component } from "react";
import { TheFooter, TheHeaderInner } from "../../containers/index";
import configuration from "../../config";
import "react-toastify/dist/ReactToastify.css";
import _ from "underscore";
import { reactLocalStorage } from "reactjs-localstorage";
import $ from "jquery";
import { CModal, CModalBody } from "@coreui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import languages from "../../languages";
let contest_id, user_id;

class EditContest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isexitImage:"",
            searchTerm: "",
            searchCategoryTerm: "",
            filterBrandList: [],
            filterCategoryList: [],
            mainLabels: [],
            loadLabels: [],
            mainSelectedCategories: [],
            categoryList: [],
            categoryListObj: [],
            categoryListSelected: [],
            categoryListTempSelected: [],
            categoryListObjDisplaySelected: [],
            brandList: [],
            brandListObj: [],
            brandListSelected: [],
            brandListTempSelected: [],
            brandListObjDisplaySelected: [],
            fields: {
                title: "",
                image: "",
                description: "",
                saveToTitle: "",
                saveToId: "",
                saveToTitle: "",
                brandIds: "",
                playerType: "1",
                visibility: "2",
            },
            errors: {},
            openModel: false,
            items: [],
            focused: false,
            input: "",
            openModelCategory: false,
            publishConfirmationModel: false,
            openModelBrand: false,
            openSaveToModel: false,
            confirmationModel: false,
            openLanguageModel: false,
            image: "avatars/placeholder-user.png",
            localArr: [],
            delete_id: "",
            publish_id: "",
            saveToList: [],
            tempSelectedSaveTo: {},
            tempSelectedLanguage: {},
            saveToTitle: "",
            subscriptionModel: false,
        };
        this.searchUpdated = this.searchUpdated.bind(this);
        this.searchUpdatedCategory = this.searchUpdatedCategory.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
    }

    componentDidMount() {
        console.log("componentDidMount")
        var url = window.location.href;
        contest_id = url.substring(url.lastIndexOf("/") + 1);
        user_id = JSON.parse(reactLocalStorage.get("userData")).userId;

        var userId = JSON.parse(reactLocalStorage.get("userData")).userId;

        fetch(configuration.baseURL + "user/saveTo?userId=" + userId, {
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
                this.setState({ saveToList: data.data.saveTo });
            });

            fetch(configuration.baseURL +"contest/contest?contestId=" +contest_id +"&userId=" +user_id,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer " + reactLocalStorage.get("clientToken"),
                },
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if (data.data.length > 0) {
                    this.setState({ items: data.data[0].hashtag });
                    var that = this;
                    setTimeout(function () {
                        that.setState({ fields: data.data[0] });
                        that.setCategory(data.data[0].categoryIds);
                        that.setBrand(data.data[0].brandIds);
                    }, 1000);

                    
                    let selectedCategoryIds = _.pluck(data.data[0].categoryIds,'categoryId');
                    fetch(configuration.baseURL + "category/categoryList", {
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
                            let mainSelectedCategories = [];
                            let mainLabels = data.data;
                            _.each(mainLabels, function(item, index) {
                                _.each(item.categories, function(itemCat, indexCat) {
                                    mainLabels[index]["categories"][indexCat]['is_selected'] = _.contains(selectedCategoryIds,itemCat._id) ? true : false;
                                    if(_.contains(selectedCategoryIds,itemCat._id)){
                                        mainSelectedCategories.push({
                                            categoryId: itemCat._id,
                                            mainLabelId: item.title,
                                            name: itemCat.name
                                        })
                                    }
                                })
                            })
                            console.log("Cat List.... ");
                            console.log(mainLabels);
                            this.setState({
                                mainLabels,
                                mainSelectedCategories,
                                loadLabels: mainLabels, 
                                categoryList: mainLabels,
                                filterCategoryList: mainLabels
                            });
                        });
                } else {
                    return toast.error(data.message);
                }
            });

        fetch(configuration.baseURL + "brand/brand", {
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
                var brandList = data.data;
                this.setState({
                    brandList: brandList,
                    filterBrandList: brandList,
                });
            });
    }

    handleOpenLanguageModel() {
        for (var i = 0; i < languages.languages.length; i++) {
            if (this.state.fields.language === languages.languages[i].name) {
                var tempSelectedLanguage = {};
                tempSelectedLanguage.name = languages.languages[i].name;
                this.setState({ tempSelectedLanguage: tempSelectedLanguage });
                var that = this;
                $(".languageRadio").each(function () {
                    var trueOrFalse =
                        $(this).attr("id") === that.state.fields.language
                            ? true
                            : false;
                    $(this).prop("checked", trueOrFalse);
                });
            }
        }

        $("body").addClass("modal-open");
        this.setState({ openLanguageModel: true });
    }

    handleChangeLanguage(data, e) {
        if (e.target.checked) {
            this.setState({ tempSelectedLanguage: data });
            $(".languageRadio").each(function () {
                var trueOrFalse =
                    $(this).attr("id") === data.name ? true : false;
                $(this).prop("checked", trueOrFalse);
            });
        } else {
            this.setState({ tempSelectedLanguage: { name: "English" } });
            $(".languageRadio").each(function () {
                var trueOrFalse =
                    $(this).attr("id") === "English" ? true : false;
                $(this).prop("checked", trueOrFalse);
            });
        }
    }

    handleSubmitLanguage(e) {
        if (this.state.tempSelectedLanguage.name !== undefined) {
            let fields = this.state.fields;
            fields.language = this.state.tempSelectedLanguage.name;
            this.setState({ fields });
        } else {
            let fields = this.state.fields;
            fields.language = "";
            this.setState({ fields });
        }
        this.setState({ openLanguageModel: false });
        $("body").removeClass("modal-open");
    }

    setBrand(data) {
        let brandList = this.state.brandList;
        let brandListObj = [];
        let brandListSelected = [];
        let displayArr = [];

        for (var i = 0; i < brandList.length; i++) {
            if (data.includes(brandList[i]._id)) {
                var obj = {};
                obj.id = brandList[i]._id;
                obj.name = brandList[i].name;
                displayArr.push(obj);
                brandListSelected.push(brandList[i]._id);
                brandListObj.push({
                    id: brandList[i]._id,
                    name: brandList[i].name,
                });
            }
        }

        this.setState({
            brandListObjDisplaySelected: displayArr,
            brandListSelected: brandListSelected,
            brandListObj: brandListObj,
        });

        let fields = this.state.fields;
        fields.brandIds = brandListSelected.join();
        this.setState({ fields });

        this.setState({
            searchTerm: "",
            searchCategoryTerm: "",
        });
        this.searchUpdatedCategory("");
        this.searchUpdated("");
    }
    setCategory(data) {
        let selectedCate = [];
        let categoryList = this.state.categoryList;
        let categoryListObj = [];
        let categoryListSelected = [];
        let displayArr = [];

        data.filter(function (value, index, arr) {
            selectedCate.push(value.categoryId);
        });

        for (var i = 0; i < categoryList.length; i++) {
            for (var k = 0; k < categoryList[i].categories.length; k++) {
                if (selectedCate.includes(categoryList[i].categories[k]._id)) {
                    categoryListObj.push({
                        categoryId: categoryList[i].categories[k]._id,
                        mainLabelId: categoryList[i].id,
                        name: categoryList[i].categories[k].name,
                    });

                    categoryListSelected.push(
                        categoryList[i].categories[k]._id
                    );
                    var obj = {};
                    obj.categoryId = categoryList[i].categories[k]._id;
                    obj.name = categoryList[i].categories[k].name;
                    displayArr.push(obj);
                }
            }
        }

        this.setState({
            categoryListObjDisplaySelected: displayArr,
            categoryListSelected: categoryListSelected,
            categoryListObj: categoryListObj,
        });

        let fields = this.state.fields;
        fields.categoryIds = JSON.stringify(categoryListObj);
        this.setState({ fields });

        this.setState({
            searchTerm: "",
            searchCategoryTerm: "",
        });
        this.searchUpdatedCategory("");
        this.searchUpdated("");
    }

    handleCloseClick(e) {
        $("body").removeClass("modal-open");
        this.setState({
            openModelCategory: false,
            openModelBrand: false,
            openSaveToModel: false,
            openLanguageModel: false,
            searchTerm: "",
            searchCategoryTerm: "",
        });
        this.searchUpdatedCategory("");
        this.searchUpdated("");

        this.setState({ tempSelectedSaveTo: {}, tempSelectedLanguage: {} });
        $(".saveToRadio").each(function () {
            $(this).prop("checked", false);
        });
        $(".languageRadio").each(function () {
            $(this).prop("checked", false);
        });
    }

    handleChangeSaveTo(data, e) {
        if (e.target.checked) {
            this.setState({ tempSelectedSaveTo: data });
            $(".saveToRadio").each(function () {
                var trueOrFalse =
                    $(this).attr("id") === data.saveToId ? true : false;
                $(this).prop("checked", trueOrFalse);
            });
        } else {
            this.setState({ tempSelectedSaveTo: {} });
            $(".saveToRadio").each(function () {
                $(this).prop("checked", false);
            });
        }
    }

    handleSubmitSaveTo(e) {
        if (this.state.tempSelectedSaveTo.saveToId !== undefined) {
            let fields = this.state.fields;
            fields.saveToId = this.state.tempSelectedSaveTo.saveToId;
            fields.saveToTitle = this.state.tempSelectedSaveTo.saveToTitle;
            this.setState({ fields });
        } else {
            let fields = this.state.fields;
            fields.saveToId = "";
            fields.saveToTitle = "";
            this.setState({ fields });
        }
        this.setState({ openSaveToModel: false });
        $("body").removeClass("modal-open");
    }

    handleOpenSaveToModel() {
        if (this.state.fields.saveToId !== undefined) {
            for (var i = 0; i < this.state.saveToList.length; i++) {
                if (
                    this.state.fields.saveToId ===
                    this.state.saveToList[i].saveToId
                ) {
                    var tempSelectedSaveTo = {};
                    tempSelectedSaveTo.saveToId = this.state.saveToList[
                        i
                    ].saveToId;
                    tempSelectedSaveTo.saveToTitle = this.state.saveToList[
                        i
                    ].saveToTitle;
                    this.setState({ tempSelectedSaveTo: tempSelectedSaveTo });
                    var that = this;
                    $(".saveToRadio").each(function () {
                        var trueOrFalse =
                            $(this).attr("id") === that.state.fields.saveToId
                                ? true
                                : false;
                        $(this).prop("checked", trueOrFalse);
                    });
                }
            }
        }
        $("body").addClass("modal-open");
        this.setState({ openSaveToModel: true });
    }

    handleOpenCategoryModel() {
        $("body").addClass("modal-open");
        let categoryListSelected = this.state.categoryListSelected;
        $(".categoryCheckbox").each(function () {
            $(this).prop(
                "checked",
                categoryListSelected.includes($(this).attr("id"))
            );
        });

        this.setState({
            openModelCategory: true,
            categoryListTempSelected: categoryListSelected,
        });
    }

    handleOpenBrandModel() {
        $("body").addClass("modal-open");
        let brandListSelected = this.state.brandListSelected;
        $(".brandCheckbox").each(function () {
            $(this).prop(
                "checked",
                brandListSelected.includes($(this).attr("id"))
            );
        });
        this.setState({
            openModelBrand: true,
            brandListTempSelected: brandListSelected,
        });
    }

    handleChangeCategory(catdata, maindata, e) {
        this.setState({ subscriptionModel: false });
        if (!configuration.checkUserHasAccess(catdata.subscriptionType)) {
            this.handleCloseClick(this);
            this.setState({ subscriptionModel: true });
            return false;
        }

        let loadLabels = this.state.loadLabels;
        _.each(loadLabels, function(item, index) {
            _.each(item.categories, function(itemCat, indexCat) {
                if(e.target.id === itemCat._id){
                    loadLabels[index]["categories"][indexCat]['is_selected'] = e.target.checked ? true : false;
                }
            })
        })

        this.setState({loadLabels})
        console.log(loadLabels);
    }

    handleSubmitCategory(e) {
        let mainSelectedCategories = [];
        _.each(this.state.mainLabels, function(item, index) {
            _.each(item.categories, function(itemCat, indexCat) {
                if(itemCat.is_selected){
                    mainSelectedCategories.push({
                        categoryId: itemCat._id,
                        mainLabelId: item.title,
                        name: itemCat.name
                    })
                }
            })
        })
        this.setState({mainSelectedCategories, openModelCategory: false})
    }

    handleChangeBrand(maindata, e) {
        let brandListTempSelected = this.state.brandListTempSelected;
        let brandListObj = this.state.brandListObj;
        if (e.target.checked) {
            brandListObj = brandListObj.filter(function (value, index, arr) {
                if (value.id !== maindata._id) {
                    return value;
                }
            });

            brandListObj.push({ id: maindata._id, name: maindata.name });
            brandListTempSelected.push(maindata._id);
        } else {
            brandListObj = brandListObj.filter(function (value, index, arr) {
                if (value.id !== maindata._id) {
                    return value;
                }
            });

            brandListTempSelected = brandListTempSelected.filter(function (
                value,
                index,
                arr
            ) {
                if (value !== maindata._id) {
                    return value;
                }
            });
        }
        this.setState({
            brandListObj: brandListObj,
            brandListTempSelected: brandListTempSelected,
        });

        $(".brandCheckbox").each(function () {
            $(this).prop(
                "checked",
                brandListTempSelected.includes($(this).attr("id"))
            );
        });
    }

    handleSubmitBrand(e) {
        let brandListObj = this.state.brandListObj;

        let brandListSelected = [];
        let displayArr = [];

        for (var i = 0; i < brandListObj.length; i++) {
            brandListSelected.push(brandListObj[i].id);
            var obj = {};
            obj.id = brandListObj[i].id;
            obj.name = brandListObj[i].name;
            displayArr.push(obj);
        }

        this.setState({
            brandListObjDisplaySelected: displayArr,
            brandListSelected: brandListSelected,
        });

        let fields = this.state.fields;
        fields.brandIds = brandListSelected.join();
        this.setState({ fields });

        this.setState({ openModelBrand: false });
        $("body").removeClass("modal-open");

        this.setState({
            searchTerm: "",
            searchCategoryTerm: "",
        });
        this.searchUpdatedCategory("");
        this.searchUpdated("");
    }

    handleRemoveCategory(data, e) {
        let mainSelectedCategories = this.state.mainSelectedCategories;
        mainSelectedCategories = _.reject(mainSelectedCategories, function(item){ return item.categoryId === data.categoryId; });

        let loadLabels = this.state.loadLabels;
        _.each(loadLabels, function(item, index) {
            _.each(item.categories, function(itemCat, indexCat) {
                if(itemCat._id === data.categoryId){
                   loadLabels[index]['categories'][indexCat]['is_selected'] = false;
                }
            })
        })
        this.setState({mainSelectedCategories,mainLabels: loadLabels, loadLabels})
    }

    handleRemoveBrand(data, e) {
        let brandListObj = this.state.brandListObj;
        let brandListObjDisplaySelected = this.state
            .brandListObjDisplaySelected;
        let brandListSelected = this.state.brandListSelected;
        brandListObj = brandListObj.filter(function (value, index, arr) {
            if (value.id !== data.id) {
                return value;
            } else {
                $("#" + data.id).prop("checked", false);
            }
        });
        brandListSelected = brandListSelected.filter(function (
            value,
            index,
            arr
        ) {
            if (value !== data.id) {
                return value;
            }
        });

        brandListObjDisplaySelected = brandListObjDisplaySelected.filter(
            function (value, index, arr) {
                if (value.id !== data.id) {
                    return value;
                }
            }
        );

        this.setState({
            brandListObj: brandListObj,
            brandListObjDisplaySelected: brandListObjDisplaySelected,
            brandListSelected: brandListSelected,
        });

        let fields = this.state.fields;
        fields.brandIds = JSON.stringify(brandListSelected);
        this.setState({ fields });
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });

        let errors = {};
        if (field === "title" && fields["title"].trim() === "") {
            errors["title"] = "Please enter title";
        }

        if (field === "visibility" && !fields["visibility"]) {
            errors["visibility"] = "Please select visibility";
        }

        if (field === "playerType" && !fields["playerType"]) {
            errors["playerType"] = "Please select player type";
        }
        this.setState({ errors: errors });
    }

    handleSubmit() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        fields.hashtag = this.state.items.join();

        this.setState({ fields });

        var categoryArr = (this.state.mainSelectedCategories.length > 0)
            ? this.state.mainSelectedCategories
            : [];

        if (fields["title"].trim() === "") {
            formIsValid = false;
            errors["title"] = "Please enter title";
        }

        if (!fields["visibility"]) {
            formIsValid = false;
            errors["visibility"] = "Please select visibility";
        }

        if (!fields["playerType"]) {
            formIsValid = false;
            errors["playerType"] = "Please select player type";
        }

        if (typeof categoryArr === "undefined" || categoryArr.length === 0) {
            formIsValid = false;
            errors["categoryIds"] = "Please select category";
        }
            
        this.setState({ errors: errors });
        if (formIsValid) {
            const data = new FormData();
            data.append("title", this.state.fields.title);
            data.append("description", this.state.fields.description);
            data.append("hashtag", this.state.fields.hashtag);
            data.append("language", this.state.fields.language);
            data.append("visibility", this.state.fields.visibility);
            data.append(
                "createdBy",
                JSON.parse(reactLocalStorage.get("userData")).userId
            );
            data.append("playerType", this.state.fields.playerType);
            data.append("saveToId", this.state.fields.saveToId);
            data.append("saveToTitle", this.state.fields.saveToTitle);
            data.append("categoryIds", JSON.stringify(categoryArr));
            data.append("brandIds", this.state.fields.brandIds);
            if (this.state.fields.image === "image") {
                data.append("image", this.uploadInput.files[0]);
            }else{
                data.append('image','');

                // if(this.state.isexitImage !== ""){
                //         data.append('image',this.state.isexitImage);    
                // }else{
                //     data.append('image','');
                // }
            }

            /*console.log(data);
            return false;*/

            fetch(configuration.baseURL + "contest/contest/" + contest_id, {
                method: "PUT",
                headers: {
                    contentType: "application/json",
                    Authorization:
                        "Bearer " + reactLocalStorage.get("clientToken"),
                },
                body: data,
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    if (data.code === 200) {
                        this.props.history.push({
                            pathname: "/tray/" + data.data._id,
                            state: { contest_id: data.data._id },
                        });
                    } else {
                        return toast.error(data.message);
                    }
                });
        }
    }

    handleInputChange(evt) {
        this.setState({ input: evt.target.value });
    }

    handleInputKeyDown(evt) {
        if (evt.keyCode === 13 && evt.target.value.trim() !== "") {
            const { value } = evt.target;
            var array = value.split(",");
            var itemsArr = this.state.items;
            for (var i = 0; i < array.length; i++) {
                if (array[i].trim() !== "") {
                    itemsArr.push(array[i]);
                }
            }
            this.setState({
                items: itemsArr,
                input: "",
            });
        }

        if (
            this.state.items.length &&
            evt.keyCode === 8 &&
            !this.state.input.length
        ) {
            this.setState((state) => ({
                items: state.items.slice(0, state.items.length - 1),
            }));
        }
    }

    handleRemoveItem(index) {
        return () => {
            this.setState((state) => ({
                items: state.items.filter((item, i) => i !== index),
            }));
        };
    }

    handleUploadProfile(type, ev) {
        let fields = this.state.fields;
        fields["image"] = "image";
        this.setState({ fields });
    }

    searchUpdated(term = "") {
        if (term !== "") {
            term = term.target.value;
        }
        let brandList = this.state.brandList;

        let filterBrandList = [];
        filterBrandList = brandList.filter(function (value, index, arr) {
            if (
                value.name.includes(term) ||
                value.name.toLowerCase().includes(term) ||
                value.name.toUpperCase().includes(term)
            ) {
                return value;
            }
        });

        if (term === "") {
            filterBrandList = brandList;
        }
        this.setState({ searchTerm: term, filterBrandList: filterBrandList });

        let that = this;
        setTimeout(function () {
            let brandListSelected = that.state.brandListSelected;
            $(".brandCheckbox").each(function () {
                $(this).prop(
                    "checked",
                    brandListSelected.includes($(this).attr("id"))
                );
            });
        }, 1000);
    }

    searchUpdatedCategory(e) {
        if(e.target){
            this.setState({searchCategoryTerm: e.target.value});
            if(e.target.value){
                let filterItems = [];
                _.each(this.state.loadLabels, function(item, index) {
                    let catArr = [];
                    _.each(item.categories, function(itemCat, indexCat) {
                        if(itemCat.name.includes(e.target.value) || itemCat.name.toLowerCase().includes(e.target.value) || itemCat.name.toUpperCase().includes(e.target.value)){
                            catArr.push(itemCat);
                        }
                    })

                    if(catArr.length > 0){
                        filterItems.push({
                            id: item.id,
                            title: item.title,
                            categories: catArr
                        })
                    }
                })
                this.setState({mainLabels: filterItems});
            } else {
                this.setState({mainLabels: this.state.loadLabels});
            }
        }
    }

    removeContestHandler(type = "") {
        if (this.state.delete_id !== "" && type === "delete") {
            fetch(configuration.baseURL + "contest/contest/" + contest_id, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    Authorization:
                        "Bearer " + reactLocalStorage.get("clientToken"),
                },
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    if (data.code === 200) {
                        this.props.history.push("/contest");
                    } else {
                        return toast.error(data.message);
                    }
                });
        } else {
            this.setState({ delete_id: contest_id, confirmationModel: true });
        }
    }

    publishContestHandler(type = "") {
        if (this.state.publish_id !== "" && type === "publish") {
            fetch(
                configuration.baseURL + "contest/publishContest/" + contest_id,
                {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
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
                        this.props.history.push("/contest");
                    } else {
                        return toast.error(data.message);
                    }
                });
        } else {
            this.setState({
                publish_id: contest_id,
                publishConfirmationModel: true,
            });
        }
    }

    removeImage(event) {
        event.stopPropagation();
        $(document).ready(function () {
        $(".display-profile-pic").attr("src", "avatars/placeholder.png");
        $(".file-upload").val("");  
        });
        let fields = this.state.fields;

        if(fields["image"] !== ""){
            this.setState({isexitImage:fields["image"]});
        // console.log(this.state.isexitImage);
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
                        $(".display-profile-pic").attr("src", e.target.result);
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
        });

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
                                                <h3>Contest Details</h3>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <ul className="title-link">
                                                {/*<li onClick={() => {this.props.history.push('/detail-contest');}} style={{ cursor:'pointer'}}><img src="./murabbo/img/play.svg" alt="Murabbo" /> Play</li>*/}
                                                <li
                                                    onClick={this.removeContestHandler.bind(
                                                        this
                                                    )}
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    <img
                                                        src="./murabbo/img/close2.svg"
                                                        alt="Murabbo"
                                                    />{" "}
                                                    Remove
                                                </li>
                                                <li
                                                    onClick={this.publishContestHandler.bind(
                                                        this
                                                    )}
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    <img
                                                        style={{
                                                            width: "17px",
                                                        }}
                                                        src="./murabbo/img/send.svg"
                                                        alt="Murabbo"
                                                    />{" "}
                                                    Publish
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="contest-info">
                                <div className="row">
                                    {/*<div className="col-md-8 offset-md-2">
			                                <div className="progressbar">
			                                    <div className="inner-progress">
			                                        <p>Contest Info</p>
			                                    </div>
			                                </div>
			                            </div>*/}
                                    <div className="col-lg-4 col-md-6 col-sm-12 marginTop_30px">
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
                                                        this.uploadInput = ref;
                                                    }}
                                                />

                                                {/* <span aria-hidden="true">
                                                    <img
                                                        style={{
                                                            position:
                                                                "absolute",
                                                            right: "20px",
                                                            top: "7px",
                                                            cursor: "pointer",
                                                        }}
                                                        src="./murabbo/img/close.svg"
                                                        onClick={this.removeImage.bind(
                                                            this
                                                        )}
                                                    />
                                                </span> */}

                                                {this.state.fields["image"] !==
                                                "" ? (
                                                    <span aria-hidden="true">
                                                        <img
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
                                                            this.state.fields[
                                                                "image"
                                                            ] !== ""
                                                                ? this.state
                                                                      .fields[
                                                                      "image"
                                                                  ]
                                                                : "avatars/placeholder.png"
                                                        }
                                                        alt=""
                                                    />

                                                    <div
                                                        id="response"
                                                        className="hidden"
                                                    >
                                                        <div id="messages"></div>
                                                    </div>
                                                </label>
                                            </form>
                                        </div>
                                        <span
                                            style={{ top: "0" }}
                                            className="error-msg"
                                        >
                                            {this.state.errors["image"]}
                                        </span>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 marginTop_30px">
                                        <div className="cus_input input_wrap">
                                            <img src="./murabbo/img/title.svg" />
                                            <input
                                                required
                                                type="text"
                                                onChange={this.handleChange.bind(
                                                    this,
                                                    "title"
                                                )}
                                                value={
                                                    this.state.fields["title"]
                                                }
                                            />
                                            <label>Title</label>
                                        </div>
                                        <span className="error-msg">
                                            {this.state.errors["title"]}
                                        </span>

                                        <div className="cus_input input_wrap">
                                            <img
                                                src="./murabbo/img/des.svg"
                                                alt="Murabbo"
                                            />{" "}
                                            <input
                                                required
                                                type="text"
                                                onChange={this.handleChange.bind(
                                                    this,
                                                    "description"
                                                )}
                                                value={
                                                    this.state.fields[
                                                        "description"
                                                    ]
                                                }
                                            />
                                            <label>Description</label>
                                        </div>
                                        <span className="error-msg">
                                            {this.state.errors["description"]}
                                        </span>

                                        <div className="cus_input input_wrap">
                                            <img
                                                src="./murabbo/img/hashtag.svg"
                                                alt="Murabbo"
                                            />
                                            <input
                                                type="text"
                                                required
                                                value={this.state.input}
                                                onChange={
                                                    this.handleInputChange
                                                }
                                                onKeyDown={
                                                    this.handleInputKeyDown
                                                }
                                            />
                                            <label>Hashtag</label>
                                        </div>
                                        <div className="add-category">
                                            {this.state.items.map((item, i) => (
                                                <div
                                                    className="category"
                                                    style={{
                                                        marginRight: "5px",
                                                        marginTop: "-15px",
                                                    }}
                                                >
                                                    <p>
                                                        {item}{" "}
                                                        <img
                                                            src="./murabbo/img/closewhite.svg"
                                                            onClick={this.handleRemoveItem(
                                                                i
                                                            )}
                                                            alt="Murabbo"
                                                        />
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                        <span className="error-msg">
                                            {this.state.errors["hashtag"]}
                                        </span>
                                        <div className="cus_input input_wrap floating-label">
                                            <img
                                                src="./murabbo/img/global.svg"
                                                alt="Murabbo"
                                            />
                                            <input
                                                type="text"
                                                required
                                                onClick={this.handleOpenLanguageModel.bind(
                                                    this
                                                )}
                                                value={
                                                    this.state.fields.language
                                                }
                                            />
                                            <label>Language</label>
                                        </div>
                                        <span className="error-msg">
                                            {this.state.errors["language"]}
                                        </span>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 marginTop_30px">
                                        <div className="cus_input input_wrap">
                                            <img
                                                src="./murabbo/img/saveto.svg"
                                                alt="Murabbo"
                                            />
                                            <input
                                                type="text"
                                                required
                                                onClick={this.handleOpenSaveToModel.bind(
                                                    this
                                                )}
                                                value={
                                                    this.state.fields
                                                        .saveToTitle
                                                }
                                            />
                                            <label>Save To</label>
                                        </div>
                                        <span className="error-msg">
                                            {this.state.errors["saveToId"]}
                                        </span>

                                        <div
                                            style={{ margin: "0px 0 5px 0" }}
                                            className="cus_input "
                                        >
                                            <img
                                                src="./murabbo/img/enable.svg"
                                                alt="Murabbo"
                                            />{" "}
                                            <label className="cus_label">
                                                Player Type
                                            </label>
                                        </div>
                                        <label className="control control--radio">
                                            Single
                                            {this.state.fields.playerType ===
                                            1 ? (
                                                <input
                                                    type="radio"
                                                    name="radio1"
                                                    value="1"
                                                    onChange={this.handleChange.bind(
                                                        this,
                                                        "playerType"
                                                    )}
                                                    checked
                                                />
                                            ) : (
                                                <input
                                                    type="radio"
                                                    name="radio1"
                                                    value="1"
                                                    onChange={this.handleChange.bind(
                                                        this,
                                                        "playerType"
                                                    )}
                                                />
                                            )}
                                            <div className="control__indicator"></div>
                                        </label>
                                        <label className="control control--radio">
                                            Multiplayer
                                            {this.state.fields.playerType ===
                                            2 ? (
                                                <input
                                                    type="radio"
                                                    name="radio1"
                                                    value="2"
                                                    onChange={this.handleChange.bind(
                                                        this,
                                                        "playerType"
                                                    )}
                                                    checked
                                                />
                                            ) : (
                                                <input
                                                    type="radio"
                                                    name="radio1"
                                                    value="2"
                                                    onChange={this.handleChange.bind(
                                                        this,
                                                        "playerType"
                                                    )}
                                                />
                                            )}
                                            <div className="control__indicator"></div>
                                        </label>
                                        <label>
                                            <span className="error-msg">
                                                {
                                                    this.state.errors[
                                                        "playerType"
                                                    ]
                                                }
                                            </span>
                                        </label>

                                        <div
                                            style={{ margin: "0px 0 5px 0" }}
                                            className="cus_input "
                                        >
                                            <img
                                                src="./murabbo/img/enable.svg"
                                                alt="Murabbo"
                                            />{" "}
                                            <label className="cus_label">
                                                Visibility
                                            </label>
                                        </div>
                                        <label className="control control--radio">
                                            All
                                            {this.state.fields.visibility ===
                                            2 ? (
                                                <input
                                                    type="radio"
                                                    name="radio"
                                                    value="2"
                                                    onChange={this.handleChange.bind(
                                                        this,
                                                        "visibility"
                                                    )}
                                                    checked
                                                />
                                            ) : (
                                                <input
                                                    type="radio"
                                                    name="radio"
                                                    value="2"
                                                    onChange={this.handleChange.bind(
                                                        this,
                                                        "visibility"
                                                    )}
                                                />
                                            )}
                                            <div className="control__indicator"></div>
                                        </label>
                                        <label className="control control--radio">
                                            Only Me
                                            {this.state.fields.visibility ===
                                            1 ? (
                                                <input
                                                    type="radio"
                                                    name="radio"
                                                    value="1"
                                                    onChange={this.handleChange.bind(
                                                        this,
                                                        "visibility"
                                                    )}
                                                    checked
                                                />
                                            ) : (
                                                <input
                                                    type="radio"
                                                    name="radio"
                                                    value="1"
                                                    onChange={this.handleChange.bind(
                                                        this,
                                                        "visibility"
                                                    )}
                                                />
                                            )}
                                            <div className="control__indicator"></div>
                                        </label>
                                        <label>
                                            <span className="error-msg">
                                                {
                                                    this.state.errors[
                                                        "visibility"
                                                    ]
                                                }
                                            </span>
                                        </label>
                                        <div className="add-category">
                                            <label>
                                                Choose Category{" "}
                                                <img
                                                    src="./murabbo/img/add.svg"
                                                    alt="Murabbo"
                                                    onClick={this.handleOpenCategoryModel.bind(
                                                        this
                                                    )}
                                                />
                                            </label>
                                            <br />

                                            {this.state.mainSelectedCategories.map(
                                                (e, key) => {
                                                    return (
                                                        <div
                                                            className="category"
                                                            style={{
                                                                marginRight:
                                                                    "5px",
                                                            }}
                                                        >
                                                            <p>
                                                                {e.name}
                                                                <img
                                                                    src="./murabbo/img/closewhite.svg"
                                                                    alt="Murabbo"
                                                                    onClick={this.handleRemoveCategory.bind(
                                                                        this,
                                                                        e
                                                                    )}
                                                                />
                                                            </p>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                        <span
                                            style={{ top: "0" }}
                                            className="error-msg"
                                        >
                                            {this.state.errors["categoryIds"]}
                                        </span>
                                        <div className="add-category">
                                            <label>
                                                Choose Brand{" "}
                                                <img
                                                    src="./murabbo/img/add.svg"
                                                    alt="Murabbo"
                                                    onClick={this.handleOpenBrandModel.bind(
                                                        this
                                                    )}
                                                />
                                            </label>
                                            <br />

                                            {this.state.brandListObjDisplaySelected.map(
                                                (e, key) => {
                                                    return (
                                                        <div
                                                            className="category"
                                                            style={{
                                                                marginRight:
                                                                    "5px",
                                                            }}
                                                        >
                                                            <p>
                                                                {e.name}
                                                                <img
                                                                    src="./murabbo/img/closewhite.svg"
                                                                    alt="Murabbo"
                                                                    onClick={this.handleRemoveBrand.bind(
                                                                        this,
                                                                        e
                                                                    )}
                                                                />
                                                            </p>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                        <span
                                            style={{ top: "0" }}
                                            className="error-msg"
                                        >
                                            {this.state.errors["brandIds"]}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="contest-info">
                                <div className="contest-title">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="footer-btn">
                                                <button
                                                    className="blue_btn light_blue_btn"
                                                    type="button"
                                                    onClick={this.handleSubmit.bind(
                                                        this
                                                    )}
                                                >
                                                    Save & Next
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <CModal
                        show={this.state.subscriptionModel}
                        closeOnBackdrop={false}
                        onClose={() =>
                            this.setState({ subscriptionModel: false })
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
                                                subscriptionModel: false,
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
                                                You need to purchase
                                                subscription.
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
                                                        }}
                                                        className="blue_btn"
                                                        type="button"
                                                        onClick={() =>
                                                            this.setState({
                                                                subscriptionModel: false,
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
                                                        onClick={() => {
                                                            this.props.history.push(
                                                                "/plans"
                                                            );
                                                        }}
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
                    <div
                        className={
                            this.state.openSaveToModel ? "stopScorll" : ""
                        }
                    >
                        <CModal
                            className="model"
                            size="lg"
                            show={this.state.openSaveToModel}
                            closeOnBackdrop={false}
                            onClose={this.handleCloseClick.bind(this)}
                            color="danger"
                            centered
                        >
                            <CModalBody className="model-bg">
                                <div>
                                    <div className="modal-body">
                                        <button
                                            type="button"
                                            className="close"
                                            onClick={this.handleCloseClick.bind(
                                                this
                                            )}
                                        >
                                            <span aria-hidden="true">
                                                <img src="./murabbo/img/close.svg" />
                                            </span>
                                        </button>
                                        <div className="model_data">
                                            <div className="model-title">
                                                <h3>Select SaveTo </h3>
                                            </div>
                                            <div className="contest saveToIdDiv row">
                                                {this.state.saveToList.length >
                                                0 ? (
                                                    this.state.saveToList.map(
                                                        (saveTo, key) => {
                                                            return (
                                                                <div className="col-lg-3 col-md-3 col-sm-3 checkbox-buttons-container">
                                                                    <input
                                                                        type="checkbox"
                                                                        name="saveToRadio"
                                                                        class="saveToRadio"
                                                                        id={
                                                                            saveTo.saveToId
                                                                        }
                                                                        value={
                                                                            saveTo.saveToId
                                                                        }
                                                                        onChange={this.handleChangeSaveTo.bind(
                                                                            this,
                                                                            saveTo
                                                                        )}
                                                                    />
                                                                    <label
                                                                        for={
                                                                            saveTo.saveToId
                                                                        }
                                                                    >
                                                                        <div className="cat_title checked_title">
                                                                            <h3>
                                                                                {
                                                                                    saveTo.saveToTitle
                                                                                }
                                                                            </h3>
                                                                        </div>
                                                                    </label>
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
                                                            marginTop: "100px",
                                                            marginBottom:
                                                                "100px",
                                                        }}
                                                        className="flex"
                                                    >
                                                        <p className="item-author text-color">
                                                            No save to available
                                                        </p>
                                                    </div>
                                                )}
                                                <div
                                                    style={{
                                                        marginTop: "25px",
                                                        textAlign: "center",
                                                    }}
                                                    class="col-lg-12 col-md-12 col-sm-12"
                                                >
                                                    <button
                                                        class="blue_btn light_blue_btn"
                                                        type="button"
                                                        onClick={this.handleSubmitSaveTo.bind(
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
                            </CModalBody>
                        </CModal>
                    </div>

                    <div
                        className={
                            this.state.openLanguageModel ? "stopScorll" : ""
                        }
                    >
                        <CModal
                            className="model"
                            size="lg"
                            show={this.state.openLanguageModel}
                            closeOnBackdrop={false}
                            onClose={this.handleCloseClick.bind(this)}
                            color="danger"
                            centered
                        >
                            <CModalBody className="model-bg">
                                <div>
                                    <div className="modal-body">
                                        <button
                                            type="button"
                                            className="close"
                                            onClick={this.handleCloseClick.bind(
                                                this
                                            )}
                                        >
                                            <span aria-hidden="true">
                                                <img src="./murabbo/img/close.svg" />
                                            </span>
                                        </button>
                                        <div className="model_data">
                                            <div className="model-title">
                                                <h3>Select Language </h3>
                                            </div>
                                            <div className="contest saveToIdDiv row">
                                                {languages.languages.length >
                                                0 ? (
                                                    languages.languages.map(
                                                        (language, key) => {
                                                            return (
                                                                <div className="col-lg-3 col-md-3 col-sm-3 checkbox-buttons-container">
                                                                    <input
                                                                        type="checkbox"
                                                                        name="languageRadio"
                                                                        class="languageRadio"
                                                                        id={
                                                                            language.name
                                                                        }
                                                                        value={
                                                                            language.name
                                                                        }
                                                                        onChange={this.handleChangeLanguage.bind(
                                                                            this,
                                                                            language
                                                                        )}
                                                                    />
                                                                    <label
                                                                        for={
                                                                            language.name
                                                                        }
                                                                    >
                                                                        <div className="cat_title checked_title">
                                                                            <h3>
                                                                                {
                                                                                    language.name
                                                                                }
                                                                            </h3>
                                                                        </div>
                                                                    </label>
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
                                                            marginTop: "100px",
                                                            marginBottom:
                                                                "100px",
                                                        }}
                                                        className="flex"
                                                    >
                                                        <p className="item-author text-color">
                                                            No language to
                                                            available
                                                        </p>
                                                    </div>
                                                )}
                                                <div
                                                    style={{
                                                        marginTop: "25px",
                                                        textAlign: "center",
                                                    }}
                                                    class="col-lg-12 col-md-12 col-sm-12"
                                                >
                                                    <button
                                                        class="blue_btn light_blue_btn"
                                                        type="button"
                                                        onClick={this.handleSubmitLanguage.bind(
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
                            </CModalBody>
                        </CModal>
                    </div>

                    <div
                        className={
                            this.state.openModelCategory ? "stopScorll" : ""
                        }
                    >
                        <CModal
                            className="model"
                            size="lg"
                            show={this.state.openModelCategory}
                            closeOnBackdrop={false}
                            onClose={this.handleCloseClick.bind(this)}
                            color="danger"
                            centered
                        >
                            <CModalBody className="model-bg">
                                <div>
                                    <div className="modal-body">
                                        <button
                                            type="button"
                                            className="close"
                                            onClick={this.handleCloseClick.bind(
                                                this
                                            )}
                                        >
                                            <span aria-hidden="true">
                                                <img src="./murabbo/img/close.svg" />
                                            </span>
                                        </button>
                                        <div className="model_data">
                                            <div className="model-title">
                                                <h3>Choose Category</h3>
                                            </div>
                                            <div className="contest">
                                                <div
                                                    class="col-12 search search-brand-cat"
                                                    style={{
                                                        marginBottom: "20px",
                                                    }}
                                                >
                                                    <input
                                                        type="text"
                                                        placeholder="Search Category"
                                                        value={
                                                            this.state
                                                                .searchCategoryTerm
                                                        }
                                                        onChange={this.searchUpdatedCategory.bind(
                                                            this
                                                        )}
                                                    />
                                                    <i className="bx bx-search"></i>
                                                </div>
                                                {this.state.mainLabels
                                                    .length > 0 ? (
                                                    this.state.mainLabels.map(
                                                        (e, key) => {
                                                            return (
                                                                <div className="row">
                                                                    <div className="col-8">
                                                                        <div className="cate-title">
                                                                            <p>
                                                                                {
                                                                                    e.title
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        {/*<div className="seeall">
								                                    <p>See All</p>
								                                </div>*/}
                                                                    </div>

                                                                    {e.categories.map(
                                                                        (
                                                                            cat,
                                                                            ckey
                                                                        ) => {
                                                                            return (
                                                                                <div className="col-lg-2 col-md-3 col-sm-3 checkbox-buttons-container">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        className="categoryCheckbox"
                                                                                        id={
                                                                                            cat._id
                                                                                        }
                                                                                        onChange={this.handleChangeCategory.bind(
                                                                                            this,
                                                                                            cat,
                                                                                            e
                                                                                        )}
                                                                                        checked={cat.is_selected ? "checked" : ""}
                                                                                    />
                                                                                    <label
                                                                                        for={
                                                                                            cat._id
                                                                                        }
                                                                                    >
                                                                                        <div
                                                                                            style={{
                                                                                                marginBottom:"0",
                                                                                                position:"relative",
                                                                                            }}
                                                                                            className="cate-box"
                                                                                        >
                                                                                            <img
                                                                                                src={
                                                                                                    cat.image
                                                                                                }
                                                                                            />
                                                                                            {
                                                                                                (_.contains(["PRO","PREMIUM"],cat.subscriptionType)) ? ((cat.subscriptionType === "PRO") ? (
                                                                                                    <div className="paid-cat">
                                                                                                        <img
                                                                                                            src="img/pro.png"
                                                                                                        />
                                                                                                        <span className="paid-cat-color">Pro</span>
                                                                                                    </div>
                                                                                                ) : (<div className="paid-cat">
                                                                                                        <img
                                                                                                            src="img/premium.png"
                                                                                                        />
                                                                                                        <span className="paid-cat-color">Premium</span>
                                                                                                    </div>)) : null
                                                                                            }
                                                                                        </div>
                                                                                    </label>
                                                                                    <div className="cat_title checked_title">
                                                                                        <h3
                                                                                            style={{
                                                                                                fontSize:
                                                                                                    "11px",
                                                                                            }}
                                                                                        >
                                                                                            {
                                                                                                cat.name
                                                                                            }
                                                                                        </h3>
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        }
                                                                    )}
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
                                                            marginTop: "150px",
                                                            marginBottom:
                                                                "150px",
                                                        }}
                                                        className="flex"
                                                    >
                                                        <p className="item-author text-color">
                                                            No category
                                                            available
                                                        </p>
                                                    </div>
                                                )}

                                                <div
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                    class=""
                                                >
                                                    <button
                                                        class="blue_btn light_blue_btn"
                                                        type="button"
                                                        onClick={this.handleSubmitCategory.bind(
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
                            </CModalBody>
                        </CModal>
                    </div>
                    <div
                        className={
                            this.state.openModelBrand ? "stopScorll" : ""
                        }
                    >
                        <CModal
                            size="lg"
                            show={this.state.openModelBrand}
                            closeOnBackdrop={false}
                            onClose={this.handleCloseClick.bind(this)}
                            aria-hidden="true"
                            color="danger"
                            centered
                        >
                            <CModalBody className="model-bg">
                                <div>
                                    <div className="modal-body">
                                        <button
                                            type="button"
                                            className="close"
                                            onClick={this.handleCloseClick.bind(
                                                this
                                            )}
                                        >
                                            <span aria-hidden="true">
                                                <img src="./murabbo/img/close.svg" />
                                            </span>
                                        </button>
                                        <div className="model_data">
                                            <div className="model-title">
                                                <h3>Choose Brand</h3>
                                            </div>
                                            <div className="contest">
                                                <div className="row">
                                                    <div
                                                        class="col-12 search search-brand-cat"
                                                        style={{
                                                            marginBottom:
                                                                "20px",
                                                        }}
                                                    >
                                                        <input
                                                            type="text"
                                                            value={
                                                                this.state
                                                                    .searchTerm
                                                            }
                                                            placeholder="Search Brand"
                                                            onChange={this.searchUpdated.bind(
                                                                this
                                                            )}
                                                        />
                                                        <i className="bx bx-search"></i>
                                                    </div>

                                                    {this.state.filterBrandList
                                                        .length > 0 ? (
                                                        this.state.filterBrandList.map(
                                                            (brand, key) => {
                                                                return (
                                                                    <div className="col-lg-2 col-md-3 col-sm-3 checkbox-buttons-container">
                                                                        <input
                                                                            className="brandCheckbox"
                                                                            type="checkbox"
                                                                            id={
                                                                                brand._id
                                                                            }
                                                                            onChange={this.handleChangeBrand.bind(
                                                                                this,
                                                                                brand
                                                                            )}
                                                                        />
                                                                        <label
                                                                            for={
                                                                                brand._id
                                                                            }
                                                                        >
                                                                            <div
                                                                                style={{
                                                                                    marginBottom:
                                                                                        "0",
                                                                                }}
                                                                                className=" cate-box"
                                                                            >
                                                                                <img
                                                                                    src={
                                                                                        brand.image
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        </label>
                                                                        <div className="cat_title checked_title">
                                                                            <h3>
                                                                                {
                                                                                    brand.name
                                                                                }
                                                                            </h3>
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
                                                                textAlign:
                                                                    "center",
                                                                marginTop:
                                                                    "100px",
                                                                marginBottom:
                                                                    "100px",
                                                            }}
                                                            className="flex"
                                                        >
                                                            <p className="item-author text-color">
                                                                No brand
                                                                available
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>

                                                <div
                                                    style={{
                                                        marginTop: "25px",
                                                        textAlign: "center",
                                                    }}
                                                    class=""
                                                >
                                                    <button
                                                        class="blue_btn light_blue_btn"
                                                        type="button"
                                                        onClick={this.handleSubmitBrand.bind(
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
                            </CModalBody>
                        </CModal>
                    </div>

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
                                    <button
                                        type="button"
                                        className="close"
                                        onClick={() =>
                                            this.setState({
                                                confirmationModel: false,
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
                                                        onClick={this.removeContestHandler.bind(
                                                            this,
                                                            "delete"
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
                        show={this.state.publishConfirmationModel}
                        closeOnBackdrop={false}
                        onClose={() =>
                            this.setState({ publishConfirmationModel: false })
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
                                                publishConfirmationModel: false,
                                            })
                                        }
                                    >
                                        <span aria-hidden="true">
                                            <img src="./murabbo/img/close.svg" />
                                        </span>
                                    </button>
                                    <div className="model_data">
                                        <div className="model-title">
                                            <h3>
                                                Are you sure you want to
                                                publish?
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
                                                        }}
                                                        className="blue_btn"
                                                        type="button"
                                                        onClick={() =>
                                                            this.setState({
                                                                publishConfirmationModel: false,
                                                                publish_id: "",
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
                                                        onClick={this.publishContestHandler.bind(
                                                            this,
                                                            "publish"
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
                </main>
                <TheFooter />
            </>
        );
    }
}

export default EditContest;
