import mongoose, { Schema, Document, Types } from "mongoose";
import Event from "./EventModel";

interface Booking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<Booking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (email: string) {
          const validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return validRegex.test(email);
        },
        message: "Please provide a valid email address",
      },
    },
  },
  {
    timestamps: true,
  },
);

//hooks
BookingSchema.pre("save", async function (next) {
  const booking = this as Booking;

  if (booking.isModified("eventId") || booking.isNew) {
    try {
      const eventExists = await Event.findById(booking.eventId).select("_id");
      if (!eventExists) {
        const error = new Error(
          `Event with  ID${booking.eventId} does not exists`,
        );
        error.name = "validationError";
        return next(error);
      }
    } catch (error: unknown) {
      const validationError = new Error(
        "Invalid events ID format or database error",
      );
      validationError.name = "ValidationError";
      return next(validationError);
    }
  }
  next();
});
BookingSchema.index({ eventId: 1 });

// Create compound index for common queries (events bookings by date)
BookingSchema.index({ eventId: 1, createdAt: -1 });

// Create index on email for user booking lookups
BookingSchema.index({ email: 1 });

// Enforce one booking per events per email
BookingSchema.index(
  { eventId: 1, email: 1 },
  { unique: true, name: "uniq_event_email" },
);
const Booking =
  (mongoose.models.Booking as mongoose.Model<Booking>) ||
  mongoose.model<Booking>("Booking", BookingSchema);

export default Booking;
