export default function AddButton({ onClick }) {
  return (
    <button className="add-button" onClick={onClick} aria-label="Add dream card">
      +
    </button>
  );
}
