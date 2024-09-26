import { render, screen } from '@testing-library/react';
import { login as mockLogin } from './requests/login';
import Login from './page';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));
jest.mock('./requests/login');

describe("Login", () => {

    it('should display a login form', () => {
        render(<Login />);
        expect(screen.getByLabelText(/Your name/i)).toBeTruthy();
        expect(screen.getByLabelText(/Your email/i)).toBeTruthy();
    });

    it('should show a message on error', async () => {
        const user = userEvent.setup();
        mockLogin.mockResolvedValue({ "ok": false });
        render(<Login />);
        expect(screen.queryByText('Someting went wrong')).toBeNull();
        await user.type(screen.getByLabelText(/Your name/i), 'Jane');
        await user.type(screen.getByLabelText(/Your email/i), 'jane@example.com');
        await user.click(screen.getByRole('button'));
        expect(screen.getByText(/Something went wrong/i)).toBeTruthy();
    });

    it('should redirect after successful login', async() => {
        const user = userEvent.setup();
        mockLogin.mockResolvedValue({ "ok": true });
        render(<Login />);
        await user.type(screen.getByLabelText(/Your name/i), 'Jane');
        await user.type(screen.getByLabelText(/Your email/i), 'jane@example.com');
        await user.click(screen.getByRole('button'));
        expect(mockRouter).toMatchObject({
          pathname: '/dashboard'
        });
    })

});