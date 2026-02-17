import React from "react";
import { Button } from "./ui/button";

function BookingSucess() {
  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-3xl p-8 text-center border border-gray-100">
      {/* Success Header */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-green-600 mb-2">
          🎉 Registration Successful!
        </h2>
        <p className="text-gray-700">
          Your seat has been successfully reserved.
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-5"></div>

      {/* Additional Details */}
      <div className="space-y-3 text-sm text-gray-600">
        <p>
          📧 A confirmation email has been sent to your registered email address
          with complete event details.
        </p>

        <p>📝 Please check your inbox (and spam folder just in case).</p>

        <p>
          🔔 We recommend adding the event to your calendar so you don’t miss
          it.
        </p>

        <p>
          💡 If you have any questions, feel free to reach out to the organizer.
        </p>
      </div>

      {/* Action Button */}
      <div className="mt-6">
        <Button className="w-full bg-green-600 text-white hover:bg-green-700 rounded-xl transition">
          View Event Details
        </Button>
      </div>
    </div>
  );
}

export default BookingSucess;
