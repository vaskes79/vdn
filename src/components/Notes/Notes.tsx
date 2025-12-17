import { useNotesStore } from "@store";
import { AddNoteForm } from "./AddNoteForm";
import { ExportControls } from "./ExportControls";
import { NoteItem } from "./NoteItem";
import styles from "./Notes.module.css";

export const Notes = () => {
	const { notes } = useNotesStore();

	return (
		<div className={styles.root}>
			<ExportControls />
			<AddNoteForm />
			<div className={styles.noteList}>
				{notes.map((note) => (
					<NoteItem key={note.id} note={note} />
				))}
			</div>
		</div>
	);
};

