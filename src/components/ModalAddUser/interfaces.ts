export interface Values {
  title: string;
  description: string;
  modifier: string;
}

export interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

export interface IPerson {
  FirstName: string;
  LastName: string;
  Birthday: string;
  Gender: string;
  Position: string;
  Zeitplan: string;
  id?: string;
}
