export type BottomSheetType = {
  address: string;
  handleToCenter: () => void;
  sheetProvider: sheetProvider;
  preViewer: PreViewerMarker;
  map: kakao.maps.Map | null;
};

export type sheetProvider = {
  handle: React.MutableRefObject<HTMLDivElement | null>;
  sheet: React.MutableRefObject<HTMLDivElement | null>;
  content: React.MutableRefObject<HTMLDivElement | null>;
  isOpen: boolean;
  sheetLevel: SheetLevelType;
  handleSheet: (level?: SheetLevelType) => void;
};

export interface CategoryType {
  idx: number;
  icon: string;
  name: string;
}

export interface FilterType extends CategoryType {
  checked: boolean;
}

export type SheetLevelType = 'max' | 'mid' | 'min';
