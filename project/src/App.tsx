import { useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Bell,
  Check,
  ChevronDown,
  CircleHelp,
  Eye,
  EyeOff,
  Grid2X2,
  LayoutDashboard,
  LineChart,
  LockKeyhole,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Package,
  Plus,
  Settings,
  ShieldCheck,
  Sparkles,
  Store,
  WalletCards,
  X,
  Zap,
} from 'lucide-react';

type Page = 'home' | 'about' | 'help' | 'login' | 'signup' | 'dashboard';
type DashboardView = 'Overview' | 'Shopify' | 'Stripe' | 'Other Apps' | 'AI Overview' | 'Reports' | 'Settings';

const navItems: { label: DashboardView; icon: typeof LayoutDashboard }[] = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Shopify', icon: Store },
  { label: 'Stripe', icon: WalletCards },
  { label: 'Other Apps', icon: Grid2X2 },
  { label: 'AI Overview', icon: Sparkles },
  { label: 'Reports', icon: LineChart },
  { label: 'Settings', icon: Settings },
];

function Logo({ compact = false }: { compact?: boolean }) {
  return <div className="brand"><span className="brand-mark"><BarChart3 size={compact ? 17 : 21} strokeWidth={2.5} /></span>{!compact && <span>[COMPANY NAME]</span>}</div>;
}

