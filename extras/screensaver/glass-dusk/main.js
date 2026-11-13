// Glass Dusk — a screensaver for Steam's Big Picture.
//
// The page shows the theme's dusk, the time and the date.
//
// The theme publishes the art of the game last in view and its two colours to localStorage
// (gd-art, gd-accent, gd-accent-2), for Steam's other windows to wear. Steam serves every
// screensaver from an address of its own (<id>.steamscreensavers.host in the client's code), so
// this page is not expected to see that storage. It looks all the same, at no cost: were Steam to
// serve it alongside the client, it would show that game's art and colours.
// Nothing is asked of the network and nothing is written anywhere.

const read = key => {
    try { return localStorage.getItem( key ) || ''; } catch ( e ) { return ''; }
};

function Dress()
{
    const art = read( 'gd-art' );
    const accent = read( 'gd-accent' ), second = read( 'gd-accent-2' );
    const isColour = c => /^#[0-9a-f]{6}$/i.test( c );
    if ( isColour( accent ) )
    {
        document.body.style.setProperty( '--accent', accent );
        document.body.style.setProperty( '--second', isColour( second ) ? second : accent );
    }
    // only a picture Steam itself serves or keeps: an address of its own client or of its CDN
    if ( !/^https:\/\/(steamloopback\.host|[a-z0-9.-]+\.steamstatic\.com)\//i.test( art ) )
        return;

    const probe = new Image();
    probe.onload = () =>
    {
        for ( const id of [ 'fill', 'art' ] )
            document.getElementById( id ).style.backgroundImage = `url("${art}")`;
        document.body.classList.add( 'has-art' );
    };
    probe.src = art;
}

function Tick()
{
    const now = new Date();
    const parts = new Intl.DateTimeFormat( undefined, { hour: 'numeric', minute: '2-digit' } ).formatToParts( now );
    const period = ( parts.find( p => p.type === 'dayPeriod' ) || {} ).value || '';
    const time = parts.filter( p => p.type !== 'dayPeriod' ).map( p => p.value ).join( '' ).trim();

    const clock = document.getElementById( 'clock' );
    if ( clock.dataset.time !== time + period )
    {
        clock.dataset.time = time + period;
        clock.textContent = time;
        if ( period )
        {
            const small = document.createElement( 'small' );
            small.textContent = period;
            clock.appendChild( small );
        }
        document.getElementById( 'date' ).textContent =
            new Intl.DateTimeFormat( undefined, { weekday: 'long', day: 'numeric', month: 'long' } ).format( now );
    }
}

Dress();
Tick();
setInterval( Tick, 1000 );
