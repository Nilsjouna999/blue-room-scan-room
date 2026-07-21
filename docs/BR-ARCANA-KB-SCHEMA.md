I have everything needed: 8 systems in `codex-data.json` (the 154-entry count = 12 sun signs + 12 Chinese animals + 12 life paths + 22 tarot + 24 runes + 8 trigrams + 64 hexagrams; the file also carries 5 Wu Xing elements folded into `chinese` and a 7-entry product "Blue Room Lexicon"), each entry keyed `{name, tag, keywords, meaning, reversed}`. The join key into the detail-page bank is `(system, name)`. Below is the deliverable.

---

# BLUE ROOM — UNIFIED KNOWLEDGE-BANK SCHEMA (v1)

## 0. Design decisions (why this shape)

1. **The bank never restates `codex-data.json`.** The detail page pulls `tag / keywords / meaning / reversed` from codex at render time by matching `(system, name)`. The bank stores only *new* material. So the schema has no `meaning` field — duplicating it is a defect.
2. **The atomic unit is a `Claim`, not a string.** Every load-bearing fact — a correspondence, a hook, a timeline layer — is an object carrying its own `tier` (`attested` / `revival` / `modern`), `actor`, `date`, and `source_ref`. This is the one move no competitor site makes, and it's what the whole brief is gathered to support. Provenance is a *per-fact property*, enforced at write time, not a disclaimer paragraph.
3. **One template renders all 154.** Shared fields drive a fixed section skeleton; everything system-specific lives in a single discriminated `ext` object. The template reads `system` once and switches only inside the header fact-bar and the `ext` render block.
4. **Distinctness is structural.** `hooks[]` requires ≥2 entries that pass a *swap test* (would become false if pasted onto the nearest sibling), and `sections.cold_open` is separately swap-tested. Absence is data: `ext.mythological_anchor: null` is a valid, meaningful value (Ox, Rooster, most runes).

---

## 1. Shared reusable primitives (`$defs`)

```jsonc
// Claim — the atomic sourced fact. Used everywhere a factual assertion appears.
Claim = {
  "text":       string,                                   // required
  "tier":       "attested" | "revival" | "modern",        // required — the 3-tier taxonomy
  "actor":      string | null,   // named originator; required-if tier≠attested (e.g. "Golden Dawn", "A.E. Waite")
  "date":       string | null,   // "c.150 CE" | "1909" | "1888" | null; required-if tier≠attested
  "source_ref": string | null,   // -> sources[].id
  "contested":  boolean,         // default false
  "note":       string | null    // one line; if contested=true, states the competing position
}

// Layer — one dated row of the provenance timeline.
Layer = { "era": string, "culture_or_actor": string, "source": string, "claim": string,
          "tier": "attested"|"revival"|"modern" }

// Correspondence — a Claim plus the correspondence key/value it asserts.
Correspondence = Claim + { "key": string,    // "ruler" | "element" | "hebrew_letter" | "direction" | "planet" | ...
                           "value": string }

// Contested — a named dispute, narrated without verdict (voice rule §4 of writing guide).
Contested = { "claim": string, "originator": string|null, "date": string|null,
              "displaced": string|null, "positions": [string, ...],   // ≥1 competing reading
              "tier": "attested"|"revival"|"modern" }

// CrossLink — a typed edge to another of the 154 entries. Almost always revival/modern.
CrossLink = { "to_system": SystemId, "to_name": string, "relation": string,   // "shares-sign" | "structural-inverse" | "resonance-element" ...
              "tier": "attested"|"revival"|"modern", "note": string|null }

// Source — one citation, quality-ranked so claims are auditable.
Source = { "id": string, "citation": string,
           "kind": "primary"|"academic"|"museum"|"reference"|"secondary",
           "url": string|null, "confidence": "high"|"medium"|"low" }

// RichText — a narrative block: array of paragraph strings (keeps template dumb).
RichText = [string, ...]
```

---

