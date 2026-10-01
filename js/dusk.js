/* ╔══════════════════════════════════════════════════════════════════════════╗
   ║  Glass Dusk — runtime                                                    ║
   ║                                                                          ║
   ║  The open game's art is the client's background and the source of its     ║
   ║  accent; on the library home that is the game you played last. The main   ║
   ║  window publishes both to localStorage, so every other window Steam opens ║
   ║  (menus, notifications, friends, settings) wears the same colour.         ║
   ║                                                                          ║
   ║  Library data comes from the client's own store (window.opener.appStore). ║
   ╚══════════════════════════════════════════════════════════════════════════╝ */
(() => {
  if (window.__glassDusk) return;
  const HOUSE = '#5e90e4';
  const root = document.documentElement;
  // The in-game overlay's desktop window is titled "SP Overlay: <pid>/…" and carries the
  // same body class as the main window, so it has to be told apart by title.
  const isOverlay = /^(SP|Steam) Overlay/i.test(document.title || '');
  // Big Picture (and the other gamepad windows — on-screen keyboard, controller layout)
  // carry SteamUIPopupWindowBody as well. Taken for the main window, they cleared the
  // accent every other window follows, so they get their own branch.
  const bodyClass = document.body ? document.body.className : '';
  const isGamepad = !isOverlay && (/GamepadUIPopupWindowBody/.test(bodyClass) || /Big Picture/.test(document.title || ''));
  const isMain = !isOverlay && !isGamepad && (/SteamUIPopupWindowBody/.test(bodyClass) ||
    /^Steam$/.test(document.title));
  const state = window.__glassDusk = { art: null, accent: HOUSE, home: 0, main: isMain };

  const shared = () => {
    try { return window.opener && window.opener.appStore ? window.opener : null; } catch (e) { return null; }
  };

  /* ═════════════ picking a colour out of the art ═════════════ */

  const rgb2hsv = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
    let h = 0;
    if (d) h = mx === r ? ((g - b) / d + (g < b ? 6 : 0)) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return [h / 6, mx ? d / mx : 0, mx];
  };
  const hsl2rgb = (h, s, l) => {
    const k = n => (n + h * 12) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [f(0) * 255, f(8) * 255, f(4) * 255];
  };
  const hex = v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0');

  const accentFrom = img => {
    const c = document.createElement('canvas');
    c.width = 96; c.height = 31;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, c.width, c.height);
    let data;
    try { data = ctx.getImageData(0, 0, c.width, c.height).data; } catch (e) { return null; }

    const buckets = {};
    for (let i = 0; i < data.length; i += 4) {
      const [h, s, v] = rgb2hsv(data[i], data[i + 1], data[i + 2]);
      if (s < 0.28 || v < 0.28) continue;
      const w = s * s * v, k = Math.floor(h * 18) % 18;
      const acc = buckets[k] || (buckets[k] = [0, 0, 0, 0]);
      acc[0] += data[i] * w; acc[1] += data[i + 1] * w; acc[2] += data[i + 2] * w; acc[3] += w;
    }
    const best = Object.values(buckets).sort((a, b) => b[3] - a[3])[0];
    if (!best) return null;

    // keep the art's hue, hold saturation and lightness in a band that reads on dark glass
    const [h, s] = rgb2hsv(best[0] / best[3], best[1] / best[3], best[2] / best[3]);
    const rgb = hsl2rgb(h, Math.min(Math.max(s, 0.42), 0.68), 0.56);
    const lum = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
    return { accent: '#' + rgb.map(hex).join(''), ink: lum > 0.62 ? '#10131a' : '#ffffff' };
  };

  /* ═════════════ the art layer, in every window ═════════════ */

  const layer = document.createElement('div');
  layer.id = 'gd-art';
  const mountLayer = () => {
    if (document.body && !layer.isConnected) document.body.insertBefore(layer, document.body.firstChild);
  };

  // switch «Accent colour → Fixed» (css/options/accent-fixed.css): the art stops
  // recolouring anything and --gd-accent stays whatever the Colors tab says
  const accentLocked = () => getComputedStyle(root).getPropertyValue('--gd-accent-lock').trim() === '1';

  const paint = (src, accent, ink) => {
    if (src) {
      layer.style.backgroundImage = `url("${src}")`;
      layer.classList.add('on');
    } else {
      layer.classList.remove('on');
    }
    if (accent && !accentLocked()) {
      root.style.setProperty('--gd-accent', accent);
      root.style.setProperty('--gd-accent-ink', ink || '#fff');
    } else {
      root.style.removeProperty('--gd-accent');
      root.style.removeProperty('--gd-accent-ink');
    }
  };

  /* ── web pages: the store gets its app's art; community and profiles are left alone ── */

  // Profiles carry their owners' own backgrounds and themes, and the community's old
  // markup read worse half-restyled than untouched — so nothing here runs on them.
  if (/(^|\.)steamcommunity\.com$/.test(location.hostname)) return;
  const webHost = /(^|\.)steampowered\.com$/.test(location.hostname);
  if (webHost) {
    // css/webkit.css reaches every web page (Steam-WebKit); its rules wait for this class.
    // A URL patch was tried and missed pages that redirect (/wishlist/ → /wishlist/id/…,
    // /replay/ → /replay/<id>/…). Checkout, help and login pages stay Steam's own.
    if (location.hostname === 'store.steampowered.com') root.classList.add('gd-store');
    const appid = (location.pathname.match(/\/app\/(\d+)/) || [])[1];
    if (appid) {
      const url = `https://shared.steamstatic.com/store_item_assets/steam/apps/${appid}/library_hero.jpg`;
      root.style.setProperty('--gd-art', `url("${url}")`);
      const flag = () => document.body && document.body.classList.add('gd-art');
      if (document.body) flag(); else addEventListener('DOMContentLoaded', flag);
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const picked = accentFrom(img);
        if (picked && !accentLocked()) {
          root.style.setProperty('--gd-accent', picked.accent);
          root.style.setProperty('--gd-accent-ink', picked.ink);
        }
      };
      img.src = url;
    }
    return;
  }

  /* ── the game being played: its colour for the overlay and its panels ── */

  // In the overlay the accent should belong to the game on screen, not to whatever page
  // the client window showed last. Its hero (custom art first) goes through accentFrom
  // once per game; `done` gets the pick, later calls get it from the cache.
  const runningAccent = done => {
    let o = null;
    try { o = window.opener; } catch (e) { return; }
    const id = o && o.SteamUIStore && o.SteamUIStore.MainRunningAppID;
    if (!id) return;
    if (runningAccent.id === id) { if (runningAccent.picked) done(runningAccent.picked); return; }
    runningAccent.id = id;
    runningAccent.picked = null;
    let urls = [`/assets/${id}/library_hero.jpg`];
    try {
      const app = o.appStore.GetAppOverviewByAppID(id);
      if (app && app.rt_custom_image_mtime) {
        const custom = o.appStore.GetCustomHeroImageURLs(app);
        urls = [...(Array.isArray(custom) ? custom : [custom]).filter(Boolean), ...urls];
      }
    } catch (e) { /* no custom art, the cached hero will do */ }
    const attempt = i => {
      if (i >= urls.length) return;
      const img = new Image();
      img.onload = () => {
        const picked = accentFrom(img);
        if (!picked) { attempt(i + 1); return; }
        runningAccent.picked = picked;
        done(picked);
      };
      img.onerror = () => attempt(i + 1);
      img.src = new URL(urls[i], location.href).href;
    };
    attempt(0);
  };
  const storedAccent = () => {
    try { return [localStorage.getItem('gd-accent'), localStorage.getItem('gd-accent-ink')]; } catch (e) { return [null, null]; }
  };

  /* ── in-game overlay: the game has to show through ── */

  // The art layer would lie between the game and the overlay as a grey sheet, on top of
  // Steam's own backdrop (black 67→93 % plus a 300 px inset shadow). So the overlay gets
  // no art layer, and css/overlay.css thins the backdrop. That file names the backdrop by
  // its current hash; after a client update the lookup below finds the new one in the
  // overlay's own CSS module.
  if (isOverlay) {
    root.classList.add('gd-overlay');
    const mapBackdrop = () => {
      if (document.getElementById('gd-overlay-map')) return true;
      if (!document.head) return false;
      let mod = null;
      for (const host of [window, window.opener]) {
        try {
          const api = host && host.MILLENNIUM_API;
          mod = api && api.findModule && api.findModule(m => m && m.Wrapper && m.PreviewPinnedView && m.ToolbarContainer);
        } catch (e) { /* no access from this window */ }
        if (mod) break;
      }
      if (!mod) return false;
      const style = document.createElement('style');
      style.id = 'gd-overlay-map';
      style.textContent = `.${mod.Wrapper}{background:var(--gd-overlay-backdrop)!important;box-shadow:var(--gd-overlay-shadow)!important}`;
      document.head.appendChild(style);
      return true;
    };
    const follow = () => {
      layer.remove();
      const picked = runningAccent.picked;
      const [accent, ink] = picked ? [picked.accent, picked.ink] : storedAccent();
      paint(null, accent, ink);
    };
    let tries = 0;
    const timer = setInterval(() => { if (mapBackdrop() || ++tries > 30) clearInterval(timer); }, 1000);
    addEventListener('storage', follow);
    if (document.body) follow(); else addEventListener('DOMContentLoaded', follow);
    mapBackdrop();
    // the client store can still be filling in when the overlay starts, so ask again a few times
    let asks = 0;
    const ask = setInterval(() => { runningAccent(follow); if (runningAccent.picked || ++asks > 20) clearInterval(ask); }, 3000);
    runningAccent(follow);
    return;
  }

  /* ── windows other than the main one just follow what it published ── */

  if (!isMain && !isGamepad) {
    const follow = () => {
      // overlay panels (OverlayPopupBody): the recording timeline is see-through and spans
      // the screen, so an art layer there would grey out the game — accent only
      const overlayPanel = document.body && document.body.classList.contains('OverlayPopupBody');
      if (overlayPanel) {
        // a panel over the game wears the game's colour, like the overlay itself
        layer.remove();
        runningAccent(() => {});
        const picked = runningAccent.picked;
        const [accent, ink] = picked ? [picked.accent, picked.ink] : storedAccent();
        paint(null, accent, ink);
        return;
      }
      mountLayer();
      try {
        paint(localStorage.getItem('gd-art'), localStorage.getItem('gd-accent'), localStorage.getItem('gd-accent-ink'));
      } catch (e) { /* storage can be unavailable in some popups */ }
    };
    addEventListener('storage', follow);
    setInterval(follow, 1500);
    if (document.body) follow(); else addEventListener('DOMContentLoaded', follow);
    return;
  }

  const publish = (src, accent, ink) => {
    try {
      if (src) localStorage.setItem('gd-art', src); else localStorage.removeItem('gd-art');
      if (accent) { localStorage.setItem('gd-accent', accent); localStorage.setItem('gd-accent-ink', ink || '#fff'); }
      else { localStorage.removeItem('gd-accent'); localStorage.removeItem('gd-accent-ink'); }
    } catch (e) { /* nothing to share with, fine */ }
  };

  // Every picture comes as a list of candidates: your custom art first, then the
  // client's own cache, then the CDN. A missing custom file still answers 200
  // with a small HTML stub, so the only honest test is whether the image decodes
  // — which is exactly how the library itself picks its art.
  const applyArt = list => {
    const urls = (Array.isArray(list) ? list : [list]).filter(Boolean);
    const key = urls.join('|');
    if (key === state.art) return;
    state.art = key;

    const clear = () => {
      paint(null, null);
      state.accent = HOUSE;
      publish(null, null);
    };
    if (!urls.length) { clear(); return; }

    const attempt = i => {
      if (state.art !== key) return;
      if (i >= urls.length) { clear(); return; }
      const src = new URL(urls[i], location.href).href;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        if (state.art !== key) return;
        const picked = accentFrom(img) || { accent: HOUSE, ink: '#fff' };
        state.accent = picked.accent;
        paint(src, picked.accent, picked.ink);
        publish(src, picked.accent, picked.ink);
      };
      img.onerror = () => attempt(i + 1);
      img.src = src;
    };
    attempt(0);
  };

  /* ═════════════ artwork, custom first ═════════════ */

  const CDN = id => `https://shared.steamstatic.com/store_item_assets/steam/apps/${id}`;

  const listFrom = (o, fn, app) => {
    try {
      const v = o.appStore[fn](app);
      return Array.isArray(v) ? v : v ? [v] : [];
    } catch (e) { return []; }
  };

  const artFor = (o, app) => {
    const id = app.appid;
    const custom = fn => (app.rt_custom_image_mtime ? listFrom(o, fn, app) : []);
    return {
      portrait: [...custom('GetCustomVerticalCapsuleURLs'), ...listFrom(o, 'GetCachedVerticalCapsuleURL', app),
        ...listFrom(o, 'GetVerticalCapsuleURLForApp', app), `${CDN(id)}/library_600x900.jpg`],
      hero: [...custom('GetCustomHeroImageURLs'), `/assets/${id}/library_hero.jpg`, `${CDN(id)}/library_hero.jpg`],
      logo: [...custom('GetCustomLogoImageURLs'), `/assets/${id}/logo.png`, `${CDN(id)}/logo.png`],
    };
  };

  // point an <img> at the first candidate that decodes; `none` runs when none does
  const chain = (img, urls, none) => {
    let i = 0;
    const next = () => {
      if (i >= urls.length) { img.onerror = null; if (none) none(); return; }
      img.src = urls[i++];
    };
    img.onerror = next;
    next();
  };

  // The id RunGame wants. Library entries have no m_gameid (undefined), so the Play
  // button passed an empty string and silently did nothing. For a Steam game it is
  // simply the appid.
  const gameIdOf = app => String(app.gameid || app.m_gameid || app.appid || '');

  const esc = s => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  /* ═════════════ which art belongs on screen ═════════════ */

  const KEEP = {};   // "leave the ground as it is for now"

  // The game page's hero, whichever file Steam settled on — custom art included.
  // While Steam is still trying candidates the element is not decoded yet; the
  // ground then stays put instead of flashing to the library's art.
  const heroElement = () => [...document.querySelectorAll('.Header img, .HeaderBackgroundImage img')]
    .find(i => /library_hero\.(jpg|png)|\/customimages\/\d+_hero\./.test(i.src));

  const installedApps = o => o.appStore.allApps.filter(a => {
    try { return a.per_client_data && [...a.per_client_data].some(c => c.installed); } catch (e) { return false; }
  });

  const lastPlayed = o => {
    const apps = installedApps(o);
    const games = apps.filter(a => a.app_type === 1);
    return (games.length ? games : apps)
      .filter(a => a.rt_last_time_played)
      .sort((a, b) => b.rt_last_time_played - a.rt_last_time_played)[0] || null;
  };

  const wantedArt = () => {
    const hero = heroElement();
    if (hero) return hero.complete && hero.naturalWidth > 0 ? [hero.src] : KEEP;   // a game page is open

    const mode = getComputedStyle(root).getPropertyValue('--gd-bg-mode').trim();
    if (mode === 'meadow' || mode === 'plain') return null;   // the options take over

    // Only the library home borrows the last game's art. On the store, community
    // or downloads there is no game in view, so the client stays neutral — that
    // way the window chrome never disagrees with the page inside it.
    if (!document.querySelector('.LeftListSizableContainer')) return null;

    const o = shared();
    const last = o ? lastPlayed(o) : null;
    return last ? artFor(o, last).hero : null;
  };

  /* ═════════════ the home header ═════════════ */

  // switch «Theme language» (css/options/lang-uk.css sets --gd-lang: uk); English by default
  const isUk = () => getComputedStyle(root).getPropertyValue('--gd-lang').trim() === 'uk';
  const locale = () => (isUk() ? 'uk' : 'en');
  const WORDS = {
    uk: { cont: 'Продовжити', recent: 'Нещодавні ігри', play: 'Грати', games: 'Ігор', hours: 'Награно, год',
        disk: 'На дисках, ГБ', today: 'Сьогодні', yday: 'Учора', inGame: 'у грі',
        hello: h => (h < 5 ? 'Доброї ночі,' : h < 12 ? 'Доброго ранку,' : h < 18 ? 'Доброго дня,' : h < 23 ? 'Доброго вечора,' : 'Доброї ночі,') },
    en: { cont: 'Continue', recent: 'Recently played', play: 'Play', games: 'Games', hours: 'Hours played',
        disk: 'On disk, GB', today: 'Today', yday: 'Yesterday', inGame: 'played',
        hello: h => (h < 5 ? 'Good night,' : h < 12 ? 'Good morning,' : h < 18 ? 'Good afternoon,' : h < 23 ? 'Good evening,' : 'Good night,') },
  };
  const W = () => WORDS[locale()];
  const dayShort = { format: d => new Intl.DateTimeFormat(locale(), { day: 'numeric', month: 'short' }).format(d) };
  const clock = { format: d => new Intl.DateTimeFormat(locale(), { hour: '2-digit', minute: '2-digit' }).format(d) };

  const relDay = ts => {
    const d = new Date(ts * 1000), now = new Date();
    const days = Math.round((new Date(now.getFullYear(), now.getMonth(), now.getDate()) -
      new Date(d.getFullYear(), d.getMonth(), d.getDate())) / 864e5);
    if (days === 0) return W().today;
    if (days === 1) return W().yday;
    return dayShort.format(d);
  };
  const hoursOf = min => (min < 60
    ? `${min} ${isUk() ? 'хв' : 'min'}`
    : `${(min / 60).toLocaleString(locale(), { maximumFractionDigits: 1 })} ${isUk() ? 'год' : 'h'}`);

  /* ═════════════ Big Picture: the focused game paints the screen ═════════════ */

  // Switch "Big Picture → Cover" (css/bigpicture.css). Steam keeps the focused game's
  // art behind its home screen; during a move there are two images — the incoming one
  // first, the outgoing one marked OffScreen. Reading the last one showed the game just
  // left, so the chip and the colour were always one step behind.
  //
  // That art is blurred here ONCE per game into a small canvas and stretched over the
  // screen; two canvases cross-fade. A CSS blur on Steam's own images was redone on every
  // frame of its cross-fade: 19 frames over 50 ms per carousel run, 0 without it. The image
  // is fetched, decoded and scaled down off the main thread before it is touched (drawing
  // the full hero stalled frames too), and fast scrolling skips the games in between.
  // The chip is plain DOM, so the gamepad never lands on it: it only tells.
  if (isGamepad) {
    const enabled = () => getComputedStyle(root).getPropertyValue('--gd-bpm').trim() === 'cover';

    const bgImage = () => [...document.querySelectorAll('.BasicHome .RecentGamesBackgroundImage')]
      .find(i => !i.classList.contains('OffScreen')) || null;

    // the background component knows its game (props.appid a few fibers up); custom and
    // cached URLs carry it too
    const appOf = img => {
      const key = Object.keys(img).find(k => k.startsWith('__reactFiber'));
      for (let f = key && img[key], i = 0; f && i < 8; f = f.return, i++) {
        const p = f.memoizedProps;
        if (p && typeof p.appid === 'number') return p.appid;
      }
      const m = (img.src || '').match(/\/(?:customimages|assets)\/(\d+)/);
      return m ? Number(m[1]) : null;
    };

    const ago = ts => {
      if (!ts) return isUk() ? 'ще не запускав' : 'never played';
      const m = Math.max(0, Math.round((Date.now() / 1000 - ts) / 60));
      if (m < 60) return isUk() ? `${m} хв тому` : `${m} min ago`;
      if (m < 1440) return isUk() ? `${Math.round(m / 60)} год тому` : `${Math.round(m / 60)} h ago`;
      const d = Math.round(m / 1440);
      if (d === 1) return W().yday.toLowerCase();
      return isUk() ? `${d} дн. тому` : `${d} days ago`;
    };
    const hours = min => (min < 60 ? `${min} ${isUk() ? 'хв' : 'min'}`
      : `${(min / 60).toLocaleString(locale(), { maximumFractionDigits: min < 6000 ? 1 : 0 })} ${isUk() ? 'год' : 'h'}`);

    /* the art layer */
    const W = 192, H = 108, PAD = 12;
    const layer = document.createElement('div');
    layer.id = 'gd-bpm-bg';
    const planes = [0, 1].map(() => {
      const c = document.createElement('canvas');
      c.width = W; c.height = H;
      layer.appendChild(c);
      return c;
    });
    let front = -1;
    const paintArt = img => {
      const next = front === 0 ? 1 : 0;
      const ctx = planes[next].getContext('2d');
      ctx.clearRect(0, 0, W, H);
      ctx.filter = 'blur(4px) brightness(.72) saturate(1.5)';
      // cover the screen with a margin past every edge, so the blur does not fade at the border
      const iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
      const r = Math.max((W + PAD * 2) / iw, (H + PAD * 2) / ih);
      const w = iw * r, h = ih * r;
      ctx.drawImage(img, (W - w) / 2, (H - h) / 2, w, h);
      planes[next].classList.add('on');
      if (front >= 0 && front !== next) planes[front].classList.remove('on');
      front = next;
    };

    /* the chip — built once per game, logo or name, never both in turn */
    const chip = document.createElement('div');
    chip.id = 'gd-bpm-chip';
    let chipToken = 0;
    const renderChip = (o, app) => {
      const header = document.querySelector('.BasicHome .Header');
      const mine = ++chipToken;
      if (!header || !app) { chip.remove(); return; }
      const min = app.minutes_playtime_forever || 0;
      const stats = `<span>${min || app.rt_last_time_played ? `<b>${hours(min)}</b> · ` : ''}${ago(app.rt_last_time_played)}</span>`;
      const put = head => {
        if (mine !== chipToken) return;
        chip.textContent = '';
        chip.dataset.app = String(app.appid);
        chip.append(head);
        chip.insertAdjacentHTML('beforeend', stats);
        if (chip.parentElement !== header) header.insertBefore(chip, header.firstChild);
      };
      // the logo too goes through the off-thread shrink: a 3539×1756 custom logo decoded
      // in the header held a frame for ~90 ms
      const urls = artFor(o, app).logo;
      const next = async i => {
        if (i >= urls.length) {
          const name = document.createElement('span');
          name.className = 'gd-name';
          name.textContent = app.display_name;
          put(name);
          return;
        }
        // the CDN refuses fetch() (no CORS), and its official logos are small anyway: a plain <img>
        if (/^https?:/.test(urls[i])) {
          const img = new Image();
          img.alt = '';
          img.onload = () => put(img);
          img.onerror = () => next(i + 1);
          img.src = urls[i];
          return;
        }
        let bmp;
        try { bmp = await cached('logo:' + urls[i], () => shrink(urls[i], { resizeHeight: 40, resizeQuality: 'high' })); }
        catch (e) { next(i + 1); return; }
        const c = document.createElement('canvas');
        c.width = bmp.width; c.height = bmp.height;
        c.getContext('2d').drawImage(bmp, 0, 0);
        put(c);
      };
      next(0);
    };
    const appRecord = (o, id) => {
      try { return o.appStore.GetAppOverviewByAppID(id) || o.appStore.allApps.find(a => a.appid === id) || null; }
      catch (e) { return null; }
    };

    /* one game at a time, after it is decoded */
    let want = null, timer = 0, token = 0, chipApp = null, minute = 0;
    // Fetched and scaled down to 320 px off the main thread. Drawing the full decoded
    // 1920×620 hero into a canvas that is then read back pulled it off the GPU and held
    // a frame for 50–240 ms, right in the middle of Steam's cross-fade.
    // Custom art can be huge (animated PNGs of 10–75 MB here), so each picture is fetched
    // once and kept small: the last 16 of them, 320 px wide.
    const small = new Map();
    const shrink = async (src, opts) => {
      const res = await fetch(src);
      if (!res.ok) throw new Error(String(res.status));
      return createImageBitmap(await res.blob(), opts);   // a 40-byte "missing" stub rejects here
    };
    const remember = (key, bmp) => {
      small.set(key, bmp);
      if (small.size > 16) {
        const [oldKey, oldBmp] = small.entries().next().value;
        small.delete(oldKey);
        oldBmp.close();
      }
      return bmp;
    };
    const cached = async (key, make) => {
      if (small.has(key)) { const b = small.get(key); small.delete(key); small.set(key, b); return b; }
      return remember(key, await make());
    };
    const loadSmall = src => cached(src, () => shrink(src, { resizeWidth: 320, resizeQuality: 'medium' }));
    const apply = async (src, id) => {
      const mine = ++token;
      let img;
      try { img = await loadSmall(src); } catch (e) { return; }
      if (mine !== token || !enabled()) return;
      paintArt(img);
      if (layer.classList.contains('show')) root.classList.add('gd-bpm-bg');
      const picked = accentLocked() ? null : accentFrom(img);
      if (picked) root.style.setProperty('--gd-bpm-accent', picked.accent);
      else root.style.removeProperty('--gd-bpm-accent');
      const o = shared();
      chipApp = o && id ? appRecord(o, id) : null;
      minute = Math.floor(Date.now() / 60000);
      renderChip(o, chipApp);
    };
    const schedule = (src, id) => {
      clearTimeout(timer);
      timer = setTimeout(() => { apply(src, id); }, 160);
    };

    const teardown = () => {
      clearTimeout(timer);
      token++; chipToken++;
      chip.remove(); layer.remove();
      root.classList.remove('gd-bpm-bg');
      root.style.removeProperty('--gd-bpm-accent');
      want = null; chipApp = null; front = -1;
      planes.forEach(c => c.classList.remove('on'));
    };

    const step = () => {
      if (!enabled()) { if (want !== null || layer.isConnected) teardown(); return; }
      const img = bgImage();
      if (!img) {
        // not the home screen: a game page shows its own hours — its colour only
        chipToken++;
        chip.remove();
        layer.classList.remove('show');
        root.classList.remove('gd-bpm-bg');
        const hero = [...document.querySelectorAll('.ImgContainer img.ImgSrc')].find(i => /hero/.test(i.src));
        if (hero && hero.src !== want) { want = hero.src; schedule(hero.src, null); }
        return;
      }
      const home = document.querySelector('.BasicHome');
      if (home && layer.parentElement !== home) home.insertBefore(layer, home.firstChild);
      layer.classList.add('show');
      if (front >= 0) root.classList.add('gd-bpm-bg');
      if (img.src !== want) { want = img.src; schedule(img.src, appOf(img)); return; }
      // "N хв тому" moves on by itself
      const now = Math.floor(Date.now() / 60000);
      if (chipApp && now !== minute) { minute = now; renderChip(shared(), chipApp); }
    };
    setInterval(() => { try { step(); } catch (e) { /* Big Picture extras are a bonus, never break it */ } }, 250);
    return;
  }

  // What the block shows can change underneath it — a game just played, custom
  // art set from the library — so it is rebuilt whenever that picture changes,
  // checked at most every couple of seconds.
  let homeChecked = 0;
  let homeSig = '';

  const buildHome = () => {
    const o = shared();
    const host = document.querySelector('.LibraryHome');
    if (!o || !host) return;
    // switch «Library home → Steam» (css/options/home-steam.css)
    if (getComputedStyle(root).getPropertyValue('--gd-home').trim() === 'steam') {
      host.querySelectorAll('.gd-home').forEach(b => b.remove());
      homeSig = '';
      return;
    }
    const anchor = host.closest('.Body.InnerContainer') || host.parentElement || host;
    const existing = anchor.querySelector(':scope > .gd-home');
    if (existing && anchor.firstElementChild !== existing) anchor.insertBefore(existing, anchor.firstElementChild);

    const now = Date.now();
    if (existing && now - homeChecked < 2500) return;
    homeChecked = now;

    const apps = installedApps(o);
    const last = lastPlayed(o);
    if (!apps.length || !last) return;

    const shelf = apps.filter(a => a.rt_last_time_played && a.app_type === 1 && a.appid !== last.appid)
      .sort((a, b) => b.rt_last_time_played - a.rt_last_time_played)
      .slice(0, 7);
    const minutes = apps.reduce((s, a) => s + (a.minutes_playtime_forever || 0), 0);
    const bytes = apps.reduce((s, a) => s + Number(a.size_on_disk || 0), 0);
    const name = (document.querySelector('.SuperNav .MenuButton span') || {}).textContent || '';

    const sig = [locale(), new Date().getHours(), name, apps.length, Math.round(minutes / 60), Math.round(bytes / 2 ** 30),
      last.rt_last_time_played, last.minutes_playtime_forever,
      ...[last, ...shelf].map(a => `${a.appid}:${a.rt_custom_image_mtime || 0}`)].join('|');
    if (existing && sig === homeSig) return;
    homeSig = sig;

    const block = document.createElement('div');
    block.className = 'gd-home';
    block.innerHTML = `
      <div class="gd-top">
        <div class="gd-hello">
          <small>${W().hello(new Date().getHours())}</small>
          <strong>${esc(name)}</strong>
        </div>
        <div class="gd-stats">
          <div><small>${W().games}</small><b class="gd-num">${apps.length}</b></div>
          <div><small>${W().hours}</small><b class="gd-num">${Math.round(minutes / 60)}</b></div>
          <div><small>${W().disk}</small><b class="gd-num">${Math.round(bytes / 2 ** 30)}</b></div>
        </div>
      </div>
      <div class="gd-continue" data-app="${last.appid}">
        <img class="gd-cont-art" alt="">
        <div class="gd-cont-body">
          <small>${W().cont}</small>
          <img class="gd-cont-logo" alt="">
          <span class="gd-cont-name">${esc(last.display_name)}</span>
          <div class="gd-cont-meta">${relDay(last.rt_last_time_played)}, ${clock.format(new Date(last.rt_last_time_played * 1000))}
            · ${hoursOf(last.minutes_playtime_forever || 0)} ${W().inGame}</div>
          <button class="gd-play" data-game="${esc(gameIdOf(last))}">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M8 5.2v13.6a.8.8 0 0 0 1.2.7l10.9-6.8a.8.8 0 0 0 0-1.4L9.2 4.5A.8.8 0 0 0 8 5.2z"/></svg>
            ${W().play}
          </button>
        </div>
      </div>
      <h4 class="gd-label">${W().recent}</h4>
      <div class="gd-shelf">
        ${shelf.map(a => `
          <button class="gd-cap" data-app="${a.appid}" title="${esc(a.display_name)}">
            <img alt="">
            <span>${relDay(a.rt_last_time_played)}</span>
          </button>`).join('')}
      </div>`;

    const art = artFor(o, last);
    const hero = block.querySelector('.gd-cont-art');
    chain(hero, art.hero, () => hero.remove());

    // the logo is optional; the game's name stands in when there is none
    const logo = block.querySelector('.gd-cont-logo');
    const title = block.querySelector('.gd-cont-name');
    logo.addEventListener('load', () => title.remove(), { once: true });
    chain(logo, art.logo, () => { logo.remove(); title.classList.add('on'); });

    // a game with no cover at all gets its name on a plain tile
    block.querySelectorAll('.gd-cap').forEach((cap, i) => {
      const img = cap.querySelector('img');
      chain(img, artFor(o, shelf[i]).portrait, () => {
        const tile = document.createElement('span');
        tile.className = 'gd-cap-text';
        tile.textContent = shelf[i].display_name;
        img.replaceWith(tile);
      });
    });

    block.addEventListener('click', e => {
      const play = e.target.closest('.gd-play');
      if (play) {
        e.stopPropagation();
        const id = play.dataset.game;
        if (!id) { console.warn('[Glass Dusk] немає ідентифікатора гри для запуску'); return; }
        try { o.SteamClient.Apps.RunGame(id, '', -1, 100); }
        catch (err) { console.warn('[Glass Dusk] RunGame не спрацював', err); }
        return;
      }
      const card = e.target.closest('[data-app]');
      if (card) {
        try { o.SteamClient.URL.ExecuteSteamURL('steam://nav/games/details/' + card.dataset.app); } catch (err) { /* ignore */ }
      }
    });

    if (existing) existing.replaceWith(block);
    else anchor.insertBefore(block, anchor.firstElementChild);
    state.home++;
  };

  const tick = () => {
    mountLayer();
    const want = wantedArt();
    if (want !== KEEP) applyArt(want);
    try { buildHome(); } catch (e) { /* the home header is a bonus, never break the client over it */ }
  };

  // React swaps the page in one mutation burst — react to that instead of waiting
  // for the next poll, so the colour turns over as fast as the page does.
  let queued = 0;
  const soon = () => {
    if (queued) return;
    queued = requestAnimationFrame(() => { queued = 0; tick(); });
  };
  const watch = () => {
    const target = document.querySelector('.MainPanel') || document.body;
    if (!target) return;
    new MutationObserver(soon).observe(target, { childList: true, subtree: true });
  };

  setInterval(tick, 1000);                 // fallback for anything the observer misses
  if (document.body) { tick(); watch(); }
  else addEventListener('DOMContentLoaded', () => { tick(); watch(); });
})();
