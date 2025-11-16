/**
 * CGI Sales Pipeline CRM
 * Main Application JavaScript
 */

// Stage configuration
const STAGES = ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];
const STAGE_COLORS = {
    'Lead': '#2196F3',
    'Qualified': '#4CAF50',
    'Proposal': '#FFC107',
    'Negotiation': '#FF9800',
    'Closed Won': '#388E3C',
    'Closed Lost': '#9E9E9E'
};

// Global state
let currentTab = localStorage.getItem('crm_current_tab') || 'dashboard';
let currentSection = localStorage.getItem('crm_current_section') || '#pipeline';
let searchTerm = '';
let stageFilter = '';
let sortColumn = 'createdAt';
let sortDirection = 'desc';
let editingOpportunityId = null;
let deletingOpportunityId = null;

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('CGI Sales Pipeline CRM initialized');
    
    // Setup navigation
    setupNavigation();
    
    // Setup opportunity form
    setupOpportunityForm();
    
    // Setup pipeline tabs
    setupPipelineTabs();
    
    // Setup list view controls
    setupListViewControls();
    
    // Setup modals
    setupModals();
    
    // Restore previous state
    restoreApplicationState();
    
    // Log successful initialization
    console.log('✓ Application loaded successfully');
});

/**
 * Setup navigation click handlers
 */
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            e.target.classList.add('active');
            
            // Show appropriate content section
            const href = e.target.getAttribute('href');
            showSection(href);
            
            console.log(`Navigated to: ${e.target.textContent}`);
        });
    });
}

/**
 * Restore application state from localStorage
 */
function restoreApplicationState() {
    // Restore section
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(l => l.classList.remove('active'));
    
    if (currentSection === '#add-opportunity') {
        // Show add opportunity form
        showSection('#add-opportunity');
    } else {
        // Show pipeline and restore tab
        const pipelineLink = document.querySelector('a[href="#pipeline"]');
        if (pipelineLink) {
            pipelineLink.classList.add('active');
        }
        showSection('#pipeline');
        
        // Restore active tab
        if (currentTab) {
            switchTab(currentTab);
        }
    }
}

/**
 * Show the appropriate content section
 */
function showSection(section) {
    const pipelineView = document.getElementById('pipeline-view');
    const addOpportunityView = document.getElementById('add-opportunity-view');
    
    // Hide all sections
    pipelineView.style.display = 'none';
    addOpportunityView.style.display = 'none';
    
    // Save current section to localStorage
    currentSection = section;
    localStorage.setItem('crm_current_section', section);
    
    // Show appropriate section
    if (section === '#pipeline') {
        pipelineView.style.display = 'block';
        renderAllViews();
    } else if (section === '#add-opportunity') {
        addOpportunityView.style.display = 'block';
    }
}

/**
 * Setup opportunity form handlers
 */
function setupOpportunityForm() {
    const form = document.getElementById('opportunity-form');
    const clearBtn = document.getElementById('clear-form');
    const addOpportunityBtn = document.getElementById('add-opportunity-btn');
    
    // Add Opportunity button in header
    addOpportunityBtn.addEventListener('click', () => {
        // Remove active class from nav links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        // Show add opportunity form
        showSection('#add-opportunity');
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmit();
    });
    
    // Clear button
    clearBtn.addEventListener('click', () => {
        clearForm();
    });
    
    // Field validation on blur
    const fields = ['clientName', 'dealValue', 'owner'];
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        field.addEventListener('blur', () => {
            validateField(fieldId);
        });
    });
}

/**
 * Setup pipeline tabs
 */
function setupPipelineTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
}

/**
 * Switch between tabs
 */
function switchTab(tabName) {
    currentTab = tabName;
    
    // Save current tab to localStorage
    localStorage.setItem('crm_current_tab', tabName);
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeTabBtn = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeTabBtn) {
        activeTabBtn.classList.add('active');
    }
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    const activeTabContent = document.getElementById(`${tabName}-tab`);
    if (activeTabContent) {
        activeTabContent.classList.add('active');
    }
    
    // Render the active view
    if (tabName === 'dashboard') {
        renderDashboard();
    } else if (tabName === 'board') {
        renderBoard();
    } else if (tabName === 'list') {
        renderList();
    }
}

/**
 * Setup list view controls
 */
