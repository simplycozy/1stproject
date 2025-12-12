/**
 * 그라데이션 팔레트 데이터
 * 각 팔레트는 색상 배열과 설명 정보를 포함합니다.
 */
export const gradientPalettes = [
	{
		id: "sunsetGlow",
		name: "Sunset Glow",
		colors: ["#FF512F", "#DD2476"],
		description: "따뜻한 노을을 연상시키는 밝고 활기찬 그라데이션",
		theme: "라이트 테마에 적합",
		keywords: ["감성적", "활기찬", "따뜻한 분위기"],
		usage:
			"Instagram 앱 아이콘과 유사한 톤으로, 크리에이티브 포트폴리오나 브랜드 사이트 헤더에 생동감 부여",
	},
	{
		id: "neonNight",
		name: "Neon Night",
		colors: ["#333399", "#FF00CC"],
		description:
			"미래지향적인 네온 사인이 어두운 배경에서 빛나는 듯한 그라데이션",
		theme: "다크 테마에 적합",
		keywords: ["미래지향적", "테크니컬", "강렬한"],
		usage:
			"사이버펑크 분위기의 랜딩 페이지나 엔터테인먼트/패션 웹사이트에 어울리는 네온 글로우 스타일",
	},
	{
		id: "midnightCity",
		name: "Midnight City",
		colors: ["#232526", "#414345"],
		description: "짙은 회색과 흑색이 부드럽게 연결되는 모노톤 그라데이션",
		theme: "다크 테마에 적합",
		keywords: ["모노톤", "미니멀", "모던"],
		usage: "미니멀리스트 포트폴리오나 제품 소개 사이트 배경에 활용하기 좋음",
	},
	{
		id: "pastelDream",
		name: "Pastel Dream",
		colors: ["#FFDEE9", "#B5FFFC"],
		description:
			"부드러운 파스텔톤 색상이 어우러져 몽환적이고 편안한 느낌을 주는 그라데이션",
		theme: "라이트 테마에 적합",
		keywords: ["부드러운", "몽환적", "편안한"],
		usage:
			"웰니스, 뷰티 같은 라이프스타일 웹사이트에 적합, 코스메틱 브랜드 랜딩 페이지 배경 등에 어울림",
	},
	{
		id: "natureSerenity",
		name: "Nature Serenity",
		colors: ["#3E5151", "#DECBA4"],
		description: "자연에서 영감을 받은 그린-블루 계열 그라데이션",
		theme: "라이트/다크 모두 활용 가능",
		keywords: ["자연적", "차분한", "안정감"],
		usage:
			"친환경 제품 사이트나 에코 테마의 브랜드 랜딩에 적합, 브랜드에 평온함과 신뢰감 전달",
	},
	{
		id: "indigoLime",
		name: "Indigo Lime",
		colors: ["#4B0082", "#ADFF2F"],
		description:
			"보색에 가까운 두 색상의 강렬한 대비로 시선을 사로잡는 듀오톤 그라데이션",
		theme: "라이트/다크 모두 활용 가능",
		keywords: ["대담한 대비", "현대적", "강렬함"],
		usage:
			"스타트업의 배너나 프로모션에 활용하기 좋음, Spotify와 같은 음악 브랜드의 그래픽에서 볼 법한 스타일",
	},
	{
		id: "metallicLuxe",
		name: "Metallic Luxe",
		colors: ["#B8860B", "#FFD700"],
		description: "금속의 광택감을 표현한 골드 계열 그라데이션",
		theme: "라이트/다크 모두 활용 가능",
		keywords: ["고급스러운", "럭셔리", "화려한"],
		usage:
			"명품 패션이나 고가 전자제품 브랜드 웹사이트에 적합, 어두운 배경과 조합하면 더욱 세련됨",
	},
	{
		id: "ambientOcean",
		name: "Ambient Ocean",
		colors: ["#2B5876", "#4E4376"],
		description: "심해를 연상시키는 어둡고 차분한 블루-퍼플 그라데이션",
		theme: "다크 테마에 적합",
		keywords: ["엠비언트", "차분한", "공간감"],
		usage:
			"핀테크 대시보드나 보안 솔루션 웹사이트 등 전문적인 분위기의 다크 모드 배경에 적합",
	},
	{
		id: "auroraNight",
		name: "Aurora Night",
		colors: ["#00EA8D", "#017ED5", "#B53DFF"],
		description: "오로라 밤하늘을 모티브로 한 다채로운 색상의 그라데이션",
		theme: "다크 테마에 적합",
		keywords: ["다채로운", "역동적", "몽환적인"],
		usage:
			"크리에이티브 스튜디오나 SF 테마의 웹사이트, 게임이나 음악 페스티벌 홍보 페이지에 적합",
	},
	{
		id: "techBlue",
		name: "Tech Blue",
		colors: ["#2193B0", "#6DD5ED"],
		description: "모던한 IT스타일의 신뢰감을 주는 블루 계열 그라데이션",
		theme: "라이트/다크 모두 활용 가능",
		keywords: ["기술적", "신뢰감", "깨끗한 느낌"],
		usage:
			"테크 기반 스타트업 랜딩 페이지나 SaaS 웹사이트 헤더에 적합, Stripe 등 현대적 기업 웹사이트에서 많이 사용",
	},
	{
		id: "pureRed",
		name: "Pure Red",
		colors: ["#FF0000", "#FF4444"],
		description: "순수한 빨간색과 밝은 빨간색의 원색 그라데이션",
		theme: "다크 테마에 적합",
		keywords: ["강렬한", "원색", "에너지"],
		usage: "오비탈 애니메이션의 역동적인 색상 변화에 적합",
	},
	{
		id: "pureBlue",
		name: "Pure Blue",
		colors: ["#0000FF", "#4444FF"],
		description: "순수한 파란색과 밝은 파란색의 원색 그라데이션",
		theme: "다크 테마에 적합",
		keywords: ["차분한", "원색", "신뢰감"],
		usage: "오비탈 애니메이션의 안정적인 색상 표현에 적합",
	},
	{
		id: "pureGreen",
		name: "Pure Green",
		colors: ["#00FF00", "#44FF44"],
		description: "순수한 초록색과 밝은 초록색의 원색 그라데이션",
		theme: "다크 테마에 적합",
		keywords: ["자연적", "원색", "성장"],
		usage: "오비탈 애니메이션의 생동감 있는 색상 연출에 적합",
	},
	{
		id: "pureYellow",
		name: "Pure Yellow",
		colors: ["#FFFF00", "#FFFF44"],
		description: "순수한 노란색과 밝은 노란색의 원색 그라데이션",
		theme: "다크 테마에 적합",
		keywords: ["밝은", "원색", "활기찬"],
		usage: "오비탈 애니메이션의 화사한 색상 포인트에 적합",
	},
];

