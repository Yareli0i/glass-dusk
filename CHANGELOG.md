# Changelog

Versions follow [semantic versioning](https://semver.org). The repository starts at 1.2.0. The two earlier versions were built before it existed, and they are described from the development notes.

## 2.0.3 — 2026-11-14

**Library**
- The caption over the bottom of a cover in shelves and collections (hours played, the date last played, whatever the shelf is sorted by) was white on near-clear glass, and on pale art could hardly be read (from Discord). It sits on the theme's dark glass now, readable on any cover.

## 2.0.2 — 2026-11-14

**New**
- The main window says so when the theme cannot reach it. Where Millennium did not add Steam's readable class names, the store looks right and the library is stock Steam, with nothing to say why. A line in the window's foot bar now names the cause, with a link to what has helped. It shows only in that case, and once dismissed stays away for two weeks.

**Menus**
- The first and the last item of a menu poked past the menu's rounded corner when highlighted, and the menu's rim was drawn across them: the tabs' menus in the top bar (*Home*, *Collections*, *Downloads*) and the right-click menu of a game (from Discord). Their outer corners follow the menu's own curve now.

## 2.0.1 — 2026-11-13

**Library**
- The game list stopped answering the pointer after Steam's client update of 11 November. A row under the pointer got no wash at all, neither the soft one nor its own game's colours, and the selected row turned Steam's slate blue under the pointer. Steam had moved a class in the list's markup; the theme finds the rows either way now, and the selected row keeps its accent.

## 2.0.0 — 2026-11-13

**New**
- **Two-tone accent.** The art now lends two colours instead of one. The second is the art's next strongest hue, kept within 50° of the first and brought to the same brightness, so the pair always sits together and the same text reads on both. The Play button, the open tab at the top, the announcements button, *Continue* and the achievement bars run from one to the other, and so does the main button of every dialog. Switch *Accent style*: Two-tone by default, Solid for one colour.
- **The colour flows.** Opening another game, the accent moves from the old colour to the new one in a fifth of a second instead of jumping, and the art behind the glass fades over. Both go in a few steps, not on every frame, so a change costs a handful of repaints. Switch *Transitions*: Flowing or Instant. The system's "reduce motion" turns it off as well.
- **The glass has a finish.** A fine grain lies over the panes, and their top and left edges are lit in the accent, as if the game's light fell on them. The library's two panes, the rail of the game list beside the store and Millennium's settings have it. Switch *Glass finish*: Grain and lit edge, Grain, Lit edge, or Plain for the smooth glass of earlier versions. Scrolling a game page measured the same with the finish and without.
- **The still.** Left alone on the library for five minutes, Steam becomes the art of the game in view: the hero unblurred across the window, the game's logo, the time and the date. The first move of the pointer, a key or a click brings the client back, and that click or key does nothing else: it cannot press what lies under the picture. It stays away while a video plays, while something is downloading, over the store and other web pages, and when the window is hidden. The picture drifts a few dozen pixels over minutes, one step every two seconds, so nothing stands in one place for hours and the client draws next to nothing. Switch *When idle*: After 5 minutes, After 2, After 15, Never.
- **Two weeks in colour.** Under the greeting on the library home lies one bar: every game played in the last two weeks is a part of it, as wide as its share of the hours and in its own two colours. Point at a part and the line under the bar names the game and its hours; a click opens it. Switch *Home: two weeks in colour*.
- **Each game answers in its own colour.** The theme has always kept the colour each game's art gave. The row under the pointer in the game list is now washed in the colours of that game, not of the open one. A game not seen yet gets its colours once the pointer has rested on it for a quarter of a second, so sweeping down the list asks for nothing. With *Accent colour → Fixed* the one colour stays.
- **One accent on every tab.** With *Accent colour → Game art* the pill on STORE, COMMUNITY and your profile wore the Colors tab's *Accent*, and only the one on LIBRARY the game's. The colour now stays a game's wherever the window is. On a game's page in the store it is that game's, taken from the art the page itself uses, so the window and the page agree. With no game in view (the store's front page, the community, downloads) it is the last game's, kept between sessions. The Colors tab's *Accent* is what shows before any game has been seen, for art with no colour in it, and with *Fixed*.