function setupListViewControls() {
    const searchInput = document.getElementById('search-input');
    const stageFilterSelect = document.getElementById('stage-filter');
    const clearFiltersBtn = document.getElementById('clear-filters');
    
    // Search input with debounce
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchTerm = e.target.value.toLowerCase();
            renderList();
        }, 300);
    });
    
    // Stage filter
    stageFilterSelect.addEventListener('change', (e) => {
        stageFilter = e.target.value;
        renderList();
    });
    
    // Clear filters
    clearFiltersBtn.addEventListener('click', () => {
        searchInput.value = '';
        stageFilterSelect.value = '';
        searchTerm = '';
        stageFilter = '';
        renderList();
    });
    
    // Table header sorting
    document.querySelectorAll('.data-table th[data-sort]').forEach(th => {
        th.addEventListener('click', () => {
            const column = th.getAttribute('data-sort');
            if (sortColumn === column) {
                sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                sortColumn = column;
                sortDirection = 'asc';
            }
            renderList();
        });
    });
}

/**
 * Setup modals
 */
function setupModals() {
    // Edit modal
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-form');
    const modalClose = document.getElementById('modal-close');
    const cancelEdit = document.getElementById('cancel-edit');
    
    modalClose.addEventListener('click', () => closeEditModal());
    cancelEdit.addEventListener('click', () => closeEditModal());
    
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleEditSubmit();
    });
    
    // Delete modal
    const deleteModal = document.getElementById('delete-modal');
    const confirmDelete = document.getElementById('confirm-delete');
    const cancelDelete = document.getElementById('cancel-delete');
    
    confirmDelete.addEventListener('click', () => handleDeleteConfirm());
    cancelDelete.addEventListener('click', () => closeDeleteModal());
    
    // Close modals on backdrop click
    editModal.addEventListener('click', (e) => {
        if (e.target === editModal) closeEditModal();
    });
    deleteModal.addEventListener('click', (e) => {
        if (e.target === deleteModal) closeDeleteModal();
    });
}

/**
 * Render all views
 */
function renderAllViews() {
    if (currentTab === 'dashboard') renderDashboard();
    if (currentTab === 'board') renderBoard();
    if (currentTab === 'list') renderList();
}

/**
 * Render Dashboard View
 */
function renderDashboard() {
    const opportunities = getAllOpportunities();
    const metrics = calculateMetrics(opportunities);
    
    // Update summary cards
    document.getElementById('total-pipeline-value').textContent = formatCurrency(metrics.pipelineValue);
    document.getElementById('total-opportunities').textContent = metrics.totalCount;
    document.getElementById('win-rate').textContent = metrics.winRate + '%';
    
    // Render stage breakdown
    renderStageBreakdown(opportunities);
    
    // Render recent activity
    renderRecentActivity(opportunities);
}

/**
 * Calculate dashboard metrics
 */
function calculateMetrics(opportunities) {
    const openOpps = opportunities.filter(o => o.stage !== 'Closed Won' && o.stage !== 'Closed Lost');
    const closedOpps = opportunities.filter(o => o.stage === 'Closed Won' || o.stage === 'Closed Lost');
    const wonOpps = opportunities.filter(o => o.stage === 'Closed Won');
    
    const pipelineValue = openOpps.reduce((sum, o) => sum + o.dealValue, 0);
    const winRate = closedOpps.length > 0 ? Math.round((wonOpps.length / closedOpps.length) * 100) : 0;
    
    return {
        pipelineValue,
        totalCount: opportunities.length,
        winRate
    };
}

/**
 * Render stage breakdown
 */
