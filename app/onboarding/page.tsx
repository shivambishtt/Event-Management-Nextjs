function Onboarding() {
  return (
    <div className="flex gap-6 mt-10">
      <button className="flex items-center justify-center w-full h-32 rounded-2xl bg-teal-700 hover:bg-teal-600 transition text-white text-xl font-semibold">
        Admin
      </button>

      <button className="flex items-center justify-center w-full h-32 rounded-2xl bg-emerald-800 hover:bg-emerald-700 transition text-white text-xl font-semibold">
        User
      </button>
    </div>
  );
}

export default Onboarding;
