/* voice-ext.js — Blue Room tarot VOICE, extended.
   The locked voice.js gives the 22 Major-UPRIGHT pivots. This file supplies the rest of
   the deck in the SAME authored register (the .e / .p / .c voice), so every one of the 78
   cards LEADS in the room's own voice and the codex prose is quoted, never spoken:

     UP  — the 56 Minor-Arcana UPRIGHT pivots (Majors upright stay in voice.js).
     REV — the reversed pivot for ALL 78 cards (22 Major + 56 Minor).

   Field shape mirrors voice.js exactly:
     e = a hyphenated epithet (tag form)
     p = the pivot sentence — the LEAD, one present-indicative image of the card's own gesture
     c = the participial clause form of the pivot

   Register law: third-person of the record; present indicative; NO advice, NO second person,
   NO keyword abstraction, NO backend jargon. Each line seizes the card's OWN pictured image
   and holds discrimination from every card it might be drawn beside. Reversed reads the same
   image turned — withheld, undone, spilled, or in its aftermath.

   data.js / voice.js stay untouched. Optional at runtime — app.js fails open to codex text
   if this file is absent. Keyed by the exact data.js card names, with a normalized fallback. */
(function (w) {
  "use strict";
  function norm(s) { return String(s == null ? "" : s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); }

  /* ---------------------------------------------------------------- 56 Minor · UPRIGHT */
  var UP = {
    /* --- Wands · Fire --- */
    "Ace of Wands":      { e: "bud-offered",      p: "The offered wand puts out its first green leaves before anyone has decided what to build with it.",              c: "leafing before the build is named" },
    "Two of Wands":      { e: "battlement-held",  p: "The figure on the battlement holds the whole globe and keeps one wand bolted to the wall behind him.",           c: "holding the globe, one wand still bolted down" },
    "Three of Wands":    { e: "harbor-watching",  p: "The merchant stands with his back to us and watches the ships he already sent grow small on the water.",          c: "watching the sent ships grow small" },
    "Four of Wands":     { e: "garland-raised",   p: "Four staves hold up a garland, and the dancing starts before the last knot is tied.",                             c: "dancing under the raised garland" },
    "Five of Wands":     { e: "cross-swinging",   p: "Five raise their staves at once and each swings at a different quarrel, none of them the same fight.",            c: "swinging, no two at the same fight" },
    "Six of Wands":      { e: "laurel-borne",     p: "The rider wears the laurel through the crowd and lets them carry the shout for him.",                             c: "wearing the laurel the crowd shouts for" },
    "Seven of Wands":    { e: "rise-holding",     p: "One holds the high ground and fends off six staves that come up at him from below the rise.",                     c: "holding the rise against six from below" },
    "Eight of Wands":    { e: "arrow-flighted",   p: "Eight wands fly level across a clear sky with no hand left on them to slow the flight.",                          c: "flying level, no hand left on them" },
    "Nine of Wands":     { e: "fence-guarding",   p: "The bandaged watchman leans on his wand and keeps one eye on the fence for a blow that may not come.",            c: "leaning bandaged, still watching the fence" },
    "Ten of Wands":      { e: "load-bent",        p: "The figure carries all ten wands at once and cannot see the road for the load in his arms.",                      c: "carrying ten, the road hidden by the load" },
    "Page of Wands":     { e: "wonder-struck",    p: "The page turns the sprouting wand in both hands and studies it as if it might answer back.",                      c: "studying the wand for an answer" },
    "Knight of Wands":   { e: "spur-quick",       p: "The Knight of Wands rears the horse and rides out before the plan behind him is finished.",                       c: "riding out ahead of the finished plan" },
    "Queen of Wands":    { e: "sunflower-sure",   p: "The Queen of Wands holds the sunflower and the wand together and meets the room with a level, unhurried gaze.",   c: "meeting the room with a level gaze" },
    "King of Wands":     { e: "vista-set",        p: "The King of Wands grips the flowering wand and looks past the near work to the enterprise it becomes.",           c: "looking past the work to the enterprise" },

    /* --- Cups · Water --- */
    "Ace of Cups":       { e: "overbrimming",     p: "The chalice overflows before it is lifted, five streams running over the rim and the dove still coming down.",    c: "overflowing before it is lifted" },
    "Two of Cups":       { e: "equal-pledged",    p: "Two step close and trade their cups as equals, each raising the other's rather than their own.",                  c: "trading cups as equals" },
    "Three of Cups":     { e: "ring-raised",      p: "Three women lift their cups into one ring and let the harvest crowd their feet.",                                 c: "lifting three cups into one ring" },
    "Four of Cups":      { e: "offer-blind",      p: "The seated figure keeps his arms crossed over three cups and does not look up at the fourth held out to him.",    c: "not looking up at the fourth cup" },
    "Five of Cups":      { e: "spill-fixed",      p: "The cloaked figure stares at the three spilled cups and keeps his back to the two still standing.",               c: "back turned to the two still full" },
    "Six of Cups":       { e: "garden-kept",      p: "A child fills a cup with flowers and hands it to another, the garden as small and safe as it ever was.",         c: "handing over a cup filled with flowers" },
    "Seven of Cups":     { e: "cloud-offered",    p: "Seven cups rise in the clouds, each holding a different prize, and none of them yet weigh anything in the hand.", c: "seven prizes, none of them yet real" },
    "Eight of Cups":     { e: "night-parting",    p: "The figure stacks eight cups neatly and walks off toward the hills under a turned-down moon.",                   c: "walking off from the stacked cups" },
    "Nine of Cups":      { e: "wish-seated",      p: "The figure sits with arms folded before his nine cups arranged like a shelf of granted wishes.",                 c: "seated before nine cups like granted wishes" },
    "Ten of Cups":       { e: "rainbow-crowned",  p: "Ten cups arc into a rainbow over the raised arms of a family that is not counting them.",                        c: "the rainbow arched over a family not counting" },
    "Page of Cups":      { e: "tide-curious",     p: "The page lifts his cup and a fish leans out of it, and he takes the surprise as an invitation.",                 c: "taking the fish in the cup as an invitation" },
    "Knight of Cups":    { e: "offer-borne",      p: "The Knight of Cups rides at a walk and carries the cup out ahead of him like a question already asked.",         c: "carrying the cup out at a walk" },
    "Queen of Cups":     { e: "tide-gazing",      p: "The Queen of Cups gazes into a closed, ornate cup and keeps what she reads in it to herself.",                   c: "reading a closed cup, keeping it in" },
    "King of Cups":      { e: "swell-steady",     p: "The King of Cups keeps the cup level while the sea heaves under his throne and shows none of it on his face.",   c: "keeping the cup level over a heaving sea" },

    /* --- Swords · Air --- */
    "Ace of Swords":     { e: "edge-crowned",     p: "The sword stands straight up out of the cloud, crowned, its edge already set to the first hard truth.",          c: "standing crowned, set to the first truth" },
    "Two of Swords":     { e: "blindfold-set",    p: "The blindfolded figure holds two swords crossed at her chest and refuses to look at either sea behind her.",     c: "holding two swords, looking at neither" },
    "Three of Swords":   { e: "heart-pierced",    p: "Three swords cross through the one heart at once, and the sky behind them does nothing but rain.",               c: "three swords through the one heart" },
    "Four of Swords":    { e: "tomb-stilled",     p: "The knight lies still on the tomb with three swords hung over him and one laid quiet beneath.",                  c: "lying still, the swords hung and quiet" },
    "Five of Swords":    { e: "field-emptied",    p: "One gathers up the fallen swords with a smirk while the two he beat walk off across the wind.",                  c: "gathering the swords the beaten leave" },
    "Six of Swords":     { e: "ferry-bound",      p: "The ferryman poles the woman and child toward the far shore, the six swords standing quiet in the hull.",        c: "poling toward the calmer shore" },
    "Seven of Swords":   { e: "camp-slipping",    p: "The figure slips out of the camp with five swords in his arms and glances back at the two he had to leave.",     c: "carrying off five, leaving two" },
    "Eight of Swords":   { e: "hedge-bound",      p: "The bound figure stands hemmed by eight swords and cannot see the gap the arrangement plainly leaves open.",     c: "hemmed by eight, blind to the gap" },
    "Nine of Swords":    { e: "night-woken",      p: "The figure sits up in the dark with head in hands while nine swords hang level on the wall and never fall.",    c: "sitting up in the dark under nine swords" },
    "Ten of Swords":     { e: "dawn-pinned",      p: "Ten swords pin the figure to the ground and the first light comes up under the sky regardless.",                c: "pinned by ten, the dawn coming anyway" },
    "Page of Swords":    { e: "wind-alert",       p: "The page holds the sword up against the wind and turns as if he has just heard something worth catching.",      c: "turning at a sound, sword up in the wind" },
    "Knight of Swords":  { e: "gale-charging",    p: "The Knight of Swords gallops straight into the wind with the sword out and asks no one to keep up.",            c: "galloping into the wind, sword out" },
    "Queen of Swords":   { e: "clear-eyed",       p: "The Queen of Swords holds the sword straight up and raises one hand to keep the plainer truth at a set distance.", c: "sword upright, one hand set out for distance" },
    "King of Swords":    { e: "proof-weighed",    p: "The King of Swords holds the sword upright and level and weighs the room by what can be proven in it.",         c: "holding the sword level, weighing by proof" },

    /* --- Pentacles · Earth --- */
    "Ace of Pentacles":  { e: "seed-offered",     p: "The single coin rests in the open palm above the garden, a road already laid out through the arch beyond it.",   c: "one coin held, a road laid past the arch" },
    "Two of Pentacles":  { e: "loop-juggled",     p: "The juggler keeps two coins turning on one looping ribbon while the ships behind him ride the swell.",          c: "keeping two coins turning on one ribbon" },
    "Three of Pentacles":{ e: "arch-set",         p: "The mason sets his chisel to the arch while the monk and the architect hold the plan up beside him.",            c: "cutting the arch to the held plan" },
    "Four of Pentacles": { e: "coin-clamped",     p: "The seated man clamps one coin to his chest, stands on two more, and balances the last on his head.",           c: "clamping every coin against loss" },
    "Five of Pentacles": { e: "snow-passed",      p: "Two trudge through the snow past a lit window and do not turn their heads to the warm light inside it.",         c: "passing the lit window in the snow" },
    "Six of Pentacles":  { e: "scale-weighed",    p: "The merchant holds the scale in one hand and lets the coins fall from the other into two waiting palms.",        c: "measuring the coins as they fall" },
    "Seven of Pentacles":{ e: "harvest-weighing", p: "The farmer leans on the hoe and studies the loaded vine without yet putting a hand to the harvest.",             c: "studying the vine, harvest not yet taken" },
    "Eight of Pentacles":{ e: "bench-bound",      p: "The craftsman cuts the same coin over and over at the bench and hangs each finished one on the post.",          c: "cutting the same coin again and again" },
    "Nine of Pentacles": { e: "vine-walked",      p: "The lady walks her own vineyard alone with the hooded falcon on her wrist and needs no one to admire it.",      c: "walking her own vineyard alone" },
    "Ten of Pentacles":  { e: "arch-rooted",      p: "The old man sits under the family arch while the dogs and children move through wealth that outlasts him.",     c: "sitting under an arch of inherited wealth" },
    "Page of Pentacles": { e: "coin-studious",    p: "The page holds one coin up at eye level and studies it like a lesson he means to get right.",                   c: "holding one coin up like a lesson" },
    "Knight of Pentacles":{ e: "furrow-steady",   p: "The Knight of Pentacles sits the still horse at the field's edge and looks the furrow over before he works it.", c: "sitting the still horse over the plowed field" },
    "Queen of Pentacles":{ e: "garden-rooted",    p: "The Queen of Pentacles cradles the coin in her lap in a full garden with the rabbit easy at her feet.",        c: "cradling the coin in a full garden" },
    "King of Pentacles": { e: "estate-sure",      p: "The King of Pentacles rests the coin on his knee amid the vineyard he built and has nothing left to prove of it.", c: "resting the coin amid the estate he built" }
  };

  /* ---------------------------------------------------------------- 78 cards · REVERSED */
  var REV = {
    /* --- Major Arcana reversed --- */
    "The Fool":          { e: "eyes-shut",        p: "The Fool takes the step with his eyes already shut and reads the drop only on the way down.",                   c: "stepping blind, reading the drop mid-air" },
    "The Magician":      { e: "sleight-run",      p: "The Magician keeps the same four tools moving so quickly that no one, including him, sees which hand is empty.", c: "moving the tools to hide the empty hand" },
    "The High Priestess":{ e: "veil-slipped",     p: "The High Priestess lets the veil slip, and the secret behind it is read by the wrong eyes, or by none.",       c: "letting the guarded secret slip the veil" },
    "The Empress":       { e: "seed-gone",        p: "The Empress lets the garden go to seed and can no longer tell the smothering from the tending.",                c: "letting the garden smother what it fed" },
    "The Emperor":       { e: "wall-hardened",    p: "The Emperor holds the stone boundary so hard it becomes a wall, or drops it and keeps no line at all.",         c: "holding the line until it walls him in" },
    "The Hierophant":    { e: "rite-hollowed",    p: "The Hierophant recites the rite past the point anyone recalls its meaning, or walks out of the pew for good.",   c: "reciting a rite emptied of its meaning" },
    "The Lovers":        { e: "vow-parted",       p: "The Lovers stand under the same angel and turn their faces apart, the values between them no longer matched.",   c: "turning apart under the witnessing angel" },
    "The Chariot":       { e: "yoke-split",       p: "The Chariot's two beasts pull against each other and the cart turns in place without gaining the road.",        c: "the two beasts pulling the cart in place" },
    "Strength":          { e: "grip-forced",      p: "Strength forces the lion's jaw instead of gentling it, and the calm goes out of both of them at once.",         c: "forcing the jaw the gentle hand once closed" },
    "The Hermit":        { e: "lamp-turned-in",   p: "The Hermit stays past the last house so long the lamp lights only himself, and he will not carry it down.",     c: "keeping the lamp up the mountain too long" },
    "Wheel of Fortune":  { e: "spoke-jammed",     p: "The Wheel catches on its lowest spoke and brings the same turn back around before its lesson is read.",          c: "catching low, returning the same turn" },
    "Justice":           { e: "scale-thumbed",    p: "Justice sets the sword down before the scale has settled and lets the tilt stand as if it were level.",         c: "calling a tilted scale level" },
    "The Hanged Man":    { e: "hang-stalled",     p: "The Hanged Man keeps hanging by the one foot long after the view has stopped teaching him anything.",           c: "hanging on past what the inversion taught" },
    "Death":             { e: "chapter-held",     p: "Death is kept from closing the chapter, and the page stays open on a thing already finished.",                  c: "holding open a chapter already finished" },
    "Temperance":        { e: "pour-spilled",     p: "Temperance tips the two cups too far and the steady pour breaks into a spill down one side.",                   c: "tipping the two cups past the steady pour" },
    "The Devil":         { e: "chain-worked",     p: "The Devil's chain is loose enough to lift, and the hand on it either slips free or closes tighter around it.",  c: "the loose chain lifted, or gripped harder" },
    "The Tower":         { e: "strike-held",      p: "The Tower takes the lightning and does not fall yet, and the crack runs on behind the wall unread.",            c: "taking the strike, the fall delayed" },
    "The Star":          { e: "sky-closed",       p: "The Star pours the water under a sky that has not cleared, and the vessel empties faster than it fills.",       c: "pouring under a sky that stays shut" },
    "The Moon":          { e: "mist-turned",      p: "The Moon burns off some of the mist on the path, or thickens it, and the wolf keeps its place either way.",    c: "the path clearing or thickening, wolf held" },
    "The Sun":           { e: "light-dimmed",     p: "The Sun rides on behind cloud, and the same field lies under a light turned down rather than out.",             c: "riding on under a light turned down" },
    "Judgement":         { e: "call-unanswered",  p: "Judgement sounds the trumpet and the figures stay lying in the graves, the call heard and not answered.",       c: "the trumpet sounded, the grave kept shut" },
    "The World":         { e: "circle-short",     p: "The World brings the dance almost back to the start and stops it a step short of closing the circle.",          c: "stopping the dance a step short of closed" },

    /* --- Wands reversed --- */
    "Ace of Wands":      { e: "bud-cooled",       p: "The offered wand is taken and set down before it leafs, the spark in it going cold in the hand.",               c: "the wand set down before it leafs" },
    "Two of Wands":      { e: "wall-kept",        p: "The figure keeps both wands bolted to the wall now and lets the globe gather dust on the battlement.",          c: "both wands bolted, the globe left down" },
    "Three of Wands":    { e: "horizon-empty",    p: "The merchant watches the horizon for ships that do not come back and keeps his back turned to the port.",       c: "watching for ships that do not return" },
    "Four of Wands":     { e: "garland-sagged",   p: "The garland between the four staves sags and the dancing thins before the day it was raised for arrives.",      c: "the garland sagging, the dance thinned" },
    "Five of Wands":     { e: "quarrel-sunk",     p: "The five lower their staves, and the quarrel neither settles nor ends — it only goes underground.",            c: "the staves lowered, the fight gone under" },
    "Six of Wands":      { e: "laurel-quieted",   p: "The rider keeps the laurel on through a crowd that has stopped shouting, the victory going unread behind it.",  c: "wearing the laurel a quiet crowd ignores" },
    "Seven of Wands":    { e: "rise-lost",        p: "The defender's footing on the rise slips and the six staves below gain the ground he was holding.",            c: "the footing slipping, the six gaining ground" },
    "Eight of Wands":    { e: "flight-scattered", p: "The eight wands lose their line in the air and come down scattered short of where they were flung.",             c: "the wands coming down short and astray" },
    "Nine of Wands":     { e: "guard-fixed",      p: "The bandaged watchman keeps his guard up over a fence no one is coming for, too spent to lower the wand.",       c: "guarding a fence no one assaults" },
    "Ten of Wands":      { e: "load-dropped",     p: "The figure lets the ten wands fall from his arms at last, or goes down under them still refusing to share the weight.", c: "the ten wands dropped, or gone under" },
    "Page of Wands":     { e: "wonder-scattered", p: "The page turns the sprouting wand a while and sets it down, the wonder in it never quite becoming a step.",      c: "the wand set down, the step never taken" },
    "Knight of Wands":   { e: "charge-spent",     p: "The Knight of Wands charges hard and reins in just as fast, the ride abandoned before it reaches anything.",    c: "reining in the charge before it arrives" },
    "Queen of Wands":    { e: "warmth-withheld",  p: "The Queen of Wands turns the sunflower away from the room, the warmth in her held back or spent chasing a nod.", c: "turning the sunflower from the room" },
    "King of Wands":     { e: "vision-overrun",   p: "The King of Wands drives the flowering wand at more than it can carry and scorches the enterprise he meant to grow.", c: "driving the wand past what it can carry" },

    /* --- Cups reversed --- */
    "Ace of Cups":       { e: "cup-upturned",     p: "The chalice is turned on its side before it is lifted and the five streams run out onto the ground.",           c: "the chalice tipped out before it is raised" },
    "Two of Cups":       { e: "pledge-broken",    p: "The two lower their cups without the exchange completing, and the match that once held goes uneven between them.", c: "the two cups lowered, the match gone uneven" },
    "Three of Cups":     { e: "ring-broken",      p: "The three cups come out of their ring and the toast turns to talk held behind hands.",                          c: "the toast breaking into talk behind hands" },
    "Four of Cups":      { e: "gaze-lifting",     p: "The seated figure finally lifts his eyes to the offered fourth cup, or sinks deeper into the three on the ground.", c: "at last eyeing the fourth cup, or not" },
    "Five of Cups":      { e: "turn-begun",       p: "The mourner starts to turn toward the two cups still standing, the three spilled ones no less spilled for it.",  c: "turning at last to the two still full" },
    "Six of Cups":       { e: "garden-clung",     p: "The child's garden holds on past its season, and the old warmth is kept alive out of habit more than need.",     c: "keeping the child's garden past its season" },
    "Seven of Cups":     { e: "cloud-thinned",    p: "The seven cloud-cups thin out and one is finally reached for, or all of them are chased until none is held.",   c: "the visions thinning to one, or to none" },
    "Eight of Cups":     { e: "path-doubled",     p: "The figure stops on the hill and turns back toward the eight cups he stacked, or wanders on with no shore in mind.", c: "turning back to the stacked cups, or drifting" },
    "Nine of Cups":      { e: "wish-hollowed",    p: "The figure sits before his nine cups and finds the wish they granted thinner in the having than in the wanting.", c: "the granted wish thinner than the wanting" },
    "Ten of Cups":       { e: "rainbow-paled",    p: "The rainbow over the house pales and the raised arms come down over a harmony that looked whole from the road.", c: "the rainbow paling over a cracked home" },
    "Page of Cups":      { e: "tide-flat",        p: "The page lifts the cup and nothing leans out of it, the message in it moody, misread, or kept too long.",       c: "the cup lifted, nothing rising from it" },
    "Knight of Cups":    { e: "offer-hollow",     p: "The Knight of Cups carries the cup out and finds it empty at the arriving, or turns the horse before he offers it.", c: "carrying out a cup that arrives empty" },
    "Queen of Cups":     { e: "tide-drowned",     p: "The Queen of Cups reads the closed cup until she can no longer tell its feeling from her own and pours on anyway.", c: "reading the cup until its feeling floods hers" },
    "King of Cups":      { e: "swell-breached",   p: "The King of Cups keeps the still face while the sea beneath the throne works its way up into the level hand.",   c: "the sea working up into the level hand" },

    /* --- Swords reversed --- */
    "Ace of Swords":     { e: "edge-fogged",      p: "The sword comes up out of the cloud with its edge already fogged, the clean truth in it turned to a muddle.",    c: "the crowned edge coming up already fogged" },
    "Two of Swords":     { e: "blindfold-off",    p: "The blindfold comes off the two crossed swords and the choice held at bay either lands hard or is flung away.",  c: "the blindfold off, the choice landing hard" },
    "Three of Swords":   { e: "heart-drawn",      p: "The three swords slide back out of the heart and the wound is left to close on its own bad weather.",           c: "the swords drawn out, the wound left open" },
    "Four of Swords":    { e: "tomb-restless",    p: "The knight stirs off the tomb before the rest is finished, or stays laid out on it long past healing.",         c: "rising off the tomb before the rest is done" },
    "Five of Swords":    { e: "field-set-down",   p: "The victor lets the gathered swords fall, and the two who walked off either come back to talk or keep the grudge.", c: "the gathered swords let fall at last" },
    "Six of Swords":     { e: "ferry-stalled",    p: "The ferry stalls midwater and the six swords in the hull weight it back toward the turbulence it left.",        c: "the crossing stalled, weighted back" },
    "Seven of Swords":   { e: "camp-caught",      p: "The figure creeping off with five swords is seen, and the load is dropped, returned, or carried out in the open.", c: "the slipping-off seen, the swords exposed" },
    "Eight of Swords":   { e: "hedge-loosed",     p: "The loose bindings fall from the hemmed figure and the open gap is finally seen, or the blindfold stays on by choice.", c: "the bindings falling, the gap at last seen" },
    "Nine of Swords":    { e: "night-thinning",   p: "Morning comes into the room and the nine swords shrink to their real size, or the dark hour returns unchanged.", c: "the hung swords shrinking by daylight" },
    "Ten of Swords":     { e: "dawn-stirring",    p: "The pinned figure begins to lift under the ten swords as the dawn widens, or lies dreading the same fall again.", c: "stirring up under the ten swords at dawn" },
    "Page of Swords":    { e: "wind-scattered",   p: "The page swings the raised sword at every rumor on the wind and cuts nothing but air with the talk of it.",     c: "swinging at rumors, cutting only air" },
    "Knight of Swords":  { e: "gale-wrecked",     p: "The Knight of Swords rides so hard into the wind that the charge outruns its own aim and wrecks past it.",      c: "the charge outrunning its own aim" },
    "Queen of Swords":   { e: "edge-turned",      p: "The Queen of Swords turns the upright sword from clearing the truth to cutting with it, the raised hand now keeping everyone off.", c: "the sword cutting where it once clarified" },
    "King of Swords":    { e: "verdict-set",      p: "The King of Swords holds the sword level and uses it to prove the verdict he had reached before the evidence.", c: "the level sword proving a set verdict" },

    /* --- Pentacles reversed --- */
    "Ace of Pentacles":  { e: "seed-dropped",     p: "The single coin slides off the open palm before the hand can close, and the road through the arch washes out behind it.", c: "the coin slipping the palm, the road gone" },
    "Two of Pentacles":  { e: "loop-tangled",     p: "The looping ribbon tangles and one of the two coins drops as the ships behind pitch harder on the swell.",      c: "the ribbon tangling, a coin let fall" },
    "Three of Pentacles":{ e: "arch-mismatched",  p: "The mason cuts the arch off the plan the monk and architect hold, and the three no longer build the same thing.", c: "the arch cut off the plan it was held to" },
    "Four of Pentacles": { e: "grip-opened",      p: "The clamped hand opens at last and the four coins either scatter beyond keeping or are finally let go.",        c: "the clamped coins scattering or let go" },
    "Five of Pentacles": { e: "door-neared",      p: "The two in the snow come level with the lit door and either turn in to the warmth or trudge past it once more.", c: "reaching the lit door, turning in or on" },
    "Six of Pentacles":  { e: "scale-tilted",     p: "The merchant's scale tilts as the coins fall, and the giving comes with a hand that expects to be repaid.",    c: "the coins falling from a tilted scale" },
    "Seven of Pentacles":{ e: "vine-quit",        p: "The farmer either walks off from the loaded vine before it ripens or keeps hoeing one that has stopped bearing.", c: "leaving the vine early, or working a dead one" },
    "Eight of Pentacles":{ e: "bench-slipped",    p: "The craftsman's cuts come off the bench rushed and uneven, or the same coin is polished long past any use for it.", c: "the coins coming off the bench uneven" },
    "Nine of Pentacles": { e: "vine-lonely",      p: "The lady walks the vineyard alone and the solitude that was earned settles into a comfort no one visits.",     c: "the earned solitude curdled to loneliness" },
    "Ten of Pentacles":  { e: "arch-cracked",     p: "The family under the arch turns to arguing over the ten coins, and the tradition meant to outlast them thins by a generation.", c: "the family arguing under the cracking arch" },
    "Page of Pentacles": { e: "coin-pocketed",    p: "The page pockets the single coin without finishing the lesson, and the plan he held up to the light goes no further.", c: "pocketing the coin, the lesson unfinished" },
    "Knight of Pentacles":{ e: "furrow-stalled",  p: "The Knight of Pentacles keeps the still horse still so long the furrow before him goes unworked and hardens over.", c: "the still horse kept still, the furrow unworked" },
    "Queen of Pentacles":{ e: "garden-neglected", p: "The Queen of Pentacles tends the coin in her lap until the care turns smothering, or lets the full garden go untended around her.", c: "the care smothering, or the garden let go" },
    "King of Pentacles": { e: "estate-clenched",  p: "The King of Pentacles closes his hand around the coin until the estate he built is the only measure of him left.", c: "the coin closed on until it is the whole measure" }
  };

  function lookup(bank, key) {
    if (!bank) return null;
    if (bank[key]) return bank[key];
    var nk = norm(key);
    for (var k in bank) { if (bank.hasOwnProperty(k) && norm(k) === nk) return bank[k]; }
    return null;
  }

  w.BRArcanaVoiceExt = {
    UP: UP,
    REV: REV,
    // entry object {e,p,c} for a card in a given orientation, or null.
    entry: function (name, reversed) { return lookup(reversed ? REV : UP, name); },
    // the pivot sentence (the LEAD) for a card in a given orientation, or null.
    pivot: function (name, reversed) { var e = lookup(reversed ? REV : UP, name); return e && e.p ? e.p : null; }
  };
})(window);
