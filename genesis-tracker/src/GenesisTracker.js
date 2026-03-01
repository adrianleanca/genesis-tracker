import { useState, useEffect, useCallback, useMemo } from "react";
import { saveUserData, getUserDoc, subscribeToCollection, deleteUserDoc } from "./firebase";

const T = {
  ro: {
    dashboard: "Dashboard", commitments: "Angajamente", domains: "Domenii", newCommitment: "+ Angajament Nou",
    flowDashboard: "Flow Dashboard", flowSubtitle: "Urmareste-ti angajamentele. Construieste-ti flow-ul.",
    flowScore: "Flow Score", onTime: "On-time completion", contextInstalled: "Context installed",
    renegRate: "Renegotiation rate", breachRate: "Breach rate",
    active: "Active", atRisk: "At Risk", contextSet: "Context Set", closed: "Closed",
    recentCommitments: "Angajamente Recente", viewAll: "Vezi toate \u2192",
    allCommitments: "Toate Angajamentele", total: "total", search: "Cauta...",
    allStatus: "Toate", allDomains: "Toate Domenii", allImpact: "Toate Impact",
    newSub: "+ Sub-angajament", subCommitments: "Sub-angajamente", complete: "complete",
    noSubYet: "Niciun sub-angajament. Descompune angajamentul in pasi mai mici.",
    noCommitments: "Niciun angajament inca.", noResults: "Niciun rezultat.",
    title: "Titlu", description: "Descriere", promisedTo: "Promis Catre",
    deadline: "Termen Limita", expectedOutcome: "Rezultat Asteptat",
    costAcknowledged: "Cost Recunoscut", riskIdentified: "Risc Identificat",
    impact: "Impact", domain: "Domeniu", status: "Status",
    createCommitment: "Creeaza Angajament", save: "Salveaza", cancel: "Anuleaza", back: "Inapoi",
    backToList: "Inapoi la lista", edit: "Edit", delete: "Sterge",
    context: "Context", emotionalImpact: "Impact Emotional", history: "Istoric",
    distractions: "Distractii Eliminate", resources: "Resurse Alocate",
    support: "Suport Necesar", triggers: "Triggere Identificate",
    contextInstall: "Instalare Context",
    closePromise: "Inchide Promisiunea", renegotiate: "Renegociaza", markBreached: "Marcheaza Incalcat",
    renegotiateTitle: "Renegociaza Angajamentul", reason: "Motiv", newDeadline: "Nou Termen Limita",
    aiPatterns: "AI Pattern Analysis", analyzePatterns: "Analizeaza",
    aiPlan: "Flow Improvement Plan", generatePlan: "Genereaza Plan",
    analyzing: "Analizez...", generating: "Generez...",
    customize: "Personalizare", newDomain: "+ Domeniu Nou",
    whoAmINow: "Cine sunt eu acum?", waysOfBeingNow: "Feluri de a fi reale la start",
    destination: "Care e destinatia?", waysOfBeingDesired: "Feluri de a fi dorite",
    generativeEmotions: "Emotii generative", howWeFeelOnTheWay: "Cum ne simtim pe drum",
    forMe: "Pentru mine", forOthers: "Pentru ceilalti", forWorld: "Pentru lume",
    updateEmotional: "Actualizeaza Impact Emotional", updateVipas: "Actualizeaza VIPAS",
    explore3perspectives: "Exploreaza transformarea din trei perspective",
    subOf: "Sub-angajament al:", saved: "Salvat!",
    newSubCommitment: "Sub-angajament Nou", subSubtitle: "Pas concret spre indeplinirea angajamentului parinte",
    newCommitmentTitle: "Angajament Nou", commitmentSubtitle: "Defineste-ti angajamentul cu claritate si intentie",
    editTitle: "Editeaza",
    language: "Limba", themes: "Teme Disponibile", colorEditor: "Editor Culori",
    preview: "Preview", saveAsTheme: "Salveaza ca tema noua", themeName: "Numele temei...", saveBtn: "Salveaza",
    accentColor: "Culoare Accent", sidebarColor: "Sidebar", bgColor: "Fundal", cardColor: "Carduri", textColor: "Text Principal",
    accentDesc: "Butoane, link-uri, highlights", sidebarDesc: "Fundal meniu lateral",
    bgDesc: "Fundal pagina", cardDesc: "Fundal carduri si sectiuni", textDesc: "Culoare text",
    manageDomains: "Gestioneaza categoriile angajamentelor tale",
    noHistory: "Niciun eveniment in istoric.", activeLabel: "Activa",
    today: "Azi", daysLeft: "z", overdue: "z dep.",
    logout: "Deconecteaza-te", donate: "Susține proiectul", addDomain: "Adauga", domainName: "Nume domeniu", color: "Culoare",
    phOutcome: "Ce se va intampla cand e indeplinit?", phCost: "Ce costa?", phRisk: "Ce ar putea merge prost?",
    phDistract: "Ce distractii vei elimina?", phResources: "Timp, bani, energie...", phSupport: "De cine ai nevoie?", phTriggers: "Ce ar putea te deraia?",
    phNowSelf: "Cum ma percep pe mine insumi acum?", phNowOthers: "Cum ma vad ceilalti acum?", phNowWorld: "Ce impact am asupra lumii acum?",
    phDestSelf: "Cine vreau sa devin?", phDestOthers: "Cine vor deveni ceilalti?", phDestWorld: "Cum va deveni lumea?",
    phGenSelf: "Cum ma simt eu?", phGenOthers: "Cum se simt ceilalti?", phGenWorld: "Cum se simte lumea?",
    customizeSubtitle: "Alege culorile, limba si aspectul aplicatiei",
    exampleCommitment: "Exemplu angajament", shortDesc: "Descriere scurta",
    notes: "Note",
    recurrence: "Recurenta", once: "O singura data", daily: "Zilnic", weekly: "Saptamanal", monthly: "Lunar",
    addToCalendar: "Adauga in Calendar", calendarAdded: "Deschis in Google Calendar",
  },
  en: {
    dashboard: "Dashboard", commitments: "Commitments", domains: "Domains", newCommitment: "+ New Commitment",
    flowDashboard: "Flow Dashboard", flowSubtitle: "Track your commitments. Build your flow.",
    flowScore: "Flow Score", onTime: "On-time completion", contextInstalled: "Context installed",
    renegRate: "Renegotiation rate", breachRate: "Breach rate",
    active: "Active", atRisk: "At Risk", contextSet: "Context Set", closed: "Closed",
    recentCommitments: "Recent Commitments", viewAll: "View all \u2192",
    allCommitments: "All Commitments", total: "total", search: "Search...",
    allStatus: "All", allDomains: "All Domains", allImpact: "All Impact",
    newSub: "+ Sub-commitment", subCommitments: "Sub-commitments", complete: "complete",
    noSubYet: "No sub-commitments yet. Break it into smaller steps.",
    noCommitments: "No commitments yet.", noResults: "No results.",
    title: "Title", description: "Description", promisedTo: "Promised To",
    deadline: "Deadline", expectedOutcome: "Expected Outcome",
    costAcknowledged: "Cost Acknowledged", riskIdentified: "Risk Identified",
    impact: "Impact", domain: "Domain", status: "Status",
    createCommitment: "Create Commitment", save: "Save", cancel: "Cancel", back: "Back",
    backToList: "Back to list", edit: "Edit", delete: "Delete",
    context: "Context", emotionalImpact: "Emotional Impact", history: "History",
    distractions: "Distractions Removed", resources: "Resources Allocated",
    support: "Support Required", triggers: "Triggers Identified",
    contextInstall: "Context Installation",
    closePromise: "Close Promise", renegotiate: "Renegotiate", markBreached: "Mark as Breached",
    renegotiateTitle: "Renegotiate Commitment", reason: "Reason", newDeadline: "New Deadline",
    aiPatterns: "AI Pattern Analysis", analyzePatterns: "Analyze",
    aiPlan: "Flow Improvement Plan", generatePlan: "Generate Plan",
    analyzing: "Analyzing...", generating: "Generating...",
    customize: "Customize", newDomain: "+ New Domain",
    whoAmINow: "Who am I now?", waysOfBeingNow: "Current ways of being",
    destination: "What is the destination?", waysOfBeingDesired: "Desired ways of being",
    generativeEmotions: "Generative emotions", howWeFeelOnTheWay: "How we feel along the way",
    forMe: "For me", forOthers: "For others", forWorld: "For the world",
    updateEmotional: "Update Emotional Impact", updateVipas: "Update VIPAS Analysis",
    explore3perspectives: "Explore the transformation from three perspectives",
    subOf: "Sub-commitment of:", saved: "Saved!",
    newSubCommitment: "New Sub-commitment", subSubtitle: "Concrete step towards the parent commitment",
    newCommitmentTitle: "New Commitment", commitmentSubtitle: "Define your commitment with clarity and intention",
    editTitle: "Edit",
    language: "Language", themes: "Available Themes", colorEditor: "Color Editor",
    preview: "Preview", saveAsTheme: "Save as new theme", themeName: "Theme name...", saveBtn: "Save",
    accentColor: "Accent Color", sidebarColor: "Sidebar", bgColor: "Background", cardColor: "Cards", textColor: "Main Text",
    accentDesc: "Buttons, links, highlights", sidebarDesc: "Side menu background",
    bgDesc: "Page background", cardDesc: "Cards and sections", textDesc: "Text color",
    manageDomains: "Manage your commitment categories",
    noHistory: "No events in history.", activeLabel: "Active",
    today: "Today", daysLeft: "d", overdue: "d over.",
    logout: "Log out", donate: "Support this project", addDomain: "Add", domainName: "Domain name", color: "Color",
    phOutcome: "What will happen when fulfilled?", phCost: "What does it cost?", phRisk: "What could go wrong?",
    phDistract: "What distractions will you remove?", phResources: "Time, money, energy...", phSupport: "Who do you need?", phTriggers: "What could derail you?",
    phNowSelf: "How do I perceive myself now?", phNowOthers: "How do others see me now?", phNowWorld: "What impact do I have on the world now?",
    phDestSelf: "Who do I want to become?", phDestOthers: "Who will others become?", phDestWorld: "How will the world become?",
    phGenSelf: "How do I feel?", phGenOthers: "How do others feel?", phGenWorld: "How does the world feel?",
    customizeSubtitle: "Choose colors, language and appearance",
    exampleCommitment: "Example commitment", shortDesc: "Short description",
    notes: "Notes",
    recurrence: "Recurrence", once: "One time", daily: "Daily", weekly: "Weekly", monthly: "Monthly",
    addToCalendar: "Add to Calendar", calendarAdded: "Opened in Google Calendar",
  }
};

const STORE = { actions: "gen-trk-v3-actions", domains: "gen-trk-v3-domains", theme: "gen-trk-v3-theme", customThemes: "gen-trk-v3-cthemes", lang: "gen-trk-v3-lang" };
const DEFAULT_DOMAINS = [
  { id: "personal", name: "Personal", color: "#7C6CA8" },
  { id: "profesional", name: "Profesional", color: "#2D3436" },
  { id: "business", name: "Business", color: "#3D7C98" },
  { id: "pasiuni", name: "Pasiuni", color: "#B8763E" },
  { id: "educatie", name: "Educatie", color: "#8B5E83" },
];
const IMPACT_LEVELS = ["Low Impact", "Medium Impact", "High Impact"];
const STATUSES = ["Draft", "Active", "At Risk", "Closed", "Renegotiated", "Breached"];
const IMPACT_COLORS = { "Low Impact": "#7BA68C", "Medium Impact": "#D4A843", "High Impact": "#C0524E" };
const STATUS_COLORS = { Draft: "#8B9DAF", Active: "#5B8C5A", "At Risk": "#D4A843", Closed: "#7C6CA8", Renegotiated: "#3D7C98", Breached: "#C0524E" };
const uid = () => Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
function daysLeft(d) { if (!d) return null; return Math.ceil((new Date(d) - new Date(new Date().toDateString())) / 86400000); }
function fmtDate(d) { if (!d) return "—"; return new Date(d).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" }); }
function fmtDateTime(d) { if (!d) return "—"; return new Date(d).toLocaleDateString("ro-RO", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }); }

function buildGCalUrl(action) {
  if (!action.dueDate) return null;
  const d = new Date(action.dueDate);
  const pad = (n) => String(n).padStart(2, "0");
  const dateStr = d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate());
  const title = encodeURIComponent(action.title || "Commitment");
  const desc = encodeURIComponent([action.description, action.expectedOutcome ? "Expected: " + action.expectedOutcome : "", action.promisedTo ? "Promised to: " + action.promisedTo : ""].filter(Boolean).join("\n"));
  let recur = "";
  if (action.recurrence === "daily") recur = "&recur=RRULE:FREQ%3DDAILY";
  else if (action.recurrence === "weekly") recur = "&recur=RRULE:FREQ%3DWEEKLY";
  else if (action.recurrence === "monthly") recur = "&recur=RRULE:FREQ%3DMONTHLY";
  return "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + title + "&dates=" + dateStr + "/" + dateStr + "&details=" + desc + recur;
}

