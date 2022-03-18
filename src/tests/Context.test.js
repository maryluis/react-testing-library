import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Context', () => { 
  it('check context', () => {
    render(<App />);
    const button = screen.getByText(/change/i);
    const component = screen.getByRole('main');
    expect(button).toBeInTheDocument();
    expect(component).toBeInTheDocument();
    expect(component).not.toHaveClass('light-lettes');
    userEvent.click(button);
    expect(component).toHaveClass('light-lettes');
    userEvent.click(button);
    expect(component).not.toHaveClass('light-lettes');
  });
});
