import { db } from './database';
import type { Video, Note, Setting } from '@types';

const DEMO_VIDEO: Video = {
	url: 'https://youtu.be/cCOL7MC4Pl0',
	title: 'Demo Video - React Tutorial',
};

const DEMO_NOTES: Omit<Note, 'id'>[] = [
	{ url: DEMO_VIDEO.url, title: 'Introduction to React', time: 0 },
	{ url: DEMO_VIDEO.url, title: 'Components and Props', time: 120 },
	{ url: DEMO_VIDEO.url, title: 'State Management', time: 300 },
];

const DEFAULT_SETTINGS: Setting[] = [
	{ name: 'currentVideo', value: DEMO_VIDEO.url },
	{ name: 'timeOffset', value: 3 },
	{ name: 'exportHtml', value: true },
	{ name: 'exportMd', value: true },
	{ name: 'exportTxt', value: true },
];

export async function seedDatabase(): Promise<void> {
	const videoCount = await db.videos.count();

	if (videoCount === 0) {
		await db.transaction('rw', [db.videos, db.notes, db.settings], async () => {
			await db.videos.add(DEMO_VIDEO);
			await db.notes.bulkAdd(DEMO_NOTES as Note[]);
			await db.settings.bulkAdd(DEFAULT_SETTINGS);
		});
		console.log('Database seeded with demo data');
	}
}

