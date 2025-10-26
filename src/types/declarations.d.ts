//src/types/declarations.d.ts
declare module 'react-native-safe-area-context' {
import * as React from 'react';
import { ViewProps } from 'react-native';

export interface EdgeInsets {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export interface SafeAreaViewProps extends ViewProps {
    children?: React.ReactNode;
}

export const SafeAreaView: React.ComponentType<SafeAreaViewProps>;
export function useSafeAreaInsets(): EdgeInsets;

export const SafeAreaProvider: React.ComponentType<{ children?: React.ReactNode }>;
}
