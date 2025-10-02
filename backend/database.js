import { MongoClient, ObjectId } from 'mongodb';

const connectionString = "mongodb+srv://admin:admin@imy220-ass3.0bmh7gw.mongodb.net/?retryWrites=true&w=majority&appName=IMY220-ASS3";
const dbName = "GitGud";

let db = null;

export async function connectDB() 
{
    try 
    {
        const client = new MongoClient(connectionString);
        await client.connect();
        db = client.db(dbName);
        return db;
    } 
    catch (error) 
    {
        console.error("Database connection error:", error);
        throw error;
    }
}

export function getDB() 
{
    if (!db)
    {
        throw new Error("Database not initialized. Call connectDB() first.");
    }
    return db;
}

//////////////////////////////////////////USER//////////////////////////////////////////////////////////////////////////////////////////////
export class UserService 
{
    static async createUser(userData) 
    {
        try 
        {
            const db = getDB();
            const existingUser = await db.collection('users').findOne({ email: userData.email });
            
            if (existingUser)
            {
                throw new Error('User with this email already exists');
            }

            const user = {
                ...userData,
                createdAt: new Date(),
                profilePicture: userData.profilePicture || null,
                bio: userData.bio || "",
                skills: userData.skills || [],
                projects: [],
                friends: []
            };

            const result = await db.collection('users').insertOne(user);
            return { ...user, _id: result.insertedId };
        } 
        catch (error) 
        {
            throw error;
        }
    }

    static async getUserById(userId) 
    {
        try 
        {
            const db = getDB();
            const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
            return user;
        } 
        catch (error) 
        {
            throw error;
        }
    }

    static async getUserByEmail(email) 
    {
        try 
        {
            const db = getDB();
            const user = await db.collection('users').findOne({ email });
            return user;
        } 
        catch (error) 
        {
            throw error;
        }
    }

    static async updateUser(userId, updateData) 
    {
        try 
        {
            const db = getDB();
            const result = await db.collection('users').updateOne(
                { _id: new ObjectId(userId) },
                { $set: updateData }
            );
            
            if (result.matchedCount === 0)
            {
                throw new Error('User not found');
            }
            
            return await this.getUserById(userId);
        } 
        catch (error) 
        {
            throw error;
        }
    }

    static async deleteUser(userId) 
    {
        try 
        {
            const db = getDB();
            const result = await db.collection('users').deleteOne({ _id: new ObjectId(userId) });
            
            if (result.deletedCount === 0)
            {
                throw new Error('User not found');
            }
            
            return { message: 'User deleted successfully' };
        } 
        catch (error) 
        {
            throw error;
        }
    }

    static async getAllUsers() 
    {
        try 
        {
            const db = getDB();
            const users = await db.collection('users').find({}).toArray();
            return users;
        } 
        catch (error) 
        {
            throw error;
        }
    }

    static async searchUsers(searchTerm) 
    {
        try 
        {
            const db = getDB();
            const users = await db.collection('users').find({
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { email: { $regex: searchTerm, $options: 'i' } },
                    { skills: { $in: [new RegExp(searchTerm, 'i')] } }
                ]
            }).toArray();
            return users;
        } 
        catch (error) 
        {
            throw error;
        }
    }
}

////////////////////////////////////////////PROJECT//////////////////////////////////////////////////////////////////////////////////////////
export class ProjectService 
{
    static async createProject(projectData) 
    {
        try 
        {
            const db = getDB();
            const project = {
                ...projectData,
                createdAt: new Date(),
                members: projectData.members || [],
                checkIns: [],
                files: projectData.files || [],
                status: projectData.status || 'active',
                visibility: projectData.visibility || 'public'
            };

            const result = await db.collection('projects').insertOne(project);
            const newProject = { ...project, _id: result.insertedId };

            if (projectData.ownerId)
            {
                await db.collection('users').updateOne(
                    { _id: new ObjectId(projectData.ownerId) },
                    { $push: { projects: result.insertedId } }
                );
            }

            return newProject;
        } 
        catch (error) 
        {
            throw error;
        }
    }

