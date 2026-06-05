import * as Dialog from "@radix-ui/react-dialog";
import { TrashIcon } from "@radix-ui/react-icons";
import { useNotesStore, useVideoStore } from "@store";
import { useState } from "react";
import styles from "./Dialog.module.css";

type ConfirmDialogProps =
	| { type: "video"; id: string; title: string; description: string }
	| { type: "note"; id: number; title: string; description: string };

export const ConfirmDialog = ({ type, id, title, description }: ConfirmDialogProps) => {
	const [open, setOpen] = useState(false);
	const setPlaying = useVideoStore((s) => s.setPlaying);
	const removeVideo = useVideoStore((s) => s.removeVideo);
	const removeNote = useNotesStore((s) => s.removeNote);

	const handleOpenChange = (newOpen: boolean) => {
		setOpen(newOpen);
		setPlaying(!newOpen);
	};

	const handleConfirm = async () => {
		if (type === "video") {
			await removeVideo(id);
		} else {
			await removeNote(id);
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
