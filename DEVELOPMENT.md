# How Glass Dusk is put together

## Files

```
skin.json            patches, settings (Conditions) and store metadata
css/root.css         the Colors tab: one :root block, @name/@description per colour
css/steam.css        main window: ground, the two panes of glass, game list, game page, downloads
css/shared.css       every client window: menus, settings, dialogs, notifications, friends and chat
css/webkit.css       the store inside the client (store.steampowered.com only)
css/store/*.css      parts of webkit.css that one kind of store page needs (js/dusk.js loads each there)
css/overlay.css      in-game overlay window ("SP Overlay: …")
css/bigpicture.css   Big Picture "Cover" (switch Big Picture)
css/plugins.css      Millennium plugins with their own interface (switch Plugins)
css/options/*.css    what the settings switch on
js/dusk.js           runtime: art and accent (two colours, flowing from game to game), the library
                     home header, the still, Big Picture layer and chip, overlay accent from the
                     running game
assets/              number font (+ its OFL licence), the meadow background, the grain of the glass
tools/make-grain.py  draws assets/grain.png (seeded: the same tile every time; needs Pillow)
extras/screensaver/  an optional screensaver for Big Picture, copied into Steam by hand (not loaded by the theme)
```

## Rules the code follows

- **Readable classes, not hashes.** Steam gives elements a hashed class that changes with client updates, plus a readable one (`.TopBar`, `.PlayBar`, `BasicFooter`, `LibraryItemBox`). Only the readable ones are used.
- **Windows by class, not title.** Titles are translated, so they depend on the client language. Big Picture matches `GamepadUIPopupWindowBody`, and menus and dialogs are told apart by their `body` class. The only title the theme matches is the overlay's `^SP Overlay`, which Steam never translates.
- **Paint, don't resize.** Steam measures popup windows before the theme loads, so fonts and metrics stay Steam's wherever Steam owns the element.
- **One pane of glass.** `backdrop-filter` is used on the two library panels only. Nested frosted boxes stack into a milky haze.
- **`:has()` goes on the element styled.** Never on something above a common shape (`… div:has(…) > div`, `:has(…) > div:first-child`, `:has(…) svg`). Such a rule is paid for by every block a page adds, whether or not it ever matches: two of them took the game list from about 130 frames a second to 41 as it scrolled. When what is above has to decide, let it set a custom property and the rule below read it (the Stop pill's `--gd-play-ink`). To measure, scroll the list from a script with the theme's sheets on and off.
- **Option files load before `css/steam.css`.** A rule in an option file that undoes a rule in `steam.css` needs more specificity (an `html` prefix): an equal `!important` loses to the later file.
- **A switch `dusk.js` reads has no default in CSS.** The home-number switches set `--gd-stat-…` in an option file, and option files load before `css/steam.css`: a default written there would always win. So the script holds the defaults. A number that is on by default shows unless its variable says `off`; one that is off by default needs `on`.
- **Relative asset paths.** The theme folder is named after the repository, so nothing may reference the folder by name.

## Colour, finish and the still

- **Two colours.** `accentFrom` in `js/dusk.js` picks the accent and a second colour (`--gd-accent-2`): the art's next strongest hue, held between 26° and 50° from the first and set to the same brightness, so one ink reads on both. `css/steam.css` and `css/shared.css` build `--gd-accent-fill` (135°) and `--gd-accent-run` (along a bar) from the pair, and only the main surfaces use them: the Play button, the open tab, *Continue*, progress bars, a dialog's main button. Without a second colour (switch *Accent style → Solid*, a fixed accent, no art) both ends are the accent, so no rule needs a second form. Everything else keeps `--gd-accent`.
- **Every game's own colours.** `gd-app-accents` (localStorage) keeps the pair each game's art gave, for the 400 most recent. Besides turning the accent over with the page, it colours what is not the open game: the row under the pointer in the game list (`[data-gd-own]`, set by one `pointerover` listener on the document, since the list's rows are reused) and the parts of the home's two-week bar. `learnColours` works a pair out from the hero for a game not seen yet, once.
- **No game in view: the picture goes, the colour stays.** On a web page, the downloads or a collection there is no art (`wantedArt` gives none), and the accent is `restAccent`'s: on a game's store or hub page the pair worked out from the store's own art for it (`learnWeb`, the same picture and the same function the page uses, so window and page agree), anywhere else the last game's, kept as `gd-last-accent`. The Colors tab's Accent shows only before any game has been seen, for art with no colour, and with *Accent colour → Fixed*.
- **A store page is not told the window's colour.** Only a game's page takes a colour of its own, from that game's art; the rest of the store keeps the Colors tab's Accent while the pill above it wears the last game's. Steam does have a way to tell a page: the main window posts with `MainWindowBrowserManager.m_browser.PostMessage(message, args)` and the page listens through `SteamClient.BrowserView.RegisterForMessageFromParent`. It was built, measured in the live client and taken out again, because a web view holds **one** such listener: a second registration takes the first one's place, taking the second off does not bring the first back, and a frame inside the page shares the same seat. Steam's store code registers there itself (`GamepadInput` for a controller, `Checkout` for PayPal's answer, `PinnedView` for the overlay). A theme's listener would unseat it, or be unseated. Do not listen on that channel.
- **Changes go in steps.** A change of `--gd-accent` restyles the whole window, and a change of the art blurs it again. So the accent moves in five steps (`tint`), and the old picture fades out over the new one in eight (`#gd-art::after`, `steps(8)`), instead of a transition that would do either on every frame.
- **The finish is background, not a layer.** The grain (`assets/grain.png`, drawn by `tools/make-grain.py`) is one more background image over the pane's fill, and the lit edge is the colour of two borders. No pseudo-element, no blend mode, nothing to composite.
- **The still only fades.** `#gd-still` sits over the client and changes its opacity; nothing under it is touched. It takes pointer events while it shows, and the key that wakes the client is stopped, so neither can act on what is underneath. Its drift uses `steps()`, one every two seconds. `js/dusk.js` shows it after `--gd-still` minutes without a pointer or a key (5 with no option file) and never over a web page, in a hidden window, during a download or while a video plays.

## Web pages

- Millennium loads the `Steam-WebKit` stylesheet and every `.*` patch into each web page the client shows: store, community, profiles. Those pages carry `html.MillenniumWindow_SteamBrowser`.
- `css/shared.css` is for the client's own windows, and its class names (`.friend`, `.gameName`, `.avatarHolder`, the scrollbars) also exist in community markup. The whole file is nested in `:where(:root:not(.MillenniumWindow_SteamBrowser))`. `:where()` adds no specificity, so the cascade inside the client is unchanged.
- `css/webkit.css` is nested in `:where(html.gd-store)`. `js/dusk.js` sets that class on store.steampowered.com. Matching by URL in `skin.json` is not reliable: `/wishlist/` and `/replay/` redirect, and the patch is decided before the redirect.
- On every web page `js/dusk.js` switches `css/shared.css` and `css/plugins.css` off. Nothing in them applies there, but they cost: while a store page scrolls, Steam rewrites custom properties on the block around the whole page and toggles a class on `body`, the browser restyles everything under it, and every rule loaded is tried on every element.
- For the same reason the store's rules keep to cheap selectors. None ends in a common shape (`.Panel`, `.Focusable`, a bare `div` or `span`, `[role]`): such a rule is tried on nearly every element of the page. No `div + div` between bare tags, no `[style]` above the element styled, no `:has()` with bare tags inside. Where only a shape tells an element apart, `js/dusk.js` marks it and the rule ends in the mark:
  - `html.gd-p-<page>` for the kind of page (wishlist, calendar, recommender, charts, account, points, cart);
  - `[data-gd-<mount>]` on each of Steam's React blocks (`[data-featuretarget=<mount>]`);
  - `[data-gd-strip]` on the store menu and, inside its menus, `[data-gd-imgtile]`, `[data-gd-oc]`, `[data-gd-calbtn]`;
  - `[data-gd-rv-*]` on the pieces of a game's reviews (filters, cards, the graph, the score boxes, the reviewer's PC).
  The strip and the reviews are watched by their own observers, so what loads in is marked before it is painted.
