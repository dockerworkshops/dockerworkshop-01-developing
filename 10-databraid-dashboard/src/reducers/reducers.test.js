import { Reducer } from 'redux-testkit';
import { transit as transitReducer } from '@databraid/transit-widget/lib/reducers';
import { github as githubReducer } from '@databraid/github-widget/lib/reducers';
import { sheets as sheetsReducer } from '@databraid/sheets-widget/lib/reducers';
import { storeReducer as slackReducer } from '@databraid/slack-widget/lib/Reducers';
import {
  widgets as rootReducer,
  collapseWidgetSidebars,
  calculateInitialPosition,
  isValidLocation,
} from './index';
import {
  TRANSIT_WIDGET_ID,
  SLACK_WIDGET_ID,
  GITHUB_WIDGET_ID,
  SHEETS_WIDGET_ID,
} from '../constants';

const initialState = {
  ids: [],
  byId: {},
  showSidebar: true,
  showAddWidgetModal: false,
  metadata: {},
  grid: {
    nextId: 1,
    layout: [],
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  },
};

const stateWithTransit = {
  byId: {},
  showSidebar: true,
  ids: [TRANSIT_WIDGET_ID],
  showAddWidgetModal: false,
  grid: {
    nextId: 1,
    layout: [
      {
        i: TRANSIT_WIDGET_ID,
        x: 0,
        y: 0,
        w: 6,
        h: 10,
        minH: 4,
        minW: 3,
        static: false,
      },
    ],
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  },
  metadata: {
    transit: {
      type: 'transit',
      showSidebar: false,
    },
  },
};

const stateWithGithub = {
  byId: {},
  showSidebar: true,
  ids: [GITHUB_WIDGET_ID],
  showAddWidgetModal: false,
  grid: {
    nextId: 1,
    layout: [
      {
        i: GITHUB_WIDGET_ID,
        x: 0,
        y: 0,
        w: 6,
        h: 12,
        minH: 4,
        minW: 6,
        static: false,
      },
    ],
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  },
  metadata: {
    github: {
      type: 'github',
      showSidebar: false,
    },
  },
};

const stateWithSlack = {
  byId: {},
  showSidebar: true,
  ids: [SLACK_WIDGET_ID],
  showAddWidgetModal: false,
  grid: {
    nextId: 1,
    layout: [
      {
        i: SLACK_WIDGET_ID,
        x: 0,
        y: 0,
        w: 4,
        h: 11,
        minH: 4,
        minW: 3,
        static: false,
      },
    ],
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  },
  metadata: {
    slack: {
      type: 'slack',
      showSidebar: false,
    },
  },
};

