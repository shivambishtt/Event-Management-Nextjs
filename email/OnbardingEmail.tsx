import React from "react";

interface UserType {
  name: string;
  email?: string;
}

function OnbardingEmail({ name, email }: UserType) {
  return (
    <div className="flex flex-col gap-4 text-center">
      <h1 className="text-3xl font-semibold">
        Hey <span>{name}</span> Welcome to Dev Events 🎉
      </h1>

      <p className="text-muted-foreground">
        Your account has been successfully created.
      </p>

      <p className="text-sm leading-relaxed text-muted-foreground">
        You’re now part of a growing community of developers and tech
        enthusiasts. Discover upcoming events, connect with people, and even
        create your own events — all in one place.
      </p>

      <div className="mt-4 flex flex-col gap-2">
        <p className="text-sm">Here’s what you can do next:</p>

        <ul className="text-sm text-muted-foreground space-y-1">
          <li>🎟️ Browse upcoming tech events</li>
          <li>🛠️ Create and manage your own events</li>
          <li>📅 Stay updated with the dev community</li>
        </ul>
      </div>
    </div>
  );
}

export default OnbardingEmail;