    static async getProjectById(projectId) 
    {
        try 
        {
            const db = getDB();
            const project = await db.collection('projects').findOne({ _id: new ObjectId(projectId) });
            return project;
        } 
        catch (error) 
        {
            throw error;
        }
    }

    static async updateProject(projectId, updateData) 
    {
        try 
        {
            const db = getDB();
            const result = await db.collection('projects').updateOne(
                { _id: new ObjectId(projectId) },
                { $set: updateData }
            );
            
            if (result.matchedCount === 0)
            {
                throw new Error('Project not found');
            }
            
            return await this.getProjectById(projectId);
        } 
        catch (error) 
        {
            throw error;
        }
    }

    static async deleteProject(projectId) 
    {
        try 
        {
            const db = getDB();
            
            await db.collection('users').updateMany(
                { projects: new ObjectId(projectId) },
                { $pull: { projects: new ObjectId(projectId) } }
            );

            const result = await db.collection('projects').deleteOne({ _id: new ObjectId(projectId) });
            
            if (result.deletedCount === 0)
            {
                throw new Error('Project not found');
            }
            
            return { message: 'Project deleted successfully' };
        } 
        catch (error) 
        {
            throw error;
        }
    }

    static async getAllProjects() 
    {
        try 
        {
            const db = getDB();
            const projects = await db.collection('projects').find({}).toArray();
            return projects;
        } 
        catch (error) 
        {
            throw error;
        }
    }

    static async getProjectsByUser(userId) 
    {
        try 
        {
            const db = getDB();
            const projects = await db.collection('projects').find({
                $or: [
                    { ownerId: userId },
                    { members: userId }
                ]
            }).toArray();
            return projects;
        } 
        catch (error) 
        {
            throw error;
        }
    }

    static async addMemberToProject(projectId, memberId) 
    {
        try 
        {
            const db = getDB();
            const result = await db.collection('projects').updateOne(
                { _id: new ObjectId(projectId) },
                { $addToSet: { members: memberId } }
            );
            
            if (result.matchedCount === 0)
            {
                throw new Error('Project not found');
            }
            
            return await this.getProjectById(projectId);
        } 
        catch (error) 
        {
            throw error;
        }
    }

    static async removeMemberFromProject(projectId, memberId) 
    {
        try 
        {
            const db = getDB();
            const result = await db.collection('projects').updateOne(
                { _id: new ObjectId(projectId) },
                { $pull: { members: memberId } }
            );
            
            if (result.matchedCount === 0)
            {
                throw new Error('Project not found');
            }
            
            return await this.getProjectById(projectId);
        } 
        catch (error) 
        {
            throw error;
        }
    }

    static async addCheckIn(projectId, checkInData) 
    {
        try 
        {
            const db = getDB();
            const checkIn = {
                _id: new ObjectId(),
                ...checkInData,
                timestamp: new Date(),
                comments: []
            };

            const result = await db.collection('projects').updateOne(
                { _id: new ObjectId(projectId) },
                { $push: { checkIns: checkIn } }
            );
            
            if (result.matchedCount === 0)
            {
                throw new Error('Project not found');
            }
            
            return checkIn;
        } 
        catch (error) 
        {
            throw error;
        }
    }

    static async addCommentToCheckIn(projectId, checkInId, commentData) 
    {
        try 
        {
            const db = getDB();
            const comment = {
                _id: new ObjectId(),
                ...commentData,
                timestamp: new Date()
            };

            const result = await db.collection('projects').updateOne(
                { 
                    _id: new ObjectId(projectId),
                    "checkIns._id": new ObjectId(checkInId)
                },
                { $push: { "checkIns.$.comments": comment } }
            );
            
            if (result.matchedCount === 0)
            {
                throw new Error('Project or check-in not found');
            }
            
            return comment;
        } 
        catch (error) 
        {
            throw error;
        }
    }

