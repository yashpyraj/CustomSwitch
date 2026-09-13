# CustomSwitch

> A thin, styleable wrapper around React Native's built-in `<Switch>` — colour, size, label and container styling through props, with a typed API.

[![npm](https://img.shields.io/npm/v/@pixelcube/customswitch.svg?style=flat&color=cb3837&logo=npm)](https://www.npmjs.com/package/@pixelcube/customswitch)
[![platform](https://img.shields.io/badge/platform-android%20%7C%20ios-lightgrey.svg)](https://reactnative.dev)
[![types](https://img.shields.io/badge/types-TypeScript-3178C6.svg)](https://www.typescriptlang.org)

---

## What this is

React Native's `<Switch>` accepts `trackColor` and `thumbColor` and little else. Restyling it — padding, a border, a label, a container background, a different scale — means wrapping it every time.

`CustomSwitch` is that wrapper, done once: a memoised component that passes colour and sizing through to the native switch and handles the label and container layout around it.

It renders the **platform-native switch**, so it keeps native accessibility and platform feel. It is not a from-scratch reimplementation.

## Installation

```sh
npm install @pixelcube/customswitch
```

```sh
yarn add @pixelcube/customswitch
```

No native linking — it depends only on `react` and `react-native`.

## Usage

```tsx
import { useState } from 'react';
import CustomSwitch from '@pixelcube/customswitch';

export default function Settings() {
  const [enabled, setEnabled] = useState(false);

  return (
    <CustomSwitch
      isEnabled={enabled}
      onToggle={setEnabled}
      label="Push notifications"
      trackColorOn="#4ade80"
      trackColorOff="#767577"
      thumbColorOn="#ffffff"
      thumbColorOff="#f4f3f4"
      padding={12}
      borderRadius={8}
      backgroundColor="#111827"
      labelStyle={{ color: '#e5e7eb' }}
    />
  );
}
```

## Props

### Required

| Prop | Type | Description |
|---|---|---|
| `isEnabled` | `boolean` | Current value. Controlled — the component holds no internal state. |
| `onToggle` | `(isEnabled: boolean) => void` | Called with the **next** value. Not called while `disabled`. |

### Colour

| Prop | Type | Default | Description |
|---|---|---|---|
| `thumbColorOn` | `string` | `#f5dd4b` | Thumb colour when on |
| `thumbColorOff` | `string` | `#f4f3f4` | Thumb colour when off |
| `trackColorOn` | `string` | `#81b0ff` | Track colour when on |
| `trackColorOff` | `string` | `#767577` | Track colour when off |
| `trackColorEnabledCustom` | `string` | — | Legacy alias for `trackColorOn`; `trackColorOn` wins if both are set |

### Layout and container

| Prop | Type | Description |
|---|---|---|
| `containerStyle` | `StyleProp<ViewStyle>` | Style for the wrapping row |
| `backgroundColor` | `string` | Container background |
| `borderRadius` | `number` | Container corner radius |
| `padding` | `number` | Container padding |
| `borderWidth` | `number` | Container border width |
| `switchStyle` | `StyleProp<SwitchProps>` | Style applied to the switch itself |
| `thumbSize` | `number` | **Scale factor**, not pixels — applied as `scaleX`/`scaleY` on the switch. `1` is native size; `1.2` is 20% larger. |

### Label and state

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Text rendered after the switch, and used as the `accessibilityLabel` |
| `labelStyle` | `StyleProp<ViewStyle>` | — | Style for the label text |
| `disabled` | `boolean` | `false` | Blocks `onToggle` and disables the native switch |

## Accessibility

The container sets `accessible`, and `label` is forwarded to the native switch as `accessibilityLabel`, so screen readers announce the control with its name and on/off state. If you render no `label`, supply your own labelling from the parent.

## Known limitations

Honest notes on the current version rather than a longer prop table:

- **`thumbAnimationDuration` is accepted but inert.** The animation driver exists in the source but is not wired to value changes, so the thumb does not animate independently of the platform switch's own transition.
- **Six declared props are not implemented:** `thumbColorEnabled`, `thumbColorDisabled`, `trackColorEnabled`, `trackColorDisabled`, `thumbImageEnabled`, `thumbImageDisabled`. They typecheck and are ignored at runtime — use the `*On` / `*Off` colour props instead. Thumb images are not supported.
- **Decorative thumb/track views** are rendered absolutely over the native switch and may be visible depending on your container sizing.
- `package.json` `main` currently points at `intex.tsx` (typo) — see [issues](https://github.com/yashpyraj/CustomSwitch/issues).

## Requirements

- React 18+
- React Native 0.71+

## License

ISC © [Yash Raj](https://github.com/yashpyraj)
