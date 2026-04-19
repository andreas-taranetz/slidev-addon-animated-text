export async function loadTegakiBundle(path, family, options = {}) {
  const baseUrl = import.meta.env.BASE_URL;
  const normalizedPath = path.replace(/^\/+|\/+$/g, '');
  const fontFile = options.fontFile ?? `${normalizedPath.split('/').at(-1)}.ttf`;
  const fontUrl = `${baseUrl}${normalizedPath}/${fontFile}`;
  const glyphData = await fetch(`${baseUrl}${normalizedPath}/glyphData.json`).then(response => response.json());

  return {
    version: options.version ?? 0,
    family,
    lineCap: options.lineCap ?? 'round',
    fontUrl,
    fontFaceCSS: `@font-face { font-family: '${family}'; src: url(${fontUrl}); }`,
    unitsPerEm: options.unitsPerEm ?? 1000,
    ascender: options.ascender ?? 900,
    descender: options.descender ?? -250,
    glyphData,
  };
}
