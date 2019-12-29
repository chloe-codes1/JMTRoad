export declare function deg(rad: number): number;
export declare function transform(index: number, t: number): string;
export declare function isWithinRadius(x: number, y: number, radius: number): boolean;
export declare type CalcTimeFromAngle = (angle: number, { canAutoChangeUnit, wasTapped, }: {
    canAutoChangeUnit: boolean;
    wasTapped: boolean;
    isInnerClick: boolean;
}) => void;
export declare function calcAnimationAngle(prev: number, next: number): number;
