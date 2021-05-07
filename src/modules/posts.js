import * as postAPI from '../api/posts' // api/posts 안의 함수 모두 불러오기
import {createPromiseThunk, handleAsyncActions, reducerUtils} from "../lib/asyncUtils";

/**
 * 프로미스를 다루는 리덕스 모듈을 다룰 땐 다음과 같은 사항을 고려해야합니다.
 *  1. 프로미스가 시작, 성공, 실패했을 때 다른 액션을 디스패치해야합니다.
 *  2. 각 프로미스 마다 thunk 함수를 만들어주어야 합니다.
 *  3. 리듀서에서 액션에 따라 로딩중, 결과, 에러 상태를 변경해주어야 합니다.
 */

/* 액션 타입 */

// 포스트 여러개 조회하기
const GET_POSTS = 'GET_POSTS'; //요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS' // 요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR' // 요청 실패

// 포스트 하나 조회하기
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS'
const GET_POST_ERROR = 'GET_POST_ERROR'

// thunk를 사용할 때, 꼭 모든 액션들에 대하여 액션 생성함수를 만들 필요는 없습니다.
// 그냥 thunk 함수에서 바로 액션 객체를 만들어주어도 괜찮습니다.
/*
export const getPosts = () => async dispatch => {
    dispatch({ tpye: GET_POSTS }) // 요청이 시작됨
    try {
        const posts = await postAPI.getPosts() // API 호출
        dispatch({ type: GET_POSTS_SUCCESS, posts }) // 성공
    } catch (e) {
        dispatch({ type: GET_POSTS_ERROR, error: e }) // 실패
    }
}
*/
// thunk 함수에서도 파라미터를 받아와서 사용할 수 있습니다.
/*
export const getPost = (id) => async dispatch => {
    dispatch({ type: GET_POST })
    try {
        const post = await postAPI.getPostById(id)
        dispatch({ type: GET_POST_SUCCESS, post })
    } catch (e) {
        dispatch({ type: GET_POST_ERROR, error: e })
    }
}
 */

// 아주 쉽게 thunk 함수를 만들 수 있게 되었습니다.
export const getPosts = createPromiseThunk(GET_POSTS, postAPI.getPosts);
export const getPost = createPromiseThunk(GET_POST, postAPI.getPostById)

/*
const initialState = {
    posts: {
        loading: false,
        data: null,
        error: null
    },
    post:  {
        loading: false,
        data: null,
        error: null
    }
}
 */

// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했습니다
const initialState = {
    posts: reducerUtils.initial(),
    post: reducerUtils.initial()
}

export default function posts(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
        case GET_POSTS_SUCCESS:
        case GET_POSTS_ERROR:
            return handleAsyncActions(GET_POSTS, 'posts')(state,action)
        case GET_POST:
        case GET_POST_SUCCESS:
        case GET_POST_ERROR:
            return handleAsyncActions(GET_POST, 'post')(state, action)
        default:
            return state;
    }
}