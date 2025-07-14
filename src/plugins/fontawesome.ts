import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBell,
  faChevronDown,
  faCircleXmark,
  faCog,
  faMagnifyingGlass,
  faPaperPlane,
  faPlus,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlus, faPaperPlane, faRightFromBracket, faBell, faCog, faChevronDown, faMagnifyingGlass, faCircleXmark)

export default (app: any) => {
  app.component('font-awesome-icon', FontAwesomeIcon)
}
