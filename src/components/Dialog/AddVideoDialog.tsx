import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import { useVideoStore } from "@store";
import { isValidVideoUrl } from "@utils";
import styles from "./Dialog.module.css";

interface AddVideoDialogProps {
	triggerClassName?: string;
}

export const AddVideoDialog = ({ triggerClassName }: AddVideoDialogProps) => {
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState("");
	const [url, setUrl] = useState("");
	const { addVideo, setPlaying } = useVideoStore();

	const handleOpenChange = (newOpen: boolean) => {
		setOpen(newOpen);
		if (newOpen) {
			setPlaying(false);
		} else {
			setPlaying(true);
			setTitle("");
			setUrl("");
		}
	};

	const handleSubmit = async () => {
		if (!title.trim() || !url.trim() || !isValidVideoUrl(url)) {
			return;
		}
		await addVideo(url, title);
		setOpen(false);
		setTitle("");
		setUrl("");
	};

	return (
		<Dialog.Root open={open} onOpenChange={handleOpenChange}>
			<Dialog.Trigger asChild>
				<button className={triggerClassName || styles.iconButton} type="button" aria-label="Add video">
					<PlusIcon />
				</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className={styles.overlay} />
				<Dialog.Content className={styles.content}>
					<Dialog.Title className={styles.title}>Add Video</Dialog.Title>
					<Dialog.Description className={styles.description}>
						You should set Title and paste url link video for working with.
					</Dialog.Description>
					<div className={styles.form}>
						<label className={styles.label}>
							Title Video
							<input
								className={styles.input}
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="Enter video title"
							/>
						</label>
						<label className={styles.label}>
							Url Video
							<input
								className={styles.input}
								type="url"
								value={url}
								onChange={(e) => setUrl(e.target.value)}
								placeholder="https://youtu.be/..."
							/>
						</label>
					</div>
					<div className={styles.actions}>
						<Dialog.Close asChild>
							<button className={styles.button} type="button">
								Cancel
							</button>
						</Dialog.Close>
						<button
							className={`${styles.button} ${styles.primary}`}
							type="button"
							onClick={handleSubmit}
							disabled={!title.trim() || !url.trim() || !isValidVideoUrl(url)}
						>
							Add Video
						</button>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

