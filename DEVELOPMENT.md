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
- **Relative asset paths.** The theme folder is named after the repository, so nothing may reference the folder by name.

## Web pages

- Millennium loads the `Steam-WebKit` stylesheet and every `.*` patch into each web page the client shows: store, community, profiles. Those pages carry `html.MillenniumWindow_SteamBrowser`.
- `css/shared.css` is for the client's own windows, and its class names (`.friend`, `.gameName`, `.avatarHolder`, the scrollbars) also exist in community markup. The whole file is nested in `:where(:root:not(.MillenniumWindow_SteamBrowser))`. `:where()` adds no specificity, so the cascade inside the client is unchanged.
- `css/webkit.css` is nested in `:where(html.gd-store)`. `js/dusk.js` sets that class on store.steampowered.com. Matching by URL in `skin.json` is not reliable: `/wishlist/` and `/replay/` redirect, and the patch is decided before the redirect.
- Community and profile pages get nothing from the theme. Check with a screenshot diff against the same page with the theme's stylesheets disabled: it should be zero.

## Menus

- Most menus are their own windows with `body.ContextMenuPopupBody`. A menu that fits inside its parent window is drawn in that window instead: the right-click menu on a game in the library. `css/shared.css` covers both, the second through `body.DesktopUI .contextMenu`.
- Steam draws a menu separator as a top border on the row below it.

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
