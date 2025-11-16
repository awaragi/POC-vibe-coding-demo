document.addEventListener('DOMContentLoaded', () => {
    console.log('CRM App Initialized');

    const stages = ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];
    const pipelineBoard = document.getElementById('pipeline');
    const formModal = document.getElementById('form-modal');
    const form = document.getElementById('opportunity-form');
    const closeModalBtn = document.querySelector('.close-modal');
    const addNewBtn = document.getElementById('add-new-btn');
    const cancelBtn = document.getElementById('form-cancel-btn');
    const searchBar = document.getElementById('search-bar');

    // --- Data Functions ---
    const getOpportunities = () => {
        return JSON.parse(localStorage.getItem('opportunities')) || [];
    };

    const saveOpportunities = (opportunities) => {
        localStorage.setItem('opportunities', JSON.stringify(opportunities));
    };

    // --- Render Functions ---
    const renderDashboard = () => {
        const opportunities = getOpportunities();
        const openOpps = opportunities.filter(opp => opp.stage !== 'Closed Won' && opp.stage !== 'Closed Lost');
        
        const totalValue = openOpps.reduce((sum, opp) => sum + parseFloat(opp.dealValue), 0);
        const openCount = openOpps.length;

        document.getElementById('total-value').textContent = `$${totalValue.toLocaleString()}`;
        document.getElementById('open-count').textContent = openCount;
    };

    const renderPipeline = (filterText = '') => {
        pipelineBoard.innerHTML = ''; // Clear the board

        // Create columns
        stages.forEach(stage => {
            const column = document.createElement('div');
            column.className = 'pipeline-column';
            column.dataset.stage = stage;
            column.innerHTML = `
                <div class="column-header">
                    <h3>${stage}</h3>
                </div>
                <div class="column-body"></div>
            `;
            pipelineBoard.appendChild(column);
        });

        // Add cards to columns
        let opportunities = getOpportunities();
        if (filterText) {
            const lowerCaseFilter = filterText.toLowerCase();
            opportunities = opportunities.filter(opp => 
                opp.clientName.toLowerCase().includes(lowerCaseFilter) ||
                opp.owner.toLowerCase().includes(lowerCaseFilter)
            );
        }

        opportunities.forEach(opp => {
            const card = createOpportunityCard(opp);
            const columnBody = pipelineBoard.querySelector(`.pipeline-column[data-stage="${opp.stage}"] .column-body`);
            if (columnBody) {
                columnBody.appendChild(card);
            }
        });
        
        addDragAndDropListeners();
    };

    const createOpportunityCard = (opp) => {
        const card = document.createElement('div');
        card.className = 'opportunity-card';
        card.dataset.id = opp.id;
        card.draggable = true;
        card.innerHTML = `
            <div class="card-actions">
                <button class="edit-btn" title="Edit">✏️</button>
                <button class="delete-btn" title="Delete">🗑️</button>
            </div>
            <h4>${opp.clientName}</h4>
            <p><strong>Value:</strong> $${parseInt(opp.dealValue).toLocaleString()}</p>
            <p><strong>Owner:</strong> ${opp.owner}</p>
        `;

        // Add event listeners for edit and delete
        card.querySelector('.delete-btn').addEventListener('click', () => handleDelete(opp.id));
        card.querySelector('.edit-btn').addEventListener('click', () => openFormModal(opp));

        return card;
    };

    // --- Event Handlers ---
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const oppId = document.getElementById('opp-id').value;

        const opportunityData = {
            clientName: document.getElementById('clientName').value,
            dealValue: document.getElementById('dealValue').value,
            owner: document.getElementById('owner').value,
            stage: document.getElementById('stage').value
        };

        if (!opportunityData.clientName || !opportunityData.dealValue || !opportunityData.owner || !opportunityData.stage) {
            alert('Please fill out all fields.');
            return;
        }

        let opportunities = getOpportunities();
        if (oppId) { // Editing existing
            const oppIndex = opportunities.findIndex(o => o.id === oppId);
            if (oppIndex > -1) {
                opportunities[oppIndex] = { ...opportunities[oppIndex], ...opportunityData };
                console.log(`Opportunity ${oppId} updated.`);
            }
        } else { // Adding new
            const newOpp = { id: `opp-${Date.now()}`, ...opportunityData };
            opportunities.push(newOpp);
            console.log('New Opportunity Added:', newOpp);
        }
        
        saveOpportunities(opportunities);
        form.reset();
        closeFormModal();
        renderAll();
    };

    const handleDelete = (oppId) => {
        if (confirm('Are you sure you want to delete this opportunity?')) {
            let opportunities = getOpportunities();
            opportunities = opportunities.filter(opp => opp.id !== oppId);
            saveOpportunities(opportunities);
            renderAll();
            console.log(`Opportunity ${oppId} deleted.`);
        }
    };

    const openFormModal = (opp = null) => {
        form.reset();
        const formTitle = document.getElementById('form-title');
        const formSubmitBtn = document.getElementById('form-submit-btn');
        
        if (opp) { // Editing
            formTitle.textContent = 'Edit Opportunity';
            formSubmitBtn.textContent = 'Save Changes';
            document.getElementById('opp-id').value = opp.id;
            document.getElementById('clientName').value = opp.clientName;
            document.getElementById('dealValue').value = opp.dealValue;
            document.getElementById('owner').value = opp.owner;
            document.getElementById('stage').value = opp.stage;
            cancelBtn.style.display = 'inline-block';
        } else { // Adding
            formTitle.textContent = 'Add New Opportunity';
            formSubmitBtn.textContent = 'Add Opportunity';
            document.getElementById('opp-id').value = '';
            cancelBtn.style.display = 'none';
        }
        formModal.style.display = 'flex';
    };

    const closeFormModal = () => {
        formModal.style.display = 'none';
    };

    // --- Drag and Drop Logic ---
    const addDragAndDropListeners = () => {
        const cards = document.querySelectorAll('.opportunity-card');
        const columns = document.querySelectorAll('.pipeline-column .column-body');

        cards.forEach(card => {
            card.addEventListener('dragstart', () => {
                card.classList.add('dragging');
            });

            card.addEventListener('dragend', () => {
                card.classList.remove('dragging');
            });
        });

        columns.forEach(column => {
            column.addEventListener('dragover', e => {
                e.preventDefault();
                const afterElement = getDragAfterElement(column, e.clientY);
                const dragging = document.querySelector('.dragging');
                if (afterElement == null) {
                    column.appendChild(dragging);
                } else {
                    column.insertBefore(dragging, afterElement);
                }
            });

            column.addEventListener('drop', e => {
                e.preventDefault();
                const draggingCard = document.querySelector('.dragging');
                const newStage = column.closest('.pipeline-column').dataset.stage;
                const oppId = draggingCard.dataset.id;

                // Update data
                let opportunities = getOpportunities();
                const oppIndex = opportunities.findIndex(opp => opp.id === oppId);
                if (oppIndex > -1) {
                    opportunities[oppIndex].stage = newStage;
                    saveOpportunities(opportunities);
                    renderDashboard(); // Only need to update dashboard here
                    console.log(`Opportunity ${oppId} moved to ${newStage}`);
                }
            });
        });
    };
    
    const getDragAfterElement = (container, y) => {
        const draggableElements = [...container.querySelectorAll('.opportunity-card:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    };

    const renderAll = () => {
        renderDashboard();
        renderPipeline(searchBar.value);
    };

    // --- Initialization ---
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    addNewBtn.addEventListener('click', () => openFormModal());
    closeModalBtn.addEventListener('click', closeFormModal);
    cancelBtn.addEventListener('click', closeFormModal);
    searchBar.addEventListener('input', () => renderPipeline(searchBar.value));

    renderAll();
});
