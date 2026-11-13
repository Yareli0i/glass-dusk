# Glass Dusk screensaver (optional)

A screensaver for Steam's Big Picture in the theme's colours: its dusk, the time and the date, drifting slowly so nothing stands in one place. Experimental: Steam has not published how its screensavers are made, and this one was not tried inside Steam (see *What to know*).

This is not the still. The still (switch *When idle*) belongs to the desktop client, shows the art of the game in view and needs nothing installed. This is a separate page for the screensaver Steam itself runs in Big Picture, added to Steam in October 2026.

## Install

The theme never puts anything into Steam by itself, so this is by hand.

1. Copy the folder `glass-dusk` from here into `config\uioverrides\screensavers\` inside your Steam folder, creating the folders that are missing. On Windows that is usually `C:\Program Files (x86)\Steam\config\uioverrides\screensavers\glass-dusk\`, on Linux `~/.steam/root/config/uioverrides/screensavers/glass-dusk/`.
2. Open Big Picture → Settings → Customization → Screensaver and choose it under *Current Screensaver*. *Test your screensaver selection* shows it at once.

To remove it, choose another screensaver and delete the folder.

## What to know

- **What is known, from the client's own code (November 2026).** Steam asks one of its services for the screensavers on the machine; each has an id and an address. Its own are `steam-gameslideshow` and `steam-bouncinglogo`, and one of yours has an id that begins `uioverride-`, the rest of it being the name shown in the list. Steam opens `https://<address>/index.html` in a browser view of its own, takes no input there, and ends the screensaver on the first input. This page is built like the one Steam ships (`steamui\screensavers\bouncinglogo`: an `index.html` with its style sheet and script).
- **What is not.** That the folder above is where Steam looks comes from press reports of the October 2026 client, not from Valve. The theme never writes into your Steam folder, and nobody has yet copied this page there and chosen it: whether it shows in the list, and how it looks on a television, is untested. If a client update changes where such pages go, it will simply not be listed.
- **No game art.** Each screensaver is served from an address of its own (the built-in one from `steam-bouncinglogo.steamscreensavers.host`), apart from the client's own pages. A page there cannot read what the theme keeps in the client's storage, so it does not know the game you had in view: it shows the dusk, the time and the date. The script still looks for the theme's picture and colours, which costs nothing, and would use them if Steam ever served it alongside the client.
- It asks nothing of the network and writes nothing.