## 2. The entry object (shared shell — identical for all 154)

| field | type | req | notes |
|---|---|---|---|
| `id` | string | ✔ | stable slug, `"{system}.{slug}"` e.g. `tarot.the-star`. Never changes. |
| `schema_version` | string | ✔ | `"1"`. |
| `system` | `SystemId` enum | ✔ | one of the 7 (see §3). The `ext` discriminator. |
| `name` | string | ✔ | **MUST equal** `codex-data.json` `entry.name` exactly (the join key). |
| `glyph` | string \| null | ✔ | `♏` / `☰` / `ᚨ` / `XVII` / `7`. |
| `factbar` | `[{label, value, claim_ref?}]` | ✔ | scannable header pairs; `claim_ref` points into `correspondences` when the cell is tiered. |
| `provenance` | `{ one_line: string, layers: [Layer] }` | ✔ | `one_line` = the dated throughline; `layers` ≥1, chronological. The anti-generic backbone. |
| `sections` | object | ✔ | fixed narrative blocks (see §4). |
| `correspondences` | `[Correspondence]` | ✔ | may be `[]` (numerology leans light); each carries its own tier. |
| `hooks` | `[Claim]` | ✔ | 2–6; **≥2 must pass the swap test.** The distinctness payload. |
| `contested` | `[Contested]` | ✔ | may be `[]`; do not manufacture controversy. |
| `crosslinks` | `[CrossLink]` | ✔ | may be `[]`; the 3 product "resonance pairs" ship here as `tier:"modern"`. |
| `sources` | `[Source]` | ✔ | 2–5; every non-`modern` claim's `source_ref` must resolve here. |
| `ext` | discriminated object | ✔ | system-specific fields; shape selected by `system` (see §5). |
| `editorial` | object | ✔ | `{ word_budget:[min,max], voice_ok:bool, swap_test_ok:bool, last_reviewed:string }`. |

**`sections` (fixed order — the single template):**

| key | type | req | writing-guide role |
|---|---|---|---|
| `cold_open` | string | ✔ | 2–4 sentences, swap-tested, opens mid-fact. |
| `attestation` | RichText | ✔ | what the primary source actually says, named + dated. |
| `myth_or_record` | RichText \| null | ✔ (nullable) | dominant myth / legal anchor / naming history; `null` when none exists. |
| `symbolism` | RichText | ✔ | descriptive synthesis, never predictive/flattering. |
| `close` | string | ✔ | ends on the record — no summary, no forecast. |

---

## 3. `SystemId` enum (maps to codex `system` strings)

```
"western_sun_signs"  → "Western Zodiac — Sun Signs"   (12)
"chinese_zodiac"     → "chinese"                       (12 animals; Wu Xing elements & Lexicon are out of the 154, own ext or excluded)
"numerology"         → "numerology"                    (12)
"tarot_major"        → "Tarot — Major Arcana"          (22)
"runes_elder_futhark"→ "Norse Runes — Elder Futhark"   (24)
"trigrams"           → "The Eight Trigrams"            (8)
"hexagrams"          → "The I Ching"                   (64)
```

---

## 4. Provenance / contested / cross-link encoding (the three brief-mandated mechanics)

- **Provenance** lives at two granularities: the *entry timeline* (`provenance.layers[]`, one row per era) and *per-fact* (every `Claim.tier` and every `Correspondence.tier`). A fact is never tier-less. The template renders `layers` as the "Origin Ledger" and stamps each correspondence/hook with a colored `attested / revival / modern` chip.
- **Contested** is encoded two ways, deliberately: a boolean `Claim.contested` (inline flag on any single fact) *and* the first-class `contested[]` array (for disputes big enough to be their own block — Strength/Justice renumbering, Tzaddi swap, Great Race). Narrated as dated dispute, never adjudicated (writing guide §4).
- **Cross-links** are `crosslinks[]` edges of `{to_system, to_name, relation, tier}`. The three product "resonance pairs" (sun-element↔Chinese-element, life-path↔tarot, rune-polarity↔trigram-polarity) are all `tier:"modern"` with a `note` labeling them editorial syncretism — never `attested`. Golden Dawn tarot↔zodiac links are `tier:"revival"`, dated 1888.

