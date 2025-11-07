import { twMerge } from 'tailwind-merge'
export const cx = (...classes: Array<string | false | null | undefined>) =>
  twMerge(classes.filter(Boolean).join(' '))
