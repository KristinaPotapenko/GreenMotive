import React, { forwardRef } from "react";
import cl from "classnames";

import styles from "./Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...rest }, ref) => {
    return (
      <input ref={ref} className={cl(styles.input, className)} {...rest} />
    );
  }
);

Input.displayName = "Input";
