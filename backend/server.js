import express from "express";
import path from "path";
import cors from "cors";
import { connectDB, UserService, ProjectService, FriendsService } from "./database.js";

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use(express.static("./frontend/public"));

connectDB().catch(console.error);

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};app.get("/api/friends/:userId/requests", asyncHandler(async (req, res) => {
    try 
    {
        const requests = await FriendsService.getFriendRequests(req.params.userId);
        res.json({ success: true, requests });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: error.message });
    }
}));//////////////////////////////AUTHENTICATION///////////////////////////////////////////////////////////
app.post("/api/signup", asyncHandler(async (req, res) => {
    try 
    {
        const { name, email, password, bio, skills, profilePicture } = req.body;
        
        if (!name || !email || !password)
        {
            return res.status(400).json({ 
                success: false, 
                message: "Name, email, and password are all required" 
            });
        }

        const user = await UserService.createUser({ 
            name, 
            email, 
            password, 
            bio, 
            skills, 
            profilePicture 
        });
        
        const { password: _, ...userResponse } = user;
        
        res.status(201).json({ 
            success: true, 
            message: "Welcome aboard brodie.", 
            user: userResponse 
        });
    } 
    catch (error) 
    {
        res.status(400).json({ 
            success: false, 
            message: error.message 
        });
    }
}));

app.post("/api/signin", asyncHandler(async (req, res) => {
    try 
    {
        const { email, password } = req.body;
        
        if (!email || !password)
        {
            return res.status(400).json({ 
                success: false, 
                message: "Email or password are missing" 
            });
        }

        const user = await UserService.getUserByEmail(email);
        
        if (!user || user.password !== password)
        {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid credentials" 
            });
        }

        const { password: _, ...userResponse } = user;
        
        res.json({ 
            success: true, 
            message: "Welcome back brodie.", 
            token: "brodie-token", 
            user: userResponse 
        });
    } 
    catch (error) 
    {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
}));

/////////////////////////////////USER/////////////////////////////////////////////////////////////////
app.get("/api/users", asyncHandler(async (req, res) => {
    try 
    {
        const users = await UserService.getAllUsers();

        const usersResponse = users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
        res.json({ success: true, users: usersResponse });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: error.message });
    }
}));

app.get("/api/users/:id", asyncHandler(async (req, res) => {
    try 
    {
        const user = await UserService.getUserById(req.params.id);
        if (!user)
        {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        const { password, ...userResponse } = user;
        res.json({ success: true, user: userResponse });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: error.message });
    }
}));

app.put("/api/users/:id", asyncHandler(async (req, res) => {
    try 
    {
        const updatedUser = await UserService.updateUser(req.params.id, req.body);
        
        const { password, ...userResponse } = updatedUser;
        res.json({ success: true, user: userResponse });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: error.message });
    }
}));

app.delete("/api/users/:id", asyncHandler(async (req, res) => {
    try 
    {
        const result = await UserService.deleteUser(req.params.id);
        res.json({ success: true, message: result.message });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: error.message });
    }
}));

app.get("/api/users/search/:term", asyncHandler(async (req, res) => {
    try 
    {
        const users = await UserService.searchUsers(req.params.term);

        const usersResponse = users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
        res.json({ success: true, users: usersResponse });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: error.message });
    }
}));

/////////////////////////////////PROJECT/////////////////////////////////////////////////////////////////
app.get("/api/projects", asyncHandler(async (req, res) => {
    try 
    {
        const projects = await ProjectService.getAllProjects();
        res.json({ success: true, projects });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: error.message });
    }
}));

app.get("/api/projects/:id", asyncHandler(async (req, res) => {
    try 
    {
        const project = await ProjectService.getProjectById(req.params.id);
        if (!project)
        {
            return res.status(404).json({ success: false, message: "Project not found" });
        }
        res.json({ success: true, project });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: error.message });
    }
}));

app.post("/api/projects", asyncHandler(async (req, res) => {
    try 
    {
        const { name, description, ownerId } = req.body;
        
        if (!name || !description || !ownerId)
        {
            return res.status(400).json({ 
                success: false, 
                message: "Name, description, and ownerId are all required" 
            });
        }

        const project = await ProjectService.createProject(req.body);
        res.status(201).json({ success: true, project });
    } 
    catch (error) 
    {
        res.status(400).json({ success: false, message: error.message });
    }
}));

app.put("/api/projects/:id", asyncHandler(async (req, res) => {
    try 
    {
        const updatedProject = await ProjectService.updateProject(req.params.id, req.body);
        res.json({ success: true, project: updatedProject });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: error.message });
    }
}));

app.delete("/api/projects/:id", asyncHandler(async (req, res) => {
    try 
    {
        const result = await ProjectService.deleteProject(req.params.id);
        res.json({ success: true, message: result.message });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: error.message });
    }
}));

app.get("/api/projects/user/:userId", asyncHandler(async (req, res) => {
    try 
    {
        const projects = await ProjectService.getProjectsByUser(req.params.userId);
        res.json({ success: true, projects });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: error.message });
    }
}));

