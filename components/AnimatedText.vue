<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { computeTextLayout, TegakiEngine } from 'tegaki/core';
import caveatBundle from 'tegaki/fonts/caveat';
import italiannoBundle from 'tegaki/fonts/italianno';
import parisienneBundle from 'tegaki/fonts/parisienne';
import tangerineBundle from 'tegaki/fonts/tangerine';
import caveatFontUrl from '../fonts/caveat.ttf' with { type: 'url' };
import italiannoFontUrl from '../fonts/italianno.ttf' with { type: 'url' };
import parisienneFontUrl from '../fonts/parisienne.ttf' with { type: 'url' };
import tangerineFontUrl from '../fonts/tangerine.ttf' with { type: 'url' };
import { getDefaultFont, getFont } from '../fontRegistry.ts';

const FONT_SOURCES = {
  caveat: { bundle: caveatBundle, fontUrl: caveatFontUrl },
  italianno: { bundle: italiannoBundle, fontUrl: italiannoFontUrl },
  parisienne: { bundle: parisienneBundle, fontUrl: parisienneFontUrl },
  tangerine: { bundle: tangerineBundle, fontUrl: tangerineFontUrl },
};

const TEGAKI_PAD_V = 'max(0.2em, 0.9em - 0.5lh)';
const DEFAULT_QUALITY = {
  pixelRatio: 2,
};

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  fontBundle: {
    type: Object,
    default: undefined,
  },
  font: {
    type: String,
    default: undefined,
  },
  speed: {
    type: Number,
    default: 1,
  },
  loop: {
    type: Boolean,
    default: false,
  },
  delay: {
    type: Number,
    default: 0,
  },
  time: {
    type: [Number, Object],
    default: undefined,
  },
  effects: {
    type: Object,
    default: undefined,
  },
  quality: {
    type: Object,
    default: undefined,
  },
  timing: {
    type: Object,
    default: undefined,
  },
  showOverlay: {
    type: Boolean,
    default: false,
  },
  onComplete: {
    type: Function,
    default: undefined,
  },
  direction: {
    type: String,
    default: undefined,
  },
});

const wrapperRef = ref();
const layerRef = ref();
const containerRef = ref();
const mounted = ref(false);
let engine = null;
let initToken = 0;
let visibilityFrame = 0;
let initPending = false;

const resolvedFont = computed(() => {
  if (props.fontBundle)
    return props.fontBundle;

  const fontName = props.font ?? getDefaultFont() ?? 'caveat';

  const registeredFont = getFont(fontName);
  if (registeredFont)
    return registeredFont;

  const source = FONT_SOURCES[fontName] ?? FONT_SOURCES.caveat;
  return {
    ...source.bundle,
    fontUrl: source.fontUrl,
  };
});

const resolvedFontFamily = computed(() => {
  if (resolvedFont.value.fullFamily)
    return `'${resolvedFont.value.family}', '${resolvedFont.value.fullFamily}'`;
  return `'${resolvedFont.value.family}'`;
});

const engineOptions = computed(() => ({
  text: props.text,
  font: resolvedFont.value,
  time: props.time ?? {
    mode: 'uncontrolled',
    speed: props.speed,
    loop: props.loop,
    delay: props.delay,
  },
  effects: props.effects,
  quality: {
    ...DEFAULT_QUALITY,
    ...props.quality,
  },
  timing: props.timing,
  showOverlay: props.showOverlay,
  onComplete: props.onComplete,
  direction: props.direction,
}));

const placeholderStyle = computed(() => ({
  fontFamily: resolvedFontFamily.value,
  fontSize: 'inherit',
  lineHeight: 'inherit',
  display: 'inline-block',
  padding: `${TEGAKI_PAD_V} 0.2em`,
  whiteSpace: 'pre-wrap',
  overflowWrap: 'break-word',
  visibility: 'hidden',
  pointerEvents: 'none',
  userSelect: 'none',
}));

const layerStyle = {
  position: 'absolute',
  top: TEGAKI_PAD_V,
  right: '0.2em',
  bottom: TEGAKI_PAD_V,
  left: '0.2em',
  display: 'block',
  overflow: 'visible',
  pointerEvents: 'none',
};

function patchEngineLayoutMeasurement(instance) {
  if (!instance._recomputeLayout)
    return;

  instance._recomputeLayout = function patchedRecomputeLayout() {
    if (this._fontReady && this._font?.family && this._fontSize && this._containerWidth && this._text) {
      const key = `${this._text}\0${this._font.family}\0${this._fontSize}\0${this._lineHeight}\0${this._containerWidth}\0${this._direction ?? ''}`;
      if (key === this._layoutKey)
        return;

      this._layoutKey = key;
      this._layout = computeTextLayout(
        this._text,
        this._fontSize,
        resolvedFontFamily.value,
        this._lineHeight,
        this._containerWidth,
      );
    }
    else {
      this._layoutKey = '';
      this._layout = null;
    }
  };
}

async function ensureFontLoaded(font) {
  for (const face of document.fonts) {
    if (face.family === font.family && face.status === 'loaded')
      return;
  }

  const face = new FontFace(font.family, `url(${font.fontUrl})`, {
    featureSettings: "'calt' 0, 'liga' 0",
  });
  const loaded = await face.load();
  document.fonts.add(loaded);
}

async function initEngine() {
  if (initPending)
    return;

  initPending = true;
  const token = ++initToken;
  const font = resolvedFont.value;

  await ensureFontLoaded(font);

  requestAnimationFrame(() => {
    initPending = false;
    if (token !== initToken || !mounted.value || !containerRef.value || !wrapperRef.value || !layerRef.value) return;

    engine?.destroy();
    engine = new TegakiEngine(containerRef.value, engineOptions.value);
    patchEngineLayoutMeasurement(engine);
    engine.update(engineOptions.value);
  });
}

function destroyEngine() {
  initToken += 1;
  initPending = false;
  engine?.destroy();
  engine = null;
}

function isVisible() {
  const el = wrapperRef.value;
  if (!el)
    return false;

  return el.offsetParent !== null && getComputedStyle(el).display !== 'none';
}

function watchVisibility() {
  if (!mounted.value)
    return;

  if (isVisible()) {
    if (!engine && !initPending)
      void initEngine();
  }
  else if (engine) {
    destroyEngine();
  }

  visibilityFrame = requestAnimationFrame(watchVisibility);
}

onMounted(() => {
  mounted.value = true;
  watchVisibility();
});

watch(
  () => [props.font, props.fontBundle],
  async () => {
    if (!mounted.value) return;
    if (!isVisible())
      return;
    await initEngine();
  },
);

watch(
  () => ({
    text: props.text,
    speed: props.speed,
    loop: props.loop,
    delay: props.delay,
    time: props.time,
    effects: props.effects,
    quality: props.quality,
    timing: props.timing,
    showOverlay: props.showOverlay,
    onComplete: props.onComplete,
    direction: props.direction,
  }),
  (options) => engine?.update({ ...options, font: resolvedFont.value }),
  { deep: true },
);

onUnmounted(() => {
  mounted.value = false;
  cancelAnimationFrame(visibilityFrame);
  destroyEngine();
});
</script>

<template>
  <span ref="wrapperRef" style="position: relative; display: inline-block; max-width: 100%; vertical-align: baseline;">
    <span :style="placeholderStyle" aria-hidden="true">{{ props.text }}</span>
    <span ref="layerRef" :style="layerStyle">
      <span ref="containerRef" style="font-size: inherit; line-height: inherit; display: block;" />
    </span>
  </span>
</template>