**Big Picture**
- The game's art lies under every screen now, not the home alone, and it is the picture itself, softened, where it used to be a wash of colour. A game's page wears its own art; the library, the settings and the rest keep the last one, further back.
- The focused game's numbers stand under the carousel, to the right of Steam's own label: time played, when it was last played, and achievements with their bar. They replace the chip in the top bar, which had not shown for some time: a constant in that code had taken the name of the theme's word list and broke it.
- Big Picture uses the same colours as the desktop for every game, and the second colour too: the open tab, the action button of a game's page and the glow of the focus run from one to the other. On a light accent (Cyberpunk's yellow) filled surfaces are cut deeper, so the white words on them read.
- A game's page: Steam's grey sheet under it is gone, the action button is one pill in the game's colours, and the buttons beside it are round glass.
- The Steam menu and the Quick Access menu are smoked glass over the blurred screen, and the item the controller is on wears the game's colours. They are pages of their own that Millennium loads nothing into; the theme reaches them from the Big Picture window.
- What the controller is on always shows: a ring in a light cut of the game's colour, with its glow. In the settings, rows and buttons had lost their focus highlight to the theme's own plates, so a focused button looked like any other. They have it back, in the accent. What Steam frames itself (a news card, a capsule of the store) wore a white hairline with square corners, a cover in the library's grid had only a glow under it, and a tile of *Recently updated* showed nothing at all: they all wear the same ring now.
- Settings are two panes of glass with soft rows. The page you are on, the switches, the kind of news on the home's cards, *New to library* and the store's capsules under *Recommended* follow the accent.
- **The home, art first.** The focused game's art, sharp, fills the first screen and the carousel sits at its foot: the look of Steam's Big Art Mode, whether or not that setting of Steam's (Settings → Home) is on. Steam's mode is one class and seven rules; the theme uses the same values on the same blocks, so the home scrolls and pins its tabs as it does in Steam's own mode. The softened art stays underneath and shows where the picture fades out. Switch *Big Picture home*: Big art, or Steam's, which leaves the layout to Steam's setting.
- The art shows under the library and the settings as well. Steam paints both on an opaque ground of its own, and the glass there lay on flat paint.
- The softened art keeps its proportions on any screen. It was drawn for 16:9 and stretched to fit: a third too wide on an ultrawide, too tall on 4:3. Its canvas now takes the shape of the screen and is drawn again when the window changes shape.
- A picture is asked for once, however fast the carousel runs, and a request for a game already left behind is dropped instead of being read to the end. Custom art can be tens of megabytes.
- The icons and the clock of the top bar have a soft dark edge and a fade of dusk behind them, so they read over art at full brightness. *Recent Games* over the carousel has the same.
- *Recently updated on this device* was square grey tiles; they are the smoked glass of the news cards. *+6* after the friends on a capsule was a slate square.
- An optional screensaver for Big Picture is in `extras/screensaver`: the theme's dusk with two drifting fields of its colours, the time and the date, as a page of the kind Steam's own screensaver is, to be copied into Steam by hand. It is experimental: the theme does not install it, it was not tried inside Steam, and Steam serves a screensaver apart from the client, so it cannot show the game you had in view. Its README says what is known and what is not.

**Friends and chat**
- The friends list: your own tile is rounded and ringed in the colour of your status. A friend's status is a ring round the avatar instead of a bar down its side, in Steam's own colours for it: blue online, green in a game, amber away, grey offline. A friend in a game has a breath of that green across the row. The plate under the pointer is rounded and stops short of the window's edges.
- The heads of the groups (*In Game*, *Online Friends*, *Offline*, your categories) are small capitals with the count in a pill. Group chats have round badges.
- A conversation: its head was Steam's grey slab and the open channel of a group a grey plate with a blue bar; both are glass and accent now. The day between messages is small capitals between two hairlines, the field you type in lights its edge, and *scroll to bottom* is a pill, in the accent when something new waits below.
- Messages keep Steam's layout, and a speaker's name keeps Steam's colour for their status. Only the rest changes colour: times in the faint ink, links and mentions in the accent, a link's preview on a soft card.
- The friends list and the chat let a little of the open game's art through their glass.

**Library**
- Community content on a game's page (guides, artwork, screenshots, videos) was Steam's grey cards, with white chips and blue icons under the pointer. They are glass cards now, with the accent around the one under the pointer and dark chips.
- A major update in a game's activity feed kept Steam's blue ground, its blue frame and a blue bar hanging off the left edge. The event's own picture is its ground now, in colour, and the accent marks the kind of news and the edge.
- The head of a game's achievements page lies over its art, and under bright art (Cyberpunk's yellow, a white sky) the white words on it could hardly be read. The picture is at half its brightness there now and reads over any art.
- Steam's blue or slate was left on the announcements button while there is news, the two filters beside the game list's drop-down, the round button that closes the achievements page, a hidden achievement's tile, the header of *Community Content* and *Change preferred copy* under a shared game.
- The search field of the game list and the Library Filters button stood flush, two rounded plates with a notch where their corners met. They are 8 px apart, like the Home bar and its button (from Discord).
- A game more than one of the family owns: the row under Play (*From your Steam library*) took a card of its own, corners against the bar's corners. The two are one card (from Discord).
- On a page too short to scroll (a game added from outside Steam) the art stopped short of the pane's edge, where Steam keeps room for a scrollbar that never came. It runs to the edge (from Discord).
- A *Featured* update on a game's page had one pixel of the accent down its right edge: the card's gradient began again under its border (from Discord).
- **The home's own controls work from the keyboard.** Every one of them says what it is (a cover in the recent row names its game and when it was played, a part of the two-week bar its game and hours, Play its game). The Continue card can be reached with Tab and opened with Enter or Space. The preview of a recent game opens for the cover Tab has landed on and closes with Escape. Each control shows where the keyboard is, and a rebuild of the header no longer takes the focus away.

