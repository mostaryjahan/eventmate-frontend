const HeroFilter = () => {
  return (
    <div className="w-full bg-white rounded-md shadow-lg p-8 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* Location */}
        <div className="border border-primary rounded-full px-5 py-3 flex items-center">
          <input
            type="text"
            placeholder="Event Location....."
            className="w-full bg-transparent outline-none text-sm"
          />
        </div>

        {/* Date */}
        <div className="border border-primary rounded-full px-5 py-3 flex items-center justify-between">
          <input
            type="date"
            className="w-full bg-transparent outline-none text-sm"
          />
        </div>

        {/* Category */}
        <div className="border border-primary rounded-full px-5 py-3 flex items-center justify-between">
          <input
            type="text"
            placeholder="Category"
            className="w-full bg-transparent outline-none text-sm"
          />
        </div>

        {/* Button */}
        <button className="bg-primary text-white rounded-full px-6 py-3 font-medium hover:bg-[#b20f3a]">
          Search Now
        </button>

      </div>
    </div>
  );
};

export default HeroFilter;
