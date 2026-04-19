# slidev-addon-animated-text

Slidev addon exposing an `<animated-text>` component powered by [Tegaki](https://gkurt.com/tegaki/).

See the example here [andreas-taranetz.github.io/slidev-addon-animated-text/](andreas-taranetz.github.io/slidev-addon-animated-text/)

## Install

```bash
npm i slidev-addon-animated-text
```

## Use In A Deck

Add the addon in your `slides.md` frontmatter:

```yaml
---
addons:
  - slidev-addon-animated-text
---
```

Then use the component directly in your slides:

```html
<animated-text text="Hello World!" />
```

## Built-In Fonts

The component supports the built-in Tegaki font bundles via the `font` prop:

- `caveat`
- `italianno`
- `tangerine`
- `parisienne`

Example:

```html
<animated-text text="Hello World!" font="italianno" />
```

## Props

The component exposes the common Tegaki renderer options plus a few addon-level conveniences.

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `text` | `string` | required | Text to render |
| `font` | `'caveat' \| 'italianno' \| 'tangerine' \| 'parisienne'` | `caveat` | Built-in Tegaki font bundle |
| `font-size` | `string` | `48px` | Applied to the Tegaki container |
| `speed` | `number` | `1` | Simple playback speed control |
| `loop` | `boolean` | `false` | Loop the animation |
| `delay` | `number` | `0` | Delay before animation start in seconds |
| `time` | `number \| object` | `undefined` | Advanced Tegaki time control override. Takes precedence over `speed`, `loop`, and `delay` |
| `effects` | `object` | `undefined` | Tegaki effects config |
| `quality` | `object` | `undefined` | Tegaki quality config |
| `timing` | `object` | `undefined` | Tegaki timing config |
| `show-overlay` | `boolean` | `false` | Shows the text overlay for debugging |
| `on-complete` | `function` | `undefined` | Completion callback |
| `direction` | `string` | `undefined` | Text direction |

## Examples

```html
<animated-text
  text="Fast loop"
  font="tangerine"
  font-size="56px"
  :speed="2"
  :loop="true"
/>
```

```html
<animated-text
  text="Fancy effects"
  font="parisienne"
  :effects="{ glow: { radius: 8, color: '#00ccff' }, gradient: { colors: 'rainbow' } }"
/>
```

Advanced `time` override example:

```html
<animated-text
  text="Start late"
  :time="{ mode: 'uncontrolled', initialTime: 0.4, delay: 0.3, speed: 1.2, loop: true }"
/>
```

## Local Preview

Use the addon locally while developing it:

```yaml
---
addons:
  - "@/"
---
```

Then run:

```bash
pnpm install
pnpm dev
```

The package publishes source files directly. Slidev compiles the addon when it is consumed.
