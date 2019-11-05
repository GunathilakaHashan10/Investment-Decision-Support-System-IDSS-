export const interestRateFinder = (interestRateId, interestRates) => (
    interestRates.find((interestRate) => (
        interestRate.interestRateId === interestRateId
    ))
)

export const AERCalculator = (r, n) => (Math.pow(1 + (r / n), n) - 1)*100;

export const returnCalculor = (rate, period, deposit) => rate * period * deposit / 12; 