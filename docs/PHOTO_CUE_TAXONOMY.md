# BLUE ROOM — Photo Cue Taxonomy v1

**Layer:** REFERENCE GUIDE · **Status:** SPEC · **Session:** G (scout phase)

The concrete things the BLUE ROOM engine should notice in an image, and how each
becomes an ARTIFACT reading (never a person reading). This taxonomy is the raw
material the scan engine (Free pull, Halo dossier, lenses, stats, receipts, and
archetype detection) reads from and routes through.

For each cue family: concrete examples · what artifact-safe reading it feeds ·
the trap that would turn it into person-reading · how to keep the line.

---

## 0. Core principle: The Image-Act Wall

**IMAGE-ACT** (re-authorable by a new photo of the same person): gesture, pose,
gaze direction, crop, lighting choice, styling choice, framing, setting choice,
prop choice, visible action.

**PERMANENT** (unchanged by a new photo): identity, biology, face structure,
body build, age, race/ethnicity, fixed personality, health/fitness, wealth/status.

**Rule:** Read the image-act freely; never touch the permanent.

---

## 1. GESTURE & POSTURE (the pose and body geometry)

**What the engine reads:** body position as a **geometric shape** (angles, lines,
stance, weight distribution), hand position as directional vectors, limb
orientation, head direction, visible motion or stillness.

### Concrete cues

- **Raised palm, hand open, five-finger spread** → directional vector, hand as
  geometric anchor
- **Crouched stance, weight low, gloves stacked** → triangular mass, contained
  energy, specific joint angles
- **Eye-line direct at the lens** → vector, gaze direction, focal axis
- **Eye-line redirected to object/task** → gaze vector away from the recording
- **Arm at full extension, limbs spread** → geometric reach, line formation
- **Shoulder alignment, one-arm hold** → asymmetrical weight, balance vector
- **Head tilt, chin position** → head angle as compositional line (not face
  reading)
- **Mouth position visible** (smile, neutral, gritted) → visible mouth geometry
  only (not emotional diagnosis)
- **Standing vs sitting vs kneeling vs crouched** → stance category, mass
  position in frame
- **Motion potential: hands at rest, mid-motion, full extension** → unspent
  energy, tension state
- **No visible hands, hands occluded** → geometry missing; statistical confidence
  shrinks

### What it feeds

- **Gesture Geometry** stat (Halo-depth): "the frame's visible pose and shape"
- **Charge** stat: tension, unresolved motion, held energy
- **Signal** stat: what gesture broadcasts
- **Presence** stat: how the stance mass reads against the frame
- **Fit Coherence** stat: do gesture and setting agree?
- **Archetype detection:** The Signal Bearer (directional gesture), The Static
  Saint (deliberate stillness), The Quiet Catalyst (small gesture runs the
  frame), The Striking Contradiction (gesture vs setting mismatch)
- **Receipt language:** "The palm faces the lens dead-on — five fingers, no
  hesitation" · "Crouched mass centered low — the stance locks weight into the
  frame's lower half" · "Eye line and palm fire on the same axis, straight out
  of the frame"
- **Reframe Map:** camera angle change, distance change, gesture change to shift
  archetypes

### The trap

- **BANNED:** Reading the gesture as emotional intent, personality, confidence,
  dominance, submission, masculinity/femininity, threat, aggression,
  vulnerability, intelligence, attractiveness
- **BANNED:** "This pose shows courage/insecurity/dominance/shyness/sexual
  interest/shame"
- **BANNED:** "Nobody crouches unless they're humble" (person-reading via body
  language psychology)

### Keep the line

- Name the **observable geometry:** "raised palm," "crouched brace," "direct
  eye-line," "head tilt to the left"
- Frame it as **what it does to the photo:** "The palm organizes the frame as a
  secondary anchor" · "The crouched mass closes off any read of departure"
- Keep it **re-authorable:** a new photo can shift or reverse every gesture cue
- Route to **tier-band + diagram + archetype**, never to a "confidence score" or
  personality read
- Pass the **Artifact Test:** if a different photo of the same person had a
  different gesture, would this stat change? Yes → keep it

---

## 2. HAND & OBJECT (props, tools, things being held)

**What the engine reads:** visible object identity and state, object as
geometric element, tool state (ready / in-use / broken), prop as visual signal
or compositional anchor, hand-object relationship as geometry.

### Concrete cues

- **Auger in hand, half-buried in ice** → tool state, work-in-progress signal
- **Rod held horizontal vs vertical** → directional vector, frame geometry
- **Guitar, drum, musical instrument** → object identity, visual signal,
  intentional styling choice
- **Controller held at play-ready position** → tool state, activity signal
- **Wrench, hammer, construction tool** → work/builder signal
- **Wheel at the frame edge, hands on wheel** → vehicle context, directional
  intent
- **Cap on head, significant visual presence** → styling choice, color anchor
- **Jacket, shirt, distinctive color layer** → styling choice, color palette
  element
- **Glasses on face, sunglasses in bright light** → styling choice, light
  response (not face occlusion reading)
- **Rope, chain, cable** → tool, compositional line, work signal
- **Ball, sphere, prop** → play signal, directional vector if in motion
- **Insignia, patch, emblem on clothing** → readable styling detail
- **Empty hands, no prop** → absence signal; gesture must carry more weight

### What it feeds

- **Signal** stat: "the one thing the image broadcasts"
- **Lore Density** stat: tools and objects place scene in specific context
- **Frame/Presence** stat: how the object competes for visual weight
- **Archetype detection:** The Signal Bearer (the tool/object IS the message),
  The Overloaded Channel (multiple competing objects), The Room With History
  (tools suggest age/use)
- **Receipt language:** "The auger runs a hard diagonal into the ice — the only
  straight line the subject brought along" · "Tool and work-surface place the
  scene in an active setting" · "One warm colour layer over a muted ground reads
  as deliberate"
- **Reframe Map:** object swap (different tool, remove/add a prop), gesture with
  object (how the hand relates to the prop)

### The trap

