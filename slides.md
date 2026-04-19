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

# <animated-text text="Animated text" :speed="2.3" />

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
