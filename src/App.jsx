import { useState, useEffect } from "react";

// ============================================================
// OBSIDIAN — Luxury Minimal Dark Admin Dashboard
// Black + Dark Blue | Premium | Apple-inspired
// Clean lines, generous space, refined typography
// ============================================================

const T = {
  bg:        "#080a0f",
  surface:   "#0d1117",
  card:      "#111827",
  cardHov:   "#161d2e",
  border:    "rgba(255,255,255,0.06)",
  borderAct: "rgba(96,165,250,0.4)",

  text:      "#f1f5f9",
  textSub:   "#64748b",
  textMuted: "#334155",

  blue:      "#3b82f6",
  blueMid:   "#2563eb",
  blueLight: "#60a5fa",
  blueFaint: "rgba(59,130,246,0.08)",
  blueBorder:"rgba(59,130,246,0.2)",

  green:     "#34d399",
  greenFaint:"rgba(52,211,153,0.08)",
  amber:     "#fbbf24",
  amberFaint:"rgba(251,191,36,0.08)",
  red:       "#f87171",
  redFaint:  "rgba(248,113,113,0.08)",

  chrome:    "#94a3b8",
  dim:       "#1e293b",
};

const font = "'SF Pro Display', '-apple-system', 'Helvetica Neue', sans-serif";

// ============================================================
// ATOMS
// ============================================================

function Card({ children, style = {}, hover = true }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => hover && setHov(true)}
      onMouseLeave={() => hover && setHov(false)}
      style={{
        background: hov ? T.cardHov : T.card,
        border: `1px solid ${hov ? T.borderAct : T.border}`,
        borderRadius: "16px",
        transition: "all 0.25s ease",
        ...style,
      }}>{children}</div>
  );
}

function Btn({ children, onClick, variant = "fill", size = "md", full, style = {} }) {
  const [hov, setHov] = useState(false);
  const base = {
    fill:    { bg: hov ? "#2563eb" : T.blue,     color: "#fff",          border: "transparent" },
    outline: { bg: hov ? T.blueFaint : "transparent", color: T.blueLight, border: T.blueBorder },
    ghost:   { bg: hov ? T.blueFaint : "transparent", color: T.textSub,   border: T.border },
    danger:  { bg: hov ? T.redFaint : "transparent",  color: T.red,       border: "rgba(248,113,113,0.3)" },
  };
  const v = base[variant];
  const pad = size === "sm" ? "5px 12px" : size === "lg" ? "13px 28px" : "8px 18px";
  const fs  = size === "sm" ? "11px" : "12px";
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: v.bg, color: v.color,
        border: `1px solid ${v.border}`,
        borderRadius: "8px", padding: pad,
        fontSize: fs, fontWeight: "500",
        letterSpacing: "0.02em", cursor: "pointer",
        fontFamily: font, width: full ? "100%" : "auto",
        transition: "all 0.2s",
        ...style,
      }}>{children}</button>
  );
}

function Badge({ status }) {
  const map = {
    PAID:      { color: T.green,  bg: T.greenFaint },
    PENDING:   { color: T.amber,  bg: T.amberFaint },
    FAILED:    { color: T.red,    bg: T.redFaint },
    ACTIVE:    { color: T.green,  bg: T.greenFaint },
    INACTIVE:  { color: T.chrome, bg: "rgba(148,163,184,0.06)" },
    LOW_STOCK: { color: T.amber,  bg: T.amberFaint },
    OUT:       { color: T.red,    bg: T.redFaint },
  };
  const s = map[status] || map.ACTIVE;
  return (
    <span style={{
      background: s.bg, color: s.color,
      border: `1px solid ${s.color}22`,
      padding: "3px 10px", borderRadius: "20px",
      fontSize: "11px", fontWeight: "500",
      display: "inline-flex", alignItems: "center", gap: "5px",
    }}>
      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: s.color }} />
      {status}
    </span>
  );
}

function Label({ children }) {
  return <div style={{ fontSize: "11px", fontWeight: "500", color: T.textSub, letterSpacing: "0.04em", marginBottom: "6px" }}>{children}</div>;
}

function Divider() {
  return <div style={{ height: "1px", background: T.border, margin: "0" }} />;
}

function TH({ children }) {
  return <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: "500", color: T.textSub, letterSpacing: "0.04em", borderBottom: `1px solid ${T.border}`, whiteSpace: "nowrap" }}>{children}</th>;
}

function TD({ children, bold, blue }) {
  return <td style={{ padding: "14px 16px", fontSize: "13px", fontWeight: bold ? "600" : "400", color: blue ? T.blueLight : bold ? T.text : T.chrome, borderBottom: `1px solid ${T.border}` }}>{children}</td>;
}

