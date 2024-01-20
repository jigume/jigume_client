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

/**
MT1: 대형마트;
CS2: 편의점;
PS3: 어린이집, 유치원;
SC4: 학교;
AC5: 학원;
PK6: 주차장;
OL7: 주유소, 충전소;
SW8: 지하철역;
BK9: 은행;
CT1: 문화시설;
AG2: 중개업소;
PO3: 공공기관;
AT4: 관광명소;
AD5: 숙박;
FD6: 음식점;
CE7: 카페;
HP8: 병원;
PM9: 약국;
 */
export type CategoryGroupCode = 'MT1' | 'CS2' | 'SW8' | 'BK9' | 'PO3';

export type NearPlacesType = {
  address_name: string;
  category_group_code: CategoryGroupCode;
  category_group_name: string;
  category_name: string;
  distance: number;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: number;
  y: number;
};

export type KakaoCaregorySearchType = {
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
    same_name: {
      regio: string[];
      keyword: string;
      selected_region: string;
    };
  };
  documents: NearPlacesType[];
};
