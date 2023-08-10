import { useRef } from "react";
import { useKey } from "../../useKey";

function SearchBox({ query, setQuery }) {
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current?.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      ref={inputEl}
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default SearchBox;
