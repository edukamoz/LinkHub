import React from 'react';
import styles from './Button.module.css';

type ButtonProps = React.ComponentProps<'button'>;

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
};

export default Button;