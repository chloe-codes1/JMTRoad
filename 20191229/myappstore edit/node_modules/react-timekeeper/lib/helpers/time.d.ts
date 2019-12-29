import { Time, TimeInput, TimeOutput } from './types';
export declare function parseTime(time: TimeInput): Time;
export declare function parseMeridiem(time: TimeInput): string;
export declare function composeTime(hour: number, minute: number): TimeOutput;
