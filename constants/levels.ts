// constants/levels.ts
export const LEVELS = ['Level-1', 'Level-2', 'Level-3'] as const;

export type Level = (typeof LEVELS)[number];

// We will map Tamil names later if you want local-language display per level.
