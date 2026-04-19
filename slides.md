---
addons:
  - /Users/andreas.taranetz/projects/slidev-addon-animated-text
theme: default
layout: center
title: Animated Text Addon
info: |
  ## slidev-addon-animated-text

  Tegaki-powered animated handwriting text for Slidev.
class: text-center
transition: slide-left
drawings:
  persist: false
comark: true
duration: 10min
---

<div>
  <animated-text
    text="Animated text"
    font-size="88px"
    :speed="2.3"
  />

  <p class="text-lg opacity-75">
    Tegaki-powered animated handwriting text for Slidev.
  </p>
</div>

---

# Add To Your Deck

Install the addon:

```bash
npm i slidev-addon-animated-text
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

<p><animated-text text="Caveat" font="caveat" /></p>
<p><animated-text text="Italianno" font="italianno" /></p>
<p><animated-text text="Tangerine" font="tangerine" /></p>
<p><animated-text text="Parisienne" font="parisienne" /></p>

---

# Time Control

```html
<animated-text
  text="Fast loop"
  font="tangerine"
  :speed="2"
  :loop="true"
  :delay="1"
/>
```

<animated-text
  text="Fast loop"
  font="tangerine"
  :speed="2"
  :loop="true"
  :delay="1"
/>

---

# Effects

```html
<animated-text
  text="Fancy effects"
  font="parisienne"
  font-size="56px"
  :effects="{ glow: { radius: 8, color: '#00ccff' }, gradient: { colors: 'rainbow' } }"
/>
```

<animated-text
  text="Fancy effects"
  font="parisienne"
  font-size="56px"
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

---

# Advanced Time Override

Use `time` only when you need Tegaki's full time-control API.

```html
<animated-text
  text="Start late"
  :time="{ mode: 'uncontrolled', initialTime: 0.4, delay: 0.3, speed: 1.2, loop: true }"
/>
```

<animated-text
  text="Start late"
  :time="{ mode: 'uncontrolled', initialTime: 0.4, delay: 0.3, speed: 1.2, loop: true }"
/>
