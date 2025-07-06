import React from 'react';
import styles from './Input.module.css';

type InputProps = React.ComponentProps<'input'>;

const Input = (props: InputProps) => {
  return <input className={styles.input} {...props} />;
};

export default Input;