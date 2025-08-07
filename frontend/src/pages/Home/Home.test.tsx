import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Home from './Home.tsx';

describe('Home page', () => {
    it('renders title and subtitle', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>,
        );
        expect(screen.getByText(/Welcome to Bitly/i)).toBeInTheDocument();
        expect(screen.getByText(/Manage your shortened links/i)).toBeInTheDocument();
    });

    it('renders a button linking to /shortlinks', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>,
        );
        const link = screen.getByRole('link', { name: /Go to ShortLinks/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/shortlinks');
    });
});
