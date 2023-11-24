export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface GenderOption {
  value: Gender;
  label: string;
}
