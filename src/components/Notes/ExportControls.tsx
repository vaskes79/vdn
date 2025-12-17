import { useRef } from "react";
import { useNotesStore } from "@store";
import { formatToHtml, formatToMarkdown, formatToText, copyToClipboard } from "@utils";
import styles from "./Notes.module.css";

export const ExportControls = () => {
	const { notes } = useNotesStore();
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleExport = async (format: "HTML" | "Markdown" | "Text") => {
		if (!textareaRef.current) return;

		let text = "";
		switch (format) {
			case "HTML":
				text = formatToHtml(notes);
				break;
			case "Text":
				text = formatToText(notes);
				break;
			default:
				text = formatToMarkdown(notes);
		}

		textareaRef.current.value = text;
		await copyToClipboard(text);
	};

	return (
		<div className={styles.controls}>
			<button
				className={styles.exportButton}
				type="button"
				onClick={() => handleExport("HTML")}
			>
				HTML
			</button>
			<button
				className={styles.exportButton}
				type="button"
				onClick={() => handleExport("Text")}
			>
				TEXT
			</button>
			<button
				className={styles.exportButton}
				type="button"
				onClick={() => handleExport("Markdown")}
			>
				MARKDOWN
			</button>
			<textarea
				ref={textareaRef}
				className={styles.controlsHiddenField}
				defaultValue=""
				aria-hidden="true"
			/>
		</div>
	);
};

