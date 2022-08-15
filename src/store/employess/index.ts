import { createEffect, createEvent, createStore } from 'effector';
import { instance } from './api';
import { IPerson } from './interfaces';

export const $isChecked = createStore(-1);
export const isChecked = createEvent<number>();
$isChecked.on(isChecked, (_, index: number) => index);

export const $employeeID = createStore(0);
export const employeeID = createEvent<number>();
$employeeID.on(employeeID, (_, index: number) => index);

export const $isDisabled = $isChecked.map((val) => val < 0);

export const unSelect = createEvent();
$isChecked.on(unSelect, () => -1);

export const $employees = createStore<IPerson[]>([]);
export const $fetchError = createStore<string | null>(null);

export const getEmployeesFx = createEffect(async () => {
  const resp = await instance.get<IPerson[]>('/employees');
  return resp.data;
});

export const addEmployeeFx = createEffect(async (employee: IPerson) => {
  const resp = await instance.post(`/employees/`, employee);
  return resp.data;
});

export const deleteEmployeeFx = createEffect(async (indexPerson: number) => {
  const resp = await instance.delete(`/employees/${indexPerson}`);
  return resp.data;
});

export const correctEmployeeFx = createEffect(async ({ workers, ID }: { workers: IPerson; ID: number }) => {
  const resp = await instance.put(`/employees/${ID}`, workers);
  return resp.data;
});

export const $isPerson = createStore<IPerson | null>(null);
export const isPerson = createEvent<IPerson>();
$isPerson
  .on(isPerson, (_, el: IPerson) => el)
  .on(deleteEmployeeFx, () => null)
  .on(unSelect, () => null);

$employees
  .on(getEmployeesFx.doneData, (_, employees) => employees)
  .on(addEmployeeFx.doneData, (state, employees) => [...state, employees])
  .on(deleteEmployeeFx, (state, indexPerson) =>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    state.filter((el) => Number(el.id!) !== indexPerson),
  )
  .on(correctEmployeeFx, (state, { workers, ID }: { workers: IPerson; ID: number }) => {
    return state.map((el) => (Number(el.id) === ID ? workers : el));
  });

$fetchError
  .on(getEmployeesFx.fail, (_, { error }) => error.message)
  .on(addEmployeeFx.fail, (_, { error }) => error.message)
  .on(correctEmployeeFx.fail, (_, { error }) => error.message)
  .reset(getEmployeesFx, addEmployeeFx, correctEmployeeFx);
