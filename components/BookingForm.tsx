import { Types } from "mongoose";
import BookEvent from "./BookEvent";

interface BookingDetails {
  bookings: number;
  _id: Types.ObjectId;
}

function BookingForm({ bookings, _id }: BookingDetails) {
  return (
    <aside className="booking-form">
      <div className="space-y-3 rounded-xl signup-card p-4 bg-[#0c2e249e]">
        <h2 className="flex justify-center font-semibold text-2xl">
          Book your spot{" "}
        </h2>

        {bookings > 0 ? (
          <p className="flex justify-center px-2">
            Join {bookings} people who have already booked their spot
          </p>
        ) : (
          <p className="text-sm">Be the first to book your spot </p>
        )}
        <BookEvent eventId={_id.toString()} />
      </div>
    </aside>
  );
}

export default BookingForm;
