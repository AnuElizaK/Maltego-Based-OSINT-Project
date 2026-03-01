// Tree List View Graph

// --- DATA STRUCTURE ---
const data = {
    id: 1,
    label: "Edward Joseph Snowden",
    type: "root",
    status: "TARGET",
    children: [
        {
            id: 2,
            label: "Family & Relations",
            type: "category",
            children: [
                { id: 21, label: "Lonnie Snowden (Father)", type: "person" },
                { id: 22, label: "Elizabeth Snowden (Mother)", type: "person" },
                { id: 23, label: "Lindsay Mills (Spouse)", type: "person" },

            ]
        },
        {
            id: 3,
            label: "Employment History",
            type: "category",
            children: [
                {
                    id: 31, label: "Central Intelligence Agency (CIA)",
                    type: "agency",
                    children: [
                        { id: 311, label: "Role: IT Specialist", type: "role" },
                        { id: 312, label: "Years: 2006-2009", type: "year" }
                    ]
                },
                {
                    id: 32, label: "National Security Agency (NSA)",
                    type: "agency",
                    children: [
                        { id: 321, label: "Role: Systems Administrator", type: "role" },
                        { id: 322, label: "Years: 2013", type: "year" }
                    ]
                },
                { id: 33, label: "Booz Allen Hamilton", type: "company" },
                { id: 34, label: "Dell", type: "company" }
            ]
        },
        {
            id: 4,
            label: "Affiliations & Organizations",
            type: "category",
            children: [
                { id: 41, label: "Freedom of the Press Foundation", type: "org" },
                { id: 42, label: "Electronic Frontier Foundation", type: "org" }
            ]
        },
        {
            id: 5,
            label: "Key Events & Documentation",
            type: "category",
            children: [
                { id: 51, label: "Global Surveillance Disclosures (2013)", type: "event" },
                { id: 52, label: "Citizenfour (Documentary)", type: "media" },
                { id: 53, label: "Permanent Record (Memoir)", type: "media" },
                { id: 54, label: "Asylum in Russia", type: "location" }
            ]
        },
        {
            id: 6,
            label: "Awards & Recognition",
            type: "category",
            children: [
                { id: 61, label: "German Whistleblower Prize 2013", type: "award" },
                { id: 62, label: "Sam Adams Award 2013", type: "award" },
                { id: 63, label: "Ridenhour Truth-Telling Prize 2014", type: "award" },
                { id: 64, label: "Right Livelihood Award 2014", type: "award" },
                { id: 65, label: "Stuttgart Peace Prize 2014", type: "award" }
            ]
        },
        {
            id: 7,
            label: "Residence History",
            type: "category",
            children: [
                { id: 71, label: "Switzerland (Geneva)", type: "location" },
                { id: 72, label: "USA (North Carolina, Maryland, Hawaii, Florida, till 2013)", type: "location" },
                { id: 73, label: "UK", type: "location" },
                { id: 74, label: "Russia (Since 2022)", type: "location" }
            ]
        }
    ]
};

// --- RENDER LOGIC ---

function createTreeItem(node) {
    const li = document.createElement('li');
    li.className = 'tree-node';

    // Node Content Container
    const content = document.createElement('div');
    content.className = `node-content type-${node.type}`;

    // Icon Logic
    const icons = {
        root: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>`, // Target
        category: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`, // Folder
        person: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`, // User
        agency: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`, // Layers/Shield
        company: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`, // Briefcase
        org: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`, // Globe
        event: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`, // Lightning
        media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`, // File
        location: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`, // Pin
        role: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`, // Badge
        year: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`, // Calendar
        award: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>` // Star
    };

    let iconHtml = icons[node.type] || icons['category'];

    content.innerHTML = `<span class="node-icon">${iconHtml}</span> <span class="node-label">${node.label}</span>`;

    // Click to Toggle Children
    if (node.children && node.children.length > 0) {
        content.classList.add('has-children');
        content.addEventListener('click', (e) => {
            e.stopPropagation();
            li.classList.toggle('collapsed');
        });
    }

    li.appendChild(content);

    // Render Children
    if (node.children && node.children.length > 0) {
        const ul = document.createElement('ul');
        ul.className = 'tree-children';
        node.children.forEach(child => {
            ul.appendChild(createTreeItem(child));
        });
        li.appendChild(ul);
    }

    return li;
}

function renderTree() {
    const container = document.getElementById('network-graph');
    if (!container) return;

    // Clear Container
    container.innerHTML = '';

    // Create Root List
    const rootUl = document.createElement('ul');
    rootUl.className = 'cyber-tree';

    rootUl.appendChild(createTreeItem(data));
    container.appendChild(rootUl);

    console.log("Cyber Tree Rendered.");
}

// Initialize
document.addEventListener('DOMContentLoaded', renderTree);
