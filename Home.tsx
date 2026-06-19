import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <div style={{ padding: "40px" }}>
        <h1>Gran Servicio</h1>

        <h2>CorDex</h2>

        <p>
          Encuentra electricistas, plomeros, gasistas,
          albañiles, cerrajeros y más.
        </p>
      </div>
    </>
  );
}