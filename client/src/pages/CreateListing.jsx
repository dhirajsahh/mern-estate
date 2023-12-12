import React from "react";

const CreateListing = () => {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            id="name"
            className="border rounded-lg p-3 focus:outline-none "
            required
            maxLength="50"
            minLength="5"
          />
          <textarea
            type="text"
            placeholder="Description"
            id="description"
            className="border rounded-lg p-3 focus:outline-none "
            required
          />
          <input
            type="text"
            placeholder="Address"
            id="adress"
            className="border rounded-lg p-3 focus:outline-none "
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parkingspot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex  flex-wrap gap-6">
            <div className="flex gap-2 items-center">
              <input
                className="p-3 border rounded-lg border-gray-300"
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
              />
              <p>Beds</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                className="p-3 border rounded-lg border-gray-300"
                type="number"
                id="bathroom"
                min="1"
                max="10"
                required
              />
              <p>Baths</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                className="p-3 border rounded-lg border-gray-300"
                type="number"
                id="regularprice"
                min="1"
                max="10"
                required
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-xs">($ / Month)</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <input
                className="p-3 border rounded-lg border-gray-300"
                type="number"
                id="discountedprice"
                min="1"
                max="10"
                required
              />
              <div className="flex items-center flex-col">
                <p>Discounted price</p>
                <span className="text-xs">($ / Month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded-lg w-full"
              type="file"
              id="images"
              accept="images/*"
              multiple
            />
            <button className="p-3 text-green-700 border border-green-700 uppercase hover:shadow-lg disabled:opacity-80 rounded">
              Upload
            </button>
          </div>
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
