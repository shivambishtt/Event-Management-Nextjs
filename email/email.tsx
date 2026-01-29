interface BookingEmailProps {
  name?: string;
  email?: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventMode: string;
  organizer?: string;
}
function BookingEmailValidation({
  eventTitle,
  eventDate,
  eventTime,
  eventLocation,
  eventMode,
  organizer,
}: BookingEmailProps) {
  return (
    <div>
      <div style={{ fontFamily: "Arial, sans-serif", color: "#333" }}>
        <p>
          Your booking for <strong>{eventTitle}</strong> has been successfully
          confirmed 
        </p>

        <h3>Event Details</h3>

        <p>
          <strong>Date:</strong> {eventDate}
          <br />
          <strong>Time:</strong> {eventTime}
          <br />
          <strong>Location:</strong> {eventLocation}
          <br />
          <strong>Mode:</strong> {eventMode}
        </p>

        <p>
          We’re excited to have you join us! Please arrive a little early and
          keep this email handy for reference.
        </p>

        <p>
          If you have any questions or need assistance, feel free to reply to
          this email — we’re happy to help.
        </p>

        <p>
          Best regards,
          <br />
          <strong>{organizer ?? "Eve Events"}</strong>
          <br />
          {/* {organizationName} */}
        </p>
      </div>
    </div>
  );
}

export default BookingEmailValidation;
