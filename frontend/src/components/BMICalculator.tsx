import { useState } from "react";
import BMICalculatorWidget from "./BMICalculatorWidget";
import BMIResult, { type BMIResultData } from "./BMIResult";

export default function BMICalculator() {

    const [result, setResult] = useState<BMIResultData | null>(null);
    return (
        <section className="container mx-auto px-6 py-24">
            <div>
                <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl">
                    BMI {" "}
                    <span className=" text-zinc-400">
                        Calculator
                    </span>
                </h1>

                <p className="mt-2 text-lg text-zinc-400">
                    Body mass index (BMI) is a measure of body fat based on height and weight that applies to adult men and women. Your BMI is just one piece of the puzzle. It’s based on height and weight but doesn’t take into account your muscle mass, bone density, or body composition. Your healthcare provider will consider whether your BMI is too high or too low for you.
                </p>

            </div>
            <div className="mt-10 grid items-center gap-16 lg:grid-cols-[30%_70%]">
                <BMICalculatorWidget onCalculate={setResult} />
                <BMIResult result={result} />
            </div>
        </section>
    );
}