/**
 * 메시 그라데이션 팔레트 데이터
 * 각 팔레트는 최소 3개 이상의 색상 포인트를 포함합니다.
 * 다양한 포인트의 균등 분포로 부드러운 메시 그라데이션 효과에 최적화되어 있습니다.
 */
export const meshGradientPalettes = [
	{
		id: "hyperpopPalettes",
		name: "Hyperpop Palettes",
		colors: ["#39FF14", "#FF59AC", "#D080FF", "#80EFFF"],
		description:
			"네온 그린과 바비핑크에 라일락 보라, 하늘색 등을 섞은 대담하고 키치한 팔레트",
		theme: "다크",
		keywords: ["에너지", "디지털", "레트로"],
		usage: "크리에이티브 브랜드나 엔터테인먼트 스타트업의 브랜딩에 적합",
	},
	{
		id: "darkAndMossy",
		name: "Dark and Mossy",
		colors: ["#2F4538", "#556B2F", "#8A9A5B"],
		description: "자연의 이끼와 낙엽에서 영감을 얻은 어둡고 차분한 녹색 팔레트",
		theme: "다크",
		keywords: ["감성적", "엠비언트", "하이엔드"],
		usage:
			"자연 친화적 크리에이티브 브랜드, 웰니스/푸드 분야 (브랜드에 깊이와 안정감 부여)",
	},
	{
		id: "piercingCanary",
		name: "Piercing Canary",
		colors: ["#FFD600", "#E3FF33", "#B5A100"],
		description: "눈에 확 들어오는 선명한 카나리아 옐로 팔레트",
		theme: "양쪽 다",
		keywords: ["에너지", "테크니컬", "미래지향적"],
		usage: "AI/테크 스타트업의 랜딩 페이지나 혁신적인 브랜드에 추천",
	},
	{
		id: "twoToneRiverbed",
		name: "Two-Tone Riverbed",
		colors: ["#299DA6", "#905A3C", "#F2ECE2"],
		description: "수중 블루와 커피 브라운의 투톤 조합 팔레트",
		theme: "양쪽 다",
		keywords: ["레트로", "엠비언트", "테크니컬"],
		usage: "레트로-퓨처리즘 컨셉의 크리에이티브 브랜드나 제품 소개 페이지 등",
	},
	{
		id: "boxOfCrayons",
		name: "Box of Crayons",
		colors: ["#E62B1E", "#F9D41C", "#1B9E2E", "#005BBB", "#8B3DFA"],
		description: "동심을 불러일으키는 알록달록한 팔레트",
		theme: "양쪽 다",
		keywords: ["에너지", "레트로", "감성적"],
		usage: "키즈 패션/교육 브랜드나 일러스트 포트폴리오 등에 적합한 팔레트",
	},
	{
		id: "electricFlamingo",
		name: "Electric Flamingo",
		colors: ["#FF0A9E", "#FF9300", "#FFEE00"],
		description:
			"2025년 가장 밝은 트렌드 팔레트로 손꼽히는 네온 핑크-옐로 조합",
		theme: "다크",
		keywords: ["네온", "강렬한", "트렌디"],
		usage:
			"패션 브랜드, 엔터테인먼트 이벤트, 온라인 쇼핑몰 등 젊은 타겟층 대상 서비스",
	},
	{
		id: "midnightLavender",
		name: "Midnight Lavender",
		colors: ["#292E49", "#536976", "#BBD2C5", "#8572B7"],
		description:
			"깊은 밤하늘의 남색과 라벤더 보라, 안개 낀 새벽 등 심도 있는 블루-퍼플 계열 팔레트",
		theme: "다크",
		keywords: ["고급스러운", "신비로운", "몽환적"],
		usage: "럭셔리 브랜드, 웹소설 플랫폼, 감성적인 콘텐츠 제공 서비스에 적합",
	},
	{
		id: "opalescentDawn",
		name: "Opalescent Dawn",
		colors: ["#F5F0FF", "#E0F7FF", "#FFE9F0", "#EAF8EF"],
		description: "새벽빛처럼 맑고 부드러운 파스텔 그라데이션 팔레트",
		theme: "라이트",
		keywords: ["몽환적", "파스텔", "미니멀"],
		usage:
			"웰니스·뷰티 브랜드나 미니멀 포트폴리오에 추천—흰 배경에서도 은은한 공간감을 형성",
	},
	{
		id: "lunarHaze",
		name: "Lunar Haze",
		colors: ["#1A1E2A", "#302B5B", "#604C9F", "#5498B9"],
		description: "달빛이 깃든 심야 안개를 모티브로 한 저채도 보라‑블루 팔레트",
		theme: "다크",
		keywords: ["엠비언트", "은은한", "SF"],
		usage:
			"AI·테크 스타트업 랜딩이나 음악/영상 포트폴리오 등 다크 UI에서 몽환적 깊이를 강조",
	},
	{
		id: "mintBlueberry",
		name: "Mint Blueberry",
		colors: ["#2AF598", "#08AEEA", "#38369E", "#654EA3"],
		description:
			"상큼한 민트에서 블루베리까지 이어지는 시원하고 달콤한 컬러 조합",
		theme: "라이트",
		keywords: ["상쾌한", "밝은", "케주얼"],
		usage: "음료 브랜드, 디저트 카페, 여름 시즌 프로모션 사이트에 어울림",
	},
	{
		id: "earlyAutumn",
		name: "Early Autumn",
		colors: ["#BF6537", "#E9B56D", "#FFC68D", "#DFC07C"],
		description: "초가을의 따뜻한 색감을 담은 황금빛 브라운 계열 팔레트",
		theme: "양쪽 다",
		keywords: ["따뜻한", "편안한", "고급스러운"],
		usage:
			"홈 인테리어 브랜드, 카페, 베이커리, 가을 시즌 프로모션 사이트에 적합",
	},
	{
		id: "deepOcean",
		name: "Deep Ocean",
		colors: ["#1D2B64", "#0F4C81", "#5BC0EB", "#2E5EAA"],
		description: "심해의 다양한 블루 색조를 표현한 깊이감 있는 팔레트",
		theme: "다크",
		keywords: ["차분한", "집중력", "신뢰감"],
		usage:
			"금융, 보안, 의료 등 신뢰가 중요한 분야의 브랜드나 B2B 서비스에 적합",
	},
];