function App() {
  const [page, setPage] = useState<Page>('home');
  const [dashboardView, setDashboardView] = useState<DashboardView>('Overview');
  const [menuOpen, setMenuOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);

  const go = (next: Page) => { setPage(next); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  if (page === 'dashboard') {
    return <Dashboard active={dashboardView} setActive={setDashboardView} onConnect={() => setConnectOpen(true)} onExit={() => go('home')} />;
  }

  return <div className="site-shell">
    <header className="topbar">
      <button className="logo-button" onClick={() => go('home')}><Logo /></button>
      <nav className={menuOpen ? 'main-nav open' : 'main-nav'}>
        <button className={page === 'home' ? 'active' : ''} onClick={() => go('home')}>Home</button>
        <button className={page === 'about' ? 'active' : ''} onClick={() => go('about')}>About us</button>
        <button className={page === 'help' ? 'active' : ''} onClick={() => go('help')}>Help</button>
        <div className="mobile-nav-actions"><button className="button ghost" onClick={() => go('login')}>Log in</button><button className="button primary" onClick={() => go('signup')}>Get started <ArrowRight size={16} /></button></div>
      </nav>
      <div className="top-actions"><button className="button ghost" onClick={() => go('login')}>Log in</button><button className="button primary" onClick={() => go('signup')}>Get started <ArrowRight size={16} /></button></div>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
    </header>
    {page === 'home' && <Home onNavigate={go} onConnect={() => setConnectOpen(true)} />}
    {page === 'about' && <About onNavigate={go} />}
    {page === 'help' && <Help onNavigate={go} />}
    {(page === 'login' || page === 'signup') && <Auth mode={page} onNavigate={go} />}
    <Footer onNavigate={go} />
    {connectOpen && <ConnectModal onClose={() => setConnectOpen(false)} />}
  </div>;
}

function Home({ onNavigate, onConnect }: { onNavigate: (page: Page) => void; onConnect: () => void }) {
  return <main>
    <section className="hero section-container">
      <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot" /> Simple clarity for growing teams</div><h1>All your business analytics.<br /><em>In one place.</em></h1><p>Connect your Shopify and Stripe accounts and turn your business data into simple, useful insights.</p><div className="hero-actions"><button className="button primary large" onClick={() => onNavigate('signup')}>Get started <ArrowRight size={18} /></button><button className="button text-button" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>Learn more <ArrowRight size={16} /></button></div><div className="trust-row"><span><Check size={14} /> Connect Shopify</span><span><Check size={14} /> Connect Stripe</span><span><Check size={14} /> View your analytics</span></div></div>
      <DashboardPreview onConnect={onConnect} />
    </section>
    <section className="logo-strip section-container"><span>BUILT FOR MODERN OPERATORS</span><div><span className="mini-logo shopify">S</span> Shopify</div><div><span className="mini-logo stripe">S</span> Stripe</div><div className="logo-light">[YOUR BRAND]</div><div className="logo-light">[PARTNER]</div></section>
    <section className="section-container feature-section" id="features"><div className="section-heading"><div><div className="eyebrow">One clear view</div><h2>Everything you need to<br /><em>understand your business.</em></h2></div><p>Bring your essential data together, spot what is changing, and make your next decision with confidence.</p></div><div className="feature-grid"><Feature icon={BarChart3} title="Unified analytics" text="Connect different business platforms and see important information in one dashboard." /><Feature icon={Store} title="Shopify analytics" text="View store performance, sales, orders, products, and customers from one calm workspace." accent="green" /><Feature icon={WalletCards} title="Stripe analytics" text="Understand payment activity and business data you have authorized access to." accent="blue" /><Feature icon={Sparkles} title="AI overview" text="Get a thoughtful summary based only on the data available to your account." accent="amber" /><Feature icon={LineChart} title="Reports" text="Turn your connected data into useful reports you can return to and share." accent="rose" /><Feature icon={Plus} title="Multiple accounts" text="Keep supported stores and accounts together as your business evolves." accent="slate" /></div></section>
    <section className="steps-section"><div className="section-container"><div className="center-heading"><div className="eyebrow">A calmer way to grow</div><h2>Connect. Collect. <em>Understand.</em></h2></div><div className="steps"><Step number="01" title="Create your account" text="Start with a simple account using your email and a secure password." /><Step number="02" title="Connect your platforms" text="Authorize Shopify or Stripe through their official sign-in experience." /><Step number="03" title="Understand your business" text="See your permitted analytics together and know what deserves attention." /></div></div></section>
    <section className="cta-section section-container"><div className="cta-card"><div><div className="eyebrow light">Your next clear decision</div><h2>Make sense of more.<br /><em>Do more with less noise.</em></h2></div><button className="button white large" onClick={() => onNavigate('signup')}>Create your account <ArrowRight size={17} /></button></div></section>
  </main>;
}

function DashboardPreview({ onConnect }: { onConnect: () => void }) {
  return <div className="preview-wrap"><div className="preview-window"><div className="preview-sidebar"><Logo compact /><div className="preview-nav active"><LayoutDashboard size={14} /> Overview</div><div className="preview-nav"><Store size={14} /> Shopify</div><div className="preview-nav"><WalletCards size={14} /> Stripe</div><div className="preview-nav"><Sparkles size={14} /> AI Overview</div><div className="preview-bottom"><span className="avatar">M</span><span>[USER NAME]</span></div></div><div className="preview-main"><div className="preview-top"><div><strong>Welcome back, [USER NAME]</strong><small>Here’s what’s happening with your business.</small></div><Bell size={15} /></div><div className="preview-stats"><MiniStat label="Total revenue" value="[TOTAL]" accent="purple" /><MiniStat label="Shopify revenue" value="[SHOPIFY]" accent="green" /><MiniStat label="Stripe revenue" value="[STRIPE]" accent="blue" /></div><div className="preview-panels"><div className="preview-chart"><div className="panel-title">Revenue overview <span>Last 30 days <ChevronDown size={11} /></span></div><svg viewBox="0 0 300 100" preserveAspectRatio="none"><path d="M0 80 C25 68 35 73 52 57 S78 72 95 56 S120 58 138 45 S165 59 180 44 S205 49 225 29 S255 38 270 16 S290 22 300 8" /><path className="green-line" d="M0 91 C28 80 42 87 57 73 S88 84 100 70 S129 79 148 62 S172 78 190 63 S220 72 235 55 S267 66 300 43" /></svg></div><div className="preview-ai"><div className="panel-title"><Sparkles size={13} /> AI overview</div><p>[AI GENERATED BUSINESS SUMMARY]</p><button onClick={onConnect}>Connect an account <ArrowRight size={12} /></button></div></div></div></div><div className="preview-glow" /></div>;
}

function MiniStat({ label, value, accent }: { label: string; value: string; accent: string }) { return <div className={'mini-stat ' + accent}><span>{label}</span><strong>{value}</strong><small><span className="placeholder-line" /></small></div>; }
function Feature({ icon: Icon, title, text, accent = 'purple' }: { icon: typeof BarChart3; title: string; text: string; accent?: string }) { return <article className="feature-card"><div className={'feature-icon ' + accent}><Icon size={19} /></div><h3>{title}</h3><p>{text}</p><ArrowRight className="feature-arrow" size={17} /></article>; }
function Step({ number, title, text }: { number: string; title: string; text: string }) { return <div className="step"><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></div>; }

function Auth({ mode, onNavigate }: { mode: 'login' | 'signup'; onNavigate: (page: Page) => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const signup = mode === 'signup';
  return <main className="auth-page"><div className="auth-aside"><div><Logo /><div className="auth-aside-copy"><div className="eyebrow light">A clearer view ahead</div><h1>Good decisions start with <em>good visibility.</em></h1><p>Bring your most important business signals into one thoughtfully designed workspace.</p></div></div><div className="aside-note"><ShieldCheck size={17} /> Your data stays yours. You choose what to connect.</div></div><div className="auth-panel"><button className="mobile-auth-logo" onClick={() => onNavigate('home')}><Logo /></button><div className="auth-form"><div className="eyebrow">Welcome to [COMPANY NAME]</div><h2>{signup ? 'Create your account' : 'Welcome back'}</h2><p className="form-intro">{signup ? 'Start understanding your business with more clarity.' : 'Log in to continue to your analytics.'}</p><form onSubmit={(e) => { e.preventDefault(); onNavigate('dashboard'); }}><label>Email address<input type="email" placeholder="you@example.com" required /></label><label>Password<div className="input-wrap"><input type={showPassword ? 'text' : 'password'} placeholder="At least 8 characters" required minLength={8} /><button type="button" aria-label="Toggle password visibility" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>{signup && <><label>Confirm password<input type="password" placeholder="Repeat your password" required minLength={8} /></label><label className="check-label"><input type="checkbox" /> <span>I agree to receive promotions and updates <small>(not required)</small></span></label><label className="check-label"><input type="checkbox" required /> <span>I agree to the Terms of Agreement <small>(required)</small></span></label><p className="terms-note">Please click <button type="button" onClick={() => onNavigate('help')}>this link</button> to read the full agreement.</p></>}{!signup && <div className="form-options"><label className="check-label"><input type="checkbox" /> <span>Remember me</span></label><button type="button" className="link-button">Forgot password?</button></div>}<button className="button primary submit-button" type="submit">{signup ? 'Create account' : 'Log in'} <ArrowRight size={16} /></button></form><p className="switch-auth">{signup ? 'Already have an account?' : "Don't have an account?"} <button onClick={() => onNavigate(signup ? 'login' : 'signup')}>{signup ? 'Log in' : 'Sign up'}</button></p></div></div></main>;
}

function About({ onNavigate }: { onNavigate: (page: Page) => void }) { return <main className="simple-page"><div className="simple-hero"><div className="eyebrow">A little about us</div><h1>[ABOUT US <em>HEADLINE]</em></h1><p>[ABOUT US DESCRIPTION]</p></div><div className="about-grid"><div><span className="number-label">01 / OUR MISSION</span><h2>[MISSION STATEMENT]</h2></div><div><p>[COMPANY STORY]</p><button className="button primary" onClick={() => onNavigate('signup')}>Explore the platform <ArrowRight size={16} /></button></div></div></main>; }
function Help({ onNavigate }: { onNavigate: (page: Page) => void }) { const topics = ['Getting started', 'Connecting Shopify', 'Connecting Stripe', 'Understanding analytics', 'Account settings', 'Privacy & security', 'Troubleshooting']; return <main className="simple-page help-page"><div className="simple-hero"><div className="eyebrow">Support, without the runaround</div><h1>How can we <em>help?</em></h1><p>Search the placeholder help center or choose a topic below.</p><div className="search-box"><CircleHelp size={18} /><input placeholder="Search for help..." /></div></div><div className="help-grid">{topics.map((topic, i) => <button key={topic} className="help-card" onClick={() => i === 0 && onNavigate('signup')}><span>0{i + 1}</span><strong>{topic}</strong><ArrowRight size={17} /></button>)}</div></main>; }

function Dashboard({ active, setActive, onConnect, onExit }: { active: DashboardView; setActive: (view: DashboardView) => void; onConnect: () => void; onExit: () => void }) { const [mobileOpen, setMobileOpen] = useState(false); return <div className="dashboard-shell"><aside className={mobileOpen ? 'dashboard-sidebar open' : 'dashboard-sidebar'}><button className="dash-brand" onClick={onExit}><Logo /></button><div className="dash-nav">{navItems.map(({ label, icon: Icon }) => <button key={label} className={active === label ? 'active' : ''} onClick={() => { setActive(label); setMobileOpen(false); }}><Icon size={18} />{label}</button>)}</div><div className="connected-box"><span className="eyebrow">Connected accounts</span><strong>—</strong><small>Connect an account to begin</small><button onClick={onConnect}>Connect now <ArrowRight size={13} /></button></div><button className="dash-profile"><span className="avatar">M</span><span><strong>[USER NAME]</strong><small>View profile</small></span><MoreHorizontal size={16} /></button></aside><section className="dashboard-content"><header className="dashboard-header"><button className="dashboard-menu" onClick={() => setMobileOpen(!mobileOpen)}><Menu /></button><div><span className="breadcrumb">Workspace / {active}</span><h1>{active === 'Overview' ? 'Welcome back, [USER NAME]' : active}</h1><p>{active === 'Overview' ? "Here's what's happening with your business." : 'Your authorized data, organized clearly.'}</p></div><div className="dashboard-head-actions"><button className="icon-button"><Bell size={18} /></button><span className="avatar">M</span></div></header>{active === 'Overview' ? <Overview onConnect={onConnect} /> : <EmptyDashboard title={active} onConnect={onConnect} />}</section></div>; }

function Overview({ onConnect }: { onConnect: () => void }) { return <div className="overview"><div className="overview-toolbar"><span className="eyebrow">Business overview</span><button className="date-select">Last 30 days <ChevronDown size={15} /></button></div><div className="metric-grid">{['Total revenue', 'Shopify revenue', 'Stripe revenue', 'Total orders / payments'].map((label) => <div className="metric-card" key={label}><span>{label}</span><strong>[{label === 'Total orders / payments' ? 'TOTAL' : label.toUpperCase().replace(/ /g, '_')}]</strong><small><span className="empty-dot" /> Connect data to see trends</small></div>)}</div><div className="platform-heading"><div><span className="eyebrow">Connected sources</span><h2>Your platforms</h2></div><button className="button primary small" onClick={onConnect}><Plus size={15} /> Connect an app</button></div><div className="platform-grid"><Platform icon={Store} title="Shopify" accent="green" onConnect={onConnect} /><Platform icon={WalletCards} title="Stripe" accent="blue" onConnect={onConnect} /><Platform icon={Grid2X2} title="Other apps" accent="purple" onConnect={onConnect} /></div><div className="lower-grid"><div className="empty-chart"><div className="panel-title"><div><span className="eyebrow">Trends over time</span><h2>Revenue overview</h2></div><button className="date-select">Last 30 days <ChevronDown size={14} /></button></div><div className="chart-empty-state"><div className="chart-placeholder"><LineChart size={24} /></div><strong>Your chart will appear here</strong><p>Connect Shopify or Stripe to start seeing your revenue over time.</p><button className="button secondary" onClick={onConnect}>Connect an account</button></div></div><div className="ai-card"><div className="ai-heading"><div className="feature-icon purple"><Sparkles size={17} /></div><div><span className="eyebrow">Coming next</span><h2>AI overview</h2></div></div><p>Once your data is connected, receive a thoughtful summary of trends, changes, and opportunities.</p><div className="ai-line"><LockKeyhole size={15} /> Based only on your authorized data</div><button className="button secondary" onClick={onConnect}>Connect data <ArrowRight size={14} /></button></div></div></div>; }
function Platform({ icon: Icon, title, accent, onConnect }: { icon: typeof Store; title: string; accent: string; onConnect: () => void }) { return <div className="platform-card"><div className={'platform-icon ' + accent}><Icon size={21} /></div><div className="platform-title"><h3>{title}</h3><span className="status">Not connected</span></div><p>Connect to see your authorized analytics here.</p><button onClick={onConnect}>Connect {title} <ArrowRight size={14} /></button></div>; }
function EmptyDashboard({ title, onConnect }: { title: string; onConnect: () => void }) { return <div className="empty-dashboard"><div className="empty-icon"><Sparkles size={25} /></div><h2>No {title.toLowerCase()} data yet</h2><p>Connect an account to start organizing your authorized business data in this view.</p><button className="button primary" onClick={onConnect}>Connect an account <ArrowRight size={16} /></button></div>; }

function ConnectModal({ onClose }: { onClose: () => void }) { return <div className="modal-backdrop" onClick={onClose}><div className="connect-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={onClose}><X size={18} /></button><div className="feature-icon purple"><Zap size={18} /></div><div className="eyebrow">Connect your business accounts</div><h2>Bring your data together.</h2><p>You’ll be redirected to the platform’s official authorization page to securely approve access. We never ask for or store your platform passwords.</p><div className="connect-options"><button><span className="mini-logo shopify">S</span><span><strong>Connect Shopify</strong><small>Official authorization</small></span><ArrowRight size={16} /></button><button><span className="mini-logo stripe">S</span><span><strong>Connect Stripe</strong><small>Official authorization</small></span><ArrowRight size={16} /></button></div><div className="modal-note"><ShieldCheck size={15} /> Only the permissions you approve can be used.</div></div></div>; }
function Footer({ onNavigate }: { onNavigate: (page: Page) => void }) { return <footer className="footer section-container"><div><button className="logo-button" onClick={() => onNavigate('home')}><Logo /></button><p>[CONTACT EMAIL]</p></div><div className="footer-links"><button onClick={() => onNavigate('home')}>Home</button><button onClick={() => onNavigate('about')}>About us</button><button onClick={() => onNavigate('help')}>Help</button><button>Privacy policy</button><button>Terms of agreement</button></div><span className="copyright">© 2026 [COMPANY NAME]</span></footer>; }

export default App;
