import React from 'react'

export default function Quiz(props) {
    const {listArr,indexQuestion,handleMultiSelectChange,saveIndexAnswer}=props
    return (
        <>
            {listArr[indexQuestion]["answerType"] ===2 ?
            
            (
                <div className="row">
                    <div
                        className="col-12"
                        style={{
                            marginBottom:
                                "30px",
                        }}
                    >
                        {listArr[indexQuestion]["answers"].map(
                            (
                                e,
                                key
                            ) => {
                                var forclass =
                                    e._id +
                                    key;
                                var innnerpclass =
                                    "fancy2 fancy2_" +
                                    key;
                                var tempcls =
                                    listArr[indexQuestion]["selectAnswer"] &&
                                       listArr[indexQuestion][
                                            "selectAnswer"
                                        ].includes(
                                            e._id
                                        )
                                        ? innnerpclass
                                        : "fancy2";

                                var pcalss =
                                   listArr[
                                        indexQuestion
                                    ][
                                        "isAnswerTrue"
                                    ] !==
                                        undefined
                                        ? listArr[
                                            indexQuestion
                                        ][
                                            "selectAnswer"
                                        ].includes(
                                            e.answer
                                        ) &&
                                            e.correctAnswer ===
                                            true
                                            ? "fancy2 highlight"
                                            : e.correctAnswer ===
                                                false
                                                ? "fancy2 pinkhighlight"
                                                : "fancy2 highlight"
                                        : tempcls;
                                // var pcalss = (props.listArr[props.indexQuestion]['selectAnswer'] && props.listArr[props.indexQuestion]['selectAnswer'].includes(e._id)) ? innnerpclass : "fancy2";
                                var inputclass =
                                    "input_" +
                                    key;
                                return (
                                    <p
                                        className={
                                            pcalss
                                        }
                                    >
                                        <label>
                                            {key ===
                                                0 ? (
                                                <b class="option_ _a">
                                                    A
                                                </b>
                                            ) : null}
                                            {key ===
                                                1 ? (
                                                <b class="option_ _b">
                                                    B
                                                </b>
                                            ) : null}
                                            {key ===
                                                2 ? (
                                                <b class="option_ _c">
                                                    C
                                                </b>
                                            ) : null}
                                            {key ===
                                                3 ? (
                                                <b class="option_ _d">
                                                    D
                                                </b>
                                            ) : null}
                                            {key ===
                                                4 ? (
                                                <b class="option_ _e">
                                                    E
                                                </b>
                                            ) : null}
                                            {key ===
                                                5 ? (
                                                <b class="option_ _f">
                                                    F
                                                </b>
                                            ) : null}

                                            {listArr[
                                               indexQuestion
                                            ][
                                                "selectAnswer"
                                            ] &&
                                                listArr[
                                                   indexQuestion
                                                ][
                                                    "selectAnswer"
                                                ].includes(
                                                    e._id
                                                ) &&
                                                e.correctAnswer ===
                                                true ? (
                                                <input
                                                    id={
                                                        forclass
                                                    }
                                                    className={
                                                        inputclass
                                                    }
                                                    name={
                                                       listArr[
                                                      indexQuestion
                                                        ][
                                                        "_id"
                                                        ]
                                                    }
                                                    type="checkbox"
                                                    onChange={()=>handleMultiSelectChange(indexQuestion, e  )}
                                                    value={
                                                        e.answer
                                                    }
                                                    checked="checked"
                                                    disabled={
                                                        e.readonly
                                                            ? "disabled"
                                                            : ""
                                                    }
                                                />
                                            ) : (
                                                <input
                                                    id={
                                                        forclass
                                                    }
                                                    className={
                                                        inputclass
                                                    }
                                                    name={
                                                       listArr[
                                                        indexQuestion
                                                        ][
                                                        "_id"
                                                        ]
                                                    }
                                                    type="checkbox"
                                                    onChange={()=>handleMultiSelectChange(indexQuestion,e )}
                                                    value={
                                                        e.answer
                                                    }
                                                    disabled={
                                                        e.readonly
                                                            ? "disabled"
                                                            : ""
                                                    }
                                                />
                                            )}
                                            <span
                                                for={
                                                    forclass
                                                }
                                            >
                                                {
                                                    e.answer
                                                }
                                            </span>
                                        </label>
                                    </p>
                                );
                            }
                        )}
                    </div>
                    <div
                        class="col-12 align-self-center"
                        style={{
                            textAlign:
                                "center",
                        }}
                    >
                        <button
                            style={{
                                minWidth:
                                    "150px",
                            }}
                            class="pink_btn"
                            type="button"
                            onClick={()=>console.log}
                        >
                            Save
                        </button>
                    </div>
                </div>
            ) : null}
        </>
    )
}
