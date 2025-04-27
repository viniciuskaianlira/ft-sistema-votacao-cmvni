<template>
  <!-- frame: Group -->
  <div class="frame group-16d7fac92054">
    <!-- group: Group -->
    <div class="group group-16d7dde9b893">
      <!-- rect: Rectangle -->
      <div class="shape rect rectangle-16d5263a2545">
      </div>
      <!-- text: FAVORAVEL -->
      <div class="shape text favoravel-16d5b7bc9f69">
        <div class="text-node-html" id="html-text-node-3d9b2c17-7ddd-802e-8006-16d5b7bc9f69" data-x="629" data-y="502.5">
          <div class="root rich-text root-0" style="display:flex;white-space:break-spaces;align-items:flex-start" xmlns="http://www.w3.org/1999/xhtml">
            <div class="paragraph-set root-0-paragraph-set-0">
              <p class="paragraph root-0-paragraph-set-0-paragraph-0" dir="ltr"><span class="text-node root-0-paragraph-set-0-paragraph-0-text-0" style="color:rgba(255, 255, 255, 1);text-transform:none;line-break:auto;overflow-wrap:initial;white-space:pre;font-size:14px;text-rendering:geometricPrecision;caret-color:rgba(255, 255, 255, 1);text-decoration:none;--font-id:gfont-noto-sans;--fills:[[&quot;^ &quot;,&quot;~:fill-color&quot;,&quot;#ffffff&quot;,&quot;~:fill-opacity&quot;,1]];letter-spacing:0px;font-family:&quot;Noto Sans&quot;;font-style:normal;font-weight:400">FAVORAVEL</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- group: Group -->
    <div class="group group-16d7e31c0616">
      <!-- rect: Rectangle -->
      <div class="shape rect rectangle-16d53820d4c1">
      </div>
      <!-- text: PL -->
      <div class="shape text pl-16d6298a37c1">
        <div class="text-node-html" id="html-text-node-3d9b2c17-7ddd-802e-8006-16d6298a37c1" data-x="619" data-y="454">
          <div class="root rich-text root-0" style="display:flex;white-space:break-spaces;align-items:flex-start" xmlns="http://www.w3.org/1999/xhtml">
            <div class="paragraph-set root-0-paragraph-set-0">
              <p class="paragraph root-0-paragraph-set-0-paragraph-0" dir="ltr"><span class="text-node root-0-paragraph-set-0-paragraph-0-text-0" style="color:rgba(193, 255, 114, 1);text-transform:none;line-break:auto;overflow-wrap:initial;white-space:break-spaces;font-size:20px;text-rendering:geometricPrecision;caret-color:rgba(193, 255, 114, 1);text-decoration:none;--font-id:gfont-open-sans;--fills:[[&quot;^ &quot;,&quot;~:fill-color&quot;,&quot;#c1ff72&quot;,&quot;~:fill-opacity&quot;,1]];letter-spacing:0px;font-family:&quot;Open Sans&quot;;font-style:normal;font-weight:800">PL</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- group: Group -->
    <div class="group group-16dba835395f">
      <!-- rect: Rectangle -->
      <div class="shape rect rectangle-16d4ea368818">
      </div>
      <!-- text: ANTONIO CARLOS FLORES -->
      <div class="shape text antonio-ca-16d64d685100">
        <div class="text-node-html" id="html-text-node-3d9b2c17-7ddd-802e-8006-16d64d685100" data-x="619" data-y="309">
          <div class="root rich-text root-0" style="display:flex;white-space:break-spaces;align-items:flex-start" xmlns="http://www.w3.org/1999/xhtml">
            <div class="paragraph-set root-0-paragraph-set-0">
              <p class="paragraph root-0-paragraph-set-0-paragraph-0" dir="ltr"><span class="text-node root-0-paragraph-set-0-paragraph-0-text-0" style="color:rgba(255, 255, 255, 1);text-transform:none;line-break:auto;overflow-wrap:initial;white-space:break-spaces;font-size:20px;text-rendering:geometricPrecision;caret-color:rgba(255, 255, 255, 1);text-decoration:none;--font-id:gfont-open-sans;--fills:[[&quot;^ &quot;,&quot;~:fill-color&quot;,&quot;#ffffff&quot;,&quot;~:fill-opacity&quot;,1]];letter-spacing:0px;font-family:&quot;Open Sans&quot;;font-style:normal;font-weight:800">ANTONIO CARLOS FLORES</span></p>
            </div>
          </div>
        </div>
      </div>
      <!-- text: VEREADOR -->
      <div class="shape text vereador-16d681f162c6">
        <div class="text-node-html" id="html-text-node-3d9b2c17-7ddd-802e-8006-16d681f162c6" data-x="684.5" data-y="369">
          <div class="root rich-text root-0" style="display:flex;white-space:break-spaces;align-items:flex-start" xmlns="http://www.w3.org/1999/xhtml">
            <div class="paragraph-set root-0-paragraph-set-0">
              <p class="paragraph root-0-paragraph-set-0-paragraph-0" dir="ltr"><span class="text-node root-0-paragraph-set-0-paragraph-0-text-0" style="color:rgba(255, 255, 255, 1);text-transform:none;line-break:auto;overflow-wrap:initial;white-space:pre;font-size:20px;text-rendering:geometricPrecision;caret-color:rgba(255, 255, 255, 1);text-decoration:none;--font-id:gfont-open-sans;--fills:[[&quot;^ &quot;,&quot;~:fill-color&quot;,&quot;#ffffff&quot;,&quot;~:fill-opacity&quot;,1]];letter-spacing:0px;font-family:&quot;Open Sans&quot;;font-style:normal;font-weight:800">VEREADOR</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- rect: 2025011508075817369392785002e0 -->
    <div class="shape rect c-2025011508-16d6d8565907">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: 'favoravel' // 'favoravel', 'contrario', 'abstencao', 'ausente'
    };
  },
  computed: {
    statusClass() {
      return {
        favoravel: this.status === 'favoravel',
        contrario: this.status === 'contrario',
        abstencao: this.status === 'abstencao',
        ausente: this.status === 'ausente'
      };
    },
    statusText() {
      switch (this.status) {
        case 'favoravel':
          return 'FAVORÁVEL';
        case 'contrario':
          return 'CONTRÁRIO';
        case 'abstencao':
          return 'ABSTENÇÃO';
        case 'ausente':
          return 'AUSENTE';
        default:
          return '';
      }
    }
  }
};
</script>