app.get("/api/projects/search/:term", asyncHandler(async (req, res) => {
    try 
    {
        const projects = await ProjectService.searchProjects(req.params.term);
        res.json({ success: true, projects });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: error.message });
    }
}));

// PROJECT MEMBER ROUTES
app.post("/api/projects/:id/members", asyncHandler(async (req, res) => {
    try 
    {
        const { memberId } = req.body;
        
        if (!memberId)
        {
            return res.status(400).json({ 
                success: false, 
                message: "memberId is required" 
            });
        }

        const project = await ProjectService.addMemberToProject(req.params.id, memberId);
        res.json({ success: true, project });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: error.message });
    }
}));

app.delete("/api/projects/:id/members/:memberId", asyncHandler(async (req, res) => {
    try 
    {
        const project = await ProjectService.removeMemberFromProject(req.params.id, req.params.memberId);
        res.json({ success: true, project });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: error.message });
    }
}));

/////////////////////PROJECT FILE UPLOADING/////////////////////////////////////////////////////////////////
app.post("/api/projects/:id/files", asyncHandler(async (req, res) => {
    try 
    {
        const { name, originalName, size, type, uploadedBy, content, url } = req.body;
        
        if (!name || !uploadedBy)
        {
            return res.status(400).json({ 
                success: false, 
                message: "Name and uploadedBy are required" 
            });
        }

        const fileData = {
            name,
            originalName,
            size,
            type,
            uploadedBy,
            content,
            url
        };
        
        const project = await ProjectService.addFileToProject(req.params.id, fileData);
        res.json({ success: true, project });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: error.message });
    }
}));

app.get("/api/projects/:id/files/:fileId", asyncHandler(async (req, res) => {
    try 
    {
        const file = await ProjectService.getFileFromProject(req.params.id, req.params.fileId);
        res.json({ success: true, file });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: error.message });
    }
}));

app.put("/api/projects/:id/files/:fileId", asyncHandler(async (req, res) => {
    try 
    {
        const { name, content, type } = req.body;
        
        const updateData = {};
        if (name)
            updateData.name = name;
        if (content)
            updateData.content = content;
        if (type)
            updateData.type = type;
        
        const project = await ProjectService.updateFileInProject(req.params.id, req.params.fileId, updateData);
        res.json({ success: true, project });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: error.message });
    }
}));

app.delete("/api/projects/:id/files/:fileId", asyncHandler(async (req, res) => {
    try 
    {
        const project = await ProjectService.removeFileFromProject(req.params.id, req.params.fileId);
        res.json({ success: true, project });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: error.message });
    }
}));

/////////////////////////////////CHECK IN MESSAGES/////////////////////////////////////////////////////////////////
app.post("/api/projects/:id/checkins", asyncHandler(async (req, res) => {
    try 
    {
        const { userId, message, progress } = req.body;
        
        if (!userId || !message)
        {
            return res.status(400).json({ 
                success: false, 
                message: "userId and message are required" 
            });
        }

        const checkIn = await ProjectService.addCheckIn(req.params.id, {
            userId,
            message,
            progress: progress || 0
        });
        
        res.status(201).json({ success: true, checkIn });
    } 
    catch (error) 
    {
        res.status(400).json({ success: false, message: error.message });
    }
}));

app.post("/api/projects/:projectId/checkins/:checkInId/comments", asyncHandler(async (req, res) => {
    try 
    {
        const { userId, message } = req.body;
        
        if (!userId || !message)
        {
            return res.status(400).json({ 
                success: false, 
                message: "userId and message are required" 
            });
        }

        const comment = await ProjectService.addCommentToCheckIn(
            req.params.projectId, 
            req.params.checkInId, 
            { userId, message }
        );
        
        res.status(201).json({ success: true, comment });
    } 
    catch (error) 
    {
        res.status(400).json({ success: false, message: error.message });
    }
}));

/////////////////////////////////FRIENDS/////////////////////////////////////////////////////////////////
app.post("/api/friends/request", asyncHandler(async (req, res) => {
    try 
    {
        const { fromUserId, toUserId } = req.body;
        
        if (!fromUserId || !toUserId)
        {
            return res.status(400).json({ 
                success: false, 
                message: "fromUserId and toUserId are required" 
            });
        }

        if (fromUserId === toUserId)
        {
            return res.status(400).json({ 
                success: false, 
                message: "Cannot send friend request to yourself" 
            });
        }

        const friendship = await FriendsService.sendFriendRequest(fromUserId, toUserId);
        res.status(201).json({ success: true, friendship });
    } 
    catch (error) 
    {
        res.status(400).json({ success: false, message: error.message });
    }
}));

app.put("/api/friends/:id/accept", asyncHandler(async (req, res) => {
    try 
    {
        const friendship = await FriendsService.acceptFriendRequest(req.params.id);
        res.json({ success: true, friendship });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: error.message });
    }
}));

