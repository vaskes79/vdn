/**
 * Constants for setup indexDB and application settings
 */
export enum AppSetup {
  /** 
  * The base name for DB in indexDB
  * @type {string}  
  */
  NAME = "VDN",
  /** 
  * Version in indexDB 
  * @type number
  *
  */
  VER = 3,
  /**
  * Name Table with list added videos 
  * @type string
  */
  LIST = "LIST_VIDEO",
  /**
  *  Name Table with notes for video 
  * @type string
  */
  NOTES = "NOTES",
  /** 
  * Name Table for settings application (format txt, md, html, etc.) 
  * @type string
  */
  SETTINGS="SETTINGS",
  /**
  * Teme offcet when user start adding new note 
  * @type number
  */
  TIME_OFFSET = 3
}

