type GoodsData = {
  goodsName: string;
  boardContent: string;
  introduction: string;
  link: string;
  goodsPrice: number | string;
  deliveryFee: number | string;
  mapX?: number;
  mapY?: number;
  goodsLimitCount: number;
  goodsLimitTime: Date;
  categoryId: number;
};

export type RegisterDataType = {
  image: string[];
  imageInput: File[];
  address: string;
  goodsDto: GoodsData;
};

export type RegisterContextType = {
  data: RegisterDataType;
  setData: React.Dispatch<React.SetStateAction<RegisterDataType>>;
};
