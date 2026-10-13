const formationBlueprints = {
  "4-3-3": { lines: [4, 3, 3], depths: [0.24, 0.5, 0.82] },
  "4-2-3-1": { lines: [4, 2, 3, 1], depths: [0.24, 0.44, 0.66, 0.86] },
  "4-4-2": { lines: [4, 4, 2], depths: [0.24, 0.54, 0.84] },
  "4-1-4-1": { lines: [4, 1, 4, 1], depths: [0.24, 0.42, 0.64, 0.86] },
  "4-3-2-1": { lines: [4, 3, 2, 1], depths: [0.24, 0.5, 0.7, 0.86] },
  "3-5-2": { lines: [3, 5, 2], depths: [0.28, 0.56, 0.84] },
  "3-4-3": { lines: [3, 4, 3], depths: [0.28, 0.56, 0.84] },
  "3-4-2-1": { lines: [3, 4, 2, 1], depths: [0.28, 0.54, 0.74, 0.88] },
  "5-3-2": { lines: [5, 3, 2], depths: [0.22, 0.52, 0.82] },
  "5-4-1": { lines: [5, 4, 1], depths: [0.22, 0.56, 0.86] }
};

const formations = buildFormations(formationBlueprints);

function buildFormations(blueprints) {
  return Object.fromEntries(
    Object.entries(blueprints).map(([name, blueprint]) => [name, buildFormationCoordinates(blueprint)])
  );
}

function buildFormationCoordinates(blueprint) {
  const coordinates = [{ x: 0.08, y: 0.5 }];
  const lineDepths = createLineDepths(blueprint);

  blueprint.lines.forEach((count, index) => {
    const depth = lineDepths[index];
    const ySlots = createLineSlots(count, blueprint.lineInsets?.[index]);
    ySlots.forEach((y) => {
      coordinates.push({ x: depth, y });
    });
  });

  return coordinates;
}

function createLineDepths(blueprint) {
  if (!blueprint.depths?.length) {
    return [];
  }

  if (blueprint.depths.length <= 2) {
    return blueprint.depths;
  }

  const startDepth = blueprint.depths[0];
  const endDepth = blueprint.depths[blueprint.depths.length - 1];
  const step = (endDepth - startDepth) / (blueprint.depths.length - 1);

  return blueprint.depths.map((_, index) => Number((startDepth + step * index).toFixed(3)));
}

function createLineSlots(count, customInset) {
  if (count === 1) {
    return [0.5];
  }

  const insetByCount = {
    2: 0.28,
    3: 0.18,
    4: 0.12,
    5: 0.09
  };

  const inset = customInset ?? insetByCount[count] ?? 0.16;
  const top = inset;
  const bottom = 1 - inset;
  const step = (bottom - top) / (count - 1);

  return Array.from({ length: count }, (_, index) => Number((bottom - step * index).toFixed(3)));
}

const projectThemes = {
  assopoker: {
    eyebrow: "Editorial tool",
    heroTitle: "Predicted lineups generator",
    heroCopy: "Fill in the match details and download a ready-to-use JPEG graphic (vertical 1080x1350 or horizontal 1200x675).",
    heroBadge: "HTML5 Canvas • JPEG 1080x1350 / 1200x675 • No dependencies",
    settingsCopy: "Set match details and background. Marker colors are managed per team.",
    previewCopy: "Preview and download use the selected graphic format.",
    defaultBackgroundTheme: "assopoker-main"
  },
  betfair: {
    eyebrow: "Betfair Editorial Tool",
    heroTitle: "Betfair lineups generator",
    heroCopy: "The same engine as the AssoPoker tool, with a Betfair-specific visual base ready for new assets.",
    heroBadge: "Betfair Variant • JPEG 1080x1350 / 1200x675 • No dependencies",
    settingsCopy: "Parallel version of the AssoPoker release. Same mechanics, Betfair skin.",
    previewCopy: "The preview uses the same logic as the AssoPoker tool with a Betfair graphic variant.",
    defaultBackgroundTheme: "betfair-gold"
  }
};

const exampleDataByTheme = {
  assopoker: {
    matchInfo: "Tuesday 9 June - 9:00 PM - DAZN",
    backgroundTheme: "assopoker-main",
    left: {
      teamName: "ARGENTINA",
      formation: "4-3-3",
      coach: "Lionel Scaloni",
      markerColor: "#3aa8ff",
      markerBorderColor: "#37256d",
      starters: [
        "Martinez",
        "Molina",
        "Romero",
        "L. Martinez",
        "Tagliafico",
        "De Paul",
        "Mac Allister",
        "E. Fernandez",
        "Messi",
        "Lautaro",
        "J. Alvarez"
      ],
      bench: ["Rulli", "Montiel", "Pezzella", "Paredes", "Lo Celso", "Di Maria", "Dybala"],
      missing: ["None"]
    },
    right: {
      teamName: "BRASILE",
      formation: "4-2-3-1",
      coach: "Carlo Ancelotti",
      markerColor: "#3aa8ff",
      markerBorderColor: "#37256d",
      starters: [
        "Alisson",
        "Wesley",
        "Marquinhos",
        "Gabriel",
        "Alex Sandro",
        "Casemiro",
        "B. Guimaraes",
        "Raphinha",
        "Paquetà",
        "Vinicius",
        "Matheus"
      ],
      bench: ["Bento", "Danilo", "Bremer", "Douglas Luiz", "Endrick", "Rodrygo", "Richarlison"],
      missing: ["Neymar"]
    }
  },
  betfair: {
    matchInfo: "Saturday 20 June - 6:00 PM - Betfair Live",
    backgroundTheme: "betfair-gold",
    left: {
      teamName: "ATLETICO MADRID",
      formation: "4-3-3",
      coach: "Diego Simeone",
      markerColor: "#ffb80c",
      markerBorderColor: "#0f3f31",
      starters: [
        "Oblak",
        "Molina",
        "Le Normand",
        "Gimenez",
        "Galan",
        "De Paul",
        "Koke",
        "Barrios",
        "Llorente",
        "Griezmann",
        "Morata"
      ],
      bench: ["Moldovan", "Witsel", "Azpilicueta", "Saul", "Riquelme", "Correa", "Depay"],
      missing: ["None"]
    },
    right: {
      teamName: "BORUSSIA DORTMUND",
      formation: "4-2-3-1",
      coach: "Niko Kovac",
      markerColor: "#38b76a",
      markerBorderColor: "#13342d",
      starters: [
        "Kobel",
        "Ryerson",
        "Hummels",
        "Schlotterbeck",
        "Maatsen",
        "Emre Can",
        "Sabitzer",
        "Adeyemi",
        "Brandt",
        "Malen",
        "Fullkrug"
      ],
      bench: ["Meyer", "Sule", "Bensebaini", "Nmecha", "Reus", "Moukoko", "Haller"],
      missing: ["None"]
    }
  }
};

const exampleData = exampleDataByTheme.assopoker;

const defaultFallbacks = {
  matchInfo: "Upcoming match - time to be confirmed",
  leftTeamName: "TEAM A",
  rightTeamName: "TEAM B"
};
const defaultPitchColor = "#38b76a";
const teamPaletteEntries = (window.teamPaletteData || []).map(([name, markerColor, markerBorderColor, aliases]) => ({
  name,
  markerColor,
  markerBorderColor,
  aliases: Array.isArray(aliases) ? aliases : []
}));
const manualTeamPaletteAliases = {
  brasile: "Brazil",
  inghilterra: "England",
  francia: "France",
  germania: "Germany",
  spagna: "Spain",
  olanda: "Netherlands",
  statiuniti: "United States",
  coreadelsud: "Korea Republic",
  repubblicaceca: "Czechia",
  costadavorio: "Ivory Coast"
};
const teamPaletteIndex = buildTeamPaletteIndex(teamPaletteEntries, manualTeamPaletteAliases);
const squadTitleFontFamily = '"Montserrat ExtraBold Italic", "Arial Black", Arial, sans-serif';
const squadTitleFontPath = "assets/Montserrat-ExtraBoldItalic.ttf?v=20260619-1125";
const betfairSquadTitleFontFamily = '"Noto Sans ExtraCondensed Black", "Arial Narrow", Impact, sans-serif';
const betfairSquadTitleFontPath = "assets/NotoSans-ExtraCondensed-Black.ttf?v=20260608-1045";
const betfairGraphicTextFontFamily = '"Noto Sans Condensed Bold", "Arial Narrow", Arial, sans-serif';
const betfairGraphicTextFontPath = "assets/NotoSans-Condensed-Bold.ttf?v=20260608-1110";
const betfairMatchInfoFontFamily = '"Noto Sans Condensed Bold Italic", "Arial Narrow", Arial, sans-serif';
const betfairMatchInfoFontPath = "assets/NotoSans-Condensed-BoldItalic.ttf?v=20260608-1810";
const graphicTextFontFamily = '"Rubik", Arial, sans-serif';
const graphicTextFontPath = "assets/Rubik-VariableFont_wght.ttf?v=20260606-1154";
const sideSectionTitleFontFamily = '"Rubik Medium", Arial, sans-serif';
const sideSectionTitleFontPath = "assets/Rubik-Medium.ttf?v=20260606-1520";
const sideSectionListFontFamily = '"Rubik Regular", Arial, sans-serif';
const sideSectionListFontPath = "assets/Rubik-Regular.ttf?v=20260606-1535";
const playerLabelFontFamily = '"Rubik Medium", Arial, sans-serif';
const matchInfoFontFamily = '"Rubik Italic", Arial, sans-serif';
const matchInfoFontPath = "assets/Rubik-Italic.ttf?v=20260606-1620";
const outputFormats = {
  vertical: { size: "1080x1350", label: "Vertical 1080x1350" },
  horizontal: { size: "1200x675", label: "Horizontal 1200x675" }
};
const defaultOutputFormat = "vertical";
const localAppUrl = "http://127.0.0.1:4173/index.html";