describe('rootReducer', () => {
  it('should have initial state', () => {
    expect(rootReducer(initialState, {}))
      .toEqual({
        ...initialState,
        byId: {
          [TRANSIT_WIDGET_ID]: transitReducer(undefined, {}),
          [GITHUB_WIDGET_ID]: githubReducer(undefined, {}),
          [SLACK_WIDGET_ID]: slackReducer(undefined, {}),
          [SHEETS_WIDGET_ID]: sheetsReducer(undefined, {}),
        },
      });
  });

  it('should not affect state', () => {
    Reducer(rootReducer)
      .withState(initialState)
      .expect({ type: 'NOT_EXISTING' })
      .toReturnState({
        ...initialState,
        byId: {
          [TRANSIT_WIDGET_ID]: transitReducer(undefined, {}),
          [GITHUB_WIDGET_ID]: githubReducer(undefined, {}),
          [SLACK_WIDGET_ID]: slackReducer(undefined, {}),
          [SHEETS_WIDGET_ID]: sheetsReducer(undefined, {}),
        },
      });
  });

  it('should add the transit widget to the dashboard', () => {
    const action = { type: 'ADD_WIDGET', id: 'transit' };
    Reducer(rootReducer).withState(initialState).expect(action).toReturnState({
      ...stateWithTransit,
    });
  });

  it('should add the github widget to the dashboard', () => {
    const action = { type: 'ADD_WIDGET', id: 'github' };
    Reducer(rootReducer).withState(initialState).expect(action).toReturnState({
      ...stateWithGithub,
    });
  });

  it('should add the slack widget to the dashboard', () => {
    const action = { type: 'ADD_WIDGET', id: 'slack' };
    Reducer(rootReducer).withState(initialState).expect(action).toReturnState({
      ...stateWithSlack,
    });
  });

  it('should remove the transit widget from the dashboard', () => {
    const action = { type: 'REMOVE_WIDGET', id: 'transit' };
    Reducer(rootReducer).withState(stateWithTransit).expect(action).toReturnState({
      ...stateWithTransit,
      ids: [],
    });
  });

  it('should remove the github widget from the dashboard', () => {
    const action = { type: 'REMOVE_WIDGET', id: 'github' };
    Reducer(rootReducer).withState(stateWithGithub).expect(action).toReturnState({
      ...stateWithGithub,
      ids: [],
    });
  });

  it('should remove the slack widget from the dashboard', () => {
    const action = { type: 'REMOVE_WIDGET', id: 'slack' };
    Reducer(rootReducer).withState(stateWithSlack).expect(action).toReturnState({
      ...stateWithSlack,
      ids: [],
    });
  });

  it('should show modal to add widget', () => {
    const action = { type: 'SHOW_ADD_WIDGET_MODAL' };
    Reducer(rootReducer).withState(initialState).expect(action).toReturnState({
      ...initialState,
      showAddWidgetModal: true,
      showSidebar: false,
    });
  });

  it('should hide add widget modal', () => {
    const action = { type: 'HIDE_ADD_WIDGET_MODAL' };
    Reducer(rootReducer).withState(initialState).expect(action).toReturnState({
      ...initialState,
      showAddWidgetModal: false,
    });
  });

  it('should show dashboard sidebar', () => {
    const action = { type: 'SHOW_DASHBOARD_SIDEBAR' };
    Reducer(rootReducer).withState(initialState).expect(action).toReturnState({
      ...initialState,
      showSidebar: true,
    });
  });

  it('should hide dashboard sidebar', () => {
    const action = { type: 'HIDE_DASHBOARD_SIDEBAR' };
    Reducer(rootReducer).withState(initialState).expect(action).toReturnState({
      ...initialState,
      showSidebar: false,
    });
  });

  it('should show transit widget sidebar', () => {
    const action = { type: 'SHOW_WIDGET_SIDEBAR', id: 'transit' };
    Reducer(rootReducer).withState(stateWithTransit).expect(action).toReturnState({
      ...stateWithTransit,
      metadata: {
        ...stateWithTransit.metadata,
        [action.id]: {
          ...stateWithTransit.metadata[action.id],
          showSidebar: true,
        },
      },
      showSidebar: false,
    });
  });

  it('should show github widget sidebar', () => {
    const action = { type: 'SHOW_WIDGET_SIDEBAR', id: 'github' };
    Reducer(rootReducer).withState(stateWithGithub).expect(action).toReturnState({
      ...stateWithGithub,
      metadata: {
        ...stateWithGithub.metadata,
        [action.id]: {
          ...stateWithGithub.metadata[action.id],
          showSidebar: true,
        },
      },
      showSidebar: false,
    });
  });

  it('should show slack widget sidebar', () => {
    const action = { type: 'SHOW_WIDGET_SIDEBAR', id: 'slack' };
    Reducer(rootReducer).withState(stateWithSlack).expect(action).toReturnState({
      ...stateWithSlack,
      metadata: {
        ...stateWithSlack.metadata,
        [action.id]: {
          ...stateWithSlack.metadata[action.id],
          showSidebar: true,
        },
      },
      showSidebar: false,
    });
  });

  it('should hide transit widget sidebar', () => {
    const action = { type: 'HIDE_WIDGET_SIDEBAR', id: 'transit' };
    const state = {
      ...stateWithTransit,
      metadata: {
        ...stateWithTransit.metadata,
        transit: {
          ...stateWithTransit.metadata.transit,
          showSidebar: true,
        },
      },
    };
    Reducer(rootReducer).withState(state).expect(action).toReturnState({
      ...stateWithTransit,
      metadata: {
        ...stateWithTransit.metadata,
        [action.id]: {
          ...stateWithTransit.metadata[action.id],
          showSidebar: false,
        },
      },
    });
  });

  it('should hide github widget sidebar', () => {
    const action = { type: 'HIDE_WIDGET_SIDEBAR', id: 'github' };
    const state = {
      ...stateWithGithub,
      metadata: {
        ...stateWithGithub.metadata,
        github: {
          ...stateWithGithub.metadata.github,
          showSidebar: true,
        },
      },
    };
    Reducer(rootReducer).withState(state).expect(action).toReturnState({
      ...stateWithGithub,
      metadata: {
        ...stateWithGithub.metadata,
        [action.id]: {
          ...stateWithGithub.metadata[action.id],
          showSidebar: false,
        },
      },
    });
  });

  it('should hide slack widget sidebar', () => {
    const action = { type: 'HIDE_WIDGET_SIDEBAR', id: 'slack' };
    const state = {
      ...stateWithSlack,
      metadata: {
        ...stateWithSlack.metadata,
        slack: {
          ...stateWithSlack.metadata.slack,
          showSidebar: true,
        },
      },
    };
    Reducer(rootReducer).withState(state).expect(action).toReturnState({
      ...stateWithSlack,
      metadata: {
        ...stateWithSlack.metadata,
        [action.id]: {
          ...stateWithSlack.metadata[action.id],
          showSidebar: false,
        },
      },
    });
  });

  it('should lock in the dashboard', () => {
    const action = { type: 'LOCK_DASHBOARD' };
    Reducer(rootReducer).withState(stateWithTransit).expect(action).toReturnState({
      ...stateWithTransit,
      showSidebar: false,
      locked: true,
      grid: {
        ...stateWithTransit.grid,
        layout: stateWithTransit.grid.layout.map(layoutObj => (
          {
            ...layoutObj,
            static: true,
          }
        )),
      },
    });
  });

  it('should unlock the dashboard', () => {
    const action = { type: 'UNLOCK_DASHBOARD' };
    const state = {
      ...stateWithTransit,
      showSidebar: false,
      locked: true,
      grid: {
        ...stateWithTransit.grid,
        layout: stateWithTransit.grid.layout.map(layoutObj => (
          {
            ...layoutObj,
            static: true,
          }
        )),
      },
    };
    Reducer(rootReducer).withState(state).expect(action).toReturnState({
      ...stateWithTransit,
      showSidebar: false,
      locked: false,
    });
  });

  it('should persist new grid layout to state', () => {
    const action = {
      type: 'SAVE_LAYOUT_CHANGE',
      layout: [{ i: TRANSIT_WIDGET_ID, x: 2, y: 3, w: 6, h: 8, minH: 4, minW: 4, static: false }],
    };

    Reducer(rootReducer).withState(stateWithTransit).expect(action).toReturnState({
      byId: {},
      showSidebar: true,
      ids: [TRANSIT_WIDGET_ID],
      showAddWidgetModal: false,
      grid: {
        nextId: 1,
        layout: [
          { i: TRANSIT_WIDGET_ID, x: 2, y: 3, w: 6, h: 8, minH: 4, minW: 4, static: false },
        ],
        breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      },
      metadata: {
        transit: {
          type: 'transit',
          showSidebar: false,
        },
      },
    });
  });
});


