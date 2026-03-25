import "./CommentCard.css";

export const CommentCard = ({ comment }) => {
  return (
    <article className="comment-card">
      <div className="comment-card__header">
        <h3 className="comment-card__name">{comment.name}</h3>
        <span className="comment-card__date">{comment.createdAt}</span>
      </div>

      <p className="comment-card__text">{comment.text}</p>
    </article>
  );
};