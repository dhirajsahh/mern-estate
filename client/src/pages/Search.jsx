import React from "react";
import { Link } from "react-router-dom";

const Search = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col flex-wrap gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Search Term</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border p-3 rounded-lg w-full"
            />
          </div>
          <div className="flex items-center flex-wrap gap-2">
            <label className="font-semibold">Type</label>
            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-5" />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex items-center flex-wrap gap-2">
            <label className="font-semibold">Amenities</label>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <label className="font-semibold">Sort:</label>
            <select name="" id="sort_order" className="border p-3 rounded-lg">
              <option value="">Price high to low</option>
              <option value="">Price low to high</option>
              <option value="">Latest</option>
              <option value="">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 p-3 rounded-lg text-white hover:opacity-95 uppercase">
            Search
          </button>
        </form>
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          LIsting results:
        </h1>
      </div>
    </div>
  );
};

export default Search;
