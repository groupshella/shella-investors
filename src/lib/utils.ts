
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("ar-SA", {
        style: "currency",
        currency: "SAR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function formatNumber(num: number): string {
    return new Intl.NumberFormat("ar-SA").format(num);
}

export function calculateGrowth(
    initialAmount: number,
    months: number,
    rate: number = 0.045
): Array<{ month: number; value: number; profit: number; total: number }> {
    const results = [];
    let currentValue = initialAmount;

    for (let i = 1; i <= months; i++) {
        const profit = Math.round(currentValue * rate);
        const total = currentValue + profit;
        results.push({
            month: i,
            value: currentValue,
            profit,
            total,
        });
        currentValue = total;
    }

    return results;
}

export function calculateHorizontal(
    amount: number,
    months: number,
    rate: number = 0.045
): Array<{ month: number; newGoods: number; profit: number; cumulative: number }> {
    const results = [];
    let cumulative = 0;

    for (let i = 1; i <= months; i++) {
        const newGoods = amount;
        const profit = Math.round((cumulative + amount) * rate);
        cumulative += amount + profit;
        results.push({
            month: i,
            newGoods,
            profit,
            cumulative,
        });
    }

    return results;
}