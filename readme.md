## @ahmetaltai/react-native-bottom-sheet

A highly efficient, stable, and customizable Bottom Sheet component for React Native. Designed to provide smooth performance with minimal configuration, this component is easy to integrate while offering extensive customization options for more complex use cases.

[![npm version](https://badge.fury.io/js/@ahmetaltai%2Freact-native-bottom-sheet.svg)](https://badge.fury.io/js/@ahmetaltai%2Freact-native-bottom-sheet) ![NPM Downloads](https://img.shields.io/npm/dw/%40ahmetaltai%2Freact-native-bottom-sheet)


![Bottom Sheet Preview](./example/assets/preview.gif)

![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=CB3837) ![React Native](https://img.shields.io/badge/react_native-%231C1E24.svg?style=for-the-badge&logo=react&logoColor=CB3837) ![TypeScript](https://img.shields.io/badge/typescript-%231C1E24.svg?style=for-the-badge&logo=typescript&logoColor=CB3837) ![NPM](https://img.shields.io/badge/NPM-%231C1E24.svg?style=for-the-badge&logo=npm&logoColor=CB3837) ![Yarn](https://img.shields.io/badge/yarn-%231C1E24.svg?style=for-the-badge&logo=yarn&logoColor=CB3837)

[Try on Snack](https://snack.expo.dev/@ahmet.altai/react-native-bottom-sheet)

## Features

- ⚡ **Fast and Stable:** Optimized for performance with minimal configuration.
- 🛠 **Simple Setup:** Requires only a few basic props to get started.
- 🎨 **Customizable:** Easily apply styles without needing complex configurations.
- ✋ **Gesture Support:** Offers native-like drag-and-drop gesture support with smooth animations.

## Installation

To install the package, use npm or yarn:

```bash
npm install @ahmetaltai/react-native-bottom-sheet
```

or

```bash
yarn add @ahmetaltai/react-native-bottom-sheet
```

## Usage Example

Here's a basic example of how to use the `BottomSheet` component:

```tsx
import React, { useRef } from 'react';
import { View, Button, Text } from 'react-native';
import BottomSheet from '@ahmetaltai/react-native-bottom-sheet';

const App = () => {
  const BottomSheetRef = useRef<BottomSheetRef>();

  const OpenBottomSheet = () => {
    BottomSheetRef.current?.open();
  };

  const ExpandBottomSheet = () => {
    BottomSheetRef.current?.expand();
  };

  const SnapBottomSheet = (index: number) => {
    BottomSheetRef.current?.snap(index);
  };

  const OnPressBackdrop = () => {
    console.log('Backdrop Pressed');
  };

  const OnChangePoint = (index: number) => {
    console.log('Present Change: ' + index);
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="Open Bottom Sheet" onPress={OpenBottomSheet} />

      <BottomSheet
        index={0}
        ref={BottomSheetRef}
        points={['50%', '75%']}
        onChangePoint={OnChangePoint}
        // onPressBackdrop={OnPressBackdrop} - By default, pressing the backdrop will close the modal. If a different action is needed, the onPressBackdrop prop can be used to define a custom function.
      >
        <View>
          <Text>This is the content inside the Bottom Sheet.</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

export default App;
```

## Props

| Prop      | Type       | Default | Description                                                                           |
| --------- | ---------- | ------- | ------------------------------------------------------------------------------------- |
| `points`  | `string[]` | `[]`    | Defines the draggable positions for the sheet in percentages                          |
| `index`   | `number`   | `0`     | The initial index for the Bottom Sheet. Refers to the position in the `points` array. |
| `visible` | `string`   | `100%`  | Defines the position to display the sheet when initially visible.                     |
| `style`   | `object`   | `{}`    | Customize the appearance of the sheet and the backdrop.                               |

## Methods

The `BottomSheet` component exposes several methods via `ref`. These methods allow you to control the Bottom Sheet's behavior programmatically:

### `open()`
Opens the Bottom Sheet to the position specified by the `index` prop.

- **`index`**: Refers to the position in the `points` array where the Bottom Sheet will open. For example, if `index={1}`, the Bottom Sheet will open at the second point in the `points` array. You can call this method via `BottomSheetRef.current?.open()`.

### `close()`
Closes the Bottom Sheet completely. This will hide the Bottom Sheet, regardless of its current position in the `points` array.

- You can call this method using `BottomSheetRef.current?.close()`.

### `expand()`
Expands the Bottom Sheet to its maximum point, as defined by the last value in the `points` array.

- For example, if `points={['25%', '50%', '90%']}`, calling `expand()` will expand the Bottom Sheet to the 90% position.
- To invoke this, use `BottomSheetRef.current?.expand()`.

### `snap(index: number)`
Snaps the Bottom Sheet to a specific point based on the provided `index`. The `index` corresponds to the position in the `points` array.

- **`index`**: This parameter determines the specific position from the `points` array where the Bottom Sheet should snap to. For instance, if you call `snap(2)` and the `points` array is `['25%', '50%', '90%']`, the Bottom Sheet will snap to 90%.
- Use `BottomSheetRef.current?.snap(index)` to invoke this method.

---

These methods offer flexible control over the Bottom Sheet's behavior, allowing you to open, close, expand, or snap the sheet to specific positions programmatically.

## Explanation

- **`points`**: The `points` prop defines the draggable positions for the Bottom Sheet as percentages. For example, `['25%', '50%', '90%']` means the Bottom Sheet can be dragged between 25%, 50%, and 90% of the screen height.
- **`visible`**: When `visible` is set, the Bottom Sheet stays open, and it does not close upon background taps. This is useful for cases where you want the sheet to remain open, allowing background touches.
