import * as TYPES from '../constants/index';
import * as actions from './index';

describe('actions', () => {
  it('should create an action to add a transit widget', () => {
    const expectedAction = {
      type: TYPES.ADD_WIDGET,
      id: TYPES.TRANSIT_WIDGET_ID,
    };

    expect(actions.addWidget(TYPES.TRANSIT_WIDGET_ID)).toEqual(expectedAction);
  });

  it('should create an action to add a slack widget', () => {
    const expectedAction = {
      type: TYPES.ADD_WIDGET,
      id: TYPES.SLACK_WIDGET_ID,
    };

    expect(actions.addWidget(TYPES.SLACK_WIDGET_ID)).toEqual(expectedAction);
  });

  it('should create an action to add a github widget', () => {
    const expectedAction = {
      type: TYPES.ADD_WIDGET,
      id: TYPES.GITHUB_WIDGET_ID,
    };

    expect(actions.addWidget(TYPES.GITHUB_WIDGET_ID)).toEqual(expectedAction);
  });

  it('should create an action to remove a transit widget', () => {
    const expectedAction = {
      type: TYPES.REMOVE_WIDGET,
      id: TYPES.TRANSIT_WIDGET_ID,
    };

    expect(actions.removeWidget(TYPES.TRANSIT_WIDGET_ID)).toEqual(expectedAction);
  });

  it('should create an action to remove a slack widget', () => {
    const expectedAction = {
      type: TYPES.REMOVE_WIDGET,
      id: TYPES.SLACK_WIDGET_ID,
    };

    expect(actions.removeWidget(TYPES.SLACK_WIDGET_ID)).toEqual(expectedAction);
  });

  it('should create an action to remove a github widget', () => {
    const expectedAction = {
      type: TYPES.REMOVE_WIDGET,
      id: TYPES.GITHUB_WIDGET_ID,
    };

    expect(actions.removeWidget(TYPES.GITHUB_WIDGET_ID)).toEqual(expectedAction);
  });

  it('should create an action to show widget modal', () => {
    const expectedAction = {
      type: TYPES.SHOW_ADD_WIDGET_MODAL,
    };

    expect(actions.showAddWidgetModal()).toEqual(expectedAction);
  });

  it('should create an action to hide widget modal', () => {
    const expectedAction = {
      type: TYPES.HIDE_ADD_WIDGET_MODAL,
    };

    expect(actions.hideAddWidgetModal()).toEqual(expectedAction);
  });

  it('should create an action to show dashboard sidebar', () => {
    const expectedAction = {
      type: TYPES.SHOW_DASHBOARD_SIDEBAR,
    };

    expect(actions.showDashboardSidebar()).toEqual(expectedAction);
  });

  it('should create an action to hide dashboard sidebar', () => {
    const expectedAction = {
      type: TYPES.HIDE_DASHBOARD_SIDEBAR,
    };

    expect(actions.hideDashboardSidebar()).toEqual(expectedAction);
  });

  it('should create an action to show a transit widget sidebar', () => {
    const expectedAction = {
      type: TYPES.SHOW_WIDGET_SIDEBAR,
      id: TYPES.TRANSIT_WIDGET_ID,
    };

    expect(actions.showWidgetSidebar(TYPES.TRANSIT_WIDGET_ID)).toEqual(expectedAction);
  });

  it('should create an action to show a slack widget sidebar', () => {
    const expectedAction = {
      type: TYPES.SHOW_WIDGET_SIDEBAR,
      id: TYPES.SLACK_WIDGET_ID,
    };

    expect(actions.showWidgetSidebar(TYPES.SLACK_WIDGET_ID)).toEqual(expectedAction);
  });

  it('should create an action to show a github widget sidebar', () => {
    const expectedAction = {
      type: TYPES.SHOW_WIDGET_SIDEBAR,
      id: TYPES.GITHUB_WIDGET_ID,
    };

    expect(actions.showWidgetSidebar(TYPES.GITHUB_WIDGET_ID)).toEqual(expectedAction);
  });

  it('should create an action to hide a transit widget sidebar', () => {
    const expectedAction = {
      type: TYPES.HIDE_WIDGET_SIDEBAR,
      id: TYPES.TRANSIT_WIDGET_ID,
    };

    expect(actions.hideWidgetSidebar(TYPES.TRANSIT_WIDGET_ID)).toEqual(expectedAction);
  });

  it('should create an action to hide a slack widget sidebar', () => {
    const expectedAction = {
      type: TYPES.HIDE_WIDGET_SIDEBAR,
      id: TYPES.SLACK_WIDGET_ID,
    };

    expect(actions.hideWidgetSidebar(TYPES.SLACK_WIDGET_ID)).toEqual(expectedAction);
  });

  it('should create an action to hide a github widget sidebar', () => {
    const expectedAction = {
      type: TYPES.HIDE_WIDGET_SIDEBAR,
      id: TYPES.GITHUB_WIDGET_ID,
    };

    expect(actions.hideWidgetSidebar(TYPES.GITHUB_WIDGET_ID)).toEqual(expectedAction);
  });

  it('should create an action to lock the widgets', () => {
    const expectedAction = {
      type: TYPES.LOCK_DASHBOARD,
    };

    expect(actions.lockDashboard()).toEqual(expectedAction);
  });

  it('should create an action to unlock the widgets', () => {
    const expectedAction = {
      type: TYPES.UNLOCK_DASHBOARD,
    };

    expect(actions.unlockDashboard()).toEqual(expectedAction);
  });

  it('should create an action to save grid layout changes', () => {
    const expectedAction = {
      type: TYPES.SAVE_LAYOUT_CHANGE,
      layout: undefined,
    };

    expect(actions.saveLayoutChange(undefined)).toEqual(expectedAction);
  });
});
