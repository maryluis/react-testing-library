import Main from '../components/Main';
import { ThemeContext } from '../App';
import userEvent from '@testing-library/user-event';
import { useState, useMemo } from 'react';
import { render, screen } from '@testing-library/react';

function MainTest() {
    const [theme, setTheme] = useState('light');
    const themeContext = useMemo(() => ({
      theme: theme,
      setTheme: () => {
        if (theme === 'light'){
          setTheme('dark');
        } else {
          setTheme('light');
        }
      },
    }), [theme]);
    return(
        <ThemeContext.Provider value={themeContext}>
            <Main/>
        </ThemeContext.Provider>
    );
};

describe('Main', () => { 
    it('renders next question button', () => {
        render(<MainTest />);
        const element = screen.getByText('Next');
        expect(element).toBeInTheDocument();
    });
    it('click the Next question button', () => {
        render(<MainTest />);
        const button = screen.getByText('Next');
        expect(screen.queryByText(/language of Brazil/i)).toBeInTheDocument();
        userEvent.click(button);
        expect(screen.getByText(/What is the capital of Hungary?/i)).toBeInTheDocument();
        userEvent.click(button);
        expect(screen.getByText(/states/i)).toBeInTheDocument();
        userEvent.click(button);
        expect(screen.getByText(/Your score is /i)).toBeInTheDocument();
      });
    it('tab works for focus', () => {
        render(<MainTest/>);
        const element = screen.getByText('Next');
        expect(element).not.toHaveFocus();
        userEvent.tab();
        userEvent.tab();
        expect(element).toHaveFocus();
        userEvent.tab();
        expect(element).not.toHaveFocus();
    });
    it('change style of span after click the Next button', () => {
        render(<MainTest />);
        const span = screen.getByText('2');
        const button = screen.getByText('Next');
        expect(span).toHaveClass('light-theme-span');
        expect(span).not.toHaveClass('active-span');
        expect(span).not.toHaveClass('last-span');
        userEvent.click(button);
        expect(span).toHaveClass('light-theme-span');
        expect(span).not.toHaveClass('last-span');
        expect(span).toHaveClass('active-span');
        userEvent.click(button);
        expect(span).not.toHaveClass('active-span');
        expect(span).toHaveClass('last-span');
      });
      it('Again button should render at the end of queze and returns to the first square', () => {
        render(<MainTest />); 
        let nextButton = screen.getByText('Next');
        let finalButton = screen.queryByText(/Try again/i);
        expect(nextButton).toBeInTheDocument();
        expect(finalButton).not.toBeInTheDocument();
        userEvent.click(nextButton);
        userEvent.click(nextButton);
        userEvent.click(nextButton);
        finalButton = screen.queryByText(/Try again/i);
        expect(nextButton).not.toBeInTheDocument();
        expect(finalButton).toBeInTheDocument();
        userEvent.click(finalButton);
        nextButton = screen.getByText('Next');
        expect(nextButton).toBeInTheDocument();
        expect(finalButton).not.toBeInTheDocument();
      });
});