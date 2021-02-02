import React from 'react'

export default function MyBlogs() {

    const renderBlog = (blog) => (
        <div className="content__container">
            <img className="content__img" src="/noimage.jpg" alt="sectionimage"/>    
            <h3 className="content__title">{blog.title}</h3>
            <h4 className="content__subtitle">{blog.category}</h4>
            <h3 className="content__text">{blog.description}</h3>
            <div className="content__additional">
                <p>follow 0</p>
                <p>{blog.hashtags.map(hashtag => (
                    <span>#{hashtag} </span>
                ))}</p>
            </div>
            <button className="btn small">see more</button>
        </div>
    );

    const renderPosting = (posting) => (
        <div className="content__container">
            <img className="content__img" src="/noimage.jpg" alt="sectionimage"/>    
            <h3 className="content__title">{posting.title}</h3>
            <h4 className="content__subtitle">{posting.category}</h4>
            <h3 className="content__text">{posting.description}</h3>
            <div className="content__additional row between">
                <p>follow 0</p>
                <p></p>
                <p>{posting.hashtags.map(hashtag => (
                    <span>#{hashtag} </span>
                ))}</p>
            </div>
            <button className="btn small">see more</button>
        </div>
    )

    
    return (
        <div className="container__full">
            <div className="section section__big">
                <div className="section__title">my blogs <span className="title__tab">ii</span></div>
                <div className="section__content">
                    <div className="content__container">
                        <img className="content__img" src="/noimage.jpg" alt="sectionimage"/>
                        <h3 className="content__title">blog title</h3>
                        <h4 className="content__subtitle">category</h4>
                        <h3 className="content__text">
                            description is here <br />
                            description is here <br />
                            description is here <br />
                        </h3>
                        <div className="content__additional">
                            <p>follow 0</p>
                            <p>#hashtag #hashtag #hashtag #hashtag #hashtag</p>
                        </div>
                        <button className="btn small">see more</button>
                    </div>
                </div>
            </div>

            <div className="section section__big">
                <div className="section__title">my postings <span className="title__tab">ii</span></div>
                <div className="section__content">
                    <div className="row center">
                        <h3 className="content__title">blog title</h3>
                    </div>
                    <div className="row center">
                        <h4 className="content__title">category</h4>
                    </div>
                    <div className="row center">
                        <h3 className="content__text">
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                            description is here 
                        </h3>
                    </div>
                    <div className="content__additional">
                        <p>#hashtag #hashtag #hashtag #hashtag #hashtag</p>
                    </div>
                    <button>see more</button>
                </div>
            </div>
        </div>
    )
}
