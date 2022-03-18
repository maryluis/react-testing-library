export const initialReducerValue = {
    question: 1,
    values: {
        first: {
            correct_answer: 'portuguese',
            actual_answer: '',
            value: 0,
        },
        second: {
            options: [0, 5, 0, 0],
            value: 0,
        },
        third: 0,
    },
    score: 0,
}

export function formReducer(state, action) {
    switch(action.type) {
        case 'CHANGE_LANGUAGE' :
            let score = 0;
            const correct_answer = state.values.first.correct_answer.toLowerCase();
            const actual_answer = action.payload.toLowerCase()
            if(correct_answer === actual_answer) {
                score = 5;
            }
                return ({
                    ...state,
                    values:{
                        ...state.values,
                        first: {
                            correct_answer: 'portuguese',
                            actual_answer: action.payload,
                            value: score,
                        },
                    },
                });
        case 'CHANGE_CAPITAL': 
            return({
                ...state,
                values: { 
                    ...state.values,
                    second: { 
                        ...state.values.second,
                        value: state.values.second.options[action.payload]},
                },
            });
        case 'CHANGE_STATES':
            const actual_value = state.values.third;
            return({
                ...state,
                values: { 
                    ...state.values,
                    third:  actual_value + action.payload
                },
            });            
        case 'NEXT_STEP': 
            const firstValue = state.values.first.value;
            const secondValue = state.values.second.value;
            const thirdValue = state.values.third;
            return({
                ...state,
                score:  firstValue + secondValue + thirdValue,
                question: state.question + 1,
            });
        case 'START_AGAIN':
            return initialReducerValue;
        default: return initialReducerValue;
    };
};