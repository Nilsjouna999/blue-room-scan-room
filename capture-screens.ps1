# Blue Room — screenshot pipeline for visual review (ChatGPT etc.)
# Captures key UI states as PNGs into docs/screens/ using headless Edge.
# Requires the dev server running on http://localhost:8743
# Usage:  powershell -ExecutionPolicy Bypass -File capture-screens.ps1

$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edge)) { $edge = "C:\Program Files\Microsoft\Edge\Application\msedge.exe" }
$base = "http://localhost:8743/"
$out = Join-Path $PSScriptRoot "docs\screens"
New-Item -ItemType Directory -Force $out | Out-Null

# name, query, window size (hero = 1600x900; dossier shots are tall pages)
$shots = @(
    @{ n = "src1-free-hero";     q = "?src=1&t=free";              s = "1600,900"  },
    @{ n = "src1-halo-hero";     q = "?src=1&t=shiny";             s = "1600,900"  },
    @{ n = "src2-free-hero";     q = "?src=2&t=free";              s = "1600,900"  },
    @{ n = "src2-halo-hero";     q = "?src=2&t=shiny";             s = "1600,900"  },
    @{ n = "src1-halo-diagram";  q = "?src=1&t=shiny&tab=diagram"; s = "1600,900"  },
    @{ n = "src2-halo-diagram";  q = "?src=2&t=shiny&tab=diagram"; s = "1600,900"  },
    @{ n = "src1-halo-metrics";  q = "?src=1&t=shiny&tab=metrics"; s = "1600,900"  },
    @{ n = "src1-free-fullpage"; q = "?src=1&t=free";              s = "1600,3200" },
    @{ n = "src1-halo-fullpage"; q = "?src=1&t=shiny";             s = "1600,3200" },
    @{ n = "src2-halo-fullpage"; q = "?src=2&t=shiny";             s = "1600,3200" }
)

foreach ($shot in $shots) {
    $file = Join-Path $out "$($shot.n).png"
    & $edge --headless --disable-gpu --hide-scrollbars `
        --window-size=$($shot.s) --screenshot="$file" `
        --virtual-time-budget=4000 "$base$($shot.q)" 2>$null | Out-Null
    if (Test-Path $file) { Write-Host "ok  $($shot.n)" } else { Write-Host "FAIL $($shot.n)" }
}
Write-Host "Done -> docs/screens/ (commit + push so reviewers see them)"
