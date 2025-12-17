import { useState, FormEvent } from "react";
import { useNotesStore, useVideoStore } from "@store";
import { usePlayer } from "@components/Video/PlayerContext";
import styles from "./Notes.module.css";

export const AddNoteForm = () => {
	const [note, setNote] = useState("");
	const { addNote } = useNotesStore();
	const { setPlaying } = useVideoStore();
	const { getCurrentTime } = usePlayer();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPlaying(false);
		setNote(e.target.value);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!note.trim()) return;

		const currentTime = getCurrentTime();
		await addNote(note, currentTime);
		setNote("");
		setPlaying(true);
	};

	return (
		<form className={styles.addNoteForm} onSubmit={handleSubmit}>
			<input
				className={styles.input}
				type="text"
				name="note"
				placeholder="Add new note"
				value={note}
				onChange={handleChange}
			/>
		</form>
	);
};

