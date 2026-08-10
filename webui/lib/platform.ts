/**
 * Platform identity — single source of truth.
 *
 * Override at build time via .env.local:
 *   NEXT_PUBLIC_PLATFORM_SLUG=orion
 *   NEXT_PUBLIC_PLATFORM_NAME=Orion
 *   NEXT_PUBLIC_PLATFORM_SERVER=http://orion-server:8080
 */

/** Short identifier used in localStorage keys, URLs, and log tags. */
export const PLATFORM_SLUG =
    process.env.NEXT_PUBLIC_PLATFORM_SLUG ?? "orion";

/** Human-readable display name used in page titles and UI copy. */
export const PLATFORM_NAME =
    process.env.NEXT_PUBLIC_PLATFORM_NAME ?? "Orion";
