import Countries from "@/components/country/Countries";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-tr from-orange-100 to-orange-700">
      <Countries />
    </main>
  );
}