**Speed**
- Scrolling the game list ran at less than half the frames it runs at without the theme: 49–55 a second against about 130, measured by scrolling it from a script with the theme's style sheets on and off. Two rules were the cost, each on pages where it matched nothing: `:has()` on a parent, with a bare `div` after it. With `:has()` on the element styled the list runs at 101–108. The glass, its grain and the blurred art cost the list nothing; each was switched off in turn to see.
- The windows that follow the main one (menus, friends, settings) wrote the accent and the art to the page every second and a half whether or not anything had changed. The home's numbers were counted every few seconds with Steam minimised or on the store. The still asked Steam about its downloads on every pass. None of that happens now.

**Overlay**
- The class of the overlay's backdrop is found a second way, in Steam's own bundle, when Millennium's helper is not there; and a class that arrives as two names no longer breaks the rule built from it. Checked against the current client: the name in `css/overlay.css` is still Steam's.

**Settings and dialogs**
- The arrow of every drop-down was Steam's blue. Links in the settings pages and in a game's Properties, and Steam Cloud's "available", were its light blue. They follow the accent.
- Storage: a drive's bar, the dot for free space and the square button beside the bar were slate. Voice: the bar of the microphone test. Family: *Me* was a green tag.
- Recordings & Screenshots: the bands its head and foot stand on faded into Steam's slate.
- A text field you are typing in gets a hairline of the accent. Selected text is the accent in every window, the store included, instead of Steam's blue.

**Store**
- A game's page: Steam's blue glow behind its top, the headings inside the description, the ticks in the table of languages, *Bundle* and *Includes N items*, the plates under what a game supports, and the lime *In library* tab on a package you own.
- The kind of news on an event card (*Small Update / Patch Notes*, *Game Discount*), on a game's page and on the sale pages.
- The line under the open list on the front page, *Your New Release Queue*, the open page in the charts' side list and *Pre-Purchase* beside a price.

## 1.7.14 — 2026-11-09

**Friends**
- The hint for favourites at the top of the friends list (*Drag Friends & Chats here for easy access*) was Steam's cyan, text and dashed frame, and its *Got it!* was a fixed blue. The hint is in the theme's soft ink now, and *Got it!* wears the accent like every other button.

**Store**
- The discounts in the front page's *Discounts & Events* were Steam's lime squares again. Steam now paints the percent itself over the theme's plate there, as it did on the wishlist; it goes clear, and the chip is the accent again.

## 1.7.13 — 2026-11-07

**Library**
- The art of the game you have open never showed behind the glass, and *Background art* had nothing to change: Normal, Subtle and Vivid looked the same (from Discord). The window loads two of the theme's style sheets, and the one for every window came last. It put the art layer under the window's dark ground, so none of it showed, and gave it a filter of its own that the switch does not reach. The main window's rules come first now, so the art shows, in the strength the switch sets.

