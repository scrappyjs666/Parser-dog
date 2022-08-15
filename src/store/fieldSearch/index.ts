import { createEvent, createStore } from 'effector';

export const $inputValue = createStore('');
export const inputChangeValue = createEvent<string>();
export const inputClearInputValue = createEvent();
$inputValue.on(inputChangeValue, (_, value: string) => value).on(inputClearInputValue, () => '');
