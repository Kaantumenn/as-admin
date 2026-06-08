export type Gemi = {
  id: number;
  shipName: string;
  targetTon: number;
  totalTon: number;
  remainingTon: number;
  progress: number;
  truckCount: number;
  beyannames: string[];
  firstShipmentDate: string | null;
  lastShipmentDate: string | null;
  status: string;
  note: string | null;
  createdAt: string;
  updatedAt: string;
};

export type GemiForm = {
  shipName: string;
  targetTon: number;
  note: string;
};
