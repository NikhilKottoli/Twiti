import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/** Normalize ENS name per EIP-137: lowercase and strip leading/trailing dots. */
export function normalizeEnsName(name: string): string {
    if (!name || typeof name !== 'string') return '';
    return name.trim().toLowerCase().replace(/^\.+|\.+$/g, '');
}
