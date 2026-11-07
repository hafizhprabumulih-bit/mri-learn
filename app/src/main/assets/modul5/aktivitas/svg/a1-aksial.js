/* SVG untuk a1-aksial. Edit gambar di sini. Jangan memakai tanda backtick di dalamnya. */
const SVG_A1_AKSIAL = `<svg id="mri-diagram-aksial" class="m5-diag m5-axial" viewBox="0 0 800 560" preserveAspectRatio="xMidYMid meet" role="group" aria-label="Potongan aksial pesawat MRI: lima lapisan konsentris yang dapat dipilih, dari ruang berpelindung RF di luar sampai bore dan meja pasien di tengah.">
<defs>    <linearGradient id="ax-g-violet" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7c4dff"/><stop offset="1" stop-color="#4a2bb0"/></linearGradient>
    <linearGradient id="ax-g-cobalt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3f7bff"/><stop offset="1" stop-color="#1d46b8"/></linearGradient>
    <linearGradient id="ax-g-gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd35c"/><stop offset="1" stop-color="#e09a12"/></linearGradient>
    <linearGradient id="ax-g-metal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dfe5ee"/><stop offset=".55" stop-color="#9aa6b6"/><stop offset="1" stop-color="#6f7b8d"/></linearGradient>
    <linearGradient id="ax-g-patient" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d3dcea"/><stop offset="1" stop-color="#93a3bb"/></linearGradient>
    <linearGradient id="ax-g-lumen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#091221"/><stop offset=".5" stop-color="#101f3a"/><stop offset="1" stop-color="#091221"/></linearGradient>
    <pattern id="ax-p-shield" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M0 0L10 10M10 0L0 10" stroke="#e4dbff" stroke-opacity=".38" stroke-width="1"/></pattern>
    <pattern id="ax-p-lhe" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#5c8cff" fill-opacity=".38"/><circle cx="2" cy="2" r="1" fill="#e2ecff"/><circle cx="6" cy="6" r="1" fill="#e2ecff"/></pattern>
    <pattern id="ax-p-gx" width="6" height="10" patternUnits="userSpaceOnUse"><rect width="6" height="10" fill="#13a898"/><path d="M0 0V10" stroke="#a8fff3" stroke-width="1.2"/></pattern>
    <pattern id="ax-p-gy" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="#0f8f83"/><path d="M0 0H8" stroke="#a8fff3" stroke-width="1.2"/></pattern>
    <pattern id="ax-p-gz" width="7" height="7" patternUnits="userSpaceOnUse"><rect width="7" height="7" fill="#0a746b"/><path d="M0 0H7M0 0V7" stroke="#a8fff3" stroke-width="1" stroke-opacity=".8"/></pattern>
    <pattern id="ax-p-rung" width="14" height="18" patternUnits="userSpaceOnUse"><path d="M7 3V15" stroke="#6b4300" stroke-width="2.4" stroke-linecap="round"/></pattern>
    <filter id="ax-glow-shield" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB"><feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#a98bff" flood-opacity=".95"/></filter>
    <filter id="ax-glow-magnet" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB"><feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#5b8cff" flood-opacity=".95"/></filter>
    <filter id="ax-glow-gradient" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB"><feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#2de0c9" flood-opacity=".95"/></filter>
    <filter id="ax-glow-rf" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB"><feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#ffc93d" flood-opacity=".95"/></filter>
    <filter id="ax-glow-bore" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB"><feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#cfd9e8" flood-opacity=".95"/></filter></defs>
<g id="mri-ax-rf-shield" class="m5-p m5-shield" data-m5-i="0" tabindex="0" role="button" aria-pressed="false" aria-label="Potongan aksial: ruang berpelindung RF, tampak sebagai kotak yang mengelilingi pesawat. Tekan Enter untuk melihat detail.">
<rect x="36" y="36" width="728" height="488" fill="#8b5cf6" fill-opacity=".06"/>
<path d="M20 36Q20 20 36 20H764Q780 20 780 36V524Q780 540 764 540H36Q20 540 20 524Z M36 36H764V524H36Z" fill-rule="evenodd" fill="url(#ax-g-violet)"/>
<path d="M20 36Q20 20 36 20H764Q780 20 780 36V524Q780 540 764 540H36Q20 540 20 524Z M36 36H764V524H36Z" fill-rule="evenodd" fill="url(#ax-p-shield)"/>
<rect x="36" y="36" width="728" height="488" fill="none" stroke="#e4dbff" stroke-opacity=".55" stroke-dasharray="2 5"/>
<rect x="100" y="522" width="96" height="18" rx="3" fill="#3a1f8f" stroke="#e4dbff"/><circle cx="184" cy="531" r="2.6" fill="#e4dbff"/>
<text class="m5-note" x="140" y="535" text-anchor="middle" style="fill:#fff">pintu</text>
<rect x="712" y="450" width="44" height="48" rx="4" fill="#5b36c9" stroke="#c2adff"/>
<g fill="#1a0f45" stroke="#e4dbff"><circle cx="734" cy="464" r="4.5"/><circle cx="734" cy="475" r="4.5"/><circle cx="734" cy="486" r="4.5"/></g>
<text class="m5-note" x="756" y="514" text-anchor="end">panel penetrasi</text>
<g class="m5-badge"><circle cx="64" cy="64" r="11"/><text x="64" y="64">1</text></g>
<path class="m5-sel" fill-rule="evenodd" d="M20 36Q20 20 36 20H764Q780 20 780 36V524Q780 540 764 540H36Q20 540 20 524Z M36 36H764V524H36Z"/>
</g>
<g id="mri-ax-main-magnet" class="m5-p m5-magnet" data-m5-i="1" tabindex="0" role="button" aria-pressed="false" aria-label="Potongan aksial: magnet utama, tampak sebagai cincin terluar pesawat. Tekan Enter untuk melihat detail.">
<rect x="276" y="450" width="64" height="70" rx="4" fill="#1b3f9e" stroke="#7da3ff"/>
<rect x="460" y="450" width="64" height="70" rx="4" fill="#1b3f9e" stroke="#7da3ff"/>
<circle cx="400" cy="280" r="218" fill="url(#ax-g-cobalt)" stroke="#9db9ff" stroke-width="1.2"/>
<circle cx="400" cy="280" r="210" fill="#0e2a78" stroke="#7da3ff"/>
<circle cx="400" cy="280" r="204" fill="none" stroke="#a9c2ff" stroke-dasharray="5 3"/>
<circle cx="400" cy="280" r="198" fill="url(#ax-p-lhe)" stroke="#c4d7ff"/>
<circle cx="400" cy="280" r="182" fill="url(#ax-g-cobalt)" stroke="#9db9ff"/>
<g class="m5-badge"><circle cx="259.3" cy="139.3" r="11"/><text x="259.3" y="139.3">2</text></g>
<circle class="m5-sel" cx="400" cy="280" r="218"/><circle class="m5-sel" cx="400" cy="280" r="180"/>
</g>
<g id="mri-ax-gradient-coil" class="m5-p m5-gradient" data-m5-i="2" tabindex="0" role="button" aria-pressed="false" aria-label="Potongan aksial: gradient coil sumbu X, Y, dan Z, tampak sebagai cincin kedua. Tekan Enter untuk melihat detail.">
<circle cx="400" cy="280" r="163" fill="none" stroke="url(#ax-p-gz)" stroke-width="34"/>
<circle cx="400" cy="280" r="180" fill="none" stroke="#7ff5e3" stroke-width="1.2"/>
<circle cx="400" cy="280" r="146" fill="none" stroke="#7ff5e3" stroke-width="1.2"/>
<path d="M248.9 218.9A163 163 0 0 0 248.9 341.1" fill="none" stroke="#063f3a" stroke-width="28"/><path d="M248.9 218.9A163 163 0 0 0 248.9 341.1" fill="none" stroke="url(#ax-p-gx)" stroke-width="24"/><path d="M551.1 341.1A163 163 0 0 0 551.1 218.9" fill="none" stroke="#063f3a" stroke-width="28"/><path d="M551.1 341.1A163 163 0 0 0 551.1 218.9" fill="none" stroke="url(#ax-p-gx)" stroke-width="24"/><path d="M461.1 128.9A163 163 0 0 0 338.9 128.9" fill="none" stroke="#063f3a" stroke-width="28"/><path d="M461.1 128.9A163 163 0 0 0 338.9 128.9" fill="none" stroke="url(#ax-p-gy)" stroke-width="24"/><path d="M338.9 431.1A163 163 0 0 0 461.1 431.1" fill="none" stroke="#063f3a" stroke-width="28"/><path d="M338.9 431.1A163 163 0 0 0 461.1 431.1" fill="none" stroke="url(#ax-p-gy)" stroke-width="24"/>
<text class="m5-axis" x="237.0" y="280.0">X</text><text class="m5-axis" x="563.0" y="280.0">X</text><text class="m5-axis" x="400.0" y="117.0">Y</text><text class="m5-axis" x="400.0" y="443.0">Y</text><text class="m5-axis" x="515.3" y="395.3">Z</text>
<g class="m5-badge"><circle cx="284.7" cy="164.7" r="11"/><text x="284.7" y="164.7">3</text></g>
<circle class="m5-sel" cx="400" cy="280" r="180"/><circle class="m5-sel" cx="400" cy="280" r="146"/>
</g>
<g id="mri-ax-rf-coil" class="m5-p m5-rf" data-m5-i="3" tabindex="0" role="button" aria-pressed="false" aria-label="Potongan aksial: RF coil, tampak sebagai cincin tipis dengan batang-batang konduktor. Tekan Enter untuk melihat detail.">
<circle cx="400" cy="280" r="146" fill="url(#ax-g-gold)" stroke="#ffe5a1" stroke-width="1.2"/>
<circle cx="400" cy="280" r="120" fill="none" stroke="#b97a00"/>
<circle cx="530.4" cy="254.1" r="3.4" fill="#6b4300"/><circle cx="510.6" cy="206.1" r="3.4" fill="#6b4300"/><circle cx="473.9" cy="169.4" r="3.4" fill="#6b4300"/><circle cx="425.9" cy="149.6" r="3.4" fill="#6b4300"/><circle cx="374.1" cy="149.6" r="3.4" fill="#6b4300"/><circle cx="326.1" cy="169.4" r="3.4" fill="#6b4300"/><circle cx="289.4" cy="206.1" r="3.4" fill="#6b4300"/><circle cx="269.6" cy="254.1" r="3.4" fill="#6b4300"/><circle cx="269.6" cy="305.9" r="3.4" fill="#6b4300"/><circle cx="289.4" cy="353.9" r="3.4" fill="#6b4300"/><circle cx="326.1" cy="390.6" r="3.4" fill="#6b4300"/><circle cx="374.1" cy="410.4" r="3.4" fill="#6b4300"/><circle cx="425.9" cy="410.4" r="3.4" fill="#6b4300"/><circle cx="473.9" cy="390.6" r="3.4" fill="#6b4300"/><circle cx="510.6" cy="353.9" r="3.4" fill="#6b4300"/><circle cx="530.4" cy="305.9" r="3.4" fill="#6b4300"/>
<g class="m5-badge"><circle cx="306.0" cy="186.0" r="11"/><text x="306.0" y="186.0">4</text></g>
<circle class="m5-sel" cx="400" cy="280" r="146"/><circle class="m5-sel" cx="400" cy="280" r="120"/>
</g>
<g id="mri-ax-bore-table" class="m5-p m5-bore" data-m5-i="4" tabindex="0" role="button" aria-pressed="false" aria-label="Potongan aksial: bore dan meja pasien dengan pasien terlentang, tampak sebagai lingkaran di pusat. Tekan Enter untuk melihat detail.">
<circle cx="400" cy="280" r="120" fill="url(#ax-g-lumen)" stroke="#3a5a8c"/>
<rect x="320" y="332" width="160" height="12" rx="6" fill="url(#ax-g-metal)" stroke="#eef2f8"/>
<g fill="url(#ax-g-patient)" stroke="#f1f5fb" stroke-width="1.2">
<ellipse cx="400" cy="288" rx="58" ry="42"/>
<ellipse cx="334" cy="310" rx="14" ry="17"/><ellipse cx="466" cy="310" rx="14" ry="17"/>
</g>
<g fill="#8294ae" fill-opacity=".75" stroke="none">
<ellipse cx="378" cy="282" rx="17" ry="24"/><ellipse cx="422" cy="282" rx="17" ry="24"/>
<circle cx="400" cy="314" r="7"/>
</g>
<g stroke="#0b1424" stroke-width="1.3" stroke-dasharray="3 3" fill="none"><line x1="400" y1="264" x2="400" y2="296"/><line x1="384" y1="280" x2="416" y2="280"/><circle cx="400" cy="280" r="5" stroke-dasharray="none"/></g>
<text class="m5-note" x="400" y="238" text-anchor="middle">isosenter</text>
<g stroke="#8fb0ff" stroke-width="1.6" fill="none"><circle cx="456" cy="204" r="9"/><path d="M450 198L462 210M462 198L450 210"/></g>
<text class="m5-or" x="470" y="209">B0</text>
<text class="m5-or" x="400" y="180" text-anchor="middle">A</text>
<text class="m5-or" x="400" y="388" text-anchor="middle">P</text>
<text class="m5-or" x="296" y="285" text-anchor="middle">Ka</text>
<text class="m5-or" x="504" y="285" text-anchor="middle">Ki</text>
<g class="m5-badge"><circle cx="336.4" cy="216.4" r="11"/><text x="336.4" y="216.4">5</text></g>
<circle class="m5-sel" cx="400" cy="280" r="120"/>
<rect class="m5-sel" x="320" y="332" width="160" height="12" rx="6"/>
</g>
<g aria-hidden="true">
<g class="m5-leg" data-m5-i="0" style="--lc:#8b5cf6"><circle cx="642" cy="130" r="11"/><text class="n" x="642" y="130">1</text><text class="t" x="662" y="130">Pelindung RF</text></g>
<g class="m5-leg" data-m5-i="1" style="--lc:#2f6bff"><circle cx="642" cy="178" r="11"/><text class="n" x="642" y="178">2</text><text class="t" x="662" y="178">Magnet utama</text></g>
<g class="m5-leg" data-m5-i="2" style="--lc:#12b8a6"><circle cx="642" cy="226" r="11"/><text class="n" x="642" y="226">3</text><text class="t" x="662" y="226">Gradient coil</text></g>
<g class="m5-leg" data-m5-i="3" style="--lc:#f5b82e"><circle cx="642" cy="274" r="11"/><text class="n" x="642" y="274">4</text><text class="t" x="662" y="274">RF coil</text></g>
<g class="m5-leg" data-m5-i="4" style="--lc:#9aa6b6"><circle cx="642" cy="322" r="11"/><text class="n" x="642" y="322">5</text><text class="t" x="662" y="322">Bore + meja</text></g>
</g>
<g class="m5-note" pointer-events="none" aria-hidden="true">
<text x="48" y="440">Dilihat dari kaki ke</text><text x="48" y="454">kepala pasien.</text>
<text x="48" y="474">A anterior, P posterior</text><text x="48" y="488">Ka kanan, Ki kiri pasien</text>
</g>
</svg>`;
