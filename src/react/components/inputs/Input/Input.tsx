import styles from "./Input.module.scss";

interface InputProps {
  id?: string;
  type?: string;
  name?: string;
  pattern?: string;
  placeholder?: string;
}

export const Input = (props: InputProps) => {
  return <input className={styles.input} {...props} />;
};
