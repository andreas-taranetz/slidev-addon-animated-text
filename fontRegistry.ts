const customFonts = new Map();
let defaultFontName;

export function registerFontBundle(name, bundle) {
  customFonts.set(name, bundle);
}

export function setDefaultFont(name) {
  defaultFontName = name;
}

export function getFont(name) {
  return customFonts.get(name);
}

export function getDefaultFont() {
  return defaultFontName;
}
