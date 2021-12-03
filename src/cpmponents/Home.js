import React from 'react'

const Home = () => {


    
    return (
        <div className="home">
            <div className="logo">
                <span className="logo_name">Quiz</span>
                <span className="logo_rectangle"></span>
            </div>
            <div className="menu">
                <div className="category">
                    <span>SELECT CATEGORY</span>
                    <i className="fas fa-chevron-down"></i>
                </div>
                <div className="q_numbers">
                    <span>NUMBER OF QUESTIONS</span>
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
        </div>
    )
}

export default Home;
