import { render, screen } from '@testing-library/react';
import { InputComp } from './InputComp';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

const onChangeSpy = jest.fn();
const defaultProps = {
	onChange: onChangeSpy,
	label: 'Search by name',
	loading: false,
	value: '',
};

const renderComp = (props = defaultProps) => {
	render(<InputComp {...props} />);
};

describe('Input component', () => {
	it('should render loading', async () => {
		const newProps = { ...defaultProps, loading: true };
		renderComp(newProps);

		expect(screen.getByTestId('spinner')).toBeVisible();
	});

	it('should update input field value after typing', async () => {
		renderComp();

		const input = screen.getByTestId('Search by name');
		await userEvent.click(input);
		await userEvent.paste('Test');

		expect(onChangeSpy).toHaveBeenCalledWith('Test');
	});

	it('should render label', async () => {
		renderComp();

		expect(screen.getByText('Search by name:')).toBeInTheDocument();
	});
});