/*      0   1   2   3   4   5   6   7   8   9   10  11
 *  0 | x | x | x | x | x | x |   |   | x | x | x | x |
 *  1 | x | x | x | x | x | x |   |   | x | x | x | x |
 *  2 | x | x | x | x | x | x |   |   | x | x | x | x |
 *  3 | x | x | x | x | x | x |   |   | x | x | x | x |
 *  4 |   |   |   |   |   |   |   |   | x | x | x | x |
 *  5 |   |   |   |   |   |   |   |   |   |   |   |   |
 *  6 |   |   |   | x | x | x | x | x | x |   |   |   |
 *  7 |   |   |   | x | x | x | x | x | x |   |   |   |
 *  8 |   |   |   | x | x | x | x | x | x |   |   |   |
 *  9 |   |   |   | x | x | x | x | x | x |   |   |   |
 * 10 |   |   |   |   |   |   |   |   |   |   |   |   |
 * 11 |   |   |   |   |   |   |   |   |   |   |   |   |
 * 12 |   |   |   |   |   |   |   |   |   |   |   |   |
 * 13 |   |   |   |   |   |   |   |   |   |   |   |   |
 * 14 |   |   |   |   |   |   |   |   |   |   |   |   |
 */
const layoutWithThree = [
  { i: 'test1', x: 0, y: 0, w: 6, h: 4, static: false },
  { i: 'test2', x: 0, y: 8, w: 4, h: 5, static: false },
  { i: 'test3', x: 6, y: 3, w: 6, h: 4, static: false },
];