    static async searchProjects(searchTerm) 
    {
        try 
        {
            const db = getDB();
            const projects = await db.collection('projects').find({
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { description: { $regex: searchTerm, $options: 'i' } },
                    { tags: { $in: [new RegExp(searchTerm, 'i')] } }
                ]
            }).toArray();
            return projects;
        } 
        catch (error) 
        {
            throw error;
        }
    }

    ///////////////////////////////////FILE MANAGING STUFF//////////////////////////////////////////////////////////////
    static async addFileToProject(projectId, fileData) 
    {
        try 
        {
            const db = getDB();
            const objectId = ObjectId.isValid(projectId) ? new ObjectId(projectId) : projectId;
            
            const fileObject = {
                _id: new ObjectId(),
                name: fileData.name,
                originalName: fileData.originalName || fileData.name,
                size: fileData.size || 0,
                type: fileData.type || 'application/octet-stream',
                uploadedBy: fileData.uploadedBy,
                uploadedAt: new Date(),
                content: fileData.content || null, // Base64 encoded content
                url: fileData.url || null // For external files
            };
            
            const result = await db.collection('projects').updateOne(
                { _id: objectId },
                { $addToSet: { files: fileObject } }
            );
            
            if (result.matchedCount === 0)
            {
                throw new Error('Project not found');
            }
            
            return await this.getProjectById(projectId);
        } 
        catch (error) 
        {
            throw error;
        }
    }

    static async removeFileFromProject(projectId, fileId) 
    {
        try 
        {
            const db = getDB();
            const projectObjectId = ObjectId.isValid(projectId) ? new ObjectId(projectId) : projectId;
            const fileObjectId = ObjectId.isValid(fileId) ? new ObjectId(fileId) : fileId;
            
            const result = await db.collection('projects').updateOne(
                { _id: projectObjectId },
                { $pull: { files: { _id: fileObjectId } } }
            );
            
            if (result.matchedCount === 0)
            {
                throw new Error('Project not found');
            }
            
            return await this.getProjectById(projectId);
        } 
        catch (error) 
        {
            throw error;
        }
    }

    static async updateFileInProject(projectId, fileId, updateData) 
    {
        try 
        {
            const db = getDB();
            const projectObjectId = ObjectId.isValid(projectId) ? new ObjectId(projectId) : projectId;
            const fileObjectId = ObjectId.isValid(fileId) ? new ObjectId(fileId) : fileId;
            
            const updateFields = {};
            if (updateData.name)
                updateFields['files.$.name'] = updateData.name;
            if (updateData.content)
                updateFields['files.$.content'] = updateData.content;
            if (updateData.type)
                updateFields['files.$.type'] = updateData.type;
            updateFields['files.$.updatedAt'] = new Date();
            
            const result = await db.collection('projects').updateOne(
                { _id: projectObjectId, 'files._id': fileObjectId },
                { $set: updateFields }
            );
            
            if (result.matchedCount === 0)
            {
                throw new Error('Project or file not found');
            }
            
            return await this.getProjectById(projectId);
        } 
        catch (error) 
        {
            throw error;
        }
    }

    static async getFileFromProject(projectId, fileId) 
    {
        try 
        {
            const db = getDB();
            const projectObjectId = ObjectId.isValid(projectId) ? new ObjectId(projectId) : projectId;
            const fileObjectId = ObjectId.isValid(fileId) ? new ObjectId(fileId) : fileId;
            
            const project = await db.collection('projects').findOne(
                { _id: projectObjectId },
                { projection: { files: 1 } }
            );
            
            if (!project)
            {
                throw new Error('Project not found');
            }
            
            const file = project.files.find(f => f._id.toString() === fileObjectId.toString());
            if (!file)
            {
                throw new Error('File not found');
            }
            
            return file;
        } 
        catch (error) 
        {
            throw error;
        }
    }
}

