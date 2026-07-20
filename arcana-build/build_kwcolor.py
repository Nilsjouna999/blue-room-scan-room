# -*- coding: utf-8 -*-
# Authored keyword->colour lexicon. ~14 muted semantic families (dusty jewel tones
# that read on near-black and cohere as one considered palette, NOT a rainbow).
# Each perk gets a fitting colour via its family. This is BANK DATA — chosen,
# stored, rendered directly. No runtime AI.
import json, os
BASE = os.path.dirname(os.path.abspath(__file__))  # arcana-build/

# family: (colour, seed stems). First match wins; more specific families first.
FAMILIES = [
  ("intuition", "#9a86bd", ["intuit","instinct","psychic","subconscious","dream","imagin","visionary","mystic","inner","clairvoy","prophe","sixth"]),
  ("wisdom",    "#a9a06a", ["wise","wisdom","clarity","clear","insight","understand","knowledge","discern","sage","learned","percept","aware","truth","reason","judicious","philosoph","contempl","reflect","depth","profound"]),
  ("secrecy",   "#7f88b6", ["secret","hidden","mysteri","private","veil","silen","enigma","unseen","conceal","reserved","withdraw","reclus","introspect","shadow","occult"]),
  ("elegance",  "#c691a0", ["elegant","elegance","graceful","grace","refined","refinement","beaut","charm","poise","poised","sensual","aesthetic","tasteful","sophisticat","glamour","alluring","dignif"]),
  ("strategy",  "#6f9bc0", ["strateg","clever","calculat","cunning","analytic","logic","wit","resourceful","shrewd","sharp","ingen","invent","intelligen","tactic","planning","method","precис","precise","astute","canny"]),
  ("guard",     "#8f9068", ["suspic","wary","guard","cautio","defensive","skeptic","watchful","vigilan","distrust","protective","careful","prudent","reticent"]),
  ("calm",      "#67a89b", ["calm","peace","stillness","still","serene","tranquil","quiet","restful","compos","gentle","soothing","patien","mellow","placid","even"]),
  ("emotion",   "#6fa4b0", ["emotion","feeling","sensitiv","nurtur","nourish","compassion","empath","tender","caring","care","receptive","devot","affection","warm-heart","kind","gentle-heart","sympath","maternal","protective-love"]),
  ("growth",    "#83a266", ["growth","grow","nature","natural","fertil","abundan","harvest","bloom","flourish","vital","healing","renewal","prosper","regener","cultivat","blossom","fruitful","generativ"]),
  ("endurance", "#a89a82", ["endur","strength","strong","stable","stability","steady","reliab","ground","solid","durable","disciplin","persever","persist","dependab","steadfast","resilien","tenac","firm","constan","sturdy","robust"]),
  ("change",    "#95a4ad", ["change","transform","movement","move","restless","adapt","flux","dynamic","versatil","flexible","shift","mutable","journey","travel","wander","migrat","evolv","fluid","transition"]),
  ("power",     "#8a7ba0", ["power","author","command","dominan","control","sovereign","leader","will","initiativ","drive","assertive","ambit","force","reign","rule","mastery","potent","commanding","strong-will"]),
  ("passion",   "#bd7377", ["passion","desire","intense","intensity","magnetic","seductive","fierce","ardent","fiery","fervent","zeal","hunger","craving","erotic","yearning"]),
  ("courage",   "#c58a5a", ["courage","brave","bold","nerve","fearless","daring","valor","valiant","hero","gallant","undaunted","audac","intrepid"]),
  ("joy",       "#d29a72", ["joy","joyful","warmth","radiant","generos","generous","playful","play","optimis","light","cheer","humor","humour","lively","exuberan","enthusias","delight","merry","buoyant","sunny","spirited"]),
  ("freedom",   "#8fb0c0", ["freedom","free","liberty","independen","open","expansiv","boundless","spontan","unbound","autonom","untamed","liberat"]),
  ("order",     "#909aa8", ["order","structure","restraint","boundar","form","precision","balance","harmony","justice","fairness","equilibr","measure","proportion","symmetr","organ","systematic","diplomat","cooperat","partnership"]),
  ("creativity","#b98fb0", ["creativ","creation","art","artistic","express","original","imaginative-make","muse","craft","design","invention-art","poetic","aesthetic-make"]),
  ("ambition",  "#b08a5e", ["ambit","success","achiev","determin","goal","striv","aspir","enterpris","industri","diligen","hardwork","hard-work","productive","effort"]),
]
DEFAULT = "#9c9790"

