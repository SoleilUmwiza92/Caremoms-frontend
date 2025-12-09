import React, { useEffect, useState } from "react";
import { fetchComments, createComment } from "../api/comments";
import useAuth from "../auth/useAuth";

export default function Comments({ postId }) {
  const { token } = useAuth();
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  const loadComments = async () => {
    const data = await fetchComments(token, postId);
    setComments(data);
  };

  useEffect(()=>{ loadComments(); }, [postId]);

  const submitComment = async () => {
    if(!content.trim()) return;
    await createComment(token, postId, { content });
    setContent("");
    loadComments();
  };

  return (
    <div style={{marginLeft:"20px"}}>
      <input value={content} onChange={e=>setContent(e.target.value)} placeholder="Comment..." />
      <button onClick={submitComment}>Comment</button>
      <div>
        {comments.map(c => (
          <div key={c.id}><strong>{c.user.username}</strong>: {c.content}</div>
        ))}
      </div>
    </div>
  );
}
