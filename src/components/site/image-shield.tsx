"use client";

import { useEffect } from "react";

/**
 * ImageShield — global client-side image + header protection.
 *
 * What this does:
 *  1. Suppresses the browser context menu (right-click) only when the
 *     target is an <img> element OR is inside an element marked with
 *     `data-shield` (used on page headers and the navbar).
 *     We deliberately do NOT block right-click everywhere, because that
 *     harms accessibility and is hostile to users.
 *  2. Prevents drag-to-save on all images (the browser's "Save Image As..."
 *     shortcut triggered by dragging an image to the desktop / downloads bar).
 *  3. Blocks common keyboard shortcuts that trigger save dialogs:
 *     - Ctrl/Cmd+S (save page)
 *     - Ctrl/Cmd+U (view source — not full-proof but raises the bar)
 *     - Ctrl/Cmd+Shift+S (save page as...)
 *  4. Sets `draggable="false"` on every <img> after each navigation.
 *
 * Combined with the CSS rules in globals.css (`img { -webkit-user-drag: none;
 * user-select: none; }` and `[data-shield] { user-select: none; }`), this
 * makes images and headers non-downloadable client-side by casual users.
 *
 * Note: nothing client-side is foolproof. Determined users can still
 * inspect DevTools / network tab / cache to extract a public URL. This
 * shield is a UX-level deterrent, not a security boundary.
 */
export function ImageShield() {
  useEffect(() => {
    const isImg = (el: EventTarget | null) =>
      el instanceof HTMLElement &&
      (el.tagName === "IMG" ||
        !!el.closest("img") ||
        !!el.closest("[data-shield]"));

    const onContextMenu = (e: MouseEvent) => {
      if (isImg(e.target)) {
        e.preventDefault();
      }
    };

    const onDragStart = (e: DragEvent) => {
      if (isImg(e.target)) {
        e.preventDefault();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      // Block Ctrl/Cmd+S and Ctrl/Cmd+Shift+S (save page)
      const meta = e.metaKey || e.ctrlKey;
      if (meta && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        return;
      }
      // Block Ctrl/Cmd+U (view source) — limited effectiveness
      if (meta && (e.key === "u" || e.key === "U")) {
        e.preventDefault();
        return;
      }
    };

    // Mark every <img> as non-draggable (the React `draggable={false}` attr
    // is also set per-image in our components, but this catches images
    // rendered by next/image, third-party widgets, dynamic content, etc.)
    const markImagesNonDraggable = () => {
      document.querySelectorAll("img").forEach((img) => {
        img.setAttribute("draggable", "false");
        (img as HTMLImageElement).addEventListener("contextmenu", (e) => e.preventDefault(), { passive: false });
      });
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("dragstart", onDragStart);
    document.addEventListener("keydown", onKeyDown);
    markImagesNonDraggable();

    // Re-mark images after client-side navigation completes
    const observer = new MutationObserver(markImagesNonDraggable);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("dragstart", onDragStart);
      document.removeEventListener("keydown", onKeyDown);
      observer.disconnect();
    };
  }, []);

  return null;
}
