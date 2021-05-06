import React from 'react';
import Counter from "../components/Counter";
import { useSelector, useDispatch } from "react-redux";
// import { increase, decrease } from "../modules/counter";  // 그냥 액션
import { increaseAsync, decreaseAsync } from "../modules/counter";

const CounterContainer = () => {
    const number = useSelector(state => state.counter)
    const dispatch = useDispatch()

    // 그냥 액션
    /*
    const onIncrease = () => {
        dispatch(increase())
    }
    const onDecrease = () => {
        dispatch(decrease())
    }
     */
    // 청크
    const onIncrease = () => {
        dispatch(increaseAsync())
    }
    const onDecrease = () => {
        dispatch(decreaseAsync())
    }

    return (
       <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
    );
};

export default CounterContainer;