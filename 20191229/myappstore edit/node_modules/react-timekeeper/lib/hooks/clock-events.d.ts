/// <reference types="react" />
import { ElementRef } from '../helpers/types';
declare type CalcTimeFromAngle = (angle: number, { canAutoChangeUnit, wasTapped, }: {
    canAutoChangeUnit: boolean;
    wasTapped: boolean;
    isInnerClick: boolean;
}) => void;
export default function useClockEvents(clock: ElementRef, handleChange: CalcTimeFromAngle): {
    bind: {
        onMouseDown: (e: import("react").MouseEvent<HTMLElement, MouseEvent>) => void;
        onTouchStart: () => void;
        ref: import("react").MutableRefObject<HTMLDivElement>;
    };
};
export {};
