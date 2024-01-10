import { CurrencyInputOnChangeValues } from 'react-currency-input-field/dist/components/CurrencyInputProps';

export type StyledTextareaType = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  height?: number;
  placeholder: string;
};

export type StyledInputTextType = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  height: numger;
};

export type StyledCurrencyInputType = {
  value: string;
  onChange: (
    value: string | undefined,
    name?: string,
    values?: CurrencyInputOnChangeValues
  ) => void;
};

type OpenGraph = {
  description: string;
  title: string;
  image: { url: string };
  type: string;
  url: string;
};

export type OpenGraphViewerType = {
  openGraph: OpenGraph;
  link: string;
  imgSize: string;
};

export type NestButtnType = {
  content: string;
  isDisabled: boolean;
  onClick: () => void;
  linkTo: string;
};

export type InputWithNumType = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength: number;
};
