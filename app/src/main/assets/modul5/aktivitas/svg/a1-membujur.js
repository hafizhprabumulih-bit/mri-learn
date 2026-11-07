/* SVG untuk a1-membujur. Edit gambar di sini. Jangan memakai tanda backtick di dalamnya. */
const SVG_A1_MEMBUJUR = `<svg id="mri-diagram" class="m5-diag m5-long" viewBox="0 0 900 560" preserveAspectRatio="xMidYMid meet" role="group" aria-label="Diagram penampang pesawat MRI. Lima komponen dapat dipilih: ruang berpelindung RF, magnet utama, gradient coil, RF coil, serta bore dan meja pasien.">
  <defs>
    <linearGradient id="lg-g-violet" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7c4dff"/><stop offset="1" stop-color="#4a2bb0"/></linearGradient>
    <linearGradient id="lg-g-cobalt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3f7bff"/><stop offset="1" stop-color="#1d46b8"/></linearGradient>
    <linearGradient id="lg-g-gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd35c"/><stop offset="1" stop-color="#e09a12"/></linearGradient>
    <linearGradient id="lg-g-metal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dfe5ee"/><stop offset=".55" stop-color="#9aa6b6"/><stop offset="1" stop-color="#6f7b8d"/></linearGradient>
    <linearGradient id="lg-g-patient" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d3dcea"/><stop offset="1" stop-color="#93a3bb"/></linearGradient>
    <linearGradient id="lg-g-lumen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#091221"/><stop offset=".5" stop-color="#101f3a"/><stop offset="1" stop-color="#091221"/></linearGradient>

    <pattern id="lg-p-shield" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M0 0L10 10M10 0L0 10" stroke="#e4dbff" stroke-opacity=".38" stroke-width="1"/></pattern>
    <pattern id="lg-p-lhe" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#5c8cff" fill-opacity=".38"/><circle cx="2" cy="2" r="1" fill="#e2ecff"/><circle cx="6" cy="6" r="1" fill="#e2ecff"/></pattern>
    <pattern id="lg-p-gx" width="6" height="10" patternUnits="userSpaceOnUse"><rect width="6" height="10" fill="#13a898"/><path d="M0 0V10" stroke="#a8fff3" stroke-width="1.2"/></pattern>
    <pattern id="lg-p-gy" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="#0f8f83"/><path d="M0 0H8" stroke="#a8fff3" stroke-width="1.2"/></pattern>
    <pattern id="lg-p-gz" width="7" height="7" patternUnits="userSpaceOnUse"><rect width="7" height="7" fill="#0a746b"/><path d="M0 0H7M0 0V7" stroke="#a8fff3" stroke-width="1" stroke-opacity=".8"/></pattern>
    <pattern id="lg-p-rung" width="14" height="18" patternUnits="userSpaceOnUse"><path d="M7 3V15" stroke="#6b4300" stroke-width="2.4" stroke-linecap="round"/></pattern>

    <marker id="lg-arrow-b0" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#8fb0ff"/></marker>

    <filter id="lg-glow-shield" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB"><feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#a98bff" flood-opacity=".95"/></filter>
    <filter id="lg-glow-magnet" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB"><feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#5b8cff" flood-opacity=".95"/></filter>
    <filter id="lg-glow-gradient" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB"><feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#2de0c9" flood-opacity=".95"/></filter>
    <filter id="lg-glow-rf" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB"><feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#ffc93d" flood-opacity=".95"/></filter>
    <filter id="lg-glow-bore" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB"><feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#cfd9e8" flood-opacity=".95"/></filter>

    <path id="lg-shield-ring" fill-rule="evenodd" d="M20 36Q20 20 36 20H864Q880 20 880 36V524Q880 540 864 540H36Q20 540 20 524Z M36 36H864V524H36Z"/>

    <g id="lg-magnet-half">
      <path d="M150 200V87Q150 65 172 65H678Q700 65 700 87V200Z" fill="url(#lg-g-cobalt)" stroke="#9db9ff" stroke-width="1.2"/>
      <rect x="160" y="75" width="530" height="49" rx="10" fill="#0e2a78" stroke="#7da3ff"/>
      <rect x="168" y="81" width="514" height="37" rx="7" fill="none" stroke="#a9c2ff" stroke-dasharray="5 3"/>
      <rect x="176" y="87" width="498" height="25" rx="5" fill="url(#lg-p-lhe)" stroke="#c4d7ff"/>
      <g fill="#d9e6ff" stroke="#1d46b8" stroke-width="1.2">
        <circle cx="200" cy="99.5" r="5.5"/><circle cx="214" cy="99.5" r="5.5"/><circle cx="228" cy="99.5" r="5.5"/>
        <circle cx="296" cy="99.5" r="5.5"/><circle cx="336" cy="99.5" r="5.5"/><circle cx="425" cy="99.5" r="5.5"/>
        <circle cx="514" cy="99.5" r="5.5"/><circle cx="554" cy="99.5" r="5.5"/>
        <circle cx="622" cy="99.5" r="5.5"/><circle cx="636" cy="99.5" r="5.5"/><circle cx="650" cy="99.5" r="5.5"/>
      </g>
    </g>
    <g id="lg-grad-half">
      <rect x="164" y="130" width="522" height="17" fill="url(#lg-p-gz)"/>
      <rect x="164" y="147" width="522" height="18" fill="url(#lg-p-gy)"/>
      <rect x="164" y="165" width="522" height="17" fill="url(#lg-p-gx)"/>
      <path d="M164 147H686M164 165H686" stroke="#063f3a" stroke-width="1.4"/>
      <rect x="164" y="130" width="522" height="52" rx="3" fill="none" stroke="#7ff5e3" stroke-width="1.2"/>
    </g>
    <g id="lg-rf-half">
      <rect x="178" y="182" width="494" height="18" rx="3" fill="url(#lg-g-gold)" stroke="#ffe5a1" stroke-width="1.2"/>
      <rect x="190" y="184" width="470" height="14" fill="url(#lg-p-rung)"/>
      <rect x="178" y="182" width="10" height="18" rx="2" fill="#ffe08a" stroke="#b97a00"/>
      <rect x="662" y="182" width="10" height="18" rx="2" fill="#ffe08a" stroke="#b97a00"/>
    </g>
  </defs>

  <!-- 1. Ruang berpelindung RF -->
  <g id="mri-rf-shield" class="m5-p m5-shield" data-m5-i="0" tabindex="0" role="button" aria-pressed="false" aria-label="Ruang berpelindung RF, sangkar Faraday. Tekan Enter untuk melihat detail teknis.">
    <rect x="36" y="36" width="828" height="488" fill="#8b5cf6" fill-opacity=".06"/>
    <use href="#lg-shield-ring" fill="url(#lg-g-violet)"/>
    <use href="#lg-shield-ring" fill="url(#lg-p-shield)"/>
    <rect x="36" y="36" width="828" height="488" fill="none" stroke="#e4dbff" stroke-opacity=".55" stroke-dasharray="2 5"/>
    <rect x="812" y="430" width="52" height="58" rx="4" fill="#5b36c9" stroke="#c2adff"/>
    <g fill="#1a0f45" stroke="#e4dbff"><circle cx="838" cy="446" r="5"/><circle cx="838" cy="459" r="5"/><circle cx="838" cy="472" r="5"/></g>
    <g class="m5-lbl">
      <text x="864" y="60" text-anchor="end">Ruang berpelindung RF</text>
      <text class="sub" x="864" y="75" text-anchor="end">Sangkar Faraday, Zona IV</text>
      <text class="sub" x="864" y="506" text-anchor="end">Panel penetrasi</text>
    </g>
    <use href="#lg-shield-ring" class="m5-sel"/>
  </g>

  <rect x="150" y="200" width="550" height="160" fill="url(#lg-g-lumen)" pointer-events="none"/>

  <!-- 2. Magnet utama -->
  <g id="mri-main-magnet" class="m5-p m5-magnet" data-m5-i="1" tabindex="0" role="button" aria-pressed="false" aria-label="Magnet utama superkonduktor dengan kriostat helium cair. Tekan Enter untuk melihat detail teknis.">
    <use href="#lg-magnet-half"/>
    <use href="#lg-magnet-half" transform="translate(0 560) scale(1 -1)"/>
    <rect x="200" y="495" width="70" height="29" rx="4" fill="#1b3f9e" stroke="#7da3ff"/>
    <rect x="580" y="495" width="70" height="29" rx="4" fill="#1b3f9e" stroke="#7da3ff"/>
    <rect x="598" y="46" width="48" height="19" rx="3" fill="url(#lg-g-metal)" stroke="#eef2f8"/>
    <rect x="610" y="39" width="24" height="7" rx="2" fill="#9aa6b6" stroke="#eef2f8"/>
    <text class="m5-note" x="590" y="58" text-anchor="end">kepala dingin</text>
    <g class="m5-b0" pointer-events="none">
      <line x1="172" y1="214" x2="684" y2="214" marker-end="url(#lg-arrow-b0)"/>
      <line x1="172" y1="236" x2="684" y2="236" marker-end="url(#lg-arrow-b0)"/>
      <line x1="172" y1="258" x2="684" y2="258" marker-end="url(#lg-arrow-b0)"/>
      <line x1="172" y1="280" x2="684" y2="280" marker-end="url(#lg-arrow-b0)"/>
    </g>
    <g class="m5-lbl">
      <path d="M690 97H718"/><circle cx="690" cy="97" r="2.5"/>
      <text x="726" y="94">Magnet utama</text>
      <text class="sub" x="726" y="108">Kriostat, helium cair 4,2 K</text>
    </g>
    <path class="m5-sel" d="M150 200V87Q150 65 172 65H678Q700 65 700 87V200Z"/>
    <path class="m5-sel" transform="translate(0 560) scale(1 -1)" d="M150 200V87Q150 65 172 65H678Q700 65 700 87V200Z"/>
  </g>

  <!-- 3. Gradient coils -->
  <g id="mri-gradient-coil" class="m5-p m5-gradient" data-m5-i="2" tabindex="0" role="button" aria-pressed="false" aria-label="Gradient coil sumbu X, Y, dan Z. Tekan Enter untuk melihat detail teknis.">
    <use href="#lg-grad-half"/>
    <use href="#lg-grad-half" transform="translate(0 560) scale(1 -1)"/>
    <text class="m5-axis" x="172" y="143">Z</text><text class="m5-axis" x="172" y="161">Y</text><text class="m5-axis" x="172" y="179">X</text>
    <g class="m5-lbl">
      <path d="M680 156H718"/><circle cx="680" cy="156" r="2.5"/>
      <text x="726" y="153">Gradient coil</text>
      <text class="sub" x="726" y="167">Sumbu X, Y, dan Z</text>
    </g>
    <rect class="m5-sel" x="164" y="130" width="522" height="52" rx="3"/>
    <rect class="m5-sel" x="164" y="378" width="522" height="52" rx="3"/>
  </g>

  <!-- 4. RF coils -->
  <g id="mri-rf-coil" class="m5-p m5-rf" data-m5-i="3" tabindex="0" role="button" aria-pressed="false" aria-label="RF coil, kumparan radiofrekuensi. Tekan Enter untuk melihat detail teknis.">
    <use href="#lg-rf-half"/>
    <use href="#lg-rf-half" transform="translate(0 560) scale(1 -1)"/>
    <rect x="396" y="279" width="76" height="64" rx="20" fill="#f5b82e" fill-opacity=".1" stroke="#f5b82e" stroke-width="2" stroke-dasharray="5 4"/>
    <text class="m5-note" x="480" y="300">Coil kepala</text>
    <g class="m5-lbl">
      <path d="M668 191H718"/><circle cx="668" cy="191" r="2.5"/>
      <text x="726" y="188">RF coil</text>
      <text class="sub" x="726" y="202">Pemancar dan penerima</text>
    </g>
    <rect class="m5-sel" x="178" y="182" width="494" height="18" rx="3"/>
    <rect class="m5-sel" x="178" y="360" width="494" height="18" rx="3"/>
    <rect class="m5-sel" x="396" y="279" width="76" height="64" rx="20"/>
  </g>

  <!-- 5. Bore dan meja pasien -->
  <g id="mri-bore-table" class="m5-p m5-bore" data-m5-i="4" tabindex="0" role="button" aria-pressed="false" aria-label="Bore dan meja pasien dengan pasien terlentang. Tekan Enter untuk melihat detail teknis.">
    <rect x="150" y="200" width="550" height="160" fill="transparent"/>
    <path d="M66 354H130V512H66Z" fill="url(#lg-g-metal)" stroke="#eef2f8"/>
    <rect x="44" y="510" width="108" height="14" rx="4" fill="#7f8b9d" stroke="#eef2f8"/>
    <rect x="48" y="340" width="492" height="14" rx="7" fill="url(#lg-g-metal)" stroke="#eef2f8"/>
    <g fill="url(#lg-g-patient)" stroke="#f1f5fb" stroke-width="1.2">
      <rect x="62" y="306" width="180" height="34" rx="17"/>
      <rect x="226" y="282" width="170" height="58" rx="24"/>
      <rect x="386" y="320" width="24" height="20" rx="8"/>
      <circle cx="434" cy="314" r="26"/>
    </g>
    <rect x="236" y="318" width="132" height="20" rx="10" fill="#8294ae" stroke="#f1f5fb" stroke-opacity=".7"/>
    <g stroke="#e9f0fb" stroke-width="1" stroke-dasharray="3 3" opacity=".75" fill="none">
      <line x1="425" y1="262" x2="425" y2="298"/><line x1="407" y1="280" x2="443" y2="280"/>
      <circle cx="425" cy="280" r="5" stroke-dasharray="none"/>
    </g>
    <text class="m5-note" x="417" y="252" text-anchor="end">isosenter</text>
    <text class="m5-note" x="548" y="350">Meja pasien</text>
    <g class="m5-lbl">
      <path d="M690 280H718"/><circle cx="690" cy="280" r="2.5"/>
      <text x="726" y="277">Bore dan meja</text>
      <text class="sub" x="726" y="291">Diameter 60 sampai 70 cm</text>
    </g>
    <rect class="m5-sel" x="150" y="200" width="550" height="160" rx="2"/>
    <rect class="m5-sel" x="48" y="340" width="492" height="14" rx="7"/>
  </g>
</svg>`;
