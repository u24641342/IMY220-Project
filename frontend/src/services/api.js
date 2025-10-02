const API_BASE_URL = '/api';

class ApiService {
    static async makeRequest(endpoint, options = {}) 
    {
        try 
        {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                ...options,
            });

            const data = await response.json();
            
            if (!response.ok)
            {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

///////////////////////////AUTH METHODS/////////////////////////////////////////////////////////////////
    static async signUp(userData) {
        return this.makeRequest('/signup', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    }

    static async signIn(credentials) {
        return this.makeRequest('/signin', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    }

/////////////////////////////////USER/////////////////////////////////////////////////////////////////
    static async getAllUsers() {
        return this.makeRequest('/users');
    }

    static async getUserById(userId) {
        return this.makeRequest(`/users/${userId}`);
    }

    static async updateUser(userId, updateData) {
        return this.makeRequest(`/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(updateData),
        });
    }

    static async deleteUser(userId) {
        return this.makeRequest(`/users/${userId}`, {
            method: 'DELETE',
        });
    }

    static async searchUsers(searchTerm) {
        return this.makeRequest(`/users/search/${encodeURIComponent(searchTerm)}`);
    }

/////////////////////////////////PROJECT/////////////////////////////////////////////////////////////////
    static async getAllProjects() {
        return this.makeRequest('/projects');
    }

    static async getProjectById(projectId) {
        return this.makeRequest(`/projects/${projectId}`);
    }

    static async createProject(projectData) {
        return this.makeRequest('/projects', {
            method: 'POST',
            body: JSON.stringify(projectData),
        });
    }

    static async updateProject(projectId, updateData) {
        return this.makeRequest(`/projects/${projectId}`, {
            method: 'PUT',
            body: JSON.stringify(updateData),
        });
    }

    static async deleteProject(projectId) {
        return this.makeRequest(`/projects/${projectId}`, {
            method: 'DELETE',
        });
    }

    static async getProjectsByUser(userId) {
        return this.makeRequest(`/projects/user/${userId}`);
    }

    static async searchProjects(searchTerm) {
        return this.makeRequest(`/projects/search/${encodeURIComponent(searchTerm)}`);
    }

/////////////////////////////////PROJECT MEMBER/////////////////////////////////////////////////////////////////
    static async addMemberToProject(projectId, memberId) {
        return this.makeRequest(`/projects/${projectId}/members`, {
            method: 'POST',
            body: JSON.stringify({ memberId }),
        });
    }

    static async removeMemberFromProject(projectId, memberId) {
        return this.makeRequest(`/projects/${projectId}/members/${memberId}`, {
            method: 'DELETE',
        });
    }

/////////////////////////////////PROJECT FILE ADD/////////////////////////////////////////////////////////////////
    static async addFileToProject(projectId, fileData) {
        return this.makeRequest(`/projects/${projectId}/files`, {
            method: 'POST',
            body: JSON.stringify(fileData),
        });
    }

    static async getFileFromProject(projectId, fileId) {
        return this.makeRequest(`/projects/${projectId}/files/${fileId}`, {
            method: 'GET',
        });
    }

    static async updateFileInProject(projectId, fileId, updateData) {
        return this.makeRequest(`/projects/${projectId}/files/${fileId}`, {
            method: 'PUT',
            body: JSON.stringify(updateData),
        });
    }

    static async removeFileFromProject(projectId, fileId) {
        return this.makeRequest(`/projects/${projectId}/files/${fileId}`, {
            method: 'DELETE',
        });
    }

/////////////////////////////////USER/////////////////////////////////////////////////////////////////
    static async addCheckIn(projectId, checkInData) {
        return this.makeRequest(`/projects/${projectId}/checkins`, {
            method: 'POST',
            body: JSON.stringify(checkInData),
        });
    }

    static async addCommentToCheckIn(projectId, checkInId, commentData) {
        return this.makeRequest(`/projects/${projectId}/checkins/${checkInId}/comments`, {
            method: 'POST',
            body: JSON.stringify(commentData),
        });
    }

/////////////////////////////////FRIENDS/////////////////////////////////////////////////////////////////
    static async sendFriendRequest(fromUserId, toUserId) {
        return this.makeRequest('/friends/request', {
            method: 'POST',
            body: JSON.stringify({ fromUserId, toUserId }),
        });
    }

    static async acceptFriendRequest(friendshipId) {
        return this.makeRequest(`/friends/${friendshipId}/accept`, {
            method: 'PUT',
            body: JSON.stringify({}),
        });
    }

    static async rejectFriendRequest(friendshipId) {
        return this.makeRequest(`/friends/${friendshipId}/reject`, {
            method: 'DELETE',
        });
    }

    static async removeFriend(userId1, userId2) {
        return this.makeRequest(`/friends/${userId1}/${userId2}`, {
            method: 'DELETE',
        });
    }

    static async getUserFriends(userId) {
        return this.makeRequest(`/friends/${userId}`);
    }

    static async getPendingFriendRequests(userId) {
        return this.makeRequest(`/friends/${userId}/pending`);
    }

    static async getFriendshipStatus(userId1, userId2) {
        return this.makeRequest(`/friends/status/${userId1}/${userId2}`);
    }

/////////////////////////////////FEED/////////////////////////////////////////////////////////////////
    static async getGlobalFeed() {
        return this.makeRequest('/feed/global');
    }

    static async getLocalFeed(userId) {
        return this.makeRequest(`/feed/local/${userId}`);
    }
}

/////////////////////////////////LOCAL STORAGE MANAGEMENT/////////////////////////////////////////////////////////////////
export const AuthService = {
    setToken(token) {
        localStorage.setItem('token', token);
    },

    getToken() {
        return localStorage.getItem('token');
    },

    setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    },

    getUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    isLoggedIn() {
        return !!this.getToken();
    }
};

export default ApiService;