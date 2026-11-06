/** Palette — verbatim from the v8 reference. */
export const RED = 'oklch(0.62 0.21 30)', TEAL = 'oklch(0.52 0.1 180)', MUST = 'oklch(0.83 0.15 85)';
export const INK = '#14120f', PAPER = '#efe9dc', INK2 = '#221f1a';
/** Panel colour cycle: [background, foreground, ghost-number stroke]. */
export const PANEL: [string, string, string][] = [[RED, INK, 'rgba(20,18,15,.2)'], [PAPER, INK, 'rgba(20,18,15,.14)'], [TEAL, PAPER, 'rgba(239,233,220,.22)'], [MUST, INK, 'rgba(20,18,15,.18)'], [INK2, PAPER, 'rgba(239,233,220,.12)']];
/** MUST expressed in sRGB — GSAP can't interpolate oklch() strings (the reference flashes
 * green mid-tween), so colour tweens target this exact equivalent instead. */
export const MUST_RGB = 'rgb(244, 191, 63)';
