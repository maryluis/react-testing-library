import { render, screen } from '@testing-library/react';
import { useState, useMemo } from 'react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import { ThemeContext } from '../App';

function HeaderTest() {
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
            <Header />
        </ThemeContext.Provider>
    );
};

describe('Header', () => { 
    it('renders title text', () => {
    render(<HeaderTest/>);
    const textElement = screen.getByText(/Let's start/i);
    expect(textElement).toBeInTheDocument();
  });
  it('renders change theme button', () => {
    render(<HeaderTest />);
    const element = screen.getByText('Change theme');
    expect(element).toBeInTheDocument();
  });
  it('tab works for focus', () => {
    render(<HeaderTest />);
    const element = screen.getByText('Change theme');
    expect(element).not.toHaveFocus();
    userEvent.tab();
    expect(element).toHaveFocus();
    userEvent.tab();
    expect(element).not.toHaveFocus();
});
  
});