function renderStageBreakdown(opportunities) {
    const container = document.getElementById('stage-breakdown-content');
    const maxCount = Math.max(...STAGES.map(stage => 
        opportunities.filter(o => o.stage === stage).length
    ), 1);
    
    container.innerHTML = STAGES.map(stage => {
        const stageOpps = opportunities.filter(o => o.stage === stage);
        const count = stageOpps.length;
        const value = stageOpps.reduce((sum, o) => sum + o.dealValue, 0);
        const percentage = (count / maxCount) * 100;
        
        return `
            <div class="stage-item">
                <div class="stage-header">
                    <div class="stage-name">
                        <span class="stage-badge" style="background-color: ${STAGE_COLORS[stage]}"></span>
                        ${stage}
                    </div>
                    <div class="stage-stats">${count} deals • ${formatCurrency(value)}</div>
                </div>
                <div class="stage-bar">
                    <div class="stage-bar-fill" style="width: ${percentage}%; background-color: ${STAGE_COLORS[stage]}"></div>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Render recent activity
 */
function renderRecentActivity(opportunities) {
    const container = document.getElementById('recent-activity-list');
    const recent = opportunities
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
    
    if (recent.length === 0) {
        container.innerHTML = '<p class="empty-state">No opportunities yet. Add your first opportunity to get started!</p>';
        return;
    }
    
    container.innerHTML = recent.map(opp => `
        <div class="recent-item">
            <div class="recent-client">${opp.clientName}</div>
            <div class="recent-details">
                ${formatCurrency(opp.dealValue)} • ${opp.stage} • ${opp.owner}
            </div>
        </div>
    `).join('');
}

/**
 * Render Board View
 */
function renderBoard() {
    const opportunities = getAllOpportunities();
    const board = document.getElementById('kanban-board');
    
    board.innerHTML = STAGES.map(stage => {
        const stageOpps = opportunities.filter(o => o.stage === stage);
        const totalValue = stageOpps.reduce((sum, o) => sum + o.dealValue, 0);
        
        return `
            <div class="kanban-column" data-stage="${stage}">
                <div class="column-header">
                    <div class="column-title">${stage}</div>
                    <div class="column-stats">
                        ${stageOpps.length} deals • ${formatCurrency(totalValue)}
                    </div>
                </div>
                <div class="cards-container" data-stage="${stage}">
                    ${stageOpps.length > 0 ? stageOpps.map(opp => renderOpportunityCard(opp)).join('') : '<div class="empty-column">No opportunities</div>'}
                </div>
            </div>
        `;
    }).join('');
    
    // Setup drag and drop
    setupDragAndDrop();
}

/**
 * Render opportunity card
 */
function renderOpportunityCard(opp) {
    return `
        <div class="opportunity-card" draggable="true" data-id="${opp.id}">
            <div class="card-client">${opp.clientName}</div>
            <div class="card-value">${formatCurrency(opp.dealValue)}</div>
            <div class="card-owner">👤 ${opp.owner}</div>
            <div class="card-actions">
                <button class="card-btn card-btn-edit" onclick="openEditModal('${opp.id}')">Edit</button>
                <button class="card-btn card-btn-delete" onclick="openDeleteModal('${opp.id}')">Delete</button>
            </div>
        </div>
    `;
}

/**
 * Setup drag and drop
 */
function setupDragAndDrop() {
    const cards = document.querySelectorAll('.opportunity-card');
    const containers = document.querySelectorAll('.cards-container');
    
    cards.forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
    });
    
    containers.forEach(container => {
        container.addEventListener('dragover', handleDragOver);
        container.addEventListener('drop', handleDrop);
    });
}

let draggedElement = null;

function handleDragStart(e) {
    draggedElement = e.target;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.innerHTML);
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDrop(e) {
    e.preventDefault();
    
    if (!draggedElement) return;
    
    const newStage = e.currentTarget.getAttribute('data-stage');
    const oppId = draggedElement.getAttribute('data-id');
    
    // Update opportunity stage
    updateOpportunity(oppId, { stage: newStage });
    
    // Re-render board
    renderBoard();
    renderDashboard();
    
    console.log(`Moved opportunity ${oppId} to ${newStage}`);
}

/**
 * Render List View
 */
function renderList() {
    let opportunities = getAllOpportunities();
    
    // Apply filters
    if (searchTerm) {
        opportunities = opportunities.filter(o => 
            o.clientName.toLowerCase().includes(searchTerm) ||
            o.owner.toLowerCase().includes(searchTerm)
        );
    }
    
    if (stageFilter) {
        opportunities = opportunities.filter(o => o.stage === stageFilter);
    }
    
    // Apply sorting
    opportunities.sort((a, b) => {
        let valA = a[sortColumn];
        let valB = b[sortColumn];
        
        if (sortColumn === 'dealValue') {
            valA = parseFloat(valA);
            valB = parseFloat(valB);
        } else if (sortColumn === 'createdAt') {
            valA = new Date(valA);
            valB = new Date(valB);
        } else {
            valA = String(valA).toLowerCase();
            valB = String(valB).toLowerCase();
        }
        
        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });
    
    // Update sort indicators
    document.querySelectorAll('.sort-indicator').forEach(indicator => {
        indicator.textContent = '';
    });
    const activeHeader = document.querySelector(`th[data-sort="${sortColumn}"] .sort-indicator`);
    if (activeHeader) {
        activeHeader.textContent = sortDirection === 'asc' ? '↑' : '↓';
    }
    
    // Render table
    const tbody = document.getElementById('table-body');
    const emptyState = document.getElementById('empty-state');
    
    if (opportunities.length === 0) {
        tbody.innerHTML = '';
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
        tbody.innerHTML = opportunities.map(opp => `
            <tr>
                <td>${opp.clientName}</td>
                <td>${formatCurrency(opp.dealValue)}</td>
                <td><span class="stage-badge-cell stage-${opp.stage.replace(' ', '.')}">${opp.stage}</span></td>
                <td>${opp.owner}</td>
                <td>${formatDate(opp.createdAt)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-primary btn-small" onclick="openEditModal('${opp.id}')">Edit</button>
                        <button class="btn btn-secondary btn-small" onclick="openDeleteModal('${opp.id}')">Delete</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }
}

/**
 * Open edit modal
 */
function openEditModal(oppId) {
    editingOpportunityId = oppId;
    const opp = getAllOpportunities().find(o => o.id === oppId);
    
    if (!opp) return;
    
    // Populate form
    document.getElementById('edit-id').value = opp.id;
    document.getElementById('edit-clientName').value = opp.clientName;
    document.getElementById('edit-dealValue').value = opp.dealValue;
    document.getElementById('edit-stage').value = opp.stage;
    document.getElementById('edit-owner').value = opp.owner;
    
    // Clear errors
    document.querySelectorAll('#edit-form .error-message').forEach(msg => msg.textContent = '');
    document.querySelectorAll('#edit-form .error').forEach(field => field.classList.remove('error'));
    
    // Show modal
    document.getElementById('edit-modal').style.display = 'flex';
}

/**
 * Close edit modal
 */
function closeEditModal() {
    document.getElementById('edit-modal').style.display = 'none';
    editingOpportunityId = null;
}

/**
 * Handle edit form submit
 */
function handleEditSubmit() {
    // Validate fields
    const clientName = document.getElementById('edit-clientName').value.trim();
    const dealValue = document.getElementById('edit-dealValue').value.trim();
    const stage = document.getElementById('edit-stage').value;
    const owner = document.getElementById('edit-owner').value.trim();
    
    let isValid = true;
    
    if (!clientName || clientName.length < 2) {
        document.getElementById('edit-clientName').classList.add('error');
        document.getElementById('edit-clientName-error').textContent = '❌ Client name is required';
        isValid = false;
    }
    
    if (!dealValue || parseFloat(dealValue) <= 0) {
        document.getElementById('edit-dealValue').classList.add('error');
        document.getElementById('edit-dealValue-error').textContent = '❌ Valid deal value is required';
        isValid = false;
    }
    
    if (!owner || owner.length < 2) {
        document.getElementById('edit-owner').classList.add('error');
        document.getElementById('edit-owner-error').textContent = '❌ Owner is required';
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Update opportunity
    updateOpportunity(editingOpportunityId, {
        clientName,
        dealValue: parseFloat(dealValue),
        stage,
        owner
    });
    
    // Close modal and refresh views
    closeEditModal();
    renderAllViews();
    
    console.log('✓ Opportunity updated:', editingOpportunityId);
}

/**
 * Open delete modal
 */
function openDeleteModal(oppId) {
    deletingOpportunityId = oppId;
    const opp = getAllOpportunities().find(o => o.id === oppId);
    
    if (!opp) return;
    
    document.getElementById('delete-message').textContent = 
        `Are you sure you want to delete the opportunity for "${opp.clientName}"?`;
    
    document.getElementById('delete-modal').style.display = 'flex';
}

/**
 * Close delete modal
 */
function closeDeleteModal() {
    document.getElementById('delete-modal').style.display = 'none';
    deletingOpportunityId = null;
}

/**
 * Handle delete confirmation
 */
function handleDeleteConfirm() {
    if (!deletingOpportunityId) return;
    
    deleteOpportunity(deletingOpportunityId);
    closeDeleteModal();
    renderAllViews();
    
    console.log('✓ Opportunity deleted:', deletingOpportunityId);
}

/**
 * Handle form submission
 */
function handleFormSubmit() {
    // Clear previous errors
    clearErrors();
    
    // Validate all fields
    const isValid = validateAllFields();
    
    if (!isValid) {
        // Focus on first invalid field
        const firstError = document.querySelector('.error');
        if (firstError) {
            firstError.focus();
        }
        return;
    }
    
    // Get form data
    const formData = getFormData();
    
    // Create opportunity object
    const opportunity = {
        id: generateId(),
        clientName: formData.clientName,
        dealValue: parseFloat(formData.dealValue),
        stage: formData.stage,
        owner: formData.owner,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    // Save to localStorage
    saveOpportunity(opportunity);
    
    // Show success message
    showSuccessMessage();
    
    // Clear form
    clearForm();
    
    // Refresh views if on pipeline page
    renderAllViews();
    
    // Log to console
    console.log('✓ Opportunity saved:', opportunity);
}

/**
 * Validate all form fields
 */
function validateAllFields() {
    const clientNameValid = validateField('clientName');
    const dealValueValid = validateField('dealValue');
    const ownerValid = validateField('owner');
    
    return clientNameValid && dealValueValid && ownerValid;
}

/**
 * Validate individual field
 */
function validateField(fieldId) {
    const field = document.getElementById(fieldId);
    const value = field.value.trim();
    const errorElement = document.getElementById(`${fieldId}-error`);
    
    // Clear previous error
    field.classList.remove('error');
    errorElement.textContent = '';
    
    // Validation rules
    let isValid = true;
    let errorMessage = '';
    
    if (fieldId === 'clientName') {
        if (!value) {
            isValid = false;
            errorMessage = '❌ Client name is required';
        } else if (value.length < 2) {
            isValid = false;
            errorMessage = '❌ Client name must be at least 2 characters';
        } else if (value.length > 100) {
            isValid = false;
            errorMessage = '❌ Client name must be less than 100 characters';
        }
    }
    
    if (fieldId === 'dealValue') {
        if (!value) {
            isValid = false;
            errorMessage = '❌ Deal value is required';
        } else if (parseFloat(value) <= 0) {
            isValid = false;
            errorMessage = '❌ Deal value must be greater than 0';
        }
    }
    
    if (fieldId === 'owner') {
        if (!value) {
            isValid = false;
            errorMessage = '❌ Opportunity owner is required';
        } else if (value.length < 2) {
            isValid = false;
            errorMessage = '❌ Owner name must be at least 2 characters';
        } else if (value.length > 50) {
            isValid = false;
            errorMessage = '❌ Owner name must be less than 50 characters';
        }
    }
    
    // Show error if invalid
    if (!isValid) {
        field.classList.add('error');
        errorElement.textContent = errorMessage;
    }
    
    return isValid;
}

/**
 * Get form data
 */
function getFormData() {
    return {
        clientName: document.getElementById('clientName').value.trim(),
        dealValue: document.getElementById('dealValue').value.trim(),
        stage: document.getElementById('stage').value,
        owner: document.getElementById('owner').value.trim()
    };
}

/**
 * Save opportunity to localStorage
 */
function saveOpportunity(opportunity) {
    let opportunities = Storage.get('crm_opportunities') || [];
    opportunities.push(opportunity);
    Storage.set('crm_opportunities', opportunities);
}

/**
 * Get all opportunities
 */
function getAllOpportunities() {
    return Storage.get('crm_opportunities') || [];
}

/**
 * Update opportunity
 */
function updateOpportunity(id, updates) {
    let opportunities = getAllOpportunities();
    const index = opportunities.findIndex(o => o.id === id);
    
    if (index !== -1) {
        opportunities[index] = {
            ...opportunities[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };
        Storage.set('crm_opportunities', opportunities);
    }
}

/**
 * Delete opportunity
 */
function deleteOpportunity(id) {
    let opportunities = getAllOpportunities();
    opportunities = opportunities.filter(o => o.id !== id);
    Storage.set('crm_opportunities', opportunities);
}

/**
 * Show success message
 */
function showSuccessMessage() {
    const successBanner = document.getElementById('success-message');
    successBanner.style.display = 'block';
    
    // Auto-dismiss after 3 seconds
    setTimeout(() => {
        successBanner.style.display = 'none';
    }, 3000);
}

/**
 * Clear form fields
 */
function clearForm() {
    document.getElementById('opportunity-form').reset();
    clearErrors();
}

/**
 * Clear all error messages
 */
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.textContent = '');
    
    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach(field => field.classList.remove('error'));
}

/**
 * Generate unique ID
 */
function generateId() {
    return `opp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Format currency
 */
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

/**
 * Format date
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(date);
}

/**
 * Utility function for localStorage operations
 */
const Storage = {
    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    },
    
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error writing to localStorage:', error);
            return false;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    }
};