//////////////////////////////////FRIENDS//////////////////////////////////////////////////////////////////////
export class FriendsService 
{
    static async sendFriendRequest(fromUserId, toUserId) 
    {
        try 
        {
            const db = getDB();
            
            const existingFriendship = await db.collection('friends').findOne({
                $or: [
                    { user1: fromUserId, user2: toUserId },
                    { user1: toUserId, user2: fromUserId }
                ]
            });

            if (existingFriendship)
            {
                throw new Error('Friendship request already exists or users are already friends');
            }

            const friendship = {
                user1: fromUserId,
                user2: toUserId,
                status: 'pending',
                requestedBy: fromUserId,
                createdAt: new Date()
            };

            const result = await db.collection('friends').insertOne(friendship);
            return { ...friendship, _id: result.insertedId };
        } 
        catch (error) 
        {
            throw error;
        }
    }

    static async acceptFriendRequest(friendshipId) 
    {
        try 
        {
            const db = getDB();
            const result = await db.collection('friends').updateOne(
                { _id: new ObjectId(friendshipId) },
                { $set: { status: 'accepted' } }
            );
            
            if (result.matchedCount === 0)
            {
                throw new Error('Friend request not found');
            }
            
            return await db.collection('friends').findOne({ _id: new ObjectId(friendshipId) });
        } 
        catch (error) 
        {
            throw error;
        }
    }

    static async rejectFriendRequest(friendshipId) 
    {
        try 
        {
            const db = getDB();
            const result = await db.collection('friends').deleteOne({ _id: new ObjectId(friendshipId) });
            
            if (result.deletedCount === 0)
            {
                throw new Error('Friend request not found');
            }
            
            return { message: 'Friend request rejected' };
        } 
        catch (error) 
        {
            throw error;
        }
    }

    static async removeFriend(userId1, userId2) 
    {
        try 
        {
            const db = getDB();
            const result = await db.collection('friends').deleteOne({
                $or: [
                    { user1: userId1, user2: userId2 },
                    { user1: userId2, user2: userId1 }
                ]
            });
            
            if (result.deletedCount === 0)
            {
                throw new Error('Friendship not found');
            }
            
            return { message: 'Friend removed successfully' };
        } 
        catch (error) 
        {
            throw error;
        }
    }

    static async getUserFriends(userId) 
    {
        try 
        {
            const db = getDB();
            const friendships = await db.collection('friends').find({
                $and: [
                    {
                        $or: [
                            { user1: userId },
                            { user2: userId }
                        ]
                    },
                    { status: 'accepted' }
                ]
            }).toArray();

            const friendIds = friendships.map(friendship => 
                friendship.user1 === userId ? friendship.user2 : friendship.user1
            );

            const friends = await db.collection('users').find({
                _id: { $in: friendIds.map(id => new ObjectId(id)) }
            }).toArray();

            return friends;
        } 
        catch (error) 
        {
            throw error;
        }
    }

    static async getPendingFriendRequests(userId) 
    {
        try 
        {
            const db = getDB();
            const pendingRequests = await db.collection('friends').find({
                user2: userId,
                status: 'pending'
            }).toArray();

            const requesterIds = pendingRequests.map(req => new ObjectId(req.user1));
            const requesters = await db.collection('users').find({
                _id: { $in: requesterIds }
            }).toArray();

            return pendingRequests.map(request => {
                const requester = requesters.find(user => user._id.toString() === request.user1);
                return {
                    ...request,
                    requesterDetails: requester
                };
            });
        } 
        catch (error) 
        {
            throw error;
        }
    }

    static async getFriendshipStatus(userId1, userId2) 
    {
        try 
        {
            const db = getDB();
            const friendship = await db.collection('friends').findOne({
                $or: [
                    { user1: userId1, user2: userId2 },
                    { user1: userId2, user2: userId1 }
                ]
            });

            if (!friendship)
            {
                return { status: 'none' };
            }

            return friendship;
        } 
        catch (error) 
        {
            throw error;
        }
    }
}