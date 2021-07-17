import BlogStore from './blog'
import ShellStore from './shell'

export default {
  shellStore: new ShellStore(),
  blogStore: new BlogStore(),
}