const backgroundThemesByProject = {
  assopoker: [
    {
      key: "assopoker-main",
      label: "AssoPoker Background",
      path: "assets/assopoker-background.jpg?v=20260619-1325",
      // Nel formato verticale lo sfondo orizzontale viene ricomposto: texture centrale + pennellate agli angoli.
      verticalComposition: {
        base: { x: 380, y: 110, width: 432, height: 540 },
        cornerScale: 1.5,
        corners: [
          { corner: "top-left", x: 0, y: 0, width: 230, height: 110 },
          { corner: "top-right", x: 1010, y: 0, width: 190, height: 90 },
          { corner: "bottom-left", x: 0, y: 510, width: 140, height: 165 },
          { corner: "bottom-right", x: 1120, y: 490, width: 80, height: 185 }
        ]
      }
    }
  ],
  betfair: [
    { key: "betfair-gold", label: "Betfair Gold", path: "assets/betfair-bg-gold.png?v=20260608-1030" },
    { key: "betfair-dark", label: "Betfair Dark", path: "assets/betfair-bg-dark.jpg?v=20260608-1030" }
  ]
};
const allBackgroundThemes = Object.values(backgroundThemesByProject).flat();
const backgroundThemeMap = new Map(allBackgroundThemes.map((theme) => [theme.key, theme]));
const pitchImagePath = "assets/pitch-current.png?v=20260605-1920";
const pitchOpacity = 0.7;
const exportRenderScale = 2;
const exportJpegQuality = 0.98;

const verticalLayoutReference = {
  canvas: { width: 1080, height: 1350 },
  pitchArea: { x: 212, y: 146, width: 656, height: 1056 },
  sizeScale: 1.35,
  sideColumns: { inset: 10, gapFromPitch: 6, halfGap: 12 },
  header: {
    info: { x: 540, y: 32 },
    topTitle: { x: 540, y: 76 },
    topFormation: { x: 540, y: 116 },
    bottomTitle: { x: 540, y: 1250 },
    bottomFormation: { x: 540, y: 1292 }
  }
};

const layoutReference = {
  canvas: { width: 1200, height: 675 },
  pitchArea: { x: 130, y: 93, width: 940, height: 564 },
  sideBoxes: { inset: 2, gapFromPitch: 2 },
  bench: { y: 93, height: 277 },
  missing: { y: 379, height: 278 },
  header: {
    leftTitle: { x: 322, y: 45 },
    leftFormation: { x: 322, y: 72 },
    rightTitle: { x: 915, y: 45 },
    rightFormation: { x: 915, y: 72 },
    info: { x: 600, y: 80 }
  }
};

let canvas;
let ctx;
let backgroundImages = new Map();
let pitchImage;
let pitchImageReady = false;
let pitchImageCrop = null;
let pitchPlayableAreaRatios = { left: 0.055, top: 0.05, right: 0.945, bottom: 0.95 };
let verticalPitchImage = null;
const backgroundStrokeLayers = new Map();
let livePreviewTimeout;
let squadTitleFontReady = false;
let betfairSquadTitleFontReady = false;
let betfairGraphicTextFontReady = false;
let betfairMatchInfoFontReady = false;
let graphicTextFontReady = false;
let sideSectionTitleFontReady = false;
let sideSectionListFontReady = false;
let matchInfoFontReady = false;

document.addEventListener("DOMContentLoaded", init);

function init() {
  if (redirectFromFileProtocol()) {
    return;
  }

  canvas = document.getElementById("graphic-canvas");
  ctx = canvas.getContext("2d");
  populateBackgroundSelect();
  preloadBackgroundImages();
  preloadPitchImage();
  preloadSquadTitleFont();
  preloadBetfairSquadTitleFont();
  preloadBetfairGraphicTextFont();
  preloadBetfairMatchInfoFont();
  preloadGraphicTextFont();
  preloadSideSectionTitleFont();
  preloadSideSectionListFont();
  preloadMatchInfoFont();
  const form = document.getElementById("graphic-form");

  populateFormationSelect("left-formation");
  populateFormationSelect("right-formation");
  populateTeamPaletteDatalist();
  setupTeamPaletteInput("left");
  setupTeamPaletteInput("right");
  document.getElementById("project-theme").addEventListener("change", handleProjectThemeChange);
  document.getElementById("output-format").value = defaultOutputFormat;

  document.getElementById("load-example-btn").addEventListener("click", () => {
    loadExample(document.getElementById("project-theme").value);
    drawGraphic();
  });

  document.getElementById("download-btn").addEventListener("click", handleDownloadClick);
  form.addEventListener("input", scheduleLivePreview);
  form.addEventListener("change", scheduleLivePreview);

  loadExample();
  updatePreviewSizeLabel();
  drawGraphic({ strict: false, alertOnError: false });
}

function redirectFromFileProtocol() {
  if (window.location.protocol !== "file:") {
    return false;
  }

  window.location.replace(localAppUrl);
  return true;
}

function populateFormationSelect(selectId) {
  const select = document.getElementById(selectId);
  Object.keys(formations).forEach((formation) => {
    const option = document.createElement("option");
    option.value = formation;
    option.textContent = formation;
    select.appendChild(option);
  });
}

function populateBackgroundSelect() {
  const activeThemeKey = document.getElementById("project-theme")?.value || "assopoker";
  const select = document.getElementById("background-theme");
  const themes = backgroundThemesByProject[activeThemeKey] || backgroundThemesByProject.assopoker;

  select.innerHTML = "";
  themes.forEach((theme) => {
    const option = document.createElement("option");
    option.value = theme.key;
    option.textContent = theme.label;
    select.appendChild(option);
  });
}

function handleProjectThemeChange(event) {
  const themeKey = event.target.value;
  applyProjectTheme(themeKey);
  populateBackgroundSelect();
  loadExample(themeKey);
  drawGraphic({ strict: false, alertOnError: false });
}

function populateTeamPaletteDatalist() {
  const datalist = document.getElementById("team-palette-options");
  if (!datalist) {
    return;
  }

  datalist.innerHTML = "";
  const fragment = document.createDocumentFragment();
  [...teamPaletteEntries]
    .sort((first, second) => first.name.localeCompare(second.name, "it"))
    .forEach((team) => {
      const option = document.createElement("option");
      option.value = team.name;
      fragment.appendChild(option);
    });

  datalist.appendChild(fragment);
}

function setupTeamPaletteInput(side) {
  const teamPaletteInput = document.getElementById(`${side}-team-palette`);
  const teamNameInput = document.getElementById(`${side}-team-name`);

  teamPaletteInput.addEventListener("input", () => {
    applyTeamPaletteSelection(side, teamPaletteInput.value);
  });
  teamPaletteInput.addEventListener("change", () => {
    applyTeamPaletteSelection(side, teamPaletteInput.value);
  });
  teamPaletteInput.addEventListener("blur", () => {
    applyTeamPaletteSelection(side, teamPaletteInput.value);
  });
  teamNameInput.addEventListener("blur", () => {
    syncTeamPaletteField(side, teamNameInput.value, { applyColors: true });
  });
}

function loadExample(themeKey = "assopoker") {
  const selectedTheme = projectThemes[themeKey] ? themeKey : "assopoker";
  const example = exampleDataByTheme[selectedTheme];

  document.getElementById("project-theme").value = selectedTheme;
  applyProjectTheme(selectedTheme);
  document.getElementById("match-info").value = example.matchInfo;
  document.getElementById("background-theme").value = example.backgroundTheme;

  fillTeamFields("left", example.left);
  fillTeamFields("right", example.right);
  updatePreviewSizeLabel();
}

function applyProjectTheme(themeKey) {
  const resolvedThemeKey = projectThemes[themeKey] ? themeKey : "assopoker";
  const theme = projectThemes[resolvedThemeKey] || projectThemes.assopoker;
  document.body.dataset.projectTheme = resolvedThemeKey;
  document.getElementById("hero-eyebrow").textContent = theme.eyebrow;
  document.getElementById("hero-title").textContent = theme.heroTitle;
  document.getElementById("hero-copy").textContent = theme.heroCopy;
  document.getElementById("hero-badge").textContent = theme.heroBadge;
  document.getElementById("settings-copy").textContent = theme.settingsCopy;
  document.getElementById("preview-copy").textContent = theme.previewCopy;
}

function getActiveProjectTheme() {
  return document.getElementById("project-theme")?.value || "assopoker";
}

function getActiveOutputFormatKey() {
  const value = document.getElementById("output-format")?.value;
  return outputFormats[value] ? value : defaultOutputFormat;
}

function getActiveGraphicTextFontFamily() {
  return getActiveProjectTheme() === "betfair" ? betfairGraphicTextFontFamily : graphicTextFontFamily;
}

function getActiveMatchInfoFontFamily() {
  return getActiveProjectTheme() === "betfair" ? betfairMatchInfoFontFamily : matchInfoFontFamily;
}

function getActiveBackgroundThemeKey() {
  return document.getElementById("background-theme")?.value || projectThemes[getActiveProjectTheme()]?.defaultBackgroundTheme || projectThemes.assopoker.defaultBackgroundTheme;
}

function getActiveTextPalette() {
  const activeProjectTheme = getActiveProjectTheme();
  const backgroundThemeKey = getActiveBackgroundThemeKey();
  const isBetfairDark = activeProjectTheme === "betfair" && backgroundThemeKey === "betfair-dark";

  if (isBetfairDark) {
    return {
      headerTitle: "#f5c343",
      headerMeta: "#efc14f",
      headerInfo: "#e4b53f",
      sideTitle: "#f5c343",
      sideList: "rgba(242, 197, 75, 0.96)"
    };
  }

  return {
    headerTitle: "#0d1111",
    headerMeta: "#101414",
    headerInfo: "#0c2626",
    sideTitle: "#0f2123",
    sideList: "rgba(20, 49, 54, 0.92)"
  };
}

function fillTeamFields(side, data) {
  document.getElementById(`${side}-team-name`).value = data.teamName;
  document.getElementById(`${side}-formation`).value = data.formation;
  document.getElementById(`${side}-coach`).value = data.coach || "";
  document.getElementById(`${side}-marker-color`).value = data.markerColor;
  document.getElementById(`${side}-marker-border-color`).value = data.markerBorderColor;
  document.getElementById(`${side}-starters`).value = data.starters.join("\n");
  document.getElementById(`${side}-bench`).value = data.bench.join("\n");
  document.getElementById(`${side}-missing`).value = data.missing.join("\n");
  syncTeamPaletteField(side, data.teamName, { applyColors: false });
}

