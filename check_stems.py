import json
import re

# Load data
with open('arcana-build/build_kwcolor.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract FAMILIES and EXTRA from the Python file
# Parse FAMILIES
families_match = re.search(r'FAMILIES = \[(.*?)\]', content, re.DOTALL)
families_text = families_match.group(1) if families_match else ""

# Extract keyword -> colour mapping
with open('arcana-build/kwcolor.json', 'r', encoding='utf-8') as f:
    kwcolor = json.load(f)

# Define FAMILIES directly (easier than parsing Python)
FAMILIES = [
  ("intuition", "#9a86bd", ["intuit","instinct","psychic","subconscious","dream","imagin","visionary","mystic","inner","clairvoy","prophe","sixth"]),
  ("wisdom", "#a9a06a", ["wise","wisdom","clarity","clear","insight","understand","knowledge","discern","sage","learned","percept","aware","truth","reason","judicious","philosoph","contempl","reflect","depth","profound"]),
  ("secrecy", "#7f88b6", ["secret","hidden","mysteri","private","veil","silen","enigma","unseen","conceal","reserved","withdraw","reclus","introspect","shadow","occult"]),
  ("elegance", "#c691a0", ["elegant","elegance","graceful","grace","refined","refinement","beaut","charm","poise","poised","sensual","aesthetic","tasteful","sophisticat","glamour","alluring","dignif"]),
  ("strategy", "#6f9bc0", ["strateg","clever","calculat","cunning","analytic","logic","wit","resourceful","shrewd","sharp","ingen","invent","intelligen","tactic","planning","method","precís","precise","astute","canny"]),
  ("guard", "#8f9068", ["suspic","wary","guard","cautio","defensive","skeptic","watchful","vigilan","distrust","protective","careful","prudent","reticent"]),
  ("calm", "#67a89b", ["calm","peace","stillness","still","serene","tranquil","quiet","restful","compos","gentle","soothing","patien","mellow","placid","even"]),
  ("emotion", "#6fa4b0", ["emotion","feeling","sensitiv","nurtur","nourish","compassion","empath","tender","caring","care","receptive","devot","affection","warm-heart","kind","gentle-heart","sympath","maternal","protective-love"]),
  ("growth", "#83a266", ["growth","grow","nature","natural","fertil","abundan","harvest","bloom","flourish","vital","healing","renewal","prosper","regener","cultivat","blossom","fruitful","generativ"]),
  ("endurance", "#a89a82", ["endur","strength","strong","stable","stability","steady","reliab","ground","solid","durable","disciplin","persever","persist","dependab","steadfast","resilien","tenac","firm","constan","sturdy","robust"]),
  ("change", "#95a4ad", ["change","transform","movement","move","restless","adapt","flux","dynamic","versatil","flexible","shift","mutable","journey","travel","wander","migrat","evolv","fluid","transition"]),
  ("power", "#8a7ba0", ["power","author","command","dominan","control","sovereign","leader","will","initiativ","drive","assertive","ambit","force","reign","rule","mastery","potent","commanding","strong-will"]),
  ("passion", "#bd7377", ["passion","desire","intense","intensity","magnetic","seductive","fierce","ardent","fiery","fervent","zeal","hunger","craving","erotic","yearning"]),
  ("courage", "#c58a5a", ["courage","brave","bold","nerve","fearless","daring","valor","valiant","hero","gallant","undaunted","audac","intrepid"]),
  ("joy", "#d29a72", ["joy","joyful","warmth","radiant","generos","generous","playful","play","optimis","light","cheer","humor","humour","lively","exuberan","enthusias","delight","merry","buoyant","sunny","spirited"]),
  ("freedom", "#8fb0c0", ["freedom","free","liberty","independen","open","expansiv","boundless","spontan","unbound","autonom","untamed","liberat"]),
  ("order", "#909aa8", ["order","structure","restraint","boundar","form","precision","balance","harmony","justice","fairness","equilibr","measure","proportion","symmetr","organ","systematic","diplomat","cooperat","partnership"]),
  ("creativity", "#b98fb0", ["creativ","creation","art","artistic","express","original","imaginative-make","muse","craft","design","invention-art","poetic","aesthetic-make"]),
  ("ambition", "#b08a5e", ["ambit","success","achiev","determin","goal","striv","aspir","enterpris","industri","diligen","hardwork","hard-work","productive","effort"]),
]

# Significant EXTRA overrides that might cause issues
EXTRA_NOTABLE = {
  "confiden": "#8a7ba0",  # power
  "ambit": "#b08a5e",      # ambition (also in power family!)
  "protective": "#6fa4b0", # emotion (not guard!)
  "care": "#6fa4b0",       # emotion
  "intelligen": "#6f9bc0", # strategy
  "author": "#8a7ba0",     # power (also in power family)
}

# Find potential false positives
issues = []

# Check keywords that might have gotten wrong colour due to substring match
test_keywords = [
    ("careless", "should be neutral but contains 'care' from emotion"),
    ("protective custody", "contains 'protective' but might not be emotion"),
    ("uncareful", "contains 'care' from emotion"),
    ("caregiving", "contains 'care' from emotion"),
    ("author's", "contains 'author' from power but might not fit"),
    ("authoritative", "contains 'author' from power"),
    ("intelligent", "contains 'intelligen' from strategy"),
    ("authoritarian", "contains 'author' from power"),
]

print("Potential Stem False Positives:")
print("=" * 70)

for kw, note in test_keywords:
    kw_lower = kw.lower()
    assigned = kwcolor.get(kw_lower, "NOT IN DATABASE")
    
    # Trace which family would match
    matched_family = None
    matched_stem = None
    
    for name, colour, stems in FAMILIES:
        for stem in stems:
            if stem in kw_lower:
                matched_family = name
                matched_stem = stem
                break
        if matched_stem:
            break
    
    print(f"\n'{kw}'")
    print(f"  Assigned: {assigned}")
    if matched_stem:
        print(f"  Would match: stem '{matched_stem}' from {matched_family} → {kwcolor.get(kw_lower, 'unknown')}")
    print(f"  Context: {note}")