const EMPTY_ACTION = {
  title: "", description: "", promisedTo: "", dueDate: "",
  recurrence: "once", // once, daily, weekly, monthly
  expectedOutcome: "", costAcknowledged: "", riskIdentified: "",
  impactLevel: "Medium Impact", domain: "personal", status: "Draft",
  parentId: null, // null = top-level, string = sub-angajament
  // Emotional Impact - 3 dimensions x 3 perspectives
  ei_now_self: "", ei_now_others: "", ei_now_world: "",
  ei_dest_self: "", ei_dest_others: "", ei_dest_world: "",
  ei_gen_self: "", ei_gen_others: "", ei_gen_world: "",
  // Context
  distractionsRemoved: "", resourcesAllocated: "", supportRequired: "", triggersIdentified: "",
  // VIPAS
  vipas_vision: "", vipas_impact: "", vipas_pattern: "", vipas_assumption: "", vipas_solution: "",
  notes: "",
  history: [], // { date, action, details }
};

export default function GenesisTracker({ user, onLogout }) {
  const [actions, setActions] = useState([]);
  const [domains, setDomains] = useState(DEFAULT_DOMAINS);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState("ro");
  const t = (key) => (T[lang] || T.ro)[key] || key;
  const [view, setView] = useState("dashboard");
  const [selectedId, setSelectedId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ ...EMPTY_ACTION });
  const [filters, setFilters] = useState({ status: "all", domain: "all", impact: "all", search: "" });
  const [detailTab, setDetailTab] = useState("context");
  const [showDomainModal, setShowDomainModal] = useState(false);
  const [newDomain, setNewDomain] = useState({ name: "", color: "#7C6CA8" });
  const [isMobile, setIsMobile] = useState(false);
  const [renegotiateModal, setRenegotiateModal] = useState(false);
  const [renegotiateNote, setRenegotiateNote] = useState("");
  const [renegotiateDate, setRenegotiateDate] = useState("");
  const [aiPatterns, setAiPatterns] = useState(null);
  const [aiPlan, setAiPlan] = useState(null);
  const [aiLoading, setAiLoading] = useState(null);

  const THEME_PRESETS = [
    { name: "Genesis Purple", accent: "#7C6CA8", sidebar: "#1A1A2E", bg: "#F5F3F0", cardBg: "#fff", text: "#1A1A2E" },
  ];

  const DEFAULT_THEME = THEME_PRESETS[0];
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [savedThemes, setSavedThemes] = useState([]);

  useEffect(() => { const c = () => setIsMobile(window.innerWidth < 768); c(); window.addEventListener("resize", c); return () => window.removeEventListener("resize", c); }, []);

  useEffect(() => {
    if (!user) return;
    // Load settings (domains, theme, customThemes, lang)
    (async () => {
      try {
        const [dR, tR, ctR, lR] = await Promise.all([
          getUserDoc(user.uid, "settings", "domains").catch(() => null),
          getUserDoc(user.uid, "settings", "theme").catch(() => null),
          getUserDoc(user.uid, "settings", "customThemes").catch(() => null),
          getUserDoc(user.uid, "settings", "lang").catch(() => null),
        ]);
        if (dR?.data) { const p = JSON.parse(dR.data); if (p.length) setDomains(p); }
        if (tR?.data) { const tt = JSON.parse(tR.data); if (tt.accent) setTheme(tt); }
        if (ctR?.data) { const ct = JSON.parse(ctR.data); if (ct.length) setSavedThemes(ct); }
        if (lR?.data) setLang(lR.data);
      } catch (e) { console.error(e); }
      setLoading(false);
    })();
    // Subscribe to actions in real-time
    const unsub = subscribeToCollection(user.uid, "actions", (items) => {
      setActions(items);
      if (loading) setLoading(false);
    });
    return unsub;
  }, [user]);

  const saveSetting = useCallback(async (key, data) => { 
    if (!user) return;
    try { await saveUserData(user.uid, "settings", key, { data: typeof data === "string" ? data : JSON.stringify(data) }); } catch (e) { console.error(e); } 
  }, [user]);
  const saveAction = useCallback(async (action) => {
    if (!user) return;
    try { const { id, ...data } = action; await saveUserData(user.uid, "actions", id, data); } catch (e) { console.error(e); }
  }, [user]);
  const deleteAction = useCallback(async (actionId) => {
    if (!user) return;
    try { await deleteUserDoc(user.uid, "actions", actionId); } catch (e) { console.error(e); }
  }, [user]);
  const saveActions = useCallback((a) => { 
    setActions(a); 
    // Save each changed action individually
    a.forEach(action => saveAction(action));
  }, [saveAction]);
  const saveDomains = useCallback((d) => { setDomains(d); saveSetting("domains", d); }, [saveSetting]);
  const getDomain = (id) => domains.find(d => d.id === id) || { name: id, color: "#999" };
  const selectedAction = actions.find(a => a.id === selectedId);
  const updateField = (f, v) => setFormData(p => ({ ...p, [f]: v }));

  const addHistoryEntry = (actionId, type, details) => {
    const a = actions.find(x => x.id === actionId);
    if (!a) return;
    const h = [...(a.history || []), { date: new Date().toISOString(), action: type, details }];
    saveAction({ ...a, history: h });
  };

  const changeStatus = (actionId, newStatus, details = "") => {
    const a = actions.find(x => x.id === actionId);
    if (!a) return;
    const h = [...(a.history || []), { date: new Date().toISOString(), action: `Status → ${newStatus}`, details }];
    saveAction({ ...a, status: newStatus, history: h, updatedAt: new Date().toISOString() });
  };

  const handleRenegotiate = (actionId) => {
    const a = actions.find(x => x.id === actionId);
    if (!a) return;
    const h = [...(a.history || []), { date: new Date().toISOString(), action: "Renegociat", details: `${renegotiateNote}${renegotiateDate ? " | Nou termen: " + fmtDate(renegotiateDate) : ""}` }];
    saveAction({ ...a, status: "Renegotiated", dueDate: renegotiateDate || a.dueDate, history: h, updatedAt: new Date().toISOString() });
    setRenegotiateModal(false);
    setRenegotiateNote("");
    setRenegotiateDate("");
  };

  const stats = useMemo(() => {
    const t = actions.length;
    const active = actions.filter(a => a.status === "Active").length;
    const atRisk = actions.filter(a => a.status === "At Risk").length;
    const closed = actions.filter(a => a.status === "Closed").length;
    const breached = actions.filter(a => a.status === "Breached").length;
    const renegotiated = actions.filter(a => a.status === "Renegotiated").length;
    const overdue = actions.filter(a => a.dueDate && !["Closed","Breached"].includes(a.status) && daysLeft(a.dueDate) < 0).length;
    const contextSet = actions.filter(a => a.distractionsRemoved || a.resourcesAllocated || a.supportRequired || a.triggersIdentified).length;
    const completionRate = t > 0 ? Math.round((closed / t) * 100) : 0;
    const breachRate = t > 0 ? Math.round((breached / t) * 100) : 0;
    const renegRate = t > 0 ? Math.round((renegotiated / t) * 100) : 0;
    let flow = 50;
    if (t > 0) {
      flow = Math.round(completionRate * 0.4 + ((contextSet / t) * 100) * 0.2 + ((t - overdue) / t * 100) * 0.2 + ((t - breached) / t * 100) * 0.2);
    }
    flow = Math.min(100, Math.max(0, flow));
    const flowLabel = flow >= 80 ? "EXCELLENT" : flow >= 60 ? "GOOD" : flow >= 40 ? "NEEDS WORK" : "CRITICAL";
    return { total: t, active, atRisk, closed, breached, renegotiated, overdue, contextSet, completionRate, breachRate, renegRate, flow, flowLabel };
  }, [actions]);

  const filtered = useMemo(() => {
    return actions.filter(a => {
      if (a.parentId) return false; // sub-angajamente shown nested
      if (filters.status !== "all" && a.status !== filters.status) return false;
      if (filters.domain !== "all" && a.domain !== filters.domain) return false;
      if (filters.impact !== "all" && a.impactLevel !== filters.impact) return false;
      if (filters.search && !a.title.toLowerCase().includes(filters.search.toLowerCase()) && !(a.description || "").toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    }).sort((a, b) => {
      const sO = { Active: 0, "At Risk": 1, Draft: 2, Renegotiated: 3, Closed: 4, Breached: 5 };
      if (sO[a.status] !== sO[b.status]) return sO[a.status] - sO[b.status];
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
  }, [actions, filters]);

  const handleSubmit = () => {
    if (!formData.title.trim()) return;
    if (editingId) {
      const existing = actions.find(a => a.id === editingId);
      const h = [...(existing?.history || []), { date: new Date().toISOString(), action: "Editat", details: "Angajamentul a fost actualizat" }];
      const updated = { ...existing, ...formData, id: editingId, history: h, updatedAt: new Date().toISOString() };
      saveAction(updated);
    } else {
      const newA = { ...formData, id: uid(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), history: [{ date: new Date().toISOString(), action: "Creat", details: "Angajament nou creat" }] };
      saveAction(newA);
    }
    setFormData({ ...EMPTY_ACTION });
    setEditingId(null);
    setView("list");
  };

  const removeAction = (id) => { 
    // Delete from Firebase
    deleteAction(id);
    // Also delete children
    actions.filter(a => a.parentId === id).forEach(child => deleteAction(child.id));
    if (selectedId === id) { setSelectedId(null); setView("list"); } 
  };
  const openCreate = (d) => { setFormData({ ...EMPTY_ACTION, domain: d || "personal" }); setEditingId(null); setView("create"); };
  const openCreateSub = (parentAction) => { setFormData({ ...EMPTY_ACTION, parentId: parentAction.id, domain: parentAction.domain, promisedTo: parentAction.promisedTo, dueDate: parentAction.dueDate }); setEditingId(null); setView("create"); };
  const getChildren = (parentId) => actions.filter(a => a.parentId === parentId);
  const getChildProgress = (parentId) => { const kids = getChildren(parentId); if (kids.length === 0) return null; const done = kids.filter(k => k.status === "Closed").length; return { total: kids.length, done, pct: Math.round((done / kids.length) * 100) }; };
  const openEdit = (a) => { setFormData({ ...EMPTY_ACTION, ...a }); setEditingId(a.id); setView("create"); };
  const openDetail = (id) => { setSelectedId(id); setDetailTab("context"); setView("detail"); };
  const addDomain = () => { if (!newDomain.name.trim()) return; saveDomains([...domains, { ...newDomain, id: newDomain.name.toLowerCase().replace(/\s+/g, "-") + "-" + uid() }]); setNewDomain({ name: "", color: "#7C6CA8" }); setShowDomainModal(false); };

  // ─── STYLES ───
  const inp = { width: "100%", padding: "11px 14px", border: "1.5px solid #E0DDD8", borderRadius: 8, fontSize: 14, fontFamily: "inherit", outline: "none", backgroundColor: "#fff", color: "#1A1A2E", boxSizing: "border-box" };
  const txa = { ...inp, resize: "vertical", minHeight: 64 };
  const lbl = { display: "block", fontSize: 11, fontWeight: 700, color: "#7B7670", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.6px" };
  const sec = { backgroundColor: "#fff", borderRadius: 14, padding: isMobile ? 18 : 24, marginBottom: 14, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" };

  // ─── COMPONENTS ───
  const FlowCircle = ({ score, label, size = 130 }) => {
    const r = (size - 14) / 2, circ = 2 * Math.PI * r;
    const offset = circ - (score / 100) * circ;
    const color = score >= 80 ? "#5B8C5A" : score >= 60 ? "#7C6CA8" : score >= 40 ? "#D4A843" : "#C0524E";
    return (
      <svg width={size} height={size} style={{ display: "block" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E8E4DE" strokeWidth={7} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={7} strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ transition: "stroke-dashoffset 0.8s ease" }} />
        <text x={size / 2} y={size / 2 - 4} textAnchor="middle" fontSize={32} fontWeight="700" fill="#1A1A2E">{score}</text>
        <text x={size / 2} y={size / 2 + 14} textAnchor="middle" fontSize={8} fontWeight="600" fill="#8B8680" letterSpacing="1">{label}</text>
      </svg>
    );
  };

  const Tag = ({ text, color, bg }) => (
    <span style={{ display: "inline-block", padding: "3px 9px", borderRadius: 4, fontSize: 11, fontWeight: 600, color: color || "#666", backgroundColor: bg || "#F0ECE6", marginRight: 5, whiteSpace: "nowrap" }}>{text}</span>
  );

  const StatusBadge = ({ status }) => (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, color: STATUS_COLORS[status] || "#666", backgroundColor: (STATUS_COLORS[status] || "#666") + "15" }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: STATUS_COLORS[status] }} />
      {status}
    </span>
  );

  const StatCard = ({ icon, label, value, color }) => (
    <div style={{ backgroundColor: "#fff", borderRadius: 12, padding: "14px 18px", flex: 1, minWidth: 90, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      <div style={{ fontSize: 18, marginBottom: 6 }}>{icon}</div>
      <div style={{ fontSize: 11, color: "#8B8680", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color: color || "#1A1A2E" }}>{value}</div>
    </div>
  );

  // ─── EMOTIONAL IMPACT SECTION (form) ───
  const EmotionalImpactForm = () => {
    const dimensions = [
      {
        key: "now", title: t("whoAmINow"), subtitle: t("waysOfBeingNow"), color: "#3D7C98", icon: "🪞",
        fields: [
          { k: "ei_now_self", label: t("forMe"), ph: "Cum mă percep pe mine însumi acum?" },
          { k: "ei_now_others", label: t("forOthers"), ph: "Cum mă văd ceilalți acum?" },
          { k: "ei_now_world", label: t("forWorld"), ph: t("phNowWorld") },
        ]
      },
      {
        key: "dest", title: t("destination"), subtitle: t("waysOfBeingDesired"), color: "#5B8C5A", icon: "🧭",
        fields: [
          { k: "ei_dest_self", label: t("forMe"), ph: t("phDestSelf") },
          { k: "ei_dest_others", label: t("forOthers"), ph: "Cine vor deveni ceilalți?" },
          { k: "ei_dest_world", label: t("forWorld"), ph: t("phDestWorld") },
        ]
      },
      {
        key: "gen", title: t("generativeEmotions"), subtitle: t("howWeFeelOnTheWay"), color: "#7C6CA8", icon: "✨",
        fields: [
          { k: "ei_gen_self", label: t("forMe"), ph: "Cum mă simt eu?" },
          { k: "ei_gen_others", label: t("forOthers"), ph: "Cum se simt ceilalți?" },
          { k: "ei_gen_world", label: t("forWorld"), ph: t("phGenWorld") },
        ]
      },
    ];

    return (
      <div>
        <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: "#1A1A2E" }}>💫 Impact Emoțional</h3>
        <p style={{ fontSize: 12, color: "#8B8680", margin: "0 0 16px" }}>Explorează transformarea din trei perspective</p>
        {dimensions.map(dim => (
          <div key={dim.key} style={{ marginBottom: 18, borderLeft: `3px solid ${dim.color}`, paddingLeft: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 18 }}>{dim.icon}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: dim.color }}>{dim.title}</div>
                <div style={{ fontSize: 11, color: "#8B8680" }}>{dim.subtitle}</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 10 }}>
              {dim.fields.map(f => (
                <div key={f.k}>
                  <label style={{ ...lbl, fontSize: 10, color: dim.color }}>{f.label}</label>
                  <textarea placeholder={f.ph} value={formData[f.k] || ""} onChange={e => updateField(f.k, e.target.value)} style={{ ...txa, minHeight: 56, borderColor: dim.color + "30" }} rows={2} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ─── EMOTIONAL IMPACT SECTION (detail view) ───
  const EmotionalImpactDetail = ({ a }) => {
    const dimensions = [
      { key: "now", title: t("whoAmINow"), subtitle: t("waysOfBeingNow"), color: "#3D7C98", icon: "🪞", fields: [{ k: "ei_now_self", l: t("forMe") }, { k: "ei_now_others", l: "Pentru ceilalți" }, { k: "ei_now_world", l: "Pentru lume" }] },
      { key: "dest", title: t("destination"), subtitle: t("waysOfBeingDesired"), color: "#5B8C5A", icon: "🧭", fields: [{ k: "ei_dest_self", l: t("forMe") }, { k: "ei_dest_others", l: t("phDestOthers") }, { k: "ei_dest_world", l: t("phDestWorld") }] },
      { key: "gen", title: t("generativeEmotions"), subtitle: t("howWeFeelOnTheWay"), color: "#7C6CA8", icon: "✨", fields: [{ k: "ei_gen_self", l: t("phGenSelf") }, { k: "ei_gen_others", l: t("phGenOthers") }, { k: "ei_gen_world", l: t("phGenWorld") }] },
    ];
    const hasAny = dimensions.some(d => d.fields.some(f => a[f.k]));
    if (!hasAny) return <p style={{ color: "#8B8680", fontSize: 14, textAlign: "center", padding: 20 }}>Nu a fost completat impactul emoțional.</p>;
    return (
      <div>
        {dimensions.map(dim => {
          const hasFields = dim.fields.some(f => a[f.k]);
          if (!hasFields) return null;
          return (
            <div key={dim.key} style={{ marginBottom: 20, borderLeft: `3px solid ${dim.color}`, paddingLeft: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 18 }}>{dim.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: dim.color }}>{dim.title}</div>
                  <div style={{ fontSize: 11, color: "#8B8680" }}>{dim.subtitle}</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 10 }}>
                {dim.fields.map(f => a[f.k] ? (
                  <div key={f.k} style={{ backgroundColor: dim.color + "08", borderRadius: 10, padding: 14, border: `1px solid ${dim.color}15` }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: dim.color, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>{f.l}</div>
                    <p style={{ fontSize: 13, color: "#3A3A4A", lineHeight: 1.6, margin: 0, whiteSpace: "pre-wrap" }}>{a[f.k]}</p>
                  </div>
                ) : null)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // ─── VIPAS SECTION ───
  const vipasItems = [
    { key: "vipas_vision", letter: "V", title: lang === "ro" ? "Viziunea Viitorului Probabil" : "Vision of Probable Future", color: "#3D7C98", ph: lang === "ro" ? "Dacă continui pe traiectoria curentă, ce viitor devine probabil?" : "If you continue on your current trajectory, what future becomes likely?" },
    { key: "vipas_impact", letter: "I", title: lang === "ro" ? "Evaluarea Impactului" : "Impact Assessment", color: "#D4A843", ph: lang === "ro" ? "Care sunt consecințele asupra vieții, relațiilor și obiectivelor tale?" : "What are the consequences on your life, relationships and goals?" },
    { key: "vipas_pattern", letter: "P", title: lang === "ro" ? "Recunoașterea Tiparului" : "Pattern Recognition", color: "#5B8C5A", ph: lang === "ro" ? "Ce tipar recurent observi care duce la acest rezultat?" : "What recurring pattern do you observe leading to this result?" },
    { key: "vipas_assumption", letter: "A", title: lang === "ro" ? "Asumpția de Contestat" : "Assumption to Challenge", color: "#C0524E", ph: lang === "ro" ? "Ce credință ascunsă alimentează acest tipar?" : "What hidden belief fuels this pattern?" },
    { key: "vipas_solution", letter: "S", title: lang === "ro" ? "Soluția Structurală" : "Structural Solution", color: "#7C6CA8", ph: lang === "ro" ? "Ce schimbare structurală va sparge tiparul?" : "What structural change will break the pattern?" },
  ];

  const VipasForm = () => (
    <div>
      <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700 }}>🔬 {lang === "ro" ? "Analiza VIPAS" : "VIPAS Analysis"}</h3>
      <p style={{ fontSize: 12, color: "#8B8680", margin: "0 0 16px" }}>{lang === "ro" ? "Înțelege structurile profunde și creează intervenții durabile" : "Understand deep structures and create lasting interventions"}</p>
      {vipasItems.map(v => (
        <div key={v.key} style={{ marginBottom: 14, borderLeft: `3px solid ${v.color}`, paddingLeft: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span style={{ width: 26, height: 26, borderRadius: "50%", backgroundColor: v.color + "20", color: v.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800 }}>{v.letter}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#1A1A2E" }}>{v.title}</span>
          </div>
          <textarea placeholder={v.ph} value={formData[v.key] || ""} onChange={e => updateField(v.key, e.target.value)} style={{ ...txa, borderColor: v.color + "30" }} rows={3} />
        </div>
      ))}
    </div>
  );

  const VipasDetail = ({ a }) => {
    const hasAny = vipasItems.some(v => a[v.key]);
    return (
      <div>
        <div style={{ backgroundColor: "#F8F7FF", borderRadius: 12, padding: 18, marginBottom: 18, border: "1px solid #E8E4F0" }}>
          <h4 style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 700 }}>{lang === "ro" ? "Motor de Analiză VIPAS" : "VIPAS Analysis Engine"}</h4>
          <p style={{ fontSize: 12, color: "#6B6660", margin: 0 }}>{lang === "ro" ? "Framework-ul VIPAS te ajută să înțelegi structurile profunde și să creezi schimbări durabile." : "The VIPAS framework helps you understand deep structures and create lasting changes."}</p>
        </div>
        {!hasAny && <p style={{ color: "#8B8680", fontSize: 14, textAlign: "center", padding: 20 }}>VIPAS nu a fost completat încă.</p>}
        {vipasItems.map(v => a[v.key] ? (
          <div key={v.key} style={{ marginBottom: 16, borderLeft: `3px solid ${v.color}`, paddingLeft: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: v.color + "20", color: v.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800 }}>{v.letter}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E" }}>{v.title}</span>
            </div>
            <p style={{ fontSize: 13, color: "#3A3A4A", lineHeight: 1.7, margin: "0 0 0 36px", whiteSpace: "pre-wrap" }}>{a[v.key]}</p>
          </div>
        ) : null)}
      </div>
    );
  };

  // ─── HISTORY ───
  const HistoryTimeline = ({ history }) => {
    if (!history || history.length === 0) return <p style={{ color: "#8B8680", fontSize: 14, textAlign: "center", padding: 20 }}>{t("noHistory")}</p>;
    const sorted = [...history].sort((a, b) => new Date(b.date) - new Date(a.date));
    const actionColors = { Creat: "#5B8C5A", Editat: "#3D7C98", Renegociat: "#D4A843", "Status → Closed": "#7C6CA8", "Status → Breached": "#C0524E", "Status → Active": "#5B8C5A", "Status → At Risk": "#D4A843" };
    return (
      <div style={{ position: "relative", paddingLeft: 24 }}>
        <div style={{ position: "absolute", left: 8, top: 4, bottom: 4, width: 2, backgroundColor: "#E8E4DE" }} />
        {sorted.map((h, i) => {
          const c = Object.entries(actionColors).find(([k]) => h.action.includes(k))?.[1] || "#8B9DAF";
          return (
            <div key={i} style={{ position: "relative", marginBottom: 18, paddingLeft: 16 }}>
              <div style={{ position: "absolute", left: -20, top: 4, width: 12, height: 12, borderRadius: "50%", backgroundColor: c, border: "2px solid #fff", boxShadow: "0 0 0 2px " + c + "30" }} />
              <div style={{ fontSize: 11, color: "#8B8680", marginBottom: 2 }}>{fmtDateTime(h.date)}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1A1A2E" }}>{h.action}</div>
              {h.details && <div style={{ fontSize: 13, color: "#6B6660", marginTop: 2 }}>{h.details}</div>}
            </div>
          );
        })}
      </div>
    );
  };

  // ─── PROMISE CARD ───
  const PromiseCard = ({ action, isSub }) => {
    const domain = getDomain(action.domain);
    const days = daysLeft(action.dueDate);
    const overdue = days !== null && days < 0 && !["Closed", "Breached"].includes(action.status);
    const childProg = !isSub ? getChildProgress(action.id) : null;
    const children = !isSub ? getChildren(action.id) : [];
    return (
      <div style={{ marginBottom: isSub ? 0 : 10 }}>
        <div onClick={() => openDetail(action.id)} style={{
          backgroundColor: isSub ? "#FAFAF8" : "#fff", borderRadius: isSub ? 8 : 12,
          padding: isSub ? "10px 14px" : "16px 20px", cursor: "pointer",
          boxShadow: isSub ? "none" : "0 1px 4px rgba(0,0,0,0.04)",
          borderLeft: `${isSub ? 3 : 4}px solid ${domain.color}`,
          transition: "all 0.15s",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: isSub ? 2 : 6 }}>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0, fontSize: isSub ? 13 : 15, fontWeight: 600, color: "#1A1A2E" }}>{action.title}</h4>
              {!isSub && action.promisedTo && <p style={{ margin: "3px 0 0", fontSize: 12, color: "#8B8680" }}>👤 {action.promisedTo}</p>}
            </div>
            <StatusBadge status={action.status} />
          </div>
          {!isSub && action.description && <p style={{ fontSize: 13, color: "#6B6660", margin: "6px 0", lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{action.description}</p>}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: isSub ? 4 : 8, flexWrap: "wrap", gap: 6 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              <Tag text={action.impactLevel} color={IMPACT_COLORS[action.impactLevel]} bg={IMPACT_COLORS[action.impactLevel] + "18"} />
              {!isSub && <Tag text={domain.name} />}
              {action.recurrence && action.recurrence !== "once" && <Tag text={"🔄 " + t(action.recurrence)} color="#3D7C98" bg="#3D7C9818" />}
            </div>
            {action.dueDate && (
              <span style={{ fontSize: 12, color: overdue ? "#C0524E" : "#8B8680", fontWeight: overdue ? 700 : 400, whiteSpace: "nowrap" }}>
                {days > 0 ? days + t("daysLeft") : days === 0 ? t("today") : Math.abs(days) + t("overdue")}
              </span>
            )}
          </div>
          {/* Child progress bar */}
          {childProg && (
            <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px solid #F0ECE6" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: "#8B8680" }}>{t("subCommitments")}: {childProg.done}/{childProg.total}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#7C6CA8" }}>{childProg.pct}%</span>
              </div>
              <div style={{ width: "100%", height: 5, backgroundColor: "#E8E4DE", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: childProg.pct + "%", height: "100%", backgroundColor: "#7C6CA8", borderRadius: 3, transition: "width 0.4s ease" }} />
              </div>
            </div>
          )}
        </div>
        {/* Nested children */}
        {children.length > 0 && (
          <div style={{ marginLeft: 20, paddingLeft: 12, borderLeft: "2px solid #E8E4DE", marginTop: 4, display: "flex", flexDirection: "column", gap: 4 }}>
            {children.map(c => <PromiseCard key={c.id} action={c} isSub />)}
          </div>
        )}
      </div>
    );
  };

  // ═══════════ VIEWS ═══════════

  const DashboardView = () => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px" }}>{t("flowDashboard")}</h1>
          <p style={{ margin: "3px 0 0", fontSize: 13, color: "#8B8680" }}>{t("flowSubtitle")}</p>
        </div>
        <button onClick={() => openCreate()} style={{ padding: "10px 20px", backgroundColor: "#7C6CA8", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{t("newCommitment")}</button>
      </div>
      <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ backgroundColor: "#fff", borderRadius: 16, padding: isMobile ? 20 : 26, flex: "2 1 300px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
          <FlowCircle score={stats.flow} label={stats.flowLabel} />
          <div style={{ flex: 1, minWidth: 170 }}>
            <h3 style={{ margin: "0 0 6px", fontSize: 12, color: "#8B8680", textTransform: "uppercase", letterSpacing: "1px" }}>{t("flowScore")}</h3>
            {[
              { l: t("onTime"), v: stats.completionRate + "%" },
              { l: t("contextInstalled"), v: Math.round(stats.total > 0 ? (stats.contextSet / stats.total) * 100 : 0) + "%" },
              { l: t("renegRate"), v: stats.renegRate + "%", c: stats.renegRate > 0 ? "#D4A843" : undefined },
              { l: t("breachRate"), v: stats.breachRate + "%", c: stats.breachRate > 0 ? "#C0524E" : undefined },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #F0ECE6" }}>
                <span style={{ fontSize: 13, color: "#6B6660" }}>{r.l}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: r.c || "#1A1A2E" }}>{r.v}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, flex: "1 1 180px" }}>
          <StatCard icon="⊙" label="Active" value={stats.active} color="#5B8C5A" />
          <StatCard icon="△" label="At Risk" value={stats.atRisk} color="#D4A843" />
          <StatCard icon="◇" label="Context Set" value={stats.contextSet} color="#3D7C98" />
          <StatCard icon="✓" label="Closed" value={stats.closed} color="#7C6CA8" />
        </div>
      </div>


      {/* AI Section */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
        {/* AI Pattern Analysis */}
        <div style={{ flex: "1 1 280px", backgroundColor: "#fff", borderRadius: 14, padding: 22, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 18 }}>🔮</span>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>{t("aiPatterns")}</h3>
            </div>
            <button onClick={async () => {
              if (actions.length === 0) return;
              setAiLoading("patterns"); setAiPatterns(null);
              try {
                const summary = actions.map(a => {
                  const d = getDomain(a.domain);
                  const dl = daysLeft(a.dueDate);
                  return { title: a.title, domain: d.name, status: a.status, impact: a.impactLevel, daysLeft: dl, hasContext: !!(a.distractionsRemoved || a.resourcesAllocated), hasVipas: !!a.vipas_vision };
                });
                const prompt = "Analizeaza aceste angajamente si returneaza DOAR un JSON valid, fara markdown, fara backticks. Limba: romana.\n\nFormat exact:\n{\"risks\":[{\"level\":\"high/medium/low\",\"title\":\"...\",\"detail\":\"...\"}],\"patterns\":[\"...\"],\"recommendations\":[\"...\"],\"watchFor\":[\"...\"]}\n\nReguli: max 2 risks, max 3 patterns, max 3 recommendations, max 3 watchFor. Fii specific si concis.\n\nAngajamente: " + JSON.stringify(summary) + "\nFlow score: " + stats.flow + "/100, Completare: " + stats.completionRate + "%, Breach: " + stats.breachRate + "%, Depasite: " + stats.overdue;
                const res = await fetch("/.netlify/functions/ai-analyze", {
                  method: "POST", headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ prompt, type: "patterns" }),
                });
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                const result = data.parsed || JSON.parse((data.result || "").replace(/```json|```/g, "").trim());
                setAiPatterns(result);
              } catch (e) { console.error("AI patterns error:", e); setAiPatterns({ error: true }); }
              setAiLoading(null);
            }} disabled={aiLoading === "patterns" || actions.length === 0} style={{
              padding: "7px 16px", backgroundColor: "#7C6CA8", color: "#fff", border: "none", borderRadius: 8,
              fontSize: 12, fontWeight: 600, cursor: actions.length === 0 ? "not-allowed" : "pointer", fontFamily: "inherit",
              opacity: aiLoading === "patterns" || actions.length === 0 ? 0.6 : 1,
            }}>{aiLoading === "patterns" ? "Analizez..." : "Analyze Patterns"}</button>
          </div>
          {aiLoading === "patterns" && <div style={{ textAlign: "center", padding: 20 }}><div style={{ width: 28, height: 28, border: "3px solid #E8E4DE", borderTopColor: "#7C6CA8", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 8px" }} /><p style={{ fontSize: 12, color: "#8B8680" }}>Analizez tiparele...</p></div>}
          {aiPatterns && !aiPatterns.error ? (
            <div>
              {aiPatterns.risks && aiPatterns.risks.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}><span style={{ fontSize: 14 }}>⚠️</span><span style={{ fontSize: 13, fontWeight: 700, color: "#1A1A2E" }}>Risk Predictions</span></div>
                  {aiPatterns.risks.map(function(r, i) {
                    var colors = { high: { bg: "#C0524E15", border: "#C0524E30", badge: "#C0524E", badgeBg: "#C0524E20" }, medium: { bg: "#D4A84315", border: "#D4A84330", badge: "#D4A843", badgeBg: "#D4A84320" }, low: { bg: "#7BA68C15", border: "#7BA68C30", badge: "#7BA68C", badgeBg: "#7BA68C20" } };
                    var rc = colors[r.level] || colors.medium;
                    return (
                      <div key={i} style={{ backgroundColor: rc.bg, border: "1px solid " + rc.border, borderRadius: 10, padding: "12px 14px", marginBottom: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 10, fontWeight: 700, color: rc.badge, backgroundColor: rc.badgeBg, padding: "2px 8px", borderRadius: 4, textTransform: "uppercase" }}>{r.level}</span>
                          <span style={{ fontSize: 13, fontWeight: 600, color: "#1A1A2E" }}>{r.title}</span>
                        </div>
                        <p style={{ fontSize: 12, color: "#5A5650", margin: 0, lineHeight: 1.5 }}>{r.detail}</p>
                      </div>
                    );
                  })}
                </div>
              )}
              {aiPatterns.patterns && aiPatterns.patterns.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}><span style={{ fontSize: 14 }}>📈</span><span style={{ fontSize: 13, fontWeight: 700, color: "#1A1A2E" }}>Patterns Identified</span></div>
                  {aiPatterns.patterns.map(function(p, i) { return (
                    <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6 }}>
                      <span style={{ color: "#7C6CA8", fontSize: 16, lineHeight: 1.2 }}>{"•"}</span>
                      <span style={{ fontSize: 13, color: "#3A3A4A", lineHeight: 1.5 }}>{p}</span>
                    </div>
                  ); })}
                </div>
              )}
              {aiPatterns.recommendations && aiPatterns.recommendations.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}><span style={{ fontSize: 14 }}>💡</span><span style={{ fontSize: 13, fontWeight: 700, color: "#1A1A2E" }}>Recommendations</span></div>
                  {aiPatterns.recommendations.map(function(r, i) { return (
                    <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6 }}>
                      <span style={{ color: "#5B8C5A", fontSize: 16, lineHeight: 1.2 }}>{"•"}</span>
                      <span style={{ fontSize: 13, color: "#3A3A4A", lineHeight: 1.5 }}>{r}</span>
                    </div>
                  ); })}
                </div>
              )}
              {aiPatterns.watchFor && aiPatterns.watchFor.length > 0 && (
                <div style={{ backgroundColor: "#D4A84310", borderRadius: 10, padding: "12px 14px", border: "1px solid #D4A84325" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}><span style={{ fontSize: 14 }}>⚡</span><span style={{ fontSize: 12, fontWeight: 700, color: "#D4A843" }}>Watch For</span></div>
                  {aiPatterns.watchFor.map(function(w, i) { return <p key={i} style={{ fontSize: 12, color: "#5A5650", margin: "0 0 3px", lineHeight: 1.5 }}>{w}</p>; })}
                </div>
              )}
            </div>
          ) : aiPatterns && aiPatterns.error ? (
            <p style={{ fontSize: 13, color: "#C0524E" }}>Eroare la analiza. Incearca din nou.</p>
          ) : !aiLoading && (
            <p style={{ fontSize: 13, color: "#8B8680", margin: 0 }}>Analizeaza tiparele comportamentale din angajamentele tale.</p>
          )}
        </div>

        {/* Flow Improvement Plan */}
        <div style={{ flex: "1 1 280px", backgroundColor: "#fff", borderRadius: 14, padding: 22, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 18 }}>🚀</span>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>{t("aiPlan")}</h3>
            </div>
            <button onClick={async () => {
              if (actions.length === 0) return;
              setAiLoading("plan"); setAiPlan(null);
              try {
                const summary = actions.map(a => {
                  const d = getDomain(a.domain);
                  return { title: a.title, domain: d.name, status: a.status, impact: a.impactLevel, hasContext: !!(a.distractionsRemoved || a.resourcesAllocated) };
                });
                const domList = domains.map(d => d.name).join(", ");
                const prompt = "Genereaza un plan de imbunatatire a flow-ului. Returneaza DOAR JSON valid, fara markdown, fara backticks. Limba: romana.\n\nFormat exact:\n{\"targetScore\":number,\"weeklyFocus\":[{\"title\":\"...\",\"tasks\":[\"...\",\"...\"]}],\"dailyActions\":[\"...\"],\"habits\":[\"...\"]}\n\nReguli: targetScore realist, max 4 weeklyFocus cu max 2 tasks, max 5 dailyActions, max 4 habits. Fii specific.\n\nAngajamente: " + JSON.stringify(summary) + "\nDomenii: " + domList + "\nScor actual: " + stats.flow + "/100, Active: " + stats.active + ", Depasite: " + stats.overdue + ", Context: " + stats.contextSet + "/" + stats.total;
                const res = await fetch("/.netlify/functions/ai-analyze", {
                  method: "POST", headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ prompt, type: "plan" }),
                });
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                const result = data.parsed || JSON.parse((data.result || "").replace(/```json|```/g, "").trim());
                setAiPlan(result);
              } catch (e) { console.error("AI plan error:", e); setAiPlan({ error: true }); }
              setAiLoading(null);
            }} disabled={aiLoading === "plan" || actions.length === 0} style={{
              padding: "7px 16px", backgroundColor: "#C0524E", color: "#fff", border: "none", borderRadius: 8,
              fontSize: 12, fontWeight: 600, cursor: actions.length === 0 ? "not-allowed" : "pointer", fontFamily: "inherit",
              opacity: aiLoading === "plan" || actions.length === 0 ? 0.6 : 1,
            }}>{aiLoading === "plan" ? "Generez..." : "Generate Plan"}</button>
          </div>
          {aiLoading === "plan" && <div style={{ textAlign: "center", padding: 20 }}><div style={{ width: 28, height: 28, border: "3px solid #E8E4DE", borderTopColor: "#C0524E", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 8px" }} /><p style={{ fontSize: 12, color: "#8B8680" }}>Generez planul...</p></div>}
          {aiPlan && !aiPlan.error ? (
            <div>
              {/* Target Score */}
              <div style={{ backgroundColor: "#F5F3F0", borderRadius: 10, padding: "14px 16px", marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#6B6660" }}>Target Score</span>
                  <span style={{ fontSize: 28, fontWeight: 700, color: "#5B8C5A" }}>{aiPlan.targetScore}</span>
                </div>
                <div style={{ width: "100%", height: 8, backgroundColor: "#E0DDD8", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: Math.min(100, (stats.flow / (aiPlan.targetScore || 100)) * 100) + "%", height: "100%", backgroundColor: "#7C6CA8", borderRadius: 4, transition: "width 0.6s ease" }} />
                </div>
                <p style={{ fontSize: 11, color: "#8B8680", margin: "6px 0 0" }}>{"Current: " + stats.flow + " \u2192 Goal: " + aiPlan.targetScore}</p>
              </div>
              {/* Weekly Focus */}
              {aiPlan.weeklyFocus && aiPlan.weeklyFocus.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}><span style={{ fontSize: 14 }}>📅</span><span style={{ fontSize: 13, fontWeight: 700 }}>Weekly Focus Areas</span></div>
                  {aiPlan.weeklyFocus.map(function(w, i) { return (
                    <div key={i} style={{ backgroundColor: "#F8F7FF", borderRadius: 10, padding: "12px 14px", marginBottom: 8, border: "1px solid #E8E4F0" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <span style={{ width: 22, height: 22, borderRadius: 6, backgroundColor: "#7C6CA8", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E" }}>{w.title}</span>
                      </div>
                      {(w.tasks || []).map(function(t, j) { return (
                        <div key={j} style={{ display: "flex", gap: 6, alignItems: "center", marginLeft: 30, marginBottom: 3 }}>
                          <span style={{ width: 14, height: 14, borderRadius: "50%", border: "1.5px solid #D4CFC8", flexShrink: 0 }} />
                          <span style={{ fontSize: 12, color: "#4A4A5A" }}>{t}</span>
                        </div>
                      ); })}
                    </div>
                  ); })}
                </div>
              )}
              {/* Daily Actions */}
              {aiPlan.dailyActions && aiPlan.dailyActions.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}><span style={{ fontSize: 14 }}>⊙</span><span style={{ fontSize: 13, fontWeight: 700 }}>Daily Actions</span></div>
                  {aiPlan.dailyActions.map(function(a, i) { return (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: "10px 14px", backgroundColor: "#5B8C5A10", borderRadius: 8, marginBottom: 6 }}>
                      <span style={{ width: 22, height: 22, borderRadius: 6, backgroundColor: "#5B8C5A25", color: "#5B8C5A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                      <span style={{ fontSize: 13, color: "#3A3A4A" }}>{a}</span>
                    </div>
                  ); })}
                </div>
              )}
              {/* Habits */}
              {aiPlan.habits && aiPlan.habits.length > 0 && (
                <div style={{ backgroundColor: "#C0524E08", borderRadius: 10, padding: "12px 14px", border: "1px solid #C0524E15" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}><span style={{ fontSize: 14 }}>🔄</span><span style={{ fontSize: 12, fontWeight: 700, color: "#C0524E" }}>Habits to Build</span></div>
                  {aiPlan.habits.map(function(h, i) { return (
                    <div key={i} style={{ display: "flex", gap: 6, alignItems: "flex-start", marginBottom: 4 }}>
                      <span style={{ color: "#C0524E", fontSize: 10, marginTop: 4 }}>{"•"}</span>
                      <span style={{ fontSize: 12, color: "#4A4A5A", lineHeight: 1.5 }}>{h}</span>
                    </div>
                  ); })}
                </div>
              )}
            </div>
          ) : aiPlan && aiPlan.error ? (
            <p style={{ fontSize: 13, color: "#C0524E" }}>Eroare la generare. Incearca din nou.</p>
          ) : !aiLoading && (
            <p style={{ fontSize: 13, color: "#8B8680", margin: 0 }}>Genereaza un plan personalizat de 30 zile.</p>
          )}
        </div>
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{t("recentCommitments")}</h3>
          <button onClick={() => setView("list")} style={{ background: "none", border: "none", color: "#7C6CA8", fontSize: 13, cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>{t("viewAll")}</button>
        </div>
        {actions.slice(0, 4).map(a => <PromiseCard key={a.id} action={a} />)}
        {actions.length === 0 && <div style={{ textAlign: "center", padding: 40, color: "#8B8680" }}><p style={{ fontSize: 28, marginBottom: 8 }}>△</p><p>{t("noCommitments")}</p></div>}
      </div>
    </div>
  );

  const ListView = () => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
        <div><h1 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>{t("allCommitments")}</h1><p style={{ margin: "3px 0 0", fontSize: 13, color: "#8B8680" }}>{actions.length} total</p></div>
        <button onClick={() => openCreate()} style={{ padding: "10px 20px", backgroundColor: "#7C6CA8", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{t("newCommitment")}</button>
      </div>
      <div style={{ backgroundColor: "#fff", borderRadius: 12, padding: "12px 16px", marginBottom: 16, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <input type="text" placeholder={t("search")} value={filters.search} onChange={e => setFilters(p => ({ ...p, search: e.target.value }))} style={{ ...inp, flex: "1 1 180px", minWidth: 120, padding: "8px 12px", fontSize: 13 }} />
        {[{ k: "status", l: "Status", o: STATUSES }, { k: "domain", l: "Domeniu", o: domains.map(d => d.name), v: domains.map(d => d.id) }, { k: "impact", l: "Impact", o: IMPACT_LEVELS }].map(f => (
          <select key={f.k} value={filters[f.k]} onChange={e => setFilters(p => ({ ...p, [f.k]: e.target.value }))} style={{ padding: "8px 10px", border: "1.5px solid #E0DDD8", borderRadius: 8, fontSize: 13, fontFamily: "inherit", color: "#1A1A2E", backgroundColor: "#fff", cursor: "pointer" }}>
            <option value="all">{t("allStatus")}</option>
            {f.o.map((o, i) => <option key={o} value={f.v ? f.v[i] : o}>{o}</option>)}
          </select>
        ))}
      </div>
      {filtered.map(a => <PromiseCard key={a.id} action={a} />)}
      {filtered.length === 0 && <div style={{ textAlign: "center", padding: 40, color: "#8B8680" }}>{t("noCommitments")}</div>}
    </div>
  );

  const CreateView = () => (
    <div style={{ maxWidth: 660, margin: "0 auto" }}>
      <button onClick={() => { setEditingId(null); setView("list"); }} style={{ background: "none", border: "none", color: "#7C6CA8", fontSize: 14, cursor: "pointer", marginBottom: 14, fontFamily: "inherit", fontWeight: 500, padding: 0 }}>← Înapoi</button>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
        <div style={{ width: 42, height: 42, borderRadius: 12, backgroundColor: "#7C6CA8" + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>✦</div>
        <div><h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>{editingId ? t("editTitle") : formData.parentId ? t("newSubCommitment") : t("newCommitmentTitle")}</h1><p style={{ margin: "2px 0 0", fontSize: 12, color: "#8B8680" }}>{formData.parentId ? t("subSubtitle") : t("commitmentSubtitle")}</p></div>
      </div>

      {/* Basic */}
      <div style={sec}>
        <div style={{ marginBottom: 12 }}><label style={lbl}>{t("title")} *</label><input type="text" placeholder={lang === "ro" ? "La ce te angajezi?" : "What are you committing to?"} value={formData.title} onChange={e => updateField("title", e.target.value)} style={inp} /></div>
        <div style={{ marginBottom: 12 }}><label style={lbl}>{t("description")}</label><textarea placeholder={lang === "ro" ? "Descrie angajamentul in detaliu..." : "Describe the commitment in detail..."} value={formData.description} onChange={e => updateField("description", e.target.value)} style={txa} rows={3} /></div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 150 }}><label style={lbl}>{t("promisedTo")} *</label><input type="text" placeholder={lang === "ro" ? "Cui i-ai promis?" : "Who did you promise?"} value={formData.promisedTo} onChange={e => updateField("promisedTo", e.target.value)} style={inp} /></div>
          <div style={{ flex: 1, minWidth: 150 }}><label style={lbl}>{t("deadline")} *</label><input type="date" value={formData.dueDate} onChange={e => updateField("dueDate", e.target.value)} style={inp} /></div>
          <div style={{ flex: 1, minWidth: 150 }}><label style={lbl}>{t("recurrence")}</label>
            <select value={formData.recurrence || "once"} onChange={e => updateField("recurrence", e.target.value)} style={{ ...inp, cursor: "pointer" }}>
              <option value="once">{t("once")}</option>
              <option value="daily">{t("daily")}</option>
              <option value="weekly">{t("weekly")}</option>
              <option value="monthly">{t("monthly")}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Outcome / Cost / Risk */}
      <div style={sec}>
        <div style={{ marginBottom: 12 }}><label style={lbl}>{t("expectedOutcome")}</label><textarea placeholder={t("phOutcome")} value={formData.expectedOutcome} onChange={e => updateField("expectedOutcome", e.target.value)} style={txa} rows={2} /></div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 150 }}><label style={lbl}>{t("costAcknowledged")}</label><textarea placeholder={t("phCost")} value={formData.costAcknowledged} onChange={e => updateField("costAcknowledged", e.target.value)} style={txa} rows={2} /></div>
          <div style={{ flex: 1, minWidth: 150 }}><label style={lbl}>{t("riskIdentified")}</label><textarea placeholder={t("phRisk")} value={formData.riskIdentified} onChange={e => updateField("riskIdentified", e.target.value)} style={txa} rows={2} /></div>
        </div>
      </div>

      {/* Classification */}
      <div style={sec}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 130 }}><label style={lbl}>{t("impact")}</label><select value={formData.impactLevel} onChange={e => updateField("impactLevel", e.target.value)} style={inp}>{IMPACT_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}</select></div>
          <div style={{ flex: 1, minWidth: 130 }}><label style={lbl}>{t("domain")}</label><select value={formData.domain} onChange={e => updateField("domain", e.target.value)} style={inp}>{domains.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}</select></div>
          <div style={{ flex: 1, minWidth: 130 }}><label style={lbl}>{t("status")}</label><select value={formData.status} onChange={e => updateField("status", e.target.value)} style={inp}>{STATUSES.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
        </div>
      </div>

      {/* Context */}
      <div style={sec}>
        <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700 }}>{"🔧 " + t("contextInstall")}</h3>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
          {[{ k: "distractionsRemoved", l: t("distractions"), i: "🚫", p: t("phDistract") }, { k: "resourcesAllocated", l: t("resources"), i: "⚡", p: t("phResources") }, { k: "supportRequired", l: t("support"), i: "🤝", p: t("phSupport") }, { k: "triggersIdentified", l: t("triggers"), i: "⚠️", p: t("phTriggers") }].map(f => (
            <div key={f.k}><label style={lbl}>{f.i} {f.l}</label><textarea placeholder={f.p} value={formData[f.k]} onChange={e => updateField(f.k, e.target.value)} style={txa} rows={3} /></div>
          ))}
        </div>
      </div>

      {/* Emotional Impact only on detail view */}

      {/* VIPAS - only when editing an existing commitment */}
      {/* VIPAS only on detail view, not in create/edit form */}

      {/* Notes */}
      <div style={sec}><label style={lbl}>Note Adiționale</label><textarea placeholder="Orice altceva relevant..." value={formData.notes} onChange={e => updateField("notes", e.target.value)} style={txa} rows={3} /></div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 6, marginBottom: 20 }}>
        <button onClick={() => { setEditingId(null); setView("list"); }} style={{ padding: "10px 22px", border: "1.5px solid #D4CFC8", borderRadius: 8, backgroundColor: "transparent", color: "#6B6660", fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>{t("cancel")}</button>
        <button onClick={handleSubmit} style={{ padding: "10px 26px", border: "none", borderRadius: 8, backgroundColor: "#7C6CA8", color: "#fff", fontSize: 14, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>{editingId ? t("save") : t("createCommitment")}</button>
      </div>
    </div>
  );

  // ─── EMOTIONAL IMPACT EDITABLE (for detail view) ───
  const EmotionalImpactEditable = ({ action }) => {
    const [eiData, setEiData] = useState({
      ei_now_self: action.ei_now_self || "", ei_now_others: action.ei_now_others || "", ei_now_world: action.ei_now_world || "",
      ei_dest_self: action.ei_dest_self || "", ei_dest_others: action.ei_dest_others || "", ei_dest_world: action.ei_dest_world || "",
      ei_gen_self: action.ei_gen_self || "", ei_gen_others: action.ei_gen_others || "", ei_gen_world: action.ei_gen_world || "",
    });
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
      const h = [...(action.history || []), { date: new Date().toISOString(), action: "Impact emotional actualizat", details: "Impactul emotional a fost actualizat" }];
      saveAction({ ...action, ...eiData, history: h, updatedAt: new Date().toISOString() });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    };

    const dimensions = [
      { key: "now", title: t("whoAmINow"), subtitle: t("waysOfBeingNow"), color: "#3D7C98", icon: "\u{1FA9E}",
        fields: [
          { k: "ei_now_self", label: t("forMe"), ph: t("phNowSelf") },
          { k: "ei_now_others", label: t("forOthers"), ph: t("phNowOthers") },
          { k: "ei_now_world", label: t("forWorld"), ph: t("phNowWorld") },
        ]
      },
      { key: "dest", title: t("destination"), subtitle: t("waysOfBeingDesired"), color: "#5B8C5A", icon: "\u{1F9ED}",
        fields: [
          { k: "ei_dest_self", label: t("forMe"), ph: t("phDestSelf") },
          { k: "ei_dest_others", label: t("forOthers"), ph: t("phDestOthers") },
          { k: "ei_dest_world", label: t("forWorld"), ph: t("phDestWorld") },
        ]
      },
      { key: "gen", title: t("generativeEmotions"), subtitle: t("howWeFeelOnTheWay"), color: "#7C6CA8", icon: "\u2728",
        fields: [
          { k: "ei_gen_self", label: t("forMe"), ph: t("phGenSelf") },
          { k: "ei_gen_others", label: t("forOthers"), ph: t("phGenOthers") },
          { k: "ei_gen_world", label: t("forWorld"), ph: t("phGenWorld") },
        ]
      },
    ];

    return (
      <div>
        <p style={{ fontSize: 12, color: "#8B8680", margin: "0 0 16px" }}>{t("explore3perspectives")}</p>
        {dimensions.map(dim => (
          <div key={dim.key} style={{ marginBottom: 18, borderLeft: "3px solid " + dim.color, paddingLeft: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 18 }}>{dim.icon}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: dim.color }}>{dim.title}</div>
                <div style={{ fontSize: 11, color: "#8B8680" }}>{dim.subtitle}</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 10 }}>
              {dim.fields.map(f => (
                <div key={f.k}>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: dim.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.5px" }}>{f.label}</label>
                  <textarea placeholder={f.ph} value={eiData[f.k]} onChange={e => setEiData(p => ({ ...p, [f.k]: e.target.value }))} style={{ ...txa, minHeight: 56, borderColor: dim.color + "30" }} rows={2} />
                </div>
              ))}
            </div>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
          <button onClick={handleSave} style={{
            padding: "9px 22px", border: "none", borderRadius: 8,
            backgroundColor: saved ? "#5B8C5A" : "#7C6CA8", color: "#fff",
            fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
            transition: "background-color 0.3s",
          }}>{saved ? "✓ " + t("saved") : t("updateEmotional")}</button>
        </div>
      </div>
    );
  };

  // ─── SUB-ANGAJAMENTE SECTION (for detail view) ───
  const SubAngajamenteSection = ({ action }) => {
    const kids = getChildren(action.id);
    const prog = getChildProgress(action.id);
    return (
      <div style={{ backgroundColor: "#fff", borderRadius: 14, padding: isMobile ? 16 : 20, marginBottom: 14, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: kids.length > 0 ? 12 : 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 15 }}>📋</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E" }}>{t("subCommitments")}</span>
            {prog && <span style={{ fontSize: 12, color: "#8B8680" }}>({prog.done}/{prog.total} complete)</span>}
          </div>
          <button onClick={() => openCreateSub(action)} style={{
            padding: "6px 14px", backgroundColor: "#7C6CA815", color: "#7C6CA8", border: "1.5px solid #7C6CA830",
            borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
          }}>{t("newSub")}</button>
        </div>
        {prog && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ width: "100%", height: 6, backgroundColor: "#E8E4DE", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: prog.pct + "%", height: "100%", backgroundColor: "#7C6CA8", borderRadius: 3, transition: "width 0.4s ease" }} />
            </div>
          </div>
        )}
        {kids.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {kids.map(k => {
              const kDays = daysLeft(k.dueDate);
              const kOverdue = kDays !== null && kDays < 0 && !["Closed","Breached"].includes(k.status);
              return (
                <div key={k.id} onClick={() => openDetail(k.id)} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px",
                  backgroundColor: k.status === "Closed" ? "#5B8C5A08" : "#FAFAF8", borderRadius: 8, cursor: "pointer",
                  borderLeft: "3px solid " + (k.status === "Closed" ? "#5B8C5A" : k.status === "At Risk" ? "#D4A843" : "#7C6CA850"),
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
                    <span style={{
                      width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10, fontWeight: 700, color: "#fff", flexShrink: 0,
                      backgroundColor: k.status === "Closed" ? "#5B8C5A" : k.status === "Active" ? "#7C6CA8" : "#C4C0BA",
                    }}>{k.status === "Closed" ? "\u2713" : ""}</span>
                    <span style={{ fontSize: 13, fontWeight: 500, color: k.status === "Closed" ? "#8B8680" : "#1A1A2E", textDecoration: k.status === "Closed" ? "line-through" : "none" }}>{k.title}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                    <StatusBadge status={k.status} />
                    {k.dueDate && <span style={{ fontSize: 11, color: kOverdue ? "#C0524E" : "#8B8680" }}>{kDays > 0 ? kDays + "z" : kDays === 0 ? "Azi" : Math.abs(kDays) + "z dep."}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p style={{ fontSize: 13, color: "#C4C0BA", margin: "8px 0 0", textAlign: "center" }}>{t("noSubYet")}</p>
        )}
      </div>
    );
  };

  // ─── VIPAS EDITABLE (for detail view) ───
  const VipasEditable = ({ action }) => {
    const [vData, setVData] = useState({
      vipas_vision: action.vipas_vision || "",
      vipas_impact: action.vipas_impact || "",
      vipas_pattern: action.vipas_pattern || "",
      vipas_assumption: action.vipas_assumption || "",
      vipas_solution: action.vipas_solution || "",
    });
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
      const h = [...(action.history || []), { date: new Date().toISOString(), action: "VIPAS actualizat", details: "Analiza VIPAS a fost actualizata" }];
      saveAction({ ...action, ...vData, history: h, updatedAt: new Date().toISOString() });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    };

    return (
      <div>
        <div style={{ backgroundColor: "#F8F7FF", borderRadius: 12, padding: 18, marginBottom: 18, border: "1px solid #E8E4F0" }}>
          <h4 style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 700 }}>{lang === "ro" ? "Motor de Analiză VIPAS" : "VIPAS Analysis Engine"}</h4>
          <p style={{ fontSize: 12, color: "#6B6660", margin: 0 }}>{lang === "ro" ? "Framework-ul VIPAS te ajută să înțelegi structurile profunde și să creezi schimbări durabile." : "The VIPAS framework helps you understand deep structures and create lasting changes."}</p>
        </div>
        {vipasItems.map(v => (
          <div key={v.key} style={{ marginBottom: 16, borderLeft: `3px solid ${v.color}`, paddingLeft: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: v.color + "20", color: v.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800 }}>{v.letter}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E" }}>{v.title}</span>
            </div>
            <textarea value={vData[v.key]} onChange={e => setVData(p => ({ ...p, [v.key]: e.target.value }))} placeholder={v.ph} style={{ ...txa, borderColor: v.color + "30" }} rows={3} />
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
          <button onClick={handleSave} style={{
            padding: "9px 22px", border: "none", borderRadius: 8,
            backgroundColor: saved ? "#5B8C5A" : "#7C6CA8", color: "#fff",
            fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
            transition: "background-color 0.3s",
          }}>{saved ? "✓ " + t("saved") : t("updateVipas")}</button>
        </div>
      </div>
    );
  };

  const DetailView = () => {
    const a = selectedAction;
    if (!a) return <div><button onClick={() => setView("list")}>← Înapoi</button><p>Negăsit.</p></div>;
    const domain = getDomain(a.domain);
    const InfoBlock = ({ label, text }) => text ? (<div style={{ flex: 1, minWidth: 130 }}><div style={{ fontSize: 10, fontWeight: 700, color: "#8B8680", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 3 }}>{label}</div><div style={{ fontSize: 13, color: "#1A1A2E", lineHeight: 1.5 }}>{text}</div></div>) : null;
    const ContextCard = ({ icon, label, text, color }) => (<div style={{ backgroundColor: (color || "#7C6CA8") + "08", borderRadius: 12, padding: 16, border: `1px solid ${(color || "#7C6CA8")}15` }}><div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}><span style={{ fontSize: 16 }}>{icon}</span><span style={{ fontSize: 13, fontWeight: 700 }}>{label}</span></div><p style={{ fontSize: 13, color: "#4A4A5A", lineHeight: 1.6, margin: 0, whiteSpace: "pre-wrap" }}>{text || "—"}</p></div>);
    const canClose = !["Closed", "Breached"].includes(a.status);

    return (
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <button onClick={() => setView("list")} style={{ background: "none", border: "none", color: "#7C6CA8", fontSize: 14, cursor: "pointer", marginBottom: 14, fontFamily: "inherit", fontWeight: 500, padding: 0 }}>{"← " + t("backToList")}</button>

        {/* Parent link for sub-angajamente */}
        {a.parentId && actions.find(p => p.id === a.parentId) && (
          <button onClick={() => openDetail(a.parentId)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#8B8680", fontSize: 12, cursor: "pointer", marginBottom: 10, fontFamily: "inherit", padding: 0 }}>
            <span>↑</span> Sub-angajament al: <span style={{ color: "#7C6CA8", fontWeight: 600 }}>{(actions.find(p => p.id === a.parentId) || {}).title}</span>
          </button>
        )}

        {/* Header Card */}
        <div style={{ backgroundColor: "#fff", borderRadius: 16, padding: isMobile ? 20 : 26, boxShadow: "0 1px 4px rgba(0,0,0,0.05)", marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 10 }}>
            <StatusBadge status={a.status} />
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => openEdit(a)} style={{ padding: "6px 14px", border: "1.5px solid #E0DDD8", borderRadius: 8, backgroundColor: "#fff", fontSize: 13, cursor: "pointer", fontFamily: "inherit", color: "#6B6660" }}>✎ Edit</button>
              <button onClick={() => removeAction(a.id)} style={{ padding: "6px 12px", border: "1.5px solid #C0524E30", borderRadius: 8, backgroundColor: "#C0524E10", fontSize: 13, cursor: "pointer", fontFamily: "inherit", color: "#C0524E" }}>🗑</button>
            </div>
          </div>
          <h1 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 700, color: "#1A1A2E" }}>{a.title}</h1>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center", color: "#8B8680", fontSize: 13, marginBottom: 12 }}>
            {a.promisedTo && <span>👤 {a.promisedTo}</span>}
            {a.dueDate && <span>📅 {fmtDate(a.dueDate)}</span>}
            {a.recurrence && a.recurrence !== "once" && <span style={{ padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600, backgroundColor: "#3D7C9818", color: "#3D7C98" }}>🔄 {t(a.recurrence)}</span>}
            <Tag text={domain.name} />
            <Tag text={a.impactLevel} color={IMPACT_COLORS[a.impactLevel]} bg={IMPACT_COLORS[a.impactLevel] + "18"} />
            {a.dueDate && (
              <button onClick={() => { const url = buildGCalUrl(a); if (url) window.open(url, "_blank"); }} style={{ padding: "3px 10px", borderRadius: 6, border: "1px solid #4285F430", backgroundColor: "#4285F408", color: "#4285F4", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                {t("addToCalendar")}
              </button>
            )}
          </div>
          {a.description && <p style={{ fontSize: 14, color: "#4A4A5A", lineHeight: 1.6, margin: "0 0 14px" }}>{a.description}</p>}

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", padding: "14px 0 0", borderTop: "1px solid #F0ECE6" }}>
            <div style={{ flex: 1, minWidth: 130 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#8B8680", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 3 }}>{t("expectedOutcome")}</div>
              <div style={{ fontSize: 13, color: a.expectedOutcome ? "#1A1A2E" : "#C4C0BA", lineHeight: 1.5 }}>{a.expectedOutcome || "—"}</div>
            </div>
            <div style={{ flex: 1, minWidth: 130 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#8B8680", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 3 }}>{t("costAcknowledged")}</div>
              <div style={{ fontSize: 13, color: a.costAcknowledged ? "#1A1A2E" : "#C4C0BA", lineHeight: 1.5 }}>{a.costAcknowledged || "—"}</div>
            </div>
            <div style={{ flex: 1, minWidth: 130 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#8B8680", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 3 }}>{t("riskIdentified")}</div>
              <div style={{ fontSize: 13, color: a.riskIdentified ? "#1A1A2E" : "#C4C0BA", lineHeight: 1.5 }}>{a.riskIdentified || "—"}</div>
            </div>
          </div>

          {/* Action Buttons */}
          {canClose && (
            <div style={{ display: "flex", gap: 8, marginTop: 16, paddingTop: 14, borderTop: "1px solid #F0ECE6", flexWrap: "wrap" }}>
              <button onClick={() => changeStatus(a.id, "Closed", "Angajament îndeplinit")} style={{ padding: "8px 18px", border: "none", borderRadius: 8, backgroundColor: "#5B8C5A", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>{"✓ " + t("closePromise")}</button>
              <button onClick={() => { setRenegotiateNote(""); setRenegotiateDate(a.dueDate || ""); setRenegotiateModal(true); }} style={{ padding: "8px 18px", border: "1.5px solid #D4A843", borderRadius: 8, backgroundColor: "#D4A843" + "15", color: "#D4A843", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>{"↻ " + t("renegotiate")}</button>
              <button onClick={() => changeStatus(a.id, "Breached", "Angajament încălcat")} style={{ padding: "8px 18px", border: "1.5px solid #C0524E", borderRadius: 8, backgroundColor: "#C0524E" + "15", color: "#C0524E", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>{"✕ " + t("markBreached")}</button>
            </div>
          )}
        </div>

        {/* Sub-angajamente section */}
        <SubAngajamenteSection action={a} />

        {/* Tabs */}
        <div style={{ display: "flex", backgroundColor: "#fff", borderRadius: 12, overflow: "hidden", marginBottom: 14, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          {[{ id: "context", l: t("context"), i: "🔧" }, { id: "emotional", l: t("emotionalImpact"), i: "💫" }, { id: "vipas", l: "VIPAS", i: "🔬" }, { id: "history", l: t("history"), i: "🕐" }].map(t => (
            <button key={t.id} onClick={() => setDetailTab(t.id)} style={{
              flex: 1, padding: isMobile ? "10px 6px" : "12px 14px", border: "none",
              backgroundColor: detailTab === t.id ? "#7C6CA8" + "12" : "transparent",
              color: detailTab === t.id ? "#7C6CA8" : "#8B8680", fontSize: isMobile ? 11 : 13,
              fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
              borderBottom: detailTab === t.id ? "2px solid #7C6CA8" : "2px solid transparent",
            }}>{isMobile ? t.i : `${t.i} ${t.l}`}</button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ backgroundColor: "#fff", borderRadius: 14, padding: isMobile ? 18 : 24, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          {detailTab === "context" && (
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
              <ContextCard icon="🚫" label={t("distractions")} text={a.distractionsRemoved} color="#3D7C98" />
              <ContextCard icon="⚡" label={t("resources")} text={a.resourcesAllocated} color="#5B8C5A" />
              <ContextCard icon="🤝" label={t("support")} text={a.supportRequired} color="#B8763E" />
              <ContextCard icon="⚠️" label={t("triggers")} text={a.triggersIdentified} color="#D4A843" />
            </div>
          )}
          {detailTab === "emotional" && <EmotionalImpactEditable action={a} />}
          {detailTab === "vipas" && <VipasEditable action={a} />}
          {detailTab === "history" && <HistoryTimeline history={a.history} />}
        </div>

        {/* Notes */}
        {a.notes && (
          <div style={{ backgroundColor: "#fff", borderRadius: 14, padding: 20, marginTop: 14, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <h4 style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 700, color: "#8B8680", textTransform: "uppercase", letterSpacing: "0.5px" }}>{"📝 " + t("notes")}</h4>
            <p style={{ fontSize: 14, color: "#4A4A5A", lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap" }}>{a.notes}</p>
          </div>
        )}

        {/* Renegotiate Modal */}
        {renegotiateModal && (
          <div onClick={() => setRenegotiateModal(false)} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(26,26,46,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16, backdropFilter: "blur(4px)" }}>
            <div onClick={e => e.stopPropagation()} style={{ backgroundColor: "#fff", borderRadius: 16, padding: 26, width: "100%", maxWidth: 400, boxShadow: "0 24px 48px rgba(0,0,0,0.15)" }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 18, fontWeight: 700 }}>{"↻ " + t("renegotiateTitle")}</h3>
              <div style={{ marginBottom: 12 }}><label style={lbl}>{t("reason")}</label><textarea placeholder={t("reason")} value={renegotiateNote} onChange={e => setRenegotiateNote(e.target.value)} style={txa} rows={3} /></div>
              <div style={{ marginBottom: 16 }}><label style={lbl}>{t("newDeadline")}</label><input type="date" value={renegotiateDate} onChange={e => setRenegotiateDate(e.target.value)} style={inp} /></div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                <button onClick={() => setRenegotiateModal(false)} style={{ padding: "9px 18px", border: "1.5px solid #D4CFC8", borderRadius: 8, backgroundColor: "transparent", fontSize: 14, cursor: "pointer", fontFamily: "inherit", color: "#6B6660" }}>{t("cancel")}</button>
                <button onClick={() => handleRenegotiate(a.id)} style={{ padding: "9px 22px", border: "none", borderRadius: 8, backgroundColor: "#D4A843", color: "#fff", fontSize: 14, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>{t("renegotiate")}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ─── DOMAIN MODAL ───
  const DomainModal = () => showDomainModal ? (
    <div onClick={() => setShowDomainModal(false)} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(26,26,46,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16, backdropFilter: "blur(4px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ backgroundColor: "#fff", borderRadius: 16, padding: 26, width: "100%", maxWidth: 360, boxShadow: "0 24px 48px rgba(0,0,0,0.15)" }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 18, fontWeight: 700 }}>{t("newDomain")}</h3>
        <input type="text" placeholder={t("domainName")} value={newDomain.name} onChange={e => setNewDomain(p => ({ ...p, name: e.target.value }))} style={{ ...inp, marginBottom: 12 }} />
        <div style={{ marginBottom: 14 }}><label style={lbl}>{t("color")}</label><input type="color" value={newDomain.color} onChange={e => setNewDomain(p => ({ ...p, color: e.target.value }))} style={{ display: "block", marginTop: 4, width: 44, height: 34, border: "1px solid #E0DDD8", borderRadius: 8, cursor: "pointer" }} /></div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={() => setShowDomainModal(false)} style={{ padding: "9px 16px", border: "1.5px solid #D4CFC8", borderRadius: 8, backgroundColor: "transparent", fontSize: 14, cursor: "pointer", fontFamily: "inherit", color: "#6B6660" }}>{t("cancel")}</button>
          <button onClick={addDomain} style={{ padding: "9px 20px", border: "none", borderRadius: 8, backgroundColor: "#7C6CA8", color: "#fff", fontSize: 14, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>{t("addDomain")}</button>
        </div>
      </div>
    </div>
  ) : null;

  // ─── NAV ITEMS ───
  const navItems = [{ id: "dashboard", label: t("dashboard"), icon: "◫" }, { id: "list", label: t("commitments"), icon: "☰" }, { id: "domains", label: t("domains"), icon: "◈" }];

  const saveTheme = useCallback((t) => { setTheme(t); saveSetting("theme", t); }, [saveSetting]);
  const saveLang = useCallback((l) => { setLang(l); saveSetting("lang", l); }, [saveSetting]);
  const saveCustomTheme = (name) => {
    if (!name.trim()) return;
    const ct = { ...theme, name: name.trim(), id: uid() };
    const updated = [...savedThemes, ct];
    setSavedThemes(updated);
    saveSetting("customThemes", updated);
    setTheme(ct);
    saveSetting("theme", ct);
  };
  const deleteCustomTheme = (id) => {
    const updated = savedThemes.filter(t => t.id !== id);
    setSavedThemes(updated);
    saveSetting("customThemes", updated);
  };

  // Domains that have at least one action
  const activeDomains = useMemo(() => {
    const used = new Set(actions.map(a => a.domain));
    return domains.filter(d => used.has(d.id));
  }, [actions, domains]);

  // ─── DOMAIN MANAGEMENT ───
  const [editDomainId, setEditDomainId] = useState(null);
  const [editDomainName, setEditDomainName] = useState("");
  const [editDomainColor, setEditDomainColor] = useState("");

  const startEditDomain = (d) => { setEditDomainId(d.id); setEditDomainName(d.name); setEditDomainColor(d.color); };
  const cancelEditDomain = () => { setEditDomainId(null); setEditDomainName(""); setEditDomainColor(""); };
  const saveEditDomain = () => {
    if (!editDomainName.trim()) return;
    saveDomains(domains.map(d => d.id === editDomainId ? { ...d, name: editDomainName, color: editDomainColor } : d));
    cancelEditDomain();
  };
  const removeDomain = (id) => {
    const count = actions.filter(a => a.domain === id).length;
    if (count > 0) return;
    saveDomains(domains.filter(d => d.id !== id));
  };

  const DomainsView = () => (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>{t("domains")}</h1>
          <p style={{ margin: "3px 0 0", fontSize: 13, color: "#8B8680" }}>Gestionează categoriile angajamentelor tale</p>
        </div>
        <button onClick={() => setShowDomainModal(true)} style={{ padding: "10px 20px", backgroundColor: "#7C6CA8", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{t("newDomain")}</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {domains.map(d => {
          const count = actions.filter(a => a.domain === d.id).length;
          const isEditing = editDomainId === d.id;
          return (
            <div key={d.id} style={{ backgroundColor: "#fff", borderRadius: 12, padding: "14px 18px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", borderLeft: `4px solid ${d.color}` }}>
              {isEditing ? (
                <div>
                  <div style={{ display: "flex", gap: 10, marginBottom: 10, flexWrap: "wrap", alignItems: "center" }}>
                    <input type="text" value={editDomainName} onChange={e => setEditDomainName(e.target.value)} style={{ ...inp, flex: "1 1 200px", padding: "8px 12px", fontSize: 14 }} autoFocus />
                    <input type="color" value={editDomainColor} onChange={e => setEditDomainColor(e.target.value)} style={{ width: 40, height: 36, border: "1px solid #E0DDD8", borderRadius: 8, cursor: "pointer", padding: 2 }} />
                  </div>
                  <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                    <button onClick={cancelEditDomain} style={{ padding: "6px 14px", border: "1.5px solid #D4CFC8", borderRadius: 6, backgroundColor: "transparent", fontSize: 13, cursor: "pointer", fontFamily: "inherit", color: "#6B6660" }}>{t("cancel")}</button>
                    <button onClick={saveEditDomain} style={{ padding: "6px 16px", border: "none", borderRadius: 6, backgroundColor: "#7C6CA8", color: "#fff", fontSize: 13, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>Salvează</button>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: d.color, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: "#1A1A2E" }}>{d.name}</div>
                      <div style={{ fontSize: 12, color: "#8B8680" }}>{count} angajament{count !== 1 ? "e" : ""}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => startEditDomain(d)} style={{ padding: "5px 12px", border: "1.5px solid #E0DDD8", borderRadius: 6, backgroundColor: "#fff", fontSize: 12, cursor: "pointer", fontFamily: "inherit", color: "#6B6660" }}>✎ Edit</button>
                    {count === 0 && <button onClick={() => removeDomain(d.id)} style={{ padding: "5px 10px", border: "1.5px solid #C0524E30", borderRadius: 6, backgroundColor: "#C0524E10", fontSize: 12, cursor: "pointer", fontFamily: "inherit", color: "#C0524E" }}>🗑</button>}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  // ─── THEME VIEW ───
  const [newThemeNameInput, setNewThemeNameInput] = useState("");

  const ThemeView = () => (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: theme.text }}>{t("customize")}</h1>
        <p style={{ margin: "3px 0 0", fontSize: 13, color: "#8B8680" }}>{t("customizeSubtitle")}</p>
      </div>

      {/* Language Selector */}
      <div style={{ backgroundColor: theme.cardBg, borderRadius: 14, padding: 22, marginBottom: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 14, fontWeight: 700, color: theme.text }}>{t("language")}</h3>
        <div style={{ display: "flex", gap: 10 }}>
          {[{ code: "ro", label: "Romana", flag: "\ud83c\uddf7\ud83c\uddf4" }, { code: "en", label: "English", flag: "\ud83c\uddec\ud83c\udde7" }].map(function(l) { return (
            <button key={l.code} onClick={function() { saveLang(l.code); }} style={{
              flex: 1, padding: "14px 16px", borderRadius: 10, cursor: "pointer", fontFamily: "inherit",
              border: lang === l.code ? "2px solid " + theme.accent : "2px solid #E8E4DE",
              backgroundColor: lang === l.code ? theme.accent + "08" : "transparent",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{ fontSize: 22 }}>{l.flag}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: theme.text, flex: 1, textAlign: "left" }}>{l.label}</span>
              {lang === l.code && <span style={{ fontSize: 12, color: theme.accent, fontWeight: 600 }}>{"\u2713"}</span>}
            </button>
          ); })}
        </div>
      </div>

      {/* Default + Saved Themes */}
      <div style={{ backgroundColor: theme.cardBg, borderRadius: 14, padding: 22, marginBottom: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 14, fontWeight: 700, color: theme.text }}>{t("themes")}</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {/* Default Genesis */}
          <button onClick={() => saveTheme(DEFAULT_THEME)} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 10, width: "100%", textAlign: "left",
            border: theme.name === "Genesis Purple" ? "2px solid " + DEFAULT_THEME.accent : "2px solid #E8E4DE",
            backgroundColor: theme.name === "Genesis Purple" ? DEFAULT_THEME.accent + "08" : "transparent",
            cursor: "pointer", fontFamily: "inherit",
          }}>
            <div style={{ display: "flex", gap: 4 }}>
              <span style={{ width: 16, height: 16, borderRadius: 3, backgroundColor: DEFAULT_THEME.sidebar }} />
              <span style={{ width: 16, height: 16, borderRadius: 3, backgroundColor: DEFAULT_THEME.accent }} />
              <span style={{ width: 16, height: 16, borderRadius: 3, backgroundColor: DEFAULT_THEME.bg, border: "1px solid #E0DDD8" }} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: theme.text, flex: 1 }}>Genesis Purple</span>
            {theme.name === "Genesis Purple" && <span style={{ fontSize: 11, color: DEFAULT_THEME.accent, fontWeight: 600 }}>{t("activeLabel")}</span>}
          </button>

          {/* Saved Custom Themes */}
          {savedThemes.map(st => (
            <div key={st.id} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 10,
              border: theme.id === st.id ? "2px solid " + st.accent : "2px solid #E8E4DE",
              backgroundColor: theme.id === st.id ? st.accent + "08" : "transparent",
            }}>
              <button onClick={() => saveTheme(st)} style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left", padding: 0 }}>
                <div style={{ display: "flex", gap: 4 }}>
                  <span style={{ width: 16, height: 16, borderRadius: 3, backgroundColor: st.sidebar }} />
                  <span style={{ width: 16, height: 16, borderRadius: 3, backgroundColor: st.accent }} />
                  <span style={{ width: 16, height: 16, borderRadius: 3, backgroundColor: st.bg, border: "1px solid #E0DDD8" }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: theme.text, flex: 1 }}>{st.name}</span>
                {theme.id === st.id && <span style={{ fontSize: 11, color: st.accent, fontWeight: 600 }}>{t("activeLabel")}</span>}
              </button>
              <button onClick={() => deleteCustomTheme(st.id)} style={{ padding: "4px 8px", border: "1px solid #C0524E30", borderRadius: 6, backgroundColor: "#C0524E08", fontSize: 11, cursor: "pointer", fontFamily: "inherit", color: "#C0524E" }}>&#x1f5d1;</button>
            </div>
          ))}
        </div>
      </div>

      {/* Color Editor */}
      <div style={{ backgroundColor: theme.cardBg, borderRadius: 14, padding: 22, marginBottom: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 14, fontWeight: 700, color: theme.text }}>{t("colorEditor")}</h3>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14, marginBottom: 18 }}>
          {[
            { key: "accent", label: t("accentColor"), desc: t("accentDesc") },
            { key: "sidebar", label: t("sidebarColor"), desc: t("sidebarDesc") },
            { key: "bg", label: t("bgColor"), desc: t("bgDesc") },
            { key: "cardBg", label: t("cardColor"), desc: t("cardDesc") },
            { key: "text", label: t("textColor"), desc: t("textDesc") },
          ].map(c => (
            <div key={c.key} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <input type="color" value={theme[c.key]} onChange={e => saveTheme({ ...theme, name: theme.id ? theme.name : "Custom", [c.key]: e.target.value })} style={{ width: 42, height: 36, border: "1px solid #E0DDD8", borderRadius: 8, cursor: "pointer", padding: 2, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: theme.text }}>{c.label}</div>
                <div style={{ fontSize: 11, color: "#8B8680" }}>{c.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Save as new theme */}
        <div style={{ borderTop: "1px solid #E8E4DE", paddingTop: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#8B8680", marginBottom: 8 }}>{t("saveAsTheme")}</div>
          <div style={{ display: "flex", gap: 8 }}>
            <input type="text" placeholder={t("themeName")} value={newThemeNameInput} onChange={e => setNewThemeNameInput(e.target.value)} style={{ flex: 1, padding: "9px 12px", border: "1.5px solid #E0DDD8", borderRadius: 8, fontSize: 13, fontFamily: "inherit", outline: "none", color: theme.text, backgroundColor: "transparent" }} />
            <button onClick={() => { if (newThemeNameInput.trim()) { saveCustomTheme(newThemeNameInput); setNewThemeNameInput(""); } }} disabled={!newThemeNameInput.trim()} style={{
              padding: "9px 18px", border: "none", borderRadius: 8, backgroundColor: theme.accent,
              color: "#fff", fontSize: 13, fontWeight: 600, cursor: newThemeNameInput.trim() ? "pointer" : "not-allowed",
              fontFamily: "inherit", opacity: newThemeNameInput.trim() ? 1 : 0.5,
            }}>{t("saveBtn")}</button>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div style={{ backgroundColor: theme.cardBg, borderRadius: 14, padding: 22, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 14, fontWeight: 700, color: theme.text }}>{t("preview")}</h3>
        <div style={{ backgroundColor: theme.bg, borderRadius: 10, padding: 16 }}>
          <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
            <div style={{ width: 40, backgroundColor: theme.sidebar, borderRadius: 6, minHeight: 70 }} />
            <div style={{ flex: 1 }}>
              <div style={{ backgroundColor: theme.cardBg, borderRadius: 8, padding: 12, marginBottom: 8, borderLeft: "3px solid " + theme.accent }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: theme.text }}>{t("exampleCommitment")}</div>
                <div style={{ fontSize: 11, color: "#8B8680", marginTop: 4 }}>{t("shortDesc")}</div>
                <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                  <span style={{ padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: 600, backgroundColor: theme.accent + "20", color: theme.accent }}>High Impact</span>
                  <span style={{ padding: "2px 8px", borderRadius: 4, fontSize: 10, backgroundColor: "#E8E4DE", color: "#666" }}>Personal</span>
                </div>
              </div>
              <button style={{ padding: "6px 14px", backgroundColor: theme.accent, color: "#fff", border: "none", borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{t("newCommitment")}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ─── MAIN RENDER ───
  return (
    <div style={{ fontFamily: "'Segoe UI', 'SF Pro Display', -apple-system, sans-serif", backgroundColor: theme.bg, minHeight: "100vh", color: theme.text }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} ::selection{background:${theme.accent};color:#fff} textarea:focus,input:focus,select:focus{border-color:${theme.accent}!important;box-shadow:0 0 0 3px ${theme.accent}20}`}</style>
      {isMobile ? (
        <>
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, backgroundColor: theme.sidebar, padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 101, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          <div>
            <span style={{ color: "#fff", fontSize: 15, fontWeight: 700 }}>Genesis</span>
            <span style={{ color: "#6B6B80", fontSize: 10, marginLeft: 8 }}>{user?.email}</span>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <a href="https://revolut.me/adrianqz0e" target="_blank" rel="noopener noreferrer" style={{ padding: "4px 10px", borderRadius: 6, backgroundColor: theme.accent + "30", color: "#B8A9D4", fontSize: 11, textDecoration: "none", fontFamily: "inherit" }}>☕</a>
            <button onClick={onLogout} style={{ padding: "4px 10px", border: "1px solid #3A3A50", borderRadius: 6, backgroundColor: "transparent", color: "#C0524E", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>{t("logout")}</button>
          </div>
        </div>
        <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: theme.sidebar, display: "flex", justifyContent: "space-around", padding: "6px 0 10px", zIndex: 100, boxShadow: "0 -2px 10px rgba(0,0,0,0.15)" }}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => setView(n.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "6px 16px", border: "none", backgroundColor: "transparent", color: view === n.id || (n.id === "list" && ["create", "detail"].includes(view)) ? "#B8A9D4" : "#6B6B80", fontSize: 10, cursor: "pointer", fontFamily: "inherit" }}>
              <span style={{ fontSize: 20 }}>{n.icon}</span>{n.label}
            </button>
          ))}
        </nav>
        </>
      ) : (
        <nav style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: 210, backgroundColor: theme.sidebar, padding: "24px 0", display: "flex", flexDirection: "column", zIndex: 100 }}>
          <div style={{ padding: "0 20px", marginBottom: 30 }}>
            <h2 style={{ color: "#fff", fontSize: 17, fontWeight: 700, margin: 0, letterSpacing: "-0.3px" }}>Genesis</h2>
            <p style={{ color: "#6B6B80", fontSize: 11, margin: "2px 0 0", letterSpacing: "0.4px" }}>Commitment Tracker</p>
          </div>
          {navItems.map(n => (
            <div key={n.id}>
              <button onClick={() => { setView(n.id); if (n.id === "list") setFilters(p => ({ ...p, domain: "all" })); }} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "10px 20px", border: "none", width: "100%", textAlign: "left",
                backgroundColor: (view === n.id || (n.id === "list" && ["create", "detail"].includes(view))) ? theme.accent + "20" : "transparent",
                color: (view === n.id || (n.id === "list" && ["create", "detail"].includes(view))) ? theme.accent : "#6B6B80",
                fontSize: 14, cursor: "pointer", fontFamily: "inherit", fontWeight: 500,
                borderLeft: (view === n.id || (n.id === "list" && ["create", "detail"].includes(view))) ? "3px solid " + theme.accent : "3px solid transparent",
              }}><span style={{ fontSize: 16 }}>{n.icon}</span>{n.label}</button>
              {n.id === "list" && activeDomains.length > 0 && (
                <div style={{ paddingLeft: 28, paddingBottom: 4 }}>
                  {activeDomains.map(d => {
                    const count = actions.filter(a => a.domain === d.id).length;
                    const isActive = view === "list" && filters.domain === d.id;
                    return (
                      <button key={d.id} onClick={() => { setView("list"); setFilters(p => ({ ...p, domain: d.id })); }} style={{
                        display: "flex", alignItems: "center", gap: 8, padding: "5px 12px", border: "none", width: "100%", textAlign: "left",
                        backgroundColor: isActive ? "rgba(124,108,168,0.1)" : "transparent",
                        color: isActive ? "#B8A9D4" : "#55556B", fontSize: 12, cursor: "pointer", fontFamily: "inherit",
                        borderRadius: 6, marginBottom: 1, transition: "all 0.15s",
                      }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: d.color, flexShrink: 0 }} />
                        <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.name}</span>
                        <span style={{ fontSize: 10, color: "#55556B", opacity: 0.6 }}>{count}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
          <div style={{ marginTop: "auto", padding: "0 20px" }}>
            <button onClick={() => setView("theme")} style={{
              width: "100%", padding: "8px 12px", border: "none", borderRadius: 8, marginBottom: 8,
              backgroundColor: view === "theme" ? theme.accent + "20" : "transparent",
              color: view === "theme" ? theme.accent : "#6B6B80",
              fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 500,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{ width: 14, height: 14, borderRadius: "50%", background: "conic-gradient(" + theme.accent + ", " + theme.sidebar + ", " + theme.bg + ", " + theme.accent + ")", flexShrink: 0 }} />
              {t("customize")}
            </button>
            <button onClick={() => setShowDomainModal(true)} style={{ width: "100%", padding: "8px 12px", border: "1px dashed #3A3A50", borderRadius: 8, backgroundColor: "transparent", color: "#6B6B80", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>{t("newDomain")}</button>
            {user && (
              <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid #3A3A50" }}>
                <p style={{ color: "#8B8680", fontSize: 10, margin: "0 0 6px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</p>
                <button onClick={onLogout} style={{ width: "100%", padding: "6px 10px", border: "1px solid #3A3A50", borderRadius: 6, backgroundColor: "transparent", color: "#C0524E", fontSize: 11, cursor: "pointer", fontFamily: "inherit", marginBottom: 8 }}>{t("logout")}</button>
                <a href="https://revolut.me/adrianqz0e" target="_blank" rel="noopener noreferrer" style={{ display: "block", width: "100%", padding: "6px 10px", border: "1px solid #3A3A50", borderRadius: 6, backgroundColor: theme.accent + "15", color: theme.accent, fontSize: 11, cursor: "pointer", fontFamily: "inherit", textAlign: "center", textDecoration: "none", boxSizing: "border-box" }}>☕ {t("donate")}</a>
              </div>
            )}
            <p style={{ color: "#3A3A50", fontSize: 10, marginTop: 12, textAlign: "center" }}>Track. Reflect. Grow.</p>
          </div>
        </nav>
      )}
      <main style={isMobile ? { padding: "56px 14px 80px" } : { marginLeft: 210, padding: "28px 36px", maxWidth: 960 }}>
        {view === "dashboard" && DashboardView()}
        {view === "list" && ListView()}
        {view === "create" && CreateView()}
        {view === "detail" && DetailView()}
        {view === "domains" && DomainsView()}
        {view === "theme" && ThemeView()}
      </main>
      {DomainModal()}
    </div>
  );
}
