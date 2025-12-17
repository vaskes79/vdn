import { useEffect } from 'react';
import { seedDatabase } from '@db';
import { useVideoStore, useNotesStore, useAppStore } from '@store';
import { formatToMarkdown, copyToClipboard } from '@utils';

export function App() {
	const { videos, currentVideoUrl, loadVideos, addVideo, removeVideo, setCurrentVideo } = useVideoStore();
	const { notes, loadNotes, addNote, removeNote, editNote } = useNotesStore();
	const { sidebarOpen, toggleSidebar } = useAppStore();

	useEffect(() => {
		seedDatabase().then(() => loadVideos());
	}, []);

	useEffect(() => {
		if (currentVideoUrl) {
			loadNotes(currentVideoUrl);
		}
	}, [currentVideoUrl]);

	// Тестовые функции доступны в консоли
	useEffect(() => {
		(window as any).vdn = {
			addVideo: (url: string, title: string) => addVideo(url, title),
			removeVideo: (url: string) => removeVideo(url),
			addNote: (title: string, time: number) => addNote(title, time),
			removeNote: (id: number) => removeNote(id),
			editNote: (id: number, title: string) => editNote(id, title),
			exportMarkdown: () => {
				const md = formatToMarkdown(notes);
				copyToClipboard(md);
				console.log('Copied to clipboard:\n', md);
			},
		};
		console.log('VDN Test API available: window.vdn');
	}, [notes]);

	return (
		<div style={{ padding: 20, fontFamily: 'monospace' }}>
			<h1>VDN Test App</h1>

			<section>
				<h2>Current Video: {currentVideoUrl}</h2>
				<h3>Videos ({videos.length})</h3>
				<ul>
					{videos.map((v) => (
						<li key={v.url} onClick={() => setCurrentVideo(v.url)} style={{ cursor: 'pointer' }}>
							{v.title} {v.url === currentVideoUrl && '✓'}
						</li>
					))}
				</ul>
			</section>

			<section>
				<h3>Notes ({notes.length})</h3>
				<ul>
					{notes.map((n) => (
						<li key={n.id}>
							[{n.time}s] {n.title}
						</li>
					))}
				</ul>
			</section>

			<section>
				<h3>Console Commands</h3>
				<pre>
					{`vdn.addVideo(url, title)
vdn.removeVideo(url)
vdn.addNote(title, timeInSeconds)
vdn.removeNote(id)
vdn.editNote(id, newTitle)
vdn.exportMarkdown()`}
				</pre>
			</section>
		</div>
	);
}
