export interface Setting {
	name: string; // Primary key
	value: string | number | boolean;
}

export interface AppSettings {
	currentVideo: string;
	timeOffset: number;
	exportHtml: boolean;
	exportMd: boolean;
	exportTxt: boolean;
}
