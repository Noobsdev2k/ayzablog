export const DESKTOP_CARD_WIDTH_THRESHOLD = 1200;

export const isCardDesktop = (win = global.window) => win?.innerWidth > DESKTOP_CARD_WIDTH_THRESHOLD;
