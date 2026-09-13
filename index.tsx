import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

/** Gap between the track edge and the thumb, in px. */
const TRACK_PADDING = 3;

export type CustomSwitchProps = {
  /** Current value. Controlled — the component holds no internal state. */
  isEnabled: boolean;
  /** Called with the *next* value. Not called while `disabled`. */
  onToggle: (isEnabled: boolean) => void;

  /* ---- container ---- */
  containerStyle?: StyleProp<ViewStyle>;
  /** Style applied to the pressable wrapping the track. */
  switchStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  borderRadius?: number;
  padding?: number;
  borderWidth?: number;
  borderColor?: string;

  /* ---- colours (canonical) ---- */
  thumbColorOn?: string;
  thumbColorOff?: string;
  trackColorOn?: string;
  trackColorOff?: string;

  /* ---- colours (legacy aliases, kept for backwards compatibility) ---- */
  /** @deprecated use `thumbColorOn` */
  thumbColorEnabled?: string;
  /** @deprecated use `thumbColorOff` */
  thumbColorDisabled?: string;
  /** @deprecated use `trackColorOn` */
  trackColorEnabled?: string;
  /** @deprecated use `trackColorOff` */
  trackColorDisabled?: string;
  /** @deprecated use `trackColorOn` */
  trackColorEnabledCustom?: string;

  /* ---- thumb ---- */
  /** Thumb diameter in px. Track size is derived from it. Default `24`. */
  thumbSize?: number;
  /** Image rendered inside the thumb while on. */
  thumbImageEnabled?: ImageSourcePropType;
  /** Image rendered inside the thumb while off. */
  thumbImageDisabled?: ImageSourcePropType;
  /** Toggle animation duration in ms. Default `200`. `0` disables the animation. */
  thumbAnimationDuration?: number;

  /* ---- label & state ---- */
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  disabled?: boolean;

  testID?: string;
};

const CustomSwitch: React.FC<CustomSwitchProps> = memo(
  ({
    isEnabled,
    onToggle,
    containerStyle,
    switchStyle,
    backgroundColor,
    borderRadius,
    padding,
    borderWidth,
    borderColor,
    thumbColorOn,
    thumbColorOff,
    trackColorOn,
    trackColorOff,
    thumbColorEnabled,
    thumbColorDisabled,
    trackColorEnabled,
    trackColorDisabled,
    trackColorEnabledCustom,
    thumbSize = 24,
    thumbImageEnabled,
    thumbImageDisabled,
    thumbAnimationDuration = 200,
    label,
    labelStyle,
    disabled = false,
    testID,
  }) => {
    // Canonical `*On`/`*Off` props win; legacy aliases are the fallback.
    const colors = useMemo(
      () => ({
        thumbOn: thumbColorOn ?? thumbColorEnabled ?? '#f5dd4b',
        thumbOff: thumbColorOff ?? thumbColorDisabled ?? '#f4f3f4',
        trackOn:
          trackColorOn ?? trackColorEnabled ?? trackColorEnabledCustom ?? '#81b0ff',
        trackOff: trackColorOff ?? trackColorDisabled ?? '#767577',
      }),
      [
        thumbColorOn,
        thumbColorOff,
        trackColorOn,
        trackColorOff,
        thumbColorEnabled,
        thumbColorDisabled,
        trackColorEnabled,
        trackColorDisabled,
        trackColorEnabledCustom,
      ],
    );

    const metrics = useMemo(() => {
      const trackHeight = thumbSize + TRACK_PADDING * 2;
      const trackWidth = thumbSize * 2 + TRACK_PADDING * 2;
      return {
        trackHeight,
        trackWidth,
        // Distance the thumb travels between the two resting positions.
        travel: trackWidth - thumbSize - TRACK_PADDING * 2,
      };
    }, [thumbSize]);

    const progress = useRef(new Animated.Value(isEnabled ? 1 : 0)).current;

    useEffect(() => {
      const toValue = isEnabled ? 1 : 0;

      if (thumbAnimationDuration <= 0) {
        progress.setValue(toValue);
        return;
      }

      const animation = Animated.timing(progress, {
        toValue,
        duration: thumbAnimationDuration,
        // `backgroundColor` cannot be driven natively, and the thumb colour and
        // position must stay in lockstep. Splitting this into a native-driven
        // transform plus a JS-driven colour is not worth the extra Animated.Value
        // for a single 200ms, user-initiated toggle.
        useNativeDriver: false,
      });

      animation.start();
      return () => animation.stop();
    }, [isEnabled, thumbAnimationDuration, progress]);

    const translateX = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, metrics.travel],
    });
    const trackBackground = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.trackOff, colors.trackOn],
    });
    const thumbBackground = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.thumbOff, colors.thumbOn],
    });

    const handlePress = useCallback(() => {
      if (!disabled) {
        onToggle(!isEnabled);
      }
    }, [disabled, isEnabled, onToggle]);

    const thumbImage = isEnabled ? thumbImageEnabled : thumbImageDisabled;

    return (
      <View
        style={[
          styles.container,
          { backgroundColor, borderRadius, padding, borderWidth, borderColor },
          containerStyle,
        ]}
      >
        <Pressable
          onPress={handlePress}
          disabled={disabled}
          accessibilityRole="switch"
          accessibilityState={{ checked: isEnabled, disabled }}
          accessibilityLabel={label}
          testID={testID}
          hitSlop={8}
          style={[disabled && styles.disabled, switchStyle]}
        >
          <Animated.View
            style={[
              styles.track,
              {
                width: metrics.trackWidth,
                height: metrics.trackHeight,
                borderRadius: metrics.trackHeight / 2,
                padding: TRACK_PADDING,
                backgroundColor: trackBackground,
              },
            ]}
          >
            <Animated.View
              style={[
                styles.thumb,
                {
                  width: thumbSize,
                  height: thumbSize,
                  borderRadius: thumbSize / 2,
                  backgroundColor: thumbBackground,
                  transform: [{ translateX }],
                },
              ]}
            >
              {thumbImage ? (
                <Image
                  source={thumbImage}
                  style={{
                    width: thumbSize,
                    height: thumbSize,
                    borderRadius: thumbSize / 2,
                  }}
                  resizeMode="cover"
                />
              ) : null}
            </Animated.View>
          </Animated.View>
        </Pressable>

        {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}
      </View>
    );
  },
);

CustomSwitch.displayName = 'CustomSwitch';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  track: {
    justifyContent: 'center',
  },
  thumb: {
    overflow: 'hidden',
  },
  label: {
    marginLeft: 8,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default CustomSwitch;
