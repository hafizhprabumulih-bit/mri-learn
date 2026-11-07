/* SVG untuk a3-ramping. Edit gambar di sini. Jangan memakai tanda backtick di dalamnya. */
const SVG_A3_RAMPING = `<svg viewBox='0 0 600 300' role='img' aria-label='Rangkaian paralel: catu daya, resistor dump, saklar persisten, dan solenoid utama pada 4 K'>
<g stroke='var(--lembut)' stroke-width='2' fill='none'><path d='M100 250V40H250M350 40H500V250H350M250 250H100'/><path d='M100 110H260M340 110H500'/><path d='M100 180H240M360 180H500'/></g>
<rect id='rp-ps' x='250' y='25' width='100' height='30' rx='6'/><text class='tx' x='300' y='40' id='rp-pst'></text>
<rect x='260' y='97' width='80' height='26' rx='6' fill='var(--latar)' stroke='var(--lembut)'/><text class='tx' x='300' y='110'>Resistor dump</text>
<rect id='rp-sw' x='240' y='165' width='120' height='30' rx='6'/><text class='tx' x='300' y='180' id='rp-swt'></text>
<rect x='250' y='235' width='100' height='30' rx='6' fill='var(--b0)'/><text class='tx' x='300' y='250' style='fill:#fff'>Solenoid utama</text>
<text class='kt' x='8' y='16'>Suhu ruang</text><text class='kt' x='8' y='292'>4 K (helium cair)</text>
<path class='fl' id='rp-up' d='M100 250V40H500V250H100'/><path class='fl' id='rp-per' d='M100 250V180H500V250H100'/><path class='fl' id='rp-down' d='M100 250V110H500V250H100'/>
</svg>`;
