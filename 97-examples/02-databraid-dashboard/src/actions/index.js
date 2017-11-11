import {
  ADD_WIDGET,
  REMOVE_WIDGET,
  SHOW_ADD_WIDGET_MODAL,
  HIDE_ADD_WIDGET_MODAL,
  SHOW_DASHBOARD_SIDEBAR,
  HIDE_DASHBOARD_SIDEBAR,
  SHOW_WIDGET_SIDEBAR,
  HIDE_WIDGET_SIDEBAR,
  LOCK_DASHBOARD,
  UNLOCK_DASHBOARD,
  SAVE_LAYOUT_CHANGE,
} from '../constants';

export function addWidget(widgetType) {
  return { type: ADD_WIDGET, id: widgetType };
}

export function removeWidget(widgetId) {
  return { type: REMOVE_WIDGET, id: widgetId };
}

export function showAddWidgetModal() {
  return { type: SHOW_ADD_WIDGET_MODAL };
}

export function hideAddWidgetModal() {
  return { type: HIDE_ADD_WIDGET_MODAL };
}

export function showDashboardSidebar() {
  return { type: SHOW_DASHBOARD_SIDEBAR };
}

export function hideDashboardSidebar() {
  return { type: HIDE_DASHBOARD_SIDEBAR };
}

export function showWidgetSidebar(widgetId) {
  return { type: SHOW_WIDGET_SIDEBAR, id: widgetId };
}

export function hideWidgetSidebar(widgetId) {
  return { type: HIDE_WIDGET_SIDEBAR, id: widgetId };
}

export function lockDashboard() {
  return { type: LOCK_DASHBOARD };
}

export function unlockDashboard() {
  return { type: UNLOCK_DASHBOARD };
}

export function saveLayoutChange(layout) {
  return { type: SAVE_LAYOUT_CHANGE, layout };
}

