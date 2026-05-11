import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import RentalSection from "@/components/RentalSection";
import RepairSection from "@/components/RepairSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    // Removed the pt-20 here so the hero video sits flush against the top of the browser behind the glass header
    <div className="min-h-screen relative">
      
      {/* The 3D Video Sequence */}
      <Hero />
      {/* The Product Grid */}
      <ProductGrid />
      {/* The Rental Section */}
      <RentalSection />
      {/* The Repair Section */}
      <RepairSection />
      {/* The Footer */}
      <Footer />

    </div>
  );
}