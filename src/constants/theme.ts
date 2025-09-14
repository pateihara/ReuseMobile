import { Platform } from 'react-native';

export const Colors = {
light: {
    // Neutros
    backgroundPrimary: '#F5F5F5',
    backgroundSecondary: '#FFFFFF',
    backgroundSuccess: '#D1FAE5',
    backgroundError: '#FEE2E2',
    backgroundAttention: '#FFFBEB',
    border: '#E5E7EB',
    textPrimary: '#111827',
    textSecondary: '#6B7280',

    // Cores
    primary: '#2563EB',
    secondary: '#7C3AED',
    success: '#047857',
    error: '#DC2626',
    attention: '#D97706',
},
dark: {
    // Neutros
    backgroundPrimary: '#121212',
    backgroundSecondary: '#1E1E1E',
    backgroundSuccess: '#064E3B',
    backgroundError: '#7F1D1D',
    backgroundAttention: '#78350F',
    border: '#333333',
    textPrimary: '#E0E0E0',
    textSecondary: '#A0A0A0',

    // Cores
    primary: '#5B86EE',
    secondary: '#A27FF7',
    success: '#38A169',
    error: '#EF4444',
    attention: '#FBBF24',
},
};


export const Fonts = Platform.select({
ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
},
default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
},
web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
},
});
