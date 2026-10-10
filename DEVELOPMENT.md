# How Glass Dusk is put together

## Files

```
skin.json            patches, settings (Conditions) and store metadata
css/root.css         the Colors tab: one :root block, @name/@description per colour
css/steam.css        main window: ground, the two panes of glass, game list, game page, downloads
css/shared.css       every client window: menus, settings, dialogs, notifications, friends and chat
css/webkit.css       the store inside the client (store.steampowered.com only)
css/overlay.css      in-game overlay window ("SP Overlay: …")
css/bigpicture.css   Big Picture "Cover" (switch Big Picture)
css/plugins.css      Millennium plugins with their own interface (switch Plugins)
css/options/*.css    what the settings switch on
js/dusk.js           runtime: art and accent, the library home header, Big Picture layer and chip,
                     overlay accent from the running game
assets/              number font (+ its OFL licence) and the meadow background
```

## Rules the code follows

- **Readable classes, not hashes.** Steam gives elements a hashed class that changes with client updates, plus a readable one (`.TopBar`, `.PlayBar`, `BasicFooter`, `LibraryItemBox`). Only the readable ones are used.
- **Windows by class, not title.** Titles are translated, so they depend on the client language. Big Picture matches `GamepadUIPopupWindowBody`, and menus and dialogs are told apart by their `body` class. The only title the theme matches is the overlay's `^SP Overlay`, which Steam never translates.
- **Paint, don't resize.** Steam measures popup windows before the theme loads, so fonts and metrics stay Steam's wherever Steam owns the element.
- **One pane of glass.** `backdrop-filter` is used on the two library panels only. Nested frosted boxes stack into a milky haze.
- **Option files load before `css/steam.css`.** A rule in an option file that undoes a rule in `steam.css` needs more specificity (an `html` prefix): an equal `!important` loses to the later file.
- **A switch `dusk.js` reads has no default in CSS.** The home-number switches set `--gd-stat-…` in an option file, and option files load before `css/steam.css`: a default written there would always win. So the script holds the defaults. A number that is on by default shows unless its variable says `off`; one that is off by default needs `on`.
- **Relative asset paths.** The theme folder is named after the repository, so nothing may reference the folder by name.

## Web pages

- Millennium loads the `Steam-WebKit` stylesheet and every `.*` patch into each web page the client shows: store, community, profiles. Those pages carry `html.MillenniumWindow_SteamBrowser`.
- `css/shared.css` is for the client's own windows, and its class names (`.friend`, `.gameName`, `.avatarHolder`, the scrollbars) also exist in community markup. The whole file is nested in `:where(:root:not(.MillenniumWindow_SteamBrowser))`. `:where()` adds no specificity, so the cascade inside the client is unchanged.
- `css/webkit.css` is nested in `:where(html.gd-store)`. `js/dusk.js` sets that class on store.steampowered.com. Matching by URL in `skin.json` is not reliable: `/wishlist/` and `/replay/` redirect, and the patch is decided before the redirect.
- Community and profile pages get nothing from the theme. Check with a screenshot diff against the same page with the theme's stylesheets disabled: it should be zero.

## Library home numbers

- Everything comes from the client's own stores: `appStore.allApps` (games, hours, hours in two weeks, unplayed), `SteamClient.InstallFolder` (disk) and `appAchievementProgressCache` (perfect games, average completion).
- That achievement cache is not kept current by Steam. An entry is renewed only when something asks about a game played since it was cached, and a game that gains achievements with a DLC is never looked at again. While *Perfect games* is on, `renewAchievements` queues played games through the cache's own `QueueCacheUpdate`: no entry, played since, or older than a day. A hundred at a time, the next hundred once the queue is empty, and no game more often than every six hours.
- To check the number, compare with `steamcommunity.com/profiles/<id>/stats/<appid>/achievements`, which says "N of M" for each game.

## Menus

- Most menus are their own windows with `body.ContextMenuPopupBody`. A menu that fits inside its parent window is drawn in that window instead: the right-click menu on a game in the library. `css/shared.css` covers both, the second through `body.DesktopUI .contextMenu`.
- Steam draws a menu separator as a top border on the row below it.

## Plugins

- A plugin's interface lives in the client's own windows, next to Steam's. Plugins made of Steam's components (a `GameStat` tile in the play bar, a `DialogBody` in a properties window) need no rules.
- Plugins with markup of their own add a `<style>` at run time, after the theme's files. `css/plugins.css` therefore uses `!important` and the plugin's own class names, and changes colour and radius only.
- To see what a plugin paints, read `.millennium/Dist/index.js` in its folder: the stylesheet is a string there.
- A plugin's store-page block (HLTB) is styled in `css/webkit.css`, inside the `gd-store` wrapper.
- Browser extensions installed through Extendium (SteamDB, Augmented Steam) add to store pages too. Most of their blocks are Steam's own `.block` and take the right-column card rule in `css/webkit.css`; only the pieces with a look of their own (`.es_app_btn`, `.steamdb_prices`, `.itad-pricing`, `.steamdb_link`) have rules, next to HLTB's.
- A colour a plugin sets inline can stay as a tint: put a `background-image` veil over it (Extendium's compatibility pill).

## Big Picture

- Steam keeps the focused game's art behind the home screen. During a move there are two images: the incoming one first, the outgoing one marked `OffScreen`.
- No CSS blur on that art and no `backdrop-filter` over it. Steam cross-fades two full-screen images on every move, and a CSS blur is redone on each frame of the fade. `dusk.js` fetches the art instead, scales it down off the main thread (`createImageBitmap`), blurs it once into a 192×108 canvas and stretches that.
- The chip is plain DOM. A controller only reaches Steam's own components, so it cannot select the chip.
- Big Picture renders colours brighter than the CSS says, so filled surfaces use a darker cut of the accent.

## In-game overlay

- The overlay window is `SP Overlay: <pid>/…`. Its panels (*Game Overview*, browser) are separate untitled windows with `body.OverlayPopupBody`.
- The game is composited outside these pages, so `backdrop-filter` has nothing to blur there.
- The accent comes from the hero art of `SteamUIStore.MainRunningAppID`.

## Checking a change

Millennium caches theme files when Steam starts: copy the theme into `Steam/millennium/themes/`, then restart Steam. Settings changes also apply only after a restart.

Remote debugging (`.cef-enable-remote-debugging`) conflicts with Millennium. Inspect the DOM with a small script that the theme loads during development instead. Keep that script out of the repository.
