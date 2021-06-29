import React from 'react';
import ReactModal from 'react-modal';
import { APP_ROOT_ID } from '~/constants';

ReactModal.setAppElement(`#${APP_ROOT_ID}`);

const WrappedModal: React.FC<ReactModal.Props> = props => (
  <ReactModal {...props} />
);

export default WrappedModal;
