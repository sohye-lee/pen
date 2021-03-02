import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, editCategory, getCategoryList } from '../actions/categoryActions';
import Loading from '../components/Loading';
import Message from '../components/Message';


export default function AdminCategory(props) {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const categoryList = useSelector(state => state.categoryList);
    const { loading, categories, error } = categoryList;
    const categoryAdd = useSelector(state => state.categoryAdd);
    const { loading: loadingAdd, success: successAdd, error: errorAdd } = categoryAdd;
    const categoryEdit = useSelector(state => state.categoryEdit);
    const { loading: loadingEdit, success: successEdit, error: errorEdit } = categoryEdit;

    const [categoryName, setCategoryName] = useState('');
    const [categoryEdited, setCategoryEdited] = useState('');
    const [categoryEditName, setCategoryEditName] = useState('');
    const [modalShow, setModalShow] = useState("none");


    const toggleEditModal = () => {
        if (modalShow === "none") {
            setModalShow("flex");
        } else {
            setModalShow("none");
        }
    };

    const addCategoryHandler = () => {
        dispatch(addCategory({name: categoryName.toLowerCase() || 'new'}));
    }

    const editCategoryHandler = () => {
        dispatch(editCategory({ _id: categoryEdited, name: categoryEditName.toLowerCase() }));
    }

    const renderCategory = (category) => {
        return (
            <tr key={category._id}>
                <td>
                    {category.name}
                </td>
                <td className="row right">
                    <button 
                        className="btn small btn__reset" 
                        onClick={() => { 
                            toggleEditModal(); 
                            setCategoryEdited(category._id); 
                            setCategoryEditName(category.name)}}
                    >
                        edit
                    </button>
                </td>
            </tr>
        )
    }

    useEffect(() => {
        if (!userInfo) {
            alert('You need to login first!')
            props.history.push('/login')
        }
        
        if (userInfo && !userInfo.isAdmin) {
            alert('You must be an admin user to access this page!');
            props.history.push('/');
        }    

        if (successAdd) {
            setCategoryName('');
        }

        if (successEdit) {
            setCategoryEdited('');
            setCategoryEditName('');
        }
        dispatch(getCategoryList());
        
    }, [dispatch, successAdd, successEdit])


    return (
        <div className="container__long">
            <div className="form__content">
                <h1 className="form__title">
                    categories
                </h1>
                {loading && <Loading />}
                {error && <Message message="error">{error}</Message>}
                {loadingAdd && <Loading />}
                {errorAdd && <Message message="eror">{errorAdd}</Message>}
                {loadingEdit && <Loading />}
                {errorEdit && <Message message="eror">{errorEdit}</Message>}
                <table className="form__table" cellSpacing="0" cellPadding="0">
                    <tbody>
                        {categories && categories.map(category => renderCategory(category))}
                        <tr>
                            <td>
                                <input 
                                    className="category__input"
                                    placeholder=""
                                    value={categoryName.toLowerCase()}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                />
                            </td>
                            <td className="row right">
                                <button className="btn small btn__cancel" onClick={addCategoryHandler}>add</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="modal__container" style={{display:modalShow}}>
                <div className="modal__content">
                    <form onSubmit={editCategoryHandler}>
                        <div className="">
                            <input 
                                className="form__input"
                                value={categoryEditName}
                                placeholder={categoryEditName.toLowerCase()}
                                onChange={(e) => setCategoryEditName(e.target.value)}
                            />
                            <div className="btns row between">
                                <button className="btn small btn__cancel" onClick={() => setModalShow("none")}>cancel</button>
                                <button className="btn small btn__reset" onClick={editCategoryHandler}>edit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};
