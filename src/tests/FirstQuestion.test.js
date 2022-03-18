import { FirstQuestion } from '../components/QuestionsComponents';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


describe('Main', () => { 
    it('renders first question', () => {
        render(<FirstQuestion />);
        const element = screen.getByText(/language of Brazil/i);
        expect(element).toBeInTheDocument();
    });
    it('renders first question input', () => {
        render(<FirstQuestion />);
        const element = screen.getByRole('textbox');
        expect(element).toBeInTheDocument();
    });
    it('question input changes value', () => {
        render(<FirstQuestion />);
        const element = screen.getByRole('textbox');
        userEvent.type(element, 'portuguese');
        expect(element).toHaveValue('portuguese');
    });
    it('question input changes focus', () => {
        render(<FirstQuestion />);
        const element = screen.getByRole('textbox');
        const secondElement = screen.getByText(/language/i);
        expect(element).not.toHaveFocus();
        userEvent.click(element);
        expect(element).toHaveFocus();
        userEvent.click(secondElement);
        expect(element).not.toHaveFocus();
      });
      it('tab works for focus', () => {
        render(<FirstQuestion />);
        const element = screen.getByRole('textbox');
        expect(element).not.toHaveFocus();
        userEvent.tab();
        expect(element).toHaveFocus();
        userEvent.tab();
        expect(element).not.toHaveFocus();
      });
});