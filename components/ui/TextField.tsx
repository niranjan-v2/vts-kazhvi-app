// components/ui/TextField.tsx
import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import clsx from 'clsx';

interface Props extends TextInputProps {
    label?: string;
    errorText?: string;
    className?: string;
}

export default function TextField({
                                      label,
                                      errorText,
                                      className,
                                      ...inputProps
                                  }: Props) {
    return (
        <View className={clsx('w-full', className)}>
            {label ? (
                <Text className="text-sm font-medium text-gray-800 mb-1">{label}</Text>
            ) : null}

            <TextInput
                className={clsx(
                    'w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900',
                    'placeholder:text-gray-400'
                )}
                {...inputProps}
            />

            {errorText ? (
                <Text className="text-xs text-red-500 mt-1">{errorText}</Text>
            ) : null}
        </View>
    );
}
