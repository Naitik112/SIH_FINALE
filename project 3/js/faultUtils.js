// Fault detection and filtering utilities
export const LEAK_CURRENT_THRESHOLD = 0.165;
export const RESISTANCE_THRESHOLD = 5.0;

export function hasFault(pole) {
    return pole.leakCurrent > LEAK_CURRENT_THRESHOLD || 
           pole.EarthingContinuity === 0 || 
           pole.EarthingResistance > RESISTANCE_THRESHOLD;
}

export function getEarthingFaults(poles) {
    return poles.filter(pole => pole.EarthingContinuity === 0);
}

export function getLeakageFaults(poles) {
    return poles.filter(pole => pole.leakCurrent > LEAK_CURRENT_THRESHOLD);
}

export function getResistanceFaults(poles) {
    return poles.filter(pole => pole.EarthingResistance > RESISTANCE_THRESHOLD);
}