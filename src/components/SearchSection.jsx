const SearchSection = () =>{
    return(
        <div className="bg-gray-700  px-8 py-8 flex justify-between items-center">
            {/* search box */}
            <div className="">
                <input type="text"
                placeholder="Search Agent "
                className="w-full p-3 text-white border border-grey-400 rounded bg-slate-700" />
            </div>

            {/* create new agent button */}
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded ml-2">
                Create New AI Agent
            </button>

        </div>
    )
};
export default SearchSection;

