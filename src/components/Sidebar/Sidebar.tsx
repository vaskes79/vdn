import * as Dialog from "@radix-ui/react-dialog";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useAppStore, useVideoStore } from "@store";
import { SidebarItem } from "./SidebarItem";
import styles from "./Sidebar.module.css";

export const Sidebar = () => {
	const { sidebarOpen, setSidebarOpen } = useAppStore();
	const { videos, setPlaying } = useVideoStore();

	const handleOpenChange = (open: boolean) => {
		setSidebarOpen(open);
		if (!open) {
			setPlaying(true);
		} else {
			setPlaying(false);
		}
	};

	return (
		<Dialog.Root open={sidebarOpen} onOpenChange={handleOpenChange}>
			<Dialog.Trigger asChild>
				<button className={styles.trigger} type="button" aria-label="Open sidebar">
					<HamburgerMenuIcon />
				</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className={styles.overlay} />
				<Dialog.Content className={styles.content}>
					<Dialog.Title className={styles.title}>Videos</Dialog.Title>
					<div className={styles.list}>
						{videos.map((video) => (
							<SidebarItem key={video.url} video={video} />
						))}
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

