import React from 'react';
import '../pages/Home.css';

function Feed() {
  return (
    <div className="feed-box">
      <h2>Feed</h2>
      <ul className="feed-list">
        <li>Project Numero Uno has had 41 commits in the last 24 hours</li>
        <li>michaelsRISEUP#80085 has commented on your profile: "oops. i made the project public for like 2 hours. my bad. pulling plugs."</li>
        <li>Project Numero Uno has had 4 different checkouts in the last 24 hours.</li>
        <li>Project Numero Uno's visibility has been set to public</li>
      </ul>
    </div>
  );
}

export default Feed;