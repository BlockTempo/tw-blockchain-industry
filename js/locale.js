const i18nMapping = {
    zh: {
        "nav-item-map": "台灣區塊鏈產業地圖",
        "nav-item-news-slider": "台灣產業消息",
        "nav-item-viewpoints": "產業名人觀點",
        "nav-item-website": "動區新聞",
        "nav-item-register": "申請上架",
        "header-title": "台灣區塊鏈產業地圖",
        "header-desc": "一站式掌握台灣區塊鏈產業 200+ 企業現況",
        "header-signup-placeholder": "輸入Email，掌握產業脈動",
        "header-signup-button": "立即訂閱",
        "header-intro": "本地圖由以下單位共同製作：",
        "container-map-title": "台灣區塊鏈產業地圖",
        "container-map-switcher-map": "地圖",
        "container-map-switcher-list": "清單",
        "container-map-download": "下載地圖",
        "container-map-update": "更新日期：",
        "container-map-see-more": "點擊查看更多...",
        "container-news-slider-title": "台灣產業消息",
        "container-news-slider-type-all": "全部",
        "container-news-slider-type-law": "法規",
        "container-news-slider-type-application": "區塊鏈商業應用",
        "container-news-slider-type-market": "加密貨幣市場",
        "container-news-slider-type-interview": "人物專訪",
        "container-news-slider-type-view": "獨立觀點",
        "container-news-slider-type-guide": "區塊鏈新手教學",
        "container-viewpoints-title": "產業名人觀點",
        "container-edm-title": "為您整理一週國內外<span>焦點動態</span>",
        "container-edm-subscribe-placeholder": "Your email",
        "container-edm-subscribe": "訂閱週報",
        "footer-intro-one": "台灣最具影響力的區塊鏈媒體",
        "footer-intro-two": "最即時全面的區塊鏈產業新聞站",
        "footer-about": "關於BlockTempo",
        "footer-channel-title": "動區頻道",
        "footer-channel-twitter": "動區 Twitter",
        "footer-channel-telegram": "動區 Telegram",
        "footer-channel-line": "動區 LINE 帳號",
        "footer-channel-instagram": "動區 Instagram",
        "footer-channel-facebook": "動區 FB 粉絲專頁",
        "footer-channel-youtube": "動區 YouTube 頻道",
        "footer-topic": "精選專題",
        "footer-topic-abs": "亞洲區塊鏈高峰會(ABS)",
        "footer-topic-guide": "動區新手村",
        "footer-topic-meet": "動區塊聚 BLOCKMEET",
        "footer-topic-Influence": "2023 台灣區塊鏈影響力人物",
        "footer-social": "動區社群",
        "footer-social-magnate": "幣圈大戶內線情報",
        "footer-social-magnate-2": "動區大戶情報2群",
        "footer-social-bt-tg": "BlockTempo 官方討論群",
        "footer-social-contract": "區塊鏈技術與智能合約研究社群",
        "footer-social-blockchain": "台灣區塊鏈/比特幣/加密貨幣社群",
        "footer-copyright": "動區動趨 BlockTempo © All Rights Reserved.",
        "item-link-goto": "直達",
        "item-link-website": "官網",
        "item-detail-news": "新聞彙整",
        "item-detail-industry": "相關產業"
    },
    en: {
        "nav-item-map": "Map",
        "nav-item-news-slider": "News",
        "nav-item-viewpoints": "Insights",
        "nav-item-website": "BlockTempo Media",
        "nav-item-register": "Apply for Listing",
        "header-title": "Taiwan Blockchain Ecosystem Map",
        "header-desc": "One-stop to grasp the status of 200+ enterprises in Taiwan's blockchain industry",
        "header-signup-placeholder": "Enter your Email to stay updated",
        "header-signup-button": "Subscribe",
        "header-intro": "The map is jointly produced by the following units:",
        "container-map-title": "Taiwan Blockchain Ecosystem Map",
        "container-map-switcher-map": "Map",
        "container-map-switcher-list": "List",
        "container-map-download": "Download Map",
        "container-map-update": "Last Updated:",
        "container-map-see-more": "See More...",
        "container-news-slider-title": "Industry News",
        "container-news-slider-type-all": "All",
        "container-news-slider-type-law": "Regulations",
        "container-news-slider-type-application": "Industry News",
        "container-news-slider-type-market": "Celebrity Updates",
        "container-news-slider-type-interview": "Interviews",
        "container-news-slider-type-view": "Hot Topics",
        "container-news-slider-type-guide": "Beginner's Guide",
        "container-viewpoints-title": "Experts' Insights",
        "container-edm-title": "Curating weekly highlights<span> from global news</span>",
        "container-edm-subscribe-placeholder": "Your email",
        "container-edm-subscribe": "Subscribe",
        "footer-intro-one": "Taiwan's Most Influential Blockchain Media",
        "footer-intro-two": "The ultimate blockchain news site.",
        "footer-about": "About BlockTempo",
        "footer-channel-title": "BlockTempo Channels",
        "footer-channel-twitter": "Twitter",
        "footer-channel-telegram": "Telegram",
        "footer-channel-line": "LINE Account",
        "footer-channel-instagram": "Instagram",
        "footer-channel-facebook": "Facebook",
        "footer-channel-youtube": "YouTube",
        "footer-topic": "Featured Topics",
        "footer-topic-abs": "Asia Blockchain Summit (ABS)",
        "footer-topic-guide": "BlockTempo Beginner's Village",
        "footer-topic-meet": "BLOCKMEET by BlockTempo",
        "footer-topic-Influence": "2023 Taiwan Blockchain Influence Figures",
        "footer-social": "BlockTempo Community",
        "footer-social-magnate": "Inside Information of Cryptocurrency Big Shots",
        "footer-social-magnate-2": "BlockTempo Big Shots Information Group 2",
        "footer-social-bt-tg": "BlockTempo Official Discussion Group",
        "footer-social-contract": "Blockchain Technology and Smart Contract Research Community",
        "footer-social-blockchain": "Taiwan Blockchain/Bitcoin/Cryptocurrency Community",
        "footer-copyright": "BlockTempo © All Rights Reserved.",
        "item-link-goto": "Goto",
        "item-link-website": "Website",
        "item-detail-news": "News Digest",
        "item-detail-industry": "Related Industries"
    }
};

const userLang = localStorage.getItem('_lang') || navigator.language || navigator.userLanguage; 
let langCode = userLang.substr(0, 2);

if ( !i18nMapping[langCode] ) {
    langCode = "zh";
}

const _t = word => {
    return i18nMapping[langCode][word] || word;
};

const _tApply = html => {
    let res = html;
    for ( const [key, value] of Object.entries( i18nMapping[langCode] ) ) {
        res = res.replaceAll("{%" + key + "%}", value);
    }
    return res;
};

const _changeLang = code => {
    localStorage.setItem('_lang', code);
};
