import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#app');

const WrappedModal: React.FC<ReactModal.Props> = props => (
  <ReactModal {...props} />
);

export default WrappedModal;
