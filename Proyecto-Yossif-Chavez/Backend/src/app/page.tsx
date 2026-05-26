import Header from "../componentes/Header";
import CalendarSection from "../componentes/CalendarSection";
import Footer from "../componentes/Footer";
import Carrucel from "../componentes/Carrucel";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100">
      <Header />
      <Carrucel />
      <CalendarSection />
      <Footer />
    </main>
  );
}
