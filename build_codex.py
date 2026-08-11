# -*- coding: utf-8 -*-
"""CODEX v2 - THE CHAMBER.  Data layer: wall table, geometry parsers, assertions.

MEMBRANE CONTRACT (do not "clean up"):
  .stickybar exists once, position:sticky top:0, 52px, opaque, NO backdrop-filter.
  .back / #q / #dq / .dict keep their names.  Nothing load-bearing below --tide-safe.
  The page stays dark at its base: the parent app paints an opaque band over the
  bottom 4.5vh and draws one living white line at y = H * 0.955.
"""
import json, html, io, os, re, sys, math, unicodedata, collections

SP = os.path.dirname(os.path.abspath(__file__))
DATA = json.load(io.open(os.path.join(SP, 'codex-data.json'), encoding='utf-8'))

# ---- the one switch the builder may want: the Chinese wall's tipped-in plate.
#      It is the only picture in the whole Codex.  Set False and it is gone, and
#      nothing else in the page changes. ----
SHOW_SYSTEM_IMAGE = False

# ---- A3 - THE TWO TOGGLES.  Two of the builder's six calls are feel questions
#      that no measurement settles, and this house has a law about exactly that:
#      build the A/B, let the eye decide.  Both are URL-driven and persisted -
#      ?vx=stable|fitted|tempered and ?tide=float|datum - and both default to
#      what ships today, so an untouched page is byte-for-byte the old page.
#
#      TO MAKE A CHOICE PERMANENT, edit these four lines and nothing else:
#        set VX_DEFAULT / TIDE_DEFAULT to the variant that won, then set
#        VX_TOGGLE / TIDE_TOGGLE to False.  With a toggle False the generator
#        emits ONE variant - the switch, the alternates' data and the query
#        parser for it all disappear from the page, and the losing branch's CSS
#        is never written.  Nothing else in the file needs touching. ----
VX_TOGGLE = True             # C4: the reading surface's height policy
VX_DEFAULT = 'stable'        # 'stable' (per-wall max) | 'fitted' | 'tempered'
VX_PCT = 80                  # the percentile 'tempered' sizes a wall from
TIDE_TOGGLE = True           # C3: where the plate's foot stands
TIDE_DEFAULT = 'float'       # 'float' (26px of air) | 'datum' (10px submerged)
VX_MODES = ('stable', 'fitted', 'tempered')
TIDE_MODES = ('float', 'datum')
# R4/S1: the scroll.  Snap lost on measurement, not on taste - but nothing is
# taken away irreversibly here, so the old behaviour keeps a door.  ?snap=on is
# persisted and written back into the URL exactly like ?vx= and ?tide=.
SNAP_TOGGLE = True           # R1: whether the room re-aims your wheel gesture
SNAP_DEFAULT = 'off'         # 'off' (the page scrolls) | 'on' (y proximity)
SNAP_MODES = ('off', 'on')

MID = u'·'          # MIDDLE DOT - the only separator in the bank
VS15 = u'︎'    # VARIATION SELECTOR-15: "this symbol is text, not an emoji"

ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
ROMAN22 = ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI',
           'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI']

ELEMENTS = ['Fire', 'Earth', 'Air', 'Water']
MODALITY = ['Cardinal', 'Fixed', 'Mutable']
SUITS = ['Wands', 'Cups', 'Swords', 'Pentacles']
SUIT_L = {'Wands': 'W', 'Cups': 'C', 'Swords': 'S', 'Pentacles': 'P'}
SUIT_EL = {'Wands': 'Fire', 'Cups': 'Water', 'Swords': 'Air', 'Pentacles': 'Earth'}
RANKS = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
         'Page', 'Knight', 'Queen', 'King']
AETT = [u"Freyr's Ætt", u"Heimdall's Ætt", u"Týr's Ætt"]
WUXING = ['Wood', 'Fire', 'Earth', 'Metal', 'Water']
# canonical hexagram-chart order.  columns = UPPER trigram, rows = LOWER trigram.
CHART = ['Heaven', 'Lake', 'Fire', 'Thunder', 'Wind', 'Water', 'Mountain', 'Earth']
# THE FAMILY PORTRAIT, drawn rather than captioned: the father alone at the head,
# his three sons beneath him, the three daughters beneath them, the mother alone at
# the foot.  Three columns, four rows.  The arrangement IS the relationship - the
# two sentences that used to explain it are deleted.
TRI_CELL = {'Heaven': (1, 0),
            'Thunder': (0, 1), 'Water': (1, 1), 'Mountain': (2, 1),
            'Wind': (0, 2), 'Fire': (1, 2), 'Lake': (2, 2),
            'Earth': (1, 3)}
TRI_ROW = ['the father', 'the three sons', 'the three daughters', 'the mother']
# trigram lines, TOP to BOTTOM.  1 = yang (solid), 0 = yin (broken)
TRI_LINES = {'Heaven': (1, 1, 1), 'Lake': (0, 1, 1), 'Fire': (1, 0, 1), 'Thunder': (0, 0, 1),
             'Wind': (1, 1, 0), 'Water': (0, 1, 0), 'Mountain': (1, 0, 0), 'Earth': (0, 0, 0)}

WALLS = [
    dict(k='western', pre='WZ', spine='x', title='The Western Zodiac',
         eyebrow='the twelve sun signs',
         furn=u'12 marks of 222 · four elements × three modalities'),
    dict(k='chinese', pre='CZ', spine='x', title='The Chinese Zodiac',
         eyebrow='twelve animals, five elements',
         furn=u'17 marks of 222 · twelve animals, five elements'),
    dict(k='numerology', pre='NU', spine='x', title='Numerology',
         eyebrow='the core & master numbers',
         furn=u'12 marks of 222 · nine core numbers, three master numbers'),
    dict(k='tarot-guide', pre='TG', spine='x', title='The Antechamber',
         eyebrow='reading the tarot',
         furn=u'8 sections · read in place'),
    dict(k='tarot-major', pre='MA', spine='x', title='The Major Arcana',
         eyebrow='the twenty-two',
         furn=u'22 marks of 222 · nought to twenty-one'),
    dict(k='tarot-minor', pre='MI', spine='y', title='The Minor Arcana',
         eyebrow='the fifty-six',
         furn=u'56 marks of 222 · four suits × fourteen ranks'),
    dict(k='runes', pre='RN', spine='x', title='The Elder Futhark',
         eyebrow='the twenty-four runes',
         furn=u'24 marks of 222 · three ættir of eight'),
    dict(k='trigrams', pre='TR', spine='x', title='The Eight Trigrams',
         eyebrow='the building blocks',
         furn=u'8 marks of 222 · two parents, six children'),
    dict(k='iching', pre='HX', spine='x', title='The I Ching',
         eyebrow='the sixty-four hexagrams',
         furn=u'64 marks of 222 · the upper trigram across, the lower down'),
    # C6.  The page never said its own name: round one deleted the masthead and
    # the footer and nothing replaced them, so the one document that catalogues
    # ten systems of meaning never told you what it was.  The quiet option, and
    # the one taken: the last wall's furniture line signs the collection off in
    # the archive's own voice.  ONE line, no new surface, and it appears here and
    # nowhere else on the page.
    dict(k='lexicon', pre='LX', spine='x', title='The Blue Room Lexicon',
         eyebrow='the instruments & records',
         # The sign-off costs 15 characters, and this wall's furniture line was
         # already the longest of the ten.  On the preface plate the foot IS the
         # furniture line (mono, .22em tracked, nowrap), so the full string ran
         # 31px past the plate's own border.  Trimmed "of five" - the wall's
         # three zones already say how many plates there are - so the sign-off
         # fits inside the border instead of spilling into the room.
         furn=u'7 marks of 222 · four instruments, a pivot, two plates'
              u' · the first bank'),
]

# the 20 symbol characters that exist in the bank, and the sprite they become
GLYPH_ID = {
    u'♈': ('gl-aries', 'Aries'), u'♉': ('gl-taurus', 'Taurus'),
    u'♊': ('gl-gemini', 'Gemini'), u'♋': ('gl-cancer', 'Cancer'),
    u'♌': ('gl-leo', 'Leo'), u'♍': ('gl-virgo', 'Virgo'),
    u'♎': ('gl-libra', 'Libra'), u'♏': ('gl-scorpio', 'Scorpio'),
    u'♐': ('gl-sagittarius', 'Sagittarius'), u'♑': ('gl-capricorn', 'Capricorn'),
    u'♒': ('gl-aquarius', 'Aquarius'), u'♓': ('gl-pisces', 'Pisces'),
    u'☰': ('gl-tri', 'Heaven'), u'☱': ('gl-tri', 'Lake'),
    u'☲': ('gl-tri', 'Fire'), u'☳': ('gl-tri', 'Thunder'),
    u'☴': ('gl-tri', 'Wind'), u'☵': ('gl-tri', 'Water'),
    u'☶': ('gl-tri', 'Mountain'), u'☷': ('gl-tri', 'Earth'),
}


class BuildError(Exception):
    pass


def _clean_exit(kind, value, tb):
    """Any uncaught exception prints ONE line, not a traceback - a BuildError
       AND every other exception class a bad data row or a typo in this file
       can raise (KeyError, TypeError, AssertionError, ...).  Whoever maintains
       this in six months runs it from a batch file with stdout redirected; a
       Windows console in cp1252 must not mangle a message built from bank
       text, whichever exception class carried it.  KeyboardInterrupt and
       SystemExit are control flow, not a build failure - let those through."""
    if issubclass(kind, (KeyboardInterrupt, SystemExit)):
        sys.__excepthook__(kind, value, tb)
        return
    if isinstance(value, BuildError):
        msg = 'CODEX BUILD: %s\n' % value
    else:
        msg = 'CODEX BUILD: %s: %s\n' % (kind.__name__, value)
    try:
        sys.stderr.buffer.write(msg.encode('utf-8'))
        sys.stderr.buffer.flush()
    except Exception:
        sys.stderr.write(msg.encode('ascii', 'backslashreplace').decode('ascii'))
    os._exit(1)


sys.excepthook = _clean_exit


def need(c, m):
    if not c:
        raise BuildError(m)


def esc(x):
    return html.escape('' if x is None else str(x), quote=True)


def unicode_str(x):
    return '' if x is None else str(x)


_FOLD_MAP = {u'ø': 'o', u'æ': 'ae', u'œ': 'oe', u'ß': 'ss',
             u'þ': 'th', u'ð': 'd', u'ł': 'l', u'đ': 'd', u'ı': 'i'}


def fold(s):
    """Lowercase, strip diacritics, reduce to [a-z0-9 ].  Must match fold() in the page JS."""
    s = u'' if s is None else unicode_str(s)
    s = u''.join(_FOLD_MAP.get(ch.lower(), ch) for ch in s)
    s = unicodedata.normalize('NFD', s)
    s = u''.join(ch for ch in s if unicodedata.category(ch) != 'Mn')
    s = s.lower()
    s = re.sub(r'[^a-z0-9]+', ' ', s)
    return ' '.join(s.split())


def dedupe(tokens):
    seen, out = set(), []
    for t in tokens:
        if t and t not in seen:
            seen.add(t)
            out.append(t)
    return ' '.join(out)


_ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
         'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
         'eighteen', 'nineteen']
_TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']


def numword(n):
    if n < 20:
        return _ONES[n]
    if n < 100:
        t, o = divmod(n, 10)
        return _TENS[t] + ('-' + _ONES[o] if o else '')
    return str(n)


def parts(tag):
    return [p.strip() for p in unicode_str(tag).split(MID)]


# ---------------------------------------------------------------- the ten parsers
def geo_western(es):
    out = []
    for i, e in enumerate(es):
        p = parts(e['tag'])
        need(len(p) == 5, 'wall I tag: ' + e['tag'])
        el, mo = p[2], p[3]
        need(el in ELEMENTS, 'wall I element ' + el)
        need(mo in MODALITY, 'wall I modality ' + mo)
        glyph = p[0][0] if p[0] and p[0][0] in GLYPH_ID else None
        need(glyph is not None, 'wall I glyph missing: ' + e['tag'])
        # LAW 5.  The wall draws the sign as a stroke, but the tag's own symbol
        # character survives byte-verbatim inside the clipped record body, with
        # U+FE0E appended so it can never fall into a colour emoji font.
        out.append(dict(gx=MODALITY.index(mo), gy=ELEMENTS.index(el), glyph=glyph,
                        vis=e['name'], short=e['name'],
                        verbatim=e['tag'],
                        slots=[p[1], p[2], p[3], p[4]],
                        sig=['el:' + fold(el), 'mod:' + fold(mo), 'ruler:' + fold(p[4].split('(')[0])]))
    need(len({(c['gx'], c['gy']) for c in out}) == 12, 'wall I must fill 3x4')
    return out


def geo_chinese(es):
    out = []
    na = ne = 0
    for e in es:
        t = unicode_str(e['tag'])
        if 'Fixed element:' in t:
            years, fx = t.split(MID)
            fx = fx.split(':', 1)[1].strip()
            need(fx in WUXING, 'wall II wuxing ' + fx)
            out.append(dict(gx=na % 6, gy=na // 6, vis=e['name'], short=e['name'],
                            slots=[years.strip(), 'Fixed element: ' + fx],
                            micro=fx, zone='animal',
                            sig=['kind:animal', 'wx:' + fold(fx)]))
            na += 1
        else:
            need(t.startswith('Wu Xing'), 'wall II tag ' + t)
            role = parts(t)[1]
            out.append(dict(gx=ne, gy=2, vis=e['name'], short=e['name'],
                            slots=['Wu Xing', role], micro=role.replace(' element', ''),
                            zone='element',
                            sig=['kind:element', 'wx:' + fold(e['name'])]))
            ne += 1
    need(na == 12 and ne == 5, 'wall II must be 12+5, got %d/%d' % (na, ne))
    return out


def _kw1(e):
    """The bank's OWN first keyword, verbatim, as a mark's sub-label.  Walls II and
    VI already carry one (the element); walls III and X are the two whose entries
    are a bare numeral or a bare noun, and without it the mark says nothing at all
    until it is opened.  No new copy - the word is the entry's own."""
    kw = e.get('keywords') or []
    return kw[0] if kw else ''


def geo_numerology(es):
    out = []
    for e in es:
        n = int(e['name'])
        if e['tag'] == 'core number':
            need(1 <= n <= 9, 'wall III core %d' % n)
            # no per-mark "CORE" / "MASTER" label: the two zone headings already
            # carry the distinction, and repeating it nine times is chrome.
            out.append(dict(gx=(n - 1) % 3, gy=(n - 1) // 3, vis=e['name'], short=e['name'],
                            micro=_kw1(e), slots=['core number'], sig=['kind:core']))
        else:
            need(e['tag'] == 'master number', 'wall III tag ' + e['tag'])
            need(n in (11, 22, 33), 'wall III master %d' % n)
            out.append(dict(gx=[11, 22, 33].index(n), gy=3, vis=e['name'], short=e['name'],
                            micro=_kw1(e), slots=['master number'], sig=['kind:master']))
    return out


def geo_major(es):
    out = []
    for i, e in enumerate(es):
        p = parts(e['tag'])
        need(len(p) == 2 and p[1] == 'Major Arcana', 'wall V tag: ' + e['tag'])
        need(p[0] == ROMAN22[i], 'wall V numeral out of order at %d: %s' % (i, p[0]))
        # the numeral is a LINE above the name, never a ghost printed through it
        # both halves of the tag are slots: the Roman numeral is the card's own
        # number and must survive, not be replaced by the catalogue address
        out.append(dict(gx=i % 11, gy=i // 11, vis=e['name'], short=e['name'],
                        over=p[0], slots=[p[0], p[1]], sig=['arc:major']))
    return out


def geo_minor(es):
    out = []
    seen = set()
    for e in es:
        p = parts(e['tag'])
        need(len(p) == 3, 'wall VI tag: ' + e['tag'])
        rk, su, el = p
        need(su in SUITS, 'wall VI suit ' + su)
        need(rk in RANKS, 'wall VI rank ' + rk)
        need(SUIT_EL[su] == el, 'wall VI element mismatch ' + e['tag'])
        gx, gy = SUITS.index(su), RANKS.index(rk)
        need((gx, gy) not in seen, 'wall VI duplicate %s of %s' % (rk, su))
        seen.add((gx, gy))
        # C1.  Every cell on this wall said only its RANK - four cells read "ACE"
        # and nothing else, and the suit lived once, at the top of the column.  The
        # pip is the suit, drawn as the same stroke the column head already uses
        # (the sprite has four; no new art), set small, dim and BEFORE the rank so
        # the rank stays the loudest thing in the cell.
        out.append(dict(gx=gx, gy=gy, vis=rk, short=rk, pip='suit-' + su.lower(),
                        slots=[rk, su, el],
                        sig=['suit:' + fold(su), 'rank:' + fold(rk), 'el:' + fold(el),
                             'court:' + ('yes' if gy >= 10 else 'no')]))
    need(len(seen) == 56, 'wall VI must fill 4x14, got %d' % len(seen))
    return out


