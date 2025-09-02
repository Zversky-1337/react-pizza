import { useLocation } from "react-router-dom";
import styles from "./NotFound.module.scss";

const NotFoundBlock = () => {
  const location = useLocation();

  // Если открыта модалка, не показываем NotFound
  if (location.pathname.startsWith("/modal/")) return null;

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
