import { stat } from 'fs'
import axios from 'axios'
import { createEffect, createEvent, createStore, sample } from 'effector'

interface IUser {
  name: string
  LastName: string
}

interface IPerson {
  FirstName: string
  LastName: string
  Birthday: string
  Gender: string
  Position: string
  Zeitplan: string
}

const crudId = `62c9c34b4795d2d81f818026`

const instance = axios.create({
  baseURL: `https://${crudId}.mockapi.io`,
})

export const $isChecked = createStore(-1)
export const isChecked = createEvent<number>()
$isChecked.on(isChecked, (state, index: number) => (state = index))

export const $isDisabled = $isChecked.map((val) => val < 0)

export const unSelect = createEvent()
$isChecked.on(unSelect, (state) => (state = -1))
// export const $consoleStore = createStore('da')
// export const toggleFx = createEvent()
// $consoleStore.on(toggleFx, (state) => (state === 'da' ? 'net' : 'da'))

export const $employees = createStore<IPerson[]>([])
export const $fetchError = createStore<string | null>(null)

export const getEmployeesFx = createEffect(() => {
  return instance.get<IPerson[]>('/employees').then((resp) => resp.data)
})

export const addEmployeeFx = createEffect((employee: any) => {
  const newEmployee = {
    FirstName: employee.user.name.trim(),
    LastName: employee.user.LastName.trim(),
    Birthday: employee.Birthday._d.toLocaleDateString(),
    Gender: employee.Gender,
    Position: employee.Position,
    Zeitplan: employee.Zeitplan,
  }
  return instance.post(`/employees/`, newEmployee).then((resp) => resp.data)
})

export const deleteEmployeeFx = createEffect((indexPerson: number) => {
  return instance.delete(`/employees/${indexPerson}`).then((resp) => resp.data)
})

export const correctEmployeeFx = createEffect(
  async ({ employee, personIndex }: { employee: any; personIndex: number }) => {
    const newEmployee = {
      FirstName: employee.FirstName,
      LastName: employee.LastName,
      Birthday: employee.Birthday._d.toLocaleDateString(),
      Gender: employee.Gender,
      Position: employee.Position,
      Zeitplan: employee.Zeitplan,
      id: String(personIndex),
    }
    const resp = await instance.put(`/employees/${personIndex}`, newEmployee)
    return resp.data
  }
)

export const $inputValue = createStore('')
export const inputChangeValue = createEvent<string>()
export const inputClearInputValue = createEvent()
$inputValue
  .on(inputChangeValue, (state, value: string) => (state = value))
  .on(inputClearInputValue, (state) => (state = ''))

export const $isPerson = createStore<IPerson | null>(null)
export const isPerson = createEvent<IPerson>()
$isPerson
  .on(isPerson, (state, el: IPerson) => (state = el))
  .on(deleteEmployeeFx, (state) => (state = null))
  .on(unSelect, (state) => (state = null))

$employees
  .on(getEmployeesFx.doneData, (_, employees) => employees)
  .on(addEmployeeFx.doneData, (state, employees) => [...state, employees])
  .on(
    deleteEmployeeFx,
    (state, indexPerson) =>
      (state = state.filter((_, index) => index !== indexPerson))
  )
  .on(
    correctEmployeeFx,
    (
      state,
      { employee, personIndex }: { employee: any; personIndex: number }
    ) => {
      const newEmployee = {
        FirstName: employee.FirstName.trim(),
        LastName: employee.LastName.trim(),
        Birthday: employee.Birthday._d.toLocaleDateString(),
        Gender: employee.Gender,
        Position: employee.Position,
        Zeitplan: employee.Zeitplan,
        id: String(personIndex),
      }
      return state.map((el, index) =>
        index === personIndex ? (el = newEmployee) : el
      )
    }
  )

$fetchError
  .on(getEmployeesFx.fail, (_, { error }) => error.message)
  .on(addEmployeeFx.fail, (_, { error }) => error.message)
  .reset(getEmployeesFx, addEmployeeFx)