def geo_runes(es):
    out = []
    for i, e in enumerate(es):
        p = parts(e['tag'])
        need(len(p) == 2, 'wall VII tag: ' + e['tag'])
        # NOTE the 's-' namespace.  The sprite's <g> ids live in their own space:
        # 'rn-01' is a rune's ADDRESS ANCHOR, and a document may only mint it once.
        out.append(dict(gx=i % 8, gy=i // 8, vis=e['name'], short=e['name'],
                        fig='s-rn-%02d' % (i + 1), slots=[p[0], p[1]],
                        sig=['aett:%d' % (i // 8 + 1), 'apos:%d' % (i % 8 + 1)]))
    need(len(out) == 24, 'wall VII must be 24')
    return out


def tri_nature(name):
    """u'☴ Xùn · Wind/Wood' -> 'Wind'"""
    p = parts(name)
    need(len(p) == 2, 'wall VIII name: ' + name)
    return p[1].split('/')[0].strip()


def geo_trigrams(es):
    out = []
    seen = set()
    for e in es:
        nat = tri_nature(e['name'])
        need(nat in TRI_CELL, 'wall VIII unplaced ' + nat)
        gx, gy = TRI_CELL[nat]
        need((gx, gy) not in seen, 'wall VIII dup ' + nat)
        seen.add((gx, gy))
        p = parts(e['tag'])
        need(len(p) == 4, 'wall VIII tag: ' + e['tag'])
        glyph = e['name'][0]
        need(glyph in GLYPH_ID, 'wall VIII glyph ' + e['name'])
        pinyin = parts(e['name'])[0][1:].strip()
        fam = p[2].replace('the ', '')
        head = unicode_str(e['name'])[1:].strip()          # the glyph is drawn, not typeset
        need(head and head[0] not in GLYPH_ID, 'wall VIII glyph not lifted: ' + e['name'])
        # LAW 5: the entry's own name, byte-verbatim, survives inside the clipped body
        out.append(dict(gx=gx, gy=gy, vis=parts(e['name'])[1], short=pinyin, head=head,
                        micro=pinyin, verbatim=e['name'],
                        lines=TRI_LINES[nat], nature=nat, slots=p,
                        sig=['tri:' + fold(nat), 'fam:' + fold(fam).replace(' ', '-')]))
    need(len(seen) == 8, 'wall VIII must place 8')
    return out


_HXNAME = re.compile(r'^(\d+)\s*' + MID + r'\s*(.+)$')


def geo_iching(es):
    out = []
    seen = set()
    for i, e in enumerate(es):
        m = _HXNAME.match(unicode_str(e['name']))
        need(m, 'wall IX name: ' + e['name'])
        kw = int(m.group(1))
        need(kw == i + 1, 'wall IX King Wen out of order at %d' % (i + 1))
        need(' over ' in e['tag'], 'wall IX tag: ' + e['tag'])
        up, lo = [x.strip() for x in unicode_str(e['tag']).split(' over ')]
        need(up in CHART and lo in CHART, 'wall IX trigram in ' + e['tag'])
        gx, gy = CHART.index(up), CHART.index(lo)
        need((gx, gy) not in seen, 'wall IX dup %s over %s' % (up, lo))
        seen.add((gx, gy))
        out.append(dict(gx=gx, gy=gy, vis=str(kw), short=m.group(2), nameless=True,
                        head=m.group(2),
                        lines=tuple(TRI_LINES[up]) + tuple(TRI_LINES[lo]),
                        upper=up, lower=lo, slots=[up, lo],
                        sig=['triu:' + fold(up), 'tril:' + fold(lo)]))
    need(len(seen) == 64, 'wall IX must fill 8x8, got %d' % len(seen))
    # the eight doubled trigrams must run the diagonal: 1 58 30 51 57 29 52 2
    diag = {}
    for i, c in enumerate(out):
        if c['gx'] == c['gy']:
            diag[c['gx']] = i + 1
    need([diag[k] for k in range(8)] == [1, 58, 30, 51, 57, 29, 52, 2],
         'wall IX diagonal is not canonical: %s' % [diag[k] for k in range(8)])
    return out


def geo_lexicon(es):
    out = []
    zones = {'front': 0, 'pivot': 0, 'plate': 0}
    for e in es:
        t = unicode_str(e['tag'])
        if 'dossier plate' in t:
            zone, gy = 'plate', 2
        elif 'a mode of the same card' in t:
            zone, gy = 'pivot', 1
        else:
            zone, gy = 'front', 0
        gx = zones[zone]
        zones[zone] += 1
        # C1.  The sub-label was the entry's first keyword - one word, and the
        # wrong one: SILVER under DIAGRAM, BACK under THE DEVELOPED BACK, PIGMENT
        # under SURFACE RECORD.  Seven bare nouns over seven bare nouns is why
        # this wall read as unfinished.  The tag's FIRST part is what the bank
        # already wrote to place each instrument, and it is the phrase that tells
        # the seven apart: the silver instrument, the original photograph, the
        # material module, dossier plate 01.  No new copy - the bank's own words.
        out.append(dict(gx=gx, gy=gy, vis=e['name'], short=e['name'], micro=parts(t)[0],
                        slots=parts(t), zone=zone, sig=['zone:' + zone]))
    need(zones['pivot'] == 1, 'wall X needs exactly one pivot')
    need(zones['front'] == 4 and zones['plate'] == 2, 'wall X must be 4 / 1 / 2')
    return out


PARSERS = {
    'western': geo_western, 'chinese': geo_chinese, 'numerology': geo_numerology,
    'tarot-major': geo_major, 'tarot-minor': geo_minor, 'runes': geo_runes,
    'trigrams': geo_trigrams, 'iching': geo_iching, 'lexicon': geo_lexicon,
}


def address(k, i, cell, entry):
    """(visible address, anchor id)"""
    pre = [w['pre'] for w in WALLS if w['k'] == k][0]
    if k == 'tarot-major':
        a = '%s %02d' % (pre, i)
    elif k == 'tarot-minor':
        rk, su = cell['slots'][0], cell['slots'][1]
        a = '%s %s%02d' % (pre, SUIT_L[su], RANKS.index(rk) + 1)
    elif k == 'iching':
        a = '%s %02d' % (pre, i + 1)
    else:
        a = '%s %02d' % (pre, i + 1)
    return a, a.lower().replace(' ', '-')


def sequence(cells, spine):
    idx = list(range(len(cells)))
    if spine == 'x':
        idx.sort(key=lambda i: (cells[i]['gy'], cells[i]['gx']))
    else:
        idx.sort(key=lambda i: (cells[i]['gx'], cells[i]['gy']))
    for s, i in enumerate(idx):
        cells[i]['seq'] = s
    return idx


# ============================================================ THE DRAWN GLYPHS
# Every symbol in the bank is drawn as a stroke, never typeset.  The twelve
# zodiac characters fall out of the mono stack into a colour emoji font and
# render as violet bitmaps - a second palette, twelve times, in the first
# viewport.  Drawing them kills that, and gives one optical weight throughout.
# 24x24 box, stroke:currentColor, set by CSS.

ZODIAC_PATHS = {
    'gl-aries': u'M5.4,17.6 C5.4,8.6 9,5.8 12,11.6 C15,5.8 18.6,8.6 18.6,17.6',
    'gl-taurus': u'M5.2,10.6 A7,7 0 0 1 18.8,10.6 M16.4,16.6 A4.4,4.4 0 1 1 7.6,16.6 A4.4,4.4 0 1 1 16.4,16.6',
    'gl-gemini': u'M7.2,4.6 L16.8,4.6 M7.2,19.4 L16.8,19.4 M9.9,4.6 L9.9,19.4 M14.1,4.6 L14.1,19.4',
    'gl-cancer': u'M10.3,8 A2.7,2.7 0 1 1 7.6,5.3 A2.7,2.7 0 1 1 10.3,8'
                 u' M10.3,8.6 C13.6,10 16.6,11 20,10.6'
                 u' M13.7,16 A2.7,2.7 0 1 1 16.4,18.7 A2.7,2.7 0 1 1 13.7,16'
                 u' M13.7,15.4 C10.4,14 7.4,13 4,13.4',
    'gl-leo': u'M8.6,19.6 A3.3,3.3 0 1 1 12,16.3 C12,11.6 13.6,8 16.6,8'
              u' C19,8 20.1,10.6 18.8,12.9 C17.4,15.4 17.1,17.9 19.1,20.1',
    'gl-virgo': u'M5.2,7.4 C6.6,7.4 7.2,8.4 7.2,10 L7.2,18.2'
                u' M7.2,9.4 C7.2,7.6 11,7.6 11,9.9 L11,18.2'
                u' M11,9.4 C11,7.6 14.8,7.6 14.8,9.9 L14.8,15.6'
                u' C14.8,12.8 17.6,11.6 19.2,13.4 C21,15.4 19.2,19 14.4,20.4',
    'gl-libra': u'M4,18.6 L20,18.6 M4,13.8 L8.3,13.8 M8.3,13.8 A4,4 0 0 1 15.7,13.8 M15.7,13.8 L20,13.8',
    'gl-scorpio': u'M4,7.6 C5.4,7.6 6,8.6 6,10.2 L6,18'
                  u' M6,9.6 C6,7.8 9.8,7.8 9.8,10.1 L9.8,18'
                  u' M9.8,9.6 C9.8,7.8 13.6,7.8 13.6,10.1 L13.6,17.4'
                  u' C13.6,19 17.4,19 17.4,17.4 L17.4,11.8'
                  u' M17.4,11.8 L20.6,15 M20.6,15 L16.9,15.4',
    'gl-sagittarius': u'M5.4,18.6 L18,6 M18,6 L18,12.2 M18,6 L11.8,6 M8.6,11.4 L14,16.8',
    'gl-capricorn': u'M4.6,7.4 C6.1,7.4 6.9,8.6 6.9,10.3 L6.9,17.6'
                    u' M6.9,9.6 C7.5,7.5 10.6,7.2 11.6,9.6 L14,17.6'
                    u' M13.8,13.2 C15.3,10.5 18.9,11.4 19.2,14.4'
                    u' C19.4,17 17.2,18.7 15.2,17.8 C13.7,17.1 13.3,15.1 14.7,13.9',
    'gl-aquarius': u'M4,11.2 l3.2,-2.7 3.2,2.7 3.2,-2.7 3.2,2.7 3.2,-2.7'
                   u' M4,16.6 l3.2,-2.7 3.2,2.7 3.2,-2.7 3.2,2.7 3.2,-2.7',
    'gl-pisces': u'M8.4,4 C3.2,8 3.2,16 8.4,20 M15.6,4 C20.8,8 20.8,16 15.6,20 M4.2,12 L19.8,12',
}

# the twenty-four staves of the Elder Futhark, in futhark order.
# each is a list of polylines on the same 24x24 box.
RUNE_STROKES = [
    [[(8, 3), (8, 21)], [(8, 7.2), (16.4, 3)], [(8, 12.4), (16.4, 8.2)]],            # Fehu
    [[(7.2, 21), (7.2, 4.4), (16.4, 10.2), (16.4, 21)]],                              # Uruz
    [[(8, 3), (8, 21)], [(8, 7.4), (16.4, 12), (8, 16.6)]],                           # Thurisaz
    [[(8, 3), (8, 21)], [(8, 5.4), (16.4, 9.6)], [(8, 11), (16.4, 15.2)]],            # Ansuz
    [[(8, 3), (8, 21)], [(8, 3), (15.4, 6.4), (8, 11.6)], [(8, 11.6), (15.8, 21)]],   # Raidho
    [[(16.4, 4.2), (8, 12), (16.4, 19.8)]],                                           # Kenaz
    [[(6.2, 4.2), (17.8, 19.8)], [(17.8, 4.2), (6.2, 19.8)]],                         # Gebo
    [[(8, 3), (8, 21)], [(8, 3), (16.4, 7.2), (8, 11.4)]],                            # Wunjo
    [[(7.2, 3), (7.2, 21)], [(16.8, 3), (16.8, 21)], [(7.2, 10.2), (16.8, 13.8)]],    # Hagalaz
    [[(12, 3), (12, 21)], [(6, 16.4), (18, 7.6)]],                                    # Nauthiz
    [[(12, 3), (12, 21)]],                                                            # Isa
    [[(7.4, 5), (13.4, 9), (7.4, 13)], [(16.6, 19), (10.6, 15), (16.6, 11)]],         # Jera
    [[(12, 6.2), (12, 17.8)], [(12, 6.2), (17, 3)], [(12, 17.8), (7, 21)]],           # Eihwaz
    [[(16.4, 4), (9, 7.4), (9, 16.6), (16.4, 20)]],                                   # Perthro
    [[(12, 4), (12, 21)], [(12, 10.4), (6, 4)], [(12, 10.4), (18, 4)]],               # Algiz
    [[(17, 4), (9.2, 9.6), (16, 14.4), (8, 20)]],                                     # Sowilo
    [[(12, 6), (12, 21)], [(12, 6), (6.2, 12)], [(12, 6), (17.8, 12)]],               # Tiwaz
    [[(8, 3), (8, 21)], [(8, 3), (16.4, 7), (8, 11)], [(8, 11), (16.4, 17), (8, 21)]],  # Berkano
    [[(7.2, 21), (7.2, 4)], [(16.8, 21), (16.8, 4)], [(7.2, 4), (12, 11.6), (16.8, 4)]],  # Ehwaz
    [[(7.2, 3), (7.2, 21)], [(16.8, 3), (16.8, 21)], [(7.2, 3), (16.8, 11.6)],
     [(16.8, 3), (7.2, 11.6)]],                                                       # Mannaz
    [[(9, 3), (9, 21)], [(9, 3), (16.2, 8.4)]],                                       # Laguz
    [[(12, 5), (18, 12), (12, 19), (6, 12), (12, 5)]],                                # Ingwaz
    [[(7.2, 4), (7.2, 20)], [(16.8, 4), (16.8, 20)], [(7.2, 4), (16.8, 20)],
     [(7.2, 20), (16.8, 4)]],                                                         # Dagaz
    [[(12, 3), (17.4, 9), (12, 15), (6.6, 9), (12, 3)], [(9.4, 12), (6.4, 21)],
     [(14.6, 12), (17.6, 21)]],                                                       # Othala
]

# the four suit marks of the Minor Arcana - one drawn pip per cell
SUIT_PATHS = {
    'suit-wands': u'M12,20.4 L12,4.6 M12,9.4 L7.6,5.6 M12,9.4 L16.4,5.6',
    'suit-cups': u'M6.8,5.6 C6.8,13.6 17.2,13.6 17.2,5.6 M12,13.6 L12,18.4 M8.2,19 L15.8,19',
    'suit-swords': u'M12,20.4 L12,4.6 M12,4.6 L8.8,8.4 M12,4.6 L15.2,8.4 M7.4,13.4 L16.6,13.4',
    'suit-pentacles': u'M18.6,12 A6.6,6.6 0 1 1 5.4,12 A6.6,6.6 0 1 1 18.6,12'
                      u' M12,5.6 L16.3,18.4 L5.4,10.5 L18.6,10.5 L7.7,18.4 Z',
}


def _poly(pts):
    return 'M' + ' L'.join('%g,%g' % p for p in pts)


def build_sprite():
    """The sprite lives in its OWN id namespace.  Every glyph id here is prefixed
       ('gl-', 's-rn-', 'suit-') so that it can never collide with an entry's
       address anchor - 'rn-05' belongs to the fifth rune, and to nothing else.
       The whole-document duplicate-id assertion at the end of this file makes
       that permanent."""
    out = ['<svg class="sprite" aria-hidden="true" focusable="false" width="0" height="0">'
           '<defs>']
    for gid, d in ZODIAC_PATHS.items():
        out.append('<g id="%s"><path d="%s"/></g>' % (gid, d))
    for i, strokes in enumerate(RUNE_STROKES):
        out.append('<g id="s-rn-%02d">%s</g>'
                   % (i + 1, ''.join('<path d="%s"/>' % _poly(s) for s in strokes)))
    for gid, d in SUIT_PATHS.items():
        out.append('<g id="%s"><path d="%s"/></g>' % (gid, d))
    out.append('</defs></svg>')
    return ''.join(out)


def use_glyph(gid, label, cls='fig'):
    return ('<svg class="%s" viewBox="0 0 24 24" role="img" aria-label="%s">'
            '<use href="#%s"/></svg>' % (cls, esc(label), gid))


def text_glyphs(s):
    """Belt and braces.  Every symbol character that survives in verbatim bank text
       gets U+FE0E after it - 'this is a glyph, not an emoji' - so the twelve
       violet bitmaps die twice: once because the wall draws its strokes instead,
       and once because the one place the character still lives says TEXT."""
    out = []
    for ch in unicode_str(s):
        out.append(ch)
        if ch in GLYPH_ID:
            out.append(VS15)
    return u''.join(out)


def bars_html(lines, cls='bars'):
    """lines: tuple of 1/0, TOP to BOTTOM.  Three for a trigram, six for a hexagram."""
    return ('<span class="%s" aria-hidden="true">%s</span>'
            % (cls, ''.join('<i class="%s"></i>' % ('y' if v else 'n') for v in lines)))


# ============================================================ CSS 1 / TOKENS + TYPE
CSS_TOKENS = u""":root{
color-scheme:dark;
/* THE GROUND - six values, top-lit, cooling to the floor */
--key-light:#1c1712;--ground:#100e0c;--ink-lintel:#100f0c;--ink-vessel:#11100d;
--ink-well:#0c0b09;--shore:#0b0b0d;--seafloor:#0a0b0d;
/* THE INK - one warm sand ramp.  Pure white is forbidden, including SVG strokes:
   the parent's living line is the only white object on screen.
   Every tier is at or above 4.5:1 on all four page grounds, so no rank of the
   ramp is decorative-only: t-ghost 4.97, t-meta 5.92, t-body 8.6. */
--t-display:#e9e5dc;--t-primary:#d7d3ca;--t-body:#b1ada4;--t-meta:#948f87;--t-ghost:#86827a;
/* HAIRLINES - one sand, three alphas, always 1px, always faded at their ends */
--hair-1:rgba(233,229,220,.14);--hair-2:rgba(233,229,220,.08);--hair-3:rgba(233,229,220,.045);
--hair-0:rgba(233,229,220,0);--ghost-ord:rgba(233,229,220,.085);
/* THE GOLD - TWO registers and no third.  gold-dim is INK (the printed rubric:
   plate numerals, catalogue numbers, sense labels, bracketed etymologies);
   gold is LIGHT (the lit state only: the Ember, a hit's underline, the current
   tick, the current rule).  gold-dim clears 4.5:1 as running text. */
--gold:#c69b63;--gold-dim:#9a7b4c;
--gold-glow:rgba(198,155,99,.35);--gold-fade:rgba(198,155,99,0);
--focus:rgba(233,229,220,.62);--sel-bg:rgba(233,229,220,.16);--caret:#d7d3ca;
--dim-bg:rgba(10,11,13,.88);--cold:.10;
/* THE WATERLINE - the numbers the parent draws with.  svh, because the parent
   measures window.innerHeight (the VISUAL viewport); vh first as the fallback. */
--bar-h:52px;
--tide:4.5vh;--tide:4.5svh;
--tide-safe:calc(4.5vh + 26px);--tide-safe:calc(4.5svh + 26px);
--tide-edge:min(90px,18vw);
/* the strip on the right that belongs to the parent app's seal, not to us */
--seal-safe:58px;
--cool-run:9.5vh;--cool-run:9.5svh;
/* THE ROOM - the height a wall's marks may actually occupy: what is left of the
   viewport once the lintel, the head, the field's own air and THE WATER are gone.
   Every wall that can outgrow a screen sizes its pitch from this and no other
   number, so no mark is ever drawn under the parent's band. */
--wall-pad:clamp(18px,4.4vw,60px);
--head-pad:clamp(22px,4.4vh,54px);
--head-h:calc(var(--head-pad) + 112px);
--field-pt:clamp(12px,2.4vh,34px);--field-pb:clamp(14px,3vh,40px);
--room:calc(95.5vh - var(--bar-h) - var(--head-h) - var(--field-pt) - var(--field-pb) - 24px);
--room:calc(95.5svh - var(--bar-h) - var(--head-h) - var(--field-pt) - var(--field-pb) - 24px);
--wallw:1100px;
--mount:0 18px 40px -24px rgba(0,0,0,.70);
--bevel:inset 0 1px 0 rgba(233,229,220,.04);
--cut:inset 0 1px 2px rgba(0,0,0,.55),inset 0 -1px 0 rgba(233,229,220,.035);
--ease-bloom:cubic-bezier(.16,.84,.30,1);--ease-collapse:cubic-bezier(.4,0,.7,.4);
--dur-vessel-in:680ms;--dur-vessel-out:340ms;--dur-scrim-in:420ms;--dur-scrim-out:240ms;
--dur-cross:140ms;--dur-settle:200ms;--dur-ember:160ms;--dur-lit:240ms;--dur-step:160ms;
/* CaronSerif is not a webfont: it is a unicode-range lease on whatever local face
   actually carries the pinyin tone letters (U+01CD-U+01DC).  Without it the serif
   stack has no precomposed ǎ/ǐ/ǒ/ǔ, the browser decomposes, and twelve headwords
   engrave a caron floating in the gap after the vowel. */
--ff-serif:CaronSerif,"Iowan Old Style","Palatino Linotype",Palatino,"Book Antiqua",Georgia,"Times New Roman",serif;
--ff-mono:CaronSerif,"SFMono-Regular",ui-monospace,"SF Mono","Cascadia Mono","Segoe UI Mono",Consolas,"Liberation Mono",Menlo,monospace;
--ff-ipa:"Charis SIL","Doulos SIL","Gentium Plus","Segoe UI","SFMono-Regular",ui-monospace,Consolas,monospace;
--measure:62ch;
--grain:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
}
@font-face{font-family:CaronSerif;font-style:normal;font-weight:400;size-adjust:100%;
  src:local("Charis SIL"),local("Gentium Plus"),local("Cambria"),local("Segoe UI"),
      local("Lucida Sans Unicode"),local("Arial Unicode MS"),local("DejaVu Serif"),
      local("Noto Serif"),local("Times New Roman");
  unicode-range:U+01CD-01DC}
@font-face{font-family:CaronSerif;font-style:normal;font-weight:600;size-adjust:100%;
  src:local("Charis SIL Bold"),local("Gentium Plus"),local("Cambria Bold"),local("Segoe UI Semibold"),
      local("Lucida Sans Unicode"),local("Arial Unicode MS"),local("DejaVu Serif Bold"),
      local("Noto Serif"),local("Times New Roman Bold");
  unicode-range:U+01CD-01DC}
@media (prefers-contrast:more){:root{--gold-dim:#b08a58;--t-ghost:#9d998f;--t-meta:#a29d94;--cold:.34;--hair-1:rgba(233,229,220,.24);--hair-2:rgba(233,229,220,.15)}}
@media (max-width:640px){:root{--measure:100%}}
"""

CSS_BASE = u"""
*,*::before,*::after{box-sizing:border-box}
html{
  font-family:var(--ff-serif);font-size:100%;font-synthesis:none;
  -webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;
  -webkit-text-size-adjust:100%;text-rendering:optimizeLegibility;
  background-color:var(--ground);
  scroll-snap-type:none;
  /* SNAP IS OFF.  R4, measured, 40 real gestures per condition at ten seats:
     with `y proximity` a flick asked for 240px and the page delivered 0 on 10 of
     40 gestures and under half on 19 - it rose 235px and then handed every pixel
     back over nine frames, 136ms AFTER the hand had stopped.  373 frames ran
     backwards, 5,246px of them.  Snap costs no frames at all (a clean 16.7ms in
     both conditions); what it costs is 136ms of unrequested motion after 100% of
     gestures, which is exactly what "jarring" and "annoying" look like from a
     chair.  Worse, the snap AREA (802px wall + 66px scroll-margin-top) exceeds
     the snapport, so every wall admitted a SECOND valid rest 68px past its seat,
     with the plate numeral already off the top edge - half the places snap
     actively dragged you to were a decapitated composition.
     What is NOT lost: the one-wall-per-screen reading is structural (every wall
     is min-height:100svh with its own air), and the correct seat is delivered by
     scroll-margin-top below, which scrollIntoView honours on its own.  So the
     composition is now AUTHORED - by the tick rail, the deep links and the
     keyboard - instead of imposed at random +/-240px by the browser.
     The old behaviour is one query away: ?snap=on, persisted and reflected in
     the URL like the other switches. */
  /* NO scroll-padding-top: the walls carry scroll-margin-top, and the two ADD -
     every anchor jump was landing 132px down instead of 66, which cost the room
     a whole rank and pushed the last row of the I Ching square into the water. */
  scroll-padding-bottom:calc(var(--tide) + 32px);
  scrollbar-width:thin;scrollbar-color:#1c1915 transparent;
}
html.snap-on{scroll-snap-type:y proximity}
/* and these still win over the hatch, because they come after it at equal
   specificity: while a plate is up, and for the frame in which a mark is being
   placed, the room does not snap even for someone who asked for snap. */
html.is-reading,html.no-snap{scroll-snap-type:none}
/* THE KEY LIGHT.  A real fixed element, never background-attachment:fixed - a
   fixed-attachment ROOT background cannot be composited-scrolled, so Chrome
   repaints the whole viewport on every scroll frame.  Measured: 424 raster tasks
   and 3.58 Gpx of paint area per 60-frame scroll, against 59 and 1.83 Gpx here.
   Those tasks compete for the same threads as the parent's 60fps line. */
.keylight{position:fixed;inset:0;z-index:-2;pointer-events:none;
  background:radial-gradient(130% 90% at 50% -8%,var(--key-light) 0%,var(--ground) 62%,var(--ground) 100%)}
body{margin:0;background:none;color:var(--t-body);line-height:1.62;min-height:100svh}
h1,h2,h3,h4,p,ul,ol,li,figure,blockquote{margin:0;padding:0}
ul,ol{list-style:none}
b,strong{font-weight:600}
i,em{font-style:italic}
a{color:inherit;text-decoration:none}
img{max-width:100%;height:auto;display:block}
button,input,select,textarea{font:inherit;color:inherit;letter-spacing:inherit;background:none;border:0;margin:0;padding:0;border-radius:0}
button{cursor:pointer;text-align:inherit}
input[type=search]{-webkit-appearance:none;appearance:none}
input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-cancel-button{-webkit-appearance:none;display:none}
::selection{background:var(--sel-bg);color:var(--t-display)}
::-webkit-scrollbar{width:8px;height:8px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:#1c1915;border-radius:8px}
::-webkit-scrollbar-thumb:hover{background:#241f1a}
.sprite{position:absolute;width:0;height:0;overflow:hidden}
.mono{font-family:var(--ff-mono);font-variant-numeric:lining-nums tabular-nums;font-feature-settings:"lnum" 1,"tnum" 1}
.msr{max-width:var(--measure);min-width:0}
.u-vh{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0}
:where(a,button,input,summary,[tabindex]):focus-visible{outline:1px solid var(--focus);outline-offset:2px;border-radius:2px}
:where(a,button,input,summary,[tabindex]):focus:not(:focus-visible){outline:none}
.skip{position:fixed;left:10px;top:-60px;z-index:30;padding:10px 15px;background:var(--ink-lintel);color:var(--t-display);border:1px solid var(--gold-dim);border-radius:4px;font-family:var(--ff-mono);font-size:10px;letter-spacing:.16em;text-transform:uppercase;transition:top var(--dur-step) ease}
.skip:focus{top:9px}

/* drawn glyphs - one optical weight, never pure white */
.fig{fill:none;stroke:currentColor;stroke-width:1.15;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke;flex:0 0 auto}
.sym{font-family:var(--ff-mono);font-synthesis:none;letter-spacing:0;line-height:1}
@supports (font-variant-emoji:text){.sym{font-variant-emoji:text}}

/* trigram / hexagram bars - the strokes themselves, exact and free */
.bars{display:grid;gap:3px;width:22px}
.bars i{display:block;height:2px;background:currentColor}
.bars i.n{background:linear-gradient(90deg,currentColor 0 37%,transparent 37% 63%,currentColor 63% 100%)}
.bars--hx{gap:2.4px;width:24px}
.bars--hx i{height:1.8px}
.bars--tr{width:30px;gap:4px}
.bars--tr i{height:2.4px}
"""

# ============================================================ CSS 2 / THE LINTEL
CSS_LINTEL = u"""
/* THE LINTEL.  52px at every width and in every state.  One row.  Never wraps.
   OPAQUE, and NO backdrop-filter - it is the node the parent measures every frame,
   and the containing-block bug that broke the movable search bars. */
.stickybar{
  position:sticky;top:0;z-index:12;
  height:var(--bar-h);min-height:var(--bar-h);max-height:var(--bar-h);
  display:flex;align-items:center;gap:clamp(8px,1.5vw,16px);
  padding:0 clamp(11px,2vw,22px);
  padding-left:max(11px,env(safe-area-inset-left));
  padding-right:max(11px,env(safe-area-inset-right));
  background:linear-gradient(180deg,rgba(233,229,220,.030) 0,rgba(233,229,220,0) 22px),var(--ink-lintel);
  overflow:visible;
  transition:opacity var(--dur-lit) ease;
}
.stickybar::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;
  background:linear-gradient(90deg,var(--hair-0),var(--hair-2) 10%,var(--hair-2) 90%,var(--hair-0));}
/* opacity on .stickybar itself would blend the WHOLE bar into one 42% layer -
   the live instruments would still paint at 42% even set to opacity:1 inside it,
   because a parent's opacity composites its entire subtree as one group.  So the
   recession is scoped to the wayfinding children only; the search and dictionary
   are left at full strength. */
body.is-reading .stickybar>.back,body.is-reading .stickybar>.slug,
body.is-reading .stickybar>.ticks{opacity:.42}
body.is-reading .stickybar .seek{opacity:1}

.back{flex:0 0 auto;display:flex;align-items:center;justify-content:flex-start;gap:7px;white-space:nowrap;
  font-family:var(--ff-mono);font-size:10px;line-height:1;letter-spacing:.16em;text-transform:uppercase;
  color:var(--t-meta);transition:color var(--dur-step) ease}
.back:hover,.back:focus-visible{color:var(--t-display)}

.slug{flex:0 1 auto;width:clamp(150px,30ch,320px);min-width:0;display:flex;align-items:center;gap:9px;overflow:hidden;
  contain:layout}
.slug.has-label{width:clamp(150px,40ch,400px)}
.slug__t{flex:1 1 auto;min-width:0;font-family:var(--ff-mono);font-size:10px;line-height:1;
  letter-spacing:.13em;text-transform:uppercase;
  color:var(--t-meta);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  font-variant-numeric:lining-nums tabular-nums}
.slug__x{flex:0 0 auto;white-space:nowrap;font-family:var(--ff-mono);font-size:9.5px;line-height:1;letter-spacing:.14em;
  text-transform:uppercase;color:var(--gold-dim);transition:color var(--dur-step) ease}
.slug__x:hover,.slug__x:focus-visible{color:var(--gold)}
.slug__x[hidden]{display:none}

.ticks{flex:0 0 auto;display:flex;align-items:stretch;gap:0;margin-left:auto;height:100%;
  overflow-x:auto;overscroll-behavior-x:contain;scrollbar-width:none}
.ticks::-webkit-scrollbar{display:none}
.tick{flex:0 0 auto;position:relative;display:flex;align-items:center;justify-content:center;height:100%;
  padding:0 clamp(4px,.6vw,8px);
  font-family:var(--ff-mono);font-size:9.5px;line-height:1;letter-spacing:.1em;
  color:var(--t-ghost);white-space:nowrap;transition:color var(--dur-step) ease,opacity var(--dur-step) ease}
.tick:hover,.tick:focus-visible{color:var(--t-meta);outline:none}
.tick:focus-visible .tick__r{text-decoration:underline;text-underline-offset:4px}
.tick.is-here{color:var(--gold)}
/* the hit count rides the numeral as a subscript, in the printed rubric - the bar
   is ONE storey the instant you type, and full gold stays the current tick alone */
.tick__n{display:none;position:relative;top:3px;margin-left:2px;
  font-size:8px;line-height:1;letter-spacing:.02em;color:var(--gold-dim);
  font-variant-numeric:lining-nums tabular-nums;contain:layout style}
html.is-searching .tick__n{display:inline}
html.is-searching .tick.is-cold{opacity:.30}

.seek{flex:1 1 auto;display:flex;align-items:center;gap:14px;justify-content:flex-end;min-width:0;position:relative}
/* no capsule, no fill, no inner shadow: a field is a rule with words on it, in the
   same hairline family as every other rule on the page.  Exactly one element in
   this document carries object-depth, and it is the vessel. */
.search{min-width:0;height:30px;box-sizing:border-box;background:none;
  border:0;border-bottom:1px solid var(--hair-1);border-radius:0;box-shadow:none;
  color:var(--t-display);caret-color:var(--caret);
  font-family:var(--ff-mono);font-size:12px;line-height:1.2;letter-spacing:.06em;
  padding:0 26px 0 2px;outline:none;transition:border-color var(--dur-step) ease}
.search::placeholder{color:var(--t-body);opacity:1}
.search:focus{border-bottom-color:var(--gold-dim)}
#q:-webkit-autofill,#dq:-webkit-autofill{-webkit-text-fill-color:var(--t-display);-webkit-box-shadow:0 0 0 40px var(--ground) inset;caret-color:var(--caret)}
/* BR-S274 - THE FIELD SAYS WHAT IT IS.  The builder: "search bar too dim, maybe
   add something it's easy to spot and understand."  Two answers, both inside the
   existing grammar - no capsule, no fill, no shadow; the vessel keeps its monopoly
   on depth.  (a) the rule and the words on it move off the two dimmest tokens on
   the page: hair-2 (.08 alpha) -> hair-1 (.14), placeholder t-meta -> t-body.
   Both are tokens this sheet already ships, so prefers-contrast:more still lifts
   them and the print sheet still inverts them.  (b) a magnifier, drawn in strokes
   like every other symbol here - no emoji, no <img>, no data URI.  A magnifier
   needs no theory to read, which is the whole test.  The wrapper mirrors .dict,
   the one element in this bar already proven to carry a field plus a mark. */
.qfield{position:relative;flex:1 1 240px;max-width:400px;min-width:0;display:flex;align-items:center}
#q{flex:1 1 auto;width:100%;min-width:0;padding-left:26px}
.qmark{position:absolute;left:3px;top:50%;margin-top:-7px;width:14px;height:14px;
  pointer-events:none;color:var(--t-meta);transition:color var(--dur-step) ease}
.qmark svg{display:block;width:100%;height:100%}
.qfield:focus-within .qmark{color:var(--gold)}
.dict{position:relative;flex:0 1 244px;min-width:0}
.search--dict{width:100%}
.dtoggle{display:none}
/* R3 - THE SHOT.  A hairline ring, not the old filled circle: exactly one object
   in this document carries depth and it is the vessel.  26px clears the page's
   own 24px hit floor (the same floor the ticks are held to on a phone).
   IT IS NOT SHOWN ON THE FIRST PLATE.  Restraint over density - a control whose
   act is already done is furniture, and this bar has ten ticks, a slug, a way
   home and two live instruments in 52px already.  body.past-first is written by
   the scroll-spy that was already running (setWall), so this costs no scroll
   listener, no observer and no geometry read: the button appears the moment the
   room you are reading is no longer the first one, about half a screen down.
   visibility, not display: the box keeps its place, so the rail never jumps
   sideways when it arrives - and visibility:hidden takes it out of the tab order
   and out of the accessibility tree, which display-toggling would have to do by
   hand and would get wrong. */
.totop{flex:0 0 auto;width:26px;height:26px;display:grid;place-items:center;
  padding:0;background:none;border:1px solid var(--hair-2);border-radius:50%;
  color:var(--t-ghost);font-family:var(--ff-mono);font-size:12px;line-height:1;
  visibility:hidden;opacity:0;
  transition:color var(--dur-step) ease,border-color var(--dur-step) ease,
             opacity var(--dur-lit) ease,visibility var(--dur-lit) ease}
body.past-first .totop{visibility:visible;opacity:1}
.totop:hover,.totop:focus-visible{color:var(--gold);border-color:var(--gold-dim);outline:none}
.totop:focus-visible{box-shadow:0 0 0 1px var(--gold-dim)}
/* it recedes with the other wayfinding while a record is up, and goes inert with
   it - the two live instruments are the only things that stay at full strength.
   .seek's own opacity:1 above it is a no-op group, so this still lands. */
body.is-reading .stickybar .totop{opacity:.42}
.sr{position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap}
"""


# ============================================================ CSS 3 / THE WALLS
CSS_WALLS = u"""
/* Nothing follows the last wall but water.  The run-out is load-bearing as well
   as compositional: without it the page cannot scroll far enough to lift the
   lexicon's own last mark clear of the plate it raises, and the Ember - the
   other half of the reading state - would sit behind its own record. */
main{display:block;padding-bottom:calc(var(--tide-safe) + 72vh);
  padding-bottom:calc(var(--tide-safe) + 72svh)}
.wall{
  position:relative;min-height:100vh;min-height:100svh;
  padding:0 var(--wall-pad) var(--tide-safe);
  display:flex;flex-direction:column;
  /* KEPT, and inert: with scroll-snap-type:none on the root this declares an
     alignment nobody reads.  It is the whole of what ?snap=on turns back on, so
     it stays where it is rather than being reconstructed by a second rule. */
  scroll-snap-align:start;
  /* LOAD-BEARING, and the reason snap could go.  This 66px IS the seat: every
     correct rest position measured on this page was wallTop-66, and scrollIntoView,
     the tick rail, the deep links and the keyboard stepper all honour it without
     any help from snap. */
  scroll-margin-top:calc(var(--bar-h) + 14px);
  background-image:var(--grain);background-repeat:repeat;background-size:160px 160px;
}
/* CORRECTED 2026-07-26 (round two, o03 #87): this calc reads as the fix for the
   62px-per-skipped-wall drift that threw #iching's deep link onto the trigrams,
   but it is not load-bearing.  .wall (above) already floors every wall - skipped
   or not - at min-height:100vh/100svh, a hard constraint content-visibility:auto
   must still honour; the calc below always resolves SMALLER than that floor
   (100v/svh minus --tide-safe), so min-height wins every time and this
   contain-intrinsic-size never actually sets the placeholder height.  The real
   fix was the min-height floor.  Left in place - a future value here that
   exceeds 100vh would matter - but read it as dormant, not as the mechanism. */
.wall:not(.wall--prose){content-visibility:auto;
  contain-intrinsic-size:100vw calc(100vh - var(--tide-safe));
  contain-intrinsic-size:100vw calc(100svh - var(--tide-safe))}
/* The room goes dark under ONE scrim (#dim), not by dimming ten walls: an opacity
   transition on ten sections - one of them the whole Antechamber - cost 10.9ms of
   main-thread work per open, charged to the frame that draws the line.  The lit
   wall only drops CONTAINMENT, so the single Ember cell can paint above the scrim. */
body.is-reading .wall.is-lit{content-visibility:visible}
.alias{display:block;height:0;overflow:hidden;scroll-margin-top:calc(var(--bar-h) + 14px)}

/* ONE COLUMN.  Plate numeral, title, rule, furniture line and the mark field all
   share a single measure and a single left edge, centred in the viewport - so a
   wall reads as composed rather than pushed against the left margin at 2560. */
.wl-head,.wl-field{width:min(var(--wallw),100%);margin-inline:auto}
.wl-head{position:relative;flex:0 0 auto;padding:var(--head-pad) 0 0;z-index:1}
.wl-plate{position:relative;display:inline-block;font-family:var(--ff-mono);font-size:9px;line-height:1;
  letter-spacing:.28em;text-transform:uppercase;color:var(--gold-dim);
  transition:color var(--dur-step) ease}
.wl-plate:hover,.wl-plate:focus-visible{color:var(--gold)}
.wl-title{position:relative;margin:13px 0 0;font-size:26px;font-weight:600;line-height:1.2;
  letter-spacing:-.005em;color:var(--t-display);max-width:26ch;
  font-variant-numeric:lining-nums proportional-nums}
/* the watermark is the plate's own catalogue key, set clear of every line of type
   in the top-right of the column - it pre-teaches the address the vessel then
   carries on its shoulder.  It never prints through the title. */
.wl-ord{position:absolute;right:0;top:-.06em;pointer-events:none;user-select:none;
  font-family:var(--ff-mono);font-size:clamp(56px,8vw,104px);font-weight:400;line-height:1;
  letter-spacing:.02em;color:var(--ghost-ord)}
.wl-rule{position:relative;height:1px;margin:14px 0 0;max-width:min(560px,72vw);
  background:linear-gradient(90deg,var(--hair-0),var(--hair-1) 4%,var(--hair-1) 88%,var(--hair-0))}
.wl-rule::after{content:"";position:absolute;inset:0;opacity:0;transition:opacity var(--dur-step) ease;
  background:linear-gradient(90deg,var(--gold-fade),var(--gold) 4%,var(--gold) 88%,var(--gold-fade))}
/* MEASURED AND LEFT ALONE (R4/S1).  This looks like the classic invalidation
   trap - a descendant selector rooted at a state class, so that toggling
   `is-here` should mean "walk the whole wall looking for .wl-rule", twice per
   boundary crossing, on the same frame the wall unlocks and the parent draws
   its line.  It is not.  Counted out of the trace, one toggle at a time:
   `is-here` on a wall re-styles SIX elements, and body's `on-prose` re-styles
   ONE.  Chrome resolves these invalidation sets precisely; rewriting them as
   `.wall.is-here>.wl-head>.wl-rule::after` changed the count by nothing and the
   timing by nothing (3,300us before, 3,700us after, on a 100us control - i.e.
   noise, and the 3ms is the forced layout, not the style walk).  Reverted.
   This also retires the standing suspicion that the body-class flip in setWall()
   is what costs the Antechamber its exit frame.  One element is not a cost. */
.wall.is-here .wl-rule::after{opacity:1}
.wl-furn{margin:11px 0 0;font-family:var(--ff-mono);font-size:9px;line-height:1.5;
  letter-spacing:.2em;text-transform:uppercase;color:var(--t-meta);max-width:110ch}
/* the field does NOT stretch.  A flex:1 field centred its marks in whatever height
   was left, which walked the last rows of walls V-X straight under the waterline.
   It is exactly THE ROOM tall - the budget that already guarantees dry land - and
   the marks sit in the middle of it.  A block can therefore never end lower than
   field-top + room, which is the same guarantee as before; what it fixes is walls
   V, III and X, whose short blocks left 300-480px of dead floor under them. */
.wl-field{flex:0 0 auto;display:flex;align-items:safe center;justify-content:flex-start;
  padding:var(--field-pt) 0 var(--field-pb);min-height:0;
  height:var(--room);max-height:var(--room)}

/* ---- a mark is a stroke on a wall.  no box, ever. ---- */
.marks{display:grid;margin:0;padding:0}
.cell{position:relative;grid-area:var(--gr) / var(--gc);min-width:0}
.mark{position:relative;display:grid;place-items:center;width:100%;padding:6px 2px;
  background:none;border:0;border-radius:0;box-shadow:none;text-shadow:none;
  color:var(--t-meta);transition:color var(--dur-step) ease,opacity var(--dur-step) ease}
.mark *{background:none;border:0;border-radius:0;box-shadow:none;text-shadow:none}
.mk-in{position:relative;display:inline-grid;justify-items:center;gap:6px}
.mk-in::after{content:"";position:absolute;left:0;right:0;bottom:-4px;height:1px;
  background:var(--gold);opacity:0;transition:opacity var(--dur-step) ease}
/* THE EMBER.  On a drawn figure it is a ring that hugs the mark; on a text-only
   mark a ring became a filled gold pill - a chip, the one shape this page killed
   everywhere else - so there it is the page's own vocabulary instead: a full-gold
   rule under the name and a soft glow on the letters. */
.mk-in::before{content:"";position:absolute;inset:-7px -11px;border-radius:3px;
  pointer-events:none;opacity:0;transition:opacity var(--dur-ember) ease;
  box-shadow:0 0 0 1px var(--gold),0 0 7px var(--gold-glow)}
.mk-n{font-family:var(--ff-mono);font-size:10px;line-height:1.3;letter-spacing:.16em;
  text-transform:uppercase;max-width:18ch;text-align:center;overflow-wrap:break-word}
.mk-micro{font-family:var(--ff-mono);font-size:8px;line-height:1;letter-spacing:.2em;
  text-transform:uppercase;color:var(--t-ghost)}
.mk-num{font-family:var(--ff-mono);font-size:8.5px;line-height:1;letter-spacing:.12em;
  color:var(--t-meta);font-variant-numeric:lining-nums tabular-nums}
/* the card's own numeral, in the same sand as wall IX's King Wen numbers.  In
   gold-dim it was twenty-two warm marks on one wall - the only wall on the page
   that read as a different colour, and the systems differ by geometry, never hue. */
.mk-over{font-family:var(--ff-mono);font-size:9px;line-height:1;letter-spacing:.18em;
  color:var(--t-ghost);font-variant-numeric:lining-nums tabular-nums}
.mark:hover,.mark:focus-visible{color:var(--t-display);outline:none}
.mark:focus-visible .mk-in::before{opacity:1;box-shadow:0 0 0 1px var(--focus)}
.mark.is-hit{color:var(--t-display)}
.mark.is-hit .mk-in::after{opacity:1}
.mark.is-cold{opacity:var(--cold)}
.mark.is-cold:focus-visible,.mark.is-cold:focus-within{opacity:1}
/* z-index 7 clears BOTH the scrim (4) and the page's own shallows (6): at 1280x720
   the shallows painted 97% ink straight over the one cell the reading state is
   built around.  .tide (9) still occludes it, which is correct - it is water. */
.mark.is-ember{position:relative;z-index:7;color:var(--t-display);opacity:1}
.mark.is-ember .mk-in::before{opacity:1}
.mark.is-ember .mk-in::after{opacity:0}
.mark.is-ember--flat .mk-in::before{box-shadow:none}
.mark.is-ember--flat .mk-in{text-shadow:0 0 9px var(--gold-glow)}
.mark.is-ember--flat .mk-in::after{opacity:1;height:1px;bottom:-5px;
  box-shadow:0 0 6px var(--gold-glow)}
.mark .fig{width:24px;height:24px}
/* THE HIDDEN BODY.  Zero height, clipped, out of flow so no grid ever sees it -
   but at a REAL measure.  It was width:1px, which wrapped every meaning at every
   word: 2,635px of never-painted line boxes per entry, 585,077px across the
   document, re-laid out on every resize inside the frame the parent measures. */
.mark__body{position:absolute;left:0;top:0;width:62ch;height:0;overflow:hidden;margin:0;
  pointer-events:none}

/* axis + zone furniture */
.axis{font-family:var(--ff-mono);font-size:9px;line-height:1.3;letter-spacing:.22em;
  text-transform:uppercase;color:var(--t-meta);white-space:nowrap;
  display:flex;align-items:center;gap:7px;background:none;border:0}
.axis--row{justify-content:flex-end;padding-right:clamp(10px,1.6vw,20px);text-align:right}
.axis--col{flex-direction:column;justify-content:flex-end;align-items:center;gap:5px}
/* A HEADING BELONGS TO WHAT IS UNDER IT.  A zone label and a column head are grid
   items, so the wall's row gap fell BOTH above and below them: every heading sat
   80-127px clear of its own group and only 30px under the furniture line, reading
   as attached to the wrong thing.  The pull is a matched pair - margin down, the
   same amount back off the bottom - so the row keeps its height exactly and only
   the label moves, down onto the marks it names. */
.zone,.axis--col{
  --gpull:max(0px,min(calc(var(--rowgap,0px) * .62),calc(var(--rowgap,0px) - 14px)));
  margin-top:var(--gpull);margin-bottom:calc(0px - var(--gpull))}
.axis__f{width:19px;height:19px;opacity:.8}
.axis__s{font-size:8px;letter-spacing:.18em;color:var(--t-ghost)}
.axis--live{position:relative;transition:color var(--dur-step) ease}
.axis--live:hover,.axis--live:focus-visible,.axis--live.is-ember{color:var(--gold);outline:none}
/* a zone heading and a mark were both 10px mono uppercase in near-identical sand:
   on wall X you could not tell "THE PIVOT" (furniture) from "METRICS" (an entry).
   They are separated by REGISTER, not by contrast - smaller, wider, quieter. */
.zone{grid-column:1/-1;font-family:var(--ff-mono);font-size:8px;line-height:1.4;
  letter-spacing:.34em;text-transform:uppercase;color:var(--t-ghost)}
.zone--gap{margin-top:calc(var(--gpull) + clamp(18px,3.2vh,34px))}
.seam{grid-column:1/-1;height:1px;margin:clamp(12px,2.2vh,22px) 0;
  background:linear-gradient(90deg,var(--hair-0),var(--hair-3) 8%,var(--hair-3) 92%,var(--hair-0))}

/* ---- I - the dignities table: 3 modalities x 4 elements ---- */
#western .marks{grid-template-columns:max-content repeat(3,minmax(0,1fr));
  --rowgap:clamp(14px,calc((var(--room) - 250px)/4),84px);
  gap:var(--rowgap) clamp(14px,3.4vw,54px);
  width:100%;align-items:center}
/* ---- II - twelve animals in a 6x2, the five elements as a rank beneath ---- */
#chinese .marks{grid-template-columns:repeat(6,minmax(0,1fr));
  --rowgap:clamp(12px,calc((var(--room) - 240px)/4),60px);
  gap:var(--rowgap) clamp(10px,2vw,26px);
  flex:1 1 auto;min-width:0}
/* ---- III - 1 to 9 as a square, the masters as a rank below the seam ---- */
/* C2.  The tracks were 110px wide and the whole block 434px, so twelve marks sat
   in the left third of an 1100px column with 666px of dark to the right of them -
   the thinnest wall in the set by mark count and the emptiest by area.  The tracks
   now take the wall's own measure, and the mark is set to the START of its track
   rather than the middle: the numerals land on x = the plate numeral, the title,
   the rule and the zone label, so widening the wall TIGHTENS the shared left edge
   instead of breaking it.  (Wall X, the other bare-word wall, is already set this
   way - III and X are the two whose marks are a numeral and a noun.) */
#numerology .marks{grid-template-columns:repeat(3,minmax(0,1fr));width:100%;
  --rowgap:clamp(12px,calc((var(--room) - 300px)/6),46px);
  gap:var(--rowgap) clamp(20px,3.4vw,52px);justify-content:start}
#numerology .mark{place-items:center start}
/* the entry's whole name IS its numeral, so on this wall the numeral is the
   figure - set at the optical weight of a zodiac glyph or a rune stave, not as a
   9px caption.  Twelve mono digits in a dark room read as a page that failed. */
/* colour is NOT the differentiator - every mark on every wall carries the same
   ink, so hover and a search hit light them all the same way.  Size is. */
#numerology .mk-n{font-family:var(--ff-serif);font-size:clamp(27px,3.2vw,36px);
  line-height:1;letter-spacing:0;max-width:none;
  font-variant-numeric:lining-nums proportional-nums}
#numerology .mk-in{gap:9px;justify-items:start}
/* ---- V - the procession, 11 x 2 ---- */
#tarot-major .marks{grid-template-columns:repeat(11,minmax(0,1fr));
  /* nought to twenty-one is ONE procession.  Stretched to fill the room the two
     ranks read as two unrelated rows of eleven; they hold together as a band, and
     the room's slack falls above and below them instead of between them. */
  --rowgap:clamp(20px,calc((var(--room) - 150px)/4),110px);
  gap:var(--rowgap) clamp(4px,.9vw,14px);width:100%}
/* ---- VI - four suit columns x fourteen rank rows.  ONE screen, at every height:
   the row pitch is a share of the room, never a fixed number of pixels. ---- */
#tarot-minor .marks{grid-template-columns:repeat(4,minmax(0,220px));
  --rowh:clamp(17px,calc((var(--room) - 70px)/14),30px);
  /* row 1 is the suit head and sizes to its own pip; only the fourteen RANK rows
     take the pitch, or the head is squeezed to 30px and rides up into the
     furniture line */
  grid-template-rows:max-content;grid-auto-rows:var(--rowh);
  gap:0 clamp(10px,2.4vw,40px);justify-content:start;width:100%}
#tarot-minor .mark{padding:0;height:100%}
#tarot-minor .axis--col{padding-bottom:12px}
/* the rank keeps a track of its own - one KNIGHT wide - so the pips beside them
   land on ONE vertical line per suit instead of stepping in and out with the
   length of the word.  Ragged, 56 of them read as noise; aligned, they read as
   the column's own rail, and the rank sits exactly where it always sat. */
#tarot-minor .mk-n{font-size:9.5px;letter-spacing:.2em;white-space:nowrap;max-width:none;
  min-width:8ch;text-align:center}
/* THE PIP.  It rides BESIDE the rank, not above it - a 30px row has no second
   line to give - and it is deliberately under-powered: at full ink 56 of them in
   four columns is a pattern, and a pattern on a wall of words is wallpaper, which
   is exactly what killed the last attempt.  Dim, it is a texture that resolves
   into a suit when you come close, and the rank stays the loudest thing.  It
   comes up with the cell that is hovered, searched or burning - the one place a
   reader is actually asking which suit this is. */
#tarot-minor .mk-in{grid-auto-flow:column;align-items:center;gap:7px}
#tarot-minor .pip{width:10px;height:10px;opacity:.42;
  transition:opacity var(--dur-step) ease}
#tarot-minor .mark:hover .pip,#tarot-minor .mark:focus-visible .pip,
#tarot-minor .mark.is-hit .pip,#tarot-minor .mark.is-ember .pip{opacity:.75}
#tarot-minor .cell--court{box-shadow:0 -1px 0 var(--hair-2)}
/* ---- VII - three aettir of eight ---- */
#runes .marks{grid-template-columns:repeat(8,minmax(0,1fr));
  --rowgap:clamp(14px,calc((var(--room) - 250px)/5),58px);
  gap:var(--rowgap) clamp(6px,1.6vw,22px);
  width:100%;align-items:center}
#runes .mark .fig{width:22px;height:22px}
/* ---- VIII - the family portrait: one father, three sons, three daughters, one
   mother.  The arrangement carries the relation; no sentence has to. ---- */
#trigrams .marks{grid-template-columns:max-content repeat(3,minmax(0,1fr));
  --rowgap:clamp(14px,calc((var(--room) - 280px)/3),78px);
  gap:var(--rowgap) clamp(10px,2.2vw,34px);
  width:100%;align-items:center}
/* ---- IX - the eight-by-eight square.  The pitch is the SMALLER of what the
   width allows and what the room above the water allows: nine rows (the live
   upper-trigram header plus eight) must land clear of the band at 1366x768 and
   the full square must fit across at 320. ---- */
#iching .marks{--railw:84px;--rail:max-content;
  grid-template-columns:var(--rail) repeat(8,var(--pitch));
  grid-auto-rows:var(--pitch);
  --pitch:min(clamp(38px,4.6vw,68px),
              calc((100vw - 2*var(--wall-pad) - var(--railw))/8),
              calc((var(--room) - 16px)/9));
  /* C2, REVERTED.  Centring the square was tried and taken back out.  The pitch
     caps at 68px, so past ~1000px of glass the field stops growing and the wall
     does carry dark space on its right - but centring bought that back by
     severing the square from its own left-set head, opening a 270px gap at 1440
     and 195px at 2560.  Two independent eyes read the head as stranded.  The
     shared left edge every other wall keeps is worth more than the balance. */
  justify-content:start;width:100%;gap:0}
#iching .mark{padding:0;height:100%}
#iching .mk-in{gap:5px}
#iching .axis--col{padding-bottom:9px;font-size:8px;letter-spacing:.14em}
#iching .axis--row{font-size:8px;letter-spacing:.14em;padding-right:11px}
/* ---- X - the front, the pivot, the back ---- */
#lexicon .marks{grid-template-columns:repeat(4,minmax(0,1fr));
  --rowgap:clamp(10px,calc((var(--room) - 300px)/5),40px);
  gap:var(--rowgap) clamp(12px,2.4vw,32px);width:100%}
#lexicon .mark{justify-items:start;place-items:center start;padding:8px 0}
/* seven marks, and they are the house's own instruments - the one wall where the
   NAME is the whole figure.  At 10px/18ch they were captions that wrapped mid
   phrase ("THE DEVELOPED / BACK") and read as quietly as the furniture. */
#lexicon .mk-n{text-align:left;font-size:12px;letter-spacing:.13em;max-width:24ch}
#lexicon .mk-in{justify-items:start;gap:7px}
/* C1.  The sub-label here is a PHRASE, not a code, so it is set as one: the bank's
   own lower case, no tracking, one size up from the 8px micro.  Tracked capitals
   put a third rank of mono shouting under the zone head and the name and read as
   another label; lower case is the same ink saying "this is the annotation". */
#lexicon .mk-micro{text-align:left;text-transform:none;letter-spacing:.04em;font-size:9px}

/* THE ONE TIPPED-IN PLATE.  No runtime filter: the treatment is baked into the
   asset, which is also why it is 8 KB instead of 1.4 MB.  It sits IN the field,
   beside the marks it serves - a watermark on the wall, not a second object with
   a frame around it floating in a corner. */
"""
# ...and it is only styled when it exists.  With SHOW_SYSTEM_IMAGE off there is no
# <img> in the document, so these four rules dressed a node that is never built -
# 330 bytes of a 400 KB budget spent on furniture for an absent object.  The
# switch still works: turn it on and its dressing comes back with it.
CSS_WALLS += (u"""
.wl-plateimg{flex:0 0 auto;align-self:center;margin-left:clamp(18px,3.4vw,52px);
  width:clamp(112px,13vw,168px);opacity:.8}
@media (max-width:900px){.wl-plateimg{display:none}}
""" if SHOW_SYSTEM_IMAGE else u'')

# ============================================================ CSS 4 / THE ANTECHAMBER
CSS_GUIDE = u"""
/* The one wall that is read continuously.  It must NOT dissolve at the bottom of
   every screenful, so the shallows are suppressed over it and the column simply
   ends well above the water.  Prose reaches full ink before it leaves the frame. */
.wall--prose .wl-field{display:block;height:auto;max-height:none;padding-top:clamp(22px,4vh,44px);
  padding-bottom:calc(var(--tide) + 13vh)}
.ante{display:grid;grid-template-columns:152px minmax(0,var(--measure));
  gap:clamp(20px,4vw,58px);justify-content:start;max-width:100%}
.ante__rail{position:sticky;top:calc(var(--bar-h) + 26px);align-self:start;
  display:flex;flex-direction:column;gap:11px;max-height:70svh;padding-top:9px}
.g-tick{position:relative;display:grid;gap:2px;color:var(--t-ghost);transition:color var(--dur-step) ease}
.g-tick b{font-family:var(--ff-mono);font-size:8.5px;line-height:1;letter-spacing:.22em;
  color:var(--gold-dim);font-weight:400}
.g-tick span{font-size:11.5px;line-height:1.35}
.g-tick:hover,.g-tick:focus-visible{color:var(--t-display);outline:none}
.g-tick:focus-visible b{text-decoration:underline}/*replaces the killed outline*/
.g-tick.is-here{color:var(--gold)}
.g-intro{font-style:italic;font-size:21px;line-height:1.66;color:var(--t-primary);
  max-width:var(--measure);margin:0 0 clamp(26px,4.4vh,48px)}
/* DELIBERATELY NOT content-visibility:auto.  Skipping these eight sections would
   spare a flush some prose, but their placeholder height is a guess, and the
   Antechamber sits fifth of ten: every guess is a permanent scroll error for the
   six walls below it, so #iching landed on the trigrams.  A correct deep link is
   worth more than a contained paragraph.  contain:layout keeps the wall's
   internal reflow from escaping, which was the real cost. */
.g-sec{scroll-margin-top:calc(var(--bar-h) + 22px);padding-top:26px;transition:opacity var(--dur-step) ease;
  contain:layout style}
.g-sec + .g-sec{margin-top:26px;box-shadow:0 -1px 0 var(--hair-3)}
.g-sec.is-cold{opacity:.26}
.g-addr{display:block;font-family:var(--ff-mono);font-size:9px;line-height:1;letter-spacing:.28em;
  text-transform:uppercase;color:var(--gold-dim);margin-bottom:9px}
.g-head{font-size:21px;font-weight:600;line-height:1.2;letter-spacing:-.005em;
  color:var(--t-display);margin:0 0 13px;max-width:var(--measure)}
.g-sec.is-hit .g-head{box-shadow:0 1px 0 var(--gold)}
.g-sec p{font-size:16.5px;line-height:1.72;color:var(--t-body);max-width:var(--measure);margin:0 0 14px}
.g-sec p:last-child{margin-bottom:0}
.g-sec strong{font-weight:600;color:var(--t-display)}
.g-sec em{font-style:italic;color:var(--t-primary)}
.suit-grid,.pos-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));
  gap:clamp(14px,2.4vw,26px);margin:20px 0 22px}
.suit,.pos{border-left:1px solid var(--hair-3);padding-left:14px}
.suit-name,.pos-name{display:block;font-size:16px;font-weight:600;line-height:1.25;color:var(--t-display)}
.suit-el,.pos-role{display:block;font-family:var(--ff-mono);font-size:9.5px;line-height:1;
  letter-spacing:.18em;text-transform:uppercase;color:var(--gold-dim);margin:5px 0 9px}
.suit p,.pos p{font-size:14.5px;line-height:1.62;color:var(--t-body);max-width:34ch;margin:0}
.process-list{margin:18px 0 0;display:flex;flex-direction:column;gap:14px}
.process-list li{position:relative;padding-left:1.9ch;font-size:16px;line-height:1.7;
  color:var(--t-body);max-width:var(--measure)}
.process-list li::before{content:"\\00b7";position:absolute;left:0;top:0;
  font-family:var(--ff-mono);font-size:10px;color:var(--gold-dim)}
.process-list strong{font-weight:600;color:var(--t-display)}
.walk-draw{margin:20px 0;padding:16px 0;display:flex;flex-direction:column;gap:9px;
  border-top:1px solid var(--hair-3);border-bottom:1px solid var(--hair-3)}
.walk-draw p{margin:0;font-size:16.5px;line-height:1.45;color:var(--t-display);max-width:var(--measure)}
.walk-seat{display:inline-block;width:13ch;font-family:var(--ff-mono);font-size:9.5px;
  letter-spacing:.18em;text-transform:uppercase;color:var(--gold-dim);white-space:nowrap}
.walk-read p{font-size:16.5px;line-height:1.72;color:var(--t-body);max-width:var(--measure);margin:0 0 14px}
.walk-read strong{font-weight:600;color:var(--t-display)}
@media (max-width:860px){
  .ante{grid-template-columns:minmax(0,var(--measure))}
  /* S10: this used to hide the section WORD and wrap the bare codes onto
     several rows - eight filing codes (TG 01, TG 02...) with no name beside
     them is the archive addressing itself.  A sticky horizontal scroller
     keeps both the code and the word on one row, in reach at any scroll depth. */
  .ante__rail{position:sticky;top:var(--bar-h);flex-direction:row;flex-wrap:nowrap;
    overflow-x:auto;-webkit-overflow-scrolling:touch;gap:18px;max-height:none;
    margin-bottom:20px;padding:9px 4px 10px;z-index:1;background:var(--ground)}
  .g-tick{flex:0 0 auto;white-space:nowrap}
}
"""


# ============================================================ CSS 5 / THE FLOOR
# The composition stands IN the water; it does not stop above it.
# The parent app paints an opaque band over the bottom 4.5vh whose top row is
# #0b0b0d and whose base is #0a0b0d, and draws one living white line at 0.955H.
# .shore hands the page's warm ground to that cool ground on exactly that row.
CSS_FLOOR = u"""
.shore{position:fixed;left:0;right:0;bottom:0;height:calc(var(--tide) + var(--cool-run));
  z-index:-1;pointer-events:none;
  background:linear-gradient(180deg,
    rgba(11,11,13,0) 0,
    rgba(11,11,13,.30) 30%,
    rgba(11,11,13,.74) 56%,
    var(--shore) calc(100% - var(--tide)),
    var(--seafloor) 100%)}
.shallows{position:fixed;left:0;right:0;bottom:var(--tide);height:9vh;height:9svh;z-index:6;pointer-events:none;
  background:linear-gradient(180deg,rgba(11,11,13,0) 0%,rgba(11,11,13,.45) 46%,
    rgba(11,11,13,.82) 78%,rgba(10,11,13,.97) 100%)}
/* On the one wall read as continuous prose, a 9vh scrim dissolves a line of the
   argument on every screenful - but removing it outright is worse: the sentence
   then meets the opaque band mid-word.  So there the fade is short and late: the
   prose holds full ink almost to the line, and the last line submerges. */
body.on-prose .shallows{height:4.5vh;height:4.5svh}
/* 9% of a laptop is 72px of gradient; 9% of a phone standing up is 76px, and 9%
   of one lying down is 35px of scrim sitting directly on top of the last rank of
   marks.  On a short screen the fade stops being atmosphere and starts being a
   veil over the content, so below 700px of height it is a hairline of shading. */
@media (max-width:640px),(max-height:700px){
  .shallows{height:5.5vh;height:5.5svh}
}
/* THE GUARD.  Nothing below the waterline may be CLICKED either.  .tide is
   pointer-events:none and the parent's band is a different document, so without
   this a reader clicking 20px above the window bottom opens a record for a
   hexagram they cannot see.  It sits under .tide (9) and under the vessel (8). */
.tide-guard{position:fixed;left:0;right:0;bottom:0;height:var(--tide-safe);z-index:5;
  background:none}
/* the occluder.  In the frame the parent's band covers this exact rectangle;
   standalone this IS the floor.  Either way the vessel is pulled up THROUGH it. */
.tide{position:fixed;left:0;right:0;bottom:0;height:var(--tide);z-index:9;pointer-events:none;
  background:linear-gradient(180deg,var(--shore) 0%,var(--seafloor) 100%)}
html:not(.framed) .tide::before{content:"";position:absolute;left:0;right:0;top:0;height:1px;
  background:linear-gradient(90deg,var(--hair-0) 0,var(--hair-1) var(--tide-edge),
    var(--hair-1) calc(100% - var(--tide-edge)),var(--hair-0) 100%)}
/* THE FLOOR-LIGHT.  A sibling of the vessel, never a child of it: #lectern always
   carries a transform, which makes it the containing block for its own
   position:fixed descendants - the glow was landing INSIDE the plate, 100px above
   the water, and its z-index was inert.  It dies at the same x as the parent's
   white line (EDGE_FEATHER, verbatim). */
.floorlight{position:fixed;left:0;right:0;bottom:calc(var(--tide) - 4px);height:40px;
  z-index:8;pointer-events:none;opacity:0;transition:opacity var(--dur-scrim-in) ease;
  background:radial-gradient(130% 100% at 50% 100%,rgba(233,229,220,.075),rgba(233,229,220,0) 72%);
  -webkit-mask-image:linear-gradient(90deg,rgba(0,0,0,0) 0,#000 var(--tide-edge),#000 calc(100% - var(--tide-edge)),rgba(0,0,0,0) 100%);
  mask-image:linear-gradient(90deg,rgba(0,0,0,0) 0,#000 var(--tide-edge),#000 calc(100% - var(--tide-edge)),rgba(0,0,0,0) 100%)}
body.is-reading .floorlight{opacity:1}
"""

# ============================================================ CSS 6 / THE VESSEL
CSS_VESSEL = u"""
#dim{position:fixed;inset:0;background:var(--dim-bg);opacity:0;pointer-events:none;z-index:4;
  transition:opacity var(--dur-scrim-out) ease}
#dim.is-on{opacity:1;pointer-events:auto;transition:opacity var(--dur-scrim-in) ease}

#lectern{
  /* A3/C3 - WHERE THE PLATE'S FOOT STANDS.  --vx-rise is the whole toggle: 26px
     of clear air above the waterline (float, what ships today) or -10px, where
     the foot is genuinely submerged and the builder's line becomes a datum the
     reading surface is measured from rather than a residue below it.  The
     script's vesselTop() reads the same number from the same source - if one
     moves without the other, perch() puts the Ember behind the plate, which is
     exactly the 54px lie that buried twenty-four cells in landscape. */
  --vx-rise:26px;
  position:fixed;left:50%;bottom:calc(var(--tide) + var(--vx-rise));
  font-size:16.5px;line-height:1.62;color:var(--t-body);
  --vx-pad:34px;--vx-h:520px;
  width:min(calc(var(--measure) + 2 * var(--vx-pad)),92vw);
  /* THE FLOOR UNDER THE FLOOR.  min() alone let a starved viewport set the
     reading surface to whatever was left after the lintel, the water and the
     band had taken theirs - at 667x375 that was a plate with no body in it at
     all.  The reading surface has a minimum, and a screen too short to grant it
     gets a plate that stands INTO the band rather than a plate with nothing on
     it: the record is the point, the strip of air above it is the courtesy. */
  height:min(var(--vx-h),max(var(--vx-avail),240px));
  /* THE BAND.  The plate never takes the whole screen: a strip is always left
     clear above it, because the reading state's other half is the one lit cell
     on the wall behind, and on wall VI a full-height plate covered it always.
     It is a SHARE of the screen as well as a fixed strip - 84px of a 375px-tall
     landscape phone is 22% of the room spent on air. */
  --vx-band:min(84px,9vh);
  --vx-band:min(84px,9svh);
  --vx-avail:calc(100vh - var(--bar-h) - var(--tide) - 40px - var(--vx-band));
  --vx-avail:calc(100svh - var(--bar-h) - var(--tide) - 40px - var(--vx-band));
  /* 15, not 20, at the foot.  The longest Minor record missed fitting at
     1440x900 by FIVE pixels, and five pixels of overflow paint a 22px fade - the
     reference record on the reference viewport ended on a half-erased sentence.
     The band above the plate is the Ember's, and stays 84. */
  padding:26px var(--vx-pad) 15px;
  display:flex;flex-direction:column;
  transform:translate(-50%,100vh);visibility:hidden;z-index:8;
  border:1px solid var(--hair-1);border-radius:10px;
  background:linear-gradient(180deg,rgba(233,229,220,.024) 0,rgba(233,229,220,0) 65%),
    var(--grain),var(--ink-vessel);
  background-repeat:no-repeat,repeat,no-repeat;
  background-size:100% 100%,160px 160px,auto;
  box-shadow:var(--bevel),var(--mount);
  transition:transform var(--dur-vessel-in) var(--ease-bloom),visibility 0s var(--dur-vessel-in);
}
#lectern::before{content:"";position:absolute;inset:8px;border-radius:2px;pointer-events:none;
  box-shadow:inset 0 0 0 1px var(--hair-2)}
#lectern.is-up{transform:translate(-50%,0);visibility:visible;transition-delay:0s}
#lectern.is-down{transition:transform var(--dur-vessel-out) var(--ease-collapse),visibility 0s var(--dur-vessel-out)}

.vx-close{position:absolute;right:20px;top:17px;width:26px;height:26px;display:grid;place-items:center;
  font-family:var(--ff-mono);font-size:13px;line-height:1;color:var(--t-meta);
  transition:color var(--dur-step) ease}
.vx-close:hover,.vx-close:focus-visible{color:var(--t-display)}
.vx-top{display:flex;align-items:baseline;gap:10px;flex:none;padding-right:30px;min-width:0}
.vx-num{position:relative;font-family:var(--ff-mono);font-size:9px;line-height:1;letter-spacing:.28em;
  text-transform:uppercase;color:var(--gold-dim);white-space:nowrap;
  text-decoration:underline;text-decoration-color:rgba(154,123,76,.5);text-underline-offset:3px;
  font-variant-numeric:lining-nums tabular-nums;transition:color var(--dur-step) ease}
.vx-num:hover,.vx-num:focus-visible{color:var(--gold)}
/* S10: four small mono controls (axis header, plate door, rail tick, this
   catalogue link) print well under the 24x24 WCAG 2.5.8 floor.  One shared
   ::after grows each hit area without touching the printed glyph or, for the
   grid ones, adding a phantom row (absolute drops it out of grid flow). */
.axis--live::after,.wl-plate::after,.g-tick::after,.vx-num::after{content:"";
  position:absolute;inset:50% auto auto 50%;transform:translate(-50%,-50%);
  width:max(100%,24px);height:max(100%,24px)}
.vx-sys{font-family:var(--ff-mono);font-size:9px;line-height:1;letter-spacing:.22em;
  text-transform:uppercase;color:var(--t-ghost);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.vx-head{flex:none;margin:13px 0 0;font-size:clamp(28px,4.2vw,38px);font-weight:600;line-height:1.06;
  letter-spacing:-.012em;color:var(--t-display);max-width:24ch;overflow-wrap:break-word;
  font-variant-numeric:lining-nums proportional-nums;
  text-shadow:0 1px 0 rgba(10,11,13,.92),0 -1px 0 rgba(233,229,220,.09)}
.vx-head[data-hw=m]{font-size:clamp(25px,3.6vw,32px);line-height:1.08;letter-spacing:-.010em;max-width:26ch}
.vx-head[data-hw=l]{font-size:clamp(22px,3.0vw,27px);line-height:1.12;letter-spacing:-.008em;max-width:30ch}
.vx-etym{flex:none;margin:11px 0 0;font-family:var(--ff-mono);font-size:10.5px;line-height:1.55;
  letter-spacing:.14em;color:var(--gold-dim)}
.vx-etym .slot{white-space:nowrap}
.vx-etym .k{font-weight:400;color:var(--t-ghost)}
.vx-etym .sep{font-style:normal;opacity:.42;padding:0 .55ch}
.vx-etym .br{font-style:normal;opacity:.5;padding:0 .35ch}
.vx-etym .br:first-child{padding-left:0}
.vx-etym .br:last-child{padding-right:0}
.vx-fct{color:inherit;transition:color var(--dur-step) ease}
.vx-fct:hover,.vx-fct:focus-visible{color:var(--gold)}
.vx-kw{flex:none;margin:12px 0 0;font-size:12.5px;line-height:1.5;letter-spacing:.005em;color:var(--t-meta)}
/*inline exempts .kw/.vx-xref from 2.5.8, but padding-y on inline is free hit-area*/
.vx-kw .kw{font-size:inherit;letter-spacing:inherit;color:inherit;padding:4px 0;
  transition:color var(--dur-step) ease}
.vx-kw .kw:hover,.vx-kw .kw:focus-visible{color:var(--t-display)}
.vx-kw .sep{opacity:.42;padding:0 .5ch}
/* THE SAFETY VALVE, and only that.  In the ordinary case the plate is the whole
   record and nothing here fires.  When the water and the lintel between them
   leave less room than the record needs - a short laptop, a phone - the text must
   not be severed mid-word with no signal, and the plate must never grow a
   scrollbar gutter, so: no gutter ever, and a 22px fade that appears only when
   there is genuinely more below. */
/* flex 0-1, not 1-1.  A growing body put the plate's slack INSIDE the record - a
   short entry ended, then 120px of nothing, then its cross-links - so every short
   record read as a hole with a footer under it.  Now the body is its own text, the
   cross-links follow it immediately, and the slack falls where slack belongs: as
   margin above the foot rule, at the plate's floor. */
/* 96px, not 0.  min-height:0 is the flex idiom that lets a scrolling child
   shrink - but it lets it shrink to NOTHING, and on a short screen the head, the
   etymology, the keywords and the foot are all flex:none, so the one part of the
   plate that carries the MEANING was the only part that gave way.  96px is four
   lines: the floor below which a reading surface is not one. */
.vx-body{flex:0 1 auto;min-height:96px;margin:16px 0 12px;overflow-y:auto;overscroll-behavior:contain;
  scrollbar-width:none;transition:opacity var(--dur-cross) ease}
.vx-body::-webkit-scrollbar{width:0;height:0}
.vx-body.can-scroll{-webkit-mask-image:linear-gradient(180deg,#000 calc(100% - 22px),rgba(0,0,0,0) 100%);
  mask-image:linear-gradient(180deg,#000 calc(100% - 22px),rgba(0,0,0,0) 100%)}
#lectern.is-riffling .vx-body{opacity:0;transition:none}
.vx-sense{font-size:16.5px;line-height:1.62;color:var(--t-body);max-width:var(--measure)}
.vx-s2{margin:16px 0 0;padding-top:15px;font-size:16.5px;line-height:1.62;color:var(--t-meta);
  max-width:var(--measure);border-top:1px solid var(--hair-3)}
.vx-lab{display:block;margin-bottom:6px;font-family:var(--ff-mono);font-size:9.5px;line-height:1;
  letter-spacing:.24em;text-transform:uppercase;color:var(--gold-dim);font-weight:400}
.vx-note{font-style:italic;font-size:17px;line-height:1.7;color:var(--t-primary);max-width:var(--measure)}
.vx-xref{flex:none;margin:2px 0 12px;font-family:var(--ff-mono);font-size:10px;line-height:1.7;
  letter-spacing:.10em;color:var(--t-ghost)}
.vx-xref:empty{display:none;margin:0}
.vx-xref a{color:var(--t-meta);white-space:nowrap;padding:4px 0;transition:color var(--dur-step) ease}
.vx-xref a b{font-weight:400;color:var(--gold-dim);margin-right:.6ch}
.vx-xref .sep{opacity:.42;padding:0 .7ch}
.vx-xref a:hover,.vx-xref a:focus-visible{color:var(--t-display)}
/* the foot rides the plate's floor.  The minimum separation is carried by the
   bottom margins of the two things above it, so an auto margin that collapses to
   zero can never park the rule against the last line. */
.vx-foot{flex:none;margin-top:auto;padding-top:11px;border-top:1px solid var(--hair-3);
  font-family:var(--ff-mono);font-size:8.5px;line-height:1;letter-spacing:.22em;
  text-transform:uppercase;color:var(--t-meta);white-space:nowrap}

/* the word-slip: the same vessel, a second register */
.ws-phon{font-family:var(--ff-ipa);font-size:12.5px;line-height:1.3;letter-spacing:.02em;color:var(--t-meta)}
.slip-sec + .slip-sec{margin-top:20px}
.slip-list{margin:9px 0 0}
.slip-list li{margin:0 0 6px}
.slip-list a{font-size:15px;color:var(--t-primary);transition:color var(--dur-step) ease}
.slip-list a b{font-family:var(--ff-mono);font-size:9px;letter-spacing:.28em;color:var(--gold-dim);
  font-weight:400;margin-right:10px}
.slip-list a:hover,.slip-list a:focus-visible{color:var(--t-display)}
.slip-none{font-size:14.5px;font-style:italic;color:var(--t-meta);margin:9px 0 0;max-width:46ch}
.slip-pos{font-family:var(--ff-mono);font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;
  color:var(--t-ghost);margin:14px 0 5px}
.slip-def{position:relative;padding-left:2.4ch;font-size:15px;line-height:1.6;color:var(--t-body);
  max-width:52ch;margin:0 0 6px}
.slip-def b{position:absolute;left:0;top:.1em;font-family:var(--ff-mono);font-size:9.5px;
  letter-spacing:.14em;color:var(--t-ghost);font-weight:400}
.slip-src{font-family:var(--ff-mono);font-size:8.5px;letter-spacing:.22em;text-transform:uppercase;
  color:var(--t-ghost);margin-top:16px}
"""

# ============================================================ CSS 7 / K3 - THE TWO LAMPS
CSS_MOVE = u"""
.br-floatwrap{position:relative;flex:1 1 240px;max-width:400px;min-width:0}
.br-floatwrap>.search{width:100%;max-width:none;flex:none;margin:0}
.br-floatunit{position:relative}
/* the grip is TWO short vertical ticks, not three stacked horizontal ones: the
   stacked form is the universal hamburger-menu glyph, and a reader would have
   read two menu buttons where there are two things to pick up. */
/* .22 measured at 1.36:1 against the lintel - functionally invisible.  .42 in
   gold-dim reads as a deliberate handle at rest; the full reveal is a hover on
   the WHOLE unit, not just this 22px column, so finding it doesn't require
   already having found it. */
.br-grip{position:absolute;top:0;right:0;height:100%;width:22px;display:grid;place-items:center;
  cursor:grab;opacity:var(--grip-o,.42);touch-action:none;user-select:none;-webkit-user-select:none;
  transition:opacity var(--dur-step) ease}
.br-grip::before{content:"";width:5px;height:12px;
  background-image:linear-gradient(90deg,var(--gold-dim) 1px,transparent 1px);
  background-size:4px 100%;background-repeat:repeat-x;transition:background-image var(--dur-step) ease}
.br-grip:hover,.br-floatunit:hover .br-grip,.br-floatunit:focus-within .br-grip,.br-grip:focus-visible{opacity:.8}
.br-grip:hover::before,.br-grip:focus-visible::before{background-image:linear-gradient(90deg,var(--gold) 1px,transparent 1px)}
.br-grip:focus-visible{outline:none;box-shadow:inset 0 0 0 1px var(--gold-dim)}
.br-grip:active{cursor:grabbing}
.br-grip.br-restored{opacity:.8}
.br-grip.br-restored::before{background-image:linear-gradient(90deg,var(--gold) 1px,transparent 1px)}
.br-floatunit.br-floating{position:fixed;z-index:14;flex:none;max-width:none;margin:0;
  padding:7px 11px 0 7px;border-radius:12px;border:1px solid var(--hair-1);
  background:linear-gradient(180deg,rgba(233,229,220,.024),rgba(233,229,220,0) 65%),var(--ink-vessel);
  box-shadow:var(--bevel),var(--mount);
  transition:opacity var(--dur-lit) ease}
.br-floatunit.br-floating>.search{border-bottom-color:transparent;background:transparent;box-shadow:none}
.br-floatunit.br-floating .br-grip{top:7px;right:2px;height:30px}
/* a lamp you set down stays a live instrument: K1 and K2 do not go dark just
   because a floated bar sits over the room while a record is up.  It dims a
   little and steps below #dim (4) and #lectern (8) so it never occludes the
   plate, but pointer-events stay on - a parked search bar used to go fully
   inert here, which silently cancelled the un-inerting done in shutRoom(). */
body.is-reading .br-floatunit.br-floating{z-index:5;opacity:.55}
.br-dragging,.br-dragging *{cursor:grabbing!important;user-select:none!important;-webkit-user-select:none!important}
/* R4 - THE EMPTY PLACE.  A bar in the hand leaves a hole the width it had, and
   the hole is drawn the way the archive draws an absence: a dashed hairline and
   nothing inside it.  Not a dropzone - no fill, no glow, no label, and it is not
   there at all until a bar is actually being carried.  Coming within reach turns
   the dashes to a line in gold-dim: the same move the search field makes when it
   takes focus, so "this is live now" is already a sentence this bar can say. */
.br-slot{display:none}
.br-slot.is-open{display:block;flex:0 0 auto;max-width:100%;height:30px;
  box-sizing:border-box;border:1px dashed var(--hair-2);border-radius:9px;
  transition:border-color var(--dur-step) ease}
.br-slot.is-near{border-style:solid;border-color:var(--gold-dim)}
/* the strip lives in its lintel home now and only ever toggles .on there - it
   used to re-parent onto whichever unit last synced, which made it visibly
   teleport between the search and the dictionary the instant both floated,
   and vanish into a void when neither did.  Hairline text, not a pill: the
   two acts are "Keep" and "Return", read in the archive's own voice. */
.br-posctl{display:none;align-items:center;gap:14px;flex:none;order:-1;margin-right:6px}
.br-posctl.on{display:inline-flex}
.br-posctl .lbl{font-family:var(--ff-mono);font-size:8.5px;letter-spacing:.22em;text-transform:uppercase;
  color:var(--t-ghost);white-space:nowrap;margin-right:2px}
.br-posctl button{font-family:var(--ff-mono);font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;
  color:var(--t-meta);border:0;border-bottom:1px solid var(--hair-2);border-radius:0;background:none;
  padding:2px 0;min-width:0;text-align:left;transition:color var(--dur-step) ease,border-color var(--dur-step) ease}
.br-posctl button:hover,.br-posctl button:focus-visible{color:var(--gold);border-color:var(--gold-dim);outline:none}
.br-posctl button.saved{color:var(--gold);border-color:var(--gold-dim)}
"""

# ============================================================ CSS 8 / RESPONSIVE + FLOORS
CSS_RESPONSIVE = u"""
@supports (hanging-punctuation:first){
  .vx-sense,.vx-s2,.g-sec p,.g-intro,.vx-note,.walk-read p{hanging-punctuation:first last}}
@supports (text-wrap:pretty){
  .vx-sense,.vx-s2,.g-sec p,.g-intro,.vx-note,.slip-def,.vx-kw{text-wrap:pretty}}
@supports (text-wrap:balance){.vx-head,.wl-title,.g-head{text-wrap:balance}}

@media (max-width:1080px){
  #tarot-major .marks{grid-template-columns:repeat(6,minmax(0,1fr))}
}
/* NARROWER MEANS TALLER.  A wall's row gap is a share of the room divided by the
   number of gaps that wall HAS - and when the columns halve, the rows double, so
   the desktop divisor spends a budget the wall no longer owns and walks its last
   rank into the water.  Every wall that reflows restates its own divisor here. */
@media (max-width:820px){
  #western .marks{--rowgap:clamp(10px,2.2vh,22px);gap:var(--rowgap) clamp(10px,2.6vw,30px)}
  #chinese .marks{grid-template-columns:repeat(4,minmax(0,1fr));
    --rowgap:clamp(8px,calc((var(--room) - 300px)/6),44px)}
  #runes .marks{grid-template-columns:repeat(4,minmax(0,1fr));
    --rowgap:clamp(8px,calc((var(--room) - 350px)/8),34px)}
  #trigrams .marks{grid-template-columns:max-content repeat(3,minmax(0,1fr))}
  #tarot-major .marks{--rowgap:clamp(12px,calc((var(--room) - 210px)/3),60px)}
  #lexicon .marks{grid-template-columns:repeat(2,minmax(0,1fr));
    --rowgap:clamp(8px,calc((var(--room) - 300px)/6),36px)}
}
@media (max-width:760px){
  #iching .marks{--railw:16px;--rail:14px}
  #iching .axis--row{writing-mode:vertical-rl;transform:rotate(180deg);
    font-size:7px;letter-spacing:.04em;padding:0;justify-content:center;overflow:hidden}
}
/* THE PHONE GUARD IS A GUARD ON THE SMALL SIDE, whichever side that is.  A phone
   turned sideways is 844 CSS px wide and 390 tall: it took the desktop plate, the
   desktop band and the desktop lintel into a viewport that has none of the room
   they assume.  Height under 520px is a phone on its side, and it reads the same
   rules the phone standing up does. */
@media (max-width:640px),(max-height:520px){
  .zone--gap{margin-top:calc(var(--gpull) + clamp(11px,1.8vh,19px))}
  .slug{display:none}
  .back__t{display:none}
  /* the only way out of the Codex on a phone was a 7.5 x 10 CSS-px arrow */
  .back{min-width:44px;min-height:44px;justify-content:center;margin-left:-9px}
  /* the ten ticks give way to the search, and scroll sideways if they must:
     the field was down to a 12px sliver between tick X and the Aa toggle */
  .ticks{gap:0;flex:0 1 auto;min-width:0;margin-left:auto}
  /* 24px is the floor for a tap target (WCAG 2.5.8), and ten of them do not fit
     beside the field on a 390px phone - so the rail scrolls rather than shrink
     below it.  The bar stays one row and 52px either way. */
  .tick{padding:0 2px;min-width:24px;font-size:9px;letter-spacing:.02em}
  /* the fade has to be longer than a numeral is wide, or the last visible tick
     reads as a numeral someone chopped in half rather than as a rail continuing */
  .ticks{-webkit-mask-image:linear-gradient(90deg,#000 calc(100% - 30px),rgba(0,0,0,0));
         mask-image:linear-gradient(90deg,#000 calc(100% - 30px),rgba(0,0,0,0))}
  .seek{flex:0 0 auto;gap:6px}
  /* K3 wraps #q in .br-floatwrap, so the wrapper is the flex item here */
  .br-floatwrap{flex:0 0 104px;max-width:104px}
  #q{flex:0 0 auto;width:100%;padding-right:28px}
  .dtoggle{display:grid;place-items:center;flex:0 0 40px;width:40px;height:40px;
    background:none;border:0;border-bottom:1px solid var(--hair-2);border-radius:0;
    color:var(--t-meta);font-family:var(--ff-serif);font-size:14px;line-height:1;
    transition:color var(--dur-step) ease,border-color var(--dur-step) ease}
  .dtoggle[aria-expanded="true"]{color:var(--gold);border-bottom-color:var(--gold-dim)}
  /*M2: scoped to .seek so K3's lift() re-parenting can't strand .dict at opacity:0*/
  .seek>.dict{position:absolute;right:46px;left:0;top:50%;transform:translateY(-50%);flex:none;
    opacity:0;pointer-events:none;transition:opacity var(--dur-step) ease}
  .seek.is-dict>.dict{opacity:1;pointer-events:auto}
  .seek.is-dict>#q,.seek.is-dict>.br-floatwrap{opacity:0;pointer-events:none}
  /* the English register's field is laid over the WHOLE seek at left:0, so the
     way back up goes under it with the search rather than sitting on top of a
     field it has nothing to do with.  visibility, to keep it out of the tab
     order too - the same reason the base rule uses it. */
  .seek.is-dict>.totop{visibility:hidden;opacity:0}
  .br-floatunit.br-floating{opacity:1!important;pointer-events:auto;position:fixed;
    right:auto;transform:none}
  .seek:not(.is-dict)>.dict .br-grip{display:none}
  .seek.is-dict>.br-floatwrap .br-grip{display:none}
  /* THE SEAL IS THE PARENT'S, AND IT IS OVER OUR WALL.  In the frame the app
     keeps its wax seal at right:12px, 42px across, floating above everything at
     z-210 - a different document, so nothing here can move it or reach under it.
     On a 360px phone it covered the right-hand column of marks, and a tap meant
     for hexagram 15 closed the whole Codex instead.  So the column reserves the
     strip: 12 + 42 and four of air.  Standalone the seal does not exist and the
     page keeps its full width - hence html.framed and not a bare rule. */
  html.framed .wl-head,html.framed .wl-field{padding-right:var(--seal-safe)}
  /* K3 stays on a phone.  It is one of the four things the builder asked to keep,
     and it has already been silently lost once. */
  .br-grip{width:26px}
  .br-grip::before{width:5px;height:15px}
  #lectern{--vx-pad:18px;width:96vw;padding:18px 18px 13px;--vx-rise:12px;
    --vx-band:min(56px,7vh);
    --vx-band:min(56px,7svh);
    --vx-avail:calc(100vh - var(--bar-h) - var(--tide) - 20px - var(--vx-band));
    --vx-avail:calc(100svh - var(--bar-h) - var(--tide) - 20px - var(--vx-band))}
  .vx-head{font-size:26px}
  .vx-head[data-hw=m]{font-size:23px}
  .vx-head[data-hw=l]{font-size:20px}
  .vx-sense,.vx-s2{font-size:15.5px}
  .vx-kw{font-size:12px}
  .vx-note{font-size:15.5px}
  .g-intro{font-size:16.5px}
  .g-head{font-size:18.5px}
  .g-sec p,.walk-read p,.walk-draw p{font-size:15.5px}
  .process-list li{font-size:15px}
  .wl-title{font-size:22px}
  .wl-ord{font-size:clamp(64px,20vw,96px)}
  .vx-sense,.vx-s2,.g-sec p,.slip-def{hyphens:auto;-webkit-hyphens:auto}
}
/* A PHONE ON ITS SIDE IS NOT A CHAMBER.  Under 520px of height there is no
   viewport for a wall to own: the room budget goes to nothing, the field crushes
   its own last rows under the water, and one screen per plate is a promise the
   screen cannot keep.  So the page stops pretending and becomes what it honestly
   is at that size - a document that scrolls.  The field grows to its content,
   the watermark and the snap go, the band narrows to a hairline of air, and
   nothing is ever drawn below the line.  Turn the phone back and the chamber
   returns intact. */
@media (max-height:520px){
  html{scroll-snap-type:none}
  /* and the hatch cannot defeat the escape hatch: ?snap=on raises specificity to
     (0,1,1), which would out-rank the bare `html` above and put the snap back on
     the one screen that provably cannot hold it. */
  html.snap-on{scroll-snap-type:none}
  .wl-field{height:auto;max-height:none}
  .wl-ord{display:none}
  /* --room is what every wall divides to get its own pitch, and at 292px of
     glass the formula resolves to 43px: the King Wen square came out as 64
     three-pixel cells, a grey smear where sixty-four hexagrams should be.  With
     the field free to grow, --room stops being a height and becomes only that
     divisor, so it is stated rather than derived. */
  :root{--room:520px}
  /* THE PLATE ON ITS SIDE.  Three things were wrong here at once, and each one
     alone was enough to break THE ONE MOVE.
     (1) 96vw is the standing phone's rule and it leaked sideways: on an 844px
         landscape screen the plate took 810px - 96% of the width - so the wall
         it was drawn from had no width left to be seen in.  A record is read at
         a measure, not at a bleed; the base formula already knows the measure,
         so it is simply restated.  Under 640px of width --measure is 100% and
         this resolves to the same full-bleed the standing phone wants.
     (2) a 36px band left 44px of clear wall above the plate, and the cells that
         must burn in it are up to 60px tall - so perch() gave up and put the
         Ember behind the plate.  The band is now a QUARTER of the screen, which
         is what one lit cell plus its air actually costs.
     (3) with the band paid for, the 240px floor no longer fits under it, and it
         does not need to: a plate that SCROLLS cannot starve its own reading
         surface, which is the only thing that floor was ever guarding. */
  #lectern{--vx-band:max(96px,26svh);
    width:min(calc(var(--measure) + 2 * var(--vx-pad)),92vw);
    height:min(var(--vx-h),max(var(--vx-avail),150px));
    padding:12px 18px 0;
    overflow-y:auto;overscroll-behavior:contain;scrollbar-width:none}
  #lectern::-webkit-scrollbar{width:0;height:0}
  /* the 8px inset hairline is drawn on the plate and would scroll away with the
     record.  A frame that slides off its own picture is worse than no frame; the
     landscape plate keeps the outer border and gives up the concentric one. */
  #lectern::before{display:none}
  /* the plate's chrome, not its record, gives up the pixels: at this height the
     head, the etymology and the body's own margins together overran the plate
     by 32px and printed the foot rule below its own border, in the water. */
  .vx-head{font-size:21px;margin-top:8px}
  .vx-etym{margin-top:7px}
  /* ONE SCROLLER, NOT TWO.  The plate is the scroller here, so the body stops
     being one: nested scrollers would trap the meaning in a 96px window while
     its own chrome slid around it.  The body becomes its own full height and the
     whole record moves as one column. */
  .vx-body{flex:none;min-height:0;margin:9px 0 7px;overflow:visible;
    -webkit-mask-image:none;mask-image:none}
  /* and the foot rule becomes the plate's waterline: it holds the floor while the
     record passes UNDER it.  That is the signal - the same one the page already
     uses at the shore - and it is why nothing can ever again print below the
     border.  Solid, because text has to disappear behind it, not through it. */
  .vx-foot{position:sticky;bottom:0;z-index:1;padding:9px 0 10px;
    background:var(--ink-vessel)}
  /* and the fade rides ON the sticky rule, above its hairline (bottom:100% of a
     padding box stops at the border), so the last line reads as a line
     CONTINUING and not as a sentence someone severed.  It is the same 22px
     signal .vx-body carries on a tall screen, moved to where the cut now is. */
  .vx-foot::before{content:"";position:absolute;left:0;right:0;bottom:100%;height:20px;
    pointer-events:none;background:linear-gradient(180deg,rgba(17,16,13,0),var(--ink-vessel))}
}
@media (max-width:480px){
  #iching .axis--col{font-size:7px;letter-spacing:.02em;padding-bottom:7px}
  #iching .bars--hx{width:19px;gap:2px}
  #iching .bars--hx i{height:1.5px}
  #iching .mk-num{font-size:7.5px;letter-spacing:0}
  /* THE SQUARE IS SIXTY-FOUR OR IT IS NOTHING.  A fixed pitch times eight plus a
     max-content rail is wider than a 320px phone, and the eighth column - eight
     real hexagrams - was cut off the right edge with no scroll to reach it.  The
     columns become a share of what there is; the rail keeps its numbers. */
  #iching .marks{grid-template-columns:12px repeat(8,minmax(0,1fr))}
  /* and if any wall still outruns the glass, it scrolls sideways rather than
     losing the part that did not fit */
  .wl-field{overflow-x:auto}
  #western .marks{grid-template-columns:max-content repeat(3,minmax(0,1fr))}
  #chinese .marks{grid-template-columns:repeat(3,minmax(0,1fr));
    --rowgap:clamp(8px,calc((var(--room) - 300px)/7),34px)}
  #tarot-major .marks{grid-template-columns:repeat(4,minmax(0,1fr));
    --rowgap:clamp(10px,calc((var(--room) - 300px)/5),40px)}
  #tarot-minor .marks{grid-template-columns:repeat(4,minmax(0,1fr));--rowgap:0px;gap:0 clamp(6px,3vw,20px)}
  #runes .marks{grid-template-columns:repeat(4,minmax(0,1fr));
    --rowgap:clamp(6px,calc((var(--room) - 350px)/8),26px)}
  #lexicon .marks{grid-template-columns:minmax(0,1fr);
    --rowgap:clamp(6px,calc((var(--room) - 400px)/9),22px)}
  /* the phrase under each name is a line this wall did not carry before, and in
     one column that is seven of them: the name-to-phrase gap pays for it, so the
     block is exactly the height it was and the last mark keeps its footing above
     the field's own floor.  Measured at 390x844: without this the seventh phrase
     lands 1px under the field and is clipped whole. */
  #lexicon .mk-in{gap:5px}
  .mk-n{font-size:9px;letter-spacing:.12em}
}
/* THE THREE ÆTTIR ARE THREE ROWS.  Four columns makes six ranks, and six ranks
   of runes is 437px of wall in a 276px room: at 360x640 the last ætt was drawn
   61.6px UNDER the waterline - measured, not feared - which is the one thing the
   room budget exists to prevent.  Eight columns is not a compromise here, it is
   the wall's own geometry (one ætt to a row, the form the desktop wall already
   uses), and the figure gives up four pixels to buy the rank back. */
@media (max-height:680px){
  #runes .marks{grid-template-columns:repeat(8,minmax(0,1fr));--rowgap:8px}
  #runes .mark .fig{width:18px;height:18px}
}
/* at rest, nothing moves.  reduced motion leaves every surface fully settled. */
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{transition:none!important;animation:none!important}
  #lectern,#lectern.is-up,#lectern.is-down{transition:none}
  /* under reduce the parent draws its line hard and edge to edge, so the glow
     reaches the frame too */
  .floorlight{-webkit-mask-image:none;mask-image:none}
}

@media (forced-colors:active){
  .shore,.shallows,.floorlight,.keylight{display:none}
  /* the occluder STAYS - it is what makes the rise real rather than simulated.
     Canvas on Canvas is invisible, so in this mode the waterline is a drawn edge. */
  .tide{background:Canvas;border-top:1px solid CanvasText}
  .mark.is-cold{opacity:1;color:GrayText}
  /* .is-on, ALWAYS.  Unqualified, this rule is later than #dim{opacity:0} at equal
     specificity, so in High Contrast the scrim won every cascade and the chamber
     opened as an opaque full-viewport blank that also swallowed every click. */
  #dim.is-on{background:Canvas;opacity:1}
  #lectern{background:Canvas;border:1px solid CanvasText;box-shadow:none}
  #lectern::before{display:none}
  .vx-head{text-shadow:none}
  .mark.is-ember .mk-in::before{box-shadow:none;outline:2px solid Highlight;outline-offset:2px;opacity:1}
  .mark.is-ember--flat .mk-in::after{background:Highlight}
  .wl-rule,.wl-rule::after,.seam{background:none;border-top:1px solid CanvasText;height:0}
  .fig{stroke:CanvasText}
  .wall{background-image:none}
  .search{border-bottom:1px solid CanvasText}
  :focus-visible{outline:2px solid Highlight}
}

@media print{
  :root{--ground:#fff;--ink-vessel:#fff;--t-display:#000;--t-primary:#111;--t-body:#1a1a1a;
    --t-meta:#444;--t-ghost:#666;--gold:#6b4f22;--gold-dim:#6b4f22;
    --hair-1:rgba(0,0,0,.28);--hair-2:rgba(0,0,0,.16);--hair-3:rgba(0,0,0,.09);
    --hair-0:rgba(0,0,0,0);--ghost-ord:rgba(0,0,0,.10);--mount:none;--bevel:none;--cut:none}
  html{background:#fff;scroll-snap-type:none}
  .wall{background-image:none;min-height:0;content-visibility:visible;page-break-inside:auto}
  .g-sec{content-visibility:visible}
  .shore,.shallows,.tide,.tide-guard,.floorlight,.keylight,#dim,#lectern,.stickybar,
  .br-posctl,.skip,.wl-ord,.wl-plateimg{display:none!important}
  .mark__body{position:static!important;left:auto!important;display:block!important;
    height:auto!important;width:auto!important;max-width:34em;overflow:visible!important;
    content-visibility:visible!important;margin:2px 0 12px}
  .wl-field{height:auto;max-height:none;display:block}
  .mark.is-cold{opacity:1}
  .mark{break-inside:avoid;justify-items:start;place-items:start;padding:12px 0 2px}
  .marks{display:block!important}
  .axis{display:none}
  .cell{display:block}
  .mk-in{grid-auto-flow:column;align-items:center;gap:10px}
  .mark__body>span{display:block}
  .by{font-family:var(--ff-mono);font-size:7.5pt;color:#6b4f22}
  .by ~ .be{display:none}
  .bn{font-family:var(--ff-mono);font-size:8pt;letter-spacing:.22em;color:#6b4f22}
  .bh{font-size:13pt;font-weight:600;color:#000;margin:3pt 0}
  .be{font-family:var(--ff-mono);font-size:7.5pt;color:#6b4f22}
  .bk{font-size:9pt;color:#444;margin-bottom:4pt}
  .bm,.b2{font-size:10.5pt;line-height:1.5}
  .b2{margin-top:5pt;padding-top:5pt;border-top:1px solid rgba(0,0,0,.16)}
  .bf{font-family:var(--ff-mono);font-size:7pt;letter-spacing:.2em;color:#666;margin-top:5pt}
  h2,h3,.wl-title,.g-head{break-after:avoid}
}
"""

CSS_NOJS = u"""
.mark__body{position:static!important;left:auto!important;display:block!important;
  height:auto!important;width:auto!important;overflow:visible!important;
  content-visibility:visible!important;max-width:var(--measure);margin:4px 0 20px}
.wall{min-height:0;content-visibility:visible}
.g-sec{content-visibility:visible}
.wl-field{display:block;height:auto;max-height:none}
.wl-plateimg{display:none}
#lectern,#dim,.floorlight{display:none}

/* the plain document: every entry as a real record, in reading order */
.marks{display:block!important}
.axis{display:none}
.mark{justify-items:start;place-items:start;padding:14px 0 4px}
.mk-in{grid-auto-flow:column;align-items:center;gap:10px}
.mark__body>span{display:block}
.by{font-family:var(--ff-mono);font-size:10.5px;letter-spacing:.14em;color:var(--gold-dim);margin-bottom:6px}
.by ~ .be{display:none}
.bn{font-family:var(--ff-mono);font-size:9px;letter-spacing:.28em;text-transform:uppercase;
  color:var(--gold-dim);margin-bottom:5px}
.bh{font-size:21px;font-weight:600;color:var(--t-display);margin-bottom:6px}
.be{font-family:var(--ff-mono);font-size:10.5px;letter-spacing:.14em;color:var(--gold-dim);margin-bottom:6px}
.bk{font-size:12.5px;color:var(--t-meta);margin-bottom:10px}
.bm{font-size:16.5px;line-height:1.62;color:var(--t-body)}
.b2{font-size:16.5px;line-height:1.62;color:var(--t-meta);margin-top:12px;padding-top:12px;
  border-top:1px solid var(--hair-3)}
.bf{font-family:var(--ff-mono);font-size:8.5px;letter-spacing:.22em;text-transform:uppercase;
  color:var(--t-ghost);margin-top:10px}
"""


# ============================================================ JS 1 / THE CHAMBER
# Vanilla, ES5-shaped.  No rAF loop, no scroll listener, and no getBoundingClientRect
# on any hover, pointermove or scroll path - while the aperture is open the parent
# app measures .stickybar every single frame across the document boundary.
JS_CORE = r"""
(function(){
'use strict';
var D=document, W=window, R=D.documentElement, BRX=(W.BRX=W.BRX||{});
var REDUCE=!!(W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches);
try{ if(W.self!==W.top) R.classList.add('framed'); }catch(e){ R.classList.add('framed'); }

/*A3BOOT*/

/* ---------- 1 - folding.  Must match fold() in build_codex.py byte for byte. ---------- */
var FOLD={'ø':'o','æ':'ae','œ':'oe','ß':'ss','þ':'th','ð':'d','ł':'l','đ':'d','ı':'i'};
function fold(s){
  s=String(s==null?'':s);
  var o='',i,c,l;
  for(i=0;i<s.length;i++){ c=s.charAt(i); l=c.toLowerCase(); o+=(FOLD[l]!==undefined?FOLD[l]:c); }
  if(o.normalize) o=o.normalize('NFD').replace(/[̀-ͯ]/g,'');
  o=o.toLowerCase().replace(/[^a-z0-9]+/g,' ');
  return o.replace(/^ +/,'').replace(/ +$/,'');
}
var STOP=' a an and are as at be but by for from had has have he her his if in into is it '+
         'its not of on or she so than that the their them then there these they this to '+
         'was were what when which who will with you your ';
function qtokens(s){
  var raw=fold(s).split(' '), out=[], i, t;
  for(i=0;i<raw.length;i++){ t=raw[i]; if(!t) continue;
    if(STOP.indexOf(' '+t+' ')>=0) continue; out.push(t); }
  return out;
}
function esc(s){ return String(s==null?'':s)
  .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  .replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }

/* ---------- 2 - the registry.  ONE pass over the hidden bodies, ~4ms, no layout
   reads and no duplicated text: every entry's address, headword, keywords and
   full meaning are read back out of the one place they live. ---------- */
var walls=[].slice.call(D.querySelectorAll('.wall'));
var ticks=[].slice.call(D.querySelectorAll('.tick'));
var gsecs=[].slice.call(D.querySelectorAll('.g-sec'));
var marks=[], bodyOf=[], keys=[], sigs=[], nums=[], wallOf=[], byId={},
    ADDR=[], NM=[], NK=[], KWF=[], tickOf={}, gkeys=[];
var i,k,N=0;
for(k=0;k<walls.length;k++){
  var ms=walls[k].querySelectorAll('.mark');
  for(i=0;i<ms.length;i++){
    var m=ms[i], b=m.parentNode.querySelector('.mark__body');
    var q=function(c){ var e=b.querySelector(c); return e?e.textContent:''; };
    var addr=q('.bn'), nm=q('.bh'), sg=m.getAttribute('data-sig')||'';
    var sgw=''; if(sg){ var sp=sg.split(' ');
      for(var z=0;z<sp.length;z++) sgw+=' '+sp[z].split(':')[1].replace(/-/g,' '); }
    m.__i=N; m.__w=k;
    m.tabIndex=(i===0?0:-1);
    marks.push(m); bodyOf.push(b);
    ADDR.push(addr); NM.push(nm);
    NK.push(fold(nm)); KWF.push(fold(q('.bk')));
    keys.push(' '+fold(b.textContent)+' '+fold(addr.replace(/ /g,''))+' '+fold(sgw)+' ');
    sigs.push(' '+sg+' ');
    nums.push(' '+(m.getAttribute('data-n')||'')+' ');
    wallOf.push(k); byId[m.id]=N;
    N++;
  }
}
for(i=0;i<gsecs.length;i++) gkeys.push(' '+(gsecs[i].getAttribute('data-k')||'')+' ');
for(i=0;i<ticks.length;i++){ tickOf[ticks[i].getAttribute('data-w')]=ticks[i];
  ticks[i].__base=ticks[i].getAttribute('aria-label'); }
BRX.marks=marks;
BRX.byId=function(id){ return byId[id]===undefined?null:marks[byId[id]]; };

/* ---------- 3 - the slug.  Four writers, one slot, fixed precedence.
   EVERY write into the lintel is coalesced into one animation frame.  The iframe
   is same-origin, so it shares the renderer main thread with the app - and the
   app reads .stickybar with getBoundingClientRect on every one of its 60 frames.
   A keystroke that dirtied that node synchronously cost ~30ms of style+layout at
   4x CPU, i.e. two frozen frames of the living line, per character. ---------- */
var slugT=D.getElementById('slugtext'), slugX=D.getElementById('slugclear'),
    slugBox=D.getElementById('slug'), srEl=D.getElementById('sr');
var S={rest:'',hover:'',read:'',query:''}, shown=null, chromePend=0, chromeJob=null;
function slugPaint(){
  var t=S.query||S.read||S.hover||S.rest||'';
  if(t!==shown){ shown=t; slugT.textContent=t; }
  if(slugX.hidden===!S.query) return;
  slugX.hidden=!S.query;
  slugX.tabIndex=S.query?0:-1;
}
function flushChrome(){
  chromePend=0;
  var job=chromeJob; chromeJob=null;
  slugPaint();
  if(job) job();
}
function paintChrome(job){
  if(job) chromeJob=job;
  if(chromePend) return;
  if(!W.requestAnimationFrame){ flushChrome(); return; }
  chromePend=W.requestAnimationFrame(flushChrome);
}
function slug(kind,text){ S[kind]=text||''; paintChrome(null); }
BRX.slug=slug;
var srT=0, srMsg='';
function say(m){ srMsg=m; if(srT) clearTimeout(srT);
  srT=setTimeout(function(){ srT=0; if(srEl.textContent!==srMsg) srEl.textContent=srMsg; },420); }

/* ---------- 4 - scroll-spy.  One observer, ten targets, zero scroll listeners. ---------- */
var cw=-1, live={};
function setWall(n){
  if(n===cw) return;
  if(cw>=0){ ticks[cw].classList.remove('is-here'); ticks[cw].removeAttribute('aria-current');
             walls[cw].classList.remove('is-here'); }
  cw=n;
  ticks[n].classList.add('is-here'); ticks[n].setAttribute('aria-current','true');
  walls[n].classList.add('is-here');
  /* the prose wall is read continuously - the shallows must not dissolve a line
     of the argument at the foot of every screenful */
  D.body.classList.toggle('on-prose', BRC.WALLS[n].k==='tarot-guide');
  /* R3 - the way back up appears once the room you are reading is not the first
     one, and it is this spy that says so.  A second class on a node this
     function already dirties costs one more toggle inside a restyle that was
     going to happen anyway - and it is why the button needs no scroll listener. */
  D.body.classList.toggle('past-first', n>0);
  slug('rest', BRC.WALLS[n].slug+' · '+(n+1)+' of 10');
}
if(W.IntersectionObserver){
  var spy=new IntersectionObserver(function(es){
    for(var j=0;j<es.length;j++){
      var n=+es[j].target.getAttribute('data-wi');
      if(es[j].isIntersecting) live[n]=1; else delete live[n];
    }
    var best=-1; for(var key in live){ var v=+key; if(v>best) best=v; }
    if(best>=0) setWall(best);
  },{root:null,rootMargin:'-50% 0px -49% 0px',threshold:0});
  for(i=0;i<walls.length;i++) spy.observe(walls[i]);
}
setWall(0);
/* the Antechamber's own rail */
var rail=[].slice.call(D.querySelectorAll('.g-tick')), gLive={};
if(rail.length && W.IntersectionObserver){
  /* the observer reads data-g off the node it OBSERVES.  It used to be emitted on
     the rail links only, so +null was 0 for every section and the rail lit TG 01
     for the whole 6,000px wall.  It is now on the sections; the build asserts it. */
  var gspy=new IntersectionObserver(function(es){
    for(var j=0;j<es.length;j++){
      var n=+es[j].target.getAttribute('data-g');
      if(es[j].isIntersecting) gLive[n]=1; else delete gLive[n];
    }
    var best=-1; for(var key in gLive){ var v=+key; if(v>best) best=v; }
    for(var r=0;r<rail.length;r++) rail[r].classList.toggle('is-here', r===best);
  },{root:null,rootMargin:'-24% 0px -66% 0px',threshold:0});
  for(i=0;i<gsecs.length;i++) gspy.observe(gsecs[i]);
}

/* ---------- 5 - THE VESSEL.  One reading surface; everything arrives on it. ---------- */
var lec=D.getElementById('lectern'), dimEl=D.getElementById('dim');
var vxNum=lec.querySelector('.vx-num'), vxSys=lec.querySelector('.vx-sys'),
    vxHead=lec.querySelector('.vx-head'), vxEtym=lec.querySelector('.vx-etym'),
    vxKw=lec.querySelector('.vx-kw'), vxBody=lec.querySelector('.vx-body'),
    vxXref=lec.querySelector('.vx-xref'), vxFoot=lec.querySelector('.vx-foot');
var up=false, curMark=null, returnTo=null, kind='record';

function armWill(el){
  if(REDUCE) return;
  el.style.willChange='transform';
  function done(e){ if(e.target!==el) return; el.style.willChange=''; el.removeEventListener('transitionend',done); }
  el.addEventListener('transitionend',done);
}
/* THE ROOM GOES AWAY, not just dark.  role="dialog" promises containment, and a
   scrim only delivers it to a mouse: without this, 53 controls behind an 88%
   scrim stayed tabbable and a screen reader's browse cursor never left the wall.
   inert is the APG's own alternative to a focus trap, which the Law forbids. */
var INERT=('inert' in D.documentElement), barEl=D.querySelector('.stickybar');
/* the whole lintel used to go inert with the room, which took #q, #dtoggle and
   the dictionary down with it: a reader could never reach the search or the
   English register while a record was up, and a K2 lookup begun mid-record had
   no way to open in the first place.  Only the wayfinding pieces recede - the
   way home, the slug, the ten plates - never the two live instruments. */
var barInertEls=barEl?[].slice.call(barEl.querySelectorAll('.back,.slug,.ticks,.totop')):[];
function shutRoom(on){
  if(!INERT) return;
  var r=D.getElementById('room');
  if(r) r.inert=on;
  for(var bi=0;bi<barInertEls.length;bi++) barInertEls[bi].inert=on;
}
/* the phone plate and the desktop plate are different objects: the type is
   smaller, the chrome is tighter, and the water is the same 4.5%. */
/* AND THE QUERY MUST BE THE CSS'S OWN QUERY.  The phone guard has read
   `(max-width:640px),(max-height:520px)` since M3 - a phone on its side takes the
   phone's chrome - but this line still asked about width alone.  So at 844x390 the
   CSS built a 264px plate resting 96px down and vesselTop() told perch() to expect
   a 196px plate resting 150px down: a 54px lie, and the Ember was perched into the
   exact strip the plate then covered.  One matchMedia string, twenty-four buried
   cells.  SHORT is the landscape branch alone, where the band is its own number. */
var SMALL=W.matchMedia?W.matchMedia('(max-width:640px),(max-height:520px)'):null;
var SHORT=W.matchMedia?W.matchMedia('(max-height:520px)'):null;
/* A3/C4 - THE HEIGHT POLICY.  mi is the mark's own index, and it is threaded all
   the way from the click because a fitted plate is a property of the RECORD, not
   of the wall: every consumer that predicts the plate's geometry (raise, and
   through vesselTop, perch) has to be asking about the same record the reader is
   about to be given, or the Ember is perched against a plate that never arrives. */
function vxh(wallKey,mi){
  var sm=!!(SMALL&&SMALL.matches);
/*A3VXH*/
  return (sm&&BRC.VXHM&&BRC.VXHM[wallKey])?BRC.VXHM[wallKey]:BRC.VXH[wallKey];
}
/* the valve: a fade appears at the foot of the plate ONLY when the record really
   does continue below.  In the ordinary case nothing here fires. */
function gauge(){
  if(!vxBody) return;
  /* 2px caught sub-pixel rounding and painted a 22px fade over a whole line for
     nothing.  Below 8px there is no line to reach, so there is nothing to signal. */
  vxBody.classList.toggle('can-scroll', vxBody.scrollHeight-vxBody.clientHeight>8);
}
function raise(label,wallKey,rf,mi){
  if(wallKey && BRC.VXH[wallKey]) lec.style.setProperty('--vx-h', vxh(wallKey,mi)+'px');
  lec.setAttribute('aria-label',label);
  if(!up){
    returnTo=rf||null;
    dimEl.classList.add('is-on');
    lec.classList.remove('is-down'); lec.classList.add('is-up');
    armWill(lec);
    D.body.classList.add('is-reading');
    R.classList.add('is-reading');
    up=true;
    shutRoom(true);
  }
  try{ lec.focus({preventScroll:true}); }catch(e){ lec.focus(); }
  gaugeSoon();
}
/* one layout read, at the start of a frame, and never on the riffle path */
var gaugeT=0;
function gaugeSoon(){
  if(gaugeT||!W.requestAnimationFrame){ gauge(); return; }
  gaugeT=W.requestAnimationFrame(function(){ gaugeT=0; gauge(); });
}
function lower(){
  if(!up) return;
  up=false;
  shutRoom(false);
  dimEl.classList.remove('is-on');
  lec.classList.remove('is-up'); lec.classList.add('is-down');
  armWill(lec);
  D.body.classList.remove('is-reading');
  R.classList.remove('is-reading'); R.classList.remove('no-snap');
  litWall(-1); ember(null); ring=null;
  slug('read','');
  var t=returnTo; returnTo=null; curMark=null;
  if(t && D.contains(t)){ try{ t.focus({preventScroll:true}); }catch(e){ t.focus(); } }
}
BRX.lower=lower; BRX.isUp=function(){ return up; }; BRX.mark=function(){ return curMark; };

function facetHTML(text,fattr,joiner){
  if(!text) return '';
  var labels=text.split(joiner), sig=(fattr||'').split('|'), out=[], j;
  for(j=0;j<labels.length;j++){
    var label=labels[j], sg=sig[j]||'', kv=label.indexOf(': '), inner;
    if(kv>0) inner='<b class="k">'+esc(label.slice(0,kv))+'</b><i class="sep">:</i>'+esc(label.slice(kv+2));
    else inner=esc(label);
    if(sg) out.push('<button type="button" class="vx-fct slot" data-sig="'+esc(sg)+'" data-plain="'+esc(label)+'">'+inner+'</button>');
    else out.push('<span class="slot">'+inner+'</span>');
  }
  return '<i class="br">[</i>'+out.join('<i class="sep">'+esc(joiner.replace(/^ | $/g,''))+'</i>')+'<i class="br">]</i>';
}
function hwClass(s){ return s.length<=20?'s':(s.length<=34?'m':'l'); }
function fillRecord(m,full){
  var idx=m.__i, b=bodyOf[idx], W_=BRC.WALLS[m.__w];
  var g=function(c){ var e=b.querySelector(c); return e?e.textContent:''; };
  vxNum.textContent=ADDR[idx];
  vxNum.setAttribute('href','#'+m.id);
  vxSys.textContent='PLATE '+W_.roman+' · '+W_.title.toUpperCase();
  vxHead.textContent=NM[idx];
  vxHead.setAttribute('data-hw',hwClass(NM[idx]));
  vxFoot.textContent=g('.bf');
  if(!full) return;
  vxEtym.innerHTML=facetHTML(g('.be'),m.getAttribute('data-f'),W_.joiner);
  var kws=g('.bk'), out=[], j;
  if(kws){ var arr=kws.split(' · ');
    for(j=0;j<arr.length;j++) out.push('<button type="button" class="kw" data-q="'+esc(arr[j])+'">'+esc(arr[j])+'</button>');
    vxKw.innerHTML=out.join('<i class="sep">·</i>'); }
  else vxKw.innerHTML='';
  var s2=b.querySelector('.b2');
  var h='<p class="vx-sense msr">'+esc(g('.bm'))+'</p>';
  if(s2) h+='<p class="vx-s2 msr"><b class="vx-lab mono">2 · REVERSED</b>'+esc(s2.textContent)+'</p>';
  vxBody.innerHTML=h;
  /* data-x is id|label pairs, built where the label can be got right: a cross-link
     to NU 02 used to render as a bare filing code, because that entry's own name
     IS its address. */
  var xr=m.getAttribute('data-x')||'', lx=[];
  if(xr){ var items=xr.split(';');
    for(j=0;j<items.length;j++){ var pr=items[j].split('|'), t=byId[pr[0]];
      if(t===undefined) continue;
      lx.push('<a href="#'+pr[0]+'" data-go="'+pr[0]+'"><b>'+esc(ADDR[t])+'</b>'+esc(pr[1]||NM[t])+'</a>'); }
    vxXref.innerHTML=lx.length?('answers to: '+lx.join('<i class="sep">·</i>')):''; }
  else vxXref.innerHTML='';
  vxBody.scrollTop=0; lec.scrollTop=0;
  gaugeSoon();
}
function show(m,opts){
  opts=opts||{};
  curMark=m; kind='record';
  var mode=opts.mode||'full';
  fillRecord(m, mode!=='riffle');
  raise(NM[m.__i]+', '+ADDR[m.__i], BRC.WALLS[m.__w].k, opts.returnFocus||m, m.__i);
  slug('read', ADDR[m.__i]);
}
BRX.show=show;

function showPlate(wi){
  var w=BRC.WALLS[wi];
  curMark=null; kind='plate';
  vxNum.textContent='PL '+w.roman; vxNum.setAttribute('href','#pl-'+w.roman.toLowerCase());
  vxSys.textContent=w.eyebrow.toUpperCase();
  vxHead.textContent=w.title; vxHead.setAttribute('data-hw', w.title.length>20?'m':'s');
  vxEtym.innerHTML=''; vxKw.innerHTML='';
  vxBody.innerHTML='<p class="vx-note msr">'+esc(w.note)+'</p>';
  vxXref.innerHTML=''; vxFoot.textContent=w.furn;
  vxBody.scrollTop=0; lec.scrollTop=0; gaugeSoon();
  lec.style.setProperty('--vx-h', BRC.PLATEH+'px');
  litWall(wi); ember(null);
  raise(w.title+', plate '+w.roman, null, ticks[wi]);
  slug('read','PL '+w.roman);
}

/* ---------- 6 - THE EMBER.  While the vessel is up, exactly two things are lit. ---------- */
var host=null, litIdx=-1, ring=null, ringPos=0;
function ember(el){
  if(host===el) return;
  if(host){ host.classList.remove('is-ember'); host.classList.remove('is-ember--flat'); }
  host=el;
  if(host){
    host.classList.add('is-ember');
    /* a ring hugs a drawn figure; around a bare word it becomes a filled gold
       pill, which is the one shape this page killed everywhere else */
    if(!host.querySelector('.fig,.bars')) host.classList.add('is-ember--flat');
  }
}
/* PERCH.  The one lit cell must land inside the readable window: below the lintel
   and ABOVE THE WATERLINE.  Measured before this existed: on a same-wall click
   nothing scrolled at all, and 38 of 40 cases across five viewports put the Ember
   in the shallows, under the parent's band, or off the bottom of the screen. */
/* where the plate will COME TO REST - computed from the same numbers the CSS
   uses, so it is right during the 680ms rise, when a rect read is not. */
function vesselTop(wallKey,mi){
  var H=W.innerHeight, tide=Math.round(H*BRC.TIDE);
  var sm=!!(SMALL&&SMALL.matches), sh=!!(SHORT&&SHORT.matches);
  /* the three tiers, in the order the sheet declares them: desktop, the phone
     guard, then the landscape branch's own band. */
  var band=sh?Math.max(96,H*0.26):(sm?Math.min(56,H*0.07):Math.min(84,H*0.09));
  var avail=H-BRC.BAR-tide-(sm?20:40)-band;
  /* and the FLOOR, which this function used to omit entirely: the sheet says
     min(--vx-h, max(--vx-avail, floor)), so on a starved screen the plate stands
     INTO the band and rests lower than a bare min() predicts. */
  var h=Math.min(wallKey?vxh(wallKey,mi):BRC.SLIPH, Math.max(avail, sh?150:240));
  /* and the RISE, which is --vx-rise's twin: the same number the sheet gives the
     plate's `bottom`, read from the same toggle.  A3/C3. */
  return H-tide-(/*A3RISE*/)-h;
}
var snapT=0;
function unsnap(){
  R.classList.add('no-snap');
  if(snapT) return;
  snapT=(W.requestAnimationFrame||W.setTimeout)(function(){
    snapT=0; R.classList.remove('no-snap'); },0);
}
function perch(el,wallKey,mi){
  var r=el.getBoundingClientRect(), H=W.innerHeight;
  var top=BRC.BAR+8, bot=H*BRC.TIDE_AT-8;
  /* while a plate is up the readable window is the CLEAR BAND ABOVE IT, not the
     whole screen: a mark in the middle column of the procession sits squarely
     behind the very plate it produced, and no amount of vertical scrolling that
     only respects the waterline will ever show it. */
  var vt=vesselTop(wallKey,mi)-10;
  if(vt>top+r.height+4 && vt<bot) bot=vt;
  if(bot-top<r.height+8){ bot=top+r.height+8; }
  if(r.top>=top && r.bottom<=bot) return;            /* already legible - never scroll */
  var want=Math.max(top+r.height/2, Math.min(bot-r.height/2, H*0.17));
  var dy=(r.top+r.height/2)-want;
  if(Math.abs(dy)<1) return;
  unsnap();
  W.scrollTo(0, (W.pageYOffset||R.scrollTop||0)+dy);
}
function litWall(n){
  if(litIdx===n) return;
  litIdx=n;
  for(var j=0;j<walls.length;j++) walls[j].classList.toggle('is-lit', j===n);
}
function roving(m){
  /*S3: covers .axis--live too, so the King Wen headers get a Tab stop when
    activated (m.__w is mark-only; axis buttons fall back to their .wall)*/
  var wIdx=(m.__w!==undefined)?m.__w:+m.closest('.wall').getAttribute('data-wi');
  var list=walls[wIdx].querySelectorAll('.mark,.axis--live');
  for(var j=0;j<list.length;j++) list[j].tabIndex=(list[j]===m?0:-1);
}

/* ---------- 7 - the doorway ---------- */
var hashT=0, hashPend=null;
function writeHash(id){
  hashPend=id;
  if(hashT) return;
  hashT=setTimeout(function(){ hashT=0;
    try{ history.replaceState(null,'','#'+hashPend); }catch(e){} },400);
}
function go(i,opts){
  if(i<0||i>=N) return;
  opts=opts||{};
  var m=marks[i], wn=wallOf[i], from=opts.from||m;
  var crossed=(wn!==cw);
  /* roving() writes tabIndex on every mark of a wall - 64 of them on the square.
     It has no business running once per keystroke during a riffle; the settle
     timer does it once, when the reader has actually stopped. */
  if(!opts.from && opts.mode!=='riffle'){ roving(m); ring=null; }
  else if(!opts.from) ring=null;
  ember(from);
  litWall(opts.from?+opts.from.closest('.wall').getAttribute('data-wi'):wn);
  /* the ember is perched, never centred: perch() early-outs when the cell is
     already legible, so a same-wall step costs no scroll and no layout at all. */
  if(opts.scroll!=='none'||crossed) perch(from, BRC.WALLS[wn].k, i);
  show(m,{mode:opts.mode||'full',returnFocus:opts.returnFocus||m});
  if(opts.hash!==false) writeHash(m.id);
}
BRX.go=go;
function goWall(n){
  /* the room is the destination, not the plate: a tick pressed while a record is
     up used to strand the vessel over an unrelated wall with its Ember 13,000px
     off screen.  (While the vessel is up the lintel is inert, so this is the
     deep-link and no-inert path.) */
  if(up) lower();
  walls[n].scrollIntoView({behavior:'auto',block:'start'});
  setWall(n);
  writeHash(walls[n].id);
  try{ walls[n].focus({preventScroll:true}); }catch(e){}
  say(ticks[n].getAttribute('aria-label'));
}

/* ---------- 7b - R2 + R3.  ONE GLIDE, ONE LIST OF STOPS. ----------
   THE GLIDE.  CSS smooth-scroll is banned and asserted against, and
   scrollIntoView({behavior:'smooth'}) is the same engine under another name: no
   duration dial, and it ends on a long slow tail - which is the exact shape the
   builder has twice now called lag.  So the ride is owned, the way app.js owns
   _u1GlideTo for the U1 descent: rAF, the panel-slide's own bezier, terminated
   HARD within half a pixel rather than asymptoted, a setTimeout backstop for a
   throttled background tab, and a reduced-motion path that simply lands.  It is
   written here rather than called out to the parent because the parent is a
   different document; only the CONSTANTS are shared, so the two read as one hand.
   The curve is styles.css's own .menu__track transition, cubic-bezier(.22,.61,
   .25,1): 78% of the distance is spent in the first half and the last 60px take
   200ms, so it arrives rather than stopping.  (The house's other lesson - a whip
   curve reads as stop-then-lurch, linear beat it - is about a 40px arrow head,
   not about an 800px room; the flat-then-settle shape is what makes a full
   viewport of travel legible instead of a cut.) */
var EASE=[0.22,0.61,0.25,1];
function _bx(a,b,u){ var v=1-u; return 3*v*v*u*a+3*v*u*u*b+u*u*u; }
function _bd(a,b,u){ var v=1-u; return 3*v*v*a+6*v*u*(b-a)+3*u*u*(1-b); }
function ease(t){
  if(t<=0) return 0;
  if(t>=1) return 1;
  var u=t,i,x,d;
  for(i=0;i<8;i++){
    x=_bx(EASE[0],EASE[2],u)-t;
    if(x<1e-4&&x>-1e-4) break;
    d=_bd(EASE[0],EASE[2],u);
    if(d<1e-5&&d>-1e-5) break;
    u-=x/d;
  }
  return _bx(EASE[1],EASE[3],u<0?0:(u>1?1:u));
}
var glR=0, glT=0, glTo=null, glEnd=null, glFin=null;
/* BR-S273 - THE GLIDE A/B.  The owned ride above is main-thread by construction:
   it writes W.scrollTo on every rAF frame, so every frame of a step competes with
   whatever else the main thread is doing.  Chromium's programmatic smooth scroll
   does not - "smooth scrolls initiated using the new API can be driven on the
   compositor thread, and hence remain smooth even when the main thread is busy"
   (the CSSOM View smooth-scroll intent).  That is the one property no amount of
   curve work can buy back, and it is exactly what this page gave up.
   The rejection note above is still half right: native has no duration dial and
   its tail is the browser's, not ours.  Which of the two costs more is a FEEL
   question, so it gets a switch instead of an argument - the house rule from the
   M1 rank reversal: build the A/B, then look.  ?glide=native rides the compositor,
   the bare URL keeps the owned ride.  Nothing is taken away; delete these two
   blocks and the page is byte-identical to before. */
var NATIVEGLIDE=/[?&]glide=native/.test(String(location.search||''));
function docY(){ return W.pageYOffset||R.scrollTop||0; }
function glideStop(){
  if(glR){ W.cancelAnimationFrame(glR); glR=0; }
  if(glT){ clearTimeout(glT); glT=0; }
  if(glFin){ try{ W.removeEventListener('scrollend',glFin); }catch(e){} glFin=null; }
  glTo=null; glEnd=null;
}
function glide(y,ms,done){
  var floor=Math.max(0,R.scrollHeight-W.innerHeight);
  y=Math.round(Math.max(0,Math.min(y,floor)));
  glideStop();
  var from=docY(), d=y-from;
  if(REDUCE||!W.requestAnimationFrame||(d<1&&d>-1)){ W.scrollTo(0,y); if(done)done(); return; }
  if(NATIVEGLIDE){
    /* Hand the ride to the compositor.  done() fires on scrollend where it exists
       and on a timeout everywhere else; the timeout does NOT jump-cut, it only
       settles the bookkeeping, because native may still be easing when it lands. */
    var native=true;
    try{ W.scrollTo({top:y,left:0,behavior:'smooth'}); }catch(e){ native=false; }
    if(native){
      glTo=y; glEnd=done;
      glFin=function(){
        if(glTo===null) return;
        if(glFin){ try{ W.removeEventListener('scrollend',glFin); }catch(e2){} }
        if(glT){ clearTimeout(glT); glT=0; }
        var f=glEnd; glTo=null; glEnd=null; glFin=null; if(f) f();
      };
      try{ W.addEventListener('scrollend',glFin); }catch(e){}
      glT=setTimeout(function(){ glT=0; if(glFin) glFin(); }, ms+700);
      return;
    }
  }
  glTo=y; glEnd=done;
  var t0=0;
  function tick(now){
    if(glTo===null) return;
    if(!t0) t0=now;
    var p=(now-t0)/ms; if(p>1)p=1;
    W.scrollTo(0, from+d*ease(p));
    if(p<1){ glR=W.requestAnimationFrame(tick); return; }
    glR=0; W.scrollTo(0,y);
    var f=glEnd; glTo=null; glEnd=null; if(f) f();
  }
  glR=W.requestAnimationFrame(tick);
  glT=setTimeout(function(){ glT=0; if(glTo===null) return;
    var f=glEnd, at=glTo; glideStop(); W.scrollTo(0,at); if(f) f(); }, ms+400);
}
/* A GLIDE ONLY EVER OWNS THE ACT THAT STARTED IT.  The U1 descent's own rule:
   the instant a hand touches the page the ride is handed back untouched, rather
   than fighting live input - which is the mechanism snap used and the reason it
   had to go.  These are not scroll listeners: they fire on a gesture, never on
   the scrollTo this file is itself performing. */
function glideLet(){ if(glTo!==null) glideStop(); }
W.addEventListener('wheel',glideLet,{passive:true});
W.addEventListener('touchstart',glideLet,{passive:true});
W.addEventListener('pointerdown',glideLet,{passive:true});

/* THE STOPS.  Ten walls - and, inside the Antechamber, its own eight authored
   sections, because 6,100px of prose is not one keystroke.  The rail already
   names those eight positions; this reads them rather than inventing a second
   set that could drift from the ticks the reader can see.
   THE SEAT IS THE WALL'S TOP, NOT ITS MIDDLE.  The house learned this on the
   About surface: centring a section left 136px of the previous surface on screen
   and read as an almost-arrival with no frame.  The number is scroll-margin-top -
   66 on a wall, 74 on a guide section - which is the same number scrollIntoView,
   the tick rail and every deep link already land on, so a stepped arrival and a
   clicked one are the same position and cannot drift apart.
   Measured live on every press.  Cached stops go stale the moment anything above
   them reflows, and this page reflows on a dictionary open and on every resize. */
function seatOf(el,fb){
  try{ var v=parseFloat(W.getComputedStyle(el).scrollMarginTop);
       return (v>=0&&v<400)?v:fb; }catch(e){ return fb; }
}
var SEAT=seatOf(walls[0],66), GSEAT=gsecs.length?seatOf(gsecs[0],74):74, SLACK=24;
var gName=[];
for(i=0;i<gsecs.length;i++){
  var _r=rail[i], _b=_r&&_r.querySelector('b'), _s=_r&&_r.querySelector('span');
  gName.push(_b&&_s?(_b.textContent+' · '+_s.textContent):('Section '+(i+1)));
}
function stops(){
  var y=docY(), floor=Math.max(0,R.scrollHeight-W.innerHeight);
  var raw=[], j, g;
  for(j=0;j<walls.length;j++){
    raw.push({y:walls[j].getBoundingClientRect().top+y-SEAT,
              n:ticks[j].getAttribute('aria-label'), el:walls[j]});
    if(walls[j].classList.contains('wall--prose')){
      for(g=0;g<gsecs.length;g++)
        raw.push({y:gsecs[g].getBoundingClientRect().top+y-GSEAT,
                  n:gName[g], el:gsecs[g]});
    }
  }
  /* clamp into the real scroll range, then drop anything the clamp collapsed
     onto its neighbour - two stops 3px apart are one stop that stutters */
  var out=[], last=-1e9, v;
  for(j=0;j<raw.length;j++){
    v=Math.round(Math.max(0,Math.min(raw[j].y,floor)));
    if(v<=last+8) continue;
    raw[j].y=v; last=v; out.push(raw[j]);
  }
  return out;
}
/* the ride is sized to the distance so a 260px hop between two guide sections is
   not given the same 640ms as a whole room: 300ms floor, 680ms ceiling. */
function stepMs(d){ if(d<0)d=-d; return Math.min(680,Math.max(300,260+d*0.38)); }
var psT=0;
function pageStep(dir,repeat){
  var now=(W.performance&&performance.now)?performance.now():Date.now();
  /* KEY REPEAT.  Held down, a browser fires ~30 keydowns a second; unthrottled
     that is the whole document in half a second and ten announcements nobody
     can read.  A swallowed repeat still returns true, so the native scroll it
     would otherwise have done is still prevented - the page holds still between
     steps instead of sliding underneath them. */
  if(repeat&&(now-psT)<260) return true;
  var S=stops(), k;
  if(S.length<2) return false;
  /* a press landing MID-GLIDE steps on from where the glide was AIMED, not from
     wherever the page happens to be at that instant - otherwise a second press
     re-solves into the stop it is already travelling into and stalls. */
  var at=(glTo!==null)?glTo:docY();
  if(dir>0){ for(k=0;k<S.length;k++){ if(S[k].y>at+SLACK) break; } if(k>=S.length) return false; }
  else{ for(k=S.length-1;k>=0;k--){ if(S[k].y<at-SLACK) break; } if(k<0) return false; }
  psT=now;
  var s=S[k];
  glide(s.y, stepMs(s.y-docY()), function(){
    try{ s.el.focus({preventScroll:true}); }catch(e){}
  });
  /* the room's name reaches a screen reader through the one channel the page
     already has; say() debounces, so a fast walk announces where you stopped */
  say(s.n);
  writeHash(s.el.id);
  return true;
}
BRX.pageStep=pageStep;
BRX.stops=stops;

/* ---------- 8 - walking both axes.  data-ax is build-emitted: left right up down. ---------- */
var AX={ArrowLeft:0,ArrowRight:1,ArrowUp:2,ArrowDown:3};
function neighbour(m,slot){
  var a=(m.getAttribute('data-ax')||'- - - -').split(' ');
  var id=a[slot];
  return (id&&id!=='-'&&byId[id]!==undefined)?byId[id]:-1;
}
/* THE WALK READS THE RESULTS, NOT THE ROOM.  It used to ask each mark's class
   list whether it was cold - which was the same answer only for as long as every
   mark was painted on every keystroke.  res[] is the search's own verdict, it is
   true for all 222 whether or not anyone is looking, and it costs no DOM read. */
function skipCold(i,slot){
  var guard=0;
  while(i>=0 && R.classList.contains('is-searching') && !res[i] && guard++<300){
    i=neighbour(marks[i],slot);
  }
  return i;
}
var lastStep=0, settleT=0;
function step(slot){
  if(ring) return stepRing(slot);
  if(!curMark) return;
  var j=neighbour(curMark,slot);
  j=skipCold(j,slot);
  if(j<0) return;
  var now=(W.performance&&performance.now)?performance.now():Date.now();
  var fast=!REDUCE && (now-lastStep)<140;
  lastStep=now;
  if(fast && !lec.classList.contains('is-riffling')) lec.classList.add('is-riffling');
  go(j,{mode:fast?'riffle':'full',hash:false,scroll:fast?'none':'perch'});
  clearTimeout(settleT);
  settleT=setTimeout(function(){
    if(!curMark) return;
    lec.classList.remove('is-riffling');
    fillRecord(curMark,true);
    roving(curMark); perch(curMark, BRC.WALLS[curMark.__w].k, curMark.__i);
    writeHash(curMark.id);
    say(ADDR[curMark.__i]+' · '+NM[curMark.__i]);
  },150);
}
function stepRing(slot){
  var d=(slot===1||slot===3)?1:-1;
  var p=ringPos+d; if(p<0||p>=ring.length) return;
  ringPos=p;
  var el=ring[p];
  roving(el);
  go(+el.getAttribute('data-i'),{from:el,hash:false});
}
"""


# ============================================================ JS 2 / K1 SEARCH + EVENTS
JS_SEEK = r"""
/* ---------- 9 - K1.  The search is the room's light: classes only, never geometry. ---------- */
var res=[], gres=[], prev=null, gprev=null, hits=[], liveQ=false, curText='', rover=-1;
var qEl=D.getElementById('q');
function zero(){ var j; for(j=0;j<N;j++) res[j]=false; for(j=0;j<gsecs.length;j++) gres[j]=false; }
function scan(toks,infix){
  var a,b,c=0,t,ok;
  for(a=0;a<N;a++){ ok=true;
    for(b=0;b<toks.length;b++){ t=toks[b];
      if(keys[a].indexOf(infix?t:' '+t)<0){ ok=false; break; } }
    res[a]=ok; if(ok)c++; }
  for(a=0;a<gsecs.length;a++){ ok=true;
    for(b=0;b<toks.length;b++){ t=toks[b];
      if(gkeys[a].indexOf(infix?t:' '+t)<0){ ok=false; break; } }
    gres[a]=ok; if(ok)c++; }
  return c;
}
function paint(count,label){
  var j,per={},w;
  hits.length=0;
  for(j=0;j<N;j++){
    if(res[j]){ hits.push(marks[j]); w=BRC.WALLS[wallOf[j]].k; per[w]=(per[w]||0)+1; }
    if(prev&&prev[j]===res[j]) continue;
    marks[j].classList.toggle('is-cold',!res[j]);
    marks[j].classList.toggle('is-hit',!!res[j]);
  }
  /* an Antechamber section is a RESULT, not a rumour.  It used to be counted in
     the readout and then dropped from the walk, so the lintel promised six
     answers and Enter could only ever reach two of them. */
  for(j=0;j<gsecs.length;j++){
    if(gres[j]){ hits.push(gsecs[j]); per['tarot-guide']=(per['tarot-guide']||0)+1; }
    if(gprev&&gprev[j]===gres[j]) continue;
    gsecs[j].classList.toggle('is-cold',!gres[j]);
    gsecs[j].classList.toggle('is-hit',!!gres[j]);
  }
  prev=res.slice(); gprev=gres.slice(); liveQ=true; rover=-1;
  var plates=0,key;
  for(key in per) if(per[key]) plates++;
  var counts=per;
  paintChrome(function(){
    for(var key2 in tickOf){
      var c=counts[key2]||0, t=tickOf[key2];
      if(t.__n!==c){ t.__n=c; t.querySelector('.tick__n').textContent=c?String(c):'';
                     t.setAttribute('aria-label', t.__base+(c?(' — '+c+(c===1?' answer':' answers')):' — no answer')); }
      t.classList.toggle('is-cold',c===0);
    }
    R.classList.add('is-searching');
  });
  slugBox.classList.toggle('has-label',!!label);
  if(count){
    slug('query',(label?label+' · ':'')+count+' · across '+plates+' of 10');
    say((label?'Showing '+label+'. ':'')+count+(count===1?' answer':' answers')+', across '+plates+' of 10 plates.');
  }else{
    slug('query','no mark answers');
    say('No mark answers “'+curText+'”.');
  }
}
function clearSeek(){
  var j;
  if(liveQ){
    for(j=0;j<N;j++){ marks[j].classList.remove('is-cold'); marks[j].classList.remove('is-hit'); }
    for(j=0;j<gsecs.length;j++){ gsecs[j].classList.remove('is-cold'); gsecs[j].classList.remove('is-hit'); }
    for(var key in tickOf){ tickOf[key].__n=0; tickOf[key].querySelector('.tick__n').textContent='';
                            tickOf[key].setAttribute('aria-label',tickOf[key].__base);
                            tickOf[key].classList.remove('is-cold'); }
  }
  prev=null; gprev=null; hits.length=0; liveQ=false; rover=-1;
  slugBox.classList.remove('has-label');
  paintChrome(function(){ R.classList.remove('is-searching'); });
  slug('query',''); say('');
}
/* THE CORRECTION VOCABULARY is names, keywords and addresses - never the tag or
   the meaning.  Built from the full blob it contained "dec", so a correctly
   spelled English word the bank simply does not hold ("deck", the likeliest word
   a tarot reader types) was silently rewritten into a month abbreviation and
   answered with thirty-five December-adjacent marks. */
var voc=null;
function vocab(){
  if(voc) return voc;
  var seen={},a,b,ws,w;
  for(a=0;a<N;a++){ ws=(NK[a]+' '+KWF[a]+' '+fold(ADDR[a])).split(' ');
    for(b=0;b<ws.length;b++){ w=ws[b]; if(w.length>2) seen[w]=1; } }
  for(a=0;a<gkeys.length;a++){ ws=gkeys[a].split(' ');
    for(b=0;b<ws.length;b++){ w=ws[b]; if(w.length>2) seen[w]=1; } }
  voc=[]; for(w in seen) voc.push(w);
  return voc;
}
function within1(a,b){
  var la=a.length, lb=b.length, x;
  if(la===lb){ var d=0,f=-1;
    for(x=0;x<la;x++) if(a.charAt(x)!==b.charAt(x)){ if(++d>2) return false; if(f<0)f=x; }
    if(d<=1) return true;
    return d===2&&a.charAt(f)===b.charAt(f+1)&&a.charAt(f+1)===b.charAt(f); }
  if(Math.abs(la-lb)>1) return false;
  var s=la<lb?a:b, l=la<lb?b:a, p=0, q=0, e=0;
  while(p<s.length&&q<l.length){
    if(s.charAt(p)===l.charAt(q)){ p++; q++; continue; }
    if(++e>1) return false; q++; }
  return true;
}
function correct(toks){
  if(toks.length>2) return null;
  var V=vocab(), out=[], a, b, t, best, bl;
  for(a=0;a<toks.length;a++){
    t=toks[a];
    if(t.length<4){ out.push(t); continue; }
    best=null; bl=0;
    for(b=0;b<V.length;b++){
      if(Math.abs(V[b].length-t.length)>1) continue;
      /* never "correct" a well-formed word by DELETING a letter: deck -> dec,
         cards -> card, tower -> towe.  A deletion-correction is almost always
         the reader being right and the bank being silent. */
      if(V[b].length<t.length) continue;
      if(within1(t,V[b])){ if(!best||V[b].length>bl){ best=V[b]; bl=V[b].length; } } }
    if(!best) return null;
    out.push(best); }
  return out.join(' ')===toks.join(' ')?null:out;
}
function seek(text,sig){
  curText=String(text==null?'':text);
  var toks=qtokens(curText), c=0, label='', j;
  /* "The Tower", "The Fool", "The Moon", "The Star" are all real headwords, so a
     lone stop word must not be a silent no-op: the box heard them, and says so. */
  if(!toks.length&&!sig){
    var raw=fold(curText).split(' ');
    var kept=[]; for(j=0;j<raw.length;j++) if(raw[j]) kept.push(raw[j]);
    if(kept.length!==1){ clearSeek(); return 0; }
    var w1=' '+kept[0];
    zero();
    for(j=0;j<N;j++){ res[j]=(' '+NK[j]).indexOf(w1)>=0; if(res[j])c++; }
    paint(c,'');
    return c;
  }
  /* 1 - the numeric pass, against canonical numbers only.  No birth years, no date
     ranges: that noise lives in data-k where this pass can never reach it. */
  if(!sig&&toks.length===1&&/^[0-9]{1,2}$/.test(toks[0])){
    var pad=' '+String(parseInt(toks[0],10))+' ';
    zero();
    for(j=0;j<N;j++){ res[j]=nums[j].indexOf(pad)>=0; if(res[j])c++; }
    if(c){ paint(c,''); return c; }
    c=0;
  }
  /* 2 - a tapped facet, exact */
  if(sig){
    var s=' '+sig+' ';
    zero();
    for(j=0;j<N;j++){ res[j]=sigs[j].indexOf(s)>=0; if(res[j])c++; }
    if(c){ paint(c,''); return c; }
    c=0;
  }
  c=scan(toks,false);                       /* 3 - token prefix */
  if(!c) c=scan(toks,true);                 /* 4 - infix */
  if(!c){                                   /* 5 - one correction, and it is shown */
    var fixed=correct(toks);
    if(fixed){ c=scan(fixed,false); if(!c)c=scan(fixed,true); if(c) label=fixed.join(' '); }
  }
  if(!c) zero();
  paint(c,label);
  return c;
}
BRX.seek=seek;
BRX.tap=function(plain,sig){ qEl.value=plain; seek(plain,sig||null); if(up) lower(); };

/* THE CONSTELLATION WALK.  Down and Up step the LIT list - not the wall's
   geometry.  Walking geometry from a search put focus on cold marks at 10%
   opacity, with the focus ring drawn inside them at 10% too. */
function openHit(el,rf){
  if(el.classList.contains('mark')) go(el.__i,{scroll:'perch',returnFocus:rf||el});
  else { el.scrollIntoView({behavior:'auto',block:'start'});
         try{ el.focus({preventScroll:true}); }catch(e){} writeHash(el.id); }
}
function focusHit(n){
  if(!hits.length) return;
  if(n<0)n=0; if(n>=hits.length)n=hits.length-1;
  rover=n;
  var m=hits[n];
  if(m.classList.contains('mark')) roving(m);
  else m.tabIndex=-1;
  m.focus({preventScroll:true});
  perch(m, null);
}
BRX.hits=function(){ return hits; };
qEl.addEventListener('input',function(){
  if(up) lower();
  seek(qEl.value,null);
});
qEl.addEventListener('keydown',function(e){
  if(e.key==='ArrowDown'){ e.preventDefault(); focusHit(rover<0?0:rover+1); return; }
  if(e.key==='ArrowUp'&&rover>0){ e.preventDefault(); focusHit(rover-1); return; }
  if(e.key==='Enter'){ e.preventDefault(); if(hits.length) openHit(hits[0],qEl); return; }
  /* Escape on #q is handled in ONE place - the document capture listener below -
     so the three-rung ladder (plate, then live filter, then the aperture) is
     never split across two listeners that each decide stopPropagation on their
     own. */
});
slugX.addEventListener('click',function(){
  if(up) lower();
  qEl.value=''; clearSeek(); qEl.focus();
});

/* ---------- 10 - events.  Delegation only; no per-mark listeners. ---------- */
var room=D.getElementById('room'), lastFocus=null;
room.addEventListener('click',function(e){
  var ax=e.target.closest('.axis--live');
  if(ax){
    ring=[].slice.call(ax.parentNode.querySelectorAll('.axis--live[data-axis="'+ax.getAttribute('data-axis')+'"]'));
    ringPos=ring.indexOf(ax);
    lastFocus=ax;
    roving(ax);
    go(+ax.getAttribute('data-i'),{from:ax,returnFocus:ax});
    return;
  }
  var pl=e.target.closest('.wl-plate');
  if(pl){ lastFocus=pl; showPlate(+pl.getAttribute('data-wi'));
          writeHash('pl-'+BRC.WALLS[+pl.getAttribute('data-wi')].roman.toLowerCase()); return; }
  var mk=e.target.closest('.mark');
  if(mk){ lastFocus=mk; go(mk.__i,{returnFocus:mk}); return; }
  var zg=e.target.closest('[data-sig]');
  if(zg && !e.target.closest('#lectern')){ BRX.tap(zg.getAttribute('data-plain')||'', zg.getAttribute('data-sig')); }
});
room.addEventListener('pointerover',function(e){
  var t=e.target.closest('.mark');
  if(t) slug('hover', ADDR[t.__i]+' · '+NM[t.__i]);
},{passive:true});
room.addEventListener('pointerout',function(e){
  if(!e.relatedTarget||!e.relatedTarget.closest||!e.relatedTarget.closest('.mark')) slug('hover','');
},{passive:true});
room.addEventListener('focusin',function(e){
  var t=e.target.closest('.mark');
  if(t) slug('hover', ADDR[t.__i]+' · '+NM[t.__i]);
});
room.addEventListener('focusout',function(){ slug('hover',''); });

/* the tick rail is ONE tab stop; arrows rove */
var tickPos=0, ticksEl=D.getElementById('ticks');
for(i=0;i<ticks.length;i++) ticks[i].tabIndex=(i===0?0:-1);
ticksEl.addEventListener('keydown',function(e){
  var d=(e.key==='ArrowRight'||e.key==='ArrowDown')?1:(e.key==='ArrowLeft'||e.key==='ArrowUp')?-1:0;
  if(d){ e.preventDefault();
    tickPos=Math.max(0,Math.min(ticks.length-1,tickPos+d));
    for(var r=0;r<ticks.length;r++) ticks[r].tabIndex=(r===tickPos?0:-1);
    ticks[tickPos].focus(); return; }
  if(e.key==='Home'||e.key==='End'){ e.preventDefault(); tickPos=(e.key==='Home'?0:ticks.length-1);
    for(var r2=0;r2<ticks.length;r2++) ticks[r2].tabIndex=(r2===tickPos?0:-1);
    ticks[tickPos].focus(); }
});
ticksEl.addEventListener('click',function(e){
  var a=e.target.closest('.tick'); if(!a) return;
  e.preventDefault(); tickPos=ticks.indexOf(a); goWall(+a.getAttribute('data-wi'));
});
/* R3 - the shot.  Same glide as the keyboard step, on a much shorter clock: the
   duration grows at 1/20th of the distance rather than 2/5ths, so 800px takes
   ~300ms and the whole 14,000px document takes ~620 - fast enough to read as a
   shot, and still on the curve that settles rather than stopping dead.  Focus is
   moved to the first wall on the PRESS, not on arrival: the button itself goes
   visibility:hidden the moment the spy says plate I is the room again, which is
   mid-flight, and a focused element that vanishes drops focus to the body. */
(function(){
  var tt=D.getElementById('totop');
  if(!tt) return;
  tt.addEventListener('click',function(){
    var d=docY();
    try{ walls[0].focus({preventScroll:true}); }catch(e){}
    glide(0, Math.min(620,Math.max(300,260+d*0.05)), null);
    say(ticks[0].getAttribute('aria-label'));
    writeHash(walls[0].id);
  });
})();
for(i=0;i<rail.length;i++){
  rail[i].addEventListener('click',function(e){
    e.preventDefault();
    var el=D.getElementById(this.getAttribute('data-target'));
    if(!el) return;
    if(up) lower();
    el.scrollIntoView({behavior:'auto',block:'start'});
    writeHash(this.getAttribute('data-target'));
  });
}
lec.addEventListener('click',function(e){
  if(e.target.closest('.vx-close')){ lower(); return; }
  var a=e.target.closest('[data-go]');
  if(a){ e.preventDefault(); var t=BRX.byId(a.getAttribute('data-go'));
         if(t) go(t.__i,{scroll:'center',returnFocus:null}); return; }
  var num=e.target.closest('.vx-num');
  if(num){ e.preventDefault(); try{ history.replaceState(null,'',num.getAttribute('href')); }catch(err){} return; }
  var f=e.target.closest('.vx-fct');
  if(f){ BRX.tap(f.getAttribute('data-plain')||'', f.getAttribute('data-sig')); qEl.focus(); return; }
  var kw=e.target.closest('.kw');
  if(kw){ BRX.tap(kw.getAttribute('data-q')||'',null); qEl.focus(); return; }
});
dimEl.addEventListener('click',lower);

/* ---------- 11 - the keyboard ---------- */
function typing(el){ return el&&(el.tagName==='INPUT'||el.tagName==='TEXTAREA'||el.isContentEditable); }
/* LOAD-BEARING: this listener is on DOCUMENT in the CAPTURE phase, and the parent
   app binds its aperture-close handler to the same document node in the BUBBLE
   phase.  A document is visited once going down and once (last) coming up, so
   stopPropagation() here - and ONLY while the vessel is up - is what makes
   "first Escape lowers the plate, second Escape closes the Codex" true.  Do not
   reorder either listener's phase, and do not reach for stopImmediatePropagation. */
D.addEventListener('keydown',function(e){
  var ae=D.activeElement;
  if(e.key==='Escape'){
    /* THE THREE-RUNG LADDER: plate, then the live filter, then the aperture.
       Rung 1 - a record is up: clear whichever field raised it and lower the
       plate, on the SAME press.  Rung 2 - nothing is up but #q still holds a
       query: clear it.  Either rung calls stopPropagation() so the parent's
       own bubble-phase Escape listener never sees this press.  Rung 3 - #q is
       already empty (or the active element is #dq, which owns its own Escape
       clear in JS_DICT): nothing here to do, propagation is left alone, and
       the press reaches the parent - which closes the aperture. */
    if(up){ e.stopPropagation();
            if(ae===dqEl) dqEl.value='';
            if(ae===qEl&&qEl.value){ qEl.value=''; clearSeek(); }
            lower(); return; }
    /* rung 2 is about the ROOM, not about focus.  Gated on ae===qEl it only
       fired for a reader whose cursor was still in the field - walk one hit with
       the arrow keys and Escape skipped straight to rung 3, closing the whole
       Codex with the wall still lit and half of it dimmed out.  A live filter is
       a state of the room, so any Escape anywhere clears it first.  #dq is the
       one exception: it owns its own Escape in JS_DICT, and clearing #q out from
       under a reader typing in the dictionary would answer a press they did not
       make of this field. */
    if(ae!==dqEl&&qEl.value){ e.preventDefault(); e.stopPropagation(); qEl.value=''; clearSeek(); }
    return;
  }
  if(typing(ae)) return;
  if(e.key==='/'){ e.preventDefault(); qEl.focus(); qEl.select(); return; }
  var slot=AX[e.key];
  if(slot!==undefined){
    if(up){ e.preventDefault(); step(slot); return; }
    /* while a search is live, Down and Up walk the LIT list wherever focus is */
    if(R.classList.contains('is-searching')&&hits.length&&(slot===2||slot===3)
       &&ae&&ae.classList&&(ae.classList.contains('mark')||ae.classList.contains('g-sec'))){
      e.preventDefault();
      var at=hits.indexOf(ae);
      focusHit(at<0?0:(slot===3?at+1:at-1));
      return;
    }
    if(ae&&ae.classList&&ae.classList.contains('mark')){
      e.preventDefault();
      var j=skipCold(neighbour(ae,slot),slot);
      if(j>=0){ roving(marks[j]); marks[j].focus({preventScroll:true}); perch(marks[j], null); }
      return;
    }
    /* R2 - THE PAGE STEP, AND IT IS THE LAST CLAIM ON THE ARROW.  Everything
       above owns Down and Up for a reason a reader can see: a raised record
       walks its records, a live search walks its lit list, a focused mark walks
       its own wall.  The page steps only when nothing nearer has asked for the
       key - so the answer to "which one wins" is always "the smallest thing you
       are standing in", and it never changes under you.
       THE FOUR IT MUST NOT TAKE.  typing() above already keeps it out of #q and
       #dq.  The other three run their own arrow handlers in the BUBBLE phase,
       which this capture listener precedes - so without this line the page would
       step INSTEAD of them, silently: the tick rail's roving focus, K3's grip
       nudge (which even calls stopPropagation, and would never be reached), and
       anything inside the vessel. */
    if(slot!==2&&slot!==3) return;
    /* A MODIFIED ARROW IS NEVER OURS.  app.js's own keyboard nav opens with this
       line and it is the reason the browser's shortcuts survive: Shift+Down is a
       selection, Ctrl/Cmd+Down is the platform's, Alt+Down opens a select.  Only
       this branch is guarded - the three above it are pre-existing contracts
       inside a raised record and a live filter, and are not mine to re-decide. */
    if(e.shiftKey||e.ctrlKey||e.metaKey||e.altKey) return;
    if(ae&&ae.closest&&ae.closest('#ticks,.br-grip,#lectern')) return;
    if(BRX.pageStep(slot===3?1:-1,!!e.repeat)) e.preventDefault();
    return;
  }
  if((e.key==='Enter'||e.key===' ')&&ae&&ae.classList&&ae.classList.contains('mark')){
    e.preventDefault(); lastFocus=ae; go(ae.__i,{returnFocus:ae}); return;
  }
  /* typing while a record is up returns you to the search - but Space, PageUp,
     PageDown, Home and End are how a reader reads FURTHER, and must not close it */
  if(up&&e.key.length===1&&e.key!==' '&&!e.metaKey&&!e.ctrlKey&&!e.altKey){ lower(); qEl.focus(); return; }
},true);

/* ---------- 12 - Ctrl+F, and the hash ---------- */
room.addEventListener('beforematch',function(e){
  var b=e.target.closest?e.target.closest('.mark__body'):null;
  if(!b) return;
  var mk=b.parentNode.querySelector('.mark');
  if(!mk) return;
  lastFocus=mk;
  go(mk.__i,{scroll:'center',returnFocus:mk});
  W.requestAnimationFrame(function(){ try{ b.setAttribute('hidden','until-found'); }catch(err){} });
});
function route(h){
  if(!h) return false;
  var t; try{ t=D.getElementById(decodeURIComponent(h)); }catch(e){ t=D.getElementById(h); }
  if(!t) return false;
  if(byId[t.id]!==undefined){ go(byId[t.id],{scroll:'center',returnFocus:null}); return true; }
  var kd=t.getAttribute('data-kind');
  if(kd==='plate'){ var wi=+t.getAttribute('data-wi'); goWall(wi); showPlate(wi); return true; }
  if(t.classList.contains('wall')){ goWall(+t.getAttribute('data-wi')); return true; }
  t.scrollIntoView({behavior:'auto',block:'start'});
  return true;
}
D.addEventListener('click',function(e){
  var a=e.target.closest('a[href^="#"]');
  if(!a||a.classList.contains('tick')||a.classList.contains('g-tick')||a.closest('#lectern')) return;
  var h=a.getAttribute('href').slice(1);
  if(h && route(h)) e.preventDefault();
});
W.addEventListener('hashchange',function(){ route(location.hash.slice(1)); });
(function(){
  var h=location.hash.slice(1);
  if(!h) return;
  W.requestAnimationFrame(function(){ route(h); });
  W.addEventListener('load',function(){ route(h); },{once:true});
})();
"""

# ============================================================ JS 3 / K2 THE DICTIONARY
JS_DICT = r"""
/* ---------- 13 - K2.  The dictionary answers on the vessel, in a second register.
   No network work ever happens except on Enter or a double-click. ---------- */
var API='https://api.dictionaryapi.dev/api/v2/entries/en/';
var dqEl=D.getElementById('dq'), ctrl=null, lookupT=0, curWord='', cacheK=[], cacheV={}, CAP=20;
function cget(w){ if(!cacheV[w]) return null;
  var j=cacheK.indexOf(w); if(j>=0){ cacheK.splice(j,1); cacheK.push(w); } return cacheV[w]; }
function cput(w,rec){ if(!cacheV[w]) cacheK.push(w); cacheV[w]=rec;
  while(cacheK.length>CAP){ var d=cacheK.shift(); delete cacheV[d]; } }
/* the field takes a word.  Accents are folded rather than refused, because Qián
   is a headword in this very Codex, one field away. */
function cleanWord(s){
  s=String(s==null?'':s).replace(/[’']s$/,'').replace(/^[^A-Za-zÀ-ÿ]+|[^A-Za-zÀ-ÿ’'-]+$/g,'');
  if(!s) return '';
  var f=fold(s).replace(/ /g,'');
  return /^[a-z][a-z-]{0,31}$/.test(f)?f:'';
}
/* IN THIS CODEX must answer with correspondences, not with prose coincidence.
   The lowest tier used to be "this token starts some word anywhere in this
   entry's sixty-word meaning", printed under an authoritative heading: "set"
   answered with Ox, and "one" with The Corners of the Mouth. */
function matchesWord(word,n){
  var t=fold(word); if(!t) return [];
  var out=[],j,sc,nk,kw,pre=' '+t,pad=' '+t+' ',weak=[];
  for(j=0;j<N;j++){
    nk=' '+NK[j]+' ';
    kw=' '+KWF[j]+' ';
    sc=0;
    if(nk===pad) sc=100;
    else if(nk.indexOf(pre)>=0) sc=70;
    else if(kw.indexOf(pad)>=0) sc=50;
    else if(kw.indexOf(pre)>=0) sc=40;
    else if(keys[j].indexOf(pad)>=0) weak.push(j);      /* whole word only */
    if(sc) out.push([sc,j]);
  }
  out.sort(function(a,b){ return b[0]-a[0]||a[1]-b[1]; });
  var r=[],lim=(n||3);
  for(j=0;j<out.length&&r.length<lim;j++) r.push(marks[out[j][1]]);
  /* a single prose echo, and only when nothing genuinely corresponds */
  if(!r.length&&weak.length) r.push(marks[weak[0]]);
  return r;
}
/* js is one array entry PER HOMOGRAPH - "bank" the river and "bank" the vault
   are js[0] and js[1].  Reading only js[0] dropped every homograph but the
   first; this walks all of them, capped at the same 3 blocks total. */
function shape(js,w){
  var es=(js&&js.length)?js:[{}], ph='', k,j;
  for(k=0;k<es.length&&!ph;k++){
    var e0=es[k]||{}, ps=e0.phonetics||[];
    if(e0.phonetic){ ph=e0.phonetic; break; }
    for(j=0;j<ps.length&&!ph;j++) if(ps[j]&&ps[j].text) ph=ps[j].text;
  }
  var out={word:(es[0]&&es[0].word)||w,phon:ph,blocks:[]};
  for(k=0;k<es.length&&out.blocks.length<3;k++){
    var ms=(es[k]||{}).meanings||[];
    for(j=0;j<ms.length&&out.blocks.length<3;j++){
      var m=ms[j]||{}, ds=m.definitions||[], defs=[], q;
      for(q=0;q<ds.length&&defs.length<2;q++) if(ds[q]&&ds[q].definition) defs.push(ds[q].definition);
      if(defs.length) out.blocks.push({pos:m.partOfSpeech||'',defs:defs});
    }
  }
  return out;
}
function regHTML(mo){
  if(mo.state==='wait') return '<p class="slip-none">Looking up “'+esc(mo.word)+'”.</p>';
  if(mo.state==='notfound') return '<p class="slip-none">No English definition found for “'+esc(mo.word)+'”.</p>';
  if(mo.state==='unreachable') return '<p class="slip-none">Couldn’t reach the dictionary — the Codex is unaffected.</p>';
  if(mo.state==='refused') return '<p class="slip-none">The English register takes one word at a time, in letters.</p>';
  var e=mo.english,h='',j,q;
  if(!e||!e.blocks.length) return '<p class="slip-none">No English definition found for “'+esc(mo.word)+'”.</p>';
  for(j=0;j<e.blocks.length;j++){
    h+='<p class="slip-pos">'+esc(e.blocks[j].pos)+'</p>';
    for(q=0;q<e.blocks[j].defs.length;q++)
      h+='<p class="slip-def"><b>'+(q+1)+'.</b>'+esc(e.blocks[j].defs[q])+'</p>';
  }
  return h+'<p class="slip-src">Free Dictionary · English</p>';
}
function slipPaint(mo){
  var cx=mo.codex,list='',j;
  for(j=0;j<cx.length;j++)
    list+='<li><a href="#'+cx[j].id+'" data-go="'+cx[j].id+'"><b>'+esc(ADDR[cx[j].__i])+
          '</b>'+esc(NM[cx[j].__i])+'</a></li>';
  vxNum.textContent='EN'; vxNum.setAttribute('href','#');
  vxSys.textContent='THE ENGLISH REGISTER';
  vxHead.textContent=mo.word;
  vxHead.setAttribute('data-hw', mo.word.length>20?'m':'s');
  vxEtym.innerHTML='<i class="br">[</i><span class="slot ws-phon">'+
    esc(mo.english&&mo.english.phon?mo.english.phon:'—')+'</span><i class="br">]</i>';
  vxKw.innerHTML='';
  vxBody.innerHTML=
    '<section class="slip-sec"><b class="vx-lab mono">1 · IN THIS CODEX</b>'+
      (list?'<ul class="slip-list">'+list+'</ul>'
           :'<p class="slip-none">Nothing in the Codex answers to this word.</p>')+
    '</section>'+
    '<section class="slip-sec" id="slip-en"><b class="vx-lab mono">2 · IN ENGLISH</b>'+
      '<div id="slip-reg">'+regHTML(mo)+'</div></section>';
  vxXref.innerHTML = mo.back
    ? 'return to <a href="#'+esc(mo.back.id)+'" data-go="'+esc(mo.back.id)+'">'+esc(mo.back.addr)+'</a>'
    : '';
  vxFoot.textContent='an English word · read beside the Codex';
  gaugeSoon();
}
/* C5 - THE SLIP LIGHTS ITS FIRST ANSWER.  The English register used to answer on
   the vessel and change nothing on the walls: it printed "IN THIS CODEX - TR 08
   Lake" and left the room dark behind it, which made K2 a borrowed instrument
   sitting next to the room rather than an act inside it.  A lookup now does what
   a summon does - the first in-Codex match becomes the Ember, its wall drops
   containment so the one lit cell can paint above the scrim, and the same perch()
   the marks use puts that cell in the clear band above the plate.  The ONE cell
   rule is unchanged: ember() has a single host, and a word the Codex cannot
   answer lights nothing at all rather than leaving the last one burning. */
function slipEmber(mo){
  var e1=(mo.codex&&mo.codex.length)?mo.codex[0]:null;
  if(!e1){ litWall(-1); ember(null); return; }
  ember(e1);
  litWall(e1.__w);
  perch(e1,null);            /* null - a slip is SLIPH tall, not a wall's plate */
}
function slip(word,opts){
  opts=opts||{};
  var w=cleanWord(word);
  /* a rejected word used to be a total silence: the text stayed in the field and
     the page did nothing whatever.  It says what it takes instead. */
  if(!w){
    var raw=String(word==null?'':word).replace(/^\s+|\s+$/g,'');
    if(!raw) return;
    var mr={word:raw.slice(0,40),codex:matchesWord(raw,3),back:opts.back||null,
            state:'refused',english:null};
    slipPaint(mr);
    lec.style.setProperty('--vx-h', BRC.SLIPH+'px');
    slipEmber(mr); ring=null;
    raise('The English register: '+raw,null,opts.returnFocus||dqEl);
    slug('read','EN');
    return;
  }
  if(ctrl){ try{ ctrl.abort(); }catch(e){} ctrl=null; }
  if(lookupT){ clearTimeout(lookupT); lookupT=0; }
  curWord=w; curMark=null; kind='slip';
  var mo={word:w,codex:matchesWord(w,3),back:opts.back||null,state:'wait',english:null};
  var hit=cget(w);
  if(hit){ mo.state=hit.state; mo.english=hit.english; }
  slipPaint(mo);
  lec.style.setProperty('--vx-h', BRC.SLIPH+'px');
  slipEmber(mo); ring=null;
  raise('The English register: '+w,null,opts.returnFocus||dqEl);
  slug('read','EN · '+w.toUpperCase());
  if(hit) return;
  if(!W.fetch){ mo.state='unreachable'; patchReg(mo); return; }
  ctrl=(W.AbortController?new W.AbortController():null);
  /* "Looking up..." must never be a permanent state.  A slow or wedged network
     request had no floor on it at all - the abort path existed only for a
     NEWER word superseding this one, so a request that simply never resolved
     left the slip reading "Looking up..." forever.  6s races the fetch via the
     same AbortController and lands on the SAME unreachable copy a real network
     failure gets. */
  var myCtrl=ctrl;
  if(myCtrl) lookupT=W.setTimeout(function(){ try{ myCtrl.abort(); }catch(e){} },6000);
  W.fetch(API+encodeURIComponent(w),ctrl?{signal:ctrl.signal}:{})
    .then(function(r){
      if(r.status===404) return {state:'notfound'};
      if(!r.ok) return {state:'unreachable'};
      return r.json().then(function(js){ return {state:'ok',english:shape(js,w)}; },
                           function(){ return {state:'unreachable'}; });
    })
    .then(function(out){
      if(lookupT){ clearTimeout(lookupT); lookupT=0; }
      if(out.state==='ok'||out.state==='notfound') cput(w,out);
      if(curWord!==w) return;
      mo.state=out.state; mo.english=out.english;
      patchReg(mo);
      if(out.state==='ok'&&out.english&&out.english.phon){
        var ph=lec.querySelector('.ws-phon'); if(ph) ph.textContent=out.english.phon;
      }
    })
    .catch(function(err){
      if(lookupT){ clearTimeout(lookupT); lookupT=0; }
      /* curWord already moved on to a newer word BEFORE any newer abort() call
         can run (slip() sets it synchronously, ahead of the old promise's
         rejection), so an abort seen while curWord still equals w can only be
         this timeout firing - never a supersede - and must resolve, not vanish. */
      if(curWord!==w) return;
      mo.state='unreachable'; patchReg(mo);
    });
}
function patchReg(mo){ var el=D.getElementById('slip-reg'); if(el) el.innerHTML=regHTML(mo); }
BRX.slip=slip;
dqEl.addEventListener('keydown',function(e){
  if(e.key==='Enter'){ e.preventDefault();
    /* carry the record you were reading, so a word looked up mid-record has a way
       home - the double-click path always had one and this one did not */
    var m=up?curMark:null;
    slip(dqEl.value,{returnFocus:dqEl, back:m?{id:m.id,addr:ADDR[m.__i]}:null});
    return; }
  if(e.key==='Escape'&&dqEl.value){ e.preventDefault(); e.stopPropagation(); dqEl.value=''; }
});
function slipSelection(){
  var sel=W.getSelection&&W.getSelection(); if(!sel) return false;
  var w=cleanWord(String(sel)); if(!w) return false;
  var m=curMark;
  slip(w,{back:m?{id:m.id,addr:ADDR[m.__i]}:null,returnFocus:null});
  return true;
}
lec.addEventListener('dblclick',function(e){
  if(e.target.closest('a,button')) return;
  slipSelection();
});
/* the same act, from the keyboard: select a word inside the plate and press
   Enter.  Double-click alone left this one door mouse-only. */
lec.addEventListener('keydown',function(e){
  if(e.key!=='Enter'||e.target.closest('a,button')) return;
  if(slipSelection()) e.preventDefault();
});
(function(){
  var tg=D.getElementById('dtoggle'), seekBox=D.querySelector('.seek');
  if(!tg) return;
  /* while it is collapsed the dictionary field is invisible AND unreachable -
     it used to keep its place in the tab order sitting at opacity 0 on top of
     the codex search, with no perceivable focus indicator at all */
  function expose(on){ dqEl.tabIndex=on?0:-1; }
  function collapsed(){ return W.matchMedia && W.matchMedia('(max-width:640px)').matches
                        && !seekBox.classList.contains('is-dict'); }
  /* a 128px field cannot carry a sentence-long placeholder */
  var LONG=qEl.getAttribute('placeholder');
  function sync(){
    expose(!collapsed());
    var sm=W.matchMedia && W.matchMedia('(max-width:640px)').matches;
    var want=sm?'search…':LONG;
    if(qEl.getAttribute('placeholder')!==want) qEl.setAttribute('placeholder',want);
  }
  tg.addEventListener('click',function(){
    var on=!seekBox.classList.contains('is-dict');
    seekBox.classList.toggle('is-dict',on);
    tg.setAttribute('aria-expanded',on?'true':'false');
    sync();
    (on?dqEl:qEl).focus();
  });
  dqEl.addEventListener('blur',function(){
    if(!dqEl.value){ seekBox.classList.remove('is-dict'); tg.setAttribute('aria-expanded','false'); sync(); }
  });
  W.addEventListener('resize',sync,{passive:true});
  sync();
})();
"""

# ============================================================ JS 4 / K3 THE MOVABLE SYSTEM
# Recovered from BR-S211/BR-S214, shipped and debugged, then wiped when codex.html
# was regenerated.  Behaviour verbatim; storage key unchanged.  TWO LOAD-BEARING
# FIXES - do not "simplify" either:
#  (i)  lift() re-parents the unit to <body> BEFORE positioning.  The lintel no longer
#       carries backdrop-filter, but ANY future ancestor filter would silently make it
#       the containing block for position:fixed and re-break the drag.
#  (ii) pointermove/pointerup listen on DOCUMENT in the CAPTURE phase, never on the
#       grip: lift() re-parents mid-gesture, which drops the grip's pointer capture.
JS_MOVE = r"""
(function(){
  /* DOCK is how far outside the empty slot the bar's own centre may be and still
     come home on release: 72px on every side of the slot's box.  On a 400px slot
     that is a 544x172 target sitting in the lintel - generous enough to hit with
     a thrown gesture, small enough that it can never be reached from the middle
     of the room, and the two slots are never confused because each bar is only
     ever measured against its OWN. */
  var KEY='brCodexSearchPos_v1', MARGIN=6, THRESH=4, MINW=300, DOCK=72;
  var qEl=document.getElementById('q'), dictEl=document.querySelector('.dict');
  if(!qEl||!dictEl) return;
  var FRAMED=(function(){ try{ return window.self!==window.top; }catch(e){ return true; } })();
  /* the reserved floor is read from the SAME number the CSS and the parent use,
     framed or not: a bar parked in the band is invisible but still clickable. */
  function tide(){ var t=Math.round(window.innerHeight*(BRC.TIDE||0.045));
                   return FRAMED?t+14:t+6; }
  /* while the aperture is open the parent keeps a 42px close-seal pinned to the
     bottom-right of the WHOLE viewport, above this document.  A lamp may not be
     set down on the door. */
  function sealX(){ return FRAMED?Math.min(56,Math.round(window.innerWidth*0.16)):0; }
  function sealY(){ return FRAMED?Math.round(window.innerHeight*0.19)+46:0; }
  function small(){ return window.innerWidth<MINW; }

  var qWrap=document.createElement('div');
  qWrap.className='br-floatwrap br-floatunit';
  qEl.parentNode.insertBefore(qWrap,qEl);
  qWrap.appendChild(qEl);
  dictEl.classList.add('br-floatunit');

  var units={ q:{el:qWrap,name:'the Codex search'}, dict:{el:dictEl,name:'the dictionary'} };
  function isFloating(u){ return u.el.classList.contains('br-floating'); }
  function measure(u){ u.w=u.el.offsetWidth; u.h=u.el.offsetHeight; }
  function clampX(x,w){ var m=window.innerWidth-w-MARGIN; if(m<MARGIN)m=MARGIN; return Math.max(MARGIN,Math.min(x,m)); }
  function clampY(y,h){ var m=window.innerHeight-h-tide(); if(m<MARGIN)m=MARGIN; return Math.max(MARGIN,Math.min(y,m)); }
  function place(u,x,y){
    var w=u.w||u.el.offsetWidth, h=u.h||u.el.offsetHeight;
    var px=clampX(x,w), py=clampY(y,h);
    /* nudge clear of the parent's close-seal rather than parking on top of it */
    var sx=window.innerWidth-sealX(), sy=window.innerHeight-sealY();
    if(sealX()&&px+w>sx&&py+h>sy){
      if(sx-w>=MARGIN) px=clampX(sx-w-8,w); else py=clampY(sy-h-8,h);
    }
    u.el.style.left=px+'px';
    u.el.style.top =py+'px';
  }
  /* R4 - THE SLOT IS AN ELEMENT NOW.  It was a Comment node: the right anchor -
     drop() has always put the unit back in front of it - but a comment has no
     box, so the flex row simply closed over the gap and there was nothing in the
     lintel to aim at.  That is the whole of why you could drag a bar out and
     not drag it home.  Node identity and lifetime are unchanged: it is still
     created once per lift, still lives at the unit's own place in the row for
     as long as the unit floats, and is still consumed by drop().  It is
     display:none at rest, so an element in the row costs the row nothing. */
  function mkslot(){
    var s=document.createElement('i');
    s.className='br-slot'; s.setAttribute('aria-hidden','true');
    return s;
  }
  function lift(u){
    if(isFloating(u)) return;
    var r=u.el.getBoundingClientRect();
    if(!u.ph){ u.ph=mkslot();
               u.el.parentNode.insertBefore(u.ph,u.el);
               document.body.appendChild(u.el); }
    /* the width the row gave it, remembered BEFORE the float adds its padding -
       the hole must be the size of the thing that left, not of the lamp */
    if(!u.slotw) u.slotw=Math.round(r.width);
    u.el.style.width=r.width+'px';
    u.el.classList.add('br-floating');
    measure(u); place(u,r.left,r.top);
    syncCtl();
  }
  /* opened only while that bar is in the hand, and closed on release whatever
     the release did.  The rect is read ONCE here and cached: the pointermove
     path may not call getBoundingClientRect - the parent app is measuring the
     lintel across the iframe boundary on every one of its own frames. */
  function openSlot(u){
    if(!u.ph||!u.ph.classList) return null;
    u.ph.style.width=(u.slotw||u.el.offsetWidth)+'px';
    u.ph.classList.add('is-open');
    var s=u.ph.getBoundingClientRect();
    if(!s.width&&!s.height) return null;
    return {l:s.left-DOCK,t:s.top-DOCK,r:s.right+DOCK,b:s.bottom+DOCK};
  }
  function shutSlot(u){
    if(!u.ph||!u.ph.classList) return;
    u.ph.classList.remove('is-open','is-near');
    u.ph.style.width='';
  }
  /* R4 - HOME BY HAND.  Return has always put BOTH bars back; there was no way
     to put one back with the hand that took it out.  This is that gesture and
     nothing else: it ends in drop(), the same call Return makes, so the state it
     leaves is the state Return leaves - no slot left in the row, no inline
     geometry, no floating class.  And the kept position for THIS bar is struck
     from the record, because a bar sitting in the lintel that springs back out
     on the next reload is a bar that did not come home.  The other bar's kept
     position is untouched, for the same reason Keep merges rather than
     overwrites: a second tab may own it. */
  function dockHome(u){
    drop(u);
    var prev={}, raw=null;
    try{ raw=localStorage.getItem(KEY); if(raw) prev=JSON.parse(raw)||{}; }catch(e){}
    if(!raw) return;
    prev[u.key]=null;
    try{
      if(!prev.q&&!prev.dict) localStorage.removeItem(KEY);
      else localStorage.setItem(KEY,JSON.stringify(prev));
    }catch(e){}
  }
  function drop(u){
    u.el.classList.remove('br-floating');
    u.el.style.left=u.el.style.top=u.el.style.width='';
    if(u.ph){ u.ph.parentNode.insertBefore(u.el,u.ph); u.ph.parentNode.removeChild(u.ph); u.ph=null; }
    syncCtl();
  }
  function attachDrag(u,g){
    var sx=0,sy=0,ox=0,oy=0,pending=false,dragging=false,pid=null,dx=0,dy=0;
    var zone=null,near=false;   /* R4: the cached slot target, and whether we are over it */
    /* the drag path writes a transform, not left/top, while the pointer is
       moving - left/top triggers layout on every sample, transform is
       compositor-only.  will-change is set for the gesture's duration alone
       (round-1 #70's own recommendation, never wired to the drag itself) and
       the final position is baked back into left/top exactly once, on release,
       so place()'s clamp and the parent close-seal nudge still own the rest. */
    function onMove(e){
      if(e.pointerId!==pid) return;
      if(pending){
        if(Math.abs(e.clientX-sx)<THRESH&&Math.abs(e.clientY-sy)<THRESH) return;
        lift(u);
        var r=u.el.getBoundingClientRect(); ox=r.left; oy=r.top; sx=e.clientX; sy=e.clientY;
        pending=false; dragging=true; dx=0; dy=0;
        document.body.classList.add('br-dragging');
        u.el.style.willChange='transform';
        near=false; zone=openSlot(u);       /* R4: the hole opens with the lift */
      }
      if(dragging){
        e.preventDefault();
        var w=u.w||u.el.offsetWidth, h=u.h||u.el.offsetHeight;
        var nx=clampX(ox+(e.clientX-sx),w), ny=clampY(oy+(e.clientY-sy),h);
        dx=nx-ox; dy=ny-oy;
        u.el.style.transform='translate('+dx+'px,'+dy+'px)';
        /* R4: no reads on this path - zone was measured once, at the lift - and
           the class is written only when the answer CHANGES, so crossing the
           threshold costs one style write and holding still costs none. */
        if(zone){
          var cx=nx+w/2, cy=ny+h/2;
          var n=(cx>=zone.l&&cx<=zone.r&&cy>=zone.t&&cy<=zone.b);
          if(n!==near){ near=n; u.ph.classList.toggle('is-near',n); }
        }
      }
    }
    function onUp(e){
      if(e.pointerId!==pid) return;
      document.removeEventListener('pointermove',onMove,true);
      document.removeEventListener('pointerup',onUp,true);
      document.removeEventListener('pointercancel',onUp,true);
      /* R4: a CANCEL is the system taking the gesture away, not a reader letting
         go - it may not be read as "put it down here".  Only a real release docks. */
      var was=dragging, home=(near&&e.type==='pointerup');
      pending=false; dragging=false; pid=null; near=false; zone=null;
      document.body.classList.remove('br-dragging');
      shutSlot(u);
      if(was){
        u.el.style.transform='';
        u.el.style.willChange='';
        if(home){ dockHome(u); }
        else{ place(u,ox+dx,oy+dy); syncCtl(); }
      }
    }
    g.addEventListener('pointerdown',function(e){
      if(e.button!=null&&e.button>0) return;
      if(pid!==null) return;
      e.preventDefault();
      pid=e.pointerId; sx=e.clientX; sy=e.clientY; pending=true; dragging=false;
      document.addEventListener('pointermove',onMove,true);
      document.addEventListener('pointerup',onUp,true);
      document.addEventListener('pointercancel',onUp,true);
    });
    g.addEventListener('keydown',function(e){
      /* the grip is a role="button" span with no click behaviour of its own -
         Enter/Space must still be swallowed, or the browser's default action
         for an unhandled Space on a focused element scrolls the whole page. */
      if(e.key==='Enter'||e.key===' '){ e.preventDefault(); return; }
      var step=e.shiftKey?24:8,kdx=0,kdy=0;
      if(e.key==='ArrowLeft')kdx=-step; else if(e.key==='ArrowRight')kdx=step;
      else if(e.key==='ArrowUp')kdy=-step; else if(e.key==='ArrowDown')kdy=step; else return;
      e.preventDefault(); e.stopPropagation();
      lift(u);
      /* lift() re-parents the unit onto <body>, and a re-parent drops focus held by
         a descendant - so the grip loses the keyboard on its own FIRST press.  In
         BR-S214 the next press merely did nothing; with R2's page stepper in the
         document's capture phase it would step the whole page instead.  Take the
         focus straight back: the grip keeps the keyboard for as long as the reader
         is nudging, and the stepper's .br-grip guard keeps its precondition. */
      g.focus();
      var r=u.el.getBoundingClientRect(); place(u,r.left+kdx,r.top+kdy);
      syncCtl();
    });
  }
  var order=['q','dict'];
  order.forEach(function(k){
    var u=units[k], g=document.createElement('span');
    u.key=k;                    /* R4: which half of the stored record is this bar's */
    g.className='br-grip';
    g.setAttribute('role','button');
    g.setAttribute('tabindex','0');
    g.setAttribute('aria-label','Move '+u.name+' — drag, or use the arrow keys');
    g.setAttribute('title','Drag to move '+u.name);
    u.el.appendChild(g); u.grip=g; attachDrag(u,g);
  });

  /* the strip lives in its lintel home, once, forever - it never re-parents
     onto whichever unit last synced.  That used to make it visibly teleport
     between the search and the dictionary the instant both floated at once,
     and disappear into a 54% void when neither did.  It only ever toggles
     .on in place; place() and measure() are for the two instruments, not for
     this.  The acts are named the way the archive names things: Keep, Return. */
  var ctl=document.createElement('div'); ctl.className='br-posctl';
  ctl.innerHTML='<span class="lbl">position</span>';
  var saveBtn=document.createElement('button'), resetBtn=document.createElement('button');
  saveBtn.type='button'; saveBtn.textContent='Keep'; saveBtn.title='Keep the bars where they are';
  resetBtn.type='button'; resetBtn.textContent='Return'; resetBtn.title='Put the bars back in the bar';
  ctl.appendChild(saveBtn); ctl.appendChild(resetBtn);
  qWrap.parentNode.insertBefore(ctl,qWrap);
  function syncCtl(){
    ctl.classList.toggle('on', isFloating(units.q)||isFloating(units.dict));
  }
  function snap(u){ if(!isFloating(u)) return null;
    return {floating:true,x:parseFloat(u.el.style.left)||0,y:parseFloat(u.el.style.top)||0,w:u.el.offsetWidth}; }
  saveBtn.addEventListener('click',function(){
    /* merge with whatever is already stored rather than overwrite it whole -
       a tab that only has the search floated used to blank out a DICT
       position a sibling tab had already kept, because snap() returns null
       for the unit that is not floating HERE. */
    var prev={}; try{ var raw=localStorage.getItem(KEY); if(raw) prev=JSON.parse(raw)||{}; }catch(e){}
    var qs=snap(units.q), ds=snap(units.dict);
    var merged={ q: qs!==null?qs:(prev.q||null), dict: ds!==null?ds:(prev.dict||null) };
    try{ localStorage.setItem(KEY,JSON.stringify(merged)); }catch(e){}
    saveBtn.classList.add('saved'); saveBtn.textContent='Kept';
    setTimeout(function(){ saveBtn.classList.remove('saved'); saveBtn.textContent='Keep'; },1200);
  });
  resetBtn.addEventListener('click',function(){
    try{ localStorage.removeItem(KEY); }catch(e){}
    stowed=false;
    drop(units.q); drop(units.dict);
  });
  function applySaved(u,s){
    if(!s||!s.floating) return;
    if(!u.ph){ /* the row's own width for this unit, taken while it is still IN
                  the row - after the re-parent there is nothing left to ask */
               if(!u.slotw) u.slotw=Math.round(u.el.getBoundingClientRect().width)
                                    ||Math.round(s.w||240);
               u.ph=mkslot();
               u.el.parentNode.insertBefore(u.ph,u.el);
               document.body.appendChild(u.el); }
    u.el.classList.add('br-floating');
    if(s.w) u.el.style.width=Math.min(s.w,window.innerWidth-2*MARGIN)+'px';
    measure(u); place(u,s.x,s.y);
    u.grip.classList.add('br-restored');
    setTimeout(function(){ u.grip.classList.remove('br-restored'); },2200);
  }
  function restore(){
    var raw; try{ raw=localStorage.getItem(KEY); }catch(e){}
    if(!raw) return;
    var d; try{ d=JSON.parse(raw); }catch(e){ return; }
    if(!d) return;
    applySaved(units.q,d.q); applySaved(units.dict,d.dict);
    syncCtl();
  }
  var stowed=false;
  (function(){ if(small()){ stowed=true; return; } restore(); })();
  var rz=0;
  window.addEventListener('resize',function(){
    if(rz) return;
    rz=window.requestAnimationFrame(function(){
      rz=0;
      if(small()){
        if(isFloating(units.q)||isFloating(units.dict)){ stowed=true; drop(units.q); drop(units.dict); }
        return;
      }
      /* the gate is SYMMETRIC.  Narrowing the window used to drop both bars home
         and then never bring them back - the placement was still in storage, but
         with no floating unit there was no Save/Reset left to restore it with. */
      if(stowed){ stowed=false; restore(); return; }
      order.forEach(function(k){
        var u=units[k];
        if(isFloating(u)){ measure(u); place(u,parseFloat(u.el.style.left)||0,parseFloat(u.el.style.top)||0); }
      });
    });
  },{passive:true});
  if(window.visualViewport) window.visualViewport.addEventListener('resize',function(){
    order.forEach(function(k){ var u=units[k];
      if(isFloating(u)){ measure(u); place(u,parseFloat(u.el.style.left)||0,parseFloat(u.el.style.top)||0); } });
  },{passive:true});
})();
"""

JS_TAIL = r"""
})();
"""


# ============================================================ BUILD - the ten walls
def bind(data):
    """Match each workbook to its wall.  A build that cannot name its ten walls
       must not produce a page."""
    keyed, guide = {}, None
    for w in data:
        s = unicode_str(w.get('system', '')).lower()
        if w.get('kind') == 'guide':
            guide = w
            continue
        if 'western' in s:
            k = 'western'
        elif 'chinese' in s:
            k = 'chinese'
        elif 'numerolog' in s:
            k = 'numerology'
        elif 'minor' in s:
            k = 'tarot-minor'
        elif 'major' in s or 'tarot' in s:
            k = 'tarot-major'
        elif 'rune' in s or 'futhark' in s:
            k = 'runes'
        elif 'trigram' in s:
            k = 'trigrams'
        elif 'ching' in s or 'hexagram' in s:
            k = 'iching'
        elif 'lexicon' in s:
            k = 'lexicon'
        else:
            raise BuildError('unmatched workbook: %r' % w.get('system'))
        need(k not in keyed, 'two workbooks matched wall ' + k)
        keyed[k] = w
    need(guide is not None, 'no guide workbook')
    for w in WALLS:
        if w['k'] != 'tarot-guide':
            need(w['k'] in keyed, 'no workbook for wall ' + w['k'])
    return keyed, guide


BOOKS, GUIDEBOOK = bind(DATA)

# ---- parse every wall, assert the geometry, mint the addresses ----
CELLS = {}
for W_ in WALLS:
    k = W_['k']
    if k == 'tarot-guide':
        continue
    entries = BOOKS[k]['entries']
    cells = PARSERS[k](entries)
    need(len(cells) == len(entries),
         'wall %s: parsed %d cells for %d entries' % (k, len(cells), len(entries)))
    sequence(cells, W_['spine'])
    for i, c in enumerate(cells):
        c['entry'] = entries[i]
        c['addr'], c['id'] = address(k, i, c, entries[i])
        c['i'] = i
    ids = [c['id'] for c in cells]
    need(len(set(ids)) == len(ids), 'wall %s: duplicate ids' % k)
    CELLS[k] = cells

TOTAL = sum(len(CELLS[k]) for k in CELLS)
need(TOTAL == 222, 'expected 222 marks, built %d' % TOTAL)

# ---- the spine chain: one continuous walk through the whole chamber ----
CHAIN = []
for W_ in WALLS:
    k = W_['k']
    if k == 'tarot-guide':
        continue
    cs = CELLS[k]
    for c in sorted(cs, key=lambda x: x['seq']):
        CHAIN.append((k, c))
for n, (k, c) in enumerate(CHAIN):
    c['chain_prev'] = CHAIN[n - 1][1]['id'] if n > 0 else '-'
    c['chain_next'] = CHAIN[n + 1][1]['id'] if n + 1 < len(CHAIN) else '-'


def rib(cells, c, axis, d, span=16):
    look = {}
    for o in cells:
        look[(o['gx'], o['gy'])] = o['id']
    for s in range(1, span + 1):
        key = (c['gx'], c['gy'] + d * s) if axis == 'y' else (c['gx'] + d * s, c['gy'])
        if key in look:
            return look[key]
    return '-'


for W_ in WALLS:
    k = W_['k']
    if k == 'tarot-guide':
        continue
    cs = CELLS[k]
    for c in cs:
        if W_['spine'] == 'x':
            c['ax'] = [c['chain_prev'], c['chain_next'], rib(cs, c, 'y', -1), rib(cs, c, 'y', 1)]
        else:
            c['ax'] = [rib(cs, c, 'x', -1), rib(cs, c, 'x', 1), c['chain_prev'], c['chain_next']]

# ---- cross-references: only where they are genuinely canonical ----
BY = {}
for k in CELLS:
    for c in CELLS[k]:
        BY[(k, c['i'])] = c
NAT2TR = {}
for c in CELLS['trigrams']:
    NAT2TR[c['nature']] = c
NUM2NU = {}
for c in CELLS['numerology']:
    NUM2NU[int(c['entry']['name'])] = c
WX2CZ = {}
for c in CELLS['chinese']:
    if c['zone'] == 'element':
        WX2CZ[c['entry']['name']] = c
HXDOUBLE = {}
for c in CELLS['iching']:
    if c['upper'] == c['lower']:
        HXDOUBLE[c['upper']] = c


def nu_label(cell):
    """A numerology entry's NAME is its own address ('2'), so a cross-link to it
       rendered as a bare filing code with nothing after it.  Name the number."""
    return 'the number ' + numword(int(cell['entry']['name']))


def xref_for(k, c):
    out = []
    if k == 'iching':
        for nat in (c['upper'], c['lower']):
            t = NAT2TR[nat]
            out.append((t['id'], t['addr'], t['vis']))
        if c['upper'] == c['lower']:
            out = out[:1]
    elif k == 'trigrams':
        h = HXDOUBLE.get(c['nature'])
        if h:
            out.append((h['id'], h['addr'], h['short']))
    elif k == 'chinese' and c['zone'] == 'animal':
        t = WX2CZ.get(c['micro'])
        if t:
            out.append((t['id'], t['addr'], t['entry']['name'] + ' element'))
    elif k == 'tarot-minor':
        r = RANKS.index(c['slots'][0])
        if r < 10 and (r + 1) in NUM2NU:
            t = NUM2NU[r + 1]
            out.append((t['id'], t['addr'], nu_label(t)))
    elif k == 'tarot-major':
        if 1 <= c['i'] <= 9 and c['i'] in NUM2NU:
            t = NUM2NU[c['i']]
            out.append((t['id'], t['addr'], nu_label(t)))
    elif k == 'numerology':
        n = int(c['entry']['name'])
        if 1 <= n <= 9:
            t = CELLS['tarot-major'][n]
            out.append((t['id'], t['addr'], t['vis']))
    elif k == 'lexicon':
        if c['zone'] == 'pivot':
            for o in CELLS['lexicon']:
                if o['zone'] == 'plate':
                    out.append((o['id'], o['addr'], o['vis']))
        elif c['zone'] == 'plate':
            for o in CELLS['lexicon']:
                if o['zone'] == 'pivot':
                    out.append((o['id'], o['addr'], o['vis']))
    return out[:3]


# ---- the vessel's height, per wall, from that wall's longest entry.  Within a
#      wall the plate never changes size (Law 10): a riffle must not jitter.
#      +18px of slack, because the estimate was two records short by 4 and 12px
#      and a plate that severs a word is worse than a plate with air in it. ----
_M = dict(PAD=46, TOP=25, ETYM=29, KW=19, XREF=32, FOOT=34, HEADLH=1.10, GAP=13, SLACK=18)


def _lines(t, cpl):
    return 0 if not t else max(1, int(math.ceil(len(t) / float(cpl) * 1.06)))


def hw_class(hw):
    L = len(hw)
    return 's' if L <= 20 else ('m' if L <= 34 else 'l')


def cell_h(c, mobile=False):
    """One record's height, in the plate's own arithmetic.  Rounded to the same
       8px step the wall figure uses, so a fitted plate and a stable plate agree
       exactly on the record that is the wall's longest."""
    e = c['entry']
    hw = c['vis'] or c['short'] or e['name']
    cls = hw_class(hw)
    size, cpl = {'s': (38.0, 24), 'm': (32.0, 22), 'l': (27.0, 26)}[cls]
    if mobile:
        size, cpl = {'s': (26.0, 20), 'm': (23.0, 19), 'l': (20.0, 22)}[cls]
    sense_lh, sense_cpl = (26.7, 62) if not mobile else (25.1, 40)
    h = _M['PAD'] + _M['TOP'] + _M['ETYM'] + _M['XREF'] + _M['FOOT']
    h += _lines(hw, cpl) * size * _M['HEADLH'] + _M['GAP']
    h += _lines(' · '.join(e.get('keywords') or []), 72 if not mobile else 44) * _M['KW'] + 16
    h += _lines(e.get('meaning', ''), sense_cpl) * sense_lh
    rev = (e.get('reversed') or '').strip()
    if rev:
        h += 16 + _lines(rev, sense_cpl) * sense_lh
    return h


def _step8(h):
    return int(math.ceil((h + _M['SLACK']) / 8.0) * 8)


def vessel_h(cells, mobile=False, pct=None):
    """pct=None - the wall's LONGEST record (today's law: the plate never changes
       size within a wall, so a riffle cannot jitter).
       pct=N    - the Nth percentile instead (C4 'tempered'): most of the
       stability, most of the hole deleted, and the tail scrolls."""
    hs = sorted(cell_h(c, mobile) for c in cells)
    if not hs:
        return 0
    if pct is None:
        return _step8(hs[-1])
    # nearest-rank percentile: the smallest height that covers at least pct% of
    # the wall's records.  No interpolation - a plate is a whole record or it is
    # a scroller, and rank is the honest way to say "eight in ten fit".
    i = int(math.ceil(pct / 100.0 * len(hs))) - 1
    return _step8(hs[max(0, min(i, len(hs) - 1))])


VXH, VXHM = {}, {}
VXT, VXTM = {}, {}          # C4 'tempered' - the same figure at VX_PCT
VXP_BY_ID, VXPM_BY_ID = {}, {}   # C4 'fitted'  - one figure per record
for k in CELLS:
    VXH[k] = vessel_h(CELLS[k])
    # the phone plate is a different object: smaller type, tighter chrome, and it
    # is allowed to stand nearer the water (bottom: tide + 12 instead of + 26)
    VXHM[k] = vessel_h(CELLS[k], mobile=True)
    VXT[k] = vessel_h(CELLS[k], pct=VX_PCT)
    VXTM[k] = vessel_h(CELLS[k], mobile=True, pct=VX_PCT)
    for _c in CELLS[k]:
        VXP_BY_ID[_c['id']] = _step8(cell_h(_c))
        VXPM_BY_ID[_c['id']] = _step8(cell_h(_c, mobile=True))
PLATEH = 0
for W_ in WALLS:
    note = (BOOKS[W_['k']] if W_['k'] != 'tarot-guide' else GUIDEBOOK).get('systemNote', '')
    PLATEH = max(PLATEH, 210 + _lines(note, 58) * 29)
PLATEH = int(math.ceil(PLATEH / 8.0) * 8)


# ============================================================ MARKUP - the marks
SLUG = {'western': 'The Western Zodiac', 'chinese': 'The Chinese Zodiac', 'numerology': 'Numerology', 'tarot-guide': 'The Antechamber', 'tarot-major': 'The Major Arcana', 'tarot-minor': 'The Minor Arcana', 'runes': 'The Elder Futhark', 'trigrams': 'The Eight Trigrams', 'iching': 'The I Ching', 'lexicon': 'The Lexicon'}


GIDX = {}          # global mark index, document order
_gi = [0]


def facets_attr(k, c):
    """One sig per slot, pipe-positional.  The labels are NOT repeated here - the
       vessel recovers them by splitting the etymology line on its own joiner."""
    sigs = {}
    for s in c['sig']:
        sigs[s.split(':', 1)[0]] = s
    if k == 'western':
        keys = ['-', 'el', 'mod', 'ruler']
    elif k == 'tarot-minor':
        keys = ['rank', 'suit', 'el']
    elif k == 'chinese':
        keys = ['-', 'wx']
    elif k == 'trigrams':
        keys = ['tri', '-', 'fam', '-']
    elif k == 'iching':
        keys = ['triu', 'tril']
    else:
        keys = ['-'] * len(c['slots'])
    while len(keys) < len(c['slots']):
        keys.append('-')
    out = [sigs.get(keys[j], '') if keys[j] != '-' else '' for j in range(len(c['slots']))]
    return '' if not [x for x in out if x] else '|'.join(out)


def mark_html(k, wi, c):
    e = c['entry']
    gi = _gi[0]
    _gi[0] += 1
    GIDX[c['id']] = gi
    full = e['name']
    head = c.get('head') or full          # what the vessel prints as the headword
    addr = c['addr']
    nums = []
    if k == 'numerology':
        nums.append(re.sub(r'\D', '', e['name']))
    elif k == 'iching':
        nums.append(str(c['i'] + 1))
    elif k == 'tarot-major':
        nums.append(str(c['i']))
    elif k == 'tarot-minor':
        r = RANKS.index(c['slots'][0])
        if r < 10:
            nums.append(str(r + 1))
    if not nums:
        nums.append(str(c['i'] + 1))
    # ---- the visible mark ----
    inner = []
    if c.get('glyph'):
        gid, lab = GLYPH_ID[c['glyph']]
        inner.append(use_glyph(gid, lab))
    if c.get('lines'):
        inner.append(bars_html(c['lines'], 'bars bars--hx' if len(c['lines']) == 6 else 'bars bars--tr'))
    if c.get('fig'):
        inner.append(use_glyph(c['fig'], head))
    if c.get('pip'):
        # aria-hidden, and no label: the button's own accessible name already
        # carries the suit ("MI W01 - Ace of Wands"), so a labelled <svg> here
        # would say "Wands" a second time in the same breath.
        inner.append('<svg class="fig pip" viewBox="0 0 24 24" aria-hidden="true">'
                     '<use href="#%s"/></svg>' % c['pip'])
    if c.get('over'):
        inner.append('<span class="mk-over" aria-hidden="true">%s</span>' % esc(c['over']))
    if not c.get('nameless'):
        inner.append('<span class="mk-n">%s</span>' % esc(c['vis'] or c['short']))
    if c.get('micro'):
        inner.append('<span class="mk-micro">%s</span>' % esc(c['micro']))
    if k == 'iching':
        inner.append('<span class="mk-num">%s</span>' % esc(c['vis']))
    xr = xref_for(k, c)
    # id|label pairs: the LABEL is settled here, where the data is, not guessed
    # from an index at read time.
    xr_attr = ';'.join('%s|%s' % (x[0], x[2]) for x in xr)
    joiner = ' over ' if k == 'iching' else ' %s ' % MID
    # ---- the body: the ONE place the full text lives.  Everything the page needs
    #      about an entry is read back out of here at load, once. ----
    rev = (e.get('reversed') or '').strip()
    # LAW 5.  Where the wall DRAWS a symbol, the entry's own symbol character
    # survives here, byte-verbatim, with U+FE0E appended so it can never be
    # rendered as a colour emoji bitmap.  It lives in a clipped zero-height box:
    # find-in-page and the plain document reach it, painted ink never shows it.
    vb = ''
    if c.get('verbatim'):
        vb = '<span class="sym by">%s</span> ' % esc(text_glyphs(c['verbatim']))
    body = ('<div class="mark__body" hidden="until-found">'
            + '<span class="bn">%s</span> ' % esc(addr)
            + vb
            + '<span class="bh">%s</span> ' % esc(head)
            + '<span class="be">%s</span> ' % esc(joiner.join(c['slots']))
            + '<span class="bk">%s</span> ' % esc((' %s ' % MID).join(e.get('keywords') or []))
            + '<span class="bm">%s</span> ' % esc(e.get('meaning', ''))
            + ('<span class="b2">%s</span> ' % esc(rev) if rev else '')
            + '<span class="bf">%s of %s</span>'
              % (numword(c['i'] + 1), numword(len(CELLS[k])))
            + '</div>')
    fa = facets_attr(k, c)
    # a sighted reader gets the row and column at a glance; the accessible name
    # has to say them, or the grid walls are address-and-headword and nothing else
    ax_words = {
        'western': lambda: '%s, %s' % (c['slots'][1], c['slots'][2]),
        'iching': lambda: '%s over %s' % (c['upper'], c['lower']),
        'trigrams': lambda: c['nature'],
        'chinese': lambda: (c['micro'] + ' element') if c.get('micro') else '',
    }.get(k)
    ax_say = ax_words() if ax_words else ''
    label = addr + ' ' + MID + ' ' + head + (' — ' + ax_say if ax_say else '')
    place = ('' if c.get('auto')
             else ' style="--gr:%d;--gc:%d"' % (c['gy'] + c.get('roff', 1), c['gx'] + c.get('coff', 1)))
    return ('<div class="cell%s"%s>' % (c.get('cellcls', ''), place)
            # tabindex is set once at boot, in the same pass that builds the
            # registry: 221 literal tabindex="-1" attributes is 3.3 KB of markup
            # to say what one loop already has to say anyway.
            + '<button type="button" class="mark" id="%s" data-sig="%s" data-n="%s" data-ax="%s"%s%s'
              ' aria-label="%s">'
              % (c['id'], esc(' '.join(c['sig'])), esc(' '.join(nums)), esc(' '.join(c['ax'])),
                 (' data-f="%s"' % esc(fa)) if fa else '',
                 (' data-x="%s"' % esc(xr_attr)) if xr_attr else '',
                 esc(label))
            + '<span class="mk-in">' + ''.join(inner) + '</span>'
            + '</button>' + body + '</div>')


def wall_open(wi, w, extra=''):
    r = ROMAN[wi]
    return ('<section class="wall%s" id="%s" data-wi="%d" data-kind="wall" tabindex="-1"'
            ' aria-labelledby="%s-t">' % (extra, w['k'], wi, w['k'])
            + '<b class="alias" id="pl-%s" data-kind="plate" data-wi="%d" aria-hidden="true"></b>'
              % (r.lower(), wi)
            + '<div class="wl-head">'
            + '<button type="button" class="wl-plate mono" data-wi="%d">PLATE %s</button>' % (wi, r)
            + '<span class="wl-ord mono" aria-hidden="true">%s</span>' % esc(w['pre'])
            + '<h2 class="wl-title" id="%s-t">%s</h2>' % (w['k'], esc(w['title']))
            + '<p class="wl-rule" aria-hidden="true"></p>'
            + '<p class="wl-furn mono">%s</p>' % esc(w['furn']))


def axis(text, sub, cls, gr, gc, live=None, ax='', fig=None):
    if live is not None:
        # S3: the King Wen square carries the same eight trigram names TWICE -
        # once across the top, once down the side - so a screen reader landing
        # on either reads the identical name with no way to tell which axis it
        # is on.  ax carries which one this button is; label it plainly.
        _albl = {'u': 'Upper %s' % text, 'l': 'Lower %s' % text}.get(ax)
        a = (' class="axis %s axis--live" tabindex="-1" data-i="%d" data-axis="%s"'
             % (cls, live, ax)
             + (' aria-label="%s"' % esc(_albl) if _albl else ''))
        tag = 'button type="button"'
    else:
        a = ' class="axis %s"' % cls
        tag = 'div'
    return ('<%s%s style="grid-area:%d / %d" aria-hidden="%s">%s<span class="axis__t">%s</span>%s</%s>'
            % (tag, a, gr, gc, 'false' if live is not None else 'true',
               use_glyph(fig, text, 'fig axis__f') if fig else '',
               esc(text),
               ('<span class="axis__s">%s</span>' % esc(sub)) if sub else '',
               tag.split(' ')[0]))


def wall_html(wi):
    w = WALLS[wi]
    k = w['k']
    cs = CELLS[k]
    parts_ = [wall_open(wi, w)]
    # S3: the grid had no name and no instructions of its own - a screen reader
    # landing inside it announced nothing beyond "group" (or nothing at all),
    # with no sense of how many marks it held or how to move among them.
    parts_.append('</div><div class="wl-field"><div class="marks" role="group"'
                  ' aria-label="%s, %d marks" aria-describedby="mk-hint">'
                  % (esc(w['title']), len(cs)))
    # every wall is emitted in SEQUENCE order, so the document order is the reading
    # order: the tab ring, the arrow walk and the eye all agree.
    seqd = sorted(cs, key=lambda x: x['seq'])
    out = []

    def zone(text, gap=False):
        return '<div class="zone%s">%s</div>' % (' zone--gap' if gap else '', text)

    if k in ('western', 'tarot-minor', 'iching', 'trigrams'):
        # ---- the true matrices: explicit placement, held at every width ----
        if k == 'western':
            for j, el in enumerate(ELEMENTS):
                out.append(axis(el, '', 'axis--row', j + 2, 1))
            for j, mo in enumerate(MODALITY):
                out.append(axis(mo, '', 'axis--col', 1, j + 2))
        elif k == 'trigrams':
            for j, lab in enumerate(TRI_ROW):
                out.append(axis(lab, '', 'axis--row', j + 1, 1))
        elif k == 'tarot-minor':
            for j, su in enumerate(SUITS):
                out.append(axis(su, SUIT_EL[su], 'axis--col', 1, j + 1,
                                fig='suit-' + su.lower()))
        else:
            for j, nat in enumerate(CHART):
                t = NAT2TR[nat]
                out.append(axis(nat, '', 'axis--col', 1, j + 2, live=GIDX[t['id']], ax='u'))
            for j, nat in enumerate(CHART):
                t = NAT2TR[nat]
                out.append(axis(nat, '', 'axis--row', j + 2, 1, live=GIDX[t['id']], ax='l'))
        for c in seqd:
            c['roff'], c['coff'] = 2, 2
            if k == 'tarot-minor':
                c['coff'] = 1                       # no rank rail: the cell IS the rank
                if c['gy'] == 10:
                    c['cellcls'] = ' cell--court'
            elif k == 'trigrams':
                c['roff'] = 1                       # the row rail names the generation
            out.append(mark_html(k, wi, c))
    else:
        # ---- the clusters: auto-flow in reading order, furniture interleaved ----
        for c in seqd:
            c['auto'] = True
        if k == 'chinese':
            out.append(zone('the twelve animals'))
            out += [mark_html(k, wi, c) for c in seqd if c['zone'] == 'animal']
            out.append(zone('the five elements', True))
            out += [mark_html(k, wi, c) for c in seqd if c['zone'] == 'element']
        elif k == 'numerology':
            out.append(zone('one to nine'))
            out += [mark_html(k, wi, c) for c in seqd if c['gy'] < 3]
            out.append('<div class="seam"></div>')
            out.append(zone('the master numbers'))
            out += [mark_html(k, wi, c) for c in seqd if c['gy'] == 3]
        elif k == 'runes':
            for a in range(3):
                out.append(zone(AETT[a], a > 0))
                out += [mark_html(k, wi, c) for c in seqd if c['gy'] == a]
        elif k == 'lexicon':
            out.append(zone('the front &mdash; the instruments'))
            out += [mark_html(k, wi, c) for c in seqd if c['zone'] == 'front']
            out.append(zone('the pivot', True))
            out += [mark_html(k, wi, c) for c in seqd if c['zone'] == 'pivot']
            out.append(zone('the back &mdash; two of the dossier plates', True))
            out += [mark_html(k, wi, c) for c in seqd if c['zone'] == 'plate']
        else:
            out += [mark_html(k, wi, c) for c in seqd]

    img = BOOKS[k].get('systemImage') if SHOW_SYSTEM_IMAGE else None
    if img:
        # The shipped plate is a BAKED, downscaled sibling of the source file: the
        # treatment is in the pixels, so the page needs no runtime filter and the
        # asset is 8 KB instead of 1.4 MB.  If that sibling is not there, the wall
        # simply has no picture - it must never silently fall back to the original,
        # which is teal-and-blood-red on a #100e0c wall and would be a second
        # palette, on the first screen, louder than anything else on the page.
        cand = re.sub(r'\.(png|jpg|jpeg)$', '.webp', img)
        p = os.path.join(SP, cand.replace('/', os.sep))
        img = (('<img class="wl-plateimg" src="%s" alt="" width="340" height="338"'
                ' loading="lazy" decoding="async">' % esc(cand))
               if (cand != img and os.path.exists(p)) else None)
    return (''.join(parts_) + ''.join(out) + '</div>'
            + (img or '') + '</div></section>')


# the axis headers of wall IX must reference marks that already exist, so the
# trigram wall is emitted before the I Ching wall - which is the document order.
def guide_html(wi):
    w = WALLS[wi]
    g = GUIDEBOOK.get('guide', {})
    secs = g.get('sections', [])
    r = ROMAN[wi]
    rail, cols = [], []
    for j, gs in enumerate(secs):
        head = unicode_str(gs.get('heading', ''))
        short = head.split(u'—')[0].strip() if u'—' in head else head
        addr = 'TG %02d' % (j + 1)
        sid = 'tg-%02d' % (j + 1)
        rail.append('<a class="g-tick" data-g="%d" data-target="%s" href="#%s">'
                    '<b>%s</b><span>%s</span></a>' % (j, sid, sid, esc(addr), esc(short)))
        plain = re.sub(r'<[^>]+>', ' ', gs.get('body', ''))
        # the opening paragraph is the wall's most quotable prose and it was in no
        # index at all: "portraits", "seventy-eight", "deck" returned nothing.
        intro = fold(g.get('intro', '')) if j == 0 else ''
        key = dedupe((fold(head) + ' ' + fold(addr) + ' ' + fold(plain)
                      + ' ' + intro).split())
        legacy = gs.get('id', '')
        cols.append(
            '<section class="g-sec" id="%s" data-kind="guide" data-g="%d" data-k="%s" tabindex="-1">'
            % (sid, j, esc(key))
            + ('<b class="alias" id="%s" aria-hidden="true"></b>' % esc(legacy) if legacy else '')
            + '<h3 class="g-head"><b class="g-addr mono">%s</b>%s</h3>' % (esc(addr), esc(head))
            + gs.get('body', '')
            + '</section>')
    return (wall_open(wi, w, ' wall--prose')
            + '</div><div class="wl-field"><div class="ante">'
            + '<nav class="ante__rail" aria-label="The Antechamber, eight sections">%s</nav>'
              % ''.join(rail)
            + '<div class="ante__col">'
            + ('<p class="g-intro">%s</p>' % esc(g.get('intro', '')) if g.get('intro') else '')
            + ''.join(cols)
            + '</div></div></div></section>')


# ============================================================ THE DOCUMENT
def lintel_html():
    ticks = []
    for wi, w in enumerate(WALLS):
        ticks.append(
            '<a class="tick mono" href="#%s" data-w="%s" data-wi="%d" '
            'aria-label="Plate %s &mdash; %s">'
            '<span class="tick__r">%s</span><span class="tick__n" aria-hidden="true"></span></a>'
            % (w['k'], w['k'], wi, ROMAN[wi], esc(w['title']), ROMAN[wi]))
    return (
        '<header class="stickybar" role="banner">'
        + '<a class="back" href="index.html" aria-label="Back to Blue Room">'
          '<span aria-hidden="true">&larr;</span><span class="back__t">Blue Room</span></a>'
        # the slug's TEXT is aria-hidden (the #sr live region announces it properly),
        # but its clear button is a real control and must be reachable
        + '<div class="slug" id="slug">'
          '<span class="slug__t" id="slugtext" aria-hidden="true"></span>'
          '<button type="button" class="slug__x mono" id="slugclear" hidden tabindex="-1"'
          ' aria-label="Clear the search">clear &times;</button>'
          '</div>'
        + '<nav class="ticks" id="ticks" aria-label="The ten plates">' + ''.join(ticks) + '</nav>'
        + '<div class="seek" role="search">'
        # R3 - THE SHOT.  The old codex kept a 38px circle beside the search with
        # an arrow in it; round one deleted it along with the masthead, and the
        # builder asked for it back by name.  Same place - the lintel, first in
        # the search group, where the hand already goes.  Rendered as a sibling
        # of .seek instead it drifted 130px left and joined the tick rail, which
        # reads as a plate rather than as a control.  The lintel is also the one
        # strip of screen that is provably NOT the membrane's band: 52px at the
        # very top, against a band that starts at 0.955H.
        + '<button type="button" id="totop" class="totop"'
          ' aria-label="Back to the top of the Codex" title="Back to the top">'
          '<span aria-hidden="true">&#8593;</span></button>'
        + '<div class="qfield">'
        + '<input id="q" class="search" type="search" autocomplete="off" spellcheck="false"'
          ' aria-label="Search the Codex" placeholder="search the Codex — a sign, a card, a number…">'
        + '<span class="qmark" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none"'
          ' stroke="currentColor" stroke-width="1.3" stroke-linecap="round">'
          '<circle cx="6" cy="6" r="4.1"/><path d="M9.1 9.1 L12.4 12.4"/></svg></span>'
        + '</div>'
        + '<button type="button" id="dtoggle" class="dtoggle" aria-label="Look up an English word"'
          ' aria-expanded="false">Aa</button>'
        + '<div class="dict"><input id="dq" class="search search--dict" type="search"'
          ' autocomplete="off" aria-label="Define an English word"'
          ' placeholder="define an English word…"></div>'
        + '</div>'
        + '</header>')


VESSEL_HTML = (
    '<div id="dim"></div>'
    '<aside id="lectern" role="dialog" aria-modal="true" tabindex="-1" aria-label="The Codex">'
    '<button type="button" class="vx-close mono" aria-label="Close this record">&times;</button>'
    '<div class="vx-top"><a class="vx-num mono" href="#"></a><span class="vx-sys mono"></span></div>'
    '<h2 class="vx-head" data-hw="s"></h2>'
    '<p class="vx-etym mono msr"></p>'
    '<p class="vx-kw msr"></p>'
    '<div class="vx-body"></div>'
    '<p class="vx-xref mono msr"></p>'
    '<p class="vx-foot mono"></p>'
    '</aside>')


def brc_js():
    wl = []
    for wi, w in enumerate(WALLS):
        book = BOOKS[w['k']] if w['k'] != 'tarot-guide' else GUIDEBOOK
        wl.append({
            'k': w['k'], 'roman': ROMAN[wi], 'title': w['title'],
            'eyebrow': w['eyebrow'], 'furn': w['furn'],
            'slug': SLUG[w['k']].upper(),
            'joiner': ' over ' if w['k'] == 'iching' else ' %s ' % MID,
            'note': book.get('systemNote', ''),
        })
    # BAR / TIDE / TIDE_AT are the SAME numbers the CSS floor and the parent app
    # draw with.  One constant, three consumers, so they can never drift.
    out = {'WALLS': wl, 'VXH': VXH, 'VXHM': VXHM, 'PLATEH': PLATEH,
           'SLIPH': 680, 'BAR': 52, 'TIDE': 0.045, 'TIDE_AT': 0.955}
    # A3/C4: the alternates' numbers ride along ONLY while the toggle is up.  Set
    # VX_TOGGLE False and the page carries one policy's data and nothing else.
    if VX_TOGGLE or VX_DEFAULT == 'tempered':
        out['VXT'], out['VXTM'] = VXT, VXTM
    if VX_TOGGLE or VX_DEFAULT == 'fitted':
        # in the marks' own document order, which is the order m.__i counts in -
        # NOT the bank's order: the wheel and the King Wen square place their
        # cells on a grid whose DOM order is not the JSON's.
        vp, vpm = [0] * len(GIDX), [0] * len(GIDX)
        for _cid, _gi in GIDX.items():
            vp[_gi], vpm[_gi] = VXP_BY_ID[_cid], VXPM_BY_ID[_cid]
        out['VXP'], out['VXPM'] = vp, vpm
    # VXH stays in every configuration: it is also raise()'s "is this a wall?"
    # guard, and ten integers is not a budget.
    return 'var BRC=%s;' % json.dumps(out, ensure_ascii=False, separators=(',', ':'))


def squeeze(src):
    """Drop the generator's margins, blank lines and whole-line comment blocks on
       the way out.  Nothing is reordered and no line is ever joined, so the
       emitted file stays readable - but the reasoning belongs in build_codex.py,
       which is the source of truth, not in 16 KB of prose shipped to a phone
       inside an iframe.  Only comments that occupy a WHOLE line are removed; an
       inline one is left alone, because a `/*` may live inside a string."""
    out, inc = [], False
    for line in src.split('\n'):
        s = line.strip()
        if not s:
            continue
        if inc:
            if s.endswith('*/'):
                inc = False
            continue
        if s.startswith('/*'):
            if not s.endswith('*/'):
                inc = True
            continue
        out.append(s)
    return '\n'.join(out)


# ============================================================ CSS 9 / A3 - THE TOGGLE
# One rule, written last so it beats the media blocks on order as well as on
# specificity (html.tide-datum #lectern is 0-1-1 against the phone block's 0-1-0,
# so the phone's 12px of air yields to the datum too).
CSS_TOGGLE = u''
# C4 'fitted'.  The FIRST attempt sized the plate from the same per-record
# arithmetic the wall figure uses, and measured badly: the estimator carries 18px
# of deliberate slack, an 8px step and a 6% line fudge, so a "fitted" plate still
# stood 57px taller than its record on a desktop and 155px on a phone.  Fitting a
# record by predicting it is fitting it twice.  So the browser does it: the plate
# takes its content's height, and the number the estimator produces demotes to a
# CAP - which keeps vesselTop()'s prediction an over-estimate in every case, so
# perch() stays conservative and can never seat the Ember behind a plate.
_VX_FIT = u"""
html.vx-fitted #lectern{height:auto;max-height:min(var(--vx-h),max(var(--vx-avail),240px))}
@media (max-height:520px){
  html.vx-fitted #lectern{max-height:min(var(--vx-h),max(var(--vx-avail),150px))}
}
"""
if VX_TOGGLE or VX_DEFAULT == 'fitted':
    CSS_TOGGLE += _VX_FIT
# THE PLATE STANDS IN THE WATER; THE WORDS DO NOT.  The landscape plate is its
# own scroller and its foot rule is position:sticky at the scroller's floor, so
# the 10px of submersion lands squarely on the printed glyphs - measured at
# 844x390 before this rule existed, the foot's last line cleared the waterline by
# HALF A PIXEL.  Ten pixels of padding on the scroller lifts the sticky rule by
# exactly the amount the plate is submerged, and the image is unchanged.
_TIDE_DATUM_LAND = u"""
@media (max-height:520px){
  html.tide-datum #lectern{padding-bottom:10px}
}
"""
if TIDE_TOGGLE:
    CSS_TOGGLE += u"""
html.tide-datum #lectern{--vx-rise:-10px}
""" + _TIDE_DATUM_LAND
elif TIDE_DEFAULT == 'datum':
    # the toggle is gone and datum won: the base declaration simply carries the
    # chosen number, and no second branch is written at all.
    CSS_TOGGLE += _TIDE_DATUM_LAND.replace(u'html.tide-datum #lectern', u'#lectern')
    CSS_VESSEL = CSS_VESSEL.replace(u'--vx-rise:26px;', u'--vx-rise:-10px;')
    CSS_RESPONSIVE = CSS_RESPONSIVE.replace(u'--vx-rise:12px;', u'--vx-rise:-10px;')

CSS = squeeze(CSS_TOKENS + CSS_BASE + CSS_LINTEL + CSS_WALLS + CSS_GUIDE
              + CSS_FLOOR + CSS_VESSEL + CSS_MOVE + CSS_RESPONSIVE + CSS_TOGGLE)
# ============================================================ JS 6 / A3 - THE TOGGLES
# Three substitutions, all GENERATED, so that turning a toggle off leaves nothing
# behind: no switch, no branch, no alternate data, no query parser.  With both
# toggles False this emits the byte-for-byte page that shipped before A3.
_A3_PICK = u"""
var VXMODE='%(vxdef)s', TIDEMODE='%(tidedef)s';
(function(){
  var qs=String(location.search||''), want={};
  function pick(name,modes,def,key){
    var m=qs.match(new RegExp('[?&]'+name+'=([a-z]+)')), v=m?m[1]:'';
    if(modes.indexOf(v)>=0){ try{ localStorage.setItem(key,v); }catch(e){} }
    else{ v=''; try{ v=localStorage.getItem(key)||''; }catch(e){}
          if(modes.indexOf(v)<0) v=def; }
    want[name]=(v===def)?'':v;
    return v;
  }
%(picks)s  var raw=qs.replace(/^\\?/,'').split('&'), parts=[], seen={}, i, n, k;
  for(i=0;i<raw.length;i++){
    if(!raw[i]) continue;
    k=raw[i].split('=')[0];
    if(want[k]===undefined){ parts.push(raw[i]); continue; }
    if(seen[k]) continue;
    seen[k]=1; if(want[k]) parts.push(k+'='+want[k]);
  }
  for(n in want){ if(want[n]&&!seen[n]) parts.push(n+'='+want[n]); }
  var q=parts.length?('?'+parts.join('&')):'';
  if(q!==qs){ try{ history.replaceState(null,'',location.pathname+q+(location.hash||'')); }catch(e){} }
})();
"""


def _a3_apply(js):
    boot, vxb, rise = u'', u'', u''
    picks = u''
    if VX_TOGGLE:
        picks += (u"  VXMODE=pick('vx',%s,'%s','brCodexVx_v1');\n"
                  % (json.dumps(list(VX_MODES), separators=(',', ':')), VX_DEFAULT))
        picks += u"  if(VXMODE==='fitted') R.classList.add('vx-fitted');\n"
    if TIDE_TOGGLE:
        picks += (u"  TIDEMODE=pick('tide',%s,'%s','brCodexTide_v1');\n"
                  % (json.dumps(list(TIDE_MODES), separators=(',', ':')), TIDE_DEFAULT))
        # only while the toggle is up: with it down the chosen number is baked
        # into the sheet's own declaration and there is no class to hang.
        picks += u"  if(TIDEMODE==='datum') R.classList.add('tide-datum');\n"
    if SNAP_TOGGLE:
        picks += (u"  if(pick('snap',%s,'%s','brCodexSnap_v1')==='on') R.classList.add('snap-on');\n"
                  % (json.dumps(list(SNAP_MODES), separators=(',', ':')), SNAP_DEFAULT))
    if picks:
        boot = _A3_PICK % {'vxdef': VX_DEFAULT, 'tidedef': TIDE_DEFAULT, 'picks': picks}
    if not VX_TOGGLE and VX_DEFAULT == 'fitted':
        # the switch is gone and fitted won: no parser, just the class the sheet
        # hangs its one declaration on.
        boot = u"\nR.classList.add('vx-fitted');\n" + boot
    # the height policy, one branch per live mode
    _fit = u"if(mi!=null&&BRC.VXP) return (sm?BRC.VXPM:BRC.VXP)[mi];"
    _tmp = u"if(BRC.VXT) return (sm&&BRC.VXTM?BRC.VXTM:BRC.VXT)[wallKey];"
    if VX_TOGGLE:
        vxb = (u"  if(VXMODE==='fitted'){ %s }\n  if(VXMODE==='tempered'){ %s }\n"
               % (_fit, _tmp))
    elif VX_DEFAULT == 'fitted':
        vxb = u"  %s\n" % _fit
    elif VX_DEFAULT == 'tempered':
        vxb = u"  %s\n" % _tmp
    # and the rise, which must equal --vx-rise in the sheet, always
    if TIDE_TOGGLE:
        rise = u"TIDEMODE==='datum'?-10:(sm?12:26)"
    else:
        rise = u"-10" if TIDE_DEFAULT == 'datum' else u"(sm?12:26)"
    return (js.replace(u'/*A3BOOT*/', boot)
              .replace(u'/*A3VXH*/\n', vxb)
              .replace(u'/*A3RISE*/', rise))


JS = squeeze(_a3_apply(JS_CORE) + JS_SEEK + JS_DICT + JS_TAIL + JS_MOVE)


# ---- the palette law, enforced at build.  Any hit here is a build failure. ----
BANNED = ('backdrop-filter', 'prefers-color-scheme', 'scroll-behavior:smooth',
          'scroll-behavior: smooth', 'animation-timeline', 'background-attachment',
          'feturbulence', '#332c25', '#1a1510',
          '#17130f', '#e9e2d5', '#c7bdae', '#8c8175', '#645a4f', '#0d0b09',
          '#8b7bff', '#5e6f60', 'rgb(255,255,255', 'rgba(255,255,255', '#ffffff')
_bare = re.sub(r'/\*.*?\*/', '', CSS, flags=re.S)            # comments may name the bans
_bare = _bare.replace(CSS_TOKENS[CSS_TOKENS.index('--grain'):CSS_TOKENS.index('}\n@font-face')], '')
_bare = re.sub(r'@media\s*print\b.*', '', _bare, flags=re.S)  # paper is not a screen surface
_low = _bare.lower()
for _b in BANNED:
    need(_b not in _low, 'PALETTE LAW: forbidden token %r in the codex CSS' % _b)
need('#6e6b63' not in _low,
     'PALETTE LAW: the old t-ghost fails 4.5:1 as running text at 8-10px')
need('--rubric' not in _bare, 'PALETTE LAW: two golds, not three')

# ---- THE MEMBRANE CONTRACT, machine-checked.  It is not enough to write it in a
#      comment: the parent app measures this document every animation frame. ----
_flat = ' '.join(CSS.split())
_tight = _flat.replace(' ', '')
# the assertions read the DECLARATIONS, never the prose: a comment is allowed to
# name a banned property in order to explain why it is banned
_tightbare = ' '.join(re.sub(r'/\*.*?\*/', '', CSS, flags=re.S).split()).replace(' ', '')
# the same treatment for the script: assert_design reads what the page RUNS, not
# what the comments beside it promise
_jsbare = ' '.join(re.sub(r'/\*.*?\*/', '', JS, flags=re.S).split()).replace(' ', '')


"""THE GEOMETRY ASSERTION, and an honest account of what it can and cannot prove.

Round two ordered "a Python box model per wall asserting field content height <=
room".  A model that predicts a wall's real height cannot be written here: a
mark's height is font metrics - the rune name wraps at one width and not at
another, and the Minor's rank rows are 30px on one viewport and 17px on the next
(measured).  A model that guesses those either blocks correct builds or waves
broken ones through, and a fictional guard is worse than a missing one.

So the build asserts the part that IS arithmetic, and the browser measures the
rest.  What is arithmetic - and what actually broke today - is THE ROOM: the one
divisor every wall shares.  At 844x390 the formula below resolves to 42.9px, and
the King Wen square came out as sixty-four three-pixel cells.  No font metric was
needed to know that was wrong; only the number.  The measured half lives in
scratchpad/codex-r2/x1-lead/measure.py, which walks ten walls at seven viewports
and reports, per wall, how far the lowest mark falls past y = 0.955H.  These are
the numbers it returned for the built page (negative = dry land, the good case):

    viewport      worst wall      lowest mark vs the waterline
    1440 x 900    numerology      -83.8px
    1280 x 720    numerology      -59.4px
    512 x 746     runes           -77.3px
    512 x 542     runes           -131.1px   (was +61.6 before the aett fix)

The three constants those numbers depend on are asserted below by name, so that
removing one fails the build rather than silently drowning a rank.
"""

# --room, evaluated the way a browser would.  Kept beside the CSS it models; if
# the formula is ever reshaped the regex stops matching and the build says so.
ROOM_FLOOR = 240


def room_px(h):
    m = re.search(r'--room:calc\((\d+(?:\.\d+)?)svh - (\d+)px'
                  r' - var\(--head-h\) - var\(--field-pt\) - var\(--field-pb\) - (\d+)px\)',
                  CSS_TOKENS.replace('\n', ' ').replace('  ', ' '))
    if not m:
        m = re.search(r'--room:calc\((\d+(?:\.\d+)?)svh - var\(--bar-h\)'
                      r' - var\(--head-h\) - var\(--field-pt\) - var\(--field-pb\) - (\d+)px\)',
                      CSS_TOKENS)
        need(m, 'GEOMETRY LAW: --room is no longer the formula this assertion models '
                '- re-derive room_px() from CSS_TOKENS before trusting it')
        share, bar, tail = float(m.group(1)), 52.0, float(m.group(2))
    else:
        share, bar, tail = float(m.group(1)), float(m.group(2)), float(m.group(3))

    def clamp(lo, mid, hi):
        return min(max(lo, mid), hi)
    head_h = clamp(22, 4.4 * h / 100.0, 54) + 112
    return share * h / 100.0 - bar - head_h - clamp(12, 2.4 * h / 100.0, 34) \
        - clamp(14, 3 * h / 100.0, 40) - tail


def assert_geometry(css_tight):
    # THE FIVE BOXES: the reference desktop, a real laptop, two phones standing
    # up, and a phone on its side.
    for (w, h) in ((1440, 900), (1280, 720), (390, 844), (360, 640), (844, 390)):
        room = room_px(h)
        if h <= 520:
            # the short-viewport branch states --room instead of deriving it,
            # because the field is no longer a height there - it is a divisor
            need('@media(max-height:520px){' in css_tight,
                 'GEOMETRY LAW: the short-viewport branch has gone missing')
            m = re.search(r'@media\(max-height:520px\)\{[^@]*?:root\{--room:(\d+)px\}', css_tight)
            need(m, 'GEOMETRY LAW: under 520px of glass --room must be STATED, not derived '
                    '- the formula resolves to %dpx there, which draws the King Wen '
                    'square as a grey smear' % room)
            room = float(m.group(1))
        need(room >= ROOM_FLOOR,
             'GEOMETRY LAW: at %dx%d the room every wall divides is %.1fpx, under the '
             '%dpx floor - some wall will be drawn as a smear or under the water'
             % (w, h, room, ROOM_FLOOR))
    # the three constants the measured numbers above depend on
    need('.vx-body{flex:01auto;min-height:96px' in css_tight,
         'GEOMETRY LAW: the reading surface has a 96px floor - without it a short '
         'screen gives the meaning zero pixels and the chrome all of them')
    need('height:min(var(--vx-h),max(var(--vx-avail),240px))' in css_tight,
         'GEOMETRY LAW: the plate may stand into the band rather than collapse')
    need('@media(max-height:680px){#runes.marks{grid-template-columns:repeat(8' in css_tight,
         'GEOMETRY LAW: on a short screen the runes are three aettir of eight - at four '
         'columns the last rank was measured 61.6px under the waterline')
    # the escape hatch must be whole: a field free to outgrow its screen and a
    # page still snapping one screen at a time is a document that fights itself
    m = re.search(r'@media\(max-height:520px\)\{(.*?)\}\}', css_tight, flags=re.S)
    blk = m.group(1) if m else ''
    for _r in ('html{scroll-snap-type:none}', 'html.snap-on{scroll-snap-type:none}',
               '.wl-field{height:auto;max-height:none}'):
        need(_r in blk, 'GEOMETRY LAW: the short-viewport branch is half-applied - %s' % _r)
    # THE LANDSCAPE PLATE, asserted as one object.  Measured before these five
    # declarations existed: at 844x390 the plate took 96% of the width and 68% of
    # the height, 155 of 222 records printed their foot rule below their own
    # border in the water (worst 66px), and 24 marks could not be seen beside the
    # record they produced.  Each line below is load-bearing for one of those
    # numbers, and any one of them removed puts the number back.
    for _r, _why in (
            ('overflow-y:auto', 'the landscape plate must SCROLL - it is the only '
                                'thing that keeps a record inside its own border'),
            ('width:min(calc(var(--measure)+2*var(--vx-pad)),92vw)',
             'the landscape plate is read at a measure - 96vw is the standing '
             "phone's rule and it leaves the wall no width to be seen in"),
            ('height:min(var(--vx-h),max(var(--vx-avail),150px))',
             'the landscape plate scrolls, so it does not need the 240px floor - '
             'and with it the band cannot be paid for'),
            ('--vx-band:max(96px,26svh)',
             'the clear band above the landscape plate must hold one lit cell - '
             'a 60px cell in a 44px band is an Ember with nowhere to burn'),
            ('.vx-foot{position:sticky',
             'the foot rule holds the plate floor while the record passes under '
             'it - that is the signal, and it is why nothing prints below')):
        need(_r in blk, 'GEOMETRY LAW: the landscape plate is half-applied - %s (%s)'
             % (_r, _why))


def assert_scroll(css_tight, js_tight):
    """THE SCROLL LAW (R4/S1).  Measured, 40 gestures per condition: with
       `scroll-snap-type:y proximity` the page ran 373 frames BACKWARDS, handed
       back 5,246px, delivered under half of what was asked on 19 of 40 gestures
       and literally nothing on 10, and kept moving for a median 136ms after the
       hand stopped.  Every one of those numbers went to zero with snap off.  The
       four rules below are the whole of that fix; any one of them re-written puts
       one of those numbers back."""
    need('html{' in css_tight and 'scroll-snap-type:none' in css_tight,
         'SCROLL LAW: the root must declare scroll-snap-type - a page that leaves '
         'it to the initial value has no statement to read and no hatch to open')
    need(css_tight.count('scroll-snap-type:yproximity') == (1 if SNAP_TOGGLE else 0),
         'SCROLL LAW: proximity snap may appear exactly once, behind html.snap-on, '
         'and never in the base rule')
    if SNAP_TOGGLE:
        i_on = css_tight.find('html.snap-on{scroll-snap-type:yproximity}')
        i_off = css_tight.find('html.is-reading,html.no-snap{scroll-snap-type:none}')
        need(i_on > 0 and i_off > i_on,
             'SCROLL LAW: html.snap-on and the reading/placing hatches are the same '
             'specificity, so the hatches must be written AFTER it - otherwise '
             '?snap=on drags the page back off a freshly perched Ember')
        need("pick('snap'" in js_tight and "classList.add('snap-on')" in js_tight,
             'SCROLL LAW: nothing reads ?snap= - the escape hatch is a comment')
    else:
        need('snap-on' not in css_tight and "pick('snap'" not in js_tight,
             'SCROLL LAW: with SNAP_TOGGLE off the losing branch must be GONE')
    need('scroll-margin-top:calc(var(--bar-h)+14px)' in css_tight,
         'SCROLL LAW: scroll-margin-top IS the seat now that snap is gone - every '
         'correct rest on this page is wallTop-66, and the tick rail, the deep '
         'links and the keyboard all get it from here')
    # `overscroll-behavior` is a different property and the tick rail needs it,
    # so this looks for the word at a declaration boundary, not anywhere.
    need(re.search(r'(^|[;{])scroll-behavior:', css_tight) is None,
         'SCROLL LAW: no CSS smooth-scroll - a glide with no duration dial ends on '
         'a slow tail, and a slow tail is what the builder called lag')


def assert_controls(css_tight, js_tight, doc):
    """THE THREE CONTROLS (R4/S2).  The builder asked for all three by name, and
       one of them - the drag home - has already been silently lost once in a
       regeneration.  Each rule below is one whole decision; a later tidy-up that
       reads any of them as redundant fails the build instead of shipping a page
       that quietly stopped answering the key or the hand."""
    # ---- R2, the stepper ----
    need('functionstops(' in js_tight and 'functionpageStep(' in js_tight,
         'R2 LAW: the keyboard stepper has gone - Down and Up no longer stop at '
         'the major sections')
    need('BRX.pageStep(' in js_tight,
         'R2 LAW: the stepper exists but nothing presses it - the document '
         'keydown listener is where the arrow is actually claimed')
    need("classList.contains('wall--prose')" in js_tight,
         "R2 LAW: the Antechamber is 6,100px of prose in eight authored sections "
         "and must carry its own sub-stops - one keystroke past all of it is not "
         "a step, it is a jump")
    need('getComputedStyle(el).scrollMarginTop' in js_tight,
         'R2 LAW: the seat is read from scroll-margin-top, never written twice - '
         'a literal here is a second source of truth for the one number the tick '
         'rail, every deep link and scrollIntoView already agree on')
    need('e.shiftKey||e.ctrlKey||e.metaKey||e.altKey' in js_tight,
         'R2 LAW: a modified arrow belongs to the browser - Shift is a selection '
         'and Ctrl/Cmd is the platform\'s')
    need("ae.closest('#ticks,.br-grip,#lectern')" in js_tight,
         'R2 LAW: the page step is the LAST claim on the arrow.  The tick rail, '
         "K3's grip and the vessel each run their own arrow handler in the bubble "
         'phase this capture listener precedes, so they must be named here or '
         'the page steps instead of them, silently')
    need('if(repeat&&(now-psT)<260)' in js_tight,
         'R2 LAW: key repeat is throttled - a held arrow fires ~30 times a second '
         'and would walk the whole document in half of one')
    # ---- the glide both R2 and R3 ride ----
    need('functionglide(' in js_tight and 'requestAnimationFrame(tick)' in js_tight,
         'R2/R3 LAW: the ride is owned.  CSS smooth-scroll is banned; '
         'scrollIntoView({behavior:"smooth"}) is the same engine under another '
         'name and ends on the slow tail the builder called lag')
    need('if(REDUCE||!W.requestAnimationFrame' in js_tight,
         'MOTION LAW: reduced motion must LAND, not travel')
    need("W.addEventListener('wheel',glideLet" in js_tight,
         'R2/R3 LAW: a glide owns only the act that started it - a hand on the '
         'page takes it back.  Fighting live input is what snap did')
    # ---- R3, the shot ----
    need(doc.count('id="totop"') == 1 and '<button type="button" id="totop"' in doc,
         'R3 LAW: exactly one back-to-top, and it is a real button')
    need('<div class="seek" role="search"><button type="button" id="totop"' in doc,
         'R3 LAW: the way back up lives in the lintel, first in the search group. '
         'Outside .seek it drifts to the tick rail and reads as an eleventh plate; '
         'below the lintel it would be in the membrane\'s band')
    need('aria-label="Back to the top of the Codex"' in doc,
         'R3 LAW: an arrow glyph is not a name')
    _tt = re.search(r'\.totop\{[^}]*width:(\d+)px;height:(\d+)px', css_tight)
    need(_tt and int(_tt.group(1)) >= 24 and int(_tt.group(2)) >= 24,
         'R3 LAW: 24px is this page\'s hit floor (WCAG 2.5.8), the same floor the '
         'ten ticks are held to on a phone')
    # anchored on `flex:` so this reads the BASE rule and not the phone branch's
    # `.seek.is-dict>.totop{visibility:hidden;opacity:0}`, which says the same
    # words about a different question and let an early draft of this probe pass
    need(re.search(r'\.totop\{flex:[^}]*visibility:hidden;opacity:0', css_tight)
         and 'body.past-first.totop{visibility:visible;opacity:1}' in css_tight,
         'R3 LAW: quiet at rest.  It is not shown on the first plate, where its '
         'act is already done - and it is hidden by VISIBILITY, which keeps the '
         'box (so the rail never jumps) and still takes it out of the tab order')
    need("classList.toggle('past-first'" in js_tight,
         'R3 LAW: the reveal rides the scroll-spy that was already running.  A '
         'scroll listener here would be a second one on the thread the parent '
         'measures the lintel on')
    need('.seek.is-dict>.totop{visibility:hidden;opacity:0}' in css_tight,
         'R3 LAW: on a phone the English register is laid over the WHOLE seek at '
         'left:0, so the way back up goes under it with the search rather than '
         'sitting on top of a field it has nothing to do with')
    # ---- R4, the drag home ----
    need('document.createComment' not in js_tight,
         "R4 LAW: the slot must be an ELEMENT.  As a comment node it had the "
         "right anchor and no box, so the row closed over the gap and there was "
         "nothing in the lintel to drag a bar back to - which is exactly the "
         "gesture the builder asked for by name")
    need('.br-slot{display:none}' in css_tight and '.br-slot.is-open{' in css_tight
         and '.br-slot.is-near{' in css_tight,
         'R4 LAW: the empty place is drawn only while a bar is in the hand, and '
         'says so twice - open, and within reach')
    need('functiondockHome(' in js_tight and 'functionopenSlot(' in js_tight
         and 'functionshutSlot(' in js_tight,
         'R4 LAW: the docking gesture has gone')
    need('DOCK=72' in js_tight,
         'R4 LAW: the docking reach is one stated number, not a magic literal '
         'buried in the pointermove path')
    need("if(home){ dockHome(u); }".replace(' ', '') in js_tight.replace(' ', ''),
         'R4 LAW: docking happens on RELEASE, in onUp, before the place() that '
         'would otherwise bake the floating position back in')
    need("e.type==='pointerup'" in js_tight,
         'R4 LAW: a pointercancel is the system taking the gesture away, not a '
         'reader letting go - it may not be read as "put it down here"')
    need('functionmkslot(' in js_tight and js_tight.count('u.ph=mkslot()') == 2,
         'R4 LAW: both places that open a slot - the lift and the restore - must '
         'mint the same node, or a bar restored from storage has no way home')
    # THE PARENT MEASURES THIS LINTEL EVERY FRAME.  A getBoundingClientRect on
    # the pointermove path is a forced layout per pointer sample, across the
    # iframe boundary, while the builder is watching his own white line.
    _m = re.search(r'functiononMove\(e\)\{(.*?)functiononUp\(e\)\{', js_tight, flags=re.S)
    need(_m, 'R4 LAW: onMove/onUp are no longer where they were - re-derive this check')
    _mv = _m.group(1)
    need(_mv.count('getBoundingClientRect') == 1,
         'R4 LAW: exactly ONE getBoundingClientRect on the drag path, and it is '
         'the one at the lift.  The slot target is measured once there and '
         'cached; the app reads .stickybar across the iframe on every frame, so '
         'a read per pointer sample is a forced layout per sample')
    need('zone=openSlot(u)' in _mv and 'if(n!==near)' in _mv,
         'R4 LAW: the slot is measured at the lift and the near class is written '
         'only when the answer CHANGES - holding still must cost nothing')


def assert_membrane(css_tight, doc):
    need(css_tight.count('.stickybar{position:sticky;top:0') == 1,
         'MEMBRANE LAW 1: .stickybar must be position:sticky; top:0, exactly once')
    need(doc.count('class="stickybar"') == 1,
         'MEMBRANE LAW 1: exactly one .stickybar in the document')
    need('--bar-h:52px' in css_tight, 'MEMBRANE LAW 1: --bar-h must be 52px')
    need(re.search(r'@media[^{]*\{[^}]*--bar-h:', css_tight) is None,
         'MEMBRANE LAW 1: --bar-h may never be overridden in a media query')
    need('height:var(--bar-h);min-height:var(--bar-h);max-height:var(--bar-h)' in css_tight,
         'MEMBRANE LAW 1: the lintel is 52px in every state')
    need('backdrop-filter' not in css_tight, 'MEMBRANE LAW 1: no backdrop-filter, ever')
    need('--tide:4.5svh' in css_tight and '--tide:4.5vh' in css_tight,
         'MEMBRANE LAW 4: --tide is 4.5svh with a vh fallback')
    need('var(--shore)calc(100%-var(--tide))' in css_tight,
         'MEMBRANE LAW: .shore must reach full --shore at calc(100% - var(--tide)) - that '
         'row is y=0.955H, where the parent starts painting #0b0b0d.')
    # the occluder must sit ABOVE the vessel, or the rise is a slide, not a surfacing
    tz = re.search(r'\.tide\{[^}]*z-index:(\d+)', css_tight)
    lz = re.search(r'#lectern\{[^}]*z-index:(\d+)', css_tight)
    need(tz and lz and int(tz.group(1)) > int(lz.group(1)),
         'MEMBRANE LAW: .tide must paint above #lectern - it is what the plate rises through')
    need('.tide-guard{position:fixed' in css_tight,
         'MEMBRANE LAW 4: nothing below --tide-safe may be clickable')
    # MEMBRANE LAW 5: the frame's own furniture.  The parent keeps a 42px seal at
    # right:12px above everything; on a phone it lands ON the marks, and it is in
    # a document this page cannot reach.  The strip is reserved, framed only.
    need('--seal-safe:58px' in css_tight,
         'MEMBRANE LAW 5: --seal-safe must reserve the parent seal (12 + 42 + 4)')
    need('html.framed.wl-head,html.framed.wl-field{padding-right:var(--seal-safe)}' in css_tight,
         'MEMBRANE LAW 5: the framed column must reserve the seal on a small screen')
    for _n in ('.back', 'id="q"', 'id="dq"', 'class="dict"'):
        need(_n in doc, 'MEMBRANE LAW 2: %s must keep its name' % _n)


def assert_style(css_tight):
    need('background-attachment' not in css_tight,
         'PERF LAW: a fixed-attachment background cannot be composited-scrolled')
    need(css_tight.count('@keyframes') == 0, 'MOTION LAW: nothing animates at rest')
    need('scroll-behavior:smooth' not in css_tight, 'MOTION LAW: no smooth scrolling')
    # HIGH CONTRAST: the scrim is a STATE, not a surface.  Any forced-colors rule
    # that reaches #dim without .is-on paints an opaque blank over the whole page
    # at rest and eats every click on it.
    _at = css_tight.find('@media(forced-colors:active){')
    need(_at >= 0, 'FORCED-COLORS LAW: the high-contrast block has gone missing')
    _i, _d, _fc = _at + len('@media(forced-colors:active){'), 1, ''
    while _d and _i < len(css_tight):
        _c = css_tight[_i]
        _d += (_c == '{') - (_c == '}')
        if _d:
            _fc += _c
        _i += 1
    for _m in re.finditer(r'#dim(\.[A-Za-z-]+)?[,{]', _fc):
        need(_m.group(1) == '.is-on',
             'FORCED-COLORS LAW: #dim may only be painted while .is-on')


def assert_dict_scope(css_tight):
    """M2: K3's lift() re-parents `.dict`/`.br-floatwrap` out of `.seek` and onto
       <body> the moment either becomes a floated unit.  A bare, unscoped selector
       that sets opacity:0 on either class can therefore match the FLOATED node
       too - and once it does, the reveal rule (a descendant selector keyed to the
       docked `.seek` ancestor) can never match that re-parented node again, so
       the dictionary vanishes from the phone permanently.  Every collapse rule
       below max-width:640px must be child-scoped to `.seek`."""
    need('.seek>.dict{' in css_tight,
         'M2 LAW: the phone dict collapse must be scoped .seek>.dict')
    need('.seek.is-dict>.dict{opacity:1' in css_tight,
         'M2 LAW: the phone dict reveal must be scoped .seek.is-dict>.dict')
    need('.seek.is-dict>#q,.seek.is-dict>.br-floatwrap{opacity:0' in css_tight,
         'M2 LAW: the field/float collapse under is-dict must be child-scoped')
    need('.br-floatunit.br-floating{opacity:1!important' in css_tight,
         'M2 LAW: a floated K3 unit must always resolve to opacity:1 (belt fix)')
    need(re.search(r'(?:^|[,}])\.dict\{[^}]*opacity:0', css_tight) is None,
         'M2 LAW: no unscoped bare .dict{...} rule may set opacity:0')
    need(re.search(r'(?:^|[,}])\.br-floatwrap\{[^}]*opacity:0', css_tight) is None,
         'M2 LAW: no unscoped bare .br-floatwrap{...} rule may set opacity:0')


def assert_no_bare_symbol(doc):
    """Every symbol character that survives in the painted document must carry
       U+FE0E.  A bare one falls into a colour emoji font and prints violet."""
    for ch in GLYPH_ID:
        at = 0
        while True:
            at = doc.find(ch, at)
            if at < 0:
                break
            need(doc[at + 1:at + 2] == VS15,
                 'GLYPH LAW: bare symbol %r at %d - it will render as an emoji bitmap'
                 % (ch, at))
            at += 1


def assert_design(css_tight, doc, js_tight):
    """ROUND THREE, THE FOUR DESIGN CALLS.  Each of these is one declaration or one
       call that a later tidy-up would read as redundant and delete, and each of
       them is the whole of a decision the builder made from a render.  They are
       asserted by name so that removing one fails the build instead of quietly
       returning a wall to the state it was judged in."""
    # C1a - the suit is in every cell of wall VI, drawn from the sprite that
    # already holds four pips.  56, not 60: the four column heads are not cells.
    need(doc.count('class="fig pip"') == 56,
         'C1 LAW: every one of the 56 Minor cells carries its suit pip, got %d'
         % doc.count('class="fig pip"'))
    _pip = re.search(r'#tarot-minor\.pip\{width:10px;height:10px;opacity:(\.\d+)',
                     css_tight)
    need(_pip and float(_pip.group(1)) <= 0.45,
         'C1 LAW: the pip is SUBORDINATE - 10px and under .45 of the rank\'s ink. '
         'At full strength 56 of them are wallpaper, which is what killed the '
         'first attempt at this')
    need('#tarot-minor.mk-n{' in css_tight and 'min-width:8ch' in css_tight,
         'C1 LAW: the rank keeps a track one KNIGHT wide, or the pips step in and '
         'out with the length of the word and read as noise')
    # C1b - wall X says what each instrument IS, in the bank's own words.
    for _p in (u'the silver instrument', u'the original photograph',
               u'the material module', u'the sealed back'):
        need(doc.count(_p) >= 2,
             'C1 LAW: wall X prints the tag phrase %r on the wall as well as in '
             'the record - it is the only thing that tells seven bare nouns apart' % _p)
    need('#lexicon.mk-micro{text-align:left;text-transform:none' in css_tight,
         'C1 LAW: wall X\'s phrase is a PHRASE - tracked capitals make it a third '
         'label shouting under the zone head and the name')
    # C2 - the two sparse walls own their width.
    need('#numerology.marks{grid-template-columns:repeat(3,minmax(0,1fr));width:100%'
         in css_tight,
         'C2 LAW: wall III takes its own column - at 110px tracks twelve marks sat '
         'in the left third of it')
    need('#numerology.mark{place-items:centerstart}' in css_tight,
         'C2 LAW: wall III is set to the START of its tracks - that is what keeps '
         'the numerals on the same x as the title, the rule and the zone label')
    need('justify-content:start;width:100%;gap:0}' in css_tight,
         'C2 LAW: the King Wen square keeps the shared left edge - centring it '
         'stranded its own head 270px away and was taken back out')
    # C5 - the English register is an act inside the room, not beside it.
    need('functionslipEmber(' in js_tight, 'C5 LAW: the slip has no Ember at all')
    for _c in ('slipEmber(mo);ring=null;', 'slipEmber(mr);ring=null;'):
        need(_c in js_tight,
             'C5 LAW: BOTH slip paths light their first in-Codex answer (%s), or '
             'K2 is borrowed furniture again' % _c)
    need('litWall(-1);ember(null);return;' in js_tight,
         'C5 LAW: a word the Codex cannot answer lights NOTHING - it must not '
         'leave the last cell burning')
    # C6 - the page says its own name, once.
    # ONE line on ONE wall.  Two copies of the string, not two places it is read:
    # the second is the vessel's own record of that same furniture line, which the
    # plate prints on its foot when wall X is raised.
    need(doc.count('the first bank</p>') == 1 and doc.count('the first bank') == 2,
         'C6 LAW: the archive names itself exactly once, on wall X\'s furniture '
         'line - painted %d time(s), %d in the document'
         % (doc.count('the first bank</p>'), doc.count('the first bank')))


def assert_toggle(css_tight, js_tight):
    """A3, THE TWO TOGGLES.  A toggle that lies is worse than no toggle: it makes
       the builder judge a thing the page is not doing.  So the two numbers that
       have to agree - the sheet's --vx-rise and the script's own copy of it -
       are compared here, arithmetically, every build.  That drift is not
       hypothetical: it is the 54px lie that buried twenty-four cells in
       landscape and took an entire package to find."""
    need(VX_DEFAULT in VX_MODES and TIDE_DEFAULT in TIDE_MODES,
         'A3 LAW: the defaults must name real variants, got %r / %r'
         % (VX_DEFAULT, TIDE_DEFAULT))
    # --- C3, the water ---
    need('bottom:calc(var(--tide)+var(--vx-rise))' in css_tight,
         'A3/C3 LAW: the plate\'s foot is placed by --vx-rise and nothing else - '
         'a literal here is a second source of truth for the one relationship '
         'the toggle exists to compare')
    css_n = sorted(set(float(v) for v in
                       re.findall(r'--vx-rise:(-?[\d.]+)px', css_tight)))
    m = re.search(r'returnH-tide-\((.*?)\)-h;', js_tight)
    need(m, 'A3/C3 LAW: vesselTop() no longer states the rise - perch() is then '
            'predicting a plate that never arrives')
    js_n = sorted(set(float(v) for v in re.findall(r'-?\d+(?:\.\d+)?', m.group(1))))
    need(css_n == js_n,
         'A3/C3 LAW: the sheet and the script disagree about where the plate '
         'stands - CSS says %r, vesselTop() says %r.  One of them is lying to '
         'perch(), and the Ember ends up behind the plate.' % (css_n, js_n))
    if TIDE_TOGGLE or TIDE_DEFAULT == 'datum':
        need('@media(max-height:520px){html.tide-datum#lectern{padding-bottom:10px}}'
             in css_tight or '@media(max-height:520px){#lectern{padding-bottom:10px}}'
             in css_tight,
             'A3/C3 LAW: the landscape plate is its own scroller with a STICKY '
             'foot rule at its floor, so datum submerges the printed glyphs and '
             'not just the border.  Measured at 844x390 without this: half a '
             'pixel of clearance.')
    if TIDE_TOGGLE:
        need(css_tight.count('html.tide-datum#lectern{--vx-rise:-10px}') == 1,
             'A3/C3 LAW: the datum variant is ONE declaration, written once and '
             'last, or the phone block\'s 12px of air outranks it')
        need("TIDEMODE=pick('tide'" in js_tight and "classList.add('tide-datum')" in js_tight,
             'A3/C3 LAW: the toggle is up but nothing reads ?tide=')
    else:
        need('tide-datum' not in css_tight and 'TIDEMODE=pick' not in js_tight,
             'A3/C3 LAW: with TIDE_TOGGLE off the losing branch must be GONE - '
             'no class, no parser, no second declaration')
    # --- C4, the vessel's height ---
    for k in CELLS:
        need(VXT[k] <= VXH[k] and VXTM[k] <= VXHM[k],
             'A3/C4 LAW: wall %s\'s tempered plate is taller than its stable one, '
             'which is arithmetically impossible - the percentile is broken' % k)
        # and it is the percentile it CLAIMS to be, characterised rather than
        # recomputed: the figure covers at least VX_PCT of the wall's records,
        # and one 8px step less does not.  A bound alone let a broken rank index
        # through in test - it simply returned the maximum, which passes every
        # inequality and deletes the whole point of the variant.
        for _t, _hs in ((VXT[k], [_step8(cell_h(c)) for c in CELLS[k]]),
                        (VXTM[k], [_step8(cell_h(c, True)) for c in CELLS[k]])):
            _n = float(len(_hs))
            need(len([1 for h in _hs if h <= _t]) / _n >= VX_PCT / 100.0,
                 'A3/C4 LAW: wall %s\'s tempered plate does not hold %d%% of its '
                 'own records' % (k, VX_PCT))
            need(len([1 for h in _hs if h <= _t - 8]) / _n < VX_PCT / 100.0,
                 'A3/C4 LAW: wall %s\'s tempered plate is not TIGHT - a shorter '
                 'one would still hold %d%%, so this is not a percentile, it is '
                 'just a number' % (k, VX_PCT))
    need(len(VXP_BY_ID) == 222 and min(VXP_BY_ID.values()) > 0,
         'A3/C4 LAW: the fitted policy needs a height for every one of the 222 '
         'records, got %d' % len(VXP_BY_ID))
    for k in CELLS:
        for c in CELLS[k]:
            need(VXP_BY_ID[c['id']] <= VXH[k],
                 'A3/C4 LAW: %s\'s fitted plate is taller than its own wall\'s '
                 'stable plate - the two policies are computed from different '
                 'arithmetic and the comparison is meaningless' % c['id'])
    if VX_TOGGLE or VX_DEFAULT == 'fitted':
        need('html.vx-fitted#lectern{height:auto;max-height:min(var(--vx-h),'
             'max(var(--vx-avail),240px))}' in css_tight,
             'A3/C4 LAW: fitted means the BROWSER fits it - the estimator carries '
             '18px of slack, an 8px step and a 6% line fudge, and a plate sized '
             'from it stood 57px taller than its own record.  The estimate stays '
             'as the CAP, which is what keeps vesselTop() an over-estimate and '
             'perch() safe.')
        need("classList.add('vx-fitted')" in js_tight,
             'A3/C4 LAW: the fitted declaration hangs on a class nothing sets')
    if VX_TOGGLE:
        need("VXMODE=pick('vx'" in js_tight, 'A3/C4 LAW: nothing reads ?vx=')
        # the RETURN branches, named in full: "if(VXMODE==='fitted')" alone also
        # matches the boot block's class line, so a half-removed policy passed.
        for _b in ("if(VXMODE==='fitted'){if(mi!=null&&BRC.VXP)return",
                   "if(VXMODE==='tempered'){if(BRC.VXT)return"):
            need(_b in js_tight, 'A3/C4 LAW: the height policy %s is not wired' % _b)
        need('"VXP":[' in DOC and '"VXT":{' in DOC,
             'A3/C4 LAW: the alternates carry no numbers, so both branches fall '
             'through to stable and the A/B compares a thing against itself')
    else:
        need('VXMODE=pick' not in js_tight,
             'A3/C4 LAW: with VX_TOGGLE off there is no switch to read')
        need(('"VXP":[' in DOC) == (VX_DEFAULT == 'fitted'),
             'A3/C4 LAW: with the toggle off only the chosen policy\'s numbers '
             'may ride along')
    # --- and the standing cost, which must be zero ---
    m = re.search(r"varVXMODE=.*?\}\)\(\);", js_tight, flags=re.S)
    if m:
        for _bad in ('addEventListener', 'requestAnimationFrame', 'setInterval',
                     'setTimeout', 'getBoundingClientRect'):
            need(_bad not in m.group(0),
                 'A3 LAW: the toggle resolves at BOOT and then does not exist - '
                 'it may not install a %s' % _bad)


def assert_chrome(doc):
    ids = re.findall(r'\sid="([^"]+)"', doc)
    dupes = [k for k, v in collections.Counter(ids).items() if v > 1]
    need(not dupes, 'DUPLICATE IDS in the emitted document: %r' % dupes)
    need(doc.count('data-g="') == 16,
         'the Antechamber observer reads data-g off the node it OBSERVES: 8 rail '
         'links AND 8 sections, got %d' % doc.count('data-g="'))
    need('class="mk-ghost"' not in doc, 'no numeral may print through a mark name')


assert_style(_tightbare)
assert_dict_scope(_tightbare)

# ---- assemble ----
_walls = []
for _wi, _w in enumerate(WALLS):
    _walls.append(guide_html(_wi) if _w['k'] == 'tarot-guide' else wall_html(_wi))
need(_gi[0] == 222, 'emitted %d marks, expected 222' % _gi[0])

# THE FRAME BOOTSTRAP, in the head and nowhere else.  <html> ships ALREADY marked
# framed and the two lines below unmark it when this is the top document.  The
# opposite default meant the page spent its whole parse - which, because the codex
# iframe is lazy, is exactly the window in which the aperture irises open - drawing
# its own 1px floor hairline on the pixel row the parent's living line was about to
# take: the "doubled rule" u1-membrane.js names by name.
BOOT = ('<script>try{if(window.self===window.top)'
        'document.documentElement.classList.remove("framed")}catch(e){}</script>')

DOC = (
    '<!doctype html><html lang="en" class="framed"><head><meta charset="utf-8">'
    '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
    '<meta name="color-scheme" content="dark"><meta name="theme-color" content="#100e0c">'
    '<title>The Codex · Blue Room</title>'
    '<meta name="description" content="The Codex — the archive’s standing meanings, '
    'across ten systems.">'
    + BOOT
    + '<style>' + CSS + '</style>'
    + '<noscript><style>' + CSS_NOJS + '</style></noscript>'
    + '</head><body>'
    + '<a class="skip" href="#q">Skip to the Codex search</a>'
    + '<a class="skip" href="#room">Skip to the ten plates</a>'
    + '<h1 class="u-vh">The Codex — Blue Room</h1>'
    + '<span id="mk-hint" class="u-vh">Arrow keys walk the wall. Enter draws the record up.</span>'
    + '<p id="sr" class="sr" role="status" aria-atomic="true"></p>'
    + '<div class="keylight" aria-hidden="true"></div>'
    + '<div class="shore" aria-hidden="true"></div>'
    + build_sprite()
    + lintel_html()
    + '<main id="room">' + ''.join(_walls) + '</main>'
    + '<div class="shallows" aria-hidden="true"></div>'
    + '<div class="floorlight" aria-hidden="true"></div>'
    + VESSEL_HTML
    + '<div class="tide-guard" aria-hidden="true"></div>'
    + '<div class="tide" aria-hidden="true"></div>'
    + '<script>' + brc_js() + JS + '</script>'
    + '</body></html>')

assert_membrane(_tightbare, DOC)
assert_design(_tightbare, DOC, _jsbare)
assert_geometry(_tightbare)
assert_scroll(_tightbare, _jsbare)
assert_controls(_tightbare, _jsbare, DOC)
assert_toggle(_tightbare, _jsbare)
assert_no_bare_symbol(DOC)
assert_chrome(DOC)

# newline='' - otherwise Windows text mode translates every \n to \r\n on the way
# out, so the file on disk is ~1.5 KB larger than the size this build reports and
# a run on Linux cannot reproduce these bytes.
_BYTES = DOC.encode('utf-8')
_f = io.open(os.path.join(SP, 'codex.html'), 'w', encoding='utf-8', newline='')
_f.write(DOC)
_f.close()
_ON_DISK = os.path.getsize(os.path.join(SP, 'codex.html'))
need(_ON_DISK == len(_BYTES), 'the file on disk is not the document that was built')
# 440000, not 412000.  The ceiling has moved twice and both moves were bought,
# not drifted into.  Round two spent 409600 -> 412000 on its seven must-fix
# packages (the reading floors, the landscape branch, the scoped dictionary, the
# seal reserve, the high-contrast scrim).  Round three's authorised ceiling is
# 440000, and what it buys is the landscape plate, the search work and the design
# packages this round adds - none of which fit in the 253 bytes of headroom that
# were left.  The number is a limit and not a target: the build prints the real
# size on every run, and the distance between the two is the budget remaining.
need(_ON_DISK <= 440000, 'the page is %d bytes, over the 430 KB ceiling' % _ON_DISK)
print('codex.html written -- %d marks, %d walls, %d bytes (%.1f KB on disk)'
      % (_gi[0], len(WALLS), _ON_DISK, _ON_DISK / 1024.0))
