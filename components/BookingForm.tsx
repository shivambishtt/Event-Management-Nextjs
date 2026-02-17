import { Types } from "mongoose";
import BookEvent from "./BookEvent";

interface BookingDetails {
  bookings: number;
  maxSeats: number;
  bookedSeats: number;
  _id: Types.ObjectId;
}

function BookingForm({ bookings, _id, maxSeats, bookedSeats }: BookingDetails) {
  const availableSeats = maxSeats - bookedSeats;
  return (
    <aside className="booking-form">
      <div className="space-y-3 rounded-xl signup-card p-4 bg-[#0c2e249e]">
        <h2 className="flex justify-center font-semibold text-2xl">
          Book your spot{" "}
        </h2>

        {bookings > 0 ? (
          <p className="flex justify-center text-center px-2">
            Join {bookedSeats} people who already booked their spot 🚀 <br />
            Hurry up⌛! Only {availableSeats} seats are left
          </p>
        ) : (
          <p className="text-sm">Be the first to book your spot </p>
        )}
        <BookEvent
          maxSeats={maxSeats}
          bookedSeats={bookedSeats}
          eventId={_id.toString()}
        />
      </div>
    </aside>
  );
}

export default BookingForm;
