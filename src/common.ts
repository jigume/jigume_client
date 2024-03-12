import { CategoryGroupCode } from './types/register';

export const primaryYello = '#FFAE39';
export const primaryJade = '#8CDDE2';
export const primaryPurple = '#E4CCFF';
export const primaryBlue = '#0D99FF';

export const backURL =
  import.meta.env.VITE_MODE === 'prod'
    ? 'http://43.201.105.35:8080'
    : 'http://jigume.site:8080';
// export const backURL = 'http://172.30.1.62:8080';

export const prohibition = {
  description1:
    '지구미에서는 다음과 같은 물품의 거래를 엄격히 금지하고 있습니다. 아래 목록은 일반적인 금지 항목의 예시이며, 전체 목록은 계속해서 업데이트될 수 있습니다.',
  description2:
    '아래 항목에 해당하는 물건은 업로드가 금지되며, 해당 규정을 어길 경우 계정이 일시적으로 혹은 영구적으로 정지될 수 있습니다.',
  list: [
    '식물 제외 / 곤충, 관상어 포함',
    '개인정보: 신분증 / 통장 / 계정',
    '운전면허증, 학생증, 추천인 계정 포함',
    '불법 현금 융통: 대리결제 / 후불결제 현금화 / 대출',
    '상표권 침해 물품: 가품 / 이미테이션 / 위조물품',
    '청소년유해약물 등: 주류 / 담배 / 라이터 / 마약류',
    '무알콜 주류, 전자담배 기기장치류, 가스라이터 포함',
    '청소년유해매체물 등: 음란물 / 성생활용품 / 게임아이템',
    '청소년이용불가등급물 및 선정적인 이미지∙글 포함',
    '의약품 / 의료기기 / 건강기능식품',
    '동물용 의약품, 한약, 다이어트약 포함',
    '체온계, 혈압계 제외',
    '동물용 건강기능식품 제외',
    '콘택트렌즈 / 도수 있는 안경',
    '거래 금지 식품: 무허가∙위해 식품',
    '직접 제조, 포장 개봉, 유통기한 경과 식품 등',
    '거래 금지 화장품: 화장품 샘플 / 무허가∙위해 화장품',
    '직접 제조, 용기 불량, 라벨이 없는 화장품 등',
    '위험한 물질: 유해화학물질 / 유류 등',
    '농약, 유독물, 휘발유, 경유, LPG 포함',
    '위험한 물품: 총포∙도검∙화약류 / 청소년유해물품 등',
    '전기충격기, 비비탄 총∙총알, 레이저포인터 포함',
    '군∙경찰∙군마트용품, 군∙경찰∙소방복 및 유사 제복류',
    '위해 우려 물품: 리콜 / 안전인증 누락 / 불법직구 등',
    '정부 지원 물품: 상품권 / 생필품 / 바우처',
    '지역사랑상품권, 나라미, 문화누리카드, 평생교육희망카드 등',
    '기타 거래 금지 물품',
    '종량제봉투',
    '훈장∙포장',
    '종자 (씨앗, 삽수, 어린묘목 등)',
    '저작권 침해 물품: 불법 개조품, 불법 복제품',
    '통신사 데이터∙인터넷 물품',
    '렌탈 물품',
    '사생활침해물품',
    '비포장 비료',
    '운영정책상 제한 고가품',
    '100만 원 이상 금제품, 1,000달러(USD) 이상 외환',
    '운영정책상 금지 행위',
    '사회 통념상 용인이 되지 않는 행위',
    '암표 매매 행위 (철도 승차권 반복 판매 등)',
    '불법 유사 의료 행위 (반영구 화장, 문신 등)',
    '조건이 있는 무료나눔 행위',
    '물품 정보를 정확하게 알 수 없는 제품(랜덤박스 등)',
    '무료나눔만 가능한 물품',
    '헌혈증서, 무료로 받은 초대권',
  ],
  description3:
    '만약 특정 항목이나 물품에 대한 의문이 있을 경우, 담당자에게 문의해 주시기 바랍니다.',
  description4: '이용해 주셔서 감사합니다.',
};

export const PlaceCodes: CategoryGroupCode[] = [
  'MT1',
  'CS2',
  'SW8',
  'BK9',
  'PO3',
];
