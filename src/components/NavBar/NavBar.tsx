import { AddVideoDialog } from "@components/Dialog";
import { Sidebar } from "@components/Sidebar";
import styles from "./NavBar.module.css";

export const NavBar = () => {
	return (
		<nav className={styles.root}>
			<div className={styles.toolbar}>
				<Sidebar />
				<h1 className={styles.title}>Video Notes</h1>
				<AddVideoDialog triggerClassName={styles.addButton} />
			</div>
		</nav>
	);
};
