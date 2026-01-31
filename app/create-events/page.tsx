import React from "react";

async function CreateEvent() {
  const request = await fetch(`/api/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  return <div></div>;
}

export default CreateEvent;
