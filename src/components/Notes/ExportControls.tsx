import { GearIcon } from "@radix-ui/react-icons";
import { settingsService } from "@services";
import { useNotesStore } from "@store";
import { copyToClipboard, formatToHtml, formatToMarkdown, formatToText } from "@utils";
import { useEffect, useState } from "react";
import styles from "./Notes.module.css";

interface ExportSettings {
	exportHtml: boolean;
	exportMd: boolean;
	exportTxt: boolean;
}

export const ExportControls = () => {
	const { notes } = useNotesStore();
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [exportSettings, setExportSettings] = useState<ExportSettings>({
		exportHtml: true,
		exportMd: true,
		exportTxt: true,
	});

	useEffect(() => {
		Promise.all([
			settingsService.get("exportHtml"),
			settingsService.get("exportMd"),
			settingsService.get("exportTxt"),
		]).then(([exportHtml, exportMd, exportTxt]) => {
			setExportSettings({ exportHtml, exportMd, exportTxt });
		});
	}, []);

	const handleToggle = async (key: keyof ExportSettings) => {
		const newValue = !exportSettings[key];
		setExportSettings((prev) => ({ ...prev, [key]: newValue }));
		await settingsService.set(key, newValue);
	};

	const handleExport = async (format: "HTML" | "Markdown" | "Text") => {
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
		await copyToClipboard(text);
	};

	return (
		<div className={styles.controls}>
			<div className={styles.controlsRow}>
				{exportSettings.exportHtml && (
					<button
						className={styles.exportButton}
						type="button"
						onClick={() => handleExport("HTML")}
					>
						HTML
					</button>
				)}
				{exportSettings.exportTxt && (
					<button
						className={styles.exportButton}
						type="button"
						onClick={() => handleExport("Text")}
					>
						TEXT
					</button>
				)}
				{exportSettings.exportMd && (
					<button
						className={styles.exportButton}
						type="button"
						onClick={() => handleExport("Markdown")}
					>
						MARKDOWN
					</button>
				)}
				<button
					className={styles.settingsToggle}
					type="button"
					onClick={() => setSettingsOpen((v) => !v)}
					aria-label="Toggle export settings"
					aria-expanded={settingsOpen}
				>
					<GearIcon />
				</button>
			</div>
			{settingsOpen && (
				<div className={styles.controlsSettings}>
					<label className={styles.settingsLabel}>
						<input
							type="checkbox"
							checked={exportSettings.exportHtml}
							onChange={() => handleToggle("exportHtml")}
						/>
						HTML
					</label>
					<label className={styles.settingsLabel}>
						<input
							type="checkbox"
							checked={exportSettings.exportTxt}
							onChange={() => handleToggle("exportTxt")}
						/>
						Text
					</label>
					<label className={styles.settingsLabel}>
						<input
							type="checkbox"
							checked={exportSettings.exportMd}
							onChange={() => handleToggle("exportMd")}
						/>
						Markdown
					</label>
				</div>
			)}
		</div>
	);
};