---

## 5. System extension registry (`ext`, discriminated by `system`)

Only fields beyond the shared shell. `Claim`/`Contested` referenced by name.

**`tarot_major`**
| field | type | req |
|---|---|---|
| `card_number` | string (`"XVII"`) | ✔ |
| `naming_history` | `[{name, tradition, era}]` | ✔ |
| `origin_deck` | Claim | ✔ |
| `visual_evolution` | `[{waypoint, deck, date, change}]` | ✔ |
| `golden_dawn` | `{hebrew_letter, astro, element, tree_path, source_ref, tier:"revival"}` | ✔ |
| `rws_1909_additions` | `[Claim]` | ✔ | Pamela Colman Smith's specific inventions |
| `waite_stated_meaning` | `{upright, reversed, source_ref}` | ✔ | verbatim-ish from *Pictorial Key* |
| `pre_esoteric_function` | Claim | ✔ | its life as a game trump |
| `reversed_provenance` | Claim | ✔ | extends codex `reversed` |
| `thoth_variant` | `{name, change, actor, date}` \| null | ✔ |

**`western_sun_signs`** — `{ fixed_star_anchor: Claim, mythological_thread: Claim, decan_rulers:[string,string,string], body_part: Claim, opposite_sign: string }` (ruler/element/mode/exaltation/detriment/fall routed through `correspondences[]`, each tiered).

**`chinese_zodiac`** — `{ earthly_branch:{char,pinyin,position}, time_direction_season:{hours,direction,season,lunar_month}, fixed_element:string, yin_yang:string, sexagenary_note:string, named_figure: Claim|null, great_race: Contested, regional_variants:[{substitute_animal, culture}] }`.

**`numerology`** — `{ number:string, epithet:string, lineage_layers:[Claim], sacred_geometry: Claim, ruling_planet: Claim, tarot_card_link:{card, match:"reinforce"|"tension"|"weak", tier:"revival"}, cross_cultural_contrast: Claim, master_number:{built_from:string, calculation_note:string}|null }`.

**`runes_elder_futhark`** — `{ position:int, aett:string, phoneme:string, proto_germanic_root:string, cognates:[string], modern_survival:string|null, rune_poems:{old_english:{stanza_gloss,source_ref}|null, old_icelandic:{...}|null, old_norwegian:{...}|null}, mythological_anchor: Claim|null, archaeological_evidence: Claim, evidence_confidence:"well-attested"|"textual-only"|"disputed", relational_position:string, merkstave: Contested }`.

**`trigrams`** — `{ char, pinyin, gloss, line_diagram:string("☰"), line_structure:string, family_role:string, primary_image:string, secondary_image:string|null, classical_attribute: Claim, paired_opposite:string, governing_hexagrams:[string], prior_heaven_direction:string, later_heaven_direction:string, five_element:string, reinterpretation_layers:[Claim] }`.

**`hexagrams`** — `{ number:int, char, pinyin, name_etymology: Claim, upper_trigram:string, lower_trigram:string, line_structure_note:string, ruling_line:string|null, judgment_text:{gloss,translation,source_ref}, image_text:{gloss,translation,source_ref}, king_wen_pair:{n:int, teaches:string}, commentary:[Claim], concrete_hook: Claim, seasonal_note: Claim|null, wilhelm_caveat:boolean }`.

---