app.delete("/api/friends/:id/reject", asyncHandler(async (req, res) => {
    try 
    {
        const result = await FriendsService.rejectFriendRequest(req.params.id);
        res.json({ success: true, message: result.message });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: error.message });
    }
}));

app.delete("/api/friends/:userId1/:userId2", asyncHandler(async (req, res) => {
    try 
    {
        const result = await FriendsService.removeFriend(req.params.userId1, req.params.userId2);
        res.json({ success: true, message: result.message });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: error.message });
    }
}));

app.get("/api/friends/:userId", asyncHandler(async (req, res) => {
    try 
    {
        const friends = await FriendsService.getUserFriends(req.params.userId);
        res.json({ success: true, friends });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: error.message });
    }
}));

app.get("/api/friends/:userId/pending", asyncHandler(async (req, res) => {
    try 
    {
        const pendingRequests = await FriendsService.getPendingFriendRequests(req.params.userId);
        res.json({ success: true, pendingRequests });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: error.message });
    }
}));

app.get("/api/friends/status/:userId1/:userId2", asyncHandler(async (req, res) => {
    try 
    {
        const status = await FriendsService.getFriendshipStatus(req.params.userId1, req.params.userId2);
        res.json({ success: true, status });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: error.message });
    }
}));

/////////////////////////////////FEED/////////////////////////////////////////////////////////////////
app.get("/api/feed/global", asyncHandler(async (req, res) => {
    try 
    {
        const projects = await ProjectService.getAllProjects();
        const feedItems = [];
        
        if (projects.length === 0)
        {
            feedItems.push({
                type: 'welcome',
                message: 'Welcome to GitGud! No projects yet - be the first to create one!',
                timestamp: new Date()
            });
        }
        else
        {
            projects.forEach(project => {

                if (project.checkIns && project.checkIns.length > 0) 
                    {
                    const latestCheckIn = project.checkIns[project.checkIns.length - 1];
                    const checkInDate = new Date(latestCheckIn.timestamp);
                    
                    feedItems.push({
                        type: 'checkin',
                        projectName: project.name,
                        projectId: project._id,
                        message: latestCheckIn.message,
                        timestamp: checkInDate,
                        author: latestCheckIn.userId
                    });
                }
                
                const projectCreated = new Date(project.createdAt);
                const daysSinceCreated = (new Date() - projectCreated) / (1000 * 60 * 60 * 24);
                
                if (daysSinceCreated <= 7)
                {
                    feedItems.push({
                        type: 'project_created',
                        projectName: project.name,
                        projectId: project._id,
                        message: `New project "${project.name}" was created`,
                        timestamp: projectCreated,
                        author: project.ownerId
                    });
                }
            });
        }
        
        feedItems.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        res.json({ success: true, feedItems: feedItems.slice(0, 20) });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: error.message });
    }
}));

app.get("/api/feed/local/:userId", asyncHandler(async (req, res) => {
    try 
    {
        const userId = req.params.userId;
        
        const userFriends = await FriendsService.getUserFriends(userId);
        const friendIds = userFriends.map(friend => friend._id);
        
        const userProjects = await ProjectService.getProjectsByUser(userId);
        
        const allProjects = await ProjectService.getAllProjects();
        const memberProjects = allProjects.filter(project => 
            project.members && project.members.includes(userId)
        );
        
        const friendProjects = allProjects.filter(project => 
            friendIds.includes(project.ownerId) || 
            (project.members && project.members.some(memberId => friendIds.includes(memberId)))
        );
        
        const relevantProjects = [...userProjects, ...memberProjects, ...friendProjects];
        
        const uniqueProjects = relevantProjects.filter((project, index, self) => 
            index === self.findIndex(p => p._id.toString() === project._id.toString())
        );
        
        const feedItems = [];
        
        if (uniqueProjects.length === 0)
        {
            feedItems.push({
                type: 'local_welcome',
                message: 'Your local feed is empty. Do something damn it',
                timestamp: new Date()
            });
        }
        else
        {
            uniqueProjects.forEach(project => {
                if (project.checkIns && project.checkIns.length > 0) 
                    {
                    const latestCheckIn = project.checkIns[project.checkIns.length - 1];
                    const checkInDate = new Date(latestCheckIn.timestamp);
                    
                    feedItems.push({
                        type: 'local_checkin',
                        projectName: project.name,
                        projectId: project._id,
                        message: latestCheckIn.message,
                        timestamp: checkInDate,
                        author: latestCheckIn.userId,
                        isOwner: project.ownerId === userId,
                        isMember: project.members && project.members.includes(userId)
                    });
                }
            });
        }
        
        feedItems.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        res.json({ success: true, feedItems: feedItems.slice(0, 20) });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));

app.use((error, req, res, next) => {
    console.error("Error:", error);
    res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
    });
});

app.use((req, res) => {
    res.sendFile("index.html", { root: "frontend/public" });
});

app.listen(3000, () => {
    console.log("Listening on localhost:3000");
});