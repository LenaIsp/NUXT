const pagesAbout = [
    // {
    //     to: '/about/company',
    //     name: 'about.header.company',
    //     routeName: 'AboutCompany',
    //     routeNameNuxt: 'index-about-company___'
    // },
    {
        to: '/about/strategy',
        name: 'about.header.strategy',
        routeName: 'AboutStrategy',
        routeNameNuxt: 'index-about-strategy___'
    },
    {
        to: '/about/leadership',
        name: 'about.header.leadership',
        routeName: 'AboutLeadership',
        routeNameNuxt: 'index-about-leadership___'
    },
    {
        to: '/about/responsibility',
        name: 'about.header.responsibility',
        routeName: 'AboutResponsibility',
        routeNameNuxt: 'index-about-responsibility___'
    },
    {
        to: '/about/awards',
        name: 'about.header.awards',
        routeName: 'AboutAwards',
        routeNameNuxt: 'index-about-awards___'
    },
    {
        to: '/about/career',
        name: 'about.header.career',
        routeName: 'AboutCareer',
        routeNameNuxt: 'index-about-career___'
    },
    {
        to: '/about/history',
        name: 'about.header.history',
        routeName: 'AboutHistory',
        routeNameNuxt: 'index-about-history___'
    },
];

const pagesAll = [
    {
        to: '/business',
        name: 'header.biz',
        routeName: 'Business',
        children: pagesAbout,
    },
    {
        to: '/media',
        name: 'header.media',
        routeName: 'Media',
    },
    {
        to: '/about/strategy',
        name: 'header.about',
        routeName: 'About',
        children: pagesAbout,
    },
    {
        to: '/contacts',
        name: 'header.contacts',
        routeName: 'Contacts',
    },
];
const mapPage = [
    {
        to: '/sitemap',
        name: 'map.title',
        routeName: 'sitemap',
    }
];

export default {
    pagesAbout,
    pagesAll,
    mapPage,
};
