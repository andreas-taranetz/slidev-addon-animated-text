---
addons:
  - "@/"
theme: default
layout: cover
class: text-center
title: Animated Text Addon
info: |
  ## slidev-addon-animated-text

  Tegaki-powered animated handwriting text for Slidev.
transition: slide-left
drawings:
  persist: false
comark: true
duration: 10min
---

# <animated-text text="Animated text" :speed="2.3" font="caveat" />
<!-- Specify caveat since the default font was overridden -->

<p class="text-lg">
  Tegaki-powered animated text for Slidev.
</p>

<div class="mt-6 flex items-center justify-center gap-8 text-2xl">
  <a
    class="border-none!"
    href="https://github.com/andreas-taranetz/slidev-addon-animated-text"
    target="_blank"
    title="GitHub"
  >
    <div class="bg-white rounded-[100%]">
      <logos-github-icon />
    </div>
  </a>
  <a
    class="border-none!"
    href="https://www.npmjs.com/package/slidev-addon-animated-text"
    target="_blank"
    title="npm"
  >
    <logos-npm-icon />
  </a>
</div>

---

# How to add it to your slides

Adjust depending on your package manager

Install the addon:

```bash
pnpm i slidev-addon-animated-text
```

Register it in your `slides.md` frontmatter:

```yaml
---
addons:
  - slidev-addon-animated-text
---
```

Use the component in any slide:

```html
<animated-text text="Hello World!" />
```

<animated-text text="Hello World!" font="caveat"/>
<!-- Specify caveat since the default font was overridden -->

---

# Built-In Fonts

```html
<animated-text text="Caveat" font="caveat" />
<animated-text text="Italianno" font="italianno" />
<animated-text text="Tangerine" font="tangerine" />
<animated-text text="Parisienne" font="parisienne" />
```

<div class="text-4xl">
<animated-text text="Caveat" font="caveat" /><br/>
<animated-text text="Italianno" font="italianno" /><br/>
<animated-text text="Tangerine" font="tangerine" /><br/>
<animated-text text="Parisienne" font="parisienne" />
</div>

---

# Use any font

Generate a bundle using the [Tegaki generator](https://gkurt.com/tegaki/generator/) and store the unzipped generator output in your project.

For example `comic-neue/` contains: `bundle.ts`, `glyphData.json`, and `comic-neue.ttf`.

Register the new font in the `setup/main.ts` and used it in your slides with the `animated-text` component.

```typescript {3-4,7-8}
// setup/main.ts
import { defineAppSetup } from '@slidev/types';
import comicNeueBundle from './comic-neue/bundle.ts';
import { registerFontBundle, setDefaultFont } from 'slidev-addon-animated-text/fontRegistry';

export default defineAppSetup(() => {
  registerFontBundle('comic-neue', comicNeueBundle);
  setDefaultFont('comic-neue');
});
```

```tsx
// slides.md
<animated-text text="Any font can be animated" />
```

<p class="text-6xl">
  <animated-text text="Any font can be animated" :speed="3" />
</p>

---

# Time Control

```html
<animated-text
  text="Fast loop"
  font="tangerine"
  :speed="2"
  :loop="true"
  :delay="1"
  text-4xl
/>
```

<animated-text
  text="Fast loop"
  font="tangerine"
  :speed="2"
  :loop="true"
  :delay="1"
  text-4xl
/>

---

# Effects

```html
  <animated-text
    text="Fancy effects"
    font="parisienne"
    :speed="3"
    :effects="{ glow: { radius: 8, color: '#00ccff' }, gradient: { colors: 'rainbow' } }"
    class="text-[100px]"
  />
```

  <animated-text
    class="text-[100px]"
    text="Fancy effects"
    font="parisienne"
    :speed="3"
    :effects="{ glow: { radius: 8, color: '#00ccff' }, gradient: { colors: 'rainbow' } }"
  />

---

# Full Example

```html
<animated-text
  text="Ship it"
  font="italianno"
  font-size="64px"
  :speed="1.5"
  :loop="true"
  :effects="{ glow: { radius: 6, color: '#7c3aed' }, pressureWidth: { strength: 0.8 } }"
/>
```

<animated-text
  text="Ship it"
  font="italianno"
  font-size="64px"
  :speed="1.5"
  :loop="true"
  :effects="{ glow: { radius: 6, color: '#7c3aed' }, pressureWidth: { strength: 0.8 } }"
/>

See all configuration options in the [Tegaki docs](https://gkurt.com/tegaki/)
