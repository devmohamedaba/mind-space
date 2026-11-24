"""Generates the logo, illustrations, avatars, favicons and OG image (SVG -> PNG via Playwright).
Run:  python3 tools/generate-assets.py   (needs Python playwright + Pillow)
Edit the palette below to re-color every image at once."""
import os, random
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / 'public'
IMG = ROOT / 'images'; LOGO = ROOT / 'logo'
for d in (IMG / 'articles', IMG / 'specialists', LOGO): d.mkdir(parents=True, exist_ok=True)

FOREST='#2F5044'; DEEP='#1F3A31'; SAGE='#A3B899'; SAGE2='#C3D1BA'; MIST='#DDE7E1'; IVORY='#FBF7EE'
PEACH='#E3B091'; EARTH='#C98A6A'; OLIVE='#6E7260'; SAND='#F1E8D6'

def svg(w,h,body,bg=None):
    r=f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img">{r}{body}</svg>'

def leaf(x,y,s=1,rot=0,fill=FOREST):
    return f'<g transform="translate({x} {y}) rotate({rot}) scale({s})"><path d="M0 0 C-60 -50 -50 -150 0 -200 C50 -150 60 -50 0 0Z" fill="{fill}"/><path d="M0 -6 L0 -170" stroke="{IVORY}" stroke-opacity=".35" stroke-width="3" fill="none"/></g>'

def plant(x,y,s=1,fill=FOREST,fill2=SAGE):
    return (f'<g transform="translate({x} {y}) scale({s})"><path d="M0 0 C-4 -90 6 -180 0 -260" stroke="{fill}" stroke-width="7" fill="none" stroke-linecap="round"/>'
            + leaf(0,-60,.55,-55,fill2)+leaf(0,-100,.5,60,fill)+leaf(0,-150,.6,-40,fill)+leaf(0,-200,.55,45,fill2)+leaf(0,-262,.5,0,fill)+'</g>')

def pot(x,y,s=1):
    return f'<g transform="translate({x} {y}) scale({s})"><path d="M-60 0 L60 0 L48 90 Q46 104 32 104 L-32 104 Q-46 104 -48 90Z" fill="{EARTH}"/><rect x="-68" y="-12" width="136" height="22" rx="11" fill="{PEACH}"/></g>'

def hills(w,h,c1,c2,c3):
    return (f'<path d="M0 {h*.68} C{w*.2} {h*.55} {w*.38} {h*.62} {w*.55} {h*.66} S{w*.9} {h*.6} {w} {h*.56} V{h} H0Z" fill="{c1}"/>'
            f'<path d="M0 {h*.78} C{w*.25} {h*.68} {w*.5} {h*.82} {w*.72} {h*.76} S{w*.92} {h*.72} {w} {h*.74} V{h} H0Z" fill="{c2}"/>'
            f'<path d="M0 {h*.9} C{w*.3} {h*.84} {w*.6} {h*.95} {w} {h*.87} V{h} H0Z" fill="{c3}"/>')

def person(x,y,s=1,body=FOREST,skin='#E8C4A6',hair=DEEP,scarf=False):
    # seated, calm figure facing sideways (abstract)
    h = f'<path d="M-34 -118 a34 34 0 1 1 68 0 a34 34 0 1 1 -68 0Z" fill="{skin}"/>'
    hairp = (f'<path d="M-40 -112 a40 42 0 0 1 80 0 q0 22 -14 40 q4 -30 -26 -42 q-20 10 -40 2Z" fill="{hair}"/>' if not scarf else
             f'<path d="M-42 -110 a42 46 0 0 1 84 0 v50 q-42 24 -84 0Z" fill="{hair}"/><path d="M-26 -118 a26 30 0 1 1 52 0 a26 30 0 1 1 -52 0Z" fill="{skin}"/>')
    torso = f'<path d="M-62 0 Q-70 -70 -30 -86 L30 -86 Q70 -70 62 0Z" fill="{body}"/>'
    legs = f'<path d="M-62 0 H120 Q140 0 140 20 V36 H-62Z" fill="{DEEP}"/>'
    return f'<g transform="translate({x} {y}) scale({s})">{torso}{legs}{h if not scarf else ""}{hairp}</g>'