function Toggle({ on, onChange }) {
  return (
    <div onClick={onChange} style={{
      width: "44px", height: "24px",
      background: on ? T.blue : T.dim,
      borderRadius: "12px", cursor: "pointer",
      position: "relative", transition: "background 0.25s",
      border: `1px solid ${on ? T.blue : T.border}`,
      flexShrink: 0,
    }}>
      <div style={{
        position: "absolute", top: "3px",
        left: on ? "21px" : "3px",
        width: "16px", height: "16px",
        background: "#fff", borderRadius: "50%",
        transition: "left 0.25s",
        boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
      }} />
    </div>
  );
}

// ============================================================
// DATA
// ============================================================

const stats = [
  { label: "Total Revenue", value: "$84,254", change: "+12.5%", up: true,  sub: "vs last month" },
  { label: "Active Users",  value: "24,891",  change: "+8.2%",  up: true,  sub: "registered" },
  { label: "New Orders",    value: "1,429",   change: "-3.1%",  up: false, sub: "this month" },
  { label: "Conversion",    value: "5.27%",   change: "+1.8%",  up: true,  sub: "avg rate" },
];

const recentOrders = [
  { id: "#5523", customer: "Arjun Sharma",  product: "Pro Plan",   amount: "$299", status: "PAID" },
  { id: "#5522", customer: "Priya Nair",    product: "Starter",    amount: "$49",  status: "PENDING" },
  { id: "#5521", customer: "Ravi Kumar",    product: "Enterprise", amount: "$999", status: "PAID" },
  { id: "#5520", customer: "Sneha Patel",   product: "Pro Plan",   amount: "$299", status: "FAILED" },
  { id: "#5519", customer: "Vikram Das",    product: "Starter",    amount: "$49",  status: "PAID" },
];

const allOrders = [
  ...recentOrders,
  { id: "#5518", customer: "Meera Iyer",   product: "Enterprise", amount: "$999", status: "PAID" },
  { id: "#5517", customer: "Karan Singh",  product: "API Access",  amount: "$19",  status: "PENDING" },
];

const chartData = [40, 65, 50, 80, 55, 90, 70, 95, 60, 85, 75, 100];
const chartMonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const products = [
  { id: "P001", name: "Pro Plan",       category: "Subscription", price: "$29/mo", stock: "∞",  status: "ACTIVE" },
  { id: "P002", name: "Starter Kit",    category: "One-time",     price: "$49",    stock: "54", status: "LOW_STOCK" },
  { id: "P003", name: "Enterprise",     category: "Subscription", price: "$99/mo", stock: "∞",  status: "ACTIVE" },
  { id: "P004", name: "Design Bundle",  category: "One-time",     price: "$129",   stock: "0",  status: "OUT" },
  { id: "P005", name: "API Access",     category: "Subscription", price: "$19/mo", stock: "∞",  status: "ACTIVE" },
];

const customers = [
  { name: "Arjun Sharma", email: "arjun@email.com",  plan: "Pro",        spent: "$1,497", joined: "Jan 2025", status: "ACTIVE" },
  { name: "Priya Nair",   email: "priya@email.com",  plan: "Starter",    spent: "$147",   joined: "Feb 2025", status: "ACTIVE" },
  { name: "Ravi Kumar",   email: "ravi@email.com",   plan: "Enterprise", spent: "$2,997", joined: "Dec 2024", status: "ACTIVE" },
  { name: "Sneha Patel",  email: "sneha@email.com",  plan: "Pro",        spent: "$598",   joined: "Mar 2025", status: "INACTIVE" },
  { name: "Meera Iyer",   email: "meera@email.com",  plan: "Enterprise", spent: "$5,994", joined: "Oct 2024", status: "ACTIVE" },
];

const weekData = [
  { day: "Mon", visits: 1200, sales: 340 },
  { day: "Tue", visits: 1800, sales: 520 },
  { day: "Wed", visits: 1400, sales: 410 },
  { day: "Thu", visits: 2200, sales: 680 },
  { day: "Fri", visits: 2600, sales: 790 },
  { day: "Sat", visits: 1900, sales: 560 },
  { day: "Sun", visits: 1100, sales: 290 },
];

// ============================================================
// LOGIN
// ============================================================