# high-frequency trait words assigned explicitly (checked first) so the common
# vocabulary on the identity pages is fully coloured
C = dict((n, col) for n, col, _ in FAMILIES)
EXTRA = {
  "confiden":C["power"],"proud":C["power"],"dominant":C["power"],"assertive":C["power"],"determin":C["ambition"],
  "direct":C["courage"],"blunt":C["courage"],"impulsive":C["change"],"competit":C["ambition"],"aggressive":C["passion"],
  "dramatic":C["joy"],"charismatic":C["joy"],"sociable":C["joy"],"popular":C["joy"],"entertaining":C["joy"],"theatrical":C["joy"],
  "loyal":C["emotion"],"honest":C["order"],"faithful":C["emotion"],"sincere":C["emotion"],"sentimental":C["emotion"],"moody":C["emotion"],"impressionab":C["emotion"],
  "practical":C["order"],"diplomat":C["order"],"fair":C["order"],"balanc":C["order"],"organi":C["order"],"methodic":C["order"],"responsib":C["order"],"dutiful":C["order"],"traditional":C["order"],"conservativ":C["order"],"principled":C["order"],"conscientious":C["order"],
  "curious":C["strategy"],"critical":C["strategy"],"observ":C["strategy"],"studious":C["strategy"],"scholar":C["strategy"],"communicat":C["strategy"],"articulate":C["strategy"],"eloquen":C["strategy"],"perfection":C["strategy"],"meticulous":C["strategy"],
  "spontan":C["freedom"],"unpredictab":C["change"],"eccentric":C["freedom"],"rebell":C["freedom"],"adventur":C["freedom"],"unconvention":C["freedom"],"nonconform":C["freedom"],"detach":C["freedom"],"aloof":C["freedom"],
  "jealous":C["guard"],"possessiv":C["guard"],"vindict":C["guard"],"brooding":C["secrecy"],"resentful":C["guard"],"controlling":C["power"],
  "idealist":C["wisdom"],"humanitar":C["wisdom"],"philosoph":C["wisdom"],"ethical":C["wisdom"],"moral":C["wisdom"],"spiritual":C["intuition"],
  "stubborn":C["endurance"],"rigid":C["endurance"],"cautious":C["guard"],"reserved":C["secrecy"],"reticent":C["secrecy"],
  "energetic":C["joy"],"lively":C["joy"],"restless":C["change"],"timing":C["change"],"inspir":C["intuition"],"visionary":C["intuition"],
  "sensual":C["elegance"],"materialist":C["endurance"],"status":C["ambition"],"hardwork":C["ambition"],"industri":C["ambition"],"enterpris":C["ambition"],"diligen":C["ambition"],"productiv":C["ambition"],
  "protective":C["emotion"],"maternal":C["emotion"],"warm":C["joy"],"kind":C["emotion"],"helpful":C["emotion"],"sacrific":C["emotion"],
  "healing":C["growth"],"escap":C["intuition"],"dreamy":C["intuition"],"artistic":C["creativity"],"poetic":C["creativity"],
  "analys":C["strategy"],"anxious":C["guard"],"worry":C["guard"],"fear":C["guard"],"charisma":C["joy"],"completion":C["wisdom"],
  "conflict":C["calm"],"diplomac":C["order"],"domineer":C["power"],"dynamis":C["change"],"easygoing":C["calm"],"expansi":C["freedom"],
  "family":C["emotion"],"flexib":C["change"],"guidance":C["wisdom"],"harmoni":C["order"],"home":C["emotion"],"idealis":C["wisdom"],
  "illumin":C["wisdom"],"indecis":C["change"],"individ":C["freedom"],"indulg":C["passion"],"initiat":C["power"],"innovat":C["creativity"],
  "just":C["order"],"vision":C["wisdom"],"letting":C["calm"],"love":C["emotion"],"manifest":C["power"],"builder":C["ambition"],
  "teacher":C["wisdom"],"mischiev":C["change"],"modest":C["calm"],"opportun":C["strategy"],"pioneer":C["courage"],"pragmat":C["order"],
  "secre":C["secrecy"],"selfless":C["emotion"],"service":C["emotion"],"social":C["joy"],"solitud":C["secrecy"],"vain":C["power"],
  "volatil":C["passion"],"naive":C["growth"],"innocen":C["growth"],"gentle":C["calm"],"quiet":C["calm"],"withdraw":C["secrecy"],
}

def famcolor(kw):
    k = kw.lower().strip()
    for s, col in EXTRA.items():
        if s in k:
            return col
    for name, col, seeds in FAMILIES:
        for s in seeds:
            if s in k:
                return col
    return DEFAULT

d = json.load(open(os.path.join(os.path.dirname(BASE), 'codex-data.json'), encoding='utf-8'))
kws = set()
for sysd in d:
    for e in sysd.get('entries', []):
        for k in (e.get('keywords') or []):
            kws.add(str(k).strip())
mapping = {}
colored = 0
for k in kws:
    c = famcolor(k)
    mapping[k.lower()] = c
    if c != DEFAULT: colored += 1
open(os.path.join(BASE, 'kwcolor.json'), 'w', encoding='utf-8').write(json.dumps(mapping, ensure_ascii=True, separators=(',', ':')))
print("keywords:", len(kws), "| coloured:", colored, "(", round(colored/len(kws)*100), "% ) | default-grey:", len(kws)-colored)
# show the user's example (Snake keywords)
for w in ["intuitive","wise","secretive","elegant","strategic","suspicious"]:
    print("  ", w, "->", famcolor(w))
