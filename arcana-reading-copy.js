/* =============================================================
   ARCANA READING — authored copy bank (90 symbols x 3 parts)

   e = epithet  (weave-ready adjectival phrase)
   p = pivot    (one standalone reading sentence)
   c = clause   (short dependent clause, fusable with another system)

   Authored against the locked composition spec: third-person-of-the-
   record, present indicative, no future tense, no hedges, no advice.
   Codex text is SOURCE, never OUTPUT — no row may print a codex
   `meaning` field. Exposes window.BRArcanaCopy.
============================================================= */
(function () {
  "use strict";

  var BANK = {
    "sun": {
      "Aries": {
        "e": "first-strike",
        "p": "Aries moves before the plan is finished and does not wait for permission to act again.",
        "c": "moving before the plan is closed"
      },
      "Taurus": {
        "e": "root-set",
        "p": "Filed as Taurus: the position holds, and no argument moves it before it is ready.",
        "c": "holding ground long after the argument ends"
      },
      "Gemini": {
        "e": "double-tongued",
        "p": "Gemini answers one question with two others and closes neither, filing both as open.",
        "c": "splitting one answer into two directions"
      },
      "Cancer": {
        "e": "shell-guarded",
        "p": "Filed under Cancer: the door is kept, and who enters is decided twice.",
        "c": "keeping the door half-closed against the cold"
      },
      "Leo": {
        "e": "flame-fed",
        "p": "Leo holds the room's attention and does not lower the flame to make room for another.",
        "c": "holding the room's attention past its welcome"
      },
      "Virgo": {
        "e": "fine-grained",
        "p": "Filed as Virgo: the error is found before it is named by anyone else.",
        "c": "finding the flaw before anyone else does"
      },
      "Libra": {
        "e": "scale-balanced",
        "p": "Libra weighs both sides again and again and refuses to set the scale down first.",
        "c": "weighing both sides without setting either down"
      },
      "Scorpio": {
        "e": "depth-guarded",
        "p": "Filed under Scorpio: what goes under stays under until it decides otherwise.",
        "c": "keeping what it finds beneath the surface"
      },
      "Sagittarius": {
        "e": "horizon-bound",
        "p": "Sagittarius names the horizon out loud and keeps moving before the map catches up.",
        "c": "naming the horizon before reaching it"
      },
      "Capricorn": {
        "e": "summit-bound",
        "p": "Filed as Capricorn: the structure is built once and rebuilt only under its own name.",
        "c": "building toward a summit no one assigned"
      },
      "Aquarius": {
        "e": "off-grid",
        "p": "Aquarius stands apart from the room and keeps its own reading of the room's rules.",
        "c": "standing apart from the room's agreement"
      },
      "Pisces": {
        "e": "tide-loosed",
        "p": "Filed under Pisces: the border dissolves, and the record does not draw it back.",
        "c": "dissolving the edge between what was separate"
      }
    },
    "chinese": {
      "Rat": {
        "e": "unclaimed-seeking",
        "p": "The Rat scans the room for the unclaimed opening and is through it before the talk ends.",
        "c": "scanning for the gap no one claimed"
      },
      "Ox": {
        "e": "pace-holding",
        "p": "The Ox keeps one pace, watched or not — the work goes to no one else.",
        "c": "holding the same pace unwatched"
      },
      "Tiger": {
        "e": "line-crossing",
        "p": "The Tiger crosses the line before the room agrees it is there.",
        "c": "crossing before the room agrees"
      },
      "Rabbit": {
        "e": "quiet-footed",
        "p": "The Rabbit smooths the friction before anyone names it, and leaves the naming undone.",
        "c": "smoothing the friction before it is named"
      },
      "Dragon": {
        "e": "room-commanding",
        "p": "The Dragon states the plan once; a vote on it is not expected.",
        "c": "stating the plan once, not twice"
      },
      "Snake": {
        "e": "still-watching",
        "p": "The Snake watches the full room before it moves and withholds the plan until it is finished.",
        "c": "withholding the plan until it is whole"
      },
      "Horse": {
        "e": "gate-first",
        "p": "The Horse leaves before the destination is finalized — the route gets found en route.",
        "c": "leaving before the destination is fixed"
      },
      "Goat": {
        "e": "feel-guided",
        "p": "The Goat holds the final decision open for one more opinion before it commits.",
        "c": "circling the decision for one more opinion"
      },
      "Monkey": {
        "e": "live-improvising",
        "p": "The Monkey solves the problem live and reroutes around the rule rather than ask permission.",
        "c": "rerouting around the rule mid-motion"
      },
      "Rooster": {
        "e": "record-sharp",
        "p": "The Rooster checks the work twice; the flaw gets named aloud before anyone asks.",
        "c": "naming the flaw before it is asked"
      },
      "Dog": {
        "e": "post-guarding",
        "p": "The Dog stays on the post once the task turns unpopular — the commitment is not reconsidered.",
        "c": "staying after the task turns unpopular"
      },
      "Pig": {
        "e": "grudge-slow",
        "p": "The Pig shares the resource before it is secured, keeping no ledger of who took more.",
        "c": "sharing before the resource is secured"
      }
    },
    "lifePath": {
      "1": {
        "e": "sole-starting",
        "p": "The 1 starts without waiting for company, and does not ask permission to lead.",
        "c": "starting without waiting for company"
      },
      "2": {
        "e": "balance-holding",
        "p": "The 2 holds two positions at once and refuses to pick only one.",
        "c": "holding both sides without choosing"
      },
      "3": {
        "e": "unsettled-speaking",
        "p": "The 3 speaks before it settles, and settling was never the assignment.",
        "c": "speaking before the settling begins"
      },
      "4": {
        "e": "course-laying",
        "p": "The 4 lays one course of brick at a time and does not skip ahead.",
        "c": "laying one course before the next"
      },
      "5": {
        "e": "exit-marking",
        "p": "The 5 keeps the exits marked and uses them, whether or not the room objects.",
        "c": "keeping every exit marked and used"
      },
      "6": {
        "e": "ledger-tending",
        "p": "The 6 tends what others neglect and keeps the ledger even when no one asks.",
        "c": "tending the ledger no one requested"
      },
      "7": {
        "e": "door-closing",
        "p": "The 7 closes the door to think and does not explain the silence that follows.",
        "c": "closing the door before the question"
      },
      "8": {
        "e": "count-commanding",
        "p": "The 8 counts what was built and expects the count to answer for itself.",
        "c": "counting what the structure has built"
      },
      "9": {
        "e": "room-emptying",
        "p": "The 9 empties the room others filled and calls the emptying complete.",
        "c": "emptying what the room accumulated"
      },
      "11": {
        "e": "signal-catching",
        "p": "The 11 receives the signal before the message is confirmed, and files it anyway.",
        "c": "catching the signal before delivery"
      },
      "22": {
        "e": "scale-drafting",
        "p": "The 22 drafts at full scale and still checks that the foundation bears the weight.",
        "c": "drafting at a scale the foundation must bear"
      },
      "33": {
        "e": "credit-declining",
        "p": "The 33 repairs the room and declines the credit, filed as service without a name.",
        "c": "declining the credit for the repair"
      }
    },
    "tarot": {
      "The Fool": {
        "e": "cliff-bound",
        "p": "The Fool steps toward the cliff's edge without pausing to check the drop first.",
        "c": "stepping toward the edge, the drop unchecked"
      },
      "The Magician": {
        "e": "table-quick",
        "p": "The Magician lays four tools on the table and closes his hand around one.",
        "c": "closing one hand around the only tool taken"
      },
      "The High Priestess": {
        "e": "veil-kept",
        "p": "The High Priestess guards the second pillar's secret and translates none of it.",
        "c": "guarding a pillar's secret without translation"
      },
      "The Empress": {
        "e": "garden-thick",
        "p": "The Empress lets the garden outgrow the throne, and the vines keep climbing.",
        "c": "with vines climbing past the throne, unpruned"
      },
      "The Emperor": {
        "e": "stone-seated",
        "p": "The Emperor draws the boundary in stone and does not redraw it for weather.",
        "c": "drawing the boundary again in stone"
      },
      "The Hierophant": {
        "e": "rite-bound",
        "p": "The Hierophant repeats the rite exactly as handed down — no line improvised.",
        "c": "repeating the rite with no line improvised"
      },
      "The Lovers": {
        "e": "angel-witnessed",
        "p": "The Lovers stand under the angel; the choice stays unmade between them.",
        "c": "standing under the angel, the choice unmade"
      },
      "The Chariot": {
        "e": "sphinx-yoked",
        "p": "The Chariot drives two opposed beasts forward without asking either one to agree.",
        "c": "yoking two opposed beasts toward one point"
      },
      "Strength": {
        "e": "lion-gentling",
        "p": "Strength opens the lion's jaw with a bare hand and closes it just as gently.",
        "c": "closing the lion's jaw with an open hand"
      },
      "The Hermit": {
        "e": "lamp-alone",
        "p": "The Hermit climbs past the last house and lights the lamp — for no one else.",
        "c": "lighting the lamp past the last house"
      },
      "Wheel of Fortune": {
        "e": "spoke-turning",
        "p": "The Wheel turns past its highest spoke and does not pause to explain the drop.",
        "c": "turning past the highest spoke, unexplained"
      },
      "Justice": {
        "e": "scale-set",
        "p": "Justice sets the sword down only once the scale has settled flat.",
        "c": "setting the sword down once the scale settles"
      },
      "The Hanged Man": {
        "e": "foot-hung",
        "p": "The Hanged Man hangs by one foot and reads the room from upside down.",
        "c": "hanging by one foot, the room inverted"
      },
      "Death": {
        "e": "chapter-closing",
        "p": "Death closes the chapter without turning ahead to read the next one.",
        "c": "closing the chapter with the next page unread"
      },
      "Temperance": {
        "e": "cup-pouring",
        "p": "Temperance pours steadily between two cups at once and spills from neither.",
        "c": "pouring between two cups without spilling either"
      },
      "The Devil": {
        "e": "loose-chained",
        "p": "The Devil leaves the chain loose enough to lift; no one lifts it.",
        "c": "leaving the chain loose enough to lift off"
      },
      "The Tower": {
        "e": "foundation-struck",
        "p": "The Tower drops the roof before the walls and files the wreckage as evidence.",
        "c": "landing on what was already built"
      },
      "The Star": {
        "e": "storm-after",
        "p": "The Star pours water under a dark sky it did not clear itself.",
        "c": "pouring water under a sky it did not clear"
      },
      "The Moon": {
        "e": "wolf-lit",
        "p": "The Moon lights the path between two towers and clarifies nothing about the wolf beside it.",
        "c": "lighting a path between two towers, wolf-guarded"
      },
      "The Sun": {
        "e": "shadowless",
        "p": "The Sun rides bareback past the wall, casting no shadow the whole way.",
        "c": "riding bareback past the wall, shadowless"
      },
      "Judgement": {
        "e": "grave-risen",
        "p": "Judgement sounds the trumpet once and leaves the grave to answer for itself.",
        "c": "sounding the trumpet once, the grave left standing"
      },
      "The World": {
        "e": "circle-closed",
        "p": "The World closes the circle exactly where the count began — no lap added.",
        "c": "closing the circle where the count began"
      }
    },
    "rune": {
      "Fehu": {
        "e": "count-opening",
        "p": "Fehu counts the herd before it counts the reader, and the tally stays open.",
        "c": "with the herd only just gathered"
      },
      "Uruz": {
        "e": "horn-first",
        "p": "Uruz lowers its horns at the obstacle and does not check the ground first.",
        "c": "meeting the hardship head-on"
      },
      "Thurisaz": {
        "e": "thorn-set",
        "p": "Thurisaz drives the thorn in first and lets the wound do the deciding.",
        "c": "breaking the stall before it hardens"
      },
      "Ansuz": {
        "e": "breath-carried",
        "p": "Ansuz puts the word in the mouth before the reader has verified it.",
        "c": "carrying the word before the proof"
      },
      "Raidho": {
        "e": "wheel-true",
        "p": "Raidho holds the wagon to the rut already cut and refuses the shortcut around it.",
        "c": "keeping the wheel on the rut"
      },
      "Kenaz": {
        "e": "torch-held",
        "p": "Kenaz burns inside the hand, not the room, and lights only what it is pointed at.",
        "c": "throwing light only where it is aimed"
      },
      "Gebo": {
        "e": "hand-open",
        "p": "Gebo sets one hand against another and keeps the exchange exactly even.",
        "c": "closing the gap between two palms"
      },
      "Wunjo": {
        "e": "hearth-bright",
        "p": "Wunjo sits at the table once the labor ends and asks nothing further of the day.",
        "c": "arriving only after the hard part"
      },
      "Hagalaz": {
        "e": "hail-driven",
        "p": "Hagalaz drops without warning and melts on a schedule the reader does not set.",
        "c": "falling without asking permission"
      },
      "Nauthiz": {
        "e": "want-taut",
        "p": "Nauthiz withholds what is wanted and files the reason somewhere the reader cannot reach.",
        "c": "grinding against the limit it names"
      },
      "Isa": {
        "e": "frost-still",
        "p": "Isa freezes the motion mid-stride and holds it there without offering a thaw.",
        "c": "holding the surface without cracking it"
      },
      "Jera": {
        "e": "season-turned",
        "p": "Jera brings the harvest in on its own clock, not the reader's calendar.",
        "c": "arriving only in its proper season"
      },
      "Eihwaz": {
        "e": "root-deep",
        "p": "Eihwaz roots through the frost that kills softer wood and does not name it survival.",
        "c": "standing through what kills softer wood"
      },
      "Perthro": {
        "e": "lot-cast",
        "p": "Perthro shakes the cup and keeps the outcome under the lid until it is thrown.",
        "c": "keeping the outcome under the lid"
      },
      "Algiz": {
        "e": "antler-raised",
        "p": "Algiz plants itself between the threat and the reader, antlers up, comfort withheld.",
        "c": "standing between the threat and the reader"
      },
      "Sowilo": {
        "e": "noon-bright",
        "p": "Sowilo lights the route and leaves the walking entirely to the reader.",
        "c": "lighting the route without walking it"
      },
      "Tiwaz": {
        "e": "oath-bound",
        "p": "Tiwaz pays the hand for the binding and calls the trade settled, not tragic.",
        "c": "paying the hand for the binding"
      },
      "Berkano": {
        "e": "spring-early",
        "p": "Berkano leafs out before the frost fully clears and tends what it starts regardless.",
        "c": "leafing out before the frost clears"
      },
      "Ehwaz": {
        "e": "rein-matched",
        "p": "Ehwaz carries the rider only as far as the rein is trusted.",
        "c": "carrying no more than the rider steers"
      },
      "Mannaz": {
        "e": "circle-bound",
        "p": "Mannaz counts the reader inside the circle, not above it, not outside it.",
        "c": "counting the self inside the circle"
      },
      "Laguz": {
        "e": "tide-drawn",
        "p": "Laguz moves beneath the surface it shows and keeps the current unnamed.",
        "c": "pulling beneath what the surface shows"
      },
      "Ingwaz": {
        "e": "husk-bound",
        "p": "Ingwaz keeps the seed under husk until pressure, not the calendar, breaks it open.",
        "c": "holding the shape before the release"
      },
      "Dagaz": {
        "e": "dawn-split",
        "p": "Dagaz splits the dark down the middle and does not dim for what follows.",
        "c": "splitting the dark down the middle"
      },
      "Othala": {
        "e": "land-held",
        "p": "Othala holds land the reader did not clear and charges no rent against it.",
        "c": "holding the land the reader did not clear"
      }
    },
    "trigram": {
      "☰ Qián · Heaven": {
        "e": "sky-driving",
        "p": "Qián drives outward and does not wait for what follows to agree.",
        "c": "driving forward before the ground can answer"
      },
      "☷ Kūn · Earth": {
        "e": "load-bearing",
        "p": "No claim is filed for what Kūn carries. The whole weight is held anyway.",
        "c": "carrying what the sky begins"
      },
      "☳ Zhèn · Thunder": {
        "e": "shock-first",
        "p": "Zhèn breaks the stillness first and explains nothing on the way in.",
        "c": "breaking stillness before offering any explanation"
      },
      "☵ Kǎn · Water": {
        "e": "peril-threading",
        "p": "Kǎn is filed under danger. The current still finds its line.",
        "c": "flowing toward the goal despite the drop"
      },
      "☶ Gèn · Mountain": {
        "e": "ridge-stopped",
        "p": "Gèn holds the ridge and keeps no record of what moves past it.",
        "c": "holding the ridge without reporting why"
      },
      "☴ Xùn · Wind/Wood": {
        "e": "gap-entering",
        "p": "Xùn leaves no mark of entry. The gap stays unguarded.",
        "c": "entering every gap the door does not guard"
      },
      "☲ Lí · Fire": {
        "e": "fuel-clinging",
        "p": "Lí clings to what is near it and burns only as long as fuel is offered.",
        "c": "lighting whatever it is given to hold"
      },
      "☱ Duì · Lake": {
        "e": "open-surfaced",
        "p": "Duì is filed under joy. The floor beneath stays firm.",
        "c": "reflecting what stands at the firm line beneath"
      }
    }
  };

  /* codex keywords include praise words (wealth, success, victory,
     "earned reward"). "earned" is banned site-wide and the rest read as
     flattery under the ethics rule — threaded three times they turn the
     closing seal into a compliment. Fall through to the next usable term. */
  var LEXICON_DENY = /^(wealth|success|victory|achievement|abundance|earned|reward|prosperity|triumph|glory|luck|fortune|gain|win|journey|destiny|blessing|harmony)$/i;

  var PATH_WORD = { "1":"a One","2":"a Two","3":"a Three","4":"a Four","5":"a Five",
    "6":"a Six","7":"a Seven","8":"an Eight","9":"a Nine","11":"an Eleven",
    "22":"a Twenty-Two","33":"a Thirty-Three" };

  /* The threaded word is read three times ("one {LEXICON}", "{LEXICON}. Third
     entry and last"), so it must be a noun that survives that frame. Taking
     the first token of a multi-word keyword produced "one new" from "new
     energy" — so prefer genuine single-word keywords, and only then fall back
     to the head noun of a phrase. */
  function lexiconFrom(rune, trigram) {
    var pool = (rune && rune.keywords || []).concat(trigram && trigram.keywords || []);
    var i, w;
    for (i = 0; i < pool.length; i++) {          /* pass 1: clean single words */
      w = String(pool[i]).toLowerCase().trim();
      if (/^[a-z-]+$/.test(w) && !LEXICON_DENY.test(w)) return w;
    }
    for (i = 0; i < pool.length; i++) {          /* pass 2: head noun of a phrase */
      var parts = String(pool[i]).toLowerCase().trim().split(/[\s\/]+/);
      w = parts[parts.length - 1];               /* "new energy" -> "energy" */
      if (w && !LEXICON_DENY.test(w)) return w;
    }
    return "record";
  }

  function trigramShort(name) {
    var m = /([A-Za-zÀ-ɏ]{2,})/.exec(String(name || "").replace(/[^\p{L} ·]/gu, " "));
    return m ? m[1] : String(name || "");
  }

  function get(slot, key) {
    var b = BANK[slot] || {};
    if (b[key]) return b[key];
    var want = String(key || "").toLowerCase().replace(/^the\s+/, "").trim();
    for (var k in b) {
      var have = k.toLowerCase().replace(/^the\s+/, "").trim();
      if (have === want || have.indexOf(want) === 0 || want.indexOf(have) === 0) return b[k];
    }
    return null;
  }

  window.BRArcanaCopy = { BANK: BANK, get: get, PATH_WORD: PATH_WORD,
    lexiconFrom: lexiconFrom, trigramShort: trigramShort, LEXICON_DENY: LEXICON_DENY };
})();
