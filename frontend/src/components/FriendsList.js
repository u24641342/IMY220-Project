import React from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../services/api';

function FriendsList({ friends, isOwnProfile, currentUserId, profileUserId }) {
    const [localFriends, setLocalFriends] = React.useState(friends || []);
    const [friendshipStatus, setFriendshipStatus] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLocalFriends(friends || []);
        console.log('FriendsList props:', { friends, isOwnProfile, currentUserId, profileUserId });
    }, [friends]);

    React.useEffect(() => {
        if (!isOwnProfile && currentUserId && profileUserId && currentUserId !== profileUserId) 
        {
            checkFriendshipStatus();
        }
    }, [isOwnProfile, currentUserId, profileUserId]);

    const checkFriendshipStatus = async () => {
        try 
        {
            const response = await ApiService.getFriendshipStatus(currentUserId, profileUserId);
            console.log('Friendship status:', response);
            if (response.success) 
            {
                setFriendshipStatus(response.status);
            }
        } 
        catch (error) 
        {
            console.error('Error checking friendship status:', error);
        }
    };

    const handleRemoveFriend = async (friendId) => {
        if (!isOwnProfile) return;
        
        try 
        {
            setLoading(true);
            await ApiService.removeFriend(currentUserId, friendId);
            setLocalFriends(localFriends.filter(friend => friend._id !== friendId));
            alert('Friend removed successfully!');
        } 
        catch (error) 
        {
            console.error('Error removing friend:', error);
            alert(`Error removing friend: ${error.message}`);
        } 
        finally 
        {
            setLoading(false);
        }
    };

    const handleSendFriendRequest = async () => {
        if (isOwnProfile || !currentUserId) return;
        
        try 
        {
            setLoading(true);
            await ApiService.sendFriendRequest(currentUserId, profileUserId);
            setFriendshipStatus({ status: 'pending', requestedBy: currentUserId });
            alert('Friend request sent!');
        } 
        catch (error) 
        {
            console.error('Error sending friend request:', error);
            alert(`Error sending friend request: ${error.message}`);
        } 
        finally 
        {
            setLoading(false);
        }
    };

    const renderFriendRequestButton = () => {
        if (isOwnProfile || !currentUserId || loading) return null;

        if (!friendshipStatus || friendshipStatus.status === 'none') 
        {
            return (
                <button 
                    onClick={handleSendFriendRequest}
                    disabled={loading}
                    style={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.6 : 1
                    }}
                >
                    {loading ? 'Sending...' : 'Send Friend Request'}
                </button>
            );
        } 
        else if (friendshipStatus.status === 'pending') 
        {
            return (
                <div style={{ 
                    padding: '10px 20px', 
                    backgroundColor: '#ff9800', 
                    color: 'white', 
                    borderRadius: '5px',
                    textAlign: 'center'
                }}>
                    {friendshipStatus.requestedBy === currentUserId ? 'Friend Request Sent' : 'Friend Request Pending'}
                </div>
            );
        } 
        else if (friendshipStatus.status === 'accepted') 
        {
            return (
                <div style={{ 
                    padding: '10px 20px', 
                    backgroundColor: '#2196F3', 
                    color: 'white', 
                    borderRadius: '5px',
                    textAlign: 'center'
                }}>
                    Friends
                </div>
            );
        }
    };

    return (
        <div>
            {!isOwnProfile && currentUserId && (
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    {renderFriendRequestButton()}
                </div>
            )}
            
            <ul className="profile-notifications">
                {localFriends.length > 0 ? (
                    localFriends.map((friend) => (
                        <li key={friend._id} style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            padding: '10px 0'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img 
                                    src={friend.profilePicture || '/assets/images/pfp.png'} 
                                    style={{ width: '30px', marginRight: '8px', borderRadius: '50%' }} 
                                />
                                <Link 
                                    to={`/profile/${friend._id}`}
                                    style={{ 
                                        color: '#fff', 
                                        textDecoration: 'none',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {friend.name}
                                </Link>
                                {friend.bio && (
                                    <span style={{ 
                                        color: '#aaa', 
                                        fontSize: '12px', 
                                        marginLeft: '10px' 
                                    }}>
                                        {friend.bio.length > 50 ? friend.bio.substring(0, 50) + '...' : friend.bio}
                                    </span>
                                )}
                            </div>
                            {isOwnProfile && (
                                <button 
                                    onClick={() => handleRemoveFriend(friend._id)}
                                    disabled={loading}
                                    style={{
                                        backgroundColor: '#f44336',
                                        color: 'white',
                                        border: 'none',
                                        padding: '5px 10px',
                                        borderRadius: '3px',
                                        fontSize: '12px',
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        opacity: loading ? 0.6 : 1
                                    }}
                                >
                                    {loading ? 'Removing...' : 'Remove'}
                                </button>
                            )}
                        </li>
                    ))
                ) : (
                    <li style={{ color: '#ccc', textAlign: 'center', padding: '20px' }}>
                        {isOwnProfile ? 'No friends yet' : 'This user has no public friends'}
                    </li>
                )}
            </ul>
        </div>
    );
}

export default FriendsList;
