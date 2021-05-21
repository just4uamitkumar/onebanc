import React, { useState, useEffect } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

function Transaction() {
    const [paymentData, setPayData] = useState([]);
    let userId = "1";
    let recipientId = "2";

    //Formatting the Date
    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    function formatDate(date) {
        var d = new Date(date),
            month = "" + monthNames[d.getMonth()],
            day = "" + d.getDate(),
            year = d.getFullYear();
        if (day.length < 2) day = "0" + day;

        return [day, month, year].join(" ");
    }

    useEffect(() => {
        fetch(
            `https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=${userId}&recipientId=${recipientId}`
        )
            .then((data) => {
                return data.json();
            })
            .then((data2) => {
                for (let i = 0; i < data2.transactions.length; i++) {
                    data2.transactions[i].isChecked = false;
                }
                setPayData(data2.transactions);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userId, recipientId]);

    const showData = (index) => {
        let arr = [...paymentData];
        let item = arr[index];
        item.isChecked = !item.isChecked;
        setPayData(arr);
    };

    return (
        <div className="detail">
            <div className="header">
                <h4>John Doe</h4>
            </div>
            <div className="detailBody">
                <ul>
                    {paymentData.map((e, index) => (
                        <li key={index}>
                            <div className="startDate">
                                <span>{formatDate(e.startDate)}</span>
                            </div>
                            <div
                                className={
                                    e.direction === 1 && e.type === 1
                                        ? "right"
                                        : e.direction === 2 && e.type === 1
                                            ? "left"
                                            : e.direction === 2 && e.type === 2
                                                ? "left"
                                                : "right"
                                }
                            >
                                <div
                                    className="payBlock"
                                    data-bg={
                                        e.type === 1 && e.status === 2
                                            ? "green"
                                            : e.type === 2 && e.status === 2
                                                ? "blue"
                                                : e.type === 2 && e.status === 1
                                                    ? "yellow"
                                                    : e.type === 1 && e.status === 1
                                                        ? "yelow"
                                                        : "red"
                                    }
                                >
                                    <div className="left">
                                        <div className="val">
                                            <span className="symbol">&#8377;</span>
                                            <span className="amount">{e.amount}</span>
                                        </div>
                                        <div className="trans">
                                            <span> Transaction Id</span>
                                            <strong> {e.id}</strong>
                                            {e.type === 2 && e.status === 1 && (
                                                <button className="btn btn-danger">Cancel</button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="right">
                                        <span className="payStatus">
                                            {e.type === 1 && e.status === 2
                                                ? "You Paid"
                                                : e.type === 2 && e.status === 2
                                                    ? "You Recieved"
                                                    : e.type === 2 && e.status === 1
                                                        ? "You Requested"
                                                        : e.type === 1 && e.status === 1
                                                            ? "Request Recieved"
                                                            : "Declined"}
                                        </span>
                                        <button onClick={() => showData(index)}>
                                            {e.isChecked ? <FaChevronDown /> : <FaChevronRight />}
                                        </button>
                                    </div>
                                </div>
                                {e.isChecked && (
                                    <div className="userDetail">
                                        <div>
                                            Customer ID <strong>{e.customer.vPay}</strong>
                                        </div>
                                        <div>
                                            Partner Id <strong>{e.partner.vPay}</strong>
                                        </div>
                                        {e.description && (
                                            <div>
                                                Payment Purpose <strong>{e.description}</strong>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="endDate text-right">
                                    {formatDate(e.endDate)}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Transaction;