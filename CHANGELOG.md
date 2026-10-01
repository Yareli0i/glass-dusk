# Changelog

Versions follow [semantic versioning](https://semver.org). The repository starts at 1.2.0. The two earlier versions were built before it existed, and they are described from the development notes.

## 1.4.0 — 2026-10-01

**Community and profiles**
- Community and profile pages are no longer restyled. They were caught half-way: rules meant for the client's own windows (friends, avatars, scrollbars) also matched community markup. Profiles carry their owners' own backgrounds and themes, so these pages now stay exactly as Steam draws them.
- Store styling applies to store.steampowered.com only.

**Fixes**
- Wishlist: a huge unstyled header with a menu button sat on top of the page. It is Steam's own in-client header, shown with or without the theme, and it is now hidden.
- Library: the right-click menu on a game stayed in Steam's grey with a green Play row. It now matches the other menus.
- Library: the card that appears when hovering a game gets rounded corners and the theme's dark ground.
- Settings → Account: the three large tiles were stretched into ovals.
- Friends list: the glow behind your name was a hard-edged ellipse. Steam's own soft glow is back.

**Other**
- Donate button for steambrew.app (Ko-fi).
- Source comments are in English throughout.

## 1.3.0 — 2026-09-30

Ready for release.

**Settings**
- All settings are in English. The new *Theme language* switch keeps the theme's own text in English by default, with Ukrainian as an option.
- New: *Background art* (Normal / Subtle / Vivid), *Library home* (Theme / Steam), *Game list side* (Right / Left), *Big Picture hours chip*.
- *Accent colour → Fixed* uses the Accent from the Colors tab instead of a hard-coded blue.
- The Colors tab now has names and descriptions. Glass tint and the play bar colour work; four colours that changed nothing are gone.

**Fixes**
- *What's New shelf* and *Game list side → Left* had no effect: option files load before the main stylesheet and lost to it. They now outweigh it.
- The library home header sat 5 px from the window edge. It now lines up with Steam's shelves.
- The number font and the meadow were linked through the theme's folder name, and would have gone missing in any other folder. Both now use relative paths.
- Big Picture is matched by its window class, not its title, so it works in every Steam language.
- Removed `UseDefaultPatches`, which the Millennium docs say must not be combined with custom patches.
- Removed a development helper and an unused option file from the theme.

## 1.2.0 — 2026-09-30

**Big Picture: Cover**
- The focused game's art fills the home screen. Buttons, tabs and the focus ring take their colour from it.
- A chip at the top left shows the game's logo, hours played and when it was last played.

**In-game overlay**
- *Game Overview*, the browser and the toolbar become smoked glass, coloured by the game being played.

**Fixes**
- Big Picture was treated as the main window and cleared the colour that menus follow.
- The chip and the colour lagged one game behind: during a move Steam keeps two background images, and the old one was being read.
- Big Picture stuttered on every move: a CSS blur was redone for every frame of Steam's cross-fade. The art is now blurred once into a small canvas, and images are decoded and scaled off the main thread. Frame times now match Steam without the theme.

## 1.1.0 — 2026-09-26

- In-game overlay: a light veil replaces Steam's near-black sheet behind the Shift+Tab panels.
- New switch: *In-game overlay* (Transparent / Steam).

## 1.0.0 — 2026-09-12

- The open game's art, blurred, fills the client, and the accent colour is picked from it. The library home borrows the last game you played.
- Two panes of smoked glass with the game list on the right; its own library home header (greeting, stats, Continue, recent games).
- Game page, store and community, menus, settings, notifications, friends and chat restyled.
- Switches: Background, Accent, Glass, Corners, What's New shelf.
