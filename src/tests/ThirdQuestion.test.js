import { ThirdQuestion } from '../components/QuestionsComponents';
import { FormData } from "../tools/questions-data";
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('ThirdQuestion', () => { 
    it('renders third question', () => {
        render(<ThirdQuestion data={FormData.states} />);
        const element = screen.getByText(/states/i);
        expect(element).toBeInTheDocument();
    });
    it('renders third question inputs', () => {
        render(<ThirdQuestion data={FormData.states} />);
        const element = screen.getAllByRole('checkbox');
        expect(element.length).toBe(6);
    });
    it('question input changes value', () => {
        render(<ThirdQuestion data={FormData.states}/>);
        const element = screen.getByLabelText(/idaho/i);
        const secondElement = screen.getByLabelText(/lansing/i);
        expect(element).not.toBeChecked();
        userEvent.click(element);
        expect(element).toBeChecked();
        userEvent.click(element);
        expect(element).not.toBeChecked();
        userEvent.click(element);
        userEvent.click(secondElement);
        expect(element).toBeChecked();
        expect(secondElement).toBeChecked();
    });
    it('question input changes focus', () => {
        render(<ThirdQuestion data={FormData.states}/>);
        const element = screen.getByLabelText(/idaho/i);
        const secondElement = screen.getByText(/lansing/i);
        expect(element).not.toHaveFocus();
        userEvent.click(element);
        expect(element).toHaveFocus();
        userEvent.click(secondElement);
        expect(element).not.toHaveFocus();
      });
    it('tab works for focus', () => {
        render(<ThirdQuestion data={FormData.states}/>);
        const element = screen.getByLabelText(/idaho/i);
        const secondElement = screen.getByLabelText(/lansing/i);
        expect(element).not.toHaveFocus();
        userEvent.tab();
        expect(element).toHaveFocus();
        userEvent.tab();
        expect(element).not.toHaveFocus();
        expect(secondElement).toHaveFocus();
    });
});
