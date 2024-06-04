import styles from "./admin.module.css";

const AdminLayout =({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles["adminContent"]}>{children}</div>
  )
}

export default AdminLayout