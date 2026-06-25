import { useState } from "react";
import type { BMIResultData } from "./BMIResult";

type BMICalculatorWidgetProps = {
    onCalculate: (result: BMIResultData) => void
}
export default function BMICalculatorWidget({ onCalculate }: BMICalculatorWidgetProps) {
    const [age, setAge] = useState("");
    const [sex, setSex] = useState<"male" | "female">("male");
    const [heightUnit, setHeightUnit] = useState<"cm" | "ft">("cm");
    const [weightUnit, setWeightUnit] = useState<"lbs" | "kg">("lbs");
    const [height, setHeight] = useState({
        cm: "",
        feet: "",
        inches: ""
    });
    const [weight, setWeight] = useState("");
    type ActivityLevel =
        | "sedentary"
        | "light"
        | "active"
        | "extra";

    const [activityLevel, setActivityLevel] = useState<ActivityLevel>("sedentary");

    type handleHeightChangeProps = {
        field: keyof typeof height,
        value: string
    }

    function handleHeightChange({ field, value }: handleHeightChangeProps) {
        // Allow empty input so backspace works
        if (value === "") {
            setHeight((prev) => ({
                ...prev,
                [field]: "",
            }));
            return;
        }

        const num = Number(value);

        if (isNaN(num)) return;

        if (field === "cm" && (num < 0 || num > 250)) return;
        if (field === "feet" && (num < 1 || num > 10)) return;
        if (field === "inches" && (num < 0 || num > 11)) return;

        setHeight((prev) => ({
            ...prev,
            [field]: value,
        }));
    }
    type handleHeightUnitChangeProps = {
        value: string
    }
    function handleHeightUnitChange({ value }: handleHeightUnitChangeProps) {
        const unit = value as "cm" | "ft";

        setHeightUnit(unit);

        setHeight((prev) => ({
            ...prev,
            cm: unit === "ft" ? "" : prev.cm,
            feet: unit === "cm" ? "" : prev.feet,
            inches: unit === "cm" ? "" : prev.inches,
        }));
    }
    function handleWeightUnitChange(value: string) {
        const unit = value as "kg" | "lbs";
        setWeightUnit(unit);
        setWeight("");
    }

    const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        extra: 1.9,
    };

    function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();

        const heightInMeters =
            heightUnit === "cm"
                ? Number(height.cm) / 100
                : (Number(height.feet) * 12 +
                    Number(height.inches)) *
                0.0254;

        const weightInKg =
            weightUnit === "kg"
                ? Number(weight)
                : Number(weight) * 0.453592;

        if (heightInMeters <= 0 || weightInKg <= 0) {
            alert("Please enter valid height and weight");
            return;
        }

        const calculatedBmi =
            weightInKg / (heightInMeters * heightInMeters);
        const finalBmi = Number(calculatedBmi.toFixed(1));

        const heightSquared = heightInMeters * heightInMeters;

        const healthyMinWeight = Number(
            (18.5 * heightSquared).toFixed(1)
        );

        const healthyMaxWeight = Number(
            (24.9 * heightSquared).toFixed(1)
        );

        const category =
            finalBmi < 18.5
                ? "Underweight"
                : finalBmi < 25
                    ? "Normal Weight"
                    : finalBmi < 30
                        ? "Overweight"
                        : "Obesity";

        const ageNumber = Number(age);
        const bmr =
            sex === "male"
                ? 10 * weightInKg +
                6.25 * (heightInMeters * 100) -
                5 * ageNumber +
                5
                : 10 * weightInKg +
                6.25 * (heightInMeters * 100) -
                5 * ageNumber -
                161;

        const recommendedCalories = Math.round(
            bmr * activityMultipliers[
            activityLevel
            ]
        );
        const loseSlowCalories =
            recommendedCalories - 250;

        const loseModerateCalories =
            recommendedCalories - 500;

        const gainSlowCalories =
            recommendedCalories + 250;

        const gainModerateCalories =
            recommendedCalories + 500;

        onCalculate({
            bmi: finalBmi,
            category,
            healthyMinWeight,
            healthyMaxWeight,
            recommendedCalories,
            loseSlowCalories,
            loseModerateCalories,

            gainSlowCalories,
            gainModerateCalories,
        });
    }

    return (
        <div className="h-full overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">
            <div className="bg-zinc-950 px-8 py-6">
                <h2 className="text-2xl font-bold text-white">
                    BMI Calculator
                </h2>
            </div>
            <div className="space-y-8 p-8">
                <form className="gap-2" onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-zinc-300">
                                Age
                            </label>

                            <input
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                min={1}
                                max={120}
                                placeholder="Age"
                                className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-zinc-300">
                                Sex
                            </label>

                            <select
                                value={sex}
                                onChange={(e) =>
                                    setSex(e.target.value as "male" | "female")
                                }
                                className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-zinc-300">
                                Height
                            </label>

                            <div className="flex gap-3">
                                {heightUnit === "cm" ? (
                                    <>
                                        <input
                                            value={height.cm}
                                            onChange={(e) => handleHeightChange({
                                                field: "cm",
                                                value: e.target.value
                                            })}
                                            type="number"
                                            placeholder="Height"
                                            className="flex-1 rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white"
                                        />

                                        <select
                                            value={heightUnit}
                                            onChange={(e) =>
                                                handleHeightUnitChange({ value: e.target.value })
                                            }
                                            className="rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white"
                                        >
                                            <option value="cm">cm</option>
                                            <option value="ft">ft/in</option>
                                        </select>
                                    </>
                                ) : (
                                    <>
                                        <input
                                            type="number"
                                            value={height.feet}
                                            onChange={(e) => handleHeightChange({
                                                field: "feet",
                                                value: e.target.value
                                            })}
                                            min={1}
                                            max={10}
                                            placeholder="Feet"
                                            className="flex-1 w-24 rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white"
                                        />

                                        <input
                                            type="number"
                                            value={height.inches}
                                            onChange={(e) => handleHeightChange({
                                                field: "inches",
                                                value: e.target.value
                                            })}
                                            min={0}
                                            max={11}
                                            placeholder="Inches"
                                            className="flex-1 w-24 rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white"
                                        />

                                        <select
                                            value={heightUnit}
                                            onChange={(e) =>
                                                handleHeightUnitChange({ value: e.target.value })
                                            }
                                            className="rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white"
                                        >
                                            <option value="cm">cm</option>
                                            <option value="ft">ft/in</option>
                                        </select>
                                    </>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-zinc-300">
                                Weight
                            </label>

                            <div className="flex gap-3">
                                <input
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    type="number"
                                    placeholder="Weight"
                                    className="flex-1 rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white"
                                />

                                <select
                                    value={weightUnit}
                                    onChange={(e) =>
                                        handleWeightUnitChange(e.target.value)
                                    }
                                    className="rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white"
                                >
                                    <option value="lbs">lbs</option>
                                    <option value="kg">kg</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-zinc-300">
                                Activity Level
                            </label>

                            <select
                                id="activityLevel"
                                value={activityLevel}
                                onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
                                className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white"
                            >
                                <option value="sedentary">
                                    Sedentary (little or no exercise)
                                </option>

                                <option value="light">
                                    Lightly Active (1-3 days/week)
                                </option>

                                <option value="moderate">
                                    Moderately Active (3-5 days/week)
                                </option>

                                <option value="active">
                                    Very Active (6-7 days/week)
                                </option>

                                <option value="extra">
                                    Extra Active (physical job + exercise)
                                </option>
                            </select>
                        </div>
                    </div>

                    <button className="w-full mt-5 rounded-xl bg-white py-3 font-semibold text-black transition hover:bg-zinc-200">
                        Calculate BMI
                    </button>
                </form>
            </div >
        </div >
    );
}