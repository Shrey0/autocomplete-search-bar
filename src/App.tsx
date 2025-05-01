import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [cache, setCache] = useState({});

  const fetchData = async () => {
    if (cache[input]) {
      setResults(cache[input]);
      return;
    }
    const data = await fetch("https://dummyjson.com/recipes/search?q=" + input);
    const json = await data.json();
    setResults(json?.recipes);
    setCache((prev) => ({ ...prev, [input]: json?.recipes }));
  };
  3;

  useEffect(() => {
    const timer = setTimeout(fetchData, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <div className="App">
      <h1>AutoComplete SearchBar</h1>

      <div>
        <input
          type="text"
          className="search-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => {
            setShowResults(true);
          }}
          onBlur={() => setShowResults(false)}
        />
        {showResults && (
          <div className="results-contanier">
            {results.map((x) => (
              <span key={x.id} className="results">
                {x.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
