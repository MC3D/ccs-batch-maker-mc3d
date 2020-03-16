import React from 'react';

function ProfileList(props) {
  // console.log(props);

  const users = props.users.map(user => (
    <li key={user.id}>
      <h1>{user.username}</h1>
      <p>{user.profile && user.profile.city}</p>
      <h2>Following</h2>
      {user.following && user.following.map(user => <p>{user.following.username}</p>)}
      <h2>Followers</h2>
      {user.followers && user.followers.map(user => <p>{user.user.username}</p>)}
    </li>
  ))



  return (
    <ul>{users}</ul>
  );
}

export default ProfileList;
