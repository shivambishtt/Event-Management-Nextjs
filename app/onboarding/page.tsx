import Button from "@mui/material/Button";

function Onboarding() {
  return (
    <div className="flex gap-6 mt-10">
      <Button className="flex items-center justify-center w-full h-32 rounded-2xl bg-teal-700 hover:bg-teal-600 transition text-white text-xl font-semibold">
        Admin
      </Button>

      <Button className="flex items-center justify-center w-full h-32 rounded-2xl bg-emerald-800 hover:bg-emerald-700 transition text-white text-xl font-semibold">
        User
      </Button>
    </div>
  );
}

export default Onboarding;
