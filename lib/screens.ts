export type Screen = { file: string; title: string; caption: string };
export type ScreenGroup = { id: string; title: string; tag: string; screens: Screen[] };

const S = (file: string, title: string, caption: string): Screen => ({ file, title, caption });

/** All 65 real product screens, grouped the way the platform is organized. */
export const SCREEN_GROUPS: ScreenGroup[] = [
  {
    id: "dashboards",
    title: "Sign-in & Dashboards",
    tag: "Your whole agency at a glance.",
    screens: [
      S("dashboard.png", "Dashboard Overview", "KPI row and charts — the whole agency at a glance."),
      S("login-page.png", "Branded Sign-in", "Your brand, from the first screen."),
      S("new-dashboard.png", "Custom Dashboards", "Build the dashboard each role needs."),
    ],
  },
  {
    id: "properties",
    title: "Inventory & Properties",
    tag: "Beautiful, photo-rich inventory.",
    screens: [
      S("properties-light.png", "Inventory Grid", "Photo-rich inventory with status badges."),
      S("properties-dark.png", "Dark Mode", "Light and dark, out of the box."),
      S("properties-selections.png", "Bulk Actions", "Re-assign or re-status in bulk."),
      S("new-property.png", "Add Property", "Fast, guided listing creation."),
      S("new-property-apartment.png", "New Property — Apartment", "Forms tuned per property type."),
      S("new-property-land.png", "New Property — Land", "Field sets adapt to land, apartments and more."),
      S("property-details-overview-1.png", "Property Detail", "Every listing, fully detailed."),
      S("property-details-overview-2.png", "Key Facts", "Key facts, pricing and status in one view."),
      S("property-details-overview-3.png", "Detail Sections", "Deep, organized detail per listing."),
      S("property-details-images.png", "Photo Manager", "Drag-and-drop cover and gallery reorder."),
      S("property-details-lebanon-specs.png", "Localized Specs", "Region-specific specs built in."),
      S("property-details-publishing.png", "Publish to Web", "One click to your public site."),
      S("property-details-published.png", "Published Listing", "Live on the agency's public website."),
    ],
  },
  {
    id: "matching",
    title: "Smart Matching",
    tag: "Requirements matched to inventory, automatically.",
    screens: [
      S("property-details-matching-leads.png", "Matching Leads", "Every listing surfaces the buyers it fits."),
    ],
  },
  {
    id: "customer-view",
    title: "Customer View",
    tag: "Client-ready property showcases.",
    screens: [
      S("customer-view.png", "Customer View", "Client-ready property showcases."),
      S("customer-view-selection.png", "Showcase Builder", "Pick listings to present to a client."),
      S("customer-view-present.png", "Present Mode", "A polished, full-screen client presentation."),
      S("customer-view-comapre.png", "Compare for Buyers", "Help buyers decide, side by side."),
    ],
  },
  {
    id: "requests-deals",
    title: "Requests & Deals",
    tag: "From requirement to closed deal.",
    screens: [
      S("requests.png", "Requests Pipeline", "Track every buyer/renter requirement by status."),
      S("requests-pipeline-move.png", "Pipeline Moves", "Advance requirements stage by stage."),
      S("deals.png", "Deals Board", "Weighted forecast and win-rate built in."),
    ],
  },
  {
    id: "contacts",
    title: "Contacts CRM",
    tag: "All owners and clients in one CRM.",
    screens: [
      S("contacts.png", "Contacts CRM", "All owners and clients in one CRM."),
      S("contacts-columns-and-actions.png", "Columns & Actions", "Configurable columns and bulk actions."),
      S("contact-duplicates.png", "Duplicate Merge", "Automatic duplicate detection and merge."),
    ],
  },
  {
    id: "meetings-tasks",
    title: "Meetings & Tasks",
    tag: "Nothing falls through the cracks.",
    screens: [
      S("meetings.png", "Meetings", "Viewings and meetings in context."),
      S("meetings-new-meeting.png", "Schedule a Meeting", "Book viewings against contacts and listings."),
      S("tasks.png", "Tasks Board", "Priority, due date and assignee."),
      S("taks-new-task.png", "New Task", "Assign work with due dates and priority."),
    ],
  },
  {
    id: "activities",
    title: "Activities & Worklog",
    tag: "Every interaction, logged.",
    screens: [
      S("activities.png", "Activity Log", "Calls, WhatsApp and notes in one feed."),
      S("activities-log-activity.png", "Log Activity", "Capture every interaction in seconds."),
      S("activities-log-activity-type.png", "Activity Types", "Classify calls, messages, notes and more."),
      S("worklog.png", "Worklog", "Track team work and time."),
    ],
  },
  {
    id: "automation",
    title: "Communication & Automation",
    tag: "Automate busywork — no code.",
    screens: [
      S("whatsapp.png", "WhatsApp", "Send on-brand WhatsApp in seconds."),
      S("whatsapp-new-template.png", "WhatsApp Templates", "A reusable, on-brand template library."),
      S("workflow.png", "Workflows", "Automate busywork, no code."),
      S("workflow-new-workflow.png", "New Workflow", "Build trigger-to-action rules visually."),
    ],
  },
  {
    id: "maps",
    title: "Maps & Geo",
    tag: "See inventory on the map.",
    screens: [
      S("maps.png", "Map View", "Inventory pinned by area."),
      S("maps-selection.png", "Map Selection", "Select and act on listings geographically."),
    ],
  },
  {
    id: "finance",
    title: "Finance",
    tag: "Numbers that add up.",
    screens: [
      S("commissions.png", "Commissions", "Commission tracking that adds up."),
      S("calculator.png", "Calculator", "Run scenarios and sheets in-app."),
      S("rent-management-contract.png", "Rent Management", "Manage rentals end-to-end with contracts."),
    ],
  },
  {
    id: "reports",
    title: "Reports",
    tag: "Insight across the whole business.",
    screens: [
      S("reports.png", "Reports", "Charts and KPIs across the business."),
      S("reports-custom-report.png", "Custom Reports", "Build the exact report you need."),
      S("reports-schedule.png", "Scheduled Reports", "Reports that arrive on schedule."),
    ],
  },
  {
    id: "team",
    title: "Team & Performance",
    tag: "Organize agents and track targets.",
    screens: [
      S("team-performance.png", "Team Performance", "Performance across agents and teams."),
      S("team-tracking.png", "Team Tracking", "Track activity by team."),
      S("team-tracking-user-1.png", "Agent Tracking", "Drill into an individual agent."),
      S("team-tracking-user-2.png", "Agent Detail", "Per-agent activity and output."),
      S("targets.png", "Targets", "Set and track agent targets vs actual."),
    ],
  },
  {
    id: "monitoring",
    title: "Team Monitoring",
    tag: "24 checks that watch performance.",
    screens: [
      S("team-monitoring.png", "Team Monitoring", "Rules and alerts that watch performance."),
      S("team-monitoring-recent.png", "Recent Alerts", "Recent monitoring events and flags."),
      S("tema-monitoring-new-rule.png", "New Monitoring Rule", "Define checks that trigger alerts."),
    ],
  },
  {
    id: "knowledge",
    title: "Documents & Knowledge",
    tag: "Secure storage and a built-in help center.",
    screens: [
      S("documents.png", "Documents", "Secure agency document storage."),
      S("knowledge-base.png", "Knowledge Base", "Built-in help center for the team."),
      S("knowledge-base-article.png", "KB Article", "Rich articles, organized by category."),
    ],
  },
  {
    id: "admin",
    title: "Administration & Account",
    tag: "Run the platform with full control.",
    screens: [
      S("administration.png", "Administration", "Central control for the whole platform."),
      S("administration-menu-1.png", "Admin Menu", "45 settings areas, organized."),
      S("administration-menu-2.png", "Admin Menu (cont.)", "Modules, roles, users and appearance."),
      S("my-settings.png", "My Settings", "Personal preferences per user."),
      S("notifications.png", "Notifications", "Stay on top of everything that matters."),
      S("new.png", "Quick Create", "Create anything from one place."),
      S("error-page.png", "Error Page", "Branded, friendly error states."),
    ],
  },
];

