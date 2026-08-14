#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate and verify real reading fixtures for the scroll demo."""

import json
import os
import sys

# Ensure UTF-8 output
if sys.stdout.encoding != 'utf-8':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Load data
BASE = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(BASE, 'codex-data.json'), encoding='utf-8') as f:
    codex_raw = json.load(f)

with open(os.path.join(BASE, 'arcana-build', 'practical.json'), encoding='utf-8') as f:
    practical_data = json.load(f)

# Flatten codex into systems
by = {}
for section in codex_raw:
    system = section.get('system', '').lower()
    entries = section.get('entries', [])

    # Map systems to slots (from arcana-reading.js lines 49-52)
    if 'western' in system or 'sun sign' in system:
        by['sun'] = entries
    elif 'chinese' in system:
        # Filter for fixed element (line 53)
        filtered = [e for e in entries if 'fixed element:' in str(e.get('tag', '')).lower()]
        if filtered:
            by['chinese'] = filtered
        else:
            by['chinese'] = entries
    elif 'numerolog' in system:
        by['lifePath'] = entries
    elif 'tarot' in system and 'major' in system:
        by['tarotMajor'] = entries
    elif 'rune' in system or 'futhark' in system:
        by['rune'] = entries
    elif 'trigram' in system:
        by['trigram'] = entries
    elif 'ching' in system:
        by['hexagram'] = entries

# Implement the corrected hash function (Math.imul)
def hash_fn(s):
    """FNV-1a hash with Math.imul correction for low-bit accuracy."""
    h = 2166136261
    for c in s:
        h ^= ord(c)
        h = (h * 16777619) & 0xFFFFFFFF  # Math.imul effect: keep to 32-bit
    return h & 0xFFFFFFFF

def pick(lst, seed):
    """Pick an entry from list using seed."""
    if not lst:
        return None
    idx = hash_fn(seed) % len(lst)
    return lst[idx]

def deac(s):
    """Remove accents from string."""
    import unicodedata
    s = str(s)
    nfd = unicodedata.normalize('NFD', s)
    return ''.join(c for c in nfd if unicodedata.category(c) != 'Mn')

def norm(s):
    """Normalize for lookup."""
    s = deac(s).lower()
    s = s.replace('the ', '', 1)  # Remove leading 'the'
    s = ''.join(c if c.isalnum() or c == ' ' else '' for c in s)  # Keep alphanumeric + space
    return s.strip()

# Birth reading derivation functions
ZOD = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
        "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]
ANI = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake",
       "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"]
MON = ["January", "February", "March", "April", "May", "June",
       "July", "August", "September", "October", "November", "December"]

def sun_sign(m, d):
    """Get sun sign for month/day."""
    bounds = [
        (1, 20, "Aquarius"), (2, 19, "Pisces"), (3, 21, "Aries"),
        (4, 20, "Taurus"), (5, 21, "Gemini"), (6, 21, "Cancer"),
        (7, 23, "Leo"), (8, 23, "Virgo"), (9, 23, "Libra"),
        (10, 23, "Scorpio"), (11, 22, "Sagittarius"), (12, 22, "Capricorn")
    ]

    if m < 1 or m > 12:
        return None

    cur = bounds[m - 1]
    if d >= cur[1]:
        return cur[2]
    return bounds[(m + 10) % 12][2]

def chinese_animal(y):
    """Get Chinese zodiac animal for year."""
    return ANI[((y - 4) % 12 + 12) % 12]

def reduce_num(n):
    """Reduce a number using numerology rules."""
    while n > 9 and n not in (11, 22, 33):
        n = sum(int(c) for c in str(n))
    return n

def life_path_num(y, m, d):
    """Compute life path number from birth date."""
    s = f"{y:04d}{m:02d}{d:02d}"
    total = sum(int(c) for c in s)
    return reduce_num(total)

def find_by_name(lst, name):
    """Find entry by exact name."""
    for entry in lst:
        if entry.get('name') == name:
            return entry
    return None

def birth_reading(name, y, m, d):
    """Generate a birth reading."""
    seed = f"birth~{name}~{y}~{m}~{d}"

    # Get sun sign (birth-derived)
    sun_entry = find_by_name(by['sun'], sun_sign(m, d))

    # Get Chinese animal (birth-derived)
    chinese_entry = find_by_name(by['chinese'], chinese_animal(y))

    # Get life path (birth-derived)
    lp_num = life_path_num(y, m, d)
    life_entry = find_by_name(by['lifePath'], str(lp_num))

    # Get other three (seed-derived, not birth-derived)
    rune_entry = pick(by['rune'], seed + "f")
    trigram_entry = pick(by['trigram'], seed + "g")
    hex_entry = pick(by['hexagram'], seed + "h")

    return {
        'seed': seed,
        'person': {
            'name': name,
            'born': f"{d} {MON[m-1]} {y}"
        },
        'marks': {
            'sun': sun_entry,
            'chinese': chinese_entry,
            'life': life_entry,
            'rune': rune_entry,
            'trigram': trigram_entry,
            'hexagram': hex_entry
        }
    }

