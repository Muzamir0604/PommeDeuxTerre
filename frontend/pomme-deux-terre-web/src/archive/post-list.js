import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'


function PostList(props){

  const loadPost = post => evt => {
    props.loadPost(post);
  };
  const editClicked = post => evt => {
    props.editClicked(post);
  };
  const removeClicked = post => evt => {
    fetch(`${process.env.REACT_APP_API_URL}/blog/posts/${post.id}/`,
      {
        method:'DELETE',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Token ${props.token}`
        },
      }).then (resp => props.postDeleted(post))
      .catch(error => console.log(error))
  };
  const newPost=()=>{
    props.newPost();
  }

  return(
    <div>
    { props.posts.map( post => {
      return (
        
        <div key={post.id} className="post-item">
          <h3 onClick={loadPost(post)}>{post.title}</h3>
          <FontAwesomeIcon icon={faEdit} onClick={editClicked(post)} />
          <FontAwesomeIcon icon={faTrash} onClick={removeClicked(post)}/>
        </div>
      )
    })}
    <button onClick={newPost}>Add New</button>
  </div>
  )
}


export default PostList;
