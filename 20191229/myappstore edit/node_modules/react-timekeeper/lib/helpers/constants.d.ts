export declare const MINUTES: string[];
export declare enum MODE {
    'MINUTES' = "MINUTES",
    'HOURS_12' = "HOURS_12",
    'HOURS_24' = "HOURS_24"
}
export declare enum MERIDIEM {
    'am' = "am",
    'pm' = "pm"
}
export declare const CLOCK_VALUES: {
    MINUTES: {
        increments: number;
        numbers: string[];
        dropdown: string[];
    };
    HOURS_12: {
        increments: number;
        numbers: string[];
        dropdown: string[];
    };
    HOURS_24: {
        increments: number;
        numbers: string[];
        numbersInner: string[];
        dropdown: string[];
    };
};
export declare const VISIBLE_NUMBERS_PER_CIRCLE = 12;
export declare const CLOCK_RADIUS = 110;
export declare const CLOCK_SIZE: number;
export declare const INNER_NUMBER_RADIUS = 77;
export declare function getFontSize(hour24Mode: boolean, inner: boolean): number;
export declare const NUMBER_RADIUS_REGULAR = 34;
export declare const NUMBER_OUTER_POSITION = 22;
export declare function getOuterNumberPosition(mode: MODE): number;
export declare const INITIAL_HOUR_TRANSFORM: number;
export declare const INITIAL_MINUTE_TRANSFORM: number;
export declare function getClockHandLength(mode: MODE, inner: boolean): number;
export declare function getClockHandCirclePosition(mode: MODE, inner: boolean): number;
export declare function getClockHandCircleRadius(mode: MODE, inner: boolean): number;
export declare const INNER_NUMBER_POSITIONING: {
    exit: number;
    enter: number;
};