- **BANNED:** Reading the object as a wealth/class/status marker ("this
  expensive camera proves you're serious")
- **BANNED:** Reading tools as personality ("only brave people use power tools")
- **BANNED:** Inferring skill/intelligence from tool mastery ("the professional
  grip shows experience")
- **BANNED:** Reading styling as taste judgment or social positioning ("a red
  jacket is bold/confident")

### Keep the line

- Name the **object and state:** "auger, pre-cut" · "raised palm holding a
  fishing rod" · "red jacket, saturated"
- Frame as **visual design choice or scene evidence:** "the jacket does most of
  the speaking" · "tool and work-surface place the scene in an active setting"
- Keep it **re-authorable:** a different jacket color, a different tool, object
  removal/addition changes the card
- Route to **Signal, Lore, Frame stats + archetype**, never to a "taste" or
  "status" score
- Test for **legitimate scene-building:** does this object add *location
  evidence* or *activity evidence*? Yes → keep. Does it suggest *wealth/class*?
  No → remove

---

## 3. ANIMALS & CREATURES (dogs, fish, horses, birds, insects)

**What the engine reads:** animal presence as scene element, animal state
(alert, resting, in-frame edge vs centered), animal-human interaction geometry,
animal as compositional anchor or distraction.

### Concrete cues

- **Dog on-leash, sitting or standing** → scene element, scale reference
- **Dog off-leash, body language geometry** → activity signal, scene
  relationship (geometry only; not the dog's emotion)
- **Fish in frame, active or still** → task evidence, resource signal
- **Horse, donkey, livestock** → locale signal, work/rural setting
- **Bird in flight, perched, at rest** → scene element, scale/distance cue
- **Creature in background, soft focus** → depth layer, environmental detail
- **Creature sharp-focus, main subject** → compositional weight distribution
- **Eye contact between human and animal** → geometric alignment, visual anchor
  (not emotional bonding)
- **Animal occluded partially by frame edge** → composition choice, frame
  pressure

### What it feeds

- **Lore Density** stat: animals place scene in specific activity/setting
- **Setting Gravity** stat: does the animal dominate or frame the human?
- **Presence/Frame** stat: scale competition, compositional weight
- **Archetype detection:** The Open Field (small human, large animal-filled
  landscape), The Room Anchor (creature anchors the space), The Map Fragment
  (wildlife implies larger terrain)
- **Receipt language:** "The dog occupies the frame's lower third, balanced by
  the subject in the upper" · "A bird in the upper background reads as depth
  layering" · "The horse's mass places the human subject as secondary anchor"
- **Reframe Map:** camera distance change (closer to animal vs human), angle
  (human-height vs animal-height), crop (frame in or out the creature)
- **Possible route flag:** ANIMAL_COMPANION (route-specific stats like Creature
  Presence)

### The trap

- **BANNED:** Reading the animal as reflecting the person's qualities ("this
  person is loyal like their dog," "they're predatory like that eagle")
- **BANNED:** Reading animal interaction as emotional: "they bonded," "the dog
  loves them," "they're gentle because they pet gently"
- **BANNED:** Inferring personality from animal choice or training skill
- **BANNED:** Inferring wealth/status from the animal breed/quality

### Keep the line

- Name the **animal and state:** "dog, on-leash, sitting" · "horse, standing,
  background"
- Frame as **scene element or compositional anchor:** "the creature occupies the
  frame's lower-left, balanced by the subject" · "the bird reads as a depth
  layer, not a focal point"
- Keep it **re-authorable:** remove the animal, change the animal, reposition it
  → different card
- Route to **Lore, Setting Gravity, Frame stats + archetype**, never to
  "personality alignment" or "pet preference" reads
- Use **animal state as geometry only:** "the dog's body orientation points toward
  the exit" (directional), not "the dog seems anxious" (emotional projection)

---

## 4. VEHICLES (cars, boats, snowmobiles, bikes, trucks, planes)

**What the engine reads:** vehicle presence as scene context, vehicle state
(idle, active, broken), human-vehicle relationship (in, on, beside), vehicle as
compositional anchor or scale reference, mechanical element as geometry.

### Concrete cues

- **Car interior visible, human in driver seat** → interior frame, mobility
  context
- **Steering wheel, dashboard, windshield** → vehicle state, spatial anchor
- **Boat hull, water, mast** → maritime locale, activity signal
- **Motorcycle/bike, rider stance-geometry** → vehicle-specific pose
- **Snowmobile, winter vehicle** → harsh locale, cold season
- **Truck bed, cargo area** → work/transport signal
- **Plane window, sky beyond** → altitude context, travel frame
- **Vehicle in background, out of focus** → depth layer, locale hint
- **Vehicle edge (wheel, hood, side panel) pressing the frame** → composition
  pressure, confinement signal
- **Road, highway markings, lane** → route/journey signal

### What it feeds

- **Lore Density** stat: vehicles place scene in specific journey/activity
- **Setting Gravity** stat: does the vehicle dominate or frame the human?
- **Charge** stat: vehicle motion potential (engine-off idle vs ready-to-move)
- **Presence/Frame** stat: vehicle mass vs human mass competition
- **Archetype detection:** The Open Field (human tiny in landscape with vehicle),
  The Room Anchor (interior vehicle as enclosing space), The Locked Room Figure
  (interior with no visible exit), The Last Frame (motion/journey energy)
- **Receipt language:** "Cabin roof and seat press from above and left; the
  subject reads contained, never cramped" · "The fjord out the window rescues
  the right third" · "Dashboard and roofline crop the frame from three sides"
- **Reframe Map:** interior vs exterior framing, distance from the vehicle,
  angle relative to direction of travel

### The trap

- **BANNED:** Reading vehicle choice as wealth/class/status ("this car shows
  they're successful")
- **BANNED:** Reading vehicle interior as personality ("they keep a messy car so
  they're chaotic")
- **BANNED:** Inferring lifestyle/identity from vehicle type

### Keep the line

- Name the **vehicle and state:** "car, engine off, interior" · "boat, at
  anchor" · "snowmobile, idle"
- Frame as **scene container or locale signal:** "the cabin frames the subject" ·
  "the windshield routes the eye beyond the interior"
- Keep it **re-authorable:** different vehicle, interior vs exterior, engine-on
  vs off → different card
- Route to **Lore, Setting Gravity, Charge stats + archetype**, never to
  "lifestyle" or "wealth" reads

---

## 5. CLOTHES & STYLING (shirt, jacket, hat, shoes, accessories, palette)

**What the engine reads:** color as visual element (not person's color choice),
fabric/texture as visual information, coverage/exposure balance, distinctive
garment as signal layer, style coherence with setting, layering as temperature
evidence.

### Concrete cues

- **Red jacket against grey cabin** → color contrast anchor, visual signal
- **Muted palette, understated colors** → visual restraint signal
- **Single strong color over neutral ground** → deliberate signal, broadcast
  layer
- **Cap, beanie, hood on head** → styling choice, readability qualifier (occludes
  expression)
- **Sunglasses in bright light** → light-response garment, readability qualifier
- **Gloves, heavy jacket, full coverage** → cold-weather signal, activity
  preparation
- **Short sleeves, exposed arms** → warm-weather or activity-specific signal
- **Layers, visible under-layer** → temperature strategy, visual complexity
- **Distinctive texture visible (knit, leather, denim)** → material signal
- **Jewelry, watch, visible accessory** → styling detail, potential color anchor
- **Worn/faded/new condition of garment** → age signal (not worn-by-time-as-person
  signal)
- **Ripped, patched, altered garment** → modification signal, wear evidence
- **Uniform, work-specific clothing** → activity signal, role evidence

### What it feeds

- **Signal** stat: "the one thing the image broadcasts"
- **Fit Coherence** stat: does styling agree with setting and gesture?
- **Lore Density** stat: distinctive clothing places person in activity/climate
- **Charge** stat: contrast between styled element and background
- **Presence** stat: if the garment is the dominant visual mass
- **Archetype detection:** The Neon Witness (saturated artificial color),
  The Palette Cult (single color scheme governs), The Signal Bearer (one garment
  is the message), The Striking Contradiction (styling vs setting mismatch)
- **Receipt language:** "One warm colour layer over a muted ground reads as
  deliberate" · "The jacket does most of the speaking" · "Hood, beanie and
  sunglasses qualify the expression"
- **Reframe Map:** color swap, remove a layer, swap garment type, different
  fabric texture

### The trap

- **BANNED:** Reading clothing as taste judgment, class/wealth inference ("this
  designer label shows sophistication")
- **BANNED:** Gender-coding of clothes ("bold red shows feminine power," "a suit
  is masculine authority")
- **BANNED:** Reading styling as personality ("they dressed up so they're trying
  hard," "they're casual so they're laid-back")
- **BANNED:** Inferring body/figure from clothing choices

### Keep the line

- Name the **garment and color:** "red jacket, saturated" · "beanie, muted blue"
  · "gloves, stacked"
- Frame as **visual design element or context signal:** "the jacket does most of
  the speaking" · "hood and sunglasses requalify the expression toward the task"
- Keep it **re-authorable:** different color, remove layer, change the garment →
  different card
- Route to **Signal, Fit Coherence, Charge stats + archetype**, never to "taste"
  or "wealth" or "gender expression" reads
- Use **color as visual fact:** "one saturated layer against a muted ground" (the
  image property), not "bold color shows a bold person"

---

## 6. PLACE & SETTING (cabin, lake, field, forest, room, beach, parking lot)

**What the engine reads:** location type (interior/exterior), terrain/ground
(snow, water, asphalt, dirt, grass), sky/weather visible, setting density
(sparse vs cluttered), environmental wear/age, place as visual dominance vs
backdrop, boundaries (walls, treeline, horizon).

### Concrete cues

- **Interior: four walls, ceiling, furniture visible** → enclosed-space archetype
  anchor
- **Exterior: sky visible, wide horizon** → open-space anchor, landscape dominance
- **Frozen lake, snow-covered ground** → harsh locale, season, temperature
  evidence
- **Forest, treeline, dense vegetation** → woodland locale, depth layers
- **Urban: buildings, pavement, street furniture** → city locale, human
  infrastructure
- **Field: open ground, minimal obstacles** → sparse-environment signal
- **Beach: sand, water, horizon** → coastal locale, natural/smooth ground
- **Room interior: wall color, fixtures, decor** → indoor setting character
- **Worn surfaces: aged wood, weathered metal, patina** → age/use evidence (not
  aesthetic judgment)
- **New/pristine surfaces: clean paint, untouched ground** → newness evidence
- **Clutter: many objects, visual density** → environmental complexity signal
- **Minimal/sparse: few objects, negative space dominates** → environmental
  restraint signal
- **Horizon line: straight, tilted, high/low in frame** → compositional
  anchoring
- **Background distance cues: layers, depth, far vs near** → scale and isolation
  markers
- **Visible evidence of work/activity in space: tools, marks, tracks** → locale
  function signal

### What it feeds

- **Setting Gravity** stat: "how much the environment pulls the read; scene
  dominance over subject"
- **Lore Density** stat: "amount of visible story, world and context"
- **Fit Coherence** stat: does the setting agree with gesture and styling?
- **Charge** stat: contrast between setting and subject
- **Frame** stat: how setting anchors the composition
- **Archetype detection:** The Room Anchor (interior encloses), The Locked Room
  Figure (interior with no exit), The Room With History (setting carries wear),
  The Map Fragment (setting implies larger world), The Open Field (small subject,
  wide landscape), The Overloaded Channel (many competing objects/elements),
  The Striking Contradiction (setting vs gesture mismatch)
- **Receipt language:** "The snow plane owns three quarters of the frame and
  donates all of it to the silhouette" · "The room is doing the holding" · "The
  background is doing the world-building" · "The treeline rules the upper
  quarter in one clean band"
- **Reframe Map:** interior vs exterior, crop distance, angle relative to
  significant feature (horizon, treeline, wall), remove/add clutter elements

### The trap

- **BANNED:** Reading location as wealth/class/status ("they're at an exclusive
  resort so they're rich")
- **BANNED:** Reading environment as personality ("someone who chooses nature is
  spiritual/free")
- **BANNED:** Inferring lifestyle/aspirations from setting choice
- **BANNED:** Reading a "nice" location as a judgment on the person's worth
- **BANNED:** Reading clutter as moral judgment ("messy so they're disorganized")

### Keep the line

- Name the **setting and condition:** "frozen lake, high albedo" · "cabin
  interior, worn wood" · "forest clearing, dense trees"
- Frame as **visual composition element or locale evidence:** "the snow plane
  owns most of the frame" · "the room is louder than the figure" · "the setting
  carries more history than the figure does"
- Keep it **re-authorable:** different location, different season, interior vs
  exterior, weather change → different card
- Route to **Setting Gravity, Lore Density, Charge, Frame stats + archetype**,
  never to "lifestyle" or "status" or "aesthetic preference" reads
- Use **setting as factual scene evidence:** "birch treeline, upper quarter"
  (the location fact), not "beautiful nature so they're naturally beautiful"

---

## 7. WEATHER & SEASON (snow, rain, sun, cloud, wind evidence, temperature cues)

**What the engine reads:** visible precipitation, light quality (hard/soft),
snow condition (fresh/tracked/aged), sky state (clear/overcast/dramatic),
season cues (botanical, frost, seasonal vegetation), temperature inference
(coverage level, steam, frozen water), wind evidence (snow patterns, clothes
displacement).

### Concrete cues

- **Hard sun, low elevation, strong shadow** → light angle, time-of-day signal
- **Overcast, diffused light, soft shadows** → cloud cover, diffused-light
  signal
- **Snow, white-field albedo, blown highlights** → harsh exposure, cold climate
- **Fresh snow vs tracked snow vs slush** → time-passage evidence, wear pattern
- **Rain, wet surfaces, reflections** → precipitation state
- **Frost, ice, crystalline surfaces** → freeze temperature, seasonal signal
- **Steam visible, breath visible** → temperature evidence, cold inference
- **Bare trees vs leafy vs evergreen** → season placement
- **Wind evidence: snow spray, clothes flapping, trajectory marks** → weather
  intensity
- **Sky color: blue, grey, dramatic** → light quality, weather state
- **Exposure floor lifted by snow/sand** → environmental reflection,
  compositional brightness

### What it feeds

- **Lore Density** stat: weather places scene in season/climate/activity
- **Charge** stat: weather tension, exposure challenge, light drama
- **Signal** stat: strong weather signal broadcasts loudly
- **Fit Coherence** stat: do clothes match the season?
- **Setting Gravity** stat: how does weather visually dominate?
- **Archetype detection:** The Low-Light Operator (darkness becomes tool),
  The Hard Edge (contrast, silhouette), The Archive Ghost (old-photo time
  quality), The Striking Contradiction (summer clothing in winter setting)
- **Receipt language:** "Low hard sun from the left; the snow throws it back up
  and erases every shadow excuse" · "Overcast key through the right glass; rear-left
  fill keeps the face open" · "Blown highlights on snow lift the exposure floor"
- **Reframe Map:** different time of day (change light angle), wait for weather
  (different sky), seasonal return, different distance from weather source

### The trap

- **BANNED:** Reading harsh weather as personality strength ("they chose to be in
  a blizzard so they're tough")
- **BANNED:** Inferring hardship/difficulty/struggle from visible weather
- **BANNED:** Reading sun exposure as attractiveness amplifier
- **BANNED:** Making emotional weather readings ("the grey sky matches their mood")

### Keep the line

- Name the **weather and intensity:** "hard sun, low angle, unfiltered" · "fresh
  snow, high albedo" · "overcast, soft light"
- Frame as **light/exposure element or season evidence:** "the snow throws light
  back up and erases shadow detail" · "low sun creates edge contrast" · "overcast
  diffuses the whole frame"
- Keep it **re-authorable:** different time of day, season, wait for better
  light → different card
- Route to **Lore, Charge, Setting Gravity, Signal stats + archetype**, never to
  "mood" or "hardship" or "attractiveness amplification" reads
- Use **weather as optical/compositional fact:** "blown highlights on snow lift
  the exposure floor" (the image property), not "the sun is harsh, so they're in
  a hard situation"

---

## 8. LIGHT & ILLUMINATION (key light, fill, backlighting, reflection, direction, quality)

**What the engine reads:** light direction (key angle, fill presence, backlighting),
light quality (hard/soft), light color/temperature, light ratio (bright/dark
ratio), reflection layers (glass, water, metal), shadows as compositional element,
silhouette vs full illumination, on-camera flash vs natural vs tungsten.

### Concrete cues

- **Hard side-light from left, harsh edge contrast** → directional key, shadow
  flattening
- **Backlighting, subject edge-lit against sky** → rim-light signal, silhouette
  potential
- **Diffused light through window, soft shadows** → indoor window light
- **Tungsten/warm indoor light, color cast** → interior light source, warmth
  color
- **On-camera flash, flat illumination** → artificial light, tool-dependent
- **Reflection in glass, water, metal** → double-image composition, depth layer
- **Silhouette against bright background** → maximum contrast, edge definition
- **Face in shadow, environment bright** → compositional choice, expression
  occlusion
- **Natural color temperature (overcast daylight)** → neutral light baseline
- **Golden hour, warm angled sun** → time-of-day signal, color warmth
- **Blue hour, twilight, dim natural light** → dusk/dawn signal, color tone
- **Light modeling: light and shadow reveal form** → dimensional light, volume
  sculpting
- **Blown highlights: overexposed bright areas** → exposure limit, camera
  response
- **Deep shadows: underexposed dark areas** → exposure floor, detail loss

### What it feeds

- **Visual Impact** stat: "immediate screenshot force; first-glance memorability"
- **Charge** stat: light contrast as tension/energy
- **Signal** stat: light can BE the signal (neon witness)
- **Frame** stat: light direction anchors composition
- **Lore Density** stat: light quality places scene indoors/outdoors, time of day
- **Fit Coherence** stat: does the light suit the setting and gesture?
- **Archetype detection:** The Low-Light Operator (dark is a tool), The Neon
  Witness (artificial color rules), The Hard Edge (contrast and silhouette),
  The Diffused Ghost (soft light), The Glass Myth (reflection layers)
- **Receipt language:** "Low side-light erases shadow detail and flattens the
  plane" · "A reflection turns one frame into two readings and lets both stand"
  · "Black silhouette on white field — maximum available contrast" · "Light is
  handled like a tool, not an accident"
- **Reframe Map:** change time of day (different light angle), move toward/away
  from light source, change indoor vs outdoor, add/remove reflective surfaces

### The trap

- **BANNED:** Reading harsh light as personality projection ("hard light for a
  hard person")
- **BANNED:** Reading soft light as emotional softness
- **BANNED:** Making mood inferences from light quality ("warm light so they're
  warm," "cool light so they're cool")
- **BANNED:** Reading light on face as attractiveness amplification

### Keep the line

- Name the **light and direction:** "hard sun, low elevation, from left" ·
  "overcast diffuse, no shadows" · "tungsten interior, warm cast"
- Frame as **optical/compositional element:** "low side-light erases shadow and
  flattens the plane" · "the reflection turns one frame into two readings" · "a
  reflected element doubles the visual weight"
- Keep it **re-authorable:** change time of day, move the light source, add
  reflectors → different card
- Route to **Visual Impact, Charge, Signal, Frame stats + archetype**, never to
  "mood" or "attractiveness" reads
- Use **light as camera/composition fact:** "backlighting creates rim-edge
  definition" (the optical property), not "the warm light makes them glow" with
  attractiveness implication

---

## 9. COLOR & PALETTE (dominant colors, color temperature, saturation, harmony, contrast)

**What the engine reads:** color presence as visual layer (not color psychology),
color temperature (warm/cool), saturation level (vivid/muted), dominant color
distribution, color harmony or clash, color as visual weight, contrast between
color regions.

### Concrete cues

- **One strong color over a muted ground** → signal anchor, broadcast layer
- **Saturated artificial light color, neon** → light-source color, environment
  signal
- **Warm color palette (reds, oranges, yellows)** → temperature feel as visual
  property (not emotional)
- **Cool color palette (blues, greens, purples)** → temperature feel as visual
  property
- **Red jacket against grey cabin** → color contrast, visual pop
- **Muted palette, desaturated colors** → visual restraint, low-contrast
  environment
- **Earth tones: brown, tan, ochre** → natural palette, material palette
- **Black and white, high-contrast monochrome** → maximum contrast, no color
  signal
- **Complementary colors: opposite hues** → visual tension, deliberate clash
- **Analogous colors: neighboring hues** → visual harmony, coordination
- **Blown-out whites, lost highlights** → exposure limit, color floor
- **Deep blacks, shadow detail lost** → exposure floor, color ceiling
- **Color cast: whole frame tinted (blue from cool light, orange from tungsten)** →
  light-source color
- **Reflected color from environment (snow reflection, sky reflection)** → source
  color bounce

### What it feeds

- **Signal** stat: color broadcasts when it's the dominant layer
- **Charge** stat: color contrast creates tension/energy
- **Fit Coherence** stat: does the palette agree with setting and styling?
- **Visual Impact** stat: saturated color vs muted affects memorability
- **Frame** stat: color distribution anchors composition
- **Presence** stat: dominant color can BE the dominant visual mass
- **Archetype detection:** The Neon Witness (artificial color dominates),
  The Palette Cult (one scheme governs), The Striking Contradiction (color
  harmony broken by one element)
- **Receipt language:** "One warm colour layer over a muted ground reads as
  deliberate" · "A single colour scheme has rules and the image obeys them" ·
  "The palette is borrowed from the street and it suits the room" · "Colour
  contrast reads as tension"
- **Reframe Map:** color swap (different jacket, light the scene differently to
  change palette), wait for different season/light to shift palette dominance

### The trap

- **BANNED:** Reading color as personality or mood ("red is aggressive," "blue is
  sad," "warm colors show warmth")
- **BANNED:** Reading color choice as taste judgment
- **BANNED:** Inferring status/wealth from color presence (gold = rich)
- **BANNED:** Making emotional color psychology reads

### Keep the line

- Name the **color and intensity:** "red, saturated" · "muted blue-grey palette"
  · "high contrast black and white"
- Frame as **visual design layer or light property:** "one colour layer over a
  muted ground reads as deliberate" · "the palette has rules and the image obeys
  them" · "colour becomes the signal anchor"
- Keep it **re-authorable:** different color (change lighting, clothing, or
  location) → different card
- Route to **Signal, Charge, Fit Coherence, Visual Impact, Frame stats +
  archetype**, never to "mood" or "taste" or "personality" reads
- Use **color as factual visual property:** "saturated hue" (the image element),
  not "warm colors make them seem warm/approachable"

---

## 10. COMPOSITION & FRAMING (rule of thirds, negative space, crop, horizon, balance, depth layers)

**What the engine reads:** subject placement (center/thirds/edge), bounding-box
size and position, negative space ratio, horizon placement and tilt, crop
behavior (deliberate vs accidental), symmetry/asymmetry, layering (foreground/
middle/background), edge pressure, leading lines, symmetrical vs dynamic
composition.

### Concrete cues

- **Subject mass in left third, balanced by element in right third** → asymmetrical
  balance
- **Subject centered with symmetrical margins** → deliberate record-like
  composition
- **Subject at frame edge, pressed by surroundings** → tension, pressure
- **Wide negative space on one side, dense on other** → weight distribution
- **Horizon pinned to upper/lower third, clean band** → compositional control
- **Horizon tilted with deliberate intent** → dynamic composition choice
- **Rule of thirds lock: intersections guide eye** → compositional discipline
- **Diagonal line runs corner-to-corner, organizes frame** → compositional
  structure
- **Foreground element in sharp focus, background soft** → depth layering,
  attention direction
- **Subject tiny in frame, wide landscape dominates** → scale relationship,
  isolation
- **Subject fills frame, background minimal** → presence emphasis
- **Edge crop removes context by choice** → intentional information hiding
- **Tight crop, no margin, subject pressed to all edges** → confinement,
  claustrophobic composition
- **Loose crop with breathing room** → comfortable composition, spacious read

### What it feeds

- **Frame** stat: "composition quality: crop, balance, placement, control"
- **Presence** stat: how the subject's placement and scale in the frame
- **Visual Impact** stat: composition affects memorability
- **Setting Gravity** stat: whether the setting or subject dominates compositionally
- **Charge** stat: asymmetry/diagonal/edge pressure creates tension
- **Archetype detection:** The Frame Breaker (crop pressure), The Diagonal (one
  line organizes), The Vertical (verticality rules), The Open Field (subject
  tiny, landscape dominates), The Minimal Verdict (near-empty frame), The Hard
  Edge (composition via contrast), The Sealed Artifact (record-like deliberate
  composition)
- **Receipt language:** "Horizon pinned to the upper quarter in one clean band" ·
  "A single diagonal does the structural work the subject won't" · "The crop
  removes all context by choice and dares you to miss it" · "Negative space is
  the loudest element in the composition"
- **Reframe Map:** tighter/looser crop, different angle (horizon vs tilted),
  different distance (closer/wider), camera repositioning

### The trap

- **BANNED:** Grading the photographer's skill ("good composition," "amateur
  framing")
- **BANNED:** Inferring taste or intent from composition ("centered = stiff,"
  "diagonal = dynamic energy")
- **BANNED:** Making aesthetic judgments on cropping choices

### Keep the line

- Name the **composition pattern and element placement:** "subject left-third,
  balanced by setting right-third" · "horizon pinned upper-quarter" · "tight
  crop, subject pressed to three edges"
- Frame as **visual property and effect:** "the crop removes context by choice" ·
  "negative space balances subject mass" · "the diagonal organizes the entire
  frame"
- Keep it **re-authorable:** different camera angle, distance, crop, orientation →
  different card
- Route to **Frame, Presence, Visual Impact, Charge, Setting Gravity stats +
  archetype**, never to "photographer skill" or "aesthetic taste" reads
- Use **composition as factual layout fact:** "horizon locks upper-quarter" (the
  measurement), not "the photographer has good taste"

---

## 11. TEXTURE & SURFACE (visible fabric, material, wear patterns, grain, pattern)

**What the engine reads:** fabric texture when visible (knit, leather, denim,
linen), surface condition (smooth/rough), wear patterns (fading, weathering,
patches), grain texture in natural surfaces (wood, stone, bark), pattern
(checkered, striped, solid, printed) as visual signal.

### Concrete cues

- **Knit garment, visible texture (sweater, beanie)** → material signal, texture
  anchor
- **Leather jacket, shiny smooth surface** → material durability signal
- **Weathered wood, grey/cracked surface** → age evidence, outdoor exposure
- **Metal tool, rust or corrosion visible** → age, use, oxidation evidence
- **Fabric worn thin, faded color** → use evidence, aging
- **Patch on garment, visible repair** → modification, wear evidence
- **Smooth painted surface, pristine new** → newness evidence
- **Rough/raw material, unfinished** → unprocessed material signal
- **Pattern: checkered, striped, floral print** → visual signal, design layer
- **Solid color, no pattern** → restraint, design simplicity
- **Transparent fabric, see-through** → layering evidence, visibility

### What it feeds

- **Signal** stat: texture and pattern can broadcast visually
- **Fit Coherence** stat: does the material suit the setting/activity?
- **Lore Density** stat: worn surfaces tell stories of use/age
- **Frame** stat: texture distribution affects composition read
- **Receipt language:** "Knit shows the hand-made element" · "Weathered wood
  surface carries age evidence" · "The fabric shows use and repair"
- **Reframe Map:** swap material (different fabric), repair vs weathered
  condition, pattern swap

### The trap

- **BANNED:** Reading texture as wealth/quality ("expensive fabric means
  sophisticated")
- **BANNED:** Making durability/worth judgments from material evidence
- **BANNED:** Inferring care/effort from condition ("pristine means they care
  about themselves")

### Keep the line

- Name the **material and condition:** "knit, hand-made" · "weathered wood,
  grey-cracked" · "fabric worn thin, faded"
- Frame as **texture element or wear evidence:** "the weathered surface shows
  age" · "the visible repair marks time's passage" · "the texture reads as hand-made"
- Keep it **re-authorable:** swap the material, let weather work on it → different
  card
- Route to **Signal, Fit Coherence, Lore stats**, never to "quality" or
  "sophistication" reads

---

## 12. FACE & HEAD POSITION (without reading the face)

**What the engine reads:** head angle as geometry (tilt direction, up/down/
level), eye-line direction as vector (at-camera / away / down / side), facial
expression as visible mouth/muscle geometry (not emotional diagnosis), head size
in frame, whether face is sharp/soft/hidden.

**SAFETY CRITICAL:** No face-feature scoring. The face itself is banned. What
passes is: head/gaze geometry, expression-as-geometry only.

### Concrete cues

- **Head tilted left, right, or level** → head angle as compositional line
- **Eye-line directly at camera** → vector, focal axis, engagement signal
- **Eye-line redirected to object/task away from camera** → vector, task focus
- **Mouth visible, corners up or level or down** → mouth geometry only (not
  smile/frown emotion read)
- **Face in sharp focus** → focal lock, sharpness anchor
- **Face soft focus or expressionless** → visibility qualifier
- **Glasses, sunglasses, hood occlude parts** → visibility qualifier, styling
  choice (not hidden attractiveness)
- **Face turned away from camera** → head angle, task orientation
- **Head size in frame: large vs tiny** → scale relationship
- **Expression visible: "mouth turns up at the brace"** → muscle geometry visible

### What it feeds

- **Presence** stat: head position in frame, focal lock
- **Signal** stat: gaze direction broadcasts
- **Gesture Geometry** stat: head angle as part of overall body geometry
- **Frame** stat: where the head places focus in composition
- **Receipt language:** "Face locks the left third with the palm as second anchor
  — the lens never wanders" · "Hood, beanie and sunglasses qualify the
  expression; eye contact redirects to the task" · "Mouth turns up at the brace
  — a small warm cue in a cold frame"
- **Reframe Map:** head angle change (face camera vs away), eye-line redirect,
  remove occlusion (hood off)

### The trap

- **BANNED ABSOLUTELY:** Any face-feature scoring (symmetry, jaw, cheekbones,
  eyes, lips, skin, complexion, perceived age, perceived gender, perceived
  race/ethnicity)
- **BANNED:** Emotional diagnosis from facial expression ("they look sad,"
  "confident," "threatening," "playful")
- **BANNED:** Beauty or attractiveness reads of any kind
- **BANNED:** Inferring personality from facial geometry

### Keep the line

- Name the **head position and eye-line only:** "head tilted left, eye-line at
  camera" · "face turned to task, eyes down"
- Frame as **geometric vector or visibility element:** "direct eye-line fires on
  the same axis, straight out of the frame" · "eye-line and gesture orient
  toward the task" · "hood and sunglasses redirect visibility away from face
  reading"
- Keep it **re-authorable:** head position changes with pose, expression changes
  with muscle geometry
- Route to **Presence, Signal, Gesture Geometry stats + archetype**, never to
  "attractiveness," "emotion," "personality," or "age" reads
- Use **only observable geometry:** "mouth geometry visible," "eye-line
  direction," "head angle," never "expression implies X about them"

---

## 13. CONTRADICTIONS (mismatch between cues)

**What the engine reads:** visual ideas that refuse to resolve, contradiction
between styling and setting, gesture and environment, signal and context,
formal preparation vs casual execution, formality vs informality mismatch.

### Concrete cues

- **Formal clothing in casual/harsh setting** → style-setting mismatch
- **Careful gesture/stillness amid chaotic environment** → figure-environment
  contradiction
- **Relaxed stance in tight, formal space** → gesture-setting contradiction
- **Rough equipment in polished environment** → equipment-setting contradiction
- **Bright color against muted palette** → one signal refuses to resolve
- **Small figure in overwhelmingly large space** → scale contradiction
- **Technical gesture (concentrated work) amid beautiful vista** → task-moment
  contradiction
- **Directional gaze away from the scene's main point** → attention contradiction
- **One element clean/refined, rest cluttered** → partial order signal

### What it feeds

- **Charge** stat: unresolved contradiction creates tension/energy
- **Fit Coherence** stat: parts don't agree
- **Archetype detection:** The Striking Contradiction (two visual ideas refuse to
  resolve), The Signal Bearer (one thing says stop, but the frame keeps going)
- **Receipt language:** "Two ideas, no winner" · "The contradiction stays
  unresolved on purpose; that is the artifact" · "The mismatch becomes the
  record" · "Everything in the frame agrees / the mismatch becomes the point"
- **Reframe Map:** resolve the contradiction (change to match) or intensify it

### The trap

- **BANNED:** Reading contradiction as personality conflict ("inner
  contradiction," "struggling between X and Y")
- **BANNED:** Making psychology reads from visual mismatch

### Keep the line

- Name the **two elements in contradiction:** "formal styling vs harsh outdoor
  setting" · "concentrated work-gesture amid scenic vista" · "small figure in
  enormous space"
- Frame as **visual composition fact:** "the mismatch becomes the record" · "two
  ideas, the frame keeps them unresolved" · "styling and setting point different
  directions"
- Keep it **re-authorable:** resolve the contradiction (change one element) →
  different card
- Route to **Charge, Fit Coherence stats + archetype**, never to "internal
  conflict" or "personality" reads

---

## 14. TIME EVIDENCE (old photo quality, condition, archive feel, degradation, era markers)

**What the engine reads:** image condition as artifact age (sharp/soft, color
fade, grain, dust), photographic era markers (film stock, processing style),
degradation (scans of old prints, fading), candid/unstaged feel as time-proof,
found-footage quality.

### Concrete cues

- **Film grain, ISO noise visible** → analog/old processing era marker
- **Color fade, bleached hues** → age evidence, pigment degradation
- **Dust, scratches, film damage visible** → object age, wear
- **Soft focus throughout, unsharp** → old lens stock, degradation
- **Black and white vs color** → era/processing choice marker
- **Vignetting, lens aberration** → vintage/old-lens aesthetic (from era, not
  styling)
- **Candid composition, no staging evident** → unstaged evidence, time-proof
- **Formal, posed, deliberate composition** → staged artifact, intentional
  record-making
- **Instant print quality, Polaroid aesthetic** → era marker, chemical process

### What it feeds

- **Artifact Coherence** stat: how record-like vs random is the image?
- **Archetype detection:** The Archive Ghost (reads like found footage / old
  record), The Untouched Witness (candid unstaged), The Sealed Artifact (record-like,
  deliberately composed)
- **Receipt language:** "Looks recovered, not taken" · "No staging detected —
  rarer than staging" · "Arrives pre-catalogued" · "Filed as evidence from a
  time the frame won't name"
- **Reframe Map:** re-shoot with different film/digital process, different era
  aesthetic

### The trap

- **BANNED:** Reading age/era as personality archetype ("film grain so they're
  retro/vintage/old-soul")
- **BANNED:** Inferring value from archival quality

### Keep the line

- Name the **condition and era marker:** "film grain, ISO high" · "candid,
  unstaged composition" · "color fade, age evidence"
- Frame as **artifact age evidence or compositional choice:** "the image reads
  like field evidence" · "no staging detected" · "arrives pre-catalogued"
- Keep it **re-authorable:** re-shoot with digital/film, different processing →
  different card
- Route to **Artifact Coherence, Archetype stat**, never to "old soul" or
  "timeless beauty" reads

---

## 15. TEXT & GRAPHICS IN FRAME (signage, logos, printed matter, UI elements if screenshot)

**What the engine reads:** visible text/signage as scene context, legibility of
the text, text as visual signal layer, text density and readability, graphics/
UI if it's a screenshot, visual hierarchy of text.

### Concrete cues

- **Road sign, directional marker visible** → locale signal, geography cue
- **Store sign, business signage** → commercial locale marker
- **License plate readable** → geographic evidence
- **Printed text on clothing (t-shirt graphic, logo)** → styling signal, worn
  message
- **Dashboard text, odometer, gauge readable** → context/vehicle-interior signal
- **Warning sign, equipment label** → work environment signal
- **Graffiti, urban text layer** → urban environment marker
- **Subtle text, hard to read** → noise element
- **Prominent text, easy read** → signal broadcast

### What it feeds

- **Lore Density** stat: text places scene in specific context
- **Signal** stat: text can be the signal
- **Frame** stat: text distribution affects composition
- **Archetype detection:** The Signal Bearer (text is the message), The
  Overloaded Channel (too much text competes)
- **Receipt language:** "The sign reads as place evidence, not message" · "Text
  density adds to scene specificity"
- **Reframe Map:** crop in/out the text, move relative to text

### The trap

- **BANNED:** Reading text content as personality/belief ("they're wearing a
  text shirt, so that's their identity")
- **BANNED:** Making value/political judgments from visible text

### Keep the line

- Name the **text and context:** "road sign, directional" · "store signage,
  legible" · "dashboard text readable"
- Frame as **scene context evidence or signal layer:** "the sign places the scene
  in marked geography" · "text becomes a signal broadcast" · "the label shows
  locale"
- Keep it **re-authorable:** crop it out, move to different location, different
  sign → different card
- Route to **Lore, Signal, Frame stats + archetype**, never to "beliefs" or
  "values" reads

---

## 16. DISTANCE & SCALE (how close the camera is, how big the subject is relative to frame)

**What the engine reads:** subject bounding-box size (% of frame), camera distance
cues (perspective, lens apparent length), scale relationships (subject vs
environment), intimate vs distant framing, macro vs wide scope.

### Concrete cues

- **Extreme close-up, face or hand fills frame** → intimate distance, detail
  focus
- **Medium shot, subject 40-60% of frame** → conversational distance,
  comfortable scale
- **Wide shot, subject 10-20% of frame** → landscape dominance, isolation
- **Ultra-wide, subject tiny in environment** → scale mismatch, small human
- **Telephoto appearance, compressed distance** → lens effect, perspective
  flattening
- **Wide-angle appearance, exaggerated perspective** → lens distortion, spatial
  stretch

### What it feeds

- **Presence** stat: subject size/dominance in frame
- **Setting Gravity** stat: does distance favor environment?
- **Visual Impact** stat: scale affects memorability
- **Frame** stat: how distance shapes composition
- **Archetype detection:** The Open Field (tiny subject, huge environment),
  The Vertical (height distance dominance)
- **Receipt language:** "Subject occupies under a tenth of the frame; the setting
  dominates" · "A wide-angle barrel and dashboard intrusion tax the composition"
  · "The snow plane owns three quarters of the frame"
- **Reframe Map:** move closer or farther, change lens (wide vs telephoto)

### The trap

- **BANNED:** Reading close distance as intimacy/affection judgment
- **BANNED:** Reading wide distance as rejection/alienation
- **BANNED:** Inferring relationship from distance framing

### Keep the line

- Name the **distance and subject size:** "extreme close-up, face fills frame" ·
  "wide shot, subject 15% of frame"
- Frame as **compositional choice or scale fact:** "the wide distance lets
  setting dominate" · "close framing concentrates attention" · "perspective
  compresses space"
- Keep it **re-authorable:** move the camera, change distance → different card
- Route to **Presence, Setting Gravity, Visual Impact, Frame stats + archetype**,
  never to "relationship" or "emotional distance" reads

---

## 17. MOTION & STILLNESS (blur, frozen moment, action vs pause, trajectory)

**What the engine reads:** motion blur as visual evidence, frozen-moment clarity,
suspended action (mid-motion vs resolved), motion vectors (direction, trajectory),
stillness as deliberate or accidental.

### Concrete cues

- **Motion blur at edges, subject sharp** → in-motion moment, direction evidence
- **Crisp sharp throughout** → frozen moment, no motion
- **Blur in background, subject sharp** → selective focus, motion direction
- **Subject mid-gesture, limb in motion** → action moment, unresolved movement
- **Completely still, no motion potential** → resolved pause, restful moment
- **Hand blur, body sharp** → directional motion vector

### What it feeds

- **Charge** stat: motion creates tension; stillness resolves it
- **Presence** stat: still mass reads differently than moving
- **Archetype detection:** The Last Frame (terminal motion moment), The Static
  Saint (stillness elevated), The Quiet Catalyst (minimal motion runs the frame)
- **Receipt language:** "The raised palm and forward lean hold an unspent motion"
  · "Motion blur at the edges holds an unspent movement" · "Stillness staged
  like a relic, not a pause"
- **Reframe Map:** capture during motion vs after, freeze the moment or let blur
  enter

### The trap

- **BANNED:** Reading stillness as calmness/peace personality trait
- **BANNED:** Reading motion as energy/excitement personality marker
- **BANNED:** Making psychological inferences from moment-state

### Keep the line

- Name the **motion state:** "motion blur present, directional" · "completely
  still, resolved" · "mid-gesture, unspent motion"
- Frame as **compositional/moment fact:** "unspent motion creates tension" ·
  "stillness resolves the frame" · "blur traces the motion direction"
- Keep it **re-authorable:** re-shoot, capture different moment in sequence →
  different card
- Route to **Charge, Presence stats + archetype**, never to "mood" or "energy
  personality" reads

---

## Implementation guide: How cues route through the system

1. **Detection layer:** Future scanner identifies these cues in the image
   (computer vision, AI vision, or human analysis)
2. **Receipt grounding:** Each cue grounds a receipt: observed cue → artifact
   effect
3. **Stat routing:** Receipts and cues feed into stat scoring (Presence, Frame,
   Signal, Charge, Lore Density, Fit Coherence, Gesture Geometry, Setting
   Gravity, Visual Impact, Artifact Coherence)
4. **Lens application:** Each cue may activate one or more lenses (Composition,
   Gesture, Styling, Setting, Tension, Signal, Lore, Artifact, Negative Space,
   Screenshot)
5. **Archetype trigger:** Cue combinations fire archetypes (24 v1)
6. **Halo module mapping:** Cues fill the 7 dossier modules (The Read, Strongest
   Lever, Active Levers, Keep This, Variant Routes, One Reduce, Next Pull Setup)
7. **Safety filter:** Every reading passes Artifact Test, HUMAN_READ_LINE gates,
   forbidden-term scan, connotation-strip test
8. **Output:** Free pull (4 visible stats, 2-3 receipts, archetype) or Halo
   dossier (all 10 stats, full evidence board, modules, oracle)

---

## Safety checkpoint: The person-reading traps and how to avoid them

### Per-cue families, the most dangerous redirects:

| Cue family | Dangerous trap | Safe reframe |
|---|---|---|
| Gesture | "pose shows confidence/vulnerability" | "head angle, hand position, stance geometry" |
| Hand/object | "professional grip shows skill" | "hand-object relationship as geometry" |
| Animal | "loyal like their dog" | "creature as compositional element, scale reference" |
| Vehicle | "expensive car shows wealth" | "vehicle as scene container, context" |
| Clothes | "bold color shows boldness" | "color as visual design layer, contrast element" |
| Setting | "beautiful place shows taste" | "location as visual dominance, context layer" |
| Weather | "harsh conditions build character" | "light quality, optical property, season evidence" |
| Light | "warm light makes them glow" | "light direction, quality, optical effect" |
| Color | "red is aggressive energy" | "saturation level, contrast anchor, visual weight" |
| Composition | "centered = stiff" | "subject placement, balance, frame pressure" |
| Texture | "worn fabric shows they've lived" | "material condition, aging evidence" |
| Face/head | "attractive eyes, strong jaw" | "head angle, eye-line vector, focus geometry" |
| Contradiction | "internal conflict" | "visual elements that don't resolve" |
| Time evidence | "old photos mean old soul" | "image condition, artifact age, era marker" |
| Text | "the shirt message is their identity" | "text as scene context, signal broadcast" |
| Distance | "close framing means intimacy" | "subject size, scale relationship, camera position" |
| Motion | "stillness means calm nature" | "moment state, blur vector, action frozen" |

**Master rule:** If the reading survives with "the person" as the subject after
removing the photo-noun, it fails the gate. Rewrite it with the image element as
subject.

---

## Authority note

This taxonomy is a **reference guide for scanner/engine builders** — the concrete
visual cues that BLUE ROOM reads, mapped to their safe artifact readings, with
traps and how to avoid them explicitly named. It builds from:

- `CARD_SYSTEM_V1` §2-4 (stats, lenses, archetypes)
- `CARD_LOGIC_V1` §4 (cue categories), §6 (archetype triggers)
- `HUMAN_READ_LINE_V1` (image-act vs permanent wall)
- `data.js` fixture receipts and evidence board
- `HALO_DOSSIER_SCHEMA_V1` (module mapping)
- `scan-contract.js` (FORBIDDEN_TERMS, safety flags)

Safety laws inherit from `PROJECT_OS` §1/§4, `COPY_SYSTEM` §3, and are
LOCKED-grade. No cue may be re-mapped to a banned reading, and no new cue may
enter the system without explicit Artifact Test + HUMAN_READ_LINE gate validation.

---

**Status:** Ready for scanner/engine builders. New cues or stat mappings require
Core Change Review + Gate validation before implementation.
