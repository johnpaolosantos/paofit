export type BMIResultData = {
    bmi: number;
    category: string,
    healthyMinWeight: number,
    healthyMaxWeight: number,
    recommendedCalories: number;
    loseSlowCalories: number,
    loseModerateCalories: number,

    gainSlowCalories: number,
    gainModerateCalories: number,

};
type BMIResultProps = {
    result: BMIResultData | null;
};

const bmiRanges = [
    { label: "Underweight", min: 0, max: 18.5 },
    { label: "Normal Weight", min: 18.5, max: 25 },
    { label: "Overweight", min: 25, max: 30 },
    { label: "Obesity", min: 30, max: Infinity },
];

export default function BMIResult({ result }: BMIResultProps) {
    return (
        <div className="h-full rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
            <h2 className="text-2xl font-bold text-white">
                BMI Result
            </h2>

            {result ? (
                <>
                    <div className="mt-6">
                        <p className="text-5xl font-bold text-white">
                            {result.bmi}
                        </p>
                    </div>

                    <div className="mt-8 overflow-hidden rounded-xl border border-zinc-800">
                        <table className="w-full">
                            <thead className="bg-zinc-800">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-zinc-300">
                                        Category
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-zinc-300">
                                        BMI Range
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {bmiRanges.map((range) => {
                                    const isActive =
                                        result.bmi >= range.min &&
                                        result.bmi < range.max;

                                    return (
                                        <tr
                                            key={range.label}
                                            className={
                                                isActive
                                                    ? "bg-green-500/20"
                                                    : "border-t border-zinc-800"
                                            }
                                        >
                                            <td
                                                className={`px-4 py-3 ${isActive
                                                    ? "font-semibold text-green-400"
                                                    : "text-zinc-300"
                                                    }`}
                                            >
                                                {range.label}
                                            </td>

                                            <td
                                                className={`px-4 py-3 ${isActive
                                                    ? "font-semibold text-green-400"
                                                    : "text-zinc-400"
                                                    }`}
                                            >
                                                {range.max === Infinity
                                                    ? "30+"
                                                    : `${range.min} - ${range.max}`}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 rounded-xl bg-zinc-800 p-4">
                        <p className="text-sm text-zinc-400">
                            Healthy weight range
                        </p>

                        <p className="mt-1 text-lg font-semibold text-white">
                            {result.healthyMinWeight} kg -{" "}
                            {result.healthyMaxWeight} kg
                        </p>
                    </div>

                    <div className="mt-6 rounded-xl bg-zinc-800 p-4">
                        <h3 className="font-semibold text-white">
                            Daily Calorie Intake
                        </h3>

                        <p className="mt-2 text-zinc-400">
                            To maintain your current weight, consume approximately
                            <span className="font-semibold text-white">
                                {" "}
                                {result.recommendedCalories} kcal/day
                            </span>.
                        </p>

                        <ul className="mt-4 space-y-2 text-sm">
                            <li className="text-red-400">
                                Lose ~0.5 kg/week: {" "}
                                {result.loseModerateCalories} kcal/day
                            </li>

                            <li className="text-orange-400">
                                Lose ~0.25 kg/week:{" "}
                                {result.loseSlowCalories} kcal/day
                            </li>

                            <li className="text-green-400">
                                Gain ~0.25 kg/week:{" "}
                                {result.gainSlowCalories} kcal/day
                            </li>

                            <li className="text-emerald-400">
                                Gain ~0.5 kg/week:{" "}
                                {result.gainModerateCalories} kcal/day
                            </li>
                        </ul>
                    </div>
                </>
            ) : (
                <p className="mt-4 text-zinc-400">
                    Enter your details and calculate your BMI.
                </p>
            )}
        </div>
    );
}