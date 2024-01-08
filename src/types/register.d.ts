type GoodsData = {
  goodsName: string;
  boardContent: string;
  introduction: string;
  link: string;
  goodPrice: number | string;
  deliveryFee: number | string;
  mapX?: number;
  mapY?: number;
  goodsLimitCount: number;
  goodsLimitTime: Date;
  categoryName: number;
};

export type RegisterDataType = {
  image: { name: string };
  address: string;
  goodsDto: GoodsData;
};