def hero():
    w,h=1200,1000
    b=f'<circle cx="600" cy="470" r="420" fill="{MIST}"/>'
    b+=f'<path d="M330 760 V430 a270 270 0 0 1 540 0 V760Z" fill="{IVORY}"/>'
    b+=f'<circle cx="600" cy="380" r="92" fill="{PEACH}"/>'
    b+=f'<path d="M330 760 V430 a270 270 0 0 1 540 0 V760" fill="none" stroke="{SAGE}" stroke-width="10"/>'
    b+=hills(w,h,SAGE2,SAGE,FOREST)
    b+=plant(210,820,1.15,FOREST,SAGE)+pot(210,820,1)
    b+=plant(1000,830,.95,FOREST,SAGE)+pot(1000,830,.85)
    b+=person(610,830,1.3,body=PEACH,hair=DEEP)
    b+=f'<circle cx="150" cy="170" r="14" fill="{SAGE}"/><circle cx="1060" cy="250" r="9" fill="{PEACH}"/><circle cx="980" cy="130" r="18" fill="{SAGE2}"/>'
    return svg(w,h,b)

def about():
    w,h=1200,900
    b=f'<rect width="{w}" height="{h}" fill="{SAND}"/><circle cx="880" cy="250" r="130" fill="{PEACH}"/>'
    b+=hills(w,h,MIST,SAGE2,SAGE)
    b+=f'<g transform="translate(420 760)">{person(0,0,1.5,FOREST,hair=DEEP)}</g>'
    b+=f'<g transform="translate(760 760)">{person(0,0,1.3,EARTH,skin="#D9AE8C",hair="#3A2A22",scarf=True)}</g>'
    b+=plant(180,800,1.2)+pot(180,800)+plant(1040,800,1)+pot(1040,800,.9)
    return svg(w,h,b)

def cover(kind,bg,c1,c2,c3):
    w,h=1200,630
    b=f'<rect width="{w}" height="{h}" fill="{bg}"/>'
    if kind=='anxiety':   # calm waves + breath
        for i,r in enumerate([250,185,125,66]): b+=f'<circle cx="860" cy="215" r="{r}" fill="{[c1,c2,c1,c3][i]}" fill-opacity="{.5+i*.12}"/>'
        b+=f'<path d="M0 470 q150 -70 300 0 t300 0 t300 0 t300 0 V630 H0Z" fill="{c3}"/>'
    elif kind=='sleep':   # moon + stars + hills
        b+=f'<circle cx="880" cy="230" r="120" fill="{PEACH}"/><circle cx="930" cy="200" r="105" fill="{bg}"/>'
        for x,y,r in [(700,120,6),(1010,360,8),(780,330,5),(1100,150,5),(620,260,7)]: b+=f'<circle cx="{x}" cy="{y}" r="{r}" fill="{IVORY}"/>'
    elif kind=='relations': # two overlapping circles
        b+=f'<circle cx="790" cy="215" r="135" fill="{c1}" fill-opacity=".9"/><circle cx="920" cy="215" r="135" fill="{PEACH}" fill-opacity=".85"/>'
    elif kind=='stress':  # leaves
        b+=leaf(840,470,1.7,-20,c1)+leaf(960,470,1.4,28,c2)+leaf(720,470,1.1,-48,c3)
    elif kind=='og':
        b+=f'<circle cx="900" cy="215" r="170" fill="{c1}"/><circle cx="900" cy="215" r="105" fill="{PEACH}"/>'
    b+=hills(w,h,c1 if kind!='og' else SAGE2,c2,c3)
    return svg(w,h,b)

