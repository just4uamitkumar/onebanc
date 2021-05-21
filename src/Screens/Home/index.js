import React, { Suspense, useState } from "react";
import Users from "../Users";
import Todo from "./Todo";
const Transactions = React.lazy(() => import("../Transactions"));

function Home() {
    const [showDetail, setShowDetail] = useState(false);

    const showTransaction = () => {
        setShowDetail(true);
    };

    return (
        <div className="content">
            <div className="sidebar">
                <Users showTransaction={showTransaction} />
            </div>
            <div className="right">
                <div className="mobile">
                    {showDetail ? (
                        <Suspense fallback={`...Loading `}>
                            <Transactions />
                        </Suspense>
                    ) : (
                        <Todo />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
