import { ReactElement } from 'react';
import { TimeInput, ChangeTimeFn, Time, TimeOutput } from '../helpers/types';
import { MODE, MERIDIEM } from '../helpers/constants';
interface Props {
    time?: TimeInput;
    onChange?: ChangeTimeFn;
    children: ReactElement;
}
interface StateContext {
    time: Time;
    mode: MODE;
    updateTime: (val: number) => void;
    updateMeridiem: (meridiem: MERIDIEM) => void;
    setMode: (mode: MODE) => void;
    getComposedTime: () => TimeOutput;
}
export declare function StateProvider({ onChange, time: parentTime, children }: Props): JSX.Element;
export default function useTimekeeperState(): StateContext;
export {};
