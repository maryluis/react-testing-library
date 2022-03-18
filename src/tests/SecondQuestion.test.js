import { SecondQuestion } from '../components/QuestionsComponents';
import { FormData } from "../tools/questions-data";
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('SecondQuestion', () => { 
    it('renders second question', () => {
        render(<SecondQuestion data={FormData.capital} />);
        const element = screen.getByText(/capital/i);
        expect(element).toBeInTheDocument();
    });
    it('renders second question inputs', () => {
        render(<SecondQuestion data={FormData.capital} />);
        const element = screen.getAllByRole('radio');
        expect(element.length).toBe(4);
    });
    it('question input changes value', () => {
        render(<SecondQuestion data={FormData.capital}/>);
        const element = screen.getByLabelText(/London/i);
        const secondElement = screen.getByLabelText(/budapest/i);
        expect(element).not.toBeChecked();
        userEvent.click(element);
        expect(element).toBeChecked();
        userEvent.click(secondElement);
        expect(element).not.toBeChecked();
    });
    it('question input changes focus', () => {
        render(<SecondQuestion data={FormData.capital}/>);
        const element = screen.getByLabelText(/London/i);
        const secondElement = screen.getByText(/capital/i);
        expect(element).not.toHaveFocus();
        userEvent.click(element);
        expect(element).toHaveFocus();
        userEvent.click(secondElement);
        expect(element).not.toHaveFocus();
      });
      it('tab works for focus', () => {
        render(<SecondQuestion data={FormData.capital}/>);
        const element = screen.getByLabelText(/paris/i);
        expect(element).not.toHaveFocus();
        userEvent.tab();
        userEvent.tab();
        userEvent.tab();
        expect(element).toHaveFocus();
        userEvent.tab();
        expect(element).not.toHaveFocus();
      });
});
