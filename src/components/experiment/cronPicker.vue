<template>
  <v-dialog
    full-width
    lazy
    max-width="600px"
    v-model="cronPicker"
    v-bind:return-value="TASK.CRON_EXPRESSION_DESCRIPTION"
  >
    <v-form ref="dateForm">
      <v-card>
        <v-toolbar dark color="green red--after">
          <v-btn icon v-on:click.native="goBack" v-if="windowDialog !==1">
            <v-icon>chevron_left</v-icon>
          </v-btn>
          <v-btn icon v-on:click.stop="closeCronForm" v-else>
            <v-icon>close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-title>选择日期</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon v-bind:disabled="windowDialog === 1" flat v-on:click.stop="settingCron"><v-icon>check</v-icon></v-btn>
        </v-toolbar>
        <v-window v-model="windowDialog" touchless>
          <v-window-item v-bind:value="1" lazy>
            <v-list>
              <v-subheader>循环任务</v-subheader>
              <v-list-tile v-on:click.stop="allWorkDay">
                <v-list-tile-action><v-icon>mdi-calendar-range</v-icon></v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>工作日</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action></v-list-tile-action>
              </v-list-tile>
              <v-divider></v-divider>
              <v-list-tile v-on:click.stop="goWindow(2)">
                <v-list-tile-action><v-icon>mdi-calendar-week</v-icon></v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>周</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action><v-icon>more_vert</v-icon></v-list-tile-action>
              </v-list-tile>
              <v-divider></v-divider>
              <v-list-tile v-on:click.stop="goWindow(3)">
                <v-list-tile-action><v-icon>mdi-calendar-text</v-icon></v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>月</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action><v-icon>more_vert</v-icon></v-list-tile-action>
              </v-list-tile>
              <v-divider></v-divider>
              <v-list-tile v-on:click.stop="goWindow(4)">
                <v-list-tile-action><v-icon>mdi-calendar-multiselect</v-icon></v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>自定义</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action><v-icon>more_vert</v-icon></v-list-tile-action>
              </v-list-tile>
              <v-subheader>一次任务</v-subheader>
              <v-list-tile>
                <v-list-tile-action><v-icon>mdi-numeric-1-box</v-icon></v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>明天这个时候</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action></v-list-tile-action>
              </v-list-tile>
              <v-divider></v-divider>
              <v-list-tile>
                <v-list-tile-action><v-icon>mdi-numeric-7-box</v-icon></v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>下周这个时候</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action></v-list-tile-action>
              </v-list-tile>
            </v-list>
            <v-footer></v-footer>
          </v-window-item>
          <v-window-item v-bind:value="2" lazy>
            <v-subheader>选择周期</v-subheader>
            <div>每隔{{ TEMP.WEEK_SELECTOR }}周的周{{ CRON_EXPRESSION.DAY_OF_WEEK.toString() }}</div>
            <div class="pl-5 pr-5 pb-4">
              <v-slider
                step="1"
                min="0"
                max="8"
                v-model="TEMP.WEEK_SELECTOR"
                ticks="always"
                thumb-color="red"
                thumb-label="always"
                v-on:change="weekLoopChange"
              ></v-slider>
            </div>
            <div style="display: inline-block" >
              <v-checkbox
                v-for="i in $store.state.WORKDAY_INDEX.filter(item => item.itemValue !== '1-5')"
                v-bind:key="i.itemValue"
                v-bind:label="i.itemText"
                v-bind:value="i.itemValue"
                off-icon="close"
                on-icon="check"
                v-model="CRON_EXPRESSION.DAY_OF_WEEK"
                color="red"></v-checkbox>
            </div>
            <v-footer></v-footer>
          </v-window-item>
          <v-window-item v-bind:value="3" lazy>
            <v-subheader>选择周期</v-subheader>
            <div>每隔 {{ TEMP.MONTH_SELECTOR }} 月第 {{ TEMP.WEEK_INDEX_SELECTOR }} 周的第 {{ TEMP.DAY_OF_WEEK_SELECTOR }} 天</div>
            <div class="pl-5 pr-5">
              <v-slider
                hint="滑动选择月份"
                step="1"
                min="0"
                max="12"
                v-model="TEMP.MONTH_SELECTOR"
                ticks="always"
                thumb-color="red"
                thumb-label="always"
                v-on:change="monthLoopChange"
              ></v-slider>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 md12>
                    <v-select
                      prepend-icon="view_week"
                      outline
                      v-model="TEMP.WEEK_INDEX_SELECTOR"
                      v-bind:items="$store.state.WEEK_INDEX"
                      item-text="itemText"
                      item-value="itemValue"
                      label="第几周"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 md12>
                    <v-select
                      menu-props="top"
                      prepend-icon="view_day"
                      outline
                      v-model="TEMP.DAY_OF_WEEK_SELECTOR"
                      v-bind:items="$store.state.WORKDAY_INDEX"
                      item-avatar="itemIcon"
                      item-text="itemText"
                      item-value="itemValue"
                      label="第几日"
                      v-on:change="workDayLoopChange"
                    >
                      <template slot="item" slot-scope="data">
                        <v-list-tile-avatar>
                          <v-icon size="25">{{ data.item.itemIcon }}</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                          <v-list-tile-title v-html="data.item.itemText"></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </v-select>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
            <v-footer></v-footer>
          </v-window-item>
          <v-window-item v-bind:value="4" lazy>
            <v-subheader>输入CRON表达式</v-subheader>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs2 md2 offset-md1 offset-xs1><v-text-field label="分" outline class="d-flex align-center" height="60" v-model="CRON_EXPRESSION.MINUTE"></v-text-field></v-flex>
                <v-flex xs2 md2><v-text-field label="时" outline class="d-flex align-center" height="60" v-model="CRON_EXPRESSION.HOUR"></v-text-field></v-flex>
                <v-flex xs2 md2><v-text-field label="天" outline class="d-flex align-center" height="60" v-model="CRON_EXPRESSION.DAY_OF_MONTH"></v-text-field></v-flex>
                <v-flex xs2 md2><v-text-field label="月" outline class="d-flex align-center" height="60" v-model="CRON_EXPRESSION.MONTH"></v-text-field></v-flex>
                <v-flex xs2 md2><v-text-field label="周" outline class="d-flex align-center" height="60" v-model="CRON_EXPRESSION.DAY_OF_WEEK"></v-text-field></v-flex>
              </v-layout>
              <span class="red--text">CRON是描述定时任务的表达式，用法请参考<a href="https://en.wikipedia.org/wiki/Cron" target="_blank">WiKi的简要介绍</a></span>
            </v-container>
            <v-footer></v-footer>
          </v-window-item>
        </v-window>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  name: 'cronPicker'
}
</script>

<style scoped>

</style>
