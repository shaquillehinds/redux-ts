import { useState, useRef, useEffect } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState("");
  const { searchRepositories } = useActions();
  const inputElement = useRef<HTMLInputElement | null>(null);
  const { loading, data, error } = useTypedSelector(
    (state) => state.repositories
  );
  useEffect(() => {
    inputElement.current?.focus();
  }, []);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTerm(e.target.value);
  };
  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const element = inputElement.current;
    if (element) {
      searchRepositories(element.value);
      setTerm("");
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input ref={inputElement} onChange={onChange} value={term} />
        <input type="submit" value="Search" />
      </form>
      <ul>{data && data.map((name, index) => <li key={index}>{name}</li>)}</ul>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default RepositoriesList;
