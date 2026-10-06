export default function Stars({ rating, size = 14 }) {
  const rounded = Math.round(rating);
  return [1, 2, 3, 4, 5].map((i) => (
    <span key={i} className={`bi ${i <= rounded ? 'bi-star-fill' : 'bi-star'}`} style={{ fontSize: size }} />
  ));
}
