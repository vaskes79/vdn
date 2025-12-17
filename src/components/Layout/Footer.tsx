import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useVideoStore } from "@store";
import styles from "./Layout.module.css";

const About = () => {
	return (
		<div>
			<p>
				Video Notes (VDN) - это приложение для создания заметок к видео с YouTube и Vimeo с
				временными метками.
			</p>
			<p>Все данные хранятся локально в вашем браузере.</p>
		</div>
	);
};

const InfoDialog = () => {
	const [open, setOpen] = useState(false);
	const { setPlaying } = useVideoStore();

	const handleOpenChange = (newOpen: boolean) => {
		setOpen(newOpen);
		if (newOpen) {
			setPlaying(false);
		} else {
			setPlaying(true);
		}
	};

	return (
		<Dialog.Root open={open} onOpenChange={handleOpenChange}>
			<Dialog.Trigger asChild>
				<button className={styles.infoButton} type="button" aria-label="About">
					<InfoCircledIcon />
				</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className={styles.dialogOverlay} />
				<Dialog.Content className={styles.dialogContent}>
					<Dialog.Title className={styles.dialogTitle}>Info About Project</Dialog.Title>
					<Dialog.Description className={styles.dialogDescription}>
						<About />
					</Dialog.Description>
					<div className={styles.dialogActions}>
						<Dialog.Close asChild>
							<button className={styles.button} type="button">
								Close Info
							</button>
						</Dialog.Close>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className={styles.footer}>
			<div className={styles.footerLeft}>
				<span>
					Copyright ©{" "}
					<a href="https://vdn.netlify.com/" className={styles.link}>
						Video Notes
					</a>{" "}
					{currentYear}.
				</span>
			</div>
			<div className={styles.footerRight}>
				<InfoDialog />
			</div>
		</footer>
	);
};

