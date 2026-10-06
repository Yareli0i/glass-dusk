# Changelog

Versions follow [semantic versioning](https://semver.org). The repository starts at 1.2.0. The two earlier versions were built before it existed, and they are described from the development notes.

## 1.5.1 — 2026-10-06

**Library home**
- The three numbers in the header were all counted from the installed apps, so a large library showed a fraction of itself ([#1](https://github.com/Yareli0i/glass-dusk/issues/1), reported with a fix by @eviljjonahjameson):
  - *Games* is every game in the library, installed or not. Family-shared games count, hidden ones do not. It used to count installed apps, tools and videos among them.
  - *Hours played* adds up the whole library. Uninstalling a game no longer takes its hours away.
  - *On disk* is what Steam's library folders hold on every drive: games, DLC, workshop items, shader caches and staged updates. It is the total that Settings → Storage shows, in the same units. It used to miss workshop items and shaders.
- The header no longer disappears when nothing installed has been played yet. It shows the numbers without the *Continue* card.

**Store**
- A bundle's page: the right column had a square dark patch behind *Bundle details*. It is gone. SteamDB's *View on SteamDB* button there and on package pages was left in Steam's blue; it is a quiet chip now.
- A package's page: the banner's black frame gets rounded corners, and the price summary under the list of items is a card.
- A game's page: the list of DLC was grey slabs with an outlined *Browse all* box. The rows are quiet now and *Browse all* is a chip. The orange notice box, and the purple *Downloadable Content* notice on a DLC's page, have rounded corners.

## 1.5.0 — 2026-10-04

**Plugins**
- Millennium plugins that draw their own interface now wear the theme instead of Steam's stock blue and grey:
  - *HLTB for Steam* — the strip over a game's art (it also no longer fades out with the bottom of the art), in Big Picture too, and its block on store pages;
  - *Achievement Groups* — its whole page: search, filters, dropdowns, buttons, groups, rows and the preferences window. Unlocked achievements are tinted with the game's colour instead of green;
  - *Player Count* and *Size on Disk* — their tiles in the play bar now read like Steam's own: grey caption and icon, white value. Player Count no longer paints its number red, gold or blue;
  - *Extendium* — its menu on the address bar and the extensions window: extension cards, the details view, fields and links. The compatibility pill keeps its colour as a quiet tint.
- New switch: *Plugins* (Theme / Plugin's own).

**Store**
- A game's page: the right column was a stack of square near-black blocks. They are now the same soft rounded cards as the purchase boxes on the left, the achievements block included.
- Browser extensions added through Extendium get the same cards: SteamDB's and Augmented Steam's blocks, price lines and the app ID chip. Augmented Steam's column of link buttons was eight accent buttons; they are quiet chips now.
- A game's page: the "already in your library" block and the review form were left in Steam's colours. The form is now themed; Yes / No are quiet until one is picked, and *Post review* is the accent button.
- A game's page: the customer reviews section sat on dark bands that the theme itself put there. The bands are gone; review cards are rounded and their buttons match the theme. Rating colours and the thumb boxes stay Steam's.
- A game's page: the rows of *Is this game relevant to you?* sat on dark plates. A rule meant for capsule blurbs caught them.

**Settings, chat and dialogs**
- Settings → Storage → *Move Content*: the dialog had no ground of its own and its text sat on top of the game list. Any dialog opened inside a settings window now gets its own panel.
- Chat window: it kept Steam's grey ground, tab and entry row, and the emoticon, attach and voice buttons came out as filled circles like the send button. The window now matches the friends list; the four buttons share one shape, and send is filled only when there is something to send.
- Switches, sliders, segmented choices, radio buttons and checkbox ticks stayed in Steam's blue. They now take the accent colour.
- Settings: family members, the *Game update timing* note and the recording modes were grey square slabs.
- Game Properties: the beta branches and DLC tables were grey.
- Recordings & Screenshots: grey buttons, a blue title and grey recording tiles.

**Achievements page**
- The progress bar at the top was blue, Steam's slate sheet sat behind the list, and the *Scroll to top* tab was blue.

## 1.4.0 — 2026-10-01

**Community and profiles**
- Community and profile pages are no longer restyled. They were caught half-way: rules meant for the client's own windows (friends, avatars, scrollbars) also matched community markup. Profiles carry their owners' own backgrounds and themes, so these pages now stay exactly as Steam draws them.
- Store styling applies to store.steampowered.com only.

**Fixes**
- Wishlist: a huge unstyled header with a menu button sat on top of the page. It is Steam's own in-client header, shown with or without the theme, and it is now hidden.
- Library: the right-click menu on a game stayed in Steam's grey with a green Play row. It now matches the other menus.
- Library: the card that appears when hovering a game gets rounded corners and the theme's dark ground.
- Game page: the *Featured* update card kept Steam's blue frame and square corners.
- Settings → Account: the three large tiles were stretched into ovals.
- Friends list: the glow behind your name was a hard-edged ellipse. Steam's own soft glow is back.

**Other**
- Donate button for steambrew.app (Ko-fi).
- Source comments are in English throughout, and the screenshots show the English client.

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
