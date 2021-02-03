import React, { useState } from 'react'

export default function Write(props) {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [text, setText] = useState('');
    const [hashtags, setHashtags] = useState(['']);
    const [like, setLike] = useState(0);
    const [comments, setComments] = useState(['']);

    const submitHandler = () => {

    }

    return (
        <div className="container__center">
            <form className="form__content" onSubmit={submitHandler}>
                <h1 className="form__title">
                    share a new story!
                </h1>
                <div className="row">
                    <input
                        className="form__input"
                        type="text"
                        id="title"
                        placeholder="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="row">
                    <select
                        className="form__input"
                        id="category"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        <option selected={true} disabled={true}>select category</option>
                        <option value="life">life</option>
                        <option value="arts">arts</option>
                        <option value="food">food</option>
                        <option value="travel">travel</option>
                        <option value="movies">movies</option>
                        <option value="books">books</option>
                        <option value="technologies">technologies</option>
                        <option value="technologies">miscellaneous</option>
                    </select>
                </div>
                <div className="row">
                    <input
                        className="form__input"
                        type="text"
                        id="text"
                        placeholder="text"
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                </div>
                <div className="row">
                    <button className="form__btn btn" type="submit">post this story</button>
                </div>
                <div className="row between">
                    <button className="btn btn__reset" type="reset">reset</button>
                    <button className="btn btn__cancel" onClick={e => props.history.push('/')}>cancel</button>
                </div>
                
            </form>
        </div>
    )
}
