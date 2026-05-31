/**
 * @minidi/minidi-data-ghpage
 *
 * Generic MiniDi knowledge graph frontend library.
 * Drop it into any MiniDi-compatible data repo with a config object.
 *
 * Usage:
 *
 *   import { createMiniDiApp } from "@minidi/minidi-data-ghpage";
 *   import config from "./config.js";
 *   createMiniDiApp(config);
 */

import { setConfig } from "./config/store.js";
import { validateConfig } from "./config/validate.js";
import { initI18n } from "./utils/i18n.js";
import { initPrefs, loadPrefs, applyTheme } from "./utils/preferences.js";
import { setLang } from "./utils/i18n.js";
import "./app-shell.js";

export { MiniApp } from "./app-shell.js";

export * from "./utils/i18n.js";
export * from "./utils/data-loader.js";
export * from "./utils/bm25.js";
export * from "./utils/preferences.js";
export * from "./utils/theme-colors.js";
export * from "./utils/gallery-utils.js";
export * from "./utils/wikidata-fetcher.js";

/**
 * Bootstrap a MiniDi ghpage application.
 *
 * @param {object} config - Country/repo configuration object
 */
export function createMiniDiApp(config) {
  const validated = validateConfig(config);

  // 1. Store config globally so all components can read it
  setConfig(validated);

  // 2. Init i18n with country translations
  initI18n(validated.translations, validated.defaultLanguage);

  // 3. Init preferences with country default language
  initPrefs(validated.defaultLanguage);

  // 4. Apply persisted preferences (language + theme)
  const prefs = loadPrefs();
  setLang(prefs.lang);
  applyTheme(prefs.theme);
}
