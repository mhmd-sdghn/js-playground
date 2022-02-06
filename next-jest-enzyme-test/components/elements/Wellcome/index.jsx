import styles from '../../../styles/Home.module.css'

export default function Wellcome() {
  return (
    <div id="wellcome">
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>

      <p className={styles.description}>
        Get started by editing{" "}
        <code className={styles.code}>pages/index.js</code>
      </p>
    </div>
  );
}
