import React from 'react'

const Home = React.lazy(() => import('./views/home/view'))
const Category = React.lazy(() => import('./views/category/view'))
const Brand = React.lazy(() => import('./views/brand/view'))

// Manage Contests
const Contest = React.lazy(() => import('./views/contest/view'))
const GamesHistory = React.lazy(() => import('./views/games_history/view'))

const AddContest = React.lazy(() => import('./views/contest/add'))
const EditContest = React.lazy(() => import('./views/contest/edit'))

// Manage Rounds
const Tray = React.lazy(() => import('./views/tray/view'))
const Round = React.lazy(() => import('./views/round/view'))
const AddRound = React.lazy(() => import('./views/round/add'))



const RoundQuestion = React.lazy(() => import('./views/roundquestion/view'))
const AddRoundQuestion = React.lazy(() => import('./views/roundquestion/add'))
const EditRoundQuestion = React.lazy(() => import('./views/roundquestion/edit'))



const routes = [
    { path: '/', exact: true, name: 'Home', component: Home },
    { path: '/contest', name: 'Contest', component: Contest },
    { path: '/games_history', name: 'GamesHistory', component: GamesHistory },
    
    { path: '/add_contest', name: 'AddContest', component: AddContest },
    { path: '/edit_contest', name: 'EditContest', component: EditContest },
    { path: '/tray', name: 'Tray', component: Tray },

    { path: '/roundquestion', name: 'RoundQuestion', component: RoundQuestion },
    { path: '/add_round_question', name: 'AddRoundQuestion', component: AddRoundQuestion },
    { path: '/edit_round_question', name: 'EditRoundQuestion', component: EditRoundQuestion },

    { path: '/round', name: 'Round', component: Round },
    { path: '/add_round', name: 'AddRound', component: AddRound },
    { path: '/choose_category', name: 'Category', component: Category },
    { path: '/choose_brand', name: 'Brand', component: Brand },
]

export default routes
