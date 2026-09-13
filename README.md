# CustomSwitch

> A styleable, animated switch for React Native — colour, size, label, thumb images and timing, all through a fully typed prop API.

[![npm](https://img.shields.io/npm/v/@pixelcube/customswitch.svg?style=flat&color=cb3837&logo=npm)](https://www.npmjs.com/package/@pixelcube/customswitch)
[![platform](https://img.shields.io/badge/platform-android%20%7C%20ios-lightgrey.svg)](https://reactnative.dev)
[![types](https://img.shields.io/badge/types-TypeScript-3178C6.svg)](https://www.typescriptlang.org)

---

## Why

React Native's built-in `<Switch>` accepts `trackColor` and `thumbColor` and almost nothing else. There is no way to change the size, put an image in the thumb, control the animation, or attach a label without rebuilding the layout around it every time.

`CustomSwitch` renders its own track and thumb, so all of that is just a prop. It is a single dependency-free file — no native linking, no build step.

## Installation

```sh
npm install @pixelcube/customswitch
```

```sh
yarn add @pixelcube/customswitch
```

`react` and `react-native` are peer dependencies.

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
      thumbSize={28}
      thumbAnimationDuration={180}
      padding={12}
      borderRadius={8}
      backgroundColor="#111827"
      labelStyle={{ color: '#e5e7eb' }}
    />
  );
}
```

The component is **controlled** — it holds no internal state. `onToggle` receives the *next* value.

## Props

### Required

| Prop | Type | Description |
|---|---|---|
| `isEnabled` | `boolean` | Current value |
| `onToggle` | `(isEnabled: boolean) => void` | Called with the next value. Not called while `disabled`. |

### Thumb

| Prop | Type | Default | Description |
|---|---|---|---|
| `thumbSize` | `number` | `24` | Thumb diameter **in px**. The track is sized from it. |
| `thumbColorOn` | `string` | `#f5dd4b` | Thumb colour when on |
| `thumbColorOff` | `string` | `#f4f3f4` | Thumb colour when off |
| `thumbImageEnabled` | `ImageSourcePropType` | — | Image inside the thumb while on |
| `thumbImageDisabled` | `ImageSourcePropType` | — | Image inside the thumb while off |
| `thumbAnimationDuration` | `number` | `200` | Toggle duration in ms. `0` disables the animation. |

### Track

| Prop | Type | Default |
|---|---|---|
| `trackColorOn` | `string` | `#81b0ff` |
| `trackColorOff` | `string` | `#767577` |

Track colour and thumb position animate together off a single interpolated value, so they never drift out of step mid-toggle.

### Container

| Prop | Type | Description |
|---|---|---|
| `containerStyle` | `StyleProp<ViewStyle>` | Style for the wrapping row |
| `switchStyle` | `StyleProp<ViewStyle>` | Style for the pressable around the track |
| `backgroundColor` | `string` | Container background |
| `borderRadius` | `number` | Container corner radius |
| `padding` | `number` | Container padding |
| `borderWidth` | `number` | Container border width |
| `borderColor` | `string` | Container border colour |

### Label and state

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Text after the switch; also the `accessibilityLabel` |
| `labelStyle` | `StyleProp<TextStyle>` | — | Label text style |
| `disabled` | `boolean` | `false` | Blocks `onToggle`, dims the control to 50% |
| `testID` | `string` | — | Forwarded to the pressable |

### Deprecated aliases

Kept so existing code keeps compiling. The canonical `*On` / `*Off` prop wins when both are set.

| Deprecated | Use instead |
|---|---|
| `thumbColorEnabled` | `thumbColorOn` |
| `thumbColorDisabled` | `thumbColorOff` |
| `trackColorEnabled` | `trackColorOn` |
| `trackColorDisabled` | `trackColorOff` |
| `trackColorEnabledCustom` | `trackColorOn` |

## Accessibility

The control is a `Pressable` with `accessibilityRole="switch"` and `accessibilityState={{ checked, disabled }}`, so screen readers announce it as a switch and read its on/off and disabled state. `label` is forwarded as the `accessibilityLabel` — if you render no label, supply your own from the parent. Touch target is extended with `hitSlop={8}`.

## Requirements

- React 18+
- React Native 0.71+

## Migrating from 1.x

1.x wrapped React Native's built-in `<Switch>`, and several documented props were declared but never read. 2.0 renders its own track and thumb, which makes all of them work:

- `thumbAnimationDuration` now actually drives the animation (it was inert).
- `thumbImageEnabled` / `thumbImageDisabled` now render (they were ignored).
- `thumbColorEnabled` / `thumbColorDisabled` / `trackColorEnabled` / `trackColorDisabled` now apply as aliases (they were ignored).
- **Breaking:** `thumbSize` is now a diameter in px, not a `scaleX`/`scaleY` multiplier. If you passed `thumbSize={1.5}`, pass `thumbSize={36}`.
- **Breaking:** the switch no longer renders the OS-native control, so it looks identical on iOS and Android instead of following each platform.
- Stray decorative views that overlaid the native switch are gone.
- `labelStyle` is typed `TextStyle` (was `ViewStyle`) and `switchStyle` is typed `ViewStyle` (was `SwitchProps`).

## License

ISC © [Yash Raj](https://github.com/yashpyraj)
