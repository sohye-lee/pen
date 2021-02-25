import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategory, getCategoryList } from '../actions/categoryActions';
import Loading from '../components/Loading';
import Message from '../components/Message';

export default function AdminCategory() {
    const dispatch = useDispatch();
    const categoryList = useSelector(state => state.categoryList);
    const { loading, categories, error } = categoryList;
    const categoryAdd = useSelector(state => state.categoryAdd);
    const { loading: loadingAdd, success: successAdd, error: errorAdd } = categoryAdd;
    const categoryDelete = useSelector(state => state.categoryDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = categoryDelete;


    const addCategoryHandler = () => {
        dispatch(addCategory({name: "new category"}));
    }

    const deleteCategoryHandler = (categoryId) => {
        dispatch(deleteCategory(categoryId))
    }

    const editCategoryHandler = () => {

    }

    const renderCategory = (category) => {
        return (
            <tr key={category._id}>
                <td>{category.name}</td>
                <td className="row center">
                    <button className="btn small btn__reset" onClick={editCategoryHandler}>edit</button>
                    <button className="btn small btn__cancel" onClick={() => deleteCategoryHandler(category._id)}>delete</button>
                </td>
            </tr>
        )
    }

    useEffect(() => {
        dispatch(getCategoryList());
    }, [dispatch, successAdd, successDelete])
    return (
        <div className="container__center">
            <div className="form__content">
                <h1 className="form__title">
                    categories
                </h1>
                <button className="btn small row right" onClick={addCategoryHandler}>+ add</button>
                {loadingAdd && <Loading />}
                {errorAdd && <Message message="eror">{errorAdd}</Message>}
                {loading && <Loading />}
                {error && <Message message="error">{error}</Message>}
                <table className="form__table">
                    <thead>
                        <tr>
                            <th>category</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories && categories.map(category => renderCategory(category))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};
