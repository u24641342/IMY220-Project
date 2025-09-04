import React, { useState } from 'react';
import './CommentsBox.css';

function CommentsBox({ comments }) {
    const [showFull, setShowFull] = useState(false);
    const previewLength = 120;
    const displayedComments = showFull ? comments : comments.map(c => c.length > previewLength ? c.slice(0, previewLength) + '...' : c);

    return (
        <div className="comments-box">
            <h3>Comments</h3>
            <ul>
                {displayedComments.map((comment, idx) => (
                    <li key={idx}>{comment}</li>
                ))}
            </ul>
            {comments.some(c => c.length > previewLength) && (
                <button className="comments-readmore-btn" onClick={() => setShowFull(!showFull)}>
                    {showFull ? 'Show less' : 'Read more'}
                </button>
            )}
        </div>
    );
}

export default CommentsBox;
