export type AddressType = {
  lat: number;
  lng: number;
};

// 상품 미리보기 오브젝트 @main
export interface PreViewerMarker {
  position: AddressType;
  categoryId: number;
  goodsId: number;
  goodsRepImgUrl?: string;
}

export type sheetProviderType = {
  handle: React.RefObject<HTMLDivElement>;
  sheet: React.RefObject<HTMLDivElement>;
  content: React.RefObject<HTMLDivElement>;
  isOpen: boolean;
  sheetLevel: SheetLevelType;
  handleSheet: (level?: SheetLevelType) => void;
};
