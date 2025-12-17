import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { TrashIcon } from "@radix-ui/react-icons";
import { useVideoStore, useNotesStore } from "@store";
import styles from "./Dialog.module.css";

interface ConfirmDialogProps {
	type: "video" | "note";
	id: string | number;
	title: string;
	description: string;
}

export const ConfirmDialog = ({ type, id, title, description }: ConfirmDialogProps) => {
	const [open, setOpen] = useState(false);
	const { removeVideo, setPlaying: setVideoPlaying } = useVideoStore();
	const { removeNote } = useNotesStore();

	const handleOpenChange = (newOpen: boolean) => {
		setOpen(newOpen);
		if (newOpen) {
			setVideoPlaying(false);
		} else {
			setVideoPlaying(true);
		}
	};

	const handleConfirm = async () => {
		if (type === "video") {
			await removeVideo(id as string);
		} else {
			await removeNote(id as number);
		}
		setOpen(false);
	};

	return (
		<Dialog.Root open={open} onOpenChange={handleOpenChange}>
			<Dialog.Trigger asChild>
				<button className={styles.iconButton} type="button" aria-label="Delete">
					<TrashIcon />
				</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className={styles.overlay} />
				<Dialog.Content className={styles.content}>
					<Dialog.Title className={styles.title}>{title}</Dialog.Title>
					<Dialog.Description className={styles.description}>{description}</Dialog.Description>
					<div className={styles.actions}>
						<span className={styles.confirmQuestion}>Delete this item?</span>
						<Dialog.Close asChild>
							<button className={styles.button} type="button">
								Cancel
							</button>
						</Dialog.Close>
						<button
							className={`${styles.button} ${styles.primary}`}
							type="button"
							onClick={handleConfirm}
						>
							Ok
						</button>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

