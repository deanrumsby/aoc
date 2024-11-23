export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'slate'
  },
  header: {
    logo: {
      alt: '',
      light: '',
      dark: ''
    },
    search: true,
    colorMode: true,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/deanrumsby/aoc',
      'target': '_blank',
      'aria-label': 'Code repository for the site'
    }]
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Community',
      edit: 'https://github.com/deanrumsby/aoc',
      links: [{
        icon: 'i-heroicons-star',
        label: 'Star on GitHub',
        to: 'https://github.com/deanrumsby/aoc',
        target: '_blank'
      }]
    }
  }
})
