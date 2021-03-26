import React from "react";

const Home = React.lazy(() => import("./views/home/view"));
const Category = React.lazy(() => import("./views/category/view"));
const Brand = React.lazy(() => import("./views/brand/view"));

// Manage Contests
const Contest = React.lazy(() => import('./views/contest/view'))
const StartRound = React.lazy(() => import('./views/contest/start_round'))


const GamesHistory = React.lazy(() => import('./views/games_history/view'))

const AddContest = React.lazy(() => import('./views/contest/add'))
const EditContest = React.lazy(() => import('./views/contest/edit'))
const DetailContestWithRoundList = React.lazy(() => import('./views/contest/detail_with_round_list'))
const DetailContestWithQuestionList = React.lazy(() => import('./views/contest/detail_with_question_list'))


// Manage Rounds
const Tray = React.lazy(() => import("./views/tray/view"));

const RoundDetail = React.lazy(() => import("./views/tray/detail"));
const matchitDetail = React.lazy(() => import("./views/tray/matchit"));

const Round = React.lazy(() => import("./views/round/view"));
const AddRound = React.lazy(() => import("./views/round/add"));

const RoundQuestion = React.lazy(() => import("./views/roundquestion/view"));
const AddRoundQuestion = React.lazy(() => import("./views/roundquestion/add"));
const EditRoundQuestion = React.lazy(() =>
    import("./views/roundquestion/edit")
);

const DetailContest = React.lazy(() => import("./views/contest/detail"));
const Invite = React.lazy(() => import("./views/startGame/view"));
const StartGame = React.lazy(() => import("./views/startGame/start"));
const MyAccount = React.lazy(() => import("./views/my_account/view"));

const MyGroups = React.lazy(() => import("./views/my_groups/view"));

const Dashboard = React.lazy(() => import("./views/dashboard/view"));

const Notification = React.lazy(() => import("./views/notification/view"));

const PrivacyPolicy = React.lazy(() => import("./views/cms/privacy_policy"));

const TermsConditions = React.lazy(() =>
    import("./views/cms/terms_conditions")
);

const Leaderboard = React.lazy(() => import("./views/leaderboard/view"));

const videoChat = React.lazy(() => import("./views/chat/view"));



const routes = [
    { path: '/', exact: true, name: 'Home', component: Home },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/notification', name: 'Notification', component: Notification },
    { path: '/contest', name: 'Contest', component: Contest },
    { path: '/contests/start_round', name: 'StartRound', component: StartRound },
    
    { path: '/games_history', name: 'GamesHistory', component: GamesHistory },    
    { path: '/add_contest', name: 'AddContest', component: AddContest },
    { path: '/edit_contest', name: 'EditContest', component: EditContest },
    { path: '/contests/detail', name: 'DetailContestWithRoundList', component: DetailContestWithRoundList },
    { path: '/contests/game/start', name: 'DetailContestWithRoundList', component: DetailContestWithQuestionList },
    { path: '/tray', name: 'Tray', component: Tray },
    { path: '/matchit', name: 'matchitDetail', component: matchitDetail },
    { path: '/roundquestion', name: 'RoundQuestion', component: RoundQuestion },
    { path: '/add_round_question', name: 'AddRoundQuestion', component: AddRoundQuestion },
    { path: '/edit_round_question', name: 'EditRoundQuestion', component: EditRoundQuestion },
    { path: '/round', name: 'Round', component: Round },
    { path: '/detail-round', name: 'RoundDetail', component: RoundDetail },
    { path: '/add_round', name: 'AddRound', component: AddRound },
    { path: '/choose_category', name: 'Category', component: Category },
    { path: '/choose_brand', name: 'Brand', component: Brand },
    { path: '/detail-contest', name: 'DetailContest', component: DetailContest },
    { path: '/start-game', name: 'Invite', component: Invite },
    { path: '/play-game', name: 'StartGame', component: StartGame },    
    { path: '/my_account', name: 'MyAccount', component: MyAccount },
    { path: '/privacy_policy', name: 'PrivacyPolicy', component: PrivacyPolicy },
    { path: '/terms_conditions', name: 'TermsConditions', component: TermsConditions },
    { path: '/my_groups', name: 'MyGroups', component: MyGroups },
    { path: '/leaderboard', name: 'Leaderboard', component: Leaderboard },
    { path: "/videoChat", name: "videoChat", component: videoChat },

    
]

export default routes;
