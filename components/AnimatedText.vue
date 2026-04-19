<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { TegakiEngine } from 'tegaki/core';
import caveatBundle from 'tegaki/fonts/caveat';
import italiannoBundle from 'tegaki/fonts/italianno';
import parisienneBundle from 'tegaki/fonts/parisienne';
import tangerineBundle from 'tegaki/fonts/tangerine';

const FONT_BASE_URL = `${import.meta.env.BASE_URL}fonts/`;

const FONT_SOURCES = {
  caveat: { bundle: caveatBundle, fontUrl: `${FONT_BASE_URL}caveat.ttf` },
  italianno: { bundle: italiannoBundle, fontUrl: `${FONT_BASE_URL}italianno.ttf` },
  parisienne: { bundle: parisienneBundle, fontUrl: `${FONT_BASE_URL}parisienne.ttf` },
  tangerine: { bundle: tangerineBundle, fontUrl: `${FONT_BASE_URL}tangerine.ttf` },
};

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  font: {
    type: String,
    default: 'caveat',
  },
  fontSize: {
    type: String,
    default: '48px',
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
const containerRef = ref();
const mounted = ref(false);
let engine = null;
let initToken = 0;
let visibilityFrame = 0;
let initPending = false;

const resolvedFont = computed(() => {
  const source = FONT_SOURCES[props.font] ?? FONT_SOURCES.caveat;
  return {
    ...source.bundle,
    fontUrl: source.fontUrl,
  };
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
  quality: props.quality,
  timing: props.timing,
  showOverlay: props.showOverlay,
  onComplete: props.onComplete,
  direction: props.direction,
}));

function applySlideScaleWorkaround() {
  if (!wrapperRef.value) return;

  // Slidev scales slides via CSS transform: scale(). This causes
  // Range.getClientRects() — used by Tegaki to measure character positions —
  // to return scaled visual coordinates, making the drawn text too wide.
  // Applying an inverse scale to the wrapper ensures measurements inside it
  // are always in unscaled layout coordinates.
  // Note: --slidev-slide-scale is a calc() expression, so we extract the
  // number with a regex instead of parseFloat.
  const scaleVar = getComputedStyle(wrapperRef.value).getPropertyValue('--slidev-slide-scale');
  const slideScale = parseFloat(scaleVar.match(/[\d.]+/)?.[0]) || 1;
  const parentTextAlign = getComputedStyle(wrapperRef.value.parentElement ?? wrapperRef.value).textAlign;
  const transformOrigin = parentTextAlign === 'center'
    ? 'top center'
    : parentTextAlign === 'right'
      ? 'top right'
      : 'top left';

  wrapperRef.value.style.display = 'inline-block';
  wrapperRef.value.style.transform = `scale(${1 / slideScale})`;
  wrapperRef.value.style.transformOrigin = transformOrigin;
  wrapperRef.value.style.width = 'fit-content';
}

async function ensureFontLoaded(font) {
  for (const face of document.fonts) {
    if (face.family === font.family && face.status === 'loaded')
      return;
  }

  const face = new FontFace(font.family, `url(${font.fontUrl})`);
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
    if (token !== initToken || !mounted.value || !containerRef.value || !wrapperRef.value) return;

    applySlideScaleWorkaround();
    engine?.destroy();
    engine = new TegakiEngine(containerRef.value, engineOptions.value);
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
  () => props.font,
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
  <div ref="wrapperRef">
    <div ref="containerRef" :style="{ fontSize: props.fontSize }" />
  </div>
</template>
