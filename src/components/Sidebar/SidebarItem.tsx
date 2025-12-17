import { useVideoStore, useAppStore } from "@store";
import { EditDialog } from "@components/Dialog";
import { ConfirmDialog } from "@components/Dialog";
import styles from "./Sidebar.module.css";

interface SidebarItemProps {
	video: {
		url: string;
		title: string;
	};
}

export const SidebarItem = ({ video }: SidebarItemProps) => {
	const { setCurrentVideo } = useVideoStore();
	const { setSidebarOpen } = useAppStore();

	const handleClick = async () => {
		await setCurrentVideo(video.url);
		setSidebarOpen(false);
	};

	return (
		<div className={styles.item}>
			<button className={styles.itemButton} onClick={handleClick} type="button">
				<span className={styles.itemTitle}>{video.title}</span>
			</button>
			<div className={styles.itemActions}>
				<EditDialog
					type="video"
					id={video.url}
					title={video.title}
					label="Change Title"
				/>
				<ConfirmDialog
					type="video"
					id={video.url}
					title={video.title}
					description={video.url}
				/>
			</div>
		</div>
	);
};