def avatar(bg,body,skin,hair,scarf=False):
    w=h=400
    b=f'<rect width="{w}" height="{h}" fill="{bg}"/><circle cx="200" cy="200" r="170" fill="{IVORY}" fill-opacity=".55"/>'
    b+=f'<path d="M60 400 Q70 270 200 262 Q330 270 340 400Z" fill="{body}"/>'
    b+=f'<rect x="178" y="226" width="44" height="50" rx="16" fill="{skin}"/>'
    if scarf:
        b+=f'<path d="M110 180 a90 100 0 0 1 180 0 v70 q-90 56 -180 0Z" fill="{hair}"/><ellipse cx="200" cy="196" rx="58" ry="68" fill="{skin}" rx2="1"/>'
    else:
        b+=f'<ellipse cx="200" cy="180" rx="62" ry="72" fill="{skin}"/><path d="M134 172 a68 74 0 0 1 132 0 q-30 -40 -66 -36 q-36 -4 -66 36Z" fill="{hair}"/>'
    b+=f'<path d="M176 214 q24 18 48 0" stroke="{DEEP}" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/>'
    b+=f'<circle cx="178" cy="186" r="5" fill="{DEEP}"/><circle cx="222" cy="186" r="5" fill="{DEEP}"/>'
    return svg(w,h,b)

def logo():
    b=f'<rect width="256" height="256" rx="64" fill="{FOREST}"/>'
    b+=f'<circle cx="128" cy="78" r="26" fill="{PEACH}"/>'
    b+=f'<path d="M128 196 V122" stroke="{SAGE2}" stroke-width="9" stroke-linecap="round"/>'
    b+=f'<path d="M128 150 C92 150 80 122 90 104 C118 104 134 124 128 150Z" fill="{SAGE2}"/>'
    b+=f'<path d="M128 164 C166 164 178 136 168 118 C140 118 124 138 128 164Z" fill="{IVORY}"/>'
    b+=f'<path d="M58 190 Q128 250 198 190" stroke="{IVORY}" stroke-width="12" fill="none" stroke-linecap="round"/>'
    return svg(256,256,b)

files={
 IMG/'hero.svg':hero(), IMG/'about.svg':about(),
 IMG/'articles/anxiety.svg':cover('anxiety',MIST,SAGE2,SAGE,FOREST),
 IMG/'articles/sleep.svg':cover('sleep','#2B4A40',FOREST,'#3C6355',DEEP),
 IMG/'articles/relationships.svg':cover('relations',SAND,SAGE2,SAGE,FOREST),
 IMG/'articles/stress.svg':cover('stress',MIST,FOREST,SAGE,SAGE2),
 IMG/'articles/default.svg':cover('og',IVORY,MIST,SAGE2,FOREST),
 IMG/'specialists/one.svg':avatar(MIST,FOREST,'#E8C4A6',DEEP),
 IMG/'specialists/two.svg':avatar(SAND,EARTH,'#D9AE8C','#3A2A22',scarf=True),
 IMG/'specialists/three.svg':avatar(SAGE2,'#6E7260','#C99876','#2A211C'),
 IMG/'specialists/four.svg':avatar('#F1DFD0',FOREST,'#EBCBB0','#6B4A36',scarf=True),
 LOGO/'logo.svg':logo(),
}
for p,c in files.items(): p.write_text(c,encoding='utf-8')

# --- raster outputs (OG image, favicons, touch icons) ---
from playwright.sync_api import sync_playwright
from PIL import Image
with sync_playwright() as pw:
    br=pw.chromium.launch(); pg=br.new_page()
    def shot(svgfile,out,w,h):
        pg.set_viewport_size({'width':w,'height':h})
        import base64
        mime='image/png' if str(svgfile).endswith('png') else 'image/svg+xml'
        data=base64.b64encode(open(svgfile,'rb').read()).decode()
        pg.set_content(f'<body style="margin:0"><img src="data:{mime};base64,{data}" style="width:{w}px;height:{h}px;display:block"></body>')
        pg.wait_for_timeout(200); pg.screenshot(path=str(out),omit_background=False)
    shot(IMG/'articles/default.svg',IMG/'og-cover.png',1200,630)
    for n,s in [('favicon-16',16),('favicon-32',32),('apple-touch-icon',180),('logo-192',192),('logo-512',512)]:
        shot(LOGO/'logo.svg',LOGO/f'{n}.png',s,s)
    br.close()
Image.open(LOGO/'favicon-32.png').save(ROOT/'favicon.ico',sizes=[(16,16),(32,32)])
print('assets ok')
