const state = {
  /* control the navigation drawer */
  IF_DRAWER: false,
  /* control the dark model */
  IS_DARK: localStorage.getItem('darkModel') === 'true',
  /* show completed task */
  SHOW_ALL: localStorage.getItem('SHOW_ALL') === 'true',
  /* login state */
  USER_ID: null || localStorage.getItem('userId'),
  TASKS: [],
  USER_DASH: [],
  EMPLOYEE_DASH: [],
  TASK_TAGS: ['质量', '成本', '交付', '安全', '员工']
}

export default state
