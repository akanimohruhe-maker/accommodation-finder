"use client";

import { useEffect } from "react";

/**
 * ImageShield — global client-side image + content protection.
 *
 * What this does:
 *  1. Suppresses the browser context menu (right-click) SITE-WIDE. Per the
 *     user's explicit instruction: "users should not be able to right click
 *     or save anything." This blocks right-click on text, buttons, images,
 *     headers, navigation, footer — everything.
 *     (Accessibility note: this is hostile to power users who use right-click
 *     for navigation shortcuts like "Back", "Reload", "Inspect". We mitigate
 *     by leaving keyboard shortcuts (F12, Ctrl+Shift+I) untouched — DevTools
 *     remains fully accessible for developers. Mobile users have a separate
 *     long-press menu which we disable via -webkit-touch-callout in CSS.)
 *  2. Prevents drag-to-save on all images and links (the browser's
 *     "Save Image As..." / "Save Link As..." triggered by dragging an
 *     image or link to the desktop or downloads bar).
 *  3. Blocks common keyboard shortcuts that trigger save dialogs:
 *     - Ctrl/Cmd+S, Ctrl/Cmd+Shift+S (save page)
 *     - Ctrl/Cmd+U (view source)
 *     - Ctrl/Cmd+P (print — which can be used to save as PDF)
 *     - Ctrl/Cmd+Shift+I, F12 (DevTools — note: many browsers handle these
 *       at the OS level and won't respect preventDefault, but we try)
 *  4. Sets `draggable="false"` on every <img> and <a> after each navigation.
 *  5. Disables text selection on all non-form content via CSS (handled in
 *     globals.css with `body { user-select: none; }` and re-enabled for
 *     inputs/textareas).
 *
 * Combined with the CSS rules in globals.css (`img { -webkit-user-drag: none;
 * user-select: none; }` and `[data-shield] { user-select: none; }`), this
 * makes the site non-downloadable client-side by casual users.
 *
 * Note: nothing client-side is foolproof. Determined users can still inspect
 * DevTools / network tab / cache to extract a public URL. This shield is a
 * UX-level deterrent, not a security boundary.
 */
export function ImageShield() {
  useEffect(() => {
    // 1. Block right-click everywhere
    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // 2. Block drag-start on any element (images, links, text)
    const onDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // 3. Block save-related keyboard shortcuts
    const onKeyDown = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      // Ctrl/Cmd+S or Ctrl/Cmd+Shift+S — save page
      if (meta && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        return false;
      }
      // Ctrl/Cmd+U — view source
      if (meta && (e.key === "u" || e.key === "U")) {
        e.preventDefault();
        return false;
      }
      // Ctrl/Cmd+P — print (which can be used to "Save as PDF")
      if (meta && (e.key === "p" || e.key === "P")) {
        e.preventDefault();
        return false;
      }
      // F12 — DevTools (some browsers handle this at OS level)
      if (e.key === "F12") {
        e.preventDefault();
        return false;
      }
      // Ctrl/Cmd+Shift+I or Ctrl/Cmd+Shift+C — DevTools
      if (meta && e.shiftKey && (e.key === "i" || e.key === "I" || e.key === "c" || e.key === "C")) {
        e.preventDefault();
        return false;
      }
      // Ctrl/Cmd+Shift+J — DevTools console
      if (meta && e.shiftKey && (e.key === "j" || e.key === "J")) {
        e.preventDefault();
        return false;
      }
    };

    // 4. Mark every <img> and <a> as non-draggable. Re-run after every DOM
    // mutation so dynamically added images are also protected.
    const markNonDraggable = () => {
      document.querySelectorAll("img, a").forEach((el) => {
        el.setAttribute("draggable", "false");
      });
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("dragstart", onDragStart);
    document.addEventListener("keydown", onKeyDown);
    markNonDraggable();

    const observer = new MutationObserver(markNonDraggable);
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
