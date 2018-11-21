const state = {
  /* control the navigation drawer */
  IF_DRAWER: false,
  /* control the dark model */
  IS_DARK: localStorage.getItem('darkModel') === 'true',
  /* show completed task */
  SHOW_ALL: localStorage.getItem('SHOW_ALL') === 'true',
  /* login state */
  USER_ID: null || localStorage.getItem('userId'),
  /* tasks for specific user when entered today */
  TASKS: [],
  USER_DASH: [],
  EMPLOYEE_DASH: [],
  TASK_TAGS: ['质量', '成本', '交付', '安全', '员工', '其他'],
  CRON_DESCRIPTION: '',
  /* for menu items */
  WEEK_INDEX: [
    { 'itemValue': '#1', 'itemText': '第一个' },
    { 'itemValue': '#2', 'itemText': '第二个' },
    { 'itemValue': '#3', 'itemText': '第三个' },
    { 'itemValue': '#4', 'itemText': '第四个' }
  ],
  /* for menu items */
  WORKDAY_INDEX: [
    { 'itemValue': '1', 'itemText': '星期一', 'itemIcon': 'mdi-numeric-1-box' },
    { 'itemValue': '2', 'itemText': '星期二', 'itemIcon': 'mdi-numeric-2-box' },
    { 'itemValue': '3', 'itemText': '星期三', 'itemIcon': 'mdi-numeric-3-box' },
    { 'itemValue': '4', 'itemText': '星期四', 'itemIcon': 'mdi-numeric-4-box' },
    { 'itemValue': '5', 'itemText': '星期五', 'itemIcon': 'mdi-numeric-5-box' },
    { 'itemValue': '1-5', 'itemText': '工作日', 'itemIcon': 'mdi-robot' }
  ],
  CRON_EXPRESSION: {
    MINUTE: '59',
    HOUR: '23',
    DAY_OF_MONTH: '',
    MONTH: '',
    DAY_OF_WEEK: []
  },
  TASK: {
    TASK_TITLE: null,
    TASK_DESCRIPTION: null,
    TASK_CRON_EXPRESSION: null,
    TASK_CRON_EXPRESSION_DESCRIPTION: null,
    TASK_NEXT_LOOP_AT: null,
    TASK_REMIND_AT: null,
    TASK_IS_DONE: null,
    TASK_IS_LOOP: null
  },
  DEFAULT_LANG: localStorage.getItem('LOCALE') || 'CN',
  LANGUAGE_MENU: [
    { id: 1, locale: 'CN', description: '中文', icon: 'settings' },
    { id: 2, locale: 'EN', description: 'English', icon: 'settings' }
  ]
}

export default state
