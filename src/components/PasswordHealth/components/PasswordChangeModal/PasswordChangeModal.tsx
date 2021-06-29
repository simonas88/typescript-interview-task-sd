import React from 'react';
import Modal from '~/components/Modal';
import { Item } from '~/types';
import PasswordForm from '../PasswordForm/PasswordForm';

type PasswordChangeModalProps = {
  item: Item | null;
  onChange: (item: Item) => void;
  onClose: () => void;
}

const PasswordChangeModal: React.FC<PasswordChangeModalProps> = ({
  item,
  onChange,
  onClose,
}) => {
  const handlePasswordUpdate = (password: string): void => {
    onChange({ ...item, password });
    onClose();
  };

  return (
    <Modal
      className="modal"
      isOpen={!!item}
      onRequestClose={onClose}
      contentLabel="Example Modal"
    >
      <PasswordForm
        onConfirm={handlePasswordUpdate}
        onCancel={onClose} />
    </Modal>
  );
};

export default PasswordChangeModal;
