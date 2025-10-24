// components/ui/Button.tsx
import React from 'react';
import { Pressable, Text, ViewStyle } from 'react-native';
import clsx from 'clsx';

interface ButtonProps {
    label: string;
    onPress?: () => void;
    className?: string;
    style?: ViewStyle;
    disabled?: boolean;
}

export default function Button({
                                   label,
                                   onPress,
                                   className,
                                   style,
                                   disabled,
                               }: ButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            className={clsx(
                'w-full rounded-2xl bg-black py-4 items-center justify-center',
                disabled && 'opacity-40',
                className
            )}
            style={style}
        >
            <Text className="text-white text-base font-semibold">{label}</Text>
        </Pressable>
    );
}
