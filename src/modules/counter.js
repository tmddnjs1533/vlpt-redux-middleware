// 액션 타입(Ducks 패턴)
const INCREASE = 'INCREASE'
const DECREASE = 'DECREASE'

// 액션 생성 함수. 원래는 액션 이름에 'counter/INCREASE' 와 같이 접두어를 붙임.
export const increase = () => ({ type: INCREASE })
export const decrease = () => ({ type: DECREASE })

// thunk 함수 생성
// getState를 쓰지 않으면 굳이 파라미터를 받을 필요 없음
// 액션 디스패치를 1초 딜레이 하기
export const increaseAsync = () => dispatch => {
    setTimeout(() => dispatch(increase()),1000)
}
export const decreaseAsync = () => dispatch => {
    setTimeout(() => dispatch(decrease()),1000)
}

// 초기값
const initialState = 0

export default function counter(state = initialState, action) {
    switch (action.type){
        case INCREASE:
            return state + 1;
        case DECREASE:
            return state - 1;
        default:
            return state;
    }
}