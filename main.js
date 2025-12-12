// Gestion des Tâches

const TaskManager = {
    // Configuration
    API_URL: 'http://localhost:3000/api',
    token: localStorage.getItem('token'),
    currentUser: null,
    
    // Initialisation
    init: function() {
        console.log('Initialisation TaskManager...');
        
        // Vérifier l'authentification
        if (!this.token) {
            window.location.href = 'login.html';
            return;
        }
        
        // Charger l'utilisateur
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                this.currentUser = JSON.parse(userData);
                console.log('Utilisateur connecté:', this.currentUser);
            } catch (e) {
                console.error('Erreur parsing user:', e);
            }
        }
        
        // Configurer l'interface
        this.setupUI();
        
        // Charger les données
        this.loadData();
    },
    
    // Configuration de l'interface
    setupUI: function() {
        console.log('Configuration UI...');
        
        // Créer l'interface si elle n'existe pas
        this.createTaskInterface();
        
        // Événements
        this.setupEvents();
        
        // Afficher l'utilisateur
        this.showUserInfo();
    },
    
    // Créer l'interface des tâches
    createTaskInterface: function() {
        const main = document.querySelector('main') || document.body;
        
        const html = `
            <div class="container mt-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h3 class="mb-0">
                                    <i class="fas fa-tasks me-2"></i>Mes Tâches
                                </h3>
                                <div>
                                    <button id="refreshTasks" class="btn btn-outline-secondary btn-sm me-2">
                                        <i class="fas fa-sync-alt"></i>
                                    </button>
                                    <button id="createTaskBtn" class="btn btn-primary btn-sm">
                                        <i class="fas fa-plus me-1"></i>Nouvelle Tâche
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <!-- Barre de recherche -->
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <div class="input-group">
                                            <span class="input-group-text">
                                                <i class="fas fa-search"></i>
                                            </span>
                                            <input type="text" id="taskSearch" class="form-control" 
                                                   placeholder="Rechercher une tâche...">
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <select id="statusFilter" class="form-select">
                                            <option value="all">Tous les statuts</option>
                                            <option value="pending">En attente</option>
                                            <option value="in_progress">En cours</option>
                                            <option value="completed">Terminée</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <select id="priorityFilter" class="form-select">
                                            <option value="all">Toutes priorités</option>
                                            <option value="1">Basse</option>
                                            <option value="2">Moyenne</option>
                                            <option value="3">Haute</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <!-- Liste des tâches -->
                                <div id="tasksContainer">
                                    <div class="text-center">
                                        <div class="spinner-border text-primary" role="status">
                                            <span class="visually-hidden">Chargement...</span>
                                        </div>
                                        <p class="mt-2">Chargement des tâches...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Modal pour créer une tâche -->
            <div class="modal fade" id="taskModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalTitle">Nouvelle Tâche</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form id="taskForm">
                            <div class="modal-body">
                                <input type="hidden" id="taskId">
                                
                                <div class="mb-3">
                                    <label for="taskTitle" class="form-label">Titre *</label>
                                    <input type="text" class="form-control" id="taskTitle" required>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="taskDescription" class="form-label">Description</label>
                                    <textarea class="form-control" id="taskDescription" rows="3"></textarea>
                                </div>
                                
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label for="taskProject" class="form-label">Projet</label>
                                        <select class="form-select" id="taskProject" required>
                                            <option value="">Chargement...</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="taskPriority" class="form-label">Priorité</label>
                                        <select class="form-select" id="taskPriority">
                                            <option value="1">Basse</option>
                                            <option value="2">Moyenne</option>
                                            <option value="3">Haute</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label for="taskStatus" class="form-label">Statut</label>
                                        <select class="form-select" id="taskStatus">
                                            <option value="pending">En attente</option>
                                            <option value="in_progress">En cours</option>
                                            <option value="completed">Terminée</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="taskDueDate" class="form-label">Date d'échéance</label>
                                        <input type="date" class="form-control" id="taskDueDate">
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                <button type="submit" class="btn btn-primary" id="saveTaskBtn">
                                    <span class="btn-text">Enregistrer</span>
                                    <span class="btn-loader" style="display: none;">
                                        <span class="spinner-border spinner-border-sm"></span>
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            <!-- Modal de confirmation -->
            <div class="modal fade" id="confirmModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Confirmation</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <p id="confirmMessage">Êtes-vous sûr de vouloir supprimer cette tâche ?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <button type="button" class="btn btn-danger" id="confirmDeleteBtn">Supprimer</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        main.innerHTML = html;
    },
    
    // Afficher les infos utilisateur
    showUserInfo: function() {
        const userEmail = document.getElementById('userEmail');
        if (userEmail && this.currentUser) {
            userEmail.textContent = this.currentUser.email;
        }
    },
    
    // Configuration des événements
    setupEvents: function() {
        // Bouton créer tâche
        document.getElementById('createTaskBtn').addEventListener('click', () => {
            this.showTaskModal('create');
        });
        
        // Bouton rafraîchir
        document.getElementById('refreshTasks').addEventListener('click', () => {
            this.loadTasks();
        });
        
        // Recherche
        document.getElementById('taskSearch').addEventListener('input', (e) => {
            this.searchTasks(e.target.value);
        });
        
        // Filtres
        document.getElementById('statusFilter').addEventListener('change', () => {
            this.loadTasks();
        });
        
        document.getElementById('priorityFilter').addEventListener('change', () => {
            this.loadTasks();
        });
        
        // Formulaire tâche
        document.getElementById('taskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveTask();
        });
        
        // Bouton confirmation suppression
        document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
            this.deleteTaskConfirmed();
        });
    },
    
    // Charger toutes les données
    async loadData() {
        try {
            await Promise.all([
                this.loadProjects(),
                this.loadTasks()
            ]);
        } catch (error) {
            this.showError('Erreur de chargement', error);
        }
    },
    
    // Charger les projets
    async loadProjects() {
        try {
            const response = await this.apiCall('/projects?limit=100');
            
            const select = document.getElementById('taskProject');
            if (select && response.projects) {
                select.innerHTML = '<option value="">Sélectionner un projet</option>' +
                    response.projects.map(project => 
                        `<option value="${project.id}">${this.escapeHtml(project.name)}</option>`
                    ).join('');
            }
        } catch (error) {
            console.error('Erreur chargement projets:', error);
        }
    },
    
    // Charger les tâches
    async loadTasks() {
        try {
            const search = document.getElementById('taskSearch').value;
            const status = document.getElementById('statusFilter').value;
            const priority = document.getElementById('priorityFilter').value;
            
            // Construire l'URL
            let url = '/tasks?limit=50';
            if (search) url += `&search=${encodeURIComponent(search)}`;
            if (status !== 'all') url += `&status=${status}`;
            if (priority !== 'all') url += `&priority=${priority}`;
            
            const response = await this.apiCall(url);
            this.displayTasks(response.tasks || []);
            
        } catch (error) {
            this.showError('Erreur chargement tâches', error);
        }
    },
    
    // Rechercher des tâches
    async searchTasks(searchTerm) {
        try {
            const response = await this.apiCall(`/tasks?search=${encodeURIComponent(searchTerm)}&limit=50`);
            this.displayTasks(response.tasks || []);
        } catch (error) {
            console.error('Erreur recherche:', error);
        }
    },
    
    // Afficher les tâches
    displayTasks: function(tasks) {
        const container = document.getElementById('tasksContainer');
        
        if (!tasks || tasks.length === 0) {
            container.innerHTML = `
                <div class="text-center py-5">
                    <i class="fas fa-tasks fa-3x text-muted mb-3"></i>
                    <h4 class="text-muted">Aucune tâche trouvée</h4>
                    <p class="text-muted">Créez votre première tâche en cliquant sur "Nouvelle Tâche"</p>
                </div>
            `;
            return;
        }
        
        const html = tasks.map(task => this.createTaskCard(task)).join('');
        container.innerHTML = html;
        
        // Ajouter les événements aux boutons
        this.attachTaskEvents();
    },
    
    // Créer une carte de tâche
    createTaskCard: function(task) {
        const priorityClass = this.getPriorityClass(task.priority);
        const statusClass = this.getStatusClass(task.status);
        const dueDate = task.dueDate ? new Date(task.dueDate) : null;
        const isOverdue = dueDate && dueDate < new Date() && task.status !== 'completed';
        
        return `
            <div class="card mb-3 ${isOverdue ? 'border-warning' : ''}">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                        <div class="flex-grow-1">
                            <h5 class="card-title mb-1">
                                ${this.escapeHtml(task.title)}
                                <span class="badge ${priorityClass} ms-2">${this.getPriorityText(task.priority)}</span>
                                <span class="badge ${statusClass} ms-1">${this.getStatusText(task.status)}</span>
                            </h5>
                            ${task.description ? `
                                <p class="card-text text-muted mb-2">${this.truncateText(this.escapeHtml(task.description), 100)}</p>
                            ` : ''}
                            <div class="text-muted small">
                                <i class="fas fa-project-diagram me-1"></i>
                                ${task.Project ? this.escapeHtml(task.Project.name) : 'Non assigné'}
                                ${task.dueDate ? `
                                    <span class="ms-3">
                                        <i class="fas fa-calendar-alt me-1"></i>
                                        ${this.formatDate(task.dueDate)}
                                        ${isOverdue ? '<span class="text-danger ms-1"><i class="fas fa-exclamation-triangle"></i> En retard</span>' : ''}
                                    </span>
                                ` : ''}
                            </div>
                        </div>
                        <div class="btn-group">
                            <button class="btn btn-sm btn-outline-primary edit-task" data-id="${task.id}">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger delete-task" data-id="${task.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    // Attacher les événements aux tâches
    attachTaskEvents: function() {
        // Boutons d'édition
        document.querySelectorAll('.edit-task').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const taskId = e.currentTarget.dataset.id;
                this.showTaskModal('edit', taskId);
            });
        });
        
        // Boutons de suppression
        document.querySelectorAll('.delete-task').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const taskId = e.currentTarget.dataset.id;
                this.showDeleteModal(taskId);
            });
        });
    },
    
    // Afficher le modal de tâche
    async showTaskModal(mode, taskId = null) {
        const modal = document.getElementById('taskModal');
        const title = document.getElementById('modalTitle');
        const form = document.getElementById('taskForm');
        const taskIdInput = document.getElementById('taskId');
        
        // Réinitialiser le formulaire
        form.reset();
        
        if (mode === 'create') {
            title.textContent = 'Nouvelle Tâche';
            taskIdInput.value = '';
            
            // Charger les projets
            await this.loadProjects();
            
            // Afficher le modal
            const bsModal = new bootstrap.Modal(modal);
            bsModal.show();
            
        } else if (mode === 'edit' && taskId) {
            title.textContent = 'Modifier la Tâche';
            
            try {
                // Charger la tâche
                const task = await this.apiCall(`/tasks/${taskId}`);
                
                // Remplir le formulaire
                taskIdInput.value = task.id;
                document.getElementById('taskTitle').value = task.title;
                document.getElementById('taskDescription').value = task.description || '';
                document.getElementById('taskPriority').value = task.priority || '2';
                document.getElementById('taskStatus').value = task.status || 'pending';
                document.getElementById('taskDueDate').value = task.dueDate ? task.dueDate.split('T')[0] : '';
                
                // Charger les projets et sélectionner le bon
                await this.loadProjects();
                const projectSelect = document.getElementById('taskProject');
                if (projectSelect && task.projectId) {
                    projectSelect.value = task.projectId;
                }
                
                // Afficher le modal
                const bsModal = new bootstrap.Modal(modal);
                bsModal.show();
                
            } catch (error) {
                this.showError('Erreur chargement tâche', error);
            }
        }
    },
    
    // Sauvegarder une tâche
    async saveTask() {
        try {
            const saveBtn = document.getElementById('saveTaskBtn');
            const btnText = saveBtn.querySelector('.btn-text');
            const btnLoader = saveBtn.querySelector('.btn-loader');
            
            // Afficher le loader
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
            saveBtn.disabled = true;
            
            // Récupérer les données
            const taskId = document.getElementById('taskId').value;
            const taskData = {
                title: document.getElementById('taskTitle').value.trim(),
                description: document.getElementById('taskDescription').value.trim(),
                projectId: parseInt(document.getElementById('taskProject').value),
                priority: parseInt(document.getElementById('taskPriority').value),
                status: document.getElementById('taskStatus').value,
                dueDate: document.getElementById('taskDueDate').value || null
            };
            
            // Validation
            if (!taskData.title) {
                throw new Error('Le titre est obligatoire');
            }
            if (!taskData.projectId) {
                throw new Error('Veuillez sélectionner un projet');
            }
            
            let response;
            if (taskId) {
                // Mettre à jour
                response = await this.apiCall(`/tasks/${taskId}`, 'PUT', taskData);
            } else {
                // Créer
                response = await this.apiCall('/tasks', 'POST', taskData);
            }
            
            // Fermer le modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
            modal.hide();
            
            // Recharger les tâches
            await this.loadTasks();
            
            // Afficher le message
            this.showSuccess(taskId ? 'Tâche mise à jour !' : 'Tâche créée !');
            
        } catch (error) {
            this.showError('Erreur sauvegarde', error);
        } finally {
            // Réinitialiser le bouton
            const saveBtn = document.getElementById('saveTaskBtn');
            const btnText = saveBtn.querySelector('.btn-text');
            const btnLoader = saveBtn.querySelector('.btn-loader');
            
            btnText.style.display = 'inline-block';
            btnLoader.style.display = 'none';
            saveBtn.disabled = false;
        }
    },
    
    // Afficher le modal de suppression
    showDeleteModal: function(taskId) {
        document.getElementById('confirmDeleteBtn').dataset.taskId = taskId;
        const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
        modal.show();
    },
    
    // Confirmer la suppression
    async deleteTaskConfirmed() {
        try {
            const taskId = document.getElementById('confirmDeleteBtn').dataset.taskId;
            
            // Supprimer la tâche
            await this.apiCall(`/tasks/${taskId}`, 'DELETE');
            
            // Fermer le modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('confirmModal'));
            modal.hide();
            
            // Recharger les tâches
            await this.loadTasks();
            
            // Afficher le message
            this.showSuccess('Tâche supprimée !');
            
        } catch (error) {
            this.showError('Erreur suppression', error);
        }
    },
    
    // Appel API générique
    async apiCall(endpoint, method = 'GET', data = null) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
        };
        
        const options = {
            method,
            headers
        };
        
        if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
            options.body = JSON.stringify(data);
        }
        
        try {
            console.log(`API Call: ${method} ${this.API_URL}${endpoint}`);
            const response = await fetch(`${this.API_URL}${endpoint}`, options);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || errorData.error || `Erreur ${response.status}`);
            }
            
            return await response.json();
            
        } catch (error) {
            console.error('API Error:', error);
            
            // Si le token est invalide
            if (error.message.includes('401') || error.message.includes('Unauthorized')) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = 'login.html';
            }
            
            throw error;
        }
    },
    
    // Utilitaires d'affichage
    showSuccess: function(message) {
        // Créer une notification simple
        const alert = document.createElement('div');
        alert.className = 'alert alert-success alert-dismissible fade show position-fixed';
        alert.style.cssText = 'top: 20px; right: 20px; z-index: 1050; max-width: 300px;';
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alert);
        
        // Auto-suppression après 3 secondes
        setTimeout(() => {
            if (alert.parentNode) {
                alert.parentNode.removeChild(alert);
            }
        }, 3000);
    },
    
    showError: function(title, error) {
        console.error(title, error);
        
        const message = error.message || 'Une erreur est survenue';
        const alert = document.createElement('div');
        alert.className = 'alert alert-danger alert-dismissible fade show position-fixed';
        alert.style.cssText = 'top: 20px; right: 20px; z-index: 1050; max-width: 300px;';
        alert.innerHTML = `
            <strong>${title}:</strong> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alert);
    },
    
    // Utilitaires de formatage
    formatDate: function(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR');
    },
    
    getStatusText: function(status) {
        const map = {
            'pending': 'En attente',
            'in_progress': 'En cours',
            'completed': 'Terminée'
        };
        return map[status] || status;
    },
    
    getStatusClass: function(status) {
        const map = {
            'pending': 'bg-secondary',
            'in_progress': 'bg-primary',
            'completed': 'bg-success'
        };
        return map[status] || 'bg-secondary';
    },
    
    getPriorityText: function(priority) {
        const map = {
            1: 'Basse',
            2: 'Moyenne',
            3: 'Haute'
        };
        return map[priority] || `Priorité ${priority}`;
    },
    
    getPriorityClass: function(priority) {
        const map = {
            1: 'bg-info',
            2: 'bg-primary',
            3: 'bg-danger'
        };
        return map[priority] || 'bg-secondary';
    },
    
    escapeHtml: function(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },
    
    truncateText: function(text, maxLength) {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
};

// Démarrer l'application
document.addEventListener('DOMContentLoaded', () => {
    TaskManager.init();
});