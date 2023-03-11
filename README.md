# Custom Switch React Native Component

Custom Switch is a highly customizable and performant React Native component that allows you to create switches with different styles, animations, and functionalities. It provides a rich set of props that enables you to customize the switch's appearance, behavior, and accessibility.

## Installation

To install Custom Switch, you can use npm or yarn:

```bash
npm install react-native-custom-switch --save
```
or
```bash
yarn add react-native-custom-switch
```

## Usage
Import CustomSwitch in your React Native project:
```jsx
import CustomSwitch from 'react-native-custom-switch';
```
Then, use the component with the required props:
```jsx
<CustomSwitch
  isEnabled={isEnabled}
  onToggle={onToggle}
  containerStyle={containerStyle}
  switchStyle={switchStyle}
  backgroundColor={backgroundColor}
  borderRadius={borderRadius}
  padding={padding}
  borderWidth={borderWidth}
  thumbColorEnabled={thumbColorEnabled}
  thumbColorDisabled={thumbColorDisabled}
  trackColorEnabled={trackColorEnabled}
  trackColorDisabled={trackColorDisabled}
  disabled={disabled}
  label={label}
  trackColorEnabledCustom={trackColorEnabledCustom}
  thumbSize={thumbSize}
  thumbImageEnabled={thumbImageEnabled}
  thumbImageDisabled={thumbImageDisabled}
  labelStyle={labelStyle}
  thumbAnimationDuration={thumbAnimationDuration}
  thumbColorOn={thumbColorOn}
  thumbColorOff={thumbColorOff}
  trackColorOn={trackColorOn}
  trackColorOff={trackColorOff}
/>
```
## Props
isEnabled (required)
A boolean value that represents whether the switch is on or off.

### onToggle (required)
A callback function that is called when the switch is toggled. It receives a boolean value as a parameter that indicates whether the switch is on or off.

### containerStyle
An object that represents the style of the switch container. It accepts the same props as the React Native View component.

### switchStyle
An object that represents the style of the switch. It accepts the same props as the React Native Switch component.

### backgroundColor
A string that represents the background color of the switch container.

### borderRadius
A number that represents the border radius of the switch container.

### padding
A number that represents the padding of the switch container.

### borderWidth
A number that represents the border width of the switch container.

### thumbColorEnabled
A string that represents the thumb color of the switch when it's enabled.

### thumbColorDisabled
A string that represents the thumb color of the switch when it's disabled.

### trackColorEnabled
A string that represents the track color of the switch when it's enabled.

### trackColorDisabled
A string that represents the track color of the switch when it's disabled.

### disabled
A boolean value that represents whether the switch is disabled or not.

### label
A string that represents the label of the switch.

### trackColorEnabledCustom
A string that represents the track color of the switch when it's enabled and the trackColorEnabled prop is not set.

### thumbSize
A number that represents the size of the switch's thumb.

### thumbImageEnabled
An ImageSourcePropType that represents the image of the switch's thumb when it's enabled.

### thumbImageDisabled
An ImageSourcePropType that represents the image of the switch's thumb when it's disabled.

### labelStyle
An object that represents the style of the switch's label. It accepts the same props as the React Native Text component.

### thumbAnimationDuration
A number that represents the duration of the switch's thumb animation.

### thumbColorOn
A string that represents the thumb color of the switch when it's on. Overrides thumbColorEnabled if both are set.

### thumbColorOff
A string that represents the thumb color of the switch when it's off. Overrides thumbColorDisabled if both are set.

### trackColorOn
A string that represents the track color of the switch when it's on. Overrides trackColorEnabled if both are set.

### trackColorOff
A string that represents the track color of the switch when it's off. Overrides trackColorDisabled if both are set.

## Example Usage:
Here is an example of how you can use the CustomSwitch component:

```jsx
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CustomSwitch from 'react-native-custom-switch';

const App = () => {
const [isEnabled, setIsEnabled] = useState(false);

const onToggle = (value) => {
setIsEnabled(value);
};

const containerStyle = {
width: 60,
height: 30,
borderRadius: 15,
padding: 5,
backgroundColor: '#ccc',
};

const switchStyle = {
backgroundColor: 'white',
borderWidth: 2,
borderColor: '#ddd',
width: 20,
height: 20,
borderRadius: 10,
};

return (
<View style={styles.container}>
<Text style={styles.label}>Custom Switch</Text>
<CustomSwitch
     isEnabled={isEnabled}
     onToggle={onToggle}
     containerStyle={containerStyle}
     switchStyle={switchStyle}
     thumbColorEnabled="#4cd137"
     thumbColorDisabled="#e84118"
     trackColorEnabled="#a5deba"
     trackColorDisabled="#f5b7b1"
     label="Toggle Me"
     labelStyle={styles.labelStyle}
     thumbSize={18}
   />
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: '#fff',
},
label: {
fontSize: 20,
fontWeight: 'bold',
marginBottom: 20,
},
labelStyle: {
color: '#333',
fontSize: 14,
},
});

export default App;

```
In this example, we have created a simple custom switch with a custom container style, switch style, and other props to customize its appearance and functionality. The onToggle function is used to update the state of the switch when it is toggled. The label prop is used to add a label to the switch, and labelStyle is used to style the label text.

## Conclusion:

CustomSwitch is a powerful and flexible React Native component that allows you to create highly customizable and performant switches with ease. It provides a rich set of props that enables you to customize the switch's appearance, behavior, and accessibility according to your needs. With CustomSwitch, you can create switches that fit perfectly into your app's design and provide a seamless user experience.



