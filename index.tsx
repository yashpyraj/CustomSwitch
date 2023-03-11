import React, { memo, useRef, useMemo, useCallback } from "react";
import {
  View,
  Switch,
  StyleSheet,
  StyleProp,
  ViewStyle,
  SwitchProps,
  ImageSourcePropType,
  Text,
  Animated,
} from "react-native";

type Props = {
  isEnabled: boolean;
  onToggle: (isEnabled: boolean) => void;
  containerStyle?: StyleProp<ViewStyle>;
  switchStyle?: StyleProp<SwitchProps>;
  backgroundColor?: string;
  borderRadius?: number;
  padding?: number;
  borderWidth?: number;
  thumbColorEnabled?: string;
  thumbColorDisabled?: string;
  trackColorEnabled?: string;
  trackColorDisabled?: string;
  disabled?: boolean;
  label?: string;
  trackColorEnabledCustom?: string;
  thumbSize?: number;
  thumbImageEnabled?: ImageSourcePropType;
  thumbImageDisabled?: ImageSourcePropType;
  labelStyle?: StyleProp<ViewStyle>;
  thumbAnimationDuration?: number;
  thumbColorOn?: string;
  thumbColorOff?: string;
  trackColorOn?: string;
  trackColorOff?: string;
};

const CustomSwitch: React.FC<Props> = memo(
  ({
    isEnabled,
    onToggle,
    containerStyle,
    switchStyle,
    backgroundColor,
    borderRadius,
    padding,
    borderWidth,
    disabled = false,
    label,
    trackColorEnabledCustom,
    thumbSize,
    labelStyle,
    thumbAnimationDuration = 200,
    thumbColorOn,
    thumbColorOff,
    trackColorOn,
    trackColorOff,
  }) => {
    const toggleSwitch = useCallback(() => {
      if (!disabled) {
        const newIsEnabled = !isEnabled;
        onToggle(newIsEnabled);
      }
    }, [isEnabled, onToggle, disabled]);

    const thumbPosition = useRef(new Animated.Value(0)).current;

    const animateThumb = (toValue: number) => {
      Animated.timing(thumbPosition, {
        toValue,
        duration: thumbAnimationDuration,
        useNativeDriver: true,
      }).start();
    };

    const thumbColor = useMemo(
      () =>
        isEnabled ? thumbColorOn ?? `#f5dd4b` : thumbColorOff ?? `#f4f3f4`,
      [isEnabled, thumbColorOn, thumbColorOff]
    );
    const trackColor = useMemo(
      () => ({
        true: trackColorOn ?? trackColorEnabledCustom ?? `#81b0ff`,
        false: trackColorOff ?? `#767577`,
      }),
      [trackColorOn, trackColorEnabledCustom, trackColorOff]
    );

    return (
      <View
        style={[
          styles.container,
          { backgroundColor, borderRadius, padding, borderWidth },
          containerStyle,
        ]}
        accessible={true}
      >
        <Switch
          trackColor={trackColor}
          thumbColor={thumbColor}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={[
            switchStyle,
            { transform: [{ scaleX: thumbSize }, { scaleY: thumbSize }] },
          ]}
          disabled={disabled}
          accessibilityLabel={label}
        />
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX: thumbPosition }],
              backgroundColor: thumbColor,
            },
          ]}
        />
        <View style={[styles.track, { backgroundColor: trackColor.true }]} />
        <View style={[styles.track, { backgroundColor: trackColor.false }]} />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  label: {
    marginLeft: 8,
  },
  thumb: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  track: {
    position: "absolute",
    top: 8,
    height: 8,
    borderRadius: 4,
    width: "50%",
  },
});

export default CustomSwitch;