/*      0   1   2   3   4   5   6   7   8   9   10  11
 *  0 |   |   |   |   |   |   |   |   |   |   |   |   |
 *  1 |   |   |   |   |   |   |   |   |   |   |   |   |
 *  2 |   |   |   |   |   |   |   |   |   |   |   |   |
 *  3 |   |   |   |   |   |   |   |   |   |   |   |   |
 *  4 |   |   |   |   |   |   |   |   |   |   |   |   |
 *  5 |   |   |   |   |   |   |   |   |   |   |   |   |
 *  6 |   |   |   | x | x | x | x | x | x |   |   |   |
 *  7 |   |   |   | x | x | x | x | x | x |   |   |   |
 *  8 |   |   |   | x | x | x | x | x | x |   |   |   |
 *  9 |   |   |   | x | x | x | x | x | x |   |   |   |
 * 10 |   |   |   |   |   |   |   |   |   |   |   |   |
 * 11 |   |   |   |   |   |   |   |   |   |   |   |   |
 * 12 |   |   |   |   |   |   |   |   |   |   |   |   |
 * 13 |   |   |   |   |   |   |   |   |   |   |   |   |
 * 14 |   |   |   |   |   |   |   |   |   |   |   |   |
 */
const layoutWithOne = [
  { i: 'test', x: 3, y: 6, w: 6, h: 4, static: false },
];

describe('non-reducer functions', () => {
  describe('collapseWidgetSidebars', () => {
    it('should return new metadata with all widget sidebars not showing', () => {
      expect(collapseWidgetSidebars({ transit: {
        type: 'transit',
        showSidebar: true,
      },
      })).toEqual(stateWithTransit.metadata);
    });
  });

  describe('isValidLocation', () => {
    it('should return false when there exists overlap to the top left', () => {
      expect(isValidLocation(layoutWithOne, 2, 5, 2, 2)).toEqual(false);
    });
    it('should return false when there exists overlap to the top right', () => {
      expect(isValidLocation(layoutWithOne, 8, 5, 2, 2)).toEqual(false);
    });
    it('should return false when there exists overlap to the bottom left', () => {
      expect(isValidLocation(layoutWithOne, 2, 9, 2, 2)).toEqual(false);
    });
    it('should return false when there exists overlap to the bottom right', () => {
      expect(isValidLocation(layoutWithOne, 8, 9, 2, 2)).toEqual(false);
    });
    it('should return false when there exists overlap to the top', () => {
      expect(isValidLocation(layoutWithOne, 5, 5, 2, 2)).toEqual(false);
    });
    it('should return false when there exists overlap to the bottom', () => {
      expect(isValidLocation(layoutWithOne, 5, 9, 2, 2)).toEqual(false);
    });
    it('should return false when there exists overlap to the left', () => {
      expect(isValidLocation(layoutWithOne, 2, 7, 2, 2)).toEqual(false);
    });
    it('should return false when there exists overlap to the right', () => {
      expect(isValidLocation(layoutWithOne, 8, 7, 2, 2)).toEqual(false);
    });
    it('should return true when right against top', () => {
      expect(isValidLocation(layoutWithOne, 4, 4, 2, 2)).toEqual(true);
    });
    it('should return true when right against bottom', () => {
      expect(isValidLocation(layoutWithOne, 5, 10, 2, 2)).toEqual(true);
    });
    it('should return true when right against left', () => {
      expect(isValidLocation(layoutWithOne, 1, 6, 2, 2)).toEqual(true);
    });
    it('should return true when right against right', () => {
      expect(isValidLocation(layoutWithOne, 9, 7, 2, 2)).toEqual(true);
    });
    it('should return true when just off top left corner', () => {
      expect(isValidLocation(layoutWithOne, 1, 4, 2, 2)).toEqual(true);
    });
    it('should return true when just off top right corner', () => {
      expect(isValidLocation(layoutWithOne, 9, 4, 2, 2)).toEqual(true);
    });
    it('should return true when just off bottom left corner', () => {
      expect(isValidLocation(layoutWithOne, 1, 10, 2, 2)).toEqual(true);
    });
    it('should return true when just off bottm right corner', () => {
      expect(isValidLocation(layoutWithOne, 9, 10, 2, 2)).toEqual(true);
    });
    it('should return true when far away', () => {
      expect(isValidLocation(layoutWithOne, 0, 0, 2, 2)).toEqual(true);
    });
  });

  describe('calculateInitialPosition', () => {
    it('should return false when width is greater than max columns', () => {
      expect(calculateInitialPosition([], 13, 1, 12)).toEqual(null);
    });
    it('should return valid coordinates for 2x2', () => {
      expect(calculateInitialPosition(layoutWithThree, 2, 2)).toEqual({ x: 6, y: 0 });
    });
    it('should return valid coordinates for 3x3', () => {
      expect(calculateInitialPosition(layoutWithThree, 3, 3)).toEqual({ x: 6, y: 0 });
    });
  });
});
