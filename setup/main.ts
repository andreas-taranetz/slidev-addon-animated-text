import { defineAppSetup } from '@slidev/types';
import comicNeueBundle from '../comic-neue/bundle.ts';
import { registerFontBundle, setDefaultFont } from '../fontRegistry.ts';

export default defineAppSetup(() => {
  registerFontBundle('comic-neue', comicNeueBundle);
  setDefaultFont('comic-neue');
});
