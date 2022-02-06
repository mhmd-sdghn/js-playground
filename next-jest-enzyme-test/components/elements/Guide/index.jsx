import PropsTypes from "prop-types";
import styles from "../../../styles/Home.module.css";

export default function Guide({ href, title, description }) {
  return (
    <a href={href} className={styles.card}>
      <h2>{title} &rarr;</h2>
      <p>{description}</p>
    </a>
  );
}

Guide.propsTypes = {
  href: PropsTypes.string.isRequired,
  title: PropsTypes.string.isRequired,
  description: PropsTypes.string.isRequired,
};
