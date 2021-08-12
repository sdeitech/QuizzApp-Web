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
const DetailContestWithPlay = React.lazy(() => import('./views/contest/contest_detail'))
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
const YourFriends = React.lazy(() => import("./views/your_friends/view"));

const PrivacyPolicy = React.lazy(() => import("./views/cms/privacy_policy"));

const TermsConditions = React.lazy(() =>
    import("./views/cms/terms_conditions")
);

const Leaderboard = React.lazy(() => import("./views/leaderboard/view"));

const videoChat = React.lazy(() => import("./views/chat/view"));

const Dashboard_Trending_Contest = React.lazy(() => import("./views/dashboard_trending_contest/view"));
const Dashboard_Trending_Rounds = React.lazy(() => import("./views/dashboard_trending_round/view"));
const plans = React.lazy(() => import("./views/plans/view"));
const cards = React.lazy(() => import("./views/cards/view"));
const add_card = React.lazy(() => import("./views/cards/add"));

const RoundWords = React.lazy(() => import("./views/words/view"));
const AddRoundWords = React.lazy(() => import("./views/words/add"));
const EditRoundWords = React.lazy(() => import("./views/words/edit"));

const QuestionType = React.lazy(() => import("./views/question_type/view"));

const routes = [
    { path: '/', exact: true, name: 'Home', component: Home },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/notification', name: 'Notification', component: Notification },
    { path: '/yourfriends', name:'YourFriends', component:YourFriends},
    { path: '/contest', name: 'Contest', component: Contest },
    { path: '/trending_contest', name: 'Dashboard_Trending_Contest', component: Dashboard_Trending_Contest },
    { path: '/trending_rounds', name: 'Dashboard_Trending_Rounds', component: Dashboard_Trending_Rounds },
    { path: '/contests/start_round', name: 'StartRound', component: StartRound },
 
    { path: '/games_history', name: 'GamesHistory', component: GamesHistory },    
    { path: '/add_contest', name: 'AddContest', component: AddContest },
    { path: '/edit_contest', name: 'EditContest', component: EditContest },
    { path: '/contests/detail', name: 'DetailContestWithPlay', component: DetailContestWithPlay },
    { path: '/contests/game/start', name: 'DetailContestWithQuestionList', component: DetailContestWithQuestionList },
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
    { path: "/plans", name: "plans", component: plans },
    { path: "/cards", name: "cards", component: cards },
    { path: "/add_card", name: "add_card", component: add_card },    
    { path: '/round_words', name: 'RoundWords', component: RoundWords },
    { path: '/add_round_word', name: 'AddRoundWords', component: AddRoundWords },
    { path: '/edit_round_word', name: 'EditRoundWords', component: EditRoundWords },
    { path: '/question_type', name: 'QuestionType', component: QuestionType },
    
]

export default routes;