# Now define 3 candidate fixtures
candidates = [
    ("Margaret", 1988, 4, 15),  # Taurus, Dragon, LP 5
    ("James", 2001, 9, 23),     # Virgo/Libra?, Snake, LP 6
    ("Iris", 1975, 11, 28),     # Sagittarius, Rabbit, LP 4
]

results = []
for name, year, month, day in candidates:
    reading = birth_reading(name, year, month, day)

    marks = reading['marks']

    # Check for cost traits (from practical.json)
    has_cost = False
    cost_traits = []
    for key, entry in marks.items():
        if entry and 'name' in entry:
            ename = entry['name']
            if key in practical_data and ename in practical_data[key]:
                pdata = practical_data[key][ename]
                if 'd' in pdata:  # shadow/cost traits
                    cost_traits.extend(pdata['d'])
                    has_cost = True

    # Check visual variety
    names = [m['name'] for m in marks.values() if m]
    name_lengths = [len(n) for n in names]
    varied = len(set(name_lengths)) > 2

    results.append({
        'name': name,
        'date': (year, month, day),
        'reading': reading,
        'marks': marks,
        'variety': varied,
        'has_cost': has_cost,
        'cost_sample': cost_traits[:2] if cost_traits else None,
        'name_lengths': name_lengths
    })

# Write results to file
output_lines = []
output_lines.append("="*80)
output_lines.append("FIXTURE GENERATION RESULTS")
output_lines.append("="*80)

for i, r in enumerate(results, 1):
    date = r['date']
    marks = r['marks']

    output_lines.append(f"\nCandidicate {i}: {r['name']} - {date[2]} {MON[date[1]-1]} {date[0]}")
    output_lines.append("-" * 80)
    output_lines.append(f"Seed: {r['reading']['seed']}")
    output_lines.append("\nThe six marks:")
    output_lines.append(f"  1. Sun sign:      {marks['sun']['name'] if marks['sun'] else 'N/A'}")
    output_lines.append(f"  2. Year animal:   {marks['chinese']['name'] if marks['chinese'] else 'N/A'}")
    output_lines.append(f"  3. Life path:     {marks['life']['name'] if marks['life'] else 'N/A'}")
    output_lines.append(f"  4. Rune:          {marks['rune']['name'] if marks['rune'] else 'N/A'}")
    output_lines.append(f"  5. Trigram:       {marks['trigram']['name'] if marks['trigram'] else 'N/A'} [tag: {marks['trigram']['tag'] if marks['trigram'] else 'N/A'}]")
    output_lines.append(f"  6. Hexagram:      {marks['hexagram']['name'] if marks['hexagram'] else 'N/A'}")

    output_lines.append(f"\nVisual variety:")
    output_lines.append(f"  Name lengths: {r['name_lengths']}")
    output_lines.append(f"  Unique lengths: {len(set(r['name_lengths']))}")
    output_lines.append(f"  Varied: {r['variety']}")

    output_lines.append(f"\nCost traits:")
    if r['cost_sample']:
        output_lines.append(f"  Found: {r['cost_sample']}")
    output_lines.append(f"  Has cost: {r['has_cost']}")

# Find best candidate
best_idx = None
for i, r in enumerate(results):
    if r['variety'] and r['has_cost']:
        best_idx = i
        break

if best_idx is None:
    for i, r in enumerate(results):
        if r['variety']:
            best_idx = i
            break

if best_idx is not None:
    output_lines.append("\n" + "="*80)
    output_lines.append(f"RECOMMENDED: Candidate {best_idx + 1}")
    output_lines.append("="*80)
    best = results[best_idx]
    date = best['date']
    output_lines.append(f"Name: {best['name']}")
    output_lines.append(f"Date: {date[2]} {MON[date[1]-1]} {date[0]}")
    output_lines.append(f"Seed: {best['reading']['seed']}")
    output_lines.append(f"Visual variety: {best['variety']}")
    output_lines.append(f"Has cost traits: {best['has_cost']}")

output_text = '\n'.join(output_lines)
print(output_text)

# Also save to file for viewing
with open('fixtures_report.txt', 'w', encoding='utf-8') as f:
    f.write(output_text)

print("\nReport saved to fixtures_report.txt")