function LoginPage({ onLogin }) {
  const [email, setEmail]   = useState("");
  const [pass, setPass]     = useState("");
  const [err, setErr]       = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    if (email === "prabu07220@gmail.com" && pass === "admin123") {
      onLogin();
    } else {
      setErr("Invalid email or password. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh", background: T.bg,
      display: "flex", fontFamily: font,
      backgroundImage: `radial-gradient(ellipse 80% 60% at 50% -10%, rgba(37,99,235,0.15) 0%, transparent 60%)`,
    }}>
      {/* Left panel */}
      <div style={{
        flex: 1, display: "none", padding: "60px",
        flexDirection: "column", justifyContent: "space-between",
        borderRight: `1px solid ${T.border}`,
      }} className="left-panel">
        <div style={{ fontSize: "22px", fontWeight: "700", color: T.text, letterSpacing: "-0.02em" }}>OBSIDIAN</div>
        <div>
          <div style={{ fontSize: "36px", fontWeight: "300", color: T.text, lineHeight: 1.3, letterSpacing: "-0.02em", marginBottom: "16px" }}>
            Your business,<br />beautifully managed.
          </div>
          <div style={{ fontSize: "14px", color: T.textSub, lineHeight: 1.6 }}>The premium admin dashboard for modern SaaS teams.</div>
        </div>
        <div style={{ fontSize: "12px", color: T.textMuted }}>© 2026 Obsidian. All rights reserved.</div>
      </div>

      {/* Right panel */}
      <div style={{
        width: "100%", maxWidth: "460px", margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "40px 32px",
      }}>
        <div style={{ width: "100%" }}>
          {/* Logo */}
          <div style={{ marginBottom: "48px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <div style={{
                width: "32px", height: "32px", borderRadius: "8px",
                background: `linear-gradient(135deg, ${T.blue}, ${T.blueMid})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "16px",
              }}>◈</div>
              <span style={{ fontSize: "18px", fontWeight: "700", color: T.text, letterSpacing: "-0.02em" }}>Obsidian</span>
            </div>
            <div style={{ fontSize: "24px", fontWeight: "600", color: T.text, letterSpacing: "-0.02em", marginTop: "32px" }}>Welcome back</div>
            <div style={{ fontSize: "14px", color: T.textSub, marginTop: "6px" }}>Sign in to your dashboard</div>
          </div>

          {err && (
            <div style={{ background: T.redFaint, border: `1px solid rgba(248,113,113,0.2)`, borderRadius: "8px", padding: "12px 16px", marginBottom: "20px", fontSize: "13px", color: T.red }}>{err}</div>
          )}

          {[
            { label: "Email address", val: email, set: setEmail, type: "email", ph: "Enter your email" },
            { label: "Password",      val: pass,  set: setPass,  type: "password", ph: "••••••••" },
          ].map((f, i) => (
            <div key={i} style={{ marginBottom: "16px" }}>
              <Label>{f.label}</Label>
              <input
                type={f.type} value={f.val}
                onChange={e => f.set(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                placeholder={f.ph}
                style={{
                  width: "100%", padding: "12px 14px",
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  borderRadius: "10px", color: T.text,
                  fontSize: "14px", fontFamily: font,
                  outline: "none", boxSizing: "border-box",
                  transition: "border 0.2s",
                }}
                onFocus={e => e.target.style.borderColor = T.blue}
                onBlur={e => e.target.style.borderColor = T.border}
              />
            </div>
          ))}

          <Btn full size="lg" onClick={handleLogin} style={{ marginTop: "8px", borderRadius: "10px" }}>
            {loading ? "Signing in..." : "Sign in"}
          </Btn>

        </div>
      </div>
    </div>
  );
}

// ============================================================
// 404
// ============================================================

function NotFoundPage({ onBack }) {
  return (
    <div style={{
      minHeight: "100vh", background: T.bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: font, padding: "20px",
      backgroundImage: `radial-gradient(ellipse 60% 40% at 50% 50%, rgba(37,99,235,0.06) 0%, transparent 70%)`,
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "120px", fontWeight: "700", color: T.card, letterSpacing: "-0.05em", lineHeight: 1, marginBottom: "24px", WebkitTextStroke: `1px ${T.border}` }}>404</div>
        <div style={{ fontSize: "20px", fontWeight: "600", color: T.text, marginBottom: "8px" }}>Page not found</div>
        <div style={{ fontSize: "14px", color: T.textSub, marginBottom: "32px" }}>The page you're looking for doesn't exist.</div>
        <Btn onClick={onBack} variant="outline">← Back to Dashboard</Btn>
      </div>
    </div>
  );
}

// ============================================================
// DASHBOARD PAGE
// ============================================================

function DashboardPage() {
  const [hBar, setHBar] = useState(null);
  const maxV = Math.max(...chartData);

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontSize: "13px", color: T.textSub, marginBottom: "6px" }}>Monday, March 9 · 2026</div>
        <h1 style={{ fontSize: "28px", fontWeight: "600", color: T.text, letterSpacing: "-0.02em", margin: 0 }}>Good morning, Admin 👋</h1>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        {stats.map((s, i) => (
          <Card key={i} style={{ padding: "22px" }}>
            <div style={{ fontSize: "12px", color: T.textSub, fontWeight: "500", marginBottom: "14px" }}>{s.label}</div>
            <div style={{ fontSize: "26px", fontWeight: "600", color: T.text, letterSpacing: "-0.02em", marginBottom: "8px" }}>{s.value}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{
                fontSize: "12px", fontWeight: "500",
                color: s.up ? T.green : T.red,
                background: s.up ? T.greenFaint : T.redFaint,
                padding: "2px 8px", borderRadius: "20px",
              }}>{s.up ? "↑" : "↓"} {s.change}</span>
              <span style={{ fontSize: "11px", color: T.textMuted }}>{s.sub}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Chart + Products */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        <Card style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <div style={{ fontSize: "15px", fontWeight: "600", color: T.text }}>Revenue</div>
              <div style={{ fontSize: "12px", color: T.textSub, marginTop: "2px" }}>Full year 2025</div>
            </div>
            <div style={{ display: "flex", gap: "4px" }}>
              {["1M","6M","1Y"].map(t => (
                <button key={t} style={{
                  padding: "5px 12px", borderRadius: "6px", fontSize: "11px",
                  fontWeight: "500", cursor: "pointer", fontFamily: font,
                  background: t === "1Y" ? T.blue : "transparent",
                  border: `1px solid ${t === "1Y" ? T.blue : T.border}`,
                  color: t === "1Y" ? "#fff" : T.textSub,
                  transition: "all 0.2s",
                }}>{t}</button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "120px" }}>
            {chartData.map((v, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", height: "100%" }}>
                <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
                  <div
                    onMouseEnter={() => setHBar(i)}
                    onMouseLeave={() => setHBar(null)}
                    style={{
                      width: "100%",
                      height: `${(v / maxV) * 100}%`,
                      background: hBar === i
                        ? T.blue
                        : v === maxV
                          ? `linear-gradient(180deg, ${T.blue}, ${T.blueMid})`
                          : T.dim,
                      borderRadius: "4px 4px 0 0",
                      cursor: "pointer", transition: "background 0.2s",
                      position: "relative",
                    }}>
                    {hBar === i && (
                      <div style={{
                        position: "absolute", top: "-28px", left: "50%",
                        transform: "translateX(-50%)",
                        background: T.card, border: `1px solid ${T.border}`,
                        borderRadius: "6px", padding: "3px 8px",
                        fontSize: "10px", fontWeight: "600", color: T.text,
                        whiteSpace: "nowrap", boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                      }}>${v}K</div>
                    )}
                  </div>
                </div>
                <div style={{ fontSize: "9px", color: T.textMuted, fontWeight: "500" }}>{chartMonths[i]}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ padding: "24px" }}>
          <div style={{ fontSize: "15px", fontWeight: "600", color: T.text, marginBottom: "4px" }}>Top Plans</div>
          <div style={{ fontSize: "12px", color: T.textSub, marginBottom: "22px" }}>By sales volume</div>
          {[
            { label: "Enterprise Suite", val: 842, pct: 78, color: T.blue },
            { label: "Pro Plan",         val: 390, pct: 56, color: T.blueLight },
            { label: "Starter Kit",      val: 197, pct: 32, color: T.textSub },
          ].map((p, i) => (
            <div key={i} style={{ marginBottom: "18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "13px", color: T.text, fontWeight: "500" }}>{p.label}</span>
                <span style={{ fontSize: "12px", color: T.textSub }}>{p.val}</span>
              </div>
              <div style={{ height: "4px", background: T.dim, borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: `${p.pct}%`, height: "100%", background: p.color, borderRadius: "4px" }} />
              </div>
            </div>
          ))}
          <Divider />
          <div style={{ paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "13px", color: T.textSub }}>Total this month</span>
            <span style={{ fontSize: "22px", fontWeight: "700", color: T.text, letterSpacing: "-0.02em" }}>1,429</span>
          </div>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card hover={false} style={{ overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ fontSize: "15px", fontWeight: "600", color: T.text }}>Recent Orders</div>
            <div style={{ fontSize: "12px", color: T.textSub, marginTop: "2px" }}>Latest transactions</div>
          </div>
          <Btn variant="outline" size="sm">View all</Btn>
        </div>
        <Divider />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "500px" }}>
            <thead>
              <tr><TH>Order</TH><TH>Customer</TH><TH>Product</TH><TH>Amount</TH><TH>Status</TH></tr>
            </thead>
            <tbody>
              {recentOrders.map((o, i) => (
                <tr key={i}
                  onMouseEnter={e => e.currentTarget.style.background = T.cardHov}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <TD blue>{o.id}</TD>
                  <TD bold>{o.customer}</TD>
                  <TD>{o.product}</TD>
                  <TD bold>{o.amount}</TD>
                  <td style={{ padding: "14px 16px", borderBottom: `1px solid ${T.border}` }}><Badge status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ============================================================
// ANALYTICS PAGE
// ============================================================

function AnalyticsPage() {
  const maxV = Math.max(...weekData.map(d => d.visits));
  const maxS = Math.max(...weekData.map(d => d.sales));
  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "600", color: T.text, letterSpacing: "-0.02em", margin: 0 }}>Analytics</h1>
        <div style={{ fontSize: "13px", color: T.textSub, marginTop: "6px" }}>Track your performance over time</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Page Views",    value: "128,540", change: "+22%", up: true },
          { label: "Bounce Rate",   value: "34.2%",   change: "-5%",  up: true },
          { label: "Avg Session",   value: "4m 12s",  change: "+18%", up: true },
          { label: "New Visitors",  value: "8,920",   change: "+11%", up: true },
        ].map((m, i) => (
          <Card key={i} style={{ padding: "20px" }}>
            <div style={{ fontSize: "12px", color: T.textSub, marginBottom: "10px" }}>{m.label}</div>
            <div style={{ fontSize: "24px", fontWeight: "600", color: T.text, letterSpacing: "-0.02em", marginBottom: "8px" }}>{m.value}</div>
            <span style={{ fontSize: "11px", color: m.up ? T.green : T.red, background: m.up ? T.greenFaint : T.redFaint, padding: "2px 8px", borderRadius: "20px" }}>
              {m.up ? "↑" : "↓"} {m.change}
            </span>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        <Card style={{ padding: "24px" }}>
          <div style={{ fontSize: "15px", fontWeight: "600", color: T.text, marginBottom: "4px" }}>Weekly Visits</div>
          <div style={{ fontSize: "12px", color: T.textSub, marginBottom: "20px" }}>Unique visitors per day</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "100px" }}>
            {weekData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", height: "100%" }}>
                <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
                  <div style={{ width: "100%", height: `${(d.visits / maxV) * 100}%`, background: `linear-gradient(180deg, ${T.blue}, ${T.blueMid})`, borderRadius: "3px 3px 0 0" }} />
                </div>
                <div style={{ fontSize: "9px", color: T.textMuted }}>{d.day}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ padding: "24px" }}>
          <div style={{ fontSize: "15px", fontWeight: "600", color: T.text, marginBottom: "4px" }}>Daily Revenue</div>
          <div style={{ fontSize: "12px", color: T.textSub, marginBottom: "20px" }}>Sales amount by day</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "100px" }}>
            {weekData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", height: "100%" }}>
                <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
                  <div style={{ width: "100%", height: `${(d.sales / maxS) * 100}%`, background: `linear-gradient(180deg, ${T.green}, #059669)`, borderRadius: "3px 3px 0 0" }} />
                </div>
                <div style={{ fontSize: "9px", color: T.textMuted }}>{d.day}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card hover={false} style={{ padding: "24px" }}>
        <div style={{ fontSize: "15px", fontWeight: "600", color: T.text, marginBottom: "20px" }}>Traffic Sources</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px" }}>
          {[
            { source: "Organic Search", pct: 42, color: T.blue },
            { source: "Direct",         pct: 28, color: T.green },
            { source: "Social Media",   pct: 18, color: T.amber },
            { source: "Referral",       pct: 12, color: T.blueLight },
          ].map((s, i) => (
            <div key={i} style={{ padding: "16px", background: T.surface, borderRadius: "10px", border: `1px solid ${T.border}` }}>
              <div style={{ fontSize: "24px", fontWeight: "700", color: s.color, letterSpacing: "-0.02em", marginBottom: "4px" }}>{s.pct}%</div>
              <div style={{ fontSize: "11px", color: T.textSub }}>{s.source}</div>
              <div style={{ height: "3px", background: T.dim, borderRadius: "2px", marginTop: "10px" }}>
                <div style={{ width: `${s.pct}%`, height: "100%", background: s.color, borderRadius: "2px" }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ============================================================
// PRODUCTS PAGE
// ============================================================

function ProductsPage() {
  const [search, setSearch] = useState("");
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "600", color: T.text, letterSpacing: "-0.02em", margin: 0 }}>Products</h1>
          <div style={{ fontSize: "13px", color: T.textSub, marginTop: "6px" }}>{products.length} products total</div>
        </div>
        <Btn>+ Add Product</Btn>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
          style={{ flex: 1, minWidth: "200px", padding: "10px 14px", background: T.card, border: `1px solid ${T.border}`, borderRadius: "10px", color: T.text, fontSize: "13px", fontFamily: font, outline: "none" }}
          onFocus={e => e.target.style.borderColor = T.blue}
          onBlur={e => e.target.style.borderColor = T.border} />
        <Btn variant="outline">Filter ▾</Btn>
        <Btn variant="outline">Export</Btn>
      </div>

      <Card hover={false} style={{ overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "540px" }}>
            <thead>
              <tr><TH>ID</TH><TH>Product</TH><TH>Category</TH><TH>Price</TH><TH>Stock</TH><TH>Status</TH><TH>Actions</TH></tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={i}
                  onMouseEnter={e => e.currentTarget.style.background = T.cardHov}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <TD>{p.id}</TD>
                  <TD bold>{p.name}</TD>
                  <TD>{p.category}</TD>
                  <TD bold>{p.price}</TD>
                  <TD>{p.stock}</TD>
                  <td style={{ padding: "14px 16px", borderBottom: `1px solid ${T.border}` }}><Badge status={p.status} /></td>
                  <td style={{ padding: "14px 16px", borderBottom: `1px solid ${T.border}` }}>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <Btn size="sm" variant="outline">Edit</Btn>
                      <Btn size="sm" variant="danger">Del</Btn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ============================================================
// ORDERS PAGE
// ============================================================

function OrdersPage() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? allOrders : allOrders.filter(o => o.status === filter);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "600", color: T.text, letterSpacing: "-0.02em", margin: 0 }}>Orders</h1>
          <div style={{ fontSize: "13px", color: T.textSub, marginTop: "6px" }}>{allOrders.length} total orders</div>
        </div>
        <Btn variant="outline">Export CSV</Btn>
      </div>

      <div style={{ display: "flex", gap: "6px", marginBottom: "20px", flexWrap: "wrap" }}>
        {["All","PAID","PENDING","FAILED"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "7px 16px", borderRadius: "8px", fontSize: "12px", fontWeight: "500",
            cursor: "pointer", fontFamily: font, transition: "all 0.2s",
            background: filter === f ? T.blue : "transparent",
            border: `1px solid ${filter === f ? T.blue : T.border}`,
            color: filter === f ? "#fff" : T.textSub,
          }}>{f}</button>
        ))}
      </div>

      <Card hover={false} style={{ overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "500px" }}>
            <thead>
              <tr><TH>Order</TH><TH>Customer</TH><TH>Product</TH><TH>Date</TH><TH>Amount</TH><TH>Status</TH></tr>
            </thead>
            <tbody>
              {filtered.map((o, i) => (
                <tr key={i}
                  onMouseEnter={e => e.currentTarget.style.background = T.cardHov}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <TD blue>{o.id}</TD>
                  <TD bold>{o.customer}</TD>
                  <TD>{o.product}</TD>
                  <TD>{o.date}</TD>
                  <TD bold>{o.amount}</TD>
                  <td style={{ padding: "14px 16px", borderBottom: `1px solid ${T.border}` }}><Badge status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ============================================================
// CUSTOMERS PAGE
// ============================================================

function CustomersPage() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "600", color: T.text, letterSpacing: "-0.02em", margin: 0 }}>Customers</h1>
          <div style={{ fontSize: "13px", color: T.textSub, marginTop: "6px" }}>{customers.length} registered</div>
        </div>
        <Btn>+ Invite</Btn>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Total Customers", value: "24,891" },
          { label: "New This Month",  value: "1,204" },
          { label: "Churn Rate",      value: "2.3%" },
        ].map((s, i) => (
          <Card key={i} style={{ padding: "20px" }}>
            <div style={{ fontSize: "12px", color: T.textSub, marginBottom: "10px" }}>{s.label}</div>
            <div style={{ fontSize: "26px", fontWeight: "600", color: T.text, letterSpacing: "-0.02em" }}>{s.value}</div>
          </Card>
        ))}
      </div>

      <Card hover={false} style={{ overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "520px" }}>
            <thead>
              <tr><TH>Customer</TH><TH>Email</TH><TH>Plan</TH><TH>Spent</TH><TH>Joined</TH><TH>Status</TH></tr>
            </thead>
            <tbody>
              {customers.map((c, i) => (
                <tr key={i}
                  onMouseEnter={e => e.currentTarget.style.background = T.cardHov}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "14px 16px", borderBottom: `1px solid ${T.border}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: T.blue, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "600", color: "#fff", flexShrink: 0 }}>{c.name[0]}</div>
                      <span style={{ fontSize: "13px", fontWeight: "500", color: T.text }}>{c.name}</span>
                    </div>
                  </td>
                  <TD>{c.email}</TD>
                  <td style={{ padding: "14px 16px", borderBottom: `1px solid ${T.border}` }}>
                    <span style={{ fontSize: "12px", color: c.plan === "Enterprise" ? T.blueLight : T.chrome, fontWeight: "500" }}>{c.plan}</span>
                  </td>
                  <TD bold>{c.spent}</TD>
                  <TD>{c.joined}</TD>
                  <td style={{ padding: "14px 16px", borderBottom: `1px solid ${T.border}` }}><Badge status={c.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ============================================================
// SETTINGS PAGE
// ============================================================

function SettingsPage() {
  const [notifs, setNotifs] = useState(true);
  const [emails, setEmails] = useState(false);
  const [twofa,  setTwofa]  = useState(true);

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "600", color: T.text, letterSpacing: "-0.02em", margin: 0 }}>Settings</h1>
        <div style={{ fontSize: "13px", color: T.textSub, marginTop: "6px" }}>Manage your account preferences</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
        {/* Profile */}
        <Card hover={false} style={{ padding: "24px" }}>
          <div style={{ fontSize: "15px", fontWeight: "600", color: T.text, marginBottom: "20px" }}>Profile</div>
          {[{ label: "Full Name", val: "Admin User" }, { label: "Email", val: "admin@obsidian.io" }, { label: "Role", val: "Super Admin" }].map((f, i) => (
            <div key={i} style={{ marginBottom: "16px" }}>
              <Label>{f.label}</Label>
              <input defaultValue={f.val} style={{ width: "100%", padding: "10px 14px", background: T.surface, border: `1px solid ${T.border}`, borderRadius: "8px", color: T.text, fontSize: "13px", fontFamily: font, outline: "none", boxSizing: "border-box" }}
                onFocus={e => e.target.style.borderColor = T.blue}
                onBlur={e => e.target.style.borderColor = T.border} />
            </div>
          ))}
          <Btn>Save changes</Btn>
        </Card>

        {/* Preferences */}
        <Card hover={false} style={{ padding: "24px" }}>
          <div style={{ fontSize: "15px", fontWeight: "600", color: T.text, marginBottom: "20px" }}>Preferences</div>
          {[
            { label: "Push notifications", desc: "Get alerts for new orders", val: notifs, set: setNotifs },
            { label: "Email digest",       desc: "Weekly performance summary", val: emails, set: setEmails },
            { label: "Two-factor auth",    desc: "Extra login security",      val: twofa,  set: setTwofa },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: i < 2 ? `1px solid ${T.border}` : "none", gap: "12px" }}>
              <div>
                <div style={{ fontSize: "13px", fontWeight: "500", color: T.text }}>{item.label}</div>
                <div style={{ fontSize: "12px", color: T.textSub, marginTop: "2px" }}>{item.desc}</div>
              </div>
              <Toggle on={item.val} onChange={() => item.set(!item.val)} />
            </div>
          ))}
        </Card>

        {/* Billing */}
        <Card hover={false} style={{ padding: "24px" }}>
          <div style={{ fontSize: "15px", fontWeight: "600", color: T.text, marginBottom: "20px" }}>Billing</div>
          <div style={{ padding: "16px", background: T.surface, border: `1px solid ${T.border}`, borderRadius: "10px", marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "11px", color: T.textSub, marginBottom: "4px" }}>Current plan</div>
                <div style={{ fontSize: "20px", fontWeight: "700", color: T.text, letterSpacing: "-0.02em" }}>Pro</div>
              </div>
              <Badge status="ACTIVE" />
            </div>
            <div style={{ marginTop: "10px", fontSize: "12px", color: T.textSub }}>Next billing: April 9, 2026 · $29/mo</div>
          </div>
          <Btn variant="outline" full>Upgrade to Enterprise →</Btn>
        </Card>

        {/* Danger Zone */}
        <Card hover={false} style={{ padding: "24px" }}>
          <div style={{ fontSize: "15px", fontWeight: "600", color: T.red, marginBottom: "20px" }}>Danger Zone</div>
          {[
            { label: "Export data",     desc: "Download all data as CSV",    v: "outline" },
            { label: "Reset dashboard", desc: "Clear all custom settings",   v: "outline" },
            { label: "Delete account",  desc: "Permanently remove account",  v: "danger" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: i < 2 ? `1px solid ${T.border}` : "none", gap: "12px" }}>
              <div>
                <div style={{ fontSize: "13px", fontWeight: "500", color: T.text }}>{item.label}</div>
                <div style={{ fontSize: "12px", color: T.textSub, marginTop: "2px" }}>{item.desc}</div>
              </div>
              <Btn size="sm" variant={item.v}>{item.label.split(" ")[0]}</Btn>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================

const navItems = [
  { label: "Dashboard",  icon: "⬡", page: "DASHBOARD" },
  { label: "Analytics",  icon: "◈", page: "ANALYTICS" },
  { label: "Products",   icon: "⊞", page: "PRODUCTS" },
  { label: "Orders",     icon: "⊙", page: "ORDERS" },
  { label: "Customers",  icon: "◉", page: "CUSTOMERS" },
  { label: "Settings",   icon: "⊛", page: "SETTINGS" },
];

export default function App() {
  const [loggedIn,      setLoggedIn]      = useState(false);
  const [page,          setPage]          = useState("DASHBOARD");
  const [collapsed,     setCollapsed]     = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [isMobile,      setIsMobile]      = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!loggedIn) return <LoginPage onLogin={() => setLoggedIn(true)} />;

  const pageMap = {
    DASHBOARD: <DashboardPage />,
    ANALYTICS: <AnalyticsPage />,
    PRODUCTS:  <ProductsPage />,
    ORDERS:    <OrdersPage />,
    CUSTOMERS: <CustomersPage />,
    SETTINGS:  <SettingsPage />,
    "404":     <NotFoundPage onBack={() => setPage("DASHBOARD")} />,
  };

  const sideW = collapsed ? "64px" : "220px";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: T.bg, fontFamily: font, color: T.text }}>

      {/* Mobile overlay */}
      {isMobile && mobileOpen && (
        <div onClick={() => setMobileOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 20, backdropFilter: "blur(4px)" }} />
      )}

      {/* SIDEBAR */}
      <aside style={{
        width: isMobile ? "240px" : sideW,
        background: T.surface,
        borderRight: `1px solid ${T.border}`,
        display: "flex", flexDirection: "column",
        flexShrink: 0, transition: "all 0.25s ease",
        position: isMobile ? "fixed" : "sticky",
        top: 0, left: 0, height: "100vh",
        zIndex: isMobile ? 30 : 1,
        transform: isMobile ? (mobileOpen ? "translateX(0)" : "translateX(-100%)") : "none",
        overflow: "hidden",
      }}>
        {/* Logo */}
        <div style={{ padding: "24px 20px 20px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "30px", height: "30px", borderRadius: "8px", flexShrink: 0,
            background: `linear-gradient(135deg, ${T.blue}, ${T.blueMid})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "14px", boxShadow: `0 0 16px rgba(59,130,246,0.3)`,
          }}>◈</div>
          {(!collapsed || isMobile) && <span style={{ fontSize: "15px", fontWeight: "700", color: T.text, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>Obsidian</span>}
        </div>

        {/* Nav */}
        <nav style={{ padding: "16px 12px", flex: 1, overflowY: "auto" }}>
          {navItems.map(item => (
            <button key={item.page} onClick={() => { setPage(item.page); if (isMobile) setMobileOpen(false); }} style={{
              width: "100%", display: "flex", alignItems: "center", gap: "12px",
              padding: "10px 12px", marginBottom: "2px",
              background: page === item.page ? T.blueFaint : "transparent",
              border: `1px solid ${page === item.page ? T.blueBorder : "transparent"}`,
              borderRadius: "10px", cursor: "pointer",
              color: page === item.page ? T.blueLight : T.textSub,
              fontSize: "13px", fontWeight: page === item.page ? "500" : "400",
              transition: "all 0.2s", fontFamily: font, whiteSpace: "nowrap",
            }}>
              <span style={{ fontSize: "15px", flexShrink: 0 }}>{item.icon}</span>
              {(!collapsed || isMobile) && item.label}
            </button>
          ))}
        </nav>

        {/* User */}
        {(!collapsed || isMobile) && (
          <div style={{ padding: "16px 20px", borderTop: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: `linear-gradient(135deg, ${T.blue}, ${T.blueMid})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "600", color: "#fff", flexShrink: 0 }}>A</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "13px", fontWeight: "500", color: T.text }}>Admin</div>
              <div style={{ fontSize: "11px", color: T.green, display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: T.green, display: "inline-block" }} /> Online
              </div>
            </div>
            <button onClick={() => setLoggedIn(false)} style={{ background: "none", border: "none", color: T.textSub, cursor: "pointer", fontSize: "14px", padding: "4px" }}>⏻</button>
          </div>
        )}
      </aside>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        {/* Topbar */}
        <header style={{
          padding: "14px 24px", borderBottom: `1px solid ${T.border}`,
          background: T.surface, display: "flex", alignItems: "center",
          justifyContent: "space-between", flexShrink: 0,
          backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 10,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button onClick={() => isMobile ? setMobileOpen(!mobileOpen) : setCollapsed(!collapsed)} style={{ background: "none", border: `1px solid ${T.border}`, borderRadius: "8px", padding: "7px 10px", cursor: "pointer", color: T.textSub, fontSize: "14px", transition: "all 0.2s" }}
              onMouseEnter={e => e.target.style.borderColor = T.blue}
              onMouseLeave={e => e.target.style.borderColor = T.border}>☰</button>
            <div style={{ fontSize: "13px", color: T.textSub }}>
              Obsidian / <span style={{ color: T.text, fontWeight: "500" }}>{navItems.find(n => n.page === page)?.label || page}</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {!isMobile && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", background: T.card, border: `1px solid ${T.border}`, borderRadius: "8px", padding: "8px 14px" }}>
                <span style={{ color: T.textMuted, fontSize: "13px" }}>⌕</span>
                <span style={{ fontSize: "12px", color: T.textMuted }}>Search...</span>
                <span style={{ fontSize: "10px", color: T.textMuted, background: T.dim, padding: "1px 6px", borderRadius: "4px" }}>⌘K</span>
              </div>
            )}
            <button style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: "8px", padding: "8px 12px", cursor: "pointer", fontSize: "14px" }}>🔔</button>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, overflow: "auto", padding: isMobile ? "20px 16px" : "32px 28px" }}>
          {pageMap[page] || pageMap["404"]}
        </main>
      </div>
    </div>
  );
}