**Store**
- In a hub, pointing at a game's discount turned the whole window the accent colour ([#35](https://github.com/Yareli0i/glass-dusk/issues/35), reported by @Kvtg-dotcom). Steam opens the discount's tip on a layer that covers the window, and puts that layer inside the price block, where the theme took it for one of the price's chips and painted it. Only the chips themselves are painted now.
- Valve's hardware pages (Steam Machine, Steam Frame, Steam Controller) had black text on the theme's dark ground ([#33](https://github.com/Yareli0i/glass-dusk/issues/33), reported by @junkFOx-x). They are light pages of their own. The theme now leaves them, the Steam Deck page and About Steam as Steam draws them, as the README already said it would.

## 1.7.12 — 2026-11-03

**Client**
- Drop-downs: the text and the arrow no longer stick out of the field's rounded corners. A collection's sort drop-down is a pill, like a shelf's.
- The like buttons under a post, the zoom button on a screenshot and the buttons of an alert at the window's foot have rounded corners.

**Store**
- Wishlist and the newer pages: a plain discount was a green square on the plate of a double one. Both are the same chip in the accent colour now.
- Front page: the capsule in the middle of the main carousel has rounded corners.
- Reviews: a filter under the pointer stays dark, and the thumb of a negative review keeps inside its rounded head.

## 1.7.11 — 2026-11-03

**Store**
- Reviews: the date, the text of a long review and the "found this helpful" lines each sat on a plate with no room inside. They had been taken for the reviewer's PC specs ([#33](https://github.com/Yareli0i/glass-dusk/issues/33), reported by @Veterian).

## 1.7.10 — 2026-11-03

**Settings**
- *Wallet balance*: Look → Wallet balance → Blur until hover hides the balance in the top bar until you point at it ([#34](https://github.com/Yareli0i/glass-dusk/issues/34), suggested by @junkFOx-x).

**Library**
- A game's banner was cut off at the bottom and read as off-centre: Steam had put a height limit on it that the theme no longer lifted ([#33](https://github.com/Yareli0i/glass-dusk/issues/33), reported by @Veterian).
- Menus: the item whose submenu is open was a white bar with its text gone (#33).
- Downloads: the glass had a gap on one side only (#33).
- A shelf's grip sat low on its bar (#33, reported by @Scrapper1824).
- The card over an item in *Available Content* is readable now, in Steam's own face (#33).

**Store**
- The tags under the *Because You Played* cards were grey (#33).

## 1.7.9 — 2026-11-01

**Library**
- Downloads: a row you dragged hung well below the cursor ([#33](https://github.com/Yareli0i/glass-dusk/issues/33), reported by @Scrapper1824). The glass over the page moved the point the row is placed from. The row in hand and the places it can land are in the theme now too.
- Small Mode (View → Small Mode) is in the theme: it kept Steam's grey ground and gradients (#33).
- Downloads: the block with the graph was a square of Steam's navy inside the rounded glass, and it stopped short of the edge on one side (#33, reported by @Veterian).
- The game list's search field had two plates, one over the other, with their corners showing. The filter button lost its square under the pointer, and a shelf's sort drop-down the grey behind its arrow (#33).
- Friends' names are in the colours of their status again: the theme had them all white. Your own avatar glows in yours, and the rule over the online friends is no longer Steam's blue (#33).
- The friends shown beside a game in the list sat in a square grey box (#33).
- The lists in *Add Non-Steam Game*, *Players* and *Game Servers* were Steam's grey (#33).
- The window that asks how to launch a game is solid now, like the *Starting game* window, instead of letting the desktop through (#33).
- Tips everywhere were dark text on Steam's pale grey; they are on the theme's dark ground (#33).
- Web pages: the address pill sat against the top of its strip (#33).

## 1.7.8 — 2026-10-30

**Store**
- Wishlist: with an extension that adds to the rows, such as Allkeyshop's prices, the footer lay over the last games, see-through, its text on theirs (from Discord). Steam works out the list's height from a fixed row height. The footer now moves down past the last game whenever the rows run longer than that.

## 1.7.7 — 2026-10-30

**Library**
- In a narrow window *Achievements* dropped off the play bar as soon as a game started, and came back a good while after it closed ([#31](https://github.com/Yareli0i/glass-dusk/issues/31), reported by @Samet-Yilmazz). The bar shows one row of stats and hides what does not fit, and the controller button that comes with a running game took the last of the room. The stats now close up when room is short, and *Cloud Status* is the first to go.
- Opening *Library Filters* left a grey bar on the search field ([#32](https://github.com/Yareli0i/glass-dusk/issues/32), reported by @Scrapper1824). It came in with 1.7.4.
- A shelf's heading: the text had no room inside its drop-down, the sort one kept a grey square inside the pill, the grip sat off the middle of its bar, and the arrows filled their buttons (#32).
- The lists drop-downs open, such as the one that picks a shelf, were in Steam's grey (#32).

**Store**
- A piece of news in its window: the votes, comments and share buttons at its foot were Steam's, and so were the close and previous / next buttons beside it (#32).
- One game's news: the panel at the left, the band at the top and the first day's heading read as one piece, round on the outside and square where they meet (#32).

## 1.7.6 — 2026-10-30

**Theme language**
- Français, translated by @ImWarzox: Look → Theme language → Français puts the library home's header, the Big Picture chip and the dates in French.

**Library**
- The *Recent Games* shelf: the big card's *Play* button covered the start of *TIME PLAYED*, which Steam sets further left than the lines under it ([#24](https://github.com/Yareli0i/glass-dusk/issues/24), reported by @Scrapper1824). The heading lines up with them now, and the button on a capsule is the theme's own *Play*, round and in the accent, instead of Steam's green square.
- The rest of that shelf is in the theme too. Its big card is laid out like the home's *Continue* card: the game's hero across the whole card, its logo at the top left, the time played on the dark at its foot. A game with no hero or logo keeps Steam's picture over a dark glass footer. The dates over each group take the theme's small heading, and *New to library* is a dark tab with the accent instead of Steam's blue slab.
- A game's activity: the news cards had a square hairline around their rounded corners, Steam's own frame showing past them (#24).
- The *+2* after the friends who play a game, under its capsule, was a square grey tile (#24).
- Notifications: every row but the pinned ones sat on a square grey slab, lighter while unread (#24).

**Store**
- In the search box's suggestions, *On Wishlist* and *In Library* were black on the theme's dark chip, both the icon and the words that open on hover ([#29](https://github.com/Yareli0i/glass-dusk/issues/29), reported by @FenrirM70).
- The reviews line in the preview beside *New & Trending* touched the edges of its plate (#24).
- One game's news (*Steam News* and the like): the band with the game across the top was Steam's grey, and so was a piece of news opened in its window (#24).

**Big Picture**
- The top bar: an item under the pointer sat on a grey square, and the one the controller is on on a white square with black icons. Both are rounded now, the controller's in the accent (#24).
- The status beside your round avatar was a square bar down its side; it is a dot at its foot.

## 1.7.5 — 2026-10-29

**Accent**
- Opening another game, the *Play* button changed colour twice: it kept the last game's colour, went to the colour of the game on the library home, and only then to its own ([#27](https://github.com/Yareli0i/glass-dusk/issues/27), reported by @Takeshi06). Between two pages the old one is gone a moment before the new one's art is in, and the theme filled that gap with the home's art. It now goes by the game the page is for, and remembers each game's colour, so a game you have opened before comes up in its colour straight away, and a new one turns over once, as its art comes in.
- The *Accent* from the Colors tab stopped coming back once the library had been open: the store and the other web pages went on wearing the last game's colour until Steam was restarted (from Discord). Steam now keeps the library in the window, hidden, while a web page is shown, and the theme took it for the page on screen.
- Game art with no colour in it, black and white, gave Steam's blue. It leaves the Colors tab's *Accent* on instead.

## 1.7.4 — 2026-10-29

**Game list**
- The edge of the list you could drag to change its width was not the edge you could see: Steam's grip sat in the gap beside the list's glass. It now reaches over the glass edge, with the list on either side ([#26](https://github.com/Yareli0i/glass-dusk/issues/26), reported by @PlzCarryMe).
- *Library Filters* opened over the list itself, the very games it filters. It opens beside the list now, level with the search row, so the list stays in view while you pick ([#24](https://github.com/Yareli0i/glass-dusk/issues/24), reported by @Scrapper1824). Its headings and the chips of picked tags and friends lost Steam's blue, and the button no longer grows a grey tab while the panel is open.

**Library**
- On a game's page, the tab under the pointer (*Discussions*, *Guides*…) showed a square grey box inside its pill.
- Properties: the bar beside the chosen beta branch, the radio buttons, and the size and drive under *Installed Files* were Steam's blue.
- The dialog that asks how to launch a game with several ways to start is in the theme: rows on glass, the accent on *Play* (#24).

**Millennium**
- Millennium's own settings (Steam → Millennium) sat in Steam's grey with a blue title. They are on the theme's glass now, like the library, with the page you are on in the accent (#24).

**Store**
- On the front page, the preview beside *New & Trending*, *Top Sellers* and the rest went away whenever the game list came out beside the store (#26): the store drops it once the page is 910 px wide or less, and with the list out the page often is. It now stays down to 760 px.
- News Hub: the section you are on was marked in Steam's blue (#24).

**Big Picture**
- Once the home was scrolled, a grey band lay under the top bar and the tabs: Steam's own wide blur over the art. It is smoked glass now, and Big Picture no longer blurs the whole width on every frame there (#24).
- The hours chip of the focused game could land beside a section heading halfway down the home, since Steam now calls those headings *Header* too. It keeps to the top bar (#24).

**Sign-in**
- With four accounts or more, *Who's playing?* looked cramped: Steam shrank the accounts to fit while the *Add Account* tile stayed full size. The card now takes the window's width and the tiles close up, so four accounts keep full-size tiles, and *Add Account* always matches them (from Discord).

## 1.7.3 — 2026-10-28

**Library**
- On the page of a game with every achievement unlocked, the ribbon covered *You've unlocked all achievements* and the bar under it ([#25](https://github.com/Yareli0i/glass-dusk/issues/25), reported by @aalhelou). The slip is Steam's own, and it shows without the theme too: Steam leaves room on the left for the ribbon, then a later rule of its own takes that room away. The theme gives it back and fits the ribbon inside the slab.

**Store**
- On a game's page, pointing at the head of a review (its thumb and hours, most often in the narrow *Recently Posted* column) turned the whole window one colour, the one of the accent, until the pointer moved on ([#23](https://github.com/Yareli0i/glass-dusk/issues/23), reported by @Kvtg-dotcom). Steam shows its *Read full review* tip there on a layer that covers the window, and the theme took that layer for the thumb and painted it. It tells them apart now.

## 1.7.2 — 2026-10-26

**Library**
- *Your Collections* sat on Steam's slate gradient instead of the theme's glass ([#21](https://github.com/Yareli0i/glass-dusk/issues/21), reported by @timinside).

**Address bar**
- Once you had copied a page's address from the address bar, its *Copied!* tip stayed on screen and turned up again over whatever you did next ([#22](https://github.com/Yareli0i/glass-dusk/issues/22), reported by @timinside). The cause is Millennium's reclass, which the theme needs: it gives every name in Steam's style maps a readable second name, and Steam takes the tip down only when its animation ends under the name it expects, which no longer matched. The theme puts that one name back.

## 1.7.1 — 2026-10-24

**In-game overlay**
- A clock or timer pinned over the game sat in a dark box of glass. Pinned and left on screen once the overlay closes, Steam drops the ground of these panels (the clock and timer, notes, achievements, the timeline, a browser) so the game shows round them; *Overlay panels → Glass* put it back. It keeps out of them now ([#20](https://github.com/Yareli0i/glass-dusk/issues/20), reported by @timinside).

## 1.7.0 — 2026-10-24

**Store**
- The whole store is in the theme now, not only the front page, a game's page and search. Hubs (every category, tag and genre page, Specials, Demos and the rest), the store menu with its flyouts and the search panel, the wishlist, the cart, the charts, the personal calendar, the recommender, the older list pages (New Releases, Upcoming, curators, Popular Tags, developer and publisher pages, the Discovery Queue page, Community Recommendations, Labs), the Points Shop and the News Hub sit on the same dark glass, with the same buttons, chips and cards.
- Your account's pages on the store are restyled too: account details, store preferences, languages, ignored products, purchase history, licences, product activation, devices, cookies, family, notification settings and playtests.
- Links and the rest of Steam's blue text follow the accent colour.
- A game's page: the media strip, system requirements, *Read more*, awards, the new reviews section and the right column lost the last of Steam's blue and grey.
- In the lists under the front page's tabs, the name of the row under the pointer turned dark on dark. It stays readable now.
- What Steam added or redrew lately is in too: the front page's *Top New Releases* (it sat in a teal frame), a piece of news opened on its own (a grey page in the middle of the News Hub), the curators the News Hub suggests, the month's top releases on the charts (the *Silver* group was a pale slab), event pages with light art of their own such as *Cooking Fest* (the trailers, the list of games and its filters had no ground, so the text could not be read), *Show more* under a shelf, and a bundle's discount, cost and savings, which stayed in Steam's lime and blue. Since then Steam rebuilt the cart on its newer components, which left its buttons in Steam's blue again, and put an *Explore Your Discovery Queue* band in purple and blue on every hub: both are in the theme now.
- Left as Steam draws them, on purpose: the price and *Add to Cart* blocks, the landing pages (About Steam, Steam Deck and hardware) and the art of sale events, which come with art of their own.

**Speed**
- The wishlist no longer stutters. Under the theme its scrolling ran at less than half the frame rate it has without it, and the pointer lagged by up to a third of a second. Rules that only one kind of page needs (the front page's blocks, the calendar, the charts, the recommender, your account, the cart, a game's reviews, the Points Shop, the News Hub, parts of the hubs) now load on that page alone, and the rest keep away from the selectors that made every page pay for them. It now scrolls nearly as smoothly as without the theme; what stutter is left is Steam's own.
- The store's front page, search and a game's page lost their stutter too. While a page scrolls, Steam has the browser restyle the whole page now and then, and every rule loaded counted, including the client's own two style sheets (menus, chat, plugins), which Millennium loads into web pages as well and which do nothing there: they are switched off on web pages now. The front page went from 24 long frames in five seconds of scrolling to 2, as without the theme, and search from 9 to none.
- On a game's page the reviews are styled by marks the theme puts on them, not by their shape: scrolling Cyberpunk 2077's page, with its thousands of reviews, went from 25-28 long frames in five seconds to 4-7, and a smaller game's page scrolls as it does without the theme.

## 1.6.14 — 2026-10-20

**Sign-in**
- *Sign-in screen* has another new choice, *Slideshow*, which is what was asked for on Discord: the art of one of your games after another fills the window behind the chooser and the signing-in screen, each fading into the next every three seconds or so while it slowly comes closer, and the colour follows the picture. It takes the 24 games you played last.
## 1.6.13 — 2026-10-20

**Sign-in**
- *Sign-in screen* has a new choice, *Your games* (asked for on Discord): the covers of your own games drift past behind the chooser and the signing-in screen, in rows on a tilted plane, each at its own pace and every other one the other way, like Steam's own wall made of your library. The games played last come first, up to 120 of them; the colour stays the last game's.
## 1.6.12 — 2026-10-20

**Game list**
- *Store: game list* keeps to the client's web pages ([#19](https://github.com/Yareli0i/glass-dusk/issues/19), reported by @PlzCarryMe). Millennium's settings page is drawn by the client itself and does not make room for the list, so the list covered its right side, with the *Use* buttons and the menu arrows. With *On hover*, pointing at one of those menus brought the list out. The list now stays off such pages, and only the list itself brings it out.
## 1.6.11 — 2026-10-19

**Game list**
- With *Store: game list* on, bits of the last game page opened in the library came through over the store and the other web pages while one was loading: the play bar's *Cloud Status* in a dark box, while Steam synced a game's saves ([#18](https://github.com/Yareli0i/glass-dusk/issues/18), reported by @kofbd). Nothing of the library behind the list is drawn now.
- The *Collections* button beside *Home* is a round button like the sort and filter ones under it, with its four squares in the theme's ink, and it takes the accent while the Collections page is open (asked about on Discord). Steam drew it as grey squares on two grounds at once, pressed into the corner of the list's glass.
## 1.6.10 — 2026-10-18

**Sign-in**
- The account chooser Steam shows when it starts (*Who's playing?*), and the signing-in screen after it, are in the theme ([#17](https://github.com/Yareli0i/glass-dusk/issues/17), asked for by @kofbd). New switch *Sign-in screen*: the art of the game you played last with its colour (by default; plain dusk until there is a game to take it from), plain dusk, or Steam's wall of covers dimmed, each with the chooser on a card of glass, rounded avatars and the spinner in the theme's colour. *Steam* leaves both as Steam draws them.

**Game list**
- Your game list can stay beside the store and the other web pages of the client ([#17](https://github.com/Yareli0i/glass-dusk/issues/17), asked for by @kofbd). New switch *Store: game list*: *Pinned* keeps Steam's own list there, with its collections, search and filters; *On hover* leaves a strip at the window's edge and the list comes out when you point at it; *Rail* shows your last games' covers, and a button opens the full list (the theme remembers which). The page narrows beside the list. Off by default.
- When Steam starts on the store, the library is shown for a moment so the list is there, and the store page loads once more after it, as it does whenever you switch from the library to the store.
## 1.6.9 — 2026-10-18

**Library home**
- The header's numbers count games added from outside Steam too (reported on Discord): *Games*, and the hours, the hours of two weeks and the games played when a plugin such as Non-Steam Playtimes keeps their time. Without one, Steam keeps no hours for them, so such a game adds to *Games*, and once it has been run it no longer counts as unplayed.

## 1.6.8 — 2026-10-18

**Game page**
- The collections a game is in show at the top right of its art again, as Steam draws them, now as glass pills ([#16](https://github.com/Yareli0i/glass-dusk/issues/16), asked for by @YuujiNana). The theme had hidden them. A click opens the collection. New switch *Game page: collection tags*, on by default.

## 1.6.7 — 2026-10-17

**Library home**
- Games added to Steam from outside it (non-Steam games) turn up on the *Continue* card and in the recently played row like any other game (asked for on Discord). With custom art, from SteamGridDB for example, they get their hero, logo and cover; without it, the card shows the name. Steam counts no playtime for them, so the card says only when the game was last played.
- A date from an earlier year comes with its year: on the *Continue* card and under the covers of the recently played row "Oct 12" could have been any October, and with *Home games → Whole library* the home shows games last played years ago.

**Library**
- Game covers on a collection's page and on Steam's shelves are rounded like the rest of the theme, and follow the *Corners* setting (asked for on Discord).
- The action row at the top of a game's menu wears the accent whatever it says. Only *Play* did; *Install*, *Update*, *Download*, *Stop* and the rest stayed in Steam's blue, *Launch* in its green.

**Big Picture**
- The hours chip says nothing about playtime for a non-Steam game, where it said "0 h", and a game last played long ago is "3 months ago" or "2 years ago" there instead of "843 days ago".

## 1.6.6 — 2026-10-16

**Game list**
- The *Library Filters* panel, behind the button next to the list's search, could not be used ([#15](https://github.com/Yareli0i/glass-dusk/issues/15), reported by @Beastmodplayer). Steam opens it to the right of the button, which with the list on the right is past the edge of the window, and with the list on the left the list's glass cut it off. It now opens towards the middle of the window, above the game page, on a solid ground so the list doesn't read through it.

## 1.6.5 — 2026-10-15

**Game page**
- *Adjust Logo Position* (right click on the art): Steam's *Done* button sat in the bottom right corner of the art, which fades out in this theme, and with HLTB for Steam installed its box covered the button, so a click went to HLTB's *View details* instead (reported on Discord by Eng.REVY). While the logo is being placed, *Done* sits in the top right corner now, above any plugin. The same goes for the *Done* of the Custom Logo Position plugin.

## 1.6.4 — 2026-10-14

**Library home**
- Hidden games no longer turn up on the *Continue* card or in the recently played row ([#13](https://github.com/Yareli0i/glass-dusk/pull/13), by @JankyMouse).
- The recently played row shows as many covers as fit across it, up to eleven, instead of scrolling sideways ([#13](https://github.com/Yareli0i/glass-dusk/pull/13)).
- Pointing at a cover in that row brings up a card with the game's screenshots, your own first and then the store's, with its name and hours ([#13](https://github.com/Yareli0i/glass-dusk/pull/13), an idea by @JankyMouse). New switch *Recently played: preview*, on by default. The store's screenshots are fetched only when a cover is pointed at.
- New switch *Home games* ([#14](https://github.com/Yareli0i/glass-dusk/issues/14), asked for by @Mystery14): *Continue* and the recently played row can take their games from the whole library instead of only what is installed. A game that is not installed gets *Install* instead of *Play*.
- New switch *Continue card: achievements* puts the game's achievement progress on the card ([#14](https://github.com/Yareli0i/glass-dusk/issues/14)).
- New switch *Add shelf button* hides Steam's *Add shelf* row ([#13](https://github.com/Yareli0i/glass-dusk/pull/13)).

**Game list**
- With the list on the right, where the theme puts it by default, dragging the divider snapped the list to its narrowest ([#13](https://github.com/Yareli0i/glass-dusk/pull/13), found by @JankyMouse). The list follows the pointer now, and its width is still Steam's own setting.

## 1.6.3 — 2026-10-11

**Library home**
- New switch *Recently played shelf* on the *Library* tab ([#12](https://github.com/Yareli0i/glass-dusk/issues/12)): the row of covers under the *Continue* card can be turned off. It is on by default, as before.
- When there was nothing to put in that row (one installed game played so far), its heading stood alone. It is left out now.

## 1.6.2 — 2026-10-10

**Library home**
- The *Continue* card's button said *Play* while its game was starting or already running ([#11](https://github.com/Yareli0i/glass-dusk/issues/11)). It follows the game now, like the button on the game's own page: *Cancel* while Steam is starting it, *Stop* while it runs, and it does what it says.

**Store**
- In a wide window the front page's main carousel showed a pale oval over the previous and next games at its sides ([#10](https://github.com/Yareli0i/glass-dusk/issues/10), reported with its cause by @AlExpler). The arrows there carry no backdrop now, and the neighbouring cards have rounded corners.

## 1.6.1 — 2026-10-10

**Library home**
- With *What's New shelf* switched on, the shelf was still Steam's grey-blue slab from edge to edge ([#9](https://github.com/Yareli0i/glass-dusk/issues/9)). The theme hides that shelf by default and had never styled it. It sits on the home like the theme's own shelf now: the same small heading, rounded pictures, the game's name as a chip.
- A news tile under the pointer gets dark glass and the accent colour instead of Steam's navy and blue, and its menu button is a dark dot instead of a light grey square.
- The shelf's settings window (the gear next to *What's New*) is themed: soft rounded rows, and its switch follows the accent.

## 1.6.0 — 2026-10-10

**Library home**
- You choose the numbers in the header. Each one has its own switch in the theme's settings: *Games*, *Hours played* and *On disk* as before, and three new ones, *Hours, 2 weeks*, *Unplayed* and *Perfect games* (every achievement unlocked). The first three are on by default, so the header looks the same until you touch a switch. With all six on, the row drops under the greeting in a narrow window.
- *Home numbers: second line* puts a small line under each number: games installed, games played, the share of the library never started, average completion, drives in use.
- *Perfect games* is kept right. Steam's own record of achievements goes stale: a game that got new achievements with a DLC went on counting as perfect for a month. While the number is on, the theme has Steam renew that record for a game played since it was last checked, and for every played game once a day.
- The *Continue* card shows the hours of the last two weeks next to the total, when the two differ.

## 1.5.5 — 2026-10-10

**Library**
- The filter menu above the game list (*Games*, *Software*, *Tools*, *Group by…*) had no background at all, so the list read through it. It has the same glass as the other menus now.

## 1.5.4 — 2026-10-09

**News window**
- The window that opens from *What's New* or *View Latest News* was left as Steam draws it: a grey slab with a white glow in its header and footer, and square grey buttons beside it ([#6](https://github.com/Yareli0i/glass-dusk/issues/6)). It is a dark card in the theme's colours now. The buttons beside it are round, and *Rate Up*, *Discuss* and *Share* are pills.

**Game page**
- The page's text showed through the bar that sticks to the top while scrolling ([#7](https://github.com/Yareli0i/glass-dusk/issues/7)). The bar is opaque now.
- A plugin that adds a button next to the gear got it stacked above the gear, and the sticky bar grew to two rows. The buttons sit side by side.

## 1.5.3 — 2026-10-07

**Library home**
- For newer games the *Continue* card came up blank, with the game's name as plain text instead of its logo ([#5](https://github.com/Yareli0i/glass-dusk/issues/5)). These games keep their library art in hashed folders and have nothing at the old fixed address, neither in Steam's cache nor on the CDN, and the fixed address was the only place the theme looked. It asks Steam where the game's hero and logo are now.
- The window background on the library home missed the same games, and the accent colour with it. Both come from the hero, so both are back.

## 1.5.2 — 2026-10-07

**Game page**
- The play bar's button was themed only as *Play*. *Install*, *Update*, *Stop* and *Cancel* kept Steam's blue slab with square corners ([#2](https://github.com/Yareli0i/glass-dusk/issues/2)). Every state is the same pill now, in the page's strip and in the one that sticks to the top. *Install* and *Update* take the game's colour like *Play*; *Stop* and *Cancel* are quiet, so a running game does not look like one waiting to be played.

**Friends list**
- In a narrow window the search looked like a wide empty field that ran into the requests button ([#3](https://github.com/Yareli0i/glass-dusk/issues/3)). The theme was painting the whole strip the search slides into. The search is a magnifier until it is opened, as in Steam, and the opened field is themed.
- *Got it!* on the quick-access box was a pill sticking out over the dashed frame. It is a corner tab of the box now.
- In a game that reports what you are doing, the header shows three lines, and the game's name overlapped yours. Steam draws it that way without the theme too; the theme now gives the lines room.

**Chat**
- Hovering a chat tab lit up a grey box inside it, narrower than the tab. The whole tab is highlighted now.

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
