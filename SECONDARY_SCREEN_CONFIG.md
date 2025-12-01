# How to Configure Secondary Screen Launch

This document explains how to configure the application to launch on a secondary vertical screen.

## Configuration

1.  Open `src/main.js`.
2.  Locate the configuration constant near the top of the file (around line 12):

    ```javascript
    // Configuration for window positioning
    // Set to true to attempt opening on a secondary vertical screen
    const OPEN_ON_SECONDARY_VERTICAL_SCREEN = false;
    ```

3.  Change the value to `true` to enable the feature:

    ```javascript
    const OPEN_ON_SECONDARY_VERTICAL_SCREEN = true;
    ```

## How it Works

When enabled, the application will:
1.  Detect all connected displays.
2.  Look for a **secondary display** (not the primary one) that has a **vertical aspect ratio** (height > width).
3.  If a vertical secondary display is found, the window will open on that screen.
4.  If no vertical secondary display is found, but other secondary displays exist, it will default to the first available secondary display.
5.  If only one display is connected, it will open on the primary display as usual.