function applyTeamPaletteSelection(side, rawValue) {
  const match = findTeamPaletteMatch(rawValue);
  if (!match) {
    return false;
  }

  document.getElementById(`${side}-team-palette`).value = match.name;
  document.getElementById(`${side}-team-name`).value = match.name;
  document.getElementById(`${side}-marker-color`).value = match.markerColor;
  document.getElementById(`${side}-marker-border-color`).value = match.markerBorderColor;
  scheduleLivePreview();
  return true;
}

function syncTeamPaletteField(side, rawValue, options = {}) {
  const { applyColors = false } = options;
  const teamPaletteInput = document.getElementById(`${side}-team-palette`);
  const match = findTeamPaletteMatch(rawValue);

  teamPaletteInput.value = match ? match.name : rawValue.trim();

  if (match && applyColors) {
    document.getElementById(`${side}-marker-color`).value = match.markerColor;
    document.getElementById(`${side}-marker-border-color`).value = match.markerBorderColor;
  }
}

function findTeamPaletteMatch(rawValue) {
  const normalized = normalizeSearchText(rawValue);
  return normalized ? teamPaletteIndex.get(normalized) || null : null;
}

function buildTeamPaletteIndex(entries, extraAliases = {}) {
  const index = new Map();

  entries.forEach((team) => {
    const searchTerms = [team.name, ...team.aliases];
    searchTerms.forEach((term) => {
      const normalized = normalizeSearchText(term);
      if (normalized && !index.has(normalized)) {
        index.set(normalized, team);
      }
    });
  });

  Object.entries(extraAliases).forEach(([alias, canonicalName]) => {
    const canonicalTeam = entries.find((team) => team.name === canonicalName);
    const normalized = normalizeSearchText(alias);
    if (canonicalTeam && normalized) {
      index.set(normalized, canonicalTeam);
    }
  });

  return index;
}

function normalizeSearchText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function getFormData() {
  return {
    projectTheme: document.getElementById("project-theme").value || "assopoker",
    orientation: getActiveOutputFormatKey(),
    outputSize: outputFormats[getActiveOutputFormatKey()].size,
    matchInfo: document.getElementById("match-info").value.trim() || defaultFallbacks.matchInfo,
    backgroundTheme: document.getElementById("background-theme").value || projectThemes.assopoker.defaultBackgroundTheme,
    left: {
      side: "left",
      teamName: document.getElementById("left-team-name").value.trim() || defaultFallbacks.leftTeamName,
      formation: document.getElementById("left-formation").value,
      coach: document.getElementById("left-coach").value.trim(),
      markerColor: document.getElementById("left-marker-color").value,
      markerBorderColor: document.getElementById("left-marker-border-color").value,
      starters: parseLines(document.getElementById("left-starters").value),
      bench: parseLines(document.getElementById("left-bench").value),
      missing: parseLines(document.getElementById("left-missing").value)
    },
    right: {
      side: "right",
      teamName: document.getElementById("right-team-name").value.trim() || defaultFallbacks.rightTeamName,
      formation: document.getElementById("right-formation").value,
      coach: document.getElementById("right-coach").value.trim(),
      markerColor: document.getElementById("right-marker-color").value,
      markerBorderColor: document.getElementById("right-marker-border-color").value,
      starters: parseLines(document.getElementById("right-starters").value),
      bench: parseLines(document.getElementById("right-bench").value),
      missing: parseLines(document.getElementById("right-missing").value)
    }
  };
}

function parseLines(value) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function validateData(data, options = {}) {
  const { alertOnError = true, requireFullStarters = true } = options;
  const requiredSides = [data.left, data.right];

  for (const team of requiredSides) {
    if (!formations[team.formation]) {
      if (alertOnError) {
        alert(`Select a valid formation for ${team.teamName}.`);
      }
      return false;
    }

    if (requireFullStarters && team.starters.length !== 11) {
      if (alertOnError) {
        alert(`${team.teamName} must have exactly 11 starters. There are currently ${team.starters.length}.`);
      }
      return false;
    }
  }

  return true;
}

function drawGraphic(options = {}) {
  const { strict = true, alertOnError = true } = options;
  const data = getFormData();
  const isExportReady = validateData(data, { alertOnError: false, requireFullStarters: true });
  const assetsReady = pitchImageReady;
  document.getElementById("download-btn").disabled = !isExportReady || !assetsReady;

  if (strict && !validateData(data, { alertOnError, requireFullStarters: true })) {
    return false;
  }

  const output = parseOutputSize(data.outputSize);
  renderGraphicToSurface(canvas, ctx, data, output.width, output.height, { assetsReady });

  updatePreviewSizeLabel();
  return assetsReady;
}

function configureCanvasRenderingQuality(context) {
  context.imageSmoothingEnabled = true;
  if ("imageSmoothingQuality" in context) {
    context.imageSmoothingQuality = "high";
  }
}

function renderGraphicToSurface(targetCanvas, targetContext, data, width, height, options = {}) {
  const { assetsReady = pitchImageReady } = options;

  targetCanvas.width = width;
  targetCanvas.height = height;
  configureCanvasRenderingQuality(targetContext);

  if (data.orientation === "vertical") {
    return renderVerticalGraphic(targetContext, data, width, height, assetsReady);
  }

  const layout = getScaledLayout(width, height);

  drawBackground(targetContext, width, height, data.backgroundTheme);
  drawSideBoxes(targetContext, layout);
  drawHeader(targetContext, data, layout, width);

  if (!assetsReady) {
    drawPitchLoadingState(targetContext, layout);
    return false;
  }

  drawPitch(targetContext, layout);
  drawPlayers(targetContext, [data.left, data.right], layout);
  drawBenchAndMissing(targetContext, data.left, layout.sideLeft, layout);
  drawBenchAndMissing(targetContext, data.right, layout.sideRight, layout);
  return true;
}

