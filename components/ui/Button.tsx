// components/ui/Button.tsx
import React from 'react';
import { Pressable, Text, ViewStyle } from 'react-native';

type Scheme =
    | 'dark'
    | 'green'
    | 'blue'
    | 'red'
    | 'amber'
    | 'purple'
    | 'teal'
    | 'outline'
    | 'ghost'
    | 'glass';

type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
    label: string;
    onPress?: () => void;
    className?: string;
    style?: ViewStyle;
    disabled?: boolean;
    scheme?: Scheme;
    size?: Size;
    rounded?: boolean | 'full' | 'xl';
}

/** Tailwind size shorthands */
function sizeClasses(size: Size, rounded?: boolean | 'full' | 'xl') {
    const roundClass =
        rounded === 'full' ? 'rounded-full' :
            rounded === 'xl' ? 'rounded-3xl' :
                rounded === false ? 'rounded-md' :
                    'rounded-xl'; // default

    switch (size) {
        case 'sm':
            return `py-2 px-3 ${roundClass}`;
        case 'lg':
            return `py-5 px-5 ${roundClass}`;
        default:
            return `py-4 px-4 ${roundClass}`;
    }
}


/** Returns {container, text, ripple, elevation, shadow} */
function schemeStyles(scheme: Scheme, disabled?: boolean) {
    const baseShadow = disabled ? '' : ' shadow-lg';
    const baseElevation = disabled ? 0 : 6;

    switch (scheme) {
        case 'green':
            return {
                container: 'bg-green-700 active:bg-green-800',
                text: 'text-white',
                ripple: 'rgba(255,255,255,0.15)',
                elevation: baseElevation,
                shadow: baseShadow + ' shadow-green-200',
            };
        case 'blue':
            return {
                container: 'bg-blue-700 active:bg-blue-800',
                text: 'text-white',
                ripple: 'rgba(255,255,255,0.15)',
                elevation: baseElevation,
                shadow: baseShadow + ' shadow-blue-200',
            };
        case 'red':
            return {
                container: 'bg-red-600 active:bg-red-700',
                text: 'text-white',
                ripple: 'rgba(255,255,255,0.15)',
                elevation: baseElevation,
                shadow: baseShadow + ' shadow-red-200',
            };
        case 'amber':
            return {
                container: 'bg-amber-500 active:bg-amber-600',
                text: 'text-black',
                ripple: 'rgba(0,0,0,0.12)',
                elevation: baseElevation,
                shadow: baseShadow + ' shadow-amber-200',
            };
        case 'purple':
            return {
                container: 'bg-purple-700 active:bg-purple-800',
                text: 'text-white',
                ripple: 'rgba(255,255,255,0.15)',
                elevation: baseElevation,
                shadow: baseShadow + ' shadow-purple-200',
            };
        case 'teal':
            return {
                container: 'bg-teal-700 active:bg-teal-800',
                text: 'text-white',
                ripple: 'rgba(255,255,255,0.15)',
                elevation: baseElevation,
                shadow: baseShadow + ' shadow-teal-200',
            };
        case 'outline':
            return {
                container:
                    'bg-transparent border border-neutral-300 active:bg-neutral-100',
                text: 'text-neutral-900',
                ripple: 'rgba(0,0,0,0.08)',
                elevation: 0,
                shadow: '',
            };
        case 'ghost':
            return {
                container: 'bg-transparent active:bg-neutral-100',
                text: 'text-neutral-900',
                ripple: 'rgba(0,0,0,0.08)',
                elevation: 0,
                shadow: '',
            };
        case 'glass':
            return {
                container: 'bg-white/25 border border-white/40 backdrop-blur-md',
                text: 'text-white',
                ripple: 'rgba(255,255,255,0.2)',
                elevation: 0,
                shadow: ' shadow-sm shadow-black/20',
            };
        case 'dark':
        default:
            return {
                container: 'bg-black active:bg-neutral-900',
                text: 'text-white',
                ripple: 'rgba(255,255,255,0.15)',
                elevation: baseElevation,
                shadow: baseShadow,
            };
    }
}

export default function Button({
                                   label,
                                   onPress,
                                   className,
                                   style,
                                   disabled,
                                   scheme = 'dark',
                                   size = 'md',
                                   rounded,
                               }: ButtonProps) {
    const base = `w-full items-center justify-center ${
        disabled ? 'opacity-40' : ''
    } `;
    const sizing = sizeClasses(size, rounded);
    const sty = schemeStyles(scheme, disabled);

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            android_ripple={{ color: sty.ripple }}
            className={`${base}${sizing} ${sty.container}${sty.shadow} ${className || ''}`}
            style={[{ elevation: sty.elevation }, style]}
        >
            <Text className={`${sty.text} text-base font-semibold`}>{label}</Text>
        </Pressable>
    );
}
