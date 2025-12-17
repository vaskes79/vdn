import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useVideoStore, useNotesStore } from "@store";
import styles from "./Dialog.module.css";

interface EditDialogProps {
	type: "video" | "note";
	id: string | number;
	title: string;
	label: string;
	description?: string;
}

export const EditDialog = ({ type, id, title: initialTitle, label, description }: EditDialogProps) => {
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState(initialTitle);
	const { editVideo, setPlaying: setVideoPlaying } = useVideoStore();
	const { editNote } = useNotesStore();

	const handleOpenChange = (newOpen: boolean) => {
		setOpen(newOpen);
		if (newOpen) {
			setVideoPlaying(false);
			setTitle(initialTitle);
		} else {
			setVideoPlaying(true);
		}
	};

	const handleSubmit = async () => {
		if (type === "video") {
			await editVideo(id as string, title);
		} else {
			await editNote(id as number, title);
		}
		setOpen(false);
	};

	return (
		<Dialog.Root open={open} onOpenChange={handleOpenChange}>
			<Dialog.Trigger asChild>
				<button className={styles.iconButton} type="button" aria-label="Edit">
					<Pencil1Icon />
				</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className={styles.overlay} />
				<Dialog.Content className={styles.content}>
					<Dialog.Title className={styles.title}>{description || id}</Dialog.Title>
					<div className={styles.form}>
						<label className={styles.label}>
							{label}
							<input
								className={styles.input}
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</label>
					</div>
					<div className={styles.actions}>
						<span className={styles.confirmQuestion}>Edit this item?</span>
						<Dialog.Close asChild>
							<button className={styles.button} type="button">
								Cancel
							</button>
						</Dialog.Close>
						<button
							className={`${styles.button} ${styles.primary}`}
							type="button"
							onClick={handleSubmit}
							disabled={!title.trim()}
						>
							Ok
						</button>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

