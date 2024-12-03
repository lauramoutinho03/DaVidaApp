export interface InstituicaoData {
  Instituicao: {
    IdInstituicao: number;
    Nome: string;
    Brigada: string;
    Local: string;
    DistritoId: number;
    UserId: number;
  };
  Distrito: {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
  };
}

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: { user: { IdDador: number; Email: string; Nome: string; Password: string } };
    FAQ: undefined;
    Campaigns: undefined;
    Details: { instituicao: InstituicaoData };
    //Home: undefined;
  };
  