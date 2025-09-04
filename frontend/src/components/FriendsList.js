import React from 'react';

function FriendsList({ friends }) {
    return (
        <ul  className="profile-notifications">
            {friends.map((friend, idx) => (
                <li key={idx}>
                    <img src={'/assets/images/pfp.png'} style={{ width: '30px', marginRight: '8px' }} />
                    {friend}
                </li>
            ))}
        </ul>
    );
}

export default FriendsList;
