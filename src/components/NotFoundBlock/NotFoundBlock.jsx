import styles from "./NotFound.module.scss";

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>☹️</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>К сожалению страница отсутствует</p>
    </div>
  );
};

export default NotFoundBlock;