- What only one kind of page needs is in `css/store/<part>.css`, loaded by `js/dusk.js` on that page alone: by path (calendar, charts, recommender, account, points, cart) or by the React block present (home, reviews, hubs, newshub).
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
- No CSS blur on that art and no `backdrop-filter` over it. Steam cross-fades two full-screen images on every move, and a CSS blur is redone on each frame of the fade. `dusk.js` fetches the art instead, scales it down off the main thread (`createImageBitmap`), softens it once into a 480×270 canvas and stretches that.
- The layer (`#gd-bpm-bg`) hangs on `#GamepadUI_Full_Root`, which every screen shares, and `<html data-gd-bpm="home | game | far">` says which screen is up: the focused game's art on the home, the game's own on its page, the last one further back everywhere else. Its canvas has the shape of the screen (`shapeOf`) and about the pixels of 480×270; one fixed shape stretched the picture on anything but 16:9.
- **The home, art first.** Steam's Big Art Mode is a class (`.BigArtMode`) and seven rules. `css/bigpicture.css` gives the same values to the same blocks by their readable names, inside `@container style(--gd-bpm-home: art)`, so the look is there whether or not Steam's setting is on and no script marks anything. Steam's own sharp images show there, over the softened layer. `css/options/bpm-home-steam.css` sets the property to `steam`.
- Steam paints the library (`.GamepadLibrary`) and the settings (`.GamepadPage.DialogBackground`, `.PagedSettingsDialog`) on opaque grounds; with the layer up they are cleared, or the art is hidden there.
- One request per picture (`loading`), dropped with an `AbortController` when the carousel has moved on (`dropOthers`); the last 16 small bitmaps are kept and closed when they go.
- Colours come from `gd-app-accents` when the desktop has seen the game, so both modes agree; `--gd-bpm-accent-2` is the second colour and `--gd-bpm-cut` deepens filled surfaces under a light accent, where white words would not read.
- The marquee (`#gd-bpm-marquee`) is plain DOM on `.RecentGamesInnerContainer`, the row that holds the carousel and stays put while the covers move. A controller only reaches Steam's own components, so it cannot select it.
- **The Steam menu and the Quick Access menu are pages of their own** (`MainMenu_uid…`, `QuickAccess_uid…`) drawn into the Big Picture window, and Millennium loads nothing into them. `dressViews` finds them through Steam's navigation trees (`SteamUIStore.WindowStore.m_Parent.m_GamepadNavigationManager.m_rgAllContexts[].m_rgGamepadNavigationTrees[].m_window`), links `css/bigpicture.css` there, marks `<html data-gd-bpm-view>` and copies the colours. If a client update moves the trees, nothing is found and the menus stay Steam's.
- **Focus.** One language for what the controller is on: `--gd-bpm-ring` (a ring in a light cut of the accent and its glow). Steam shows focus by animating a background or turning a button white, and any `!important` background of ours on such an element holds that still, `css/shared.css`'s buttons included, since this window loads it too. Whatever gets a plate here needs its `.gpfocus` / `.gpfocuswithin` state written as well. What has no focus look of its own Steam frames with a block that follows the focus, `.FocusRing`, and that block wears the same ring.
- To walk Big Picture without a controller, dispatch `keydown` events with the arrow keys in its window: Steam moves the focus for them even when the window is not the active one.
- Inside the Big Picture block of `dusk.js` no constant may be called `W`: that is the word list, and a canvas width by that name once broke the chip for good.
- Big Picture renders colours brighter than the CSS says, so filled surfaces use a darker cut of the accent.

## In-game overlay

- The overlay window is `SP Overlay: <pid>/…`. Its panels (*Game Overview*, browser) are separate untitled windows with `body.OverlayPopupBody`.
- The game is composited outside these pages, so `backdrop-filter` has nothing to blur there.
- The accent comes from the hero art of `SteamUIStore.MainRunningAppID`.
- `css/overlay.css` names the backdrop by Steam's hash, the one place a hash is used. `mapBackdrop` in `js/dusk.js` finds the current name after a client update: through Millennium's `findModule`, or in Steam's bundle by the names the module exports. The bundle gives it as "hash Readable"; the first name is the one used.

## Checking a change

Millennium caches theme files when Steam starts: copy the theme into `Steam/millennium/themes/`, then restart Steam. Settings changes also apply only after a restart.

Remote debugging (`.cef-enable-remote-debugging`) conflicts with Millennium. Inspect the DOM with a small script that the theme loads during development instead. Keep that script out of the repository.
