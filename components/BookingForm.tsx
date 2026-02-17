import { Types } from "mongoose";
import BookEvent from "./BookEvent";
import BookingSucess from "./BookingSucess";

interface BookingDetails {
  bookings: number;
  maxSeats: number;
  bookedSeats: number;
  _id: Types.ObjectId;
  alreadyBooked: boolean;
}

function BookingForm({
  _id,
  maxSeats,
  bookedSeats,
  alreadyBooked,
}: BookingDetails) {
  const availableSeats = maxSeats - bookedSeats;

  return (
    <>
      {alreadyBooked ? (
        <BookingSucess />
      ) : (
        <>
          <div
            className="max-w-md mx-auto bg-[#0c2e249e] backdrop-blur-xl 
                border border-white/10 rounded-3xl p-8 shadow-2xl text-white"
          >
            {/* Heading */}
            <h2 className="text-2xl font-bold text-center mb-3">
              🎟️ Book Your Spot
            </h2>

            {/* Seat Info */}
            <div className="text-center text-sm text-emerald-100 mb-6 space-y-1">
              <p>
                Join{" "}
                <span className="font-semibold text-white">{bookedSeats}</span>{" "}
                people who already booked 🚀
              </p>
              <p>
                Hurry up ⌛ Only{" "}
                <span className="font-semibold text-white">
                  {availableSeats}
                </span>{" "}
                seats left
              </p>
            </div>

            {/* Form */}
            <BookEvent
              alreadyBooked={alreadyBooked}
              maxSeats={maxSeats}
              bookedSeats={bookedSeats}
              eventId={_id.toString()}
            />
          </div>
        </>
      )}
    </>
  );
}

export default BookingForm;
