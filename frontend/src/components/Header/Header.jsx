import CreateProduct from "../CreateProduct/CreateProduct";

const Header = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
    <header className="bg-white shadow p-4 flex items-center justify-between">
      {/* Search Input */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
        className="border border-gray-300 rounded px-3 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <CreateProduct />
    </header>
</div>


  );
};

export default Header;
