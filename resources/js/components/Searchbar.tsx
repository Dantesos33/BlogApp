import { useState } from "react";
import { router } from "@inertiajs/react";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";
import { FaSearch } from "react-icons/fa";

const categories = ["All Topics", "Technology", "Design", "Science", "Culture", "Health"];

interface SearchbarProps {
  className?: string;
  placeholder?: string;
}

const Searchbar = ({ className = "", placeholder = "Search articles, topics, authors…" }: SearchbarProps) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(categories[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.get("/posts/search", { q: query, category });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center bg-white border-2 border-blue-100 focus-within:border-blue-500 rounded-xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-lg h-[52px] w-full min-w-[280px] max-w-[650px] ${className}`}
    >
      <Input
        type="text"
        name="q"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label="Search articles"
        className="flex-1 h-full"
      />

      <div className="hidden sm:block self-stretch w-[2px] bg-slate-100 my-2" />

      <Select
        name="category"
        options={categories}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="hidden sm:block"
      />

      <Button type="submit" variant="primary" stretch className="px-6 rounded-none">
        <FaSearch className="text-white" />
        <span className="hidden lg:inline">Search</span>
      </Button>
    </form>
  );
};

export default Searchbar;