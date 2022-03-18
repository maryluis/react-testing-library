import { formReducer, initialReducerValue } from "../tools/reducer";
import { FormData } from '../tools/questions-data';
import { FirstQuestion, SecondQuestion, ThirdQuestion } from "../components/QuestionsComponents";
import userEvent from '@testing-library/user-event';
import { useReducer, useCallback } from 'react';
import { render, screen } from '@testing-library/react';

function ReducerTest() {
    const [state, dispatch] = useReducer(formReducer, initialReducerValue);
    const { values, question, score } = state;

    const { states, capital } = FormData;
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
    return(
        <div>
            <input value={question} role="question"/>
            <input value={score} role="score"/>
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
            <button onClick={handleNextStep}>Next</button>
            <button onClick={handleStartAgain}>Again</button>
        </div>
    );
};

describe('reducer', () => { 
    it("change question's number", () => {
        render(<ReducerTest />);
        const buttonNext = screen.getByText('Next');
        const buttonAgain = screen.getByText('Again');
        const question = screen.getByRole("question");
        expect(buttonNext).toBeInTheDocument();
        expect(question).toHaveValue('1');
        userEvent.click(buttonNext);
        expect(question).toHaveValue('2');
        userEvent.click(buttonNext);
        expect(question).toHaveValue('3');
        userEvent.click(buttonAgain);
        expect(question).toHaveValue('1');
    });
    it('changes score', () => {
        render(<ReducerTest />);
        const firstTest = screen.getByRole('textbox');
        const secondTest = screen.getByLabelText('budapest');
        const thirdTest = screen.getByLabelText('idaho');
        const forthTest = screen.getByLabelText('lansing');
        const score = screen.getByRole("score");
        const buttonNext = screen.getByText('Next');
        const buttonAgain = screen.getByText('Again');
        expect(score).toHaveValue('0');
        userEvent.type(firstTest, 'portuguese');
        userEvent.click(buttonNext);
        expect(score).toHaveValue('5');
        userEvent.click(secondTest);
        userEvent.click(buttonNext);
        expect(score).toHaveValue('10');
        userEvent.click(thirdTest);
        userEvent.click(buttonNext);
        expect(score).toHaveValue('15');
        userEvent.click(forthTest);
        userEvent.click(buttonNext);
        expect(score).toHaveValue('13');
        userEvent.click(buttonAgain);
        expect(score).toHaveValue('0');
    });
});