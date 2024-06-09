export interface EditPointFieldType {
  name: string;
  address: string;
  cityId: {
    value: number;
    label: string;
  };
}

export interface UpdatedPoint {
  name: string;
  cityId: {
    id: number;
  };
  address: string;
}
