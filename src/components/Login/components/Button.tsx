import React from 'react';

import './button-style.scss';

type ButtonProps = {
  disabled: boolean;
  children: string;
}

const Button: React.FC<ButtonProps> = ({ disabled, children }) => (
  <button
    type="submit"
    className="button mt-24px"
    disabled={disabled}>
    { children }
  </button>
);

export default React.memo(Button);