export const ALL_SCREENS: Screen[] = SCREEN_GROUPS.flatMap((g) => g.screens);

/** A focal crop into a screenshot: CSS object-position + zoom factor. */
export type Focus = { pos: string; zoom: number };

/** Hand-picked hero screens for the scroll showcase, each cropped to its most
 *  compelling region for agency owners/agents (KPIs, photo grid, match list…). */
export const SHOWCASE: { screen: Screen; headline: string; body: string; focus: Focus }[] = [
  {
    screen: S("dashboard.png", "Dashboard", ""),
    headline: "Your whole agency, one screen",
    body: "Inventory, requests, tasks and commission — live KPIs each role can customize.",
    focus: { pos: "45% 18%", zoom: 1.55 },
  },
  {
    screen: S("properties-light.png", "Inventory", ""),
    headline: "Photo-rich inventory",
    body: "Every listing structured, photographed and ready to publish.",
    focus: { pos: "62% 50%", zoom: 1.45 },
  },
  {
    screen: S("property-details-matching-leads.png", "Matching", ""),
    headline: "Buyers matched automatically",
    body: "Open a listing and the buyers it fits are already ranked, with budgets attached.",
    focus: { pos: "28% 22%", zoom: 1.6 },
  },
  {
    screen: S("customer-view-present.png", "Present", ""),
    headline: "Client-ready showcases",
    body: "Present a polished shortlist, full-screen, in front of the buyer.",
    focus: { pos: "72% 28%", zoom: 1.25 },
  },
  {
    screen: S("deals.png", "Deals", ""),
    headline: "Deals to the finish line",
    body: "Open pipeline, weighted forecast and commission — offer to close.",
    focus: { pos: "30% 14%", zoom: 1.6 },
  },
  {
    screen: S("reports.png", "Reports", ""),
    headline: "Insight without spreadsheets",
    body: "For-sale value, gross commission and pipeline — reports that arrive on schedule.",
    focus: { pos: "48% 22%", zoom: 1.5 },
  },
];
