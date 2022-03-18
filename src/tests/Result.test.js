import { render, screen } from '@testing-library/react';
import Result from '../components/ResultComponent';;

describe('Result', () => { 
    it('renders title text', () => {
    render(<Result />);
    const textElement = screen.getByText(/Your score /i);
    expect(textElement).toBeInTheDocument();
  });
});
