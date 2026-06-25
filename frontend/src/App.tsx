import Navbar from "./components/Navbar";
import BMICalculator from "./components/BMICalculator";

export default function Home() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            {/* Navbar */}
            {/* <Navbar /> */}

            {/* BMI Calculator Section */}
            <BMICalculator />
        </div>
    );
}

