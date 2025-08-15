// Theme settings for Remix
export interface ThemeSettings {
  colorTheme: string;
  gradient: string;
  pattern: string;
  font: string;
  borderRadius: string;
  mode: string;
  effects: {
    shadow: boolean;
    glassmorphism: boolean;
    cardOpacity: number;
    animationSpeed: number;
  };
}