## 6. Formal JSON Schema (draft 2020-12) — shared shell + `$defs`

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://blueroom.local/arcana-entry.schema.json",
  "title": "Blue Room Arcana Knowledge-Bank Entry",
  "type": "object",
  "required": ["id","schema_version","system","name","glyph","factbar","provenance",
               "sections","correspondences","hooks","contested","crosslinks","sources","ext","editorial"],
  "additionalProperties": false,
  "properties": {
    "id": {"type":"string","pattern":"^[a-z_]+\\.[a-z0-9-]+$"},
    "schema_version": {"const":"1"},
    "system": {"enum":["western_sun_signs","chinese_zodiac","numerology","tarot_major",
                       "runes_elder_futhark","trigrams","hexagrams"]},
    "name": {"type":"string"},
    "glyph": {"type":["string","null"]},
    "factbar": {"type":"array","items":{"type":"object","required":["label","value"],
      "properties":{"label":{"type":"string"},"value":{"type":"string"},
                    "claim_ref":{"type":["string","null"]}},"additionalProperties":false}},
    "provenance": {"type":"object","required":["one_line","layers"],"additionalProperties":false,
      "properties":{"one_line":{"type":"string"},
        "layers":{"type":"array","minItems":1,"items":{"$ref":"#/$defs/Layer"}}}},
    "sections": {"type":"object","required":["cold_open","attestation","myth_or_record","symbolism","close"],
      "additionalProperties":false,
      "properties":{"cold_open":{"type":"string"},"attestation":{"$ref":"#/$defs/RichText"},
        "myth_or_record":{"oneOf":[{"$ref":"#/$defs/RichText"},{"type":"null"}]},
        "symbolism":{"$ref":"#/$defs/RichText"},"close":{"type":"string"}}},
    "correspondences": {"type":"array","items":{"$ref":"#/$defs/Correspondence"}},
    "hooks": {"type":"array","minItems":2,"maxItems":6,"items":{"$ref":"#/$defs/Claim"}},
    "contested": {"type":"array","items":{"$ref":"#/$defs/Contested"}},
    "crosslinks": {"type":"array","items":{"$ref":"#/$defs/CrossLink"}},
    "sources": {"type":"array","minItems":2,"items":{"$ref":"#/$defs/Source"}},
    "ext": {"type":"object"},
    "editorial": {"type":"object","required":["word_budget","voice_ok","swap_test_ok","last_reviewed"],
      "additionalProperties":false,
      "properties":{"word_budget":{"type":"array","items":{"type":"integer"},"minItems":2,"maxItems":2},
        "voice_ok":{"type":"boolean"},"swap_test_ok":{"type":"boolean"},"last_reviewed":{"type":"string"}}}
  },
  "allOf": [
    {"if":{"properties":{"system":{"const":"tarot_major"}}},
     "then":{"properties":{"ext":{"$ref":"#/$defs/ext_tarot"}}}},
    {"if":{"properties":{"system":{"const":"western_sun_signs"}}},
     "then":{"properties":{"ext":{"$ref":"#/$defs/ext_sun"}}}},
    {"if":{"properties":{"system":{"const":"chinese_zodiac"}}},
     "then":{"properties":{"ext":{"$ref":"#/$defs/ext_chinese"}}}},
    {"if":{"properties":{"system":{"const":"numerology"}}},
     "then":{"properties":{"ext":{"$ref":"#/$defs/ext_numerology"}}}},
    {"if":{"properties":{"system":{"const":"runes_elder_futhark"}}},
     "then":{"properties":{"ext":{"$ref":"#/$defs/ext_rune"}}}},
    {"if":{"properties":{"system":{"const":"trigrams"}}},
     "then":{"properties":{"ext":{"$ref":"#/$defs/ext_trigram"}}}},
    {"if":{"properties":{"system":{"const":"hexagrams"}}},
     "then":{"properties":{"ext":{"$ref":"#/$defs/ext_hexagram"}}}}
  ],
  "$defs": {
    "RichText": {"type":"array","items":{"type":"string"},"minItems":1},
    "Claim": {"type":"object","required":["text","tier","contested"],"additionalProperties":false,
      "properties":{"text":{"type":"string"},
        "tier":{"enum":["attested","revival","modern"]},
        "actor":{"type":["string","null"]},"date":{"type":["string","null"]},
        "source_ref":{"type":["string","null"]},
        "contested":{"type":"boolean","default":false},"note":{"type":["string","null"]}},
      "allOf":[{"if":{"properties":{"tier":{"enum":["revival","modern"]}}},
                "then":{"required":["actor","date"]}}]},
    "Layer": {"type":"object","required":["era","culture_or_actor","source","claim","tier"],
      "additionalProperties":false,
      "properties":{"era":{"type":"string"},"culture_or_actor":{"type":"string"},
        "source":{"type":"string"},"claim":{"type":"string"},
        "tier":{"enum":["attested","revival","modern"]}}},
    "Correspondence": {"allOf":[{"$ref":"#/$defs/Claim"}],
      "type":"object","required":["key","value","text","tier","contested"],
      "properties":{"key":{"type":"string"},"value":{"type":"string"}}},
    "Contested": {"type":"object","required":["claim","positions","tier"],"additionalProperties":false,
      "properties":{"claim":{"type":"string"},"originator":{"type":["string","null"]},
        "date":{"type":["string","null"]},"displaced":{"type":["string","null"]},
        "positions":{"type":"array","minItems":1,"items":{"type":"string"}},
        "tier":{"enum":["attested","revival","modern"]}}},
    "CrossLink": {"type":"object","required":["to_system","to_name","relation","tier"],
      "additionalProperties":false,
      "properties":{"to_system":{"type":"string"},"to_name":{"type":"string"},
        "relation":{"type":"string"},"tier":{"enum":["attested","revival","modern"]},
        "note":{"type":["string","null"]}}},
    "Source": {"type":"object","required":["id","citation","kind","confidence"],
      "additionalProperties":false,
      "properties":{"id":{"type":"string"},"citation":{"type":"string"},
        "kind":{"enum":["primary","academic","museum","reference","secondary"]},
        "url":{"type":["string","null"]},"confidence":{"enum":["high","medium","low"]}}}
    /* ext_tarot, ext_sun, ext_chinese, ext_numerology, ext_rune, ext_trigram,
       ext_hexagram: object definitions per the field tables in §5, additionalProperties:false */
  }
}
```

---

## 7. Fully populated worked example — `tarot.the-star`

Extends the existing codex entry (does **not** repeat its `meaning`). Note: this example *corrects* an error in the incoming consolidation research — the nude water-pourer is **Tarot de Marseille**, not Pamela Colman Smith's invention; Smith's genuine additions are the ibis-bird, the eight-pointed star geometry, and the land/water footing.

```json
{
  "id": "tarot.the-star",
  "schema_version": "1",
  "system": "tarot_major",
  "name": "The Star",
  "glyph": "XVII",
  "factbar": [
    {"label": "Number", "value": "XVII"},
    {"label": "First attested", "value": "Visconti-Sforza, Milan, c.1450"},
    {"label": "Golden Dawn sign", "value": "Aquarius", "claim_ref": "corr-astro"},
    {"label": "Hebrew letter", "value": "Tzaddi (contested)", "claim_ref": "corr-hebrew"}
  ],
  "provenance": {
    "one_line": "Game trump (1450s Milan) → Marseille water-pourer (17th c.) → Golden Dawn correspondence (1888) → RWS illustration (1909); popular 'hope' reading inverts Waite's own stated emphasis on loss.",
    "layers": [
      {"era":"c.1450","culture_or_actor":"Milan (Visconti-Sforza)","source":"surviving hand-painted deck",
       "claim":"Earliest Star card: a clothed woman holding a single eight-pointed star aloft — no water, no nudity.","tier":"attested"},
      {"era":"17th c.","culture_or_actor":"Tarot de Marseille tradition","source":"Marseille pattern woodcuts",
       "claim":"The nude kneeling woman pouring two vessels, one large star with smaller stars, enters here — the composition RWS later inherits.","tier":"attested"},
      {"era":"1781","culture_or_actor":"Antoine Court de Gébelin","source":"Le Monde primitif",
       "claim":"System-wide false claim of ancient Egyptian origin; no evidence has surfaced since.","tier":"revival"},
      {"era":"1888","culture_or_actor":"Hermetic Order of the Golden Dawn","source":"Book T",
       "claim":"Assigns The Star to Aquarius, Hebrew letter Tzaddi, path Netzach–Yesod on the Tree of Life.","tier":"revival"},
      {"era":"1909 / 1910","culture_or_actor":"A.E. Waite & Pamela Colman Smith","source":"RWS deck; Pictorial Key to the Tarot",
       "claim":"Smith fixes the ibis-on-tree and eight-pointed-star geometry; Waite's text lists loss before hope.","tier":"revival"}
    ]
  },
  "sections": {
    "cold_open": "The oldest surviving Star card, in the Visconti-Sforza deck of about 1450, shows a fully clothed woman lifting a single eight-pointed star — no water, no bare figure, none of the scene modern readers picture. The kneeling nude pouring two vessels is a later Marseille development of the 1600s, which Pamela Colman Smith inherited rather than invented in 1909. What Smith actually added is smaller: the bird in the tree and the precise eight-rayed geometry of the stars.",
    "attestation": [
      "In the 15th-century Italian tarocchi, the Star belonged to the celestial trio — Star, Moon, Sun — as a trump of middling rank whose only function was to take tricks in a card game. It carried no divinatory meaning of any kind.",
      "Waite's own Pictorial Key to the Tarot (1910) describes 'a great, radiant star of eight rays, surrounded by seven lesser stars,' the figure 'entirely naked,' pouring the Water of Life from two ewers — one onto land, one into a pool."
    ],
    "myth_or_record": [
      "The card has no single classical myth attached in its gaming period; its meaning is entirely a product of the naming-and-correspondence work done between 1781 and 1909. Its most-cited textual detail is an inversion: where popular tarot foregrounds hope, Waite's divinatory list opens with 'Loss, theft, privation, abandonment,' and gives hope as a secondary 'another reading.'"
    ],
    "symbolism": [
      "The eight-rayed star and its seven companions read, in the Golden Dawn frame, as the descent of an ordering light after the wreckage of the preceding card, The Tower. The dual pour — one stream to earth, one to water — encodes exchange between the fixed and the fluid rather than any promise of outcome.",
      "The nudity, inherited from Marseille, is legible less as innocence than as disclosure: the figure withholds nothing. Read descriptively, the card is a picture of replenishment as a process, not a forecast that replenishment will arrive."
    ],
    "close": "Waite's word order remains the card's most stubborn detail: the modern deck of hope rests on a 1910 text that filed loss first."
  },
  "correspondences": [
    {"key":"astro","value":"Aquarius","text":"Golden Dawn assigns The Star to Aquarius.","tier":"revival","actor":"Golden Dawn","date":"1888","source_ref":"bookt","contested":false,"note":null},
    {"key":"element","value":"Air","text":"Air, via Aquarius' triplicity.","tier":"revival","actor":"Golden Dawn","date":"1888","source_ref":"bookt","contested":false,"note":null},
    {"key":"hebrew_letter","value":"Tzaddi","text":"Golden Dawn assigns Hebrew Tzaddi; Crowley later disputed this.","tier":"revival","actor":"Golden Dawn","date":"1888","source_ref":"bookt","contested":true,"note":"Crowley's Book of the Law (1904): 'Tzaddi is not the Star' — he swaps Star/Emperor letters in the Thoth deck."},
    {"key":"tree_path","value":"Netzach–Yesod (path 28)","text":"Placed on the 28th path of the Tree of Life.","tier":"revival","actor":"Golden Dawn","date":"1888","source_ref":"bookt","contested":false,"note":null}
  ],
  "hooks": [
    {"text":"Waite's Pictorial Key lists the upright meaning as 'Loss, theft, privation, abandonment' FIRST and 'hope and bright prospects' second — modern tarot has silently reversed his emphasis.","tier":"revival","actor":"A.E. Waite","date":"1910","source_ref":"pictorialkey","contested":false,"note":null},
    {"text":"The nude water-pourer is a Tarot de Marseille form of the 1600s, not a Rider-Waite-Smith invention; the Visconti-Sforza Star (c.1450) shows a clothed woman holding a star aloft with no water at all.","tier":"attested","actor":null,"date":"c.1450 / 17th c.","source_ref":"kaplan","contested":false,"note":null},
    {"text":"Smith's specific 1909 additions are narrow: the bird perched in the tree (read by later commentators as an ibis, Thoth's bird) and the eight-ray count of both the great star and its seven satellites.","tier":"revival","actor":"Pamela Colman Smith","date":"1909","source_ref":"pictorialkey","contested":false,"note":null},
    {"text":"Crowley's line 'Tzaddi is not the Star' (1904) triggers a Hebrew-letter swap between The Star and The Emperor in the Thoth system — a live correspondence dispute with no resolution, since the two schemes simply disagree.","tier":"revival","actor":"Aleister Crowley","date":"1904 / 1944","source_ref":"kaplan","contested":true,"note":"RWS keeps Tzaddi on The Star; Thoth moves it to The Emperor."}
  ],
  "contested": [
    {"claim":"Ancient Egyptian origin of the tarot (and thus of this card's 'meaning').","originator":"Antoine Court de Gébelin","date":"1781","displaced":"the card's documented 15th-century Italian gaming origin","positions":["Egyptian priestly origin (Court de Gébelin, no evidence)","Renaissance Italian card game, occult meaning added 1781–1909 (scholarly consensus)"],"tier":"revival"},
    {"claim":"Which Hebrew letter governs The Star.","originator":"Golden Dawn vs. Crowley","date":"1888 vs. 1904","displaced":null,"positions":["Tzaddi (Golden Dawn / RWS)","letter reassigned, Star given Heh in Thoth (Crowley)"],"tier":"revival"}
  ],
  "crosslinks": [
    {"to_system":"western_sun_signs","to_name":"Aquarius","relation":"golden-dawn-sign-attribution","tier":"revival","note":"Golden Dawn (1888) correspondence, not an ancient link."},
    {"to_system":"tarot_major","to_name":"The Tower","relation":"immediately-precedes; the wreckage The Star answers","tier":"attested","note":"Sequence position XVI→XVII."},
    {"to_system":"tarot_major","to_name":"The Moon","relation":"celestial-trio-sibling (Star–Moon–Sun)","tier":"attested","note":"Shared trump grouping since the 15th c."}
  ],
  "sources": [
    {"id":"pictorialkey","citation":"A.E. Waite, The Pictorial Key to the Tarot (1910), entry for The Star","kind":"primary","url":null,"confidence":"high"},
    {"id":"bookt","citation":"Hermetic Order of the Golden Dawn, 'Book T' correspondence tables (c.1888)","kind":"primary","url":null,"confidence":"medium"},
    {"id":"kaplan","citation":"Stuart R. Kaplan, The Encyclopedia of Tarot, vols. I–II","kind":"reference","url":null,"confidence":"high"},
    {"id":"met-visconti","citation":"Metropolitan Museum of Art / Morgan Library, Visconti-Sforza tarocchi records","kind":"museum","url":null,"confidence":"high"}
  ],
  "ext": {
    "card_number": "XVII",
    "naming_history": [
      {"name":"La Stella / The Star","tradition":"Italian tarocchi","era":"15th c."},
      {"name":"L'Étoile","tradition":"Tarot de Marseille","era":"17th–18th c."},
      {"name":"The Star","tradition":"Rider-Waite-Smith","era":"1909"}
    ],
    "origin_deck": {"text":"Visconti-Sforza, Milan, c.1450 — a clothed woman holding a single star; no water.","tier":"attested","actor":null,"date":"c.1450","source_ref":"met-visconti","contested":false,"note":null},
    "visual_evolution": [
      {"waypoint":"clothed star-bearer","deck":"Visconti-Sforza","date":"c.1450","change":"single eight-pointed star held aloft; no nude, no water"},
      {"waypoint":"nude water-pourer","deck":"Tarot de Marseille","date":"17th c.","change":"kneeling nude figure, two vessels, one large + smaller stars"},
      {"waypoint":"ibis + star geometry","deck":"Rider-Waite-Smith","date":"1909","change":"bird added in tree; eight-ray star + seven eight-ray satellites; one foot on land, one on water"}
    ],
    "golden_dawn": {"hebrew_letter":"Tzaddi","astro":"Aquarius","element":"Air","tree_path":"Netzach–Yesod (28)","source_ref":"bookt","tier":"revival"},
    "rws_1909_additions": [
      {"text":"The bird in the tree (later read as an ibis of Thoth).","tier":"revival","actor":"Pamela Colman Smith","date":"1909","source_ref":"pictorialkey","contested":false,"note":null},
      {"text":"The explicit eight-ray geometry of the great star and its seven satellites.","tier":"revival","actor":"Pamela Colman Smith","date":"1909","source_ref":"pictorialkey","contested":false,"note":null}
    ],
    "waite_stated_meaning": {
      "upright":"Loss, theft, privation, abandonment; another reading says — hope and bright prospects.",
      "reversed":"Arrogance, haughtiness, impotence.",
      "source_ref":"pictorialkey"
    },
    "pre_esoteric_function": {"text":"A middling-rank trump in the celestial trio of the 15th-century tarocchi card game, with no divinatory use.","tier":"attested","actor":null,"date":"15th c.","source_ref":"kaplan","contested":false,"note":null},
    "reversed_provenance": {"text":"Waite gave an explicit reversed meaning (arrogance, impotence); the modern 'despair / loss of faith' reversal is a later therapeutic-culture reframing, not Waite's text.","tier":"modern","actor":"20th-c. pop-tarot","date":"post-1960","source_ref":"pictorialkey","contested":false,"note":null},
    "thoth_variant": {"name":"The Star","change":"Hebrew letter reassigned from Tzaddi to Heh per Crowley's Book of the Law","actor":"Aleister Crowley","date":"1944"}
  },
  "editorial": {"word_budget":[450,600],"voice_ok":true,"swap_test_ok":true,"last_reviewed":"2026-07-20"}
}
```

---

## 8. Template render map (how one component renders any entry)

`HEADER` = `glyph` + `name` + `factbar[]` → `ORIGIN LEDGER` = `provenance.layers[]` (tier-colored rows) → `RECORD` = `sections.attestation` → `MYTH/RECORD` = `sections.myth_or_record` (skip if null) → `SYMBOLISM` = `sections.symbolism` → `CORRESPONDENCES` = `correspondences[]` as a tier-chipped grid → `DEEPER RECORD` = `hooks[]` as dossier bullets + system-specific `ext` pulls → `DISPUTED` = `contested[]` (stamped block, skip if empty) → `SEE ALSO` = `crosslinks[]` → `close` line → `SOURCES` footer = `sources[]`. The template branches on `system` in exactly two places: the header fact-bar labels and the `ext` render block.

**Key files:** schema/example above are self-contained; codex join source is `C:\Users\nilsj\OneDrive\Documents\blue-room-scan-room\codex-data.json` (8 systems, join key `(system, name)`; the `chinese` system holds 12 animals + 5 Wu Xing elements, and a 7-entry "The Blue Room Lexicon" sits outside the 154).

**One correction to flag for the incoming research:** the consolidation's tarot example claimed the nude water-pourer and dual-pour gesture were Pamela Colman Smith's 1909 inventions "not present in Marseille." That is false — both are attested in the Tarot de Marseille from the 1600s. The worked example encodes the accurate provenance; the same error should be swept from any tarot entries drafted off that consolidation.