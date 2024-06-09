export interface CreatePointFieldType {
  name: string;
  address: string;
  cityId: number;
}

export interface NewPoint {
  name: string;
  cityId: {
    id: number;
  };
  address: string;
}
