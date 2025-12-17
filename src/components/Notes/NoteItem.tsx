import { usePlayer } from "@components/Video/PlayerContext";
import { EditDialog, ConfirmDialog } from "@components/Dialog";
import { formatTime } from "@utils";
import type { Note } from "@types";
import styles from "./Notes.module.css";

interface NoteItemProps {
  note: Note;
}

export const NoteItem = ({ note }: NoteItemProps) => {
  const playerContext = usePlayer();
  const { seekTo } = playerContext;
  const timeString = formatTime(note.time);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (note.time !== undefined && note.time !== null && typeof seekTo === "function") {
      seekTo(note.time);
    }
  };

  return (
    <div className={styles.noteItem}>
      <button className={styles.noteItemButton} onClick={handleClick} type="button">
        <div className={styles.noteItemContent}>
          <span className={styles.noteItemTime}>{timeString}</span>
          <span className={styles.noteItemTitle}>{note.title}</span>
        </div>
      </button>
      <div className={styles.noteItemActions}>
        {note.id !== undefined && (
          <>
            <EditDialog
              type="note"
              id={note.id}
              title={note.title}
              label="Change Description Note"
              description={timeString}
            />
            <ConfirmDialog type="note" id={note.id} title={timeString} description={note.title} />
          </>
        )}
      </div>
    </div>
  );
};
