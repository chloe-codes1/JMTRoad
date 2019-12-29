/// <reference types="react" />
import { ConfigProps } from '../hooks/config-context';
import { TimeInput, ChangeTimeFn } from '../helpers/types';
interface Props extends ConfigProps {
    time?: TimeInput;
    onChange?: ChangeTimeFn;
}
export default function TimepickerWithConfig({ time, onChange, coarseMinutes, forceCoarseMinutes, switchToMinuteOnHourSelect, closeOnMinuteSelect, hour24Mode, onDoneClick, doneButton, }: Props): JSX.Element;
export {};
