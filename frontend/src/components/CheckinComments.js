import React from 'react';
import './CommentsBox.css';

const checkinComments = [
	'Check in comment !michaelpog',
    'Added two old files (that arent useless screw you) via upload',
    'removed two useless files'
];

function CheckinComments() {
	return (
		<div className="comments-box">
			<h3>Check-in Comments</h3>
			<ul>
				{checkinComments.map((comment, idx) => (
					<li key={idx}>{comment}</li>
				))}
			</ul>
		</div>
	);
}

export default CheckinComments;
