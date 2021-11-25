
import SettingsPage from '../pages/settings.vue';
import Character from '../pages/character.vue';
import Map from '../pages/map.vue';
import Talent from '../pages/talent.vue';
import HomePage from '../pages/home.vue';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path:'/character/',
    component: Character,
  },
  {
    path:'/map/',
    component: Map,
  },
  {
    path:'/talent/',
    component: Talent,
  },
  {
    path: '/settings/',
    component: SettingsPage,
  }
];

export default routes;
