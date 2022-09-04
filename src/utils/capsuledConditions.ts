export const isFrontSmallerThanRear = <T>(frontValue: T, rearValue: T) => frontValue < rearValue;

export const isFrontBiggerThanRear = <T>(frontValue: T, rearValue: T) => frontValue > rearValue;

export const isFrontSimilarSmaller = <T>(frontValue: T, rearValue: T) => frontValue <= rearValue;

export const isFrontSimilarBigger = <T>(frontValue: T, rearValue: T) => frontValue >= rearValue;

export const isFrontOrRear = <T>(frontValue: T, rearValue: T) => frontValue || rearValue;

export const isNotExact = <T>(frontValue: T, rearValue: T) => frontValue !== rearValue;
