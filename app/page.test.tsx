import { render, screen } from '@testing-library/react';
import { login as mockLogin } from './requests/login';
import Login from './page';
import userEvent from '@testing-library/user-event';

jest.mock('./requests/login');

describe("Login", () => {

    it('should display a login form', () => {
        render(<Login />);
        expect(screen.getByLabelText(/Your name/)).toBeTruthy();
        expect(screen.getByLabelText(/Your email/)).toBeTruthy();
    });

    it('should show a message on error', async () => {
        const user = userEvent.setup();
        mockLogin.mockResolvedValue({ "ok": false });
        render(<Login />)
        expect(screen.queryByText('Someting went wrong')).toBeNull();
        await user.type(screen.getByLabelText(/Your name/), 'Jane');
        await user.type(screen.getByLabelText(/Your email/), 'jane@example.com');
        await user.click(screen.getByRole('button'));
        expect(screen.getByText('Something went wrong. Please try again.')).toBeTruthy();
    });


});