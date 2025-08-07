import styles from './ErrorMessage.module.css';

type ErrorMessageProps = {
    message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => (
    <div className={styles.error}>
        <span role="img" aria-label="Error" className={styles.icon}>
            ⚠️
        </span>
        {message}
    </div>
);

export default ErrorMessage;
