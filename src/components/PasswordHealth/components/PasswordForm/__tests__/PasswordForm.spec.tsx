import React from 'react';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';
import PasswordForm from '../PasswordForm';

type PasswordFormProps = {
  onConfirm: (password: string) => void;
  onCancel: () => void;
}

const defaultProps: PasswordFormProps = {
  onConfirm: jest.fn(),
  onCancel: jest.fn(),
};

const factory = (props = defaultProps): RenderResult => render(<PasswordForm {...props} />);

describe('<PasswordForm /> tests', () => {
  test('renders', () => {
    const { container } = factory();

    expect(container.querySelector('form')).not.toBeNull();
  });

  test('renders error message due to weak password', async () => {
    factory();

    const inputField = await screen.getByPlaceholderText('new password');

    await fireEvent.change(inputField, { target: { value: 'weakPassword' } });

    const errorMessage = await screen.getByText('Password too weak');

    expect(errorMessage).not.toBeNull();
  });

  test('enables confirm button when strong password is provided', async () => {
    factory();

    const confirmButton = await screen.getByText('Change');

    expect(confirmButton.getAttribute('disabled')).toBe('');

    const inputField = await screen.getByPlaceholderText('new password');
    await fireEvent.change(inputField, { target: { value: 'Str0ngPass!' } });

    expect(confirmButton.getAttribute('disabled')).toBeNull();
  });

  test('triggers callback on password submit by click', async () => {
    const mockConfirm = jest.fn();
    factory({
      onConfirm: mockConfirm,
      onCancel: jest.fn(),
    });

    const confirmButton = await screen.getByText('Change');

    const inputField = await screen.getByPlaceholderText('new password');
    await fireEvent.change(inputField, { target: { value: 'Str0ngPass!' } });

    await fireEvent.click(confirmButton);

    expect(mockConfirm).toHaveBeenCalledWith('Str0ngPass!');
  });

  test('triggers callback on password submit by return key', async () => {
    const mockConfirm = jest.fn();
    factory({
      onConfirm: mockConfirm,
      onCancel: jest.fn(),
    });

    const inputField = await screen.getByPlaceholderText('new password');
    await fireEvent.change(inputField, { target: { value: 'Str0ngPass!' } });

    await fireEvent.submit(inputField);

    expect(mockConfirm).toHaveBeenCalledWith('Str0ngPass!');
  });
});
