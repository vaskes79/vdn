import { AddVideoDialog } from "@components/Dialog";
import { VideoIcon } from "@radix-ui/react-icons";
import styles from "./Layout.module.css";

export const EmptyState = () => {
	return (
		<div className={styles.emptyState}>
			<VideoIcon className={styles.emptyStateIcon} />
			<h2 className={styles.emptyStateTitle}>No videos yet</h2>
			<p className={styles.emptyStateText}>Add your first video to get started</p>
			<AddVideoDialog triggerClassName={styles.emptyStateButton} />
		</div>
	);
};