<style scoped>
/* cyrillic-ext */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 800;
  font-stretch: 100%;
  font-display: block;
  src: url(https://design.penpot.app/internal/gfonts/font/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgshZ1x4taVIGxA.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 800;
  font-stretch: 100%;
  font-display: block;
  src: url(https://design.penpot.app/internal/gfonts/font/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgshZ1x4kaVIGxA.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 800;
  font-stretch: 100%;
  font-display: block;
  src: url(https://design.penpot.app/internal/gfonts/font/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgshZ1x4saVIGxA.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 800;
  font-stretch: 100%;
  font-display: block;
  src: url(https://design.penpot.app/internal/gfonts/font/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgshZ1x4jaVIGxA.woff2) format('woff2');
  unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;
}
/* hebrew */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 800;
  font-stretch: 100%;
  font-display: block;
  src: url(https://design.penpot.app/internal/gfonts/font/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgshZ1x4iaVIGxA.woff2) format('woff2');
  unicode-range: U+0307-0308, U+0590-05FF, U+200C-2010, U+20AA, U+25CC, U+FB1D-FB4F;
}
/* math */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 800;
  font-stretch: 100%;
  font-display: block;
  src: url(https://design.penpot.app/internal/gfonts/font/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgshZ1x5caVIGxA.woff2) format('woff2');
  unicode-range: U+0302-0303, U+0305, U+0307-0308, U+0310, U+0312, U+0315, U+031A, U+0326-0327, U+032C, U+032F-0330, U+0332-0333, U+0338, U+033A, U+0346, U+034D, U+0391-03A1, U+03A3-03A9, U+03B1-03C9, U+03D1, U+03D5-03D6, U+03F0-03F1, U+03F4-03F5, U+2016-2017, U+2034-2038, U+203C, U+2040, U+2043, U+2047, U+2050, U+2057, U+205F, U+2070-2071, U+2074-208E, U+2090-209C, U+20D0-20DC, U+20E1, U+20E5-20EF, U+2100-2112, U+2114-2115, U+2117-2121, U+2123-214F, U+2190, U+2192, U+2194-21AE, U+21B0-21E5, U+21F1-21F2, U+21F4-2211, U+2213-2214, U+2216-22FF, U+2308-230B, U+2310, U+2319, U+231C-2321, U+2336-237A, U+237C, U+2395, U+239B-23B7, U+23D0, U+23DC-23E1, U+2474-2475, U+25AF, U+25B3, U+25B7, U+25BD, U+25C1, U+25CA, U+25CC, U+25FB, U+266D-266F, U+27C0-27FF, U+2900-2AFF, U+2B0E-2B11, U+2B30-2B4C, U+2BFE, U+3030, U+FF5B, U+FF5D, U+1D400-1D7FF, U+1EE00-1EEFF;
}
/* symbols */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 800;
  font-stretch: 100%;
  font-display: block;
  src: url(https://design.penpot.app/internal/gfonts/font/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgshZ1x5OaVIGxA.woff2) format('woff2');
  unicode-range: U+0001-000C, U+000E-001F, U+007F-009F, U+20DD-20E0, U+20E2-20E4, U+2150-218F, U+2190, U+2192, U+2194-2199, U+21AF, U+21E6-21F0, U+21F3, U+2218-2219, U+2299, U+22C4-22C6, U+2300-243F, U+2440-244A, U+2460-24FF, U+25A0-27BF, U+2800-28FF, U+2921-2922, U+2981, U+29BF, U+29EB, U+2B00-2BFF, U+4DC0-4DFF, U+FFF9-FFFB, U+10140-1018E, U+10190-1019C, U+101A0, U+101D0-101FD, U+102E0-102FB, U+10E60-10E7E, U+1D2C0-1D2D3, U+1D2E0-1D37F, U+1F000-1F0FF, U+1F100-1F1AD, U+1F1E6-1F1FF, U+1F30D-1F30F, U+1F315, U+1F31C, U+1F31E, U+1F320-1F32C, U+1F336, U+1F378, U+1F37D, U+1F382, U+1F393-1F39F, U+1F3A7-1F3A8, U+1F3AC-1F3AF, U+1F3C2, U+1F3C4-1F3C6, U+1F3CA-1F3CE, U+1F3D4-1F3E0, U+1F3ED, U+1F3F1-1F3F3, U+1F3F5-1F3F7, U+1F408, U+1F415, U+1F41F, U+1F426, U+1F43F, U+1F441-1F442, U+1F444, U+1F446-1F449, U+1F44C-1F44E, U+1F453, U+1F46A, U+1F47D, U+1F4A3, U+1F4B0, U+1F4B3, U+1F4B9, U+1F4BB, U+1F4BF, U+1F4C8-1F4CB, U+1F4D6, U+1F4DA, U+1F4DF, U+1F4E3-1F4E6, U+1F4EA-1F4ED, U+1F4F7, U+1F4F9-1F4FB, U+1F4FD-1F4FE, U+1F503, U+1F507-1F50B, U+1F50D, U+1F512-1F513, U+1F53E-1F54A, U+1F54F-1F5FA, U+1F610, U+1F650-1F67F, U+1F687, U+1F68D, U+1F691, U+1F694, U+1F698, U+1F6AD, U+1F6B2, U+1F6B9-1F6BA, U+1F6BC, U+1F6C6-1F6CF, U+1F6D3-1F6D7, U+1F6E0-1F6EA, U+1F6F0-1F6F3, U+1F6F7-1F6FC, U+1F700-1F7FF, U+1F800-1F80B, U+1F810-1F847, U+1F850-1F859, U+1F860-1F887, U+1F890-1F8AD, U+1F8B0-1F8BB, U+1F8C0-1F8C1, U+1F900-1F90B, U+1F93B, U+1F946, U+1F984, U+1F996, U+1F9E9, U+1FA00-1FA6F, U+1FA70-1FA7C, U+1FA80-1FA89, U+1FA8F-1FAC6, U+1FACE-1FADC, U+1FADF-1FAE9, U+1FAF0-1FAF8, U+1FB00-1FBFF;
}
/* vietnamese */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 800;
  font-stretch: 100%;
  font-display: block;
  src: url(https://design.penpot.app/internal/gfonts/font/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgshZ1x4vaVIGxA.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 800;
  font-stretch: 100%;
  font-display: block;
  src: url(https://design.penpot.app/internal/gfonts/font/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgshZ1x4uaVIGxA.woff2) format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 800;
  font-stretch: 100%;
  font-display: block;
  src: url(https://design.penpot.app/internal/gfonts/font/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgshZ1x4gaVI.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

/* cyrillic-ext */
@font-face {
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 400;
  font-stretch: 100%;
  font-display: block;
  src: url(https://design.penpot.app/internal/gfonts/font/notosans/v39/o-0mIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjcz6L1SoM-jCpoiyD9A-9X6VLKzA.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 400;
  font-stretch: 100%;
  font-display: block;
  src: url(https://design.penpot.app/internal/gfonts/font/notosans/v39/o-0mIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjcz6L1SoM-jCpoiyD9A-9e6VLKzA.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* devanagari */
@font-face {
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 400;
  font-stretch: 100%;
  font-display: block;
  src: url(https://design.penpot.app/internal/gfonts/font/notosans/v39/o-0mIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjcz6L1SoM-jCpoiyD9A-9b6VLKzA.woff2) format('woff2');
  unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+20F0, U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09;
}
/* greek-ext */
@font-face {
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 400;
  font-stretch: 100%;
  font-display: block;
  src: url(https://design.penpot.app/internal/gfonts/font/notosans/v39/o-0mIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjcz6L1SoM-jCpoiyD9A-9W6VLKzA.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 400;
  font-stretch: 100%;
  font-display: block;
  src: url(https://design.penpot.app/internal/gfonts/font/notosans/v39/o-0mIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjcz6L1SoM-jCpoiyD9A-9Z6VLKzA.woff2) format('woff2');
  unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 400;
  font-stretch: 100%;
  font-display: block;
  src: url(https://design.penpot.app/internal/gfonts/font/notosans/v39/o-0mIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjcz6L1SoM-jCpoiyD9A-9V6VLKzA.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 400;
  font-stretch: 100%;
  font-display: block;
  src: url(https://design.penpot.app/internal/gfonts/font/notosans/v39/o-0mIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjcz6L1SoM-jCpoiyD9A-9U6VLKzA.woff2) format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 400;
  font-stretch: 100%;
  font-display: block;
  src: url(https://design.penpot.app/internal/gfonts/font/notosans/v39/o-0mIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjcz6L1SoM-jCpoiyD9A-9a6VI.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}


html, body {
  margin: 0;
  min-height: 100%;
  min-width: 100%;
  padding: 0;
}

body {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
}

* {
  box-sizing: border-box;
}

.text-node { background-clip: text !important; -webkit-background-clip: text !important; }

/* Group */
.group-16d7fac92054 {
  position: relative;
  width: 406px;
  height: 249px;
  border-radius: 0px 0px 0px 0px;
  z-index: 0;
}

/* 2025011508075817369392785002e0 */
.c-2025011508-16d6d8565907 {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 135px;
  height: 200px;
  background: url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA+Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBkZWZhdWx0IHF1YWxpdHkK/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8AAEQgF3APrAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A9HAxTgtOxTscUhjQKdilApQKAExTgOaXFLigBMUtLRQAlFLSUAFJS0UAJRS4ooAKSlpKBhRRmjtSAKKKKYBRRRSAWkoooAKKKTFAC0lFFABRRRQAUhpaSgAooooAKKKSgAooooAKSiigAooo7UAJRRRQAUhoooASig0UAFFFJQAUUUUAFFJRQAUUUUAFJRRQAUUUUDCkoooEFFFFAxaKKKBC0UUUDClxxSUvagQUUUUAFLSUUALRRRQAUUUUwCiiikAUUUGmAlFFFACUUUUAFFAooAKKKKAClpKKAFooooASiiigBKKWkoASilpKACkpaSgQUUUUAJ2oopKACkpaTtQAlFFGKYBRR3pKACiiigAooooAKSlooENxTSKkpDQBEVppFSkU0imBGRTSKkIpCKAIitM21MRTcUAbQFOxQBTgKkYgFKBS4paAEopaSgAooNFAwpKWigBKKWkoAKKKKQBSUtJQAGiiigAooooAKKKKAEopaKACkoooAKKKKACiikoAKKKKACiiigBKKKKACiikoAKKSigAooooAKSiigANFJRQAUUUnegBaSiigYUlFFAgooopAHakpaSmMKWkooEHeiiigAopKO9AxaKSjNAC0UZooAWiiigQtFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFBpKYBRRRQAUUUhoAKWkooAWlpKKAFpKKSgBaWkooAKKKKACjNFIaAFpMUA0tACUlKaKAExSUtIaAEpKXtSUAFIaWkoASiiimAUUUlAgooooAWkoooAKKKKACjHFFFACYpCKdRQBGRSEVIaQigRERTcVKRTcUAbIFLRRSGFFFFABRSUUDCig0UAFFFFIApKWkoAKKKSgAooooAKKKKACiiigAooozQAUUUlAC0lFJQAtJRRQAUUUlAC0UlFABRSUZoAKKKKACiikoAKKKSgBaSiigApKKKACikooADSUtJQAZooooGFFJRSAKKKKYBRRSUALRSUUALSUUmaBC0lFFAwpaSigQtKKQUooGLRRRQAtFFFAgooooAKKMUUAFFFFABRRRQAUUUUAJSUtBoASlpDRQAUUmaWgAzRRRTABS0lFABS0lFABS0lFAC0lFFAC0ho70UAIRzS0UUAFFFFACUUUUAJSUUhoADSGlooASkpaKAEpKKKYgooooAKKKKACiiigAooooAKKKKACkpaMc0AIRTcU+koEatFFFIYUUUlABS0UUhiGiiloASilpKAEopaSgApKWigBKKWigApKKKACjNFJQAUtJRQAUUlFABRRRQAUlFFABRRSUALSUUUAFFJRQAtJRRQAUUUlABRRRQAUlFFABSUtJQAUUUlAC0lFJQAtJRmkpALSUUmaAFopM0ZpgKTRSZooGLSZozSUALSUUUAFLSUUALRSUUAOFHakooAdS02loAWlpKKBC0UUUAFFFJQAtFFFABmikooAWkpaSgAooooAQ0YpaSgBKKWigApe9JS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60poGaYC0tFFACUnSnGmnpQACloXpSmgBtLjigUuKAGGm4JNSH0pG4FMBAAKDR2ooAaaYwqQ00igCEgH5SMiqNxA0Lbl5Q/pWgwprDeMGgDMzRU0sWzJA/CoaloYUUlFIApKWkoAKSlpKACkoooASiikNIApKKSgAoopKACkpaSgAo7UUdqAEooooAKSlpKACiiigDUooo7UgClpKWgBKKO1FABRRRQAGiikoAM0UUlAC0lLSUAHaig0lABRRRQAUUUUAJRRRQAUlLSUDCiiigQUDngdaKliXjOKYFhF2oBThR2FKKoQ5RS0CigBKWiloASloooAKKKKBhRS0UAFFFFABRRRQAUUtFACUtFFABRS0lAgoopaBiUtFFACU4CgCl7UAHSig0UAIabjJpSaUCgBRQaWmUAFLQKKACiiigAxRRRQAUUtFABjFFBpaAEoopaBCUoFGKXFACUhNKabjmgBQKfikApaACgilppNACd6dTRTqYBRSgUUANPWkal70h60AOXpQaB0paAAUMcD3pegpp9TTENFK3ShaG6UDGjpS0L0pTQA2mmnkU2gBhFRkYNSkUwigCNl3LkdapSx4+YdKvdDTHUfgaAM6inyx7G9qjqBi0lFFACUUUGgBKSlNFACUhpabSADSUtJQAUlLSUAJRRRQAUUUlABRRRQAlFFFABR+NFFAGpRRRSAKKKKACiikoAWiikoAKKKSgBaSlpKACiiigBKKWkoAKKKM0AFJRRQAUd6KSgBaSiigYUUUUAAGasouABUMQy30qynWqQmPpyjmm1IOlMQHNFFFABS0UUgCijFLTASloooAKKKWgBKMUtFAwoopaAEopaKAEopaKBBRRS0AJRS0UDEpRS4ooAMUUUUAFIaWkoAAKdQBQTQA0mgdaO9LQAUlLRQAlGKWjFABRS4pKBBS4oFLQMSiloxQISilooAKWikJoAQ0AUYyacBQAoopaSgApDSnpTTTAUUUDpR3oAdQaKQ8UANHWg9aBR/FQA4UtAHFNc/wimIM7j7CkalAwKQ80DFUcUHpSjpSHpSAavSlNItOpgIaaadSEUAMNNIp9NNAETCm9eKkIqNhigCGRNykd6pMCpwa0W+YZqrOnG4UmgRWoooqRhSUUUAFJS0lAAaSig0gEpKU0lABSUUUAJRRRQAlFLSUAFIaWigBKKKKACiiigDUopKKQC0UUGgBKKKKADpRRmkoADRRRQMKKKKBBSUtJQAUUUUAFFFJQAUUUUAJRRRQAUUUUxiUUUUATwgBSanTpUSjCCpl4Aq0SOA5p9NX1p1IAoopaACiiikAtFFFABS0UUxhRRRQAUtFFABRRRQAUtFFAgooooAKKWigYlFLRQAUUUtACUtJRQAGiiloASig0UAAopaKBCUUtAoASlopaAEoopaACijFLQAUUYo70AFFLRQAU00ppAM0AKop1ApaAEopaSmAU2lPSkoAXpSDrSnpSLQA6kanUxutAAOlIPvU7tSJ1piHk4FRjk5PWlY5bFCigBab3p1N70hju1B6UtIaYDF7040i9TTjQA2loooAjIwaQ09xxTByKAGsM0wjipDTCMUAQng0xwOfQ1MwqI85FAFCRdrkdqZmrU6ZXPcVU6VLQxaKTtQaQBRQaSgApKWkoAKSiigBKSlopAJRRSUDCiiigQUUUUAJRQaKACiikoA1O1FAopAHaiikoAWiikzQAUUUUAFFFFABSUtJQAtJRRQAUUUUAFJS0lABSUtJQAtJRRQMKSiigQUq9QKSpIVy9NDJ/4gKl7VCOZMelT96skcOBS0naikAtLSClpDFoo70UCClpKWmAUUUUAFLRRQMKWkpaACijFFABRS0YoAKKKKACiijFABRS0UAJRQKKACiiigAopaKBBRiiloASilooAKKKWgBKKKKADFLRiigAopaKACkpaMUAFFKKQ0AJ1NKBQBThQAUUUUAGKKKKYCGk70poFADWpRSNThQAtRn71SGo/4qAHUmcZoNIeuaYgp46UwCn0hiGmgU40LQAtIaWk7UANHWnU0fep2OKYDTS0GigAPNRfdapajkHegBDTWFKOaKAIiKjccZqU0wigRAw3DP51RkG1jWgwwfY1SuF2tQxohzRSUtQMKDSUUAFFFJQAUUUlABSUtJSAKQ0tJQAUUUUABoopKACiiigBKKKKANOiiikAUtJS0AJRRRQAUUUUAFFJRQAtJRRQAUUUUAFFFFACUUUUAFJRRQAUUUUDEopaSgAqzbjAJquoyQKuIMIfpVIQyPmQ/WrA61Wg5arFUxDqBSU4VIxaKKWgAooopgLRRRQIKWiigYUtJS0AFFFLQAUlLRQAUUUUAFFFFAC0UUUCCikooAKKKKAFoAoooAKXFJS0AJS0UUAFGKKWgApKWkY4FACU4VROqWSS+W86q3o3FWIrmKZiInD46lTmgqUJR1aJ6MUgpaCRaKSloASloooADSYpTQBQAuKKKKACilooASilxSUwEoFLQKAGP1FOHSmSfeFPHSgAPSmLy1SHpUadaYhSaaeuKU9aRRk5oGPApaBRSAaaUUnelpgLRRRQAz+KndqaetOoASilxSUAFIRkUtLQBX6NS0so70g5FADWFMIqXqKjNAETDIqncqSnuKumoZV4zigDM6UZp0q7XNMzxUDFNFJRQAuaKKKACko70UAJRRSUgCiijtQAUUUUAFJRRQAUlLSUAFGKKM0wNOiiipAM0UdqSgBaKKSgBaKSigBaSlpKACiiigAooooAKSiigApKKKAA0UGkoAKKKKBhRRRTAkhGWJ9Ksj/VMahhHyH3qVjiBj7VSEMtuRmrHeq9r/q1NT9TTYhwpwpopRUjHUUUUALS0lFMBaKKKAFoopcUAFFGKWgAoFFFABiilooEFFFFAwooooEFFFFACYopaSgAooooGFLRRQIWikpaACiiloASloxRQAU080tYOoeKLfTr14XhkeOIDzZF6JmqjFy2FexD4gMUG2S6sIJIXcJu8zDHPpVrQBZW8c1tauN28vsJyQO1cN4x8UW+tPbQWRfyY/nYsMHdWv4B09pPNvZlkD5AVyeoreVPlp3Yc7ejZ3wpaSlrmGFFFGKAFpKWkoAKWiloAKKKKACiiloAO1JRRTASgUtAoAhlOHFSL0qKfgg1IhytMBxPFMToac3Ipq8LQAxj+tSKMCo+r/SpRSAKKKQnigBBTqQUtABQOlFFMBh604U1utOFABmk70ppKAFpKWigBjDIqFTg4qxUDja9AC01hindqQ8igCJhUbDipTUbCmIzrpO461VzWlOm5DWaRtJFS0NC5ozzTc0uakY6ikzRmgBaSijNABSUZozQAUUlFIAooooAKSlpKACiiigAooopgaVLSUVIwooooELSUUtABSUUtABSUUUAFFFJQAtFJS0AJSUtJQAUZopKACiiigAoooNAwoHJpKcgy4piLCDaoFLOcWrn2o70l1/x6OPatEILbiFPpU+aihGI0HoKdn5sVLGSCnU0U4UgFp1JRQAtLSUtAC0UUUwFooooAWiiloAKKWigBKWiigQZooooAKKKSgAooooASilo/CgBKKKKAFooooAKWkpaAClooFABRS0UAIRXLX/h+O+h1B5UkUu+VRT94jufWuqxSYqozcdhNXOO/4QrSkWNRHI00igYY8A+tdHpelxabCFT72Apx04q+Bz05pacpyluJRSCilpKgoKWiloASiilxQAUUtFABRiiigAooooAKSlxRQAlFFFMCC4HANLCcilnGVqK3PJFMCyfu0z+GnnpTDwlAhsfJJqWo4+FFPpDCmnrTqTvQAoFFFFABRS0hpgNNKOlIaUHigANFFFAAKKKWgQlRTDIzUtNcZU0AQqeKWmLwafTAYRTGHFSGmH0oAruOKzLlNsmfWtZhVK7jyh9qTGihmlzTBS5qBj6KbmloAWikzRQAtFJRQAUZopKQC0UUlABRRRQAUUUUAFFJRQBp0UUUgCiiigAooooAKKKKACkpaKAEooooAWkoooASiikoAKKKKACiiigApDRRQMKlgGX+lRVNAOCapCJhy1FwM2z/AEpE5JNLLzbt9KsQJ0FC8yUi9BSp981LGTCnCminUgHUtJS0ALRRSigQUtJS0xhS0UCgBaKKWgAooooAKKKKACiiigQUlLSd6ACiiigAooooAKSlpKBi0UUUCFoopaAClpKWgAoopaACijFGKACloooASlFAooAWiiigAFLiiigAooooAWjFFFABSUtJQAUUUUAJQaO1FMCKX7hqtA2JKtyfcNUh8smaaA0Oq1FJwlPjYFRUcx4wKBDk+6KdTV6U6kMD0pBQaXtQAUdaKKYBRRRQA00o6UjUo6UAFFFFABS0lLQIQ0Y4oNAoAqsMOacKJRh6BQAHpTGHFSdqYaYETCq8q7lIq0wqBxQBiuNrkelJU14u2TPrUANQyh1LmmZpc0gHUUlFAC5oozRSAKKSloAKKKSgYtFFJQAtJRRQIKWkooA06M0UlIBaKSigBaKSigBaSiigAooooAKKKKADNJRRQAUlFFAwooooEFFFJQAtJRRQMKnj4jqvVoDEQqo7iY5Pu05uYWHtTF+7TxypFX1ERoflH0p6feNRIflWpU+9UsCYU6mrThSGOFLSUtAC0tJS0AFLSUtMBaWkzS0AKKMUUUCCiiloASiiigAooooASlopKAFpKWkoAKKKKAEooooAWikpaAFpaSloAKWiigApaSloAKWkpaADFFFFABS0CigAopaKACg0UtABRRRQAUUUtACUUUUAFJRRTAKQ0cijNADW5U1RkGGq+3SqcopoCWI8US9qbAafLQIcvSnUxTxTqQxe9FIKXNAC0CkpaYBQaKQ0ADUDpSHpSr0oAKKKKAFopKUUCENC0p6U1aAIphzTB0qWYcVEtAC0hpaDTAYRULipzUTigDNvo8pn0rOzWzcLujIrFPysQetTIaHZpRTc0tSMdmlptLQAuaKSikAtFJR2oAWikpaACiiigAopKKACiiigDTpaSikAtJRRQAUUUUAFFFFABRRSUAFFFFABSUtJQAUUUUDCikpaBBSUUUDCkpaSmIB1q0/EYqsgy4q1NwoqogA6Cnqeajz0pynmn1AiHBYehqRfvUyTiQ+4pydRQxFlacKaKcKkY4UtJS0ALS0lLTAWiiigBaWkooAWlpM0tABRRRQIKKKKACilpKACkpaKAEooooAKKKKAEopaSgYUopKWgBaWkooEOoopaAExS0UUAFLSUuKADNLQOKKACiiloAM0UUUALRRRQAUUUtACCloooAKSlpKACkpaKYDe1FKaSgBDVdxnNWDULDk00Ihj4appfuZqHGHqZuUpgCHIp1RRn5RUlIY4cCikzS0gCnU2lpgLRSZoNAAelApD0pRQAtJS0lAB3pwpKUUCEbpTU605ulMSgBJelQip36VB3oAWjqKWimAw0xqkpjUAV5BkGsS5XZOR2NbrjrWTqCYIak1oNFTNANNB4pRUDHZpc802loAdmikopALS03NLQAtFJRmgBaKKKACiiigAooooA06KKKQBRRSUAFFFFAC0UUlABRRRQAUlFFAwooooAKTrRRQAUUUUAFFFBoAQ0UUlMRJDzKKmn4A+tRQD96KluTwPrVRAQHmnd6jQ80+mwCblQw7GiE/PilxuUikt+W57UPYRaFOpopakY6lptLTAcDSikFFADqWm06gBaWminCgApc0lFAC0UUUCCjiikoAWikpaACikooAKKKKACiiigApKWkoAKWiigAzS0UUAOFGaSigB1FIKWgApaSgUAKKWkpaAFxRQKKADilpKWgAooooAWkopaAEpaSigBaKSlpgFJRmigBKQ06kNADTUR+9Uhpjdc00BDIPmqROVpJBxSRntTEMX5XYe9Sg1HJxIrevFOBpMY/NLmmCnUgHUUlLmmAUp6UlB6UAB6Uq9KQ9KUdKAFpKWigBKWiigQj9KbHSv0pI6AFfpUB61YbpUBHNABRSiimAw0005ulNPSgCJxWffx7oj7VpNVW5TdGR7UAYANLmkYbXIorMocDTgaYKWgB+aKaDS5oAWlpKKQC0tJRQAtFJS0AFFFFMAooooA1KO1FJUgFFFFABRRRQAUUUlAC96SiigApKWkoAWkoooGFFHaigAoopKAFNJRRTASiigDJoAntl+fNOuvuj606AYNNu/uVcRDI+9PPSooj1qWhgCmnxjDsR3qLOGqZDR0ESinZpimlJqRjxTqjBpwpgPpaaKWgBwpaaKdmgBaWm0tADqKSigBaWkooEFFFFAAaKDRQAtJQKKACiiigAooooAKKKMUAGKKMUUALRRRQAU6m0tAC0ZpKXNAC0UmaM0AOpRTc0ooAWikzS5oAWlptLQAtHFJRQAppM0h6UhPNAC7uaXNRN60gamA95AtNE4NLtDCoHgxyKALAlBpwYYrPJZTTlnPegC9kUE1WWcGpVcGgBxphHFOpDQAhGVqFeGqcdKiYYamISYZjPtzTVbIqU/MuPUVXj4yp6g0wJgaUUwGnikMdS02loAWlPSkzS9qAAnigdKD0oHSgBaKKKAFpOpoooENkPFEdNkp0dADz0qFqnPSoWoAaKKBSmmA1hxUVTGoX4NACHpUEoypqc8ionHFAHPXa7bg+nWos1b1JMSK3rVIVDKQ7NOzTM0opDHg0oPFMzS0CH5ozTRS0gHUvem0UAOopKKAFoo4ooAKWkooA1KWkopAFFFJQAtFFJQAUUUUABpKKKACiiigYUUlFABRRRQAUUUUAFJS0lABT4xk1HViJaaETR0y6/1ZqRRimXHMTVaArxGpQagiNTZoYCP60+I5FNIyKSM4fFJgThsU4GoSealU0gJBThTBTwaYDhThTRSigBwpaQUtAC0tIKKAHUUlLQAUuaSigQtFJS0AFFFFAwzQKKKBBRRRxQAUUUUAFFFLQAUUUUAFFLSUAFFLRQMSilxRigBM0tIaSgB1OFMzTqAFzS5puaUGgQ6jNJmigB2aQmkpDQAGmbqdQVFMBhYUwmnlajZTQMkR6lBBFVAdpqRHoESPECKqyQ+lXA2RSEZoAzG3p0pFvCh+YYHrV94gRVSW2BHSmMsJOGHWpQ2ayP3lu2Rkr6VchuAw4NAi6OtMkFCODTmGVoEMB6VXf5Lg+jc1N2NQ3XAV/Q00A8GpAeKhU5qQHipGPFLmmilzTAeKD0pope1ACngUopD0oFADqOlFFABRRRTERSdRT4qjkPzVJH0pASVEwqY9KjYUAR96WkNLTASopRxU3amOMigCuDxTXHFKeGpT0oAyNTX91n0NZINbt8m6BxjtWDUyGh2aXNNBpQakocKXNNpRQIeDSimA06kMdS00UtAC0uabS0xC0UlFIB1JRRmgDVopKKQBRRRQAUUUGgAopKKACkpaSgYUUUUAFFFJQAtFJRQAUUUUAFJRRQA5QSwFW0XkVBCOc1YXrVIQ6mS8xke1PNIeRVIChEeanzxUCcSEe9T02AU0nDA0tNz2NSMkJ+apVNQMamU5ANIRKOlPFMBpwpgPFOFNFKKAHU4U0U4UCFFLSCigBaWkpaACiiloAKKKKAA0UYooAKKKKACiiigAooooAKWiigAooxS4oASloooAKKMUuKAEopcUUAIaTFLSGgBpyKAx9KWkoGODUA03HvRQBJmlzUeaXNAD6KbmigQtLTc0ZpgLSEZozSZoAjZM0wAg1PmozQAqtTw1Q0oagCfIppUGmBqcGzQBE8II6VSltmRt0fBrTpGUGmBnw3PO1xhqvxuGFVZ7UPyBzUCSSW7YfJX1oAvHgkUyQeZAR6io/tAkORTkbMdNCIYHyoz1HFWapghLnb2bkVazSe4x4NOFMFOBoAeKKQUo60ABp46Uw04UALS0lLQAUUUnamIhf71Sx9Kgb71Tx9KQEtMNPpjUARnrRS4opgHamMKfTTQBVkGDQDkU+Ve9Qg4NAENyuUNc042uR6GuplG5DXNXS7bh6UthojzQDTc0tQMdmlpoNKKAH5pRTKcKQx4NKDTO1OFAhaWkooAdmikooAWjiikzTA1qKWkqQCikooAKKKKACjvRSUDCiikoAKKKO9ABRRSUALQaSigAoozSUALQBkgCkqWAZkye1AEyrt4qVelL1pKsQUUhoFMClINtwfepQcimXQxIrfhTlPy5pgGTSGlNMIpDHHlRUsR+WoAflNSQngipEWRUgqJakFADxThTBTxTEOzS02nUAKKWkpRQAtFFFACg0tJRQAtFFFABS0lFABRRRQAtFJRQAtFJS0AFGKKWgAoxRRQAtFFFABRRRzQAc0UtJQAUlLRQA3FGKdSUANxSU6kNAxM0ZpKSmA7NLmmZozQBJmimZozQIfSUmaM0DFpCKKKBDMUYp2KTFACUuaTFJigB4anZFRYNHNMCXIpjorDkUnNGaAKU9qyZeI4PpTba43LsfAcdRV88is+5tiW3pww6GmBFK/78HuDV4GseWUidGbg5wwrVVsqKJATKaeKiU08VIEgNKKYDThwKYB1NS9qiXrUgoAWlJopO9ACig9KKRulMRXP36nTpVf+KrCUgJRTWFKKU0ARGjtTjTTTASkNLSGgCOQZWqh4NXSOKqyrg5oAYelc9qa7Lr610Gax9YQ5R/woew0ZeaXNNoFZlDwaUGmZpQaAH5pwNMpRSAeKWmilFADqWm5paYh1FJRQA6jmkopAa9JS0lIAoopKAFpKKKACiiigYlFFJQAtJRRQAUUlHagAooooAKSikoAWrVvGQMmqeatW04Y7DwaaEy1SZpW7U01YAaTNJmkzQBHcruiJ9OaiiOVqyw3KRVSP5WK+lMCQ0macTTDSATinxHD4qLpzTlOJBSYy6DUi1EKkWkIeKeKYKcKAHU6minUxCilFJS5oAWlpM0tABRRRQAUuKKKAEpaMUUAFFHWigAoo4ooAWiiloASloxiloASiilxQAUGjFGKAClpMUUALSUtFACUUc0UAFJS0lABSHpS0h6UANNNNPxSEUxjDSZpxFNIoAM0ZpKSgBwNLuplGaAJA1LmogaUNQBJmjNMzS54oAdQRTc0uaBBijFGaM0wCijNGaAEprDIp+abQBkahbB1z3qa0ctbLnqODVmdAymqFufLmeM9DyKYF9TUgNQIeamBpAPzTieKYDlqf3oAeg4p9NHApQaAHUUUUALTXPy06o5OBTEQqctVhKrJ96rS0hjxS0gpaBDSKaaeaYaAG0hFLQaYDDUMy5Bqc1HIMigCketU9STfaN6jmrzjBNQSjdG6nuKAOXBpc0MNrkehpM1mWOFLTRRQA+nCmCnCkA+lpmadmmA6lpo6UoNIB1FJ1paBC0uaQUZoA2KSiikAlFFFABRSUUDFpKKKADvSUUUAJRRRQAUUlFAB2oNGaSgApCaKQ0DDNICdwI60lPgG+dQelAGioYKu7rig1LxiomHoa0JG0lITzSZoAcDVeYbZQw71Lmkddy4oAZnIphoU0pxQMjbJpwPQ000KcgikwL6nIFSLUEJygqdaQh4p4pgpwoAcKdTRTqYhRTqaKWgBaWgUUDFxRiiigAxS4oooEFFFFABRRQKAAilApO9OFACUtFGKACjFLiigAooooAKKWigAooooATNFLRigBKKMUUAFJS0UAJSUtFACUmKWimA3FIRT6TFAyMikxUhFNxQBGRSVJikK0AMpM08im4oAAaXNNxRigB2aXdUeaXNAEmaM1HmjNMB+aXNMzRmgQ/NJTd1GaAEcZFZt0pRxIvUVok5qtOu5TTASN8gEdDUyms+3faTGe3Iq6hyKQydD1p461HH92pFoESilFMBpwoAdThTaXrQA6opulSVDMaYhkf3qsrVaPrVlaQx4paAKcKBDcUxlqWmmmIiHSgigjBpT0oAZjmmMuQakNN70wKcy4Oart1q5MOTVR+lAzmbtdl047ZqDNW9SXbeN7jNVKze5SHZoFNzQDSGPFOBpgNKDSAkHSnDpTAadTAd2pe1NzSikA7NLTRS0AOo5pKKBGzSUtJSAKSiigAooooGFJS0lAAaSikNACmkzRRQAUUlFABSZoopDCmmlNJQAhOKuWcWF3nv0qlWlbOGgA7iqQmSscVEWyaVuajKmtCRx96b9KaSwpoYE80DHGkDUue3WkK55H5UgGMvcU3NO3YODSEAjimBGaRThqHDDtUDOVNKwzTgPy496sKap2rhhn15q4pqRDxTxTB1p4oAcKcKaKdTEKKdTRThQAopaQUUALRRRQAtBpKKAFpKWigApaSigBRRQKWgAoopaACgUUtABRRRigAooooAKKKKACiiigAooooASiiigBKKWkpgJRilo7UANopaKAG0mKdRQA3FJTqMCgBlJT8UhFADKQ0/FIRQBGRSYp5FIRTAbSU4immgYUZoNNzQIdmjNNzSZoAdmoZDwaeTUbjIpjM+bKOHHUVchkDKCOhqKSPNRRsYmx27UAaiHC1IpqBGBQGpVNIRMKdUQNSDpQA8U6mZpQaAH9qrzHmpieKrSHLUxD4hzVlarx9Ksr0pAOBpwpKKBC0h6UZqOSeKMZeRVHuaB2FIptUJtc06HIa6j/AAOaoy+K9MTpIzfRaOZIpU5vZG21Rniuel8Z6enRZW/4DVRvHdkP+WEppc8e5fsKnY6iXkZqo69aw4/HGmyNtdZI89yOK1LfULa9jElvKrr7Gmpp7EypyjujM1eH7kg+hrJrodQTfbOPTmudpSEh1AptLmpGOpwplKDSAkFOFMBpwoAfmlFNFLQA6lptLQA4UtNFFMRtUlLRUgJRRSUALSUUUAFJS0hoGFJRQaACkoooAKSiikMKSlpKAEJpKWmmgBCaTzXi+42KR+OarTuAhHc8Ck3YqKu7FuLV13FZePer8dxHKMqwP0rmmXjpVcPLC+6Nyv0NZxrtbm8sOnsdjgGmNGK5+DXJIiFnXcPUVq2+pQXA+SQE+ldEakZGEqUokzAoaTzOKkyrDrUMiHqKszFznryKQkDpVcuy9ab5/rQMuBhjnpTXWJh0qobgHgHFHmDH3qALlvtR9q9KvLWNDcYuUGeCcVsLUMCUU4UwU8UCHinCminCmIUUopBS0ALS0lGaAHUUlLQAUUUUALRSUUALS0lLQAUtJS0ALRRRQAUtFFABRRRQAtFFFABSd6WigApKWigBKKWkpgFJS0lAB2ooooASiiigBKKXFJQAUlLSUAFJmg0hoAM0maCaTNAATSE0U2gAzTc0tGKYDSaQ0/bRtoAjpMGpttKEoAg2ml2E1Y8ulCCgCuI6Qx1a2io3ApgUZExVOVa0ZTxVCY8E0DH2k4dWTPK1cRuK5yK6+z3oJ+6eDW/GwKgg8UmBZBqQGoAalBoESCniowadnigBWbiqxB3VOaj43UxD06VYU8VACAMmszUNbS3Bjgw0nr2FS2luVGDk7I2JbmKBS0jhQPU1i3fiiCIlYEMh9egrnbm6muX3TSEk9u1Vsbh71hKt2O2nhF9ovXfiDULnIEgiU9kHP51kTPLISZHdz7nNTlfamlaxdRs7IU4xWiKJXjpSBeORVww7gcUCIKMVDbZZnvGTVdrbJ6da1XjJBqIx5Gam5JkPZnBqO1u7zR7kTW7HZ/EnYitoxjoailtlYciqjJpmctdzptN1iHVrMSKeSMMvoaz5V2SMPesHTopbDVQYs+XIPmHvW9K+9y3rXbGV0edUgoy0GUtNopmY4GnCmU4GkA8GnZpmacDQA/NOBpgNOFADqWm5p1Ah1FIKKANukoopAFJRRQAUUUhoGFFFJQAUlLSUAFJRRQAUUUlIYUlLSE0AJSGlNNNAxkpwtUJG3SY9KuTc98VQXucd6yqvQ3oRu7khXio2i9alTk8dKkK561zo6WUGgBqtJblWymQfUVrFBTHiGKdxFGLU721OC3mL71fh8RQthZlKH9KqSxDpiqc0CkdKuNWSJdGMjpFvLa4XKSKfxprqDXINEUOVJU+xqWK8u4+FmY/73NbRxHdGTw/Y6NlqJtwrLXVZ1A3xq30qQaymPmhYVoqsWZulJF5GYTI3owrqEOea4j+2IBzsf8q7O2cSQRuOjKDVcyexnKLW5ZHWng1GtPFBA8U6mCnimIUUtIKUUAOopKWgYtLmk4ooELR2pKKAFoxSUooAWlFNpaAFpaTNLQAtLSUtABilpKKAFxRRRQAUYoooAKMUUUAFFFFMAxSUuaKAEoo60UAFJS0lABSGlpKACkpaaaACkpaSgBDSU7FGKAGYoxT8UbaYEeKMVLspQtAEW2l2VME9qXbQBDspdlTbaMUARBKdtp1JxQITFIRSk4qNmxQApOKgkbFK71AxJpjI5DmqVx0xV1hmqdyOGx2FAzCuVyxrR0i9LD7PIfmH3aqSrVRXME6yKcFTTZVjsFNSqarQv5kauOhGasJj1qSCYGnqR3qNW7U7IFAhXPFRr60jksahu5xbwMxPQUNjSuyjq2oGJfJiPzt1PpXPfMWNWHJmkZ2PJo8v2riqVOZnp0YKESv5eTzS7OMVZEWad5fqKxub3Khj4qPZnIxV0xgCotnznFFykyuEAODSsox0qV1GKiHORmkMrydai281NOCoBFRnBHvQKxE33sUh6UpznNITQS0JGP3w56VazxVNCVlBNWQMGuyi9Dz66tIfmjNJRmtTnHUoNMzTgaQyQGnA1GKeDQA8U7NMFOFAh1LTc4pc0APzRmm0tMDcpKKKkQUlHaigYUUUlABRRSUAFJmg0UAFFJRQAUUUlIYUlLSUAIaaTSmmMaBleeTERx1PFV1+UYp1w+ZgtNziuWq7s7aMbRJYxgU8dTUW7kc1Ju9qzTLaFpjE44p5PFRP0pgV2bLVHIARTn4NMJzSKKcqZqvjHFXJRxUAXPNUAwDimsmalIxUbHmmiWQuAK9A0xt2m2x/2BXAORmu50Rt2k25z0XFb0tzmrrQ1RTxTBTga3OUeKdTQaWmIcKdTM04UAOFLTRS0DFpaQGloEFFFFABRRRQAuKWkpaAFpaSloAWikFLQAtLSUUALRRRQAUUtFABiiiigApKWimAlFFFABSUtFACUUYooASiloxQA2jFOxRigBuKMU/FLigCPFLtqTFGKAGBaXbT8UCgBm2lxxTqKAExxRiijNAhCaQmgmmFqYCk0wtSFqjZsmgYrPUTOTSnJNAWgCPBoK1MFo20wKrCqs4xEx9avTEAVn3b4VV/GgaMqfuKz5eTV6Y5JqlIOtBaNbRrzchgc/Mv3fpWyrVxccjRSrIvBU5rrLWYTwrIvcUiZLqXgxNPHNRIMmpiyouSaZI0jaNxrndTu/tM/lIcop5PqatalqhcmC3OT0LDtWfDDjrXNWqdEdVGnb3mEcfqKmWOpAoorlOpMZsGKawwKlI496QjNSUmQFRjioW96suuarvnaRSZpEiIz0NRsnHvUgBGAaZICGFIsryKWQg1Aw+WrbjPPrVV0K8dqAK7HacUwthqkeoSSO1Mhi5yRVys8tg4q6hLKD7V1UGcWJWzH0ZopK6DkFzThTM8UopASA04GmA04GgB4NOFMBp1Ax+aXNMBpwoEOBpfwpop1MDcpKWkqRBRRSUDCiikoADR0ooNACUlLSUAFFFJSGgooooASkNLSGgBCagmbb9alY4BqpcnjdnpSZS1ZUZw05an9RUCcDJNSBsjNcUndnpRVkORiWxxxU27ioEBZuKnIwBSQNCglqQnIpQBjIpjjDcHrVEkTrUDLx1qyx496rvxQBXfpzUeRVhxu4qsyleaYCEZFRuMDJpxNRu3FUhMhcjOa7fw8d2jw+2RXDMa7fw2f+JNF9TWtLc56/wm0KeKjFPFdByDxTqYKdTEOFLTRTs0AOFLTaWgB1FJS0AFFFFABS/jSUUALS0gpaAFpaSlzQAtLTaUUAKKUUmaWgBaWm0tAC5ozRRQAUUZooAKKKKYBSUtFACUtFFACUUtFABijFFLQAlGKWloATFLjFFLQAlFLSUALRSUmaBC5xSZozTSaBgTTSaCaYaYAW96aTRijHNADDRtqQLS4oAjC807bTsc0hoAaeKYzcGnM2Kru9MCKUlmAqhd8ykelX8ZcVUuE+djQNGTMtU5BWjOuRVCRTk0iyqRxWzolyFV4mOMciskimgEHg4pA9Tp59WggGA25vRay57+5vDjJjj9AeTVCHGcGrScGsKknsjanCO5NFGqVZXpUCHNTKDXObkpHHFIFxzTgAKXjFIExm2kPtTjSc4qWWmQk8kd6hYZFTyDv1qHPPSpZpEhcBhjvUTqTwamIyc9KGHGDUmiZVfIFVpSeRViTOT6VBIM9DQMpbiwI9DTCOetTMoBJqDOWqkRJgRirUR/drUBH41LEf3f41vQ3OTEL3SWikozXUcQUoNJS0APB4pw6VGKcDQMkBp1Rg0/NAh4pc0wU6gB4paYKd+NAG7RRSUhBRRRQAUlFFAwpKKDQAlFFJQAUZpKWkMKSiigBKQ0ppDQAyTG01nXT4jHucVdnbaKyrl97KD9aio7I1pK8hgGepp6g+tR46VMvy4riPRJEOCKlyCahBwKeg5ye9NCY8cscdKG5GDQq4BPvTTyeKohiEetQyDnNTc/jUT85FMRAw5qN8YxUpGaiYUwIGFQuMA1O/FVpDTQiBhkE5ruPDvGjQ/U1w7ng12/hz/kCw/U1tT3OevsbIp4qMU8Vuco8U6mCnCmA8UopopRQIdThTRSigBwopKKAFzS02loAWiiigBaWkyaUUAKKWm0tAC0opAaKAHUUUUALS0lFAC0uaSigB1FJmjNAC0UUUAJS0UUwDFJS0UAJSgUUUAApaSloAKKKKACijFFABRSUlAC5pCaKbQAZpKWkxTAQ03rTsUuKAG4o207FFACYpKWkzQIQnBpjNQzc1C7UDEd6iPJpCSTShTmmAqjDVXnGc1axgH1quVJzmgaMyReKoyoa05E+ZhVOVeKRSKBWmFanZeoqNhSKIuhzVoNlQaqvxUlu+7Kms6kboum7Oxej7VaU8VVj61YXiuRnQS0Z4pB0oNJjQ1jzTsnFNbpR6VNy0hjAc1E3PQc1M3Bz2qNwOoPNSy0VycqR0NIOeO9Occ5zTcAd6ksrSnnpVZ+Aeaty85qpIKRRUm6ZqvEMkmp5+BTYhkVRHUcRxToPun60bcZ96IeGat6L94wxC9wl96Sg0V2HnhnilFNpRSAcKcKYDTwaAHU4c0zNOFAD6cKZmnCgBwp1MBpaAOgpM8UUUhBRSUUDCkpaQ9aACkpaSgApKKSgAooooGgpKXvSUgENIaU0h4FAFa4+Y89B2rIlfdO3txWnOSAze1ZQYE59awrPQ6sOtbikndmp0JIqJeetSBvlx3rmOwlyBUievaqpJUe9TRFiozTQmTZqMnBz2p56ZqFuuKpEDgajfrmn44FMc5piIj0qJ6lYYqF+lUBC7cVWkPy1PJjFQN05piZWduK7jw2f+JLFznk1wkvX2rt/C5zoiY/vGtae5z1vhN0U8VGKeK3OUeKcDTBThTAeDS00UtADxS00UtAhwpabSigBaWkooAdRSUtAxaKSloAWlFNpRQIWlzSUtAC0tNAp1AC0UlLQAtFJS0AFLSUUwFooooAWikooAWikpaACgUUUAFFFFABS0lFAC0lFFACUUtJQAlFLRQAmKTFLRimAlGKXFFACUhoNNJoACcVGxoLVGxoAazcmoicmn0oWmA1Vp+3FPAoY4FADOxqFjipc5Umq7mmBUlHzE1Sl6GrspqhM1ItFSThqhenuck1HJwuaRRBIcUsJw4NRv8AeqSFeaTA1IjxVhfSq8Q+QVZT1NcUtzpWw+kJpCcGmMwHSs2aRQq5JyaM857U3cQM07g/SoNbCSHjjkVCx4xUrAFTUBGOtJlREwMUwnCkU48ComJ/+tUjIpBxk9KryDgkVZblfaq0hGDQMoTAs3NOjUClYZPFPRfl96okQikj+81Kc0kefmNbUV7xjiH7g89aTNBpK7TzgpaSgUgH9qUGm0tAD804UynUAPBpwNMBpwoAcKdTBS4oA6GiikpCCiikoGLSUUUAFJRRQAlJSmkoAKSiigYUUUlIANMY8GnVDM20c9KBlK5l2oyZ56VQwBirN2RtBPUmqy89a5Kz1O6grRuOU/NT26fzpgI6d6MnBHWsTccp3tkmrHaq8a44qUHJNUhMlVsjApjcMaVDtprHOapEsM4pjnmjIIphPNUiRGPFQscipXOagemgIJCKgc1LJxUDGqIZWmOBXZ+EmB0bHpIa4qc12Hg5s6XKPSStIbmVX4TpVp4pgp4rc5BwpwpopwpgOFOFNFKKAHUoNIKUUCFpaTNKKAFzS02lFADqWm0tAC0tJS0DClFJS0CFyKWm0tADgaKSlFAC0ZpKWgBaKSlxTAKWkooAWiiigBaKSloAKWkooAWkoooAXiikpaACikooAWikooAKKKKACkoozTAKKM0lACk00mg00mgAJqNjQxptACE0w9aeaZjmmAAU8DFAFLmgBeBUEjE8CpGaoSwoAUnbEM1Vds1YkUsBzxioGSmBTlyaqSIW7VpNFTDEKRSZl/Z+eaq3hC4UVqXBCKTWHNJ5kppMojIyaswrUSLz7VciTGKQy1HwoqQMAPemDAxRkVxT3OqKHE1CWJcCnscjNIF5rFm8UKWzUmPlqLABxSg471JQvK9eRTWwR7U4nI5NNxjvQNET8CoiNy5AqaQAioi2BSGQgdqglHJNTtnqagkBz1pAVsDJGKM4NPI6io84PNUgGt7UR/dNJIcUsf3K6KO5y4l+6KaSlNJXWcIdaBikooAeKdTOlOBoAcKdTQadnikA4U4UynUAOFOHSmCloA6OkoopCEooooGFJmlpKACkNLSUAJRRSUAFFFJSGFFFJQAGq12MxirBqC5YCPB70DRizOzSYJyB0oHQGkc5lbA4pwxiuKpuejT+ETPPBp6kY4qMsATRvI5FZmpPuC8dzSICSeeKi3knPepVORmqRLHq2XwKcDnk9KiUfKTnkml7Y9KpEgw4JpmeKcWyKZmqQhjHioXNSscjNQyVRJBIarOeKsP0zVRzxTRLIJm4FdZ4Kb/Qrgf7Yrj5jxXXeCxttJ/dga0huY1fhOsFPFMWnitzlHCnimCnCmA4UopBS0ALTgaaKUUAOpabmnZoELS0gpaAFpaSloAUUtJRQMWlpKWgBaKSloELRSCloAWlptLTAWlptLQAtFJRQAtFFGaAFopKWgAzRRmigAooo5oAXNGaSigBc0ZpM0UAFFFFABmiiigAooopiDFIelLTCaBiM1Rk0403FADTSU40lADTQBzQetKopgOxTGNOJ4qI8mgBrEmlSPIyaXbmpB0xQBHJ2ApNgIqYrkCkIxTEV3QYqvIABVxulZ91JsU80DMjU5wikA81koMnJqa7kM9wcdBT4o+KlmqWg6NKtKuBTUTFS44qXsNbjk5ppGc07ovFNY+lcMzrgLng0pI7UwDC460uelYs3Q8c8mmscHijdjimk5HFAxwHNJn5uOlJuK+49aaCc57GkA2TpUB+97VO54IqFl6UDGuMVC/A6c1O3TFRutAFVvlOfWoyamcc81A1NCZDIakUfIPpUchyak7V10EceJewlFHek5roOQWikzQKQDxS00UooAeKUU0U4UAOzmlFNzTs8UAOpaaKd+NAHR0lFFIQUlLSUDCiiigBKQ0tIaAEooooASiiikMSjtRSUAJVS555zgCrTdKpXbfuj6ik9io7mV95jTuaap9utPGcVwvc9GOwzbk57U9VzzTMsTtqQbgAKRoOVB1NP/Cmq3Y8YpwYHknimiWJtyc+lOIAFNyc/WlPH41aJGN0yKZnilz1FMPFMTGs3FQOe1Sv2qF+tUiGQv8ApVWSrDmqkpwCaokqynJrsfCJ2rKn+yK4378oHvXXeFHzdTj/AGa0gY1XodetPFRrUgrY5h9OFMFOFMBwpwpgpaAH0opopRQA7tSikpRQAtLSUtAhaUU2nUALS0gpRQAtApM0ooAWlFIKWgApaSlpgFLSUtABRRS0AFFFFABmiiigApaSloAKKKM0AKKKTNLQAYoopaAEooIpKAFopKWmAUZpKKAFpM0UmaAFphFOpKAGkU3FSYppFADCKQinkUmKYDMc0dKdikoAYTSAc08ilC0ACr7U7gUtITQIaTxTM5p46GkNAEL9KwdSnJYqtbkzYU1hyw7pWJHemNGVHAS2SKuLHgdKm8sLTWYCpZrcTGKcvBqLfk0/BMZrOb0KgtRHOTgHikL7TijoMd6iIJf3rhmdkESjuc0ZGQaAPamk4OMVkbIkJBHHWmqeeTxTgMde9LtFAxcjFRg8nn6UpHFMAJY+1ABIM4NRsflPFPbI4NMYEjikBGeQPXvTHPNSMMCoXJzjFAED8HrULj0qZx1qF+BVIlld87gKlqPGZB7VJXbRWhw4h+8JSGikrY5wpRSUUgHUtNBpwoGOzThTBThTEOp1NzzS0gHilzTKcOlAHSUUUlIAoopKAFpCaWkoAKQ9aKTvQAUlFFABSUd6KQwpKKTtQAhrNv5NqkevFaLfdOax9RbgAdM1M3oXTV5IgHrS7s+1MT5RzRIwC5rhZ6SFY46U9eRUMZJPIqboM0FCMQox609TkdKQqMZpoJHf6VSJZMvWmscZzSg4NMlO4HFUSRg560hNNXgc0E8U0SxjnioXPFSMeKruaohkch4qjM1W5D8tUZDziqQhI/vbq6Pwm/8AxMnGeqVzq/dre8LMF1UA91NaxRzTd2d2KeKjXpUgrUxHinCmCnCmA4UoNIKWgBQaUUgpRQA4UtNpaAHClFIKWgQtLSUtAC0tJS0ALQKQUtAC0tIKUUwFpaSloAKKKKAFooooAWikpaACl70maKAFopKKAFopKKAFpabRmgB1LTc0uaAFpKWigBMUlLijFMBpooxSUAGaM0hpKAHZozTM0ZoAfRTA1OBoAMUhpc0UwGYoxTqKAG4opaSgANNpxpMUAA5pjnAp461WuHwcUxEE0nWqEnDZqaRyTVOaTAoKRHPIF6VULlqbK7O+KkjhJHNQzQWNc81Pj5KCoVeKaxwmB1NZVHZGlNakQJJPFKB0oKleetHO0HFcUjsiOJ2k1GCpfrQzkjgc0gIyDUM1RJvwQKcXwAcU3GTkUp5GKAHfe6Uxjg4p4GOe1Rv97PYUhCNyOaZnFSMpxkc1EG55FIBhcNxUTrzmpiV64qCQknINMZC45qu/tVlmyOetVpD6VSJZEmTIT7VIahU/OakrupfCedW+ISjPFFJWhkFHtR3opAOBpQaaKUUwH0oNNzSigB9LTaXOKQDgacMU0UvFAHTUlFFIQUhoooGFBpKKACkJoJpKACkoooAKSlpKBhSUUlAEczbYzz7Vi3xO5Rmta6J8okc45ArGuABMMdcVlU+E2o/EMz0FLjJ9qFU5NPC4HNcZ3oPu80oy2KMgnHWgsAcUFCucnH50nUg0uOffNBU9qpEMkxnk1HwQaeG5PpUT9eKpEjSOTUT0/PWomaqIZGxOOagZs1KxquxxVEkMrVUPzNU8rZqGPliapEydkPI7VreHm2axCT34rK61oaS2zU7ds/xCtjmPRVqQVCp4qUVZmPFOFMFOFMB2aUU2loAeKWm0ooAdSikoFAD6Wm06gQtKKSigB2KWmg06gApaTilpgLSikpaAFopKWgBaKSloAWikpaACiiigBaKSloAKKKKACijNJTAM0UUlAC5pc02jNADwadmos0u6gCSj8aZupQaAFxSEU7NJQIZikp5FJigYwimmn4pMUAMozQRTTQA/dS7qjpc0wJM0UwGlzQAtJijNFAgooooAToRVO4U76tGopx3pgZsiGqU8TN0rVYA1XkApspGYlttOT1qXGKkdhVeSTjisyxJH7U3q2ah3b5QKnbA4H1rCqzekgJzmmqNwpCfelBwMVyM64gFwc1Hg7zipCwwaaoLDNQzRDxnGadjP1puducdKVGzQIRs4PJqME5wakY4H17VEw+akA/8AgxUZBFS8hBUTN1oAhkz1qI578VMzhuKifOKBkLdaqXBKHjpVt+mKqy8iqREiGMdWqUmo4zgn0zUhrvp/CedU+JiUmaKQ1ZmFFJS0gFpQab2pRTAfTgaYKdSAdmlpBS5oAcDS5ptFAHUUlLSGkAUlHaigAoopKACkNFIaACkpe9J3oAKDRSUAFJRSGgZDOwVDnmsaXmc7utbM6nZnNYtwT5xLdayq/Cb0PiE3hTzS5JFRAc881KCB7VxnchRkc4zSY6k9adnJA7UpBPSgYi09qbggc03qx9KpEsd0UmozwKez4XFRnpVIhjDxmoHPNSseKhYg1aJZExNV3NTMRVeQ45pklaU805Fwg96YfmcCpscVpFGVR9AAqzaELdREnADCoAKlTgg+hrQxPSIm3IpB6ipgao2Em+0hb1UVdU1SM2SCnCmA04VQDqUU0UooAfSim0ooEOFLSClFAx9LTQadQIWiiigBaXFJS0ALS0lKKYC0tJRQAtLSUtAC0daTNLQAtFJS0AFFFFABS0lFAC0UUUAGKSlopgNop1IaAG0UtJQAlFBpKAFzTg1R0ZxQBMDS5qHfTg9AEuaMUwNShqBC4pNtLmigBhFMK1NTSKAIcUnepitNK0wI6M0pWkxQMXNLmmUZoAkzSZpuaM0ABNQy5KipDUcn+rpoRVc4qnM+AasSnArPnahlLchkfPeqztUjc1Ew4rM0CHmb8KsN96obfiQn2qU/ernq7nRS2GEfPxSodxOe1GPmzR0+tcrOlCiPnr1p2MHikB5608feyKksac85FOVe1DcmlU47UCBgOlRsMDmpHYdRUTPuFIBf4fWoiCRyKkJ2j1qMuADnvQMhIwcA8VFIMGpcjcKbJjNAyrJxk5qq/HSrU3Aqm+cZNXEiRHGw34zyTUxquuCw9etTmu+Hwnmz+IDTaWkNUQFJRQKAFpw6U2lFADhTqZmnUAPpaZTqQDgaXik70tMDp6KKSpAKSlpKACkNLSGgANIaDSUAFFFIaACiikoGFJS0lAEUzDZg96xbhQZ25zita6PyjFZEhzIxrGrsb0F7wg4pxG6m4wKeOOc1ynchAMGng8VGxJ6dKUNgigZK2CKhY4BNK5yPc1G4wBTRDHHlKjJ3HNODDFRsQM4q0SxjkY4qA5p7k44qJjgVSIZFI2ARVWRjip3OarOeapEtixLyTUmKFXaoFOArZLQ55O7FAqRRzTQKlQUyTsdEk36dH/snFay1geHn/wBGkT0bNbymqRDJBTxTBThVCHilFNBpRQA8UopopwoAUUtJSigBwp2aYKeKBC5paSlpgLS0gpRQAtKKQUtACjrS0lAoAUUtIKUUAFLRRQAuKMUUUAFFBooAKBSd6WgBaWkozQAtLSUooAMCkxS5peKAGbaaRUhFNIpgMpCM0/FIRQAzFNIqTFNIoAbSZp2KTFAADTg1RkUZoAmDU4NVfdTg1AE4NGaiD8daUNQIkoIpgal3UwDbTSlPzSGgCMr7U0pU1NIoAixSVIRTStAxhNRuflNSkVE3ANNCKEtZ8wzWhMetZ0x5okXEhYVEwqRjULnvWZY6HkmpSwIqGBuWzTpMrz2Nc1V6nTT2HZx1oZcjI60xRkZPSpR93oK5WdKGK2frUoxtznmoGwGHrT1Y45qSiSnD7tR9cYqQD5aBCH86gK8k56VKQaYV96BkLSEHnpTScipDGB70m3bQBXbI+lNZsCpGYGoJSMcdaAIJmODiq0jfJViTdiqUp28HmtIkT2G25BdgRyKsmq0K/vmPtVg13x2PNluFJ2opDTJEpRwaSgUAL0pRSUooAdTqZSikA+nCmU4ZoAdS03vS80wOppKKKkBKKDSUAFJS0lABSGikoAKKDRQAUlFFAxKSlpKAK9zxGT1rHb/Wtmti4ICjPSsaQ5djnHNY1tjow+48cihl5pi5GaeSWGBXKdqG8k8UoIQcmjaRTXXjJoGOPPP5UxuSPQUivu4B+tScA1RDIuOe1RMRzUr/AHjVd+M1SIYxm4qCRuKkY1Xc9apEsiduKZENz5PQUjGpo02pz1NaRRlN2Q40oFGKcBWpgKBUyio1FTKKANzw+2JJV9QDXSLXMaG226IPda6ZDVIlkop4qNaeKokeKUUgpRQA4UtIKUUAOFLTRSigQ6nCmU6mA4UtIKUUAKKWiigBaWkpaAFpaSlFAC0opBS0ALRikFOoAKMUUUAJS0GigBKKKSgBaUU3NGaYD6UGm5paAFzThTBS5oAdQaTNLQAmKTFOooERkUhFSEUhoAiIpMVLim4oAjIpu2pStJtoAixikqQrSYpjGUucUpFJigA3U7dTMUUCJN1KGqLNG6gCbNGai3UbqAJM0hxTN1BamApxUMhpzGonNCAoT8E1nSHmr122GOKzJG5pSLiNdhVd2pzNUTtioLJYOQ5pzbiACeBTLf7jGpMBs81y1dzqpbDuduKcFJyM5pFIpckYGK5mdCEKjoaUD5acMFeaTIC81JRIoyAfSnE547VHnOMd6kxnigQ3APfrTGU496kPy8UmaYityGwetIR709/mPFV3LDg9aCtxGQEGqjMFbFWHZtvSqzxMW3fpQA1zkdaz5jzjt2q7INq5qhMcv04rWC1MajsiWE9eKl71FACFz61Ka7jzhDTe1LSGgBO1KKKTvQA6ikzS0gHA0oNNFLQA8UopuaUGgBwpeKQU6mB1FJS0lSAlFFIaACkpTSUAFJRSUAFFFJQAUZopKAFpM0UlAytdNhenasjqTn1rTvmIAHrWWeeRXPWZ1YdbjyMjigKc9aZhsZXpUiE+nNc51oXGB70xvrUpbOKbhQeaAIBHsYsMjNOZtoqViCMCoOjYPpVEsY7dzUDnIzUz5qtIapEMjY9cVWdsCpXbiq7nJrRGbERd7gVZIpkK7U3HqakrSKMJu7AClAoAp4FUQKoqdRUaiplFMC/pbbL2P34rqY+grk7Q7LhG9DXVxH5BTRLJ1NPFRipBVEjhThTRSimA4UtIKWgBwpabS0CHU4UwU4UwHilpoNOoAWlFJSigBRS0lLQAopaSloAXNLTRSigBe1LSUtADs0UlOoAMUhFOpDQA3FJTiKQimA2ilpKAClzSUUALmlzTaWgBwNOzTKXNAD80U3NGaBDulFFFACEUmKdSUANxSYp9JQA3bSbafTaAGlabtqSkxTAj20hWpMUmKAI9tNK1NikIoAixSdKkIppFADM0maUimmmAhNQucink1DI2BTAzrs1muav3jYA96zXbJqJGkdhrGoWNOY1ExqSixbN8j08tgc96gtmwG+tWAMEZ79q5Ku51Uth6cU5jlgAKZ24pwOCD2rnZ0IcAcY607rx0pOmaUEHkVIxv3DUyNnk1Hjd9KRR8xHOKBEueDxUW4AkEEU/7o5P400HJJ60wG7sVEwGc1KxHPSoOpODQNEbGoHzjmpnPHSoJSGXg0ICnOxwSKz5DlueDV+XhSKoYy5PvXRSV2c9Z2RcjGEApTSJwozQa6zhA0hNFJQAUUnakoAdSjpSClFIBwpRTadQAtKKSlpgO70v402lyKQHVUlFFIApKKQ0ABpM0tJQAlBoooAKSiigApKKKAEzRRSHpQMzr9gNxJ7VQQ5HFWNQcMSvfNVlBArmrPU7KC0H4YDqMVIhyKhyR2604KyqWGKwOlEmF/GoycnkUze5OSOaeAX5IpgxwIzUUhw2adwDTH5OKaIZDI1VZGqxJiqcrc1aRDImao1Xe4HahjU8CbUyeprWKMZysh+BRilxQK0MBQKeBTRUijmgByiplFMUVKBTAmi4YH3rrIT+6T6VyiDla6mEYjQewpollhakFRg1IDVEjhTqYKcKYDhTqaKWgB1LTRS0CFp4plOFMBwpwptOBoAdSim0tADhRSA0tACilFJSg0AKKUUlKKAFpaSloAUU4U0UtADqWminCgBKQinUhFADKSnkU00wG0UtJQAUZopKAFzRmikoAcGpc0yloAkBozTMmlFAh+aO9NzRQAtFFJmgAo60UUAJRRRTASiikJoAKTNBNIaAENNpSaaTTADTSKM01nwKAGOOKqTHANTySVRnfIpgZ98/IHtWczVZvX/emqRPFRI0jsIzVExzzTieaYfpUlE9p95j2q0MnkVWs+d4qeN8dR3rkq7nVS2JValPIxik2g84FKue3SuZnQODDGKcVx0qDqxxU4bpSGOAxyKRc804nHIoH3c0xDTyPamlecDigHDn0odcjINAFd1OeWpgbnFOkUkHk0zGU47UFDZDkGqcjYb+lWJCRVVz1JoQmV5SQvXrUESguD1p0r5GKZBneeuK66KOKuy0TTTSk80hroOYSmmlPFJQIKSikoGPFFIKXtQA7PFLTR0pe1ADqXPNNp1ADgaWmilzSA6o0maKSkAUlFFABSUUGgBKKKKAEpaSigApKKKAA0h4FFNYhV56UAY10P3xz3OaYrLjBqW4YPJntUQUda5KnxHoUlaI5tmBt6012YgAUjKAM5pyAdetZGxGGOPmFODgcL1p7xlx7VD5WAOcGgTHN9eajJwaXBBOTULHBJq0SyKV+apSnmrEzYFVGOa0RkwjTzHA/OrfTimQJsTJ6mn1tFWOaTuwpRRQBVEjgKkWmLUqigB6ipVFMAqUUASwjMqD1NdQvGB7VzdqubmP610YPzU0SydakFRLUoqiRwp1NFKKYDqUU0UtAD+1GaaKKYh9KDTAacKAHjrTxUYp4NADgaUU0GloAeDS03NKKAHUtNp1ACijNJS0ALS00UtADqdmmUooAfThTAacKAHUlFLQA0im4qSm4pgMNNp5ptACUUUUAFFJRmgBaM0lGKAFpc02lzQIXNLmm0tAC0ZpKKAFzRSUZoAU0lGaSmAtIaM00mgAJppNBNMJoAUmmE0E1GWpgKze9RO/FDNUTmmBHI5qnK3OKsO3Wqbt1PoKBmXctukb61WY1LIcuTUZGazZoiM5pD0NSbaaycE0gJLI43EVODljUNovDGpRlXNclXc7KWxMpFSLz0qFcE9am5FczNxEXEh9KeSAcEUowR600pu5zigZKo3L7U0sMFR0pUHBGaaVw2expiGqMn2FK2V47Ui8A0Mcj6UARsagOFqdvmX3qqxOSCc0hkUpzzVSZwBip2Y8iqVy3NUkS2Vjln/HpVlF2jOMVUBYMCRxmroYMAa7aSsjhrO8hDRRSGtTEQ0lLTeaQBSUUtABSikpaAF7UopKUdKQDqUUgNHegB1LSUtAHU0dqKSkAUlFFACUUUUAIaKKKACikooAKKKSgAqKc4jPepar3TER4B60DW5ltne2eaQBhQDgnqc09Tx0rjluejBWQhwOvSjgEcU8AHimsmMYNQaDt2RxTHGfanbD1xSNgdaEhMrudvNV5GFWZhuB7VRYkjB6irRDK87ZP0qGJTJIB270+apraPam49WrWK1MJysiQ9OKbinHpSVqc4lOApB0pwFMByipVFMUVIooAeoqYCo1qVetAixZj/SU+tbkbZesS04uFNasDgzYqkJmitSA1EtSA0xDxTqYDThTEOpabS0wHCg0lFAC5pwNMpc0CJAacKjpwoAkzS5poNLQA8GlzTRS5oAdThTRSigB1LmmilpgLS02loAWlBptGaAJAacDUWaeDQBIKWmA07NAhaMUUUANIppp+aQ0AMpDTqQjigBuKKWjFACUUYoxQAlFOxSUwCiiigBaWm0tABRSUUAFJmgmkJoACaaTQTTCaEAE0wmgmo2NMBWPNRk0FqjZ6Bik1E7YoZ6qyzAUwElcc1Snk2wMfXgUsku44H51TuJdxCg/KKARXzSZpGYDvTDIvrWdjQkGM0rkbTUPmgd6Y83HBosBctsAN9ambAIzVW1J2Z96tHHfrXFV3O2lsIeD6U7zCacBkZPSjYOtYM3HRtgjipM9QKI1GaeVB6GiwhiEYJH408kbeenagqOwpgTORQAgPNNducdKUqMUzb8pyaAsRltpwe9VpWwRUz5HBqrIT1zwKAIJ2wKpSyZ47VYmOSeeKqSnAC1cVqRN6BCCxzxirIwBiooMhORUh613RVkedJ3dwpOtLTTVCEzSHrS0lILiE0ZoooAWlpo6UtADhS03mlFADqKQUtADgaKQdaWgDqs0nWikqRC0lFHagYlFFJQAUUUUAFFJRQAZpKWkoAKp3jYjwKuVTvGAUgAc0nsVDVoz1HrUyrleajAJ7YqdBgYxXGz0UIRjikGM+tPZSeaYFwelIsRiTxTWAxzTzj0qN+T8tNEsikA21nzGr7jA+bk1nzYyaaIZUI3yhfU1fwAAB0FVbVN05Y/wirbV0QWhyVHqRmkxTqSrMxOlPFJinAUDHAVKopi1IKAJFGKkFMUVIKYiaE4kBq5aPm4HPeqK8GpbNv9OAoBnRL2qQGolqQVRA8U4UwU6mA4U6mCnCmA6ikzRQAtLTaKBD6cKZS0ASA06oxTxQA+lFNpRQA8GlBpopRQA/NANJRTAdmlpKKAFpKWkNABmng81HQDzQBODTgahVqkBoAkFFIKXNAgpuKdRQAztSU+m4oAbRinUlACUYpaKAExSYp1FADcUYp2KKAG4opaTNMBKSgmmk0AKTimk0hNMY0AKTUbNSE0wmmApNRk0jNUTPTAczVC0lMkmVRkmqM1yzcIMCiwE804XvzWZcXTHO0inBHd+e9RT2TL89VYLlOS4lPG78qrlmPc1ZaPFR7ahoorkGkwaseWT2p62rN2pWGVAhPrUgibGQK0Y7MADNPmREj7UmNEFum1QDUw+99KYhygPvUwHFefUep6FNaDl6kVICMYqMGpcZ7c1kaCoOTjvUvHaoc4OMU4Mc89KBEn8NREEEmnMwApnUFT3pjDGTkGo2HNOI2ZFMY/LxSGQzA7SaoSMcYFXpXymMVUmXIoQmZ0mQx96qks7571ZnO081HCNzdK6KUbs5q0rIsIMIM9aU0e1JXWcYGm0tJQIKaaWkpAFJS0lAxaWkooAWnU0UtADqKSloAd3pabS0AdTRRSVIgooozQAmaKKSgA70UUlAxaSlpKACikooADWZcNlzznmtJjhTWXIQ0pP4VnUehtRV5DVOalBwKiXqRTgSVPbFcp3Ik30m7nmmjIoA9+tBSFYetMAAp5z60xgMZzTJZWmIxWZOck1oTggVmzEge9UjNktkP3bH1NTNSWy7bdffmnGuiOxxy3IzSU40lUSKKcBTRUi0DHLUi0xRUi0CJBTxTVp4pgPFSW4IvI2HrUYqWEhZV+tAM6BelSA1EhyAakFUQSCnCoxTwaYDqUUgpRTAWiiigQtGaSigB1KDTaWgB4NOBpgpRQBIDTxUY4pwNADxSimg04UAOFLTRS0wHUUlLmgBaKKWgBppven00igADU8NUPQ0oagCyDUgNV1apA1AiXPFGaQHIpaAA0006kNADaSnUnFABRSUZoAWkpM0maAHZpM03NNJoAcTTSaQmmk0wFJppalpjECgBCaYxoZ6hZqYDmaomahmqJn7DmmAO4A5NV3lLcLUnlljzUiW9MLlLyWc5NPFqMdKviIClKgVSFcz/IAPSneSG4YVa20bOOlO4jMmsI89KrmyQdq2HUFSDVCVwMis5MtFb7Og6ClISMU2ScKDk1mXF6XJC9KkotzXSqOtZk928rYHSmNljknNIsZLjjvUvYqO5p26EICeasZ6VBExCAfhUyDnmvOk9T0IrQeBk8VIMjGe1Rj5GBp5apLFPXPrQuQeRxTFcjg1LGxIIPOaQhDjAyOaaxx9aeQKay5oGiJ3wOeai3A5qWUcVWbG4YNAyNyAetVZX44qxN3qhcdOKpImTKU0oaQKfWp4hgH0qugBfJH0q2v3a7KUbK5wVpXdhTSUZpD1rUxCk70tNoADSUUlIYUUUCgA96UUlFADu1LTc0tADu1KKYDzinUALmlpKWkB1NFJRQIM0ZopO1IApKKM0DCiijNABRRSUALSUUUARSnANZuc8960plyjfSswfd61jVOmh1FAO48dakUUzNSJjvWB1oc2MZqMfWnNimbTnrSKQE8+1Nc4AxSmP3pGXHSmhMrzZNZFwf3m31rXkz3rLnAMy+uapGUti6o2oq+gprVIajNdSOEYRQBSmigAAqQU0CnrQA5akFMHSpFHFADxTxTRThTAfT0OHBqOnDrnNAHQRnKqfapgaq2z7ol+lWFNUSSg04GowaeKYh1OFNFKKYDqKSloELRSUUALmlzTaKYDwacDTAaXNAEgNOBpgpwoAeDThTBThQA8Glpop2aAFopKWgBwozTc0uaAHUYpM0tADSKjOQamppWgBqtUitUBBBpVc5oAtK1SA1WV6lVqBEtFNBp1ACGmmn00igBuaDSGkzTAM0ZpCaaTQApNJmmk00tQA4mkzTNxozTAVmwKgeSnPk1CVNAAWzTDTsU4Rk0wIiC30pyxVYEQp+0DtTEQiPFO24qXbRtoEREU3YT1qfaBS7aLgQCMUjLgVORVeZtoNAGfcy7ZQoNYs8+Ccmp725xOx9BgVkvvmbpxSkWhkszSEgdKYqE9KtR2pPUVZS2AqCimkBPanhFV8Ve8oBeKrAAP05FRUdomlNXkABB4zipUDA57UhUhgRTtzqBxXns70SD2NSJg8U1ScZ9akXFSUIVGeaUDZ7inP8wpgb+HvTEIWNN3nHTinsCDjFNYgrnuKLDI3ORg96qOhU8GrEr7RiqzsSdxHSgCGVyFIJ5rNuJOSAatzS5yMc1myMS4A9a0grsyqSsh8KnknrVnoBTI12rz1NOruSPPbuwzSUUhpiDNJRSd6QwNJS0lIBDRmiigBetFJS0AL70vSkpaAFopKUGgBwopKWgDqKM0UlSIKKKQ0ALSUUlAxaKSloAKKSigBaSij60ANcBlINZS9/rWq5wh7cVkisaux0Yfdjz9KcvPemg/LSKcGsDsRLgetNYkHIp47Uu0bulIpCDgc1C9TMM9jUZUd6aEyrLwKzZj++Un1rVlUGsy5X5sjsatGU1oXGqM0/8AhBphrpRwjSKSlpBQA4U8U0U8UAPUcVIKjFSLTAeKcKaKcKAHilpBThQBp2EmUx6VeBrIsn2y49RWopzTRJMpqQVCDTwaoRKKUUwGnA0APopuaXNMB2aCaTNFMQtFJmigB1KKZmlzQBIDTgajBpwoAlBpwNRg04GgCQUoNNpaAHUuabS0AOpKM0tABmigimnigB4NLnNRZpQ1MQ4ioiCDUmaQjNAxqtUqvUDDFAakIuK9SBqqK1Sq9AFjOaKjDU/OaAEYVGRUtIVzTEQE0wtUrRmozHQMYTTSaeUNN24pgMzRmnEU00CEpNuacKcBTAaEHpUgXjpTgOKdigBmKXFOxRigQ3FFOxSUAJikNOpDQBG1Z95LtU1elYKpNYlyzSsQKYzPaMyBjjknNKluBzircce3qKeyDGQKTKRWEYWjbUjcUwnFQMjkYKmapIm4kknPtVi4OYiO56VDH8ic9awrPSx0UVrceMqRnJxUqkZyKg3f3iasRjAzj8K4ztRIOmcYoAywOMClHSmuxxgUgJSAo5/Oojt/H1FPJJXB6U3HWgA3E9eaiYAE4NSZ/vUxgM8UAiGQZGapu20EHpVqTO01QkZmwCKEMqXDdSD0qmmS4Y1ZuzxjpUcSDkgV1UY9Tkry0sTg0UmaK6DkE70Gg0lAATSZo70UAJRSUGkMSiiigBQaKQGloAXrS0lLQAtFJS0AKKWkpaAOooopKkQUlFGaACikzRQAtFJS0AFFJRmgYtFJmigCO4bbCx9qzRVy7b5Qvqaq1hVetjroLS4p9KAOaaDzUikVidA8dc4p5wRnvTADThx2oKQMe1RsM1L1ppGKAKjrVC4TINakv3eKpSrkVSJZFE26EH8KGpkR2OyHoeRUhroi7o4JqzI6UUHrRVEDlp4po608UDHinjpTFqQUwHCnimjpSigBwpwpBSigRNA5WUGtSJ896yEODmrcExDYpiNMGng1Cp4zTwaYEoNOBqIGnA0xEuaUGowacDTESZopmaXNMB1GabmloAdmjNNzRQA/NOBqIGng80ASg08GoQaeDQBKDTgajBpwoAkzRmm5pc0CHUUlFADwc0EU2lDUwGlaaal60hWgCLdilElBUUwigB5OajNLnFISKAFDEVIr1BmnK1AFpXqQNVUPxUgegC0GzS5quGp4egRLmkwDSBs0UABQU0pTs0ZoAjMdRmP2qxkUmaYir5ZqVUx1qXikoAbilxS5pKdwExRS0lACUUpppNAB0qNmxQz4FVpJQKACZsqRVTYgFJLOPWqj3GO9UMmkCioRIFOCeDVZ7knvUQkJPJqGUizLhSagLZpzHdGPaoicCoKRFNyyjNCrubNIDvc+1SrwM1y1nqddFWQqoA2CKkVtnBHFNDE44GPWn9V5rnOgN4YVGilXzng07dg4xSnn6ikUOABoIqNmKtkVIjhgDTBoaQce9R5AzUzcciq8y5GRQIimf5cVQk6HHWrbYZcZqlKCqkg00DM+ZmaQ+gqWMfuxiogGZySam6Liu2mrI86rK8gNIaKK0MgpKKQ0hhSdTS5pKAEooOKSkAUgoozQMWgdKSloAXrS0lLSAWgUUUwFpaSlzSA6ikoooEFJRRQAUUlFIBaKSloAKSiigYUdqM0yQ4QkGgCncNum+nFRkUhbOTQDkda5ZO7O+CsgBp6CmYp69Kg0JQe9OFMFSLzQMOg5phGTUnFNfNAXIXGBVZ15q4QMVA+MkVSEZdymPmHUU6OQSJnv3qeZQVxWeh8qcr2atIOzMKsLq5ZNKKQ0CtjkHinimCnigB4p4pgqQUxjhThTRThQIWnUlKKAHA0MxQhh0pBSsNyEUAbEcgaJSPSnhqpW74tkB9KmR6pCLYanBqgU5qTNMRMDTgahDU8GmIkBp2ajBp2aAHUtNpaYC0UlLQAmeaXNJSUASBqeDUINOBoAsA1IDVYNUivQBYHSg01WyKkxkUCGZpd1IymmZxTAl3UZqLNO3UAP3EUu6o91GaAJDTGFLmjjFAERzTc1MVzUbJTAZupN1BBphOKAJlapVNVA+KkWSgC2DTgagVqeDQIl34pwkqAmozLg0AXQ1Ozms8XBFSLcD1oAuUlVxOKeJh60CJcUU3zRijeKAFNFJvFNMg9aAH0hIFQtOB3qB7wDvTAtM2KgkmA71Tkuyehqo8ztTAuS3OO9UZbknoaYVdz3pRasetMCs8paoW3GtEWoHUU1oQO1BRmFTSpGxq8YgDShVWs2UVSpUYPeoDnBqzO4YjHaoJsKuBUjRDCCdx96nG0nrg02KPCjk1LtzwcVxVHdnfTVkBXsKeqsBgml2elOzxx1rI1GlBx2NAXDdKD0oVyDg9+9ACMuc4pypt6UuPWkLDHXimFxG4zioHOc+9TMcAk/nUXAXJ60AVH2pnNULpxsODV6foay7pskCqgtSZuyuQx+lSdOKYg+Wndq70tDzG7sDSUppDQISg9aKTvQwA0najmikMSiikpAFJQaKAFpRzTaUUAOopBS0ALS5pKXvSGKKKSlpiOopKKKQCUUGkoAWjrSUUgFopKKAFpO9HeigYVBdOBER3NTVUvW4Ue9KWxUFeSK3f2p30qMc807PIrlO9DycCnqOlMHJqUHBxSY0PFPUelNXrxUgpDEGKRsmnlQOlM+tAiKTrUEmB2qdyM4qFuDVFFdgO9Zt3GQ24Vqtz2qncLuBGKpESRHG29A3qKd3qvbNgvH6HIqet4u6OGSs7DwakFRLUgpkkgp4pgNPFMY8UtNHSnCgQ6nCm0tADqcKZTl60AWkOEUVKhqup4FTR9aoRcjBxUlMXhRS5piHg08GogaeDTESinVGDTxQA6nU2lpgL3ooooAKbTqTFADc0uaaRzSZNAEobinK+DUQOaCaALiSVYR81mo+KsxydKALu3IqJ0IqRGyKkIBFMRSORRmp3j9qiK4pgNzRupDSHFADg1KGqI0m6gCxupM571EGpd1ACsKjYGpRzSEZpgVyaAwp7oDULKRSAsK9TK9UA+OtSpLTEXsE01os9qbHLnFWAQaAKbwtnioiGXtWltBqNos0AZ/mMKUTMKstAKha3PYUAILg0v2k0wwN6U3yTTAebpqY1y570vk+tKIh6UAQtI7etN2s1WhGPSl2D0pgVRDk81IIgO1WMAdqaRQIiCgUuaeaYRTAaxqB2xUrVXkyaljRFJLiqzSk96fIpzUfl5qGWhnzN9KSUbkU1Ns4qAuOUPUVEnZFxV2PH3fcU5Tnk00j5RSAZ4HGa4WehFaEoIxkmnZz0poAA9aTcccCpLsS4O3NIFBPvRHkdakVPmzQJibcVEwBJqfpUUi7qZJGPunPSonOBjtVgcDGKryc5FOwynKcE9cVkXBzKQPpWncMQCayzy5Na0ldmFeVojhwMUUmeKM8V1nAKaSjtSUhhRRSGkAUlBooGJR60UlIAopKBQAtLSUUAOpRTaWgBaWkpaQC0UZooA6ftRRmkoAKKKKACiikpDA0UUUAGaKM80lAC1Rvf8AWLV2s+8b98B7VM9jSn8REBk04D1pgOCKfmuY7UPUcGpBzio16ZzT1470ikTAAinrzUamng8UgHk4HNRswApxfjBqKRhjFMLEbMCeKjc8UySQKeaXcCtBdiMnJqF1yDUzZAqM8jiqRDM3HlXi+jcVZNMuQAyt6GnE5raD0OOstRwqRTUQNPBqzEmWnio1NPFMB4p4pg6UoNAD6UU0U4UwFpy0ynL1oAsKelTR/eFQr1qeEZcUxF0fdpM0pOFpmaYh4NPU1GDTxTESA1IKiFPFAElKKaDTs0wHUCkFLQIWkpaSgBpFMIqWmkZoAj6UZ4pSKSgYhJFPjlxTCKjPBzQBpxTVdR8isOOTB61ehn7E0xGnwwprRZ7VHHJmpwwNAiq0NRmP2q8VBpjJmmBSMdRlDV0pTClAFIgik3GrLR81G0dMCMSUu8U1kpuKAJC1MIzSZpM0ANZaYeDUhNIRQAJKVNWorgHqapFaQEqaANlZA1SDBrJjnIPWrkc+aALm0YppUUxZM96eGBoEMMdNMdTZpDQBXMdN2VZIFNK0wIClJsqYikxQBFspClSnimE0wIitMbFPZqiZqYEbVWkqZzVdzUsaISKUAYprGmM/FZssJZAqnHWqkYzye9LK25go71Kq4FYVnpY6KMdbjgnA9KQrg+opec9eKdkZrlOxAoyOelL0b2pFkAYDBqTHcigYAEnipFYjimgLng0rCglsCQzUcZ6VESQaeDu600Apw3pVSUYORVjaATgmon6cmmK5k3jERnjk1mD1rS1NsKMdazAcDmuiiupyV3qOozR2o7VucwGikNFIYUGikoGAo/GkopAFJRRSASiigUDFoFJSigQtLSUUAOoo70UALS0lLSGdNR2opO1AhaTNFGaQBRRmkpgLSUUUMAopKKQwrMujm4I9K081jyPunc+9Z1NjaiveFNOU1HkAU0Sc1gdaRbU/LUi9OKrqeBUgkC/WpKLC5Bp+eagWTP1qTcTQOwP1zUMjVKx7Gq8xwDTKRmahdeWM+lTW84lVSvQiszWJNkRLcCotCufMt9pPKnFBXQ6BskUwU9Ruox7UENFG84BpqHMan2qS7TKmoYj+6A9K2pnJXRIKep4qMfrTlNbHMTA8VIKhU1KDQBIKdTAacDzQA6lpM0tMQ4HmnL1qOnqeaALCVatly1U0NaFsvy5NMCZzimA5pWPNMFMRIKeKjFPFMRIKcDTAaeDQBIKcKjBp4piHd6WkpRQA4GlODTaUUwCkIp2KKAIyKYRg5qamEUAMppGacRRigCAgqafHJjvSstRMMUAaMNwRjNXo5AawY5Spq9DP70Aa6sKdnNU45s96sK+aYiTbmmlKeDS9aBFcpTTHVjFJtoAqNFx0qFofar5U0wpTAzmjxTCtaDRg1E0NAykQaTNWWhqJoyO1MCLrSHFOKkU3pQAmOacrEGkpKQFhJyO9WY56zgfepFbHegDTWQGnhs1nLL71Ok3vQIt0VEsmaeGHrQAEUwipMikOKYETA1E1WGFRMnpTArkVG1TMtV5MigCJzVWRqmkbFU3frUspDWNROxxSs3FR8scd6hlrUIVyxc1YwcUKoC4p3HSuObuzupxshoGRjrTlUClPAoAzWRsKBg5FSbgRjvTVUUpA7GgQZx2ozxSYwfWn5HcUEkTSKuN3enZBHFOwM80jKCPamK5E24A+tQENk55qfGGxmkcDaaYXMLUj0xVH3q7qfDgZqgOldVLY4qz94dniikzRmtTIKKKM0gCikooAKDSUE0hhmkNFFIBKKM0CgBRS9qSgUALS0lKKAFFLSd6WgYoooFLj3oA6WiiikISiiigAozRR3oAKKTvRSAKKKKAEPSsFmKzuD6mt6sHUEMV2T2bkVnUWhtRdmOZvlqMHmo/M+UU7I2isLHcti0jU1my3WoFlIpUfc1IpItRSEMKvBgy1QjHINW0bPWkOwE1VuXxVlxjpVG4lUZzTGYOtk3Fs6A844rF8M3bC6eF+GHUVuXZ3ybVBJPYVHa6MLCF7qRR57sMf7IpqLaJlNRaOlgfKjFTlKqWZDAfSrRPOKSGypcqSpqlF0I9DWhORis4cSsPWtIPU5qy0JKcKjNOB4rc4yZakBqFTUgNMCUGniowafQIfS5ptLmgBwpy0zNOBpgTwZaQCtdRsjAqhp0YLMx7Vfc0xEbEUlITSimA5TUg6VGvSpAOKBDxSiminUwHinio1608UxDxS02nUAOpaaKXNMBwpaaDS0xBQQDS0UDIyPao8VPimMvpQIj601lBp5XFJigZWZMGhXKmp2XIqF05yKQFqGer0U2e9YgJU1YinwcE0xG4kme9ShqzIpx61aSUEUAXN1AOaiVxTwwoEONNK5pc0vWgCMpSFBUtJQBAY81G0NWjSFc0AUWg9qhaGtEpmm+SDTAy2jIqMqRWq0ANQtbe1AGcRSZq61rUTWxFMZX3GnCUinmBqjMTjtQBKtwR3qVbketUyrD+E0wsR/CaBGotyD3qQTA96xTI3o1J9pYdyKB2N3zB60hkFYgvWH8WacL40CNckGoXUGqIvh3NO+2g96YDpYQapvbEmpzdA96Z9oUnrUMtFc2hNR+WI2x3q284Ck96p5J5z1rCrKysb0Y3dxw5o6UtIeRXKdiF6mnDimruIp/akULkHpRjBzSKp7Cne1FhXFFKR04pAPSlJxQSxe2OhpmCDS5waP4c0xDOM0jjANKTgU2RsoaYmc3qLFp/pVPNW9QOLg1Trrpr3TiqfELS00mirMxxNJmkpaBi0lBopMAo70lFIaCiik70gA0UlFADqKSloAWlzSUtAC0UlLQAtLSUUAdNRSUuaQBRRSUAFFFFABR3opKACiiigBDWTrI5iI961qzdWQtEjehqZbF0/iRis+1aeJMr1qvcHaOelRxyYFcp6EXoWhIc4p0Uo8z1qmXNOjbawPrSNI7mxHJyKtK5NZ0UgwKtROTQUy0x+XNZV9F5iHDFT61pnBXmqF2CFNBItraRW8YZfmYj7xpl/k2j47c1NDn7On0pso3oynoRiulLQ81yfPdkWny5RTWlvBXNYVkSgKHqpxWohzHljXKtND0t1cSVup61nOSJwT0qzPOPujn6Vn3D7Rknn0qkyJxui4aAaYrbkVvUU4fWupHmslU9KkU1CDTxTAnBqQGoQaeDmgRIDTgaYKcDQA6lHNNzTkGWA96YGxZr5dsPU808tUYbChewpetUIXOacvSmgU4ZoEPUVIKjU1IKAFpwpKXNMB1PU1GDTxTEPFOxTRTgaAClziijFMBevSlFN5HSngg9aYgFOpuKWgAoNLQRmgCMgGmFamK00rQBFtNMZalIxSGgCsye1RkEVaYA1EygmgAjlIPNW4pqoFcdKcrlaANiObNTrLWRHN71bjlz3oA0Q+acDVRJKlWTigRYzR2qMNkUoNAD+KDTaKAFopDRmmAGkIpc0m6gBNgppjFPzSZoAiMQ9KYYR6VYzSZpgVjb57VG1sPSrZNMYigCqbdR2qJ7ZD2FWncCoGkpgUpbJO1U5LRlPBrUYlqYVzQBjtG6moizg1sPEDVSWBcmhjRQMjetJ5rDvUrxAVH5eKzkzSKuyVSWXmpVHFNjAqUDiuKbuztirKwnA4petGzPNKAAMVmaIVRxRz6UoBA60DNAAGIpc89RRwTg0vA4oAQMB1px55603YKXB9aBMUFSOKYTg4pxABxTOM9aYhGPbFMcHbUhFRP1piZz+pJtmz61QzWxqcWULDsax66qT0OOqrSCikzRWhkOoptLmgYtGaTNFIBaM0UlIYUUUlIA7UUUCgBRS0nalFAC0tNpRSAWlpO9FMBaXNJS5oA6SjJpKKQC0UlLQAUGjNJQAuaKSigBaKSigAqC7j822dfbIqakIyCPWkNOzOTuV3IRVGPKgoeo71rXURjmdCO9Zky7X3CuWSs7HoQ1QZ4oikDPt6mnbcp9aqqhiuVkGeDzUGiNy3+Zfer8S4FUYeCKvo4xTLWo9ulZt7OACCa0+CtULuJGAZlBKnNAPYlhBFvGD6U0nmnhwyBh0IqM11LY8p7lDIS/kA74NWi+RyePQVRnZf7RUqwOV5xV1VyK5p/Ez0aXwIilORhRVOdcKcjmtBgR6VTumAU5NKxbY+2ObZKlqvZNutvoasV1R2PLmveY8VIDUINSCqJJlNSCoRUgNA7Eop1Rg04GgQ8HmpYBmZfrUHerNmu+4Udu9MDR6mnCnNEUORyKQYqhCjNPApoqRRQIUDilwacBRTAM0oNJiloAcOetPFR09TQIkFPFMHNOFUA4U6mU5TTEIaBTyuaZjFADg1PxnpUQ4pwagB1KKQHPWlxxQAtIRRRmmA0imFealoxQBAVNMK1OVppHtQBWINMIqyVFRslAEPSpUkxTCtNxigC/HN71YSTPespXwetTpLigDVVqkDVQjm4qdJRQItbqXcahDZ704GgCTNFNzRmgBc0lGaSgB2aTNNpOaAHbqaWppzTCTTAV3qJmJp20mjYAKAIyuaTyxTycVE7mmAFVFMZhTWc1E2WpgNeT0qs7ZzVgxt6VH5JqWUiqVzUDjLgD8avyKI4yxNU1GWzWFSVkdFGOtyRBgU/HFNHSpAOM1xs6gX7tKBTlGV6UuMD1oAaynFIOvIp+aCfSkMacE54oYZ7UhHrSgnFAwVsdRQT70hOaTpTJY4AEc00r6dKCe45FJvzTEI3HUmoXGcEGpmOV6VAfl+lAyrdRhom9xXOEYYj0rqH/1bVzM42zsPet6W5zVloMpaSitzmFzS02loAWjvSUZpDFopM0Uhi0lFFIAoooFAC0tJRQA6g0lLmgBaKKWgAooooA6Siij2pAFFFFABRRRQAUlLRSASilopgJRjmiigDG1VNkwfHDCsmVAwrotUh82zYgfMvIrnVbsa56q1udlGV4kcX3cHqKVowwprfJJnPBpTJisjdMvITsGPSrMb8CqNu+6L6VYicbsUy4s0FIxVe5AKHFSKeKjlOVIFBZk3Osw6dBtdS0g+6BXPz61dXrH59if3Vq5rcQklz6Csa3jw5B6VXM7GKpRUrl6zlMc6sT35rrrciSMMD2rjchRW9pF5uQLn2qWa20NBg8jkLwPU1TuLYYO5ix9q2Y1R4cd6rTxrTsiTPtE2B1qzUaL+9bHpUnSt4bHn1fjYtOFR04GrMiZTUoqBakFAyYGlBpgpwpiH1f0xf3jN3A4rOzV7TZQk5U/xUAbi4Zf6VC8RByOlSLwc1NwRmrJKa1IDinvFk5X8qYODg0gHBqdmo8UoJoAfmlzTM80uaYDxT1waipwJpiJxxSgc1GDTwaaAfigEigNilyDTEODZpKARS4BoASijBH0pM0AOpQTTaM0wJM+tFNBpc0ALRSYpelAgppp1JQBGRTSKm4ppWgCuVphWrBSoytAyArikDYNTFaYV9qAFSWrCTe9VCtICR1oA1Elzjmp1fPeslZcVYSc0CNENTgaqJPnvUokzQBPmjOTUQbNKCaAJKSm7qN1MB2KTbSbqN1ABtNNK07d70ZFAEZjyKYYqlLCmlxTERGIelIUAp5ao2kAoGNZRULYFK8tV3lAqWUkVr+UAKmfc1BHyKqTTGW4JPc8fSrcYwBXHUldndTjaJMAKkUcZpgp69OKyNBw6U4DikGQKU89KQCHFRn0FSGm5wMYzQAL0pDSAU7k9RQMZ9TS0vem9DQIQ9MDpTcYPANOLYppye9ACnjvUL4xUp5HJquzfMVpjGnG01zt6Aty1b7HGRXP3x/0ls1rS3MK2xXopKK6DjFpaSigBaKKKBi0UlGaQC0UUlIYvaiikoAdRRQKAFpaSloAKWk70vegA70tJS0AdJRiloFIBMUYpaWgBuKXFLiigBMUUtGKAExRS0lACUlLSUAIyhlKnoRiuYvrZ7SUgrlDyDXUUySNJV2yKGHoamUeZWLhPlZwc82e9SRyCSPPcda6t9HsHzmAc+hrPn0COIM9uT0+6axdJnQq6Zl2znJUfWrKFg/NUk/c3GGyOxq7mMHP9azsdKZeikzSTvtQmoEdeqmllbcuKRaZz165kkYkHB4rNK7GyDXRywB1II4pbPTbPZvKlnHUNVRV9CKk+RXMS0064vW4BSPuxreh0+K2h2R53D+I1c2hRhQAB6U01uoqxxSqybuJDdSQfLIm4eopXufMyEjbPvSZozU+yQ/bsRVKjk5Y9TRRmkzWqVjFu+rClB4ptOHSgRIDUgNQipBQBKpp4qMHmnA0wHg09SQQR1FMpRQBs2d+Gwj8N71oq1cnMjSQsFYq45UjsaXQ/EyyyfY70hJ1OAx6NVpNq5Oh1+elNkj3fWmJICAQeKkDcUAQYK8GlqZlDr/WoGRl+lABQKbmlzmgB+6nKw71HijbTEWQM07moFLA1Mr56igB4zSigY7U4YqhCZpQaXANJtHrTAXNHFAGKMGgQYpMGlpcUANzilDU6jigAzS02lxQAtLikpaAF20mKWloAYQaT8KkxSYpgRFAaYY6nxSYoAqtGRTGQ1dwKQqD2oAoFSDQGIq4Ywe1RNFQA1JSDVhJx61VMZB6U3lTQBqLLnvUgcGsxJcdasxzD1oAt5ozUasCOtO4oACaTdS4pCMUwE3nFJ5hoPSmnpQAGT1qMy+lBGaaQooAQyGomkNSEVCxXuaGMiZyTUE5IiYnsKnZvQYqleP+5Iz1NZzdkaQV5IoRfNP9K0YyelZ1uPnJNaMZGK4Wz0CYDFPSos0byOlIViwOvNLkUyJ1fg9af04osK43OTSHOaUkc0g57iiw0NIwRznNKTjtS4FNbjvQAmcmgDg5pgzmnc0AG2kPFLz3ppwetAhueahYHeak4De1MYZPWgsrycGsC+Oblq35V4J71z12cztWtLc56/wkPaikPSiuk4wpRSUUhjs0UlGaQDu9FJ3paACiko7UgFpRSUUDFpaSlHSgBaWm0tAC0ZoooAWikooGdPS0lFIkWiijtQMWkoooAWkpaSgBKKWkoAO9JS0lACUlLSUAJTDTzTT0oAo3On21wdzx8+orNu9KYDNs3T+E1uNUTVLSe5cako7HJmWaGTy5FIIq9HJuQVevrNbhdwADjofWsfc0LFXBBFYThY7KdXmLjLmqyTC3uDwSG9Kes4I60BFY5PWs07ao2aUlZlhZ0k4U8+lKazp1w+V4PrU9tceYNj/eH61vCpfRnHVo8quiwaQ0tJWpzhSUUUAFKDSUUAPBqRTUQp4NAEoNPqIVID60APzS00UuaYDwa4vXIjFqMjJxzkYrshXOeI4tsqy44YYrfDv3rMxrL3bknh7xq1rItrqLEx9BJ6fWvRLe7iuYlkidXQjgg5rwidAGJFX9E8TXuhzAIxeDPzRH+laVKPWJnCt0Z7gr4+lOH+zXPaJ4kstZiDQyASY+ZCeRW4r4NYbG97jmjBPTBqN4nXoMiphLzz0qQbSPSgCnuI609eRVgqCOQDUflDPymgBUPPNTbV6iq+0hsVKrDpTAkUc07GKYDzTwaYhfwooFLimAlLTTSZNAh9Lmo9xpdxoAkopm6gtQBJ3oqPcaN5oAlxSUzeaN1MB9GaZupd1AD91Lmot1LuFAEmaTNR7qXcKAHZFGRTOtLg+lAhaNuaQA06gBDHmmNCDUoyadsJ7UAU2gqPYV6VoeUSelIbYnsKAKiTlODU6XIPenGzB6kCmGzjH8RJ9qYyUTAjrS+YPWoBAingMaeAeyY+tADy2elNJx1IFIy8fM4A9qhaSJfVqYhTJk8An6Um5j2x9aia5wPlGBVaSdjQMtO4/ieq8lzGgwvWqcju3rVaQnuaTKRYkuix61Vlfd3rK1PWrXTkzPIoY9F7mriSb4Ec8blBxXPWdkdFBXdyxb/eP1rRiwRWdanPJrQjIxXIdlhzMM8ULzzTHbB9qfERxQFhyrtOR1qypyOaZx1pScUEbiuB6UwAE0MxI60iHIz2plWHEfjTWzUnWkxzQSRdOtN3c098ZqJuGFIaJfxqJgWIIOKUUpORQBCz4yKaCc0rkE+lRZI70zSwkxBUgVzNxxO+fWujkcFTXO3eBcN9a0pbnNiFZENFJRXScQuaKSjNIB2aWm0opDFpabS0ALRRQKGAUopKM0hjqWminDpQAtFJS0AFFFJQA6jFJmigDqKKWjtSEFLSUtAwooooAKKKKAEpKWigBKQ0tFADaKWkNACU006kIoAjYVE1TEVE1ICBqqXNrHOmGGD61dYVEwoGm0c/LZXEB4G9fUVF5sicFGroGFQsB6Vm6aZvHESW5jGYNwVIqMPiVCvXNa0kMcn3lFQC0iSQOF5HSp9nbYv6wmrNEppvWnGkrY5RKKKWgBKKXFFAAKetNxTgKAJBTwajFPFADxS00U4UxDhWfrUIl09yeq8ir9Q3cfmWcqDutXTdpJkzV4nm9yD5pHNVHXv+NaV2AGOeuaosua9M88bb3M1pMssEjI45BU4rt9E+IUkW2HUk3L081ev4iuDb9aO1ZTpxkaRqNHu9lq1pfxh7adXU+h5rRV6+frO+ubGXfbzNGw54NdhpfxEuYCqX8XmJ/fTrXNKk0dEaiZ6qGIpQwJ5rB0vxRpmqKPIuV3f3WODWyjq3IPFQaExAzkGnheOgNRdacuR0NAEyhOhUingJnHNQhjUgkNMQ/yx6ml8v3pRJ7U8Se1MQwQj+9S+Qv96nhx0Ipcj0oAj8hR/FS+QpH3qkyMdKAR6UARi2X+/Si2Xs1SDHpRuwaAGG2HrTfs4/vVOHB7UHBoAiEKdzSG3TsxqXgHpTs+1Arlf7On940ogj9Tmps47UbvagZF5EY9aPJT+6ak3+1KHOKYiLylH/LM0vlr2jqXcaNxoAiGB/BTiQR90UpyaTBoATgH7opcZ9KQgmgLQAmMHqBTg2D94U0pmmeWaAJiw7tTfMX1qLa1HlmmA5pAO1M87HQU7y/Wl8sUAQtM/aomaVu9W9iimMUA7UwKhic9zTDDTrnUba2XMs0aD/aYCuY1Px/o9kCEm89/7sYzTSbBtI6Qxr61XnmhgUl2UD3Neb3/AMRNQuQRY2oiX+8/WuXv9U1K/wAm7vJCD/CDgVoqUmZurFHpeq+MtJ04ENcK7/3U5NcVqXj+8uwUsLcRL/ffk1ygVN3TP1pckgjO2mqSW4nVb2LFss+o6tB9oleWR5Bkk5r1kvgBB0UYrznwrEG1tWYZ2ISD7134YMPRhXn4t+9Y9LBx9y5owtwKtpOFBrNiPNWS2VrkO6KTLYl3HrmpUfniqMZzU65BplSikXQ/ek84Zxmq5cgYzUIID5zQQoXLTS8nFOR+ODVJ35yOKmhfPXrTLcLIvBiBjNKXqDfRuIU80GDQ4vzTC2TVZ5W3c1IGBxzSLUbIeTjvUZl7USMAOKpSzbe9AJE0020gjmoWlZzUBk3jrShsDFM02JSMqTmsK5OZ2Oe9bYPyGsO4/wBe/PetaW5x4nYiooNJXQcIuaM0lFIB2aWkFFIY4UUlLmgBaUU2lzSAXNFJS0DFpaQUZoAWlpKXtQAUUlL2oABS596SjNAHU5pab3paQhaXNNpaAFzRSUUALRSUtACUUtJQMKSlooAbSYp1NNABTTTqQ0AMNRsKkPSmNSAhYVGwqZqjNAEDCoWFWWFRMKAKzCoiKsMKhYUDIzSYpxFIaAEpaQdKKAFoxRS0AFOFIOlOoAUU8UwU4UAPFKKaKcKYDqCMqR7UgpRQtxM891NRHdSjHRqzTyeK2taTbezD/arCdWUkg16sdjzpbjWU46d+tNGAaUk9KMZOaYhoFIwpxXjgUzBIpWGmRq7RvuVirDuDiuh0vxnq+nAKJ/OjH8MnP61zxWhTg1m4J7mik0eoad8TbV8LeQPGe5XkV1Nl4r0m+AMN5Hn0Jwa8FOBSbsHIyD7GsnR7Giq9z6Tju4JQCkiHPoamDDsa+dLLUrmBhsuJV+jmtI+JtZtjmPUJce5zU+yZXtUe+Kw9advArweLxvrq/evScewq/L4312CRdlyjowBGVo5GHOj2kSin+aDXiY8f67s+/ET/ALtNX4k64h58k/8AAaOSQe0R7b5lL5uK8UHxQ1gHmGA/nUn/AAtLU8f8ekP5mjkY+dHtAmpfNFeML8T9TJH+jQ8+5pw+KWo/8+sRx7mkosLo9kEwB5p4lU968c/4Wnen/lwjz67zR/wtLUM/8eMWP940+Ri50eyeavrR5o9a8bPxRv8A/nxi/wC+zR/wtLUM/wDHlF/30aPZyDnR7J5o9aTzl9a8cPxR1I9LOH8zTf8AhZ2pnk2kP4E0/ZyFzxPZhKvqKPNFeMn4m6pzi0iAHuaYfidq/P8Ao8H60/ZyD2kT2kzCgSivE2+JetFTiOAfgajb4j68w+XyR/wGj2Ug9pE9yEgNHmAV4UfiF4iJwJoxj/YpjePvETf8vKj6IKfspB7SJ7x5gppkA714G/jLxE2f+Jg456ACoj4m16Q/PqU34Gn7GRPtonv5uEHcUw3sK/ekUfjXgD6vq7nL6hcnP+2aiNzeTAhrud/q5qlh5Ml14o9/fVrGP79xEPqwqpL4p0eEHffwjH+0K8HCyP8AeZ2PuxoMQH3lrRYVkvEo9muPH+gwji63n0UZrGuvihZLuFtbTSEdCeBXnCRDGMD8qCoU4rSOEXUh4l9Drbj4k6pOMW1pHH7sc1iXXiTxBe583UGjBP3YxtrIEhVmwacZCcdDxWioQXQzdaTCRZJ33XE8kp/23JqPbCpwAOPSmyA9SahJ9CBVWS2QuZvcmkmIBA4GMVUZs5JJP1p7sBwTniq4YNms5MpCqcDOBSclvxo6jp0pG6+n0rJmiN/wvj+2BtPIjNduGyykcGuB8Ksw1rrwUNd9HlmUe9eRi/4h7WCf7svj5OQKBI2eORU4jwgzUTRkHjiuY7IFiJ1bBBxUxk7VUC8Zxz6io3n2HDdaC2y6ZCT1qF5MHmmI+4CmSPtzmhCRIJAamSQqRiqIYdjUqMSaoty0NHzRxTWmx3qsXAFN35OKRiTO+45p6yZAxVYhzwoqVEKAZNMbeg+Zyay7iXnbmrszYrmBqC3OsyQA/KhxSZKepsIxOAKsKhPXNPghBUEVKVxQh3EUZTFYd0u2dq3cYWsW+/12a2p7nPiFeJVozSUVucAtJRR3oGLS0lL3pAKKWm5pc0AOFFJRmgY7NApM0UgHdqWm5pRQAtLTe1LQAtFJRQAtGaTvS4oEdRmim0uaAHUuabmikA7NLmm0tAC55opKUUAFFFFAwooooASkpaKAGmkNONNNADT0php5phFAEZFMIqQ0w0gImFRsKmIqNhQBXYVCRVlhULCgCEimEVKR1phFAxmKKXFJigApaKXFAAKdTcU4UAKKcKbTqAFpwpopwpgOB5pRTRTh1oEcX4h41GTFYbYatzxPG0eoF+zisAtkH1r1Kfwo8+fxMbtXvSFcfhSE89abuPOaogCQOaaGXv1pxJIppx6c0DTGEqT0pgPPSpMDNNIw1IdyJsk0hGTUhXvUfekyrgnBxirQ+eM5HTpVXo1WIHG7B6GkAxcAHPSrQ/e6fleWhPP0qvKm1mFMtbgQTnJ+RxtYUpIaY4SsMqTUb8/WnTHDkHt39ai3A8Z5FADGfbzQrlxUUhznmmxE7utAy5G/OO9SFgTkioBw1Tge/UVL0dy1qrATg5FBPPXrTcseMUgBrRGTY4UE80oXtzSlRinYm4K3YVKvLbdvGKZCoIPtVhR09auKuS2NIIBpojJXkVYwoyCaZnnbirsiOYjweMCpQuegoAOG6j3NCA7sGiw7jtvBJ604bdvTmnAgjHTHtTlKqvGDVWJuMOOfl60ErgcU7zRyMUyRsqOM1SQmywMMoB4poIRvrURJIHOKaQ7MGBA5piJ0YLIctTi5xyOPeq7I4YNuzRsLAEt+FMRZMxxhTxSF8gcfnTAvyYLYx0qTbmPhgadwK4DFuBjNDAqeeO1OMgQ471GZGxkjNJggfJOOtQlOPmP4U4yMx6cA0wqfeoZaBkGMn0qBiETgdanZSwwciosAjB7Vky0RBiT0qTaAcmhRtPTNPbjFZstGv4atnl1UMjYCgljXeWo/fJ7VznhSzxZPcEYMh4+grpLXHmn2ryMTJSmz3cLTcaaubsShhjtTZIwW4pIHIHSp3UkA4rmOjYgaI7c1i60xgtWmHVOa31PBBrD8RgDSLk/7BppXdh83Uj0u6+028c2flcZrSeMSIaw/DSf8Sm2B/u10ixgpzSWjHczkiKnHWraRYX3qQRANxTiMCmJyuUbiTyx81FvIW5rL8QXXkG3jB5kkxWlZLhB9KHoJbGgh4qVRkc1GvC1KvIoQnsVLoYU1z91DBamKSONVZn5IHJrfvM7DzxWHqq5stw/gYGtoK6ZhJ2nE2bWTdGKsHjk1l6dNuhU5rRaTK81ijoZHLIefSsi8OZKvyvwayp2LSnmtobmFZ+4R5oopM1ucAGlpKKAF70tJRSGLS0lAPNADqKSjNADqBSZoFIY7NLTaWgBe1LTaXNAC5ozSZooELRmkzS0AdPS9qbS0ALmlzTaPxoAfRTc0uaQDs0UlGaAHZoptLQAtFJRQMWikooAKaadTaAGmmmnnpTTQBGaYfapCKYaAIzTCKkNNNAEDVEwqdhURFICEioyKmIqMjmgYzFNxUhFJjigBmMUtLiigBKUUYpaAFFLSUvemIUU4U2nCgYopwptOFAjm/FaBxCO4zzXGsrBjnOK7DxSSHi+hrki+CQa9Kj8COCr8bImBNISPSnueMios9q1MhQwxRwRxTccUg470ABBpCR16GkY5OM0nzY60hpgOcmojw1P3Y+tKWBApFDOgz3pQ2CD3pC3BpAQcUhlt/nj3VRlXB6VchO4Fc9ahmHUUBcRsz2gkGNycEe1VQDuxU1pJ5Vzsb7kg24pCnlylCOQcVCKK7deeKUjABFOljO7kc0Y+TB607BceuWTNTxZKH1HNRxjEOe9SRksvB570SWg4vUUsd3604LyDnFIQRjPbg0o5bFVB3VyJ6MkUjPNIzL6Ckx6UjH5ea0IHRcOSOKsJg9e3NVYCCTVgdOOAOtVEUh5ZeozTSx3cijdjik3YYc81ZBKpyCM9aQhwRj6UwSE+9Dkkg5NAExBRsHOTSoduc1GzEAGmqx+tMRYDKBk81G0gxx60gORzRtJWncQ7cD+VOJwOoqFlbOM0jAsOvFMCyHX8MdarCULJySeadtwCCOaavBPakBL5mSTRuJAyTSHGKdHjaaYDcZfjJp5H7vp3prk5AGAaTBxy3OaBCnhCSB6UwkEcmiU/MOTj0pnUVDLQxnOTzTdue1OZAMt0qJnIbOaybLQbTu5anE7tpz7VGXB9xS5zwOlQy0eh6bLBbaPCiSBvl7Gr+mv5il/U15rb3k8ClUkIHpXf+HizaTEzn5myc15Feg6b5mz3MNiI1Fyo6iB+KvKwIHPaseJ5E9xV+KdSBmua50SJmGCa5bxdOI9HmUH73FdM7fJkHNcL41nxHBDnl5BV01eSJm7RZt6Gnl6fAuOiCtlXBOM1lacQLeMeiirm/wCYc1KNLF/PFRyMB9aZHIcY60khNBJyfiRt+r6en+0TXR2w+Ra5XxDL/wAVDYL6ZP6101u3yCrqbR9CYPf1NNQNvNKrYqsJTik82pRTC8IKMfauI1HW3ndoYuIhwT612U75jb6V5kWzcSY6bz/OtE7IyaTdzsNJuR5K5PatgyZHWuTsJWjQYNaqagVGDWSNZGm8ibNxNZsrBnJHSoHupZ+OQtPAwAK3p6s5a8tLBSZo7UVucgtJRRSAKWkopDHUU2loAdQDTaWgB1L0plLSGOpabmjNAh1LTc0ZoAdmim9aWmAtFFFAHT0uabS0gFopKM0gHUUlGaAHUuabmjNADqKTNFADqO1JRQAtFFJQAtJRR2oAQ0004mmmgY0imGnmmmgCMimnmpDTD1oAiYVERU5FRNQBCRTCKlIphFICPFJin7aQigBmKTFOxRigBKKXFGKYwFLjmijHNAgpwpKUUAKBSgUgp1AHNeJhmSP6VyMickV2fiYAiKuQdQWJz0r0qPwI4Kvxsg/hqJgDU5GAagOQa0MgIBFIfQ07GBmmsSBQAx170wH061LnK5NMYAHpQCGZ5xilwDxSE80ZGaRSEKnBAqPleKlyex600jmgofE+1waluOenSq4GanzujHGcUhGbMWV1YdQa1LgCaOG5UYEgwfrVKdM5FWtMcT2stq33k+dP61EtNTSGug2WP5QTUBX5ulX2G5AD3FQtHtAqotNXJkmtCBB8hFJH8rVNjDYNRDGT9apkplmUBxleO9NVcDPenx9MZ4xTgoI61NJWViqru7jFzkio5QAOtSGM4IzTZYxgfPz3rQzG255OOOKnDYyfWmW6hQxBpxUkHAq4kyAHJOadu6ECkVOOeKAAeh6GrIHqcKSQacGB4yaaqAnk4FORAG5xQA4gAg0h45xTyoIGDShFI/pTAhDZyKcMhfUYpVCgn1owF6mgQ3cwIOfzpxPyUny8GnEY6d6YCbuB696dsbHOcUgwCKcxwCCe3WmJjlVWHJwBQjY4HFMEgxzzxTVYngDNADpsgg9aMqVBHWo3JYYJpQpZD7VLY0Nkf2qJ5cAYHalJbHPNMc8VDZaQjMzrzTCMkZpxIK8U1VJYZPPpWRYKFJIxUiYwMCmqo8w808D5qBi+WdxNeh6KNul24/2BXnbHPcj6V3ek3H/Estyey4rz8d8KPRy/4mdHGybeQ1PjmRm2qTx2NZ8V4ir8xqaKaGRtwxkV5yZ61jQM2FIrzzxZcibXbeIHhMZ/Gu0nuVAOD2rzC+uTda1JMTkGTj8K6MPG7bOTEzsku56VaOBEuDxirRcE9axIJHMKMh7Vcildh82M1zo67mvFKAopZZflqnG3y4zQ0mM80yGzi9ZmM3iyMA8IAK6+2lygHtXD3BEmtyT55MmBXWWkmVAzzitK7Tsl0RnSTSbfVmqZsL1pBMCMZqDDMME/lTdipySfzqEaEk0n7o+9crf6OIyZ7YEjOWSt+aQFto6VFnmuinG61OSrUcZKxiWTrjBOK0AY6dJZwOxfbtb2pUgjToMn3qfY6jeIVh6KOuOO1OJozSVtGNkc8pOTuwopO1FNkhRSUUALRSUUgFzS5ptLSAWlpoNLmgYtLTc0A0gHUtNpaAHUv1ptLQAtLSdqKYC0UZooA6eik60UhC0UlAoGOBopM0UALS0maKAFzS5ptANAD80U3NGaQDs0ZpM+9GaAFzRSZpKBi0lGaKBCGmGnGkNAxhppFPNNPNADDUZFSmo2FAETCoyKmYVGRSAjIppqQimmgBhoxTsUlMBuKMU6jFAxKO9FLQAAUDrR3pRQIUUtJSigDA8S4xF+NclIpUnHeut8S8iL8a5aRdwzXo0fgRw1fjZVJwCDUJOCasOvNVnByOK1Mhy9DxTWG4YFC8DmnLjvQBEFzlTxTSMA45xUuBvpjLgkdqBER680hUfjQc460meaCkHamEd6fnrTSvFIoAOARUsLckHoahXgEE05HwaACRCw71VjdrS6WUdjz9KvScgPng1UlTdUyV0NOzL5mAxj7p5H0qRtrxZBFULaU5CNyB0q8UGFZcYPWsIycNGayjz6plcH5vmpsi4fIPWnXNq5Uuh6dQKIV8xMMeRWvtEZ+zZJGMqB6iqc0pjbCnmrUZ+Yt0VeBms66cSTkJ61MZaDnHUkSeRh940FnbuadDGApzT9m7pWquQya0O2Ig+tSmXaeKaECKMimllzWi0M2NMjMaeu4/lTgARwKUDscVZNhVb3zTySKAoHAFK2DwBzTuKw5HOcfhTwxXINQL8rYNSEsWBpiFBxzTeW7ilI+b5qTgtgUDEyOfWns/ygY5FR9DTwMg5pisN3HAIyDSgFuvelxgdBSE7TigQ5Y+nHFSIoUE5oVj3oVic45oCw1wvXHWkz8jc9qGQnGePrSoFAOTQwRX4OR2qMt6CrLbBniq5+8cdKzZSG4OKXBJ60oUZ5p/yhahloTYAwxSbgCc8mguDgZpjfewOaTKQ0sxU4OK7fQcPpMQPoRXDsa7bQwYtLhz35rgxvwI9DA/EzRNq5+6ePSmhJ0baB1q9FKjAVOpSvMPU5mjNuQ1vYzSyH5gpNecKxMqn1bNd74ouvK0uRV6txXBx43qfevQwsfcbPPxMrzSO/sJlEaA+grWVkbkBR+Fc1aljCpQ9BU5uLgDjOK4Op6NzofNVSAcfhUF1MEhlfPRSayY7i4J5zS6ncNFpU8jcHbgVcVd2RE5JK5zUT77hWPds10kUrKikdq5G0uBvAbgiultp1MYBIq6tKUXqiKdWMldF8anIOCucUo1GWTgIBVUyRg5JFJDdwSXaQI2WPpShTk9gnVUTRjyV3N1NOpSeOOlNrqirKxwyfM7h3pKKSmSFFFJQAUUZ4pM0hi0lFJSAXPNBpKM0ALmikozSGOoptFAD6KZmnZ4pAOFKKaKUUAOFLTaWgBxxRSZpaYC0Z+tJRQB09GaTNGaQhc0UlLmgYtGaTNGaAFpaTPNFAC0UZpKAFFGaSjNADs0U3NKDQAtGaSjNIBaSjNJmgYGkopM0ABptLSUANNNNONNNAEbCmEcVKelRmgCPFIRTzSHpQAwikxTzSYoAYRRinYpMc0DE70UuKKAExR3pcUCgQUtIKWgDD8RruSIiuWlDISMcV2OuR7rdW9DXJzck16NB+4jhraSKJ+bnFROBn6VaK8cVFInetTErnke9ATApc4NLnI60AMZeOBUZBqc+hpjcZNAyq2VOOtNzzUjH5ulNO0etAIbn0o4pygFqbtOcUhoaAKCpzSFippd5IoGSou6Mg1Cw4xipYyQwpZkwcjoaAKiHypQ3arj3IIAAIFVWGRTVJAIPSs5QuXGTL32tlXaWBBqFpVibdx9KqsSp9RUckhP3qh6FJiXWoM5KoNoNFmvmENVWRM844q9p64i9eaI7jlsWejVLGmWApu35skVZUKq5roSOdsbISTioshacWAJ61EefU1QiTsD0FPBFQqCVwafsIXk1QiXJ49qkxg5JqJQcDn8afg4600IVsE7hxSsflGDTAfpTf0pkkmcsoPenKVVjyMmogPmHJ+tAUB+SeaYXJDxmmHO7oaeQpyM5pB16imDFZCfanbB0pSxIHFKxJAPegkTBA605WxyDTCpJyT0pyru/CgYjtu57+9KnzZJIpFUk8etL0obCwqIMtyBVd1HJqcd855qJwDms2WiEsAQBSt0xTeFbPJNKWyKhlDcDI9c0rf0owM0pTHXuKkaIiM4rstInV9LiXPK8VyGBmtTSbnBa3Lcnla5MXDmh6Hdg58s7dzqFkwcA1KLlkFYpeZD1p3myFSx4AHOa8vlZ6za3IPElzutlXPLNXMpz7Yq5qd79qmUL91eKpFsAmvWoQcadmeRiKnNUujrdMl2xICe1a6umK5DTb5SgQnDDjnvWqt0QOtedUpuMmelCalFNG8rxjmsPxPdj7KkKnAY5NSmfEZcnAA5rn9Tu/tko2j5QOK2wtJudznxVRRhbqUlwME1Zju5Yx8rEVVxxTga9ZxT3PLjOUdmW2u5pOHY1o6F/yFI/of5ViqcN1ra0A51NM/wB01E4qMHYqM3KabOsJpKDRXAdYlJRRmgAzSUUhpAL2pKDSUALSUhNJmkMXNHekozQA7NJmkopALmlBpuaWgY6lBptKKQDhS5ptLTAdS02loEOzRSUtAx2fWkzRRxQI6aikBopALS96TPFBoGLmikzS0ALRSd6KAFopKBQA6kpKKAFozSdqM0ALmjPFNozQA6ikzRQAZpKDSE0AFFFJQMSkNL3pDQIYaaaceKaetIYwikpxpDQA3tScU49KTFACYpDTjSGgYhpMU7vSUAJiilooASjFLiigRU1KPzLN/Uc1xdxwx45BrvnUOjKe4rh72MpO698124aWjRyYhaplEnn61DIcnGDU5TkZzUUi4YnH0rpOYqNnOBS8Y96kk25zjFRryaAFIz071G1TkgDANRMuGzQBWcAHFNJPORU7qM81Gy5BNAyIE56cU5l54ox0AFDe1AyN8AD1pnQ1NgYNRsB6UANDEGrK/vY8dxUBGeafG5VhSAaw56VARzVqZO4PBqu4xQNMb94YNVpRt6cipWODxSPyKiSLTKzMMA9jVqxmxuTHGapSKVOR0qW1mCygE9ayWjL3RtAh+hpxyBg1BEwqyACproTMGiuxWmhuvNPePBxmkC4YcVRIq4+tTDlBmgAbTgDNAGVqkSxwHGB0pegOOR0poGMDNOXkHuBVCG4C96evPHtTD06YpyZ+ppgIW+bGOKRuW4yKcR82elKVy+BTJGgZNKAQRxSquDj0p45HNMBMsOMVIBlRk0hOaegyuTzQA0xnGTwM0gKg1K25hjJwKjKneeORQIRe+Bz1oAOc96VsjnGKaDhh6mkykI2SSCaYYxnjr7U9uvvUbNlwMfWs2WhjKF4J70wKQR3qwyhiOOKaQFIwPzqSiMggHOaCSQPpQT82ScijJJAHUelIBnPfikRjFIHU4Yc59KCOeRTGGMAd6lq5SbWxqLq8hHzoCR39ahuNUmniKABF71S5DDmk/hNZKjBO9jZ4io1ZsZk8U1jkYpQKRhg1ozMaCVxjirUV9MGA3Ej3qrkVJERvxScU9ylNx2Zee5lljIZiRnpVQsCx9akZtqAevNQhvmOBWkIpLQzlJyd2PHXmgH5gaXGRnFLt59qsgTPzda3vD4/4mQP+wawhgPW74e51AY/ums6vwM0pfEjqs02lzTc1552hmikooADSE0UlAB2opKQ0himkozSZpAFLnmm0UAOpaaDRSAdRmm0oPagB2aUU0Uo6UDHZ5pwNMFKDxQIcDTqZTqAF70tNpRQA6jNJS0DOkzS54qINTgaQiQHAozTQaWgBc0ZpKWgYueaWm0Z5oEOopM+lGaBi0UmaM0ALmkNIaKAFpKM0maAFzRmm0ZoAdSUmaM0AGaKM0maADvSUtJQAhphp5ppoGNNNpxpKQDetFLSGgBDig0UUAJR3ooNACGiiimAUUUUAL1rktai2Xr4HvXWVz/iCPZJHL/eGDW9B2kYV1eJzbHB6Uw4bI68VLMcHpUWzLDB612nGV2UNzUDKQ31q28ZBxu71EykHrTER9PxprGpCBnHXFMbCmgZGcYFNBBGaVlB6d6aFJoEI3BFRke9OYEHvQQNuaBjOfSmE9qeT6d6aeMUDQ3djrSrzTSSTT16UgJAd0eKryqQKmUgGlkUYzQBnsDn0ppHcVYkUYqIg4pNDREQG61UdDFIGFXcY5FNdA6c9azaLTLdtJ5gVh3q/n5Kw7SQxybD07Vt8MmexFXBkyRCzYORyaTeCehprLtOaVRnirILCP8tBNRgbRS4/WqRLJVwcY5pwxyOlQJ8o6nrU2BnOetUhDmAK9aYhIbrxT1UEEYzzSiPnnHWmIYQzOKk2neMin7MHOOBT/KJG7pTFYg53jjrUgUZI60u3nOeKlQgHOPrTEMUY696dGxAI29DwaeMFs46dKUKccUwGbuTx1pHGacVO7Pr2penLDPFJjSIth/AjvTDygO3kVNuO046CmHATv+FSxog2tv5pzIOtSBdxBANIyYG73qGUQ005LDAp7ZLU5QQueM1JSIdvqOKT7vTvT2JAJPWmdSPWgBn4U1hnFOKgdaB7CkA0Y44pvHIFScntUZ4z2oGMIxTG5FOJyT6U3vk0ikNAyMY5qSJevFRq2O1TIeM0wCQlcA+lIOo5omO6XApKtEEmaGY5IpFwaRm5piHDOR6V0Hhvm8Y/7Fc+hzXQ+Gv+PqU+iVlW+BmlL4jpiabmjNJXCdgZozSE0lIYpNITSZpM0AKaTNFJSGKTSUlFIApaSjNAC0UmaWkAZpwNNzQDQA7NKKbSigY8UU0U4GgQuadTKdQA6lpuaM0AOzik3U0mk3UAdEG7U8NxVcNTw1ICcGnA1Cpp4NAEtGaYDTs0ALmikzzS0AFKKbS5oAWikzRQAtJRmk7UDFzSZoooAKM0lFABRRSdqAFzijNJRQAZo70nejNAAaaaWm0AJSUUhoGFJS0lACUUUhoAU0lFJQAd6SlpKAFzRSUUALWZrsXm6eT3Q5rSqG7j820lT1U1cHaSZE1eLODmPygmoW56VNcIRuT3qupwK9A4LDCWGSajd8qPn/CrLBShJPXpVdoB96mSN5xmmSEgZqVVyvFNaNsc0xkXUU3GDnpTtp3CiSNscCgCJ8nnNMHOc4pxQkYNM2sD1xQAHk9KaxzT/Lz1NN2YI560hkeOeuKUHnrSumG601VosMdnFSD5wVqFlOeKEJU5oAWRcZzVZxnpV2UblBqo6kGkBBnOR3pp4NKwwc0n3utSxjXXJDL1rStJzJDjOStZ68ZqWzyl0vo3BpLRjexcfOM05cHpSSZyRTIyVyCOtamZYwdvWjIHUGmq3qaXOaYg6ipVK55qFiUPHOaPSncLE4kAGD0zQsozjPFRgZHNNxtwQOKdybFwTKDgHJzTzJnOKpqoGPXrUysMg0XCw7eScZ4qZSFHJ61Dxn0p3v2p3Bon3KSFD09WwnHrUG04BPSpowWyKq5Ng3HPHT1pQd429D605kCggnrSx+WOOpoAh8oqSM5oVMD19qnJxIcdOtRFwCcVLKQEfNnpUMzZyM/lTyxwM1Cw+fnpUjGk4HNAO1/rSkKCBzR5ZDZIOKQ7kTqXPFIVIcDHap2wBxUecyAEEilYBmBggjNMxip9vBx0qFwO1AxmckjtUTcgipSBnJpjDjigCA0g470rcnimgcGkULU8a/KSagU81YX/AFbCmhMrFiZM+9SDnvUSLk81LkcADmrRI5cDk0HGaUfd96aB83NMB68V0fhofvZj6KK5zBzx0rpPDQwJz7Csa3wGtL4jfzSE0ZpK4TrFpKSigYUlL2pDSBAaTNBpKACigmkzUjF70UlFAC9KXvSUUALS0nege9IBaUUlKKAHCikFLQA6lzTC1IWoAfmkJpm6k3UAPzzRuqPdzSbvegDoA1PDVAvWnA84oEWA3vTw1QKakFAEwNODVCDxTgaQyYGlzUY6Zp2aAHA0tNpaAFopO9FABRSHpRQAtB6UlB6UAHaiikoGONJRRQAUlFJnmgBaDQetJQAlIaWkoAaaaad3pMc0AJSUuOtJigApKWk60DA0lLSGgBKKKQ0CCiiigYUdQRR2o70COH1iMw3ko6DORWX1rf8AEqgXYI7rzXP/AMXU16MX7qOCSsx2cLg9aYXyDjtUnrUJAUnHrVIhiCTjFO8z5QKYQABikP3c1QhxbLdMUj5JppYgD3p/U0DImxnGKjbg056jkY9KAAt2NMwDzmngdM00qN2MUDGs2aZnn2p5Hyt7VGOVoAk6jg03HNCik9aQyRc4K1DKuTTwxHND/dzSAqMM8VA2Q2O1WW6moWFSyhm7aeKdG+JFb3ptNPDjFSM2ZMNz7VGKX/lmh9qYDzWqIsTEBsUoHFIpyKfjimSxjDIpgb9KmPNGxeOO9MBFO5fcU8qMc9aVFAYkCnrypoEJGoI96kAApFA25pT0zQIcMN2xS4Y801etKCSKpCHJ+NWYQMk9KhTripVGGB9KtCJdg28+tN2KoBB4p55B96b/AA4piImyzYB6+lHlAAkmlXImxk4pZB94elQxoYVXYDk1HKcLwB+VTkDAFEkSkc561IymD83JyamKNtJ6/jSlFVhgClZjyPagZGV45POKjwNwzxUhYnk1ASSRz3oAWQ7QQOlQspI96lfkmmkYFSMhbg81HJx9KlIHB61DL1oYELCkX7uKCTS5wOPWkUAGDU6N8jZ9Ki9KkX/Vt9KoCAenanMaaelL3xVEjiSFHFGelDdhTo+tMB4OAK6fw2v+jzN/tAVyx611fhwf6FJ7v/SsK/wmtH4jX6UlHeiuI6wpO9LSUgCkoooGJSHpS96Q0AJS0CjrSYCUopKKQCmjNJ3xS0AFKOlIaPWkAuacDTRR0oGOzRmm0meKAH5ppNJSE5xTAcTSE03tTc0gHZ5o3CmGm5oEf//Z) no-repeat center center / cover;
  border-radius: 0px 0px 0px 0px;
}

/* Group */
.group-16dba835395f {
  position: absolute;
  left: 135px;
  top: 0px;
  width: 271px;
  height: 150px;
}

/* VEREADOR */
.vereador-16d681f162c6 {
  position: absolute;
  left: 85.5px;
  top: 82px;
  width: 109px;
  height: 24px;
}
.vereador-16d681f162c6 .root-0 {
  
  
  display: flex;
  white-space: break-spaces;
  align-items: flex-start;
}
.vereador-16d681f162c6 .root-0-paragraph-set-0 {
  display: inline-flex;
  flex-direction: column;
  justify-content: inherit;
  
  margin-right: 1px;
  vertical-align: top;
}
.vereador-16d681f162c6 .root-0-paragraph-set-0-paragraph-0 {
  font-size: 0;
  line-height: 1.2;
  margin: 0;
  text-align: left;
}
.vereador-16d681f162c6 .root-0-paragraph-set-0-paragraph-0-text-0 {
  color: rgba(255, 255, 255, 1);
  text-transform: none;
  
  line-break: auto;
  overflow-wrap: initial;
  white-space: pre;
  font-size: 20px;
  text-rendering: geometricPrecision;
  caret-color: rgba(255, 255, 255, 1);
  text-decoration: none;
  letter-spacing: 0px;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 800;
}

/* ANTONIO CARLOS FLORES */
.antonio-ca-16d64d685100 {
  position: absolute;
  left: 20px;
  top: 22px;
  width: 240px;
  height: 48px;
}
.antonio-ca-16d64d685100 .root-0 {
  
  
  display: flex;
  white-space: break-spaces;
  align-items: flex-start;
}
.antonio-ca-16d64d685100 .root-0-paragraph-set-0 {
  display: inline-flex;
  flex-direction: column;
  justify-content: inherit;
  min-width: 100%;
  margin-right: 1px;
  vertical-align: top;
}
.antonio-ca-16d64d685100 .root-0-paragraph-set-0-paragraph-0 {
  font-size: 0;
  line-height: 1.2;
  margin: 0;
  text-align: center;
}
.antonio-ca-16d64d685100 .root-0-paragraph-set-0-paragraph-0-text-0 {
  color: rgba(255, 255, 255, 1);
  text-transform: none;
  
  line-break: auto;
  overflow-wrap: initial;
  white-space: break-spaces;
  font-size: 20px;
  text-rendering: geometricPrecision;
  caret-color: rgba(255, 255, 255, 1);
  text-decoration: none;
  letter-spacing: 0px;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 800;
}

/* Rectangle */
.rectangle-16d4ea368818 {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 271px;
  height: 150px;
  background: #5e17ebFF;
  border-radius: 0px 0px 0px 0px;
}

/* Group */
.group-16d7e31c0616 {
  position: absolute;
  left: 135px;
  top: 150px;
  width: 271px;
  height: 50px;
}

/* PL */
.pl-16d6298a37c1 {
  position: absolute;
  left: 20px;
  top: 17px;
  width: 16px;
  height: 17px;
}
.pl-16d6298a37c1 .root-0 {
  
  
  display: flex;
  white-space: break-spaces;
  align-items: flex-start;
}
.pl-16d6298a37c1 .root-0-paragraph-set-0 {
  display: inline-flex;
  flex-direction: column;
  justify-content: inherit;
  min-width: 100%;
  margin-right: 1px;
  vertical-align: top;
}
.pl-16d6298a37c1 .root-0-paragraph-set-0-paragraph-0 {
  font-size: 0;
  line-height: 1.2;
  margin: 0;
  text-align: left;
}
.pl-16d6298a37c1 .root-0-paragraph-set-0-paragraph-0-text-0 {
  color: rgba(193, 255, 114, 1);
  text-transform: none;
  
  line-break: auto;
  overflow-wrap: initial;
  white-space: break-spaces;
  font-size: 20px;
  text-rendering: geometricPrecision;
  caret-color: rgba(193, 255, 114, 1);
  text-decoration: none;
  letter-spacing: 0px;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 800;
}

/* Rectangle */
.rectangle-16d53820d4c1 {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 271px;
  height: 50px;
  background: #ffffffFF;
  border-radius: 0px 0px 0px 0px;
}

/* Group */
.group-16d7dde9b893 {
  position: absolute;
  left: 0px;
  top: 199px;
  width: 406px;
  height: 50px;
}

/* FAVORAVEL */
.favoravel-16d5b7bc9f69 {
  position: absolute;
  left: 165px;
  top: 16.5px;
  width: 76px;
  height: 17px;
}
.favoravel-16d5b7bc9f69 .root-0 {
  
  
  display: flex;
  white-space: break-spaces;
  align-items: flex-start;
}
.favoravel-16d5b7bc9f69 .root-0-paragraph-set-0 {
  display: inline-flex;
  flex-direction: column;
  justify-content: inherit;
  
  margin-right: 1px;
  vertical-align: top;
}
.favoravel-16d5b7bc9f69 .root-0-paragraph-set-0-paragraph-0 {
  font-size: 0;
  line-height: 1.2;
  margin: 0;
  text-align: center;
}
.favoravel-16d5b7bc9f69 .root-0-paragraph-set-0-paragraph-0-text-0 {
  color: rgba(255, 255, 255, 1);
  text-transform: none;
  
  line-break: auto;
  overflow-wrap: initial;
  white-space: pre;
  font-size: 14px;
  text-rendering: geometricPrecision;
  caret-color: rgba(255, 255, 255, 1);
  text-decoration: none;
  letter-spacing: 0px;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 400;
}

/* Rectangle */
.rectangle-16d5263a2545 {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 406px;
  height: 50px;
  background: #31cb65FF;
  border-radius: 0px 0px 0px 0px;
}
</style>
