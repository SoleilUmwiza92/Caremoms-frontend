import { useEffect, useState } from "react";
import { CommentsAPI } from "../api/comments";

export function useComments(postId) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      setComments(await CommentsAPI.getComments(postId));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!postId) return;
    load();
  }, [postId]);

  return { comments, loading, reload: load, add: (payload) => CommentsAPI.addComment(postId, payload), deleteComment: CommentsAPI.deleteComment };
}
