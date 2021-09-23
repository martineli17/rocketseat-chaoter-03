import styles from './styles.module.scss';

export function Loading() {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.loader}></div>
            <p>Carregando...</p>
        </div>
    )
}