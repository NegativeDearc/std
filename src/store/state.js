const state = {
  /* control the navigation drawer */
  IF_DRAWER: false,
  LEFT_DRAWER: true,
  RIGHT_DRAWER: false,
  /* control the dark model */
  IS_DARK: localStorage.getItem('darkModel') === 'true',
  /* show completed task */
  SHOW_ALL: localStorage.getItem('SHOW_ALL') === 'true',
  /* login state */
  USER: {
    USER_ID: null || localStorage.getItem('userId'),
    USER_NAME: null || localStorage.getItem('userName'),
    USER_GROUP: null || localStorage.getItem('userName')
  },
  // the whole task collections
  TASKS: [],
  // the specific task collections
  TASK: [],
  USER_DASH: [],
  EMPLOYEE_DASH: [],
  TASK_TAGS: ['质量', '成本', '交付', '效率', '安全', '员工', '其他'],
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
    DAY_OF_WEEK: ''
  },
  DEFAULT_LANG: localStorage.getItem('LOCALE') || 'CN',
  LANGUAGE_MENU: [
    { id: 1, locale: 'CN', description: '中文', icon: 'flag-icon flag-icon-cn' },
    { id: 2, locale: 'EN', description: 'English', icon: 'flag-icon flag-icon-us' }
  ],
  SPECIFIC_TASK_ID: null,
  RRULE: {
    frequency: [
      {'value': '1', 'text': 'Daily'},
      {'value': '2', 'text': 'Weekly'},
      {'value': '3', 'text': 'Monthly'},
      {'value': '4', 'text': 'Yearly'}
    ],
    week: [
      {'value': '1', 'text': 'First'},
      {'value': '2', 'text': 'Second'},
      {'value': '3', 'text': 'Third'},
      {'value': '4', 'text': 'Fourth'}
    ],
    weekday: [
      {'value': 'MO', 'text': 'Mon'},
      {'value': 'TU', 'text': 'Tue'},
      {'value': 'WE', 'text': 'Wed'},
      {'value': 'TH', 'text': 'Thu'},
      {'value': 'FR', 'text': 'Fri'},
      {'value': 'SA', 'text': 'Sat'},
      {'value': 'SU', 'text': 'Sun'},
      {'value': 'MO,TU,WE,TH,FR,SA,SU', 'text': 'Day'},
      {'value': 'MO,TU,WE,TH,FR', 'text': 'Weekday'},
      {'value': 'SA,SU', 'text': 'Weekend day'}
    ],
    day: [
      {'value': '1', 'text': '1'},
      {'value': '2', 'text': '2'},
      {'value': '3', 'text': '3'},
      {'value': '4', 'text': '4'},
      {'value': '5', 'text': '5'},
      {'value': '6', 'text': '6'},
      {'value': '7', 'text': '7'},
      {'value': '8', 'text': '8'},
      {'value': '9', 'text': '9'},
      {'value': '10', 'text': '10'},
      {'value': '11', 'text': '11'},
      {'value': '12', 'text': '12'},
      {'value': '13', 'text': '13'},
      {'value': '14', 'text': '14'},
      {'value': '15', 'text': '15'},
      {'value': '16', 'text': '16'},
      {'value': '17', 'text': '17'},
      {'value': '18', 'text': '18'},
      {'value': '19', 'text': '19'},
      {'value': '20', 'text': '20'},
      {'value': '21', 'text': '21'},
      {'value': '22', 'text': '22'},
      {'value': '23', 'text': '23'},
      {'value': '24', 'text': '24'},
      {'value': '25', 'text': '25'},
      {'value': '26', 'text': '26'},
      {'value': '27', 'text': '27'},
      {'value': '28', 'text': '28'},
      {'value': '29', 'text': '29'},
      {'value': '30', 'text': '30'},
      {'value': '31', 'text': '31'}
    ],
    month: [
      {'value': '1', 'text': 'January'},
      {'value': '2', 'text': 'February'},
      {'value': '3', 'text': 'March'},
      {'value': '4', 'text': 'April'},
      {'value': '5', 'text': 'May'},
      {'value': '6', 'text': 'June'},
      {'value': '7', 'text': 'July'},
      {'value': '8', 'text': 'August'},
      {'value': '9', 'text': 'September'},
      {'value': '10', 'text': 'October'},
      {'value': '11', 'text': 'November'},
      {'value': '12', 'text': 'December'}
    ]
  },
  RRULE_STRING: {
    LOOP: {},
    END: {}
  },
  CRON_RULE: {
    frequency: [
      {'value': '1', 'text': 'Daily'},
      {'value': '2', 'text': 'Weekly'},
      {'value': '3', 'text': 'Monthly'},
      {'value': '4', 'text': 'Yearly'}
    ],
    week: [
      {'value': '1', 'text': 'First'},
      {'value': '2', 'text': 'Second'},
      {'value': '3', 'text': 'Third'},
      {'value': '4', 'text': 'Fourth'},
      {'value': '-1', 'text': 'Last'}
    ],
    weekday: [
      {'value': 'MON', 'text': 'Mon'},
      {'value': 'TUE', 'text': 'Tue'},
      {'value': 'WED', 'text': 'Wed'},
      {'value': 'THU', 'text': 'Thu'},
      {'value': 'FRI', 'text': 'Fri'},
      {'value': 'SAT', 'text': 'Sat'},
      {'value': 'SUN', 'text': 'Sun'},
      {'value': 'MON,TUE,WED,THU,FRI,SAT,SUN', 'text': 'Day'},
      {'value': 'MON,TUE,WED,THU,FRI', 'text': 'Weekday'},
      {'value': 'SAT,SUN', 'text': 'Weekend day'}
    ],
    day: [
      {'value': '1', 'text': '1'},
      {'value': '2', 'text': '2'},
      {'value': '3', 'text': '3'},
      {'value': '4', 'text': '4'},
      {'value': '5', 'text': '5'},
      {'value': '6', 'text': '6'},
      {'value': '7', 'text': '7'},
      {'value': '8', 'text': '8'},
      {'value': '9', 'text': '9'},
      {'value': '10', 'text': '10'},
      {'value': '11', 'text': '11'},
      {'value': '12', 'text': '12'},
      {'value': '13', 'text': '13'},
      {'value': '14', 'text': '14'},
      {'value': '15', 'text': '15'},
      {'value': '16', 'text': '16'},
      {'value': '17', 'text': '17'},
      {'value': '18', 'text': '18'},
      {'value': '19', 'text': '19'},
      {'value': '20', 'text': '20'},
      {'value': '21', 'text': '21'},
      {'value': '22', 'text': '22'},
      {'value': '23', 'text': '23'},
      {'value': '24', 'text': '24'},
      {'value': '25', 'text': '25'},
      {'value': '26', 'text': '26'},
      {'value': '27', 'text': '27'},
      {'value': '28', 'text': '28'},
      {'value': '29', 'text': '29'},
      {'value': '30', 'text': '30'},
      {'value': '31', 'text': '31'}
    ],
    month: [
      {'value': '1', 'text': 'January'},
      {'value': '2', 'text': 'February'},
      {'value': '3', 'text': 'March'},
      {'value': '4', 'text': 'April'},
      {'value': '5', 'text': 'May'},
      {'value': '6', 'text': 'June'},
      {'value': '7', 'text': 'July'},
      {'value': '8', 'text': 'August'},
      {'value': '9', 'text': 'September'},
      {'value': '10', 'text': 'October'},
      {'value': '11', 'text': 'November'},
      {'value': '12', 'text': 'December'}
    ]
  },
  /* connection status with sever */
  CONNECTION_STATUS: true
}

export default state
