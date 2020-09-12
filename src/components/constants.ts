/**
 * Constants for setup indexDB and application settings
 */
export const enum AppSetup {
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
  LIST = "VDN_LIST",
  /**
  *  Name Table with notes for video 
  * @type string
  */
  NOTES = "VDN_NOTES",
  /** 
  * Name Table for settings application (format txt, md, html, etc.) 
  * @type string
  */
  SETTINGS="VDN_SETTINGS",
  /**
  * Teme offcet when user start adding new note 
  * @type number
  */
  TIME_OFFSET = 3
}