function drawPitchLoadingState(context, layout) {
  const pitch = layout.pitch;
  const radius = 22 * layout.scaleX;
  const activeGraphicTextFamily = getActiveGraphicTextFontFamily();

  context.save();
  context.fillStyle = "rgba(33, 197, 109, 0.88)";
  roundedRect(context, pitch.x, pitch.y, pitch.width, pitch.height, radius, true, false);
  context.fillStyle = "rgba(255, 255, 255, 0.92)";
  context.font = `800 ${Math.max(18, 22 * layout.scaleX)}px ${activeGraphicTextFamily}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("LOADING PITCH...", pitch.x + pitch.width / 2, pitch.y + pitch.height / 2);
  context.restore();
}

function scheduleLivePreview() {
  clearTimeout(livePreviewTimeout);
  livePreviewTimeout = window.setTimeout(() => {
    drawGraphic({ strict: false, alertOnError: false });
  }, 80);
}

function parseOutputSize(size) {
  const [width, height] = size.split("x").map(Number);
  return { width, height };
}

function getScaledLayout(width, height) {
  const scaleX = width / layoutReference.canvas.width;
  const scaleY = height / layoutReference.canvas.height;
  const pitchReference = layoutReference.pitchArea;
  const sideLeft = getSideBoxReference("left", pitchReference);
  const sideRight = getSideBoxReference("right", pitchReference);

  const scaleRect = (rect) => ({
    x: rect.x * scaleX,
    y: rect.y * scaleY,
    width: rect.width * scaleX,
    height: rect.height * scaleY
  });

  return {
    scaleX,
    scaleY,
    pitch: scaleRect(pitchReference),
    sideLeft: {
      x: sideLeft.x * scaleX,
      y: layoutReference.bench.y * scaleY,
      width: sideLeft.width * scaleX,
      height: 0,
      bench: {
        x: sideLeft.x * scaleX,
        y: layoutReference.bench.y * scaleY,
        width: sideLeft.width * scaleX,
        height: layoutReference.bench.height * scaleY
      },
      missing: {
        x: sideLeft.x * scaleX,
        y: layoutReference.missing.y * scaleY,
        width: sideLeft.width * scaleX,
        height: layoutReference.missing.height * scaleY
      }
    },
    sideRight: {
      x: sideRight.x * scaleX,
      y: layoutReference.bench.y * scaleY,
      width: sideRight.width * scaleX,
      height: 0,
      bench: {
        x: sideRight.x * scaleX,
        y: layoutReference.bench.y * scaleY,
        width: sideRight.width * scaleX,
        height: layoutReference.bench.height * scaleY
      },
      missing: {
        x: sideRight.x * scaleX,
        y: layoutReference.missing.y * scaleY,
        width: sideRight.width * scaleX,
        height: layoutReference.missing.height * scaleY
      }
    },
    header: {
      leftTitle: scalePoint(layoutReference.header.leftTitle, scaleX, scaleY),
      leftFormation: scalePoint(layoutReference.header.leftFormation, scaleX, scaleY),
      rightTitle: scalePoint(layoutReference.header.rightTitle, scaleX, scaleY),
      rightFormation: scalePoint(layoutReference.header.rightFormation, scaleX, scaleY),
      info: scalePoint(layoutReference.header.info, scaleX, scaleY)
    }
  };
}

function getSideBoxReference(side, pitchReference) {
  const canvasWidth = layoutReference.canvas.width;
  const pitchLeft = pitchReference.x;
  const pitchRight = pitchReference.x + pitchReference.width;
  const outerInset = layoutReference.sideBoxes.inset;
  const gapFromPitch = layoutReference.sideBoxes.gapFromPitch;

  if (side === "left") {
    return {
      x: outerInset,
      width: pitchLeft - outerInset - gapFromPitch
    };
  }

  return {
    x: pitchRight + gapFromPitch,
    width: canvasWidth - pitchRight - gapFromPitch - outerInset
  };
}

function scalePoint(point, scaleX, scaleY) {
  return { x: point.x * scaleX, y: point.y * scaleY };
}

function drawBackground(context, width, height, backgroundThemeKey) {
  const activeThemeKey = document.getElementById("project-theme")?.value || "assopoker";
  const defaultThemeBackground = projectThemes[activeThemeKey]?.defaultBackgroundTheme || projectThemes.assopoker.defaultBackgroundTheme;
  const activeBackground = backgroundImages.get(backgroundThemeKey) || backgroundImages.get(defaultThemeBackground);

  if (activeBackground?.ready && activeBackground.image) {
    drawCoverImage(context, activeBackground.image, width, height);
    return;
  }

  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#70d7dc");
  gradient.addColorStop(0.55, "#59c7bc");
  gradient.addColorStop(1, "#7fd077");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  context.save();
  context.globalAlpha = 0.12;

  for (let x = -width * 0.15; x < width * 1.15; x += width * 0.12) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x + width * 0.08, 0);
    context.lineTo(x + width * 0.22, height);
    context.lineTo(x + width * 0.14, height);
    context.closePath();
    context.fillStyle = x % (width * 0.24) === 0 ? "#f7fffb" : "#0d8462";
    context.fill();
  }

  context.globalAlpha = 0.08;
  const step = width * 0.12;
  for (let x = 0; x < width + step; x += step) {
    for (let y = 0; y < height + step; y += step) {
      context.beginPath();
      context.moveTo(x, y + step * 0.2);
      context.lineTo(x + step * 0.2, y);
      context.lineTo(x + step * 0.4, y + step * 0.2);
      context.lineTo(x + step * 0.2, y + step * 0.4);
      context.closePath();
      context.fillStyle = "#ffffff";
      context.fill();
    }
  }

  context.restore();
}

function preloadBackgroundImages() {
  allBackgroundThemes.forEach((theme) => {
    const image = new Image();
    const state = { image, ready: false };
    backgroundImages.set(theme.key, state);
    image.addEventListener("load", () => {
      state.ready = true;
      drawGraphic({ strict: false, alertOnError: false });
    });
    image.addEventListener("error", () => {
      state.ready = false;
    });
    image.src = theme.path;
  });
}

function preloadSquadTitleFont() {
  if (!("FontFace" in window) || !document.fonts) {
    return;
  }

  const font = new FontFace("Montserrat ExtraBold Italic", `url(${squadTitleFontPath})`);
  font
    .load()
    .then((loadedFont) => {
      document.fonts.add(loadedFont);
      squadTitleFontReady = true;
      drawGraphic({ strict: false, alertOnError: false });
    })
    .catch(() => {
      squadTitleFontReady = false;
    });
}

function preloadBetfairSquadTitleFont() {
  if (!("FontFace" in window) || !document.fonts) {
    return;
  }

  const font = new FontFace("Noto Sans ExtraCondensed Black", `url(${betfairSquadTitleFontPath})`);
  font
    .load()
    .then((loadedFont) => {
      document.fonts.add(loadedFont);
      betfairSquadTitleFontReady = true;
      drawGraphic({ strict: false, alertOnError: false });
    })
    .catch(() => {
      betfairSquadTitleFontReady = false;
    });
}

function preloadBetfairGraphicTextFont() {
  if (!("FontFace" in window) || !document.fonts) {
    return;
  }

  const font = new FontFace("Noto Sans Condensed Bold", `url(${betfairGraphicTextFontPath})`);
  font
    .load()
    .then((loadedFont) => {
      document.fonts.add(loadedFont);
      betfairGraphicTextFontReady = true;
      drawGraphic({ strict: false, alertOnError: false });
    })
    .catch(() => {
      betfairGraphicTextFontReady = false;
    });
}

function preloadBetfairMatchInfoFont() {
  if (!("FontFace" in window) || !document.fonts) {
    return;
  }

  const font = new FontFace("Noto Sans Condensed Bold Italic", `url(${betfairMatchInfoFontPath})`);
  font
    .load()
    .then((loadedFont) => {
      document.fonts.add(loadedFont);
      betfairMatchInfoFontReady = true;
      drawGraphic({ strict: false, alertOnError: false });
    })
    .catch(() => {
      betfairMatchInfoFontReady = false;
    });
}

function preloadGraphicTextFont() {
  if (!("FontFace" in window) || !document.fonts) {
    return;
  }

  const font = new FontFace("Rubik", `url(${graphicTextFontPath})`);
  font
    .load()
    .then((loadedFont) => {
      document.fonts.add(loadedFont);
      graphicTextFontReady = true;
      drawGraphic({ strict: false, alertOnError: false });
    })
    .catch(() => {
      graphicTextFontReady = false;
    });
}

function preloadSideSectionTitleFont() {
  if (!("FontFace" in window) || !document.fonts) {
    return;
  }

  const font = new FontFace("Rubik Medium", `url(${sideSectionTitleFontPath})`);
  font
    .load()
    .then((loadedFont) => {
      document.fonts.add(loadedFont);
      sideSectionTitleFontReady = true;
      drawGraphic({ strict: false, alertOnError: false });
    })
    .catch(() => {
      sideSectionTitleFontReady = false;
    });
}

function preloadSideSectionListFont() {
  if (!("FontFace" in window) || !document.fonts) {
    return;
  }

  const font = new FontFace("Rubik Regular", `url(${sideSectionListFontPath})`);
  font
    .load()
    .then((loadedFont) => {
      document.fonts.add(loadedFont);
      sideSectionListFontReady = true;
      drawGraphic({ strict: false, alertOnError: false });
    })
    .catch(() => {
      sideSectionListFontReady = false;
    });
}

function preloadMatchInfoFont() {
  if (!("FontFace" in window) || !document.fonts) {
    return;
  }

  const font = new FontFace("Rubik Italic", `url(${matchInfoFontPath})`);
  font
    .load()
    .then((loadedFont) => {
      document.fonts.add(loadedFont);
      matchInfoFontReady = true;
      drawGraphic({ strict: false, alertOnError: false });
    })
    .catch(() => {
      matchInfoFontReady = false;
    });
}

function preloadPitchImage() {
  pitchImage = new Image();
  pitchImage.addEventListener("load", () => {
    pitchImageReady = true;
    pitchImageCrop = {
      x: 0,
      y: 0,
      width: pitchImage.naturalWidth,
      height: pitchImage.naturalHeight
    };
    const whiteLineBounds = detectWhiteLineBounds(pitchImage, pitchImageCrop);
    if (pitchImageCrop && whiteLineBounds) {
      pitchPlayableAreaRatios = {
        left: (whiteLineBounds.x - pitchImageCrop.x) / pitchImageCrop.width,
        top: (whiteLineBounds.y - pitchImageCrop.y) / pitchImageCrop.height,
        right: (whiteLineBounds.x + whiteLineBounds.width - pitchImageCrop.x) / pitchImageCrop.width,
        bottom: (whiteLineBounds.y + whiteLineBounds.height - pitchImageCrop.y) / pitchImageCrop.height
      };
    }
    verticalPitchImage = createRotatedImage(pitchImage);
    drawGraphic({ strict: false, alertOnError: false });
  });
  pitchImage.addEventListener("error", () => {
    pitchImageReady = false;
    pitchImageCrop = null;
  });
  pitchImage.src = pitchImagePath;
}

function drawCoverImage(context, image, width, height) {
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const canvasRatio = width / height;
  let drawWidth;
  let drawHeight;
  let offsetX = 0;
  let offsetY = 0;

  if (imageRatio > canvasRatio) {
    drawHeight = height;
    drawWidth = drawHeight * imageRatio;
    offsetX = (width - drawWidth) / 2;
  } else {
    drawWidth = width;
    drawHeight = drawWidth / imageRatio;
    offsetY = (height - drawHeight) / 2;
  }

  context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}

function drawTrimmedImage(context, image, crop, x, y, width, height) {
  if (!crop) {
    context.drawImage(image, x, y, width, height);
    return;
  }

  context.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    x,
    y,
    width,
    height
  );
}

function detectContentBounds(image) {
  const probeCanvas = document.createElement("canvas");
  probeCanvas.width = image.naturalWidth;
  probeCanvas.height = image.naturalHeight;
  const probeContext = probeCanvas.getContext("2d", { willReadFrequently: true });
  probeContext.drawImage(image, 0, 0);

  const { data, width, height } = probeContext.getImageData(0, 0, probeCanvas.width, probeCanvas.height);
  const backgroundTolerance = 10;
  const alphaThreshold = 10;
  const backgroundR = data[0];
  const backgroundG = data[1];
  const backgroundB = data[2];
  const backgroundA = data[3];
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const a = data[index + 3];
      const colorDelta = Math.max(
        Math.abs(r - backgroundR),
        Math.abs(g - backgroundG),
        Math.abs(b - backgroundB),
        Math.abs(a - backgroundA)
      );

      if (a > alphaThreshold && colorDelta > backgroundTolerance) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  if (maxX < minX || maxY < minY) {
    return null;
  }

  return {
    x: minX,
    y: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1
  };
}

function detectWhiteLineBounds(image, crop) {
  if (!crop) {
    return null;
  }

  const probeCanvas = document.createElement("canvas");
  probeCanvas.width = image.naturalWidth;
  probeCanvas.height = image.naturalHeight;
  const probeContext = probeCanvas.getContext("2d", { willReadFrequently: true });
  probeContext.drawImage(image, 0, 0);

  const { data, width } = probeContext.getImageData(crop.x, crop.y, crop.width, crop.height);
  const whiteThreshold = 235;
  const alphaThreshold = 180;
  let minX = crop.width;
  let minY = crop.height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < crop.height; y += 1) {
    for (let x = 0; x < crop.width; x += 1) {
      const index = (y * width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const a = data[index + 3];

      if (a >= alphaThreshold && r >= whiteThreshold && g >= whiteThreshold && b >= whiteThreshold) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  if (maxX < minX || maxY < minY) {
    return null;
  }

  return {
    x: crop.x + minX,
    y: crop.y + minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1
  };
}

function getPlayablePitchBounds(pitch, ratios = pitchPlayableAreaRatios) {
  const left = pitch.x + pitch.width * ratios.left;
  const top = pitch.y + pitch.height * ratios.top;
  const right = pitch.x + pitch.width * ratios.right;
  const bottom = pitch.y + pitch.height * ratios.bottom;

  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top
  };
}

function drawSideBoxes(context, layout) {
  return;
}

function drawHeader(context, data, layout, canvasWidth) {
  const activeProjectTheme = document.getElementById("project-theme")?.value || "assopoker";
  const activeSquadTitleFontFamily = activeProjectTheme === "betfair" ? betfairSquadTitleFontFamily : squadTitleFontFamily;
  const activeGraphicTextFamily = getActiveGraphicTextFontFamily();
  const activeMatchInfoFontFamily = getActiveMatchInfoFontFamily();
  const textPalette = getActiveTextPalette();
  const titleFontSize = 28 * layout.scaleX;
  const titleMinFontSize = 28 * layout.scaleX;
  const subFontSize = Math.max(15, canvasWidth * 0.016);
  const infoFontSize = 14 * layout.scaleX;
  const titleMaxWidth = canvasWidth * 0.34;
  const subLineMaxWidth = canvasWidth * 0.28;
  const sharedTeamTitles = fitSharedSingleLineTexts(
    context,
    [data.left.teamName, data.right.teamName],
    titleFontSize,
    titleMaxWidth,
    activeSquadTitleFontFamily,
    titleMinFontSize
  );

  drawCenteredText(context, sharedTeamTitles[0].text, layout.header.leftTitle.x, layout.header.leftTitle.y, {
    fontSize: sharedTeamTitles[0].fontSize,
    minFontSize: sharedTeamTitles[0].fontSize,
    fontFamily: activeSquadTitleFontFamily,
    fillStyle: textPalette.headerTitle
  });

  const leftFormationLine = [data.left.formation, data.left.coach].filter(Boolean).join(" | ");
  const rightFormationLine = [data.right.formation, data.right.coach].filter(Boolean).join(" | ");

  drawCenteredText(context, leftFormationLine, layout.header.leftFormation.x, layout.header.leftFormation.y, {
    fontSize: subFontSize,
    fontFamily: activeGraphicTextFamily,
    fillStyle: textPalette.headerMeta,
    maxWidth: subLineMaxWidth
  });

  drawCenteredText(context, sharedTeamTitles[1].text, layout.header.rightTitle.x, layout.header.rightTitle.y, {
    fontSize: sharedTeamTitles[1].fontSize,
    minFontSize: sharedTeamTitles[1].fontSize,
    fontFamily: activeSquadTitleFontFamily,
    fillStyle: textPalette.headerTitle
  });

  drawCenteredText(context, rightFormationLine, layout.header.rightFormation.x, layout.header.rightFormation.y, {
    fontSize: subFontSize,
    fontFamily: activeGraphicTextFamily,
    fillStyle: textPalette.headerMeta,
    maxWidth: subLineMaxWidth
  });

  drawCenteredText(context, data.matchInfo, layout.header.info.x, layout.header.info.y, {
    fontSize: infoFontSize,
    fontFamily: activeMatchInfoFontFamily,
    fillStyle: textPalette.headerInfo,
    maxWidth: canvasWidth * 0.32
  });
}

function drawPitch(context, layout) {
  const pitch = layout.pitch;
  const isVertical = layout.orientation === "vertical";
  const activePitchImage = isVertical ? verticalPitchImage : pitchImage;

  if (pitchImageReady && activePitchImage) {
    context.save();
    context.globalAlpha = pitchOpacity;
    roundedRect(context, pitch.x, pitch.y, pitch.width, pitch.height, 22 * layout.scaleX, false, false);
    context.clip();
    drawTrimmedImage(context, activePitchImage, isVertical ? null : pitchImageCrop, pitch.x, pitch.y, pitch.width, pitch.height);
    context.restore();
    return;
  }

  const pitchGradient = context.createLinearGradient(pitch.x, pitch.y, pitch.x, pitch.y + pitch.height);
  pitchGradient.addColorStop(0, adjustColor(defaultPitchColor, 12));
  pitchGradient.addColorStop(1, adjustColor(defaultPitchColor, -12));

  context.save();
  context.globalAlpha = pitchOpacity;
  context.fillStyle = pitchGradient;
  roundedRect(context, pitch.x, pitch.y, pitch.width, pitch.height, 22 * layout.scaleX, true, false);
  context.restore();
}

function drawPlayers(context, teamsData, layout) {
  const players = teamsData.flatMap((teamData) => getPlayerRenderData(teamData, layout));
  resolvePlayerCollisions(players, layout);

  players.forEach((player) => {
    drawPlayer(context, player);
  });
}

function getPlayerRenderData(teamData, layout) {
  const pitch = layout.pitch;
  const playablePitch = getPlayablePitchBounds(pitch);
  const halfWidth = playablePitch.width / 2;
  const positions = formations[teamData.formation];
  const markerPadding = 20 * layout.scaleX;
  const midfieldShift = 12 * layout.scaleX;
  const baseBounds = getTeamHalfBounds(teamData.side, playablePitch, markerPadding);
  const visibleStarters = teamData.starters.slice(0, positions.length);
  const goalkeeperInsetX = 26 * layout.scaleX;
  const goalkeeperAnchorFlexX = 8 * layout.scaleX;
  const goalkeeperAnchorFlexY = 12 * layout.scaleY;

  return visibleStarters.map((player, index) => {
    const coord = positions[index];
    const mirroredY = teamData.side === "right" ? 1 - coord.y : coord.y;
    const y = playablePitch.y + mirroredY * playablePitch.height;
    const isGoalkeeper = index === 0;
    const x = isGoalkeeper
      ? teamData.side === "left"
        ? pitch.x + goalkeeperInsetX
        : pitch.x + pitch.width - goalkeeperInsetX
      : teamData.side === "left"
        ? playablePitch.x + coord.x * halfWidth + midfieldShift
        : playablePitch.x + playablePitch.width - coord.x * halfWidth - midfieldShift;
    const bounds = isGoalkeeper
      ? {
          minX: x - goalkeeperAnchorFlexX,
          maxX: x + goalkeeperAnchorFlexX,
          minY: Math.max(pitch.y + markerPadding, y - goalkeeperAnchorFlexY),
          maxY: Math.min(pitch.y + pitch.height - markerPadding, y + goalkeeperAnchorFlexY)
        }
      : baseBounds;

    return {
      name: player,
      x,
      y,
      anchorX: x,
      anchorY: y,
      side: teamData.side,
      pitch,
      playablePitch,
      renderBounds: isGoalkeeper ? pitch : playablePitch,
      minX: bounds.minX,
      maxX: bounds.maxX,
      minY: bounds.minY,
      maxY: bounds.maxY,
      markerColor: teamData.markerColor,
      markerBorderColor: teamData.markerBorderColor,
      scale: layout.scaleX
    };
  });
}

function getTeamHalfBounds(side, pitch, padding) {
  const halfWidth = pitch.width / 2;

  return {
    minX: side === "left" ? pitch.x + padding : pitch.x + halfWidth + padding,
    maxX: side === "left" ? pitch.x + halfWidth - padding : pitch.x + pitch.width - padding,
    minY: pitch.y + padding,
    maxY: pitch.y + pitch.height - padding
  };
}

function resolvePlayerCollisions(players, layout) {
  const sameTeamVerticalGap = 62 * layout.scaleY;
  const sameTeamHorizontalGap = 64 * layout.scaleX;
  const crossTeamVerticalGap = 54 * layout.scaleY;
  const crossTeamHorizontalGap = 52 * layout.scaleX;
  const sameTeamAnchorFlex = 18 * layout.scaleX;
  const crossTeamAnchorFlex = 28 * layout.scaleX;

  for (let pass = 0; pass < 18; pass += 1) {
    let moved = false;

    for (let index = 0; index < players.length; index += 1) {
      const current = players[index];

      for (let nextIndex = index + 1; nextIndex < players.length; nextIndex += 1) {
        const other = players[nextIndex];
        const isSameTeam = current.side === other.side;
        const verticalGap = isSameTeam ? sameTeamVerticalGap : crossTeamVerticalGap;
        const horizontalGap = isSameTeam ? sameTeamHorizontalGap : crossTeamHorizontalGap;
        const deltaX = other.x - current.x;
        const deltaY = other.y - current.y;

        if (Math.abs(deltaX) >= horizontalGap || Math.abs(deltaY) >= verticalGap) {
          continue;
        }

        moved = true;
        const pushY = (verticalGap - Math.abs(deltaY)) / 2;
        const safeDirectionY = deltaY === 0 ? (index % 2 === 0 ? -1 : 1) : Math.sign(deltaY);

        current.y = clamp(current.y - safeDirectionY * pushY, current.minY, current.maxY);
        other.y = clamp(other.y + safeDirectionY * pushY, other.minY, other.maxY);

        const pushX = (horizontalGap - Math.abs(deltaX)) / 2;

        if (isSameTeam) {
          const safeDirectionX = deltaX === 0 ? (current.anchorX <= other.anchorX ? 1 : -1) : Math.sign(deltaX);
          current.x = clamp(
            current.x - safeDirectionX * pushX * 0.22,
            Math.max(current.minX, current.anchorX - sameTeamAnchorFlex),
            Math.min(current.maxX, current.anchorX + sameTeamAnchorFlex)
          );
          other.x = clamp(
            other.x + safeDirectionX * pushX * 0.22,
            Math.max(other.minX, other.anchorX - sameTeamAnchorFlex),
            Math.min(other.maxX, other.anchorX + sameTeamAnchorFlex)
          );
        } else {
          current.x = clamp(
            current.x + (current.side === "left" ? -pushX * 0.34 : pushX * 0.34),
            Math.max(current.minX, current.anchorX - crossTeamAnchorFlex),
            Math.min(current.maxX, current.anchorX + crossTeamAnchorFlex)
          );
          other.x = clamp(
            other.x + (other.side === "left" ? -pushX * 0.34 : pushX * 0.34),
            Math.max(other.minX, other.anchorX - crossTeamAnchorFlex),
            Math.min(other.maxX, other.anchorX + crossTeamAnchorFlex)
          );
        }
      }
    }

    if (!moved) {
      break;
    }
  }
}

function drawPlayer(context, playerData) {
  const activeGraphicTextFamily = getActiveGraphicTextFontFamily();
  const activeProjectTheme = getActiveProjectTheme();
  const playablePitch = playerData.playablePitch || playerData.pitch;
  const renderBounds = playerData.renderBounds || playablePitch;
  const radius = 15 * playerData.scale;
  const fontSizeBoost = activeProjectTheme === "betfair" ? 2 : 0;
  const minFontSize = (11.5 + fontSizeBoost) * playerData.scale;
  const fontSize = Math.max(minFontSize, (13 + fontSizeBoost) * playerData.scale);
  const labelPaddingX = 5 * playerData.scale;
  const labelPaddingY = 3.5 * playerData.scale;
  const markerLabelGap = 3 * playerData.scale;
  const maxLabelWidth = playerData.maxLabelWidth || Math.min(renderBounds.width * 0.16, 96 * playerData.scale);
  const innerPadding = 4 * playerData.scale;

  const safeName = playerData.name.toUpperCase();
  const fitted = fitSingleLineText(
    context,
    safeName,
    fontSize,
    maxLabelWidth - labelPaddingX * 2,
    activeGraphicTextFamily,
    minFontSize
  );
  context.font = `500 ${fitted.fontSize}px ${activeGraphicTextFamily}`;

  const metrics = context.measureText(fitted.text);
  const labelWidth = metrics.width + labelPaddingX * 2;
  const labelHeight = fitted.fontSize + labelPaddingY * 2;
  const playerX = clamp(
    playerData.x,
    Math.max(renderBounds.x + radius + innerPadding, renderBounds.x + labelWidth / 2 + innerPadding),
    Math.min(
      renderBounds.x + renderBounds.width - radius - innerPadding,
      renderBounds.x + renderBounds.width - labelWidth / 2 - innerPadding
    )
  );
  const playerY = clamp(
    playerData.y,
    renderBounds.y + radius + innerPadding,
    renderBounds.y + renderBounds.height - radius - labelHeight - markerLabelGap - innerPadding
  );
  let labelX = playerX - labelWidth / 2;
  labelX = clamp(labelX, renderBounds.x + innerPadding, renderBounds.x + renderBounds.width - labelWidth - innerPadding);
  const labelY = clamp(
    playerY + radius + markerLabelGap,
    renderBounds.y + innerPadding,
    renderBounds.y + renderBounds.height - labelHeight - innerPadding
  );

  context.save();
  context.beginPath();
  context.fillStyle = playerData.markerColor;
  context.strokeStyle = playerData.markerBorderColor;
  context.lineWidth = 4 * playerData.scale;
  context.shadowColor = "rgba(5, 25, 40, 0.25)";
  context.shadowBlur = 8 * playerData.scale;
  context.arc(playerX, playerY, radius, 0, Math.PI * 2);
  context.fill();
  context.stroke();
  context.restore();

  context.save();
  context.fillStyle = "rgba(255, 255, 255, 0.82)";
  roundedRect(context, labelX, labelY, labelWidth, labelHeight, 8 * playerData.scale, true, false);
  context.fillStyle = "#111313";
  context.textAlign = "left";
  context.textBaseline = "middle";
  context.font = `500 ${fitted.fontSize}px ${activeGraphicTextFamily}`;
  context.fillText(fitted.text, labelX + labelPaddingX, labelY + labelHeight / 2 + 0.5);
  context.restore();
}

function drawBenchAndMissing(context, teamData, sideLayout, layout) {
  const listAlign = teamData.side === "right" ? "right" : "left";
  const titleAlign = teamData.side === "right" ? "right" : "left";
  drawBoxContent(context, sideLayout.bench, "PANCHINA", teamData.bench.length ? teamData.bench : ["Nessuno"], layout, { listAlign, titleAlign });
  drawBoxContent(context, sideLayout.missing, "ASSENTI", teamData.missing.length ? teamData.missing : ["Nessuno"], layout, { listAlign, titleAlign });
}

function drawBoxContent(context, box, title, items, layout, options = {}) {
  const activeGraphicTextFamily = getActiveGraphicTextFontFamily();
  const textPalette = getActiveTextPalette();
  const listAlign = options.listAlign || "left";
  const titleAlign = options.titleAlign || "left";
  const paddingX = 10 * layout.scaleX;
  const paddingY = 6 * layout.scaleY;
  const titleFontSize = 18 * layout.scaleX;
  const listTop = box.y + paddingY + titleFontSize + 7 * layout.scaleY;
  const listBox = {
    x: box.x + paddingX,
    y: listTop,
    width: box.width - paddingX * 2,
    height: box.y + box.height - listTop - paddingY
  };

  context.save();
  context.fillStyle = textPalette.sideTitle;
  context.font = `500 ${titleFontSize}px ${activeGraphicTextFamily}`;
  context.textAlign = titleAlign;
  context.textBaseline = "top";
  context.fillText(title, titleAlign === "right" ? box.x + box.width - paddingX : box.x + paddingX, box.y + paddingY);
  context.restore();

  const fitted = fitTextInBox(context, items, listBox, {
    maxFontSize: 15 * layout.scaleX,
    minFontSize: 15 * layout.scaleX,
    fontFamily: activeGraphicTextFamily,
    fontWeight: 400,
    lineHeightMultiplier: 1.22
  });

  drawWrappedText(context, fitted.lines, {
    ...listBox
  }, {
    fontSize: fitted.fontSize,
    fontFamily: activeGraphicTextFamily,
    fontWeight: 400,
    lineHeightMultiplier: 1.22,
    color: textPalette.sideList,
    align: listAlign
  });
}

function renderVerticalGraphic(context, data, width, height, assetsReady) {
  const layout = getVerticalLayout(width, height);

  drawVerticalBackground(context, width, height, data.backgroundTheme);
  drawVerticalHeader(context, data, layout);

  if (!assetsReady) {
    drawPitchLoadingState(context, layout);
    return false;
  }

  drawPitch(context, layout);
  drawVerticalPlayers(context, [data.left, data.right], layout);
  drawVerticalBenchAndMissing(context, data.left, layout.top, layout);
  drawVerticalBenchAndMissing(context, data.right, layout.bottom, layout);
  return true;
}

function getVerticalLayout(width, height) {
  const reference = verticalLayoutReference;
  const unitX = width / reference.canvas.width;
  const unitY = height / reference.canvas.height;
  const scale = unitX * reference.sizeScale;
  const pitch = {
    x: reference.pitchArea.x * unitX,
    y: reference.pitchArea.y * unitY,
    width: reference.pitchArea.width * unitX,
    height: reference.pitchArea.height * unitY
  };
  const { inset, gapFromPitch, halfGap } = reference.sideColumns;
  const columnWidth = (reference.pitchArea.x - inset - gapFromPitch) * unitX;
  const leftColumnX = inset * unitX;
  const rightColumnX = pitch.x + pitch.width + gapFromPitch * unitX;
  const halfHeight = pitch.height / 2 - halfGap * unitY;
  const buildHalf = (y) => ({
    bench: { x: leftColumnX, y, width: columnWidth, height: halfHeight },
    missing: { x: rightColumnX, y, width: columnWidth, height: halfHeight }
  });

  return {
    orientation: "vertical",
    unitX,
    unitY,
    scaleX: scale,
    scaleY: scale,
    pitch,
    top: buildHalf(pitch.y),
    bottom: buildHalf(pitch.y + pitch.height / 2 + halfGap * unitY),
    header: {
      info: scalePoint(reference.header.info, unitX, unitY),
      topTitle: scalePoint(reference.header.topTitle, unitX, unitY),
      topFormation: scalePoint(reference.header.topFormation, unitX, unitY),
      bottomTitle: scalePoint(reference.header.bottomTitle, unitX, unitY),
      bottomFormation: scalePoint(reference.header.bottomFormation, unitX, unitY)
    }
  };
}

function drawVerticalBackground(context, width, height, backgroundThemeKey) {
  const theme = backgroundThemeMap.get(backgroundThemeKey);
  const background = backgroundImages.get(backgroundThemeKey);
  const composition = theme?.verticalComposition;

  if (!composition || !background?.ready || !background.image) {
    drawBackground(context, width, height, backgroundThemeKey);
    return;
  }

  const { base } = composition;
  context.drawImage(background.image, base.x, base.y, base.width, base.height, 0, 0, width, height);

  const cornerScale = composition.cornerScale * (width / verticalLayoutReference.canvas.width);
  composition.corners.forEach((piece) => {
    const pieceWidth = piece.width * cornerScale;
    const pieceHeight = piece.height * cornerScale;
    const isRight = piece.corner.endsWith("right");
    const isBottom = piece.corner.startsWith("bottom");
    const strokeLayer = getBackgroundStrokeLayer(backgroundThemeKey, background.image, piece);
    context.drawImage(strokeLayer, isRight ? width - pieceWidth : 0, isBottom ? height - pieceHeight : 0, pieceWidth, pieceHeight);
  });
}

function getBackgroundStrokeLayer(themeKey, image, piece) {
  const cacheKey = `${themeKey}:${piece.corner}`;
  if (backgroundStrokeLayers.has(cacheKey)) {
    return backgroundStrokeLayers.get(cacheKey);
  }

  const layer = document.createElement("canvas");
  layer.width = piece.width;
  layer.height = piece.height;
  const layerContext = layer.getContext("2d", { willReadFrequently: true });
  layerContext.drawImage(image, piece.x, piece.y, piece.width, piece.height, 0, 0, piece.width, piece.height);

  // Tiene solo le pennellate colorate: la texture grigio chiaro diventa trasparente.
  const pixels = layerContext.getImageData(0, 0, piece.width, piece.height);
  const { data } = pixels;
  for (let index = 0; index < data.length; index += 4) {
    const darkest = Math.min(data[index], data[index + 1], data[index + 2]);
    data[index + 3] = Math.round(clamp((190 - darkest) / 45, 0, 1) * 255);
  }
  layerContext.putImageData(pixels, 0, 0);

  backgroundStrokeLayers.set(cacheKey, layer);
  return layer;
}

function createRotatedImage(image) {
  const rotated = document.createElement("canvas");
  rotated.width = image.naturalHeight;
  rotated.height = image.naturalWidth;
  const rotatedContext = rotated.getContext("2d");
  rotatedContext.translate(rotated.width, 0);
  rotatedContext.rotate(Math.PI / 2);
  rotatedContext.drawImage(image, 0, 0);
  return rotated;
}

function getVerticalPlayableAreaRatios() {
  // Il campo verticale è ruotato di 90° in senso orario rispetto all'immagine originale.
  return {
    left: 1 - pitchPlayableAreaRatios.bottom,
    right: 1 - pitchPlayableAreaRatios.top,
    top: pitchPlayableAreaRatios.left,
    bottom: pitchPlayableAreaRatios.right
  };
}

function drawVerticalHeader(context, data, layout) {
  const activeProjectTheme = getActiveProjectTheme();
  const activeSquadTitleFontFamily = activeProjectTheme === "betfair" ? betfairSquadTitleFontFamily : squadTitleFontFamily;
  const activeGraphicTextFamily = getActiveGraphicTextFontFamily();
  const activeMatchInfoFontFamily = getActiveMatchInfoFontFamily();
  const textPalette = getActiveTextPalette();
  const titleFontSize = 44 * layout.unitX;
  const subFontSize = 24 * layout.unitX;
  const infoFontSize = 20 * layout.unitX;
  const titleMaxWidth = 1000 * layout.unitX;
  const sharedTeamTitles = fitSharedSingleLineTexts(
    context,
    [data.left.teamName, data.right.teamName],
    titleFontSize,
    titleMaxWidth,
    activeSquadTitleFontFamily,
    titleFontSize * 0.7
  );
  const teams = [
    { team: data.left, title: sharedTeamTitles[0], titlePoint: layout.header.topTitle, formationPoint: layout.header.topFormation },
    { team: data.right, title: sharedTeamTitles[1], titlePoint: layout.header.bottomTitle, formationPoint: layout.header.bottomFormation }
  ];

  teams.forEach(({ team, title, titlePoint, formationPoint }) => {
    drawCenteredText(context, title.text, titlePoint.x, titlePoint.y, {
      fontSize: title.fontSize,
      minFontSize: title.fontSize,
      fontFamily: activeSquadTitleFontFamily,
      fillStyle: textPalette.headerTitle
    });

    drawCenteredText(context, [team.formation, team.coach].filter(Boolean).join(" | "), formationPoint.x, formationPoint.y, {
      fontSize: subFontSize,
      fontFamily: activeGraphicTextFamily,
      fillStyle: textPalette.headerMeta,
      maxWidth: titleMaxWidth
    });
  });

  drawCenteredText(context, data.matchInfo, layout.header.info.x, layout.header.info.y, {
    fontSize: infoFontSize,
    fontFamily: activeMatchInfoFontFamily,
    fillStyle: textPalette.headerInfo,
    maxWidth: titleMaxWidth
  });
}

function drawVerticalPlayers(context, teamsData, layout) {
  const players = teamsData.flatMap((teamData) => getVerticalPlayerRenderData(teamData, layout));
  measureVerticalPlayerFootprints(context, players);
  resolveVerticalPlayerCollisions(players, layout);

  players.forEach((player) => {
    drawPlayer(context, player);
  });
}

function getVerticalPlayerRenderData(teamData, layout) {
  const pitch = layout.pitch;
  const playablePitch = getPlayablePitchBounds(pitch, getVerticalPlayableAreaRatios());
  const halfHeight = playablePitch.height / 2;
  const midY = playablePitch.y + halfHeight;
  const positions = formations[teamData.formation];
  const isTop = teamData.side === "left";
  const markerPadding = 20 * layout.scaleX;
  const midfieldShift = 10 * layout.unitY;
  const visibleStarters = teamData.starters.slice(0, positions.length);
  const goalkeeperInsetY = 30 * layout.unitY;
  const goalkeeperBottomInsetY = 74 * layout.unitY;
  const goalkeeperAnchorFlexX = 14 * layout.unitX;
  const goalkeeperAnchorFlexY = 6 * layout.unitY;
  const halfBounds = {
    minX: playablePitch.x + markerPadding,
    maxX: playablePitch.x + playablePitch.width - markerPadding,
    minY: isTop ? playablePitch.y + markerPadding : midY + markerPadding,
    maxY: isTop ? midY - markerPadding : playablePitch.y + playablePitch.height - markerPadding
  };

  return visibleStarters.map((player, index) => {
    const coord = positions[index];
    // La squadra in alto attacca verso il basso: la sua fascia destra è a sinistra dello schermo.
    const lateral = isTop ? 1 - coord.y : coord.y;
    const isGoalkeeper = index === 0;
    const x = playablePitch.x + lateral * playablePitch.width;
    const y = isGoalkeeper
      ? isTop
        ? pitch.y + goalkeeperInsetY
        : pitch.y + pitch.height - goalkeeperBottomInsetY
      : isTop
        ? playablePitch.y + coord.x * halfHeight + midfieldShift
        : playablePitch.y + playablePitch.height - coord.x * halfHeight - midfieldShift;
    const bounds = isGoalkeeper
      ? {
          minX: x - goalkeeperAnchorFlexX,
          maxX: x + goalkeeperAnchorFlexX,
          minY: y - goalkeeperAnchorFlexY,
          maxY: y + goalkeeperAnchorFlexY
        }
      : halfBounds;

    return {
      name: player,
      x,
      y,
      anchorX: x,
      anchorY: y,
      side: teamData.side,
      pitch,
      playablePitch,
      renderBounds: isGoalkeeper ? pitch : playablePitch,
      minX: bounds.minX,
      maxX: bounds.maxX,
      minY: bounds.minY,
      maxY: bounds.maxY,
      markerColor: teamData.markerColor,
      markerBorderColor: teamData.markerBorderColor,
      scale: layout.scaleX,
      maxLabelWidth: 150 * layout.unitX
    };
  });
}

function measureVerticalPlayerFootprints(context, players) {
  const activeGraphicTextFamily = getActiveGraphicTextFontFamily();
  const fontSizeBoost = getActiveProjectTheme() === "betfair" ? 2 : 0;

  context.save();
  players.forEach((player) => {
    // Stesse misure usate da drawPlayer, per sapere quanto spazio occupa ogni etichetta.
    const fontSize = (13 + fontSizeBoost) * player.scale;
    const minFontSize = (11.5 + fontSizeBoost) * player.scale;
    const labelPaddingX = 5 * player.scale;
    const labelPaddingY = 3.5 * player.scale;
    const radius = 15 * player.scale;
    const fitted = fitSingleLineText(
      context,
      player.name.toUpperCase(),
      fontSize,
      player.maxLabelWidth - labelPaddingX * 2,
      activeGraphicTextFamily,
      minFontSize
    );
    context.font = `500 ${fitted.fontSize}px ${activeGraphicTextFamily}`;
    const labelWidth = context.measureText(fitted.text).width + labelPaddingX * 2;
    player.footprintWidth = Math.max(labelWidth, radius * 2);
    player.footprintHeight = radius * 2 + 3 * player.scale + fitted.fontSize + labelPaddingY * 2;

    // drawPlayer tiene l'etichetta dentro il campo: il resolver deve partire dalla stessa posizione.
    const innerPadding = 4 * player.scale;
    const bounds = player.renderBounds;
    player.minX = Math.max(player.minX, bounds.x + player.footprintWidth / 2 + innerPadding);
    player.maxX = Math.min(player.maxX, bounds.x + bounds.width - player.footprintWidth / 2 - innerPadding);
    player.x = clamp(player.x, player.minX, player.maxX);
    player.anchorX = player.x;
  });
  context.restore();
}

function resolveVerticalPlayerCollisions(players, layout) {
  const gapX = 8 * layout.unitX;
  const gapY = 6 * layout.unitY;
  const anchorFlexX = 34 * layout.unitX;
  const anchorFlexY = 34 * layout.unitY;

  for (let pass = 0; pass < 40; pass += 1) {
    let moved = false;

    for (let index = 0; index < players.length; index += 1) {
      const current = players[index];

      for (let nextIndex = index + 1; nextIndex < players.length; nextIndex += 1) {
        const other = players[nextIndex];
        const overlapX = (current.footprintWidth + other.footprintWidth) / 2 + gapX - Math.abs(other.x - current.x);
        const overlapY = (current.footprintHeight + other.footprintHeight) / 2 + gapY - Math.abs(other.y - current.y);

        if (overlapX <= 0.5 || overlapY <= 0.5) {
          continue;
        }

        moved = true;
        const directionX = other.x === current.x ? (current.anchorX <= other.anchorX ? 1 : -1) : Math.sign(other.x - current.x);
        const shiftX = overlapX / 2;
        const beforeCurrentX = current.x;
        const beforeOtherX = other.x;

        // Prima si allargano i giocatori sulla stessa linea...
        current.x = clamp(current.x - directionX * shiftX, Math.max(current.minX, current.anchorX - anchorFlexX), Math.min(current.maxX, current.anchorX + anchorFlexX));
        other.x = clamp(other.x + directionX * shiftX, Math.max(other.minX, other.anchorX - anchorFlexX), Math.min(other.maxX, other.anchorX + anchorFlexX));

        const remainingOverlapX = overlapX - (Math.abs(current.x - beforeCurrentX) + Math.abs(other.x - beforeOtherX));
        if (remainingOverlapX <= 0.5) {
          continue;
        }

        // ...poi, se non basta, si sfalsano leggermente in profondità.
        const directionY = other.y === current.y ? (index % 2 === 0 ? 1 : -1) : Math.sign(other.y - current.y);
        const shiftY = overlapY / 2;
        current.y = clamp(current.y - directionY * shiftY, Math.max(current.minY, current.anchorY - anchorFlexY), Math.min(current.maxY, current.anchorY + anchorFlexY));
        other.y = clamp(other.y + directionY * shiftY, Math.max(other.minY, other.anchorY - anchorFlexY), Math.min(other.maxY, other.anchorY + anchorFlexY));
      }
    }

    if (!moved) {
      break;
    }
  }
}

function drawVerticalBenchAndMissing(context, teamData, halfLayout, layout) {
  drawBoxContent(context, halfLayout.bench, "PANCHINA", teamData.bench.length ? teamData.bench : ["Nessuno"], layout, { listAlign: "left", titleAlign: "left" });
  drawBoxContent(context, halfLayout.missing, "ASSENTI", teamData.missing.length ? teamData.missing : ["Nessuno"], layout, { listAlign: "right", titleAlign: "right" });
}

async function handleDownloadClick() {
  const data = getFormData();
  if (!drawGraphic({ strict: true, alertOnError: true })) {
    return;
  }

  const filename = `pronostico-${slugify(data.left.teamName)}-${slugify(data.right.teamName)}-formazioni.jpeg`;
  const output = parseOutputSize(data.outputSize);
  const highResCanvas = document.createElement("canvas");
  const highResContext = highResCanvas.getContext("2d");
  const finalExportCanvas = document.createElement("canvas");
  const finalExportContext = finalExportCanvas.getContext("2d");

  if (!highResContext || !finalExportContext) {
    alert("I couldn't prepare the export canvas. Please try again.");
    return;
  }

  renderGraphicToSurface(
    highResCanvas,
    highResContext,
    data,
    output.width * exportRenderScale,
    output.height * exportRenderScale,
    { assetsReady: true }
  );

  finalExportCanvas.width = output.width;
  finalExportCanvas.height = output.height;
  configureCanvasRenderingQuality(finalExportContext);
  finalExportContext.drawImage(highResCanvas, 0, 0, finalExportCanvas.width, finalExportCanvas.height);

  const blob = canvasToJpegBlob(finalExportCanvas, exportJpegQuality);

  if (!blob) {
    alert("I couldn't generate the JPEG file. Please try again.");
    return;
  }

  if (window.showSaveFilePicker) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: filename,
        types: [
          {
            description: "Immagine JPEG",
            accept: { "image/jpeg": [".jpeg", ".jpg"] }
          }
        ]
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return;
    } catch (error) {
      if (error?.name === "AbortError") {
        return;
      }
    }
  }

  downloadBlob(blob, filename);
}

function canvasToJpegBlob(sourceCanvas, quality = exportJpegQuality) {
  try {
    const dataUrl = sourceCanvas.toDataURL("image/jpeg", quality);
    return dataUrlToBlob(dataUrl);
  } catch {
    return null;
  }
}

function dataUrlToBlob(dataUrl) {
  const [header, base64Data] = dataUrl.split(",");
  const mimeMatch = header.match(/data:(.*?);base64/);

  if (!mimeMatch || !base64Data) {
    return null;
  }

  const mimeType = mimeMatch[1];
  const binaryString = atob(base64Data);
  const length = binaryString.length;
  const bytes = new Uint8Array(length);

  for (let index = 0; index < length; index += 1) {
    bytes[index] = binaryString.charCodeAt(index);
  }

  return new Blob([bytes], { type: mimeType });
}

function downloadBlob(blob, filename) {
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
}

function drawWrappedText(context, lines, box, options = {}) {
  const fontSize = options.fontSize || 16;
  const fontFamily = options.fontFamily || "Arial, sans-serif";
  const fontWeight = options.fontWeight || 700;
  const lineHeightMultiplier = options.lineHeightMultiplier || 1.2;
  const lineHeight = fontSize * lineHeightMultiplier;

  context.save();
  context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  context.fillStyle = options.color || "#111";
  context.textAlign = options.align || "left";
  context.textBaseline = "top";

  lines.forEach((line, index) => {
    const x =
      options.align === "center"
        ? box.x + box.width / 2
        : options.align === "right"
          ? box.x + box.width
          : box.x;
    const y = box.y + lineHeight * index;
    context.fillText(line, x, y);
  });

  context.restore();
}

function fitTextInBox(context, items, box, options = {}) {
  const maxFontSize = options.maxFontSize || 18;
  const minFontSize = options.minFontSize || 10;
  const fontFamily = options.fontFamily || "Arial, sans-serif";
  const fontWeight = options.fontWeight || 700;
  const lineHeightMultiplier = options.lineHeightMultiplier || 1.2;

  for (let fontSize = maxFontSize; fontSize >= minFontSize; fontSize -= 1) {
    context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    const wrappedLines = [];

    items.forEach((item) => {
      wrappedLines.push(...wrapText(context, item.toUpperCase(), box.width));
    });

    const lineHeight = fontSize * lineHeightMultiplier;
    if (wrappedLines.length * lineHeight <= box.height) {
      return { fontSize, lines: wrappedLines };
    }
  }

  context.font = `${fontWeight} ${minFontSize}px ${fontFamily}`;
  const truncatedLines = [];
  const lineHeight = minFontSize * lineHeightMultiplier;
  const maxLines = Math.max(1, Math.floor(box.height / lineHeight));

  items.forEach((item) => {
    truncatedLines.push(...wrapText(context, item.toUpperCase(), box.width));
  });

  if (truncatedLines.length > maxLines) {
    const sliced = truncatedLines.slice(0, maxLines);
    sliced[maxLines - 1] = withEllipsis(context, sliced[maxLines - 1], box.width);
    return { fontSize: minFontSize, lines: sliced };
  }

  return { fontSize: minFontSize, lines: truncatedLines };
}

function wrapText(context, text, maxWidth) {
  const words = text.split(/\s+/);
  const lines = [];
  let currentLine = "";

  words.forEach((word) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (context.measureText(testLine).width <= maxWidth) {
      currentLine = testLine;
      return;
    }

    if (!currentLine) {
      lines.push(breakLongWord(context, word, maxWidth));
      currentLine = "";
      return;
    }

    lines.push(currentLine);
    if (context.measureText(word).width <= maxWidth) {
      currentLine = word;
      return;
    }

    lines.push(...breakLongWord(context, word, maxWidth));
    currentLine = "";
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines.flat();
}

function breakLongWord(context, word, maxWidth) {
  const chunks = [];
  let current = "";

  for (const char of word) {
    const test = current + char;
    if (context.measureText(test).width <= maxWidth) {
      current = test;
    } else {
      if (current) {
        chunks.push(current);
      }
      current = char;
    }
  }

  if (current) {
    chunks.push(current);
  }

  return chunks;
}

function withEllipsis(context, text, maxWidth) {
  let result = text;
  while (result.length && context.measureText(`${result}...`).width > maxWidth) {
    result = result.slice(0, -1);
  }
  return `${result}...`;
}

function fitSingleLineText(context, text, fontSize, maxWidth, fontFamily, minFontSize = 9) {
  let currentSize = fontSize;
  context.font = `900 ${currentSize}px ${fontFamily}`;
  let candidate = text;

  while (currentSize > minFontSize && context.measureText(candidate).width > maxWidth) {
    currentSize -= 0.5;
    context.font = `900 ${currentSize}px ${fontFamily}`;
  }

  if (context.measureText(candidate).width <= maxWidth) {
    return { text: candidate, fontSize: currentSize };
  }

  while (candidate.length > 1 && context.measureText(`${candidate}...`).width > maxWidth) {
    candidate = candidate.slice(0, -1);
  }

  return { text: `${candidate}...`, fontSize: currentSize };
}

function fitSharedSingleLineTexts(context, texts, fontSize, maxWidth, fontFamily, minFontSize = 9) {
  const normalizedTexts = texts.map((text) => String(text).toUpperCase());
  let sharedFontSize = fontSize;

  context.save();
  context.font = `900 ${sharedFontSize}px ${fontFamily}`;

  while (
    sharedFontSize > minFontSize &&
    normalizedTexts.some((text) => context.measureText(text).width > maxWidth)
  ) {
    sharedFontSize -= 0.5;
    context.font = `900 ${sharedFontSize}px ${fontFamily}`;
  }

  const fittedTexts = normalizedTexts.map((text) => {
    let candidate = text;

    while (candidate.length > 1 && context.measureText(`${candidate}...`).width > maxWidth) {
      candidate = candidate.slice(0, -1);
    }

    return {
      text: context.measureText(text).width <= maxWidth ? text : `${candidate}...`,
      fontSize: sharedFontSize
    };
  });

  context.restore();
  return fittedTexts;
}

function drawCenteredText(context, text, x, y, options = {}) {
  const fontSize = options.fontSize || 18;
  const minFontSize = options.minFontSize || 9;
  const fontFamily = options.fontFamily || "Arial, sans-serif";
  const fillStyle = options.fillStyle || "#111";
  const safeText = String(text).toUpperCase();

  context.save();
  context.font = `900 ${fontSize}px ${fontFamily}`;
  context.fillStyle = fillStyle;
  context.textAlign = "center";
  context.textBaseline = "middle";

  const finalText = options.maxWidth
    ? fitSingleLineText(context, safeText, fontSize, options.maxWidth, fontFamily, minFontSize)
    : { text: safeText, fontSize };

  context.font = `900 ${finalText.fontSize}px ${fontFamily}`;
  context.fillText(finalText.text, x, y);
  context.restore();
}

function roundedRect(context, x, y, width, height, radius, fill, stroke) {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.lineTo(x + width - safeRadius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  context.lineTo(x + width, y + height - safeRadius);
  context.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  context.lineTo(x + safeRadius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  context.lineTo(x, y + safeRadius);
  context.quadraticCurveTo(x, y, x + safeRadius, y);
  context.closePath();
  if (fill) {
    context.fill();
  }
  if (stroke) {
    context.stroke();
  }
}

function adjustColor(hexColor, amount) {
  const clean = hexColor.replace("#", "");
  const num = parseInt(clean, 16);
  const clampChannel = (channel) => clamp(channel + amount, 0, 255);
  const r = clampChannel((num >> 16) & 255);
  const g = clampChannel((num >> 8) & 255);
  const b = clampChannel(num & 255);
  return `rgb(${r}, ${g}, ${b})`;
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updatePreviewSizeLabel() {
  const formatKey = getActiveOutputFormatKey();
  const format = outputFormats[formatKey];
  document.getElementById("preview-size-label").textContent = format.size;
  document.getElementById("download-btn").textContent = `Download JPEG ${format.size}`;
  document.querySelector(".canvas-frame")?.setAttribute("data-orientation", formatKey);
}
