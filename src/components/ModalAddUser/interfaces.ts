export interface Values {
  title: string
  description: string
  modifier: string
}

export interface CollectionCreateFormProps {
  visible: boolean
  onCreate: (values: Values) => void
  onCancel: () => void
}