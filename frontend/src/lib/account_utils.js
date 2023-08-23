
export const rankToTitle = (x) => {
    if (x < 100) {
        return "Platform Plebeian";
    } else if (100 <= x && x < 1000) {
        return "Statistical Patrician";
    } else if (1000 <= x && x < 10000) {
        return "Kilo Senator";
    } else {
        return "Lift Oracle";
    }
};
