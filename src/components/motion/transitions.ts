export const easeOut = [0.16, 1, 0.3, 1] as const;

export const transitions = {
  fast: { duration: 0.16, ease: easeOut },
  default: { duration: 0.24, ease: easeOut },
  dropdown: { duration: 0.2, ease: easeOut },
  dropdownClose: { duration: 0.14, ease: easeOut },
  reveal: { duration: 0.45, ease: easeOut },
} as const;
