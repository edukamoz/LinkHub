import React from "react";
import styles from "./Button.module.css";

type ButtonProps = React.ComponentProps<"button"> & {
  className?: string;
};

const Button = ({ children, className, ...props }: ButtonProps) => {
  const combinedClassName = `${styles.button} ${className || ""}`;

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
