export interface PayloadCreatePerson {
    NIT: string;
    Name: string;
    Address: string;
    Phone_Number: string;
    details: PersonDetail[];
}

export interface PersonDetail {
  Type: "GED" | "BACHELORS" | "MASTERS" | "PHD" | "CERTIFICATION";
  Organization: string;
  Acquired_credential: string;
  Year: number;
}

export interface getPersonResponse {
    data: Person[];
    total: number;
    page: number;
    limit: number;
}

export interface Person {
    ID: number;
    NIT: string;
    Name: string;
    Address: string;
    Phone_Number: string;
}

export interface PersonWithDetails extends Person {
  details: PersonDetail[];
}

export interface UpdatePersonDto {
  Name?: string;
  Address?: string;
  Phone_Number?: string;
}
