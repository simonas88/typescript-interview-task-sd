import React, { FormEventHandler, useCallback, useState } from 'react';
import ErrorBlock from '~/components/ErrorBlock';
import { IItem } from '~/services/getUserItems';
import itemHasWeakPassword from '~/utils/itemHasWeakPassword';

import './password-form-style.scss';

type PasswordFormProps = {
  onConfirm: (password: string) => void;
  onCancel: () => void;
}

const PasswordForm: React.FC<PasswordFormProps> = ({ onConfirm, onCancel }) => {
  const [newPass, setNewPass] = useState('');

  const passwordTooWeak = itemHasWeakPassword({ password: newPass } as IItem);
  
  const handleConfirm = useCallback<FormEventHandler<HTMLFormElement>>(
    event => {
      event.preventDefault();
      onConfirm(newPass);
    },
    [newPass],
  );

  const handleCancel = useCallback(() => {
    onCancel();
    setNewPass('');
  }, []);

  return (
    <>
      <h1>Update Password</h1>
      <form
        className="password-form"
        onSubmit={handleConfirm}>
        <input
          autoFocus
          placeholder="new password"
          className="input"
          value={newPass}
          onChange={(event) => setNewPass(event.target.value)} 
        />
        { newPass && passwordTooWeak ? <ErrorBlock error="Password too weak" /> : null }
        <div className="pt-12px text-center">
          <button
            className="button"
            type="submit"
            disabled={passwordTooWeak}>
            Change
          </button>
          <button className="button ml-12px" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default PasswordForm;
