import { useReducer, useCallback, useMemo, useContext } from "react";
import { FirstQuestion, SecondQuestion, ThirdQuestion } from "./QuestionsComponents";
import { formReducer, initialReducerValue } from "../tools/reducer";
import { FormData } from "../tools/questions-data";
import Result from "./ResultComponent";
import { ThemeContext } from "../App";
import classNames from "classnames";

export default function Main() {
    const [state, dispatch] = useReducer(formReducer, initialReducerValue);
    const { values, question, score } = state;
    const { theme } = useContext(ThemeContext);

    const { results, finalText, states, capital } = FormData;
    const handleNextStep = useCallback(() => {
        dispatch({ type: 'NEXT_STEP'})
    })
    const handleKeyPress = useCallback((e) => {
        if(e.key === 'Enter'){
            handleNextStep();
        } 
    }, [state]);
    const handleOnChangeText = useCallback((e) => {
        dispatch({ type: 'CHANGE_LANGUAGE', payload: e.target.value });
    }, [state]);

    const handleOnChangeRadio = useCallback((e) => {
        dispatch({ type: 'CHANGE_CAPITAL', payload: e.target.value });
    }, [state]);

    const handleOnChangeCheckbox = useCallback((e) => {
        const value = e.target.checked ? + e.target.value: - e.target.value;
        dispatch({ type: 'CHANGE_STATES', payload: value });
    }, [state]);

    const handleStartAgain = useCallback(() => {
        dispatch({ type: 'START_AGAIN'});
    }, [state]);

    const resultText = useMemo(() => {
        if(score < results.min) {
            return finalText.min;
        };
        if(score > results.min && score < results.middle) {
            return finalText.middle;
        };
        if(score >= results.middle) {
            return finalText.max;
        };
    }, [score])


    const ComponentsArr = [
        <FirstQuestion 
            onChange={handleOnChangeText} 
            setAnswer={handleKeyPress} 
            answer={values.third.actual_answer} 
        />,
        <SecondQuestion 
            onChange={handleOnChangeRadio}
            data={capital}
        />,
        <ThirdQuestion
            onChange={handleOnChangeCheckbox}
            data={states}
        />,
    ];

    return(
        <div role="main" className={classNames({ 'main': true,'light-lettes': theme === 'dark'})}>
            <div className='form-header'>
                {[1, 2, 3].map((item) => (
                   <span 
                    key={`id${item}`} 
                    className={classNames({
                        'light-theme-span': true,
                        'active-span': question === item,
                        'last-span' : question > item
                    })}>
                        {item}
                    </span>
                ))}
            </div>
            { question < 4  && 
            <div className='form-body'>
                {ComponentsArr[question-1]}
                <button onClick={handleNextStep}>Next</button>
            </div>
            }
            { question === 4 &&
            <div className='form-body'>
                <Result score={score} text={resultText}/>
                <button onClick={handleStartAgain}>Try again</button> 
            </div>
            }
        </div>
    );
};