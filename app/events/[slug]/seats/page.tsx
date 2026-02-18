import Event from "@/models/EventModel";

async function Seats({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const event = await Event.findOne({ slug });
  const rows = 10;
  const columns = 5;
  const seats: string[] = [];

  for (let i = 0; i < rows; i++) {
    const rowLetters = String.fromCharCode(65 + i);

    for (let j = 1; j <= columns; j++) {
      seats.push(`${rowLetters}${j}`);
    }
  }

  return (
    <div className="relative">
      <h1>{event?.title}</h1>
      <div className="flex items-center justify-between">
        <div className="h-10 w-8 mt-10 border-black flex flex-col bg-emerald-500  text-center items-center justify-center rounded-t-sm">
          <div>
            <p className="text-sm font-semibold">EXIT</p>
          </div>
        </div>

        <div className="h-10 w-8 mt-10 border-black flex flex-col bg-emerald-500  text-center items-center justify-center rounded-t-sm">
          <div>
            <p className="text-sm font-semibold">EXIT</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-10">
        {/* Screen */}
        <div
          className="w-3/4 h-16 bg-linear-to-b from-gray-200 to-gray-400 
                  rounded-t-[40px] shadow-lg flex items-center justify-center"
        >
          <span className="text-gray-700 font-semibold tracking-wide">
            STAGE THIS SIDE
          </span>
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">
          All seats face this direction
        </p>

        {/* Stage Shadow */}
        <div className="w-2/3 h-2 bg-gray-500 rounded-full blur-sm mt-2 opacity-50" />
      </div>

      <div className="grid grid-cols-10 gap-4 justify-items-center mt-8">
        {seats.map((seat) => (
          <div
            key={seat}
            className="flex flex-col items-center cursor-pointer group"
          >
            {/* Chair Seat */}
            <div
              className="w-8 h-6 bg-gray-700 rounded-t-md 
                      group-hover:bg-emerald-500 transition"
            />

            {/* Chair Back */}
            <div
              className="w-10 h-3 bg-gray-600 rounded-b-md 
                      group-hover:bg-emerald-400 transition"
            />

            {/* Seat Label */}
            <span className="text-xs mt-1 text-gray-400">{seat}</span>
          </div>
        ))}
        <div
          className=" bg-black/60 backdrop-blur-md 
                    p-4 rounded-xl shadow-lg text-sm"
        >
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">
            Seat Status
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-600 rounded-sm"></div>
              <span>Available</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
              <span>Selected</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
              <span>Booked</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Seats;
