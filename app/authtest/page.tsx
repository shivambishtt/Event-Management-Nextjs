"use client"
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

function page() {
  return <div>Auth Test</div>;
}

export default page;
