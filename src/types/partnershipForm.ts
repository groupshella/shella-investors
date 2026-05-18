export type InvestmentModel = "horizontal" | "vertical";

export interface PartnershipFormData {
  fullName: string;
  phone: string;
  amount: string;
  model: InvestmentModel;
  message: string;
  latitude: string;
  longitude: string;
  location: string;
}

export const initialPartnershipFormData: PartnershipFormData = {
  fullName: "",
  phone: "",
  amount: "",
  model: "horizontal",
  message: "",
  latitude: "",
  longitude: "",
  location: "",
};

export type FormErrors = Partial<Record<keyof PartnershipFormData | "submit", string>>;
