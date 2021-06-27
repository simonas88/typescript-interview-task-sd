import React, { useCallback, useState } from 'react';

type PasswordProps = {
  onConfirm: (password: string) => void;
  onCancel: () => void;
}

const PasswordForm: React.FC<PasswordProps> = ({ onConfirm, onCancel }) => {
  const [newPass, setNewPass] = useState('');
  
  const handleConfirm = useCallback(
    () => void onConfirm(newPass),
    [newPass],
  );

  const handleCancel = useCallback(() => {
    onCancel();
    setNewPass('');
  }, []);

  return (
    <>
      <h1>Update Password</h1>
      <input
        placeholder="new password"
        className="input"
        value={newPass}
        onChange={(event) => setNewPass(event.target.value)} 
      />
      <div className="pt-12px text-center">
        <button className="button" onClick={handleConfirm}>Change</button>
        <button className="button ml-12px" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default PasswordForm;
