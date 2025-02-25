export default function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">
        <em>Start adding items to your packing list... 🚀</em>
      </p>
    );
  }
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percent = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percent === 100
          ? `Everything Ready! You are good to go ✈️`
          : `💼 You have ${numItems} items on your list, and you already packed 
        ${numPacked} (${percent > 0 ? percent : 0}%) `}
      </em>
    </footer>
  );
}
